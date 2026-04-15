"use client";

import { useState } from "react";
import Link from "next/link";
import { ConstructionQuoteData } from "@/types/construction";
import { calcConstructionTotals } from "@/lib/constructionCalc";
import { FileText, Truck, ClipboardList, ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  data: ConstructionQuoteData;
}

/**
 * 建設業用の階層見積を、既存の汎用ツールで使えるフラット形式に変換する。
 * subsection の item も flatten して、section 名を prefix として付ける。
 */
function flattenItems(data: ConstructionQuoteData) {
  const items: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }[] = [];

  data.sections.forEach((section, sectionIndex) => {
    const sectionLabel = section.name || `セクション${sectionIndex + 1}`;
    section.items.forEach((item, i) => {
      if (!item.name && item.unitPrice === 0) return;
      items.push({
        id: `flat-${section.id}-${i}`,
        name: `[${sectionLabel}] ${item.name}`,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
      });
    });
    (section.subsections ?? []).forEach((sub) => {
      const subLabel = sub.name ? `${sectionLabel}/${sub.name}` : sectionLabel;
      sub.items.forEach((item, i) => {
        if (!item.name && item.unitPrice === 0) return;
        items.push({
          id: `flat-${sub.id}-${i}`,
          name: `[${subLabel}] ${item.name}`,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
        });
      });
    });
  });

  // 法定福利費を1行として追加
  const totals = calcConstructionTotals(data);
  if (totals.legalWelfare > 0) {
    items.push({
      id: "flat-legal-welfare",
      name: `法定福利費（労務費×${data.legalWelfareRate}%）`,
      quantity: 1,
      unit: "式",
      unitPrice: totals.legalWelfare,
    });
  }
  if (totals.siteManagementFee > 0) {
    items.push({
      id: "flat-site-mgmt",
      name: `現場管理費（${data.siteManagementFeeRate}%）`,
      quantity: 1,
      unit: "式",
      unitPrice: totals.siteManagementFee,
    });
  }
  if (totals.generalManagementFee > 0) {
    items.push({
      id: "flat-gen-mgmt",
      name: `一般管理費（${data.generalManagementFeeRate}%）`,
      quantity: 1,
      unit: "式",
      unitPrice: totals.generalManagementFee,
    });
  }

  return items;
}

function baseData(data: ConstructionQuoteData) {
  const items = flattenItems(data);
  return {
    clientName: data.clientName,
    clientTitle: data.clientTitle,
    companyName: data.companyName,
    companyZip: data.companyZip,
    companyAddress: data.companyAddress,
    companyTel: data.companyTel,
    companyEmail: data.companyEmail,
    companyRegistrationNumber: data.companyRegistrationNumber,
    subject: data.subject,
    items,
    notes: data.notes,
    taxRate: data.taxRate,
  };
}

export default function ConvertButtons({ data }: Props) {
  const [open, setOpen] = useState(false);

  const canConvert =
    data.sections.some((s) =>
      [
        ...s.items,
        ...(s.subsections?.flatMap((sub) => sub.items) ?? []),
      ].some((i) => i.name || i.unitPrice > 0)
    );

  const handleConvert = (
    target: "invoice" | "purchase-order" | "delivery"
  ) => {
    const payload = baseData(data);
    const storageKey =
      target === "invoice"
        ? "quote_to_invoice"
        : target === "purchase-order"
        ? "quote_to_purchase_order"
        : "quote_to_delivery";
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // ignore
    }
    trackEvent("construction_convert", { target });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={!canConvert}
        className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 text-blue-800 text-sm font-bold py-2.5 rounded-lg border border-blue-200 transition-colors"
      >
        他の書類に変換
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2.25}
        />
      </button>
      {open && (
        <div className="absolute z-30 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <Link
            href="/tools/invoice"
            onClick={() => handleConvert("invoice")}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50"
          >
            <FileText className="w-4 h-4 text-blue-700" strokeWidth={2.25} />
            請求書を作成
          </Link>
          <Link
            href="/tools/delivery"
            onClick={() => handleConvert("delivery")}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 border-t border-gray-100"
          >
            <Truck className="w-4 h-4 text-green-700" strokeWidth={2.25} />
            納品書を作成
          </Link>
          <Link
            href="/tools/purchase-order"
            onClick={() => handleConvert("purchase-order")}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 border-t border-gray-100"
          >
            <ClipboardList className="w-4 h-4 text-purple-700" strokeWidth={2.25} />
            発注書を作成
          </Link>
        </div>
      )}
    </div>
  );
}
