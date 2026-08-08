"use client";

import { useState } from "react";

/**
 * PriceCaliper · das messinstrument auf /preise.
 *
 * die seite verweigert fixpreise, also gibt das instrument auch keinen
 * einzelwert aus: es misst einen KORRIDOR. je nach einstellung wandert
 * und dehnt er sich · eine einzelne zahl kommt nie raus. genau das ist
 * die haltung, und sie ist hier gebaut statt behauptet.
 *
 * das lag bis august 2026 QUER: eine 1100px breite schiene von 0 bis
 * 8000, auf der der eigentliche korridor knapp ein sechstel einnahm.
 * daneben und darunter viel leerer kasten. das instrument war damit
 * grösstenteils leere skala.
 *
 * jetzt steht es HOCHKANT. die säule nutzt die höhe, die der kasten
 * ohnehin hat, der korridor ist ein körper statt eines striches, und
 * die regler stehen als schmale spalte daneben statt darunter. dazu
 * wandern die beiden ablesungen mit den enden des korridors mit ·
 * man sieht die spanne, statt sie zu lesen.
 *
 * alle grenzen stammen aus Nicolas' eigenen, veröffentlichten zahlen:
 *   onepager ab 1.500 · mehrseitig mit CMS 2.800 bis 4.500 · website
 *   bis 6.000 · logo ab 800 · brand identity ab 1.200 · branding bis
 *   5.000. nichts davon ist geschätzt oder aus einer marktstudie.
 * bei „beides" wird summiert und die koordinations-ersparnis abgezogen,
 * die er ohnehin nennt (alles aus einer hand).
 */

/* die skala muss den EIGENEN höchstwert fassen: beides · grösste
   stufe · drei sprachen landet bei 12.600. eine 8.000er skala hat
   dort „von 8.100" neben „bis 8.000+" gezeigt · der untere wert war
   höher als der obere. */
const SCALE_MAX = 13000;

/* die skala ist bewusst NICHT linear. linear säuft der normalfall
   (1.500 bis 2.800) im untersten fünftel ab, während oben leere
   fläche steht. die wurzel spreizt unten und staucht oben, wie bei
   einem rechenschieber · und weil die striche derselben kurve
   folgen, bleibt jede ablesung korrekt. */
function pos(v: number) {
  return Math.sqrt(Math.min(1, Math.max(0, v / SCALE_MAX))) * 100;
}

/* [von, bis] je stufe · in euro */
const TIERS: Record<"web" | "brand", [number, number][]> = {
  web: [
    [1500, 2800],
    [2800, 4500],
    [4500, 6000],
  ],
  brand: [
    [800, 1200],
    [1200, 2500],
    [2500, 5000],
  ],
};

/* aus einer hand · spart die abstimmung zwischen zwei dienstleistern */
const BUNDLE = 0.88;
/* jede weitere sprache · übersetzung, pflege, hreflang, und im CMS
   ein zweiter satz felder pro inhalt. das ist echter aufwand, kein
   knopfdruck. */
const PRO_SPRACHE = 0.15;

/* mindestabstand der beiden ablesungen auf der säule, in prozent ·
   bei 800 bis 1200 € lägen sie sonst übereinander */
const MIN_LUFT = 13;

export type CaliperT = {
  labelWas: string;
  wasWeb: string;
  wasBrand: string;
  wasBoth: string;
  labelUmfang: string;
  tiersWeb: [string, string, string];
  tiersBrand: [string, string, string];
  tiersBoth: [string, string, string];
  labelSprachen: string;
  sprachen: [string, string, string];
  readoutLabel: string;
  vonLabel: string;
  bisLabel: string;
  note: string;
  overflowNote: string;
};

function round100(n: number) {
  return Math.round(n / 100) * 100;
}

function fmt(n: number) {
  return n.toLocaleString("de-DE");
}

export function PriceCaliper({ t }: { t: CaliperT }) {
  const [was, setWas] = useState<"web" | "brand" | "both">("web");
  const [tier, setTier] = useState(0);
  const [sprachen, setSprachen] = useState(0);

  let lo: number;
  let hi: number;
  if (was === "both") {
    lo = (TIERS.web[tier]![0] + TIERS.brand[tier]![0]) * BUNDLE;
    hi = (TIERS.web[tier]![1] + TIERS.brand[tier]![1]) * BUNDLE;
  } else {
    [lo, hi] = TIERS[was][tier]!;
  }
  /* die zusatzsprachen heben BEIDE enden · eine zweite sprache macht
     auch das kleinste projekt spürbar grösser */
  if (sprachen > 0) {
    lo *= 1 + sprachen * PRO_SPRACHE * 0.7;
    hi *= 1 + sprachen * PRO_SPRACHE;
  }

  lo = round100(lo);
  hi = round100(hi);

  const overflow = hi > SCALE_MAX;
  const loPct = pos(lo);
  const hiPct = pos(hi);

  /* die schilder hängen an den enden des korridors, dürfen sich aber
     nicht überlagern · bei engen spannen weichen sie symmetrisch aus */
  const mitte = (loPct + hiPct) / 2;
  const luft = Math.max(MIN_LUFT, hiPct - loPct) / 2;
  const loTag = Math.max(0, Math.min(100 - MIN_LUFT, mitte - luft));
  const hiTag = Math.min(100, Math.max(MIN_LUFT, mitte + luft));

  const tierLabels =
    was === "web" ? t.tiersWeb : was === "brand" ? t.tiersBrand : t.tiersBoth;

  /* gravur: strich pro tausender, beschriftet alle dreitausend */
  const ticks = Array.from({ length: SCALE_MAX / 1000 + 1 }, (_, i) => i * 1000);

  const regler: [string, string[], number, (i: number) => void][] = [
    [t.labelWas, [t.wasWeb, t.wasBrand, t.wasBoth], ["web", "brand", "both"].indexOf(was), (i) =>
      setWas((["web", "brand", "both"] as const)[i]!)],
    [t.labelUmfang, [...tierLabels], tier, setTier],
    [t.labelSprachen, [...t.sprachen], sprachen, setSprachen],
  ];

  return (
    <div className="gl pr-box relative p-8 md:p-12">

      {/* ── die regler ── */}
      <div className="pr-regler">
        <span className="lab-label">{t.readoutLabel}</span>

        {regler.map(([label, opts, aktiv, setzen]) => (
          <div key={label} className="pr-regler-zeile">
            <span className="lab-label">{label}</span>
            <div className="lab-switch mt-3" role="radiogroup" aria-label={label}>
              {opts.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={aktiv === i}
                  data-on={aktiv === i ? "1" : "0"}
                  onClick={() => setzen(i)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="lab-hint pr-note">{overflow ? t.overflowNote : t.note}</p>
      </div>

      {/* ── die säule ── */}
      <div
        className="pr-saeule"
        role="img"
        aria-label={`${fmt(lo)} bis ${overflow ? `über ${fmt(SCALE_MAX)}` : fmt(hi)} euro`}
      >
        <div className="pr-skala" aria-hidden>
          {ticks
            .filter((v) => v % 3000 === 0)
            .map((v) => (
              <span key={v} style={{ bottom: `${pos(v)}%` }}>
                {v === 0 ? "0" : `${v / 1000}k`}
              </span>
            ))}
        </div>

        <div className="pr-schiene">
          {ticks.map((v) => (
            <span
              key={v}
              className="pr-tick"
              data-major={v % 3000 === 0 ? "1" : "0"}
              style={{ bottom: `${pos(v)}%` }}
              aria-hidden
            />
          ))}

          {/* der pegel bis zur unterkante des korridors */}
          <span className="pr-pegel" aria-hidden style={{ height: `${loPct}%` }} />

          <span
            className="pr-korridor"
            aria-hidden
            style={{ bottom: `${loPct}%`, height: `${Math.max(1.4, hiPct - loPct)}%` }}
          />

          {overflow && <span className="pr-endstop" aria-hidden />}
        </div>

        {/* die ablesungen hängen am korridor und wandern mit */}
        <div className="pr-tafeln" aria-hidden>
          <span className="pr-tafel" data-end="hi" style={{ bottom: `${hiTag}%` }}>
            <span className="pr-tafel-key">{t.bisLabel}</span>
            <span className="pr-tafel-wert">
              {overflow ? `${fmt(SCALE_MAX)}+` : fmt(hi)}
              <i>€</i>
            </span>
          </span>
          <span className="pr-tafel" data-end="lo" style={{ bottom: `${loTag}%` }}>
            <span className="pr-tafel-key">{t.vonLabel}</span>
            <span className="pr-tafel-wert">
              {fmt(lo)}
              <i>€</i>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
