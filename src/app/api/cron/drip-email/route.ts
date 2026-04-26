import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Resend } from "resend";
import {
  isResendConfigured,
  getResendConfig,
  buildUnsubscribeUrl,
  mailFooterHtml,
} from "@/lib/email";
import { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ドリップメール（Phase 1 ピボット後・Step 1: Day 0 / 2 / 5）
 *
 * 設計方針:
 * - Day 0 (welcome): ツール導入。改正法の話は後回し
 * - Day 2 (reminder): 見積書ゼロ通のユーザーのみに作成リマインド
 * - Day 5 (educate): 改正建設業法 2025 の教育（売り込みゼロ・ガイド記事へ誘導）
 *
 * 後続（Step 2 以降で追加予定）:
 * - Day 10: 気づき（「あなたの見積書、対応してる？」軽い CTA）
 * - Day 18: リスク訴求（指導・経審減点等）
 * - Day 28: 最終転換オファー（年契約 push）
 */
const DRIP_STEPS = [
  {
    day: 0,
    key: "welcome",
    subject: "【ケンミツ】ご登録ありがとうございます",
    html: buildWelcomeEmail,
    /** 見積書作成数による条件分岐があれば指定。未指定なら全員に配信。 */
    requireZeroQuotes: false,
  },
  {
    day: 2,
    key: "reminder",
    subject: "【ケンミツ】最初の見積書、まだですか？",
    html: buildReminderEmail,
    requireZeroQuotes: true, // 既に作成済みのユーザーには配信しない
  },
  {
    day: 5,
    key: "educate",
    subject: "【ケンミツ】改正建設業法 2025、3 分で要点だけ",
    html: buildEducateEmail,
    requireZeroQuotes: false,
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
    return NextResponse.json(
      { error: "Service role missing" },
      { status: 503 },
    );
  }

  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  const { apiKey, from } = getResendConfig();
  const resend = new Resend(apiKey);

  // 直近 8 日以内に登録した Free ユーザーを取得
  const eightDaysAgo = new Date(
    Date.now() - 8 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, plan, created_at, drip_sent, stripe_customer_id")
    .eq("plan", "free")
    .is("stripe_customer_id", null) // 一度も課金していないユーザーのみ
    .gte("created_at", eightDaysAgo);

  if (!users || users.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const origin = new URL(request.url).origin;
  let sentCount = 0;

  for (const user of users) {
    const createdAt = new Date(user.created_at).getTime();
    const daysSinceSignup = Math.floor(
      (Date.now() - createdAt) / (24 * 60 * 60 * 1000),
    );
    const dripSent: Record<string, boolean> =
      (user.drip_sent as Record<string, boolean>) ?? {};

    // 配信停止済みフラグ（すべて true）は一括で除外
    if (dripSent.__unsubscribed__) continue;

    const unsubscribeUrl = buildUnsubscribeUrl(origin, user.email);

    for (const step of DRIP_STEPS) {
      if (daysSinceSignup < step.day) continue;
      if (dripSent[step.key]) continue;

      // requireZeroQuotes 条件: 見積書を 1 通でも作成していたら配信しない
      if (step.requireZeroQuotes) {
        const { count } = await supabase
          .from("construction_quotes")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .is("deleted_at", null);
        if ((count ?? 0) > 0) {
          // 「もう作成済みだから配信しない」ことを記録（再度判定しないように）
          dripSent[step.key] = true;
          await supabase
            .from("profiles")
            .update({ drip_sent: dripSent })
            .eq("id", user.id);
          continue;
        }
      }

      try {
        await resend.emails.send({
          from,
          to: user.email,
          subject: step.subject,
          html: step.html(unsubscribeUrl),
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

  return NextResponse.json({ sent: sentCount });
}

// --- メールテンプレート ---

function emailWrapper(content: string, unsubscribeUrl: string): string {
  return `
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #1E40AF;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>
  ${content}
  ${mailFooterHtml(unsubscribeUrl)}
</div>`;
}

function ctaButton(text: string, url: string): string {
  return `
<div style="text-align: center; margin: 24px 0;">
  <a href="${url}" style="display: inline-block; background-color: #F59E0B; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
    ${text}
  </a>
</div>`;
}

/** Day 0: ようこそ（ツール導入） */
function buildWelcomeEmail(unsubscribeUrl: string): string {
  return emailWrapper(
    `
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">ご登録ありがとうございます</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      ケンミツへようこそ！<br>
      無料プランで、見積書の作成・PDF 出力・クラウド保存がすべて無制限でご利用いただけます。
    </p>
    <ul style="font-size: 14px; line-height: 2; padding-left: 20px; margin-bottom: 16px;">
      <li>見積書の作成・PDF 出力（無制限）</li>
      <li>クラウド保存・再編集（無制限）</li>
      <li>8 工種のプリセット・諸経費自動計算</li>
      <li>3 階層見積（中項目対応）</li>
    </ul>
    <p style="font-size: 14px; line-height: 1.8;">
      まずは 1 通、見積書を作成してみてください。工種プリセットでサクッと完成します。
    </p>
    ${ctaButton("見積書を作成する →", "https://mitsumori-maker.com/construction/new")}
  `,
    unsubscribeUrl,
  );
}

/** Day 2: 作成リマインド（見積書 0 通のユーザーのみ） */
function buildReminderEmail(unsubscribeUrl: string): string {
  return emailWrapper(
    `
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">最初の見積書、まだですか？</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      ケンミツにご登録いただきありがとうございます。
    </p>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      工種プリセット（電気・水道・内装・土木・外構・大工・左官・鳶足場の 8 種類）を 1 タップで読み込めば、代表的な明細 5 項目が自動で入ります。発注者名・工事名・期間を埋めるだけで見積書が完成します。
    </p>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      作成した見積書は無制限にクラウド保存・再編集・複製できます。1 通作っておけば、似た案件は次から数十秒で出せるようになります。
    </p>
    ${ctaButton("見積書を作成する →", "https://mitsumori-maker.com/construction/new")}
    <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 16px;">
      使い方が分からない時は <a href="https://mitsumori-maker.com/construction/how-to" style="color: #1E40AF;">使い方ガイド</a> もご参照ください。
    </p>
  `,
    unsubscribeUrl,
  );
}

/** Day 5: 改正建設業法 2025 の教育（売り込みゼロ） */
function buildEducateEmail(unsubscribeUrl: string): string {
  return emailWrapper(
    `
    <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">改正建設業法 2025、3 分で要点だけ</h1>
    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      2025 年 12 月 1 日に改正建設業法が全面施行されました。中小建設業者・一人親方を含む、すべての建設業者が対象です。<strong>見積書の書き方が大きく変わっている</strong>ので、要点をかいつまんでご案内します。
    </p>

    <div style="background: #f9fafb; border-left: 4px solid #1E40AF; border-radius: 4px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">変更点 1: 労務費の内訳明示が努力義務化</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.7;">
        「工事一式 ¥◯◯」のような書き方ではなく、職種ごとに「誰が、どれだけ、いくらで働くか」が読み取れる粒度の記載が求められます。
      </p>
    </div>

    <div style="background: #f9fafb; border-left: 4px solid #1E40AF; border-radius: 4px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">変更点 2: 「一式」表記の適正化</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.7;">
        500 万円超の工事・公共工事・元請から内訳要求があった場合は「一式」では受理されません。可能な限り内訳展開が推奨されます。
      </p>
    </div>

    <div style="background: #f9fafb; border-left: 4px solid #1E40AF; border-radius: 4px; padding: 16px; margin-bottom: 16px;">
      <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">変更点 3: 法定福利費の独立計上</p>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.7;">
        労務費に対して約 20%（健保・厚年・雇用・労災等の事業主負担分）を独立行で明示することが推奨されます。
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      違反は監督官庁の指示処分・営業停止のリスクがあります。元請からの差し戻し・取引縮小にも繋がるため、対応を後回しにしない方が無難です。
    </p>

    <p style="font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      詳しい解説は以下のガイド記事をご覧ください。読了 5 分です。
    </p>

    ${ctaButton("改正建設業法2025【完全ガイド】を読む →", "https://mitsumori-maker.com/construction/guide/kaisei-kensetsu-2025")}

    <p style="font-size: 12px; color: #6b7280; line-height: 1.7; margin-top: 16px;">
      自社の対応状況を確認したい方は <a href="https://mitsumori-maker.com/construction/checklist" style="color: #1E40AF;">改正建設業法 2025 対応チェックリスト（30 項目）</a> もどうぞ。
    </p>
  `,
    unsubscribeUrl,
  );
}
