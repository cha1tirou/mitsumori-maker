import { createHmac, timingSafeEqual } from "crypto";

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY と RESEND_FROM_EMAIL の設定が必要です。.env.local を確認してください。"
    );
  }
  return { apiKey, from };
}

/**
 * 配信停止 URL に埋め込むトークン。メアドの HMAC を切り詰めたもの。
 * 他人のメアドを URL 推測で停止する攻撃を防ぎつつ、DB にトークンを
 * 保存しない軽量実装。
 */
function getUnsubscribeSecret(): string {
  return (
    process.env.UNSUBSCRIBE_SECRET ||
    process.env.CRON_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "kenmitsu-unsubscribe-fallback-do-not-use-in-production"
  );
}

export function buildUnsubscribeToken(email: string): string {
  return createHmac("sha256", getUnsubscribeSecret())
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (typeof token !== "string" || token.length !== 32) return false;
  const expected = buildUnsubscribeToken(email);
  try {
    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(token, "utf8")
    );
  } catch {
    return false;
  }
}

export function buildUnsubscribeUrl(origin: string, email: string): string {
  const token = buildUnsubscribeToken(email);
  const qs = new URLSearchParams({ email, token }).toString();
  return `${origin}/construction/unsubscribe?${qs}`;
}

/**
 * メール本文の共通フッター（事業者情報 + 配信停止リンク）。
 * 特定電子メール法 第3条（配信停止）・第4条（事業者明示）対応。
 */
export function mailFooterHtml(unsubscribeUrl: string): string {
  return `
<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
<div style="font-size: 11px; color: #9ca3af; line-height: 1.7; text-align: center;">
  <p style="margin: 0 0 8px 0;">
    <strong style="color: #6b7280;">ケンミツ</strong>（運営: 宇野 想一郎）<br>
    〒150-0021 東京都渋谷区恵比寿西2丁目4番8号 ウィンド恵比寿ビル8F<br>
    お問い合わせ: kenmitsu.support@gmail.com
  </p>
  <p style="margin: 8px 0 0 0;">
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af; text-decoration: underline;">サービスサイト</a>
    ｜
    <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">配信停止</a>
    ｜
    <a href="https://mitsumori-maker.com/construction/tokushoho" style="color: #9ca3af; text-decoration: underline;">特定商取引法に基づく表記</a>
  </p>
</div>`;
}

export function mailFooterText(unsubscribeUrl: string): string {
  return `
--
ケンミツ（運営: 宇野 想一郎）
〒150-0021 東京都渋谷区恵比寿西2丁目4番8号 ウィンド恵比寿ビル8F
お問い合わせ: kenmitsu.support@gmail.com

配信停止: ${unsubscribeUrl}
サービスサイト: https://mitsumori-maker.com/construction
特定商取引法: https://mitsumori-maker.com/construction/tokushoho`;
}
