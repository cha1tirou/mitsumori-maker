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
