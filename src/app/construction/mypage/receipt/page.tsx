import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  HardHat,
  Receipt,
  Mail,
  FileText,
  HelpCircle,
  ArrowLeft,
  Crown,
  Lock,
} from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import SignOutButton from "@/components/construction/SignOutButton";
import AccountLabel from "@/components/construction/mypage/AccountLabel";
import OpenPortalButton from "@/components/construction/mypage/OpenPortalButton";

export const metadata: Metadata = {
  title: "領収書の発行方法 | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ReceiptHelpPage() {
  if (!isSupabaseConfigured()) {
    redirect("/construction/mypage");
  }
  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/mypage/receipt");
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

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <Link
          href="/construction/mypage"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.25} />
          マイページに戻る
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
              <Receipt
                className="w-5 h-5 text-kenmitsu-navy"
                strokeWidth={2.25}
              />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">
                領収書の発行方法
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">
                ケンミツ Solo プランの領収書は決済代行の Stripe から自動で発行されます
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 方法 1 */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold">
                  1
                </span>
                <h2 className="text-sm font-bold text-gray-900">
                  決済完了時に自動送信されるメール（一番かんたん）
                </h2>
              </div>
              <div className="pl-8 text-sm text-gray-700 leading-relaxed space-y-2">
                <p>
                  ¥980 の決済が完了すると、登録メールアドレス宛に
                  領収書 PDF が添付されたメールが自動で届きます。
                </p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 flex items-start gap-2">
                  <Mail
                    className="w-3.5 h-3.5 mt-0.5 shrink-0"
                    strokeWidth={2.25}
                  />
                  <div>
                    件名: <span className="font-mono">Your receipt from ケンミツ...</span>
                    <br />
                    差出人: Stripe 決済システム
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">
                  ※ 見当たらない場合は迷惑メールフォルダもご確認ください。
                </p>
              </div>
            </section>

            {/* 方法 2 */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold">
                  2
                </span>
                <h2 className="text-sm font-bold text-gray-900">
                  マイページからいつでも再取得
                </h2>
              </div>
              <div className="pl-8 text-sm text-gray-700 leading-relaxed space-y-3">
                <p>
                  過去のメールを削除してしまった場合や、毎月分をまとめて欲しい場合は、
                  下のボタンから「プラン管理画面」を開いて取得できます。
                </p>

                <ol className="list-decimal list-inside space-y-1.5 text-sm bg-kenmitsu-navy50/50 rounded-lg p-4">
                  <li>
                    下の「<strong>プラン管理画面を開く</strong>」ボタンをクリック（新しいタブで開きます）
                  </li>
                  <li>
                    下にスクロールして「<strong>請求履歴</strong>」セクションを探します
                  </li>
                  <li>
                    該当の日付の行をクリック
                  </li>
                  <li>
                    開いた詳細ページで「<strong>領収書</strong>」または「<strong>請求書</strong>」のリンクをクリック
                  </li>
                  <li>PDF がダウンロードされます</li>
                </ol>

                {isPaid ? (
                  <div className="pt-2">
                    <OpenPortalButton />
                  </div>
                ) : (
                  <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-xl p-4 flex items-start gap-3">
                    <Lock
                      className="w-5 h-5 text-kenmitsu-orange shrink-0 mt-0.5"
                      strokeWidth={2.25}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Solo プランご契約後にご利用いただけます
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        領収書の自動発行は Solo プラン（月¥980）の決済後からご利用可能です。
                        Free プランは無料のため領収書発行の対象外となります。
                      </p>
                      <Link
                        href="/construction#pricing"
                        className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                      >
                        <Crown className="w-3.5 h-3.5" strokeWidth={2.25} />
                        Solo プランの詳細を見る
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 領収書に記載される内容 */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <FileText
                  className="w-4 h-4 text-kenmitsu-navy"
                  strokeWidth={2.25}
                />
                <h2 className="text-sm font-bold text-gray-900">
                  領収書に記載される内容
                </h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs space-y-1.5 text-gray-700">
                <Row label="発行者" value="ケンミツ" />
                <Row
                  label="住所"
                  value="〒150-0021 東京都渋谷区恵比寿西2丁目4番8号 ウィンド恵比寿ビル8F"
                />
                <Row label="連絡先" value="kenmitsu.support@gmail.com" />
                <Row label="金額" value="¥980（月額・税込）" />
                <Row label="支払方法 / 支払日 / 領収書番号" value="毎回自動記録" />
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle
                  className="w-4 h-4 text-kenmitsu-navy"
                  strokeWidth={2.25}
                />
                <h2 className="text-sm font-bold text-gray-900">
                  よくある質問
                </h2>
              </div>
              <div className="space-y-3">
                <Faq
                  q="領収書メールが届きません"
                  a="迷惑メールフォルダをご確認ください。それでも見つからない場合は、方法 2 の「プラン管理画面」から再取得できます。"
                />
                <Faq
                  q="宛名を個人名から法人名（屋号）に変更したい"
                  a="プラン管理画面の「請求先情報」セクションで氏名・住所を変更できます。以降の領収書に新しい宛名が反映されます。過去分の宛名変更は個別にお問い合わせください。"
                />
                <Faq
                  q="適格請求書（インボイス）の登録番号（T+13桁）は記載されますか？"
                  a="現在は免税事業者として運営しているため、T から始まる登録番号は領収書に記載されません。取引先で仕入税額控除が必要な場合はあらかじめご確認ください。将来インボイス登録した際は随時ご案内します。"
                />
                <Faq
                  q="過去すべての領収書を一括でダウンロードできますか？"
                  a="はい。プラン管理画面の「請求履歴」に過去全件が時系列で表示されるので、個別に PDF を取得できます。一括 ZIP ダウンロードには対応していません。"
                />
                <Faq
                  q="消費税の内訳（税額）が記載されていません"
                  a="現在は税込 ¥980 として表示しており、内訳の税額欄は省略しています。取引先から内訳表示を求められた場合はお問い合わせください。"
                />
              </div>
            </section>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <p className="text-[11px] text-gray-500">
              このページで解決しない場合はお気軽にお問い合わせください
            </p>
            <Link
              href="/construction/contact"
              className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3">
      <span className="text-[11px] text-gray-500 font-bold sm:w-40 shrink-0">
        {label}
      </span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gray-200 rounded-lg overflow-hidden">
      <summary className="cursor-pointer list-none px-4 py-3 flex items-start gap-2 text-sm font-bold text-gray-900 hover:bg-gray-50">
        <span className="text-kenmitsu-navy shrink-0">Q.</span>
        <span className="flex-1">{q}</span>
        <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>
      <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
        <div className="flex items-start gap-2">
          <span className="text-kenmitsu-ok shrink-0">A.</span>
          <span>{a}</span>
        </div>
      </div>
    </details>
  );
}
