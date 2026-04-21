"use client";

import Link from "next/link";
import { useState } from "react";
import { Crown, Lock, X } from "lucide-react";
import { Portal } from "./Portal";

/**
 * Solo 以上の機能を Free ユーザーがタップした時に出す案内モーダル。
 * 各 Solo-only 機能のトリガーでこのフックを呼ぶ。
 *
 * 使い方:
 *   const lock = useSoloFeatureLock();
 *   const isPaid = plan === "solo" || plan === "team";
 *
 *   <button onClick={() => (isPaid ? openPriceMaster() : lock.open("単価マスタ"))}>
 *     マスタから選ぶ
 *   </button>
 *   {lock.dialog}
 */
export function useSoloFeatureLock() {
  const [featureName, setFeatureName] = useState<string | null>(null);

  const open = (name: string) => setFeatureName(name);
  const close = () => setFeatureName(null);

  const dialog =
    featureName === null ? null : (
      <Portal>
      <div
        className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={close}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-6 py-5 bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 text-white">
            <button
              onClick={close}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="閉じる"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 text-kenmitsu-orange" strokeWidth={2} />
              <span className="text-xs font-bold tracking-wider uppercase text-kenmitsu-orange">
                Solo プラン限定機能
              </span>
            </div>
            <h3 className="text-base font-bold">
              「{featureName}」は Solo プランで利用できます
            </h3>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Solo プラン（月¥980・年払い ¥9,800）では、以下の機能がすべて使えます:
            </p>
            <ul className="text-xs text-gray-700 space-y-1.5 mb-5">
              <li className="flex items-center gap-2">
                <span className="text-kenmitsu-ok font-bold">✓</span>
                PDF の透かし完全削除
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kenmitsu-ok font-bold">✓</span>
                単価マスタ・顧客マスタ（入力時間を大幅短縮）
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kenmitsu-ok font-bold">✓</span>
                原価・粗利の社内分析
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kenmitsu-ok font-bold">✓</span>
                工事写真を見積書に添付
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kenmitsu-ok font-bold">✓</span>
                見積書の無制限保存・履歴管理
              </li>
            </ul>
            <div className="flex flex-col gap-2">
              <Link
                href="/construction#pricing"
                onClick={close}
                className="flex items-center justify-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg"
              >
                <Crown className="w-4 h-4" strokeWidth={2.25} />
                Solo プランの詳細を見る
              </Link>
              <button
                onClick={close}
                className="text-xs text-gray-500 hover:text-gray-700 py-2"
              >
                いまは使わない
              </button>
            </div>
          </div>
        </div>
      </div>
      </Portal>
    );

  return { open, close, dialog };
}

/**
 * インライン用の小さな鍵バッジ。
 * ボタン内や行末に置いて「Solo機能」であることを可視化する。
 */
export function SoloLockBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-kenmitsu-orange50 text-kenmitsu-orange600 text-[9px] font-bold px-1.5 py-0.5 leading-none ${className}`}
      title="Soloプラン限定機能"
    >
      <Lock className="w-2.5 h-2.5" strokeWidth={3} />
      Solo
    </span>
  );
}
