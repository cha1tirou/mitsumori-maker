import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Resend } from "resend";
import { isResendConfigured, getResendConfig } from "@/lib/email";
import { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ドリップメール定義（Day 0, 3, 5）
const DRIP_STEPS = [
  {
    day: 0,
    key: "welcome",
    subject: "【ケンミツ】ご登録ありがとうございます",
    html: buildWelcomeEmail,
  },
  {
    day: 3,
    key: "tips",
    subject: "【ケンミツ】3分で見積書を完成させるコツ",
    html: buildTipsEmail,
  },
  {
    day: 5,
    key: "upgrade",
    subject: "【ケンミツ】取引先に出せるPDFが欲しければ Solo プラン",
    html: buildUpgradeEmail,
  },
] as const;

export async function GET(request: NextRequest) {
  // Cron認証
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !isResendConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "Service role missing" }, { status: 503 });
  }

  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  const { apiKey, from } = getResendConfig();
  const resend = new Resend(apiKey);

  // 直近8日以内に登録したFreeユーザーを取得
  const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, plan, created_at, drip_sent, stripe_customer_id")
    .eq("plan", "free")
    .is("stripe_customer_id", null) // 一度も課金していないユーザーのみ
    .gte("created_at", eightDaysAgo);

  if (!users || users.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sentCount = 0;

  for (const user of users) {
    const createdAt = new Date(user.created_at).getTime();
    const daysSinceSignup = Math.floor(
      (Date.now() - createdAt) / (24 * 60 * 60 * 1000)
    );
    const dripSent: Record<string, boolean> = (user.drip_sent as Record<string, boolean>) ?? {};

    for (const step of DRIP_STEPS) {
      if (daysSinceSignup >= step.day && !dripSent[step.key]) {
        try {
          await resend.emails.send({
            from,
            to: user.email,
            subject: step.subject,
            html: step.html(),
          });

          // 送信済みフラグを更新
          dripSent[step.key] = true;
          await supabase
            .from("profiles")
            .update({ drip_sent: dripSent })
            .eq("id", user.id);

          sentCount++;
        } catch (err) {
          console.error(`Drip email failed for ${user.email}:`, err);
        }
      }
    }
  }

  return NextResponse.json({ sent: sentCount });
}

// --- メールテンプレート ---

function emailWrapper(content: string): string {
  return `
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #15803d;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>
  ${content}
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
  <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; text-align: center;">
    ケンミツ — 建設業向け見積書作成ツール<br>
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af;">https://mitsumori-maker.com/construction</a>
  </p>
</div>`;
}

function ctaButton(text: string, url: string): string {
  return `
<div style="text-align: center; margin: 24px 0;">
  <a href="${url}" style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
    ${text}
  </a>
</div>`;
}

function buildWelcomeEmail(): string {
  return emailWrapper(`
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">ご登録ありがとうございます</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      ケンミツへようこそ！<br>
      無料プランでは月3通までクラウド保存できます（PDFは透かし付き）。
    </p>
    <ul style="font-size: 14px; line-height: 2; padding-left: 20px; margin-bottom: 16px;">
      <li>見積書の作成・PDF出力（無制限・透かし付き）</li>
      <li>月3通までクラウド保存・再編集</li>
      <li>改正建設業法2025の自動チェック</li>
      <li>8工種のプリセット・諸経費自動計算</li>
    </ul>
    <p style="font-size: 14px; line-height: 1.8;">
      まずは1通、見積書を作成してみてください。
    </p>
    ${ctaButton("見積書を作成する →", "https://mitsumori-maker.com/construction/new")}
  `);
}

function buildTipsEmail(): string {
  return emailWrapper(`
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">3分で見積書を完成させるコツ</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      ケンミツを使いこなすための3つのポイントをご紹介します。
    </p>
    <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">1. 工種プリセットを活用</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">
        電気・水道・内装など8工種のプリセットを1タップで読み込めます。ゼロから入力する必要はありません。
      </p>
    </div>
    <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">2. 自社情報を保存</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">
        会社名・住所・許可番号を一度保存すれば、次回から自動入力されます。
      </p>
    </div>
    <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">3. 過去の見積書を複製</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">
        似た案件は過去の見積書をワンクリックで複製。金額と日付を変えるだけで完成します。
      </p>
    </div>
    ${ctaButton("見積書を作成する →", "https://mitsumori-maker.com/construction/new")}
  `);
}

function buildUpgradeEmail(): string {
  return emailWrapper(`
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">取引先提出用の見積書、透かしで困っていませんか？</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      無料プランの PDF には「無料版 SAMPLE」の透かしが入ります。<br>
      取引先に正式な見積書として提出するには <strong>Soloプラン（月¥980）</strong> をご検討ください。
    </p>
    <ul style="font-size: 14px; line-height: 2; padding-left: 20px; margin-bottom: 16px;">
      <li><strong>透かしなし</strong>の正式版PDFが出力できる</li>
      <li>見積書の<strong>無制限</strong>クラウド保存・履歴管理</li>
      <li><strong>取引先マスタ・単価マスタ</strong>で2通目以降の作成時間を大幅短縮</li>
      <li>工事写真・原価粗利分析も利用可</li>
    </ul>
    ${ctaButton("Soloプランを見る →", "https://mitsumori-maker.com/construction#pricing")}
    <p style="font-size: 12px; color: #6b7280; text-align: center;">
      いつでもワンクリックで解約できます。
    </p>
  `);
}
