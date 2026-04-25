import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  title: "無料登録｜改正建設業法2025対応 見積書 月¥980｜ケンミツ",
  description:
    "建設業の見積書を30秒で作成。改正建設業法2025対応版が月¥980で使える唯一のサービス。メールアドレスだけで無料登録、すぐに使えます。",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/start",
  },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function StartPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const redirectTo = params.redirect || "/construction/new";

  // 既ログインユーザーは登録画面に来ても直接ツール画面へ
  if (isSupabaseConfigured()) {
    const { user } = await getCurrentUserProfile();
    if (user) {
      redirect(redirectTo);
    }
  }

  return <StartForm redirectTo={redirectTo} />;
}
