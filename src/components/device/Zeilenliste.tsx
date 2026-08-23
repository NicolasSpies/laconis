import "@/components/device/device.css";

/**
 * Zeilenliste · label links, halbsatz rechts.
 *
 * /kontakt endete bis august 2026 in `grid md:grid-cols-3` mit
 * <h3> plus <p> pro zelle · dem standardblock, wörtlich. der rest
 * der seite ist als gerät gebaut, und dann kippte der schluss in
 * das layout, das jede agentur-seite hat.
 *
 * /studio löste DIESELBE datenform (`[string, string][]`) längst
 * als zeilenliste. jetzt teilen sich beide seiten eine komponente,
 * statt dass zwei ideen nebeneinander stehen.
 */

export function Zeilenliste({ eintraege }: { eintraege: readonly (readonly [string, string])[] }) {
  return (
    <ul className="st-weg">
      {eintraege.map(([wo, was]) => (
        <li key={wo} className="st-weg-zeile">
          <span className="st-weg-wo">{wo}</span>
          <span className="st-weg-was">{was}</span>
        </li>
      ))}
    </ul>
  );
}
