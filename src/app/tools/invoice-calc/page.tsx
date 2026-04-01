"use client";

import { useState } from "react";
import Link from "next/link";

interface TaxItem {
  name: string;
  amount: number;
  taxRate: 8 | 10;
}

export default function InvoiceCalcPage() {
  const [items, setItems] = useState<TaxItem[]>([
    { name: "", amount: 0, taxRate: 10 },
  ]);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const addItem = () => {
    setItems([...items, { name: "", amount: 0, taxRate: 10 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof TaxItem, value: string | number) => {
    const updated = [...items];
    if (field === "taxRate") {
      updated[index] = { ...updated[index], taxRate: value as 8 | 10 };
    } else if (field === "amount") {
      updated[index] = { ...updated[index], amount: Number(value) || 0 };
    } else {
      updated[index] = { ...updated[index], name: String(value) };
    }
    setItems(updated);
  };

  // 税率ごとの集計
  const subtotal8 = items
    .filter((item) => item.taxRate === 8)
    .reduce((sum, item) => sum + item.amount, 0);
  const subtotal10 = items
    .filter((item) => item.taxRate === 10)
    .reduce((sum, item) => sum + item.amount, 0);
  const tax8 = Math.floor(subtotal8 * 0.08);
  const tax10 = Math.floor(subtotal10 * 0.1);
  const subtotalAll = subtotal8 + subtotal10;
  const taxAll = tax8 + tax10;
  const totalAll = subtotalAll + taxAll;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-gray-800">インボイス計算機</span>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          インボイス計算機
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          適格請求書（インボイス）の税率別消費税額を自動計算。軽減税率8%と標準税率10%の混在にも対応しています。
        </p>

        {/* 登録番号 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            適格請求書発行事業者 登録番号
          </label>
          <input
            type="text"
            placeholder="T1234567890123"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            13桁の法人番号またはT+13桁の番号
          </p>
        </div>

        {/* 明細入力 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            品目・金額の入力
          </h2>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
              >
                <input
                  type="text"
                  placeholder="品目名"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="金額（税抜）"
                  value={item.amount || ""}
                  onChange={(e) => updateItem(index, "amount", e.target.value)}
                  className="w-full sm:w-36 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <select
                  value={item.taxRate}
                  onChange={(e) =>
                    updateItem(index, "taxRate", Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value={10}>10%</option>
                  <option value={8}>8%（軽減）</option>
                </select>
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length <= 1}
                  className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1 text-lg"
                  aria-label="削除"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            + 行を追加
          </button>
        </div>

        {/* 計算結果 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            計算結果
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-500 font-medium">
                  区分
                </th>
                <th className="text-right py-2 text-gray-500 font-medium">
                  税抜金額
                </th>
                <th className="text-right py-2 text-gray-500 font-medium">
                  消費税額
                </th>
                <th className="text-right py-2 text-gray-500 font-medium">
                  税込金額
                </th>
              </tr>
            </thead>
            <tbody>
              {subtotal8 > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-700">
                    8%対象（軽減税率）
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {subtotal8.toLocaleString()}円
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {tax8.toLocaleString()}円
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {(subtotal8 + tax8).toLocaleString()}円
                  </td>
                </tr>
              )}
              {subtotal10 > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-700">10%対象</td>
                  <td className="py-2 text-right text-gray-700">
                    {subtotal10.toLocaleString()}円
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {tax10.toLocaleString()}円
                  </td>
                  <td className="py-2 text-right text-gray-700">
                    {(subtotal10 + tax10).toLocaleString()}円
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-gray-300 font-bold">
                <td className="py-3 text-gray-900">合計</td>
                <td className="py-3 text-right text-gray-900">
                  {subtotalAll.toLocaleString()}円
                </td>
                <td className="py-3 text-right text-gray-900">
                  {taxAll.toLocaleString()}円
                </td>
                <td className="py-3 text-right text-gray-900">
                  {totalAll.toLocaleString()}円
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* インボイスプレビュー */}
        {(subtotalAll > 0 || registrationNumber) && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              インボイス記載例
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-1 font-mono">
              {registrationNumber && (
                <p>登録番号: {registrationNumber}</p>
              )}
              {subtotal8 > 0 && (
                <>
                  <p>
                    8%対象: {subtotal8.toLocaleString()}円（税{" "}
                    {tax8.toLocaleString()}円）※
                  </p>
                </>
              )}
              {subtotal10 > 0 && (
                <p>
                  10%対象: {subtotal10.toLocaleString()}円（税{" "}
                  {tax10.toLocaleString()}円）
                </p>
              )}
              <p className="font-bold pt-2 border-t border-gray-300">
                合計: {totalAll.toLocaleString()}円（税込）
              </p>
              {subtotal8 > 0 && (
                <p className="text-xs text-gray-500 pt-1">
                  ※ 軽減税率対象
                </p>
              )}
            </div>
          </div>
        )}

        {/* 解説 */}
        <article className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            インボイス制度とは
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度（適格請求書等保存方式）は、2023年10月に開始された消費税の仕入税額控除に関する制度です。取引先が仕入税額控除を受けるためには、適格請求書（インボイス）の交付を受けて保存する必要があります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            適格請求書に必要な記載事項
          </h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>適格請求書発行事業者の氏名・名称と登録番号</li>
            <li>取引年月日</li>
            <li>取引内容（軽減税率対象品目である旨の表記）</li>
            <li>税率ごとに区分した対価の額（税抜または税込）</li>
            <li>税率ごとに区分した消費税額</li>
            <li>書類の交付を受ける事業者の氏名・名称</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            軽減税率8%の対象品目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            軽減税率8%が適用されるのは、飲食料品（酒類を除く）と週2回以上発行される定期購読の新聞です。外食やケータリングは標準税率10%が適用されますが、テイクアウトや出前は軽減税率8%の対象になります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            端数処理のルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度では、消費税額の端数処理は「一つの適格請求書につき、税率ごとに1回」と定められています。品目ごとに端数処理を行うのではなく、税率ごとの合計額に対して端数処理（切捨て・四捨五入・切上げのいずれか）を行います。この計算機では切捨て（floor）を採用しています。
          </p>
        </article>

        {/* 関連リンク */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/guide/consumption-tax"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link
                href="/guide/freelance"
                className="text-blue-600 hover:underline text-sm"
              >
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link
                href="/guide/difference"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書・請求書・納品書の違いをわかりやすく解説
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書メーカーを使う &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
