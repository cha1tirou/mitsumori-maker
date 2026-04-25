"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface Props {
  plan: "solo" | "team";
  /**
   * 支払いサイクル。未指定時は "monthly"。
   */
  billing?: "monthly" | "yearly";
  label: string;
  variant: "primary" | "outline" | "kenmitsu";
}

export default function PlanCheckoutButton({
  plan,
  billing = "monthly",
  label,
  variant,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerClassName =
    variant === "primary"
      ? "w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
      : variant === "kenmitsu"
        ? "w-full flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
        : "w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 disabled:opacity-60 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors";

  const proceedToCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      try {
        trackConversion(
          plan === "solo"
            ? "construction_subscribe_solo"
            : "construction_subscribe_team",
        );
      } catch {
        // analytics の失敗で課金導線を止めない
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });

      if (res.status === 401) {
        // 未ログインなら登録ファースト導線へ（/start は登録 + 既存ログイン両対応）
        router.push(
          `/construction/start?redirect=${encodeURIComponent(
            "/construction#pricing",
          )}`,
        );
        return;
      }

      let json: { url?: string; error?: string; message?: string } = {};
      try {
        json = await res.json();
      } catch {
        // 非JSONレスポンス（500のHTMLページ等）
      }

      if (res.status === 503) {
        setError(
          json.message || json.error || "決済機能は現在準備中です。しばらくお待ちください。",
        );
        setLoading(false);
        return;
      }

      if (json.url) {
        window.location.href = json.url;
        return;
      }

      const detail =
        json.message ||
        json.error ||
        `HTTP ${res.status} ${res.statusText || ""}`.trim();
      setError(`決済セッションの作成に失敗しました: ${detail}`);
      setLoading(false);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "unknown";
      setError(`通信エラーが発生しました: ${detail}`);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={proceedToCheckout}
        disabled={loading}
        className={triggerClassName}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
            処理中...
          </>
        ) : (
          label
        )}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}
    </>
  );
}
