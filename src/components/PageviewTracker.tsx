"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Next.js App Router は SPA 遷移時に gtag('config') を自動再呼び出ししない。
 * GA4 の拡張計測（history change 感知）である程度拾えるが、取りこぼしが
 * あるため、pathname / searchParams 変更をフックして明示的に page_view を
 * 送り、Meta Pixel の PageView も併せて再発火する。
 *
 * 初回ロード時は layout の gtag('config') / fbq('track', 'PageView') が
 * 自動発火するので、ここでは初回をスキップする。
 */
export default function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 初回は layout 側の設定で既に page_view 発火済みなのでスキップ
    // 2 回目以降（SPA 遷移）だけ追加送信
    const isFirstLoad = !window.__pageviewTrackerInitialized;
    if (isFirstLoad) {
      window.__pageviewTrackerInitialized = true;
      return;
    }

    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    const url = `${window.location.origin}${path}`;

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: url,
        page_title: document.title,
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

declare global {
  interface Window {
    __pageviewTrackerInitialized?: boolean;
  }
}
