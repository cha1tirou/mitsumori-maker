import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import { HardHat } from "lucide-react";
import SignOutButton from "@/components/construction/SignOutButton";
import PriceMasterManager from "@/components/construction/mypage/PriceMasterManager";
import MasterLockedView from "@/components/construction/mypage/MasterLockedView";
import AccountLabel from "@/components/construction/mypage/AccountLabel";

export const metadata: Metadata = {
  title: "単価マスタ | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PriceMasterPage() {
  if (!isSupabaseConfigured()) {
    redirect("/construction/mypage");
  }
  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/mypage/price-master");
  }

  const plan = profile?.plan ?? "free";
  const isPaid =
    (plan === "solo" || plan === "team") &&
    (profile?.subscription_status === "active" ||
      profile?.subscription_status === "trialing");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link
            href="/construction/mypage"
            className="flex items-center gap-2 text-sm font-bold text-gray-900 whitespace-nowrap min-w-0"
          >
            <HardHat
              className="w-5 h-5 text-kenmitsu-navy shrink-0"
              strokeWidth={2.25}
            />
            <span>ケンミツ</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-600 min-w-0">
            <AccountLabel
              email={user.email ?? ""}
              plan={plan}
              companyInfo={profile?.company_info ?? null}
            />
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {isPaid ? (
          <PriceMasterManager />
        ) : (
          <>
            <Link
              href="/construction/mypage"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-5"
            >
              ← マイページに戻る
            </Link>
            <MasterLockedView
              featureTitle="単価マスタ"
              featureDescription="よく使う品目を登録しておけば、見積書の明細作成時にワンクリックで挿入できます。労務費・材料費・外注費・その他経費の 4 区分に対応。"
              benefits={[
                "品目を最大 500 件まで登録（労務費・材料費・外注費・その他経費）",
                "費目分類付きなので改正建設業法の費目必須に即対応",
                "原価単価を登録すれば粗利分析も可能",
                "工種タグで検索・絞り込み",
                "改正建設業法のルールに沿った見積書など有料プラン全機能も利用可",
              ]}
            />
          </>
        )}
      </main>
    </div>
  );
}
