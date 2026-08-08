"use client";

import Link from "next/link";

/**
 * Schluss · die leere platte.
 *
 * ersetzt drei dinge auf einmal:
 *
 * 1 · das gehäuse mit vier schrauben (metall, das er zurecht nicht
 *     mochte)
 * 2 · die überschrift „erzähl mir, was du vorhast." · die stand
 *     wortgleich auf /leistung
 * 3 · den SendButton mit schutzkappe. der wurde OHNE onSend
 *     gerendert: man klappte die kappe hoch, drückte, und bekam
 *     „raus damit · ich melde mich." für eine nachricht, die nie
 *     existiert hat. auf einer seite, deren ganze position
 *     ehrlichkeit ist, war das der schlechteste einzelmoment.
 *
 * das objekt ist dieselbe platte wie im stapel darüber · nur leer.
 * die projekte liegen als platten mit fertigen seiten drauf, diese
 * hier wartet noch. das löst „dein projekt als nummer vier?"
 * physisch statt numerisch · kein zählen, keine positionsnummer für
 * den besucher.
 *
 * hineingraviert, nicht aufgedruckt: die schrift ist dunkler als das
 * glas und trägt eine helle kante UNTEN. genau andersherum als
 * geprägt · das ist der unterschied, den man ohne es zu wissen sieht.
 *
 * KEIN formular. das lebt vollständig auf /kontakt und darf sich
 * nicht doppeln.
 */

export type SchlussT = {
  gravur: string;
  hinweis: string;
  key: string;
  oder: string;
};

export function Schluss({ t, href, mail }: { t: SchlussT; href: string; mail: string }) {
  return (
    <section className="sl" data-no-reveal>
      <div className="sl-platte gl">
        <p className="sl-gravur">{t.gravur}</p>
      </div>

      <div className="sl-fuss">
        <Link href={href} className="lab-key-lime sl-key">
          {t.key}
        </Link>
        <span className="sl-oder">
          {t.oder}{" "}
          <a href={`mailto:${mail}`} className="sl-mail">
            {mail}
          </a>
        </span>
      </div>

      <p className="sl-hinweis">{t.hinweis}</p>
    </section>
  );
}
