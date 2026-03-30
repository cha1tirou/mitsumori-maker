import { QuoteData } from "@/types/quote";
import { formatCurrency, calcSubtotal, calcTax, calcTotal, formatDate } from "./utils";

interface Props {
  data: QuoteData;
}

export default function MinimalTemplate({ data }: Props) {
  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = calcTotal(subtotal, tax);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[18mm] text-[11px] leading-relaxed text-gray-700 font-sans">
      {/* ヘッダー */}
      <div className="mb-10">
        <h1 className="text-3xl font-light text-gray-800 tracking-[0.3em]">
          見積書
        </h1>
        <div className="w-8 h-px bg-gray-300 mt-4" />
      </div>

      {/* 情報セクション */}
      <div className="flex justify-between mb-10">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">To</p>
            <p className="text-lg font-light">
              {data.clientName || "（宛先）"}{" "}
              <span className="text-sm">{data.clientTitle}</span>
            </p>
          </div>
          {data.subject && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Subject</p>
              <p>{data.subject}</p>
            </div>
          )}
        </div>

        <div className="text-right text-xs text-gray-500 space-y-0.5">
          <p className="text-sm text-gray-700 font-medium mb-2">
            {data.companyName || "（自社名）"}
          </p>
          {data.companyZip && <p>〒{data.companyZip}</p>}
          {data.companyAddress && <p>{data.companyAddress}</p>}
          {data.companyTel && <p>{data.companyTel}</p>}
          {data.companyEmail && <p>{data.companyEmail}</p>}
          {data.companyRegistrationNumber && (
            <p className="mt-2">登録番号: {data.companyRegistrationNumber}</p>
          )}
          <div className="mt-3 pt-3 border-t border-gray-100">
            {data.quoteNumber && <p>No. {data.quoteNumber}</p>}
            <p>Date: {formatDate(data.quoteDate)}</p>
            {data.expiryDate && <p>Valid: {formatDate(data.expiryDate)}</p>}
          </div>
        </div>
      </div>

      {/* 合計 */}
      <div className="mb-8 py-5 border-y border-gray-200">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
        <p className="text-2xl font-light text-gray-800">
          {formatCurrency(total)}
          <span className="text-xs text-gray-400 ml-2">（税込）</span>
        </p>
      </div>

      {/* 明細 */}
      <table className="w-full mb-8">
        <thead>
          <tr className="text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-200">
            <th className="py-2 text-left font-normal">品目</th>
            <th className="py-2 text-right font-normal w-16">数量</th>
            <th className="py-2 text-center font-normal w-12">単位</th>
            <th className="py-2 text-right font-normal w-24">単価</th>
            <th className="py-2 text-right font-normal w-24">金額</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-3">{item.name || "—"}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-center text-gray-400">{item.unit}</td>
              <td className="py-3 text-right">{formatCurrency(item.unitPrice)}</td>
              <td className="py-3 text-right">
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 小計 */}
      <div className="flex justify-end mb-10">
        <div className="w-56 space-y-2 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>小計</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>消費税（{data.taxRate}%）</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200 font-medium text-gray-800">
            <span>合計</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* 備考 */}
      {data.notes && (
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Notes</p>
          <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">
            {data.notes}
          </p>
        </div>
      )}
    </div>
  );
}
