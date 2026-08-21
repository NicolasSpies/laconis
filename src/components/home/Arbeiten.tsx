import Link from "next/link";
import type { Referenz } from "@/data/referenzen";

/**
 * Arbeiten · alle gleichrangig.
 *
 * eine runde lang lief hier EINE arbeit randlos und gross oben,
 * waehrend die anderen zwei als zeilen darunter standen · begruendet
 * damit, dass nur sie echte aufnahmen hat. das war eine hierarchie,
 * die Nicolas nicht wollte: keine referenz im vordergrund, alle
 * gleich.
 *
 * jetzt bekommt jede dieselbe zeile: name in display-groesse, die
 * markenfarbe als schmaler streifen, kategorie in mono. was ein
 * projekt an material hat, entscheidet auf seiner eigenen seite,
 * nicht hier.
 *
 * KEINE nummerierung. keine 01 02 03.
 */

export type ArbeitenT = {
  /** ueberschrift der sektion · ein wort reicht */
  h2: string;
};

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

  return (
    <section className="ar" data-no-reveal>
      <div className="ar-innen">
        <h2 className="ar-h2">{t.h2}</h2>

        <ul className="ar-liste">
          {werke.map((w) => (
            <li key={w.slug}>
              <Link
                className="ar-zeile"
                href={`${href}/${w.slug}`}
                style={{ "--f": w.farbe } as React.CSSProperties}
              >
                <span className="ar-strich" aria-hidden />
                <span className="ar-name">{w.name.toLowerCase()}</span>
                <span className="ar-art">
                  {w.kategorieLabel}
                  {w.inArbeit ? " · in arbeit" : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
