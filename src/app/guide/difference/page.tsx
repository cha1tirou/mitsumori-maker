import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書・請求書・納品書の違いをわかりやすく解説 | 見積書メーカー",
  description:
    "見積書・請求書・納品書の違いと役割を図解付きで解説。それぞれの発行タイミング、記載項目の違い、正しい使い分け方をまとめました。",
  openGraph: {
    title: "見積書・請求書・納品書の違いをわかりやすく解説 | 見積書メーカー",
    description: "見積書・請求書・納品書の違いと役割を解説。発行タイミング、記載項目の違い、使い分け方をまとめました。",
    url: "https://mitsumori-maker.com/guide/difference",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/difference",
  },
};

export default function DifferenceGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書・請求書・納品書の違いをわかりやすく解説"
        description="見積書・請求書・納品書の違いと役割を解説。発行タイミング、記載項目の違い、正しい使い分け方をまとめました。"
        slug="difference"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書・請求書・納品書の違い</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書・請求書・納品書の違いをわかりやすく解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月31日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            ビジネスの取引では「見積書」「請求書」「納品書」という3つの書類が頻繁に登場します。似たような書類に見えますが、それぞれ発行するタイミングや役割が異なります。この記事では、3つの書類の違いを整理し、正しい使い分け方を解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            取引の流れと書類の発行タイミング
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            まず、一般的な取引の流れに沿って、各書類がどのタイミングで発行されるかを確認しましょう。
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded text-sm whitespace-nowrap">
                  STEP 1
                </span>
                <div>
                  <p className="font-semibold text-gray-900">見積書を発行</p>
                  <p className="text-gray-600 text-sm">取引の前に金額・条件を提示する</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded text-sm whitespace-nowrap">
                  STEP 2
                </span>
                <div>
                  <p className="font-semibold text-gray-900">受注・契約</p>
                  <p className="text-gray-600 text-sm">見積もり内容で合意し、正式に契約する</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded text-sm whitespace-nowrap">
                  STEP 3
                </span>
                <div>
                  <p className="font-semibold text-gray-900">納品書を発行</p>
                  <p className="text-gray-600 text-sm">商品・サービスの納品時に発行する</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded text-sm whitespace-nowrap">
                  STEP 4
                </span>
                <div>
                  <p className="font-semibold text-gray-900">請求書を発行</p>
                  <p className="text-gray-600 text-sm">納品後に代金の支払いを求める</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            このように、見積書は取引の「最初」、納品書は「中間」、請求書は「最後」に発行するのが基本的な流れです。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            各書類の役割と記載項目の違い
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            見積書の役割と記載項目
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は、取引の前段階で金額や条件を提示するための書類です。相手に「この金額・条件でいかがですか？」と提案する意味を持ちます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>発行タイミング：受注前（商談・提案段階）</li>
            <li>主な記載項目：品名・数量・単価・金額・合計額・有効期限・納期</li>
            <li>法的拘束力：原則なし（ただし合意があれば契約の根拠になりうる）</li>
            <li>特徴：有効期限の記載が必要、複数社に対して同時に発行できる</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            納品書の役割と記載項目
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            納品書は、商品やサービスを納品したことを証明する書類です。「確かに納品しました」という事実を記録し、受け取り側が内容を確認するために使用します。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>発行タイミング：商品・サービスの納品時</li>
            <li>主な記載項目：品名・数量・単価・金額・納品日</li>
            <li>法的拘束力：納品の証拠として機能する</li>
            <li>特徴：有効期限は不要、納品日の記載が重要</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            請求書の役割と記載項目
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書は、納品した商品やサービスの代金を支払ってもらうために発行する書類です。「この金額をお支払いください」という意味を持ちます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>発行タイミング：納品後（支払い期日前）</li>
            <li>主な記載項目：品名・数量・単価・金額・合計額・支払期限・振込先</li>
            <li>法的拘束力：支払い義務の根拠となる</li>
            <li>特徴：振込先情報の記載が必須、インボイス制度への対応が求められる</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            3つの書類の比較表
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">項目</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">見積書</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">納品書</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">請求書</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">発行タイミング</td>
                  <td className="border border-gray-300 px-4 py-2">受注前</td>
                  <td className="border border-gray-300 px-4 py-2">納品時</td>
                  <td className="border border-gray-300 px-4 py-2">納品後</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">目的</td>
                  <td className="border border-gray-300 px-4 py-2">金額・条件の提示</td>
                  <td className="border border-gray-300 px-4 py-2">納品の証明</td>
                  <td className="border border-gray-300 px-4 py-2">代金の請求</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">有効期限</td>
                  <td className="border border-gray-300 px-4 py-2">あり</td>
                  <td className="border border-gray-300 px-4 py-2">なし</td>
                  <td className="border border-gray-300 px-4 py-2">なし（支払期限あり）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">振込先情報</td>
                  <td className="border border-gray-300 px-4 py-2">不要</td>
                  <td className="border border-gray-300 px-4 py-2">不要</td>
                  <td className="border border-gray-300 px-4 py-2">必要</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">法的義務</td>
                  <td className="border border-gray-300 px-4 py-2">なし</td>
                  <td className="border border-gray-300 px-4 py-2">なし</td>
                  <td className="border border-gray-300 px-4 py-2">インボイス制度で要件あり</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            金額は一致させるのが基本
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書・納品書・請求書の金額は、原則として一致させるのが基本です。見積書で提示した金額と請求書の金額が異なると、取引先に不信感を与えたり、支払いトラブルにつながったりします。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、以下のケースでは金額が変わることがあります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>追加作業が発生した場合</strong>：見積もり時点にはなかった作業が追加された場合は、追加分の見積書を別途発行するか、変更後の金額で再見積書を発行しましょう。
            </li>
            <li>
              <strong>数量が変更された場合</strong>：実際の納品数量が見積もり時と異なる場合、納品書・請求書には実際の数量と金額を記載します。
            </li>
            <li>
              <strong>値引きが発生した場合</strong>：値引きがある場合は、請求書に値引き額を明記し、最終金額を明確にします。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書・請求書・納品書は、それぞれ取引の異なるフェーズで発行される書類です。役割と発行タイミングを正しく理解し、適切に使い分けることで、スムーズな取引と信頼関係の構築につながります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>見積書：取引前に金額と条件を提示する</li>
            <li>納品書：納品時に納品内容を証明する</li>
            <li>請求書：納品後に代金の支払いを請求する</li>
            <li>3つの書類の金額は原則として一致させる</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            まずは取引の第一歩となる見積書の作成から始めてみましょう。
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
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/electronic" className="text-blue-600 hover:underline text-sm">
                見積書を電子化・PDF化するメリットと方法
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
