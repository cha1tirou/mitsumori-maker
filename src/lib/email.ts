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
