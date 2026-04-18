"use client";

import { useState, useMemo } from "react";
import {
  CustomerMasterItem,
  useCustomerMaster,
} from "@/hooks/useCustomerMaster";
import { X, Search, Users, Plus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (customer: CustomerMasterItem) => void;
  currentCustomerDraft?: {
    name: string;
    title: string;
    contact: string;
  };
}

export default function CustomerPicker({
  open,
  onClose,
  onSelect,
  currentCustomerDraft,
}: Props) {
  const { items, addOrUpdateByName, remove } = useCustomerMaster();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => c.name.toLowerCase().includes(q));
  }, [items, query]);

  if (!open) return null;

  const canRegisterCurrent =
    currentCustomerDraft && currentCustomerDraft.name;

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
              <Users className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
              取引先マスタから選択
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              過去にやり取りした取引先を登録しておくと、次回以降の入力が不要になります。
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
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
              placeholder="取引先名で検索"
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
                ? "まだ取引先が登録されていません。"
                : "検索結果がありません。"}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <li key={c.id} className="px-5 py-3 hover:bg-kenmitsu-navy50/50">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        onSelect(c);
                        onClose();
                      }}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {c.name} <span className="text-gray-500">{c.title}</span>
                      </p>
                      {c.contact && (
                        <p className="text-[11px] text-gray-500">
                          担当: {c.contact}
                        </p>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`「${c.name}」を取引先マスタから削除しますか？`)) {
                          remove(c.id);
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
          <div className="px-5 py-3 border-t border-gray-100 bg-kenmitsu-navy50/50">
            <button
              onClick={() => {
                if (!currentCustomerDraft) return;
                addOrUpdateByName({
                  name: currentCustomerDraft.name,
                  title: currentCustomerDraft.title,
                  contact: currentCustomerDraft.contact,
                });
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-kenmitsu-navy50 hover:bg-kenmitsu-navy100 text-kenmitsu-navy text-xs font-bold py-2 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              現在の発注者「{currentCustomerDraft!.name}」をマスタに登録
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
