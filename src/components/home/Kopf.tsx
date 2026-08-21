"use client";

import { useEffect, useState } from "react";
import { ShaderField } from "@/components/device/ShaderField";

/**
 * Kopf · die Schrift traegt allein.
 *
 * ═══ was hier schon alles falsch war ═══
 *
 * erst stand eine gerenderte chrom-wortmarke MITTEN in der
 * ueberschrift · ein logo im inneren eines satzes liest sich als
 * keines von beidem, und dieselbe marke steht 60px darueber in der
 * leiste. dann stand sie darueber als eigener koerper, spaeter als
 * echte CSS-extrusion, die sich mit dem zeiger drehte.
 *
 * alles raus. der hero braucht kein objekt · er hat einen satz, viel
 * dunkle flaeche und ein feld, das sich bewegt. mehr wuerde nur
 * wieder mit der schrift konkurrieren.
 *
 * ═══ was hier ausserdem behoben ist ═══
 *
 * · `filter: brightness(2.05)` auf dem feld ist raus. der rechnete
 *   #e1fd52 auf (255,255,168) hoch · blasses gelbweiss statt neon.
 * · der multiply-ausschnitt ist raus. unter ihm lag vor dem ersten
 *   WebGL-frame schwarz, und weiss mal schwarz ist schwarz · die
 *   ueberschrift war anfangs unsichtbar und ohne WebGL dauerhaft.
 * · `.kp` traegt jetzt einen statischen verlauf als grund. kein
 *   WebGL, kein erster frame, reduzierte bewegung · der hero steht
 *   in allen drei faellen. das feld ist zugabe, nicht voraussetzung.
 */

export type KopfT = {
  kicker: string;
  h1: string[];
  akzent: string;
  zeile: string;
  hinweis: string;
};

export function Kopf({ t }: { t: KopfT }) {
  const [uhr, setUhr] = useState<string | null>(null);

  useEffect(() => {
    const stell = () =>
      setUhr(
        new Intl.DateTimeFormat("de-BE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    stell();
    const id = setInterval(stell, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="kp" data-no-reveal>
      <ShaderField className="kp-feld" />

      {/* registermarken · vier ecken wie auf einem druckbogen */}
      <span className="kp-marke-el kp-marke-lo" aria-hidden />
      <span className="kp-marke-el kp-marke-ro" aria-hidden />
      <span className="kp-marke-el kp-marke-lu" aria-hidden />
      <span className="kp-marke-el kp-marke-ru" aria-hidden />

      <div className="kp-lage">
        <p className="kp-kicker">{t.kicker}</p>

        <div className="kp-mitte">
          <h1 className="kp-h1">
            {t.h1.join(" ")} <span className="kp-akzent">{t.akzent}</span>
          </h1>
        </div>

        <div className="kp-fuss">
          <p className="kp-lead">{t.zeile}</p>
          <span className="kp-uhr" aria-hidden>
            {uhr ?? " "}
          </span>
        </div>
      </div>

      <span className="kp-hinweis" aria-hidden>
        {t.hinweis}
      </span>
    </section>
  );
}
