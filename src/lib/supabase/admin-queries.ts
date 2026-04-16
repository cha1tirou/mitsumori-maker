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

export interface AdminStats {
  users: {
    total: number;
    paid: number;
    free: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
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
