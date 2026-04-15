import {
  ConstructionItem,
  ConstructionQuoteData,
  ConstructionSection,
  ConstructionSubsection,
  CostCategory,
} from "@/types/construction";

export interface SectionTotals {
  sectionId: string;
  byCategory: Record<CostCategory, number>;
  subtotal: number;
  cost: number;
  profit: number;
  marginRate: number; // 粗利率 %
}

export interface ConstructionTotals {
  byCategory: Record<CostCategory, number>;
  sectionTotals: SectionTotals[];
  directCost: number;
  costSum: number;
  grossProfit: number;
  grossMarginRate: number;
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

export function itemCost(item: ConstructionItem): number {
  const costUnit = item.costUnitPrice ?? 0;
  return (item.quantity || 0) * costUnit;
}

export function itemProfit(item: ConstructionItem): number {
  return itemAmount(item) - itemCost(item);
}

export function itemMarginRate(item: ConstructionItem): number {
  const price = itemAmount(item);
  if (!price) return 0;
  return (itemProfit(item) / price) * 100;
}

function collectItems(section: ConstructionSection): ConstructionItem[] {
  const items: ConstructionItem[] = [...section.items];
  (section.subsections ?? []).forEach((sub) => {
    items.push(...sub.items);
  });
  return items;
}

export function calcSubsectionTotals(sub: ConstructionSubsection): {
  subtotal: number;
  cost: number;
} {
  let subtotal = 0;
  let cost = 0;
  sub.items.forEach((item) => {
    subtotal += itemAmount(item);
    cost += itemCost(item);
  });
  return { subtotal, cost };
}

export function calcSectionTotals(section: ConstructionSection): SectionTotals {
  const byCategory: Record<CostCategory, number> = {
    labor: 0,
    material: 0,
    outsourcing: 0,
    other: 0,
  };
  let subtotal = 0;
  let cost = 0;

  const items = collectItems(section);
  items.forEach((item) => {
    const amount = itemAmount(item);
    byCategory[item.category] += amount;
    subtotal += amount;
    cost += itemCost(item);
  });

  const profit = subtotal - cost;
  const marginRate = subtotal > 0 ? (profit / subtotal) * 100 : 0;

  return { sectionId: section.id, byCategory, subtotal, cost, profit, marginRate };
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
  let costSum = 0;
  sectionTotals.forEach((t) => {
    (Object.keys(t.byCategory) as CostCategory[]).forEach((c) => {
      byCategory[c] += t.byCategory[c];
    });
    costSum += t.cost;
  });

  const directCost = Object.values(byCategory).reduce((a, b) => a + b, 0);
  const grossProfit = directCost - costSum;
  const grossMarginRate = directCost > 0 ? (grossProfit / directCost) * 100 : 0;

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
    costSum,
    grossProfit,
    grossMarginRate,
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
