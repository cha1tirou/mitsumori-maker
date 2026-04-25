import Link from "next/link";
import { HardHat } from "lucide-react";

const links: { href: string; label: string }[] = [
  { href: "/construction/terms", label: "利用規約" },
  { href: "/construction/tokushoho", label: "特定商取引法に基づく表記" },
  { href: "/construction/privacy", label: "プライバシーポリシー" },
  { href: "/construction/faq", label: "よくある質問" },
  { href: "/construction/how-to", label: "使い方ガイド" },
  { href: "/construction/contact", label: "お問い合わせ" },
];

export default function KenmitsuFooter() {
  return (
    <footer className="bg-kenmitsu-navy900 text-white/80">
      <div className="mx-auto max-w-[1160px] px-5 py-8 md:px-6 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-2.5">
            <HardHat
              className="mt-0.5 h-5 w-5 shrink-0 text-kenmitsu-orange"
              strokeWidth={2.25}
            />
            <div>
              <p className="text-sm font-bold text-white">ケンミツ</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-white/60">
                建設業の見積書作成クラウド。改正建設業法 2025 対応版を出力。
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] md:text-[13px]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/75 hover:text-white hover:underline transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-[10.5px] text-white/50 md:text-[11px]">
          © {new Date().getFullYear()} ケンミツ
        </div>
      </div>
    </footer>
  );
}
