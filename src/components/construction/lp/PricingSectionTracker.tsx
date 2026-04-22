"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Pricing セクションが画面に 30% 以上表示されたタイミングで
 * `pricing_view` イベントを 1 回だけ発火する。
 * Google Ads / GA4 でファネル計測に使い、広告最適化の学習を速める。
 */
export default function PricingSectionTracker() {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    const el = document.getElementById("pricing");
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !sentRef.current) {
          sentRef.current = true;
          trackEvent("pricing_view");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
