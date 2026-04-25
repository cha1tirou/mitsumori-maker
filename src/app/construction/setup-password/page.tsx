import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import SetupPasswordForm from "./SetupPasswordForm";

export const metadata: Metadata = {
  title: "パスワード設定 | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SetupPasswordPage() {
  if (!isSupabaseConfigured()) {
    redirect("/construction/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // 未ログイン（OTP リンク未経由）→ /start に戻す
    redirect("/construction/start");
  }

  // 既にパスワード設定済みなら直接マイページへ
  const passwordSet = (user.user_metadata as { password_set?: boolean } | null)
    ?.password_set;
  if (passwordSet === true) {
    redirect("/construction/mypage");
  }

  return <SetupPasswordForm email={user.email ?? ""} />;
}
