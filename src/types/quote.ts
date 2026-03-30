export interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface QuoteData {
  // 宛先情報
  clientName: string;
  clientTitle: string;

  // 自社情報
  companyName: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyRegistrationNumber: string;

  // 見積情報
  quoteNumber: string;
  quoteDate: string;
  expiryDate: string;
  subject: string;

  // 明細
  items: QuoteItem[];

  // 備考
  notes: string;

  // 税率
  taxRate: number;
}

export type TemplateName = "standard" | "minimal" | "premium";

export const defaultQuoteData: QuoteData = {
  clientName: "",
  clientTitle: "御中",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  quoteNumber: "",
  quoteDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
  subject: "",
  items: [
    { id: "1", name: "", quantity: 1, unit: "式", unitPrice: 0 },
  ],
  notes: "",
  taxRate: 10,
};
