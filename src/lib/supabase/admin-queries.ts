/**
 * 管理画面用の集計クエリ（service_role 経由）。
 * RLS を跨いで集計する必要があるため service_role を使う。
 */
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

function getAdminClient() {
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY 未設定");
  return createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}

export interface RevenueKpi {
  mrr: number;
  soloCount: number;
  teamCount: number;
  cvr: number; // paid / total (%)
  churnCount30d: number;
  churnRate30d: number; // churn / (paid + churn) (%)
  avgQuotesPerUser: number;
}

export interface AdminStats {
  users: {
    total: number;
    paid: number;
    free: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  revenue: RevenueKpi;
  quotes: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  subscribers: {
    total: number;
    thisWeek: number;
  };
  videos: {
    success: number;
    failed: number;
    latest: { title: string; youtube_url: string | null; posted_at: string } | null;
  };
  referralLeaderboard: Array<{
    email: string;
    invited_count: number;
  }>;
  recentSignups: Array<{
    email: string;
    plan: string;
    created_at: string;
  }>;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const supabase = getAdminClient();

  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // JST 換算は表示用
  void jst;

  const startOfDay = new Date(now);
  startOfDay.setUTCHours(-9, 0, 0, 0); // JST 0時 = UTC -9時
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);
  const startOfMonth = new Date(now);
  startOfMonth.setDate(now.getDate() - 30);

  // Users
  const [{ count: totalUsers }, { count: paidUsers }, { count: todayUsers }, { count: weekUsers }, { count: monthUsers }] =
    await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .in("plan", ["solo", "team"]),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfDay.toISOString()),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfWeek.toISOString()),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString()),
    ]);

  // Quotes
  const [{ count: totalQuotes }, { count: todayQuotes }, { count: weekQuotes }, { count: monthQuotes }] =
    await Promise.all([
      supabase
        .from("construction_quotes")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null),
      supabase
        .from("construction_quotes")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", startOfDay.toISOString()),
      supabase
        .from("construction_quotes")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", startOfWeek.toISOString()),
      supabase
        .from("construction_quotes")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", startOfMonth.toISOString()),
    ]);

  // Revenue KPI
  const { count: soloCount } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("plan", "solo")
    .in("subscription_status", ["active", "trialing"]);
  const { count: teamCount } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("plan", "team")
    .in("subscription_status", ["active", "trialing"]);
  const { count: churnCount30d } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("subscription_status", "canceled")
    .gte("updated_at", startOfMonth.toISOString());

  const soloN = soloCount ?? 0;
  const teamN = teamCount ?? 0;
  const paidN = paidUsers ?? 0;
  const totalN = totalUsers ?? 0;
  const churnN = churnCount30d ?? 0;
  const mrr = soloN * 980 + teamN * 2980;
  const cvr = totalN > 0 ? Math.round((paidN / totalN) * 1000) / 10 : 0;
  const churnBase = paidN + churnN;
  const churnRate30d = churnBase > 0 ? Math.round((churnN / churnBase) * 1000) / 10 : 0;

  // Avg quotes per user
  const avgQuotesPerUser =
    totalN > 0
      ? Math.round(((totalQuotes ?? 0) / totalN) * 10) / 10
      : 0;

  // Newsletter subscribers
  const [{ count: totalSubs }, { count: weekSubs }] = await Promise.all([
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfWeek.toISOString()),
  ]);

  // Video posts
  const { data: videoLogs } = await supabase
    .from("video_post_logs")
    .select("title, youtube_url, posted_at, status")
    .order("posted_at", { ascending: false })
    .limit(30);

  const videoSuccess = (videoLogs ?? []).filter((v) => v.status === "success").length;
  const videoFailed = (videoLogs ?? []).filter((v) => v.status === "failed").length;
  const latestSuccess = (videoLogs ?? []).find((v) => v.status === "success");

  // Referral leaderboard — top 10 inviter
  // 各 profile の id で referred_by カウント
  const { data: allProfiles } = await supabase
    .from("profiles")
    .select("id, email");
  const { data: referredRows } = await supabase
    .from("profiles")
    .select("referred_by")
    .not("referred_by", "is", null);

  const countMap = new Map<string, number>();
  (referredRows ?? []).forEach((r: { referred_by: string | null }) => {
    if (r.referred_by) {
      countMap.set(r.referred_by, (countMap.get(r.referred_by) ?? 0) + 1);
    }
  });
  const emailMap = new Map<string, string>();
  (allProfiles ?? []).forEach((p: { id: string; email: string }) => {
    emailMap.set(p.id, p.email);
  });
  const referralLeaderboard = Array.from(countMap.entries())
    .map(([id, count]) => ({
      email: emailMap.get(id) ?? "(unknown)",
      invited_count: count,
    }))
    .sort((a, b) => b.invited_count - a.invited_count)
    .slice(0, 10);

  // Recent signups
  const { data: recentSignups } = await supabase
    .from("profiles")
    .select("email, plan, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    users: {
      total: totalUsers ?? 0,
      paid: paidUsers ?? 0,
      free: (totalUsers ?? 0) - (paidUsers ?? 0),
      today: todayUsers ?? 0,
      thisWeek: weekUsers ?? 0,
      thisMonth: monthUsers ?? 0,
    },
    revenue: {
      mrr,
      soloCount: soloN,
      teamCount: teamN,
      cvr,
      churnCount30d: churnN,
      churnRate30d,
      avgQuotesPerUser,
    },
    quotes: {
      total: totalQuotes ?? 0,
      today: todayQuotes ?? 0,
      thisWeek: weekQuotes ?? 0,
      thisMonth: monthQuotes ?? 0,
    },
    subscribers: {
      total: totalSubs ?? 0,
      thisWeek: weekSubs ?? 0,
    },
    videos: {
      success: videoSuccess,
      failed: videoFailed,
      latest: latestSuccess
        ? {
            title: (latestSuccess as { title: string }).title,
            youtube_url: (latestSuccess as { youtube_url: string | null }).youtube_url,
            posted_at: (latestSuccess as { posted_at: string }).posted_at,
          }
        : null,
    },
    referralLeaderboard,
    recentSignups:
      (recentSignups as { email: string; plan: string; created_at: string }[]) ?? [],
  };
}
