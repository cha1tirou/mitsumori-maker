"use client";

import { useState } from "react";
import { PurchaseOrderData, defaultPurchaseOrderData } from "@/types/purchaseOrder";
import PurchaseOrderForm from "@/components/PurchaseOrderForm";
import PurchaseOrderPreview from "@/components/PurchaseOrderPreview";
import PurchaseOrderPdfDownloadButton from "@/components/PurchaseOrderPdfDownloadButton";
import Link from "next/link";

export default function PurchaseOrderPage() {
  const [data, setData] = useState<PurchaseOrderData>(defaultPurchaseOrderData);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-800 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">発</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-purple-900 leading-tight">
                  発注書メーカー
                </h1>
                <p className="text-[10px] text-gray-400 hidden sm:block">
                  無料・登録不要でプロの発注書を作成
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
              <Link
                href="/tools/invoice"
                className="text-xs text-gray-500 hover:text-gray-900 hidden sm:block"
              >
                請求書メーカー
              </Link>
              <Link
                href="/tools/delivery"
                className="text-xs text-gray-500 hover:text-gray-900 hidden sm:block"
              >
                納品書メーカー
              </Link>
              {/* モバイル：プレビュー切り替え */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden bg-purple-800 text-white text-xs px-3 py-2 rounded-lg font-medium"
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
              { label: "納期管理", sub: "納期を明記して発注" },
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
              <PurchaseOrderForm data={data} onChange={setData} />

              {/* PDF出力エリア */}
              <div className="mt-6 space-y-4">
                <PurchaseOrderPdfDownloadButton data={data} />
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
              <PurchaseOrderPreview data={data} />

              {/* モバイル用 PDF出力 */}
              <div className="lg:hidden mt-6 space-y-4">
                <PurchaseOrderPdfDownloadButton data={data} />
              </div>
            </div>
          </div>
        </div>

        {/* 他ツールへの誘導 */}
        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            見積書・請求書・納品書も無料で作成できます
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            見積書メーカー・請求書メーカー・納品書メーカーも完全無料・登録不要でご利用いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              見積書メーカーを使う &rarr;
            </Link>
            <Link
              href="/tools/invoice"
              className="inline-block bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              請求書メーカーを使う &rarr;
            </Link>
            <Link
              href="/tools/delivery"
              className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-800 transition-colors text-sm"
            >
              納品書メーカーを使う &rarr;
            </Link>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-gray-400">
            発注書メーカー — 無料・登録不要の発注書作成ツール |{" "}
            <Link href="/" className="hover:text-gray-600">
              見積書メーカー
            </Link>
            {" "}|{" "}
            <Link href="/tools/invoice" className="hover:text-gray-600">
              請求書メーカー
            </Link>
            {" "}|{" "}
            <Link href="/tools/delivery" className="hover:text-gray-600">
              納品書メーカー
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
