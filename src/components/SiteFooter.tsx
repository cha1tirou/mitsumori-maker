"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();

  // /construction 配下ではケンミツ独自のフッターを使うため非表示
  if (pathname.startsWith("/construction")) return null;

  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <span>© 2026 見積書メーカー</span>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="/how-to" className="hover:text-gray-800 transition-colors">使い方</Link>
          <Link href="/faq" className="hover:text-gray-800 transition-colors">よくある質問</Link>
          <Link href="/guide/how-to-write" className="hover:text-gray-800 transition-colors">見積書の書き方</Link>
          <Link href="/tools/invoice" className="hover:text-gray-800 transition-colors">請求書メーカー</Link>
          <Link href="/tools/delivery" className="hover:text-gray-800 transition-colors">納品書メーカー</Link>
          <Link href="/tools/purchase-order" className="hover:text-gray-800 transition-colors">発注書メーカー</Link>
          <Link href="/construction" className="hover:text-gray-800 transition-colors font-medium text-green-700">建設業向け</Link>
          <Link href="/about" className="hover:text-gray-800 transition-colors">運営者情報</Link>
          <Link href="/terms" className="hover:text-gray-800 transition-colors">利用規約</Link>
          <Link href="/privacy" className="hover:text-gray-800 transition-colors">プライバシーポリシー</Link>
          <Link href="/ads-policy" className="hover:text-gray-800 transition-colors">広告掲載ポリシー</Link>
          <Link href="/contact" className="hover:text-gray-800 transition-colors">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
}
