"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";

/**
 * Stripe Checkout 成功直後、Webhook で profiles.plan が更新されるまでの
 * タイムラグを埋めるバナー。2 秒ごとに router.refresh() で再取得し、
 * plan が反映されればサーバー側で isPaid が true になって上位コンポーネントが
 * 通常の成功バナーに切り替わる。最大 15 秒で timed-out 扱い。
 */
export default function CheckoutPendingBanner() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  const MAX_SECONDS = 15;

  useEffect(() => {
    if (elapsed >= MAX_SECONDS) return;
    const id = setTimeout(() => {
      router.refresh();
      setElapsed((s) => s + 2);
    }, 2000);
    return () => clearTimeout(id);
  }, [elapsed, router]);

  const timedOut = elapsed >= MAX_SECONDS;

  return (
    <div
      className={`rounded-xl p-4 flex items-start gap-3 border ${
        timedOut
          ? "bg-amber-50 border-amber-200"
          : "bg-kenmitsu-navy50 border-kenmitsu-navy100"
      }`}
    >
      {timedOut ? (
        <AlertTriangle
          className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
          strokeWidth={2.25}
        />
      ) : (
        <Loader2
          className="w-5 h-5 text-kenmitsu-navy animate-spin shrink-0 mt-0.5"
          strokeWidth={2.25}
        />
      )}
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">
          {timedOut
            ? "反映に時間がかかっています"
            : "Solo プランを反映中..."}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
          {timedOut
            ? "決済は正常に完了しています。ページを再読み込みしても反映されない場合は、数分後に再度ご確認ください。解消しない場合はお問い合わせください。"
            : "決済は完了しました。Stripe からの反映通知を待っています。通常 数秒で完了します。"}
        </p>
        {timedOut && (
          <button
            type="button"
            onClick={() => {
              setElapsed(0);
              router.refresh();
            }}
            className="mt-2 text-xs font-bold text-kenmitsu-navy hover:underline"
          >
            もう一度確認する
          </button>
        )}
      </div>
    </div>
  );
}
