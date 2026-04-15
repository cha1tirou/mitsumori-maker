/**
 * Supabase クエリラッパー。呼び出し側で null 判定しやすいようにする。
 */
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { Profile, ConstructionQuoteRow } from "./types";

export async function getCurrentUserProfile(): Promise<{
  user: { id: string; email: string | undefined } | null;
  profile: Profile | null;
}> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  return {
    user: { id: user.id, email: user.email || undefined },
    profile: profile ?? null,
  };
}

export async function getCurrentMonthQuoteCount(userId: string): Promise<number> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("current_month_quote_counts")
    .select("count")
    .eq("user_id", userId)
    .maybeSingle<{ count: number }>();
  return data?.count ?? 0;
}

export async function getRecentQuotes(
  userId: string,
  limit = 50
): Promise<ConstructionQuoteRow[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("construction_quotes")
    .select("*")
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as ConstructionQuoteRow[]) ?? [];
}
