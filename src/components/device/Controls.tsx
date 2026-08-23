"use client";

/**
 * Controls · der kippschalter des "geräts".
 *
 * hier standen mal drei teile: Fader, RockerSwitch und Readout.
 * Fader und Readout hatten NULL verbraucher und zogen dabei
 * useMotionValue/useSpring/useTransform aus framer-motion herein ·
 * die ganze bibliothek lag auf /studio, damit toter code weich
 * federn kann. beide gelöscht.
 *
 * der überschwung der wippe läuft jetzt in CSS (siehe
 * .lab-rocker-cap in device.css). das ist nicht nur leichter,
 * sondern auch richtiger: die framer-feder hat
 * prefers-reduced-motion ignoriert.
 *
 * a11y: echtes widget (role=switch), tastaturbedienbar, mit
 * sichtbarem focus-ring.
 */

const LIME = "#e1fd52";

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
          {/* lief über eine framer-feder · jetzt CSS-transition am
              data-attribut des elternteils */}
          <span className="lab-rocker-cap" />
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

