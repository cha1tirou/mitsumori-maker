"use client";

import { useState } from "react";
import { InvoiceData, defaultInvoiceData } from "@/types/invoice";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import InvoicePdfDownloadButton from "@/components/InvoicePdfDownloadButton";
import Link from "next/link";

export default function InvoicePage() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">請</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-blue-900 leading-tight">
                  請求書メーカー
                </h1>
                <p className="text-[10px] text-gray-400 hidden sm:block">
                  無料・登録不要でプロの請求書を作成
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs text-gray-500 hover:text-gray-900 hidden sm:block"
              >
                見積書メーカー
              </Link>
              {/* モバイル：プレビュー切り替え */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden bg-blue-800 text-white text-xs px-3 py-2 rounded-lg font-medium"
              >
                {showPreview ? "編集に戻る" : "プレビュー"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 特徴セクション */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "完全無料", sub: "すべての機能が0円" },
              { label: "登録不要", sub: "個人情報の入力なし" },
              { label: "インボイス対応", sub: "適格請求書形式で出力" },
              { label: "PDF出力", sub: "ワンクリックでDL" },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-sm font-bold text-gray-800">{f.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* 左：入力フォーム */}
          <div
            className={`w-full lg:w-[420px] lg:flex-shrink-0 ${
              showPreview ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar lg:pr-2">
              <InvoiceForm data={data} onChange={setData} />

              {/* PDF出力エリア */}
              <div className="mt-6 space-y-4">
                <InvoicePdfDownloadButton data={data} />
              </div>
            </div>
          </div>

          {/* 右：リアルタイムプレビュー */}
          <div
            className={`flex-1 min-w-0 ${
              showPreview ? "" : "hidden lg:block"
            }`}
          >
            <div className="lg:sticky lg:top-[100px]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Preview
                </h2>
                <span className="text-[10px] text-gray-300 bg-gray-100 px-2 py-1 rounded">
                  A4サイズ
                </span>
              </div>
              <InvoicePreview data={data} />

              {/* モバイル用 PDF出力 */}
              <div className="lg:hidden mt-6 space-y-4">
                <InvoicePdfDownloadButton data={data} />
              </div>
            </div>
          </div>
        </div>

        {/* 見積書メーカーへの誘導 */}
        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            見積書も無料で作成できます
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            見積書メーカーなら、3種類のテンプレートからプロの見積書をすぐに作成できます。
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            見積書メーカーを使う &rarr;
          </Link>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-gray-400">
            請求書メーカー — 無料・登録不要の請求書作成ツール |{" "}
            <Link href="/" className="hover:text-gray-600">
              見積書メーカー
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
