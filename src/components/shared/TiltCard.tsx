"use client";

import type { CSSProperties, ReactNode, MouseEvent } from "react";

/**
 * TiltCard · 3D-tilt-card im stil der homepage ServicesMorph.
 * cursor folgt → card kippt leicht in 3D · rounded-2xl · keine eigene transition,
 * außer die transform-flick · willst du content drin, gib es als children.
 *
 * params:
 *   bg / fg = colorscheme (siehe TILE-presets)
 *   intensity = max rotation deg (default 14)
 *
 * presets:
 *   "lime"  = #e1fd52 / #0a0a0a
 *   "lila"  = #b084d3 / #0a0a0a
 *   "dark"  = #0a0a0a / #f2f2f2
 *   "ink"   = #1a1a1a / #f2f2f2
 *   "paper" = #f2f2f2 / #0a0a0a (für legal etc.)
 */

type Preset = "lime" | "lila" | "dark" | "ink" | "paper";

const PRESETS: Record<Preset, { bg: string; fg: string }> = {
  lime: { bg: "#e1fd52", fg: "#0a0a0a" },
  lila: { bg: "#b084d3", fg: "#0a0a0a" },
  dark: { bg: "#0a0a0a", fg: "#f2f2f2" },
  ink: { bg: "#1a1a1a", fg: "#f2f2f2" },
  paper: { bg: "#f2f2f2", fg: "#0a0a0a" },
};

type Props = {
  preset?: Preset;
  bg?: string;
  fg?: string;
  intensity?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function tilt(e: MouseEvent<HTMLDivElement>, intensity: number) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -intensity}deg) rotateY(${(x - 0.5) * intensity}deg) translateZ(12px)`;
}

function reset(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
}

export function TiltCard({
  preset = "lime",
  bg,
  fg,
  intensity = 14,
  className = "",
  style,
  children,
}: Props) {
  const colors = PRESETS[preset];
  const background = bg ?? colors.bg;
  const color = fg ?? colors.fg;

  return (
    <div
      onMouseMove={(e) => tilt(e, intensity)}
      onMouseLeave={reset}
      className={`rounded-2xl select-none ${className}`}
      style={{
        background,
        color,
        transition: "transform 0.12s ease-out",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
