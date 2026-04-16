import { ToastProvider } from "@/components/construction/Toast";

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
