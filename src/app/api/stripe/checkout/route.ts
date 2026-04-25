import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/server";
import { isStripeConfigured, planConfigs } from "@/lib/stripe/env";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "決済機能は現在準備中です。" },
      { status: 503 }
    );
  }

  const { plan, billing } = await request.json().catch(() => ({}));
  if (!plan || !["solo", "team"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (!billing || !["monthly", "yearly"].includes(billing)) {
    return NextResponse.json({ error: "Invalid billing" }, { status: 400 });
  }
  // Team プランは現在受付停止（機能未実装のため誇大広告リスク回避）
  if (plan === "team") {
    return NextResponse.json(
      {
        error: "team_not_available",
        message:
          "Team プランは現在準備中です。Solo プランでご利用ください。",
      },
      { status: 400 }
    );
  }

  const cfg = planConfigs.find((p) => p.plan === plan);
  const priceId =
    billing === "yearly" ? cfg?.stripeYearlyPriceId : cfg?.stripeMonthlyPriceId;
  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe Price ID が未設定です。" },
      { status: 500 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // 既存の Stripe Customer を取得
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  const stripe = getStripe();
  const origin = new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/construction/mypage?checkout=success`,
      cancel_url: `${origin}/construction/mypage?checkout=canceled`,
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, plan, billing },
      subscription_data: {
        metadata: { user_id: user.id, plan, billing },
      },
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe からチェックアウト URL を取得できませんでした。" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[stripe/checkout] session.create failed", {
      priceId,
      plan,
      billing,
      userId: user.id,
      message,
    });
    return NextResponse.json(
      {
        error: "stripe_session_failed",
        message: `Stripe セッション作成に失敗: ${message}`,
      },
      { status: 500 },
    );
  }
}
