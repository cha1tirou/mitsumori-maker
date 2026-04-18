import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { fetchAdminStats } from "@/lib/supabase/admin-queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const stats = await fetchAdminStats();

  const totalUsers = stats.users.total;
  const paidUsers = stats.users.paid;
  const cvr = totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : "0";
  const mrr = stats.revenue.mrr;

  const text = [
    "📊 *ケンミツ 週次レポート*",
    "",
    `👤 ユーザー: ${totalUsers}名（今週 +${stats.users.thisWeek}）`,
    `💰 有料ユーザー: ${paidUsers}名`,
    `📈 CVR: ${cvr}%`,
    `💵 MRR: ¥${mrr.toLocaleString()}`,
    `📝 見積書: ${stats.quotes.total}通（今週 +${stats.quotes.thisWeek}）`,
    `📧 メルマガ: ${stats.subscribers.total}名`,
    `🔄 Churn Rate(30d): ${stats.revenue.churnRate30d}%（${stats.revenue.churnCount30d}名解約）`,
    `📄 平均見積数/ユーザー: ${stats.revenue.avgQuotesPerUser}`,
    "",
    `🔗 管理画面: https://mitsumori-maker.com/construction/admin`,
  ].join("\n");

  // Slack送信
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackUrl) {
    await fetch(slackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch(() => {});
  }

  // メール送信（Resend設定済みの場合）
  const adminEmail = process.env.ADMIN_EMAILS?.split(",")[0]?.trim();
  if (adminEmail && process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: adminEmail,
        subject: `【ケンミツ】週次レポート — ユーザー${totalUsers}名 / MRR ¥${mrr.toLocaleString()}`,
        text: text.replace(/\*/g, ""),
      });
    } catch {
      // メール送信失敗してもSlack送信は完了しているのでOK
    }
  }

  return NextResponse.json({ sent: true, text });
}
