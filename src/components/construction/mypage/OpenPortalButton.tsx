"use client";

import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/components/construction/Toast";

interface Props {
  label?: string;
  className?: string;
}

/**
 * Customer Portal を新規タブで開くボタン。PortalButton と違い解約・Cancel
 * ダイアログを含まない軽量版。領収書ヘルプページ専用。
 */
export default function OpenPortalButton({
  label = "プラン管理画面を開く",
  className,
}: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const open = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.open(json.url, "_blank", "noopener,noreferrer");
      } else {
        toast.error(json.error || "プラン管理画面を開けませんでした");
      }
    } catch {
      toast.error("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={open}
      disabled={loading}
      className={
        className ??
        "inline-flex items-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
      }
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
      ) : (
        <ExternalLink className="w-4 h-4" strokeWidth={2.25} />
      )}
      {label}
    </button>
  );
}
