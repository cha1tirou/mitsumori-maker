import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isResendConfigured, getResendConfig } from "@/lib/email";

export const runtime = "nodejs";

const HOURLY_EMAIL_LIMIT = 10;
const MAX_BODY_SIZE = 15 * 1024 * 1024; // 15MB（Resend制限 20MBより小さく）

function isValidEmail(s: unknown): s is string {
  return (
    typeof s === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) &&
    s.length <= 320
  );
}

export async function POST(request: NextRequest) {
  if (!isResendConfigured()) {
    return NextResponse.json(
      {
        error: "メール送信機能は現在準備中です。管理者に連絡してください。",
      },
      { status: 503 }
    );
  }

  // Supabase必須：認証なしでは絶対にスパム踏み台化させない
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "認証基盤の設定が必要です。現在準備中。" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // プラン判定：メール送信は Solo 以上の機能
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, subscription_status")
    .eq("id", user.id)
    .maybeSingle<{ plan: string; subscription_status: string | null }>();

  const planOk = profile?.plan === "solo" || profile?.plan === "team";
  const statusOk =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";
  if (!planOk || !statusOk) {
    return NextResponse.json(
      {
        error: "plan_required",
        message: "メール送信機能は Solo プラン以上でご利用いただけます。",
      },
      { status: 402 }
    );
  }

  // レート制限：直近1時間で10通まで
  const { data: recentRow } = await supabase
    .from("recent_email_send_counts")
    .select("count")
    .eq("user_id", user.id)
    .maybeSingle<{ count: number }>();
  const recent = recentRow?.count ?? 0;
  if (recent >= HOURLY_EMAIL_LIMIT) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: `1時間あたりの送信上限（${HOURLY_EMAIL_LIMIT}通）に達しました。しばらくお待ちください。`,
      },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!isValidEmail(body.to)) {
    return NextResponse.json(
      { error: "宛先メールアドレスが不正です。" },
      { status: 400 }
    );
  }
  if (body.replyTo && !isValidEmail(body.replyTo)) {
    return NextResponse.json(
      { error: "返信先メールアドレスが不正です。" },
      { status: 400 }
    );
  }
  if (!body.subject || typeof body.subject !== "string" || body.subject.length > 200) {
    return NextResponse.json(
      { error: "件名は200文字以内で入力してください。" },
      { status: 400 }
    );
  }
  if (!body.pdfBase64 || typeof body.pdfBase64 !== "string") {
    return NextResponse.json(
      { error: "PDF データがありません。" },
      { status: 400 }
    );
  }
  const pdfSize = (body.pdfBase64.length * 3) / 4;
  if (pdfSize > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: "添付PDFが大きすぎます（15MB以下）。写真の数を減らしてください。" },
      { status: 413 }
    );
  }

  const { apiKey, from } = getResendConfig();
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: body.to,
      subject: body.subject,
      html: body.html || body.text || "",
      text: body.text,
      replyTo: body.replyTo,
      attachments: [
        {
          filename: body.fileName || "見積書.pdf",
          content: body.pdfBase64,
        },
      ],
    });
    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 502 }
      );
    }

    // 送信ログ記録（レート制限用）
    await supabase.from("email_send_logs").insert({
      user_id: user.id,
      recipient: body.to,
    });

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "送信に失敗しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
