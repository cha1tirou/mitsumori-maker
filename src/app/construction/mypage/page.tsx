import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  getCurrentUserProfile,
  getRecentQuotes,
  getCurrentMonthQuoteCount,
} from "@/lib/supabase/queries";
import {
  HardHat,
  CheckCircle2,
  Crown,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import PortalButton from "@/components/construction/PortalButton";
import SignOutButton from "@/components/construction/SignOutButton";
import QuoteListItem from "@/components/construction/QuoteListItem";
import ReferralCard from "@/components/construction/ReferralCard";
import { FREE_PLAN_MONTHLY_LIMIT } from "@/lib/paywall";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <HardHat className="w-10 h-10 text-green-700 mx-auto mb-4" strokeWidth={2} />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            マイページは準備中です
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            アカウント機能は現在Supabase連携の設定待ちです。もうしばらくお待ちください。
          </p>
          <Link
            href="/construction"
            className="inline-block bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-6 py-2.5 rounded-lg"
          >
            建設業向けトップに戻る
          </Link>
        </div>
      </div>
    );
  }

  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/mypage");
  }

  const [quotes, usedThisMonth] = await Promise.all([
    getRecentQuotes(user.id, 20),
    getCurrentMonthQuoteCount(user.id),
  ]);

  const plan = profile?.plan ?? "free";
  const planLabel = plan === "solo" ? "Solo" : plan === "team" ? "Team" : "Free";
  const remaining =
    plan === "free" ? Math.max(0, FREE_PLAN_MONTHLY_LIMIT - usedThisMonth) : "無制限";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/construction"
            className="flex items-center gap-2 text-sm font-bold text-gray-900"
          >
            <HardHat className="w-5 h-5 text-green-700" strokeWidth={2.25} />
            見積書メーカー <span className="text-green-700">for 建設業</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-900">マイページ</h1>

        {/* プラン状況 */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {plan === "free" ? (
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-500" strokeWidth={2} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" strokeWidth={2.25} />
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">現在のプラン</p>
                <p className="text-lg font-bold text-gray-900">{planLabel}</p>
              </div>
            </div>
            {profile?.subscription_status && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  profile.subscription_status === "active" ||
                  profile.subscription_status === "trialing"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {profile.subscription_status.toUpperCase()}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Stat
              label="今月の作成数"
              value={`${usedThisMonth} 通`}
              sub={plan === "free" ? `残り ${remaining} 通` : "無制限"}
            />
            <Stat
              label="次回更新日"
              value={
                profile?.current_period_end
                  ? new Date(profile.current_period_end).toLocaleDateString("ja-JP")
                  : "—"
              }
              sub={plan === "free" ? "Freeプランは更新なし" : undefined}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {plan === "free" ? (
              <Link
                href="/construction#pricing"
                className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                <Crown className="w-4 h-4" strokeWidth={2.25} />
                Soloプランにアップグレード
              </Link>
            ) : (
              <PortalButton />
            )}
            <Link
              href="/construction/new"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              新しい見積書を作成
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.25} />
            </Link>
          </div>
        </section>

        {/* 見積履歴 */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">見積履歴</h2>
            <span className="text-xs text-gray-500">
              {plan === "free"
                ? "履歴保存はSoloプラン以上で利用可能"
                : `${quotes.length} 件表示中`}
            </span>
          </div>

          {plan === "free" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700 mb-4 flex items-start gap-2">
              <Crown className="w-4 h-4 text-green-700 shrink-0 mt-0.5" strokeWidth={2.25} />
              <span>
                Soloプランにアップグレードすると、作成した見積書をすべてクラウドに保存し、いつでも再編集・複製できます。
              </span>
            </div>
          )}

          {quotes.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500">
              まだ見積書がありません。
              <Link
                href="/construction/new"
                className="text-green-700 hover:underline ml-1"
              >
                最初の見積書を作成する →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {quotes.map((q) => (
                <QuoteListItem key={q.id} quote={q} />
              ))}
            </ul>
          )}
        </section>

        {/* 紹介プログラム */}
        <ReferralCard />

        <section className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-700" strokeWidth={2.25} />
          <p className="text-xs text-gray-600 leading-relaxed">
            ご請求・ご解約の履歴は
            {plan === "free" ? "ご契約後に" : " Stripe カスタマーポータルにて"}
            ご確認いただけます。カスタマーポータルからはいつでもワンクリックで解約可能です。
          </p>
        </section>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-[11px] text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      {sub && <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}
