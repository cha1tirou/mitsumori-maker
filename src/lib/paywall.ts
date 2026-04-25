import { Profile } from "@/lib/supabase/types";

export type AccessFeature =
  | "save_quote"
  | "quote_history"
  | "unlimited_quotes"
  | "team_seat"
  | "customer_management";

export function canAccess(
  feature: AccessFeature,
  profile: Profile | null,
): boolean {
  const plan = profile?.plan ?? "free";
  const status = profile?.subscription_status;
  const isActive =
    status === "active" || status === "trialing" || plan === "free";
  if (!isActive) return false;

  switch (feature) {
    case "save_quote":
    case "quote_history":
    case "unlimited_quotes":
      return true;
    case "team_seat":
    case "customer_management":
      return plan === "team";
  }
}
