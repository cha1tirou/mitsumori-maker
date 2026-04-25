import Link from "next/link";

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

        {isLoggedIn && (
          <Link
            href="/construction/mypage"
            className="text-xs font-bold text-kenmitsu-ink2 hover:text-kenmitsu-navy sm:text-sm"
          >
            {planLabel}・マイページ
          </Link>
        )}
      </div>
    </header>
  );
}
