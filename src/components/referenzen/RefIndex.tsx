"use client";

import Link from "next/link";
import { referenzen } from "@/data/referenzen";
import type { Locale } from "@/i18n/config";
import { buildPath } from "@/i18n/config";

/**
 * RefIndex · die drei zeilen unter dem stapel.
 *
 * die zeile IST der link · ein klick und man ist drin. das war schon
 * immer richtig und bleibt.
 *
 * was sich geändert hat: die zeile zeigt keine vorschau mehr. erst
 * hing ein standbild am mauszeiger (zu klein, stand still), danach
 * fuhr die seite durch ein kinoband unter der zeile (schön, aber es
 * war das ZWEITE bild derselben sache · oben im hero lag ja schon
 * der stapel). beides ist raus.
 *
 * jetzt steuert die zeile den stapel darüber. drüberfahren schaltet
 * um, und der stapel zeigt die aufnahme, die farbe und das monogramm
 * des projekts. ein element statt zwei, und die vorschau ist
 * gleichzeitig das, womit man spielen kann.
 *
 * ohne zeiger (handy) gibt es kein hover · dort schaltet der stapel
 * von selbst weiter, das steuert die elternkomponente. die zeile
 * bleibt dann einfach ein link, und der ist immer erreichbar.
 */

export function RefIndex({
  locale,
  aktiv,
  setzeAktiv,
  t,
}: {
  locale: Locale;
  aktiv: number;
  /** meldet, welche zeile die hand gerade berührt */
  setzeAktiv: (i: number) => void;
  t: { stampLive: string; stampKonzept: string; stampWip: string; open: string };
}) {
  return (
    <div className="ri-wrap">
      {referenzen.map((r, i) => {
        const stamp = r.istEcht ? t.stampLive : r.inArbeit ? t.stampWip : t.stampKonzept;
        return (
          <Link
            key={r.slug}
            href={`${buildPath("referenzen", locale)}/${r.slug}`}
            className="ri-row"
            data-on={aktiv === i ? "1" : "0"}
            onMouseEnter={() => setzeAktiv(i)}
            onFocus={() => setzeAktiv(i)}
          >
            <span className="ri-nr">{String(i + 1).padStart(2, "0")}</span>

            <span className="ri-name lab-display">{r.name.toLowerCase()}</span>

            <span className="ri-meta">
              <span className="lab-label">{r.kategorieLabel}</span>
              <span className="lab-label">{r.jahr}</span>
            </span>

            <span className="ri-stamp lab-label" data-live={r.istEcht ? "1" : "0"}>
              <span className="ri-led" data-live={r.istEcht ? "1" : r.inArbeit ? "wip" : "0"} />
              {stamp}
            </span>

            <span className="ri-go" aria-hidden>
              {t.open} →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
