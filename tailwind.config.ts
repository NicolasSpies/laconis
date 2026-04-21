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
        lime: "rgb(var(--accent) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent) / <alpha-value>)",
        anthrazit: "rgb(var(--anthrazit) / <alpha-value>)",
        offwhite: "rgb(var(--fg) / <alpha-value>)",
        grey: "rgb(var(--fg-muted) / <alpha-value>)",
        dark: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        muted: "rgb(var(--fg-subtle) / <alpha-value>)",
        line: "rgb(var(--ink) / <alpha-value>)",
        /* semantic ink — use in place of `white/X` for theme-aware overlays */
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      letterSpacing: {
        mono: "0.02em",
        label: "0.12em",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(56,56,56,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,56,56,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};
export default config;
