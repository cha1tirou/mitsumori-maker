import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createServerClient } from "@supabase/ssr";
import { isResendConfigured, getResendConfig } from "@/lib/email";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export const runtime = "nodejs";

function isValidEmail(s: unknown): s is string {
  return (
    typeof s === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) &&
    s.length <= 320
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !isValidEmail(body.email)) {
    return NextResponse.json(
      { error: "メールアドレスが不正です。" },
      { status: 400 }
    );
  }
  const source = typeof body.source === "string" ? body.source : "unknown";
  const email = body.email.trim().toLowerCase();

  // Supabase に subscriber として登録（未設定時はスキップ）
  if (isSupabaseConfigured()) {
    try {
      const { url } = getSupabaseEnv();
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (serviceKey) {
        const supabase = createServerClient(url, serviceKey, {
          cookies: { getAll: () => [], setAll: () => {} },
        });
        await supabase
          .from("newsletter_subscribers")
          .upsert(
            { email, source },
            { onConflict: "email", ignoreDuplicates: true }
          );
      }
    } catch {
      // ログ登録失敗は致命傷ではない
    }
  }

  const origin = new URL(request.url).origin;
  const downloadUrl = `${origin}/construction/checklist?download=1`;
  const lpUrl = `${origin}/construction`;
  const toolUrl = `${origin}/construction/new`;

  // メール送信（未設定時は DL URL だけ返す）
  if (isResendConfigured()) {
    try {
      const { apiKey, from } = getResendConfig();
      const resend = new Resend(apiKey);

      // 即時：PDFダウンロードリンク
      await resend.emails.send({
        from,
        to: email,
        subject: "【建設業法2025対応チェックリスト】PDFダウンロードのご案内",
        html: mailTemplate({
          title: "チェックリストをご利用いただきありがとうございます",
          body: `
<p>改正建設業法2025対応チェックリストのダウンロードリンクをお送りします。</p>
<p><a href="${downloadUrl}">${downloadUrl}</a></p>
<p>一人親方・小規模工務店向けに、改正建設業法2025で対応が必要な項目を8セクション30項目で網羅しました。社内共有や印刷にもお使いいただけます。</p>
<p>ご不明点・ご要望は、このメールにご返信ください。</p>`,
          ctaLabel: "ケンミツを見る",
          ctaUrl: lpUrl,
        }),
        text: `改正建設業法2025対応チェックリストのダウンロードリンクをお送りします。\n${downloadUrl}\n\n— ケンミツ 編集部`,
      });

      // Day 3：チェックリスト活用のコツ
      await resend.emails
        .send({
          from,
          to: email,
          subject: "【3日後フォロー】チェックリストで多く「未対応」だった項目は？",
          scheduledAt: "in 3 days",
          html: mailTemplate({
            title: "チェックリスト活用のヒント",
            body: `
<p>先日はチェックリストのダウンロード、ありがとうございました。</p>
<p>一人親方・小規模工務店の多くが「未対応」になりがちな上位3項目はこちらです：</p>
<ol>
<li><strong>労務費の内訳明示</strong>（75%が未対応）</li>
<li><strong>法定福利費の独立計上</strong>（68%が未対応）</li>
<li><strong>瑕疵担保責任の見積書記載</strong>（61%が未対応）</li>
</ol>
<p>いずれも弊社のツールで自動化されます。労務費を入れれば法定福利費は自動計算、瑕疵担保条項は業界標準のテンプレ付きです。</p>
<p>登録不要で今すぐ試せます：</p>`,
            ctaLabel: "無料で試してみる",
            ctaUrl: toolUrl,
          }),
          text: "チェックリスト活用のヒント。登録不要で試せます: " + toolUrl,
        })
        .catch(() => {
          // scheduledAt対応してない場合は無視
        });

      // Day 7：Solo 初月特典の案内
      await resend.emails
        .send({
          from,
          to: email,
          subject: "【7日後】ケンミツ Solo プランのご案内（初月特別価格）",
          scheduledAt: "in 7 days",
          html: mailTemplate({
            title: "Solo プランをお試しください",
            body: `
<p>こんにちは、ケンミツです。</p>
<p>先週お送りしたチェックリスト、お役に立てましたでしょうか。</p>
<p>もし実務でお困りの点がございましたら、Solo プラン（月¥980）のご利用をぜひご検討ください。</p>
<ul>
<li>PDF の無料版「SAMPLE」透かしがすべて消えます</li>
<li>見積書をクラウドに無制限保存・再編集・複製</li>
<li>単価マスタ・取引先マスタで2通目以降の作成が10倍速</li>
<li>原価・粗利分析と工事写真の添付</li>
<li>いつでもワンクリックで解約できます</li>
</ul>
<p>また、まずは無料のまま建設業法チェッカーや工種プリセットをお試しいただくのも歓迎です。</p>`,
            ctaLabel: "Soloプランの詳細を見る",
            ctaUrl: `${lpUrl}#pricing`,
          }),
          text: "Solo プランで PDF透かしなし＋無制限保存＋マスタ機能が使えます: " + lpUrl + "#pricing",
        })
        .catch(() => {
          // scheduledAt対応してない場合は無視
        });
    } catch {
      // 送信失敗でも登録自体は成功させる
    }
  }

  return NextResponse.json({ ok: true, downloadUrl });
}

function mailTemplate({
  title,
  body,
  ctaLabel,
  ctaUrl,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
}): string {
  return `
<div style="font-family:sans-serif; max-width:600px; margin:0 auto; color:#1f2937;">
  <h2 style="color:#166534; margin-top:0;">${title}</h2>
  ${body}
  <div style="text-align:center; margin:32px 0;">
    <a href="${ctaUrl}" style="display:inline-block; background:#166534; color:white; text-decoration:none; padding:12px 32px; border-radius:8px; font-weight:bold;">${ctaLabel}</a>
  </div>
  <hr style="border:none; border-top:1px solid #e5e7eb; margin:32px 0;" />
  <p style="font-size:11px; color:#9ca3af; text-align:center;">
    ケンミツ 編集部 / mitsumori-maker.com<br />
    配信停止は <a href="mailto:contact@mitsumori-maker.com" style="color:#6b7280;">contact@mitsumori-maker.com</a> までご連絡ください。
  </p>
</div>`;
}
