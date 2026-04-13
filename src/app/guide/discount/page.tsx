import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";

export const metadata: Metadata = {
  title: "見積書の値引き・割引の書き方【記載例付き】調整値引きも解説 | 見積書メーカー",
  description:
    "見積書の値引き・割引の正しい書き方を記載例付きで解説。調整値引き・端数値引き・出精値引きの書き分け、値引き後の消費税計算まで。そのまま使えるテンプレート付き。",
  openGraph: {
    title: "見積書の値引き・割引の書き方【記載例付き】調整値引きも解説 | 見積書メーカー",
    description:
      "見積書の値引き・割引の正しい書き方を記載例付きで解説。調整値引き・端数値引き・出精値引きの書き分け、値引き後の消費税計算まで。",
    url: "https://mitsumori-maker.com/guide/discount",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E5%80%A4%E5%BC%95%E3%81%8D%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "見積書の値引きの書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/discount",
  },
};

export default function DiscountGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の値引きの書き方・表記方法を解説"
        description="見積書に値引きを記載する正しい書き方を解説。一律値引き・端数値引き・数量値引きの表記パターン、消費税の計算方法まで。"
        slug="discount"
        datePublished="2026-04-02"
        dateModified="2026-04-10"
        faqs={[
          { question: "見積書の値引きと割引の違いは何ですか？", answer: "一般的に「値引き」は一定の金額を差し引くこと（例：5,000円引き）、「割引」は一定の割合を差し引くこと（例：10%引き）を指します。見積書では「値引き額」か「割引率」のどちらかをはっきり明示して記載し、計算根拠が分かるようにしましょう。" },
          { question: "調整値引きとは何ですか？なぜ使うのですか？", answer: "合計金額の端数を調整するために使う値引きです。例えば税込合計が100,234円になった場合、234円を調整値引きとして引いて100,000円に揃えます。請求書や見積書の合計を切りよい数字にしたい場合に使われる実務的な処理方法です。" },
          { question: "値引きを適用した場合、消費税はどう計算しますか？", answer: "値引きは通常、税抜き金額から差し引いた後に消費税を計算します（税抜き合計から値引きを差し引いた金額に税率をかける）。ただし、消費税ごとに値引き額を適用する方法もあります。インボイス制度の観点からは、税率ごとに値引き後の税抜金額と消費税額を明示することが推奨されます。" }
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">値引きの書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の値引きの書き方・表記方法を解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書に値引きや割引を記載するケースは、取引先との交渉や、リピーター向けの優遇措置など多くの場面で発生します。しかし、値引きの書き方が不適切だと、金額の根拠が不明確になったり、消費税の計算でトラブルが起きたりすることがあります。この記事では、見積書における値引きの正しい書き方・表記方法から、消費税の計算、値引き交渉への対応まで詳しく解説します。
          </p>

          {/* H2-1: 見積書に値引きを記載する方法 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書に値引きを記載する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に値引きを記載する際は、明細欄の最後に「値引き」の行を追加して、マイナス金額を記載するのが一般的です。具体的には、以下の手順で記載します。
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>通常の商品・サービスの明細をすべて記載する</li>
            <li>
              明細欄の最終行に品名「値引き」または「お値引き」と記載する
            </li>
            <li>
              金額欄に「-10,000」のようにマイナス記号付きの金額を記入する
            </li>
            <li>小計・消費税・合計金額に値引き後の金額を反映させる</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            値引き行の数量は「1」、単位は空欄または「式」とするのが一般的です。重要なのは、値引き前の合計金額と値引き額が明確に分かるように記載することです。これにより、取引先も値引きの根拠を理解しやすくなります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            また、見積書の備考欄に値引きの理由（「初回取引特別値引き」「大量発注による値引き」など）を記載しておくと、社内決裁や後日の確認がスムーズになります。見積書の基本的な書き方については、
            <Link
              href="/guide/how-to-write"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の書き方ガイド
            </Link>
            もあわせてご参照ください。
          </p>

          {/* H2-2: 値引きの表記パターン */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引きの表記パターン（一律値引き・端数値引き・数量値引き）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書で使われる値引きの表記には、主に3つのパターンがあります。取引の内容や商慣習に応じて使い分けましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            1. 一律値引き（全体値引き）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積金額全体から一定額を値引く方法です。品名には「値引き」「お値引き」「特別値引き」などと記載します。取引先との交渉で「合計から1万円引いてほしい」と言われた場合に使います。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例</p>
            <p className="text-gray-800 font-mono text-sm">
              品名: お値引き　数量: 1　単価: -10,000　金額: -10,000
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            2. 端数値引き（端数調整）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            合計金額の端数を切り捨てて、きりの良い金額に調整する方法です。品名には「端数値引き」「端数調整」と記載します。例えば合計が103,500円の場合に3,500円を値引いて100,000円にするようなケースで使われます。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例</p>
            <p className="text-gray-800 font-mono text-sm">
              品名: 端数値引き　数量: 1　単価: -3,500　金額: -3,500
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3. 数量値引き（ボリュームディスカウント）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            大量発注に対して単価を下げたり、一定数量以上の分を値引く方法です。品名には「数量値引き」「大量発注割引」などと記載します。この場合、値引きの対象商品や条件を備考欄に明記すると親切です。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">記載例</p>
            <p className="text-gray-800 font-mono text-sm">
              品名: 数量値引き（100個以上ご注文分）　数量: 1　単価: -5,000　金額:
              -5,000
            </p>
          </div>

          {/* H2-3: 値引き後の消費税の計算方法 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き後の消費税の計算方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            値引きがある場合、消費税は値引き後の金額に対して計算するのが原則です。具体的には次の計算順序になります。
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>各明細の小計を合計する（税抜合計）</li>
            <li>値引き額を差し引く</li>
            <li>値引き後の金額に消費税率を掛ける</li>
          </ol>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">計算例</p>
            <div className="text-gray-800 text-sm space-y-1">
              <p>商品A: 50,000円</p>
              <p>商品B: 30,000円</p>
              <p>値引き: -10,000円</p>
              <p className="border-t border-gray-200 pt-1 mt-1">
                小計（税抜）: 70,000円
              </p>
              <p>消費税（10%）: 7,000円</p>
              <p className="font-bold">合計: 77,000円</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            注意点として、軽減税率（8%）と標準税率（10%）の商品が混在する場合は、値引き額をそれぞれの税率の商品に按分して計算する必要があります。インボイス制度のもとでは、税率ごとの正確な区分が求められます。消費税の詳しい書き方については、
            <Link
              href="/guide/consumption-tax"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の消費税の書き方ガイド
            </Link>
            で詳しく解説しています。
          </p>

          {/* H2-4: 値引き交渉への対応とメール例文 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き交渉への対応とメール例文
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先から値引きを求められた場合、ただ金額を下げるだけでなく、値引きの条件や理由を明確にすることが重要です。値引きに応じる際のポイントを整理します。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              値引きの条件を明記する（「今回限り」「〇個以上ご注文の場合」など）
            </li>
            <li>値引き理由を記録に残す（初回取引、長期契約、まとめ買いなど）</li>
            <li>安易な値引きは避け、代替案（納期の調整、仕様の変更）も検討する</li>
            <li>
              値引き後の金額で利益が確保できるか、社内で必ず確認してから回答する
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            値引き対応のメール例文
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {`株式会社〇〇
〇〇様

お世話になっております。
お見積りの件につきまして、ご検討いただきありがとうございます。

ご依頼いただきました金額調整について社内で検討いたしました結果、
今回に限り、合計金額より10,000円のお値引きをさせていただきます。

つきましては、値引き後の金額を反映した見積書を
改めてお送りいたしますので、ご確認をお願いいたします。

今後ともどうぞよろしくお願いいたします。`}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の送付時は、値引き内容についても丁寧に説明を添えて送ることをお勧めします。
          </p>

          {/* 値引き見積書の完成イメージ */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き見積書の記載例（完成イメージ）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            実際に値引きを含む見積書の記載例を見てみましょう。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

No  品目                   数量  単価        金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   Webサイトデザイン         1   ¥300,000   ¥300,000
2   コーディング              1   ¥200,000   ¥200,000
3   CMS構築                  1   ¥150,000   ¥150,000
4   初回取引値引き            1          -   -¥65,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                          小計  ¥585,000
                    消費税(10%)   ¥58,500
                    合計(税込)  ¥643,500

【備考】
・初回取引につき、合計金額より10%の値引きを
  適用しております
・本値引きは今回限りの特別価格です
・有効期限：発行日より14日間`}
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            ポイントは、値引き行を明細の最後に独立した行として記載し、金額にマイナス記号を付けること。備考欄で値引きの理由と条件（今回限り等）を明記しておくと、次回以降の交渉もスムーズです。
          </p>

          {/* H2-5: 値引き記載時の注意点 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き記載時の注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            値引きを見積書に記載する際には、以下の点に注意しましょう。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">マイナス記号を明確に表記する:</span>{" "}
              値引き金額には必ず「-」（マイナス）をつけて記載します。「▲」を使う場合もありますが、誤読を防ぐために「-」が推奨されます。
            </li>
            <li>
              <span className="font-semibold">
                値引き前の金額も必ず表示する:
              </span>{" "}
              値引き後の金額だけを記載するのではなく、元の金額と値引き額を分けて記載しましょう。透明性が高まり、信頼感につながります。
            </li>
            <li>
              <span className="font-semibold">値引き理由を備考欄に記載する:</span>{" "}
              「初回取引割引」「年間契約割引」など、値引きの根拠を明記することで、社内稟議を通しやすくなります。
            </li>
            <li>
              <span className="font-semibold">
                見積書の有効期限を明確にする:
              </span>{" "}
              値引き条件付きの見積書は、有効期限を通常より短く設定するのが一般的です（例: 2週間以内）。有効期限の設定方法は
              <Link
                href="/guide/valid-period"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の有効期限ガイド
              </Link>
              をご覧ください。
            </li>
            <li>
              <span className="font-semibold">
                値引きが恒常的でないことを示す:
              </span>{" "}
              「今回限りの特別価格」「〇月末までの期間限定」など、値引きが一時的であることを明示しておくと、次回以降の価格交渉を有利に進められます。
            </li>
          </ul>

          {/* H2-6: 調整値引き・出精値引きの書き方 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            調整値引き・出精値引きの書き方と使いどころ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業や製造業でよく使われる「調整値引き」と「出精値引き」は、通常の値引きとは意味合いが異なります。それぞれの違いと適切な使い方を理解しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            調整値引きとは
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            調整値引きは、見積金額を取引先の予算に合わせるために行う値引きです。品名には「調整値引き」「金額調整」と記載します。予算が500万円の案件で見積合計が520万円になった場合に、20万円を調整値引きとして差し引くような使い方をします。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例</p>
            <p className="text-gray-800 font-mono text-sm">
              品名: 調整値引き　数量: 1　単価: -200,000　金額: -200,000
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            調整値引きを使う際は、備考欄に「ご予算に合わせた金額調整」などと理由を記載するのが一般的です。ただし、過度な調整値引きは原価割れのリスクがあるため、社内で利益率を確認したうえで適用しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            出精値引きとは
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            出精値引き（しゅっせいねびき）は、「企業努力による値引き」を意味します。特定の理由や条件なく、自社の営業判断で行う値引きです。品名には「出精値引き」「出精値引」と記載します。長期的な取引関係の構築や、競合他社との差別化のために使われることが多い表現です。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">記載例</p>
            <p className="text-gray-800 font-mono text-sm">
              品名: 出精値引き　数量: 1　単価: -50,000　金額: -50,000
            </p>
          </div>

          {/* H2-7: 値引き率の計算例 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き率の計算例（10%引き・端数調整）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            値引き額を算出する際は、値引き率を使って計算するケースが多くあります。よくある値引きパターンを具体的な金額で紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            パターン1: 10%値引き
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-gray-800 text-sm space-y-1">
              <p>見積合計（税抜）: 480,000円</p>
              <p>値引き率: 10%</p>
              <p>値引き額: 480,000 x 10% = <span className="font-bold">-48,000円</span></p>
              <p className="border-t border-gray-200 pt-1 mt-1">値引き後小計: 432,000円</p>
              <p>消費税（10%）: 43,200円</p>
              <p className="font-bold">合計: 475,200円</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            パターン2: 端数調整で切りの良い金額にする
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-gray-800 text-sm space-y-1">
              <p>見積合計（税抜）: 253,800円</p>
              <p>端数値引き: <span className="font-bold">-3,800円</span></p>
              <p className="border-t border-gray-200 pt-1 mt-1">値引き後小計: 250,000円</p>
              <p>消費税（10%）: 25,000円</p>
              <p className="font-bold">合計: 275,000円（税込でもきりの良い金額）</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            パターン3: 5%値引き + 端数調整の合わせ技
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="text-gray-800 text-sm space-y-1">
              <p>見積合計（税抜）: 860,000円</p>
              <p>5%値引き: 860,000 x 5% = -43,000円</p>
              <p>値引き後: 817,000円</p>
              <p>端数調整: <span className="font-bold">-17,000円</span></p>
              <p className="border-t border-gray-200 pt-1 mt-1">値引き後小計: 800,000円</p>
              <p>消費税（10%）: 80,000円</p>
              <p className="font-bold">合計: 880,000円</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            5%値引きと端数調整を組み合わせる場合は、見積書の明細にそれぞれ別の行として記載すると、値引きの内訳が明確になります。
          </p>

          {/* H2-8: 値引き交渉を断る場合の対応 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            値引き交渉を断る場合の対応方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            すべての値引き要請に応じる必要はありません。利益を確保するために、値引きをお断りする判断も重要です。断る際は、価格の根拠を丁寧に説明し、代替案を提示することで、取引先との関係を損なわずに対応できます。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>見積金額の内訳や根拠を具体的に説明する</li>
            <li>値引きの代わりに、納期の延長や仕様の簡素化など代替案を提示する</li>
            <li>「次回のご発注時に検討させていただきます」と将来の余地を残す</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            値引きをお断りするメール例文
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {`株式会社〇〇
〇〇様

お世話になっております。
お見積りの金額調整につきまして、社内で慎重に検討いたしました。

誠に恐れ入りますが、今回のお見積りにつきましては、
資材費・人件費を精査したうえでの金額となっており、
これ以上のお値引きが難しい状況でございます。

代替案として、以下のご提案が可能です。
・納期を2週間延長いただく場合：合計より20,000円の調整が可能
・〇〇の仕様を簡易版に変更する場合：50,000円のコスト削減が可能

ご予算に合わせた最善のプランをご提案いたしますので、
ご検討のうえ、お気軽にご相談ください。

何卒よろしくお願いいたします。`}
            </p>
          </div>

          {/* H2-9: インボイス制度での値引きと消費税 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            インボイス制度での値引きの消費税計算の注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度（適格請求書等保存方式）のもとでは、値引きがある場合の消費税計算にいくつかの注意点があります。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">税率ごとの区分が必須:</span>{" "}
              標準税率（10%）と軽減税率（8%）の商品が混在する場合、値引き額をそれぞれの税率に合理的に按分する必要があります。
            </li>
            <li>
              <span className="font-semibold">按分の計算方法:</span>{" "}
              各税率の取引金額の割合に応じて値引き額を按分します。例えば、10%対象が80万円、8%対象が20万円で合計100万円の見積もりから10万円を値引く場合、10%対象から8万円、8%対象から2万円を値引きます。
            </li>
            <li>
              <span className="font-semibold">値引き後の税額を正確に記載:</span>{" "}
              按分後の税率ごとの合計金額と、それぞれの消費税額を見積書に明記します。
            </li>
          </ul>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">按分計算の具体例</p>
            <div className="text-gray-800 text-sm space-y-1">
              <p>10%対象商品: 800,000円</p>
              <p>8%対象商品: 200,000円</p>
              <p>合計: 1,000,000円</p>
              <p className="border-t border-gray-200 pt-1 mt-1">値引き額: -100,000円</p>
              <p>10%対象からの値引き: -100,000 x (800,000/1,000,000) = -80,000円</p>
              <p>8%対象からの値引き: -100,000 x (200,000/1,000,000) = -20,000円</p>
              <p className="border-t border-gray-200 pt-1 mt-1">10%対象 値引き後: 720,000円 → 消費税 72,000円</p>
              <p>8%対象 値引き後: 180,000円 → 消費税 14,400円</p>
              <p className="font-bold">合計（税込）: 986,400円</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度に対応した消費税の詳しい計算方法は、
            <Link
              href="/guide/consumption-tax"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の消費税の書き方・インボイス対応ガイド
            </Link>
            で解説しています。
          </p>

          {/* 関連記事リンク */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連記事
          </h2>
          <ul className="text-gray-700 leading-relaxed space-y-2">
            <li>
              <Link
                href="/guide/how-to-write"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の書き方・必要項目を解説
              </Link>
            </li>
            <li>
              <Link
                href="/guide/consumption-tax"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link
                href="/guide/remarks"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の備考欄の書き方・記載例
              </Link>
            </li>
            <li>
              <Link
                href="/guide/lump-sum"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の「一式」の書き方・使い方
              </Link>
            </li>
          </ul>

          <ToolCallout steps={[
            "まず通常の品目・数量・単価を入力",
            "値引き行を追加：品目に「値引き」、単価にマイナス金額を入力",
            "合計金額に値引きが自動反映される",
            "備考欄に値引き理由（初回割引・まとめ割等）を記入するとより丁寧",
            "テンプレートを選んでPDFダウンロード"
          ]} />
        </article>

        <AuthorProfile />

        {/* CTA */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            見積書を今すぐ無料で作成
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
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
