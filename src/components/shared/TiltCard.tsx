"use client";

import { useEffect, type CSSProperties, type ReactNode, type MouseEvent } from "react";

/**
 * TiltCard · cursor-driven spotlight + subtle 3D tilt.
 *
 * - Spotlight glow: HSL-based, pro preset eigene hue (lime 73 · lila 273).
 *   Globaler pointer-listener auf :root setzt --gx/--gy in viewport-pixels.
 *   Cards reagieren via background-attachment: fixed → feels like one light source.
 * - Subtle tilt: ±5° rotation auf cursor-position INNERHALB der card.
 *   willst du den tilt anpassen, gib intensity. willst du gar keinen tilt,
 *   gib intensity={0}.
 * - Pseudo-elements ::before/::after (in globals.css) malen den glowing border.
 *
 * presets:
 *   "lime"  = #e1fd52 / dark text   · glow hue 73
 *   "lila"  = #b084d3 / dark text   · glow hue 273
 *   "dark"  = #0a0a0a / off-white   · glow hue 73 (lime accent)
 *   "ink"   = #1a1a1a / off-white   · glow hue 73
 *   "paper" = #f2f2f2 / dark text   · glow hue 273 (lila accent · für legal)
 */

type Preset = "lime" | "lila" | "dark" | "ink" | "paper";

type PresetConfig = {
  bg: string;
  fg: string;
  /** HSL hue base for the spotlight */
  hue: number;
  /** Hue spread on horizontal cursor travel (subtle color shift) */
  spread: number;
  /** Lightness of the spotlight glow */
  lightness: number;
  /** Saturation of the spotlight */
  saturation: number;
};

const PRESETS: Record<Preset, PresetConfig> = {
  lime: { bg: "#e1fd52", fg: "#0a0a0a", hue: 73, spread: 30, lightness: 70, saturation: 100 },
  lila: { bg: "#b084d3", fg: "#0a0a0a", hue: 273, spread: 30, lightness: 75, saturation: 80 },
  dark: { bg: "#0a0a0a", fg: "#f2f2f2", hue: 73, spread: 40, lightness: 60, saturation: 100 },
  ink: { bg: "#1a1a1a", fg: "#f2f2f2", hue: 73, spread: 40, lightness: 60, saturation: 100 },
  paper: { bg: "#f2f2f2", fg: "#0a0a0a", hue: 273, spread: 30, lightness: 65, saturation: 70 },
};

type Props = {
  preset?: Preset;
  bg?: string;
  fg?: string;
  /**
   * Max rotation degrees on hover. Default `5` (subtle).
   * Pass `0` to disable tilt entirely and rely purely on spotlight.
   */
  intensity?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/* singleton pointer-tracker · sets --gx/--gy on :root once site-wide.
   guarded so multiple TiltCards on a page only attach one listener. */
let pointerAttached = false;
let pointerCleanup: (() => void) | null = null;
function ensureGlobalPointer() {
  if (typeof window === "undefined" || pointerAttached) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch devices
  pointerAttached = true;
  const root = document.documentElement;
  const onMove = (e: PointerEvent) => {
    root.style.setProperty("--gx", e.clientX.toFixed(0));
    root.style.setProperty("--gy", e.clientY.toFixed(0));
    root.style.setProperty("--gxp", (e.clientX / window.innerWidth).toFixed(3));
    root.style.setProperty("--gyp", (e.clientY / window.innerHeight).toFixed(3));
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  pointerCleanup = () => {
    document.removeEventListener("pointermove", onMove);
    pointerAttached = false;
  };
}

function tilt(e: MouseEvent<HTMLDivElement>, intensity: number) {
  if (intensity === 0) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -intensity}deg) rotateY(${(x - 0.5) * intensity}deg) translateZ(8px)`;
}

function reset(e: MouseEvent<HTMLDivElement>, intensity: number) {
  if (intensity === 0) return;
  e.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
}

export function TiltCard({
  preset = "lime",
  bg,
  fg,
  intensity = 5,
  className = "",
  style,
  children,
}: Props) {
  useEffect(() => {
    ensureGlobalPointer();
    return () => {
      // we don't clean up on unmount — listener stays for other cards.
      // pointerCleanup is only invoked on full unload, which the browser handles.
      void pointerCleanup;
    };
  }, []);

  const colors = PRESETS[preset];
  const background = bg ?? colors.bg;
  const color = fg ?? colors.fg;

  // CSS variables for spotlight tuning, merged with any caller-provided style.
  const spotlightVars = {
    "--base": colors.hue,
    "--spread": colors.spread,
    "--saturation": colors.saturation,
    "--lightness": colors.lightness,
  } as CSSProperties;

  return (
    <div
      data-glow
      onMouseMove={(e) => tilt(e, intensity)}
      onMouseLeave={(e) => reset(e, intensity)}
      className={`rounded-2xl select-none ${className}`}
      style={{
        backgroundColor: background,
        color,
        transition: "transform 0.18s ease-out",
        willChange: "transform",
        ...spotlightVars,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
