"use client";

import { useEffect, useRef } from "react";

/**
 * Umzug · „du hast schon eine seite? die zieht einfach um."
 *
 * ersetzt die SignalChain. die war 320vh hoch für rund 120 wörter ·
 * zwei komma zwei bildschirmhöhen scroll-gefängnis, in dem man nicht
 * weiterkam, ohne die ganze animation abzusitzen. dazu war ihr text
 * hart im component verdrahtet, auf /fr und /en stand dort deutsch.
 *
 * und die FORM arbeitete gegen die botschaft: fünf stationen mit
 * schiene, fortschrittsbalken und einer station namens „briefing
 * (du)" las sich wie ein prozessdiagramm aus einem agentur-deck.
 * das macht angst, statt sie zu nehmen.
 *
 * jetzt: eine bildschirmhöhe, kein sticky, kein hijack. links die
 * alte seite als graues gespenst (bewusst abstrakt · ein echter
 * kunden-screenshot wäre ein billiger seitenhieb), rechts die neue.
 * dazwischen ein griff. wer zieht, sieht die inhalte physisch
 * hinüberwandern und am zielrand aufleuchten.
 *
 * die aussage steht am ende und ist die eigentliche pointe:
 * du hast vorher nichts geschickt. du musst nichts tun, du
 * verlierst nichts, und deine alte seite bleibt bis zuletzt online.
 *
 * das ding spielt sich beim reinscrollen EINMAL selbst vor, damit
 * auch ohne zeiger jemand die aussage bekommt · danach gehört es
 * der hand.
 */

export type UmzugT = {
  h2a: string;
  h2b: string;
  lead: string;
  alt: string;
  neu: string;
  posten: [string, string][];
  griff: string;
  schluss: string;
};

export function Umzug({ t }: { t: UmzugT }) {
  const root = useRef<HTMLElement>(null);
  const wert = useRef(0);
  const ziel = useRef(0);
  const raf = useRef(0);
  const griff = useRef<{ x: number; u: number } | null>(null);
  const gespielt = useRef(false);

  /* nur EINE zahl geht raus · welche posten schon drüben sind,
     rechnet die CSS pro zeile aus ihrer eigenen schwelle */
  const schreib = (u: number) => {
    root.current?.style.setProperty("--u", u.toFixed(4));
  };

  const lauf = () => {
    if (raf.current) return;
    const tick = () => {
      const d = ziel.current - wert.current;
      wert.current += d * (griff.current ? 0.4 : 0.055);
      schreib(wert.current);
      if (griff.current || Math.abs(d) > 0.001) {
        raf.current = requestAnimationFrame(tick);
      } else {
        wert.current = ziel.current;
        schreib(wert.current);
        raf.current = 0;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  /* einmal von selbst vorspielen, wenn die sektion ins bild kommt ·
     sonst bekommt niemand ohne zeiger die aussage */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const beo = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || gespielt.current) return;
        gespielt.current = true;
        ziel.current = 1;
        lauf();
        beo.disconnect();
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    beo.observe(el);
    return () => {
      beo.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const bahn = useRef<HTMLDivElement>(null);

  const onDown = (ev: React.PointerEvent) => {
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    griff.current = { x: ev.clientX, u: ziel.current };
    gespielt.current = true;
    lauf();
  };

  const onMove = (ev: React.PointerEvent) => {
    const g = griff.current;
    const b = bahn.current;
    if (!g || !b) return;
    const breite = b.getBoundingClientRect().width || 1;
    ziel.current = Math.max(0, Math.min(1, g.u + (ev.clientX - g.x) / breite));
    lauf();
  };

  const onUp = () => {
    griff.current = null;
    lauf();
  };

  return (
    <section ref={root} className="ub" data-no-reveal style={{ "--u": 0 } as React.CSSProperties}>
      <div className="ub-kopf">
        <h2 className="lab-display ub-h2">
          {t.h2a}
          <br />
          <span className="ub-akzent">{t.h2b}</span>
        </h2>
        <p className="ub-lead">{t.lead}</p>
      </div>

      <div className="ub-buehne">
        {/* die alte seite · bewusst abstrakt. ein echter screenshot
            von irgendwem wäre ein billiger seitenhieb */}
        <div className="ub-blatt ub-blatt--alt" aria-hidden>
          <span className="ub-blatt-label">{t.alt}</span>
          <span className="ub-bar" style={{ width: "72%" }} />
          <span className="ub-bar" style={{ width: "54%" }} />
          <span className="ub-bar ub-bar--bild" />
          <span className="ub-bar" style={{ width: "63%" }} />
        </div>

        <ul className="ub-posten">
          {t.posten.map(([was, wie], i) => (
            <li key={was} className="ub-posten-zeile" style={{ "--i": i } as React.CSSProperties}>
              <span className="ub-posten-was">{was}</span>
              <span className="ub-posten-wie">{wie}</span>
            </li>
          ))}
        </ul>

        <div className="ub-blatt gl ub-blatt--neu" aria-hidden>
          <span className="ub-blatt-label">{t.neu}</span>
          <span className="ub-bar" style={{ width: "72%" }} />
          <span className="ub-bar" style={{ width: "54%" }} />
          <span className="ub-bar ub-bar--bild" />
          <span className="ub-bar" style={{ width: "63%" }} />
        </div>

      </div>

      <div className="ub-bahn" ref={bahn}>
        <div
          className="ub-griff"
          role="slider"
          tabIndex={0}
          aria-label={t.griff}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(wert.current * 100)}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight") ziel.current = Math.min(1, ziel.current + 0.2);
            else if (ev.key === "ArrowLeft") ziel.current = Math.max(0, ziel.current - 0.2);
            else return;
            ev.preventDefault();
            gespielt.current = true;
            lauf();
          }}
        />
        <span className="lab-label ub-griff-text">{t.griff}</span>
      </div>

      <p className="ub-schluss">{t.schluss}</p>
    </section>
  );
}
