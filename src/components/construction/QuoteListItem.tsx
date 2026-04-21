"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Copy,
  Trash2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { ConstructionQuoteRow } from "@/lib/supabase/types";
import { useToast } from "@/components/construction/Toast";

interface Props {
  quote: ConstructionQuoteRow;
}

export default function QuoteListItem({ quote }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<"delete" | "duplicate" | null>(null);

  const handleDelete = async () => {
    const label = quote.subject || quote.quote_number || "（無題の見積書）";
    const ok = window.confirm(
      `「${label}」を削除しますか？\n\nこの操作は取り消せません。`,
    );
    if (!ok) return;

    setBusy("delete");
    try {
      const res = await fetch(`/api/quotes?id=${quote.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("見積書を削除しました。");
        router.refresh();
      } else {
        toast.error("削除に失敗しました。");
        setBusy(null);
      }
    } catch {
      toast.error("通信エラーが発生しました。");
      setBusy(null);
    }
  };

  const handleDuplicate = async () => {
    setBusy("duplicate");
    try {
      const res = await fetch(`/api/quotes/${quote.id}/duplicate`, {
        method: "POST",
      });
      const json = await res.json();
      if (res.status === 402) {
        toast.error(
          json.message ||
            "無料プランの月間上限に達しました。Soloプランで解除できます。",
        );
        setBusy(null);
        return;
      }
      if (!res.ok) {
        toast.error(json.error || "複製に失敗しました。");
        setBusy(null);
        return;
      }
      toast.success("見積書を複製しました。");
      const newId = json.quote?.id;
      if (newId) {
        router.push(`/construction/quotes/${newId}`);
      } else {
        router.refresh();
      }
    } catch {
      toast.error("通信エラーが発生しました。");
      setBusy(null);
    }
  };

  const created = new Date(quote.created_at);
  const dateShort = `${created.getMonth() + 1}/${created.getDate()}`;
  const dateWithDow = `${dateShort} (${["日","月","火","水","木","金","土"][created.getDay()]})`;
  const title = quote.subject || quote.quote_number || "（無題の見積書）";
  const formattedTotal = `¥${Math.round(quote.total).toLocaleString("ja-JP")}`;

  const actions = (
    <div className="flex gap-0.5 shrink-0">
      <Link
        href={`/construction/quotes/${quote.id}`}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-kenmitsu-navy hover:bg-kenmitsu-navy50"
        title="開く"
      >
        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.25} />
      </Link>
      <button
        onClick={handleDuplicate}
        disabled={busy !== null}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
        title="複製"
      >
        {busy === "duplicate" ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.25} />
        ) : (
          <Copy className="w-3.5 h-3.5" strokeWidth={2.25} />
        )}
      </button>
      <button
        onClick={handleDelete}
        disabled={busy !== null}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
        title="削除"
      >
        {busy === "delete" ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.25} />
        ) : (
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );

  return (
    <li className="hover:bg-kenmitsu-navy50/40">
      {/* Desktop: テーブル行 */}
      <div className="hidden md:grid grid-cols-[72px_100px_1fr_160px_120px_auto] gap-3 items-center px-4 py-2.5">
        <time className="text-xs text-gray-600 tabular-nums">
          {dateWithDow}
        </time>
        <span className="text-xs text-gray-500 font-mono truncate">
          {quote.quote_number || "—"}
        </span>
        <Link
          href={`/construction/quotes/${quote.id}`}
          className="text-sm font-medium text-gray-900 truncate hover:text-kenmitsu-navy"
          title={title}
        >
          {title}
        </Link>
        <span
          className="text-xs text-gray-600 truncate"
          title={quote.client_name ?? ""}
        >
          {quote.client_name || "—"}
        </span>
        <span className="text-sm font-bold text-gray-900 text-right tabular-nums">
          {formattedTotal}
        </span>
        {actions}
      </div>

      {/* Mobile: カード */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <Link
            href={`/construction/quotes/${quote.id}`}
            className="flex-1 min-w-0 text-sm font-medium text-gray-900 truncate hover:text-kenmitsu-navy"
          >
            {title}
          </Link>
          <span className="text-sm font-bold text-gray-900 tabular-nums shrink-0">
            {formattedTotal}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1 text-[11px] text-gray-500">
            <span className="tabular-nums">{dateWithDow}</span>
            {quote.client_name && (
              <>
                <span className="mx-1.5 text-gray-300">/</span>
                <span className="truncate">{quote.client_name}</span>
              </>
            )}
            {quote.quote_number && (
              <>
                <span className="mx-1.5 text-gray-300">/</span>
                <span className="font-mono">{quote.quote_number}</span>
              </>
            )}
          </div>
          {actions}
        </div>
      </div>
    </li>
  );
}
