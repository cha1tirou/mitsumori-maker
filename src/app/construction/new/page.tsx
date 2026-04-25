import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import ConstructionEditor from "@/components/construction/ConstructionEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ConstructionNewPage() {
  if (!isSupabaseConfigured()) {
    // 開発環境で Supabase 未設定時のみ未ログインで描画する
    return <ConstructionEditor userEmail={null} plan="free" />;
  }

  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    redirect("/construction/start?redirect=/construction/new");
  }

  const userEmail = user.email ?? null;
  const plan = (profile?.plan ?? "free") as "free" | "solo" | "team";

  return <ConstructionEditor userEmail={userEmail} plan={plan} />;
}
