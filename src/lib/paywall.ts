import { Profile } from "@/lib/supabase/types";

export const FREE_PLAN_MONTHLY_LIMIT = 3;

export type AccessFeature =
  | "save_quote"
  | "quote_history"
  | "unlimited_quotes"
  | "team_seat"
  | "customer_management";

export function canAccess(
  feature: AccessFeature,
  profile: Profile | null
): boolean {
  const plan = profile?.plan ?? "free";
  const status = profile?.subscription_status;
  const isActive = status === "active" || status === "trialing" || plan === "free";
  if (!isActive) return false;

  switch (feature) {
    case "save_quote":
      return true; // 月3通制限は別途カウントで判定
    case "quote_history":
      return plan === "solo" || plan === "team";
    case "unlimited_quotes":
      return plan === "solo" || plan === "team";
    case "team_seat":
    case "customer_management":
      return plan === "team";
  }
}

export function remainingFreeQuotes(
  plan: "free" | "solo" | "team",
  usedThisMonth: number
): number | "unlimited" {
  if (plan !== "free") return "unlimited";
  return Math.max(0, FREE_PLAN_MONTHLY_LIMIT - usedThisMonth);
}
