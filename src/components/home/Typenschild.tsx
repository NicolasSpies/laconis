"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Typenschild · das objekt in der mitte der startseite.
 *
 * hier stand vorher ein absatz prosa plus ein streifen zahlen. der
 * kommentar im code behauptete sogar, es sei „das geschraubte
 * typenschild" · gebaut war davon nie etwas. es passierte nichts, man
 * konnte nichts anfassen, und über Nicolas stand trotzdem zu viel für
 * eine startseite. das gehört auf /ueber-mich, hier gehört ein LINK
 * dahin und ein grund, ihn zu drücken.
 *
 * also: eine schwere, gravierte platte. man greift sie, sie kippt zur
 * hand, das licht wandert dabei über das metall wie über echtes
 * gebürstetes alu. das ist der einzige ort auf der startseite, an dem
 * das versprechen aus dem hero („websites, die man anfassen will")
 * tatsächlich eingelöst wird statt nur behauptet.
 *
 * die belohnung fürs weiterspielen: kippt man weit genug, rakt das
 * streiflicht so flach über die fläche, dass eine ZWEITE, tiefer
 * gravierte zeile lesbar wird. bei senkrechter draufsicht ist sie
 * unsichtbar · genau wie bei einem echten geprägten schild. wer nur
 * scrollt, verpasst nichts wichtiges. wer spielt, findet was.
 *
 * arbeitsteilung wie bei den Schichten auf /referenzen: das ruhige
 * eigenleben läuft als CSS-keyframe (steht auch im hintergrund-tab
 * nie still), die hand schreibt nur einen versatz obendrauf. die
 * rAF-schleife läuft ausschliesslich, solange sich noch was bewegt.
 */

export type TypenschildT = {
  label: string;
  serie: string;
  zeile1: string;
  akzent: string;
  zeile2: string;
  tief: string;
  daten: [string, string][];
  key: string;
  hinweis: string;
};

export function Typenschild({ t, href }: { t: TypenschildT; href: string }) {
  const root = useRef<HTMLDivElement>(null);
  const platte = useRef<HTMLDivElement>(null);
  /* ist-werte und ziel-werte je achse, normiert auf -1..1 */
  const ist = useRef({ x: 0, y: 0 });
  const ziel = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const lauf = () => {
    if (raf.current) return;
    const tick = () => {
      const el = root.current;
      if (!el) return;
      const dx = ziel.current.x - ist.current.x;
      const dy = ziel.current.y - ist.current.y;
      ist.current.x += dx * 0.14;
      ist.current.y += dy * 0.14;

      el.style.setProperty("--kx", ist.current.x.toFixed(4));
      el.style.setProperty("--ky", ist.current.y.toFixed(4));
      /* wie flach das streiflicht steht · daran hängt sowohl der
         glanzstreifen als auch die tiefe gravur. in JS gerechnet,
         weil CSS-abs() noch nicht überall sicher ist */
      const rake = Math.min(1, Math.hypot(ist.current.x, ist.current.y));
      el.style.setProperty("--rake", rake.toFixed(4));

      if (Math.abs(dx) > 0.0015 || Math.abs(dy) > 0.0015) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = 0;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const zeige = (ev: React.PointerEvent) => {
    const p = platte.current;
    if (!p) return;
    const b = p.getBoundingClientRect();
    /* -1..1 vom plattenmittelpunkt aus · die achsen sind bewusst
       vertauscht: zeiger nach rechts kippt die platte UM die
       hochachse, nicht nach rechts */
    ziel.current = {
      x: ((ev.clientY - b.top) / b.height - 0.5) * -2,
      y: ((ev.clientX - b.left) / b.width - 0.5) * 2,
    };
    lauf();
  };

  const weg = () => {
    ziel.current = { x: 0, y: 0 };
    lauf();
  };

  return (
    <div
      className="ts"
      ref={root}
      onPointerMove={zeige}
      onPointerLeave={weg}
      onPointerCancel={weg}
    >
      <div className="ts-platte" ref={platte}>
        <span className="ts-schraube" data-e="lo" aria-hidden />
        <span className="ts-schraube" data-e="ro" aria-hidden />
        <span className="ts-schraube" data-e="lu" aria-hidden />
        <span className="ts-schraube" data-e="ru" aria-hidden />

        {/* gebürstetes metall · liegt unter allem und dreht sich
            nicht mit dem text mit */}
        <span className="ts-buerste" aria-hidden />
        <span className="ts-glanz" aria-hidden />

        <div className="ts-inhalt">
          <div className="ts-kopf">
            <span className="ts-label">{t.label}</span>
            <span className="ts-serie">{t.serie}</span>
          </div>

          <div className="ts-koerper">
            <p className="ts-satz">
              {t.zeile1}
              <span className="ts-akzent">{t.akzent}</span>
              {t.zeile2}
            </p>

            {/* die tiefe gravur · nur bei flachem lichteinfall lesbar */}
            <p className="ts-tief" aria-hidden>
              {t.tief}
            </p>
            {/* für screenreader steht sie einmal normal da · ein satz,
                den nur sehende spieler finden, wäre sonst für andere
                schlicht nicht vorhanden */}
            <span className="lab-sr">{t.tief}</span>
          </div>

          <div className="ts-daten">
            {t.daten.map(([k, v]) => (
              <div key={k} className="ts-datum">
                <span className="ts-datum-wert">{v}</span>
                <span className="ts-datum-key">{k}</span>
              </div>
            ))}
          </div>

          <div className="ts-fuss">
            <Link href={href} className="lab-key-lime ts-key">
              {t.key}
            </Link>
            <span className="ts-hinweis">{t.hinweis}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
