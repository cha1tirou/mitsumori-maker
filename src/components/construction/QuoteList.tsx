"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Crown } from "lucide-react";
import QuoteListItem from "@/components/construction/QuoteListItem";
import { ConstructionQuoteRow } from "@/lib/supabase/types";

interface Props {
  quotes: ConstructionQuoteRow[];
  plan: string;
  freeLimit: number;
}

export default function QuoteList({ quotes, plan, freeLimit }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return quotes;
    const q = query.toLowerCase();
    return quotes.filter(
      (row) =>
        (row.subject ?? "").toLowerCase().includes(q) ||
        (row.client_name ?? "").toLowerCase().includes(q) ||
        (row.quote_number ?? "").toLowerCase().includes(q)
    );
  }, [quotes, query]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">見積履歴</h2>
        <span className="text-xs text-gray-500">
          {filtered.length === quotes.length
            ? `${quotes.length} 件`
            : `${filtered.length} / ${quotes.length} 件`}
        </span>
      </div>

      {quotes.length > 0 && (
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="件名・取引先・見積番号で検索"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20"
          />
        </div>
      )}

      {plan === "free" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700 mb-4 flex items-start gap-2">
          <Crown className="w-4 h-4 text-green-700 shrink-0 mt-0.5" strokeWidth={2.25} />
          <span>
            Freeプランでは月{freeLimit}通まで保存できます。Soloプランにアップグレードすると、無制限に保存・再編集・複製が可能です。
          </span>
        </div>
      )}

      {quotes.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500">
          まだ見積書がありません。
          <Link
            href="/construction/new"
            className="text-green-700 hover:underline ml-1"
          >
            最初の見積書を作成する →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500">
          「{query}」に一致する見積書はありません。
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {filtered.map((q) => (
            <QuoteListItem key={q.id} quote={q} />
          ))}
        </ul>
      )}
    </section>
  );
}
