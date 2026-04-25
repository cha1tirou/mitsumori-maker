import Link from "next/link";
import { ArrowIcon } from "./icons";

type Props = {
  isLoggedIn: boolean;
  planLabel: string;
};

export default function LpHeader({ isLoggedIn, planLabel }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-kenmitsu-line bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-[68px] max-w-[1160px] items-center justify-between px-5 md:px-6">
        <Link
          href={isLoggedIn ? "/construction/mypage" : "/construction"}
          className="flex items-center gap-2.5"
          aria-label="ケンミツ ホーム"
        >
          <div
            className="grid h-8 w-8 place-items-center rounded-lg bg-kenmitsu-navy text-[15px] font-black leading-none text-white"
            aria-hidden
          >
            建
          </div>
          <div className="leading-tight">
            <div className="text-[17px] font-black tracking-[0.02em] text-kenmitsu-ink">
              ケンミツ
            </div>
            <div className="-mt-0.5 text-[10px] font-medium tracking-[0.08em] text-kenmitsu-muted">
              KENMITSU
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-kenmitsu-ink2 md:flex"
          aria-label="ページ内ナビゲーション"
        >
          <a href="#problems" className="hover:text-kenmitsu-navy">
            課題
          </a>
          <a href="#features" className="hover:text-kenmitsu-navy">
            機能
          </a>
          <a href="#compare" className="hover:text-kenmitsu-navy">
            比較
          </a>
          <a href="#pricing" className="hover:text-kenmitsu-navy">
            料金
          </a>
          <a href="#faq" className="hover:text-kenmitsu-navy">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Link
              href="/construction/mypage"
              className="hidden text-xs font-bold text-kenmitsu-ink2 hover:text-kenmitsu-navy sm:inline"
            >
              {planLabel}・マイページ
            </Link>
          )}
          <Link
            href={isLoggedIn ? "/construction/new" : "/construction/start"}
            className="inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-4 py-2.5 text-[13px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_18px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px"
          >
            {isLoggedIn ? "見積書を作成" : "無料で始める"}
            <ArrowIcon color="#1A1200" />
          </Link>
        </div>
      </div>
    </header>
  );
}
