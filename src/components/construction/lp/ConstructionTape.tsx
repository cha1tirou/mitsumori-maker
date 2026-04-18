type Props = {
  placement?: "top" | "top-right" | "bottom" | "inline";
  height?: number;
  width?: number | string;
  angle?: number;
  className?: string;
};

export default function ConstructionTape({
  placement = "top-right",
  height = 8,
  width = 360,
  angle = -45,
  className = "",
}: Props) {
  const base = {
    background: `repeating-linear-gradient(${angle}deg, #F59E0B 0 14px, #1F2A44 14px 24px)`,
    height,
    width,
  } as const;

  if (placement === "inline") {
    return (
      <div
        aria-hidden
        className={className}
        style={{ ...base, width: width === 360 ? "100%" : width }}
      />
    );
  }

  const posClass =
    placement === "top"
      ? "absolute top-0 left-0 right-0"
      : placement === "bottom"
        ? "absolute bottom-0 left-0 right-0"
        : "absolute top-0 right-0";
  const inlineStyle =
    placement === "top" || placement === "bottom"
      ? { ...base, width: "100%" }
      : base;

  return (
    <div
      aria-hidden
      className={`pointer-events-none ${posClass} ${className}`}
      style={inlineStyle}
    />
  );
}
