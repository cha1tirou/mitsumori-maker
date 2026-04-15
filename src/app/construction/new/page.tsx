import { getCurrentUserProfile, getCurrentMonthQuoteCount } from "@/lib/supabase/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { FREE_PLAN_MONTHLY_LIMIT } from "@/lib/paywall";
import ConstructionEditor from "@/components/construction/ConstructionEditor";

export const dynamic = "force-dynamic";

export default async function ConstructionNewPage() {
  let userEmail: string | null = null;
  let plan: "free" | "solo" | "team" = "free";
  let remainingFree: number | null = null;

  if (isSupabaseConfigured()) {
    const { user, profile } = await getCurrentUserProfile();
    if (user) {
      userEmail = user.email ?? null;
      plan = (profile?.plan ?? "free") as "free" | "solo" | "team";
      if (plan === "free") {
        const count = await getCurrentMonthQuoteCount(user.id);
        remainingFree = Math.max(0, FREE_PLAN_MONTHLY_LIMIT - count);
      }
    }
  }

  return (
    <ConstructionEditor
      userEmail={userEmail}
      plan={plan}
      remainingFree={remainingFree}
    />
  );
}
