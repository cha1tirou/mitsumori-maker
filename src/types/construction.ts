export type WorkType =
  | "electrical"
  | "plumbing"
  | "interior"
  | "civil"
  | "exterior"
  | "carpentry"
  | "plastering"
  | "scaffolding"
  | "other";

export const workTypeLabels: Record<WorkType, string> = {
  electrical: "電気工事",
  plumbing: "水道・設備工事",
  interior: "内装工事",
  civil: "土木工事",
  exterior: "外構工事",
  carpentry: "大工工事",
  plastering: "左官工事",
  scaffolding: "鳶・足場工事",
  other: "その他",
};

export type CostCategory = "labor" | "material" | "outsourcing" | "other";

export const costCategoryLabels: Record<CostCategory, string> = {
  labor: "労務費",
  material: "材料費",
  outsourcing: "外注費",
  other: "その他経費",
};

export interface ConstructionItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  /** 原価単価（社内用・PDFには出力しない） */
  costUnitPrice?: number;
  category: CostCategory;
  /** 備考（明細行の補足） */
  note?: string;
}

export interface ConstructionSubsection {
  id: string;
  name: string;
  items: ConstructionItem[];
}

export interface ConstructionSection {
  id: string;
  name: string;
  items: ConstructionItem[];
  /** 中項目。section 直下の items と並列で表示される */
  subsections?: ConstructionSubsection[];
}

export interface SitePhoto {
  id: string;
  dataUrl: string;
  caption: string;
}

export interface ConstructionQuoteData {
  // 発注者
  clientName: string;
  clientTitle: string;
  clientContact: string;

  // 施工者
  companyName: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyContact: string;
  companyRegistrationNumber: string;
  constructionLicenseNumber: string;
  logoDataUrl: string;
  sealDataUrl: string;

  // 見積情報
  quoteNumber: string;
  quoteDate: string;
  validityDays: number;

  // 工事概要
  subject: string;
  workType: WorkType;
  siteAddress: string;
  constructionPeriod: string;
  designDocument: string;

  // 階層見積（工種ごとのセクション）
  sections: ConstructionSection[];

  // 法定福利費
  enableLegalWelfare: boolean;
  legalWelfareRate: number;

  // 諸経費
  enableOverhead: boolean;
  siteManagementFeeRate: number;
  generalManagementFeeRate: number;

  // 支払条件
  paymentTerms: string;

  // 瑕疵担保責任・アフターサービス
  warrantyPeriod: string;
  warrantyScope: string;

  // 追加工事の取扱い
  additionalWorkPolicy: string;

  // 工事写真
  sitePhotos?: SitePhoto[];

  // その他
  notes: string;
  taxRate: number;
}

export const defaultSiteManagementFeeRate = 6;
export const defaultGeneralManagementFeeRate = 10;
export const defaultLegalWelfareRate = 20;

export const defaultConstructionQuoteData: ConstructionQuoteData = {
  clientName: "",
  clientTitle: "御中",
  clientContact: "",
  companyName: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyContact: "",
  companyRegistrationNumber: "",
  constructionLicenseNumber: "",
  logoDataUrl: "",
  sealDataUrl: "",
  quoteNumber: "",
  quoteDate: new Date().toISOString().split("T")[0],
  validityDays: 30,
  subject: "",
  workType: "other",
  siteAddress: "",
  constructionPeriod: "",
  designDocument: "",
  sections: [
    {
      id: "section-1",
      name: "本体工事",
      items: [
        { id: "item-1", name: "", quantity: 1, unit: "式", unitPrice: 0, category: "labor" },
      ],
    },
  ],
  enableLegalWelfare: true,
  legalWelfareRate: defaultLegalWelfareRate,
  enableOverhead: true,
  siteManagementFeeRate: defaultSiteManagementFeeRate,
  generalManagementFeeRate: defaultGeneralManagementFeeRate,
  paymentTerms: "契約時30%、中間金40%、完成引渡時30%",
  warrantyPeriod: "引渡日より2年間",
  warrantyScope:
    "構造耐力上主要な部分および雨水の浸入を防止する部分は引渡日より10年間。\n設備機器は各メーカー保証に準じます。",
  additionalWorkPolicy:
    "記載のない工事・仕様変更が発生した場合は、別途お見積りの上、発注者の承認を得てから着手します。天候・現場状況の悪化による工期延長の場合も同様とします。",
  sitePhotos: [],
  notes: "",
  taxRate: 10,
};
