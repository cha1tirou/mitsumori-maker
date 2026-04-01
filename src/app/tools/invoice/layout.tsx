import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "請求書メーカー｜無料で請求書を作成・PDF出力・インボイス対応 | 見積書メーカー",
  description:
    "登録不要・完全無料の請求書作成ツール。インボイス制度対応の適格請求書をブラウザ上で作成し、ワンクリックでPDF出力。振込先情報や消費税の自動計算にも対応。",
  openGraph: {
    title: "請求書メーカー｜無料で請求書を作成・PDF出力・インボイス対応",
    description:
      "登録不要・完全無料の請求書作成ツール。インボイス制度対応・PDF出力。",
    url: "https://mitsumori-maker.com/tools/invoice",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/tools/invoice",
  },
};

export default function InvoiceLayout({
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
            name: "請求書メーカー",
            description:
              "登録不要・完全無料の請求書作成ツール。インボイス制度対応の適格請求書をブラウザ上で作成し、PDF出力できます。",
            url: "https://mitsumori-maker.com/tools/invoice",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "請求書作成",
              "PDF出力",
              "インボイス制度対応",
              "振込先情報記載",
              "消費税自動計算",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
