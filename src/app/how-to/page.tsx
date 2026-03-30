import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使い方 | 見積書メーカー",
  description: "見積書メーカーの使い方を解説します。登録不要・無料で見積書をかんたんに作成できます。",
};

const steps = [
  {
    step: 1,
    title: "テンプレートを選ぶ",
    description:
      "「スタンダード」「ミニマル」「プレミアム」の3種類からデザインを選択。用途やシーンに合わせてお好みのスタイルをお使いください。",
  },
  {
    step: 2,
    title: "見積情報を入力する",
    description:
      "見積番号・件名・見積日・有効期限を入力します。右側のプレビューにリアルタイムで反映されるので、仕上がりを確認しながら作業できます。",
  },
  {
    step: 3,
    title: "宛先・自社情報を入力する",
    description:
      "請求先の会社名・担当者名と、自社の会社名・住所・電話番号・メールアドレスなどを入力します。",
  },
  {
    step: 4,
    title: "品目を追加する",
    description:
      "品目名・数量・単価を入力すると、金額・小計・消費税・合計が自動計算されます。品目は複数追加可能です。",
  },
  {
    step: 5,
    title: "PDFで出力する",
    description:
      "内容が確認できたら「PDFをダウンロード」ボタンをクリック。A4サイズのPDFがすぐに生成されます。そのまま印刷・メール添付が可能です。",
  },
];

export default function HowToPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">使い方</h1>
        <p className="text-gray-500 mb-8">見積書メーカーは登録不要・完全無料でご利用いただけます。</p>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded-lg shadow-sm p-6 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                {s.step}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">{s.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            さっそく使ってみる
          </Link>
        </div>
      </main>
    </div>
  );
}
