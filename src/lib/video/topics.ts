/**
 * 週次で投稿する動画トピックのキュー。
 * 上から順に消費され、使い終わったら繰り返し（aboutMonthly で除外）。
 */

export interface VideoTopic {
  id: string;
  title: string;
  angle: string; // 切り口（動画の核となる問い）
  keywords: string[]; // YouTube SEO タグ
  targetKeyword: string; // メインの検索KW
  referenceUrls?: string[]; // Claude に渡すファクト情報源
}

export const videoTopics: VideoTopic[] = [
  {
    id: "law-2025-what-changed",
    title: "改正建設業法2025、実務で何が変わったのか【3分で解説】",
    angle:
      "改正建設業法2025年12月施行で、見積書・契約書の書き方がどう変わったか。現場で起きている具体的な変化を3つに絞って解説する。",
    keywords: ["改正建設業法", "建設業法2025", "見積書", "一人親方", "労務費"],
    targetKeyword: "改正建設業法 2025",
    referenceUrls: [
      "https://biz.moneyforward.com/construction/basic/70695/",
      "https://www.cloudsign.jp/media/construction-industry-law-amendment/",
    ],
  },
  {
    id: "ichi-shiki-nogo",
    title: "建設業の見積書で「一式」と書くと差し戻される理由【改正法対応】",
    angle:
      "「一式」表記の何が問題か。2025年改正後は元請から差し戻されるケースが増えている。正しい内訳の書き方を具体例で示す。",
    keywords: ["建設業", "一式", "見積書", "内訳", "改正建設業法"],
    targetKeyword: "建設業 一式 書き方",
  },
  {
    id: "legal-welfare-20",
    title: "法定福利費が労務費の20%の理由【建設業の見積書】",
    angle:
      "建設業の法定福利費の業界標準料率20%の内訳。健康保険・厚生年金・雇用保険・労災・子ども子育て拠出金それぞれの料率と、一人親方の場合の対応。",
    keywords: ["法定福利費", "計算", "建設業", "社会保険料", "労務費"],
    targetKeyword: "法定福利費 計算 建設業",
  },
  {
    id: "freelance-law-construction",
    title: "フリーランス新法、建設業の一人親方への影響を解説",
    angle:
      "2024年11月施行のフリーランス新法が建設業の一人親方にどう適用されるか。発注者の書面交付義務、60日以内支払い、7つの禁止行為。",
    keywords: ["フリーランス新法", "一人親方", "建設業", "下請法"],
    targetKeyword: "フリーランス新法 一人親方",
  },
  {
    id: "misc-expense-ratio",
    title: "建設業の諸経費、現場管理費6%・一般管理費10%の根拠",
    angle:
      "見積書の諸経費（現場管理費・一般管理費）の業界標準料率とその計算順序を解説。なぜ段階計算が必要か。",
    keywords: ["諸経費", "現場管理費", "一般管理費", "建設業", "見積書"],
    targetKeyword: "建設業 諸経費 計算",
  },
  {
    id: "kashi-tanpo",
    title: "建設業の瑕疵担保責任、見積書にどう書くか",
    angle:
      "改正建設業法・住宅品確法で求められる瑕疵担保責任の範囲と期間。見積段階での明示のメリット。",
    keywords: ["瑕疵担保", "建設業", "住宅品確法", "見積書", "保証"],
    targetKeyword: "瑕疵担保 建設業 見積書",
  },
  {
    id: "excel-to-cloud",
    title: "建設業の見積書、エクセルからクラウドツールに乗り換えるべき理由",
    angle:
      "エクセル運用の限界と、クラウド型見積書ツールのメリット。改正建設業法対応の観点からも比較。",
    keywords: ["建設業", "見積書", "クラウド", "エクセル", "DX"],
    targetKeyword: "建設業 見積書 ソフト",
  },
  {
    id: "addition-work-trouble",
    title: "追加工事のトラブルを防ぐ、見積書に書くべき3つの条項",
    angle:
      "建設業で最多のトラブル原因「追加工事の費用」。見積段階で合意しておけば防げる3つの条項。",
    keywords: ["追加工事", "建設業", "見積書", "トラブル"],
    targetKeyword: "建設業 追加工事 見積書",
  },
];

/**
 * 前回投稿されたトピックID（Supabase などに保存されたログ）を除外して、
 * 次に投稿すべきトピックを返す。
 */
export function pickNextTopic(recentlyUsedIds: string[]): VideoTopic {
  const unused = videoTopics.filter((t) => !recentlyUsedIds.includes(t.id));
  if (unused.length > 0) {
    return unused[0];
  }
  // 全消費後は最も古いものから再利用
  return videoTopics[0];
}
