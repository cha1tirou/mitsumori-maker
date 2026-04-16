import { NextResponse, type NextRequest } from "next/server";
import {
  getCronSecret,
  isVideoAutomationReady,
} from "@/lib/video/env";
import { pickNextTopic, videoTopics } from "@/lib/video/topics";
import { generateScript } from "@/lib/video/script";
import {
  createHeygenVideo,
  waitForHeygenVideo,
} from "@/lib/video/heygen";
import { fetchVideoBuffer, uploadToYoutube } from "@/lib/video/youtube";
import { getRecentTopicIds, recordVideoPost } from "@/lib/video/history";
import { notifyVideoPipeline } from "@/lib/video/notify";

// HeyGen 生成を待つため最大許容実行時間を拡張（Vercel Pro 以上必須）
export const maxDuration = 300;
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // セキュリティ：CRON_SECRET があれば検証
  const cronSecret = getCronSecret();
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  if (!isVideoAutomationReady()) {
    await notifyVideoPipeline(
      "⚠️ 動画自動生成: 環境変数未設定のため実行をスキップしました (ANTHROPIC_API_KEY / HEYGEN_API_KEY / YOUTUBE_* が必要)"
    );
    return NextResponse.json({
      ok: false,
      reason: "env_not_configured",
    });
  }

  const startedAt = Date.now();

  // ========== 1. トピック選定 ==========
  const recentIds = await getRecentTopicIds(4);
  const topic = pickNextTopic(recentIds);
  await notifyVideoPipeline(
    `🎬 動画生成開始: トピック「${topic.title}」 (id: ${topic.id})`
  );

  try {
    // ========== 2. 原稿生成（Claude）==========
    const script = await generateScript(topic);
    await notifyVideoPipeline(
      `📝 原稿生成完了 (${script.narration.length}字): ${script.title}`
    );

    // ========== 3. HeyGen 動画生成 ==========
    const heygenVideoId = await createHeygenVideo(script.narration);
    await notifyVideoPipeline(
      `🎥 HeyGen 動画生成リクエスト送信: ${heygenVideoId} (完了を最大30分待機)`
    );
    const heygenResult = await waitForHeygenVideo(heygenVideoId);

    if (heygenResult.status !== "completed" || !heygenResult.videoUrl) {
      throw new Error(
        `HeyGen 生成失敗: status=${heygenResult.status}, video_id=${heygenVideoId}`
      );
    }
    await notifyVideoPipeline(
      `✅ HeyGen 動画生成完了: ${heygenResult.videoUrl}`
    );

    // ========== 4. YouTube アップロード ==========
    const videoBuffer = await fetchVideoBuffer(heygenResult.videoUrl);
    const upload = await uploadToYoutube({
      title: script.title,
      description:
        script.description +
        `\n\n───\n▼ 本動画はAIアバターによる解説です。\n▼ ケンミツ（建設業向け見積書ツール）→ https://mitsumori-maker.com/construction`,
      tags: script.tags,
      videoBuffer,
      categoryId: "27",
      privacyStatus: "public",
    });

    // ========== 5. ログ保存 ==========
    await recordVideoPost({
      topic_id: topic.id,
      youtube_video_id: upload.videoId,
      youtube_url: upload.url,
      heygen_video_id: heygenVideoId,
      title: script.title,
      status: "success",
      error_message: null,
      posted_at: new Date().toISOString(),
    });

    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    await notifyVideoPipeline(
      `🎉 YouTube投稿完了 (${elapsed}秒): ${upload.url}\nタイトル: ${script.title}`
    );

    return NextResponse.json({
      ok: true,
      topic_id: topic.id,
      youtube_url: upload.url,
      elapsed_sec: elapsed,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await recordVideoPost({
      topic_id: topic.id,
      youtube_video_id: null,
      youtube_url: null,
      heygen_video_id: null,
      title: topic.title,
      status: "failed",
      error_message: message,
      posted_at: new Date().toISOString(),
    });
    await notifyVideoPipeline(
      `❌ 動画生成失敗 (topic: ${topic.id})\nエラー: ${message}`
    );
    return NextResponse.json(
      { ok: false, error: message, topic_id: topic.id },
      { status: 500 }
    );
  }
}

// トピック一覧の確認用 (debug)
export async function POST() {
  return NextResponse.json({
    topics: videoTopics.map((t) => ({ id: t.id, title: t.title })),
    ready: isVideoAutomationReady(),
  });
}
