"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

interface InvoiceData {
  // 宛先
  clientName: string;
  clientTitle: string;
  // 自社
  companyName: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyRegistrationNumber: string;
  // 請求情報
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subject: string;
  // 振込先
  bankName: string;
  bankBranch: string;
  accountType: string;
  accountNumber: string;
  accountHolder: string;
  // 明細
  items: InvoiceItem[];
  // 備考
  notes: string;
  // 税率
  taxRate: number;
}

const today = new Date().toISOString().split("T")[0];
const defaultDueDate = (() => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}-31`.replace(/31$/, "30").replace(/-30$/, () => {
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return `-${last}`;
  });
})();

const defaultData: InvoiceData = {
  clientName: "",
  clientTitle: "御中",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  invoiceNumber: "",
  invoiceDate: today,
  dueDate: defaultDueDate,
  subject: "",
  bankName: "",
  bankBranch: "",
  accountType: "普通",
  accountNumber: "",
  accountHolder: "",
  items: [{ id: "1", name: "", quantity: 1, unit: "式", unitPrice: 0 }],
  notes: "",
  taxRate: 10,
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${y}年${m}月${d}日`;
}

function formatCurrency(amount: number): string {
  return "¥" + amount.toLocaleString("ja-JP");
}

export default function InvoicePage() {
  const [data, setData] = useState<InvoiceData>(defaultData);
  const [isPrinting, setIsPrinting] = useState(false);

  const update = useCallback((field: keyof InvoiceData, value: string | number | InvoiceItem[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      name: "",
      quantity: 1,
      unit: "式",
      unitPrice: 0,
    };
    update("items", [...data.items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    update(
      "items",
      data.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    if (data.items.length <= 1) return;
    update("items", data.items.filter((item) => item.id !== id));
  };

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = Math.floor(subtotal * (data.taxRate / 100));
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-area { box-shadow: none; border: none; max-width: 100%; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 no-print">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
                ← 見積書メーカー
              </Link>
              <span className="text-gray-300">|</span>
              <span className="font-bold text-gray-800">請求書メーカー</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">登録不要・無料</span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
          {/* Form */}
          <div className="lg:w-1/2 space-y-4 no-print">
            {/* 宛先 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">請求先</h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="会社名・氏名"
                    value={data.clientName}
                    onChange={(e) => update("clientName", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={data.clientTitle}
                    onChange={(e) => update("clientTitle", e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>御中</option>
                    <option>様</option>
                    <option>（なし）</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 自社情報 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">請求元（自社情報）</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="会社名・屋号・氏名"
                  value={data.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="〒000-0000"
                    value={data.companyZip}
                    onChange={(e) => update("companyZip", e.target.value)}
                    className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="住所"
                    value={data.companyAddress}
                    onChange={(e) => update("companyAddress", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="電話番号"
                    value={data.companyTel}
                    onChange={(e) => update("companyTel", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="メールアドレス"
                    value={data.companyEmail}
                    onChange={(e) => update("companyEmail", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="インボイス登録番号（T+13桁）"
                  value={data.companyRegistrationNumber}
                  onChange={(e) => update("companyRegistrationNumber", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </section>

            {/* 請求情報 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">請求情報</h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">請求書番号</label>
                    <input
                      type="text"
                      placeholder="INV-2026-001"
                      value={data.invoiceNumber}
                      onChange={(e) => update("invoiceNumber", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">発行日</label>
                    <input
                      type="date"
                      value={data.invoiceDate}
                      onChange={(e) => update("invoiceDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">支払期限</label>
                    <input
                      type="date"
                      value={data.dueDate}
                      onChange={(e) => update("dueDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="件名（例：○○システム開発費）"
                  value={data.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </section>

            {/* 明細 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">明細</h2>
              <div className="space-y-2">
                {data.items.map((item, idx) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="品名・内容"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="number"
                      placeholder="数量"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    />
                    <input
                      type="text"
                      placeholder="単位"
                      value={item.unit}
                      onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                      className="w-14 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                    />
                    <input
                      type="number"
                      placeholder="単価"
                      value={item.unitPrice}
                      min={0}
                      onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                      className="w-28 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 text-lg leading-none"
                      aria-label="削除"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + 明細を追加
              </button>
              <div className="mt-3 flex items-center gap-2">
                <label className="text-xs text-gray-500">消費税率</label>
                <select
                  value={data.taxRate}
                  onChange={(e) => update("taxRate", Number(e.target.value))}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value={10}>10%</option>
                  <option value={8}>8%（軽減税率）</option>
                  <option value={0}>0%（非課税）</option>
                </select>
              </div>
            </section>

            {/* 振込先 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">振込先口座</h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="銀行名（例：〇〇銀行）"
                    value={data.bankName}
                    onChange={(e) => update("bankName", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="支店名（例：〇〇支店）"
                    value={data.bankBranch}
                    onChange={(e) => update("bankBranch", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={data.accountType}
                    onChange={(e) => update("accountType", e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>普通</option>
                    <option>当座</option>
                  </select>
                  <input
                    type="text"
                    placeholder="口座番号"
                    value={data.accountNumber}
                    onChange={(e) => update("accountNumber", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="口座名義（カナ）"
                    value={data.accountHolder}
                    onChange={(e) => update("accountHolder", e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </section>

            {/* 備考 */}
            <section className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b border-gray-100">備考</h2>
              <textarea
                placeholder="備考・特記事項（支払い条件、振込手数料の負担など）"
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </section>

            {/* 印刷ボタン */}
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm disabled:opacity-60"
            >
              {isPrinting ? "準備中..." : "印刷 / PDF保存"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              ブラウザの印刷ダイアログで「PDFに保存」を選択するとPDF出力できます
            </p>
          </div>

          {/* Preview */}
          <div className="lg:w-1/2">
            <div className="print-area bg-white rounded-xl border border-gray-200 p-8 text-sm text-gray-800 shadow-sm">
              {/* タイトル */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-widest text-gray-900">請　求　書</h1>
              </div>

              {/* 宛先・発行者 */}
              <div className="flex justify-between mb-6">
                <div>
                  <p className="font-bold text-base">
                    {data.clientName || "（請求先名）"}
                    {data.clientTitle !== "（なし）" ? ` ${data.clientTitle}` : ""}
                  </p>
                  {data.dueDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      お支払期限：{formatDate(data.dueDate)}
                    </p>
                  )}
                </div>
                <div className="text-right text-xs text-gray-600 space-y-0.5">
                  <p className="font-bold text-sm text-gray-900">{data.companyName || "（会社名）"}</p>
                  {data.companyZip && <p>〒{data.companyZip}</p>}
                  {data.companyAddress && <p>{data.companyAddress}</p>}
                  {data.companyTel && <p>TEL: {data.companyTel}</p>}
                  {data.companyEmail && <p>{data.companyEmail}</p>}
                  {data.companyRegistrationNumber && (
                    <p>登録番号: {data.companyRegistrationNumber}</p>
                  )}
                </div>
              </div>

              {/* 請求情報 */}
              <div className="flex justify-between mb-6 text-xs text-gray-600">
                <div>
                  {data.invoiceNumber && <p>請求書番号：{data.invoiceNumber}</p>}
                  {data.invoiceDate && <p>発行日：{formatDate(data.invoiceDate)}</p>}
                </div>
              </div>

              {/* 件名 */}
              {data.subject && (
                <p className="mb-4 font-medium">件名：{data.subject}</p>
              )}

              {/* 合計金額 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 mb-6 flex justify-between items-center">
                <span className="font-bold text-gray-700">ご請求金額</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}<span className="text-sm font-normal ml-1">（税込）</span></span>
              </div>

              {/* 明細テーブル */}
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-800 text-white text-xs">
                    <th className="text-left px-3 py-2 rounded-tl-lg">品名・内容</th>
                    <th className="text-right px-2 py-2">数量</th>
                    <th className="text-right px-2 py-2">単位</th>
                    <th className="text-right px-2 py-2">単価</th>
                    <th className="text-right px-3 py-2 rounded-tr-lg">金額</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-3 py-2 border-b border-gray-100">{item.name || "　"}</td>
                      <td className="px-2 py-2 border-b border-gray-100 text-right">{item.quantity}</td>
                      <td className="px-2 py-2 border-b border-gray-100 text-right text-gray-500">{item.unit}</td>
                      <td className="px-2 py-2 border-b border-gray-100 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-3 py-2 border-b border-gray-100 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 小計・税・合計 */}
              <div className="flex justify-end mb-6">
                <div className="w-56 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">小計</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">消費税（{data.taxRate}%）</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm border-t border-gray-200 pt-1 mt-1">
                    <span>合計（税込）</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* 振込先 */}
              {(data.bankName || data.bankBranch || data.accountNumber) && (
                <div className="border border-gray-200 rounded-lg p-4 mb-4 text-xs">
                  <p className="font-bold text-gray-700 mb-1">お振込先</p>
                  <p>
                    {data.bankName && `${data.bankName}　`}
                    {data.bankBranch && `${data.bankBranch}　`}
                    {data.accountType && `${data.accountType}　`}
                    {data.accountNumber && `${data.accountNumber}　`}
                    {data.accountHolder && `（${data.accountHolder}）`}
                  </p>
                </div>
              )}

              {/* 備考 */}
              {data.notes && (
                <div className="text-xs text-gray-600 border-t border-gray-100 pt-4 whitespace-pre-wrap">
                  <p className="font-bold text-gray-700 mb-1">備考</p>
                  {data.notes}
                </div>
              )}
            </div>

            {/* 関連ツール案内 */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 text-center no-print">
              <p className="text-sm text-gray-600 mb-2">見積書も作成できます</p>
              <Link
                href="/"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                見積書メーカーを使う →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
