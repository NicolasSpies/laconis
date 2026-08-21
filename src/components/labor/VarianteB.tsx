"use client";

import { useEffect, useRef } from "react";

/**
 * Richtung B · radikales editorial.
 *
 * die idee: die schrift IST das bild. keine sektionen, keine
 * kacheln, keine listen, kein gehäuse · ein durchgehender lauf, in
 * dem worte die grösse von objekten haben.
 *
 * mechanik: der scroll steuert nicht nur die position, sondern die
 * SPANNUNG. jede zeile wächst beim reinkommen und wird beim
 * rausgehen wieder schmal · das lesen bekommt dadurch einen
 * herzschlag statt eines gleichmässigen bandes.
 *
 * ehrliche einschätzung: das ist die sicherste der drei richtungen
 * und die, die am schnellsten steht. sie ist aber auch die
 * austauschbarste · fünfzig studios weltweit machen genau das,
 * viele davon besser ausgestattet. sie gewinnt über handwerk, nicht
 * über die idee.
 *
 * ein rAF für die ganze seite, das eine variable pro zeile schreibt.
 * kein observer pro element, kein layout-thrash: alle rects werden
 * in einem rutsch gelesen, dann alle styles geschrieben.
 */

const ZEILEN = [
  { t: "websites", gross: true },
  { t: "die man", gross: false },
  { t: "anfassen will", gross: true, lime: true },
  { t: "von null gebaut", gross: false },
  { t: "kein template", gross: true },
  { t: "keine plugins", gross: true },
  { t: "keine decke", gross: true, lime: true },
  { t: "nach oben", gross: false },
];

export function VarianteB() {
  const wurzel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const zeilen = Array.from(el.querySelectorAll<HTMLElement>(".lbz"));
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const h = window.innerHeight;
      /* ERST alle rects lesen, DANN alle styles schreiben · gemischt
         erzwingt jede schreibende zeile ein neues layout */
      const werte = zeilen.map((z) => {
        const r = z.getBoundingClientRect();
        const mitte = (r.top + r.height / 2) / h;
        /* 1 in der bildmitte, 0 an den rändern */
        return Math.max(0, 1 - Math.abs(mitte - 0.5) * 2.1);
      });
      zeilen.forEach((z, i) => z.style.setProperty("--k", werte[i]!.toFixed(3)));
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="lbb" ref={wurzel}>
      {ZEILEN.map((z, i) => (
        <p
          key={z.t}
          className="lbz"
          data-gross={z.gross ? "1" : "0"}
          data-lime={z.lime ? "1" : "0"}
          style={{ "--i": i } as React.CSSProperties}
        >
          {z.t}
        </p>
      ))}

      <p className="lbb-ende">
        drei projekte. einer, der sie gebaut hat.
        <a href="/referenzen">ansehen →</a>
      </p>
    </div>
  );
}
