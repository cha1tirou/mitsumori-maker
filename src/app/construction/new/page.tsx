import { getCurrentUserProfile } from "@/lib/supabase/queries";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import ConstructionEditor from "@/components/construction/ConstructionEditor";

export const dynamic = "force-dynamic";

export default async function ConstructionNewPage() {
  let userEmail: string | null = null;
  let plan: "free" | "solo" | "team" = "free";

  if (isSupabaseConfigured()) {
    const { user, profile } = await getCurrentUserProfile();
    if (user) {
      userEmail = user.email ?? null;
      plan = (profile?.plan ?? "free") as "free" | "solo" | "team";
    }
  }

  return <ConstructionEditor userEmail={userEmail} plan={plan} />;
}
