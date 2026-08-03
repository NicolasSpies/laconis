"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SignalChain · der ablauf als signalweg.
 *
 * fünf stationen, verbunden durch eine leitung. beim scrollen wandert
 * ein lime-impuls durch die kette und zündet station für station.
 *
 * der eigentliche trick: vier stationen tragen "auto", genau eine
 * trägt "du" (lila). Nicolas' wichtigstes argument — "du machst fast
 * nichts" — muss dadurch nicht mehr behauptet werden, man SIEHT eine
 * kette, in der ein einziges glied dem kunden gehört.
 *
 * dosierung: bewusst flach gehalten (keine schrauben, kein chassis) —
 * die kette selbst ist der moment, nicht ihre verpackung.
 *
 * fortschritt kommt aus einem IntersectionObserver-freien scroll-
 * listener mit rAF-drossel · die leitung selbst ist CSS.
 */

type Station = {
  nr: string;
  title: string;
  who: "ich" | "du";
  detail: string;
};

const STATIONS: Station[] = [
  { nr: "01", title: "scannen", who: "ich", detail: "Ich zieh deine alte Seite komplett — Texte, Bilder, Struktur." },
  { nr: "02", title: "analysieren", who: "ich", detail: "Was funktioniert, was bremst, was kann weg." },
  { nr: "03", title: "briefing", who: "du", detail: "Du sagst ja, nein oder „das brauch ich nicht mehr\"." },
  { nr: "04", title: "bauen", who: "ich", detail: "Neu gebaut, schneller, sauber, SEO-sicher." },
  { nr: "05", title: "live", who: "ich", detail: "301-Redirects gesetzt, Rankings bleiben, du kriegst den Zugang." },
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
        /* impuls startet erst wenn die kette auf 72% viewport steht und
           ist erst durch, wenn ihr ENDE oben ankommt · travel = eigene
           höhe + ~halber viewport → füllt langsam statt sofort */
        /* p=0 wenn die kette-oberkante auf 88% viewport steht (also grade
           erst reinkommt), p=1 erst wenn ihre UNTERKANTE auf 30% steht.
           travel = eigene höhe + halber viewport → der impuls braucht die
           ganze sektion, statt nach zwei zeilen durch zu sein. */
        const startY = vh * 0.88;
        const travel = r.height + vh * 0.58;
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
    <div ref={ref} className="lab-chain">
      {/* die leitung · grundspur + lime-füllung nach fortschritt */}
      <div className="lab-chain-line" aria-hidden>
        <div className="lab-chain-fill" style={{ transform: `scaleY(${p})` }} />
      </div>

      <ol className="lab-chain-list">
        {STATIONS.map((s, i) => {
          /* station zündet wenn der impuls sie erreicht hat */
          const on = p >= (i + 0.35) / STATIONS.length;
          const du = s.who === "du";
          return (
            <li key={s.nr} className="lab-chain-station" data-on={on ? "1" : "0"} data-du={du ? "1" : "0"}>
              <span className="lab-chain-node" aria-hidden />
              <div className="lab-chain-body">
                <div className="flex items-baseline gap-3">
                  <span className="lab-chain-nr">{s.nr}</span>
                  <h3 className="lab-display lab-chain-title">{s.title}</h3>
                  <span className="lab-chain-who">{du ? "du" : "auto"}</span>
                </div>
                <p className="lab-chain-detail">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
