/**
 * Slack 通知ヘルパー（動画パイプライン用）
 */
export async function notifyVideoPipeline(text: string, blocks?: unknown) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, blocks }),
    });
  } catch {
    // 通知失敗でも本処理を止めない
  }
}
