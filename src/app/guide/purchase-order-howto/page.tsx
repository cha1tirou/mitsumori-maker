import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "発注書の書き方ガイド・必要な記載項目を解説 | 見積書メーカー",
  description:
    "発注書の書き方を初心者向けに解説。発注書に必要な記載項目、見積書・請求書との違い、発行タイミング、発注書がない場合のリスクまで。無料テンプレートも紹介。",
  openGraph: {
    title: "発注書の書き方ガイド・必要な記載項目を解説 | 見積書メーカー",
    description:
      "発注書の書き方を解説。記載項目、発行タイミング、見積書との違い、無料テンプレートまで網羅。",
    url: "https://mitsumori-maker.com/guide/purchase-order-howto",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E7%99%BA%E6%B3%A8%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%82%AC%E3%82%A4%E3%83%89",
        width: 1200,
        height: 630,
        alt: "発注書の書き方ガイド",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/purchase-order-howto",
  },
};

export default function PurchaseOrderHowtoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="発注書の書き方ガイド・必要な記載項目を解説"
        description="発注書の書き方を初心者向けに解説。必要な記載項目、見積書との違い、発行タイミング、発注書がない場合のリスクまで。"
        slug="purchase-order-howto"
        datePublished="2026-04-03"
        dateModified="2026-04-03"
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
            <span className="text-gray-700">発注書の書き方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            発注書の書き方ガイド・必要な記載項目を解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月3日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            発注書（注文書）は、取引先に対して商品やサービスの発注を正式に伝える書類です。口頭やメールだけのやり取りでは、後から「発注した・していない」のトラブルが起きることがあります。発注書を作成・発行することで、取引内容を明確にし、双方の認識のずれを防ぐことができます。この記事では、発注書の書き方・必要な記載項目から、発行タイミング、発注書がない場合のリスクまで詳しく解説します。
          </p>

          {/* H2-1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            発注書とは？見積書・請求書との違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注書は、発注者（買い手）が受注者（売り手）に対して「この内容で正式に発注します」と意思表示する書類です。見積書・納品書・請求書と並んで、取引の流れを構成する重要な書類のひとつです。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引の一般的な流れは以下のようになります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-gray-800 text-sm space-y-1">
              <p>1. 見積書（売り手 → 買い手）: 金額・条件を提示する</p>
              <p>2. <span className="font-semibold">発注書（買い手 → 売り手）: 発注の意思を正式に伝える</span></p>
              <p>3. 注文請書（売り手 → 買い手）: 発注を受けたことを確認する</p>
              <p>4. 納品書（売り手 → 買い手）: 商品・サービスを納品する</p>
              <p>5. 請求書（売り手 → 買い手）: 代金を請求する</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書が「いくらでできるか」の提案であるのに対し、発注書は「この条件で注文する」という意思表示です。法的には、発注書は「申込み」にあたり、受注者がこれを承諾した時点で契約が成立します。見積書と請求書の違いについて詳しくは
            <Link
              href="/guide/difference"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書・請求書・納品書の違いガイド
            </Link>
            をご参照ください。
          </p>

          {/* H2-2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            発注書に必要な記載項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注書には法律で定められた様式はありませんが、取引内容を明確にするために以下の項目を記載するのが一般的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            必須項目
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">タイトル:</span>{" "}
              「発注書」または「注文書」と記載します。
            </li>
            <li>
              <span className="font-semibold">発注日:</span>{" "}
              発注書を発行した日付を記載します。
            </li>
            <li>
              <span className="font-semibold">発注者情報:</span>{" "}
              会社名・住所・電話番号・担当者名を記載します。社印や角印を押印するのが一般的です。
            </li>
            <li>
              <span className="font-semibold">受注者情報:</span>{" "}
              取引先の会社名・担当者名を「御中」「様」をつけて記載します。
            </li>
            <li>
              <span className="font-semibold">発注番号:</span>{" "}
              管理しやすいように通し番号を付けます。見積書の番号と紐づけると便利です。
            </li>
            <li>
              <span className="font-semibold">発注内容（明細）:</span>{" "}
              品名・数量・単価・金額を項目ごとに記載します。見積書の内容と一致させることが重要です。
            </li>
            <li>
              <span className="font-semibold">合計金額:</span>{" "}
              小計・消費税・税込合計を記載します。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            記載が望ましい項目
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">納期（希望納品日）:</span>{" "}
              いつまでに納品してほしいかを明記します。
            </li>
            <li>
              <span className="font-semibold">納品場所:</span>{" "}
              納品先が発注者の所在地と異なる場合に記載します。
            </li>
            <li>
              <span className="font-semibold">支払条件:</span>{" "}
              「納品後30日以内に銀行振込」など、支払いの方法と期限を記載します。
            </li>
            <li>
              <span className="font-semibold">参照見積書番号:</span>{" "}
              どの見積書に基づく発注なのかを明記すると、双方の照合がスムーズです。
            </li>
            <li>
              <span className="font-semibold">備考:</span>{" "}
              特記事項や注意点を記載します。
            </li>
          </ul>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">発注書の記載例</p>
            <div className="text-gray-800 text-sm space-y-1">
              <p className="font-semibold">発注書</p>
              <p>発注日: 2026年4月3日</p>
              <p>発注番号: PO-2026-0042</p>
              <p>参照見積書: EST-2026-0038</p>
              <p className="mt-2">株式会社〇〇 御中</p>
              <p className="mt-2 border-t border-gray-200 pt-2">Webサイトリニューアル制作　1式　800,000円</p>
              <p>SEO対策オプション　1式　150,000円</p>
              <p className="border-t border-gray-200 pt-1 mt-1">小計: 950,000円</p>
              <p>消費税（10%）: 95,000円</p>
              <p className="font-bold">合計: 1,045,000円</p>
              <p className="mt-2">納期: 2026年5月31日</p>
              <p>支払条件: 納品後30日以内に銀行振込</p>
            </div>
          </div>

          {/* H2-3 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            発注書の発行タイミングと送付方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注書は、見積書の内容を確認・合意した後に発行します。具体的には以下のタイミングです。
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>取引先から見積書を受領する</li>
            <li>見積書の内容（金額・納期・条件）を社内で確認・承認する</li>
            <li>発注書を作成し、取引先へ送付する</li>
            <li>取引先が発注書を受領し、作業や準備を開始する</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            送付方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注書の送付方法は、取引先との合意に応じて以下から選択します。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">メール（PDF添付）:</span>{" "}
              現在最も一般的な方法です。PDF形式で発注書を添付し、メール本文に簡潔な挨拶を記載します。書類送付時のメール文例については
              <Link
                href="/guide/email"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書メールの書き方ガイド
              </Link>
              も参考になります。
            </li>
            <li>
              <span className="font-semibold">郵送:</span>{" "}
              正式な書面として郵送する場合は、角印を押印した原本を送付します。建設業など、紙の書類が求められる業界で多く使われます。
            </li>
            <li>
              <span className="font-semibold">FAX:</span>{" "}
              一部の業界や中小企業では、FAXでの送付が残っています。送付後に電話で受領確認するのが慣例です。
            </li>
            <li>
              <span className="font-semibold">クラウドサービス:</span>{" "}
              クラウド型の受発注管理サービスを利用すれば、作成・送付・管理を一元化できます。
            </li>
          </ul>

          {/* H2-4 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            発注書がない場合のリスク
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「口頭やメールで発注すればいいのでは？」と考える方もいますが、発注書を発行しないことには以下のリスクがあります。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">発注内容の認識齟齬:</span>{" "}
              口頭での発注は、数量や仕様の聞き間違い・記憶違いが起こりやすいです。発注書があれば、内容を書面で確認できるため、ミスを大幅に減らせます。
            </li>
            <li>
              <span className="font-semibold">契約トラブル:</span>{" "}
              発注書がないと、「発注した・していない」「金額が違う」といったトラブルが発生した際に、証拠として示せるものがありません。発注書は契約の証拠書類として機能します。
            </li>
            <li>
              <span className="font-semibold">下請法違反:</span>{" "}
              資本金1,000万円以上の企業が、下請事業者に対して物品の製造や情報成果物の作成を委託する場合、下請法により「3条書面」（発注書面）の交付が義務付けられています。違反した場合は公正取引委員会からの勧告の対象になります。
            </li>
            <li>
              <span className="font-semibold">社内管理の困難:</span>{" "}
              発注書がないと、何をいつ誰に発注したのか、社内で管理・把握するのが困難になります。経理処理や監査の際にも問題になります。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            特にフリーランスや個人事業主の方は、発注書を受け取ることで自身を守ることにもつながります。見積書を提出して合意が得られたら、取引先に発注書の発行を依頼しましょう。見積書の書き方については
            <Link
              href="/guide/how-to-write"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              見積書の書き方ガイド
            </Link>
            をご参照ください。
          </p>

          {/* H2-5 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            無料で発注書を作成する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注書を作成する方法はいくつかありますが、それぞれの特徴を理解して自分に合った方法を選びましょう。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-semibold">Web上の無料ツールを使う:</span>{" "}
              ブラウザ上で必要事項を入力するだけで、発注書をPDF出力できるサービスがあります。インストール不要ですぐに使い始められ、テンプレートのデザインも整っているのがメリットです。
            </li>
            <li>
              <span className="font-semibold">Excelテンプレートを使う:</span>{" "}
              Excelの発注書テンプレートをダウンロードして使う方法です。カスタマイズの自由度が高い反面、レイアウト崩れや計算式のミスに注意が必要です。
            </li>
            <li>
              <span className="font-semibold">会計ソフトの発注書機能を使う:</span>{" "}
              クラウド会計ソフトの中には、見積書→発注書→請求書を一連の流れで作成できるものもあります。取引が多い場合は導入を検討するとよいでしょう。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            「見積書メーカー」では、発注書メーカー機能を提供しています。ブラウザ上で必要事項を入力するだけで、すぐにPDF出力が可能です。登録不要・完全無料でお使いいただけます。請求書の作成方法については
            <Link
              href="/guide/invoice-howto"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              請求書の書き方ガイド
            </Link>
            も参考にしてください。
          </p>

          {/* 関連記事リンク */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連ガイド
          </h2>
          <ul className="text-gray-700 leading-relaxed space-y-2">
            <li>
              <Link
                href="/guide/difference"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書・請求書・納品書の違いを解説
              </Link>
            </li>
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
                href="/guide/invoice-howto"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                請求書の書き方・必要な記載項目を解説
              </Link>
            </li>
            <li>
              <Link
                href="/guide/email"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                見積書メールの書き方・送付時の例文集
              </Link>
            </li>
          </ul>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            発注書を今すぐ無料で作成
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
          <Link
            href="/tools/purchase-order"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            発注書メーカーを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
