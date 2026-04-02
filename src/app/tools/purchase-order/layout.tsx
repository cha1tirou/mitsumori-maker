import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "発注書メーカー｜無料で発注書を作成・PDF出力 | 見積書メーカー",
  description:
    "登録不要・完全無料の発注書作成ツール。ブラウザ上で発注書を作成し、ワンクリックでPDF出力。発注先・明細・消費税の自動計算にも対応。",
  openGraph: {
    title: "発注書メーカー｜無料で発注書を作成・PDF出力",
    description:
      "登録不要・完全無料の発注書作成ツール。PDF出力対応。",
    url: "https://mitsumori-maker.com/tools/purchase-order",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E7%99%BA%E6%B3%A8%E6%9B%B8%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC&subtitle=%E7%84%A1%E6%96%99%E3%83%BB%E7%99%BB%E9%8C%B2%E4%B8%8D%E8%A6%81%E3%83%BBPDF%E5%87%BA%E5%8A%9B%E5%AF%BE%E5%BF%9C",
      width: 1200, height: 630, alt: "発注書メーカー",
    }],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/tools/purchase-order",
  },
};

export default function PurchaseOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "発注書メーカー",
            description:
              "登録不要・完全無料の発注書作成ツール。ブラウザ上で発注書を作成し、PDF出力できます。",
            url: "https://mitsumori-maker.com/tools/purchase-order",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "発注書作成",
              "PDF出力",
              "消費税自動計算",
              "納期管理",
              "明細管理",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
