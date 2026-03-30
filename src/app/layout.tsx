import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
