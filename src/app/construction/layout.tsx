import type { Metadata } from "next";
import { ToastProvider } from "@/components/construction/Toast";

export const metadata: Metadata = {
  manifest: "/construction-manifest.json",
  themeColor: "#15803d",
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
  return <ToastProvider>{children}</ToastProvider>;
}
