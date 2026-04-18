import { AlertIcon, BoltIcon, CheckIcon, HelmetIcon } from "./icons";

const items = [
  {
    label: "改正建設業法",
    value: "2025/12",
    note: "施行済・対応済",
    Icon: <CheckIcon color="#1E40AF" />,
  },
  {
    label: "工種プリセット",
    value: "8工種",
    note: "電気・水道・内装・土木ほか",
    Icon: <HelmetIcon />,
  },
  {
    label: "建設業法チェック",
    value: "7項目",
    note: "自動警告",
    Icon: <AlertIcon color="#B45309" />,
  },
  {
    label: "月額",
    value: "¥980〜",
    note: "業界最安値帯",
    Icon: <BoltIcon />,
  },
];

export default function StatsBar() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1160px] px-5 pb-16 md:px-6">
        <div className="rounded-[20px] border border-kenmitsu-line bg-white p-2 shadow-[0_20px_48px_-28px_rgba(15,23,42,0.15)]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {items.map((t, i) => (
              <div
                key={t.label}
                className={[
                  "flex flex-col gap-1 px-4 py-5 md:px-5 md:py-6",
                  i % 2 === 1 ? "border-l border-kenmitsu-line2" : "",
                  i >= 2 ? "border-t border-kenmitsu-line2 md:border-t-0" : "",
                  i > 0 && i % 2 === 0 ? "md:border-l md:border-kenmitsu-line2" : "",
                  i > 0 && i === 3 ? "md:border-l md:border-kenmitsu-line2" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-kenmitsu-muted md:text-[11px]">
                  <span aria-hidden>{t.Icon}</span>
                  <span>{t.label}</span>
                </div>
                <div className="mt-1 font-mono text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-kenmitsu-ink md:text-[28px]">
                  {t.value}
                </div>
                <div className="text-[11px] text-kenmitsu-muted md:text-[12px]">
                  {t.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
