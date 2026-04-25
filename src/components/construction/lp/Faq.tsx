import SectionHeading from "./SectionHeading";

const items = [
  {
    q: "本当に無料で使えますか？",
    a: "はい。メールアドレスとパスワードだけで無料登録でき、見積書は何枚でも作成・PDFダウンロード・クラウド保存できます。クレジットカード登録は一切不要です。改正建設業法 2025 対応版の PDF を出力したい場合だけ、Solo プラン（月¥980）にアップグレードしてください。",
  },
  {
    q: "Free プランと Solo プランの違いは？",
    a: "見積書の作成・編集・保存・通常 PDF 出力は Free プランで全て無制限に使えます。Solo プラン（月¥980）にすると、改正建設業法 2025 対応版の PDF（労務費・法定福利費・経費の内訳明示）が出力できるようになり、加えて取引先マスタ・単価マスタ・原価粗利分析・工事写真添付などの機能が解放されます。",
  },
  {
    q: "改正建設業法 2025 対応とは具体的に何ですか？",
    a: "2025 年 12 月に全面施行された改正建設業法では、労務費（人件費）の内訳明示、「一式」記載の適正化、見積条件書の記載事項の明確化などが努力義務になっています。Solo プランの PDF は労務費・法定福利費（労務費 × 14.6%）・経費を内訳明示した形式で出力できます。元請けからの差し戻しリスクを下げるために有効です。",
  },
  {
    q: "なぜ Solo は月¥980 でできるのですか？",
    a: "建設業向けの業務管理 SaaS（AnyONE / コンクルー Cloud / サクミル等）は会社全体の業務管理（顧客・案件・工程・原価・帳票）をフル装備した月¥9,800〜¥30,000 のプロダクトです。ケンミツは「一人親方の見積書作成」に機能を絞り込むことで、改正法対応 PDF を月¥980 で提供できます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。",
  },
  {
    q: "一人親方ではなく、5〜10人規模の工務店でも使えますか？",
    a: "もちろん使えます。アカウント複数名プラン（Team ¥2,980/月）を準備しています。顧客管理・見積履歴の共有などが可能になります。",
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
