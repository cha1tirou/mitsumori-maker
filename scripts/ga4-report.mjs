#!/usr/bin/env node
/**
 * GA4 レポート取得スクリプト
 * Usage: node scripts/ga4-report.mjs [days]
 * Example: node scripts/ga4-report.mjs 7    → 過去7日間
 *          node scripts/ga4-report.mjs 30   → 過去30日間
 *          node scripts/ga4-report.mjs      → デフォルト7日間
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = "530705823";
const CREDENTIALS_PATH = new URL(
  "../credentials/ga4-service-account.json",
  import.meta.url
).pathname;

const days = parseInt(process.argv[2]) || 7;

const client = new BetaAnalyticsDataClient({
  keyFilename: CREDENTIALS_PATH,
});

async function runReport() {
  console.log(`\n📊 GA4 レポート（過去${days}日間）`);
  console.log("━".repeat(50));

  // 1. サマリー（PV・ユーザー・セッション）
  const [summary] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "sessions" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
  });

  const s = summary.rows?.[0]?.metricValues;
  if (s) {
    console.log(`\n📈 サマリー`);
    console.log(`  PV:          ${Number(s[0].value).toLocaleString()}`);
    console.log(`  ユーザー:     ${Number(s[1].value).toLocaleString()}`);
    console.log(`  セッション:   ${Number(s[2].value).toLocaleString()}`);
    console.log(`  平均滞在時間: ${Math.round(Number(s[3].value))}秒`);
    console.log(`  直帰率:       ${(Number(s[4].value) * 100).toFixed(1)}%`);
  } else {
    console.log("\n⚠️ データがありません（GA4がまだデータを収集していない可能性）");
    return;
  }

  // 2. ページ別PV（上位15）
  const [pages] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 15,
  });

  if (pages.rows?.length) {
    console.log(`\n📄 ページ別PV（上位15）`);
    console.log(`  ${"ページ".padEnd(40)}  PV    ユーザー`);
    console.log(`  ${"-".repeat(40)}  ----  ------`);
    for (const row of pages.rows) {
      const path = row.dimensionValues[0].value.padEnd(40);
      const pv = row.metricValues[0].value.padStart(4);
      const users = row.metricValues[1].value.padStart(6);
      console.log(`  ${path}  ${pv}  ${users}`);
    }
  }

  // 3. 流入元（上位10）
  const [sources] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10,
  });

  if (sources.rows?.length) {
    console.log(`\n🔗 流入元（上位10）`);
    console.log(`  ${"ソース".padEnd(30)}  セッション  ユーザー`);
    console.log(`  ${"-".repeat(30)}  --------  ------`);
    for (const row of sources.rows) {
      const source = row.dimensionValues[0].value.padEnd(30);
      const sessions = row.metricValues[0].value.padStart(8);
      const users = row.metricValues[1].value.padStart(6);
      console.log(`  ${source}  ${sessions}  ${users}`);
    }
  }

  // 4. デバイス別
  const [devices] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [
      { name: "sessions" },
      { name: "screenPageViews" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  if (devices.rows?.length) {
    console.log(`\n📱 デバイス別`);
    for (const row of devices.rows) {
      const device = row.dimensionValues[0].value;
      const sessions = row.metricValues[0].value;
      const pv = row.metricValues[1].value;
      console.log(`  ${device}: ${sessions}セッション / ${pv}PV`);
    }
  }

  console.log("\n" + "━".repeat(50));
}

runReport().catch((err) => {
  console.error("❌ エラー:", err.message);
  if (err.message.includes("403")) {
    console.error("→ GA4のプロパティアクセス管理でサービスアカウントを閲覧者として追加してください");
  }
  process.exit(1);
});
