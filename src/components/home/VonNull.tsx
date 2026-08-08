import Link from "next/link";

/**
 * VonNull · die greenfield-ansprache.
 *
 * die gab es bis august 2026 auf der startseite überhaupt nicht.
 * die einzige zielgruppen-frage war „du hast schon eine seite?" ·
 * für leute, die noch gar nichts haben, stand kein einziger satz da.
 *
 * der reframe ist die pointe: fast alle behandeln „keine website"
 * als den schwereren verkauf. für ihn ist es der leichtere BAU ·
 * keine altlasten, keine 301-liste, kein „das war schon immer so".
 * das ist wahr, und es nimmt genau die scham weg, mit der jemand
 * ohne seite auf so eine seite kommt.
 *
 * bewusst ohne bauteil: reine typo, vier zeilen, eine taste. die
 * sektion daneben (der umzug) ist die mit dem gerät · zwei greif-
 * bare dinge hintereinander wären eins zu viel.
 */

export type VonNullT = {
  h2a: string;
  h2b: string;
  lead: string;
  schritte: string[];
  key: string;
};

export function VonNull({ t, href }: { t: VonNullT; href: string }) {
  return (
    <section className="vn" data-no-reveal>
      <h2 className="lab-display vn-h2">
        {t.h2a}
        <br />
        <span className="vn-akzent">{t.h2b}</span>
      </h2>

      <div className="vn-rechts">
        <p className="vn-lead">{t.lead}</p>

        <ol className="vn-schritte">
          {t.schritte.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>

        <Link href={href} className="lab-key-lime vn-key">
          {t.key}
        </Link>
      </div>
    </section>
  );
}
