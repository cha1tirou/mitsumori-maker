import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1a1a2e",
          light: "#2d2d4a",
          dark: "#12121f",
        },
        accent: {
          DEFAULT: "#e94560",
          light: "#ff6b81",
          dark: "#c23152",
        },
        kenmitsu: {
          ink: "#0B1220",
          ink2: "#1F2A44",
          muted: "#55617A",
          muted2: "#8B95AB",
          line: "#E3E8F1",
          line2: "#EEF2F8",
          paper: "#F7F9FC",
          paper2: "#FBFCFE",
          navy: "#1E40AF",
          navy600: "#1D3E9E",
          navy700: "#17308A",
          navy900: "#0B1F63",
          navy50: "#EEF3FF",
          navy100: "#DCE6FF",
          orange: "#F59E0B",
          orange600: "#E08A00",
          orange50: "#FFF6E0",
          warn: "#B45309",
          warnBg: "#FEF3C7",
          ok: "#0E7A52",
          okBg: "#E7F6EE",
          blueprint: "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
