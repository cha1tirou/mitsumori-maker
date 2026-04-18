"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  AlertTriangle,
  FileText,
  Mail,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/construction/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  quotesCount: number;
  emailsSent: number;
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
  emailsSent,
}: Props) {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState<"stats" | "reason" | "offer">("stats");
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
      // 解約理由をフィードバックとして送信
      if (reason) {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: "churn",
            message: `解約理由: ${reason}`,
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

            <p className="text-sm text-gray-600 mb-5">
              解約するとSoloプランの全機能にアクセスできなくなります。
              保存した見積書は閲覧のみ可能ですが、新規作成は月3通に制限されます。
            </p>

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
                    Freeプランでは月3通に制限されます
                  </p>
                </div>
              </div>
              {emailsSent > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-700" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {emailsSent}通のメールを送信
                    </p>
                    <p className="text-xs text-gray-500">
                      Freeプランではメール送信不可
                    </p>
                  </div>
                </div>
              )}
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
                onClick={() => {
                  if (reason === "price") {
                    setStep("offer");
                  } else {
                    goToPortal();
                  }
                }}
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

        {/* Step 3: 料金が理由の場合の割引オファー */}
        {step === "offer" && (
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              特別オファー
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              料金が理由とのこと、ご意見ありがとうございます。
              もしよろしければ、次の3ヶ月間を特別価格でご利用いただけます。
            </p>

            <div className="bg-kenmitsu-navy50 border-2 border-kenmitsu-navy100 rounded-xl p-5 mb-5 text-center">
              <p className="text-xs text-kenmitsu-navy font-bold mb-1">
                3ヶ月間限定
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                ¥490<span className="text-sm font-normal text-gray-500">/月</span>
              </p>
              <p className="text-xs text-gray-500">
                通常¥980 → <span className="text-kenmitsu-orange font-bold">50%OFF</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  toast.success(
                    "割引クーポンの適用はお問い合わせください。担当より連絡いたします。"
                  );
                  handleClose();
                  router.refresh();
                }}
                className="flex-1 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                50%OFFで続ける
              </button>
              <button
                onClick={goToPortal}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1 border border-gray-200 hover:bg-gray-50 text-gray-500 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                ) : (
                  "それでも解約する"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
