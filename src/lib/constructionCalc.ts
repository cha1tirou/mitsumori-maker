import {
  ConstructionItem,
  ConstructionQuoteData,
  ConstructionSection,
  CostCategory,
} from "@/types/construction";

export interface SectionTotals {
  sectionId: string;
  byCategory: Record<CostCategory, number>;
  subtotal: number;
}

export interface ConstructionTotals {
  byCategory: Record<CostCategory, number>;
  sectionTotals: SectionTotals[];
  directCost: number;
  legalWelfare: number;
  siteManagementFee: number;
  generalManagementFee: number;
  overhead: number;
  constructionCost: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function itemAmount(item: ConstructionItem): number {
  return (item.quantity || 0) * (item.unitPrice || 0);
}

export function calcSectionTotals(section: ConstructionSection): SectionTotals {
  const byCategory: Record<CostCategory, number> = {
    labor: 0,
    material: 0,
    outsourcing: 0,
    other: 0,
  };
  section.items.forEach((item) => {
    byCategory[item.category] += itemAmount(item);
  });
  const subtotal = Object.values(byCategory).reduce((a, b) => a + b, 0);
  return { sectionId: section.id, byCategory, subtotal };
}

export function calcConstructionTotals(
  data: ConstructionQuoteData
): ConstructionTotals {
  const byCategory: Record<CostCategory, number> = {
    labor: 0,
    material: 0,
    outsourcing: 0,
    other: 0,
  };

  const sectionTotals = data.sections.map(calcSectionTotals);
  sectionTotals.forEach((t) => {
    (Object.keys(t.byCategory) as CostCategory[]).forEach((c) => {
      byCategory[c] += t.byCategory[c];
    });
  });

  const directCost = Object.values(byCategory).reduce((a, b) => a + b, 0);

  const legalWelfare = data.enableLegalWelfare
    ? Math.round((byCategory.labor * data.legalWelfareRate) / 100)
    : 0;

  const overheadBase = directCost + legalWelfare;
  const siteManagementFee = data.enableOverhead
    ? Math.round((overheadBase * data.siteManagementFeeRate) / 100)
    : 0;
  const constructionCost = overheadBase + siteManagementFee;
  const generalManagementFee = data.enableOverhead
    ? Math.round((constructionCost * data.generalManagementFeeRate) / 100)
    : 0;
  const overhead = siteManagementFee + generalManagementFee;

  const subtotal = directCost + legalWelfare + overhead;
  const tax = Math.round((subtotal * data.taxRate) / 100);
  const total = subtotal + tax;

  return {
    byCategory,
    sectionTotals,
    directCost,
    legalWelfare,
    siteManagementFee,
    generalManagementFee,
    overhead,
    constructionCost,
    subtotal,
    tax,
    total,
  };
}
