import Link from "next/link";
import { IluHeroKeyArt } from "./illustrations";
import { AlertIcon, ArrowIcon, CheckIcon } from "./icons";
import ConstructionTape from "./ConstructionTape";
import BlueprintBg from "./BlueprintBg";

type Props = {
  lawDays: number;
};

export default function Hero({ lawDays }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 md:pb-20">
      <BlueprintBg opacity={0.6} cell={16} />
      <ConstructionTape placement="top-right" width={360} height={8} />

      <div className="relative mx-auto max-w-[1160px] px-5 pt-10 md:px-6">
        {/* law-days alert ribbon */}
        <div className="mb-7 inline-flex max-w-full items-center rounded-full border-[1.5px] border-kenmitsu-warn bg-white p-1 shadow-[0_4px_12px_-4px_rgba(180,83,9,0.25)] md:mb-9">
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-kenmitsu-warn px-2.5 py-1 text-[10px] font-black tracking-[0.04em] text-white md:gap-2 md:px-3 md:py-1.5 md:text-xs md:tracking-[0.06em]">
            <AlertIcon color="#fff" />
            <span>改正建設業法2025 施行中</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-kenmitsu-ink md:gap-1.5 md:px-3 md:py-1.5 md:text-[13px]">
            <span className="hidden sm:inline">施行から</span>
            <span className="font-mono text-[13px] font-black text-kenmitsu-warn md:text-[17px]">
              {lawDays}
            </span>
            <span className="whitespace-nowrap">日経過</span>
            <span className="hidden whitespace-nowrap sm:inline">
              — 未対応は法令リスク
            </span>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-12">
          <div>
            <h1 className="mb-6 text-[32px] font-black leading-[1.25] tracking-[-0.01em] text-kenmitsu-ink md:mb-7 md:text-[clamp(40px,4.6vw,58px)]">
              <span className="text-kenmitsu-navy">
                改正建設業法 2025、
              </span>
              <br />
              対応していますか？
            </h1>
            <p className="mb-7 max-w-[560px] text-[15px] leading-[1.85] text-kenmitsu-ink2 md:mb-8 md:text-lg">
              中小建設業者のための、改正建設業法 2025 対応の見積書作成ツール。
              <br className="hidden md:block" />
              月¥980 から、改正法に準拠した PDF が出せます。
            </p>

            <div
              id="hero-cta"
              className="mb-5 flex flex-wrap gap-3"
            >
              <Link
                href="/construction/start"
                className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-7 py-4 text-[15px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px md:px-8 md:py-5 md:text-[17px]"
              >
                無料で始める
                <ArrowIcon color="#1A1200" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-[14px] border-[1.5px] border-kenmitsu-line bg-white px-7 py-4 text-[15px] font-bold text-kenmitsu-ink hover:border-kenmitsu-ink md:px-8 md:py-5 md:text-[17px]"
              >
                料金プランを見る
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[12px] text-kenmitsu-muted md:gap-3.5 md:text-[13px]">
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon color="#0E7A52" />
                クレジットカード登録不要
              </span>
              <span className="hidden h-3 w-px bg-kenmitsu-line md:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon color="#0E7A52" />
                無料で何枚でも PDF ダウンロード
              </span>
            </div>
          </div>

          <div className="relative min-w-0">
            <IluHeroKeyArt />
          </div>
        </div>
      </div>
    </section>
  );
}
