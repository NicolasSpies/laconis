import type { ReactNode } from "react";

/**
 * GreySection · einheitliche grey (#c8c8c8) section mit subtilem dot-grid.
 * matched dem hero-look damit cursor-morph konsistent durchs ganze layout glüht.
 *
 * usage:
 *   <GreySection>...content...</GreySection>
 *   <GreySection tone="dark">...</GreySection>  // #0a0a0a für proof/contrast
 *   <GreySection tint="lime">...</GreySection>  // mit lime radial-tint
 *   <GreySection tint="lila">...</GreySection>  // mit lila radial-tint
 */

type Props = {
  children: ReactNode;
  tone?: "grey" | "dark" | "paper";
  tint?: "lime" | "lila" | null;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

const TONES = {
  grey: { bg: "rgb(var(--bg))", fg: "#0a0a0a", dot: "rgba(20,20,20,0.55)" },
  dark: { bg: "#0a0a0a", fg: "#f2f2f2", dot: "rgba(255,255,255,0.18)" },
  paper: { bg: "#f2f2f2", fg: "#0a0a0a", dot: "rgba(20,20,20,0.4)" },
} as const;

export function GreySection({
  children,
  tone = "grey",
  tint = null,
  className = "",
  id,
  ...rest
}: Props) {
  const t = TONES[tone];

  return (
    <section
      id={id}
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
