import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問 | 見積書メーカー",
  description: "見積書メーカーに関するよくある質問をまとめました。",
};

const faqs = [
  {
    q: "無料で使えますか？",
    a: "はい、完全無料でご利用いただけます。会員登録も不要です。",
  },
  {
    q: "作成したデータはサーバーに保存されますか？",
    a: "いいえ、入力したデータはすべてお使いのブラウザ上で処理されます。サーバーへの送信・保存は一切行われません。",
  },
  {
    q: "PDFの出力に対応していますか？",
    a: "はい、A4サイズのPDFとして出力できます。印刷やメール添付にそのままお使いいただけます。",
  },
  {
    q: "スマートフォンでも使えますか？",
    a: "はい、スマートフォン・タブレットのブラウザからもご利用いただけます。ただし、PDF出力の操作はパソコンでの利用を推奨しています。",
  },
  {
    q: "テンプレートは何種類ありますか？",
    a: "スタンダード・ミニマル・プレミアムの3種類からお選びいただけます。",
  },
  {
    q: "消費税の計算は自動でされますか？",
    a: "はい、品目の単価と数量を入力すると、小計・消費税（10%）・合計が自動で計算されます。",
  },
  {
    q: "作成した見積書を保存できますか？",
    a: "現時点ではブラウザを閉じるとデータはリセットされます。PDFとしてダウンロードして保存することをおすすめします。",
  },
  {
    q: "不具合や要望はどこから送れますか？",
    a: "お問い合わせページのフォームからご連絡ください。",
  },
];

export default function FaqPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">よくある質問</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Q. {faq.q}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          解決しない場合は
          <Link href="/contact" className="text-blue-600 hover:underline mx-1">
            お問い合わせ
          </Link>
          からご連絡ください。
        </div>
      </main>
    </div>
  );
}
