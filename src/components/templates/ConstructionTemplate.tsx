import { QuoteData } from "@/types/quote";
import { formatCurrency, calcSubtotal, calcTax, calcTotal, formatDate } from "./utils";

interface Props {
  data: QuoteData;
}

export default function ConstructionTemplate({ data }: Props) {
  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = calcTotal(subtotal, tax);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] text-[11px] leading-relaxed text-gray-800 font-sans">
      {/* ヘッダー */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-widest text-green-800">
          工事見積書
        </h1>
        <div className="w-20 h-1 bg-green-700 mx-auto mt-2" />
      </div>

      <div className="flex justify-between mb-6">
        <div className="w-[55%]">
          {/* 宛先 */}
          <div className="border-b-2 border-green-700 pb-1 mb-2">
            <span className="text-base font-semibold">
              {data.clientName || "（発注者）"}
            </span>
            <span className="text-sm ml-1">{data.clientTitle}</span>
          </div>

          {/* 工事情報 */}
          <div className="bg-green-50 border border-green-200 rounded p-3 mt-3 space-y-1">
            <div className="flex text-xs">
              <span className="text-green-700 font-semibold w-16">工事名</span>
              <span>{data.subject || "—"}</span>
            </div>
          </div>

          <p className="mt-4 text-sm">下記の通りお見積り申し上げます。</p>

          <div className="mt-3 bg-green-800 text-white rounded px-4 py-3">
            <div className="text-xs text-green-200 mb-1">お見積り金額（税込）</div>
            <div className="text-xl font-bold">{formatCurrency(total)}</div>
          </div>
        </div>

        <div className="w-[38%] text-right text-xs text-gray-600 space-y-0.5">
          <p className="text-sm font-semibold text-green-800">
            {data.companyName || "（施工者）"}
          </p>
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

      {/* 明細テーブル */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-green-800 text-white text-xs">
            <th className="py-2 px-3 text-left font-medium w-8">#</th>
            <th className="py-2 px-3 text-left font-medium">工事項目</th>
            <th className="py-2 px-3 text-right font-medium w-16">数量</th>
            <th className="py-2 px-3 text-center font-medium w-12">単位</th>
            <th className="py-2 px-3 text-right font-medium w-24">単価</th>
            <th className="py-2 px-3 text-right font-medium w-24">金額</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-green-50/50"}>
              <td className="py-2 px-3 text-gray-400 border-b border-gray-200">{i + 1}</td>
              <td className="py-2 px-3 border-b border-gray-200">{item.name || "—"}</td>
              <td className="py-2 px-3 text-right border-b border-gray-200">{item.quantity}</td>
              <td className="py-2 px-3 text-center border-b border-gray-200">{item.unit}</td>
              <td className="py-2 px-3 text-right border-b border-gray-200">{formatCurrency(item.unitPrice)}</td>
              <td className="py-2 px-3 text-right border-b border-gray-200 font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
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
          <div className="flex justify-between py-2 border-t-2 border-green-700 mt-1 text-sm font-bold text-green-800">
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
  );
}
