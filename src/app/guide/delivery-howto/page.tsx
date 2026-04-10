import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "納品書の書き方ガイド・必要な記載項目を解説 | 見積書メーカー",
  description:
    "納品書の書き方を初心者向けに解説。必要な記載項目、見積書・請求書との違い、発行タイミング、電子納品書のメリット、無料で作成する方法をまとめました。",
  openGraph: {
    title: "納品書の書き方ガイド・必要な記載項目を解説 | 見積書メーカー",
    description: "納品書の書き方を初心者向けに解説。必要な記載項目、発行タイミングをまとめました。",
    url: "https://mitsumori-maker.com/guide/delivery-howto",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E7%B4%8D%E5%93%81%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%82%AC%E3%82%A4%E3%83%89",
        width: 1200,
        height: 630,
        alt: "納品書の書き方ガイド",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/delivery-howto",
  },
};

export default function GuideDeliveryHowtoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="納品書の書き方ガイド・必要な記載項目を解説"
        description="納品書の書き方を初心者向けに解説。必要な記載項目、発行タイミングをまとめました。"
        slug="delivery-howto"
        datePublished="2026-04-02"
        dateModified="2026-04-02"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link>
            <span className="mx-1">/</span>
            <span>ガイド</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">納品書の書き方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            納品書の書き方ガイド・必要な記載項目を解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          {/* --- 導入 --- */}
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書は、商品やサービスを納品した際に「何を・いくつ・いつ届けたか」を証明する重要な書類です。取引先との信頼関係を築くうえで欠かせないだけでなく、経理処理や税務調査の際にも必要になります。この記事では、納品書の基本的な書き方から必要な記載項目、発行タイミング、電子化のメリットまで、初心者にもわかりやすく解説します。
          </p>

          {/* --- 1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            納品書とは？見積書・請求書との違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書は、商品やサービスの引き渡し時に発行する書類で、「確かにこの内容で納品しました」という事実を記録する役割を持ちます。見積書・請求書と合わせて「取引の三点セット」と呼ばれ、それぞれ発行するタイミングと目的が異なります。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">書類</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">タイミング</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">役割</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">見積書</td>
                  <td className="px-4 py-2 text-gray-700">取引前</td>
                  <td className="px-4 py-2 text-gray-700">金額・条件の提示</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">納品書</td>
                  <td className="px-4 py-2 text-gray-700">納品時</td>
                  <td className="px-4 py-2 text-gray-700">納品内容の確認・証明</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">請求書</td>
                  <td className="px-4 py-2 text-gray-700">納品後</td>
                  <td className="px-4 py-2 text-gray-700">代金の請求</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は「いくらかかるか」を事前に提示する書類、請求書は「この金額を支払ってください」と通知する書類です。一方、納品書は「この内容で納品しました」という事実を双方で確認するための書類であり、金銭の授受ではなく納品内容の記録に主眼が置かれています。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書は法律上の発行義務はありませんが、取引先から求められることが多く、ビジネス慣行として発行するのが一般的です。特にBtoB取引では、納品書がなければ検収プロセスが進まないケースもあるため、必ず用意しましょう。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            三種類の書類の違いについて詳しくは「
            <Link
              href="/guide/difference"
              className="text-blue-600 hover:underline"
            >
              見積書・請求書・納品書の違い
            </Link>
            」もあわせてご覧ください。
          </p>

          {/* --- 2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            納品書に必要な記載項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書に決まったフォーマットはありませんが、以下の項目を記載するのが一般的です。漏れがあると取引先に不信感を与えたり、後日トラブルになる可能性があるため、しっかり確認しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>納品書番号</strong>
              ：管理のために一意の番号を振ります（例：DL-2026-001）。請求書や見積書と紐づけられるよう、連番やプロジェクト単位で管理するのがおすすめです。
            </li>
            <li>
              <strong>納品日</strong>
              ：実際に商品やサービスを納品した日付を記載します。発行日と異なる場合があるため、正確に記入しましょう。
            </li>
            <li>
              <strong>宛先（納品先）</strong>
              ：取引先の会社名・部署名・担当者名を記載します。「御中」「様」の使い分けにも注意が必要です。
            </li>
            <li>
              <strong>発行者情報</strong>
              ：自社の会社名・住所・電話番号・メールアドレスを記載します。社印（角印）を押す場合もあります。
            </li>
            <li>
              <strong>品目・サービス内容</strong>
              ：納品した商品やサービスの名称・仕様を具体的に記載します。「Webサイト制作一式」のように曖昧な表現は避け、可能な限り詳細に書きましょう。
            </li>
            <li>
              <strong>数量・単価</strong>
              ：各品目の数量と単価を記載します。サービス業の場合は「1式」と記載することもあります。
            </li>
            <li>
              <strong>金額（税抜・税込）</strong>
              ：各品目の金額と、消費税額、合計金額を明記します。見積書や請求書の金額と一致しているか必ず確認しましょう。
            </li>
            <li>
              <strong>備考欄</strong>
              ：納品条件や注意事項、保証期間などがあれば記載します。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度に対応する場合は、適格請求書発行事業者の登録番号（T＋13桁）や税率ごとの消費税額も記載します。詳しくは「
            <Link
              href="/guide/invoice-howto"
              className="text-blue-600 hover:underline"
            >
              請求書の書き方ガイド
            </Link>
            」のインボイス対応セクションを参考にしてください。
          </p>

          {/* --- 3 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            納品書の発行タイミングと送付方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書は、原則として商品やサービスを納品するタイミングで発行します。具体的なタイミングは取引の種類によって異なります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>
              <strong>物品の納品</strong>
              ：商品に同封する、または配送と同時に別送するのが一般的です
            </li>
            <li>
              <strong>サービスの納品</strong>
              ：成果物（データ・報告書など）の納品と同時にメールやクラウドで送付します
            </li>
            <li>
              <strong>継続取引</strong>
              ：月末締めで当月分の納品書をまとめて発行するケースもあります
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            送付方法としては、以下の3つが主流です。
          </p>
          <div className="space-y-3 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                1. メールでPDF送付（最も一般的）
              </p>
              <p className="text-gray-600 text-sm">
                PDFファイルを添付して送付する方法です。即座に届き、保管も容易です。電子帳簿保存法の要件を満たすため、受領側も電子データのまま保存できます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                2. 郵送
              </p>
              <p className="text-gray-600 text-sm">
                紙の納品書を郵送する従来型の方法です。官公庁や大企業との取引では、紙での提出を求められることもあります。到着までに数日かかるため、余裕を持って発送しましょう。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                3. 商品に同封
              </p>
              <p className="text-gray-600 text-sm">
                物品販売の場合、商品と一緒に納品書を同封するのが最もシンプルな方法です。受取人がすぐに内容を確認できるメリットがあります。
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先によっては検収書（受領確認書）の返送を求める場合もあります。特に高額な取引やプロジェクト型の業務では、検収完了の証拠を残しておくことがトラブル防止につながります。
          </p>

          {/* --- 4 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            電子納品書（PDF）のメリットと注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            近年、納品書を紙ではなくPDFなどの電子データで発行・送付する「電子納品書」が急速に普及しています。電子帳簿保存法の改正もあり、電子化は今後ますます進むと見込まれます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>電子納品書のメリット</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>印刷・郵送のコストが不要（切手代・封筒代・インク代が節約できる）</li>
            <li>送付から到着まで即座に完了するため、取引がスピードアップする</li>
            <li>デジタルデータのため、検索・管理が容易で保管スペースも不要</li>
            <li>バックアップが簡単で、紛失のリスクが低い</li>
            <li>環境負荷の低減にも貢献できる</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>電子納品書の注意点</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>電子帳簿保存法に基づき、受領した電子データは電子のまま保存する義務がある</li>
            <li>取引日・取引先名・金額で検索できるよう、ファイル名や管理台帳を整備する必要がある</li>
            <li>取引先が紙での受領を希望する場合もあるため、事前に確認しておく</li>
            <li>PDFの改ざん防止のため、タイムスタンプの付与や、編集不可の設定を検討する</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            電子化の詳しいメリットについては「
            <Link
              href="/guide/electronic"
              className="text-blue-600 hover:underline"
            >
              見積書を電子化・PDF化するメリット
            </Link>
            」の記事も参考になります。
          </p>

          {/* --- 5 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            無料で納品書を作成する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書を作成する方法はいくつかありますが、コストや手間を考えると、オンラインツールを使うのが最もおすすめです。
          </p>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                1. オンラインツールを使う（おすすめ）
              </p>
              <p className="text-gray-600 text-sm">
                ブラウザ上でフォームに入力するだけで、見栄えの良い納品書をPDF出力できます。計算ミスが起きにくく、インボイス対応の納品書もかんたんに作成可能です。当サイトの「納品書メーカー」なら登録不要・完全無料で使えます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                2. Excelテンプレートを使う
              </p>
              <p className="text-gray-600 text-sm">
                Excel用の納品書テンプレートをダウンロードして使う方法です。自社の書式に合わせて自由にカスタマイズできますが、レイアウト崩れや計算ミスに注意が必要です。PDF変換時に体裁が変わることもあります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                3. 会計ソフト・業務管理ツールを使う
              </p>
              <p className="text-gray-600 text-sm">
                freeeやマネーフォワードなどの会計ソフトや、boardなどの業務管理ツールには納品書発行機能があります。見積書→納品書→請求書の連携が自動化できるメリットがありますが、有料プランが必要な場合があります。
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            フリーランスや個人事業主の方で、手軽に納品書を作成したい場合は、まずはオンラインツールを試してみましょう。テンプレートの選び方に迷ったら「
            <Link
              href="/guide/template-excel"
              className="text-blue-600 hover:underline"
            >
              見積書テンプレート（Excel・PDF）の選び方
            </Link>
            」も参考にしてください。
          </p>

          {/* 関連ガイド */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連ガイド
          </h2>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/guide/difference"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書・請求書・納品書の違い
              </Link>
            </li>
            <li>
              <Link
                href="/guide/invoice-howto"
                className="text-blue-600 hover:underline text-sm"
              >
                請求書の書き方ガイド・必要な記載項目を解説
              </Link>
            </li>
            <li>
              <Link
                href="/guide/electronic"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書を電子化・PDF化するメリット
              </Link>
            </li>
            <li>
              <Link
                href="/guide/how-to-write"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書の書き方・必要項目を解説
              </Link>
            </li>
          </ul>
        </article>

        {/* CTA -- 納品書メーカーへの導線 */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">納品書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・インボイス対応・PDF出力
          </p>
          <Link
            href="/tools/delivery"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            納品書メーカーを使う &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
