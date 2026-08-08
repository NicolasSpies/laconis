"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Referenz } from "@/data/referenzen";
import type { Locale } from "@/i18n/config";
import { buildPath } from "@/i18n/config";

/**
 * Stapel · die referenzen als EIN objekt.
 *
 * die vorstufe hatte zwei elemente, die dasselbe sagten: einen stapel
 * aus sieben schichten (unterbau, code, raster …), der erklärte, was in
 * EINER website steckt, und darunter eine liste der drei projekte. dazu
 * vierzehn zeilen beschriftung am stapel, ein hinweistext, ein zähler
 * und pro zeile nochmal „case lesen". der projektname stand an zwei
 * stellen gleichzeitig. das war viel gerät für wenig aussage.
 *
 * jetzt ist eine schicht ein PROJEKT. der stapel zeigt alle referenzen
 * auf einmal, die beschriftung neben einer schicht ist ihr name, und
 * die liste daneben entfällt ersatzlos · sie wäre dasselbe nochmal.
 * kommt ein projekt dazu, wird der stapel dicker. das ist der ehrliche
 * fortschrittsbalken dieser seite.
 *
 * die alte schicht-erklärung (unterbau, code, raster, farbe …) ist
 * damit von dieser seite verschwunden. wenn sie zurück soll, dann
 * dort, wo von genau EINEM projekt die rede ist · auf der case-seite.
 * in der übersicht hat sie mit der liste um dieselbe fläche gekämpft.
 *
 * bedienung: über eine schicht oder ihren namen fahren hebt sie aus dem
 * stapel. klick führt in den case. ziehen fächert den ganzen stapel
 * auf und zu.
 *
 * arbeitsteilung mit der CSS: das grundleben (--atem) läuft dort als
 * keyframe und steht NIE still, auch nicht in einem hintergrund-tab ·
 * auf dem handy gibt es kein hover, dort ist das die ganze bewegung.
 * hier drin entsteht nur --zieh, der versatz aus der geste, und die
 * schleife läuft ausschliesslich solange sie sich noch bewegt.
 *
 * die namen laufen in einer flachen 2D-ebene mit, nicht im 3D-raum ·
 * eine reine translateZ im gekippten deck projiziert sich auf dem
 * schirm als reine vertikale bewegung (y = -z · sin(kippwinkel)),
 * deshalb reicht ein translateY mit demselben faktor. so bleibt die
 * schrift gerade und lesbar statt mitgekippt. die rechnung steht
 * komplett in der CSS.
 */

export function Stapel({
  projekte,
  locale,
  t,
}: {
  projekte: Referenz[];
  locale: Locale;
  t: { zieh: string; stampLive: string; stampKonzept: string; stampWip: string };
}) {
  const root = useRef<HTMLDivElement>(null);
  const [oben, setOben] = useState<number | null>(null);

  /* alles was pro frame passiert liegt in refs · state würde hier
     sechzig rerender pro sekunde auslösen */
  const versatz = useRef(0);
  const ziel = useRef(0);
  const raf = useRef(0);
  const griff = useRef<{ y: number; z: number; weit: number } | null>(null);

  const lauf = () => {
    if (raf.current) return;
    const tick = () => {
      const el = root.current;
      if (!el) return;
      const d = ziel.current - versatz.current;
      versatz.current += d * (griff.current ? 0.45 : 0.09);
      el.style.setProperty("--zieh", versatz.current.toFixed(4));
      if (griff.current || Math.abs(d) > 0.0008) {
        raf.current = requestAnimationFrame(tick);
      } else {
        versatz.current = ziel.current;
        el.style.setProperty("--zieh", versatz.current.toFixed(4));
        raf.current = 0;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* --zieh ist ein VERSATZ auf die ruhelage, nicht der absolute wert */
  const setzeZiel = (v: number) => {
    ziel.current = Math.max(-0.7, Math.min(0.28, v));
    lauf();
  };

  const onDown = (ev: React.PointerEvent) => {
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    griff.current = { y: ev.clientY, z: ziel.current, weit: 0 };
    lauf();
  };

  const onMove = (ev: React.PointerEvent) => {
    const g = griff.current;
    if (!g) return;
    const d = g.y - ev.clientY;
    g.weit = Math.max(g.weit, Math.abs(d));
    setzeZiel(g.z + d / 300);
  };

  const onUp = () => {
    const g = griff.current;
    griff.current = null;
    /* unter 6px war es kein ziehen sondern ein tipp · dann ganz auf
       oder ganz zu, damit die geste auch ohne feinmotorik was tut */
    if (g && g.weit < 6) setzeZiel(ziel.current > -0.34 ? -0.7 : 0.28);
    else lauf();
  };

  const stempel = (r: Referenz) =>
    r.istEcht ? t.stampLive : r.inArbeit ? t.stampWip : t.stampKonzept;

  /* das erste projekt liegt OBEN · der index zählt von unten, also
     dreht sich die reihenfolge um. sonst läse man die namen von
     03 nach 01 herunter. */
  const lage = (i: number) => projekte.length - 1 - i;

  /* zwei buchstaben statt einem · ein einzelnes kleines „l" ist ein
     senkrechter strich und sieht nach fehler aus, nicht nach zeichen */
  const kuerzel = (r: Referenz) =>
    (r.monogram ?? r.name.slice(0, 2)).toLowerCase();

  /* wer ÜBER der angefassten schicht liegt, rückt ein stück weiter
     weg · so entsteht die lücke, in der man die angefasste ganz
     sieht. sie selbst bleibt liegen, damit ihr name auf gleicher
     höhe daneben stehen bleibt · nach vorne springen liesse die
     leiter-linie ins leere zeigen. */
  const weicht = (i: number) =>
    oben !== null && lage(i) > lage(oben) ? 1 : 0;

  return (
    <div
      className="st"
      ref={root}
      style={{ "--n": projekte.length - 1 } as React.CSSProperties}
      onPointerLeave={() => setOben(null)}
    >
      {/* auf breiten schirmen liegen bühne und namen in DERSELBEN
          rasterzelle · die namen stehen dann rechts neben dem deck
          und wandern mit ihrer schicht mit. auf schmalen stehen sie
          untereinander, weil deck plus namensspalte dort nicht
          nebeneinander passen. dafür müssen sie geschwister sein,
          nicht ineinander geschachtelt. */}
      <div className="st-inhalt">
        <div
          className="st-buehne"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="st-deck">
            {projekte.map((r, i) => (
              /* die platte ist die BILDLICHE hälfte des links · der
                 name daneben trägt denselben href und ist der, den
                 screenreader und tastatur bekommen. zweimal dasselbe
                 ziel vorlesen zu lassen hilft niemandem. */
              <Link
                key={r.slug}
                href={`${buildPath("referenzen", locale)}/${r.slug}`}
                className="st-platte"
                data-on={oben === i ? "1" : "0"}
                data-ab={oben !== null && oben !== i ? "1" : "0"}
                style={{ "--z": lage(i), "--x": weicht(i) } as React.CSSProperties}
                aria-hidden
                tabIndex={-1}
                onMouseEnter={() => setOben(i)}
              >
                <span className="st-flaeche">
                  {r.shots ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={r.shots.desktop} alt="" />
                  ) : (
                    /* ohne aufnahme trägt die projektfarbe das kürzel ·
                       ehrlicher als ein platzhalter-bild */
                    <span className="st-mono" style={{ "--f": r.farbe } as React.CSSProperties}>
                      {kuerzel(r)}
                    </span>
                  )}
                  <span className="st-glanz" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="st-namen">
          {projekte.map((r, i) => (
            <Link
              key={r.slug}
              href={`${buildPath("referenzen", locale)}/${r.slug}`}
              className="st-name"
              data-on={oben === i ? "1" : "0"}
              style={{ "--z": lage(i), "--x": weicht(i) } as React.CSSProperties}
              onMouseEnter={() => setOben(i)}
              onFocus={() => setOben(i)}
              onBlur={() => setOben(null)}
            >
              <span className="st-strich" aria-hidden />
              <span className="st-titel lab-display">{r.name.toLowerCase()}</span>
              <span className="st-meta">
                <span
                  className="st-led"
                  data-live={r.istEcht ? "1" : r.inArbeit ? "wip" : "0"}
                  aria-hidden
                />
                {r.kategorieLabel} · {r.jahr} · {stempel(r)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <span className="lab-label st-zieh">{t.zieh}</span>
    </div>
  );
}
