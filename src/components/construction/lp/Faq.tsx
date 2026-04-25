import SectionHeading from "./SectionHeading";

const items = [
  {
    q: "改正建設業法 2025 で何が変わったのですか？",
    a: "2025 年 12 月 12 日に全面施行されました。労務費（人件費）の内訳明示、「一式」記載の適正化、法定福利費（労務費 × 14.6%）の独立計上が義務化されました。中央建設業審議会が勧告する標準労務費を著しく下回る見積りも禁止されています。",
  },
  {
    q: "違反するとどうなりますか？",
    a: "監督官庁から段階的に処分が下されます。指導 → 勧告 → 企業名公表 → 業務改善命令 → 営業停止 → 建設業許可の取消。経営事項審査評点も下がり公共工事入札で不利に。元請けからの見積書差し戻し・取引縮小のリスクもあります。",
  },
  {
    q: "なぜケンミツは月¥980 で改正法対応にできるのですか？",
    a: "建設業向けの業務管理 SaaS は顧客・案件・工程・原価・帳票をフル装備した月¥9,800〜¥30,000 のプロダクトが中心です。ケンミツは「中小建設業者の見積書作成」に機能を絞り込むことで、改正建設業法のルールに沿った見積書を月¥980 で提供できます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。解約後も 180 日間はデータ保持されます。",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-kenmitsu-paper py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto max-w-[920px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading eyebrow="FAQ" title="よくある質問" />
        </div>

        <div className="flex flex-col gap-3">
          {items.map((it, i) => (
            <details
              key={it.q}
              className="group overflow-hidden rounded-[14px] border border-kenmitsu-line bg-white transition-colors open:border-kenmitsu-navy100"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-kenmitsu-ink md:px-6 [&::-webkit-details-marker]:hidden">
                <span className="w-6 shrink-0 font-mono text-[14px] font-black text-kenmitsu-navy md:text-[15px]">
                  Q.
                </span>
                <span className="flex-1 text-[14px] font-bold leading-[1.6] md:text-[16px]">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-kenmitsu-paper text-[16px] font-bold text-kenmitsu-muted transition-colors group-open:bg-kenmitsu-navy group-open:text-white"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="px-5 pb-5 pl-14 text-[13px] leading-[1.9] text-kenmitsu-muted md:px-6 md:pb-6 md:pl-[62px] md:text-[14px]">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
