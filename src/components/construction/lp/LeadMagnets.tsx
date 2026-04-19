import Link from "next/link";
import { ArrowIcon } from "./icons";

export default function LeadMagnets() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border-[1.5px] border-kenmitsu-line bg-white px-5 py-5 sm:flex-row sm:items-center md:px-6 md:py-5">
            <div className="min-w-0">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-kenmitsu-navy md:text-[12px]">
                改正建設業法2025 対応チェックリスト（無料）
              </div>
              <div className="text-[14px] leading-[1.55] text-kenmitsu-muted md:text-[15px]">
                30項目を8セクションで自己診断。PDF版もメール配布。
              </div>
            </div>
            <Link
              href="/construction/checklist"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[10px] border-[1.5px] border-kenmitsu-line bg-white px-4 py-2.5 text-[13px] font-bold text-kenmitsu-ink hover:border-kenmitsu-ink sm:self-auto"
            >
              見る
              <ArrowIcon color="#0B1220" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
