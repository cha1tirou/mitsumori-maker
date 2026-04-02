import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "納品書メーカー｜無料で納品書を作成・PDF出力・インボイス対応 | 見積書メーカー",
  description:
    "登録不要・完全無料の納品書作成ツール。インボイス制度対応の納品書をブラウザ上で作成し、ワンクリックでPDF出力。明細・消費税の自動計算にも対応。",
  openGraph: {
    title: "納品書メーカー｜無料で納品書を作成・PDF出力・インボイス対応",
    description:
      "登録不要・完全無料の納品書作成ツール。インボイス制度対応・PDF出力。",
    url: "https://mitsumori-maker.com/tools/delivery",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E7%B4%8D%E5%93%81%E6%9B%B8%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC&subtitle=%E7%84%A1%E6%96%99%E3%83%BB%E7%99%BB%E9%8C%B2%E4%B8%8D%E8%A6%81%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%9C%E3%82%A4%E3%82%B9%E5%AF%BE%E5%BF%9C",
      width: 1200, height: 630, alt: "納品書メーカー",
    }],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/tools/delivery",
  },
};

export default function DeliveryLayout({
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
            name: "納品書メーカー",
            description:
              "登録不要・完全無料の納品書作成ツール。インボイス制度対応の納品書をブラウザ上で作成し、PDF出力できます。",
            url: "https://mitsumori-maker.com/tools/delivery",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "納品書作成",
              "PDF出力",
              "インボイス制度対応",
              "消費税自動計算",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
