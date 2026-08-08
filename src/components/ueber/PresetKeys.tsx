"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PresetKeys · die tastenbank „frag mich was".
 *
 * mechanik von alten radio-stationstasten: es kann immer nur eine
 * gedrückt sein, und beim drücken der nächsten springt die vorherige
 * hoch. dieses aufploppen ist der eigentliche moment · das macht aus
 * einer FAQ-liste ein bedienteil.
 *
 * die antwort tippt sich ins fenster darüber. eine seite, auf der
 * jemand über sich schreibt, wird dadurch zu einem gespräch: der
 * besucher fragt, indem er drückt.
 *
 * a11y: echte buttons in einer radiogroup, die antwort liegt in einer
 * live-region und wird dort komplett angesagt statt buchstabenweise.
 */

/* 3 zeichen pro tick statt einem · zeichenweise brauchte eine antwort
   über vier sekunden, und so lange wartet niemand auf einen satz, den
   er schon lesen könnte */
const TICK = 12;
const PER_TICK = 3;

export type QA = { q: string; a: string };

export function PresetKeys({ items, hint }: { items: QA[]; hint: string }) {
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const answer = items[sel]!.a;

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(answer);
      return;
    }

    let i = 0;
    setShown("");
    timer.current = setInterval(() => {
      i += PER_TICK;
      setShown(answer.slice(0, i));
      if (i >= answer.length && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, TICK);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [answer]);

  const done = shown.length >= answer.length;

  return (
    <div className="lab-chassis relative p-6 md:p-10">
      <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

      {/* ── das antwortfenster ── */}
      <div className="ub-display">
        <span className="ub-display-q">{items[sel]!.q}</span>
        <p className="ub-display-a" aria-live="polite">
          {/* ALLE antworten liegen unsichtbar übereinander im selben
              rasterfeld · dadurch ist das fenster immer so hoch wie die
              längste und springt weder beim tippen noch beim wechseln.
              ein echtes ablesefenster ändert seine grösse eben nicht. */}
          {items.map((it) => (
            <span className="ub-a-ghost" aria-hidden key={it.q}>
              {it.a}
            </span>
          ))}
          <span className="ub-a-live" aria-hidden>
            {shown}
            {!done && <span className="ub-caret" />}
          </span>
          {/* vorgelesen wird der ganze satz, nicht das getippte */}
          <span className="sr-only">{answer}</span>
        </p>
      </div>

      {/* ── die tasten ── */}
      <div className="ub-keybank mt-7" role="radiogroup" aria-label={hint}>
        {items.map((it, i) => (
          <button
            key={it.q}
            type="button"
            role="radio"
            aria-checked={sel === i}
            data-on={sel === i ? "1" : "0"}
            className="ub-key"
            onClick={() => setSel(i)}
          >
            <span className="ub-key-led" aria-hidden />
            <span className="ub-key-label">{it.q}</span>
          </button>
        ))}
      </div>

      <p className="lab-hint mt-6 text-body-sm">{hint}</p>
    </div>
  );
}
