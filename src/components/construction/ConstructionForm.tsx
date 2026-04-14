"use client";

import {
  ConstructionQuoteData,
  ConstructionItem,
  ConstructionSection,
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
} from "lucide-react";
import { useState } from "react";

interface Props {
  data: ConstructionQuoteData;
  onChange: (data: ConstructionQuoteData) => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600/20";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span className="w-1 h-4 bg-green-700 rounded-full" />
      {children}
    </h3>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-gray-500 mb-1 block">{label}</span>
      {children}
    </label>
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

export default function ConstructionForm({ data, onChange }: Props) {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

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
          工種を選んでプリセットを読み込むと、セクションとして追加されます。複数工種にまたがる見積書も作成できます。
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(Object.keys(workTypeLabels) as WorkType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update("workType", type)}
              className={`text-xs font-medium py-2 px-2 rounded-lg border transition-colors ${
                data.workType === type
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-gray-700 border-gray-200 hover:border-green-600 hover:text-green-700"
              }`}
            >
              {workTypeLabels[type]}
            </button>
          ))}
        </div>
        {data.workType !== "other" && workTypePresets[data.workType].length > 0 && (
          <button
            type="button"
            onClick={() => applyPreset(data.workType)}
            className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-800 text-xs font-bold py-2.5 rounded-lg border border-green-200 transition-colors"
          >
            <Wand2 className="w-4 h-4" strokeWidth={2.25} />
            「{workTypeLabels[data.workType]}」をセクションとして追加
          </button>
        )}
      </section>

      {/* 見積情報 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>見積情報</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="見積番号">
            <input
              type="text"
              className={inputClass}
              placeholder="K-2026-001"
              value={data.quoteNumber}
              onChange={(e) => update("quoteNumber", e.target.value)}
            />
          </Field>
          <Field label="工事名">
            <input
              type="text"
              className={inputClass}
              placeholder="◯◯邸 内装リフォーム工事"
              value={data.subject}
              onChange={(e) => update("subject", e.target.value)}
            />
          </Field>
          <Field label="見積日">
            <input
              type="date"
              className={inputClass}
              value={data.quoteDate}
              onChange={(e) => update("quoteDate", e.target.value)}
            />
          </Field>
          <Field label="有効期限（日数）">
            <input
              type="number"
              className={inputClass}
              min="1"
              value={data.validityDays}
              onChange={(e) => update("validityDays", Number(e.target.value))}
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
          </Field>
          <Field label="工事期間" className="col-span-2">
            <input
              type="text"
              className={inputClass}
              placeholder="着工後 約14日間 / 2026年5月1日〜5月15日"
              value={data.constructionPeriod}
              onChange={(e) => update("constructionPeriod", e.target.value)}
            />
          </Field>
          <Field label="設計図書・仕様" className="col-span-2">
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
        <SectionTitle>発注者</SectionTitle>
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
        <SectionTitle>施工者情報</SectionTitle>
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
            <Field label="建設業許可番号">
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
            <Field label="インボイス登録番号">
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
              <Layers className="w-4 h-4 text-green-700" strokeWidth={2.25} />
              階層見積（工種別セクション）
            </span>
          </SectionTitle>
          <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
            <HardHat className="w-3 h-3" strokeWidth={2.5} />
            建設業法2025対応
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
          工種ごとにセクションを分け、費目別（労務費・材料費・外注費・その他経費）で明細を入力してください。階層明示は改正建設業法の求める内訳明示に対応します。
        </p>

        <div className="space-y-4">
          {data.sections.map((section, sectionIndex) => {
            const isCollapsed = collapsedSections[section.id];
            return (
              <div
                key={section.id}
                className="border-2 border-green-100 rounded-xl overflow-hidden"
              >
                <div className="bg-green-50 px-3 py-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-green-900 px-1.5 py-0.5 bg-white border border-green-200 rounded">
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
                      <div
                        key={item.id}
                        className="rounded-lg border border-gray-100 bg-gray-50/40 p-2.5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium text-gray-400">
                              #{itemIndex + 1}
                            </span>
                            <select
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${categoryColors[item.category]}`}
                              value={item.category}
                              onChange={(e) =>
                                updateItem(
                                  sectionIndex,
                                  itemIndex,
                                  "category",
                                  e.target.value as CostCategory
                                )
                              }
                            >
                              {(Object.keys(costCategoryLabels) as CostCategory[]).map(
                                (c) => (
                                  <option key={c} value={c}>
                                    {costCategoryLabels[c]}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          {section.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(sectionIndex, itemIndex)}
                              className="text-gray-400 hover:text-red-600"
                              aria-label="削除"
                            >
                              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className={inputClass + " mb-2"}
                          placeholder="品目・工事項目名"
                          value={item.name}
                          onChange={(e) =>
                            updateItem(sectionIndex, itemIndex, "name", e.target.value)
                          }
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            className={inputClass + " text-xs"}
                            placeholder="数量"
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                sectionIndex,
                                itemIndex,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                          />
                          <input
                            type="text"
                            className={inputClass + " text-xs"}
                            placeholder="単位"
                            value={item.unit}
                            onChange={(e) =>
                              updateItem(sectionIndex, itemIndex, "unit", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            className={inputClass + " text-xs"}
                            placeholder="単価"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateItem(
                                sectionIndex,
                                itemIndex,
                                "unitPrice",
                                Number(e.target.value)
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem(sectionIndex)}
                      className="w-full rounded-lg border-2 border-dashed border-gray-200 py-2 text-xs text-gray-500 hover:border-green-600 hover:text-green-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
                      明細を追加
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => addSection()}
            className="w-full rounded-xl border-2 border-dashed border-green-200 py-3 text-sm text-green-700 hover:bg-green-50 hover:border-green-300 transition-colors flex items-center justify-center gap-2 font-bold"
          >
            <Plus className="w-4 h-4" strokeWidth={2.25} />
            新しいセクションを追加
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Field label="消費税率（%）">
            <select
              className={inputClass + " w-32"}
              value={data.taxRate}
              onChange={(e) => update("taxRate", Number(e.target.value))}
            >
              <option value={10}>10%</option>
              <option value={8}>8%（軽減）</option>
              <option value={0}>なし</option>
            </select>
          </Field>
        </div>
      </section>

      {/* 法定福利費 */}
      <section className="bg-white rounded-2xl p-5 border border-gray-100">
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-700" strokeWidth={2.25} />
            法定福利費（自動計算）
          </span>
        </SectionTitle>
        <label className="flex items-center gap-2 mb-3 cursor-pointer">
          <input
            type="checkbox"
            className="accent-green-700"
            checked={data.enableLegalWelfare}
            onChange={(e) => update("enableLegalWelfare", e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            労務費に基づき法定福利費を計上する
          </span>
        </label>
        {data.enableLegalWelfare && (
          <Field label="法定福利費率（労務費に対する%）">
            <input
              type="number"
              className={inputClass + " w-40"}
              min="0"
              max="100"
              step="0.5"
              value={data.legalWelfareRate}
              onChange={(e) =>
                update("legalWelfareRate", Number(e.target.value))
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
            className="accent-green-700"
            checked={data.enableOverhead}
            onChange={(e) => update("enableOverhead", e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            現場管理費・一般管理費を自動計算する
          </span>
        </label>
        {data.enableOverhead && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="現場管理費率（%）">
              <input
                type="number"
                className={inputClass}
                min="0"
                max="100"
                step="0.5"
                value={data.siteManagementFeeRate}
                onChange={(e) =>
                  update("siteManagementFeeRate", Number(e.target.value))
                }
              />
            </Field>
            <Field label="一般管理費率（%）">
              <input
                type="number"
                className={inputClass}
                min="0"
                max="100"
                step="0.5"
                value={data.generalManagementFeeRate}
                onChange={(e) =>
                  update("generalManagementFeeRate", Number(e.target.value))
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
            <ShieldCheck className="w-4 h-4 text-green-700" strokeWidth={2.25} />
            瑕疵担保責任・アフターサービス
          </span>
        </SectionTitle>
        <Field label="保証期間" className="mb-3">
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
            <FileWarning className="w-4 h-4 text-green-700" strokeWidth={2.25} />
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
    </div>
  );
}
