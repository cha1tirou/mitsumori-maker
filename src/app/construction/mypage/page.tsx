import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  getCurrentUserProfile,
  getRecentQuotes,
} from "@/lib/supabase/queries";
import {
  HardHat,
  CheckCircle2,
  Crown,
  FileText,
  ArrowRight,
  Receipt,
} from "lucide-react";
import PortalButton from "@/components/construction/PortalButton";
import SignOutButton from "@/components/construction/SignOutButton";
import QuoteList from "@/components/construction/QuoteList";
import FeedbackCard from "@/components/construction/FeedbackCard";
import AccountSettings from "@/components/construction/AccountSettings";
import MasterHubCard from "@/components/construction/mypage/MasterHubCard";
import AccountLabel from "@/components/construction/mypage/AccountLabel";
import CheckoutPendingBanner from "@/components/construction/mypage/CheckoutPendingBanner";

export const metadata: Metadata = {
  title: "マイページ | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const checkoutResult = params.checkout as string | undefined;
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <HardHat className="w-10 h-10 text-kenmitsu-navy mx-auto mb-4" strokeWidth={2} />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            マイページは準備中です
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            アカウント機能は現在Supabase連携の設定待ちです。もうしばらくお待ちください。
          </p>
          <Link
            href="/construction"
            className="inline-block bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold px-6 py-2.5 rounded-lg"
          >
            ケンミツトップに戻る
          </Link>
        </div>
      </div>
    );
  }

  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/mypage");
  }

  const quotes = await getRecentQuotes(user.id, 100);

  const plan = profile?.plan ?? "free";
  const planLabel =
    plan === "solo" ? "Solo" : plan === "team" ? "Team" : "Free";
  const isPaid =
    (plan === "solo" || plan === "team") &&
    (profile?.subscription_status === "active" ||
      profile?.subscription_status === "trialing");
  const totalQuotes = quotes.length;
  const companyRegistered = Boolean(
    profile?.company_info &&
      typeof profile.company_info === "object" &&
      Object.keys(profile.company_info).length > 0
  );
  const customerCount = Array.isArray(profile?.customer_master)
    ? profile.customer_master.length
    : 0;
  const priceCount = Array.isArray(profile?.price_master)
    ? profile.price_master.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link
            href="/construction/mypage"
            className="flex items-center gap-2 text-sm font-bold text-gray-900 whitespace-nowrap min-w-0"
          >
            <HardHat
              className="w-5 h-5 text-kenmitsu-navy shrink-0"
              strokeWidth={2.25}
            />
            <span>
              ケンミツ
              <span className="text-kenmitsu-navy hidden sm:inline">
                {" "}
                | 建設業の見積書
              </span>
            </span>
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

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-900">マイページ</h1>

        {/* チェックアウト結果 */}
        {checkoutResult === "success" && isPaid && (
          <div className="bg-kenmitsu-okBg border border-kenmitsu-ok/30 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-kenmitsu-ok shrink-0 mt-0.5" strokeWidth={2.25} />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">
                プランのアップグレードが完了しました
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                有料プランの全機能をご利用いただけます。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/construction/new"
                  className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  続けて見積書を作成する
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/construction/mypage/receipt"
                  className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-white text-gray-700 text-xs font-bold px-4 py-2 rounded-lg"
                >
                  領収書の受け取り方
                </Link>
              </div>
            </div>
          </div>
        )}
        {checkoutResult === "success" && !isPaid && <CheckoutPendingBanner />}
        {checkoutResult === "canceled" && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
              strokeWidth={2.25}
            />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                チェックアウトがキャンセルされました
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                いつでも再度お申し込みいただけます。料金やプラン内容で気になる点がございましたら、お気軽にお問い合わせください。
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/construction#pricing"
                  className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  もう一度 Solo を検討する
                </Link>
                <Link
                  href="/construction/contact"
                  className="inline-flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg"
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== 作業エリア ===== */}

        {/* ヒーロー CTA（常時表示）: ツールの本質アクション */}
        <section className="bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-kenmitsu-orange flex items-center justify-center shrink-0">
              <HardHat className="w-6 h-6 text-white" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-bold mb-1">
                {quotes.length === 0
                  ? "ようこそ、ケンミツへ！"
                  : "見積書を作成"}
              </h2>
              <p className="text-xs md:text-sm text-kenmitsu-navy100 leading-relaxed">
                {quotes.length === 0
                  ? "まずは1通作成してみましょう。工種プリセットで数分で完成します。"
                  : "改正建設業法2025対応・工種プリセット・建設業法チェッカー搭載。"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/construction/new"
              className="inline-flex items-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white font-bold text-base px-7 py-3.5 rounded-lg shadow-md transition-colors"
            >
              新しい見積書を作成
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>
            {quotes.length === 0 && (
              <Link
                href="/construction/how-to"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-bold text-sm px-5 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                使い方を見る
              </Link>
            )}
          </div>
        </section>

        {/* 見積履歴 */}
        <QuoteList
          quotes={quotes as import("@/lib/supabase/types").ConstructionQuoteRow[]}
          plan={plan}
        />

        {/* マスタ管理（見積書作成の事前準備） */}
        <MasterHubCard
          isPaid={isPaid}
          companyRegistered={companyRegistered}
          customerCount={customerCount}
          priceCount={priceCount}
        />

        {/* ===== アカウント管理エリアの区切り ===== */}
        <div className="pt-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              アカウント・設定
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        {/* プラン情報 */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {plan === "free" ? (
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-500" strokeWidth={2} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy flex items-center justify-center">
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
                    ? "bg-kenmitsu-okBg text-kenmitsu-ok border border-kenmitsu-ok/30"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {profile.subscription_status.toUpperCase()}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Stat
              label="作成済み見積書"
              value={`${totalQuotes} 通`}
              sub={plan === "free" ? "保存数の上限なし" : "無制限"}
            />
            <Stat
              label="次回更新日"
              value={
                profile?.current_period_end
                  ? new Date(profile.current_period_end).toLocaleDateString(
                      "ja-JP",
                    )
                  : "—"
              }
              sub={plan === "free" ? "Freeプランは更新なし" : undefined}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {plan === "free" ? (
              <Link
                href="/construction#solo-upgrade"
                className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                <Crown className="w-4 h-4" strokeWidth={2.25} />
                有料プランにアップグレード
              </Link>
            ) : (
              <PortalButton quotesCount={quotes.length} />
            )}
            <Link
              href="/construction/mypage/receipt"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <Receipt className="w-4 h-4" strokeWidth={2.25} />
              領収書の発行方法
            </Link>
          </div>

          {plan !== "free" && (
            <p className="mt-4 text-[11px] text-gray-500 leading-relaxed flex items-start gap-1.5">
              <CheckCircle2
                className="w-3.5 h-3.5 text-kenmitsu-ok shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              ご請求・ご解約の履歴は Stripe カスタマーポータルからご確認いただけます。いつでもワンクリックで解約可能です。
            </p>
          )}
        </section>

        {/* アカウント設定 */}
        <AccountSettings email={user.email ?? ""} />

        {/* βフィードバック / お問い合わせ誘導 */}
        <FeedbackCard />
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
