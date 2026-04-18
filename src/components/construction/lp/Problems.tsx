import Link from "next/link";
import { IluCard, type IluKind } from "./illustrations";
import { ArrowIcon } from "./icons";
import SectionHeading from "./SectionHeading";

const items: { kind: IluKind; title: string; body: string; quote: string }[] = [
  {
    kind: "rejected",
    title: "「一式」で差し戻された",
    body: "改正建設業法で内訳明示が努力義務化。元請の検収部門から「一式では通らない」と戻されることが増えた。",
    quote: "「一式じゃダメ」ってなんで最近急に言われるの？",
  },
  {
    kind: "confused",
    title: "法改正で何が変わったのか、わからない",
    body: "労務費の内訳明示？見積条件書？瑕疵担保？——何をどう書き直せばいいのか、実務レベルで教えてくれる人がいない。",
    quote: "セミナー行く時間も、読み込む時間もない。",
  },
  {
    kind: "excel",
    title: "Excelテンプレを毎回コピーして手入力",
    body: "前回のファイルを開いて日付と金額を書き換えて……1件30分。月10件作ると月5時間が消える。",
    quote: "本業の時間、事務作業で削られてる。",
  },
  {
    kind: "offsite",
    title: "現場で出せず、事務所に戻らないと作れない",
    body: "発注者に「すぐ出して」と言われても、その場で対応できない。電話受けてから見積提出まで半日かかる。",
    quote: "「いま見積出せますか」がチャンスなのに。",
  },
  {
    kind: "calc",
    title: "諸経費・法定福利費の計算が面倒",
    body: "直接工事費から現場管理費6%、一般管理費10%を電卓で叩く。労務費に対する社会保険料も毎回計算。",
    quote: "電卓叩くたびに、値ぶれてないか不安。",
  },
  {
    kind: "expensive",
    title: "大手ソフトは月9,800円〜で重すぎる",
    body: "大手の建設業向けソフトは機能が多くて高額。一人親方や数名の工務店に、そこまでのスペックは要らない。",
    quote: "機能の9割、使う予定ないんだけど。",
  },
];

export default function Problems() {
  return (
    <section id="problems" className="bg-kenmitsu-paper py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Your Problems"
            title="こんな経験、ありませんか？"
            lead="建設業の一人親方・小規模工務店が抱える、よくある悩みです"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="relative flex flex-col gap-4 rounded-[20px] border border-kenmitsu-line2 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.18)] md:p-7"
            >
              <span
                aria-hidden
                className="absolute right-5 top-5 font-mono text-[13px] font-bold tracking-[0.06em] text-kenmitsu-muted2 md:text-[14px]"
              >
                #{String(i + 1).padStart(2, "0")}
              </span>
              <div className="overflow-hidden rounded-xl">
                <IluCard kind={it.kind} />
              </div>
              <h3 className="text-[17px] font-black leading-[1.5] tracking-[-0.01em] md:text-[19px]">
                {it.title}
              </h3>
              <p className="text-[13px] leading-[1.8] text-kenmitsu-muted md:text-[14px]">
                {it.body}
              </p>
              <div className="mt-auto flex items-start gap-2 border-t border-dashed border-kenmitsu-line pt-3.5 text-[13px] italic text-kenmitsu-ink2">
                <span
                  aria-hidden
                  className="text-[18px] font-black leading-none text-kenmitsu-orange"
                >
                  ❝
                </span>
                <span>{it.quote}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/construction/new"
            className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-8 py-4 text-[15px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px md:text-[17px]"
          >
            ↑ 全部解決するツールを試す（登録不要）
            <ArrowIcon color="#1A1200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
