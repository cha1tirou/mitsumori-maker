import { Profile } from "@/lib/supabase/types";

export const FREE_PLAN_MONTHLY_LIMIT = 3;
export const TRIAL_DAYS = 7;

export type AccessFeature =
  | "save_quote"
  | "quote_history"
  | "unlimited_quotes"
  | "team_seat"
  | "customer_management";

/**
 * 無料トライアル中かどうかを判定。
 * 登録から7日以内 && Freeプラン && 過去に有料プラン経験なし
 */
export function isInTrial(profile: Profile | null): boolean {
  if (!profile) return false;
  if (profile.plan !== "free") return false;
  // 一度でも課金したことがあればトライアル対象外
  if (profile.stripe_customer_id) return false;

  const createdAt = new Date(profile.created_at).getTime();
  const now = Date.now();
  const trialEnd = createdAt + TRIAL_DAYS * 24 * 60 * 60 * 1000;
  return now < trialEnd;
}

/**
 * トライアル残日数（0以上）
 */
export function trialDaysRemaining(profile: Profile | null): number {
  if (!profile) return 0;
  const createdAt = new Date(profile.created_at).getTime();
  const trialEnd = createdAt + TRIAL_DAYS * 24 * 60 * 60 * 1000;
  const remaining = Math.ceil((trialEnd - Date.now()) / (24 * 60 * 60 * 1000));
  return Math.max(0, remaining);
}

export function canAccess(
  feature: AccessFeature,
  profile: Profile | null
): boolean {
  const plan = profile?.plan ?? "free";
  const status = profile?.subscription_status;
  const isActive = status === "active" || status === "trialing" || plan === "free";
  if (!isActive) return false;

  // トライアル中はSolo相当の機能を開放
  const effectivePlan =
    plan === "free" && isInTrial(profile) ? "solo" : plan;

  switch (feature) {
    case "save_quote":
      return true; // 月3通制限は別途カウントで判定
    case "quote_history":
      return true; // Free でも保存した見積書の履歴は閲覧可能
    case "unlimited_quotes":
      return effectivePlan === "solo" || effectivePlan === "team";
    case "team_seat":
    case "customer_management":
      return effectivePlan === "team";
  }
}

export function remainingFreeQuotes(
  plan: "free" | "solo" | "team",
  usedThisMonth: number,
  profile: Profile | null = null
): number | "unlimited" {
  if (plan !== "free") return "unlimited";
  // トライアル中は無制限
  if (isInTrial(profile)) return "unlimited";
  return Math.max(0, FREE_PLAN_MONTHLY_LIMIT - usedThisMonth);
}
