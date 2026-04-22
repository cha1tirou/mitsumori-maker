import { BetaAnalyticsDataClient } from "@google-analytics/data";

/**
 * GA4 Data API 用のクライアント生成。
 *
 * 認証: サービスアカウントの JSON キーを Base64 でまるごと
 *       環境変数 GA4_SA_KEY_B64 に格納する前提。
 *       Vercel 上では改行含む JSON を 1 行 env var に入れるのが困難なため
 *       base64 エンコードで格納・実行時デコードの形を採用。
 *
 * GA4 プロパティ ID は環境変数 GA4_PROPERTY_ID（9 桁の数字）。
 */

let cachedClient: BetaAnalyticsDataClient | null = null;

export function isGa4DataApiConfigured(): boolean {
  return Boolean(
    process.env.GA4_SA_KEY_B64 && process.env.GA4_PROPERTY_ID,
  );
}

function getClient(): BetaAnalyticsDataClient {
  if (cachedClient) return cachedClient;
  const b64 = process.env.GA4_SA_KEY_B64;
  if (!b64) {
    throw new Error(
      "GA4_SA_KEY_B64 未設定。サービスアカウント JSON を base64 にして環境変数に設定してください。",
    );
  }
  const credentials = JSON.parse(
    Buffer.from(b64, "base64").toString("utf-8"),
  );
  cachedClient = new BetaAnalyticsDataClient({ credentials });
  return cachedClient;
}

function getPropertyPath(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) {
    throw new Error("GA4_PROPERTY_ID 未設定");
  }
  return `properties/${id}`;
}

export interface EventCountRow {
  eventName: string;
  count: number;
}

/**
 * 指定期間のイベント数を取得。
 * startDate / endDate は YYYY-MM-DD、または "NdaysAgo" / "today" / "yesterday"
 */
export async function getEventCounts(
  startDate: string,
  endDate: string,
  eventNames?: string[],
): Promise<EventCountRow[]> {
  const client = getClient();
  const [resp] = await client.runReport({
    property: getPropertyPath(),
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: eventNames
      ? {
          filter: {
            fieldName: "eventName",
            inListFilter: { values: eventNames },
          },
        }
      : undefined,
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 100,
  });
  return (
    resp.rows?.map((r) => ({
      eventName: r.dimensionValues?.[0]?.value ?? "",
      count: Number(r.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}

export interface PagePathRow {
  pagePath: string;
  sessions: number;
  users: number;
  engagementRate: number;
}

/**
 * 指定期間の LP 流入の上位ページ。
 */
export async function getTopLandingPages(
  startDate: string,
  endDate: string,
  pagePathPrefix = "/construction",
  limit = 20,
): Promise<PagePathRow[]> {
  const client = getClient();
  const [resp] = await client.runReport({
    property: getPropertyPath(),
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "landingPage" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "engagementRate" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "landingPage",
        stringFilter: {
          matchType: "BEGINS_WITH",
          value: pagePathPrefix,
        },
      },
    },
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });
  return (
    resp.rows?.map((r) => ({
      pagePath: r.dimensionValues?.[0]?.value ?? "",
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
      users: Number(r.metricValues?.[1]?.value ?? 0),
      engagementRate: Number(r.metricValues?.[2]?.value ?? 0),
    })) ?? []
  );
}

export interface SourceMediumRow {
  source: string;
  medium: string;
  sessions: number;
  users: number;
}

/**
 * 指定期間の流入元（source/medium）分析。Google 広告の効果確認用。
 */
export async function getTrafficSources(
  startDate: string,
  endDate: string,
  limit = 20,
): Promise<SourceMediumRow[]> {
  const client = getClient();
  const [resp] = await client.runReport({
    property: getPropertyPath(),
    dateRanges: [{ startDate, endDate }],
    dimensions: [
      { name: "sessionSource" },
      { name: "sessionMedium" },
    ],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });
  return (
    resp.rows?.map((r) => ({
      source: r.dimensionValues?.[0]?.value ?? "",
      medium: r.dimensionValues?.[1]?.value ?? "",
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
      users: Number(r.metricValues?.[1]?.value ?? 0),
    })) ?? []
  );
}

/**
 * 指定期間の construction 系ページに絞ったコンバージョンファネル。
 */
export async function getConstructionFunnel(
  startDate: string,
  endDate: string,
): Promise<{
  totalUsers: number;
  events: EventCountRow[];
}> {
  const eventNames = [
    "construction_lp_view",
    "construction_pricing_view",
    "construction_tool_start",
    "construction_pdf_download",
    "construction_signup",
    "construction_subscribe_solo",
  ];
  const events = await getEventCounts(startDate, endDate, eventNames);

  const client = getClient();
  const [usersResp] = await client.runReport({
    property: getPropertyPath(),
    dateRanges: [{ startDate, endDate }],
    metrics: [{ name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "landingPage",
        stringFilter: {
          matchType: "BEGINS_WITH",
          value: "/construction",
        },
      },
    },
  });
  const totalUsers = Number(
    usersResp.rows?.[0]?.metricValues?.[0]?.value ?? 0,
  );

  return { totalUsers, events };
}
