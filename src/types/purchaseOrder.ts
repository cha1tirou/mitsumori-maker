export interface PurchaseOrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface PurchaseOrderData {
  // 発注先情報
  clientName: string;
  clientTitle: string;

  // 自社情報
  companyName: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyRegistrationNumber: string;

  // 発注情報
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  subject: string;

  // 明細
  items: PurchaseOrderItem[];

  // 備考
  notes: string;

  // 税率
  taxRate: number;
}

export const defaultPurchaseOrderData: PurchaseOrderData = {
  clientName: "",
  clientTitle: "御中",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  orderNumber: "",
  orderDate: new Date().toISOString().split("T")[0],
  deliveryDate: "",
  subject: "",
  items: [{ id: "1", name: "", quantity: 1, unit: "式", unitPrice: 0 }],
  notes: "",
  taxRate: 10,
};
