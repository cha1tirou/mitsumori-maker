import { QuoteData } from "@/types/quote";
import { formatCurrency, calcSubtotal, calcTax, calcTotal, formatDate } from "./utils";

interface Props {
  data: QuoteData;
}

export default function PremiumTemplate({ data }: Props) {
  const subtotal = calcSubtotal(data.items);
  const tax = calcTax(subtotal, data.taxRate);
  const total = calcTotal(subtotal, tax);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] text-[11px] leading-relaxed text-gray-800 font-sans relative overflow-hidden">
      {/* 装飾ストライプ */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="p-[15mm] pt-[18mm]">
        {/* ヘッダー */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white text-lg font-bold">見</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">見積書</h1>
                <p className="text-[10px] text-gray-400 tracking-wider">QUOTATION</p>
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-0.5">
            {data.quoteNumber && (
              <p className="text-sm font-mono text-primary font-semibold">
                {data.quoteNumber}
              </p>
            )}
            <p>{formatDate(data.quoteDate)}</p>
            {data.expiryDate && (
              <p className="text-gray-400">有効期限: {formatDate(data.expiryDate)}</p>
            )}
          </div>
        </div>

        {/* 宛先 & 自社 */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] text-gray-400 font-medium mb-2">宛先</p>
            <p className="text-base font-semibold text-primary">
              {data.clientName || "（宛先）"}{" "}
              <span className="text-sm font-normal">{data.clientTitle}</span>
            </p>
            {data.subject && (
              <p className="text-xs text-gray-500 mt-2">
                件名：{data.subject}
              </p>
            )}
          </div>
          <div className="flex-1 text-right text-xs text-gray-500 space-y-0.5 pt-2">
            <p className="text-sm font-semibold text-primary mb-1">
              {data.companyName || "（自社名）"}
            </p>
            {data.companyZip && <p>〒{data.companyZip}</p>}
            {data.companyAddress && <p>{data.companyAddress}</p>}
            {data.companyTel && <p>TEL: {data.companyTel}</p>}
            {data.companyEmail && <p>{data.companyEmail}</p>}
            {data.companyRegistrationNumber && (
              <p>登録番号: {data.companyRegistrationNumber}</p>
            )}
          </div>
        </div>

        {/* 合計ボックス */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs">お見積り金額（税込）</p>
            <p className="text-white text-2xl font-bold mt-0.5">
              {formatCurrency(total)}
            </p>
          </div>
          <div className="text-white/50 text-xs text-right">
            <p>下記の通りお見積り</p>
            <p>申し上げます</p>
          </div>
        </div>

        {/* 明細テーブル */}
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-wider">
              <th className="py-2 px-3 text-left font-medium border-b-2 border-primary/20 w-8">
                #
              </th>
              <th className="py-2 px-3 text-left font-medium border-b-2 border-primary/20">
                品目
              </th>
              <th className="py-2 px-3 text-right font-medium border-b-2 border-primary/20 w-16">
                数量
              </th>
              <th className="py-2 px-3 text-center font-medium border-b-2 border-primary/20 w-12">
                単位
              </th>
              <th className="py-2 px-3 text-right font-medium border-b-2 border-primary/20 w-24">
                単価
              </th>
              <th className="py-2 px-3 text-right font-medium border-b-2 border-primary/20 w-24">
                金額
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50/50"
              >
                <td className="py-2.5 px-3 text-gray-300 text-xs">{i + 1}</td>
                <td className="py-2.5 px-3 font-medium">
                  {item.name || "—"}
                </td>
                <td className="py-2.5 px-3 text-right">{item.quantity}</td>
                <td className="py-2.5 px-3 text-center text-gray-400">
                  {item.unit}
                </td>
                <td className="py-2.5 px-3 text-right">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="py-2.5 px-3 text-right font-medium">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 小計・税・合計 */}
        <div className="flex justify-end mb-8">
          <div className="w-64 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between py-1 text-xs text-gray-500">
              <span>小計</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1 text-xs text-gray-500">
              <span>消費税（{data.taxRate}%）</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between py-2 mt-2 border-t border-primary/20 font-bold text-primary">
              <span>合計（税込）</span>
              <span className="text-base">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* 備考 */}
        {data.notes && (
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] text-gray-400 font-medium mb-1">備考</p>
            <p className="text-xs text-gray-600 whitespace-pre-wrap">
              {data.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
