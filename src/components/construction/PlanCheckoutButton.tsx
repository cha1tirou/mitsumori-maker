"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  X,
  Check,
  Crown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import { Portal } from "@/components/construction/Portal";

interface Props {
  plan: "solo" | "team";
  /**
   * モーダルで最初に選択されている支払いサイクル。
   * 未指定時は "monthly"（心理的ハードル低減）。
   */
  billing?: "monthly" | "yearly";
  label: string;
  variant: "primary" | "outline" | "kenmitsu";
}

const PRICES = {
  solo: { monthly: 980, yearly: 9800, monthlyEquivalent: 816 },
  team: { monthly: 2980, yearly: 29800, monthlyEquivalent: 2483 },
} as const;

const SOLO_BENEFITS = [
  "改正建設業法のルールに沿った見積書を作成できる",
  "労務費・法定福利費の内訳明示",
  "取引先マスタ・単価マスタで入力時間を短縮",
  "原価・粗利分析、工事写真の添付",
] as const;

export default function PlanCheckoutButton({
  plan,
  billing = "monthly",
  label,
  variant,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "yearly">(
    billing,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerClassName =
    variant === "primary"
      ? "w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
      : variant === "kenmitsu"
        ? "w-full flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
        : "w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 disabled:opacity-60 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors";

  const openModal = () => {
    setSelectedBilling(billing);
    setError(null);
    setOpen(true);
  };

  const closeModal = () => {
    if (loading) return;
    setOpen(false);
  };

  const proceedToCheckout = async () => {
    setLoading(true);
    setError(null);
    trackConversion(
      plan === "solo"
        ? "construction_subscribe_solo"
        : "construction_subscribe_team",
    );

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing: selectedBilling }),
      });
      const json = await res.json();

      if (res.status === 401) {
        router.push(
          `/construction/login?redirect=${encodeURIComponent(
            "/construction#pricing",
          )}`,
        );
        return;
      }
      if (res.status === 503) {
        setError("決済機能は現在準備中です。しばらくお待ちください。");
        setLoading(false);
        return;
      }
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setError(json.error || "決済セッションの作成に失敗しました。");
      setLoading(false);
    } catch {
      setError("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  const p = PRICES[plan];
  const savingsYen = p.monthly * 12 - p.yearly;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={triggerClassName}
      >
        {label}
      </button>

      {open && (
        <Portal>
          <div
            className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 py-5 bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 text-white shrink-0">
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/10 disabled:opacity-50"
                  aria-label="閉じる"
                >
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <div className="flex items-center gap-2 mb-1">
                  <Crown
                    className="w-5 h-5 text-kenmitsu-orange"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-bold tracking-wider uppercase text-kenmitsu-orange">
                    {plan === "solo" ? "有料プラン" : "Team プラン"}
                  </span>
                </div>
                <h2 className="text-lg font-bold">
                  お支払いサイクルを選択してください
                </h2>
                <p className="text-xs text-kenmitsu-navy100 mt-1">
                  どちらも機能は同じです。年払いは 2 ヶ月分お得になります。
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Billing cycle selector */}
                <div className="grid grid-cols-2 gap-3">
                  <BillingCard
                    active={selectedBilling === "monthly"}
                    onClick={() => setSelectedBilling("monthly")}
                    title="月払い"
                    price={`¥${p.monthly.toLocaleString()}`}
                    unit="/ 月"
                    note="いつでも解約可能"
                  />
                  <BillingCard
                    active={selectedBilling === "yearly"}
                    onClick={() => setSelectedBilling("yearly")}
                    title="年払い"
                    price={`¥${p.yearly.toLocaleString()}`}
                    unit="/ 年"
                    note={`月換算 ¥${p.monthlyEquivalent.toLocaleString()}`}
                    badge={`¥${savingsYen.toLocaleString()} お得`}
                  />
                </div>

                {/* Benefits */}
                {plan === "solo" && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles
                        className="w-4 h-4 text-kenmitsu-orange"
                        strokeWidth={2.25}
                      />
                      <h3 className="text-sm font-bold text-gray-900">
                        含まれる機能
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {SOLO_BENEFITS.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-gray-700"
                        >
                          <Check
                            className="w-3.5 h-3.5 text-kenmitsu-ok shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 安心情報 */}
                <div className="rounded-lg bg-kenmitsu-navy50/60 border border-kenmitsu-navy100 p-3 text-[11px] text-gray-700 space-y-1.5 leading-relaxed">
                  <p>
                    <span className="font-bold">いつでも解約可能</span> — マイページから
                    ワンクリックで自動更新を停止できます。
                  </p>
                  <p>
                    <span className="font-bold">領収書自動発行</span> — 毎回の決済で
                    領収書 PDF がメールに届きます（適格請求書発行は準備中）。
                  </p>
                  <p>
                    <span className="font-bold">即時有効</span> — 決済完了後、すぐに
                    有料プランの機能が使えます。
                  </p>
                </div>

                {error && (
                  <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                    {error}
                  </p>
                )}
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-2 shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="sm:w-28 text-sm font-medium border border-gray-200 hover:bg-gray-100 disabled:opacity-60 text-gray-700 py-2.5 rounded-lg"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={proceedToCheckout}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        strokeWidth={2.5}
                      />
                      処理中...
                    </>
                  ) : (
                    <>
                      {selectedBilling === "monthly"
                        ? `月払い ¥${p.monthly.toLocaleString()} で決済画面へ`
                        : `年払い ¥${p.yearly.toLocaleString()} で決済画面へ`}
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

function BillingCard({
  active,
  onClick,
  title,
  price,
  unit,
  note,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  price: string;
  unit: string;
  note: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-xl border-2 p-4 transition-all ${
        active
          ? "border-kenmitsu-orange bg-kenmitsu-orange50/40"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-3 inline-block bg-kenmitsu-ok text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-700">{title}</span>
        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
            active
              ? "border-kenmitsu-orange bg-kenmitsu-orange"
              : "border-gray-300"
          }`}
        >
          {active && (
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          )}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-bold text-gray-900 tabular-nums">
          {price}
        </span>
        <span className="text-[11px] text-gray-500">{unit}</span>
      </div>
      <p className="text-[10px] text-gray-500">{note}</p>
    </button>
  );
}
