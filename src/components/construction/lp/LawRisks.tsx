import SectionHeading from "./SectionHeading";
import { AlertIcon } from "./icons";

const adminRisks = [
  "監督官庁による指導",
  "勧告 → 企業名公表（インターネット上で公開）",
  "業務改善命令",
  "営業停止処分",
  "建設業許可の取消",
  "経営事項審査評点の悪化（公共工事入札で不利）",
];

const businessRisks = [
  "見積書差し戻しによる工期遅延",
  "再提出・修正の手間で実質的な工数増",
  "元請けからの取引縮小・取引停止",
  "「ルールを知らない業者」としての信用低下",
];

export default function LawRisks() {
  return (
    <section className="bg-amber-50/60 border-y border-amber-200/60 py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Risks"
            title="対応しないとどうなる？"
            lead="行政側の処分と、元請け側の実害。両方のリスクが同時に発生します。"
            eyebrowColor="#B45309"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* 行政処分 */}
          <article className="rounded-2xl border-[1.5px] border-amber-300 bg-white p-6 md:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100">
                <AlertIcon color="#B45309" />
              </span>
              <h3 className="text-[17px] font-black text-kenmitsu-ink md:text-[19px]">
                監督官庁からの処分
              </h3>
            </div>
            <ul className="space-y-2.5">
              {adminRisks.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-kenmitsu-ink2 md:text-[14px]"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-amber-700"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 元請け実害 */}
          <article className="rounded-2xl border-[1.5px] border-amber-300 bg-white p-6 md:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100">
                <AlertIcon color="#B45309" />
              </span>
              <h3 className="text-[17px] font-black text-kenmitsu-ink md:text-[19px]">
                元請けからの実害
              </h3>
            </div>
            <ul className="space-y-2.5">
              {businessRisks.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-kenmitsu-ink2 md:text-[14px]"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-amber-700"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-6 text-center text-[11px] text-kenmitsu-muted md:text-[12px]">
          ※ 改正建設業法（2025 年 12 月 12 日全面施行）に基づく行政処分・元請け実務上のリスク。実際の処分は違反内容・程度により段階的に適用されます。
        </p>
      </div>
    </section>
  );
}
