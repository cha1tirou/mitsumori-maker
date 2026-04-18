import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { AlertIcon, ArrowIcon } from "./icons";

type Props = { lawDays: number };

const items = [
  {
    tag: "努力義務化",
    title: "労務費の内訳明示",
    body: "従来「一式」でまとめていた見積を、労務費・材料費・外注費などに分けて明示することが求められます。賃金水準の確保と適正価格交渉が目的。",
    warn: false,
  },
  {
    tag: "記載義務拡大",
    title: "見積条件書の記載事項",
    body: "工事場所・工事期間・設計図書・支払条件に加え、施工条件・費用負担区分・見積期間などの明示が必要に。",
    warn: false,
  },
  {
    tag: "明文化",
    title: "「一式」表記の適正化",
    body: "工事内容が明確でない「一式」表記は避け、可能な限り内訳を展開することが推奨。元請から差し戻されるリスクが上昇。",
    warn: false,
  },
  {
    tag: "違反時",
    title: "指示処分・営業停止のリスク",
    body: "正当な理由なく見積書の交付を怠ったり、内訳を明示しなかった場合、国交相または都道府県知事から行政処分を受ける可能性があります。",
    warn: true,
  },
];

export default function LawCompliance({ lawDays }: Props) {
  return (
    <section
      id="law"
      className="relative overflow-hidden bg-kenmitsu-ink py-[clamp(64px,9vw,120px)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, #000 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, #000 40%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-14">
          <SectionHeading
            onDark
            eyebrow="Law Compliance"
            eyebrowColor="#FDE68A"
            title={
              <>
                改正建設業法で、
                <br />
                見積書の何が変わったか
              </>
            }
            lead={
              <>
                2025年12月全面施行。
                <span className="font-mono font-bold text-[#FDE68A]">
                  {lawDays}日
                </span>
                が経過した今、すべての建設業者に対応義務があります。
              </>
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <article
              key={it.title}
              className={`relative overflow-hidden rounded-[18px] border p-7 md:p-8 ${
                it.warn
                  ? "border-[rgba(245,158,11,0.4)] bg-[rgba(180,83,9,0.18)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div
                className="absolute left-0 top-0 px-3.5 pl-6 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]"
                style={{
                  color: it.warn ? "#1A1200" : "#0B1220",
                  background: it.warn ? "#F59E0B" : "#FDE68A",
                  clipPath:
                    "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
                }}
              >
                {it.tag}
              </div>
              <div
                aria-hidden
                className="absolute right-7 top-6 font-mono text-[40px] font-black tracking-[-0.02em] text-white/[0.07] md:text-[44px]"
              >
                0{i + 1}
              </div>
              <div className="relative mt-10">
                <h3 className="mb-3 flex items-center gap-2 text-[19px] font-black leading-[1.4] tracking-[-0.01em] text-white md:text-[22px]">
                  {it.warn && <AlertIcon color="#F59E0B" />}
                  <span>{it.title}</span>
                </h3>
                <p className="text-[14px] leading-[1.85] text-white/75 md:text-[15px]">
                  {it.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* tool covers all callout */}
        <div className="mt-10 flex flex-wrap items-center gap-6 rounded-[20px] border-[1.5px] border-kenmitsu-navy100 bg-gradient-to-br from-kenmitsu-navy/30 to-kenmitsu-navy/10 px-6 py-7 md:gap-8 md:px-10 md:py-8">
          <div
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-kenmitsu-navy md:h-[72px] md:w-[72px]"
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M20 4 L34 10 L34 22 Q34 32 20 37 Q6 32 6 22 L6 10 Z"
                fill="#fff"
                opacity="0.2"
              />
              <path
                d="M12 19 L18 25 L28 13"
                stroke="#fff"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-[200px] flex-1">
            <div className="mb-1.5 text-[12px] font-bold tracking-[0.1em] text-[#FDE68A] md:text-[13px]">
              本ツールは上記すべてに対応しています
            </div>
            <p className="text-[14px] leading-[1.75] text-white/85 md:text-[15px]">
              フォーム入力時に自動で法令準拠をチェック。労務費・法定福利費・諸経費の段階計算、瑕疵担保条項のデフォルトテンプレ、「一式」検知警告、見積条件書フォーマットを搭載。
            </p>
          </div>
          <Link
            href="/construction/new"
            className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-6 py-3.5 text-[15px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px"
          >
            試す
            <ArrowIcon color="#1A1200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
