import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
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
        <SiteFooter />
      </body>
    </html>
  );
}
