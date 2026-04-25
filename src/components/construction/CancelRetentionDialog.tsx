"use client";

import { useState } from "react";
import {
  X,
  AlertTriangle,
  FileText,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/construction/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  quotesCount: number;
}

const CANCEL_REASONS = [
  { id: "price", label: "料金が高い" },
  { id: "not_using", label: "使わなくなった" },
  { id: "switched", label: "他のツールに乗り換えた" },
  { id: "missing_feature", label: "欲しい機能がない" },
  { id: "other", label: "その他" },
] as const;

export default function CancelRetentionDialog({
  open,
  onClose,
  quotesCount,
}: Props) {
  const toast = useToast();
  const [step, setStep] = useState<"stats" | "reason">("stats");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setStep("stats");
    setReason("");
    onClose();
  };

  const goToPortal = async () => {
    setLoading(true);
    try {
      // 解約理由を DB に記録（後のサービス改善の分析材料として使う）
      if (reason) {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: "churn",
            reasonCode: reason,
          }),
        }).catch(() => {});
      }
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        toast.error("ポータルを開けませんでした。");
        setLoading(false);
      }
    } catch {
      toast.error("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Step 1: 利用実績 */}
        {step === "stats" && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" strokeWidth={2} />
              <h2 className="text-lg font-bold text-gray-900">
                解約をご検討中ですか？
              </h2>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              解約すると Free プランに戻ります。以下の変化があります:
            </p>
            <ul className="text-xs text-gray-600 space-y-1 mb-5 pl-4 leading-relaxed list-disc">
              <li>
                過去見積書の<strong>閲覧・PDF 再出力は可能</strong>（180日間保管）
              </li>
              <li>
                <strong>再編集・複製・マスタ機能は利用不可</strong>
              </li>
              <li>
                <strong>改正建設業法 2025 対応版 PDF</strong> は出力不可（通常版のみ）
              </li>
              <li>
                Solo に再契約すれば保管期間中のデータにフルアクセスが復活
              </li>
            </ul>

            <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
              <p className="text-xs font-bold text-gray-500 mb-2">
                あなたのこれまでの利用実績
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {quotesCount}通の見積書を作成
                  </p>
                  <p className="text-xs text-gray-500">
                    Free でも作成・保存は無制限。改正法対応 PDF のみ Solo で利用可
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                利用を続ける
              </button>
              <button
                onClick={() => setStep("reason")}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                解約を続ける
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 解約理由 */}
        {step === "reason" && (
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              解約の理由を教えてください
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              今後のサービス改善に活用させていただきます。
            </p>

            <div className="space-y-2 mb-5">
              {CANCEL_REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    reason === r.id
                      ? "border-kenmitsu-navy bg-kenmitsu-navy50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.id}
                    checked={reason === r.id}
                    onChange={() => setReason(r.id)}
                    className="accent-kenmitsu-navy"
                  />
                  <span className="text-sm text-gray-900">{r.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("stats")}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                戻る
              </button>
              <button
                onClick={goToPortal}
                disabled={!reason || loading}
                className="flex-1 flex items-center justify-center gap-1 bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                ) : (
                  <>
                    解約手続きへ
                    <ChevronRight className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
