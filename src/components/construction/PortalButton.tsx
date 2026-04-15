"use client";

import { useState } from "react";
import { Settings, Loader2 } from "lucide-react";

export default function PortalButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
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
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
      ) : (
        <Settings className="w-4 h-4" strokeWidth={2.25} />
      )}
      プラン管理・解約
    </button>
  );
}
