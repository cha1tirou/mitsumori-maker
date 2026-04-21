"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  JapaneseYen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  usePriceMaster,
  PRICE_MASTER_LIMIT,
  PriceMasterItem,
} from "@/hooks/usePriceMaster";
import { useMasterSync } from "@/hooks/useMasterSync";
import { useToast } from "@/components/construction/Toast";
import { Portal } from "@/components/construction/Portal";
import { CostCategory, costCategoryLabels } from "@/types/construction";

type DraftItem = Omit<PriceMasterItem, "id"> & { id?: string };

const EMPTY_DRAFT: DraftItem = {
  name: "",
  unit: "式",
  unitPrice: 0,
  category: "other",
};

const CATEGORY_ORDER: CostCategory[] = [
  "labor",
  "material",
  "outsourcing",
  "other",
];

export default function PriceMasterManager() {
  const { items, loaded, add, update, remove } = usePriceMaster();
  const toast = useToast();
  const onSyncError = useCallback(
    (msg: string) => toast.error(msg),
    [toast]
  );
  useMasterSync(true, onSyncError);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CostCategory | "all">("all");
  const [draft, setDraft] = useState<DraftItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== "all" && it.category !== category) return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        (it.workTypeHint ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, query, category]);

  const count = items.length;
  const limitReached = count >= PRICE_MASTER_LIMIT;
  const nearLimit = count >= Math.floor(PRICE_MASTER_LIMIT * 0.9);

  const openNew = () => {
    if (limitReached) {
      toast.error(`登録上限（${PRICE_MASTER_LIMIT}件）に達しています`);
      return;
    }
    setDraft({ ...EMPTY_DRAFT });
  };

  const openEdit = (it: PriceMasterItem) => {
    setDraft({ ...it });
  };

  const closeDialog = () => setDraft(null);

  const saveDraft = () => {
    if (!draft) return;
    if (!draft.name.trim()) {
      toast.error("品目名を入力してください");
      return;
    }
    if (!Number.isFinite(draft.unitPrice) || draft.unitPrice < 0) {
      toast.error("単価は 0 以上の数値を入力してください");
      return;
    }
    const payload: Omit<PriceMasterItem, "id"> = {
      name: draft.name.trim(),
      unit: draft.unit.trim() || "式",
      unitPrice: Math.round(draft.unitPrice),
      costUnitPrice:
        typeof draft.costUnitPrice === "number" && draft.costUnitPrice >= 0
          ? Math.round(draft.costUnitPrice)
          : undefined,
      category: draft.category,
      workTypeHint: draft.workTypeHint?.trim() || undefined,
    };
    if (draft.id) {
      update(draft.id, payload);
      toast.success("品目を更新しました");
    } else {
      const ok = add(payload);
      if (!ok) {
        toast.error(`登録上限（${PRICE_MASTER_LIMIT}件）に達しています`);
        return;
      }
      toast.success("品目を登録しました");
    }
    setDraft(null);
  };

  const removeItem = (it: PriceMasterItem) => {
    if (!confirm(`「${it.name}」を単価マスタから削除しますか？`)) return;
    remove(it.id);
    toast.success("品目を削除しました");
  };

  return (
    <div className="space-y-5">
      <Link
        href="/construction/mypage"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.25} />
        マイページに戻る
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
            <JapaneseYen
              className="w-5 h-5 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900">単価マスタ</h1>
            <p className="text-[11px] text-gray-500 mt-0.5">
              よく使う品目を登録して明細行へ即挿入できます
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2.25}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="品目名・工種で検索"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            />
          </div>
          <button
            type="button"
            onClick={openNew}
            disabled={limitReached}
            className="inline-flex items-center justify-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            新規追加
          </button>
        </div>

        <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap gap-2">
          <CategoryPill
            label="すべて"
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {CATEGORY_ORDER.map((c) => (
            <CategoryPill
              key={c}
              label={costCategoryLabels[c]}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>

        <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500">
            登録 <strong className="text-gray-900">{count}</strong> /{" "}
            {PRICE_MASTER_LIMIT} 品目
          </span>
          {nearLimit && (
            <span
              className={`inline-flex items-center gap-1 font-bold ${
                limitReached ? "text-red-600" : "text-amber-700"
              }`}
            >
              <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
              {limitReached
                ? "上限到達。新規追加できません。"
                : `残り ${PRICE_MASTER_LIMIT - count} 件`}
            </span>
          )}
        </div>

        <div>
          {!loaded ? (
            <div className="px-6 py-12 text-center text-xs text-gray-400">
              読み込み中...
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-xs text-gray-500">
              {items.length === 0
                ? "まだ品目が登録されていません。「新規追加」から登録してください。"
                : "検索結果がありません。"}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((it) => (
                <li
                  key={it.id}
                  className="px-6 py-3 flex items-center gap-3 hover:bg-kenmitsu-navy50/40"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {it.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {it.unit} × ¥
                      {it.unitPrice.toLocaleString()}
                      <span className="ml-2 inline-block text-[10px] bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                        {costCategoryLabels[it.category]}
                      </span>
                      {it.workTypeHint && (
                        <span className="ml-1 text-[10px] text-gray-400">
                          / {it.workTypeHint}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(it)}
                      className="p-1.5 text-gray-500 hover:text-kenmitsu-navy hover:bg-kenmitsu-navy50 rounded-md"
                      aria-label="編集"
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={2.25} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(it)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                      aria-label="削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={2.25} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {draft && (
        <EditDialog
          draft={draft}
          onChange={setDraft}
          onSave={saveDraft}
          onClose={closeDialog}
        />
      )}
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-colors ${
        active
          ? "bg-kenmitsu-navy text-white border-kenmitsu-navy"
          : "bg-white text-gray-600 border-gray-200 hover:border-kenmitsu-navy"
      }`}
    >
      {label}
    </button>
  );
}

function EditDialog({
  draft,
  onChange,
  onSave,
  onClose,
}: {
  draft: DraftItem;
  onChange: (d: DraftItem) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
            <h3 className="text-sm font-bold text-gray-900">
              {draft.id ? "品目を編集" : "品目を追加"}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="閉じる"
            >
              <X className="w-4 h-4" strokeWidth={2.25} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                品目名 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => onChange({ ...draft, name: e.target.value })}
                placeholder="例: 養生費 / 左官工一人工"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                費目分類 <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORY_ORDER.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onChange({ ...draft, category: c })}
                    className={`px-3 py-2 text-xs font-bold border rounded-lg transition-colors ${
                      draft.category === c
                        ? "bg-kenmitsu-navy text-white border-kenmitsu-navy"
                        : "bg-white text-gray-700 border-gray-200 hover:border-kenmitsu-navy"
                    }`}
                  >
                    {costCategoryLabels[c]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  単位
                </label>
                <input
                  type="text"
                  value={draft.unit}
                  onChange={(e) =>
                    onChange({ ...draft, unit: e.target.value })
                  }
                  placeholder="式 / ㎡ / m / 個 / 人工"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  単価（税抜）
                </label>
                <input
                  type="number"
                  value={Number.isFinite(draft.unitPrice) ? draft.unitPrice : 0}
                  onChange={(e) =>
                    onChange({
                      ...draft,
                      unitPrice: Number(e.target.value) || 0,
                    })
                  }
                  min={0}
                  step={100}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                原価単価（任意・社内分析用）
              </label>
              <input
                type="number"
                value={
                  typeof draft.costUnitPrice === "number"
                    ? draft.costUnitPrice
                    : ""
                }
                onChange={(e) => {
                  const v = e.target.value;
                  onChange({
                    ...draft,
                    costUnitPrice: v === "" ? undefined : Number(v) || 0,
                  });
                }}
                min={0}
                step={100}
                placeholder="未入力で利益率計算から除外"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                PDF・プレビューには出力されません
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                工種（任意）
              </label>
              <input
                type="text"
                value={draft.workTypeHint ?? ""}
                onChange={(e) =>
                  onChange({ ...draft, workTypeHint: e.target.value })
                }
                placeholder="電気 / 水道 / 内装 など"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
              />
            </div>
          </div>

          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm font-medium border border-gray-200 hover:bg-gray-100 text-gray-700 py-2.5 rounded-lg"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={onSave}
              className="flex-1 text-sm font-bold bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white py-2.5 rounded-lg"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
