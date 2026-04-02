#!/usr/bin/env node
/**
 * キーワードリサーチスクリプト
 * Google サジェストAPIから関連キーワードを取得し、コンテンツ戦略の種を発見する
 *
 * Usage:
 *   node scripts/keyword-research.mjs "見積書"
 *   node scripts/keyword-research.mjs "見積書" "請求書" "納品書"
 *   node scripts/keyword-research.mjs --deep "見積書"    ← 2階層掘る
 */

const seeds = [];
let deep = false;

for (const arg of process.argv.slice(2)) {
  if (arg === "--deep") {
    deep = true;
  } else {
    seeds.push(arg);
  }
}

if (seeds.length === 0) {
  console.log(`
📊 キーワードリサーチツール

Usage:
  node scripts/keyword-research.mjs "見積書"
  node scripts/keyword-research.mjs "見積書" "請求書"
  node scripts/keyword-research.mjs --deep "見積書"    ← サジェストのサジェストも取得

Options:
  --deep    2階層目のサジェストも取得（時間がかかります）
`);
  process.exit(0);
}

/**
 * Google サジェストからキーワード候補を取得
 */
async function fetchSuggestions(query) {
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&hl=ja&gl=jp&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const text = new TextDecoder("shift_jis").decode(buf);
    const data = JSON.parse(text);
    return data[1] || [];
  } catch {
    return [];
  }
}

/**
 * あいうえお展開でさらにサジェストを取得
 */
async function fetchWithSuffixes(query) {
  const suffixes = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
  ];

  const results = new Set();

  // まずそのまま
  const direct = await fetchSuggestions(query);
  direct.forEach((s) => results.add(s));

  // スペース + 各文字
  const batchSize = 5;
  for (let i = 0; i < suffixes.length; i += batchSize) {
    const batch = suffixes.slice(i, i + batchSize);
    const promises = batch.map((s) => fetchSuggestions(`${query} ${s}`));
    const batchResults = await Promise.all(promises);
    batchResults.flat().forEach((s) => results.add(s));
  }

  return [...results];
}

/**
 * 既存ページとのマッチングチェック
 */
const existingPages = [
  { path: "/guide/how-to-write", keywords: ["見積書 書き方", "見積書 必要項目"] },
  { path: "/guide/template-excel", keywords: ["見積書 テンプレート", "見積書 エクセル"] },
  { path: "/guide/freelance", keywords: ["見積書 フリーランス", "見積書 個人事業主"] },
  { path: "/guide/difference", keywords: ["見積書 請求書 違い", "見積書 納品書 違い"] },
  { path: "/guide/consumption-tax", keywords: ["見積書 消費税", "見積書 インボイス"] },
  { path: "/guide/valid-period", keywords: ["見積書 有効期限"] },
  { path: "/guide/electronic", keywords: ["見積書 電子化", "見積書 PDF化"] },
  { path: "/guide/construction", keywords: ["見積書 建設業", "工事見積書"] },
  { path: "/guide/it-web", keywords: ["見積書 IT", "見積書 Web"] },
  { path: "/guide/restaurant", keywords: ["見積書 飲食店", "見積書 レストラン"] },
  { path: "/guide/pdf", keywords: ["見積書 PDF"] },
  { path: "/guide/email", keywords: ["見積書 メール", "見積書 送り方"] },
  { path: "/guide/english", keywords: ["見積書 英語", "quotation"] },
  { path: "/guide/invoice-howto", keywords: ["請求書 書き方", "請求書 テンプレート"] },
  { path: "/guide/discount", keywords: ["見積書 値引き", "見積書 割引"] },
  { path: "/guide/bank-info", keywords: ["見積書 振込先", "見積書 口座"] },
  { path: "/guide/numbering", keywords: ["見積書 番号", "見積書 ナンバリング"] },
  { path: "/guide/delivery-howto", keywords: ["納品書 書き方", "納品書 テンプレート"] },
  { path: "/guide/rejection", keywords: ["見積書 断り方", "見積もり お断り"] },
  { path: "/guide/reissue", keywords: ["見積書 再発行"] },
  { path: "/guide/addressing", keywords: ["見積書 宛名", "見積書 御中"] },
  { path: "/tools/excel-template", keywords: ["見積書 テンプレート エクセル", "見積書 エクセル 無料"] },
  { path: "/tools/invoice", keywords: ["請求書 無料", "請求書 作成"] },
  { path: "/tools/delivery", keywords: ["納品書 無料", "納品書 作成"] },
  { path: "/tools/purchase-order", keywords: ["発注書 無料", "発注書 作成"] },
  { path: "/tools/invoice-calc", keywords: ["インボイス 計算", "消費税 計算"] },
  { path: "/", keywords: ["見積書 無料", "見積書 作成", "見積書メーカー"] },
];

function findExistingPage(keyword) {
  const lower = keyword.toLowerCase();
  for (const page of existingPages) {
    for (const kw of page.keywords) {
      if (lower.includes(kw) || kw.includes(lower)) {
        return page.path;
      }
    }
  }
  return null;
}

/**
 * キーワードをカテゴリ分類
 */
function categorize(keyword) {
  if (/書き方|方法|作り方|作成|how/i.test(keyword)) return "ハウツー";
  if (/テンプレート|フォーマット|ひな形|雛形|様式/i.test(keyword)) return "テンプレ";
  if (/無料|フリー|free/i.test(keyword)) return "無料系";
  if (/違い|比較|vs/i.test(keyword)) return "比較";
  if (/エクセル|excel|word|pdf/i.test(keyword)) return "ツール";
  if (/英語|english/i.test(keyword)) return "英語";
  if (/業|向け|フリーランス|個人/i.test(keyword)) return "業種別";
  if (/税|インボイス|消費/i.test(keyword)) return "税務";
  if (/メール|送付|送り方/i.test(keyword)) return "送付";
  return "その他";
}

// メイン処理
async function main() {
  console.log("\n🔍 キーワードリサーチ");
  console.log("━".repeat(60));

  const allKeywords = new Map(); // keyword -> { source, category }

  for (const seed of seeds) {
    console.log(`\n📌 種キーワード: "${seed}"`);

    const suggestions = await fetchWithSuffixes(seed);
    console.log(`   → ${suggestions.length}件のサジェスト取得`);

    for (const kw of suggestions) {
      if (!allKeywords.has(kw)) {
        allKeywords.set(kw, {
          source: seed,
          category: categorize(kw),
        });
      }
    }

    // --deep: 上位サジェストの2階層目
    if (deep) {
      const topSuggestions = suggestions.slice(0, 10);
      for (const topKw of topSuggestions) {
        const deepResults = await fetchSuggestions(topKw);
        for (const kw of deepResults) {
          if (!allKeywords.has(kw)) {
            allKeywords.set(kw, {
              source: `${seed} → ${topKw}`,
              category: categorize(kw),
            });
          }
        }
      }
      console.log(`   → deep検索で合計 ${allKeywords.size}件`);
    }
  }

  // 既存ページとのマッチング
  const covered = [];
  const uncovered = [];

  for (const [kw, info] of allKeywords) {
    const existing = findExistingPage(kw);
    if (existing) {
      covered.push({ keyword: kw, page: existing, ...info });
    } else {
      uncovered.push({ keyword: kw, ...info });
    }
  }

  // カテゴリごとにグルーピング
  const byCategory = {};
  for (const item of uncovered) {
    if (!byCategory[item.category]) {
      byCategory[item.category] = [];
    }
    byCategory[item.category].push(item);
  }

  // 結果表示
  console.log("\n" + "━".repeat(60));
  console.log(`📊 結果サマリー`);
  console.log(`   総キーワード数: ${allKeywords.size}`);
  console.log(`   カバー済み:     ${covered.length} (既存ページあり)`);
  console.log(`   未カバー:       ${uncovered.length} (コンテンツ候補)`);

  // 未カバーをカテゴリ別に表示
  console.log("\n" + "━".repeat(60));
  console.log("🎯 未カバーキーワード（コンテンツ候補）\n");

  const categoryOrder = ["ハウツー", "テンプレ", "無料系", "業種別", "税務", "送付", "比較", "ツール", "英語", "その他"];

  for (const cat of categoryOrder) {
    const items = byCategory[cat];
    if (!items || items.length === 0) continue;

    console.log(`  【${cat}】`);
    for (const item of items.sort((a, b) => a.keyword.length - b.keyword.length)) {
      console.log(`    - ${item.keyword}`);
    }
    console.log();
  }

  // カバー済みも表示
  if (covered.length > 0) {
    console.log("━".repeat(60));
    console.log("✅ カバー済みキーワード\n");
    for (const item of covered) {
      console.log(`    ${item.keyword}  →  ${item.page}`);
    }
    console.log();
  }
}

main().catch((err) => {
  console.error("❌ エラー:", err.message);
  process.exit(1);
});
