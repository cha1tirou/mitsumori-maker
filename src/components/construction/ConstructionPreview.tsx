"use client";

import { Fragment } from "react";
import {
  ConstructionQuoteData,
  CostCategory,
  costCategoryLabels,
} from "@/types/construction";
import { calcConstructionTotals, itemAmount } from "@/lib/constructionCalc";

interface Props {
  data: ConstructionQuoteData;
  watermark?: boolean;
}

const categoryBadge: Record<CostCategory, string> = {
  labor: "bg-amber-100 text-amber-800",
  material: "bg-blue-100 text-blue-800",
  outsourcing: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-700",
};

function formatCurrency(n: number): string {
  return `¥${Math.round(n).toLocaleString("ja-JP")}`;
}

function formatDate(isoDate: string): string {
  if (!isoDate) return "—";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "—";
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function calcExpiryDate(quoteDate: string, days: number): string {
  if (!quoteDate || !days) return "—";
  const d = new Date(quoteDate);
  if (isNaN(d.getTime())) return "—";
  d.setDate(d.getDate() + days);
  return formatDate(d.toISOString().split("T")[0]);
}

export default function ConstructionPreview({ data, watermark = true }: Props) {
  const totals = calcConstructionTotals(data);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white w-full p-[12mm] text-[11px] leading-relaxed text-gray-800 font-sans relative">
        {watermark && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <span
              className="text-green-800 opacity-[0.2] font-bold tracking-widest"
              style={{
                transform: "rotate(-30deg)",
                fontSize: "60px",
                letterSpacing: "0.5em",
              }}
            >
              無料版 SAMPLE
            </span>
          </div>
        )}
        {data.logoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.logoDataUrl}
            alt="ロゴ"
            className="absolute top-[10mm] left-[10mm] max-w-[40mm] max-h-[18mm] object-contain"
          />
        )}
        {/* ヘッダー */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold tracking-widest text-green-800">
            工事見積書
          </h1>
          <div className="w-20 h-1 bg-green-700 mx-auto mt-2" />
        </div>

        <div className="flex justify-between mb-5">
          <div className="w-[55%]">
            <div className="border-b-2 border-green-700 pb-1 mb-1">
              <span className="text-base font-semibold">
                {data.clientName || "（発注者）"}
              </span>
              <span className="text-sm ml-1">{data.clientTitle}</span>
            </div>
            {data.clientContact && (
              <p className="text-[10px] text-gray-600">{data.clientContact}</p>
            )}

            <div className="bg-green-50 border border-green-200 rounded p-2.5 mt-3 space-y-0.5 text-[10px]">
              <Row label="工事名" value={data.subject} />
              <Row label="工事場所" value={data.siteAddress} />
              <Row label="工事期間" value={data.constructionPeriod} />
              <Row label="設計図書" value={data.designDocument} />
              <Row label="支払条件" value={data.paymentTerms} />
            </div>

            <p className="mt-3 text-[11px]">下記の通りお見積り申し上げます。</p>

            <div className="mt-2 bg-green-800 text-white rounded px-4 py-2.5">
              <div className="text-[10px] text-green-200 mb-0.5">
                お見積り金額（税込）
              </div>
              <div className="text-xl font-bold">{formatCurrency(totals.total)}</div>
            </div>
          </div>

          <div className="w-[40%] text-right text-[10px] text-gray-600 space-y-0.5 relative">
            {data.sealDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.sealDataUrl}
                alt="印"
                className="absolute -left-2 top-0 w-[14mm] h-[14mm] object-contain opacity-90"
                style={{ mixBlendMode: "multiply" }}
              />
            )}
            <p className="text-sm font-semibold text-green-800">
              {data.companyName || "（施工者）"}
            </p>
            {data.companyContact && <p>担当: {data.companyContact}</p>}
            {data.companyZip && <p>〒{data.companyZip}</p>}
            {data.companyAddress && <p>{data.companyAddress}</p>}
            {data.companyTel && <p>TEL: {data.companyTel}</p>}
            {data.companyEmail && <p>{data.companyEmail}</p>}
            {data.constructionLicenseNumber && (
              <p className="mt-1 break-all text-[9px]">
                {data.constructionLicenseNumber}
              </p>
            )}
            {data.companyRegistrationNumber && (
              <p className="text-[9px]">
                登録番号: {data.companyRegistrationNumber}
              </p>
            )}
            <div className="mt-1.5 space-y-0.5">
              {data.quoteNumber && <p>見積番号: {data.quoteNumber}</p>}
              <p>見積日: {formatDate(data.quoteDate)}</p>
              <p>
                有効期限: {calcExpiryDate(data.quoteDate, data.validityDays)}
              </p>
            </div>
          </div>
        </div>

        {/* 階層明細 */}
        <div className="mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-800 text-white text-[9.5px]">
                <th className="py-1.5 px-1.5 text-left font-medium w-7">#</th>
                <th className="py-1.5 px-1.5 text-left font-medium w-14">費目</th>
                <th className="py-1.5 px-1.5 text-left font-medium">工事項目</th>
                <th className="py-1.5 px-1.5 text-right font-medium w-10">数量</th>
                <th className="py-1.5 px-1.5 text-center font-medium w-8">単位</th>
                <th className="py-1.5 px-1.5 text-right font-medium w-16">単価</th>
                <th className="py-1.5 px-1.5 text-right font-medium w-20">金額</th>
              </tr>
            </thead>
            <tbody>
              {data.sections.map((section, sectionIndex) => {
                const sectionTotal = totals.sectionTotals.find(
                  (t) => t.sectionId === section.id
                );
                return (
                  <Fragment key={section.id}>
                    <tr className="bg-green-100 text-green-900">
                      <td
                        colSpan={6}
                        className="py-1.5 px-2 font-bold text-[10.5px]"
                      >
                        ■ {sectionIndex + 1}. {section.name || "（無題セクション）"}
                      </td>
                      <td className="py-1.5 px-1.5 text-right font-bold text-[10.5px]">
                        {formatCurrency(sectionTotal?.subtotal ?? 0)}
                      </td>
                    </tr>
                    {section.items.map((item, itemIndex) => (
                      <tr
                        key={item.id}
                        className={itemIndex % 2 === 0 ? "bg-white" : "bg-green-50/40"}
                      >
                        <td className="py-1 px-1.5 text-gray-400 border-b border-gray-100 text-[9.5px]">
                          {sectionIndex + 1}-{itemIndex + 1}
                        </td>
                        <td className="py-1 px-1.5 border-b border-gray-100">
                          <span
                            className={`text-[8.5px] font-bold px-1 py-0.5 rounded ${categoryBadge[item.category]}`}
                          >
                            {costCategoryLabels[item.category]}
                          </span>
                        </td>
                        <td className="py-1 px-1.5 border-b border-gray-100 text-[10px]">
                          {item.name || "—"}
                        </td>
                        <td className="py-1 px-1.5 text-right border-b border-gray-100 text-[10px]">
                          {item.quantity}
                        </td>
                        <td className="py-1 px-1.5 text-center border-b border-gray-100 text-[10px]">
                          {item.unit}
                        </td>
                        <td className="py-1 px-1.5 text-right border-b border-gray-100 text-[10px]">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="py-1 px-1.5 text-right border-b border-gray-100 font-medium text-[10px]">
                          {formatCurrency(itemAmount(item))}
                        </td>
                      </tr>
                    ))}

                    {(section.subsections ?? []).map((sub, subIndex) => {
                      let subAmount = 0;
                      sub.items.forEach((i) => (subAmount += itemAmount(i)));
                      return (
                        <Fragment key={sub.id}>
                          <tr className="bg-green-50/80 text-green-900">
                            <td
                              colSpan={6}
                              className="py-1 px-4 text-[10px] font-bold"
                            >
                              ◇ {sectionIndex + 1}-{subIndex + 1} {sub.name || "（無題）"}
                            </td>
                            <td className="py-1 px-1.5 text-right text-[10px] font-bold">
                              {formatCurrency(subAmount)}
                            </td>
                          </tr>
                          {sub.items.map((item, itemIndex) => (
                            <tr
                              key={item.id}
                              className={itemIndex % 2 === 0 ? "bg-white" : "bg-green-50/30"}
                            >
                              <td className="py-1 pl-6 pr-1.5 text-gray-400 border-b border-gray-100 text-[9.5px]">
                                {sectionIndex + 1}-{subIndex + 1}-{itemIndex + 1}
                              </td>
                              <td className="py-1 px-1.5 border-b border-gray-100">
                                <span
                                  className={`text-[8.5px] font-bold px-1 py-0.5 rounded ${categoryBadge[item.category]}`}
                                >
                                  {costCategoryLabels[item.category]}
                                </span>
                              </td>
                              <td className="py-1 px-1.5 border-b border-gray-100 text-[10px]">
                                {item.name || "—"}
                              </td>
                              <td className="py-1 px-1.5 text-right border-b border-gray-100 text-[10px]">
                                {item.quantity}
                              </td>
                              <td className="py-1 px-1.5 text-center border-b border-gray-100 text-[10px]">
                                {item.unit}
                              </td>
                              <td className="py-1 px-1.5 text-right border-b border-gray-100 text-[10px]">
                                {formatCurrency(item.unitPrice)}
                              </td>
                              <td className="py-1 px-1.5 text-right border-b border-gray-100 font-medium text-[10px]">
                                {formatCurrency(itemAmount(item))}
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 集計 */}
        <div className="flex justify-end mb-4">
          <div className="w-72 text-[10.5px]">
            <div className="bg-gray-50 border border-gray-200 rounded p-2.5 mb-2">
              <p className="text-[9px] font-bold text-gray-600 mb-1.5 tracking-wide">
                費目内訳（直接工事費）
              </p>
              {(Object.keys(totals.byCategory) as CostCategory[]).map((cat) => {
                const amount = totals.byCategory[cat];
                if (amount === 0) return null;
                return (
                  <div
                    key={cat}
                    className="flex justify-between py-0.5 text-[10px]"
                  >
                    <span className="text-gray-600">
                      {costCategoryLabels[cat]}
                    </span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                );
              })}
              <div className="flex justify-between py-1 mt-1 border-t border-gray-200 font-bold text-gray-800">
                <span>直接工事費 計</span>
                <span>{formatCurrency(totals.directCost)}</span>
              </div>
            </div>

            {data.enableLegalWelfare && totals.legalWelfare > 0 && (
              <div className="flex justify-between py-1 text-green-900">
                <span>
                  法定福利費（労務費×{data.legalWelfareRate}%）
                </span>
                <span className="font-medium">
                  {formatCurrency(totals.legalWelfare)}
                </span>
              </div>
            )}
            {data.enableOverhead && totals.siteManagementFee > 0 && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">
                  現場管理費（{data.siteManagementFeeRate}%）
                </span>
                <span>{formatCurrency(totals.siteManagementFee)}</span>
              </div>
            )}
            {data.enableOverhead && totals.generalManagementFee > 0 && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">
                  一般管理費（{data.generalManagementFeeRate}%）
                </span>
                <span>{formatCurrency(totals.generalManagementFee)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-t border-gray-200 mt-1">
              <span className="text-gray-600">小計</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">消費税（{data.taxRate}%）</span>
              <span>{formatCurrency(totals.tax)}</span>
            </div>
            <div className="flex justify-between py-2 border-t-2 border-green-700 mt-1 text-sm font-bold text-green-800">
              <span>合計（税込）</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>
        </div>

        {/* 見積条件・保証・追加工事 */}
        {(data.warrantyPeriod || data.warrantyScope || data.additionalWorkPolicy) && (
          <div className="border border-gray-200 rounded p-3 mb-3 bg-gray-50/50 text-[10px] space-y-2">
            {(data.warrantyPeriod || data.warrantyScope) && (
              <div>
                <p className="font-bold text-gray-700 mb-0.5">
                  ◆ 瑕疵担保責任・アフターサービス
                </p>
                {data.warrantyPeriod && (
                  <p className="text-gray-700">
                    <span className="text-gray-500">保証期間: </span>
                    {data.warrantyPeriod}
                  </p>
                )}
                {data.warrantyScope && (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {data.warrantyScope}
                  </p>
                )}
              </div>
            )}
            {data.additionalWorkPolicy && (
              <div>
                <p className="font-bold text-gray-700 mb-0.5">
                  ◆ 追加工事・設計変更の取扱い
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {data.additionalWorkPolicy}
                </p>
              </div>
            )}
          </div>
        )}

        {data.notes && (
          <div className="border-t border-gray-200 pt-2">
            <p className="text-[9px] font-bold text-gray-500 mb-1">備考</p>
            <p className="text-[10px] text-gray-700 whitespace-pre-wrap">
              {data.notes}
            </p>
          </div>
        )}
      </div>

      {/* 工事写真シート（プレビュー上は見やすく別ページ風に表示） */}
      {(data.sitePhotos ?? []).length > 0 && (
        <div className="border-t-4 border-green-700 bg-white w-full p-[12mm] text-[11px] text-gray-800 font-sans">
          <div className="text-center mb-4">
            <h2 className="text-base font-bold text-green-800 tracking-wider">
              工事写真・現場状況
            </h2>
            <div className="w-16 h-0.5 bg-green-700 mx-auto mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(data.sitePhotos ?? []).map((photo, i) => (
              <div key={photo.id} className="border border-gray-200 rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.dataUrl}
                  alt={photo.caption || `工事写真${i + 1}`}
                  className="w-full h-40 object-cover"
                />
                <p className="text-[9px] text-gray-700 px-2 py-1 bg-gray-50 border-t border-gray-200">
                  図{i + 1}. {photo.caption || "（キャプション未設定）"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="text-green-700 font-semibold w-14 shrink-0">{label}</span>
      <span className="flex-1 break-all">{value || "—"}</span>
    </div>
  );
}
