import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const runtime = "nodejs";

const CHURN_REASON_LABELS: Record<string, string> = {
  price: "料金が高い",
  not_using: "使わなくなった",
  switched: "他のツールに乗り換えた",
  missing_feature: "欲しい機能がない",
  other: "その他",
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json(
      { error: "フィードバック内容が入力されていません" },
      { status: 400 }
    );
  }
  if (body.message.length > 5000) {
    return NextResponse.json(
      { error: "5000字以内で入力してください" },
      { status: 400 }
    );
  }

  let userEmail: string | null = null;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  }

  const category: string = body.category ?? "general";
  const isChurn = category === "churn";
  const reasonLabel = isChurn
    ? CHURN_REASON_LABELS[body.message.replace(/^解約理由:\s*/, "")] ??
      body.message.replace(/^解約理由:\s*/, "")
    : null;

  const subject = isChurn
    ? `【ケンミツ】解約理由: ${reasonLabel ?? "不明"}（${userEmail ?? "匿名"}）`
    : `【ケンミツ】βフィードバック: ${category}（${userEmail ?? "匿名"}）`;

  const bodyText = [
    isChurn ? "📉 Solo プラン解約理由が届きました" : "📝 βフィードバックが届きました",
    "",
    `From: ${userEmail ?? "匿名（未ログイン）"}`,
    `Category: ${category}`,
    ...(reasonLabel ? [`解約理由: ${reasonLabel}`] : []),
    "",
    "内容:",
    body.message,
    "",
    `管理画面: https://mitsumori-maker.com/construction/admin`,
  ].join("\n");

  // Slack 送信（設定済みの場合）
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackUrl) {
    try {
      await fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: bodyText }),
      });
    } catch {
      // Slack失敗してもメール送信に進む
    }
  }

  // メール送信（Resend + ADMIN_EMAILS 設定済みの場合）
  const adminEmails = process.env.ADMIN_EMAILS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (
    adminEmails &&
    adminEmails.length > 0 &&
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL
  ) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: adminEmails,
        subject,
        text: bodyText,
      });
    } catch {
      // メール送信失敗しても成功扱い
    }
  }

  return NextResponse.json({ ok: true });
}
