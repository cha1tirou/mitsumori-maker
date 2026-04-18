type Props = {
  tone?: "light" | "dark";
  cell?: number;
  opacity?: number;
  withMask?: boolean;
  className?: string;
};

export default function BlueprintBg({
  tone = "light",
  cell = 16,
  opacity = 0.6,
  withMask = true,
  className = "",
}: Props) {
  const stroke =
    tone === "dark"
      ? "rgba(255,255,255,0.10)"
      : "rgba(30,64,175,0.045)";
  const mask =
    "radial-gradient(ellipse at 50% 30%, #000 50%, transparent 78%)";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `linear-gradient(to right, ${stroke} 1px, transparent 1px), linear-gradient(to bottom, ${stroke} 1px, transparent 1px)`,
        backgroundSize: `${cell}px ${cell}px`,
        maskImage: withMask ? mask : undefined,
        WebkitMaskImage: withMask ? mask : undefined,
      }}
    />
  );
}
