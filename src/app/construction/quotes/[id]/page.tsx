import { redirect, notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile, getCurrentMonthQuoteCount } from "@/lib/supabase/queries";
import { FREE_PLAN_MONTHLY_LIMIT } from "@/lib/paywall";
import ConstructionEditor from "@/components/construction/ConstructionEditor";
import type {
  ConstructionQuoteData,
  ConstructionSection,
} from "@/types/construction";
import { defaultConstructionQuoteData } from "@/types/construction";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function ConstructionEditPage({ params }: PageProps) {
  if (!isSupabaseConfigured()) {
    redirect("/construction/new");
  }

  const { user, profile } = await getCurrentUserProfile();
  if (!user) {
    redirect(
      `/construction/login?redirect=${encodeURIComponent(
        `/construction/quotes/${params.id}`
      )}`
    );
  }

  const supabase = await createClient();
  const { data: row } = await supabase
    .from("construction_quotes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!row) {
    notFound();
  }

  const plan = (profile?.plan ?? "free") as "free" | "solo" | "team";
  const remainingFree =
    plan === "free"
      ? Math.max(
          0,
          FREE_PLAN_MONTHLY_LIMIT -
            (await getCurrentMonthQuoteCount(user.id))
        )
      : null;

  const storedData = row.data as Partial<ConstructionQuoteData> | null;
  const initialData: ConstructionQuoteData = {
    ...defaultConstructionQuoteData,
    ...(storedData ?? {}),
    sections:
      (storedData?.sections as ConstructionSection[] | undefined)?.length
        ? (storedData!.sections as ConstructionSection[])
        : defaultConstructionQuoteData.sections,
  };

  return (
    <ConstructionEditor
      initialData={initialData}
      quoteId={params.id}
      userEmail={user.email ?? null}
      plan={plan}
      remainingFree={remainingFree}
    />
  );
}
