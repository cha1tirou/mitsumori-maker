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

  // 有料サブスクが active な間はアカウント削除をブロック
  // 自動キャンセル経路は採用しない（Stripe API 失敗で課金継続するリスクを排除する設計）。
  // ユーザーは Stripe Customer Portal で先に解約する必要がある。
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_subscription_id, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  const ACTIVE_STATES = ["active", "trialing", "past_due", "unpaid"];
  if (
    profile?.stripe_subscription_id &&
    profile.subscription_status &&
    ACTIVE_STATES.includes(profile.subscription_status)
  ) {
    return NextResponse.json(
      {
        error: "subscription_active",
        message:
          "有料プランをご契約中のため、アカウントを削除できません。先にプラン管理画面から解約してください。",
      },
      { status: 409 },
    );
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
