import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問 | 見積書メーカー",
  description:
    "見積書メーカーに関するよくある質問をまとめました。料金・テンプレート・PDF出力・データ保存・スマホ対応など。",
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
    a: "スタンダード・ミニマル・プレミアム・ブルー・モノクロ・カラフル・建設業向け・罫線の8種類からお選びいただけます。",
  },
  {
    q: "消費税の計算は自動でされますか？",
    a: "はい、品目の単価と数量を入力すると、小計・消費税（10%）・合計が自動で計算されます。税率の変更も可能です。",
  },
  {
    q: "インボイス制度に対応していますか？",
    a: "はい、適格請求書発行事業者の登録番号を入力する欄があり、インボイス制度（適格請求書等保存方式）に対応した見積書を作成できます。",
  },
  {
    q: "請求書や納品書も作れますか？",
    a: "はい、請求書メーカーと納品書メーカーもご用意しています。いずれも無料・登録不要でご利用いただけます。",
  },
  {
    q: "作成した見積書を保存できますか？",
    a: "現時点ではブラウザを閉じるとデータはリセットされます。PDFとしてダウンロードして保存することをおすすめします。なお、会社情報はブラウザに自動保存されるため、次回以降の入力の手間が省けます。",
  },
  {
    q: "不具合や要望はどこから送れますか？",
    a: "お問い合わせページのフォームからご連絡ください。",
  },
];

// FAQPage JSON-LD
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">よくある質問</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
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

        {/* 関連リンク */}
        <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-3">関連ページ</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目を解説
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                消費税の書き方・インボイス対応
              </Link>
            </li>
            <li>
              <Link href="/tools/excel-template" className="text-blue-600 hover:underline text-sm">
                見積書Excelテンプレート（無料ダウンロード）
              </Link>
            </li>
          </ul>
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
