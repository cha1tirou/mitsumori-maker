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
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E8%AB%8B%E6%B1%82%E6%9B%B8%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC&subtitle=%E7%84%A1%E6%96%99%E3%83%BB%E7%99%BB%E9%8C%B2%E4%B8%8D%E8%A6%81%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%9C%E3%82%A4%E3%82%B9%E5%AF%BE%E5%BF%9C",
      width: 1200, height: 630, alt: "請求書メーカー",
    }],
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
