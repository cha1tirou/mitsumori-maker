/**
 * GA4 イベント送信ヘルパー
 * gtag が未定義の場合は何もしない（テスト環境対応）
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// 型定義
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
