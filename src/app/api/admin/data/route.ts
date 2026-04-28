import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 管理画面用の JSON データ API（事前定義クエリのみ）。
 *
 * 認証: Edge Middleware の Basic 認証（ADMIN_BASIC_AUTH_USER/PASS）。
 *      raw SQL を受け付けないので SQL injection リスクなし。
 *
 * 用途: Claude Code セッション内から curl で叩いてデータ取得・分析する。
 *
 * クエリ例:
 *   GET /api/admin/data?q=recent_signups
 *   GET /api/admin/data?q=user&email=info@woodbell-koubou.com
 *   GET /api/admin/data?q=summary
 *   GET /api/admin/data?q=quotes_recent&limit=20
 *   GET /api/admin/data?q=drip_status
 */
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json(
      { error: "Service role missing" },
      { status: 503 },
    );
  }

  const { url } = getSupabaseEnv();
  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  switch (q) {
    case "recent_signups":
      return await recentSignups(supabase, searchParams);
    case "user":
      return await userDetail(supabase, searchParams);
    case "summary":
      return await summary(supabase);
    case "quotes_recent":
      return await quotesRecent(supabase, searchParams);
    case "drip_status":
      return await dripStatus(supabase, searchParams);
    case "schema_check":
      return await schemaCheck(supabase);
    case "help":
    case null:
      return NextResponse.json({
        endpoints: {
          recent_signups: "?q=recent_signups&limit=20 — 直近登録（見積書活動付き）",
          user: "?q=user&email=foo@bar.com — 特定ユーザー詳細",
          summary: "?q=summary — 集計指標（KPI）",
          quotes_recent: "?q=quotes_recent&limit=20 — 最新見積書一覧",
          drip_status: "?q=drip_status&limit=20 — ドリップメール送信状況",
          schema_check: "?q=schema_check — profiles の列ごとに select 試行",
        },
      });
    default:
      return NextResponse.json(
        { error: `Unknown query: ${q}. Use ?q=help for list.` },
        { status: 400 },
      );
  }
}

type Supabase = ReturnType<typeof createServerClient>;

/** 直近登録ユーザー + 見積書数 + 最終アクティブ */
async function recentSignups(supabase: Supabase, params: URLSearchParams) {
  const limit = Math.min(parseInt(params.get("limit") ?? "20", 10) || 20, 100);

  // profiles テーブル直接 select（email・plan・created_at・drip_sent）
  const { data: signups, error: signupsErr } = await supabase
    .from("profiles")
    .select("id, email, plan, created_at, drip_sent")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (signupsErr) {
    return NextResponse.json(
      {
        error: "profiles query failed",
        message: signupsErr.message,
        details: signupsErr,
      },
      { status: 500 },
    );
  }

  if (!signups || signups.length === 0) {
    return NextResponse.json({ count: 0, users: [], note: "profiles 0 rows returned" });
  }

  const ids = signups.map((s: { id: string }) => s.id);
  const { data: quotes, error: quotesErr } = await supabase
    .from("construction_quotes")
    .select("user_id, updated_at")
    .in("user_id", ids)
    .is("deleted_at", null);

  if (quotesErr) {
    return NextResponse.json(
      {
        error: "quotes query failed",
        message: quotesErr.message,
        signups_count: signups.length,
      },
      { status: 500 },
    );
  }

  const map = new Map<string, { count: number; lastActive: string | null }>();
  (quotes ?? []).forEach((q: { user_id: string; updated_at: string }) => {
    const cur = map.get(q.user_id) ?? { count: 0, lastActive: null };
    cur.count += 1;
    if (!cur.lastActive || q.updated_at > cur.lastActive) {
      cur.lastActive = q.updated_at;
    }
    map.set(q.user_id, cur);
  });

  const users = signups.map(
    (s: {
      id: string;
      email: string | null;
      plan: string;
      created_at: string;
      drip_sent: unknown;
    }) => {
      const a = map.get(s.id) ?? { count: 0, lastActive: null };
      return {
        id: s.id,
        email: s.email,
        plan: s.plan,
        created_at: s.created_at,
        quotes_count: a.count,
        last_active: a.lastActive,
        drip_sent: s.drip_sent,
      };
    },
  );

  return NextResponse.json({ count: users.length, users });
}

/** 特定ユーザーの詳細（活動 + 見積書一覧） */
async function userDetail(supabase: Supabase, params: URLSearchParams) {
  const email = params.get("email");
  if (!email) {
    return NextResponse.json(
      { error: "email parameter is required" },
      { status: 400 },
    );
  }

  // 1) profiles.email で検索
  let { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select(
      "id, email, plan, subscription_status, created_at, drip_sent, stripe_customer_id, current_period_end, company_info, referred_by",
    )
    .eq("email", email)
    .maybeSingle();

  if (profileErr) {
    return NextResponse.json(
      { error: "profiles query failed", message: profileErr.message },
      { status: 500 },
    );
  }

  // 2) 見つからなければ auth.admin から id を引いて profiles を取得
  if (!profile) {
    const { data: authData, error: authErr } =
      await supabase.auth.admin.listUsers();
    if (authErr) {
      return NextResponse.json(
        {
          error: "User not found in profiles, and auth.admin lookup failed",
          message: authErr.message,
        },
        { status: 500 },
      );
    }
    const authUser = authData.users.find(
      (u: { email?: string | null }) =>
        u.email?.toLowerCase() === email.toLowerCase(),
    );
    if (!authUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { data: profileById } = await supabase
      .from("profiles")
      .select(
        "id, email, plan, subscription_status, created_at, drip_sent, stripe_customer_id, current_period_end, company_info, referred_by",
      )
      .eq("id", authUser.id)
      .maybeSingle();
    profile = profileById;
    if (!profile) {
      return NextResponse.json(
        {
          error: "User found in auth.users but no profiles row",
          auth_user_id: authUser.id,
        },
        { status: 404 },
      );
    }
  }

  const { data: quotes } = await supabase
    .from("construction_quotes")
    .select(
      "id, quote_number, client_name, subject, total, created_at, updated_at",
    )
    .eq("user_id", profile.id as string)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    profile,
    quotes_count: (quotes ?? []).length,
    quotes: quotes ?? [],
  });
}

/** 集計指標（KPI） */
async function summary(supabase: Supabase) {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(-9, 0, 0, 0);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);
  const startOfMonth = new Date(now);
  startOfMonth.setDate(now.getDate() - 30);

  const [
    { count: totalUsers },
    { count: paidUsers },
    { count: todayUsers },
    { count: weekUsers },
    { count: totalQuotes },
    { count: weekQuotes },
    { count: soloCount },
    { count: teamCount },
    { count: churn30 },
  ] = await Promise.all([
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
      .from("construction_quotes")
      .select("id", { count: "exact", head: true })
      .is("deleted_at", null),
    supabase
      .from("construction_quotes")
      .select("id", { count: "exact", head: true })
      .is("deleted_at", null)
      .gte("created_at", startOfWeek.toISOString()),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("plan", "solo")
      .in("subscription_status", ["active", "trialing"]),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("plan", "team")
      .in("subscription_status", ["active", "trialing"]),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("subscription_status", "canceled")
      .gte("updated_at", startOfMonth.toISOString()),
  ]);

  const soloN = soloCount ?? 0;
  const teamN = teamCount ?? 0;
  const totalN = totalUsers ?? 0;
  const paidN = paidUsers ?? 0;
  const churnN = churn30 ?? 0;
  const mrr = soloN * 1980 + teamN * 2980;
  const cvr = totalN > 0 ? Math.round((paidN / totalN) * 1000) / 10 : 0;
  const churnBase = paidN + churnN;
  const churnRate = churnBase > 0 ? Math.round((churnN / churnBase) * 1000) / 10 : 0;

  return NextResponse.json({
    users: {
      total: totalN,
      paid: paidN,
      free: totalN - paidN,
      today: todayUsers ?? 0,
      thisWeek: weekUsers ?? 0,
    },
    quotes: {
      total: totalQuotes ?? 0,
      thisWeek: weekQuotes ?? 0,
    },
    revenue: {
      mrr,
      soloCount: soloN,
      teamCount: teamN,
      cvr,
      churnCount30d: churnN,
      churnRate30d: churnRate,
    },
  });
}

/** 最新見積書一覧 */
async function quotesRecent(supabase: Supabase, params: URLSearchParams) {
  const limit = Math.min(parseInt(params.get("limit") ?? "20", 10) || 20, 100);

  const { data: quotes, error: quotesErr } = await supabase
    .from("construction_quotes")
    .select(
      "id, user_id, quote_number, client_name, subject, total, created_at, updated_at",
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (quotesErr) {
    return NextResponse.json(
      { error: "quotes query failed", message: quotesErr.message, details: quotesErr },
      { status: 500 },
    );
  }

  if (!quotes || quotes.length === 0) {
    return NextResponse.json({ count: 0, quotes: [], note: "construction_quotes 0 rows" });
  }

  // user_id → email を引いて見やすく
  const userIds = Array.from(
    new Set(quotes.map((q: { user_id: string }) => q.user_id)),
  );
  const { data: users, error: usersErr } = await supabase
    .from("profiles")
    .select("id, email")
    .in("id", userIds);
  if (usersErr) {
    return NextResponse.json(
      {
        error: "profiles lookup failed",
        message: usersErr.message,
        quotes_count: quotes.length,
      },
      { status: 500 },
    );
  }
  const emailMap = new Map<string, string>();
  (users ?? []).forEach((u: { id: string; email: string }) => {
    emailMap.set(u.id, u.email);
  });

  const enriched = quotes.map((q: { user_id: string }) => ({
    ...q,
    user_email: emailMap.get(q.user_id) ?? "(unknown)",
  }));

  return NextResponse.json({ count: enriched.length, quotes: enriched });
}

/** ドリップメール送信状況 */
async function dripStatus(supabase: Supabase, params: URLSearchParams) {
  const limit = Math.min(parseInt(params.get("limit") ?? "20", 10) || 20, 100);

  const { data: profiles, error: profilesErr } = await supabase
    .from("profiles")
    .select("email, created_at, plan, drip_sent")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (profilesErr) {
    return NextResponse.json(
      { error: "profiles query failed", message: profilesErr.message, details: profilesErr },
      { status: 500 },
    );
  }

  return NextResponse.json({
    count: (profiles ?? []).length,
    users: profiles ?? [],
    note: (profiles ?? []).length === 0 ? "0 rows returned" : undefined,
  });
}

/** profiles の列ごとに select を試して、どの列で壊れるか切り分ける */
async function schemaCheck(supabase: Supabase) {
  const probes: Array<{ label: string; columns: string }> = [
    { label: "id_only", columns: "id" },
    { label: "id_email", columns: "id, email" },
    { label: "id_plan", columns: "id, plan" },
    { label: "id_created_at", columns: "id, created_at" },
    { label: "id_drip_sent", columns: "id, drip_sent" },
    { label: "id_referral_code", columns: "id, referral_code" },
    { label: "id_referred_by", columns: "id, referred_by" },
    { label: "id_subscription_status", columns: "id, subscription_status" },
    { label: "id_company_info", columns: "id, company_info" },
    { label: "all_combined", columns: "id, email, plan, created_at, drip_sent" },
  ];

  const results = await Promise.all(
    probes.map(async (p) => {
      const { data, error, count } = await supabase
        .from("profiles")
        .select(p.columns, { count: "exact" })
        .limit(1);
      return {
        label: p.label,
        columns: p.columns,
        ok: !error,
        rows_returned: data?.length ?? 0,
        total_count: count ?? null,
        error: error?.message ?? null,
      };
    }),
  );

  return NextResponse.json({ results });
}
