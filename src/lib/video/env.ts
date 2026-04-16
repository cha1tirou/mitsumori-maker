/**
 * 動画自動生成パイプラインの環境変数ヘルパー。
 * いずれかが未設定の場合、該当ステップはスキップ or ログのみで終了する。
 */

export function getAnthropicKey(): string {
  const k = process.env.ANTHROPIC_API_KEY;
  if (!k) throw new Error("ANTHROPIC_API_KEY 未設定");
  return k;
}

export function getHeygenKey(): string | null {
  return process.env.HEYGEN_API_KEY || null;
}

export function getHeygenAvatarId(): string | null {
  return process.env.HEYGEN_AVATAR_ID || null;
}

export function getHeygenVoiceId(): string | null {
  return process.env.HEYGEN_VOICE_ID || null;
}

export function getYoutubeEnv() {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;
  return { clientId, clientSecret, refreshToken };
}

export function isYoutubeConfigured(): boolean {
  const { clientId, clientSecret, refreshToken } = getYoutubeEnv();
  return Boolean(clientId && clientSecret && refreshToken);
}

export function getCronSecret(): string | null {
  return process.env.CRON_SECRET || null;
}

export function isVideoAutomationReady(): boolean {
  return Boolean(
    process.env.ANTHROPIC_API_KEY &&
      process.env.HEYGEN_API_KEY &&
      isYoutubeConfigured()
  );
}
