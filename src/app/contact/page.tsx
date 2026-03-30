import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ | 見積書メーカー",
  description: "見積書メーカーへのお問い合わせページです。",
};

export default function ContactPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">お問い合わせ</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-gray-700 leading-relaxed">
          <p className="mb-6">ご質問・ご要望・不具合報告などはこちらからどうぞ。</p>
          <a
            href="https://forms.gle/C84aWttZZq37DU5LA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            お問い合わせフォームを開く
          </a>
          <p className="text-sm text-gray-500 mt-6">
            ※ 内容によっては返答までにお時間をいただく場合があります。
          </p>
        </div>
      </main>
    </div>
  );
}
