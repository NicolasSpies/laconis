"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SignalChain v3 · sticky horizontal-scroll.
 *
 * v2 hatte versetzte punkte NEBEN einer geraden linie — sah gebrochen
 * aus und ist auf kleinen formaten auseinandergefallen.
 *
 * jetzt: die sektion ist hoch (vertikal gescrollt), innen klebt eine
 * bildschirm-hohe bühne. Beim runterscrollen fährt die kette seitlich
 * durch — jede station kommt einzeln in die mitte und zündet dort.
 * Die knoten sitzen EXAKT auf der schiene (beide auf derselben
 * absoluten y-linie), auf jeder bildschirmgrösse.
 *
 * kern bleibt: vier stationen "auto", genau EINE "du" (lila).
 */

type Station = { nr: string; title: string; who: "ich" | "du"; detail: string };

const STATIONS: Station[] = [
  { nr: "01", title: "scannen", who: "ich", detail: "Ich zieh deine alte Seite komplett — Texte, Bilder, Struktur. Du schickst mir vorab nichts." },
  { nr: "02", title: "analysieren", who: "ich", detail: "Was funktioniert, was bremst, was kann weg. Du kriegst eine ehrliche Liste." },
  { nr: "03", title: "briefing", who: "du", detail: "Dein einziger Job: ja, nein oder „das brauch ich nicht mehr\". Zehn Minuten." },
  { nr: "04", title: "bauen", who: "ich", detail: "Neu gebaut, schneller, sauber. Klickbare Vorschauen alle paar Tage." },
  { nr: "05", title: "live", who: "ich", detail: "301-Redirects gesetzt, Rankings bleiben, du kriegst den Zugang zum CMS." },
];

export function SignalChain() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return 0;
      /* wie weit muss die kette wandern, damit die letzte station
         mittig steht · nie negativ (schmale screens) */
      return Math.max(0, track.scrollWidth - window.innerWidth + 120);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        setP(travel <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / travel)));
        setShift(measure());
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
    <div ref={wrapRef} className="dv-chain">
      <div className="dv-chain-stage">
        <div className="dv-chain-head">
          <h2 className="dv-display dv-chain-h2">du hast schon eine seite?</h2>
          <p className="dv-chain-sub">
            Dann fängst du nicht bei null an. Fünf Stationen — vier laufen bei
            mir, eine gehört dir.
          </p>
        </div>

        {/* die schiene · exakt auf der linie sitzen auch die knoten */}
        <div className="dv-chain-railwrap" aria-hidden>
          <div className="dv-chain-rail">
            <div className="dv-chain-fill" style={{ transform: `scaleX(${p})` }} />
          </div>
        </div>

        <ol
          ref={trackRef}
          className="dv-chain-track"
          style={{ transform: `translate3d(${-p * shift}px,0,0)` }}
        >
          {STATIONS.map((s, i) => {
            const on = p >= i / STATIONS.length - 0.06;
            const du = s.who === "du";
            return (
              <li
                key={s.nr}
                className="dv-chain-station"
                data-on={on ? "1" : "0"}
                data-du={du ? "1" : "0"}
              >
                <span className="dv-chain-node" aria-hidden />
                <div className="dv-chain-card">
                  <div className="dv-chain-top">
                    <span className="dv-chain-nr">{s.nr}</span>
                    <span className="dv-chain-who">{du ? "du" : "auto"}</span>
                  </div>
                  <h3 className="dv-display dv-chain-title">{s.title}</h3>
                  <p className="dv-chain-detail">{s.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <span className="dv-chain-hint" aria-hidden>
          {p < 0.9 ? "↓ weiterscrollen" : "durch."}
        </span>
      </div>
    </div>
  );
}
