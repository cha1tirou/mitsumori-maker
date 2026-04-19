import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "ライター・コピーライターの見積書の書き方ガイド【記載例・料金相場付き】 | 見積書メーカー",
  description:
    "ライター・コピーライターの見積書の書き方を解説。文字単価・記事単価の料金相場、修正回数・著作権の取り扱い、Webメディア向けの記載例付きで詳しくまとめました。",
  openGraph: {
    title: "ライター・コピーライターの見積書の書き方ガイド【記載例・料金相場付き】 | 見積書メーカー",
    description:
      "ライター・コピーライターの見積書の書き方を解説。文字単価・記事単価の料金相場、修正回数・著作権の取り扱い、記載例付きでわかりやすく解説します。",
    url: "https://mitsumori-maker.com/guide/writer",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E3%83%A9%E3%82%A4%E3%82%BF%E3%83%BC%E3%83%BB%E3%82%B3%E3%83%94%E3%83%BC%E3%83%A9%E3%82%A4%E3%82%BF%E3%83%BC%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8",
        width: 1200,
        height: 630,
        alt: "ライター・コピーライターの見積書の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/writer",
  },
};

export default function GuideWriterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="ライター・コピーライターの見積書の書き方ガイド【記載例・料金相場付き】"
        description="ライター・コピーライターの見積書の書き方を解説。文字単価・記事単価の料金相場、修正回数・著作権の取り扱い、記載例付きでわかりやすく解説します。"
        slug="writer"
        datePublished="2026-04-19"
        dateModified="2026-04-19"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">/</span>
            <span>ガイド</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">ライター・コピーライターの見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ライター・コピーライターの見積書の書き方ガイド【記載例・料金相場付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            フリーランスのライターやコピーライターとして案件を受注する際、見積書の作成は不可欠なビジネススキルです。しかし「文字単価をどう記載するか」「修正費用はどこに書けばいいか」「著作権の扱いは見積書に書くべきか」など、迷う点が多いのも事実です。この記事では、ライター・コピーライターの見積書の特徴から、料金体系・相場、記載例、注意すべきポイントまで詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ライター・コピーライターの見積書の特徴
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ライティング業の見積書には、製造業や建設業と異なる独自の特徴があります。最大の特徴は「成果物が文章・テキスト」であるため、作業量を「文字数」「本数」「ページ数」など複数の単位で表現できる点です。クライアントや案件の性質によって最適な単位が異なるため、見積書の書き方も柔軟に対応する必要があります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            また、コピーライターの場合はキャッチコピー1本でも数万円から数十万円の価値があるため、「文字数が少ない＝安い」という理屈が通じないケースが多く、仕事の内容や品質を見積書で適切に説明することが重要です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            さらに、ライティング業では取材・リサーチ・インタビューなど、執筆以外の付帯作業が発生することが多く、これらを見積書に漏れなく記載しておかないと、後からトラブルになりやすいという側面もあります。<Link href="/guide/how-to-write" className="text-blue-600 hover:underline">見積書に必要な基本項目</Link>と合わせて確認しておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ライター・コピーライターの主な見積もり項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に記載する項目は、案件の内容によって異なりますが、以下のものが代表的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            執筆・ライティング関連
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>原稿料（記事執筆・コピー制作）</li>
            <li>構成案作成費（記事の骨子・見出し設計）</li>
            <li>リサーチ費・調査費（競合調査・資料収集）</li>
            <li>SEOキーワード調査・最適化費</li>
            <li>修正対応費（初稿後の修正・追記）</li>
            <li>校正・校閲費（表記の統一・ファクトチェック）</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            取材・インタビュー関連
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>取材費・インタビュー費（準備・実施・文字起こし）</li>
            <li>交通費・宿泊費（取材先への往訪）</li>
            <li>写真撮影費（取材時の撮影が必要な場合）</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            コピーライター特有の項目
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>コンセプト設計費（ブランドメッセージ・世界観の設計）</li>
            <li>キャッチコピー制作費（複数案提案）</li>
            <li>ボディコピー・タグライン制作費</li>
            <li>著作権使用料・著作権譲渡費</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の備考欄には修正回数・納期・著作権の扱いを記載しましょう。<Link href="/guide/remarks" className="text-blue-600 hover:underline">備考欄の書き方ガイド</Link>も参考にしてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            料金体系の種類と料金相場
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ライター・コピーライターの料金体系は大きく4種類あります。案件の性質やクライアントとの関係に応じて最適なものを選びましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 文字単価型
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1文字あたりの単価を設定し、「文字単価 × 文字数」で原稿料を計算する方式です。WebメディアやSEO記事など、文字数が明確に決まっている案件でよく使われます。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">経験・スキルレベル</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">文字単価の目安</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">初心者・副業ライター</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">0.5〜1円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">経験1〜3年のライター</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1〜3円</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">専門知識あり・上級ライター</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">3〜10円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">医療・法律・金融などの専門ライター</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">5〜20円以上</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 記事単価型（本数単価型）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            記事1本ごとに料金を設定する方式です。文字数や工数が案件ごとにある程度決まっている場合に適しています。SEO記事やインタビュー記事など、定型的な案件でよく使われます。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">記事の種類</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">相場（1本あたり）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">SEO記事（3,000〜5,000字）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">5,000〜30,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">SEO記事（5,000〜10,000字）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">15,000〜50,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">インタビュー記事（取材込み）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000〜100,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">プレスリリース（400〜800字）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">10,000〜30,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">メールマガジン（1,000〜2,000字）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">5,000〜20,000円</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. ページ単価型
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            パンフレット・冊子・Webサイトのテキストなど、ページ数が明確な案件で使われます。「1ページあたり○万円 × ページ数」で計算します。ランディングページ（LP）や会社案内などのコピーライティング案件でよく用いられる方式です。LP制作は1本15万〜50万円程度が相場です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 月額顧問型（継続契約）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            毎月一定量の記事制作やコンテンツ運用を担う場合、月額固定料金での契約が双方にとってメリットがあります。「月5本・月額10万円」のように月額と成果物の量を明記します。継続案件では月額3万〜30万円程度が相場で、提供量や専門性によって幅があります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            継続契約の見積書は通常の見積書と記載方法が少し異なります。<Link href="/guide/freelance" className="text-blue-600 hover:underline">フリーランス向け見積書ガイド</Link>も参考にしてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            修正回数・著作権の記載方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ライティング案件でトラブルになりやすいのが、修正回数と著作権の取り扱いです。これらは必ず見積書の備考欄（摘要欄）に記載しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            修正回数の設定方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には「修正は初稿納品後○回まで含む」と明記します。一般的には1〜2回の修正を含む料金設定が多く、それを超える場合は追加料金を設定します。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正対応の追加料金は「1回あたり○○円」または「時間単価×時間数」で設定するのが一般的です。ただし、方向性が変わるような「大幅な内容変更」は「修正」ではなく「再制作」として扱うことを備考欄に明記しておくとトラブルを防げます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            記載例: 「本見積もりには初稿納品後2回までの修正を含む。3回目以降の修正は1回あたり5,000円（税別）を別途ご請求いたします。方向性の抜本的な変更については改めてお見積もりいたします。」
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            著作権の取り扱い
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ライターが執筆した文章の著作権は、原則として執筆者（ライター）に帰属します。クライアントに著作権を譲渡する場合は、その旨を見積書に明記し、必要に応じて譲渡費用を設定しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>著作権を譲渡する場合：「著作権は納品・入金完了後にクライアントに譲渡」と記載。譲渡費用を設定するのが一般的（原稿料の20〜30%程度）</li>
            <li>著作権を譲渡しない場合：「本原稿の著作権は制作者に帰属し、使用許諾は指定媒体・指定期間に限る」と記載</li>
            <li>二次使用・転載：「本原稿の他媒体への転載・二次使用には別途使用料が発生します」と明記</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            コピーライター案件では著作権の扱いが特に重要です。TVCMや大規模なキャンペーン向けのコピーは、著作権譲渡費や使用期間・媒体によって追加料金が発生することを見積書の段階でしっかり伝えておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Webメディア向け記事制作の見積もり記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            実際の見積書を作る際のイメージをつかめるよう、Webメディア向けSEO記事制作の記載例を示します。
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">項目名</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">仕様・内容</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">キーワード調査・構成案作成</td>
                  <td className="border border-gray-200 px-3 py-2 text-sm text-gray-600">競合調査・見出し設計含む</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">10,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">10,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">SEO記事執筆</td>
                  <td className="border border-gray-200 px-3 py-2 text-sm text-gray-600">5,000字・文字単価3円</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">3本</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">15,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">45,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">修正対応（2回まで）</td>
                  <td className="border border-gray-200 px-3 py-2 text-sm text-gray-600">初稿納品後2回まで無償</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">0</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">アイキャッチ画像選定・加工</td>
                  <td className="border border-gray-200 px-3 py-2 text-sm text-gray-600">フリー素材より選定・リサイズ</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">3点</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1,500</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">4,500</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>小計</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">59,500</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>消費税（10%）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">5,950</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>合計（税込）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">65,450</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            このように構成案作成・執筆・修正・画像対応を分けて記載することで、各工程の作業内容と費用がクライアントに伝わりやすくなります。「修正対応（2回まで）0円」と明示することで、修正の無料範囲と有料になる境界線を明確にできます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            備考欄の書き方については<Link href="/guide/remarks" className="text-blue-600 hover:underline">見積書の備考欄・摘要欄の書き方ガイド</Link>も参考にしてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            フリーランスライターが見積書で注意すべきポイント
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 作業スコープを明確にする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「記事執筆」という一言では、構成案の作成・リサーチ・執筆・校正・CMS入稿まで含むのかどうかが分かりません。見積書には「○○を含む・含まない」を明示し、「本見積もりの範囲外の作業については別途お見積もりいたします」という一文を備考欄に入れておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 有効期限を必ず設ける
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には必ず有効期限を設定しましょう。一般的には発行日から30日が目安です。有効期限を設けることで、長期間放置された見積書に対して旧単価での受注を求められるリスクを防げます。<Link href="/guide/valid-period" className="text-blue-600 hover:underline">見積書の有効期限の設定方法</Link>も参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. インボイス制度への対応
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            2023年10月から開始されたインボイス制度（適格請求書等保存方式）では、取引先が仕入税額控除を受けるために適格請求書（インボイス）が必要です。登録事業者であれば、見積書に「適格請求書発行事業者 登録番号：T○○○○○○○○○○○」を記載しましょう。免税事業者の場合でも、取引先への影響について事前に確認しておくことが大切です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 取材費・交通費は事前に合意を取る
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            取材案件では交通費・宿泊費・取材先の費用などが発生することがあります。これらの実費は必ず見積書に別途記載し、事前にクライアントの了承を得ておきましょう。「交通費・宿泊費は別途実費をご請求いたします（概算：○○円）」のように概算金額を添えると親切です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. キャンセルポリシーを設定する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            着手後にクライアント都合でキャンセルになった場合の対応を、見積書の備考欄に記載しておきましょう。一般的には「着手後のキャンセルは作業進捗に応じてキャンセル料（作業完了分の○%）が発生します」と明記します。フリーランスにとって、途中キャンセルは大きなリスクになるため、事前の明文化が重要です。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/remarks" className="text-blue-600 hover:underline text-sm">
                見積書の備考欄・摘要欄の書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応
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
