"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  useCustomerMaster,
  CUSTOMER_MASTER_LIMIT,
  CustomerMasterItem,
} from "@/hooks/useCustomerMaster";
import { useMasterSync } from "@/hooks/useMasterSync";
import { useToast } from "@/components/construction/Toast";
import { Portal } from "@/components/construction/Portal";

type DraftCustomer = Omit<CustomerMasterItem, "id"> & { id?: string };

const EMPTY_DRAFT: DraftCustomer = {
  name: "",
  title: "御中",
  contact: "",
  note: "",
};

export default function CustomerMasterManager() {
  const { items, loaded, add, update, remove } = useCustomerMaster();
  const toast = useToast();
  const onSyncError = useCallback(
    (msg: string) => toast.error(`同期エラー: ${msg}`),
    [toast]
  );
  useMasterSync(true, onSyncError);

  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<DraftCustomer | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q)
    );
  }, [items, query]);

  const count = items.length;
  const limitReached = count >= CUSTOMER_MASTER_LIMIT;
  const nearLimit = count >= Math.floor(CUSTOMER_MASTER_LIMIT * 0.9);

  const openNew = () => {
    if (limitReached) {
      toast.error(`登録上限（${CUSTOMER_MASTER_LIMIT}件）に達しています`);
      return;
    }
    setDraft({ ...EMPTY_DRAFT });
  };

  const openEdit = (c: CustomerMasterItem) => {
    setDraft({ ...c });
  };

  const closeDialog = () => setDraft(null);

  const saveDraft = () => {
    if (!draft) return;
    if (!draft.name.trim()) {
      toast.error("取引先名を入力してください");
      return;
    }
    if (draft.id) {
      update(draft.id, {
        name: draft.name.trim(),
        title: draft.title,
        contact: draft.contact.trim(),
        note: draft.note?.trim() || "",
      });
      toast.success("取引先を更新しました");
    } else {
      const ok = add({
        name: draft.name.trim(),
        title: draft.title,
        contact: draft.contact.trim(),
        note: draft.note?.trim() || "",
      });
      if (!ok) {
        toast.error(`登録上限（${CUSTOMER_MASTER_LIMIT}件）に達しています`);
        return;
      }
      toast.success("取引先を登録しました");
    }
    setDraft(null);
  };

  const removeItem = (c: CustomerMasterItem) => {
    if (!confirm(`「${c.name}」を取引先マスタから削除しますか？`)) return;
    remove(c.id);
    toast.success("取引先を削除しました");
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
            <Users
              className="w-5 h-5 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900">取引先マスタ</h1>
            <p className="text-[11px] text-gray-500 mt-0.5">
              登録した取引先を見積書作成時にワンクリックで呼び出せます
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
              placeholder="取引先名・担当者名で検索"
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

        <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500">
            登録 <strong className="text-gray-900">{count}</strong> /{" "}
            {CUSTOMER_MASTER_LIMIT} 件
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
                : `残り ${CUSTOMER_MASTER_LIMIT - count} 件`}
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
                ? "まだ取引先が登録されていません。「新規追加」から登録してください。"
                : "検索結果がありません。"}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <li
                  key={c.id}
                  className="px-6 py-3 flex items-center gap-3 hover:bg-kenmitsu-navy50/40"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {c.name}{" "}
                      <span className="text-gray-500 font-normal">
                        {c.title}
                      </span>
                    </p>
                    {c.contact && (
                      <p className="text-[11px] text-gray-500 truncate">
                        担当: {c.contact}
                      </p>
                    )}
                    {c.note && (
                      <p className="text-[11px] text-gray-400 truncate">
                        {c.note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(c)}
                      className="p-1.5 text-gray-500 hover:text-kenmitsu-navy hover:bg-kenmitsu-navy50 rounded-md"
                      aria-label="編集"
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={2.25} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(c)}
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

function EditDialog({
  draft,
  onChange,
  onSave,
  onClose,
}: {
  draft: DraftCustomer;
  onChange: (d: DraftCustomer) => void;
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
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">
              {draft.id ? "取引先を編集" : "取引先を追加"}
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
                取引先名 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => onChange({ ...draft, name: e.target.value })}
                placeholder="例: ○○建設"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                敬称
              </label>
              <div className="flex gap-2">
                {(["御中", "様"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onChange({ ...draft, title: t })}
                    className={`px-4 py-1.5 text-xs font-bold border rounded-full transition-colors ${
                      draft.title === t
                        ? "bg-kenmitsu-navy text-white border-kenmitsu-navy"
                        : "bg-white text-gray-700 border-gray-200 hover:border-kenmitsu-navy"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                担当者名
              </label>
              <input
                type="text"
                value={draft.contact}
                onChange={(e) =>
                  onChange({ ...draft, contact: e.target.value })
                }
                placeholder="例: 山田 太郎"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                メモ
              </label>
              <textarea
                value={draft.note ?? ""}
                onChange={(e) => onChange({ ...draft, note: e.target.value })}
                placeholder="例: 支払いサイト月末締め翌月末払い"
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20 resize-none"
              />
            </div>
          </div>

          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
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
