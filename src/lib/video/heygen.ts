import { getHeygenKey, getHeygenAvatarId, getHeygenVoiceId } from "./env";

/**
 * HeyGen API v2 を使って原稿からアバター動画を生成する。
 * https://docs.heygen.com/reference/create-an-avatar-video-v2
 */

const HEYGEN_BASE = "https://api.heygen.com";

export interface HeygenVideoResult {
  videoId: string;
  videoUrl: string | null;
  status: "processing" | "completed" | "failed";
}

/**
 * 動画生成リクエストを送信。完了を待たず video_id を返す（非同期）。
 */
export async function createHeygenVideo(narration: string): Promise<string> {
  const apiKey = getHeygenKey();
  const avatarId = getHeygenAvatarId();
  const voiceId = getHeygenVoiceId();
  if (!apiKey || !avatarId || !voiceId) {
    throw new Error("HeyGen 環境変数が不足しています (API_KEY / AVATAR_ID / VOICE_ID)");
  }

  const cleanedNarration = narration
    // セクション見出しを自然に聞こえる一呼吸に変換
    .replace(/【[^】]+】/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const body = {
    video_inputs: [
      {
        character: {
          type: "avatar",
          avatar_id: avatarId,
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          input_text: cleanedNarration,
          voice_id: voiceId,
          speed: 1.0,
        },
        background: {
          type: "color",
          value: "#f0fdf4", // 緑系の落ち着いた背景
        },
      },
    ],
    dimension: { width: 1920, height: 1080 },
    aspect_ratio: "16:9",
    test: false,
  };

  const res = await fetch(`${HEYGEN_BASE}/v2/video/generate`, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HeyGen generate 失敗: ${res.status} ${text}`);
  }
  const json = (await res.json()) as { data?: { video_id?: string }; error?: unknown };
  if (!json.data?.video_id) {
    throw new Error(`HeyGen から video_id が返りませんでした: ${JSON.stringify(json)}`);
  }
  return json.data.video_id;
}

/**
 * video_id のステータスを取得。
 */
export async function getHeygenVideoStatus(
  videoId: string
): Promise<HeygenVideoResult> {
  const apiKey = getHeygenKey();
  if (!apiKey) throw new Error("HEYGEN_API_KEY 未設定");

  const res = await fetch(
    `${HEYGEN_BASE}/v1/video_status.get?video_id=${encodeURIComponent(videoId)}`,
    {
      headers: { "X-Api-Key": apiKey },
    }
  );
  if (!res.ok) {
    throw new Error(`HeyGen status 失敗: ${res.status}`);
  }
  const json = (await res.json()) as {
    data?: {
      status?: string;
      video_url?: string | null;
    };
  };
  const status = json.data?.status ?? "processing";
  const mapped: HeygenVideoResult["status"] =
    status === "completed"
      ? "completed"
      : status === "failed"
      ? "failed"
      : "processing";
  return {
    videoId,
    videoUrl: json.data?.video_url ?? null,
    status: mapped,
  };
}

/**
 * completed になるまでポーリング（最大 30 分）。
 */
export async function waitForHeygenVideo(
  videoId: string,
  options: { intervalMs?: number; timeoutMs?: number } = {}
): Promise<HeygenVideoResult> {
  const interval = options.intervalMs ?? 15_000;
  const timeout = options.timeoutMs ?? 30 * 60 * 1000;
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const result = await getHeygenVideoStatus(videoId);
    if (result.status === "completed" || result.status === "failed") {
      return result;
    }
    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error("HeyGen 生成タイムアウト（30分）");
}
