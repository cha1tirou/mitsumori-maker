import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  title: "無料登録｜建設業の見積書を30秒で作成｜ケンミツ",
  description:
    "建設業の見積書を 30 秒で作成。メールアドレスだけで無料登録、何枚でも作成・PDF ダウンロード・クラウド保存ができます。クレジットカード登録不要。",
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
