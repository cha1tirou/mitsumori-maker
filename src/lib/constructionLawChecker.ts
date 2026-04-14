import { ConstructionItem, ConstructionQuoteData } from "@/types/construction";

export type CheckSeverity = "error" | "warning" | "info";

export interface LawCheckResult {
  id: string;
  severity: CheckSeverity;
  message: string;
  detail: string;
}

const VAGUE_KEYWORDS = ["一式"];

export function runConstructionLawChecks(
  data: ConstructionQuoteData
): LawCheckResult[] {
  const results: LawCheckResult[] = [];

  const allItems: { item: ConstructionItem; sectionName: string }[] = [];
  data.sections.forEach((section) => {
    section.items.forEach((item) => {
      allItems.push({ item, sectionName: section.name });
    });
  });

  allItems.forEach(({ item, sectionName }, index) => {
    if (isVagueItem(item)) {
      results.push({
        id: `vague-${index}`,
        severity: "warning",
        message: `「${item.name || "—"}」（${sectionName}）が「一式」表記です`,
        detail:
          "改正建設業法（2025年12月施行）では、工事の種別ごとの材料費・労務費・その他経費の内訳明示が努力義務です。可能な限り内訳に展開することを推奨します。",
      });
    }
  });

  const hasLabor = allItems.some(
    ({ item }) => item.category === "labor" && item.unitPrice > 0
  );
  if (!hasLabor) {
    results.push({
      id: "missing-labor",
      severity: "warning",
      message: "労務費（人件費）の内訳が未入力です",
      detail:
        "2024年6月の建設業法改正により、労務費の内訳明示が努力義務となっています。賃金水準の確保・適正な価格交渉のため、労務費カテゴリの項目を追加してください。",
    });
  }

  if (hasLabor && !data.enableLegalWelfare) {
    results.push({
      id: "legal-welfare-disabled",
      severity: "warning",
      message: "法定福利費が未計上です",
      detail:
        "建設業では社会保険料（法定福利費）を労務費と区別して明示することが商慣習・国交省ガイドラインで推奨されています。労務費の概ね20%前後が目安です。",
    });
  }

  if (!data.validityDays || data.validityDays < 1) {
    results.push({
      id: "validity-missing",
      severity: "info",
      message: "見積の有効期間が設定されていません",
      detail:
        "建設業法施行令では、工事の内容・金額に応じた見積期間の確保が求められます。最短でも中間的な工事で10日以上を目安としてください。",
    });
  }

  if (!data.constructionPeriod) {
    results.push({
      id: "period-missing",
      severity: "info",
      message: "工事期間の記載がありません",
      detail: "建設業法の見積条件書記載事項として、工事期間は必須項目のひとつです。",
    });
  }

  if (!data.siteAddress) {
    results.push({
      id: "site-missing",
      severity: "info",
      message: "工事場所の記載がありません",
      detail: "建設業法の見積条件書記載事項として、工事場所は必須項目のひとつです。",
    });
  }

  if (!data.warrantyPeriod) {
    results.push({
      id: "warranty-missing",
      severity: "info",
      message: "瑕疵担保責任・アフターサービス条件が未記載です",
      detail:
        "建設業法第19条に基づく請負契約の記載事項の一つです。見積段階で保証範囲・期間を明示しておくと、後の契約・トラブル防止に有効です。",
    });
  }

  if (!data.additionalWorkPolicy) {
    results.push({
      id: "additional-missing",
      severity: "info",
      message: "追加工事・設計変更時の取扱いが未記載です",
      detail:
        "追加工事の費用をめぐるトラブルは建設業で最も多い紛争のひとつです。見積段階で取扱い方針を明記しておくことを強く推奨します。",
    });
  }

  return results;
}

function isVagueItem(item: ConstructionItem): boolean {
  const name = (item.name || "").trim();
  if (!name) return false;
  if (item.unit !== "式") return false;
  if (VAGUE_KEYWORDS.some((kw) => name.includes(kw))) return true;
  return name === "工事一式" || name === item.unit;
}

export function severityColor(severity: CheckSeverity): string {
  switch (severity) {
    case "error":
      return "text-red-700 bg-red-50 border-red-200";
    case "warning":
      return "text-amber-800 bg-amber-50 border-amber-200";
    case "info":
      return "text-blue-800 bg-blue-50 border-blue-200";
  }
}

export function severityLabel(severity: CheckSeverity): string {
  switch (severity) {
    case "error":
      return "要修正";
    case "warning":
      return "要注意";
    case "info":
      return "推奨";
  }
}
