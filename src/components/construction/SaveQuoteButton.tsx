"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConstructionQuoteData } from "@/types/construction";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  data: ConstructionQuoteData;
  quoteId?: string;
  className?: string;
  onSaved?: (quoteId: string) => void;
}

export default function SaveQuoteButton({
  data,
  quoteId,
  className = "",
  onSaved,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    setStatus("saving");
    setErrorMessage("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, id: quoteId }),
      });

      if (res.status === 401) {
        router.push(
          `/construction/login?redirect=${encodeURIComponent(
            quoteId ? `/construction/quotes/${quoteId}` : "/construction/new"
          )}`
        );
        return;
      }

      const json = await res.json();

      if (res.status === 402) {
        setStatus("error");
        setErrorMessage(
          json.message ||
            "無料プランでは月3通までしか保存できません。Soloプランにアップグレードしてください。"
        );
        return;
      }
      if (res.status === 503) {
        setStatus("error");
        setErrorMessage("保存機能は現在準備中です。");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "保存に失敗しました。");
        return;
      }

      setStatus("saved");
      const savedId = json.quote?.id as string | undefined;
      if (savedId) {
        onSaved?.(savedId);
        // 新規作成後は編集URLに置換（履歴に戻るときに編集モードで戻れる）
        if (!quoteId) {
          router.replace(`/construction/quotes/${savedId}`);
        }
      }
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setErrorMessage("通信エラーが発生しました。");
    }
  };

  return (
    <div>
      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className={`flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-60 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors ${className}`}
      >
        {status === "saving" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
            保存中...
          </>
        ) : status === "saved" ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2.5} />
            保存しました
          </>
        ) : (
          <>
            <Save className="w-4 h-4" strokeWidth={2.25} />
            {quoteId ? "上書き保存" : "見積書を保存"}
          </>
        )}
      </button>
      {errorMessage && (
        <p className="text-[11px] text-red-700 mt-1.5 leading-relaxed">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
