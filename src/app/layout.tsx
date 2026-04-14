import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
  description:
    "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。8種類のデザインテンプレートからお選びいただけます。",
  keywords: "見積書, 見積書作成, 無料, PDF, テンプレート, 見積書メーカー",
  verification: {
    google: "GjZNFGBtFEmvoeEUPesUdP0p2GDKfXrOjrbToCGVptQ",
  },
  openGraph: {
    title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
    description:
      "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。8種類のデザインテンプレートからお選びいただけます。",
    url: "https://mitsumori-maker.com",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://mitsumori-maker.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "見積書メーカー｜無料で見積書をサクッと作成・PDF出力",
    description: "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。",
    images: ["https://mitsumori-maker.com/og-image.png"],
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
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "見積書メーカー",
              url: "https://mitsumori-maker.com",
              description:
                "登録不要・完全無料の見積書作成ツール。リアルタイムプレビューで簡単作成、PDF出力対応。8種類のデザインテンプレートからお選びいただけます。",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
              },
              inLanguage: "ja",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {/* Google Analytics ＋ Google Ads — afterInteractive で遅延読み込み */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-13VR2YEZKB"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-13VR2YEZKB');
            ${
              process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
                ? `gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');`
                : ""
            }
          `}
        </Script>
        {/* Meta Pixel — NEXT_PUBLIC_META_PIXEL_ID が設定されていれば有効 */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {/* Google AdSense — lazyOnload で最も遅延 */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6875835900503056"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
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
      </body>
    </html>
  );
}
