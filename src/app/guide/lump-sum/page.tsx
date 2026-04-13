import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";

export const metadata: Metadata = {
  title: "見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】 | 見積書メーカー",
  description:
    "見積書・請求書における「一式」の正しい書き方と使い方を解説。一式で見積もる場面、記載例、メリット・デメリット、内訳明細の対応、請求書での一式表記まで網羅。",
  openGraph: {
    title: "見積書・請求書の「一式」の書き方・使い方ガイド | 見積書メーカー",
    description:
      "見積書・請求書の「一式」の正しい書き方を解説。使う場面や記載例、請求書での一式表記まで網羅。",
    url: "https://mitsumori-maker.com/guide/lump-sum",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E3%80%8C%E4%B8%80%E5%BC%8F%E3%80%8D%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "見積書の「一式」の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/lump-sum",
  },
};

export default function LumpSumGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】"
        description="見積書・請求書における「一式」の正しい書き方と使い方を解説。記載例、請求書での一式表記まで網羅。"
        slug="lump-sum"
        datePublished="2026-04-03"
        dateModified="2026-04-10"
        faqs={[
          { question: "見積書で「一式」と書いてもよい場合はどんな時ですか？", answer: "内訳を個別に提示できない・する必要がない場合に使えます。例えば「諸経費一式」「梱包材料費一式」のように、細かく分けても意味がない補助的な費用に使うのが適切です。メインの作業費や商品代は個別に明細を記載するようにしましょう。" },
          { question: "「一式」の金額の根拠を聞かれた場合、どう説明すればよいですか？", answer: "内訳を事前に用意しておくことが重要です。「一式」として提示していても、実際には個別の費用を積み上げた合計であることが多いため、参考内訳を別紙で提示できるようにしておきましょう。説明できる根拠があれば取引先からの信頼も得やすくなります。" },
          { question: "請求書でも「一式」の表記は問題ありませんか？", answer: "請求書でも使用できますが、インボイス制度（適格請求書）においては、品名・数量・単価を明確に記載することが求められます。「一式」表記のみでは要件を満たさない場合があるため、請求書では可能な限り内訳を明記することをお勧めします。" }
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-700">
              見積書メーカー
            </Link>
            <span className="mx-1">/</span>
            <span>ガイド</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">一式の書き方・使い方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書を作成する際、明細欄に「一式」と記載するケースがあります。工事費用やシステム開発費など、細かい項目を一つひとつ列挙するよりもまとめて提示したほうが分かりやすい場面で使われます。しかし、「一式」の使い方を誤ると、取引先に不信感を与えたり、後からトラブルになったりすることもあります。この記事では、見積書における「一式」の正しい書き方、使う場面、メリット・デメリット、そして内訳明細を求められた場合の対応方法まで詳しく解説します。
          </p>

          {/* H2-1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」とは？使う場面と意味
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書における「一式」とは、複数の作業や部品、サービスをまとめて1つの項目として記載する方法です。単位欄に「式」と書き、数量を「1」とするのが一般的です。個々の項目を細かく分けるのが難しい場合や、まとめて提示したほうが分かりやすい場合に使われます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            具体的に「一式」がよく使われる場面は以下の通りです。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">建設・リフォーム工事:</span>{" "}
              「内装工事一式」「外壁塗装工事一式」など、材料費と施工費をまとめて記載する場合
            </li>
            <li>
              <span className="font-semibold">システム開発・Web制作:</span>{" "}
              「Webサイト制作一式」「システム開発一式」など、設計・実装・テストを含む場合
            </li>
            <li>
              <span className="font-semibold">設備導入:</span>{" "}
              「エアコン設置工事一式」「ネットワーク機器導入一式」など、機材と作業費をまとめる場合
            </li>
            <li>
              <span className="font-semibold">イベント・撮影:</span>{" "}
              「撮影一式」「イベント運営一式」など、多岐にわたるサービスを包括する場合
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」は法律上の定義がある用語ではなく、商慣習として使われている表現です。そのため、取引先によって受け取り方が異なる場合がある点は理解しておきましょう。見積書の基本的な書き方については、
            <Link
              href="/guide/how-to-write"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の書き方・必要項目ガイド
            </Link>
            もあわせてご参照ください。
          </p>

          {/* H2-2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」の正しい書き方・記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に「一式」と記載する際は、品名・数量・単位・金額の書き方にルールがあります。以下のポイントを押さえましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            基本的な書き方
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例1: 建設工事</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: 内装リフォーム工事一式</p>
              <p>数量: 1　単位: 式　単価: 1,500,000　金額: 1,500,000</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例2: Web制作</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: コーポレートサイト制作一式（トップ+5ページ）</p>
              <p>数量: 1　単位: 式　単価: 800,000　金額: 800,000</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">記載例3: 設備導入</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: ネットワーク環境構築一式（機器・配線・設定含む）</p>
              <p>数量: 1　単位: 式　単価: 350,000　金額: 350,000</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            書き方のポイント
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>品名には「一式」の対象範囲がわかる説明を付け加える（例: 「材料費・施工費含む」）</li>
            <li>数量は「1」、単位は「式」と記載する</li>
            <li>備考欄に「一式」に含まれる主な作業内容を簡潔に記載すると丁寧</li>
            <li>複数の「一式」項目がある場合は、カテゴリごとに分けて記載する</li>
          </ul>

          {/* H2-3 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」を使うメリット・デメリット
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            メリット
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">見積書がシンプルになる:</span>{" "}
              数十項目に及ぶ明細を1行にまとめられるため、書類が読みやすくなります。取引先の担当者が社内決裁を取る際にも、合計金額が把握しやすくなります。
            </li>
            <li>
              <span className="font-semibold">見積作成の工数を削減できる:</span>{" "}
              細かい項目ごとに単価を算出する手間が省け、見積書の作成スピードが上がります。特に、多品種の作業が含まれるプロジェクトでは大きな時短になります。
            </li>
            <li>
              <span className="font-semibold">価格交渉の余地を残せる:</span>{" "}
              内訳を詳細に開示しないことで、個別項目ごとの値引き交渉を避けやすくなります。全体の利益率を確保しやすいというメリットがあります。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            デメリット
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">透明性が低いと感じられる:</span>{" "}
              取引先が「何にいくらかかっているのか分からない」と感じ、不信感を抱く場合があります。特に官公庁や大企業との取引では、内訳の提示が求められることが多いです。
            </li>
            <li>
              <span className="font-semibold">追加費用のトラブルが起きやすい:</span>{" "}
              「一式」に含まれる範囲が曖昧だと、「これも含まれているはず」「含まれていない」といった認識のずれからトラブルになることがあります。
            </li>
            <li>
              <span className="font-semibold">比較検討しにくい:</span>{" "}
              相見積もりの際、他社が詳細な内訳を出していると、「一式」の見積書は比較対象から外されることがあります。
            </li>
          </ul>

          {/* H2: 使うべきケース・避けるべきケース */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」を使うべきケースと避けるべきケースの判断基準
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」はあらゆる場面で使えるわけではありません。取引の内容や相手に応じて、一式表記が適切かどうかを判断する必要があります。以下の基準を参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            一式を使うべきケース
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">作業工程が多岐にわたり、個別に単価を出すのが現実的でない場合:</span>{" "}
              例えば建設工事やリフォームでは、材料費・人件費・運搬費・廃材処理費などが複雑に絡み合うため、一式でまとめるのが合理的です。
            </li>
            <li>
              <span className="font-semibold">取引先が概算金額を把握したい初期段階:</span>{" "}
              正式発注前の概算見積もりでは、詳細な内訳よりも全体のコスト感を伝えることが重要です。一式で提示し、正式見積もりで詳細化する二段階方式も有効です。
            </li>
            <li>
              <span className="font-semibold">業界の商慣習として一式が定着している場合:</span>{" "}
              建設業・設備工事業・イベント業などでは「一式」見積もりが広く受け入れられており、無理に分解するとかえって違和感を与えることがあります。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            一式を避けるべきケース
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">官公庁や自治体への見積もり:</span>{" "}
              公共工事や行政機関との取引では、項目ごとの内訳提示が原則として求められます。一式のみの見積書は受理されないケースが大半です。
            </li>
            <li>
              <span className="font-semibold">相見積もり（複数社比較）が前提の場合:</span>{" "}
              取引先が他社と比較検討する場面では、内訳が見える詳細見積もりのほうが選ばれやすくなります。一式だけでは「高いのか安いのか判断できない」と思われがちです。
            </li>
            <li>
              <span className="font-semibold">単価が明確な物品販売:</span>{" "}
              PC10台、椅子20脚など、1つあたりの単価が明らかな商品を納品する場合は、数量と単価を分けて記載するのが基本です。「PC一式」と書くと、台数や保証内容が曖昧になります。
            </li>
            <li>
              <span className="font-semibold">取引先が大企業で内部稟議が必要な場合:</span>{" "}
              大企業では経理部門や購買部門のチェックが入るため、内訳が不明瞭な見積書は差し戻されることがあります。
            </li>
          </ul>

          {/* H2: 二式・三式の使い方 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「二式」「三式」など複数式の使い方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」と同じ考え方で、「二式」「三式」という表記を使うこともあります。これは同じ内容のセットが複数必要な場合に使われる書き方です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            例えば、同じ仕様のオフィスレイアウト工事を2フロア分まとめて見積もる場合、「オフィスレイアウト工事」を数量「2」・単位「式」として記載します。この場合の表現が「二式」です。同様に3セット分であれば「三式」となります。
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例: 複数フロアの工事</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: オフィス内装工事（1フロアあたり）</p>
              <p>数量: 2　単位: 式　単価: 1,200,000　金額: 2,400,000</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">記載例: 複数拠点のネットワーク構築</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: 拠点ネットワーク構築（1拠点あたり・機器・配線・設定含む）</p>
              <p>数量: 3　単位: 式　単価: 450,000　金額: 1,350,000</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            「二式」「三式」を使う際の注意点として、各セットの内容が同一であることが前提です。フロアごとに面積や仕様が異なる場合は、それぞれ別の行として「一式」ずつ記載したほうが正確です。また、「式」という単位はあくまで商慣習上の表現であり、「個」「セット」「件」など他の単位で代替できる場合もあります。取引先に伝わりやすい表現を選びましょう。
          </p>

          {/* H2-4 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」で見積もる際の注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」を使って見積書を作成する際には、以下の点に注意しましょう。トラブルを未然に防ぎ、取引先との信頼関係を維持するために重要です。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">含まれる範囲を明記する:</span>{" "}
              「一式」に何が含まれ、何が含まれないのかを備考欄に記載しましょう。例えば「材料費・施工費・廃材処理費を含む。足場代は別途」のように明確にします。
            </li>
            <li>
              <span className="font-semibold">追加費用の条件を記載する:</span>{" "}
              仕様変更や追加作業が発生した場合の費用負担について、あらかじめ見積書に記載しておくとトラブルを防げます。
            </li>
            <li>
              <span className="font-semibold">有効期限を設定する:</span>{" "}
              原材料費や人件費の変動リスクに備えて、見積書の有効期限を適切に設定しましょう。詳しくは
              <Link
                href="/guide/valid-period"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の有効期限ガイド
              </Link>
              をご確認ください。
            </li>
            <li>
              <span className="font-semibold">業界の慣習を考慮する:</span>{" "}
              建設業界では「一式」が一般的に受け入れられますが、IT業界では詳細な工数見積もりが求められることが多いです。業界ごとの商慣習に合わせましょう。
              <Link
                href="/guide/consulting"
                className="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                コンサルタント見積書の書き方ガイド
              </Link>
              も参考になります。
            </li>
            <li>
              <span className="font-semibold">消費税の取り扱いを明確にする:</span>{" "}
              「一式」の金額が税込なのか税抜なのかを明記しましょう。特にインボイス制度のもとでは、税率ごとの区分が求められます。
            </li>
          </ul>

          {/* H2-5 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            内訳明細を求められた場合の対応
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」で見積もりを提出した後、取引先から「内訳を見せてほしい」と求められることは珍しくありません。この場合、以下のように対応しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            1. 内訳明細書を別途作成する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書とは別に「内訳明細書」を作成し、添付書類として提出するのが最も丁寧な対応です。見積書本体は「一式」のままにして、明細書に個別の作業内容・数量・単価を記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            2. 見積書を修正して再提出する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先の要望に応じて、「一式」を分解した詳細見積書を再作成して提出する方法です。項目を細分化しつつ、合計金額は変えないようにします。見積書の再発行については、
            <Link
              href="/guide/reissue"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の再発行ガイド
            </Link>
            も参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3. 内訳開示の範囲を調整する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            すべての項目を詳細に開示する必要はありません。大分類（例: 材料費・人件費・諸経費）に分けて提示するだけでも、取引先の理解を得られることが多いです。自社の利益構造が見えすぎないよう、開示する粒度を適切にコントロールしましょう。
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">内訳対応のメール例文</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {`株式会社〇〇
〇〇様

お世話になっております。
お見積りの内訳についてお問い合わせいただき、ありがとうございます。

ご要望いただきました内訳明細書を添付いたしますので、
ご確認いただけますと幸いです。

なお、合計金額に変更はございません。
ご不明な点がございましたら、お気軽にお問い合わせください。

何卒よろしくお願いいたします。`}
            </p>
          </div>

          {/* H2: 請求書での一式 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            請求書で「一式」と書く場合の注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書だけでなく、請求書でも「一式」と記載するケースがあります。請求書は代金の支払いを正式に求める書類であるため、見積書以上に記載内容の正確性が求められます。請求書で「一式」を使う場合は、以下のポイントに注意しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            インボイス制度との関係
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            2023年10月から開始されたインボイス制度（適格請求書等保存方式）では、請求書に「適用税率」と「税率ごとに区分した消費税額」の記載が義務付けられています。「一式」で金額をまとめている場合でも、税率10%と8%（軽減税率）が混在する取引では、税率ごとの内訳を明記する必要があります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            たとえば「イベント運営一式」に飲食物（軽減税率8%）と設備レンタル（標準税率10%）が含まれる場合、一式のままでは適格請求書の要件を満たしません。税率が異なる項目は分けて記載するか、備考欄に税率ごとの内訳を補記しましょう。消費税の記載方法については<Link href="/guide/consumption-tax" className="text-blue-600 hover:text-blue-800 underline">見積書の消費税・インボイス対応ガイド</Link>で詳しく解説しています。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            請求書で一式を使う場合の記載例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">記載例: システム開発の請求書</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: 業務管理システム開発一式（要件定義・設計・実装・テスト含む）</p>
              <p>数量: 1　単位: 式　単価: 3,000,000　金額: 3,000,000</p>
              <p className="text-gray-500 mt-2">※消費税（10%）: 300,000円</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">記載例: リフォーム工事の請求書</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: キッチンリフォーム工事一式（解体・配管・設備・内装含む）</p>
              <p>数量: 1　単位: 式　単価: 2,500,000　金額: 2,500,000</p>
              <p className="text-gray-500 mt-2">※消費税（10%）: 250,000円</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書で「一式」を使う場合も、見積書の段階から一式の範囲を明確にしておくことが重要です。見積書と請求書で「一式」に含まれる範囲が異なると、支払い時にトラブルの原因となります。見積書の段階で備考欄に「一式」の内容を明記しておき、請求書にも同じ内容を引き継ぎましょう。請求書の基本的な書き方は<Link href="/guide/invoice-bank-info" className="text-blue-600 hover:text-blue-800 underline">請求書の振込先・口座情報の書き方</Link>をご参照ください。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            請求書で一式を使う際の実務上の注意
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書は経理処理や税務調査の根拠書類となるため、見積書よりも厳密な記載が求められます。特に以下の点を意識しましょう。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">見積書・発注書との整合性:</span>{" "}
              請求書の「一式」の金額が、見積書や発注書の金額と一致しているか確認しましょう。追加作業が発生した場合は、追加分を別の行として記載するのが原則です。
            </li>
            <li>
              <span className="font-semibold">分割請求時の記載:</span>{" "}
              大型案件では着手金・中間金・完了時の3回に分けて請求することがあります。この場合、「システム開発一式（第1回・着手金30%）」のように、一式の何割を請求しているのかを明記しましょう。
            </li>
            <li>
              <span className="font-semibold">電子帳簿保存法への対応:</span>{" "}
              電子データで請求書を発行・保存する場合、「一式」の内容が検索可能な形で記録されていると、税務調査時にスムーズに対応できます。品名に内容の概要を含めておくことが実務上有効です。
            </li>
          </ul>

          {/* 関連記事リンク */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連ガイド
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
                href="/guide/discount"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の値引きの書き方・表記方法を解説
              </Link>
            </li>
            <li>
              <Link
                href="/guide/consulting"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                コンサルタント見積書の書き方ガイド
              </Link>
            </li>
            <li>
              <Link
                href="/guide/valid-period"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の有効期限の設定方法
              </Link>
            </li>
            <li>
              <Link
                href="/guide/remarks"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の備考欄の書き方・例文集
              </Link>
            </li>
            <li>
              <Link
                href="/guide/invoice-bank-info"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                請求書の振込先・口座情報の書き方
              </Link>
            </li>
            <li>
              <Link
                href="/guide/prerequisites"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書の前提条件の書き方ガイド
              </Link>
            </li>
          </ul>

          <ToolCallout steps={[
            "品目欄に「○○工事 一式」のように入力",
            "単位は空欄のまま、数量を「1」、単価に合計金額を入力",
            "必要に応じて複数行に分けて内訳を記載（例：設計費・施工費・材料費）",
            "備考欄に「内訳明細は別紙参照」と記入可能",
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
