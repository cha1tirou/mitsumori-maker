import { QuoteData } from "@/types/quote";
import { formatCurrency, calcSubtotal, calcTax, calcTotal, formatDate } from "./utils";

interface Props {
  data: QuoteData;
}

export default function LinedTemplate({ data }: Props) {
  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = calcTotal(subtotal, tax);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] text-[11px] leading-relaxed text-gray-800 font-sans">
      {/* ヘッダー：二重線 */}
      <div className="border-t-4 border-double border-gray-800 border-b-4 py-3 mb-8">
        <h1 className="text-center text-2xl font-bold tracking-[0.5em]">
          御 見 積 書
        </h1>
      </div>

      <div className="flex justify-between mb-8">
        <div className="w-[48%]">
          <div className="border-b border-gray-800 pb-1 mb-3">
            <span className="text-base font-semibold">
              {data.clientName || "（宛先）"}
            </span>
            <span className="text-sm ml-1">{data.clientTitle}</span>
          </div>
          {data.subject && <p className="text-xs text-gray-600">件名：{data.subject}</p>}
          <p className="mt-4 text-sm">下記の通りお見積り申し上げます。</p>
          <div className="mt-4 border-2 border-gray-800 px-4 py-3">
            <div className="text-xs text-gray-600 mb-1">お見積り金額（税込）</div>
            <div className="text-xl font-bold">{formatCurrency(total)}</div>
          </div>
        </div>
        <div className="w-[40%] text-right text-xs text-gray-700 space-y-0.5">
          <p className="text-sm font-semibold">{data.companyName || "（自社名）"}</p>
          {data.companyZip && <p>〒{data.companyZip}</p>}
          {data.companyAddress && <p>{data.companyAddress}</p>}
          {data.companyTel && <p>TEL: {data.companyTel}</p>}
          {data.companyEmail && <p>{data.companyEmail}</p>}
          {data.companyRegistrationNumber && (
            <p className="mt-1">登録番号: {data.companyRegistrationNumber}</p>
          )}
          <div className="mt-2 space-y-0.5">
            {data.quoteNumber && <p>見積番号: {data.quoteNumber}</p>}
            <p>見積日: {formatDate(data.quoteDate)}</p>
            {data.expiryDate && <p>有効期限: {formatDate(data.expiryDate)}</p>}
          </div>
        </div>
      </div>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-t-2 border-b-2 border-gray-800 text-xs">
            <th className="py-2 px-3 text-left font-semibold w-8">#</th>
            <th className="py-2 px-3 text-left font-semibold">品目</th>
            <th className="py-2 px-3 text-right font-semibold w-16">数量</th>
            <th className="py-2 px-3 text-center font-semibold w-12">単位</th>
            <th className="py-2 px-3 text-right font-semibold w-24">単価</th>
            <th className="py-2 px-3 text-right font-semibold w-24">金額</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="py-2 px-3 text-gray-500">{i + 1}</td>
              <td className="py-2 px-3">{item.name || "—"}</td>
              <td className="py-2 px-3 text-right">{item.quantity}</td>
              <td className="py-2 px-3 text-center">{item.unit}</td>
              <td className="py-2 px-3 text-right">{formatCurrency(item.unitPrice)}</td>
              <td className="py-2 px-3 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-1.5 text-xs border-b border-gray-300">
            <span className="text-gray-600">小計</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-1.5 text-xs border-b border-gray-300">
            <span className="text-gray-600">消費税（{data.taxRate}%）</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between py-2 border-t-2 border-b-2 border-gray-800 mt-1 text-sm font-bold">
            <span>合計（税込）</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t border-gray-400 pt-4">
          <p className="text-xs font-semibold mb-1">備考</p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap">{data.notes}</p>
        </div>
      )}
    </div>
  );
}
