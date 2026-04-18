import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { color?: string };

export function CheckIcon({ color = "#0E7A52", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <path
        d="M3 9 L7 13 L15 4"
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon({ color = "#DC2626", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <path
        d="M4 4 L14 14 M14 4 L4 14"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ color = "#fff", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <path
        d="M3 9 L14 9 M10 5 L14 9 L10 13"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon({ color = "#B45309", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <path
        d="M9 2 L16 15 L2 15 Z"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M9 7 L9 11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="13" r="0.9" fill={color} />
    </svg>
  );
}

export function BoltIcon({ color = "#F59E0B", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <path d="M10 1 L3 10 L8 10 L6 17 L15 7 L10 7 Z" fill={color} />
    </svg>
  );
}

export function ClockIcon({ color = "#55617A", ...rest }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden {...rest}>
      <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.8" fill="none" />
      <path
        d="M9 5 L9 9 L12 11"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HelmetIcon({ color = "#F59E0B", ...rest }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden {...rest}>
      <path d="M2 14 Q2 6 10 6 Q18 6 18 14 L18 15 L2 15 Z" fill={color} />
      <rect x="1" y="14" width="18" height="2" rx="1" fill="#C27803" />
    </svg>
  );
}
