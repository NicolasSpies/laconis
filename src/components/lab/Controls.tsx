"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Controls · die anfassbaren bedienelemente des "geräts".
 *
 * drei teile: Fader (ziehbar, mit trägheit), RockerSwitch (kippt mit
 * überschwingen, LED), Readout (mono-messwert der beim ändern kurz
 * aufflackert wie ein echtes display).
 *
 * drag = ROHE pointer-handler + pointer-capture (framer's drag-geste
 * kollidiert mit dem custom-cursor · verifiziert). die weichheit kommt
 * aus useSpring auf dem gerenderten wert, nicht aus der geste.
 *
 * a11y: beide sind echte widgets (role=slider / switch), tastatur-
 * bedienbar, mit sichtbarem focus-ring.
 */

const LIME = "#e1fd52";
const LILA = "#b084d3";

/* ── FADER ──────────────────────────────────────────────────────── */

export function Fader({
  label,
  min,
  max,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [grabbed, setGrabbed] = useState(false);

  const pct = (value - min) / (max - min);
  const raw = useMotionValue(pct);
  const smooth = useSpring(raw, { stiffness: 420, damping: 32, mass: 0.55 });
  const left = useTransform(smooth, (v) => `${v * 100}%`);
  /* cap kippt minimal in bewegungsrichtung · gibt gewicht */
  const tilt = useTransform(smooth, (v) => `${(v - pct) * 90}deg`);

  useEffect(() => {
    raw.set(pct);
  }, [pct, raw]);

  const fromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      onChange(Math.round(min + t * (max - min)));
    },
    [min, max, onChange],
  );

  return (
    <div className="select-none">
      <div className="flex items-baseline justify-between mb-3">
        <span className="lab-label">{label}</span>
        <span className="lab-readout-sm">{format ? format(value) : value}</span>
      </div>

      <div
        ref={trackRef}
        className="lab-fader-track relative h-11 cursor-grab"
        style={{ touchAction: "none" }}
        onPointerDown={(e) => {
          dragging.current = true;
          setGrabbed(true);
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) fromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
          setGrabbed(false);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setGrabbed(false);
        }}
      >
        {/* skalenstriche · gefräst */}
        <div aria-hidden className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between">
          {Array.from({ length: max - min + 1 }).map((_, i) => (
            <span
              key={i}
              className="w-px h-2"
              style={{ background: i / (max - min) <= pct ? "rgba(225,253,82,0.55)" : "rgba(242,242,242,0.14)" }}
            />
          ))}
        </div>

        {/* gefüllte spur */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
          style={{
            width: left,
            background: `linear-gradient(90deg, ${LILA}55, ${LIME})`,
            boxShadow: `0 0 14px ${LIME}66`,
          }}
        />

        {/* der cap */}
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              onChange(Math.max(min, value - 1));
              e.preventDefault();
            } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              onChange(Math.min(max, value + 1));
              e.preventDefault();
            }
          }}
          className="lab-fader-cap absolute top-1/2 outline-none"
          style={{
            left,
            x: "-50%",
            y: "-50%",
            rotate: tilt,
            scale: grabbed ? 1.08 : 1,
          }}
        />
      </div>
    </div>
  );
}

/* ── ROCKER SWITCH ──────────────────────────────────────────────── */

export function RockerSwitch({
  label,
  hint,
  on,
  onToggle,
}: {
  label: string;
  hint?: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="lab-rocker group text-left w-full"
    >
      <span className="flex items-center gap-4">
        {/* die wippe */}
        <span className="lab-rocker-body relative shrink-0" data-on={on ? "1" : "0"}>
          <motion.span
            className="lab-rocker-cap"
            animate={{ x: on ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 700, damping: 26, mass: 0.5 }}
          />
        </span>
        <span className="min-w-0">
          <span className="lab-label block">{label}</span>
          {hint && <span className="lab-hint block mt-0.5">{hint}</span>}
        </span>
        {/* status-LED */}
        <span
          aria-hidden
          className="ml-auto w-2 h-2 rounded-full shrink-0 transition-all duration-200"
          style={{
            background: on ? LIME : "rgba(242,242,242,0.16)",
            boxShadow: on ? `0 0 10px ${LIME}, 0 0 22px ${LIME}66` : "none",
          }}
        />
      </span>
    </button>
  );
}

/* ── READOUT ────────────────────────────────────────────────────── */

export function Readout({
  label,
  value,
  unit,
  accent = LIME,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: string;
}) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 190);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="lab-readout">
      <div className="lab-label mb-2">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span
          className="lab-readout-value transition-[filter,opacity] duration-150"
          style={{
            color: accent,
            filter: flash ? `drop-shadow(0 0 16px ${accent})` : `drop-shadow(0 0 7px ${accent}88)`,
            opacity: flash ? 0.72 : 1,
          }}
        >
          {value}
        </span>
        {unit && <span className="lab-readout-unit">{unit}</span>}
      </div>
    </div>
  );
}
