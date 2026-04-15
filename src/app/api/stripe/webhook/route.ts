import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { getStripe } from "@/lib/stripe/server";
import {
  isStripeConfigured,
  getStripeWebhookSecret,
  findPlanByPriceId,
} from "@/lib/stripe/env";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

// Webhook はRawボディ必要
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret()
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "invalid";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Service-role 相当のアクセスではなく、RLS を満たすため直接 adminClient は使わない。
  // webhook なのでユーザーコンテキストが無い → service_role を使うしかない。
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("SUPABASE_SERVICE_ROLE_KEY 未設定。Webhook を処理できません。");
    return NextResponse.json(
      { error: "Service role key missing" },
      { status: 500 }
    );
  }

  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id || session.client_reference_id;
        if (!userId || !session.customer) break;

        await supabase
          .from("profiles")
          .update({
            stripe_customer_id:
              typeof session.customer === "string"
                ? session.customer
                : session.customer.id,
          })
          .eq("id", userId);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.user_id;
        const priceId = sub.items.data[0]?.price.id;
        const planInfo = priceId ? findPlanByPriceId(priceId) : null;

        if (userId) {
          await supabase
            .from("profiles")
            .update({
              stripe_subscription_id: sub.id,
              subscription_status: sub.status,
              plan:
                sub.status === "active" || sub.status === "trialing"
                  ? planInfo?.plan || "free"
                  : "free",
              current_period_end: currentPeriodEnd(sub),
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.user_id;
        if (userId) {
          await supabase
            .from("profiles")
            .update({
              subscription_status: "canceled",
              plan: "free",
            })
            .eq("id", userId);
        }
        break;
      }

      default:
        // 他のイベントは無視
        break;
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Webhook 処理エラー:", err);
    await notifySlack(
      `⚠️ Stripe Webhook 処理失敗: ${event.type}\nエラー: ${errorMsg}\nevent ID: ${event.id}`
    );
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function notifySlack(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    // Slackエラーで本体処理を止めない
  }
}

function currentPeriodEnd(sub: Stripe.Subscription): string | null {
  const item = sub.items.data[0];
  // v22 API は current_period_end をアイテムに持たせる構成。フォールバックも対応
  const raw = item?.current_period_end ?? (sub as unknown as { current_period_end?: number }).current_period_end;
  if (typeof raw !== "number") return null;
  return new Date(raw * 1000).toISOString();
}
