import { QuoteItem } from "@/types/quote";

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

export function calcSubtotal(items: QuoteItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calcTax(subtotal: number, taxRate: number): number {
  return Math.floor(subtotal * (taxRate / 100));
}

export function calcTotal(subtotal: number, tax: number): number {
  return subtotal + tax;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
