import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "カメラマン・写真業の見積書の書き方ガイド【記載例・料金相場付き】 | 見積書メーカー",
  description: "カメラマン・写真業の見積書の書き方を解説。撮影種別・カット数・納品形式・使用権の記載方法、ブライダル・商業など撮影ジャンル別の記載例と料金相場も紹介。",
  openGraph: {
    title: "カメラマン・写真業の見積書の書き方ガイド【記載例・料金相場付き】",
    description: "カメラマン・写真業の見積書の書き方を解説。撮影種別・カット数・納品形式・使用権の記載方法、ブライダル・商業など撮影ジャンル別の記載例と料金相場も紹介。",
    url: "https://mitsumori-maker.com/guide/photographer",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/photographer",
  },
};

export default function PhotographerGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "見積書メーカー", item: "https://mitsumori-maker.com" },
              { "@type": "ListItem", position: 2, name: "見積書ガイド", item: "https://mitsumori-maker.com/guide" },
              { "@type": "ListItem", position: 3, name: "カメラマンの見積書", item: "https://mitsumori-maker.com/guide/photographer" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "カメラマン・写真業の見積書の書き方ガイド【記載例・料金相場付き】",
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
            <span className="text-gray-800">カメラマンの見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            カメラマン・写真業の見積書の書き方ガイド【記載例・料金相場付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月17日</p>

          <p className="text-gray-700 mb-8 leading-relaxed">
            カメラマン・写真業の仕事は、成果物が「データ」や「写真」という無形のものであるため、見積書に何をどこまで記載すべきか迷いやすい業種です。撮影コマ数・納品形式・使用権の範囲など、写真業特有の項目を正確に記載しないと、後からトラブルになるケースが少なくありません。この記事では、見積書カメラマン向けの書き方の基本から、撮影ジャンル別の記載例、料金相場まで詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">カメラマン・写真業の見積書の特徴</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            写真撮影の見積書は、一般的なサービス業の見積書と異なる点がいくつかあります。最も大きな特徴は、「撮影そのものの作業費」と「納品物の権利処理」を分けて記載する必要があることです。
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            たとえば、同じ半日撮影であっても、個人の記念撮影と企業の広告用撮影では使用権の範囲がまったく異なります。個人使用なら低単価で問題ありませんが、商業広告・Web媒体・全国放映となると使用料（ライセンス料）を別途加算するのが業界標準です。見積書にこの区別を明記しておかないと、後に「広告に使ったら追加費用を請求された」というクライアントとのトラブルに発展します。
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            また、カメラマンの費用は「拘束時間」「移動・交通費」「機材費」「レタッチ・現像費」など複数の要素で構成されるため、それぞれを項目として分けて記載することで、クライアントが費用の内訳を理解しやすくなります。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
            <p className="text-blue-800 text-sm font-semibold mb-2">写真業の見積書で特に重要な3点</p>
            <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
              <li>撮影カット数（納品枚数）の上限を明記する</li>
              <li>使用権・著作権の範囲を具体的に記載する</li>
              <li>追加カット・修正対応の条件と料金を明示する</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">必須記載項目（撮影種別・カット数・納品形式・使用権）</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            カメラマンの見積書に必ず記載すべき項目を解説します。一般的な見積書の基本項目（見積番号・発行日・有効期限・発注者情報・発行者情報・合計金額）に加えて、以下の写真業特有の項目を漏れなく記載してください。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2 text-left">項目</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">記載内容の例</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">必須度</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">撮影種別</td>
                  <td className="border border-gray-300 px-4 py-2">商品撮影 / ポートレート / ブライダル / 建築など</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">撮影日時・場所</td>
                  <td className="border border-gray-300 px-4 py-2">2026年5月10日 10:00〜15:00 / 東京都渋谷区◯◯</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">拘束時間・撮影時間</td>
                  <td className="border border-gray-300 px-4 py-2">撮影5時間（準備・移動含む）</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">納品カット数</td>
                  <td className="border border-gray-300 px-4 py-2">セレクト後20カット（RAWデータ含む場合は別途記載）</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">納品形式</td>
                  <td className="border border-gray-300 px-4 py-2">JPEG（長辺3,000px以上） / データ納品（Googleドライブ）</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">納品期限</td>
                  <td className="border border-gray-300 px-4 py-2">撮影後7営業日以内</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">使用権・著作権</td>
                  <td className="border border-gray-300 px-4 py-2">自社Webサイト・SNS使用のみ可（商業印刷・転売不可）</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">レタッチ範囲</td>
                  <td className="border border-gray-300 px-4 py-2">色補正・明度調整のみ（人物肌修正は別途見積）</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">交通費・経費</td>
                  <td className="border border-gray-300 px-4 py-2">実費精算 / 上限◯◯円 / 込み</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">キャンセルポリシー</td>
                  <td className="border border-gray-300 px-4 py-2">7日前まで無料・3日前50%・当日100%</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">撮影ジャンル別の記載例</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            撮影ジャンルによって、見積書に記載すべき項目や金額感が異なります。代表的なジャンル別の記載例を紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ブライダル撮影</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            ブライダル撮影は1日拘束が多く、挙式・披露宴・二次会など時間帯ごとに区切って記載するとわかりやすくなります。アルバム制作が含まれる場合は別項目として計上します。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">ブライダル撮影（挙式〜披露宴・8時間）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">データ納品（セレクト後200カット・JPEG）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">込み</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">—</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">アルバム制作（A4・20P）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1冊</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">交通費（実費）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-6 italic">
            ※使用権：新郎新婦の個人使用（SNS・印刷・プレゼント）に限る。第三者への譲渡・商業利用不可。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">商業・広告撮影</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            商業撮影は使用媒体・使用期間・使用地域によって使用権料が大きく変わります。見積書には使用条件を必ず明記し、条件外の使用が発生した場合は追加費用が発生することを記載しておくことが重要です。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">商品撮影（スタジオ・半日4時間）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">カットセレクト・レタッチ（20カット）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20カット</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">2,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">40,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">使用権料（Webサイト掲載・1年間・国内）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">スタジオ使用料</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">15,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">15,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-6 italic">
            ※印刷媒体・看板・テレビCMへの使用は別途お見積もりとなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ポートレート・プロフィール撮影</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            ポートレート撮影は個人向けが多く、比較的シンプルな見積書で対応できます。ただし、SNSプロフィール用・就活用・タレント宣材など用途によって単価が異なることを記載しておくとよいでしょう。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">プロフィール撮影（1時間・屋外ロケ）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">15,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">15,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">データ納品（セレクト後10カット・レタッチ済み）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">込み</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">—</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">追加カット（10カット超過分）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1カット</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">料金相場と単価設定のポイント</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            カメラマンの料金相場は、経験・機材・撮影ジャンルによって幅があります。以下はフリーランスカメラマンの一般的な相場感の目安です。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2 text-left">撮影種別</th>
                  <th className="border border-gray-600 px-4 py-2 text-right">相場（半日〜1日）</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">備考</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">ブライダル撮影</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60,000〜200,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">アルバム別途が多い</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">商業・広告撮影</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000〜300,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">使用権料が加算される</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">商品・物撮り</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000〜100,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">カット数・レタッチで変動</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">ポートレート・プロフィール</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">10,000〜50,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">個人〜タレント宣材で幅あり</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">建築・不動産撮影</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000〜80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">件数・広さによる</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">イベント・取材撮影</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000〜100,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">時間・カット数次第</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">
            単価設定のポイントとして、以下の3つを意識してください。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li className="leading-relaxed"><span className="font-semibold">時間単価で計算する：</span>移動・準備・レタッチ・納品作業すべてを含めた実稼働時間を基に計算し、時間単価が自分の目標収益を下回らないか確認する。</li>
            <li className="leading-relaxed"><span className="font-semibold">使用権を適切に加算する：</span>商業利用・広告掲載の場合は撮影料の20〜50%を使用権料として加算するのが一般的。使用範囲が広いほど高くなる。</li>
            <li className="leading-relaxed"><span className="font-semibold">経費を漏れなく計上する：</span>交通費・スタジオ代・小道具・モデル費用など実費が発生するものはすべて見積書に記載し、実費精算か上限を設けるかを明確にする。</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">トラブルを防ぐ見積書の注意点</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            カメラマンの仕事でよくあるトラブルの多くは、見積書の記載が曖昧なことから生じます。以下の5点を見積書に明示することでトラブルを大幅に減らせます。
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">1. 納品カット数の上限を必ず記載する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                「全カット納品」は絶対に避けてください。「撮影枚数から厳選した20カットを納品」など、枚数の上限を明記します。クライアントが「もっとたくさん欲しい」と言っても、見積書に上限が書かれていれば追加費用として請求できます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">2. RAWデータの扱いを明確にする</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                RAWデータの納品は標準サービスに含めるべきではありません。「RAWデータは納品対象外」または「別途◯◯円」と見積書に明記します。RAWデータを渡すと著作権管理が難しくなるため、特別な理由がない限り非推奨です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">3. 修正・再撮影の対応範囲を記載する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                「イメージと違う」という理由での再撮影は有料であることを明記します。色補正・明度調整などの軽微な修正は何回まで無料か、それを超えた場合の追加費用も記載しておくと安心です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">4. キャンセルポリシーを記載する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                撮影当日のキャンセルは機会損失が大きいため、キャンセルポリシーを見積書に明記します。「撮影日の7日前まで無料・3日前〜前日50%・当日100%」のような形式が一般的です。見積書承認をもってポリシーに同意したと見なす旨を備考欄に記載すると効果的です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">5. 悪天候・緊急時の対応方針を記載する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                屋外撮影の場合は天候リスクへの対応を記載します。「雨天による延期は無料で対応・日程調整に応じる」または「天候不良でも撮影実施の場合はキャンセル料が発生しない」などの条件を明示しておくことで、クライアントとの認識齟齬を防げます。
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">見積書の備考欄に記載しておくと良い文例</h3>
            <div className="bg-white rounded p-4 text-sm text-gray-700 font-mono leading-relaxed">
              <p>・本見積書の有効期限は発行日より30日間です。</p>
              <p>・撮影データの著作権はカメラマンに帰属します。</p>
              <p>・納品データは個人使用・自社SNS・自社Webサイトへの掲載に限り使用可能です。</p>
              <p>・商業広告・出版・第三者への譲渡等を行う場合は別途ご相談ください。</p>
              <p>・RAWデータの納品は対象外です。</p>
              <p>・撮影日3日前以降のキャンセルは撮影費用の50%、当日は100%を申し受けます。</p>
              <p>・交通費は実費にて別途請求いたします。</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            見積書はクライアントとの契約の出発点です。口頭での合意だけでは、後になって「そんな話は聞いていない」というトラブルが起きやすくなります。見積書にすべての条件を明記し、クライアントに承認をもらってから撮影に臨むことで、双方が安心して仕事を進められます。見積書メーカーを使えば、これらの項目を漏れなく記載した見積書をPDF形式で無料作成できます。ぜひ活用してください。
          </p>
        </article>

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
