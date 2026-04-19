"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Clock,
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
            "無料プランの月間上限に達しました。Soloプランで解除できます。"
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

  return (
    <li className="py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/construction/quotes/${quote.id}`}
          className="text-sm font-medium text-gray-900 truncate block hover:text-kenmitsu-navy"
        >
          {quote.subject || quote.quote_number || "（無題の見積書）"}
        </Link>
        <p className="text-[11px] text-gray-500 flex items-center gap-2">
          <Clock className="w-3 h-3" strokeWidth={2.25} />
          {new Date(quote.created_at).toLocaleString("ja-JP")}
          {quote.client_name && <span>/ {quote.client_name}</span>}
        </p>
      </div>
      <div className="text-right mr-2">
        <p className="text-sm font-bold text-gray-900">
          ¥{Math.round(quote.total).toLocaleString("ja-JP")}
        </p>
      </div>
      <div className="flex gap-1">
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
    </li>
  );
}
