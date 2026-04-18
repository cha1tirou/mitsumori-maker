import SectionHeading from "./SectionHeading";

const items = [
  {
    q: "本当に無料で試せますか？",
    a: "はい。登録もクレジットカード登録も不要で、見積書の作成・PDF出力まで無料で試せます。ただし無料版のPDFには「無料版 SAMPLE」の透かしが入ります。透かしなしの正式版が必要な場合は Solo プラン（月¥980）からご利用ください。",
  },
  {
    q: "なぜ無料版PDFには透かしが入るのですか？",
    a: "当サービスは広告収入に依存せず、皆様のサブスクリプション収入で運営しています。Freeプランは「試用目的」と位置付け、実際の取引先に提出する際は透かしなしの Solo プランをお選びいただく設計にしています。透かしの有無以外に機能制限はありません（保存機能は登録必須）。",
  },
  {
    q: "建設業法2025対応とは具体的に何ですか？",
    a: "2025年12月に全面施行される改正建設業法では、労務費（人件費）の内訳明示、「一式」記載の適正化、見積条件書の記載事項の明確化などが努力義務となります。本ツールはこれらをフォーム入力時にリアルタイムでチェックし、漏れを警告する機能を搭載しています。",
  },
  {
    q: "既存の会計ソフト（弥生・freee等）との連携はできますか？",
    a: "現時点では連携機能は提供していません。見積書はPDFで出力してメール添付・印刷・保存できます。将来的にCSV出力や会計ソフト連携を検討しています。",
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
