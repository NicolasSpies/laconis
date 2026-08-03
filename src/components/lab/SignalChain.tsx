"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SignalChain v2 · HORIZONTAL statt vertikal.
 *
 * v1 war eine linke spalte mit toter fläche rechts. Jetzt läuft die
 * kette quer über die volle breite — der impuls wandert von links nach
 * rechts, jede station sitzt versetzt (nicht auf einer linie), damit es
 * lebendig statt tabellarisch wirkt.
 *
 * kern bleibt: vier stationen "auto", genau EINE "du" (lila). Das
 * argument "du machst fast nichts" wird gesehen, nicht behauptet.
 *
 * mobile: kippt auf eine kompakte vertikale liste (horizontales scrollen
 * auf touch ist zu fummelig für einen ablauf, den man LESEN soll).
 */

type Station = {
  nr: string;
  title: string;
  who: "ich" | "du";
  detail: string;
  /** vertikaler versatz in px · bricht die tabellen-optik */
  off: number;
};

const STATIONS: Station[] = [
  { nr: "01", title: "scannen", who: "ich", off: 0, detail: "Ich zieh deine alte Seite komplett — Texte, Bilder, Struktur." },
  { nr: "02", title: "analysieren", who: "ich", off: 34, detail: "Was funktioniert, was bremst, was kann weg." },
  { nr: "03", title: "briefing", who: "du", off: -14, detail: "Du sagst ja, nein oder „das brauch ich nicht mehr\"." },
  { nr: "04", title: "bauen", who: "ich", off: 42, detail: "Neu gebaut, schneller, sauber, SEO-sicher." },
  { nr: "05", title: "live", who: "ich", off: 8, detail: "301-Redirects gesetzt, Rankings bleiben, du kriegst den Zugang." },
];

export function SignalChain() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const startY = vh * 0.86;
        const travel = r.height + vh * 0.5;
        setP(Math.max(0, Math.min(1, (startY - r.top) / travel)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="lab-hchain">
      {/* die leitung · quer, mit lime-füllung nach fortschritt */}
      <div className="lab-hchain-rail" aria-hidden>
        <div className="lab-hchain-fill" style={{ transform: `scaleX(${p})` }} />
        {/* der impuls selbst · reitet auf der spitze */}
        <span className="lab-hchain-pulse" style={{ left: `${p * 100}%`, opacity: p > 0.02 && p < 0.995 ? 1 : 0 }} />
      </div>

      <ol className="lab-hchain-list">
        {STATIONS.map((s, i) => {
          const on = p >= (i + 0.3) / STATIONS.length;
          const du = s.who === "du";
          return (
            <li
              key={s.nr}
              className="lab-hchain-station"
              data-on={on ? "1" : "0"}
              data-du={du ? "1" : "0"}
              style={{ "--off": `${s.off}px` } as React.CSSProperties}
            >
              <span className="lab-hchain-node" aria-hidden />
              <div className="lab-hchain-body">
                <span className="lab-hchain-nr">{s.nr}</span>
                <h3 className="lab-display lab-hchain-title">{s.title}</h3>
                <span className="lab-hchain-who">{du ? "du" : "auto"}</span>
                <p className="lab-hchain-detail">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
