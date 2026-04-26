import type { Metadata } from "next";
import Link from "next/link";
import { HardHat } from "lucide-react";
import KenmitsuGuideJsonLd from "@/components/construction/KenmitsuGuideJsonLd";

export const metadata: Metadata = {
  title: "見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】 | ケンミツ",
  description:
    "見積書・請求書における「一式」の正しい書き方と使い方を解説。一式で見積もる場面、記載例、メリット・デメリット、内訳明細の対応、改正建設業法 2025 との関係まで。",
  openGraph: {
    title: "見積書・請求書の「一式」の書き方・使い方ガイド | ケンミツ",
    description:
      "見積書・請求書の「一式」の正しい書き方を解説。使う場面・記載例・改正建設業法 2025 との関係まで。",
    url: "https://mitsumori-maker.com/construction/guide/lump-sum",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/guide/lump-sum",
  },
};

export default function LumpSumGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <KenmitsuGuideJsonLd
        title="見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】"
        description="見積書・請求書における「一式」の正しい書き方と使い方を解説。記載例、内訳対応、改正建設業法 2025 との関係まで。"
        slug="lump-sum"
        faqs={[
          {
            question:
              "見積書で「一式」と書いてもよい場合はどんな時ですか？",
            answer:
              "内訳を個別に提示できない・する必要がない場合に使えます。例えば「諸経費一式」「梱包材料費一式」のように、細かく分けても意味がない補助的な費用に使うのが適切です。メインの作業費や商品代は個別に明細を記載するようにしましょう。",
          },
          {
            question:
              "「一式」の金額の根拠を聞かれた場合、どう説明すればよいですか？",
            answer:
              "内訳を事前に用意しておくことが重要です。「一式」として提示していても、実際には個別の費用を積み上げた合計であることが多いため、参考内訳を別紙で提示できるようにしておきましょう。説明できる根拠があれば取引先からの信頼も得やすくなります。",
          },
          {
            question:
              "改正建設業法 2025 では「一式」表記はどう扱われますか？",
            answer:
              "全面禁止ではないものの、可能な限り内訳を展開することが推奨されており、元請や発注者から差し戻されるリスクが上がっています。請負金額500万円超・公共工事・元請から内訳要求があった場合は、原則として「一式」ではなく内訳記載が必要です。",
          },
        ]}
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
            <span className="text-gray-700">一式の書き方・使い方</span>
          </nav>
          <Link
            href="/construction/guide"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat
              className="w-4 h-4 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            ← ガイド一覧に戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書・請求書の「一式」の書き方・使い方ガイド【記載例付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月26日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書を作成する際、明細欄に「一式」と記載するケースがあります。建設業では特に、工事費用やサービスをまとめて提示する場面で広く使われています。しかし改正建設業法 2025 の施行後、「一式」表記の使い方を誤ると元請や発注者からの差し戻し・信頼低下を招くこともあります。この記事では、見積書における「一式」の正しい書き方、使う場面、メリット・デメリット、改正建設業法との関係を解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」とは？使う場面と意味
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書における「一式」とは、複数の作業や部品、サービスをまとめて1つの項目として記載する方法です。単位欄に「式」と書き、数量を「1」とするのが一般的です。個々の項目を細かく分けるのが難しい場合や、まとめて提示したほうが分かりやすい場合に使われます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業で「一式」がよく使われる場面:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">建設・リフォーム工事:</span>{" "}
              「内装工事一式」「外壁塗装工事一式」など、材料費と施工費をまとめて記載する場合
            </li>
            <li>
              <span className="font-semibold">設備導入:</span>{" "}
              「エアコン設置工事一式」「ネットワーク機器導入一式」など、機材と作業費をまとめる場合
            </li>
            <li>
              <span className="font-semibold">仮設・諸経費:</span>{" "}
              「仮設工事一式」「諸経費一式」のように、補助的な費用を簡潔にまとめる場合
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」は法律上の定義がある用語ではなく、商慣習として使われている表現です。そのため、取引先によって受け取り方が異なる場合がある点は理解しておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            改正建設業法 2025 との関係（最重要）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            2025 年 12 月施行の改正建設業法では、「一式」表記の適正化が明記されました。完全禁止ではないものの、以下の場合は「一式」ではなく内訳展開が必要です:
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>請負金額500万円を超える工事</li>
            <li>元請から労務費・材料費の分離を求められた場合</li>
            <li>公共工事・官庁営繕工事</li>
            <li>発注者が明細を要求した場合（拒否できません）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            小規模な追加工事や緊急修繕のみ、合理的な範囲で「一式」を使える余地があります。改正法対応の詳細は{" "}
            <Link
              href="/construction/guide/kaisei-kensetsu-2025"
              className="text-kenmitsu-navy hover:underline"
            >
              改正建設業法2025【完全ガイド】
            </Link>
            をご確認ください。
          </p>

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
            <p className="text-sm text-gray-500 mb-2">記載例2: 仮設工事</p>
            <div className="text-gray-800 font-mono text-sm space-y-1">
              <p>品名: 仮設工事一式（足場・養生・廃材処理含む）</p>
              <p>数量: 1　単位: 式　単価: 200,000　金額: 200,000</p>
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
            <li>
              品名には「一式」の対象範囲がわかる説明を付け加える（例: 「材料費・施工費含む」）
            </li>
            <li>数量は「1」、単位は「式」と記載する</li>
            <li>備考欄に「一式」に含まれる主な作業内容を簡潔に記載すると丁寧</li>
            <li>複数の「一式」項目がある場合は、カテゴリごとに分けて記載する</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」を使うメリット・デメリット
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            メリット
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">見積書がシンプルになる:</span>{" "}
              数十項目に及ぶ明細を1行にまとめられるため、書類が読みやすくなります。
            </li>
            <li>
              <span className="font-semibold">見積作成の工数を削減できる:</span>{" "}
              細かい項目ごとに単価を算出する手間が省け、見積書の作成スピードが上がります。
            </li>
            <li>
              <span className="font-semibold">価格交渉の余地を残せる:</span>{" "}
              内訳を詳細に開示しないことで、個別項目ごとの値引き交渉を避けやすくなります。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            デメリット
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">透明性が低いと感じられる:</span>{" "}
              取引先が「何にいくらかかっているのか分からない」と感じ、不信感を抱く場合があります。
            </li>
            <li>
              <span className="font-semibold">追加費用のトラブルが起きやすい:</span>{" "}
              「一式」に含まれる範囲が曖昧だと、認識のずれからトラブルになることがあります。
            </li>
            <li>
              <span className="font-semibold">改正建設業法上のリスク:</span>{" "}
              内訳展開が求められる場面で「一式」を使うと、元請からの差し戻し・信用低下に繋がります。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「一式」を使うべきケースと避けるべきケース
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            一式を使ってよいケース
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              小規模工事（請負金額500万円以下）で内訳展開が現実的でない場合
            </li>
            <li>
              緊急修繕など、事前見積を出す時間が限られているケース
            </li>
            <li>
              仮設・諸経費など、補助的な費用を簡潔にまとめる場合
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            一式を避けるべきケース
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">公共工事・官庁営繕工事:</span>{" "}
              項目ごとの内訳提示が原則として求められます。一式のみの見積書は受理されないケースが大半です。
            </li>
            <li>
              <span className="font-semibold">請負金額500万円超の民間工事:</span>{" "}
              改正建設業法上、可能な限りの内訳展開が推奨されます。
            </li>
            <li>
              <span className="font-semibold">元請から内訳を求められた場合:</span>{" "}
              拒否すると差し戻しになるため、必ず内訳を提示します。
            </li>
            <li>
              <span className="font-semibold">相見積もり（複数社比較）が前提の場合:</span>{" "}
              詳細見積もりのほうが選ばれやすくなります。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            内訳明細を求められた場合の対応
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」で見積もりを提出した後、取引先から「内訳を見せてほしい」と求められることは珍しくありません。改正建設業法上、明細要求は拒否できないので、以下のように対応しましょう。
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
            取引先の要望に応じて、「一式」を分解した詳細見積書を再作成して提出する方法です。項目を細分化しつつ、合計金額は変えないようにします。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3. 内訳開示の範囲を調整する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            すべての項目を詳細に開示する必要はありません。大分類（例: 材料費・労務費・諸経費）に分けて提示するだけでも、取引先の理解を得られることが多いです。自社の利益構造が見えすぎないよう、開示する粒度を適切にコントロールしましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ケンミツの「一式」検知機能
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <Link
              href="/construction"
              className="text-kenmitsu-navy hover:underline font-bold"
            >
              ケンミツ
            </Link>
            の有料プランでは、リアルタイム法令チェッカーが「一式」表記を検知して警告します。改正法対応の見積書を作成する過程で、知らずに「一式」を使ってしまうことを防げます。
          </p>

          <div className="mt-12 bg-kenmitsu-navy900 rounded-xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              改正建設業法 2025 対応の見積書を、ケンミツで
            </h2>
            <p className="text-white/70 mb-4 text-sm">
              メアド登録だけで利用開始 / 有料プラン月¥1,980〜・「一式」検知・労務費内訳明示・諸経費自動計算
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
                  href="/construction/guide/labor-cost"
                  className="text-kenmitsu-navy hover:underline"
                >
                  見積書の人件費の書き方
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
