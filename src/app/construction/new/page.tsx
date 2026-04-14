"use client";

import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ConstructionQuoteData,
  defaultConstructionQuoteData,
} from "@/types/construction";
import { runConstructionLawChecks } from "@/lib/constructionLawChecker";
import { trackConversion } from "@/lib/analytics";
import ConstructionForm from "@/components/construction/ConstructionForm";
import ConstructionPreview from "@/components/construction/ConstructionPreview";
import LawCheckPanel from "@/components/construction/LawCheckPanel";
import { HardHat, Eye, FileEdit, Printer, Lock } from "lucide-react";

const ConstructionPdfDownloadButton = dynamic(
  () => import("@/components/construction/ConstructionPdfDownloadButton"),
  { ssr: false }
);

export default function ConstructionNewPage() {
  const [data, setData] = useState<ConstructionQuoteData>(
    defaultConstructionQuoteData
  );
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const hasStartedRef = useRef(false);

  const lawChecks = useMemo(() => runConstructionLawChecks(data), [data]);

  const handleDataChange = (next: ConstructionQuoteData) => {
    if (!hasStartedRef.current) {
      const hasInput =
        next.clientName ||
        next.subject ||
        next.companyName ||
        next.sections.some((s) =>
          s.items.some((i) => i.name || i.unitPrice > 0)
        );
      if (hasInput) {
        hasStartedRef.current = true;
        trackConversion("construction_tool_start");
      }
    }
    setData(next);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/construction"
            className="flex items-center gap-2 text-sm font-bold text-gray-900"
          >
            <HardHat className="w-5 h-5 text-green-700" strokeWidth={2.25} />
            <span className="hidden sm:inline">
              見積書メーカー <span className="text-green-700">for 建設業</span>
            </span>
            <span className="sm:hidden">建設業見積</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="lg:hidden flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${
                  mobileView === "form"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" strokeWidth={2.25} />
                入力
              </button>
              <button
                onClick={() => setMobileView("preview")}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${
                  mobileView === "preview"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <Eye className="w-3.5 h-3.5" strokeWidth={2.25} />
                プレビュー
              </button>
            </div>
            <ConstructionPdfDownloadButton
              data={data}
              className="!py-2 !px-3 !text-xs"
            />
          </div>
        </div>
      </header>

      {/* 開発中バナー */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-2 text-[11px] text-amber-900 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
          <span>
            現在MVP開発中。アカウント保存・課金は準備中です。見積書作成・PDFダウンロードはお試しいただけます。
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-6">
          {/* 左：フォーム */}
          <div
            className={`w-full lg:w-[460px] lg:flex-shrink-0 ${
              mobileView === "preview" ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2">
              <ConstructionForm data={data} onChange={handleDataChange} />

              <div className="mt-5 space-y-2">
                <ConstructionPdfDownloadButton data={data} className="w-full" />
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" strokeWidth={2.25} />
                  印刷 / PDF保存
                </button>
              </div>
            </div>
          </div>

          {/* 右：プレビュー＋法令チェック */}
          <div
            className={`flex-1 min-w-0 ${
              mobileView === "form" ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[80px] space-y-4">
              <LawCheckPanel results={lawChecks} />

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Preview
                </p>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  A4サイズ
                </span>
              </div>
              <ConstructionPreview data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
