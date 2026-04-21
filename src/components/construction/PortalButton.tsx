"use client";

import { useState } from "react";
import { Settings, Loader2, LogOut } from "lucide-react";
import CancelRetentionDialog from "@/components/construction/CancelRetentionDialog";

interface Props {
  quotesCount?: number;
}

export default function PortalButton({ quotesCount = 0 }: Props) {
  const [loading, setLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const openPortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        alert(json.error || "カスタマーポータルを開けませんでした。");
        setLoading(false);
      }
    } catch {
      alert("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={openPortal}
          disabled={loading}
          className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
          ) : (
            <Settings className="w-4 h-4" strokeWidth={2.25} />
          )}
          プラン管理
        </button>
        <button
          onClick={() => setCancelOpen(true)}
          className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={2} />
          解約
        </button>
      </div>

      <CancelRetentionDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        quotesCount={quotesCount}
      />
    </>
  );
}
