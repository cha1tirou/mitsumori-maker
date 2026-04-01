export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface InvoiceData {
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

  // 請求情報
  invoiceNumber: string;
  invoiceDate: string;
  paymentDueDate: string;
  subject: string;

  // 振込先
  bankName: string;
  branchName: string;
  accountType: "普通" | "当座";
  accountNumber: string;
  accountHolder: string;

  // 明細
  items: InvoiceItem[];

  // 備考
  notes: string;

  // 税率
  taxRate: number;
}

export const defaultInvoiceData: InvoiceData = {
  clientName: "",
  clientTitle: "御中",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  paymentDueDate: "",
  subject: "",
  bankName: "",
  branchName: "",
  accountType: "普通",
  accountNumber: "",
  accountHolder: "",
  items: [{ id: "1", name: "", quantity: 1, unit: "式", unitPrice: 0 }],
  notes: "",
  taxRate: 10,
};
