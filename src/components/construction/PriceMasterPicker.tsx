"use client";

import { useState, useMemo } from "react";
import { PriceMasterItem, usePriceMaster } from "@/hooks/usePriceMaster";
import { costCategoryLabels } from "@/types/construction";
import { X, Search, Plus, Star } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (item: PriceMasterItem) => void;
  currentItemDraft?: {
    name: string;
    unit: string;
    unitPrice: number;
    costUnitPrice?: number;
    category: string;
  };
}

export default function PriceMasterPicker({
  open,
  onClose,
  onSelect,
  currentItemDraft,
}: Props) {
  const { items, add, remove } = usePriceMaster();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.name.toLowerCase().includes(q) ||
        it.unit.toLowerCase().includes(q) ||
        (it.workTypeHint ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  if (!open) return null;

  const canRegisterCurrent =
    currentItemDraft && currentItemDraft.name && currentItemDraft.unitPrice > 0;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" strokeWidth={2.25} />
              単価マスタから選択
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              よく使う品目・単価を登録しておくと、2通目以降の作成が一瞬で終わります。
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-gray-100">
          <div className="relative">
            <Search
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2.25}
            />
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20"
              placeholder="品目名・工種で検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center text-xs text-gray-500">
              {items.length === 0
                ? "まだ単価マスタに登録された品目はありません。"
                : "検索結果がありません。"}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((it) => (
                <li key={it.id} className="px-5 py-3 hover:bg-green-50/50">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        onSelect(it);
                        onClose();
                      }}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {it.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {costCategoryLabels[it.category]}
                        <span className="mx-1.5">/</span>
                        {it.unit}
                        <span className="mx-1.5">/</span>
                        ¥{it.unitPrice.toLocaleString("ja-JP")}
                        {it.costUnitPrice ? (
                          <span className="ml-1.5 text-[10px] text-gray-400">
                            (原価 ¥{it.costUnitPrice.toLocaleString("ja-JP")})
                          </span>
                        ) : null}
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`「${it.name}」をマスタから削除しますか？`)) {
                          remove(it.id);
                        }
                      }}
                      className="text-[10px] text-gray-400 hover:text-red-600 px-2 py-1"
                    >
                      削除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {canRegisterCurrent && (
          <div className="px-5 py-3 border-t border-gray-100 bg-amber-50/50">
            <button
              onClick={() => {
                if (!currentItemDraft) return;
                add({
                  name: currentItemDraft.name,
                  unit: currentItemDraft.unit,
                  unitPrice: currentItemDraft.unitPrice,
                  costUnitPrice: currentItemDraft.costUnitPrice,
                  category: currentItemDraft.category as never,
                });
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold py-2 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              現在の明細行「{currentItemDraft!.name}」をマスタに登録
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
