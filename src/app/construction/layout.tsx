import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/construction/Toast";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/construction-manifest.json",
  themeColor: "#1E40AF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ケンミツ",
  },
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jetbrainsMono.variable}>
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
