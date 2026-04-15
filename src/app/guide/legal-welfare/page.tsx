import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ConstructionPromoBanner from "@/components/construction/ConstructionPromoBanner";

export const metadata: Metadata = {
  title: "法定福利費の計算方法と業界標準料率【建設業向け】見積書への書き方 | 見積書メーカー",
  description:
    "建設業の法定福利費の計算方法と業界標準料率（約20%）を解説。健康保険・厚生年金・雇用保険・労災の内訳、見積書への明示方法、国交省ガイドラインに沿った算出手順まで。工務店・一人親方向け実務ガイド。",
  keywords: "法定福利費, 計算方法, 建設業, 見積書, 労務費, 厚生年金, 健康保険, 労災保険",
  openGraph: {
    title: "法定福利費の計算方法と業界標準料率【建設業向け】見積書への書き方",
    description:
      "建設業の法定福利費の計算方法と業界標準料率（約20%）を解説。健康保険・厚生年金・雇用保険・労災の内訳、見積書への明示方法、国交省ガイドラインに沿った算出手順まで。",
    url: "https://mitsumori-maker.com/guide/legal-welfare",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/legal-welfare",
  },
};

export default function LegalWelfarePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="法定福利費の計算方法と業界標準料率【建設業向け】"
        description="建設業の法定福利費の計算方法と業界標準料率（約20%）を解説。健康保険・厚生年金・雇用保険・労災の内訳、見積書への明示方法まで。"
        slug="legal-welfare"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">ガイド</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">法定福利費の計算方法</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            法定福利費の計算方法と業界標準料率【建設業向け】見積書への書き方
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月15日</p>

          <ConstructionPromoBanner />

          <p className="text-gray-700 leading-relaxed mb-8">
            建設業の見積書において、法定福利費を独立項目として明示することが求められるようになりました。特に2025年12月全面施行の改正建設業法では、労務費と並んで法定福利費の内訳明示が重要視されています。本記事では、法定福利費の計算方法・業界標準料率・見積書への書き方を実務レベルで解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">法定福利費とは何か</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            法定福利費とは、法律で事業主負担が義務付けられている社会保険料等の総称です。建設業の場合、労務費（人件費）に対して以下の5つが法定福利費として計上されます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>健康保険料（事業主負担分）</li>
            <li>厚生年金保険料（事業主負担分）</li>
            <li>雇用保険料（事業主負担分）</li>
            <li>労災保険料（全額事業主負担）</li>
            <li>子ども・子育て拠出金</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            これらを従業員の給与（賃金）以外に「事業主として負担しなければならない費用」と位置付け、見積書でも独立して計上することが国交省のガイドラインで推奨されています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">業界標準料率は「労務費の約20%」</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業の法定福利費の業界標準料率は、<strong>労務費の約18〜22%</strong>です。内訳は以下のとおり（2026年度の概算）：
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="py-2 px-3 text-left">保険種別</th>
                  <th className="py-2 px-3 text-right">事業主負担料率（労務費対比）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3">健康保険料</td>
                  <td className="py-2 px-3 text-right">約 5.0%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3">厚生年金保険料</td>
                  <td className="py-2 px-3 text-right">約 9.15%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3">雇用保険料（建設業）</td>
                  <td className="py-2 px-3 text-right">約 0.75%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3">労災保険料（建設業平均）</td>
                  <td className="py-2 px-3 text-right">約 1.5〜9.5%（業種別）</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3">子ども・子育て拠出金</td>
                  <td className="py-2 px-3 text-right">約 0.36%</td>
                </tr>
                <tr className="bg-green-50 font-bold">
                  <td className="py-2 px-3">合計</td>
                  <td className="py-2 px-3 text-right">約 18〜22%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には、簡便法として <strong>労務費 × 20%</strong> を使うケースが多く、建設業振興基金の「法定福利費内訳明示様式」でもこの料率が参照されます。労災保険料は業種によって大きく変動するため、土木・解体など危険度の高い工事では料率を上げて計算する場合もあります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">計算方法の具体例</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            例として、労務費が40万円の工事で法定福利費を計算してみます。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 my-4 text-sm font-mono text-gray-700">
            <p>労務費: ¥400,000</p>
            <p>法定福利費率: 20%</p>
            <p>───────────────────</p>
            <p>法定福利費 = ¥400,000 × 20% = ¥80,000</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            この¥80,000 を見積書の労務費の下に独立行として明示します。見積書の構造は以下のようになります：
          </p>
          <div className="bg-gray-100 rounded-lg p-4 my-4 text-sm font-mono text-gray-700">
            <p>【直接工事費】</p>
            <p>　労務費（大工工事）: ¥400,000</p>
            <p>　材料費: ¥300,000</p>
            <p>　外注費（電気）: ¥150,000</p>
            <p>　直接工事費 計: ¥850,000</p>
            <br />
            <p>【法定福利費】</p>
            <p>　法定福利費（労務費×20%）: ¥80,000</p>
            <br />
            <p>【諸経費】</p>
            <p>　現場管理費（直接+法定福利×6%）: ¥55,800</p>
            <p>　一般管理費（工事原価×10%）: ¥98,580</p>
            <br />
            <p>　小計: ¥1,084,380</p>
            <p>　消費税（10%）: ¥108,438</p>
            <p>───────────────────</p>
            <p>　合計: ¥1,192,818</p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">なぜ法定福利費を明示すべきか</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            法定福利費を見積書に明示することには、次のような実務メリットがあります：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>賃金水準の確保</strong> — 労務費が社会保険料込みでいくらかかるかを発注者に明示することで、賃金切り下げの交渉圧力から職人を守る
            </li>
            <li>
              <strong>元請からの信頼</strong> — 法定福利費を適正に計上している業者は、社会保険加入義務を果たしている「きちんとした業者」と評価される
            </li>
            <li>
              <strong>公共工事の入札資格</strong> — 国・地方自治体の公共工事では、法定福利費の内訳明示が入札要件に含まれるケースが増加中
            </li>
            <li>
              <strong>税務的透明性</strong> — 原価管理・決算時の区分が明確になり、税務調査にも耐えやすい
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            一人親方の場合はどうするか
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            一人親方（雇用者がいない個人事業主）の場合、厳密には「事業主として負担する社会保険料」はありません。国民健康保険・国民年金は自己負担、労災保険は特別加入が任意です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、元請や発注者から法定福利費相当額の計上を求められる場合があります。その場合は：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-1">
            <li>労災保険特別加入料・国民健康保険・国民年金の自己負担分を参考に料率を設定</li>
            <li>慣習的に労務費の 10〜20% を計上するケースが多い</li>
            <li>見積書備考欄に「一人親方のため、労災特別加入料・国保・国民年金の自己負担相当を含む」と記載</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ツールで自動計算すれば毎回電卓不要
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            法定福利費の計算を毎回手計算するのは非効率です。弊社の
            <Link href="/construction" className="text-green-700 hover:underline font-bold">
              建設業向け見積書メーカー
            </Link>
            では、労務費を入力すると法定福利費が自動で計上されます。料率はデフォルト20%ですが、工種や事業規模に応じて編集可能です。
          </p>

          <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              法定福利費を自動計算できる見積書ツール
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              登録不要・月¥980から / 労務費を入れるだけで法定福利費・諸経費が自動計上
            </p>
            <Link
              href="/construction"
              className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              建設業向け見積書メーカーを見る →
            </Link>
          </div>

          <div className="mt-10 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <p className="font-bold mb-2">関連ガイド</p>
            <ul className="space-y-1">
              <li><Link href="/guide/kaisei-kensetsu-2025" className="text-green-700 hover:underline">改正建設業法2025【完全ガイド】</Link></li>
              <li><Link href="/guide/labor-cost" className="text-green-700 hover:underline">見積書の人件費の書き方</Link></li>
              <li><Link href="/guide/misc-expenses" className="text-green-700 hover:underline">見積書の諸経費の書き方</Link></li>
              <li><Link href="/guide/construction" className="text-green-700 hover:underline">建設業の見積書の書き方</Link></li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
