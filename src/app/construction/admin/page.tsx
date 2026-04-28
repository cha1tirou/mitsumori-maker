import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { fetchAdminStats, detectSchemaDrift, checkConfigHealth } from "@/lib/supabase/admin-queries";
import {
  HardHat,
  Users,
  FileText,
  Mail,
  Video,
  Crown,
  TrendingUp,
  ExternalLink,
  DollarSign,
  BarChart3,
  UserMinus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "管理ダッシュボード | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 認証は Edge Middleware の Basic 認証のみ（ADMIN_BASIC_AUTH_USER/PASS）
  // Supabase ログイン + ADMIN_EMAILS の二重ガードは 2026-04-28 に撤廃（運用負荷
  // 軽減のため）。Basic 認証の ID/PW を強固に保つこと。
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-600">
            管理画面は Supabase 連携後にご利用いただけます。
          </p>
        </div>
      </div>
    );
  }

  const [stats, missingColumns] = await Promise.all([
    fetchAdminStats(),
    detectSchemaDrift(),
  ]);
  const configItems = checkConfigHealth();
  const missingConfig = configItems.filter((c) => !c.ok);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/construction/mypage"
            className="flex items-center gap-2 text-sm font-bold"
          >
            <HardHat className="w-5 h-5 text-kenmitsu-orange" strokeWidth={2.25} />
            <span>
              管理ダッシュボード <span className="text-kenmitsu-orange">(Admin)</span>
            </span>
          </Link>
          <div className="text-xs text-gray-400">Basic Auth 経由</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {missingColumns.length > 0 && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
            <p className="font-bold text-red-900 text-sm mb-1">
              🚨 Schema drift 検出: profiles に列欠落
            </p>
            <p className="text-xs text-red-800 mb-2">
              欠落列: <code className="bg-red-100 px-1.5 py-0.5 rounded">{missingColumns.join(", ")}</code>
            </p>
            <p className="text-xs text-red-800">
              対処: <code>supabase/schema.sql</code> 該当の <code>alter table ... add column if not exists</code> を Supabase SQL Editor で実行してください。
            </p>
          </div>
        )}

        {/* Config health: 環境変数欠落 */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              設定ヘルス
              {missingConfig.length > 0 ? (
                <span className="ml-2 text-xs font-bold text-red-600">
                  ⚠️ {missingConfig.length} 件欠落
                </span>
              ) : (
                <span className="ml-2 text-xs font-bold text-kenmitsu-ok">
                  ✓ 全項目 OK
                </span>
              )}
            </h2>
            <span className="text-xs text-gray-500">広告 / 課金 / メールに必須</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {(["core", "billing", "email", "ads"] as const).map((cat) => {
              const items = configItems.filter((c) => c.category === cat);
              const catLabel = { core: "コア", billing: "課金", email: "メール", ads: "広告計測" }[cat];
              return (
                <div key={cat} className="py-1">
                  <p className="font-bold text-gray-700 mb-1">{catLabel}</p>
                  <ul className="space-y-0.5">
                    {items.map((c) => (
                      <li key={c.key} className={c.ok ? "text-gray-600" : "text-red-700 font-medium"}>
                        {c.ok ? "✓" : "✗"} <span className="font-mono text-[11px]">{c.key}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          {missingConfig.some((c) => c.category === "ads") && (
            <p className="text-xs text-red-700 mt-3">
              ⚠️ 広告 conversion 計測の env 欠落 → Google Ads が課金成立を学習できず、広告費が無駄になります。Vercel の環境変数を確認してください。
            </p>
          )}
        </section>

        {/* KPI カード */}
        <section className="grid md:grid-cols-4 gap-4">
          <KpiCard
            icon={<Users className="w-5 h-5" strokeWidth={2} />}
            label="総ユーザー数"
            value={stats.users.total}
            sub={`今日 +${stats.users.today} / 週 +${stats.users.thisWeek}`}
            color="blue"
          />
          <KpiCard
            icon={<Crown className="w-5 h-5" strokeWidth={2} />}
            label="有料ユーザー"
            value={stats.users.paid}
            sub={`無料 ${stats.users.free}`}
            color="amber"
          />
          <KpiCard
            icon={<FileText className="w-5 h-5" strokeWidth={2} />}
            label="見積書（総数）"
            value={stats.quotes.total}
            sub={`今日 +${stats.quotes.today} / 週 +${stats.quotes.thisWeek}`}
            color="green"
          />
          <KpiCard
            icon={<Mail className="w-5 h-5" strokeWidth={2} />}
            label="メルマガ登録"
            value={stats.subscribers.total}
            sub={`今週 +${stats.subscribers.thisWeek}`}
            color="purple"
          />
        </section>

        {/* 収益 KPI */}
        <section className="grid md:grid-cols-4 gap-4">
          <KpiCard
            icon={<DollarSign className="w-5 h-5" strokeWidth={2} />}
            label="MRR（月間売上）"
            value={`¥${stats.revenue.mrr.toLocaleString()}`}
            sub={`Solo ${stats.revenue.soloCount}名 / Team ${stats.revenue.teamCount}名`}
            color="green"
          />
          <KpiCard
            icon={<BarChart3 className="w-5 h-5" strokeWidth={2} />}
            label="CVR（Free→有料）"
            value={`${stats.revenue.cvr}%`}
            sub={`有料 ${stats.users.paid} / 全体 ${stats.users.total}`}
            color="blue"
          />
          <KpiCard
            icon={<UserMinus className="w-5 h-5" strokeWidth={2} />}
            label="Churn Rate（30日）"
            value={`${stats.revenue.churnRate30d}%`}
            sub={`解約 ${stats.revenue.churnCount30d}名（直近30日）`}
            color="amber"
          />
          <KpiCard
            icon={<FileText className="w-5 h-5" strokeWidth={2} />}
            label="平均見積数/ユーザー"
            value={stats.revenue.avgQuotesPerUser}
            sub="アクティブ度の指標"
            color="purple"
          />
        </section>

        {/* 最近の登録 & リファラルリーダーボード */}
        <section className="grid md:grid-cols-2 gap-6">
          <Panel title="最近のユーザー登録（見積書活動付き）">
            {stats.recentSignups.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">
                まだ登録がありません
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 text-sm">
                {stats.recentSignups.map((u, i) => {
                  const isActive = u.quotes_count > 0;
                  return (
                    <li key={i} className="py-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="truncate flex-1 text-[13px]">
                          {u.email}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {u.plan.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10.5px] text-gray-500 pl-1">
                        <span>
                          登録: {new Date(u.created_at).toLocaleDateString("ja-JP")}
                        </span>
                        <span
                          className={
                            isActive
                              ? "font-bold text-kenmitsu-ok"
                              : "text-gray-400"
                          }
                        >
                          見積書: {u.quotes_count}件
                        </span>
                        {u.last_active && (
                          <span className="text-gray-400">
                            最終: {new Date(u.last_active).toLocaleDateString("ja-JP")}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <Panel title="リファラル・リーダーボード">
            {stats.referralLeaderboard.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">
                まだ紹介がありません
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 text-sm">
                {stats.referralLeaderboard.map((r, i) => (
                  <li key={i} className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-gray-400 w-6">
                        #{i + 1}
                      </span>
                      <span className="truncate">{r.email}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-kenmitsu-ok">
                      <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                      {r.invited_count}名
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </section>

        {/* YouTube 動画状況 */}
        <section>
          <Panel title="YouTube 動画自動投稿ステータス">
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Metric label="成功" value={stats.videos.success} />
              <Metric label="失敗" value={stats.videos.failed} accent="red" />
              <Metric
                label="直近投稿"
                value={
                  stats.videos.latest
                    ? new Date(stats.videos.latest.posted_at).toLocaleDateString("ja-JP")
                    : "—"
                }
              />
            </div>
            {stats.videos.latest && (
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                <Video className="w-4 h-4 text-red-600 shrink-0" strokeWidth={2.25} />
                <span className="text-sm flex-1 truncate">
                  {stats.videos.latest.title}
                </span>
                {stats.videos.latest.youtube_url && (
                  <a
                    href={stats.videos.latest.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-kenmitsu-navy hover:underline inline-flex items-center gap-1"
                  >
                    見る
                    <ExternalLink className="w-3 h-3" strokeWidth={2.25} />
                  </a>
                )}
              </div>
            )}
          </Panel>
        </section>

        <p className="text-[11px] text-gray-400 text-center pt-4">
          このページは運営者のみ閲覧可能です。ADMIN_EMAILS 環境変数で制御されています。
        </p>
      </main>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub: string;
  color: "blue" | "green" | "amber" | "purple";
}) {
  const bgMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-kenmitsu-okBg text-kenmitsu-ok border-kenmitsu-ok/30",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">{label}</p>
        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bgMap[color]}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: "red";
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-500 mb-1">{label}</p>
      <p
        className={`text-lg font-bold ${
          accent === "red" ? "text-red-700" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
