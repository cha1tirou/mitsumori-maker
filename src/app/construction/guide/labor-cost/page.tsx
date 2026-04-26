import type { Metadata } from "next";
import Link from "next/link";
import { HardHat } from "lucide-react";
import KenmitsuGuideJsonLd from "@/components/construction/KenmitsuGuideJsonLd";
import BackLink from "@/components/construction/BackLink";

export const metadata: Metadata = {
  title: "見積書の人件費（労務費）の書き方｜建設業の工数・単価の記載例 | ケンミツ",
  description:
    "建設業の見積書における人件費・労務費の書き方を解説。工数計算（人日・人月）・単価設定・職種別の記載例・改正建設業法 2025 に沿った内訳明示まで。",
  openGraph: {
    title:
      "見積書の人件費（労務費）の書き方｜建設業の工数・単価の記載例 | ケンミツ",
    description:
      "建設業の見積書の労務費の書き方を解説。工数計算・単価設定・職種別の記載例・改正建設業法 2025 対応まで。",
    url: "https://mitsumori-maker.com/construction/guide/labor-cost",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/guide/labor-cost",
  },
};

export default function LaborCostGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KenmitsuGuideJsonLd
        title="見積書の人件費（労務費）の書き方｜建設業の工数・単価の記載例"
        description="建設業の見積書の労務費の書き方を解説。工数計算・単価設定・職種別の記載例・改正建設業法 2025 対応まで。"
        slug="labor-cost"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2" aria-label="パンくずリスト">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <Link href="/construction/guide" className="hover:text-gray-700">
              ガイド
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">人件費（労務費）の書き方</span>
          </nav>
          <BackLink className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5">
            <HardHat
              className="w-4 h-4 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            ← 前のページに戻る
          </BackLink>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の人件費（労務費）の書き方｜建設業の工数・単価の記載例
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月26日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            建設業の見積書では、労務費（人件費）の記載が中核です。改正建設業法 2025 では「労務費の内訳明示」が努力義務化され、これまで「一式」でまとめていた業者も、職種・工数・単価を明示する必要が高まっています。本記事では、建設業の見積書における労務費の計算方法・単価設定・記載例を実務レベルで解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            建設業の労務費とは
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業における労務費とは、工事に従事する作業者・職人の作業コストを金額化したものです。材料費・外注費とは異なる「ヒトのコスト」で、以下が含まれます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>作業者の基本給・手当（事業主負担分の社会保険料は別途「法定福利費」として計上）</li>
            <li>技能レベル・職種に応じた単価差（とび職・大工・電気工事士など）</li>
            <li>現場管理者（現場監督）の管理工数</li>
            <li>残業・休日割増分</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書では、これらを「工数（作業量）× 単価」という形式で記載するのが一般的です。改正建設業法では、職種ごとに「誰が何日いくらで働くか」を読み取れる粒度が望ましいとされています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            工数の計算方法と単位
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業で最も使われる工数単位は「人日」と「人時」です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            人日（にんにち）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1人が1日（通常8時間）作業する量を「1人日」とします。建設業では最も標準的な単位で、たとえば3人の職人が5日間作業する場合は「15人日」です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            人時（にんじ）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1人が1時間作業する量を「1人時」とします。短時間の作業や緊急対応で使います。たとえば2人で3時間作業する場合は「6人時」です。
          </p>

          <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-lg p-4 mb-6">
            <p className="text-kenmitsu-navy900 text-sm font-semibold mb-1">
              単位の換算目安
            </p>
            <p className="text-kenmitsu-navy text-sm">
              1 人日 = 8 人時（標準的な 1 日 8 時間で計算）
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            単価の設定方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業の労務費単価は、以下のいずれかで設定します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 公共工事設計労務単価を参考にする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            国土交通省が毎年公表する「公共工事設計労務単価」が業界標準の指標です。職種ごとの日額単価（例: 普通作業員 ¥18,000、内装仕上工 ¥22,000、大工 ¥25,000、電気工事士 ¥25,000、とび工 ¥27,000 等、地域・年度で変動）が示され、公共工事だけでなく民間工事の目安としても広く使われます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 原価積み上げ方式
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            自社の作業者の月給・社会保険料・福利厚生費に利益率を加算して算出します。自社のコスト構造に基づくため、赤字を防ぎやすく根拠が明確です。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-700 text-sm font-mono">
              単価 = （月額給与 + 社会保険料 + 福利厚生費）÷ 月間稼働日数 × （1 + 利益率）
            </p>
            <p className="text-gray-500 text-xs mt-2">
              例: 月給 35 万 + 社保等 10 万 = 45 万 ÷ 20 日 × 1.3 = ¥29,250 / 人日
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            建設業の労務費 記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業の見積書では、職種ごとに人日数と単価を分けて記載することが推奨されます。改正建設業法 2025 にも沿った形になります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`【内装工事 見積書 記載例】

品目                    数量    単価       金額
──────────────────────────────────────────────
現場管理（現場監督）      3人日   ¥30,000   ¥90,000
内装仕上工               8人日   ¥22,000   ¥176,000
電気工事士               4人日   ¥25,000   ¥100,000
配管工                   3人日   ¥24,000   ¥72,000
普通作業員               6人日   ¥18,000   ¥108,000
──────────────────────────────────────────────
労務費 小計                                ¥546,000
法定福利費（労務費 × 20%）                  ¥109,200
材料費                   1式              ¥380,000
諸経費（現場管理費等）    1式               ¥46,000
──────────────────────────────────────────────
税抜合計                                  ¥1,081,200
消費税（10%）                              ¥108,120
合計（税込）                            ¥1,189,320`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            改正建設業法 2025 が求める記載粒度
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            改正建設業法では、労務費の内訳明示が努力義務化されました。これは
            「<strong>誰が、どれだけ、いくらで働いたか</strong>」が読み取れる粒度の記載を求めるものです。具体的には:
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>職種別に行を分ける（大工・電気・配管・とび など）</li>
            <li>「労務費」と「材料費」「外注費」「諸経費」を分けて記載</li>
            <li>法定福利費（労務費 × 約 20%）を独立項目として明示</li>
            <li>「一式」表記は避け、可能な限り内訳展開する</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            詳細は{" "}
            <Link
              href="/construction/guide/kaisei-kensetsu-2025"
              className="text-kenmitsu-navy hover:underline"
            >
              改正建設業法2025【完全ガイド】
            </Link>{" "}
            をご確認ください。法定福利費の計算方法は{" "}
            <Link
              href="/construction/guide/legal-welfare"
              className="text-kenmitsu-navy hover:underline"
            >
              法定福利費の計算方法と業界標準料率
            </Link>{" "}
            で詳しく解説しています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            労務費を見積書に記載するときの注意点
          </h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>工数の根拠を説明できるようにする</strong>:
              「なぜこの工数が必要なのか」を発注者に聞かれたときに説明できるよう、過去の類似案件データを準備しておきましょう。
            </li>
            <li>
              <strong>バッファの扱いを決める</strong>:
              天候・現場状況による工程遅延に備え、各工種に 10〜20% 程度のバッファを含めるか、別行で「予備工」として明示します。
            </li>
            <li>
              <strong>残業・休日割増の取扱い</strong>:
              夜間・休日工事が想定される場合は、別途割増単価を備考欄に明記します。
            </li>
            <li>
              <strong>消費税の取り扱い</strong>:
              労務費にも消費税がかかります。インボイス制度に対応し、税率ごとの金額を明記しましょう。
            </li>
            <li>
              <strong>下請発注の場合</strong>:
              一人親方・他社への外注は「外注費」として、自社作業者の労務費とは分けて記載します（改正建設業法上、混在は避けるべき）。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ケンミツの労務費 自動計算
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <Link
              href="/construction"
              className="text-kenmitsu-navy hover:underline font-bold"
            >
              ケンミツ
            </Link>
            の有料プランでは、明細で「労務費」費目を選んだ項目から、法定福利費を自動計算して内訳明示します。改正建設業法 2025 のルールに沿った見積書を、職種ごとに簡単に作成できます。
          </p>

          <div className="mt-12 bg-kenmitsu-navy900 rounded-xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              改正建設業法 2025 対応の見積書を、ケンミツで
            </h2>
            <p className="text-white/70 mb-4 text-sm">
              メアド登録だけで利用開始 / 有料プラン月¥1,980〜・労務費の内訳明示・法定福利費自動計算
            </p>
            <Link
              href="/construction/start"
              className="inline-block bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              ケンミツを無料で試す →
            </Link>
          </div>

          <div className="mt-10 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <p className="font-bold mb-2">関連ガイド</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/construction/guide/kaisei-kensetsu-2025"
                  className="text-kenmitsu-navy hover:underline"
                >
                  改正建設業法2025【完全ガイド】
                </Link>
              </li>
              <li>
                <Link
                  href="/construction/guide/legal-welfare"
                  className="text-kenmitsu-navy hover:underline"
                >
                  法定福利費の計算方法と業界標準料率
                </Link>
              </li>
              <li>
                <Link
                  href="/construction/guide/lump-sum"
                  className="text-kenmitsu-navy hover:underline"
                >
                  見積書の「一式」の書き方・使い方
                </Link>
              </li>
              <li>
                <Link
                  href="/construction/guide/freelance-law-construction"
                  className="text-kenmitsu-navy hover:underline"
                >
                  フリーランス新法と建設業一人親方
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
