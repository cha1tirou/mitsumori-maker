"use client";

import { DeliveryData } from "@/types/delivery";
import { useRef, useState, useEffect } from "react";

interface Props {
  data: DeliveryData;
}

function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function calcSubtotal(items: DeliveryData["items"]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function calcTax(subtotal: number, taxRate: number): number {
  return Math.floor(subtotal * (taxRate / 100));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function DeliveryPreview({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(containerWidth / 794, 1);
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = subtotal + tax;

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="origin-top-left shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden"
        style={{
          transform: `scale(${scale})`,
          width: "210mm",
          transformOrigin: "top left",
        }}
      >
        <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] text-[11px] leading-relaxed text-gray-800 font-sans">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-green-900 tracking-widest">
              納 品 書
            </h1>
            <div className="w-16 h-0.5 bg-green-500 mx-auto mt-2" />
          </div>

          {/* 上段：宛先 & 自社情報 */}
          <div className="flex justify-between mb-8">
            {/* 宛先 */}
            <div className="w-[48%]">
              <div className="border-b-2 border-green-900 pb-1 mb-3">
                <span className="text-base font-semibold">
                  {data.clientName || "（宛先）"}
                </span>
                <span className="text-sm ml-1">{data.clientTitle}</span>
              </div>
              {data.subject && (
                <p className="text-xs text-gray-500">
                  件名：{data.subject}
                </p>
              )}
              <p className="mt-4 text-sm">
                下記の通り納品いたします。
              </p>
              {/* 合計金額ボックス */}
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div className="text-xs text-gray-500 mb-1">納品金額（税込）</div>
                <div className="text-xl font-bold text-green-900">
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            {/* 自社情報 */}
            <div className="w-[40%] text-right text-xs text-gray-600 space-y-0.5">
              <p className="text-sm font-semibold text-green-900">
                {data.companyName || "（自社名）"}
              </p>
              {data.companyZip && <p>〒{data.companyZip}</p>}
              {data.companyAddress && <p>{data.companyAddress}</p>}
              {data.companyTel && <p>TEL: {data.companyTel}</p>}
              {data.companyEmail && <p>{data.companyEmail}</p>}
              {data.companyRegistrationNumber && (
                <p className="mt-1">登録番号: {data.companyRegistrationNumber}</p>
              )}
              <div className="mt-2 space-y-0.5">
                {data.deliveryNumber && <p>納品書番号: {data.deliveryNumber}</p>}
                <p>発行日: {formatDate(data.deliveryDate)}</p>
                {data.deliveryDueDate && (
                  <p>納品日: {formatDate(data.deliveryDueDate)}</p>
                )}
              </div>
            </div>
          </div>

          {/* 明細テーブル */}
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-green-900 text-white text-xs">
                <th className="py-2 px-3 text-left font-medium w-8">#</th>
                <th className="py-2 px-3 text-left font-medium">品目</th>
                <th className="py-2 px-3 text-right font-medium w-16">数量</th>
                <th className="py-2 px-3 text-center font-medium w-12">単位</th>
                <th className="py-2 px-3 text-right font-medium w-24">単価</th>
                <th className="py-2 px-3 text-right font-medium w-24">金額</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-3 text-gray-400 border-b border-gray-100">
                    {i + 1}
                  </td>
                  <td className="py-2 px-3 border-b border-gray-100">
                    {item.name || "—"}
                  </td>
                  <td className="py-2 px-3 text-right border-b border-gray-100">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 text-center border-b border-gray-100">
                    {item.unit}
                  </td>
                  <td className="py-2 px-3 text-right border-b border-gray-100">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="py-2 px-3 text-right border-b border-gray-100 font-medium">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 小計・税・合計 */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-1.5 text-xs">
                <span className="text-gray-500">小計</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs">
                <span className="text-gray-500">
                  消費税（{data.taxRate}%）
                </span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-green-900 mt-1 text-sm font-bold text-green-900">
                <span>合計（税込）</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* 備考 */}
          {data.notes && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-1">備考</p>
              <p className="text-xs text-gray-600 whitespace-pre-wrap">
                {data.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
