"use client";

import { useEffect, useRef } from "react";
import { trackConversion } from "@/lib/analytics";

/**
 * Pricing セクション冒頭の sentinel 要素（1px の div）が画面に入った
 * 瞬間に `construction_pricing_view` を 1 回だけ発火する。
 *
 * Pricing セクション自体を observe すると、セクション高（約 2000px）>
 * ビューポート高（約 800px）のためセクション全体の % ベース threshold が
 * 物理的に満たせず発火しないという問題があったので、sentinel 方式に変更。
 * これで Pricing の上端が画面に入ってきた瞬間に確実に発火する。
 *
 * GA4 + Meta Pixel + Google Ads の 3 系統同時送信でファネル計測に使い、
 * 広告最適化の学習を速める。
 */
export default function PricingSectionTracker() {
  const sentRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sentRef.current) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !sentRef.current) {
          sentRef.current = true;
          trackConversion("construction_pricing_view");
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      className="h-px w-full pointer-events-none"
    />
  );
}
