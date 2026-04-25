import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./icons";

const features = [
  {
    title: "改正建設業法 2025 対応 PDF",
    body: "労務費・法定福利費・経費を内訳明示した形式で PDF 出力。元請けへの提出書類として法令準拠の書式で出せます。",
  },
  {
    title: "リアルタイム法令チェッカー",
    body: "「一式」記載・労務費の漏れ・法定福利費の未計上などを入力中に自動検出して警告。出す前に気づける仕組み。",
  },
  {
    title: "労務費・法定福利費の自動計算",
    body: "労務費比率を入れるだけで法定福利費（労務費 × 14.6%）を自動計算。改正法準拠の内訳サマリーが PDF 末尾に印字されます。",
  },
  {
    title: "工種プリセット・諸経費自動計算",
    body: "建設業の工種別テンプレート、現場管理費・一般管理費の業界標準率を初期搭載。ゼロから書式を考える必要なし。",
  },
];

const others = [
  "汎用見積書ツール（freee 見積書・MISOCA 等）には改正法対応のフォーマットなし",
  "建設業向けの大手 SaaS（業務管理フル装備）は月¥9,800 〜 ¥30,000 と高額",
];

export default function KenmitsuFeatures() {
  return (
    <section className="bg-white py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Features"
            title="ケンミツが改正法対応のために搭載している機能"
            lead="他社サービスには無い、改正建設業法 2025 に対応するための専用機能を標準装備。"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-kenmitsu-line bg-white p-6 md:p-7"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-kenmitsu-okBg">
                  <CheckIcon color="#0E7A52" />
                </span>
                <h3 className="text-[17px] font-black leading-snug text-kenmitsu-ink md:text-[19px]">
                  {f.title}
                </h3>
              </div>
              <p className="text-[13px] leading-[1.85] text-kenmitsu-ink2 md:text-[14px]">
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-kenmitsu-paper/60 p-5 md:p-6">
          <p className="mb-3 text-[11px] font-black tracking-[0.18em] text-kenmitsu-muted md:text-[12px]">
            VS OTHERS
          </p>
          <p className="mb-3 text-[14px] font-bold text-kenmitsu-ink md:text-[15px]">
            汎用ツールでは改正法に対応できない、大手 SaaS は高すぎる
          </p>
          <ul className="space-y-1.5">
            {others.map((o) => (
              <li
                key={o}
                className="flex items-start gap-2 text-[12px] text-kenmitsu-ink2 md:text-[13px]"
              >
                <span
                  aria-hidden
                  className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-kenmitsu-muted"
                />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
