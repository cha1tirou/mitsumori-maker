/**
 * 動画投稿履歴のSupabase保存。
 * 直近のトピックIDを取得してローテーションに使う。
 */
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export interface VideoPostRecord {
  topic_id: string;
  youtube_video_id: string | null;
  youtube_url: string | null;
  heygen_video_id: string | null;
  title: string;
  status: "success" | "failed";
  error_message: string | null;
  posted_at: string;
}

function getAdminClient() {
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY 未設定");
  return createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}

export async function getRecentTopicIds(limit = 4): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = getAdminClient();
    const { data } = await supabase
      .from("video_post_logs")
      .select("topic_id")
      .eq("status", "success")
      .order("posted_at", { ascending: false })
      .limit(limit);
    return (data ?? []).map((r) => r.topic_id as string);
  } catch {
    return [];
  }
}

export async function recordVideoPost(rec: VideoPostRecord): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = getAdminClient();
    await supabase.from("video_post_logs").insert(rec);
  } catch {
    // ログ失敗は致命的ではない
  }
}
