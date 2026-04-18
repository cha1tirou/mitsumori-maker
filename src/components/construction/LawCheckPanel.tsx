"use client";

import {
  LawCheckResult,
  severityColor,
  severityLabel,
} from "@/lib/constructionLawChecker";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface Props {
  results: LawCheckResult[];
}

export default function LawCheckPanel({ results }: Props) {
  const errorCount = results.filter((r) => r.severity === "error").length;
  const warnCount = results.filter((r) => r.severity === "warning").length;
  const infoCount = results.filter((r) => r.severity === "info").length;
  const allClear = results.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-3 bg-gradient-to-r from-kenmitsu-navy700 to-kenmitsu-navy text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold opacity-90">建設業法2025 チェッカー</p>
            <p className="text-[10px] opacity-75">
              改正建設業法（2025年12月施行）の観点から見積書を自動チェック
            </p>
          </div>
          {allClear ? (
            <span className="inline-flex items-center gap-1 bg-white/15 border border-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              OK
            </span>
          ) : (
            <span className="text-[10px] font-medium opacity-90">
              {errorCount > 0 && <span className="mr-2">要修正 {errorCount}</span>}
              {warnCount > 0 && <span className="mr-2">要注意 {warnCount}</span>}
              {infoCount > 0 && <span>推奨 {infoCount}</span>}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {allClear ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-kenmitsu-ok mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm font-bold text-gray-800">
              改正建設業法の観点で問題は見つかりませんでした
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              ※ 最終的な法的判断は所属団体・専門家にご確認ください
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((r) => (
              <div
                key={r.id}
                className={`rounded-lg border p-3 ${severityColor(r.severity)}`}
              >
                <div className="flex items-start gap-2">
                  {r.severity === "info" ? (
                    <Info className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.25} />
                  ) : (
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.25} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        {severityLabel(r.severity)}
                      </span>
                      <span className="text-xs font-bold">{r.message}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      {r.detail}
                    </p>
                    {r.fix && (
                      <p className="text-[11px] leading-relaxed mt-1.5 font-medium opacity-100">
                        → {r.fix}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
