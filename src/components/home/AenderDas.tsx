"use client";

import { useRef, useState } from "react";

/**
 * AenderDas · das CMS-versprechen in EINER geste.
 *
 * das argument „du pflegst deine seite selbst" steht auf fast jeder
 * seite als behauptung. hier kann man es in zwei sekunden prüfen:
 * anklicken, tippen, fertig. kein login, keine anleitung, kein
 * bedienpult · genau so fühlt sich ContentCore an.
 *
 * ABGRENZUNG zum LiveEditor auf /leistung: der hat ein volles pult
 * mit feldern, akzentfarbe, bild-schalter und publish-sequenz · das
 * ist das werkzeug. hier gibt es nur die geste. die home zeigt DASS,
 * /leistung zeigt WIE.
 *
 * technik: contentEditable auf drei textknoten. react verwaltet die
 * kinder von contentEditable-elementen nicht mit, deshalb
 * suppressContentEditableWarning · der browser ist hier die quelle
 * der wahrheit, nicht der state. das ist genau der punkt: es ist
 * echter text, den man anfasst, kein eingabefeld, das so tut.
 *
 * der text bleibt reiner text · es wird nirgends markup aus einer
 * zeichenkette in den baum geschrieben.
 */

export type AenderDasT = {
  label: string;
  h2a: string;
  h2b: string;
  hinweis: string;
  seiteTitel: string;
  seiteText: string;
  seiteKnopf: string;
  fuss: string;
};

export function AenderDas({ t }: { t: AenderDasT }) {
  const [beruehrt, setBeruehrt] = useState(false);
  const blatt = useRef<HTMLDivElement>(null);

  return (
    <section className="ad" data-no-reveal>
      <div className="ad-kopf">
        <span className="lab-label">{t.label}</span>
        <h2 className="lab-display ad-h2">
          {t.h2a}
          <br />
          <span className="ad-akzent">{t.h2b}</span>
        </h2>
      </div>

      <div className="ad-buehne">
        <div className="ad-blatt gl" ref={blatt} data-beruehrt={beruehrt ? "1" : "0"}>
          <h3
            className="lab-display ad-titel"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onInput={() => setBeruehrt(true)}
          >
            {t.seiteTitel}
          </h3>

          <p
            className="ad-text"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onInput={() => setBeruehrt(true)}
          >
            {t.seiteText}
          </p>

          <span
            className="ad-knopf"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onInput={() => setBeruehrt(true)}
          >
            {t.seiteKnopf}
          </span>
        </div>

        <span className="lab-label ad-hinweis">{t.hinweis}</span>
      </div>

      <p className="ad-fuss">{t.fuss}</p>
    </section>
  );
}
