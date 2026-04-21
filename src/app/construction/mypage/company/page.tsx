import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import { HardHat } from "lucide-react";
import SignOutButton from "@/components/construction/SignOutButton";
import CompanyInfoEditor from "@/components/construction/mypage/CompanyInfoEditor";

export const metadata: Metadata = {
  title: "自社情報 | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CompanyMasterPage() {
  if (!isSupabaseConfigured()) {
    redirect("/construction/mypage");
  }
  const { user } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/mypage/company");
  }

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
            <span
              className="hidden sm:inline truncate max-w-[180px]"
              title={user.email}
            >
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <CompanyInfoEditor />
      </main>
    </div>
  );
}
