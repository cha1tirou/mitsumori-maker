import Link from "next/link";
import { ArrowIcon } from "./icons";

export default function LeadMagnets() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Solo 7日間無料体験 */}
          <div className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 px-5 py-5 text-white sm:flex-row sm:items-center md:px-6 md:py-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-5 -right-5 opacity-[0.15]"
            >
              <svg width="140" height="140" viewBox="0 0 120 120">
                <path
                  d="M60 10 L100 30 L100 70 Q100 100 60 115 Q20 100 20 70 L20 30 Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="relative min-w-0">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] opacity-85 md:text-[12px]">
                登録後7日間、Solo全機能を無料体験
              </div>
              <div className="text-[14px] leading-[1.55] opacity-90 md:text-[15px]">
                透かしなしPDF・無制限保存・メール送信。カード登録不要。
              </div>
            </div>
            <Link
              href="/construction/new"
              className="relative inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[10px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-4 py-2.5 text-[13px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_18px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px sm:self-auto"
            >
              試す
              <ArrowIcon color="#1A1200" />
            </Link>
          </div>

          {/* チェックリスト */}
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
