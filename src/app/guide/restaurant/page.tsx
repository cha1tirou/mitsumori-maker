import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";

export const metadata: Metadata = {
  title: "飲食店・レストランの見積書の書き方ガイド | 見積書メーカー",
  description:
    "飲食店・レストランの見積書の書き方を解説。ケータリング・仕出し・宴会プランの見積書に必要な項目、料理単価の記載方法、注意点をわかりやすくまとめました。",
  openGraph: {
    title: "飲食店・レストランの見積書の書き方ガイド | 見積書メーカー",
    description:
      "飲食店・レストランの見積書の書き方を解説。ケータリング・仕出し・宴会プランに必要な項目と注意点をまとめました。",
    url: "https://mitsumori-maker.com/guide/restaurant",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E9%A3%B2%E9%A3%9F%E5%BA%97%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "飲食店の見積書の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/restaurant",
  },
};

export default function RestaurantGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="飲食店・レストランの見積書の書き方ガイド"
        description="飲食店・レストランの見積書の書き方を解説。ケータリング・仕出し・宴会プランに必要な項目と注意点をまとめました。"
        slug="restaurant"
        faqs={[
          { question: "飲食店の見積書で消費税は何%を適用すればよいですか？", answer: "店内飲食・ケータリングで人が配膳するサービスは10%、テイクアウト・仕出し弁当の配達のみは軽減税率8%が適用されます。一つの見積書に8%と10%の品目が混在する場合は、税率ごとに小計を分けて記載してください。" },
          { question: "ケータリングの見積書で必ず記載すべき項目は何ですか？", answer: "料理・ドリンク明細（品名・単価・数量）、配送料・スタッフ派遣費、サービス料、会場使用料（該当する場合）、最終人数確定日、キャンセルポリシーが必須です。インボイス対応として登録番号も忘れずに記載しましょう。" },
          { question: "宴会プランの見積書で人数変更に備えるには？", answer: "見積書の備考や前提条件の欄に「最終人数確定日」「キャンセルポリシー（何日前まで変更可能か）」「最低保証人数」を明記することで、直前の人数変更によるトラブルを防止できます。" }
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">飲食店・レストランの見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            飲食店・レストランの見積書の書き方ガイド
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月1日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            飲食店やレストランでも、ケータリング、仕出し弁当、宴会・パーティープラン、法人向けの定期配食サービスなど、見積書を求められる場面は少なくありません。しかし、飲食業ならではの項目や注意点があり、初めて作成する方は何をどう書けばよいか迷いがちです。この記事では、飲食店の見積書に必要な項目、業態別の書き方のポイント、よくあるトラブルと対策を詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            飲食店で見積書が必要になる場面
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲食店では、通常の来店客に対して見積書を発行することはほとんどありませんが、以下のような場面では見積書の提出が求められます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>ケータリング・出張料理</strong>：企業のイベント、展示会、撮影現場などへの出張料理。料理の内容・人数・配送費・スタッフ派遣費などを事前に提示する必要があります。
            </li>
            <li>
              <strong>仕出し弁当・オードブル</strong>：会議用弁当や法事の仕出しなど、まとまった数量の注文。単価×数量の明細が求められます。
            </li>
            <li>
              <strong>宴会・パーティープラン</strong>：忘年会、歓送迎会、結婚式二次会など。コース料理・飲み放題・会場使用料・装飾費などをまとめた見積書を作成します。
            </li>
            <li>
              <strong>法人契約・定期配食</strong>：社員食堂の運営委託や、企業への日替わり弁当の定期配送。月額料金や契約条件を含めた見積書が必要です。
            </li>
            <li>
              <strong>内装工事・店舗改装の発注</strong>：飲食店オーナーとして内装業者や設備業者に見積もりを依頼する側になるケースもあります。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            飲食店の見積書に記載すべき項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲食業の見積書には、一般的な見積書の項目に加えて、業態特有の情報を盛り込む必要があります。以下の項目を漏れなく記載しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 基本情報
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>見積書番号・発行日</li>
            <li>宛先（会社名・担当者名）</li>
            <li>自社の店舗名・住所・連絡先</li>
            <li>見積有効期限</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 料理・ドリンクの明細
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書のメインとなる部分です。料理名・単価・数量・小計を明細で記載します。コース料理の場合は「コース名（内容概要）×人数」とまとめて記載する方法と、料理を1品ずつ記載する方法があります。法人向けの場合は、コースの内容（前菜・メイン・デザートなど）を概要で添えると丁寧です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲み放題プランがある場合は、料理とは別項目で「飲み放題（2時間）×人数」のように記載します。アルコールの有無やドリンクの種類（ビール・ワイン・ソフトドリンクなど）の範囲を備考に添えるとトラブルを防げます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. サービス料・会場費
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            レストランでの宴会やパーティーでは、サービス料（通常10〜15%）や個室・会場の使用料が発生することがあります。これらは料理代とは別項目で明記しましょう。「サービス料は飲食代金の10%」のように計算根拠も記載すると明瞭です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 配送料・出張費（ケータリングの場合）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ケータリングや仕出しでは、配送料・出張スタッフの人件費・機材搬入費が追加で発生します。距離や規模によって変動する場合は、その旨を備考に記載しておきます。配送先の住所や搬入経路の確認が必要な場合も、条件として明記しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 消費税・合計金額
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲食業では軽減税率（8%）と標準税率（10%）が混在する点に注意が必要です。店内飲食は10%、テイクアウト・仕出し弁当は8%が適用されます。ケータリングは「配膳等のサービスを伴う場合は10%」「届けるだけの場合は8%」と区分が異なるため、税率ごとに小計を分けて記載するのが正確です。インボイス制度への対応として、適格請求書発行事業者の登録番号も忘れずに記載しましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            業態別・見積書作成のポイント
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ケータリングの見積書
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ケータリングの見積書では、料理代に加えて出張費・スタッフ派遣費・機材費・設営撤去費を項目ごとに分けて記載します。会場の設備状況（キッチンの有無、電源、水道など）によって費用が変動するため、「現地下見後に最終金額を確定」と条件を付ける場合もあります。最低注文金額や最低人数がある場合は明記しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            仕出し弁当の見積書
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            仕出し弁当は比較的シンプルで、「弁当名×単価×数量」が基本構成です。ただし、容器代（使い捨て or 回収）、アレルギー対応の有無、配送料（無料配送の最低注文数）、キャンセルポリシー（何日前まで無料変更可能か）を備考や条件として記載しておくとトラブルを避けられます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            宴会・パーティープランの見積書
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            宴会プランの見積書は項目が多くなりがちです。コース料理・飲み放題・会場使用料・サービス料・装飾費・音響設備費・プロジェクター使用料など、必要な項目をすべて洗い出して記載します。人数変動に備えて「最終人数確定は○日前まで」「人数減少の場合、最低保証人数は○名」などの条件を必ず入れましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            飲食店の見積書でよくあるトラブルと対策
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル1：人数変更への対応
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            宴会やケータリングでは、直前の人数変更が頻繁に発生します。食材の仕入れは数日前に行うため、「最終人数確定日」と「確定後の変更可能範囲（増減○名まで）」を見積書の条件に明記しておきましょう。キャンセル料についても段階的に設定（7日前まで無料、3日前まで50%、前日以降100%など）しておくと安心です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル2：軽減税率の適用ミス
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            前述のとおり、飲食業では8%と10%の税率が混在します。特にケータリングは提供形態によって税率が変わるため、見積書の段階で税率の適用区分を明確にしておく必要があります。「店内提供：10%」「テイクアウト・配達のみ：8%」と明示することで、請求時のトラブルを防止できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル3：アレルギー・食事制限への対応漏れ
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            法人向けの大人数の食事提供では、アレルギーや宗教上の食事制限への対応を求められることがあります。対応可能な範囲と追加料金の有無を見積書に記載し、「アレルギー情報は○日前までにお知らせください」と条件を付けておくことが重要です。対応できない場合もその旨を明記しましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲食店の見積書は、業態や提供形態によって記載すべき項目が変わりますが、以下のポイントを押さえておけば、どのケースにも対応できます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>料理・ドリンクの明細は単価と数量を明確に記載する</li>
            <li>サービス料・会場費・配送料は料理代と分けて記載する</li>
            <li>軽減税率（8%）と標準税率（10%）の適用区分を明示する</li>
            <li>人数変更・キャンセルポリシーを条件として盛り込む</li>
            <li>アレルギー対応の可否と確認期限を明記する</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            丁寧で分かりやすい見積書は、お客様からの信頼獲得にもつながります。テンプレートを用意しておけば、毎回の見積作成がスムーズになるので、ぜひ活用してみてください。
          </p>

          <ToolCallout steps={[
            "トップページで「差出人」に店舗名・住所を入力",
            "品目にメニュー名やケータリング内容を入力",
            "数量・単価を入力すると消費税（軽減税率8%対応）が自動計算",
            "備考欄に提供条件（配達エリア・キャンセルポリシー等）を記入",
            "テンプレートを選んでPDFダウンロード"
          ]} />
        </article>

        <AuthorProfile />

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/consulting" className="text-blue-600 hover:underline text-sm">
                コンサルタント見積書の書き方ガイド
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
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
