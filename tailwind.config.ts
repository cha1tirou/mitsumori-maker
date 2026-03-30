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
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
