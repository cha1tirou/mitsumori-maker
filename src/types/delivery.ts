export interface DeliveryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface DeliveryData {
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

  // 納品情報
  deliveryNumber: string;
  deliveryDate: string;
  deliveryDueDate: string;
  subject: string;

  // 明細
  items: DeliveryItem[];

  // 備考
  notes: string;

  // 税率
  taxRate: number;
}

export const defaultDeliveryData: DeliveryData = {
  clientName: "",
  clientTitle: "御中",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  deliveryNumber: "",
  deliveryDate: new Date().toISOString().split("T")[0],
  deliveryDueDate: new Date().toISOString().split("T")[0],
  subject: "",
  items: [{ id: "1", name: "", quantity: 1, unit: "式", unitPrice: 0 }],
  notes: "",
  taxRate: 10,
};
