import { ConstructionItem, WorkType, workTypeLabels } from "@/types/construction";

type PresetItem = Omit<ConstructionItem, "id">;

export const workTypePresets: Record<WorkType, PresetItem[]> = {
  electrical: [
    { name: "配線工事（屋内）", quantity: 1, unit: "式", unitPrice: 80000, category: "labor" },
    { name: "分電盤設置", quantity: 1, unit: "面", unitPrice: 50000, category: "material" },
    { name: "コンセント増設", quantity: 1, unit: "箇所", unitPrice: 8000, category: "labor" },
    { name: "照明器具取付", quantity: 1, unit: "台", unitPrice: 5000, category: "labor" },
    { name: "電線・ケーブル材料費", quantity: 1, unit: "式", unitPrice: 30000, category: "material" },
  ],
  plumbing: [
    { name: "給水管設置", quantity: 1, unit: "式", unitPrice: 120000, category: "labor" },
    { name: "排水管設置", quantity: 1, unit: "式", unitPrice: 100000, category: "labor" },
    { name: "給湯器設置", quantity: 1, unit: "台", unitPrice: 80000, category: "material" },
    { name: "水栓金具取付", quantity: 1, unit: "箇所", unitPrice: 15000, category: "labor" },
    { name: "配管材料費", quantity: 1, unit: "式", unitPrice: 40000, category: "material" },
  ],
  interior: [
    { name: "クロス貼り替え", quantity: 1, unit: "㎡", unitPrice: 1200, category: "labor" },
    { name: "床フローリング施工", quantity: 1, unit: "㎡", unitPrice: 8000, category: "material" },
    { name: "天井施工", quantity: 1, unit: "㎡", unitPrice: 3500, category: "labor" },
    { name: "建具取付", quantity: 1, unit: "箇所", unitPrice: 25000, category: "labor" },
    { name: "養生費", quantity: 1, unit: "式", unitPrice: 20000, category: "other" },
  ],
  civil: [
    { name: "掘削工事", quantity: 1, unit: "㎥", unitPrice: 4500, category: "labor" },
    { name: "残土処分費", quantity: 1, unit: "㎥", unitPrice: 6000, category: "outsourcing" },
    { name: "砕石敷設", quantity: 1, unit: "㎥", unitPrice: 5500, category: "material" },
    { name: "コンクリート打設", quantity: 1, unit: "㎥", unitPrice: 18000, category: "material" },
    { name: "重機回送費", quantity: 1, unit: "式", unitPrice: 30000, category: "other" },
  ],
  exterior: [
    { name: "フェンス設置", quantity: 1, unit: "m", unitPrice: 12000, category: "material" },
    { name: "カーポート設置", quantity: 1, unit: "台分", unitPrice: 250000, category: "material" },
    { name: "駐車場土間コンクリート", quantity: 1, unit: "㎡", unitPrice: 8500, category: "labor" },
    { name: "植栽工事", quantity: 1, unit: "式", unitPrice: 80000, category: "labor" },
    { name: "既存構造物解体", quantity: 1, unit: "式", unitPrice: 50000, category: "labor" },
  ],
  carpentry: [
    { name: "木工事（造作）", quantity: 1, unit: "式", unitPrice: 200000, category: "labor" },
    { name: "構造材", quantity: 1, unit: "式", unitPrice: 150000, category: "material" },
    { name: "建具枠取付", quantity: 1, unit: "箇所", unitPrice: 18000, category: "labor" },
    { name: "階段施工", quantity: 1, unit: "式", unitPrice: 180000, category: "labor" },
    { name: "造作材料費", quantity: 1, unit: "式", unitPrice: 80000, category: "material" },
  ],
  plastering: [
    { name: "内壁左官仕上げ", quantity: 1, unit: "㎡", unitPrice: 4500, category: "labor" },
    { name: "モルタル下地", quantity: 1, unit: "㎡", unitPrice: 2800, category: "labor" },
    { name: "漆喰塗り", quantity: 1, unit: "㎡", unitPrice: 6500, category: "labor" },
    { name: "材料費（モルタル・石灰等）", quantity: 1, unit: "式", unitPrice: 40000, category: "material" },
    { name: "養生・清掃", quantity: 1, unit: "式", unitPrice: 15000, category: "other" },
  ],
  scaffolding: [
    { name: "足場架設（くさび式）", quantity: 1, unit: "㎡", unitPrice: 900, category: "labor" },
    { name: "足場解体", quantity: 1, unit: "㎡", unitPrice: 450, category: "labor" },
    { name: "メッシュシート養生", quantity: 1, unit: "㎡", unitPrice: 200, category: "material" },
    { name: "運搬費", quantity: 1, unit: "式", unitPrice: 30000, category: "other" },
    { name: "安全対策費", quantity: 1, unit: "式", unitPrice: 20000, category: "other" },
  ],
  other: [],
};

export function presetSectionName(workType: WorkType): string {
  return workTypeLabels[workType];
}
