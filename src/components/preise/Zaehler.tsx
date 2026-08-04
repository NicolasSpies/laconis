"use client";

import { useEffect, useRef } from "react";

/**
 * Zaehler · was nach dem launch monatlich weiterläuft.
 *
 * die sektion war eine tabelle: vier zeilen leistung links, betrag
 * rechts. inhaltlich richtig, aber als seite tot · und ausgerechnet
 * hier steht die aussage, auf die es Nicolas ankommt: nach dem launch
 * läuft nur, was du wirklich brauchst.
 *
 * also bekommt die aussage ein instrument. ein zählwerk wie am
 * stromkasten, mit walzen die sich beim reinscrollen einmal ganz
 * durchdrehen und auf dem stand stehen bleiben. darunter steht die
 * aufschlüsselung · das zählwerk zeigt die spanne, die zeilen sagen
 * woraus sie besteht.
 *
 * die beiden zahlen sind KEINE neue behauptung: sie sind die summe
 * der zeilen darunter (hosting 20 bis 50, domain rund 2, CMS 0).
 * ändert sich eine zeile, muss die summe im dict mitgeändert werden ·
 * deshalb steht sie dort neben den zeilen und nicht hier im code.
 *
 * das drehen passiert genau einmal, wenn das zählwerk ins bild kommt:
 * ein IntersectionObserver hängt sich ein, setzt eine klasse und trennt
 * sich wieder. danach läuft eine gewöhnliche zeitgesteuerte animation.
 *
 * animation-timeline: view() wäre der hauseigene weg gewesen, geht hier
 * aber nicht ohne umweg · das walzenfenster hat overflow:hidden und ist
 * damit sein eigener scroll-container. die begründung steht ausführlich
 * in caliper.css bei .zr-band.
 */

function Walze({ ziffer, i }: { ziffer: string; i: number }) {
  return (
    <span className="zr-walze">
      <span
        className="zr-band"
        style={
          {
            "--d": Number(ziffer),
            /* jede walze kommt eine spur später zur ruhe · gleichzeitig
               einrastende walzen sehen nach grafik aus, nacheinander
               nach mechanik */
            "--v": i,
          } as React.CSSProperties
        }
      >
        {/* zweimal null bis neun · nur so ist eine ganze umdrehung
            möglich, ohne dass das band oben ins leere läuft */}
        {Array.from({ length: 20 }, (_, n) => (
          <span key={n}>{n % 10}</span>
        ))}
      </span>
    </span>
  );
}

function Zahl({ wert, ab }: { wert: string; ab: number }) {
  return (
    <span className="zr-zahl">
      {wert.split("").map((z, i) => (
        <Walze key={`${z}-${i}`} ziffer={z} i={ab + i} />
      ))}
    </span>
  );
}

export function Zaehler({
  label,
  von,
  bis,
  bisLabel,
  einheit,
}: {
  label: string;
  von: string;
  bis: string;
  bisLabel: string;
  einheit: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const beo = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag?.isIntersecting) return;
        el.dataset.lauf = "1";
        /* einmal ist einmal · danach hat der beobachter nichts mehr
           zu tun und wird abgeräumt */
        beo.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    beo.observe(el);
    return () => beo.disconnect();
  }, []);

  return (
    <div className="zr" ref={root}>
      <span className="lab-label">{label}</span>

      <div className="zr-werk">
        <Zahl wert={von} ab={0} />
        <span className="zr-bis">{bisLabel}</span>
        <Zahl wert={bis} ab={von.length} />
        <span className="zr-einheit">{einheit}</span>
      </div>
    </div>
  );
}
