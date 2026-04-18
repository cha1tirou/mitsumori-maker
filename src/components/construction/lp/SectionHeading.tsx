type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  eyebrowColor?: string;
  onDark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  eyebrowColor,
  onDark = false,
}: Props) {
  const ebColor = eyebrowColor ?? (onDark ? "#FDE68A" : "#1E40AF");
  return (
    <div className="text-center">
      <span
        className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] md:text-[12px]"
        style={{ color: ebColor }}
      >
        <span
          aria-hidden
          className="inline-block h-[2px] w-7"
          style={{ background: ebColor }}
        />
        {eyebrow}
      </span>
      <h2
        className={`mt-3.5 text-[26px] font-black leading-[1.35] tracking-[-0.01em] md:text-[clamp(28px,4vw,44px)] ${
          onDark ? "text-white" : "text-kenmitsu-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.8] md:text-[17px] ${
            onDark ? "text-white/75" : "text-kenmitsu-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
