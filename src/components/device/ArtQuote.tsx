"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * ArtQuote · ein grosses zitat, das man anfassen kann.
 *
 * gegen das raster: die zeilen sind unterschiedlich weit eingerückt und
 * leicht gegeneinander gekippt, das anführungszeichen hängt über den
 * satzspiegel hinaus. nichts davon liegt auf einer linie, und genau
 * deshalb liest es sich wie gesetzt und nicht wie generiert.
 *
 * die wörter weichen dem zeiger aus · nicht als effekt, sondern weil
 * der hero verspricht, dass man diese seite anfassen will. worte, die
 * auf die hand reagieren, sind die einfachste einlösung davon.
 *
 * ohne zeiger (touch) läuft eine sehr langsame welle durch den satz.
 * eine wörter-wolke, die tot daliegt, wäre auf dem handy die hälfte.
 */

const REACH = 190; // px · so weit greift die hand
const PUSH = 22; // px · so weit weicht ein wort aus

export function ArtQuote({
  text,
  mark,
  source,
  className = "",
}: {
  text: string;
  /** ein wort, das lime gesetzt wird */
  mark?: string;
  source?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLQuoteElement>(null);

  /* feste, aber unregelmässige einrückung pro zeile · aus dem index
     gerechnet, damit es bei jedem zitat gleich „handgesetzt" wirkt
     und trotzdem nie zufällig springt */
  const words = useMemo(() => text.split(" ").filter(Boolean), [text]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".aq-w"));
    if (!spans.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let px = -9999;
    let py = -9999;
    let hasPointer = false;

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      px = e.clientX - b.left;
      py = e.clientY - b.top;
      hasPointer = true;
    };
    const onLeave = () => {
      hasPointer = false;
    };

    const tick = (time: number) => {
      spans.forEach((sp, i) => {
        let dx = 0;
        let dy = 0;
        if (hasPointer) {
          const cx = sp.offsetLeft + sp.offsetWidth / 2;
          const cy = sp.offsetTop + sp.offsetHeight / 2;
          const vx = cx - px;
          const vy = cy - py;
          const d = Math.hypot(vx, vy);
          if (d < REACH && d > 0.5) {
            /* quadratisch abfallend · direkt am zeiger kräftig,
               am rand des radius fast nichts */
            const f = (1 - d / REACH) ** 2;
            dx = (vx / d) * PUSH * f;
            dy = (vy / d) * PUSH * f;
          }
        } else {
          /* ruhewelle · versetzt pro wort, sehr klein */
          dy = Math.sin(time * 0.0009 + i * 0.55) * 2.2;
          dx = Math.sin(time * 0.0006 + i * 0.31) * 1.4;
        }
        sp.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [words.length]);

  return (
    <blockquote className={`aq ${className}`} ref={wrap}>
      <span className="aq-mark" aria-hidden>
        „
      </span>
      <p className="aq-body">
        {words.map((w, i) => {
          const isMark = mark && w.replace(/[.,!?»«"„"]/g, "").toLowerCase() === mark.toLowerCase();
          return (
            <span
              key={`${w}-${i}`}
              className="aq-w"
              data-mark={isMark ? "1" : "0"}
              /* jedes wort bekommt seinen eigenen minimalen versatz ·
                 das nimmt der zeile die maschinelle geradheit */
              style={{ ["--tilt" as string]: `${(((i * 37) % 7) - 3) * 0.55}deg` }}
            >
              {w}
            </span>
          );
        })}
      </p>
      {source && <footer className="aq-src lab-label">{source}</footer>}
    </blockquote>
  );
}
