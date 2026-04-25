/**
 * 統合アナリティクス・ヘルパー
 * - GA4: 常時（G-13VR2YEZKB）
 * - Meta Pixel: NEXT_PUBLIC_META_PIXEL_ID が設定されていれば有効
 * - Google Ads Conversion: NEXT_PUBLIC_GOOGLE_ADS_ID が設定されていれば有効
 */

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

/**
 * 主要コンバージョン計測
 * GA4・Meta Pixel・Google Ads すべてに同時送信
 */
export function trackConversion(
  name: ConversionName,
  params?: EventParams & { value?: number; currency?: string }
) {
  if (typeof window === "undefined") return;

  const currency = params?.currency || "JPY";
  const value = params?.value;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, { ...params, currency });

    // Google Ads 変換ラベル
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const conversionLabel = conversionLabels[name];
    if (adsId && conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${adsId}/${conversionLabel}`,
        value,
        currency,
      });
    }
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", metaEventMap[name] || "Lead", {
      ...params,
      value,
      currency,
    });
  }
}

export type ConversionName =
  | "construction_lp_view"
  | "construction_start_view"
  | "construction_tool_start"
  | "construction_pdf_download"
  | "construction_pricing_view"
  | "construction_signup"
  | "construction_subscribe_solo"
  | "construction_subscribe_team";

// Meta Pixel 標準イベントへのマッピング
const metaEventMap: Record<ConversionName, string> = {
  construction_lp_view: "ViewContent",
  construction_start_view: "ViewContent",
  construction_tool_start: "StartTrial",
  construction_pdf_download: "Lead",
  construction_pricing_view: "ViewContent",
  construction_signup: "CompleteRegistration",
  construction_subscribe_solo: "Subscribe",
  construction_subscribe_team: "Subscribe",
};

// Google Ads 変換ラベル（各コンバージョンごとに広告管理画面で発行して環境変数に設定）
// 設定方法: NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_<NAME> = "xxxxxxxx" 等
const conversionLabels: Record<ConversionName, string | undefined> = {
  construction_lp_view: undefined,
  construction_start_view: undefined,
  construction_tool_start: process.env.NEXT_PUBLIC_GADS_CONV_TOOL_START,
  construction_pdf_download: process.env.NEXT_PUBLIC_GADS_CONV_PDF,
  construction_pricing_view: undefined,
  construction_signup: process.env.NEXT_PUBLIC_GADS_CONV_SIGNUP,
  construction_subscribe_solo: process.env.NEXT_PUBLIC_GADS_CONV_SUB_SOLO,
  construction_subscribe_team: process.env.NEXT_PUBLIC_GADS_CONV_SUB_TEAM,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
