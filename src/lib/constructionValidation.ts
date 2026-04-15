import { ConstructionQuoteData } from "@/types/construction";

export interface ValidationIssue {
  field: string;
  message: string;
  severity: "error" | "warning";
}

/**
 * 見積書の入力内容を検証する（UXレベル、建設業法チェッカーとは別の汎用検証）。
 */
export function validateQuote(data: ConstructionQuoteData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!data.clientName.trim()) {
    issues.push({ field: "clientName", message: "発注者名が入力されていません", severity: "warning" });
  }
  if (!data.companyName.trim()) {
    issues.push({ field: "companyName", message: "施工者（自社）情報が入力されていません", severity: "warning" });
  }

  const allItems = data.sections.flatMap((s) => [
    ...s.items,
    ...(s.subsections?.flatMap((sub) => sub.items) ?? []),
  ]);
  const hasPricedItem = allItems.some((i) => i.name.trim() && i.unitPrice > 0);
  if (!hasPricedItem) {
    issues.push({
      field: "items",
      message: "明細に品目名と単価が入力されていません",
      severity: "error",
    });
  }

  return issues;
}

export function hasBlockingIssues(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}

export function formatIssuesForConfirm(issues: ValidationIssue[]): string {
  return issues
    .map((i) => `${i.severity === "error" ? "【要修正】" : "【推奨】"} ${i.message}`)
    .join("\n");
}
