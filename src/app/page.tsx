"use client";

import { useState } from "react";
import { QuoteData, TemplateName, defaultQuoteData } from "@/types/quote";
import TemplateSelector from "@/components/TemplateSelector";
import QuoteForm from "@/components/QuoteForm";
import QuotePreview from "@/components/QuotePreview";
import PdfDownloadButton from "@/components/PdfDownloadButton";

export default function Home() {
  const [data, setData] = useState<QuoteData>(defaultQuoteData);
  const [template, setTemplate] = useState<TemplateName>("standard");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-sm font-bold">見</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-primary leading-tight">
                  見積書メーカー
                </h1>
                <p className="text-[10px] text-gray-400 hidden sm:block">
                  無料・登録不要でプロの見積書を作成
                </p>
              </div>
            </div>

            {/* モバイル：プレビュー切り替え */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden bg-primary text-white text-xs px-3 py-2 rounded-lg font-medium"
            >
              {showPreview ? "編集に戻る" : "プレビュー"}
            </button>
          </div>

          {/* テンプレート切り替え */}
          <TemplateSelector selected={template} onChange={setTemplate} />
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* 左：入力フォーム */}
          <div
            className={`w-full lg:w-[420px] lg:flex-shrink-0 ${
              showPreview ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[140px] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto custom-scrollbar lg:pr-2">
              <QuoteForm data={data} onChange={setData} />

              {/* PDF出力エリア */}
              <div className="mt-6 space-y-4">
                <PdfDownloadButton data={data} template={template} />

                {/* AdSense プレースホルダー */}
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-300">広告スペース</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右：リアルタイムプレビュー */}
          <div
            className={`flex-1 min-w-0 ${
              showPreview ? "" : "hidden lg:block"
            }`}
          >
            <div className="lg:sticky lg:top-[140px]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Preview
                </h2>
                <span className="text-[10px] text-gray-300 bg-gray-100 px-2 py-1 rounded">
                  A4サイズ
                </span>
              </div>
              <QuotePreview data={data} template={template} />

              {/* モバイル用 PDF出力 */}
              <div className="lg:hidden mt-6 space-y-4">
                <PdfDownloadButton data={data} template={template} />
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-300">広告スペース</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          {/* AdSense プレースホルダー */}
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 mb-6 text-center">
            <p className="text-[10px] text-gray-300">広告スペース（フッター）</p>
          </div>
          <p className="text-xs text-gray-400">
            見積書メーカー — 無料・登録不要の見積書作成ツール
          </p>
        </div>
      </footer>
    </div>
  );
}
