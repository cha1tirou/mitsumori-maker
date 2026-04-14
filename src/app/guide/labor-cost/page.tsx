import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";
import ConstructionPromoBanner from "@/components/construction/ConstructionPromoBanner";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書の人件費の書き方｜工数・単価の記載例 | 見積書メーカー",
  description:
    "見積書における人件費の書き方を解説。人日・人月の工数計算、単価の設定方法、IT業界・建設業での具体的な記載例を紹介。適正な人件費の見積もり方がわかります。",
  openGraph: {
    title: "見積書の人件費の書き方｜工数・単価の記載例 | 見積書メーカー",
    description:
      "見積書の人件費の書き方を解説。工数計算・単価設定・業種別の記載例を紹介。",
    url: "https://mitsumori-maker.com/guide/labor-cost",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/labor-cost",
  },
};

export default function LaborCostGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の人件費の書き方｜工数・単価の記載例"
        description="見積書における人件費の書き方を解説。人日・人月の工数計算、単価設定、業種別の記載例を紹介。"
        slug="labor-cost"
        datePublished="2026-04-08"
        dateModified="2026-04-08"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の人件費の書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の人件費の書き方｜工数・単価の記載例
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月8日</p>
          <ArticleDisclosure />
          <ConstructionPromoBanner />

          <p className="text-gray-700 leading-relaxed mb-8">
            システム開発・コンサルティング・建設業など、サービスの中核が「人の作業」である業種では、見積書における人件費の記載が非常に重要です。しかし、「人日」「人月」といった工数の単位や、単価の設定方法がわからず困っている方も多いのではないでしょうか。この記事では、人件費の計算方法から業種別の具体的な記載例まで、見積書の人件費の書き方を詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書における人件費とは
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書における人件費とは、プロジェクトや業務に従事する人員の作業コストを金額化したものです。材料費・外注費などの「モノのコスト」とは異なり、「ヒトのコスト」を表す項目で、以下のような要素が含まれます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>作業者の基本給・賞与の按分</li>
            <li>社会保険料・福利厚生費の按分</li>
            <li>技術レベルや役職に応じたスキルプレミアム</li>
            <li>管理工数（プロジェクトマネジメント費用）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書では、これらを個別に列挙するのではなく、「工数（作業量）× 単価」という形式で記載するのが一般的です。発注者にとって理解しやすく、金額の根拠が明確になるため、交渉もスムーズに進みます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            工数の計算方法と単位
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            人件費の見積もりでは、まず「どのくらいの作業量が必要か」を工数として算出します。工数の単位は業界や作業の粒度によって使い分けます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            人時（にんじ）・man-hour
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1人が1時間作業する量を「1人時」とします。短時間の作業やスポット対応の見積もりに適しています。たとえば、2人で3時間作業する場合は「6人時」です。時間単価は2,000〜10,000円程度が相場で、専門性が高いほど高額になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            人日（にんにち）・man-day
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1人が1日（通常8時間）作業する量を「1人日」とします。IT業界やコンサルティング業界で最もよく使われる単位です。たとえば、3人のエンジニアが5日間作業する場合は「15人日」になります。人日単価はスキルレベルに応じて15,000〜80,000円程度が目安です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            人月（にんげつ）・man-month
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1人が1ヶ月（通常20営業日）作業する量を「1人月」とします。大規模プロジェクトやSES（システムエンジニアリングサービス）契約でよく使われます。人月単価は50万〜150万円程度が一般的で、シニアエンジニアやコンサルタントはさらに高額です。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm font-semibold mb-1">単位の換算目安</p>
            <p className="text-blue-700 text-sm">
              1人月 = 20人日 = 160人時（1日8時間 × 20営業日として計算）
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            単価の設定方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            工数が決まったら、次に「1単位あたりの金額（単価）」を設定します。単価の設定方法には主に以下の3つのアプローチがあります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 原価積み上げ方式
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            実際の人件費（給与・社会保険料・福利厚生費）に利益率を加算して算出する方法です。自社のコスト構造に基づくため、赤字を防ぎやすく、根拠が明確です。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-700 text-sm font-mono">
              単価 = （月額給与 + 社会保険料 + 福利厚生費）÷ 月間稼働日数 × （1 + 利益率）
            </p>
            <p className="text-gray-500 text-xs mt-2">
              例：月給35万円 + 社保等10万円 = 45万円 ÷ 20日 × 1.3 = 29,250円/人日
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 市場相場方式
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            同業種・同スキルレベルの市場相場を参考に設定する方法です。競合他社の見積もりや業界団体の指標を基準にします。市場価格に合わせることで受注率を高められますが、自社のコスト構造と乖離しないよう注意が必要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. スキルランク方式
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            技術レベルや経験年数に応じてランクを設定し、ランクごとに単価を決める方法です。IT業界では特に一般的で、発注者にも納得感のある単価設定ができます。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-gray-200 text-gray-700">ランク</th>
                  <th className="text-left px-4 py-2 border-b border-gray-200 text-gray-700">役割</th>
                  <th className="text-right px-4 py-2 border-b border-gray-200 text-gray-700">人月単価（目安）</th>
                  <th className="text-right px-4 py-2 border-b border-gray-200 text-gray-700">人日単価（目安）</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="px-4 py-2 border-b border-gray-100">PM</td>
                  <td className="px-4 py-2 border-b border-gray-100">プロジェクトマネージャー</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">100〜150万円</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">50,000〜75,000円</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-100">SE（上級）</td>
                  <td className="px-4 py-2 border-b border-gray-100">設計・レビュー</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">80〜120万円</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">40,000〜60,000円</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-100">SE（中級）</td>
                  <td className="px-4 py-2 border-b border-gray-100">実装・テスト</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">60〜80万円</td>
                  <td className="px-4 py-2 border-b border-gray-100 text-right">30,000〜40,000円</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">PG</td>
                  <td className="px-4 py-2">プログラマー（ジュニア）</td>
                  <td className="px-4 py-2 text-right">40〜60万円</td>
                  <td className="px-4 py-2 text-right">20,000〜30,000円</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            業種別の人件費記載例
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            IT・システム開発の記載例
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            IT・システム開発では、工程ごとに担当者のスキルランクと工数を分けて記載するのが一般的です。発注者がどの工程にどれだけのコストがかかるかを把握しやすくなります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`【Webシステム開発 見積書 記載例】

品目                      数量    単価       金額
──────────────────────────────────────────────
要件定義（PM）             5人日   ¥60,000   ¥300,000
基本設計（SE上級）         10人日  ¥50,000   ¥500,000
詳細設計（SE中級）          8人日  ¥35,000   ¥280,000
フロントエンド開発（SE中級） 15人日  ¥35,000   ¥525,000
バックエンド開発（SE中級）   20人日  ¥35,000   ¥700,000
単体テスト（PG）           10人日  ¥25,000   ¥250,000
結合テスト（SE中級）        5人日  ¥35,000   ¥175,000
──────────────────────────────────────────────
人件費 小計                                 ¥2,730,000
諸経費（サーバー・ツール等）  1式            ¥120,000
──────────────────────────────────────────────
税抜合計                                   ¥2,850,000
消費税（10%）                               ¥285,000
合計（税込）                               ¥3,135,000`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            建設業の記載例
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業では、国土交通省が定める「公共工事設計労務単価」が参考指標として広く使われています。職種ごとの日額単価が公表されており、公共工事だけでなく民間工事でも目安として活用されています。
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
材料費                   1式              ¥380,000
諸経費（現場管理費等）    1式               ¥46,000
──────────────────────────────────────────────
税抜合計                                  ¥972,000
消費税（10%）                              ¥97,200
合計（税込）                            ¥1,069,200`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            コンサルティング業の記載例
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            コンサルティング業では、時間単価（タイムチャージ）で見積もるケースが多く見られます。コンサルタントのランクと稼働時間を明示することで、費用の透明性を確保します。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`【経営コンサルティング 見積書 記載例】

品目                        数量     単価       金額
──────────────────────────────────────────────
現状分析（シニアコンサル）     16時間   ¥15,000   ¥240,000
戦略立案（パートナー）         8時間   ¥25,000   ¥200,000
実行計画策定（コンサル）      24時間   ¥12,000   ¥288,000
報告書作成（アナリスト）      16時間    ¥8,000   ¥128,000
──────────────────────────────────────────────
コンサルティング費 小計                         ¥856,000
交通費・資料印刷費            1式               ¥35,000
──────────────────────────────────────────────
税抜合計                                       ¥891,000
消費税（10%）                                   ¥89,100
合計（税込）                                   ¥980,100`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            人件費を見積書に記載するときの注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            人件費の記載で失敗しないために、以下のポイントを押さえておきましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>工数の根拠を説明できるようにする</strong>：「なぜこの工数が必要なのか」を発注者に聞かれたときに説明できるよう、WBS（作業分解構成図）や過去の類似案件データを準備しておきましょう。
            </li>
            <li>
              <strong>バッファ（予備工数）の扱いを決める</strong>：見積もりには通常10〜20%程度のバッファを含めます。バッファを各工程に分散させるか、別行として明示するかは、発注者との関係性や業界慣習に合わせて判断します。
            </li>
            <li>
              <strong>「人件費」という表記を避ける場合もある</strong>：発注者によっては「人件費」という言葉にネガティブな印象を持つことがあります。「技術費」「作業費」「開発費」「労務費」など、業界で一般的な表記を選ぶとよいでしょう。
            </li>
            <li>
              <strong>単価交渉に備える</strong>：発注者から単価の値引きを求められることは珍しくありません。値引きに応じる場合は工数を減らす（スコープ調整）のか、単価を下げるのかを明確にし、安易な値下げは避けましょう。
            </li>
            <li>
              <strong>消費税の取り扱い</strong>：人件費にも消費税がかかります。インボイス制度に対応し、税率ごとの金額を明記しましょう。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の人件費は、「工数 × 単価」のシンプルな構造ですが、その設定方法や記載の仕方によって、発注者の印象や受注の可否が大きく変わります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>工数の単位は「人時」「人日」「人月」を作業規模に応じて使い分ける</li>
            <li>単価は原価積み上げ・市場相場・スキルランクのいずれかで設定する</li>
            <li>業種に合った記載スタイルと項目名を選ぶ</li>
            <li>工数の根拠・バッファの取り扱い・単価交渉への準備を怠らない</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            適正な人件費の見積もりは、発注者との信頼関係構築と自社の利益確保の両方につながります。本記事の記載例を参考に、自社のビジネスに合った見積書を作成してみてください。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/breakdown" className="text-blue-600 hover:underline text-sm">
                見積書の内訳（明細）の書き方・記載例まとめ
              </Link>
            </li>
            <li>
              <Link href="/guide/it-web" className="text-blue-600 hover:underline text-sm">
                IT・Web制作業の見積書の書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/construction" className="text-blue-600 hover:underline text-sm">
                建設業の見積書の書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/misc-expenses" className="text-blue-600 hover:underline text-sm">
                見積書の諸経費の書き方・計上方法を解説
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書メーカーを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
