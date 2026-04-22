import Link from "next/link";
import ConstructionTape from "./ConstructionTape";
import { AlertIcon, ArrowIcon } from "./icons";

type Props = { lawDays: number };

const footerLinks = [
  { label: "使い方", href: "/construction/how-to" },
  { label: "FAQ", href: "/construction/faq" },
  { label: "チェックリスト", href: "/construction/checklist" },
  { label: "利用規約", href: "/construction/terms" },
  { label: "プライバシー", href: "/construction/privacy" },
  { label: "特商法表記", href: "/construction/tokushoho" },
  { label: "お問い合わせ", href: "/construction/contact" },
];

export default function FinalCta({ lawDays }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-kenmitsu-navy700 via-kenmitsu-navy to-[#2F58C9] py-[clamp(80px,10vw,140px)] text-white"
    >
      {/* blueprint grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 80%)",
        }}
      />
      <ConstructionTape placement="top" height={8} angle={-45} />

      <div className="relative mx-auto max-w-[1160px] px-5 text-center md:px-6">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.15)] px-4 py-2 text-[12px] font-bold md:mb-7 md:text-[13px]">
          <AlertIcon color="#FDE68A" />
          <span>
            改正建設業法2025 施行から{" "}
            <span className="font-mono font-black text-[#FDE68A]">
              {lawDays}
            </span>{" "}
            日経過
          </span>
        </div>

        <h2 className="mb-6 text-[26px] font-black leading-[1.35] tracking-[-0.01em] text-white md:text-[clamp(32px,4.5vw,54px)]">
          まだ「一式」で出してる見積書、
          <br />
          <span className="text-[#FDE68A]">今日から法令準拠</span>
          に切り替えませんか？
        </h2>
        <p className="mb-10 text-[15px] leading-[1.85] text-white/85 md:text-[17px]">
          登録・カード登録は不要、今すぐ触れます。
          <br />
          気に入ったら月980円。嫌ならそのまま使わないだけ。
        </p>

        <div className="mb-14 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/construction/new"
            className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-7 py-4 text-[15px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px md:px-9 md:py-5 md:text-[17px]"
          >
            建設業向け見積書を作成する
            <ArrowIcon color="#1A1200" />
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-[14px] border-[1.5px] border-white/30 bg-white/10 px-7 py-4 text-[15px] font-bold text-white backdrop-blur-sm hover:bg-white/20 md:px-9 md:py-5 md:text-[17px]"
          >
            料金プランを見る
          </a>
        </div>

        <nav
          aria-label="フッターナビゲーション"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12px] text-white/75"
        >
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
