import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";
import { fetchAdminStats } from "@/lib/supabase/admin-queries";
import { isAdmin } from "@/lib/admin";
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

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  const { user } = await getCurrentUserProfile();
  if (!user) {
    redirect("/construction/login?redirect=/construction/admin");
  }
  if (!isAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="text-sm text-red-700 font-bold mb-2">
            管理者権限がありません
          </p>
          <p className="text-xs text-gray-500">
            ADMIN_EMAILS 環境変数に登録されたメールアドレスのみアクセス可能です。
          </p>
          <Link
            href="/construction/mypage"
            className="inline-block mt-4 text-xs text-green-700 hover:underline"
          >
            マイページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const stats = await fetchAdminStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/construction/mypage"
            className="flex items-center gap-2 text-sm font-bold"
          >
            <HardHat className="w-5 h-5 text-green-400" strokeWidth={2.25} />
            <span>
              管理ダッシュボード <span className="text-green-400">(Admin)</span>
            </span>
          </Link>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
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
          <Panel title="最近のユーザー登録">
            {stats.recentSignups.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">
                まだ登録がありません
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 text-sm">
                {stats.recentSignups.map((u, i) => (
                  <li key={i} className="py-2 flex items-center justify-between">
                    <span className="truncate flex-1">{u.email}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded mx-2 bg-gray-100 text-gray-700">
                      {u.plan.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {new Date(u.created_at).toLocaleDateString("ja-JP")}
                    </span>
                  </li>
                ))}
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
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
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
                    className="text-xs text-green-700 hover:underline inline-flex items-center gap-1"
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
    green: "bg-green-50 text-green-700 border-green-200",
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
