"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { referenzen } from "@/data/referenzen";

/**
 * Richtung C · kinematisch.
 *
 * die seite ist EIN raum. der scroll fährt die kamera hindurch, nicht
 * die seite an einem vorbei. titel, projekte und schluss sind
 * stationen darin · deshalb gibt es keinen bruch zwischen „hero" und
 * „sektion": man ist die ganze zeit am selben ort.
 *
 * ═══ was diese fassung anders macht als die skizze ═══
 *
 * 1 · DIE KAMERA HÄLT AN. eine gleichmässige fahrt ist ein karussell.
 *     kino hält auf dem objekt. jede station bekommt ein fenster im
 *     scroll: die ersten ~58 % fährt die kamera, den rest steht sie
 *     still und das schild läuft ein. der auftritt entsteht im
 *     stillstand, nicht in der bewegung.
 *
 * 2 · NICHT JEDES EXPONAT IST EIN BILDSCHIRM. Holoroom ist branding ·
 *     logo, mini brand guide, visitenkarte. es gibt dort keine
 *     website. ein leerer browser-rahmen wäre nicht „bild fehlt",
 *     sondern eine falsche behauptung über die arbeit. also:
 *     web  → ein angestrahlter schirm
 *     branding → eine karte, die im raum steht
 *     und ein schirm erscheint NUR, wenn es eine echte aufnahme gibt.
 *     nebenbei löst das die optik: drei gleiche rechtecke waren
 *     langweilig, verschiedene objekte sind eine sammlung.
 *
 * 3 · LICHT STATT DECKKRAFT. was ausserhalb des kegels steht, fällt
 *     ins dunkel · nicht weil es ausgeblendet wird, sondern weil es
 *     nicht angestrahlt ist. das ist der unterschied zwischen einem
 *     raum und einer liste mit fade-in.
 *
 * ═══ technik ═══
 *
 * eine variable für die kamera (--cam in px), zwei pro objekt
 * (--nah, --sicht). geschrieben wird nur bei scroll/resize über einen
 * einzelnen rAF · kein dauerlauf, weil es hier nichts zu animieren
 * gibt, solange niemand scrollt.
 *
 * kein WebGL, keine fremde bibliothek. bei einer seite, die „0 kb
 * fremdes javascript" behauptet, ist das keine sparsamkeit, sondern
 * bedingung.
 */

/** abstand zweier stationen im raum */
const SPAN = 1000;
/** anteil eines scroll-fensters, in dem die kamera fährt · rest = halt */
const FAHRT = 0.58;

const glatt = (x: number) => x * x * (3 - 2 * x);
const klemm = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

type Station =
  | { art: "titel" }
  | { art: "werk"; ref: (typeof referenzen)[number] }
  | { art: "schluss" };

const STATIONEN: Station[] = [
  { art: "titel" },
  ...referenzen.map((ref) => ({ art: "werk" as const, ref })),
  { art: "schluss" },
];

/**
 * seitlicher versatz je station.
 *
 * ohne ihn stehen alle exponate auf derselben achse · das liest sich
 * als tunnel und der titel klebt auf dem schirm dahinter. mit versatz
 * wird daraus ein gang, an dem die kamera entlangfährt · und man
 * sieht das nächste stück schon, bevor man dort ist.
 *
 * titel und schluss bleiben mittig · das sind ansagen, keine exponate.
 */
function versatz(s: Station, i: number) {
  if (s.art !== "werk") return 0;
  return i % 2 ? -11 : 11;
}

export function VarianteC() {
  const buehne = useRef<HTMLDivElement>(null);
  const raum = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = buehne.current;
    const r = raum.current;
    if (!b || !r) return;

    const objekte = Array.from(r.querySelectorAll<HTMLElement>(".lc-objekt"));
    const n = STATIONEN.length;
    let raf = 0;

    const mal = () => {
      raf = 0;
      const rect = b.getBoundingClientRect();
      const weg = rect.height - window.innerHeight;
      const p = klemm(weg > 0 ? -rect.top / weg : 0);

      /* fahrt mit halt: p wird in n-1 fenster geteilt, in jedem fährt
         die kamera nur den ersten teil und steht dann still */
      const t = p * (n - 1);
      const i = Math.min(Math.floor(t), n - 2);
      const f = t - i;
      const station = i + (f < FAHRT ? glatt(f / FAHRT) : 1);
      const cam = station * SPAN;

      r.style.setProperty("--cam", `${cam.toFixed(1)}px`);

      objekte.forEach((el, k) => {
        /* positiv = liegt noch vor der kamera */
        const d = k * SPAN - cam;
        const nah = 1 - klemm(Math.abs(d) / (SPAN * 0.95));
        /* hinter der kamera verschwindet es schnell, davor trägt es
           weit · so entsteht tiefe statt eines fensters */
        /* deckkraft ist NICHT das mittel, mit dem ein objekt abgeht.
           ein karton wird nicht durchsichtig, wenn man daran
           vorbeigeht · er geht aus dem licht. eine karte auf halber
           deckkraft zeigt die karte dahinter durch sich hindurch, und
           das sieht sofort nach webseite aus statt nach raum.

           also: hinter der kamera bleibt es voll deckend, solange es
           überhaupt zu sehen ist · das dunkelwerden erledigt --dunkel.
           erst auf den letzten ~30 % zur nächsten station wird
           weggeblendet, und da ist es längst fast schwarz.

           nach VORNE ist eine sanfte blende dagegen richtig: das ist
           tiefendunst, kein geist. */
        const sicht =
          d >= 0
            ? klemm(1 - d / (SPAN * 2.6))
            : klemm((d + SPAN * 0.92) / (SPAN * 0.3));
        /* die lichtkurve gehört hierher, nicht in die CSS · calc()
           kann nicht quadrieren, und linear abfallendes licht macht
           schon die halbe distanz stockdunkel. quadratisch bleibt der
           kegel breit und fällt erst am rand weg · so sieht ein
           strahler aus. */
        const dunkel = 0.74 * (1 - nah) * (1 - nah);
        el.style.setProperty("--nah", nah.toFixed(3));
        el.style.setProperty("--sicht", sicht.toFixed(3));
        el.style.setProperty("--dunkel", dunkel.toFixed(3));
        /* nur was im licht steht, nimmt klicks · sonst fängt ein
           exponat aus dem dunkel den klick ab, der dem sichtbaren
           galt. das ist der klassische fehler bei gestapelten szenen
           und man findet ihn nie, weil man den täter nicht sieht. */
        el.style.pointerEvents = nah > 0.6 ? "auto" : "none";
      });
    };

    const plan = () => {
      if (!raf) raf = requestAnimationFrame(mal);
    };

    mal();
    window.addEventListener("scroll", plan, { passive: true });
    window.addEventListener("resize", plan);
    return () => {
      window.removeEventListener("scroll", plan);
      window.removeEventListener("resize", plan);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="lc">
      <div
        className="lc-buehne"
        ref={buehne}
        style={{ height: `calc(100svh + ${(STATIONEN.length - 1) * 105}svh)` }}
      >
        <div className="lc-kamera">
          <div className="lc-raum" ref={raum} style={{ "--cam": "0px" } as React.CSSProperties}>
            {STATIONEN.map((s, i) => (
              <div
                key={i}
                className="lc-objekt"
                style={
                  {
                    "--i": i,
                    "--ox": `${versatz(s, i)}vw`,
                    /* zur bahn gedreht · nicht frontal wie ein bild an der wand */
                    "--od": `${versatz(s, i) * -0.55}deg`,
                  } as React.CSSProperties
                }
              >
                {s.art === "titel" && <Titel />}
                {s.art === "werk" && <Werk werk={s.ref} />}
                {s.art === "schluss" && <Schluss />}
              </div>
            ))}
          </div>

          {/* der kegel gehört zur kamera, nicht zum raum · er fährt
              nicht mit, er beleuchtet die stelle, an der man steht */}
          <div className="lc-licht" aria-hidden />
          <div className="lc-boden" aria-hidden />
        </div>
      </div>

      <p className="lc-hinweis">scroll · die kamera fährt</p>
    </div>
  );
}

function Titel() {
  return (
    <div className="lc-titel">
      <h1>
        drei arbeiten.
        <br />
        <span className="lc-lime">eine hand.</span>
      </h1>
    </div>
  );
}

function Schluss() {
  return (
    <div className="lc-schluss">
      <p>und hier ist noch platz.</p>
      <Link href="/kontakt">schreib mir →</Link>
    </div>
  );
}

function Werk({ werk: r }: { werk: (typeof referenzen)[number] }) {
  /* der schirm erscheint NUR bei echter aufnahme · sonst behauptet er
     eine website, die es (noch) nicht gibt */
  const hatSchirm = Boolean(r.shots?.desktop);
  /* zwei zeichen · ein einzelnes „l" ist in Archivo ein senkrechter
     strich und liest sich als fehler, nicht als marke */
  const mark = (r.monogram ?? r.name.slice(0, 2)).toLowerCase();

  return (
    <Link href={`/referenzen/${r.slug}`} className="lc-werk" data-schirm={hatSchirm ? "1" : "0"}>
      <div className="lc-exponat" style={{ "--f": r.farbe } as React.CSSProperties}>
        {hatSchirm ? (
          <div className="lc-schirm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.shots!.desktop} alt="" loading="lazy" />
          </div>
        ) : (
          /* branding · das exponat ist die karte, die er geliefert hat */
          <div className="lc-karte">
            <span className="lc-mark">{mark}</span>
            <span className="lc-karte-fuss">{r.name.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="lc-schild">
        <span className="lc-name">{r.name.toLowerCase()}</span>
        <span className="lc-meta">
          {r.kategorieLabel}
          {r.inArbeit ? " · in arbeit" : ""}
        </span>
      </div>
    </Link>
  );
}
