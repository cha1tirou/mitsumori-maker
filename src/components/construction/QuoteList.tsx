"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Crown,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Calendar,
  Users,
  X,
} from "lucide-react";
import QuoteListItem from "@/components/construction/QuoteListItem";
import { ConstructionQuoteRow } from "@/lib/supabase/types";

interface Props {
  quotes: ConstructionQuoteRow[];
  plan: string;
  freeLimit: number;
}

type SortKey = "createdDesc" | "createdAsc" | "totalDesc" | "totalAsc";
type PeriodKey =
  | "all"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

const PERIOD_OPTIONS: { value: PeriodKey; label: string }[] = [
  { value: "all", label: "全期間" },
  { value: "thisMonth", label: "今月" },
  { value: "lastMonth", label: "先月" },
  { value: "last3Months", label: "直近3ヶ月" },
  { value: "thisYear", label: "今年" },
];

function getPeriodRange(period: PeriodKey): [Date, Date] | null {
  if (period === "all") return null;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  if (period === "thisMonth") {
    return [new Date(y, m, 1), new Date(y, m + 1, 1)];
  }
  if (period === "lastMonth") {
    return [new Date(y, m - 1, 1), new Date(y, m, 1)];
  }
  if (period === "last3Months") {
    return [new Date(y, m - 2, 1), new Date(y, m + 1, 1)];
  }
  if (period === "thisYear") {
    return [new Date(y, 0, 1), new Date(y + 1, 0, 1)];
  }
  return null;
}

function formatMonthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(key: string): string {
  const [y, m] = key.split("-");
  return `${y}年${parseInt(m, 10)}月`;
}

export default function QuoteList({ quotes, plan, freeLimit }: Props) {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<PeriodKey>("all");
  const [clientFilter, setClientFilter] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("createdDesc");

  const clientOptions = useMemo(() => {
    const set = new Set<string>();
    for (const q of quotes) {
      if (q.client_name) set.add(q.client_name);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
  }, [quotes]);

  const filtered = useMemo(() => {
    let rows = quotes;

    const range = getPeriodRange(period);
    if (range) {
      const [start, end] = range;
      rows = rows.filter((q) => {
        const d = new Date(q.created_at);
        return d >= start && d < end;
      });
    }

    if (clientFilter) {
      rows = rows.filter((q) => q.client_name === clientFilter);
    }

    const qTrim = query.trim().toLowerCase();
    if (qTrim) {
      rows = rows.filter(
        (row) =>
          (row.subject ?? "").toLowerCase().includes(qTrim) ||
          (row.client_name ?? "").toLowerCase().includes(qTrim) ||
          (row.quote_number ?? "").toLowerCase().includes(qTrim),
      );
    }

    return rows;
  }, [quotes, period, clientFilter, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      switch (sort) {
        case "createdDesc":
          return +new Date(b.created_at) - +new Date(a.created_at);
        case "createdAsc":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "totalDesc":
          return b.total - a.total;
        case "totalAsc":
          return a.total - b.total;
      }
    });
    return arr;
  }, [filtered, sort]);

  const grouped = useMemo(() => {
    const map = new Map<string, ConstructionQuoteRow[]>();
    for (const q of sorted) {
      const key = formatMonthKey(new Date(q.created_at));
      const arr = map.get(key) ?? [];
      arr.push(q);
      map.set(key, arr);
    }
    return Array.from(map.entries()).sort((a, b) =>
      b[0].localeCompare(a[0]),
    );
  }, [sorted]);

  const totalAmount = useMemo(
    () => sorted.reduce((s, q) => s + q.total, 0),
    [sorted],
  );

  const hasActiveFilter =
    period !== "all" || clientFilter !== "" || query.trim() !== "";

  const clearFilters = () => {
    setPeriod("all");
    setClientFilter("");
    setQuery("");
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-base font-bold text-gray-900">見積履歴</h2>
        <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
          {sorted.length === quotes.length
            ? `${quotes.length} 件`
            : `${sorted.length} / ${quotes.length} 件`}
          {sorted.length > 0 && (
            <>
              <span className="text-gray-300">/</span>
              <span className="font-bold text-gray-900 tabular-nums">
                合計 ¥{Math.round(totalAmount).toLocaleString("ja-JP")}
              </span>
            </>
          )}
        </div>
      </div>

      {quotes.length > 0 && (
        <>
          <div className="relative mb-3">
            <Search
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="件名・取引先・見積番号で検索"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-[11px] text-gray-500">
              <Calendar className="w-3.5 h-3.5" strokeWidth={2.25} />
              期間
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodKey)}
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white hover:border-kenmitsu-navy focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            >
              {PERIOD_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {clientOptions.length > 0 && (
              <>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 ml-1">
                  <Users className="w-3.5 h-3.5" strokeWidth={2.25} />
                  取引先
                </div>
                <select
                  value={clientFilter}
                  onChange={(e) => setClientFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white hover:border-kenmitsu-navy focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20 max-w-[200px] truncate"
                >
                  <option value="">すべて</option>
                  {clientOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex items-center gap-1 text-[11px] text-gray-500 ml-1">
              <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={2.25} />
              並び順
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white hover:border-kenmitsu-navy focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            >
              <option value="createdDesc">作成日（新しい順）</option>
              <option value="createdAsc">作成日（古い順）</option>
              <option value="totalDesc">金額（高い順）</option>
              <option value="totalAsc">金額（低い順）</option>
            </select>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-900 px-2 py-1"
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
                絞り込みを解除
              </button>
            )}
          </div>
        </>
      )}

      {plan === "free" && (
        <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-lg p-4 text-sm text-gray-700 mb-4 flex items-start gap-2">
          <Crown
            className="w-4 h-4 text-kenmitsu-orange shrink-0 mt-0.5"
            strokeWidth={2.25}
          />
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
            className="text-kenmitsu-navy hover:underline ml-1"
          >
            最初の見積書を作成する →
          </Link>
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-500">
          該当する見積書はありません。
          {hasActiveFilter && (
            <>
              {" "}
              <button
                type="button"
                onClick={clearFilters}
                className="text-kenmitsu-navy hover:underline"
              >
                絞り込みを解除
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([monthKey, rows]) => {
            const monthSum = rows.reduce((s, q) => s + q.total, 0);
            return (
              <div key={monthKey}>
                <div className="flex items-center justify-between gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-t-lg">
                  <h3 className="text-xs font-bold text-gray-900">
                    {formatMonthLabel(monthKey)}
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    {rows.length} 件 /{" "}
                    <span className="font-bold text-gray-900 tabular-nums">
                      ¥{Math.round(monthSum).toLocaleString("ja-JP")}
                    </span>
                  </span>
                </div>

                {/* デスクトップ: テーブルヘッダー */}
                <div className="hidden md:grid grid-cols-[72px_100px_1fr_160px_120px_auto] gap-3 px-4 py-2 border-x border-gray-100 bg-white text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  <button
                    type="button"
                    onClick={() =>
                      setSort(
                        sort === "createdDesc" ? "createdAsc" : "createdDesc",
                      )
                    }
                    className="inline-flex items-center gap-1 hover:text-gray-700 text-left"
                  >
                    日付
                    <SortIcon
                      active={sort === "createdDesc" || sort === "createdAsc"}
                      asc={sort === "createdAsc"}
                    />
                  </button>
                  <span>見積番号</span>
                  <span>件名</span>
                  <span>取引先</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSort(sort === "totalDesc" ? "totalAsc" : "totalDesc")
                    }
                    className="inline-flex items-center gap-1 hover:text-gray-700 text-right justify-end"
                  >
                    金額
                    <SortIcon
                      active={sort === "totalDesc" || sort === "totalAsc"}
                      asc={sort === "totalAsc"}
                    />
                  </button>
                  <span className="text-right">操作</span>
                </div>

                <ul className="divide-y divide-gray-100 border border-gray-100 md:border-x md:border-b md:border-t-0 rounded-b-lg md:rounded-t-none overflow-hidden">
                  {rows.map((q) => (
                    <QuoteListItem key={q.id} quote={q} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SortIcon({ active, asc }: { active: boolean; asc: boolean }) {
  if (!active)
    return <ArrowUpDown className="w-3 h-3 opacity-40" strokeWidth={2.5} />;
  return asc ? (
    <ArrowUp className="w-3 h-3" strokeWidth={2.5} />
  ) : (
    <ArrowDown className="w-3 h-3" strokeWidth={2.5} />
  );
}
