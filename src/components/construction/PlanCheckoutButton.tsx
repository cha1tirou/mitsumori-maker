"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface Props {
  plan: "solo" | "team";
  billing: "monthly" | "yearly";
  label: string;
  variant: "primary" | "outline";
}

export default function PlanCheckoutButton({
  plan,
  billing,
  label,
  variant,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    trackConversion(
      plan === "solo"
        ? "construction_subscribe_solo"
        : "construction_subscribe_team"
    );

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });
      const json = await res.json();

      if (res.status === 401) {
        router.push(
          `/construction/login?redirect=${encodeURIComponent("/construction#pricing")}`
        );
        return;
      }
      if (res.status === 503) {
        alert(
          "決済機能は現在準備中です。もうしばらくお待ちください。"
        );
        setLoading(false);
        return;
      }

      if (json.url) {
        window.location.href = json.url;
      } else {
        alert(json.error || "決済セッションの作成に失敗しました。");
        setLoading(false);
      }
    } catch {
      alert("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  const className =
    variant === "primary"
      ? "w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
      : "w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 disabled:opacity-60 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors";

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
          処理中...
        </>
      ) : (
        label
      )}
    </button>
  );
}
