"use client";

import { useState, useEffect } from "react";
import { InvoiceData, defaultInvoiceData } from "@/types/invoice";
import { useDraftSave } from "@/hooks/useDraftSave";
import DraftBanner from "@/components/DraftBanner";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import InvoicePdfDownloadButton from "@/components/InvoicePdfDownloadButton";
import ToolHeader from "@/components/ToolHeader";
import RelatedTools from "@/components/RelatedTools";
import Link from "next/link";

export default function InvoicePage() {
  const draft = useDraftSave<InvoiceData>({
    key: "draft_invoice_v1",
    version: 1,
    defaultData: defaultInvoiceData,
  });
  const { data, setData } = draft;
  const [showPreview, setShowPreview] = useState(false);

  // 見積書からのデータ複製を受け取る
  useEffect(() => {
    try {
      const copied = localStorage.getItem("quote_to_invoice");
      if (copied) {
        const parsed = JSON.parse(copied);
        setData({ ...defaultInvoiceData, ...parsed });
        localStorage.removeItem("quote_to_invoice");
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="min-h-screen">
      <ToolHeader
        showPreviewToggle
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(!showPreview)}
      />

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
              {/* 下書き復元バナー */}
              {draft.hasDraft && (
                <DraftBanner
                  onRestore={draft.restoreDraft}
                  onDiscard={draft.discardDraft}
                />
              )}
              <InvoiceForm data={data} onChange={setData} />

              {/* PDF出力エリア */}
              <div className="mt-6 space-y-4">
                <InvoicePdfDownloadButton data={data} />
                <button
                  onClick={() => {
                    if (confirm("保存された下書きを削除しますか？")) {
                      draft.clearDraft();
                    }
                  }}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  下書きを削除
                </button>
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

        {/* 見積書・納品書メーカーへの誘導 */}
        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            見積書・納品書も無料で作成できます
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            見積書メーカー・納品書メーカーも完全無料・登録不要でご利用いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              見積書メーカーを使う &rarr;
            </Link>
            <Link
              href="/tools/delivery"
              className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-800 transition-colors text-sm"
            >
              納品書メーカーを使う &rarr;
            </Link>
          </div>
        </section>
        <RelatedTools />
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-gray-400">
            請求書メーカー — 無料・登録不要の請求書作成ツール |{" "}
            <Link href="/" className="hover:text-gray-600">
              見積書メーカー
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
