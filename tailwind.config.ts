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
        "accent-ink": "rgb(var(--accent-text) / <alpha-value>)",
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
      /* ── rhythmus & schalen ───────────────────────────────────
         es gab neun sektionsabstände ohne system (pb-16 bis pb-40,
         py-24/32, py-32/44, pt-28/32/36/44). vier stufen reichen ·
         die kleinste von heute (64px) ist kein rhythmus, sondern
         innenabstand, den deckt die spacing-skala ab.

         schale 1200 → 1080: bei 1440px sind das 180px rand je seite
         statt 120 (+50%). das ist der weissraum, den man ohne
         werkzeug sieht. */
      spacing: {
        "rh-s": "var(--rh-s)",
        "rh-m": "var(--rh-m)",
        "rh-l": "var(--rh-l)",
        "rh-xl": "var(--rh-xl)",
        gut: "var(--gutter)",
        /* nav-höhe plus eine kleine stufe · der hero darf nicht
           unter der leiste kleben */
        hero: "calc(64px + var(--rh-s))",
      },
      maxWidth: {
        shell: "var(--shell)",
        "shell-wide": "var(--shell-wide)",
        "shell-narrow": "var(--shell-narrow)",
      },
      /* ── schriftgrössen · 7 rollen ────────────────────────────
         es gab 37 verschiedene clamp()-ausdrücke bei 62 verwendungen,
         für geschätzt 7 tatsächliche rollen. mehrere sahen faktisch
         gleich aus und existierten trotzdem getrennt (3rem/10vw/9rem
         neben 3rem/10vw/10rem neben 2.9rem/8.6vw/8rem).

         die werte zeigen auf custom properties, damit die .css-dateien
         dieselbe quelle lesen können · eine skala, zwei verbraucher.

         GRÖSSE ist eine skala, STIMME ist eine klasse: font-family und
         font-stretch bleiben in .lab-display / .lab-label. zwei
         orthogonale dinge, zwei mechanismen. */
      fontSize: {
        "display-xl": ["var(--fs-display-xl)", { lineHeight: "0.86", letterSpacing: "-0.035em" }],
        display: ["var(--fs-display)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        headline: ["var(--fs-headline)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        title: ["var(--fs-title)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        lead: ["var(--fs-lead)", { lineHeight: "1.55" }],
        body: ["var(--fs-body)", { lineHeight: "1.65" }],
        "body-sm": ["var(--fs-body-sm)", { lineHeight: "1.55" }],
        label: ["var(--fs-label)", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      fontFamily: {
        sans: ["var(--font-sans-v2)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
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
