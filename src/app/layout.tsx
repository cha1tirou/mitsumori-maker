import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
  description:
    "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。3種類のデザインテンプレートからお選びいただけます。",
  keywords: "見積書, 見積書作成, 無料, PDF, テンプレート, 見積書メーカー",
  verification: {
    google: "GjZNFGBtFEmvoeEUPesUdP0p2GDKfXrOjrbToCGVptQ",
  },
  openGraph: {
    title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
    description:
      "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。3種類のデザインテンプレートからお選びいただけます。",
    url: "https://mitsumori-maker.com",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
    description:
      "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。",
  },
  metadataBase: new URL("https://mitsumori-maker.com"),
  alternates: {
    canonical: "https://mitsumori-maker.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6875835900503056"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <footer className="border-t border-gray-200 bg-white mt-8">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <span>© 2026 見積書メーカー</span>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/how-to" className="hover:text-gray-800 transition-colors">使い方</Link>
              <Link href="/faq" className="hover:text-gray-800 transition-colors">よくある質問</Link>
              <Link href="/privacy" className="hover:text-gray-800 transition-colors">プライバシーポリシー</Link>
              <Link href="/contact" className="hover:text-gray-800 transition-colors">お問い合わせ</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
