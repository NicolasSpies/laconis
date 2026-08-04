"use client";

import { useState } from "react";
import Link from "next/link";
import { referenzen } from "@/data/referenzen";
import type { Locale } from "@/i18n/config";
import { buildPath } from "@/i18n/config";

/**
 * RefIndex · die referenzen als editorial-index.
 *
 * die zeile IST der link · ein klick und man ist drin. das war schon
 * vorher richtig und bleibt.
 *
 * was sich geändert hat, ist die vorschau. bis august 2026 hing ein
 * kleines standbild am mauszeiger. das hatte drei probleme: es war
 * winzig, es stand still, und auf touch gab es stattdessen ein noch
 * kleineres bild in der zeile · zusammen sah das nach briefmarke aus,
 * nicht nach der arbeit.
 *
 * jetzt fährt die echte seite in voller breite durch ein kinoband
 * unter der zeile. man sieht sie SCROLLEN, nicht als schnipsel.
 *
 * ohne zeiger (handy, tablet) stehen alle bänder von anfang an offen
 * und laufen · dort gibt es kein hover, also darf die vorschau nicht
 * daran hängen. das ist reine CSS-logik, kein JS und kein media-query
 * im javascript, der beim ersten render das falsche zeigt.
 */

export function RefIndex({
  locale,
  t,
}: {
  locale: Locale;
  t: { stampLive: string; stampKonzept: string; stampWip: string; open: string };
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="ri-wrap">
      {referenzen.map((r, i) => {
        const stamp = r.istEcht ? t.stampLive : r.inArbeit ? t.stampWip : t.stampKonzept;
        return (
          <Link
            key={r.slug}
            href={`${buildPath("referenzen", locale)}/${r.slug}`}
            className="ri-row"
            data-on={hover === i ? "1" : "0"}
            data-dim={hover !== null && hover !== i ? "1" : "0"}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span className="ri-kopf">
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
            </span>

            {/* das kinoband · rein dekorativ, der name daneben sagt
                schon alles was ein screenreader braucht */}
            <span className="ri-band" aria-hidden>
              <span className="ri-band-innen">
                {/* eigene ebene für die höhe · das aufklappen läuft
                    über grid-template-rows 0fr, und das greift nur,
                    wenn das direkte kind selbst KEINE feste höhe hat */}
                <span className="ri-band-bild">
                  {r.shots ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={r.shots.desktop} alt="" className="ri-fahrt" />
                  ) : (
                    <span className="ri-mono" style={{ background: r.farbe }}>
                      {(r.monogram ?? r.name[0] ?? "·").toLowerCase()}
                    </span>
                  )}
                  <span className="ri-band-glanz" />
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
