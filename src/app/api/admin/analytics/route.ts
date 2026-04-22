import { NextResponse, type NextRequest } from "next/server";
import {
  isGa4DataApiConfigured,
  getConstructionFunnel,
  getTopLandingPages,
  getTrafficSources,
} from "@/lib/analytics/ga4";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 管理者専用：GA4 Data API で主要指標を取得する。
 *
 * 認証: middleware.ts の Basic 認証（/api/admin/* を含める）で保護。
 *
 * クエリ:
 *   ?period=today|yesterday|7days|14days|28days  （既定 7days）
 *
 * レスポンス:
 *   {
 *     period: { start, end },
 *     summary: { totalUsers },
 *     events: [{ eventName, count }, ...],
 *     topPages: [{ pagePath, sessions, users, engagementRate }, ...],
 *     sources: [{ source, medium, sessions, users }, ...]
 *   }
 */
export async function GET(request: NextRequest) {
  if (!isGa4DataApiConfigured()) {
    return NextResponse.json(
      {
        error:
          "GA4_SA_KEY_B64 と GA4_PROPERTY_ID を Vercel 環境変数に設定してください。",
      },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") ?? "7days";

  let startDate: string;
  let endDate = "today";
  switch (period) {
    case "today":
      startDate = "today";
      break;
    case "yesterday":
      startDate = "yesterday";
      endDate = "yesterday";
      break;
    case "7days":
      startDate = "7daysAgo";
      break;
    case "14days":
      startDate = "14daysAgo";
      break;
    case "28days":
      startDate = "28daysAgo";
      break;
    default:
      startDate = period; // YYYY-MM-DD 形式の直接指定も許可
  }

  try {
    const [funnel, topPages, sources] = await Promise.all([
      getConstructionFunnel(startDate, endDate),
      getTopLandingPages(startDate, endDate),
      getTrafficSources(startDate, endDate),
    ]);

    return NextResponse.json({
      period: { start: startDate, end: endDate },
      summary: { totalUsers: funnel.totalUsers },
      events: funnel.events,
      topPages,
      sources,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json(
      { error: `GA4 Data API error: ${message}` },
      { status: 500 },
    );
  }
}
