"use client";

import { useEffect, useRef } from "react";

/**
 * ArtQuote · ein grosses zitat, gesetzt statt gerastert.
 *
 * jede zeile beginnt woanders. keine schrägen, keine gekippten wörter ·
 * die spannung kommt allein aus dem versatz der zeilenanfänge, so wie
 * man ein zitat auf einem plakat setzt. links und rechts darf es über
 * den satzspiegel hinauslaufen, solange es lesbar bleibt.
 *
 * die zeilen werden AUTORISIERT übergeben, nicht automatisch gebrochen.
 * wo ein zitat umbricht, ist eine gestalterische entscheidung · ein
 * algorithmus, der nach breite bricht, trifft sie zufällig.
 *
 * bewegung: jede zeile driftet sehr langsam und für sich, wenige pixel.
 * kein zeiger-effekt · der wirkte mechanisch, und ein zitat soll atmen,
 * nicht auf die maus reagieren.
 */

/* der versatz der zeilenanfänge · in em der schriftgrösse gerechnet,
   damit er auf jedem schirm gleich proportioniert bleibt. bewusst
   unregelmässig und wiederholend, wie von hand gesetzt. */
const INDENTS = [1.4, -0.6, 2.6, 2.9, 0.4, 1.9, 2.1, 0.9];

export function ArtQuote({
  lines,
  mark,
  source,
  className = "",
}: {
  /** jede zeile einzeln · der umbruch ist gestaltung, keine berechnung */
  lines: string[];
  /** ein wort, das lime gesetzt wird */
  mark?: string;
  source?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = Array.from(el.querySelectorAll<HTMLElement>(".aq-line"));
    if (!rows.length) return;

    let raf = 0;
    const tick = (time: number) => {
      rows.forEach((row, i) => {
        /* lange, ungleiche perioden · dadurch findet der stapel nie in
           einen gemeinsamen takt und wirkt nicht wie eine welle */
        const dx = Math.sin(time * 0.000085 + i * 1.7) * 5;
        const dy = Math.sin(time * 0.000061 + i * 2.3) * 2.4;
        row.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lines.length]);

  return (
    <blockquote className={`aq ${className}`} ref={wrap}>
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className="aq-line"
          style={{ ["--in" as string]: `${INDENTS[i % INDENTS.length]}em` }}
        >
          {mark && line.toLowerCase().includes(mark.toLowerCase()) ? (
            <>
              {line.slice(0, line.toLowerCase().indexOf(mark.toLowerCase()))}
              <em className="aq-mark">
                {line.slice(
                  line.toLowerCase().indexOf(mark.toLowerCase()),
                  line.toLowerCase().indexOf(mark.toLowerCase()) + mark.length,
                )}
              </em>
              {line.slice(line.toLowerCase().indexOf(mark.toLowerCase()) + mark.length)}
            </>
          ) : (
            line
          )}
        </span>
      ))}
      {source && <footer className="aq-src lab-label">{source}</footer>}
    </blockquote>
  );
}
