import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "清掃業・ハウスクリーニングの見積書の書き方ガイド【記載例付き】 | 見積書メーカー",
  description: "清掃業・ハウスクリーニングの見積書の書き方を解説。必須項目・作業内容の記載例・料金体系・単価設定のポイントまで、現場で使える情報をわかりやすくまとめました。",
  openGraph: {
    title: "清掃業・ハウスクリーニングの見積書の書き方ガイド【記載例付き】",
    description: "清掃業・ハウスクリーニングの見積書の書き方を解説。必須項目・作業内容の記載例・料金体系・単価設定のポイントまで、現場で使える情報をわかりやすくまとめました。",
    url: "https://mitsumori-maker.com/guide/cleaning",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/cleaning",
  },
};

export default function CleaningGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* パンくずJSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "見積書メーカー", item: "https://mitsumori-maker.com" },
              { "@type": "ListItem", position: 2, name: "見積書ガイド", item: "https://mitsumori-maker.com/guide" },
              { "@type": "ListItem", position: 3, name: "清掃業の見積書の書き方", item: "https://mitsumori-maker.com/guide/cleaning" },
            ],
          }),
        }}
      />
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "清掃業・ハウスクリーニングの見積書の書き方ガイド【記載例付き】",
            datePublished: "2026-04-17",
            dateModified: "2026-04-17",
            author: { "@type": "Organization", name: "見積書メーカー" },
            publisher: { "@type": "Organization", name: "見積書メーカー", url: "https://mitsumori-maker.com" },
          }),
        }}
      />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">ガイド一覧</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">清掃業の見積書</span>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            清掃業・ハウスクリーニングの見積書の書き方ガイド【記載例付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月17日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            清掃業やハウスクリーニングでは、作業箇所・使用洗剤・作業時間など、業種特有の情報を見積書に正確に記載することが重要です。曖昧な見積書はトラブルの原因になるため、顧客が内容を一目で確認できる丁寧な書き方が求められます。本ガイドでは、清掃業・ハウスクリーニングの見積書に必要な項目・記載例・料金設定のポイントを詳しく解説します。
          </p>

          {/* H2-1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 border-l-4 border-blue-500 pl-4">
            清掃業・ハウスクリーニングの見積書の特徴
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            一般的な業種の見積書と異なり、清掃業の見積書には以下のような独自の特徴があります。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 pl-2">
            <li><span className="font-medium">作業箇所の明細が多い</span>：キッチン・浴室・トイレ・窓など、場所ごとに分けて記載する必要がある</li>
            <li><span className="font-medium">使用する洗剤・資材の記載</span>：使用薬剤の種類によって金額が変わるため、明示することが望ましい</li>
            <li><span className="font-medium">作業時間・人数の明記</span>：時間単価の場合は作業時間と人数を記載し、合計金額の根拠を示す</li>
            <li><span className="font-medium">現地確認の前提</span>：汚れの程度・広さによって最終金額が変動するため、「現地確認後に確定」旨を備考欄に記載することが多い</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            これらの特徴を踏まえた見積書を作成することで、顧客からの信頼を得やすくなり、受注率の向上にもつながります。特にハウスクリーニングでは、施工前後の写真と合わせて見積書を提出する事業者も増えています。
          </p>

          {/* H2-2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 border-l-4 border-blue-500 pl-4">
            必須記載項目と書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            清掃業の見積書には、一般的な見積書の基本項目に加えて、業種特有の項目を盛り込む必要があります。
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">基本的な必須項目</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">項目</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">記載内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">見積書番号</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">見積書の管理番号（例: EST-2026-001）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">発行日・有効期限</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">発行日から30日以内が一般的</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">顧客情報</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">氏名・住所（作業場所と異なる場合は両方記載）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">事業者情報</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">会社名・屋号・住所・電話番号・担当者名</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">作業場所</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">清掃を実施する住所・物件名・部屋番号</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">作業予定日時</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">作業日・開始時刻の目安</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">小計・消費税・合計</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">税込み合計金額を明記する</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">支払い条件</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">現金・振込・作業後払いなど</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">清掃業特有の追加項目</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 pl-2">
            <li>作業時間の目安（例: 約3時間）</li>
            <li>作業スタッフの人数</li>
            <li>使用洗剤・薬剤の種類（アルカリ洗浄剤・カビ取り剤など）</li>
            <li>廃棄物の処理方法（廃液の処理費用が別途発生する場合）</li>
            <li>駐車場・駐輪場の有無（交通費・駐車料金の加算有無）</li>
          </ul>

          {/* H2-3 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 border-l-4 border-blue-500 pl-4">
            作業内容・清掃箇所の書き方（記載例付き）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            清掃業の見積書で最も重要なのが、作業内容の明細です。「一式」でまとめてしまうと顧客が内容を把握できず、後々のトラブルにつながります。清掃箇所ごとに分けて記載することを強くおすすめします。
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">退去清掃（1LDK）の記載例</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">清掃箇所</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">作業内容</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">キッチン</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">レンジフード・コンロ・シンク洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">12,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">12,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">浴室</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">浴槽・壁面・床・排水口洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">10,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">10,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">トイレ</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">便器・タンク・床・壁面洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">6,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">6,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">洗面台</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">鏡・洗面ボウル・蛇口洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">4,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">4,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">居室・廊下</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">床掃除・窓拭き・換気扇清掃</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">エアコン洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">フィルター・熱交換器・送風ファン洗浄</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1台</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">12,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">12,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium" colSpan={4}>小計</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-medium">52,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700" colSpan={4}>消費税（10%）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">5,200円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-900 font-bold" colSpan={4}>合計（税込）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-900 font-bold">57,200円</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">オフィス・店舗清掃の記載例</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">作業内容</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">単位</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">床清掃（モップ・ポリッシャー）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">150</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">m²</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">200円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">30,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">ガラス清掃（内外）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">20</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">枚</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">800円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">16,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">トイレ清掃</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">2</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">箇所</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">5,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">10,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">共用部清掃（エントランス・廊下）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">1</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000円</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* H2-4 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 border-l-4 border-blue-500 pl-4">
            料金体系と単価の設定方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            清掃業の料金体系は大きく「面積単価制」「時間単価制」「箇所単価制」の3種類に分かれます。案件の規模や内容に合わせて使い分けましょう。
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">料金体系の比較</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">料金体系</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">計算方法</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">向いている案件</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">相場目安</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">面積単価制</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">㎡ × 単価</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">オフィス・店舗・マンション共用部</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">150〜400円/㎡</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">時間単価制</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">時間 × 人数 × 単価</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">定期清掃・小規模案件</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">2,000〜4,000円/時間・人</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">箇所単価制</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">清掃箇所 × 単価</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">ハウスクリーニング・退去清掃</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">箇所ごとに設定</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">ハウスクリーニングの相場単価</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">清掃箇所</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-medium text-gray-700">相場（税抜）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">レンジフード（換気扇）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000〜15,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">キッチン全体</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">10,000〜20,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">浴室（ユニットバス）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000〜16,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">トイレ</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">4,000〜8,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">洗面台</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">3,000〜6,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">エアコン（壁掛け型）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">8,000〜15,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">窓（1枚）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">500〜1,500円</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            なお、汚れが特に激しい場合や特殊な洗剤・機材が必要な場合は、追加料金が発生することを見積書の備考欄に明記しておきましょう。「汚れの状態によって金額が変動する場合があります」の一文を入れるだけで、後のトラブルを大幅に防げます。
          </p>

          {/* H2-5 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 border-l-4 border-blue-500 pl-4">
            見積書作成時の注意点とよくある質問
          </h2>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">注意点</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-900 mb-1">「一式」での記載は極力避ける</p>
              <p className="text-yellow-800 text-sm">「清掃一式 50,000円」と記載すると、どの箇所が含まれるか不明確になります。顧客から「この箇所は清掃済みのはずでは？」といったクレームが発生しやすくなります。可能な限り箇所ごとに分けて記載しましょう。</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-900 mb-1">有効期限を必ず記載する</p>
              <p className="text-yellow-800 text-sm">清掃業は人件費・洗剤コストの変動があるため、見積書には必ず有効期限を設定します。一般的に発行日から30日以内が目安です。有効期限を設定しないと、何ヶ月も前の古い価格で作業を求められるトラブルになります。</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-900 mb-1">キャンセル規定を明記する</p>
              <p className="text-yellow-800 text-sm">当日キャンセルや直前の変更に対するキャンセル料の規定を備考欄に記載しておきましょう。「作業日の前日以降のキャンセルは作業料金の50%を申し受けます」のように具体的に書くとトラブルを防げます。</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">よくある質問</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-medium text-gray-900 mb-1">Q. インボイス制度に対応した見積書はどう書けばよいですか？</p>
              <p className="text-gray-700 text-sm leading-relaxed">適格請求書発行事業者（インボイス発行事業者）として登録している場合は、登録番号（T＋13桁の数字）を見積書に記載しましょう。見積書自体はインボイスには該当しませんが、同じ番号を請求書にも記載することで、顧客が仕入税額控除を受けられます。</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Q. 定期清掃契約の見積書はどう作ればよいですか？</p>
              <p className="text-gray-700 text-sm leading-relaxed">定期清掃は「月額〇円 × 12ヶ月」のように年間契約額を明示する形式が一般的です。月1回・週1回などの清掃頻度、1回あたりの作業時間・人数を明記すると顧客に安心感を与えられます。</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Q. 見積書と請求書は別々に発行すべきですか？</p>
              <p className="text-gray-700 text-sm leading-relaxed">原則として別々に発行します。見積書は「作業前の提案書」、請求書は「作業後の支払い要求書」です。ただし、小規模な単発作業の場合は「見積兼請求書」として1枚にまとめることもあります。その場合は書類タイトルに「見積兼請求書」と明記してください。</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Q. 交通費・出張費はどのように記載しますか？</p>
              <p className="text-gray-700 text-sm leading-relaxed">交通費・出張費は明細の中に独立した行として記載します。「出張費（○○市外） 1式 3,000円」のように明示することで、顧客が料金の内訳を正確に把握できます。距離による計算式がある場合は備考欄に記載しましょう。</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">備考欄に記載しておくと便利な文例</h3>
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 space-y-2 mb-4">
            <p>・本見積書の有効期限は発行日より30日間とさせていただきます。</p>
            <p>・汚れの状態・範囲によって追加費用が発生する場合がございます。事前にご説明いたします。</p>
            <p>・作業日前日18時以降のキャンセルは、作業料金の50%をキャンセル料として申し受けます。</p>
            <p>・駐車場のご用意をお願いいたします。駐車場がない場合は別途駐車料金が発生します。</p>
            <p>・廃液・廃棄物は適切に処理して持ち帰ります（処理費用は上記に含みます）。</p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            清掃業・ハウスクリーニングの見積書は、顧客との信頼関係を築く最初の接点です。詳細かつ丁寧な見積書を作成することで、顧客に安心感を与え、受注率の向上と作業後のトラブル防止につながります。見積書メーカーを使えば、上記のような明細を箇所ごとに入力し、プロらしいPDF見積書を無料で作成できます。ぜひご活用ください。
          </p>
        </article>

        {/* 関連ガイドリンク */}
        <div className="mt-10 border border-gray-200 rounded-xl p-6 bg-white">
          <p className="font-bold text-gray-900 mb-3 text-sm">関連ガイド</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
                見積書の書き方・必要項目を解説 →
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline">
                見積書の消費税の書き方・インボイス対応 →
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline">
                見積書の有効期限の設定方法 →
              </Link>
            </li>
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline">
                フリーランス・個人事業主のための見積書ガイド →
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA */}
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
