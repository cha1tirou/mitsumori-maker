"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface Props {
  email: string;
  token: string;
}

export default function UnsubscribeForm({ email, token }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const unsubscribe = async () => {
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setStatus("error");
      setErrorMessage(json.error || "配信停止に失敗しました。");
    } catch {
      setStatus("error");
      setErrorMessage("通信エラーが発生しました。");
    }
  };

  if (status === "done") {
    return (
      <div className="text-center py-6">
        <CheckCircle2
          className="w-12 h-12 text-kenmitsu-ok mx-auto mb-3"
          strokeWidth={1.75}
        />
        <h2 className="text-base font-bold text-gray-900 mb-2">
          配信を停止しました
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          <span className="font-mono text-xs">{email}</span> 宛のお知らせメールの配信を停止しました。
          <br />
          ご利用ありがとうございました。
        </p>
        <Link
          href="/construction"
          className="inline-flex items-center gap-1.5 bg-kenmitsu-navy hover:bg-kenmitsu-navy700 text-white text-sm font-bold px-5 py-2.5 rounded-lg"
        >
          ケンミツトップに戻る
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        以下のメールアドレスへの、ケンミツからのお知らせメール配信を停止します。
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5">
        <p className="text-[11px] text-gray-500 mb-0.5">対象メールアドレス</p>
        <p className="text-sm font-mono text-gray-900 break-all">{email}</p>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertTriangle
            className="w-4 h-4 shrink-0 mt-0.5"
            strokeWidth={2.25}
          />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-2">
        <Link
          href="/construction"
          className="sm:flex-1 inline-flex items-center justify-center text-sm font-medium border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg"
        >
          キャンセル
        </Link>
        <button
          type="button"
          onClick={unsubscribe}
          disabled={status === "sending"}
          className="sm:flex-1 inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              停止中...
            </>
          ) : (
            "配信を停止する"
          )}
        </button>
      </div>
    </div>
  );
}
