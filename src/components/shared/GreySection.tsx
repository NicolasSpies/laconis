import type { ReactNode } from "react";

/**
 * GreySection · section-wrapper mit dot-grid.
 *
 * tonaler umbau (juni 2026): tone="grey" raus — es renderte exakt den
 * body-hintergrund (--bg) und täuschte nur struktur vor. helle sektionen
 * laufen jetzt als plain <section> auf papier. übrig bleiben:
 *
 *   tone="paper" (default) · #f2f2f2 · echter subtiler card-unterschied
 *   tone="dark"  · #0a0a0a · ein "dark room" (data-theme-flip → tokens
 *                  offwhite/accent-ink kippen automatisch auf hell/lime)
 *
 * tints (lime/lila radial) bleiben als akzent erlaubt.
 */

type Props = {
  children: ReactNode;
  tone?: "dark" | "paper";
  tint?: "lime" | "lila" | null;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

const TONES = {
  dark: { bg: "#0a0a0a", fg: "#f2f2f2", dot: "rgba(255,255,255,0.18)" },
  paper: { bg: "#f2f2f2", fg: "#0a0a0a", dot: "rgba(20,20,20,0.4)" },
} as const;

export function GreySection({
  children,
  tone = "paper",
  tint = null,
  className = "",
  id,
  ...rest
}: Props) {
  const t = TONES[tone];

  return (
    <section
      id={id}
      data-theme={tone === "dark" ? "dark" : undefined}
      aria-label={rest["aria-label"]}
      className={`relative py-20 md:py-28 overflow-hidden ${className}`}
      style={{ background: t.bg, color: t.fg }}
    >
      {tint && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              tint === "lime"
                ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(225,253,82,0.20) 0%, transparent 70%)"
                : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,132,211,0.20) 0%, transparent 70%)",
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${t.dot} 1px, transparent 1.4px)`,
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-site relative">{children}</div>
    </section>
  );
}
