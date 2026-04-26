import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createServerClient } from "@supabase/ssr";
import {
  isResendConfigured,
  getResendConfig,
  buildUnsubscribeUrl,
  mailFooterHtml,
} from "@/lib/email";
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
  const unsubscribeUrl = buildUnsubscribeUrl(origin, email);

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
<p>中小建設業者向けに、改正建設業法2025で対応が必要な項目を8セクション30項目で網羅しました。社内共有や印刷にもお使いいただけます。</p>
<p>ご不明点・ご要望は、このメールにご返信ください。</p>`,
          ctaLabel: "ケンミツを見る",
          ctaUrl: lpUrl,
          unsubscribeUrl,
        }),
        text: `改正建設業法2025対応チェックリストのダウンロードリンクをお送りします。\n${downloadUrl}\n\n配信停止: ${unsubscribeUrl}`,
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
<p>中小建設業者の多くが「未対応」になりがちな上位3項目はこちらです：</p>
<ol>
<li><strong>労務費の内訳明示</strong>（75%が未対応）</li>
<li><strong>法定福利費の独立計上</strong>（68%が未対応）</li>
<li><strong>瑕疵担保責任の見積書記載</strong>（61%が未対応）</li>
</ol>
<p>いずれもケンミツのツールで自動化されます。労務費を入れれば法定福利費は自動計算、瑕疵担保条項は業界標準のテンプレ付きです。</p>
<p>メアド登録だけで今すぐ試せます：</p>`,
            ctaLabel: "無料で試してみる",
            ctaUrl: toolUrl,
            unsubscribeUrl,
          }),
          text: `チェックリスト活用のヒント。メアド登録だけで試せます: ${toolUrl}\n\n配信停止: ${unsubscribeUrl}`,
        })
        .catch(() => {
          // scheduledAt対応してない場合は無視
        });

      // Day 7：改正建設業法対応（有料プラン）の案内
      await resend.emails
        .send({
          from,
          to: email,
          subject: "【7日後】改正建設業法 2025 に対応した見積書を出すには",
          scheduledAt: "in 7 days",
          html: mailTemplate({
            title: "改正建設業法 2025 対応版の見積書",
            body: `
<p>こんにちは、ケンミツです。</p>
<p>先週お送りしたチェックリスト、お役に立てましたでしょうか。</p>
<p>2025 年 12 月施行の改正建設業法では、労務費の内訳明示と法定福利費の独立計上が義務化されました。違反は監督官庁の指導・勧告・企業名公表・営業停止などの段階処分対象です。</p>
<p>無料プランの PDF は通常フォーマットで、これらの内訳明示が反映されません。取引先に正式な見積書として提出する場合は、有料プラン（月¥1,980）の改正法対応版 PDF をご検討ください。</p>
<ul>
<li>改正建設業法のルールに沿った見積書（労務費・法定福利費の内訳明示）</li>
<li>リアルタイム法令チェッカー（一式記載・労務費未入力・瑕疵担保未記載などを警告）</li>
<li>取引先マスタ・単価マスタで 2 通目以降の作成時間を大幅短縮</li>
<li>原価・粗利分析、工事写真の添付</li>
<li>いつでもワンクリックで解約可能</li>
</ul>
<p>無料プランのまま見積書作成・PDF 出力・クラウド保存をお使いいただくのも引き続き歓迎です。</p>`,
            ctaLabel: "有料プランの詳細を見る",
            ctaUrl: `${lpUrl}#pricing`,
            unsubscribeUrl,
          }),
          text: `有料プラン（月¥1,980）で改正建設業法対応版 PDF＋法令チェッカー＋マスタ機能が使えます: ${lpUrl}#pricing\n\n配信停止: ${unsubscribeUrl}`,
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
  unsubscribeUrl,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  unsubscribeUrl: string;
}): string {
  return `
<div style="font-family:sans-serif; max-width:600px; margin:0 auto; color:#1f2937;">
  <h2 style="color:#1E40AF; margin-top:0;">${title}</h2>
  ${body}
  <div style="text-align:center; margin:32px 0;">
    <a href="${ctaUrl}" style="display:inline-block; background:#F59E0B; color:white; text-decoration:none; padding:12px 32px; border-radius:8px; font-weight:bold;">${ctaLabel}</a>
  </div>
  ${mailFooterHtml(unsubscribeUrl)}
</div>`;
}
