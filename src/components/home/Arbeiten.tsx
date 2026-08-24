import Link from "next/link";
import type { Referenz } from "@/data/referenzen";
import { FILME } from "@/data/filme.generated";
import { Film } from "@/components/home/Film";

/**
 * Arbeiten · der Anflug.
 *
 * ═══ WAS MAN SIEHT ═══
 *
 * Nach der hellen Kammer wird das Bild schwarz und bleibt STEHEN.
 * Weit hinten, klein, steht eine Platte. Sie wächst — nicht sie
 * bewegt sich auf dich zu, sondern du fährst auf sie zu. Kurz bevor
 * sie dich erreicht, hält sie an.
 *
 * Und DANN passiert der Auftritt, obwohl die Fahrt steht: der
 * Farbstrich fährt hoch, eine Haarlinie zieht sich unter dem Namen
 * durch, die Kategorie schiebt sich herein, der Pfeil wird lime.
 * Danach kippt die Platte nach vorn und läuft links und rechts aus
 * dem Bild, und dahinter steht schon die nächste.
 *
 * Die LETZTE bricht nicht durch. Sie kommt an und bleibt. Sonst
 * wäre Station drei die Wiederholung von Station eins.
 *
 * ═══ WARUM DER HALT DAS HERZ IST ═══
 *
 * Gleichmässige Fahrt ist ein Karussell. Kino hält auf dem Objekt.
 * Deshalb bekommt jede Station ein Fenster in der Scrollstrecke, in
 * dem die Kamera STEHT — und der Auftritt läuft dort auf der UHR,
 * nicht am Scrollrad. Wer weiterscrollt, hat ihn trotzdem gesehen.
 * Wer stehen bleibt, sieht ihn zu Ende. Ein rein scrollgetriebener
 * Auftritt friert mitten in der Geste ein, sobald der Finger stoppt.
 *
 * ═══ WARUM DIE RECHNUNG HIER STEHT UND NICHT IN CSS ═══
 *
 * Die Fenster liessen sich in CSS aus `--i` und `--n` rechnen. Dann
 * hängt aber die ganze Choreografie an `calc()` mit Prozentwerten
 * ausserhalb 0–100 % in `animation-range` — der am dünnsten
 * getestete Winkel der Scroll-Timeline-Spec. Hier sind es drei
 * Zahlen, server-seitig, deterministisch, und sie wachsen trotzdem
 * mit den Daten mit.
 *
 * ═══ DIE PLATTE LÄUFT ═══
 *
 * Gemessen an schultzschultz.com, dem Vorbild: 12 Videos, 18 Bilder,
 * 2 Canvas. Ihre grösste Type ist 160 px — KLEINER als hier — und
 * sie haben genau vier CSS-Animationen. Der Unterschied war nie
 * Typografie oder CSS. Es ist bewegtes Material der eigenen Arbeit.
 *
 * Also läuft die gebaute Seite jetzt wirklich: `scripts/film.mjs`
 * öffnet `urlExtern`, scrollt mit konstanter Geschwindigkeit durch
 * und nimmt das auf. Beim echten Scrollen laufen die Animationen der
 * Kundenseite mit — Reveals, Sticky-Elemente, Mikrobewegungen. Genau
 * das ist der Beweis, dass da eine Seite LÄUFT und nicht ein Bild
 * hängt. Ein CSS-Schwenk über ein langes Standbild sähe fast gleich
 * aus, und "fast" ist der Unterschied.
 *
 * ═══ KEIN STOCKBILD, KEIN LEERES RECHTECK ═══
 *
 * `heroImage` ist bei ALLEN DREI Referenzen ein Unsplash-Bild. Auf
 * einer Platte, die für die Arbeit steht, wäre das ein Fremdbild,
 * das als eigene Arbeit gelesen wird. Deshalb kommt nur eigenes
 * Material drauf: Film, wenn einer existiert, sonst Aufnahme, sonst
 * die Markenfarbe mit der Lieferliste aus `tags`.
 */

export type ArbeitenT = {
  /** ueberschrift der sektion · ein wort reicht */
  h2: string;
  /** der weg auf die uebersicht */
  alle: string;
};

/* das Fenster einer Station in Prozent der Klebestrecke. 46 %
   Anflug + Halt, danach der Durchbruch. */
const FENSTER = 46;

/* Vorlauf · Station eins beginnt VOR dem Anfang der Strecke, damit
   sie nicht bei null aus dem Nichts erscheint, sondern schon
   unterwegs ist, wenn die Bühne klebt. */
const VORLAUF = 14;

/* aus welcher Tiefe eine Station anfliegt. Die erste kommt am
   weitesten her — gleiche Startdistanzen lesen sich als Takt. */
const TIEFE_START = -1750;
const TIEFE_STUFE = 320;

/**
 * welche Schrift trägt auf dieser Markenfarbe?
 *
 * Die drei heutigen Farben sind alle dunkel genug für Weiss. Das
 * still vorauszusetzen wäre aber genau die Sorte gestellte Falle,
 * die erst beim vierten Projekt zuschnappt — dann steht weisse
 * Schrift auf einem hellen Gelb und keiner weiss, warum.
 *
 * sRGB-Relativluminanz nach WCAG, Schwelle 0,42. Server-seitig,
 * deterministisch, kein Zustand.
 */
function aufFarbe(hex: string): string {
  const h = hex.replace("#", "");
  const voll = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const kanal = (i: number) => {
    const v = parseInt(voll.slice(i * 2, i * 2 + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const l = 0.2126 * kanal(0) + 0.7152 * kanal(1) + 0.0722 * kanal(2);
  return l > 0.42 ? "#0b0b0e" : "#ffffff";
}

export function Arbeiten({
  werke,
  t,
  href,
}: {
  werke: Referenz[];
  t: ArbeitenT;
  href: string;
}) {
  if (!werke.length) return null;

  const anzahl = werke.length;
  /* die Fenster überlappen sich: die nächste Platte ist schon
     unterwegs, während die vorige durchbricht. Ohne Überlappung
     wäre der Raum zwischen zwei Stationen leer. */
  const spanne = anzahl > 1 ? (100 - FENSTER + VORLAUF) / (anzahl - 1) : 0;

  return (
    <section className="ar" data-no-reveal>
      <div className="ar-innen">
        <h2 className="ar-h2">{t.h2}</h2>
      </div>

      {/* die Bahn ist GESCHWISTER von .ar-innen, nicht Kind ·
          .ar-innen deckelt auf var(--shell), die Bühne muss
          randlos sein. Ohne Tunnel ist die Bahn ein gewöhnlicher
          Wrapper und die Liste steht wie bisher. */}
      <div className="ar-bahn" style={{ "--n": anzahl } as React.CSSProperties}>
        <div className="ar-buehne">
          <ul className="ar-liste">
            {werke.map((w, i) => {
              const von = i * spanne - VORLAUF;
              return (
                <li
                  key={w.slug}
                  style={
                    {
                      "--i": i,
                      "--f": w.farbe,
                      "--auf-f": aufFarbe(w.farbe),
                      "--tief": `${TIEFE_START + i * TIEFE_STUFE}px`,
                      "--von": `${von}%`,
                      "--bis": `${von + FENSTER}%`,
                      /* die frühere Station liegt VORNE · sonst
                         schiebt sich die nächste durch die
                         durchbrechende hindurch */
                      zIndex: anzahl - i,
                    } as React.CSSProperties
                  }
                >
                  <Link className="ar-zeile" href={`${href}/${w.slug}`}>
                    {/* das Feld ist im Fallback display:none · dort
                        bleibt die abgenommene Zeilenliste stehen */}
                    <span className="ar-feld" aria-hidden>
                                            {FILME.includes(w.slug) ? (
                        <Film slug={w.slug} />
                      ) : w.shots ? (
                        /* <picture> statt <img>: auf dem Handy liegt
                           die HANDY-Aufnahme im Repo und wurde bis
                           hierher nicht benutzt — dort stand die
                           Desktop-Aufnahme beschnitten, also eine
                           1440er Seite in einem 340-px-Feld.

                           roh, mit festen Massen. next/image mit
                           `fill` misst sich im 3D-Stapel falsch
                           (388 px in einem 606-px-Feld, gemessen). */
                        <picture>
                          <source
                            media="(max-width: 720px)"
                            srcSet={w.shots.mobile}
                            width={390}
                            height={7085}
                          />
                          <img
                            className="ar-bild"
                            src={w.shots.desktop}
                            width={1440}
                            height={6496}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      ) : (
                        /* KEIN Material, also kein Bild — aber auch
                           kein leeres Rechteck. Auf der Farbfläche
                           steht, WAS geliefert wurde. Das sind echte
                           Daten aus referenzen.ts, keine Dekoration
                           und kein Platzhalter, und bei einem
                           Branding-Projekt ist genau das der
                           Werkbericht. */
                        <span className="ar-liefer">
                          {w.tags.join(" · ")}
                        </span>
                      )}
                    </span>

                    <span className="ar-strich" aria-hidden />
                    <span className="ar-name">{w.name.toLowerCase()}</span>
                    <span className="ar-art">
                      {w.kategorieLabel}
                      {w.inArbeit ? " · in arbeit" : ""}
                    </span>
                    {/* die zeilen trugen ihre klickbarkeit NUR im hover
                        (streifen-scale, farbwechsel) · auf dem handy
                        waren es drei graue zeilen zwischen haarlinien,
                        während dieselbe seite das pfeil-motiv am
                        CMS-link schon benutzt. */}
                    <span className="ar-pfeil" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* die einzige Antwort auf „wie lang geht das noch" ·
              im Fallback nicht vorhanden (display:none) */}
          <div className="ar-weg" aria-hidden>
            <i />
          </div>
        </div>
      </div>

      <div className="ar-innen">
        <Link className="ar-alle lab-link" href={href}>
          {t.alle} →
        </Link>
      </div>
    </section>
  );
}
