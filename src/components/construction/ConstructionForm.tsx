"use client";

import {
  ConstructionQuoteData,
  ConstructionItem,
  ConstructionSection,
  ConstructionSubsection,
  SitePhoto,
  WorkType,
  CostCategory,
  workTypeLabels,
  costCategoryLabels,
} from "@/types/construction";
import { workTypePresets, presetSectionName } from "@/lib/constructionPresets";
import {
  HardHat,
  Plus,
  Trash2,
  Wand2,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileWarning,
  Save,
  Upload,
  X,
  Sparkles,
  Star,
  Users,
  TrendingUp,
  Camera,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  useConstructionCompanyInfo,
  hasSavedConstructionCompanyInfo,
} from "@/hooks/useConstructionCompanyInfo";
import { PriceMasterItem } from "@/hooks/usePriceMaster";
import { CustomerMasterItem } from "@/hooks/useCustomerMaster";
import { itemAmount, itemCost, itemProfit, itemMarginRate } from "@/lib/constructionCalc";
import PriceMasterPicker from "./PriceMasterPicker";
import CustomerPicker from "./CustomerPicker";
import ExcelImportButton from "./ExcelImportButton";
import { useSoloFeatureLock, SoloLockBadge } from "./SoloFeatureLock";
import {
  detectItujiInconsistencies,
  type ItujiTargetField,
} from "@/lib/itujiMap";

interface Props {
  data: ConstructionQuoteData;
  onChange: (data: ConstructionQuoteData) => void;
  plan?: "free" | "solo" | "team";
}

const WORK_TYPE_DESCRIPTIONS: Record<string, string> = {
  electrical: "配線・コンセント・照明・分電盤",
  plumbing: "給排水管・給湯器・水栓金具",
  interior: "クロス・床・天井・建具",
  civil: "掘削・コンクリート・砕石",
  exterior: "フェンス・カーポート・駐車場",
  carpentry: "木工造作・構造材・階段",
  plastering: "左官仕上げ・モルタル・漆喰",
  scaffolding: "足場架設・解体・養生シート",
};

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-gray-300 focus:border-kenmitsu-navy focus:outline-none focus:ring-1 focus:ring-kenmitsu-navy/20";

/**
 * 数量・単価・料率などの数値入力を非負・有限数に強制する。
 * 「-」やゼロ先頭文字・非数値は 0 にフォールバック。
 * QAバグ #7 対応。
 */
function clampNonNegative(raw: string): number {
  const n = Number(raw);
  if (!isFinite(n) || n < 0) return 0;
  return n;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span className="w-1 h-4 bg-kenmitsu-navy rounded-full" />
      {children}
    </h3>
  );
}

function Field({
  label,
  help,
  children,
  className = "",
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-gray-500 mb-1 block">{label}</span>
      {children}
      {help && (
        <span className="text-[10px] text-gray-400 mt-1 block leading-relaxed">
          {help}
        </span>
      )}
    </label>
  );
}

/**
 * 異体字混在の注意書き (#24)。blocking しない soft warning で、
 * 意図的な使い分けのケースがあり得るので dismissible にしている。
 */
function ItujiWarningRow({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <span className="mt-1 flex items-start gap-1.5 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1 leading-relaxed">
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="text-amber-600 hover:text-amber-900 shrink-0"
        aria-label="この警告を閉じる"
      >
        <X className="w-3 h-3" strokeWidth={2.5} />
      </button>
    </span>
  );
}

function ItemRow({
  index,
  item,
  showCost,
  canRemove,
  onChange,
  onRemove,
  onOpenPriceMaster,
}: {
  index: number;
  item: ConstructionItem;
  showCost: boolean;
  canRemove: boolean;
  onChange: (field: keyof ConstructionItem, value: string | number) => void;
  onRemove: () => void;
  onOpenPriceMaster: () => void;
}) {
  const amount = itemAmount(item);
  const cost = itemCost(item);
  const profit = itemProfit(item);
  const margin = itemMarginRate(item);
  const marginColor =
    margin < 0
      ? "text-red-700 bg-red-50 border-red-200"
      : margin < 15
      ? "text-amber-800 bg-amber-50 border-amber-200"
      : "text-kenmitsu-navy bg-kenmitsu-navy50 border-kenmitsu-navy100";

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/40 p-2.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-gray-400">
            #{index + 1}
          </span>
          <select
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${categoryColors[item.category]}`}
            value={item.category}
            onChange={(e) => onChange("category", e.target.value)}
          >
            {(Object.keys(costCategoryLabels) as CostCategory[]).map((c) => (
              <option key={c} value={c}>
                {costCategoryLabels[c]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPriceMaster}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded px-1.5 py-0.5"
            title="単価マスタから選択"
          >
            <Star className="w-3 h-3" strokeWidth={2.5} />
            マスタ
          </button>
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-gray-400 hover:text-red-600 p-0.5"
              aria-label="削除"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
      <input
        type="text"
        className={inputClass + " mb-2"}
        placeholder="品目・工事項目名"
        value={item.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          className={inputClass + " text-xs"}
          placeholder="数量"
          min="0"
          step="any"
          inputMode="decimal"
          value={item.quantity}
          onChange={(e) => onChange("quantity", clampNonNegative(e.target.value))}
        />
        <input
          type="text"
          className={inputClass + " text-xs"}
          placeholder="単位"
          value={item.unit}
          onChange={(e) => onChange("unit", e.target.value)}
        />
        <input
          type="number"
          className={inputClass + " text-xs"}
          placeholder="単価"
          min="0"
          step="1"
          inputMode="numeric"
          value={item.unitPrice}
          onChange={(e) => onChange("unitPrice", clampNonNegative(e.target.value))}
        />
      </div>

      {showCost && (
        <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 shrink-0">原価単価</span>
            <input
              type="number"
              className={inputClass + " text-xs flex-1"}
              placeholder="原価（社内用）"
              min="0"
              step="1"
              inputMode="numeric"
              value={item.costUnitPrice ?? 0}
              onChange={(e) =>
                onChange("costUnitPrice", clampNonNegative(e.target.value))
              }
            />
          </div>
          {(amount > 0 || cost > 0) && (
            <div className="mt-1.5 flex items-center justify-between text-[10.5px]">
              <span className="text-gray-500">
                売上 ¥{amount.toLocaleString("ja-JP")} / 原価 ¥
                {cost.toLocaleString("ja-JP")}
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded border ${marginColor}`}
              >
                粗利 ¥{profit.toLocaleString("ja-JP")} ({margin.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const categoryColors: Record<CostCategory, string> = {
  labor: "bg-amber-50 text-amber-800 border-amber-200",
  material: "bg-blue-50 text-blue-800 border-blue-200",
  outsourcing: "bg-purple-50 text-purple-800 border-purple-200",
  other: "bg-gray-50 text-gray-700 border-gray-200",
};

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const LAST_NUMBER_KEY = "mitsumori-construction-last-quote-number";

function suggestNextQuoteNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const prefix = `K-${year}-`;
  try {
    const last = localStorage.getItem(LAST_NUMBER_KEY);
    if (last && last.startsWith(prefix)) {
      const num = parseInt(last.slice(prefix.length), 10);
      if (!isNaN(num)) {
        return prefix + String(num + 1).padStart(3, "0");
      }
    }
  } catch {
    // ignore
  }
  return prefix + "001";
}

function rememberQuoteNumber(n: string): void {
  try {
    localStorage.setItem(LAST_NUMBER_KEY, n);
  } catch {
    // ignore
  }
}

const ALLOWED_IMAGE_MIME = /^image\/(png|jpe?g|gif|webp)$/i;

async function fileToDataUrl(file: File): Promise<string> {
  // MIME タイプ検証
  if (!ALLOWED_IMAGE_MIME.test(file.type)) {
    throw new Error(
      `画像形式が対応していません（${file.type || "不明"}）。PNG / JPEG / GIF / WebP のみ対応。`
    );
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      // data URL の先頭バリデーション（念のため）
      if (!/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(result)) {
        reject(new Error("画像データが不正です。"));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => reject(new Error("ファイルの読み込みに失敗しました。"));
    reader.readAsDataURL(file);
  });
}

export default function ConstructionForm({ data, onChange, plan = "free" }: Props) {
  // Solo 以上の機能は Free/未ログインでもボタンは表示して、クリック時にアップグレード誘導
  const isPaid = plan === "solo" || plan === "team";
  const lock = useSoloFeatureLock();

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const { save: saveCompany, isSaved: isCompanySaved } =
    useConstructionCompanyInfo(data, onChange);
  const [companySaveStatus, setCompanySaveStatus] = useState<"idle" | "saved">(
    "idle"
  );
  const [hasSavedCompany, setHasSavedCompany] = useState(false);
  const [showCost, setShowCost] = useState(false);
  // プラン変更時や永続化された showCost の残存に備えて、実効的な表示フラグは isPaid と AND 。
  const effectiveShowCost = showCost && isPaid;
  const [priceMasterTarget, setPriceMasterTarget] = useState<
    | {
        kind: "section";
        sectionIndex: number;
        itemIndex: number;
      }
    | {
        kind: "subsection";
        sectionIndex: number;
        subIndex: number;
        itemIndex: number;
      }
    | null
  >(null);
  const [customerPickerOpen, setCustomerPickerOpen] = useState(false);
  // 異体字不整合 warning の dismiss 状態（フィールド名+variantChar をキーに保持）
  const [itujiDismissed, setItujiDismissed] = useState<Set<string>>(new Set());
  const itujiWarnings = detectItujiInconsistencies({
    clientName: data.clientName,
    siteAddress: data.siteAddress,
    subject: data.subject,
  }).filter(
    (w) => !itujiDismissed.has(`${w.field}:${w.variantChar}:${w.standardChar}`),
  );
  const warningsByField = itujiWarnings.reduce<
    Partial<Record<ItujiTargetField, typeof itujiWarnings>>
  >((acc, w) => {
    const list = acc[w.field] ?? [];
    list.push(w);
    acc[w.field] = list;
    return acc;
  }, {});
  const dismissItuji = (field: string, v: string, s: string) =>
    setItujiDismissed((prev) => {
      const next = new Set(prev);
      next.add(`${field}:${v}:${s}`);
      return next;
    });

  useEffect(() => {
    setHasSavedCompany(hasSavedConstructionCompanyInfo());
  }, []);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof ConstructionQuoteData>(
    key: K,
    value: ConstructionQuoteData[K]
  ) => {
    onChange({ ...data, [key]: value });
  };

  const updateSection = (
    sectionIndex: number,
    field: keyof ConstructionSection,
    value: ConstructionSection[keyof ConstructionSection]
  ) => {
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
    onChange({ ...data, sections: newSections });
  };

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof ConstructionItem,
    value: string | number
  ) => {
    const newSections = [...data.sections];
    const items = [...newSections[sectionIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    newSections[sectionIndex] = { ...newSections[sectionIndex], items };
    onChange({ ...data, sections: newSections });
  };

  const addSection = (name = "新規セクション") => {
    const newSection: ConstructionSection = {
      id: newId("section"),
      name,
      items: [
        { id: newId("item"), name: "", quantity: 1, unit: "式", unitPrice: 0, category: "labor" },
      ],
    };
    onChange({ ...data, sections: [...data.sections, newSection] });
  };

  const removeSection = (sectionIndex: number) => {
    if (data.sections.length <= 1) return;
    onChange({
      ...data,
      sections: data.sections.filter((_, i) => i !== sectionIndex),
    });
  };

  const addItem = (sectionIndex: number) => {
    const newSections = [...data.sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: [
        ...newSections[sectionIndex].items,
        { id: newId("item"), name: "", quantity: 1, unit: "式", unitPrice: 0, category: "labor" },
      ],
    };
    onChange({ ...data, sections: newSections });
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const section = data.sections[sectionIndex];
    if (section.items.length <= 1) return;
    const newSections = [...data.sections];
    newSections[sectionIndex] = {
      ...section,
      items: section.items.filter((_, i) => i !== itemIndex),
    };
    onChange({ ...data, sections: newSections });
  };

  // ========== サブセクション操作 ==========
  const addSubsection = (sectionIndex: number) => {
    const section = data.sections[sectionIndex];
    const sub: ConstructionSubsection = {
      id: newId("sub"),
      name: "新規中項目",
      items: [
        { id: newId("item"), name: "", quantity: 1, unit: "式", unitPrice: 0, category: "labor" },
      ],
    };
    const newSections = [...data.sections];
    newSections[sectionIndex] = {
      ...section,
      subsections: [...(section.subsections ?? []), sub],
    };
    onChange({ ...data, sections: newSections });
  };

  const updateSubsection = (
    sectionIndex: number,
    subIndex: number,
    field: keyof ConstructionSubsection,
    value: ConstructionSubsection[keyof ConstructionSubsection]
  ) => {
    const section = data.sections[sectionIndex];
    const subs = [...(section.subsections ?? [])];
    subs[subIndex] = { ...subs[subIndex], [field]: value };
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...section, subsections: subs };
    onChange({ ...data, sections: newSections });
  };

  const removeSubsection = (sectionIndex: number, subIndex: number) => {
    const section = data.sections[sectionIndex];
    const subs = (section.subsections ?? []).filter((_, i) => i !== subIndex);
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...section, subsections: subs };
    onChange({ ...data, sections: newSections });
  };

  const updateSubItem = (
    sectionIndex: number,
    subIndex: number,
    itemIndex: number,
    field: keyof ConstructionItem,
    value: string | number
  ) => {
    const section = data.sections[sectionIndex];
    const subs = [...(section.subsections ?? [])];
    const items = [...subs[subIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    subs[subIndex] = { ...subs[subIndex], items };
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...section, subsections: subs };
    onChange({ ...data, sections: newSections });
  };

  const addSubItem = (sectionIndex: number, subIndex: number) => {
    const section = data.sections[sectionIndex];
    const subs = [...(section.subsections ?? [])];
    subs[subIndex] = {
      ...subs[subIndex],
      items: [
        ...subs[subIndex].items,
        { id: newId("item"), name: "", quantity: 1, unit: "式", unitPrice: 0, category: "labor" },
      ],
    };
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...section, subsections: subs };
    onChange({ ...data, sections: newSections });
  };

  const removeSubItem = (sectionIndex: number, subIndex: number, itemIndex: number) => {
    const section = data.sections[sectionIndex];
    const subs = [...(section.subsections ?? [])];
    if (subs[subIndex].items.length <= 1) return;
    subs[subIndex] = {
      ...subs[subIndex],
      items: subs[subIndex].items.filter((_, i) => i !== itemIndex),
    };
    const newSections = [...data.sections];
    newSections[sectionIndex] = { ...section, subsections: subs };
    onChange({ ...data, sections: newSections });
  };

  // ========== 単価マスタ選択 ==========
  const applyPriceMaster = (pm: PriceMasterItem) => {
    if (!priceMasterTarget) return;
    const patch: Partial<ConstructionItem> = {
      name: pm.name,
      unit: pm.unit,
      unitPrice: pm.unitPrice,
      costUnitPrice: pm.costUnitPrice,
      category: pm.category,
    };
    if (priceMasterTarget.kind === "section") {
      const { sectionIndex, itemIndex } = priceMasterTarget;
      const newSections = [...data.sections];
      const items = [...newSections[sectionIndex].items];
      items[itemIndex] = { ...items[itemIndex], ...patch };
      newSections[sectionIndex] = { ...newSections[sectionIndex], items };
      onChange({ ...data, sections: newSections });
    } else {
      const { sectionIndex, subIndex, itemIndex } = priceMasterTarget;
      const section = data.sections[sectionIndex];
      const subs = [...(section.subsections ?? [])];
      const items = [...subs[subIndex].items];
      items[itemIndex] = { ...items[itemIndex], ...patch };
      subs[subIndex] = { ...subs[subIndex], items };
      const newSections = [...data.sections];
      newSections[sectionIndex] = { ...section, subsections: subs };
      onChange({ ...data, sections: newSections });
    }
  };

  const currentPriceMasterDraft = (() => {
    if (!priceMasterTarget) return undefined;
    let item: ConstructionItem | undefined;
    if (priceMasterTarget.kind === "section") {
      item =
        data.sections[priceMasterTarget.sectionIndex]?.items[
          priceMasterTarget.itemIndex
        ];
    } else {
      item =
        data.sections[priceMasterTarget.sectionIndex]?.subsections?.[
          priceMasterTarget.subIndex
        ]?.items[priceMasterTarget.itemIndex];
    }
    if (!item) return undefined;
    return {
      name: item.name,
      unit: item.unit,
      unitPrice: item.unitPrice,
      costUnitPrice: item.costUnitPrice,
      category: item.category,
    };
  })();

  const applyCustomer = (c: CustomerMasterItem) => {
    onChange({
      ...data,
      clientName: c.name,
      clientTitle: c.title,
      clientContact: c.contact,
    });
  };

  // ========== 工事写真 ==========
  const addSitePhoto = async (file: File) => {
    if (file.size > 1024 * 1024) {
      alert("写真は 1MB 以下にしてください。");
      return;
    }
    let dataUrl: string;
    try {
      dataUrl = await fileToDataUrl(file);
    } catch (err) {
      alert(err instanceof Error ? err.message : "画像を読み込めませんでした。");
      return;
    }
    const photo: SitePhoto = {
      id: newId("photo"),
      dataUrl,
      caption: "",
    };
    onChange({ ...data, sitePhotos: [...(data.sitePhotos ?? []), photo] });
  };

  const updatePhotoCaption = (id: string, caption: string) => {
    const photos = (data.sitePhotos ?? []).map((p) =>
      p.id === id ? { ...p, caption } : p
    );
    onChange({ ...data, sitePhotos: photos });
  };

  const removePhoto = (id: string) => {
    const photos = (data.sitePhotos ?? []).filter((p) => p.id !== id);
    onChange({ ...data, sitePhotos: photos });
  };

  const applyPreset = (workType: WorkType) => {
    const preset = workTypePresets[workType];
    if (!preset || preset.length === 0) {
      update("workType", workType);
      return;
    }
    const newSection: ConstructionSection = {
      id: newId("section"),
      name: presetSectionName(workType),
      items: preset.map((p) => ({ ...p, id: newId("item") })),
    };

    // 空の初期セクションがあれば置き換え、なければ追加
    const isEmpty = (s: ConstructionSection) =>
      s.items.length === 1 &&
      !s.items[0].name &&
      s.items[0].unitPrice === 0;
    const onlyEmptyInitial =
      data.sections.length === 1 && isEmpty(data.sections[0]);

    const newSections = onlyEmptyInitial
      ? [newSection]
      : [...data.sections, newSection];
    onChange({ ...data, workType, sections: newSections });
  };

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-5">
      {/* 工種プリセット */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>工種プリセット</SectionTitle>
        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
          工種を選ぶと代表的な明細5項目が自動で入ります。複数工種を追加して1つの見積書にまとめることもできます。
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {(Object.keys(workTypeLabels) as WorkType[]).map((type) => {
            const desc = WORK_TYPE_DESCRIPTIONS[type as keyof typeof WORK_TYPE_DESCRIPTIONS];
            return (
              <button
                key={type}
                type="button"
                onClick={() => update("workType", type)}
                className={`text-left py-2.5 px-3 rounded-lg border transition-colors ${
                  data.workType === type
                    ? "bg-kenmitsu-navy text-white border-kenmitsu-navy"
                    : "bg-white text-gray-700 border-gray-200 hover:border-kenmitsu-navy"
                }`}
              >
                <span className="text-xs font-bold block">{workTypeLabels[type]}</span>
                {desc && (
                  <span className={`text-[10px] block mt-0.5 leading-snug ${
                    data.workType === type ? "text-kenmitsu-navy100" : "text-gray-400"
                  }`}>
                    {desc}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 選択中のプリセット内容プレビュー */}
        {data.workType !== "other" && workTypePresets[data.workType].length > 0 && (
          <>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-500 mb-2">
                「{workTypeLabels[data.workType]}」に含まれる項目:
              </p>
              <ul className="space-y-1">
                {workTypePresets[data.workType].map((item, i) => (
                  <li key={i} className="text-[11px] text-gray-600 flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-400">
                      {costCategoryLabels[item.category]} / {item.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => applyPreset(data.workType)}
              className="w-full flex items-center justify-center gap-2 bg-kenmitsu-navy50 hover:bg-kenmitsu-navy100 text-kenmitsu-navy text-xs font-bold py-2.5 rounded-lg border border-kenmitsu-navy100 transition-colors"
            >
              <Wand2 className="w-4 h-4" strokeWidth={2.25} />
              「{workTypeLabels[data.workType]}」をセクションとして追加
            </button>
          </>
        )}
      </section>

      {/* 見積情報 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>見積情報</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="見積番号" help="自社の管理番号。「自動」ボタンで前回+1の連番を振れます">
            <div className="flex gap-1.5">
              <input
                type="text"
                className={inputClass}
                placeholder="K-2026-001"
                value={data.quoteNumber}
                onChange={(e) => {
                  update("quoteNumber", e.target.value);
                  if (e.target.value) rememberQuoteNumber(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const next = suggestNextQuoteNumber();
                  update("quoteNumber", next);
                  rememberQuoteNumber(next);
                }}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-kenmitsu-navy hover:bg-kenmitsu-navy50 border border-kenmitsu-navy100 px-2 rounded-lg shrink-0"
                title="自動採番（前回の番号＋1）"
              >
                <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                自動
              </button>
            </div>
          </Field>
          <Field label="工事名">
            <input
              type="text"
              className={inputClass}
              placeholder="◯◯邸 内装リフォーム工事"
              value={data.subject}
              onChange={(e) => update("subject", e.target.value)}
            />
            {warningsByField.subject?.map((w) => (
              <ItujiWarningRow
                key={`${w.variantChar}-${w.standardChar}`}
                message={w.message}
                onDismiss={() =>
                  dismissItuji(w.field, w.variantChar, w.standardChar)
                }
              />
            ))}
          </Field>
          <Field label="見積日">
            <input
              type="date"
              className={inputClass}
              value={data.quoteDate}
              onChange={(e) => update("quoteDate", e.target.value)}
            />
          </Field>
          <Field label="有効期限（日数）" help="見積日から何日間有効か。一般的に14〜30日。建設業法では十分な検討期間の確保が求められます">
            <input
              type="number"
              className={inputClass}
              min="1"
              step="1"
              inputMode="numeric"
              value={data.validityDays}
              onChange={(e) =>
                update(
                  "validityDays",
                  Math.max(1, Math.floor(clampNonNegative(e.target.value))),
                )
              }
            />
          </Field>
          <Field label="工事場所" className="col-span-2">
            <input
              type="text"
              className={inputClass}
              placeholder="東京都◯◯区◯◯町1-2-3"
              value={data.siteAddress}
              onChange={(e) => update("siteAddress", e.target.value)}
            />
            {warningsByField.siteAddress?.map((w) => (
              <ItujiWarningRow
                key={`${w.variantChar}-${w.standardChar}`}
                message={w.message}
                onDismiss={() =>
                  dismissItuji(w.field, w.variantChar, w.standardChar)
                }
              />
            ))}
          </Field>
          <Field label="工事期間" className="col-span-2" help="日付指定・日数指定どちらでもOK。入力した内容がそのままPDFに印刷されます">
            <input
              type="text"
              className={inputClass}
              placeholder="着工後 約14日間 / 2026年5月1日〜5月15日"
              value={data.constructionPeriod}
              onChange={(e) => update("constructionPeriod", e.target.value)}
            />
          </Field>
          <Field label="設計図書・仕様" className="col-span-2" help="参照した図面や仕様書の名称。改正建設業法で記載が推奨されています">
            <input
              type="text"
              className={inputClass}
              placeholder="別添図面一式（A-01〜A-08）/ 仕様書2026年4月版"
              value={data.designDocument}
              onChange={(e) => update("designDocument", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 発注者 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>発注者</SectionTitle>
          <button
            type="button"
            onClick={() =>
              isPaid ? setCustomerPickerOpen(true) : lock.open("取引先マスタ")
            }
            className="text-[10px] font-bold px-2 py-1 rounded-md transition-colors flex items-center gap-1 bg-kenmitsu-navy50 text-kenmitsu-navy border border-kenmitsu-navy100 hover:bg-kenmitsu-navy100"
          >
            <Users className="w-3 h-3" strokeWidth={2.5} />
            取引先マスタ
            {!isPaid && <SoloLockBadge className="ml-0.5" />}
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_80px] gap-3">
            <Field label="発注者名">
              <input
                type="text"
                className={inputClass}
                placeholder="◯◯建設株式会社"
                value={data.clientName}
                onChange={(e) => update("clientName", e.target.value)}
              />
            </Field>
            <Field label="敬称">
              <select
                className={inputClass}
                value={data.clientTitle}
                onChange={(e) => update("clientTitle", e.target.value)}
              >
                <option value="御中">御中</option>
                <option value="様">様</option>
              </select>
            </Field>
          </div>
          <Field label="担当者">
            <input
              type="text"
              className={inputClass}
              placeholder="工事部 山田太郎 様"
              value={data.clientContact}
              onChange={(e) => update("clientContact", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 施工者 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>施工者情報</SectionTitle>
          <button
            type="button"
            onClick={() => {
              saveCompany();
              setCompanySaveStatus("saved");
              setHasSavedCompany(true);
              setTimeout(() => setCompanySaveStatus("idle"), 2000);
            }}
            className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
              companySaveStatus === "saved"
                ? "bg-kenmitsu-navy100 text-kenmitsu-navy border border-kenmitsu-navy"
                : isCompanySaved()
                ? "bg-gray-50 text-gray-400 border border-gray-200"
                : "bg-kenmitsu-navy50 text-kenmitsu-navy border border-kenmitsu-navy100 hover:bg-kenmitsu-navy100"
            }`}
          >
            <Save className="w-3 h-3" strokeWidth={2.5} />
            {companySaveStatus === "saved" || isCompanySaved()
              ? "保存済"
              : "自社情報を保存"}
          </button>
        </div>
        {hasSavedCompany && !data.companyName && (
          <p className="text-[11px] text-kenmitsu-navy mb-3 bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-md px-2 py-1.5">
            保存済みの自社情報が自動で入力されます
          </p>
        )}
        <div className="space-y-3">
          <Field label="会社名・屋号">
            <input
              type="text"
              className={inputClass}
              placeholder="◯◯工務店"
              value={data.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </Field>
          <Field label="担当者">
            <input
              type="text"
              className={inputClass}
              placeholder="鈴木一郎"
              value={data.companyContact}
              onChange={(e) => update("companyContact", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="郵便番号">
              <input
                type="text"
                className={inputClass}
                placeholder="000-0000"
                value={data.companyZip}
                onChange={(e) => update("companyZip", e.target.value)}
              />
            </Field>
            <Field label="電話番号">
              <input
                type="text"
                className={inputClass}
                placeholder="03-0000-0000"
                value={data.companyTel}
                onChange={(e) => update("companyTel", e.target.value)}
              />
            </Field>
          </div>
          <Field label="住所">
            <input
              type="text"
              className={inputClass}
              placeholder="東京都..."
              value={data.companyAddress}
              onChange={(e) => update("companyAddress", e.target.value)}
            />
          </Field>
          <Field label="メールアドレス">
            <input
              type="email"
              className={inputClass}
              placeholder="info@example.com"
              value={data.companyEmail}
              onChange={(e) => update("companyEmail", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="建設業許可番号" help="例: 東京都知事許可(般-5)第123456号。500万円未満の工事のみなら不要">
              <input
                type="text"
                className={inputClass}
                placeholder="東京都知事許可（般-00）第00000号"
                value={data.constructionLicenseNumber}
                onChange={(e) =>
                  update("constructionLicenseNumber", e.target.value)
                }
              />
            </Field>
            <Field label="インボイス登録番号" help="T+13桁の番号。適格請求書発行事業者の場合に記載">
              <input
                type="text"
                className={inputClass}
                placeholder="T1234567890123"
                value={data.companyRegistrationNumber}
                onChange={(e) =>
                  update("companyRegistrationNumber", e.target.value)
                }
              />
            </Field>
          </div>

        </div>
      </section>

      {/* 階層見積 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
              階層見積（工種別セクション）
            </span>
          </SectionTitle>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                isPaid ? setShowCost((v) => !v) : lock.open("原価・粗利分析")
              }
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 border ${
                effectiveShowCost
                  ? "bg-kenmitsu-navy text-white border-kenmitsu-navy"
                  : "bg-white text-gray-600 border-gray-200 hover:border-kenmitsu-navy hover:text-kenmitsu-navy"
              }`}
              title={
                isPaid
                  ? "原価・粗利を表示（社内用）"
                  : "Soloプラン限定機能"
              }
            >
              <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
              原価・粗利
              {!isPaid && <SoloLockBadge className="ml-0.5" />}
            </button>
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
              <HardHat className="w-3 h-3" strokeWidth={2.5} />
              建設業法2025対応
            </span>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
          工種ごとにセクションを分け、費目別に明細を入力してください。
          <strong>労務費</strong>=職人の手間賃　<strong>材料費</strong>=部材・資材　<strong>外注費</strong>=協力業者への支払い　<strong>その他</strong>=仮設・運搬・処分等。
          改正建設業法では費目ごとの内訳明示が求められています。
          {effectiveShowCost && (
            <span className="block mt-1 text-kenmitsu-navy font-medium">
              原価・粗利モード ON：原価単価を入力すると、行ごと・全体の利益率が表示されます。PDF・プレビューには出力されません。
            </span>
          )}
        </p>

        <div className="mb-4">
          <ExcelImportButton data={data} onChange={onChange} />
        </div>

        <div className="space-y-4">
          {data.sections.map((section, sectionIndex) => {
            const isCollapsed = collapsedSections[section.id];
            return (
              <div
                key={section.id}
                className="border-2 border-kenmitsu-navy100 rounded-xl overflow-hidden"
              >
                <div className="bg-kenmitsu-navy50 px-3 py-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-kenmitsu-navy px-1.5 py-0.5 bg-white border border-kenmitsu-navy100 rounded">
                    {sectionIndex + 1}
                  </span>
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-sm font-bold text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="セクション名（例: 電気工事）"
                    value={section.name}
                    onChange={(e) =>
                      updateSection(sectionIndex, "name", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="text-gray-500 hover:text-gray-800 p-1"
                    aria-label={isCollapsed ? "展開" : "折りたたむ"}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" strokeWidth={2.25} />
                    ) : (
                      <ChevronUp className="w-4 h-4" strokeWidth={2.25} />
                    )}
                  </button>
                  {data.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      aria-label="セクションを削除"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="p-3 space-y-2 bg-white">
                    {section.items.map((item, itemIndex) => (
                      <ItemRow
                        key={item.id}
                        index={itemIndex}
                        item={item}
                        showCost={effectiveShowCost}
                        canRemove={
                          section.items.length > 1 ||
                          (section.subsections?.length ?? 0) > 0
                        }
                        onChange={(field, value) =>
                          updateItem(sectionIndex, itemIndex, field, value)
                        }
                        onRemove={() => removeItem(sectionIndex, itemIndex)}
                        onOpenPriceMaster={() =>
                          isPaid
                            ? setPriceMasterTarget({
                                kind: "section",
                                sectionIndex,
                                itemIndex,
                              })
                            : lock.open("単価マスタ")
                        }
                      />
                    ))}

                    {/* 中項目（subsection）の表示 */}
                    {(section.subsections ?? []).map((sub, subIndex) => (
                      <div
                        key={sub.id}
                        className="ml-3 border-l-2 border-kenmitsu-navy100 pl-3 space-y-2"
                      >
                        <div className="flex items-center gap-2 bg-kenmitsu-navy50/60 rounded px-2 py-1.5">
                          <span className="text-[10px] font-bold text-kenmitsu-navy px-1.5 bg-white border border-kenmitsu-navy100 rounded">
                            {sectionIndex + 1}-{subIndex + 1}
                          </span>
                          <input
                            type="text"
                            className="flex-1 bg-transparent text-xs font-bold text-gray-900 outline-none placeholder:text-gray-400"
                            placeholder="中項目名（例: 配線工事）"
                            value={sub.name}
                            onChange={(e) =>
                              updateSubsection(
                                sectionIndex,
                                subIndex,
                                "name",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeSubsection(sectionIndex, subIndex)}
                            className="text-gray-400 hover:text-red-600 p-0.5"
                            aria-label="中項目を削除"
                          >
                            <Trash2 className="w-3 h-3" strokeWidth={2} />
                          </button>
                        </div>
                        {sub.items.map((item, itemIndex) => (
                          <ItemRow
                            key={item.id}
                            index={itemIndex}
                            item={item}
                            showCost={effectiveShowCost}
                            canRemove={sub.items.length > 1}
                            onChange={(field, value) =>
                              updateSubItem(
                                sectionIndex,
                                subIndex,
                                itemIndex,
                                field,
                                value
                              )
                            }
                            onRemove={() =>
                              removeSubItem(sectionIndex, subIndex, itemIndex)
                            }
                            onOpenPriceMaster={() =>
                              isPaid
                                ? setPriceMasterTarget({
                                    kind: "subsection",
                                    sectionIndex,
                                    subIndex,
                                    itemIndex,
                                  })
                                : lock.open("単価マスタ")
                            }
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => addSubItem(sectionIndex, subIndex)}
                          className="w-full rounded-lg border border-dashed border-gray-200 py-1.5 text-[10.5px] text-gray-500 hover:border-kenmitsu-navy hover:text-kenmitsu-navy transition-colors flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" strokeWidth={2.25} />
                          中項目内の明細を追加
                        </button>
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(sectionIndex)}
                        className="rounded-lg border-2 border-dashed border-gray-200 py-2 text-xs text-gray-500 hover:border-kenmitsu-navy hover:text-kenmitsu-navy transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
                        明細を追加
                      </button>
                      <button
                        type="button"
                        onClick={() => addSubsection(sectionIndex)}
                        className="rounded-lg border-2 border-dashed border-kenmitsu-navy100 py-2 text-xs text-kenmitsu-navy hover:bg-kenmitsu-navy50 transition-colors flex items-center justify-center gap-1"
                      >
                        <Layers className="w-3.5 h-3.5" strokeWidth={2.25} />
                        中項目を追加
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => addSection()}
            className="w-full rounded-xl border-2 border-dashed border-kenmitsu-navy100 py-3 text-sm text-kenmitsu-navy hover:bg-kenmitsu-navy50 hover:border-kenmitsu-navy transition-colors flex items-center justify-center gap-2 font-bold"
          >
            <Plus className="w-4 h-4" strokeWidth={2.25} />
            新しいセクションを追加
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Field label="消費税率（%）" help="建設工事は通常10%です。免税事業者の場合のみ「なし」を選んでください">
            <select
              className={inputClass + " w-32"}
              value={data.taxRate}
              onChange={(e) => update("taxRate", Number(e.target.value))}
            >
              <option value={10}>10%</option>
              <option value={0}>なし（免税）</option>
            </select>
          </Field>
        </div>
      </section>

      {/* 法定福利費 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            法定福利費（自動計算）
          </span>
        </SectionTitle>
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            className="accent-kenmitsu-navy"
            checked={data.enableLegalWelfare}
            onChange={(e) => update("enableLegalWelfare", e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            労務費に基づき法定福利費を計上する
          </span>
        </label>
        {data.enableLegalWelfare && (
          <Field label="法定福利費率（労務費に対する%）" help="社会保険料の事業主負担分。建設業の標準は約20%（健保+厚生年金+雇用保険+労災）">
            <input
              type="number"
              className={inputClass + " w-40"}
              min="0"
              max="100"
              step="0.5"
              inputMode="decimal"
              value={data.legalWelfareRate}
              onChange={(e) =>
                update(
                  "legalWelfareRate",
                  Math.min(100, clampNonNegative(e.target.value)),
                )
              }
            />
          </Field>
        )}
        <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
          健康保険・厚生年金・雇用保険・労災・子ども子育て拠出金などの事業主負担分の合計。業界目安は労務費の 18〜22%（国交省・建設業振興基金のガイドに基づく）。
        </p>
      </section>

      {/* 諸経費 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>諸経費（自動計算）</SectionTitle>
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            className="accent-kenmitsu-navy"
            checked={data.enableOverhead}
            onChange={(e) => update("enableOverhead", e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            現場管理費・一般管理費を自動計算する
          </span>
        </label>
        {data.enableOverhead && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="現場管理費率（%）" help="現場運営にかかる間接費。業界標準は5〜8%程度">
              <input
                type="number"
                className={inputClass}
                min="0"
                max="100"
                step="0.5"
                inputMode="decimal"
                value={data.siteManagementFeeRate}
                onChange={(e) =>
                  update(
                    "siteManagementFeeRate",
                    Math.min(100, clampNonNegative(e.target.value)),
                  )
                }
              />
            </Field>
            <Field label="一般管理費率（%）" help="会社全体の管理費・利益を含む。業界標準は8〜15%程度">
              <input
                type="number"
                className={inputClass}
                min="0"
                max="100"
                step="0.5"
                inputMode="decimal"
                value={data.generalManagementFeeRate}
                onChange={(e) =>
                  update(
                    "generalManagementFeeRate",
                    Math.min(100, clampNonNegative(e.target.value)),
                  )
                }
              />
            </Field>
          </div>
        )}
        <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
          業界標準の目安：現場管理費 5〜10%、一般管理費 8〜15%。現場管理費は（直接工事費＋法定福利費）に対する%、一般管理費は（直接工事費＋法定福利費＋現場管理費）＝工事原価 に対する%で計算されます。
        </p>
      </section>

      {/* 支払条件 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>支払条件</SectionTitle>
        <textarea
          className={inputClass + " min-h-[72px] resize-y"}
          placeholder="契約時30%、中間金40%、完成引渡時30%"
          value={data.paymentTerms}
          onChange={(e) => update("paymentTerms", e.target.value)}
        />
        <p className="text-[11px] text-gray-500 mt-2">
          契約時・中間金・完成時の配分を明記するのが慣習です。
        </p>
      </section>

      {/* 瑕疵担保責任 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            瑕疵担保責任・アフターサービス
          </span>
        </SectionTitle>
        <Field label="保証期間" className="mb-3" help="工事完了後の瑕疵担保期間。一般的に1〜2年。民法上は引渡から5年">
          <input
            type="text"
            className={inputClass}
            placeholder="引渡日より2年間"
            value={data.warrantyPeriod}
            onChange={(e) => update("warrantyPeriod", e.target.value)}
          />
        </Field>
        <Field label="保証範囲・内容">
          <textarea
            className={inputClass + " min-h-[80px] resize-y"}
            placeholder="構造耐力上主要な部分および雨水の浸入を防止する部分は10年間（住宅品確法に準ずる） / 設備機器は各メーカー保証に準じます"
            value={data.warrantyScope}
            onChange={(e) => update("warrantyScope", e.target.value)}
          />
        </Field>
      </section>

      {/* 追加工事の取扱い */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <FileWarning className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            追加工事・設計変更の取扱い
          </span>
        </SectionTitle>
        <textarea
          className={inputClass + " min-h-[96px] resize-y"}
          placeholder="記載のない工事・仕様変更は別途お見積り。天候・現場状況悪化の場合の工期延長についても合意します。"
          value={data.additionalWorkPolicy}
          onChange={(e) => update("additionalWorkPolicy", e.target.value)}
        />
        <p className="text-[11px] text-gray-500 mt-2">
          追加工事費用をめぐるトラブルは建設業で最も多い紛争の一つ。見積段階で合意しておくのがベストプラクティスです。
        </p>
      </section>

      {/* 工事写真 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>
            <span className="inline-flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
              工事写真（PDF末尾に追加）
            </span>
          </SectionTitle>
          <button
            type="button"
            onClick={() =>
              isPaid ? photoInputRef.current?.click() : lock.open("工事写真")
            }
            className="text-[10px] font-bold px-2 py-1 rounded-md bg-kenmitsu-navy50 text-kenmitsu-navy border border-kenmitsu-navy100 hover:bg-kenmitsu-navy100 flex items-center gap-1"
          >
            <Upload className="w-3 h-3" strokeWidth={2.5} />
            写真を追加
            {!isPaid && <SoloLockBadge className="ml-0.5" />}
          </button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files) return;
              for (const file of Array.from(files)) {
                await addSitePhoto(file);
              }
              if (photoInputRef.current) photoInputRef.current.value = "";
            }}
          />
        </div>
        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
          現場写真を添付すると、見積書PDFの末尾に「工事写真」シートとして追加されます。根拠資料として有効です。1枚1MB以下。
        </p>
        {(data.sitePhotos ?? []).length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            写真が追加されていません
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {(data.sitePhotos ?? []).map((photo) => (
              <div
                key={photo.id}
                className="relative border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.dataUrl}
                  alt={photo.caption || "工事写真"}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-white border border-gray-200 rounded-md p-1 text-gray-600"
                  aria-label="写真を削除"
                >
                  <X className="w-3 h-3" strokeWidth={2.5} />
                </button>
                <input
                  type="text"
                  className="w-full text-[10.5px] px-2 py-1.5 border-t border-gray-200 focus:outline-none"
                  placeholder="キャプション（例: 施工前）"
                  value={photo.caption}
                  onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 備考 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>備考</SectionTitle>
        <textarea
          className={inputClass + " min-h-[80px] resize-y"}
          placeholder="その他特記事項（仮設電気・水道の負担区分、作業時間、駐車場利用等）"
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </section>

      {/* モーダル */}
      <PriceMasterPicker
        open={priceMasterTarget !== null}
        onClose={() => setPriceMasterTarget(null)}
        onSelect={applyPriceMaster}
        currentItemDraft={currentPriceMasterDraft}
      />
      <CustomerPicker
        open={customerPickerOpen}
        onClose={() => setCustomerPickerOpen(false)}
        onSelect={applyCustomer}
        currentCustomerDraft={{
          name: data.clientName,
          title: data.clientTitle,
          contact: data.clientContact,
        }}
      />
      {/* Solo 機能ロック時の案内ダイアログ */}
      {lock.dialog}
    </div>
  );
}
