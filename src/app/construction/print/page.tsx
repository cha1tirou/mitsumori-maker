"use client";

import { useEffect, useState } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import ConstructionPreview from "@/components/construction/ConstructionPreview";
import { ConstructionQuoteData } from "@/types/construction";

export const PRINT_STORAGE_KEY = "kenmitsu-print-data-v1";

type PrintPayload = {
  data: ConstructionQuoteData;
  watermark: boolean;
};

export default function PrintPage() {
  const [payload, setPayload] = useState<PrintPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PRINT_STORAGE_KEY);
      if (!raw) {
        setError("印刷データが見つかりません。見積書編集画面から「PDFダウンロード」を押し直してください。");
        return;
      }
      const parsed = JSON.parse(raw) as PrintPayload;
      setPayload(parsed);
      // 次回開いた時に古いデータが混ざらないようクリア
      sessionStorage.removeItem(PRINT_STORAGE_KEY);
    } catch {
      setError("印刷データの読み込みに失敗しました。");
    }
  }, []);

  useEffect(() => {
    if (!payload) return;
    // DOM が描画された後に印刷ダイアログを開く
    const t = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(t);
  }, [payload]);

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-gray-50">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-md">
          <p className="text-sm font-bold text-gray-900 mb-2">印刷データが見つかりません</p>
          <p className="text-xs text-gray-600 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => window.close()}
            className="text-xs text-kenmitsu-navy hover:underline"
          >
            このタブを閉じる
          </button>
        </div>
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <p className="text-xs text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      {/* 印刷専用CSS: 画面表示中と印刷中でレイアウトを切り替える */}
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body {
            background: #ffffff !important;
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .print-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          .print-sheet > div {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
        }
        @media screen {
          body {
            background: #e5e7eb;
          }
          .print-sheet {
            max-width: 210mm;
            margin: 24px auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>

      {/* 画面表示時のヘッダー。印刷時は no-print で非表示 */}
      <div className="no-print sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 text-xs">
          <Printer className="w-4 h-4 shrink-0" strokeWidth={2.25} />
          <span className="leading-tight">
            印刷ダイアログで「<strong>PDFとして保存</strong>」を選ぶとPDF出力できます。
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" strokeWidth={2.25} />
            印刷ダイアログを開く
          </button>
          <button
            onClick={() => window.close()}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.25} />
            閉じる
          </button>
        </div>
      </div>

      <div className="print-sheet">
        {/* 画面/印刷どちらにも出るプレビュー本体。透かしは独自描画するので watermark=false */}
        <ConstructionPreview data={payload.data} watermark={false} />
      </div>

      {/* 透かし: 複数ページをまたいでも各ページに出るよう position:fixed で描画
         （Chrome/Firefox/Safari とも印刷時は fixed が各ページに繰り返される） */}
      {payload.watermark && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 hidden print:flex items-center justify-center"
        >
          <span
            className="font-black tracking-widest"
            style={{
              fontSize: "96pt",
              color: "rgba(30, 64, 175, 0.12)",
              transform: "rotate(-30deg)",
            }}
          >
            無料版 SAMPLE
          </span>
        </div>
      )}
    </>
  );
}
