import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ConstructionQuoteData } from "@/types/construction";
import { calcConstructionTotals } from "@/lib/constructionCalc";
import { FREE_PLAN_MONTHLY_LIMIT, isInTrial } from "@/lib/paywall";
import type { Profile } from "@/lib/supabase/types";

// 金額上限（1兆円）とフィールド検証
const MAX_AMOUNT = 1_000_000_000_000;

function sanitizeData(data: ConstructionQuoteData): ConstructionQuoteData {
  return {
    ...data,
    sections: data.sections.map((s) => ({
      ...s,
      items: s.items.map((i) => ({
        ...i,
        quantity: Math.max(0, Math.min(MAX_AMOUNT, i.quantity || 0)),
        unitPrice: Math.max(0, Math.min(MAX_AMOUNT, i.unitPrice || 0)),
        costUnitPrice:
          typeof i.costUnitPrice === "number"
            ? Math.max(0, Math.min(MAX_AMOUNT, i.costUnitPrice))
            : undefined,
      })),
      subsections: (s.subsections ?? []).map((sub) => ({
        ...sub,
        items: sub.items.map((i) => ({
          ...i,
          quantity: Math.max(0, Math.min(MAX_AMOUNT, i.quantity || 0)),
          unitPrice: Math.max(0, Math.min(MAX_AMOUNT, i.unitPrice || 0)),
          costUnitPrice:
            typeof i.costUnitPrice === "number"
              ? Math.max(0, Math.min(MAX_AMOUNT, i.costUnitPrice))
              : undefined,
        })),
      })),
    })),
  };
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "保存機能は現在準備中です。" },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    data: ConstructionQuoteData;
    id?: string;
  } | null;

  if (!body?.data) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // プラン取得
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  const plan = profile?.plan ?? "free";
  const inTrial = isInTrial(profile);

  const sanitized = sanitizeData(body.data);
  const total = Math.min(MAX_AMOUNT, calcConstructionTotals(sanitized).total);

  if (body.id) {
    // 更新（ソフトデリート除外）
    const { data, error } = await supabase
      .from("construction_quotes")
      .update({
        quote_number: sanitized.quoteNumber || null,
        client_name: sanitized.clientName || null,
        subject: sanitized.subject || null,
        total,
        data: sanitized,
      })
      .eq("id", body.id)
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ quote: data });
  }

  // 新規作成時はフリープラン制限をチェック（トライアル中は制限なし）
  if (plan === "free" && !inTrial) {
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
          message: `無料プランでは月${FREE_PLAN_MONTHLY_LIMIT}通までしか保存できません。Soloプランで無制限にご利用いただけます。`,
        },
        { status: 402 }
      );
    }
  }

  const { data, error } = await supabase
    .from("construction_quotes")
    .insert({
      user_id: user.id,
      quote_number: sanitized.quoteNumber || null,
      client_name: sanitized.clientName || null,
      subject: sanitized.subject || null,
      total,
      data: sanitized,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ quote: data });
}

export async function DELETE(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "準備中" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id 必須" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // ソフトデリート：deleted_at を更新
  const { error } = await supabase
    .from("construction_quotes")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
