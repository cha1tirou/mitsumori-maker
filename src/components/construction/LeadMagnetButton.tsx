"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  source: string;
}

export default function LeadMagnetButton({ source }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!email) return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "送信に失敗しました。");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("通信エラーが発生しました。");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-5 py-3 rounded-lg whitespace-nowrap"
      >
        <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
        メールで受け取る
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "sent" ? (
              <div className="p-8 text-center">
                <CheckCircle2
                  className="w-12 h-12 text-kenmitsu-ok mx-auto mb-3"
                  strokeWidth={1.75}
                />
                <p className="text-base font-bold text-gray-900 mb-2">
                  送信しました
                </p>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {email} にPDFダウンロードリンクをお送りしました。
                  <br />
                  迷惑メールフォルダもご確認ください。
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold px-6 py-2.5 rounded-lg"
                >
                  閉じる
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    チェックリストPDFを受け取る
                  </h3>
                  <p className="text-xs text-gray-500">
                    メールアドレスにダウンロードリンクをお送りします。
                    <br />
                    登録情報はPDF送付と改正法の最新情報通知のみに使用します。いつでも解除可。
                  </p>
                </div>
                <div className="p-6">
                  <label className="block mb-4">
                    <span className="text-xs text-gray-600 font-medium mb-1 block">
                      メールアドレス
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                    />
                  </label>
                  {status === "error" && (
                    <p className="text-xs text-red-700 mb-3">{message}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOpen(false)}
                      className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={submit}
                      disabled={!email || status === "sending"}
                      className="flex-1 flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold py-2.5 rounded-lg"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                          送信中...
                        </>
                      ) : (
                        "送信する"
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
