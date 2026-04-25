import SectionHeading from "./SectionHeading";

const items = [
  {
    num: "01",
    title: "労務費の内訳明示",
    body: "見積書に「労務費（人件費）」を明示する義務化。中央建設業審議会が勧告する標準労務費を著しく下回る見積りは禁止に。",
  },
  {
    num: "02",
    title: "「一式」記載の適正化",
    body: "「内装工事 一式 ¥XX,XXX」のような曖昧な記載は不可。品名・数量・単価を明記して内訳が分かる形で記載する必要があります。",
  },
  {
    num: "03",
    title: "法定福利費の独立計上",
    body: "健康保険・厚生年金・雇用保険等の法定福利費（労務費 × 14.6%）を独立して見積書に計上。元請けに対しても明示が求められます。",
  },
];

export default function LawObligations() {
  return (
    <section className="bg-white py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="What Changed"
            title="改正建設業法 2025 で何が変わった？"
            lead="2025 年 12 月 12 日に全面施行。見積書のルールが大幅に強化されました。"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.num}
              className="rounded-2xl border border-kenmitsu-line bg-kenmitsu-paper/40 p-6 md:p-7"
            >
              <div className="mb-3 font-mono text-[11px] font-black tracking-[0.18em] text-kenmitsu-orange md:text-[12px]">
                CHANGE {it.num}
              </div>
              <h3 className="mb-3 text-[18px] font-black leading-snug text-kenmitsu-ink md:text-[20px]">
                {it.title}
              </h3>
              <p className="text-[13px] leading-[1.85] text-kenmitsu-ink2 md:text-[14px]">
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
