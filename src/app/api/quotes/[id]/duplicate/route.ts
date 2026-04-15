import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ConstructionQuoteData } from "@/types/construction";
import { FREE_PLAN_MONTHLY_LIMIT } from "@/lib/paywall";

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "準備中" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // オリジナル取得（削除済みは除外）
  const { data: original } = await supabase
    .from("construction_quotes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .maybeSingle();

  if (!original) {
    return NextResponse.json({ error: "見積書が見つかりません" }, { status: 404 });
  }

  // プラン取得
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle<{ plan: "free" | "solo" | "team" }>();
  const plan = profile?.plan ?? "free";

  // フリープラン月制限チェック
  if (plan === "free") {
    const { data: countRow } = await supabase
      .from("current_month_quote_counts")
      .select("count")
      .eq("user_id", user.id)
      .maybeSingle<{ count: number }>();
    const count = countRow?.count ?? 0;
    if (count >= FREE_PLAN_MONTHLY_LIMIT) {
      return NextResponse.json(
        {
          error: "monthly_limit_exceeded",
          message: `無料プランでは月${FREE_PLAN_MONTHLY_LIMIT}通までしか保存できません。`,
        },
        { status: 402 }
      );
    }
  }

  const originalData = original.data as ConstructionQuoteData;
  const today = new Date().toISOString().split("T")[0];
  const newQuoteNumber = originalData.quoteNumber
    ? `${originalData.quoteNumber}-copy`
    : "";

  const { data: created, error } = await supabase
    .from("construction_quotes")
    .insert({
      user_id: user.id,
      quote_number: newQuoteNumber || null,
      client_name: original.client_name,
      subject: original.subject ? `${original.subject}（複製）` : null,
      total: original.total,
      data: {
        ...originalData,
        quoteNumber: newQuoteNumber,
        subject: originalData.subject
          ? `${originalData.subject}（複製）`
          : "",
        quoteDate: today,
      },
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ quote: created });
}
