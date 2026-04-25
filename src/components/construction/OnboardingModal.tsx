"use client";

import { useState, useEffect } from "react";
import { HardHat, Layers, FileEdit, Download, X, ChevronRight } from "lucide-react";

const STORAGE_KEY = "kenmitsu-onboarding-done";

const STEPS = [
  {
    icon: Layers,
    title: "1. 工種を選ぶ",
    description:
      "電気・水道・内装など8つの工種プリセットから選択。代表的な明細項目・単価が自動で入ります。",
  },
  {
    icon: FileEdit,
    title: "2. 情報を入力",
    description:
      "発注者名・金額・工期を入力。改正建設業法のチェッカーがリアルタイムで不備を警告します。",
  },
  {
    icon: Download,
    title: "3. PDF出力",
    description:
      "完成した見積書を PDF でダウンロード。Solo プランなら改正建設業法 2025 対応版で出力できます。",
  },
] as const;

export default function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!show) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-kenmitsu-navy to-kenmitsu-navy700 p-5 text-white text-center">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
          <HardHat className="w-8 h-8 mx-auto mb-2" strokeWidth={2} />
          <h2 className="text-lg font-bold">ケンミツの使い方</h2>
          <p className="text-xs text-kenmitsu-navy100 mt-1">3ステップで見積書が完成</p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 px-6 pt-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-kenmitsu-navy" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 border border-kenmitsu-navy100 flex items-center justify-center shrink-0">
              <current.icon className="w-5 h-5 text-kenmitsu-navy" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {current.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                戻る
              </button>
            )}
            <button
              onClick={() => {
                if (isLast) {
                  dismiss();
                } else {
                  setStep(step + 1);
                }
              }}
              className="flex-1 flex items-center justify-center gap-1 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
            >
              {isLast ? (
                "見積書を作成する"
              ) : (
                <>
                  次へ
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </>
              )}
            </button>
          </div>

          <button
            onClick={dismiss}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3"
          >
            スキップ
          </button>
        </div>
      </div>
    </div>
  );
}
