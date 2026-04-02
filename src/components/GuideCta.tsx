"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface Props {
  /** CTA種別。デフォルトは見積書メーカー */
  type?: "estimate" | "invoice" | "delivery" | "purchase-order" | "tax-calc";
}

const ctaConfig = {
  estimate: {
    title: "見積書を今すぐ無料で作成",
    subtitle: "登録不要・完全無料・PDF出力対応",
    buttonText: "見積書メーカーを使う",
    href: "/",
  },
  invoice: {
    title: "請求書を今すぐ無料で作成",
    subtitle: "登録不要・完全無料・インボイス対応・PDF出力",
    buttonText: "請求書メーカーを使う",
    href: "/tools/invoice",
  },
  delivery: {
    title: "納品書を今すぐ無料で作成",
    subtitle: "登録不要・完全無料・インボイス対応・PDF出力",
    buttonText: "納品書メーカーを使う",
    href: "/tools/delivery",
  },
  "purchase-order": {
    title: "発注書を今すぐ無料で作成",
    subtitle: "登録不要・完全無料・PDF出力対応",
    buttonText: "発注書メーカーを使う",
    href: "/tools/purchase-order",
  },
  "tax-calc": {
    title: "消費税額をすぐに計算",
    subtitle: "軽減税率8%・標準税率10%に対応・無料",
    buttonText: "インボイス計算機を使う",
    href: "/tools/invoice-calc",
  },
};

export default function GuideCta({ type = "estimate" }: Props) {
  const config = ctaConfig[type];

  return (
    <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
      <h2 className="text-xl font-bold mb-2">{config.title}</h2>
      <p className="text-gray-400 mb-4 text-sm">{config.subtitle}</p>
      <Link
        href={config.href}
        onClick={() => trackEvent("article_cta_click", { target: type })}
        className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {config.buttonText} &rarr;
      </Link>
    </div>
  );
}
