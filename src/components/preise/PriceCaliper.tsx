"use client";

import { useState } from "react";
import { RockerSwitch } from "@/components/lab/Controls";

/**
 * PriceCaliper · der messschieber.
 *
 * die seite verweigert fixpreise, also gibt das instrument auch keinen
 * einzelwert aus: es misst einen KORRIDOR. je mehr du einstellst, desto
 * enger wird er · eine einzelne zahl kommt nie raus. genau das ist die
 * haltung, und sie ist hier gebaut statt behauptet.
 *
 * alle grenzen stammen aus Nicolas' eigenen, veröffentlichten zahlen:
 *   onepager ab 1.500 · mehrseitig mit CMS 2.800 bis 4.500 · website
 *   bis 6.000 · logo ab 800 · brand identity ab 1.200 · branding bis
 *   5.000. nichts davon ist geschätzt oder aus einer marktstudie.
 * bei „beides" wird summiert und die koordinations-ersparnis abgezogen,
 * die er ohnehin nennt (alles aus einer hand).
 */

const SCALE_MAX = 8000;

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
/* wenn texte und bilder noch entstehen müssen */
const CONTENT_UP = 1.15;

export type CaliperT = {
  labelWas: string;
  wasWeb: string;
  wasBrand: string;
  wasBoth: string;
  labelUmfang: string;
  tiersWeb: [string, string, string];
  tiersBrand: [string, string, string];
  tiersBoth: [string, string, string];
  labelTexte: string;
  texteHint: string;
  readoutLabel: string;
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
  const [hilfe, setHilfe] = useState(false);

  let lo: number;
  let hi: number;
  if (was === "both") {
    lo = (TIERS.web[tier]![0] + TIERS.brand[tier]![0]) * BUNDLE;
    hi = (TIERS.web[tier]![1] + TIERS.brand[tier]![1]) * BUNDLE;
  } else {
    [lo, hi] = TIERS[was][tier]!;
  }
  if (hilfe) hi *= CONTENT_UP;

  lo = round100(lo);
  hi = round100(hi);

  const overflow = hi > SCALE_MAX;
  const loPct = Math.min(100, (lo / SCALE_MAX) * 100);
  const hiPct = Math.min(100, (hi / SCALE_MAX) * 100);

  const tierLabels =
    was === "web" ? t.tiersWeb : was === "brand" ? t.tiersBrand : t.tiersBoth;

  /* gravur: strich pro 500, langer strich + zahl pro 2000 */
  const ticks = Array.from({ length: SCALE_MAX / 500 + 1 }, (_, i) => i * 500);

  return (
    <div className="lab-chassis relative p-6 md:p-10">
      <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
      <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
      <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

      {/* ── ablesung ── */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <span className="lab-label">{t.readoutLabel}</span>
          <div className="pr-value mt-3">
            {fmt(lo)}
            <span className="pr-value-sep">·</span>
            {overflow ? `${fmt(SCALE_MAX)}+` : fmt(hi)}
            <span style={{ color: "#e1fd52" }}> €</span>
          </div>
        </div>
        <p className="lab-hint max-w-[290px] text-[12px] leading-relaxed">
          {overflow ? t.overflowNote : t.note}
        </p>
      </div>

      {/* ── die schiene ── */}
      <div className="pr-beam mt-9" role="img" aria-label={`${fmt(lo)} bis ${overflow ? `über ${fmt(SCALE_MAX)}` : fmt(hi)} euro`}>
        {ticks.map((v) => {
          const major = v % 2000 === 0;
          return (
            <span
              key={v}
              className="pr-tick"
              data-major={major ? "1" : "0"}
              style={{ left: `${(v / SCALE_MAX) * 100}%` }}
              aria-hidden
            >
              {major && (
                <span
                  className="pr-tick-label"
                  /* erste und letzte zahl nach innen rücken · die schiene
                     schneidet ab (overflow), sonst fehlt die halbe ziffer */
                  style={
                    v === 0
                      ? { transform: "translateX(2px)" }
                      : v === SCALE_MAX
                        ? { transform: "translateX(calc(-100% - 3px))" }
                        : undefined
                  }
                >
                  {v === 0 ? "0" : `${v / 1000}k`}
                </span>
              )}
            </span>
          );
        })}

        <span
          className="pr-corridor"
          aria-hidden
          style={{ left: `${loPct}%`, width: `${Math.max(1.5, hiPct - loPct)}%` }}
        />

        <span className="pr-jaw" data-side="min" style={{ left: `${loPct}%` }} aria-hidden>
          <span className="pr-jaw-blade" />
          <span className="pr-jaw-body">
            <span className="pr-vernier" />
          </span>
        </span>

        <span className="pr-jaw" data-side="max" style={{ left: `${hiPct}%` }} aria-hidden>
          <span className="pr-jaw-blade" />
          <span className="pr-jaw-body">
            <span className="pr-vernier" />
          </span>
        </span>

        {overflow && <span className="pr-endstop" aria-hidden />}
      </div>

      {/* ── die einstellungen ── */}
      <div className="mt-10 grid gap-7 md:grid-cols-2">
        <div>
          <span className="lab-label">{t.labelWas}</span>
          <div className="pr-switch mt-3" role="radiogroup" aria-label={t.labelWas}>
            {(
              [
                ["web", t.wasWeb],
                ["brand", t.wasBrand],
                ["both", t.wasBoth],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={was === k}
                data-on={was === k ? "1" : "0"}
                onClick={() => setWas(k)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="lab-label">{t.labelUmfang}</span>
          <div className="pr-switch mt-3" role="radiogroup" aria-label={t.labelUmfang}>
            {tierLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={tier === i}
                data-on={tier === i ? "1" : "0"}
                onClick={() => setTier(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <RockerSwitch
          label={t.labelTexte}
          hint={t.texteHint}
          on={hilfe}
          onToggle={() => setHilfe((p) => !p)}
        />
      </div>
    </div>
  );
}
