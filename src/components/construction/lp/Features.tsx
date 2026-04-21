import { IluCard, type IluKind } from "./illustrations";
import SectionHeading from "./SectionHeading";

const items: { kind: IluKind; tag: string; title: string; body: string }[] = [
  {
    kind: "lawCheck",
    tag: "法令対応",
    title: "改正建設業法2025に完全対応",
    body: "2025年12月施行の改正建設業法が求める労務費の内訳明示・「一式」表記の注意喚起・見積条件書の必須記載項目を自動チェック。法令遵守のための判断をツールが支援します。",
  },
  {
    kind: "presets",
    tag: "プリセット",
    title: "8工種の見積プリセット",
    body: "電気・水道設備・内装・土木・外構・大工・左官・鳶足場の8工種それぞれに代表的な明細項目・単価レンジ・単位をあらかじめ用意。1クリックで見積の骨格が完成します。",
  },
  {
    kind: "autocalc",
    tag: "自動計算",
    title: "諸経費の自動計算",
    body: "直接工事費から現場管理費（デフォ6%）・一般管理費（デフォ10%）を自動計算。業界標準の数値をスタート地点としつつ、案件ごとに柔軟に調整可能。",
  },
  {
    kind: "phone",
    tag: "モバイル",
    title: "スマホで完結する軽量UI",
    body: "現場から見積書を作成→PDFダウンロードまで完結。PC専用の重いソフトとは違い、片手のスマホ操作で見積業務が終わります。",
  },
  {
    kind: "rocket",
    tag: "即時",
    title: "登録不要で今すぐ試せる",
    body: "他社ツールのように「お問い合わせ→デモ」の重い入口はありません。このページの下から即座にツールを触って、自分の業務に合うか確認できます。",
  },
  {
    kind: "cloud",
    tag: "クラウド",
    title: "見積履歴を自動保存",
    body: "有料プランなら作成した見積書をすべてクラウドに保存。再編集・コピー・過去案件からの複製で、2通目以降の作成時間を大幅短縮できます。",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Features"
            title={
              <>
                <span className="text-kenmitsu-navy">6つの専用機能</span>で、
                <br className="md:hidden" />
                見積業務を最短化
              </>
            }
            lead="汎用ツールにはない、建設業専用の機能を搭載"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="flex flex-col overflow-hidden rounded-[20px] border border-kenmitsu-line2 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(30,64,175,0.22)]"
            >
              <div className="bg-kenmitsu-navy50">
                <IluCard kind={it.kind} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-kenmitsu-navy md:text-[11px]">
                    {String(i + 1).padStart(2, "0")} / 06
                  </span>
                  <span className="inline-flex items-center rounded-full bg-kenmitsu-navy50 px-2.5 py-0.5 text-[10px] font-bold text-kenmitsu-navy md:text-[11px]">
                    {it.tag}
                  </span>
                </div>
                <h3 className="text-[18px] font-black leading-[1.5] tracking-[-0.01em] md:text-[20px]">
                  {it.title}
                </h3>
                <p className="text-[13px] leading-[1.8] text-kenmitsu-muted md:text-[14px]">
                  {it.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
