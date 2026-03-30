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
        <div className="bg-white rounded-lg shadow-sm p-8 text-gray-700 leading-relaxed space-y-6">
          <p>見積書メーカーに関するご質問・ご要望・不具合報告などは、以下のメールアドレスよりご連絡ください。</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">メールアドレス</p>
            <p className="font-medium">cha1tirou@gmail.com</p>
          </div>
          <p className="text-sm text-gray-500">
            ※ お問い合わせ内容によっては、返答までにお時間をいただく場合がございます。
          </p>
        </div>
      </main>
    </div>
  );
}
