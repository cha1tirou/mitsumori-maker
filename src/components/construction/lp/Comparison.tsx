import SectionHeading from "./SectionHeading";
import { CheckIcon, XIcon } from "./icons";

const rows = [
  {
    label: "対応する建設業法の改正",
    us: "2025年12月施行の改正版に対応",
    them: "未対応・対応時期不明のツール多数",
  },
  {
    label: "料金（一人親方向け）",
    us: "月1,980円（有料プラン）",
    them: "月9,800〜数万円（大手ソフト）",
    highlight: true,
  },
  {
    label: "導入の手続き",
    us: "メアド登録だけで即利用 → 気に入ったら課金",
    them: "お問い合わせ → 営業 → デモ → 契約",
  },
  {
    label: "学習コスト",
    us: "3分で最初の見積が完成。研修不要",
    them: "導入研修が必要。定着まで数週間",
  },
  {
    label: "デバイス",
    us: "PC・スマホ・タブレット 全対応",
    them: "PC前提・Windows専用のツールも",
  },
  {
    label: "見積書の位置づけ",
    us: "見積書のためだけに作られた専用ツール",
    them: "施工管理がメイン、見積は付属機能",
  },
  {
    label: "Excelからの移行",
    us: "Excelインポート対応。今の感覚で使える",
    them: "業務フロー全体の変更が必要",
  },
];

export default function Comparison() {
  return (
    <section
      id="compare"
      className="bg-kenmitsu-paper py-[clamp(64px,9vw,120px)]"
    >
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-14">
          <SectionHeading eyebrow="Comparison" title="大手ソフトとの違い" />
        </div>

        {/* --- Mobile: card per row (<640px) --- */}
        <div className="space-y-3 sm:hidden">
          {/* brand header card */}
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-kenmitsu-navy px-4 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <div
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-md bg-white font-black text-kenmitsu-navy"
              >
                建
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-black tracking-[0.02em]">
                  ケンミツ
                </div>
                <div className="text-[10px] opacity-80 tracking-[0.08em]">
                  KENMITSU
                </div>
              </div>
            </div>
            <span className="rounded-full bg-kenmitsu-orange px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.1em] text-[#1A1200]">
              RECOMMENDED
            </span>
          </div>

          {rows.map((r) => (
            <div
              key={r.label}
              className="overflow-hidden rounded-2xl border border-kenmitsu-line bg-white"
            >
              <div className="bg-kenmitsu-paper px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-kenmitsu-muted">
                {r.label}
              </div>
              <div
                className={`flex items-start gap-2.5 border-l-[3px] border-kenmitsu-navy px-4 py-3 ${
                  r.highlight
                    ? "bg-gradient-to-b from-kenmitsu-orange50 to-white"
                    : "bg-kenmitsu-navy50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <CheckIcon color="#1E40AF" />
                </div>
                <div
                  className={`flex-1 text-[13.5px] leading-[1.55] text-kenmitsu-ink ${
                    r.highlight ? "font-black" : "font-bold"
                  }`}
                >
                  <span className="mr-1.5 rounded bg-kenmitsu-navy/10 px-1.5 py-0.5 text-[10px] font-bold text-kenmitsu-navy">
                    ケンミツ
                  </span>
                  {r.us}
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-[#F5F7FB] px-4 py-3 text-kenmitsu-muted">
                <div className="mt-0.5 shrink-0">
                  <XIcon color="#9CA3AF" />
                </div>
                <div className="flex-1 text-[13px] leading-[1.55]">
                  <span className="mr-1.5 rounded bg-kenmitsu-line px-1.5 py-0.5 text-[10px] font-bold text-kenmitsu-muted">
                    大手ソフト
                  </span>
                  {r.them}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Desktop/tablet: real 3-column table (≥640px) --- */}
        <div className="hidden overflow-hidden rounded-3xl border border-kenmitsu-line bg-white shadow-[0_30px_60px_-30px_rgba(30,64,175,0.22)] sm:block">
          {/* header row */}
          <div className="grid grid-cols-[minmax(130px,1.2fr)_1.4fr_1.4fr]">
            <div className="bg-kenmitsu-paper px-4 py-5 text-[11px] font-bold uppercase tracking-[0.12em] text-kenmitsu-muted md:px-7 md:py-6 md:text-[12px]">
              比較項目
            </div>
            <div className="relative flex items-center gap-3 bg-kenmitsu-navy px-4 py-5 text-white md:px-7 md:py-6">
              <div
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-md bg-white font-black text-kenmitsu-navy md:h-9 md:w-9"
              >
                建
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-black tracking-[0.02em] md:text-[18px]">
                  ケンミツ
                </div>
                <div className="text-[10px] opacity-80 tracking-[0.08em] md:text-[11px]">
                  KENMITSU
                </div>
              </div>
              <span className="absolute right-3 top-2.5 rounded-full bg-kenmitsu-orange px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.1em] text-[#1A1200] md:right-3.5 md:top-3 md:text-[10px]">
                RECOMMENDED
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#EEF2F8] px-4 py-5 text-[14px] font-bold tracking-[0.04em] text-kenmitsu-muted md:px-7 md:py-6 md:text-[16px]">
              <div
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-md bg-[#D8DEE8] font-black text-kenmitsu-muted md:h-9 md:w-9"
              >
                大
              </div>
              大手ソフト
            </div>
          </div>

          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[minmax(130px,1.2fr)_1.4fr_1.4fr] border-t border-kenmitsu-line2"
            >
              <div className="bg-kenmitsu-paper px-4 py-4 text-[12px] font-bold text-kenmitsu-ink md:px-7 md:py-5 md:text-[14px]">
                {r.label}
              </div>
              <div
                className={`flex items-start gap-2.5 border-l-[3px] border-kenmitsu-navy px-4 py-4 md:gap-3 md:px-7 md:py-5 ${
                  r.highlight
                    ? "bg-gradient-to-b from-kenmitsu-orange50 to-white"
                    : "bg-kenmitsu-navy50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <CheckIcon color="#1E40AF" />
                </div>
                <div
                  className={`leading-[1.55] text-kenmitsu-ink ${
                    r.highlight
                      ? "text-[14px] font-black md:text-[16px]"
                      : "text-[13px] font-bold md:text-[15px]"
                  }`}
                >
                  {r.us}
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-[#F5F7FB] px-4 py-4 text-kenmitsu-muted md:gap-3 md:px-7 md:py-5">
                <div className="mt-0.5 shrink-0">
                  <XIcon color="#9CA3AF" />
                </div>
                <div className="text-[13px] leading-[1.55] md:text-[14px]">
                  {r.them}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
