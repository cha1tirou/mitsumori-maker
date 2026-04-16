"use client";

import { useRef, useState } from "react";
import type * as XLSXType from "xlsx";
import { FileUp, Loader2, AlertCircle } from "lucide-react";
import {
  ConstructionItem,
  ConstructionQuoteData,
  ConstructionSection,
  CostCategory,
} from "@/types/construction";

interface Props {
  data: ConstructionQuoteData;
  onChange: (data: ConstructionQuoteData) => void;
}

function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const cleaned = v.replace(/[,¥円]/g, "");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

function inferCategory(s: string | undefined): CostCategory {
  const t = (s ?? "").toLowerCase();
  if (t.includes("労務") || t.includes("人件") || t.includes("工賃") || t.includes("人工"))
    return "labor";
  if (t.includes("材料") || t.includes("資材") || t.includes("機材") || t.includes("部材"))
    return "material";
  if (t.includes("外注") || t.includes("下請") || t.includes("委託"))
    return "outsourcing";
  return "other";
}

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Excel シートから明細行を推測して取り込む。
 * 列の自動検出：品名 / 数量 / 単位 / 単価 / 金額（or 備考）
 */
function parseSheet(
  XLSX: typeof XLSXType,
  sheet: XLSXType.WorkSheet
): ConstructionItem[] {
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });
  if (rows.length === 0) return [];

  // 列名候補
  const colMap: Record<string, string[]> = {
    name: ["品名", "品目", "項目", "工事項目", "名称", "内容", "仕様", "摘要"],
    quantity: ["数量", "数", "数量(数)", "数量（数）"],
    unit: ["単位"],
    unitPrice: ["単価", "単価(円)", "単価（円）"],
    category: ["費目", "区分", "種別", "カテゴリ"],
  };

  const firstRow = rows[0];
  const keys = Object.keys(firstRow);
  const pick = (candidates: string[]): string | undefined =>
    keys.find((k) => candidates.some((c) => String(k).includes(c)));

  const nameKey = pick(colMap.name);
  const qtyKey = pick(colMap.quantity);
  const unitKey = pick(colMap.unit);
  const priceKey = pick(colMap.unitPrice);
  const catKey = pick(colMap.category);

  if (!nameKey) return [];

  const items: ConstructionItem[] = [];
  rows.forEach((row) => {
    const name = String(row[nameKey] ?? "").trim();
    if (!name) return;
    const qty = qtyKey ? toNumber(row[qtyKey]) : 1;
    const unit = unitKey ? String(row[unitKey] ?? "式").trim() || "式" : "式";
    const price = priceKey ? toNumber(row[priceKey]) : 0;
    const category = catKey
      ? inferCategory(String(row[catKey] ?? ""))
      : inferCategory(name);
    items.push({
      id: newId("imp"),
      name,
      quantity: qty || 1,
      unit,
      unitPrice: price,
      category,
    });
  });
  return items;
}

export default function ExcelImportButton({ data, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleFile = async (file: File) => {
    setStatus("loading");
    setMessage("");
    try {
      // xlsx はバンドルが重いので動的import
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const allItems: { sheetName: string; items: ConstructionItem[] }[] = [];
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const items = parseSheet(XLSX, sheet);
        if (items.length > 0) {
          allItems.push({ sheetName, items });
        }
      }
      if (allItems.length === 0) {
        setStatus("error");
        setMessage(
          "明細を検出できませんでした。1行目に「品名」「数量」「単位」「単価」などのヘッダー列が必要です。"
        );
        return;
      }

      // シートごとにセクションを作成（既存セクションに追加）
      const newSections: ConstructionSection[] = allItems.map((b) => ({
        id: newId("section"),
        name: b.sheetName,
        items: b.items,
      }));

      const baseSections =
        data.sections.length === 1 &&
        data.sections[0].items.every((i) => !i.name && i.unitPrice === 0)
          ? []
          : data.sections;

      onChange({
        ...data,
        sections: [...baseSections, ...newSections],
      });
      setStatus("idle");
      const totalItems = allItems.reduce((sum, b) => sum + b.items.length, 0);
      alert(`${allItems.length} セクション / ${totalItems} 件の明細を取り込みました。`);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        "ファイルの読み込みに失敗しました。xlsx / xls / csv 形式でお試しください。"
      );
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-green-600 hover:bg-green-50 disabled:opacity-60 text-gray-700 hover:text-green-700 text-xs font-bold py-2.5 rounded-lg transition-colors"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
        ) : (
          <FileUp className="w-4 h-4" strokeWidth={2.25} />
        )}
        {status === "loading" ? "読み込み中..." : "Excel / CSV を取り込む"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {status === "error" && (
        <p className="text-[11px] text-red-700 mt-1.5 bg-red-50 border border-red-200 rounded px-2 py-1.5 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={2.25} />
          {message}
        </p>
      )}
    </div>
  );
}
