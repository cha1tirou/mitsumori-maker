import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./icons";

const features = [
  {
    title: "改正建設業法のルールに沿った見積書を作成",
    body: "労務費・法定福利費・経費を内訳明示した形式で PDF 出力。元請けへの提出書類として法令準拠の書式で出せます。",
  },
  {
    title: "リアルタイム法令チェッカー",
    body: "「一式」記載・労務費の漏れ・法定福利費の未計上などを入力中に自動検出して警告。出す前に気づける仕組み。",
  },
  {
    title: "労務費・法定福利費の自動計算",
    body: "明細で費目「労務費」を選んだ項目の合計から、法定福利費を自動計算。料率は工事や規模に応じて編集可（標準は労務費の約 20%）。改正法準拠の内訳サマリーが PDF 末尾に印字されます。",
  },
  {
    title: "工種プリセット・諸経費自動計算",
    body: "建設業の工種別テンプレート、現場管理費・一般管理費の業界標準率を初期搭載。ゼロから書式を考える必要なし。",
  },
];

export default function KenmitsuFeatures() {
  return (
    <section className="bg-white py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Features"
            title="ケンミツが改正法対応のために搭載している機能"
            lead="改正建設業法 2025 に対応するための専用機能を標準装備。"
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
      </div>
    </section>
  );
}
