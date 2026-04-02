import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません | 見積書メーカー",
  description: "お探しのページは見つかりませんでした。見積書メーカーのトップページからご利用ください。",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            ページが見つかりません
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            お探しのページは移動または削除された可能性があります。
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              見積書メーカーを使う
            </Link>
          </div>

          <div className="mt-10 text-left max-w-sm mx-auto">
            <p className="text-xs font-semibold text-gray-600 mb-3">
              お探しの情報はこちらにあるかもしれません
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/guide/how-to-write" className="text-sm text-blue-600 hover:underline">
                  見積書の書き方ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/freelance" className="text-sm text-blue-600 hover:underline">
                  フリーランス・個人事業主の見積書
                </Link>
              </li>
              <li>
                <Link href="/tools/invoice" className="text-sm text-blue-600 hover:underline">
                  請求書メーカー
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-blue-600 hover:underline">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
