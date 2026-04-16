import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/env";

export async function DELETE() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "認証機能は準備中です。" },
      { status: 503 }
    );
  }

  // ユーザー認証確認
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "ログインが必要です。" },
      { status: 401 }
    );
  }

  // service_role で管理者操作
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json(
      { error: "サービス設定が不完全です。" },
      { status: 503 }
    );
  }

  const { url } = getSupabaseEnv();
  const admin = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  // Stripe サブスクリプションがアクティブな場合はキャンセル
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_subscription_id, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profile?.stripe_subscription_id &&
    (profile.subscription_status === "active" ||
      profile.subscription_status === "trialing")
  ) {
    try {
      const { isStripeConfigured, getStripeSecretKey } = await import(
        "@/lib/stripe/env"
      );
      if (isStripeConfigured()) {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(getStripeSecretKey());
        await stripe.subscriptions.cancel(profile.stripe_subscription_id);
      }
    } catch {
      // Stripe キャンセル失敗してもアカウント削除は続行
    }
  }

  // auth.users を削除（CASCADE で profiles, quotes 等も消える）
  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);

  if (deleteError) {
    return NextResponse.json(
      { error: "アカウントの削除に失敗しました。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
