"use client";

import { useState } from "react";
import { FileSpreadsheet, ChevronDown, Check } from "lucide-react";
import { ConstructionQuoteData } from "@/types/construction";
import {
  AccountingFormat,
  accountingFormatLabels,
  generateAccountingCsv,
} from "@/lib/accounting/csv";
import { trackEvent } from "@/lib/analytics";

interface Props {
  data: ConstructionQuoteData;
  className?: string;
}

const formats: AccountingFormat[] = ["generic", "freee", "mf", "yayoi"];

export default function AccountingCsvButton({ data, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [recentDownload, setRecentDownload] = useState<AccountingFormat | null>(null);

  const download = (format: AccountingFormat) => {
    const { content, filename } = generateAccountingCsv(data, format);
    trackEvent("accounting_csv_download", { format });
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setRecentDownload(format);
    setTimeout(() => setRecentDownload(null), 2000);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-kenmitsu-navy hover:bg-kenmitsu-navy50 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        <FileSpreadsheet className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
        会計ソフトにCSV出力
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2.25}
        />
      </button>
      {open && (
        <div className="absolute z-30 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {formats.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => download(f)}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-kenmitsu-navy50 border-b border-gray-100 last:border-b-0 text-left"
            >
              {recentDownload === f ? (
                <Check className="w-4 h-4 text-kenmitsu-navy shrink-0" strokeWidth={2.5} />
              ) : (
                <FileSpreadsheet className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={2.25} />
              )}
              <span className="flex-1">{accountingFormatLabels[f]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
