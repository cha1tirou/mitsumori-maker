"use client";

import { useState } from "react";
import { MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";

const categories = [
  { value: "general", label: "ご意見・ご感想" },
  { value: "bug", label: "バグ報告" },
  { value: "feature", label: "機能要望" },
  { value: "improvement", label: "改善提案" },
];

export default function FeedbackCard() {
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async () => {
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-700" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">βフィードバック</h2>
          <p className="text-[11px] text-gray-500">
            開発チームへ直接届きます。機能追加の優先順位決定に活用します。
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                category === c.value
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-200 rounded-lg p-3 text-sm min-h-[100px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
          placeholder="ご意見・要望・不具合など何でもお気軽に..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-gray-400">
            {status === "sent" && (
              <span className="text-kenmitsu-ok inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                送信しました。ありがとうございます！
              </span>
            )}
            {status === "error" && (
              <span className="text-red-700">送信に失敗しました。もう一度お試しください。</span>
            )}
            {status === "idle" && `${message.length}/5000`}
          </p>
          <button
            onClick={submit}
            disabled={!message.trim() || status === "sending"}
            className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            {status === "sending" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.5} />
            ) : (
              <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            送信
          </button>
        </div>
      </div>
    </section>
  );
}
