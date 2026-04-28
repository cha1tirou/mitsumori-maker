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

/**
 * profiles テーブルの必須列が prod DB に存在するかをプローブ。
 * 欠落列のリストを返す（empty なら正常）。
 *
 * 用途: admin ダッシュボードで schema drift を可視化。
 * schema.sql 側で alter table add column if not exists を書いていても、
 * Supabase に SQL Editor で適用し忘れると silent fail するので、毎回確認。
 */
const REQUIRED_PROFILE_COLUMNS = [
  "id",
  "email",
  "plan",
  "created_at",
  "drip_sent",
  "stripe_customer_id",
  "subscription_status",
] as const;

export async function detectSchemaDrift(): Promise<string[]> {
  const supabase = getAdminClient();
  const missing: string[] = [];
  await Promise.all(
    REQUIRED_PROFILE_COLUMNS.map(async (col) => {
      const { error } = await supabase
        .from("profiles")
        .select(`id, ${col}`)
        .limit(1);
      if (error && /column .+ does not exist/i.test(error.message)) {
        missing.push(col);
      }
    }),
  );
  return missing;
}

/**
 * 広告ファネル・課金に必須の環境変数をチェック。
 * 不足があると ad spend が無駄になる（conversion 計測されない・checkout 失敗）。
 *
 * カテゴリ:
 * - core: サービス起動に必須
 * - billing: Stripe 課金導線に必須
 * - email: ドリップメール・登録メールに必須
 * - ads: 広告 conversion 計測に必須
 */
export interface ConfigHealthItem {
  key: string;
  label: string;
  category: "core" | "billing" | "email" | "ads";
  ok: boolean;
}

export function checkConfigHealth(): ConfigHealthItem[] {
  const has = (k: string) => Boolean(process.env[k]?.trim());
  return [
    { key: "NEXT_PUBLIC_SUPABASE_URL", label: "Supabase URL (public)", category: "core", ok: has("NEXT_PUBLIC_SUPABASE_URL") },
    { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", label: "Supabase anon key", category: "core", ok: has("NEXT_PUBLIC_SUPABASE_ANON_KEY") },
    { key: "SUPABASE_SERVICE_ROLE_KEY", label: "Supabase service role", category: "core", ok: has("SUPABASE_SERVICE_ROLE_KEY") },
    { key: "CRON_SECRET", label: "Cron secret", category: "core", ok: has("CRON_SECRET") },
    { key: "ADMIN_BASIC_AUTH_USER", label: "Admin Basic Auth user", category: "core", ok: has("ADMIN_BASIC_AUTH_USER") },
    { key: "ADMIN_BASIC_AUTH_PASS", label: "Admin Basic Auth pass", category: "core", ok: has("ADMIN_BASIC_AUTH_PASS") },

    { key: "STRIPE_SECRET_KEY", label: "Stripe secret key", category: "billing", ok: has("STRIPE_SECRET_KEY") },
    { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", label: "Stripe publishable key", category: "billing", ok: has("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY") },
    { key: "STRIPE_WEBHOOK_SECRET", label: "Stripe webhook secret", category: "billing", ok: has("STRIPE_WEBHOOK_SECRET") },
    { key: "STRIPE_PRICE_SOLO_MONTHLY", label: "Stripe Solo 月額 Price ID", category: "billing", ok: has("STRIPE_PRICE_SOLO_MONTHLY") },
    { key: "STRIPE_PRICE_SOLO_YEARLY", label: "Stripe Solo 年額 Price ID", category: "billing", ok: has("STRIPE_PRICE_SOLO_YEARLY") },

    { key: "RESEND_API_KEY", label: "Resend API key", category: "email", ok: has("RESEND_API_KEY") },
    { key: "RESEND_FROM_EMAIL", label: "Resend 送信元メール", category: "email", ok: has("RESEND_FROM_EMAIL") },

    { key: "NEXT_PUBLIC_GOOGLE_ADS_ID", label: "Google Ads コンバージョン ID", category: "ads", ok: has("NEXT_PUBLIC_GOOGLE_ADS_ID") },
    { key: "NEXT_PUBLIC_GADS_CONV_SIGNUP", label: "Google Ads: 登録 conversion", category: "ads", ok: has("NEXT_PUBLIC_GADS_CONV_SIGNUP") },
    { key: "NEXT_PUBLIC_GADS_CONV_SUB_SOLO", label: "Google Ads: 課金 conversion", category: "ads", ok: has("NEXT_PUBLIC_GADS_CONV_SUB_SOLO") },
  ];
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
    /** その人が作成した見積書数（deleted_at is null のみ） */
    quotes_count: number;
    /** その人の最終見積書更新日時（活動の最新タイムスタンプ） */
    last_active: string | null;
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
  const mrr = soloN * 1980 + teamN * 2980;
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

  // Recent signups（直近 10 名・各人の見積書活動付き）
  const { data: recentSignupsRaw } = await supabase
    .from("profiles")
    .select("id, email, plan, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const recentSignupIds = (recentSignupsRaw ?? []).map((r) => r.id as string);
  const { data: quotesByUser } = recentSignupIds.length > 0
    ? await supabase
        .from("construction_quotes")
        .select("user_id, updated_at")
        .in("user_id", recentSignupIds)
        .is("deleted_at", null)
    : { data: [] };

  const quotesMap = new Map<string, { count: number; lastActive: string | null }>();
  (quotesByUser ?? []).forEach((q: { user_id: string; updated_at: string }) => {
    const cur = quotesMap.get(q.user_id) ?? { count: 0, lastActive: null };
    cur.count += 1;
    if (!cur.lastActive || q.updated_at > cur.lastActive) {
      cur.lastActive = q.updated_at;
    }
    quotesMap.set(q.user_id, cur);
  });

  const recentSignups = (recentSignupsRaw ?? []).map(
    (r: { id: string; email: string; plan: string; created_at: string }) => {
      const activity = quotesMap.get(r.id) ?? { count: 0, lastActive: null };
      return {
        email: r.email,
        plan: r.plan,
        created_at: r.created_at,
        quotes_count: activity.count,
        last_active: activity.lastActive,
      };
    },
  );

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
    recentSignups,
  };
}
