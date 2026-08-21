"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import type { Referenz } from "@/data/referenzen";

/**
 * Raum · die arbeiten stehen im licht, die kamera fährt daran vorbei.
 *
 * das ist die sprache der ganzen seite: EIN raum, stationen darin.
 * kein wechsel zwischen hero und sektion, kein textblock, der erklärt,
 * was man gleich sehen wird · man sieht es.
 *
 * kopf und fuss sind stationen wie die arbeiten auch. dadurch gibt es
 * keinen bruch zwischen „startseite" und „referenzen" · es ist
 * derselbe gang.
 *
 * ═══ vier dinge, die in CSS-3D still schiefgehen ═══
 *
 * 1 · pointer-events: none auf .rm-raum ist PFLICHT. der raum ist
 *     selbst auf translateZ(+cam) gefahren und liegt damit näher an
 *     der kamera als jedes exponat darin · im hit-test gewinnt seine
 *     eigene box, und jeder klick landet auf ihm statt auf dem objekt,
 *     das man sieht. nichts sieht falsch aus, nichts ist klickbar.
 * 2 · filter: brightness() flacht preserve-3d ab (spec) und rechnet
 *     einen filterdurchlauf pro bild pro frame. licht wird gemalt.
 *     und es liegt AUF dem exponat, nicht als rechteck darüber ·
 *     sonst malt der schleier schwarze kisten in den raum.
 * 3 · @property … inherits: false lässt nachfahren still den
 *     initialwert lesen. --nah und --dunkel beschreiben eine STELLE
 *     im raum, die muss vererben.
 * 4 · deckkraft ist nicht das mittel, mit dem ein objekt abgeht. ein
 *     halbdurchsichtiges exponat zeigt das dahinter durch sich
 *     hindurch · das sieht sofort nach webseite aus statt nach raum.
 *     abgehen heisst: aus dem licht gehen.
 */

/** abstand zweier stationen im raum */
const SPAN = 1000;
/** anteil eines scroll-fensters, in dem die kamera fährt · rest = halt */
const FAHRT = 0.58;

const glatt = (x: number) => x * x * (3 - 2 * x);
const klemm = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

export type RaumT = {
  /** scroll-hinweis unten links · ein wort, keine anleitung */
  hinweis: string;
};

export function Raum({
  werke,
  kopf,
  fuss,
  t,
  href,
}: {
  werke: Referenz[];
  /** optionale wort-station VOR den arbeiten · ohne sie fängt der
      raum direkt mit dem ersten exponat an */
  kopf?: ReactNode;
  fuss: ReactNode;
  t: RaumT;
  /** basis für die case-links, z.b. "/referenzen" oder "/en/work" */
  href: string;
}) {
  const buehne = useRef<HTMLDivElement>(null);
  const raum = useRef<HTMLDivElement>(null);
  const stationen: { node: ReactNode; mitte: boolean }[] = [
    ...(kopf ? [{ node: <div className="rm-wort">{kopf}</div>, mitte: false }] : []),
    ...werke.map((w) => ({ node: <Werk key={w.slug} werk={w} href={href} />, mitte: false })),
    { node: <div className="rm-wort">{fuss}</div>, mitte: true },
  ];
  const anzahl = stationen.length;

  useEffect(() => {
    const b = buehne.current;
    const r = raum.current;
    if (!b || !r) return;

    const objekte = Array.from(r.querySelectorAll<HTMLElement>(".rm-objekt"));
    let raf = 0;

    const mal = () => {
      raf = 0;
      const rect = b.getBoundingClientRect();
      const weg = rect.height - window.innerHeight;
      const p = klemm(weg > 0 ? -rect.top / weg : 0);

      /* fahrt mit halt · eine gleichmässige fahrt ist ein karussell.
         der auftritt entsteht im stillstand, nicht in der bewegung. */
      const t2 = p * (anzahl - 1);
      const i = Math.min(Math.floor(t2), anzahl - 2);
      const f = t2 - i;
      const cam = (i + (f < FAHRT ? glatt(f / FAHRT) : 1)) * SPAN;

      r.style.setProperty("--cam", `${cam.toFixed(1)}px`);

      objekte.forEach((el, k) => {
        const d = k * SPAN - cam;
        const nah = 1 - klemm(Math.abs(d) / (SPAN * 0.95));
        /* 2.6 liess die nächste station noch bei 61 % durchscheinen ·
           bei einem hellen screenshot hinter einem titel ist das
           gedränge, kein tiefeneindruck. 1.9 legt dunst davor. */
        const sicht =
          d >= 0 ? klemm(1 - d / (SPAN * 1.9)) : klemm((d + SPAN * 0.92) / (SPAN * 0.3));
        el.style.setProperty("--nah", nah.toFixed(3));
        el.style.setProperty("--sicht", sicht.toFixed(3));
        /* quadratisch · linear abfallendes licht macht schon die halbe
           distanz stockdunkel. so bleibt der kegel breit. */
        el.style.setProperty("--dunkel", (0.74 * (1 - nah) * (1 - nah)).toFixed(3));
        /* nur was im licht steht, nimmt klicks · sonst fängt ein
           exponat aus dem dunkel den klick ab, der dem sichtbaren galt */
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
  }, [anzahl]);

  return (
    <div
      className="rm-buehne"
      ref={buehne}
      style={{ height: `calc(100svh + ${(anzahl - 1) * 105}svh)` }}
    >
      <div className="rm-kamera">
        <div className="rm-raum" ref={raum} style={{ "--cam": "0px" } as React.CSSProperties}>
          {stationen.map((s, i) => (
            <div
              key={i}
              className="rm-objekt"
              style={
                {
                  "--i": i,
                  /* seitlicher versatz · ohne ihn ist es ein tunnel und
                     man sieht das nächste durch das aktuelle hindurch */
                  "--ox": `${versatz(i, s.mitte)}vw`,
                  "--od": `${versatz(i, s.mitte) * -0.55}deg`,
                } as React.CSSProperties
              }
            >
              {s.node}
            </div>
          ))}
        </div>

        {/* licht und boden gehören der kamera · sie fahren nicht mit */}
        <div className="rm-licht" aria-hidden />
        <div className="rm-boden" aria-hidden />

        {/* der hinweis sitzt IN der kamera, nicht fixed am fenster ·
            fixed hiess: er klebte schon über dem header, lange bevor
            der raum überhaupt anfängt. die kamera ist sticky und
            fensterfüllend, also verhält er sich darin genauso · nur
            verschwindet er mit dem raum. */}
        <span className="rm-hinweis" aria-hidden>
          {t.hinweis}
        </span>
      </div>
    </div>
  );
}

/**
 * seitlicher versatz je station · in vw.
 *
 * der KOPF steht bewusst links aussen und die erste arbeit rechts.
 * standen beide mittig, las man den titel durch den screenshot
 * dahindurch · das ist kein tiefeneindruck, das ist gedränge.
 * der fuss geht zurück in die mitte: das ist eine ansage, kein
 * exponat, und sie soll den blick halten.
 */
function versatz(i: number, mitte: boolean) {
  /* `mitte` bleibt auf der achse: das ist eine ansage, kein exponat,
     und sie soll den blick halten statt ihn zur seite zu ziehen. */
  if (mitte) return 0;
  /* die erste arbeit steht RECHTS · der header darüber ist links
     ausgerichtet, der blick wandert also natürlich hinüber. andersherum
     hing das erste exponat perspektivisch vergrössert über den linken
     rand hinaus und schnitt sein eigenes schild ab. */
  return i % 2 ? -12 : 12;
}

function Werk({ werk: r, href }: { werk: Referenz; href: string }) {
  /* der schirm erscheint NUR bei echter aufnahme. sonst behauptet er
     eine website, die es nicht gibt · Holoroom ist branding, da gibt
     es keine. das exponat ist dann die karte, die geliefert wurde. */
  const schirm = r.shots?.desktop;
  const mark = (r.monogram ?? r.name.slice(0, 2)).toLowerCase();

  return (
    <Link href={`${href}/${r.slug}`} className="rm-werk">
      <div className="rm-exponat" style={{ "--f": r.farbe } as React.CSSProperties}>
        {schirm ? (
          <div className="rm-schirm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={schirm} alt="" loading="lazy" />
          </div>
        ) : (
          <div className="rm-karte">
            <span className="rm-mark">{mark}</span>
            <span className="rm-karte-fuss">{r.name.toLowerCase()}</span>
          </div>
        )}
      </div>

      <span className="rm-schild">
        <span className="rm-name">{r.name.toLowerCase()}</span>
        <span className="rm-meta">
          {r.kategorieLabel}
          {r.inArbeit ? " · in arbeit" : ""}
        </span>
      </span>
    </Link>
  );
}
