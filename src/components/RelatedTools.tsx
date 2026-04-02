"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const tools = [
  {
    href: "/",
    label: "見積書を作成",
    desc: "取引前に金額・条件を提示",
    flow: "見積書 →",
  },
  {
    href: "/tools/invoice",
    label: "請求書を作成",
    desc: "納品後に代金を請求",
    flow: "→ 請求書",
  },
  {
    href: "/tools/delivery",
    label: "納品書を作成",
    desc: "納品時に内容を確認",
    flow: "→ 納品書",
  },
  {
    href: "/tools/purchase-order",
    label: "発注書を作成",
    desc: "発注時に条件を明示",
    flow: "→ 発注書",
  },
];

export default function RelatedTools() {
  const pathname = usePathname();

  const otherTools = tools.filter((t) => t.href !== pathname);

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="text-sm font-semibold text-gray-600 mb-3">
        次の書類を作成
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {otherTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            onClick={() =>
              trackEvent("cross_tool_click", {
                from: pathname,
                to: tool.href,
              })
            }
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{tool.label}</p>
              <p className="text-xs text-gray-500">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
