import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "インボイス計算機｜消費税・軽減税率の自動計算ツール | 見積書メーカー",
  description:
    "適格請求書（インボイス）の消費税額を自動計算。軽減税率8%と標準税率10%の混在にも対応。税率ごとの内訳表示・端数処理対応の無料ツール。",
  openGraph: {
    title: "インボイス計算機｜消費税・軽減税率の自動計算ツール",
    description:
      "適格請求書の消費税額を自動計算。軽減税率8%と標準税率10%の混在に対応。",
    url: "https://mitsumori-maker.com/tools/invoice-calc",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/tools/invoice-calc",
  },
};

export default function InvoiceCalcLayout({
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
            name: "インボイス計算機",
            description:
              "適格請求書（インボイス）の消費税額を自動計算。軽減税率8%と標準税率10%の混在にも対応。",
            url: "https://mitsumori-maker.com/tools/invoice-calc",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "消費税計算",
              "軽減税率対応",
              "税率別内訳表示",
              "端数処理対応",
              "インボイス記載例表示",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
