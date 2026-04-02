"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/", label: "見積書", icon: "見", color: "from-primary to-accent" },
  { href: "/tools/invoice", label: "請求書", icon: "請", color: "from-blue-700 to-blue-500" },
  { href: "/tools/delivery", label: "納品書", icon: "納", color: "from-green-700 to-green-500" },
  { href: "/tools/purchase-order", label: "発注書", icon: "発", color: "from-purple-700 to-purple-500" },
  { href: "/tools/invoice-calc", label: "計算機", icon: "税", color: "from-gray-700 to-gray-500" },
];

interface Props {
  showPreviewToggle?: boolean;
  showPreview?: boolean;
  onTogglePreview?: () => void;
}

export default function ToolHeader({ showPreviewToggle, showPreview, onTogglePreview }: Props) {
  const pathname = usePathname();

  const current = tools.find((t) => t.href === pathname) || tools[0];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* ロゴ + 現在のツール名 */}
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${current.color} flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">{current.icon}</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {current.label}メーカー
            </span>
          </Link>

          {/* ナビ */}
          <div className="flex items-center gap-1">
            <nav className="hidden sm:flex items-center gap-0.5">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                    pathname === tool.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tool.label}
                </Link>
              ))}
            </nav>

            {/* モバイル：プレビュー切り替え */}
            {showPreviewToggle && onTogglePreview && (
              <button
                onClick={onTogglePreview}
                className="lg:hidden bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg font-medium ml-2"
              >
                {showPreview ? "編集" : "プレビュー"}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
