import { QuoteData } from "@/types/quote";
import { formatCurrency, calcSubtotal, calcTax, calcTotal, formatDate } from "./utils";

interface Props {
  data: QuoteData;
}

export default function ColorfulTemplate({ data }: Props) {
  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = calcTotal(subtotal, tax);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] text-[11px] leading-relaxed text-gray-800 font-sans relative overflow-hidden">
      {/* カラフルなサイドバー */}
      <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600" />

      <div className="p-[15mm] pl-[20mm]">
        {/* ヘッダー */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              見積書
            </h1>
            <p className="text-xs text-gray-400 mt-1">QUOTATION</p>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-0.5">
            {data.quoteNumber && <p>No. {data.quoteNumber}</p>}
            <p>{formatDate(data.quoteDate)}</p>
            {data.expiryDate && <p>有効期限: {formatDate(data.expiryDate)}</p>}
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div className="w-[48%]">
            <div className="border-b-2 border-orange-400 pb-1 mb-3">
              <span className="text-base font-semibold">
                {data.clientName || "（宛先）"}
              </span>
              <span className="text-sm ml-1">{data.clientTitle}</span>
            </div>
            {data.subject && <p className="text-xs text-gray-500">件名：{data.subject}</p>}
            <p className="mt-4 text-sm">下記の通りお見積り申し上げます。</p>
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-xl px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">お見積り金額（税込）</div>
              <div className="text-xl font-bold text-orange-600">{formatCurrency(total)}</div>
            </div>
          </div>
          <div className="w-[40%] text-right text-xs text-gray-600 space-y-0.5">
            <p className="text-sm font-semibold text-pink-600">{data.companyName || "（自社名）"}</p>
            {data.companyZip && <p>〒{data.companyZip}</p>}
            {data.companyAddress && <p>{data.companyAddress}</p>}
            {data.companyTel && <p>TEL: {data.companyTel}</p>}
            {data.companyEmail && <p>{data.companyEmail}</p>}
            {data.companyRegistrationNumber && (
              <p className="mt-1">登録番号: {data.companyRegistrationNumber}</p>
            )}
          </div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs">
              <th className="py-2 px-3 text-left font-medium w-8 rounded-tl-lg">#</th>
              <th className="py-2 px-3 text-left font-medium">品目</th>
              <th className="py-2 px-3 text-right font-medium w-16">数量</th>
              <th className="py-2 px-3 text-center font-medium w-12">単位</th>
              <th className="py-2 px-3 text-right font-medium w-24">単価</th>
              <th className="py-2 px-3 text-right font-medium w-24 rounded-tr-lg">金額</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                <td className="py-2 px-3 text-orange-400 border-b border-gray-100">{i + 1}</td>
                <td className="py-2 px-3 border-b border-gray-100">{item.name || "—"}</td>
                <td className="py-2 px-3 text-right border-b border-gray-100">{item.quantity}</td>
                <td className="py-2 px-3 text-center border-b border-gray-100">{item.unit}</td>
                <td className="py-2 px-3 text-right border-b border-gray-100">{formatCurrency(item.unitPrice)}</td>
                <td className="py-2 px-3 text-right border-b border-gray-100 font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-gray-500">小計</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-gray-500">消費税（{data.taxRate}%）</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between py-2 border-t-2 border-orange-400 mt-1 text-sm font-bold text-orange-600">
              <span>合計（税込）</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {data.notes && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">備考</p>
            <p className="text-xs text-gray-600 whitespace-pre-wrap">{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
