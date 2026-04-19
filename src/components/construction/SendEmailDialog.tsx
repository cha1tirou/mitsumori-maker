"use client";

import { useState } from "react";
import { ConstructionQuoteData } from "@/types/construction";
import { calcConstructionTotals } from "@/lib/constructionCalc";
import { Mail, X, Loader2, Send, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ConstructionQuoteData;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = String(reader.result);
      const b64 = result.split(",")[1] ?? result;
      resolve(b64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * メール HTML 本文に埋め込む前に HTML 特殊文字をエスケープする。
 * ユーザーが本文に <script> 等を書いた場合に受信側で実行されるリスクを潰す（QAバグ #15）
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function SendEmailDialog({ open, onClose, data }: Props) {
  const [to, setTo] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [subject, setSubject] = useState(
    data.subject
      ? `【見積書】${data.subject}`
      : "見積書のご送付"
  );
  const [message, setMessage] = useState(
    `${data.clientName || "お客様"} ${data.clientTitle}\n\nお世話になっております。${
      data.companyName || "（施工者）"
    } です。\n\nご依頼いただいておりました見積書を添付にてお送りいたします。\nご査収の程、よろしくお願いいたします。\n\n・工事名: ${data.subject || "（未設定）"}\n・見積金額: ¥${calcConstructionTotals(data).total.toLocaleString("ja-JP")}（税込）\n\n不明点等ございましたらお気軽にお問い合わせください。`
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "needs_upgrade"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!open) return null;

  const handleSend = async () => {
    if (!to) return;
    setStatus("sending");
    setErrorMessage("");
    try {
      const { generateConstructionPdf } = await import(
        "@/lib/constructionPdfGenerator"
      );
      // メール送信はSolo以上限定なので透かしなし（APIでもプラン検証される）
      const blob = await generateConstructionPdf(data, { watermark: false });
      const pdfBase64 = await blobToBase64(blob);

      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          text: message,
          html: escapeHtml(message).replace(/\n/g, "<br />"),
          replyTo: replyTo || undefined,
          pdfBase64,
          fileName: `見積書_${data.clientName || "未設定"}_${data.quoteDate}.pdf`,
        }),
      });
      const json = await res.json();

      if (res.status === 402) {
        setStatus("needs_upgrade");
        setErrorMessage(json.message || "");
        return;
      }
      if (res.status === 401) {
        setStatus("error");
        setErrorMessage("ログインが必要です。");
        return;
      }
      if (res.status === 503) {
        setStatus("error");
        setErrorMessage(
          "メール送信機能は現在準備中です（Resend API未設定）。"
        );
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "送信に失敗しました。");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage("通信エラーが発生しました。");
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            見積書をメールで送信
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" strokeWidth={2.25} />
          </button>
        </div>

        {status === "sent" ? (
          <div className="p-8 text-center">
            <CheckCircle2
              className="w-12 h-12 text-kenmitsu-ok mx-auto mb-3"
              strokeWidth={1.75}
            />
            <p className="text-sm font-bold text-gray-900 mb-1">
              送信しました
            </p>
            <p className="text-xs text-gray-600">
              {to} に見積書PDFを送信しました。
            </p>
            <button
              onClick={onClose}
              className="mt-5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold px-6 py-2.5 rounded-lg"
            >
              閉じる
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <Field label="宛先メールアドレス">
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                  placeholder="client@example.com"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </Field>
              <Field label="返信先（任意）">
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                  placeholder="your@example.com"
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                />
              </Field>
              <Field label="件名">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Field>
              <Field label="本文">
                <textarea
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20 min-h-[180px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>
              <p className="text-[11px] text-gray-500">
                見積書PDFが自動で添付されます。
              </p>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    strokeWidth={2.25}
                  />
                  <span>{errorMessage}</span>
                </div>
              )}
              {status === "needs_upgrade" && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    strokeWidth={2.25}
                  />
                  <span>
                    {errorMessage}{" "}
                    <a
                      href="/construction#pricing"
                      className="underline font-bold"
                    >
                      アップグレードする →
                    </a>
                  </span>
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex gap-2 bg-gray-50">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-white"
              >
                キャンセル
              </button>
              <button
                onClick={handleSend}
                disabled={!to || status === "sending"}
                className="flex-1 flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 rounded-lg"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" strokeWidth={2.5} />
                    送信する
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-600 font-medium mb-1 block">
        {label}
      </span>
      {children}
    </label>
  );
}
