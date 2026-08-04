"use client";

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
 * bewegung: jede zeile driftet für sich, und eine helligkeitswelle
 * wandert langsam nach unten durch den block. beides in CSS · vorher
 * lief das driften in einem rAF, und genau deshalb hat es kaum jemand
 * gesehen: rAF steht still, sobald das fenster nicht vorne ist. kein
 * zeiger-effekt · der wirkte mechanisch, und ein zitat soll atmen,
 * nicht auf die maus reagieren.
 *
 * die komponente rendert damit nur noch markup. null laufzeit.
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
  return (
    <blockquote className={`aq ${className}`}>
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className="aq-line"
          style={
            {
              ["--in" as string]: `${INDENTS[i % INDENTS.length]}em`,
              /* der zeilenindex versetzt drift und welle gegeneinander */
              ["--i" as string]: i,
            } as React.CSSProperties
          }
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
