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

      {/* 特徴セクション */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "完全無料", sub: "すべての機能が0円" },
              { label: "登録不要", sub: "個人情報の入力なし" },
              { label: "PDF出力", sub: "ワンクリックでDL" },
              { label: "3種のテンプレート", sub: "業種に合わせて選択" },
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
        {/* 使い方3ステップ */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
            3ステップで見積書が完成
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "情報を入力",
                desc: "会社名・品目・金額など必要事項をフォームに入力するだけ。テンプレートを3種類から選べます。",
                icon: (
                  <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "リアルタイムでプレビュー",
                desc: "入力と同時に右側にA4サイズの見積書が表示されます。仕上がりを確認しながら編集できます。",
                icon: (
                  <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "PDFでダウンロード",
                desc: "「PDFダウンロード」ボタンを押すだけで即座に保存。登録不要・完全無料で何度でも使えます。",
                icon: (
                  <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <div className="inline-block bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* こんな方におすすめ */}
        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">こんな方におすすめ</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "初めて見積書を作成するフリーランスの方",
              "Excelテンプレートを探す手間を省きたい方",
              "急ぎで見積書が必要になった個人事業主の方",
              "会員登録なしで今すぐPDFが欲しい方",
            ].map((text) => (
              <div key={text} className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">&#10003;</span>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ガイド記事リンク */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            見積書お役立ちガイド
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: "/guide/how-to-write", title: "見積書の書き方・必要項目を解説", desc: "初心者向けに記載項目やポイントを解説" },
              { href: "/guide/template-excel", title: "見積書テンプレートの選び方", desc: "Excel・PDF・オンラインツール別に比較" },
              { href: "/guide/freelance", title: "フリーランスの見積書ガイド", desc: "個人事業主向けの書き方・単価の決め方" },
              { href: "/guide/difference", title: "見積書・請求書・納品書の違い", desc: "3つの書類の役割と使い分けを解説" },
              { href: "/guide/consumption-tax", title: "消費税の書き方・インボイス対応", desc: "税率記載・端数処理・登録番号の扱い" },
              { href: "/guide/valid-period", title: "見積書の有効期限の設定方法", desc: "業種別の目安と期限切れ時の対応" },
              { href: "/guide/electronic", title: "見積書の電子化・PDF化のメリット", desc: "コスト削減・電子帳簿保存法への対応" },
              { href: "/guide/construction", title: "建設業の見積書の書き方", desc: "工事見積書の項目・階層構造・諸経費の記載" },
              { href: "/guide/it-web", title: "IT・Web業界の見積書の書き方", desc: "工数・単価・修正範囲の記載ポイントを解説" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>
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
