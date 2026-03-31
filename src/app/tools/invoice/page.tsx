import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "請求書メーカー｜無料で請求書を作成・PDF出力【準備中】 | 見積書メーカー",
  description:
    "登録不要・完全無料の請求書作成ツールを準備中です。見積書メーカーと連携して、見積書から請求書をワンクリックで作成できる機能を開発予定。",
};

export default function InvoicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            請求書メーカー（準備中）
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月31日</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 font-semibold mb-2">
              請求書メーカーは現在開発中です
            </p>
            <p className="text-blue-700 text-sm">
              見積書メーカーと連携して、作成済みの見積書から請求書をワンクリックで生成できる機能を準備しています。リリースまでの間は、見積書メーカーをご活用ください。
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            請求書メーカーで実現予定の機能
          </h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>見積書からの自動変換</strong>：見積書メーカーで作成した見積書のデータをそのまま請求書に変換。二度手間を解消します。
            </li>
            <li>
              <strong>インボイス制度対応</strong>：適格請求書の要件を満たしたフォーマットで出力。登録番号・税率ごとの消費税額を自動記載します。
            </li>
            <li>
              <strong>PDF出力</strong>：見積書メーカーと同様に、ワンクリックでPDFをダウンロード可能。
            </li>
            <li>
              <strong>振込先情報の保存</strong>：銀行口座情報を保存して、毎回の入力を省略できます。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書と請求書の違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は取引前に金額と条件を提示する書類で、請求書は納品後に代金の支払いを求める書類です。見積書で合意した金額を、そのまま請求書に転記するのが基本的な流れです。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書には見積書にはない「振込先情報」「支払期限」の記載が必要です。また、インボイス制度に対応する場合は「適格請求書発行事業者の登録番号」「税率ごとの消費税額」の記載も求められます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            詳しくは以下のガイド記事で解説しています。
          </p>
          <ul className="space-y-2 mb-6">
            <li>
              <Link href="/guide/difference" className="text-blue-600 hover:underline text-sm">
                見積書・請求書・納品書の違いをわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            今すぐ見積書を作成する
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書メーカーの完成をお待ちの間は、まず見積書メーカーで見積書を作成しましょう。登録不要・完全無料で、プロフェッショナルな見積書をすぐに作成できます。
          </p>
        </article>

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
