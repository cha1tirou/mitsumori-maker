import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const runtime = "nodejs";

const VALID_REASON_CODES = [
  "price",
  "not_using",
  "switched",
  "missing_feature",
  "other",
] as const;
type ReasonCode = (typeof VALID_REASON_CODES)[number];

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "サービス未設定" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || body.category !== "churn") {
    return NextResponse.json({ error: "不正なリクエスト" }, { status: 400 });
  }

  const reasonCode = body.reasonCode;
  if (
    typeof reasonCode !== "string" ||
    !VALID_REASON_CODES.includes(reasonCode as ReasonCode)
  ) {
    return NextResponse.json(
      { error: "解約理由が不正です" },
      { status: 400 }
    );
  }

  const message =
    typeof body.message === "string" && body.message.length <= 500
      ? body.message
      : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { error } = await supabase.from("churn_feedback").insert({
    user_id: user.id,
    email: user.email ?? null,
    reason_code: reasonCode,
    message,
  });

  if (error) {
    console.error("churn_feedback insert failed:", error);
    return NextResponse.json(
      { error: "保存に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
