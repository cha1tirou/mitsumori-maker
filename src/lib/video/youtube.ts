import { google } from "googleapis";
import { getYoutubeEnv, isYoutubeConfigured } from "./env";

/**
 * YouTube Data API v3 で動画をアップロード。
 * OAuth2 リフレッシュトークンを使って認証。
 */

export interface YoutubeUploadArgs {
  title: string;
  description: string;
  tags: string[];
  videoBuffer: Buffer;
  thumbnailBuffer?: Buffer;
  categoryId?: string; // 27=education, 28=science & tech, 22=people & blogs
  privacyStatus?: "public" | "unlisted" | "private";
}

export interface YoutubeUploadResult {
  videoId: string;
  url: string;
}

export async function uploadToYoutube(
  args: YoutubeUploadArgs
): Promise<YoutubeUploadResult> {
  if (!isYoutubeConfigured()) {
    throw new Error("YouTube の環境変数が未設定です");
  }
  const { clientId, clientSecret, refreshToken } = getYoutubeEnv();

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const { Readable } = await import("stream");
  const videoStream = Readable.from(args.videoBuffer);

  // 動画アップロード
  const insertRes = await youtube.videos.insert({
    part: ["snippet", "status"],
    notifySubscribers: true,
    requestBody: {
      snippet: {
        title: args.title.slice(0, 100),
        description: args.description.slice(0, 5000),
        tags: args.tags.slice(0, 15),
        categoryId: args.categoryId ?? "27",
        defaultLanguage: "ja",
        defaultAudioLanguage: "ja",
      },
      status: {
        privacyStatus: args.privacyStatus ?? "public",
        selfDeclaredMadeForKids: false,
        madeForKids: false,
        // AI生成ラベリング（YouTube 2024〜要件）
        containsSyntheticMedia: true,
      },
    },
    media: {
      body: videoStream,
    },
  });

  const videoId = insertRes.data.id;
  if (!videoId) {
    throw new Error("YouTube API から video ID が返りませんでした");
  }

  // サムネイル設定（任意）
  if (args.thumbnailBuffer) {
    try {
      const { Readable } = await import("stream");
      const thumbnailStream = Readable.from(args.thumbnailBuffer);
      await youtube.thumbnails.set({
        videoId,
        media: { body: thumbnailStream },
      });
    } catch (e) {
      // サムネ設定失敗はアップロード本体は成功なので警告のみ
      console.warn("サムネ設定失敗:", e);
    }
  }

  return {
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

/**
 * URL から動画をダウンロードして Buffer に変換するヘルパー。
 */
export async function fetchVideoBuffer(videoUrl: string): Promise<Buffer> {
  const res = await fetch(videoUrl);
  if (!res.ok) {
    throw new Error(`動画ダウンロード失敗: ${res.status}`);
  }
  const arrayBuf = await res.arrayBuffer();
  return Buffer.from(arrayBuf);
}
