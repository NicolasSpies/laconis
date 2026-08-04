"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BallastDial · der regler, der das performance-argument beweist statt
 * es zu behaupten.
 *
 * dreh auf und lade plugins drauf. die vier messwerte gehen mit: der
 * score fällt, die ladezeit klettert, die requests explodieren, das
 * fremd-js wächst. bei null steht da „so baue ich".
 *
 * das ist bewusst kein wordpress-bashing · die zahlen sind die
 * grössenordnungen, die man bei einer plugin-gestapelten seite real
 * misst. der nutzer zieht die schlussfolgerung selbst.
 *
 * bedienung wie ein echtes audio-poti: senkrecht ziehen, nicht kreisen
 * (kreisen ist auf touch unbedienbar). dazu pfeiltasten, home/end und
 * role="slider" · das ding ist ein vollwertiges bedienelement.
 */

const MAX = 24;
const N_TICKS = 27;

type T = {
  label: string;
  unitPlugins: string;
  gPagespeed: string;
  gLoad: string;
  gRequests: string;
  gThirdParty: string;
  colPlugins: string;
  colMine: string;
  flatNote: string;
  hint: string;
  verdicts: [string, string, string, string];
};

function verdictIndex(v: number) {
  if (v === 0) return 0;
  if (v <= 6) return 1;
  if (v <= 14) return 2;
  return 3;
}

export function BallastDial({ t }: { t: T }) {
  const [v, setV] = useState(0);
  const [dragging, setDragging] = useState(false);
  const knob = useRef<HTMLButtonElement>(null);
  const start = useRef({ y: 0, v: 0 });

  const angle = -135 + (v / MAX) * 270;

  /* die zahlen · grössenordnungen einer plugin-gestapelten seite */
  const score = Math.round(98 - v * 2.7);
  const load = 0.4 + v * 0.25;
  const req = 14 + v * 7;
  const js = v * 96;

  useEffect(() => {
    const el = knob.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      setDragging(true);
      start.current = { y: e.clientY, v };
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      /* 9 px pro schritt · fein genug zum treffen, grob genug
         zum durchdrehen */
      const step = Math.round((start.current.y - e.clientY) / 9);
      setV(Math.max(0, Math.min(MAX, start.current.v + step)));
    };
    const onUp = () => setDragging(false);

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
  }, [v]);

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1,
      PageUp: 4, PageDown: -4,
    };
    if (e.key in map) {
      e.preventDefault();
      setV((p) => Math.max(0, Math.min(MAX, p + map[e.key]!)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setV(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setV(MAX);
    }
  };

  /* jede zeile zeigt jetzt BEIDE seiten: was der regler mit einer
     plugin-gestapelten seite macht, und was er mit meiner macht.
     ohne den zweiten wert war der pegel nur eine kurve ohne bezug ·
     die aussage ist ja gerade, dass sich hier drüben nichts rührt. */
  const gauges: {
    label: string;
    value: string;
    fill: number;
    mine: string;
  }[] = [
    { label: t.gPagespeed, value: String(score), fill: (100 - score) / 100, mine: "98" },
    { label: t.gLoad, value: `${load.toFixed(1)}s`, fill: Math.min(1, (load - 0.4) / 6), mine: "0.4s" },
    { label: t.gRequests, value: String(req), fill: Math.min(1, (req - 14) / 168), mine: "14" },
    {
      label: t.gThirdParty,
      value: js >= 1000 ? `${(js / 1024).toFixed(1)} mb` : `${js} kb`,
      fill: Math.min(1, js / 2304),
      mine: "0 kb",
    },
  ];

  return (
    <div className="lab-chassis relative flex flex-col gap-10 p-6 md:flex-row md:items-center md:gap-14 md:p-12">
      <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

      {/* ── der knopf ── */}
      <div className="flex flex-col items-center gap-5">
        <div className="lx-dial-wrap" data-heavy={v > 8 ? "1" : "0"}>
          <span className="lx-dial-well" aria-hidden />

          {Array.from({ length: N_TICKS }).map((_, i) => {
            const f = i / (N_TICKS - 1);
            const lit = f <= v / MAX + 0.001;
            return (
              <span
                key={i}
                className="lx-dial-tick"
                aria-hidden
                data-on={lit ? (f > 0.33 ? "2" : "1") : "0"}
                style={{ transform: `rotate(${-135 + f * 270}deg)` }}
              >
                <span />
              </span>
            );
          })}

          <button
            ref={knob}
            type="button"
            className="lx-dial-knob"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={MAX}
            aria-valuenow={v}
            aria-valuetext={`${v} ${t.unitPlugins}`}
            aria-label={t.label}
            onKeyDown={onKey}
            style={{
              transform: `rotate(${angle}deg)`,
              transition: dragging ? "none" : "transform 180ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              className="lx-dial-face"
              aria-hidden
              /* gegendreht · das glanzlicht bleibt oben, wo das licht ist */
              style={{ transform: `rotate(${-angle}deg)` }}
            />
            <span className="lx-dial-marker" aria-hidden />
          </button>
        </div>

        <div className="text-center">
          <div className="lab-readout-value" style={{ fontSize: "2rem", color: v > 8 ? "#b084d3" : "#e1fd52" }}>
            {v}
          </div>
          <div className="lab-label mt-1">{t.unitPlugins}</div>
        </div>
      </div>

      {/* ── die messwerte ── */}
      <div className="min-w-0 flex-1 md:max-w-[560px]">
        {/* spaltenköpfe · ohne sie weiss niemand, was die zweite zahl ist */}
        <div className="lx-gauge-head">
          <span className="lab-label" style={{ color: "rgba(176,132,211,0.85)" }}>
            {t.colPlugins}
          </span>
          <span className="lab-label" style={{ color: "rgba(225,253,82,0.85)" }}>
            {t.colMine}
          </span>
        </div>

        {gauges.map((g) => (
          <div key={g.label} className="lx-gauge" data-bad={g.fill > 0.34 ? "1" : "0"}>
            <div className="lx-gauge-top">
              <span className="lab-label">{g.label}</span>
              <span className="lx-gauge-pair">
                <span className="lx-gauge-val">{g.value}</span>
                <span className="lx-gauge-val lx-gauge-mine">{g.mine}</span>
              </span>
            </div>
            <div className="lx-gauge-bar">
              <span className="lx-gauge-fill" style={{ width: `${Math.max(1.5, g.fill * 100)}%` }} />
              {/* die feste linie · sie rührt sich nicht, egal wie weit
                  der regler steht. genau das ist der punkt. */}
              <span className="lx-gauge-flat" aria-hidden />
            </div>
          </div>
        ))}

        <p
          className="mt-8 text-[15px] leading-relaxed"
          style={{ color: v === 0 ? "#e1fd52" : "rgba(242,242,242,0.62)" }}
        >
          {t.verdicts[verdictIndex(v)]}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "rgba(225,253,82,0.75)" }}>
          {t.flatNote}
        </p>
        <p className="lab-hint mt-3">{t.hint}</p>
      </div>
    </div>
  );
}
