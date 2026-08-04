"use client";

import { useEffect, useRef, useState } from "react";

/**
 * KieferMark · das zeichen, das nie ganz stillsteht.
 *
 * eine kiefer, runtergebrochen auf drei striche. sie wiegt sich
 * dauerhaft, kaum merklich, wie unter leichtem wind.
 *
 * der clou ist der regler: der besucher stellt die amplitude selbst
 * ein und merkt dabei, wo aus „atmet" ein „zappelt" wird. das ist die
 * design-entscheidung zum nachfühlen statt zum nachlesen · und der
 * echte wert (1.2°) steht als anschlag markiert drin.
 *
 * das wiegen läuft als CSS-keyframe, nicht über rAF · in einem
 * inaktiven tab friert rAF ein, und ein logo, das dabei mitten in der
 * bewegung stehenbleibt, wirkt kaputt.
 */

const REAL = 1.2; // grad · so steht es im echten zeichen
const MAX = 14;

export type KieferT = {
  label: string;
  unit: string;
  real: string;
  verdicts: [string, string, string];
  hint: string;
};

function verdict(amp: number) {
  if (amp <= 2.5) return 0; // atmet
  if (amp <= 6.5) return 1; // wird unruhig
  return 2; // zappelt
}

export function KieferMark({ t }: { t: KieferT }) {
  const [amp, setAmp] = useState(REAL);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;

    const at = (clientX: number) => {
      const b = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (clientX - b.left) / b.width));
      setAmp(Math.round(p * MAX * 10) / 10);
    };
    const onDown = (e: PointerEvent) => {
      down = true;
      el.setPointerCapture(e.pointerId);
      at(e.clientX);
    };
    const onMove = (e: PointerEvent) => down && at(e.clientX);
    const onUp = () => {
      down = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const pct = (amp / MAX) * 100;
  const v = verdict(amp);
  /* je heftiger der ausschlag, desto hektischer die periode · so
     fühlt sich „zappeln" auch wirklich nach zappeln an */
  const period = 5.5 - (amp / MAX) * 4;

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 1 : 0.2;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setAmp((p) => Math.min(MAX, Math.round((p + step) * 10) / 10));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setAmp((p) => Math.max(0, Math.round((p - step) * 10) / 10));
    } else if (e.key === "Home") {
      e.preventDefault();
      setAmp(REAL);
    }
  };

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
      <div
        className="cs-mark mx-auto"
        style={{ ["--cs-amp" as string]: `${amp}deg`, ["--cs-period" as string]: `${period}s` }}
      >
        {/* drei striche · stamm, und zwei äste die den wipfel andeuten */}
        <svg className="cs-pine" viewBox="0 0 100 120" aria-label={t.label} role="img">
          <path d="M50 118 L50 34" />
          <path d="M50 40 L20 74 M50 40 L80 74" />
          <path d="M50 12 L28 50 M50 12 L72 50" />
        </svg>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="lab-label">{t.label}</span>
          <span className="lab-label" aria-hidden>
            {amp.toFixed(1)} {t.unit}
          </span>
        </div>

        <div
          ref={track}
          className="cs-amp-track mt-3"
          data-cheap={v === 2 ? "1" : "0"}
          role="slider"
          tabIndex={0}
          aria-label={t.label}
          aria-valuemin={0}
          aria-valuemax={MAX}
          aria-valuenow={amp}
          aria-valuetext={`${amp.toFixed(1)} ${t.unit} · ${t.verdicts[v]}`}
          onKeyDown={onKey}
        >
          <span className="cs-amp-fill" style={{ width: `calc(${pct}% - 10px)` }} aria-hidden />
          <span className="cs-amp-knob" style={{ left: `calc(${pct}% )` }} aria-hidden />
        </div>

        {/* der echte wert als marke auf der skala */}
        <div className="relative mt-1.5 h-4">
          <span
            className="lab-label absolute whitespace-nowrap"
            style={{ left: `${(REAL / MAX) * 100}%`, transform: "translateX(-50%)", fontSize: 9 }}
            aria-hidden
          >
            ↑ {t.real}
          </span>
        </div>

        <p
          className="cs-verdict mt-7"
          style={{ color: v === 2 ? "#b084d3" : v === 1 ? "rgba(242,242,242,0.7)" : "#e1fd52" }}
        >
          {t.verdicts[v]}
        </p>
        <p className="lab-hint mt-3 max-w-[42ch] text-[12.5px] leading-relaxed">{t.hint}</p>
      </div>
    </div>
  );
}
