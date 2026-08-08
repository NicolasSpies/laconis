"use client";

import { useState } from "react";

/**
 * FeatureVergleich · zwei tafeln nebeneinander, ein satz schalter.
 *
 * der vorgänger war ein regler mit der beschriftung „plugins" · das war
 * schief. Nicolas hat keine plugins, bei ihm ist alles eingebaut. man
 * kann auf seiner seite also gar nichts hochdrehen, und ein vergleich,
 * bei dem eine seite den regler nicht hat, ist keiner.
 *
 * was BEIDE seiten haben, sind features. genau die schaltet man hier
 * zu, und dann geht es auseinander: links wird jedes feature ein
 * zugekauftes plugin und schleppt sein eigenes javascript mit. rechts
 * ist es teil der seite und wiegt fast nichts.
 *
 * die plugin-namen sind die, die man in der wordpress-welt tatsächlich
 * dafür nimmt. das ist kein seitenhieb, sondern der grund, warum die
 * zahlen so auseinanderlaufen.
 */

export type FeatureT = {
  label: string;
  colPlugins: string;
  colMine: string;
  mineNote: string;
  gErweiterungen: string;
  gAnbieter: string;
  none: string;
  builtIn: string;
  kommt: string;
  hint: string;
  verdicts: [string, string, string];
  features: { key: string; label: string; plugin: string; kommt?: boolean }[];
};

/* der wordpress-core und ein theme sind zwei anbieter, bevor das
   erste plugin dazukommt · sie updaten unabhängig voneinander */
const BASIS_ANBIETER = 2;

export function FeatureVergleich({ t }: { t: FeatureT }) {
  const [an, setAn] = useState<Set<string>>(new Set());
  const n = an.size;

  /* gezählt, nicht geschätzt · beide zahlen kann jeder nachprüfen,
     der die plugin-namen daneben liest */
  const zeilen: [string, string, string][] = [
    [t.gErweiterungen, String(n), "0"],
    [t.gAnbieter, String(BASIS_ANBIETER + n), "1"],
  ];

  const verdict = n === 0 ? 0 : n <= 3 ? 1 : 2;
  const aktive = t.features.filter((f) => an.has(f.key));

  return (
    <div>
      {/* ── die schalter · was die seite können soll ── */}
      <div className="fv-keys">
        <span className="lab-label fv-keys-label">{t.label}</span>
        <div className="fv-keys-row">
          {t.features.map((f) => {
            const on = an.has(f.key);
            return (
              <button
                key={f.key}
                type="button"
                className="fv-key"
                data-on={on ? "1" : "0"}
                aria-pressed={on}
                onClick={() =>
                  setAn((prev) => {
                    const next = new Set(prev);
                    if (next.has(f.key)) next.delete(f.key);
                    else next.add(f.key);
                    return next;
                  })
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── die zwei tafeln ── */}
      <div className="fv-panels mt-8">
        <div className="gl gl--karte fv-panel" data-seite="plugins">
          <span className="lab-label fv-panel-head" style={{ color: "rgba(176,132,211,0.9)" }}>
            {t.colPlugins}
          </span>

          {/* die zugekauften stücke · sie stapeln sich sichtbar */}
          <div className="fv-stack">
            {aktive.length === 0 ? (
              <span className="fv-stack-empty">{t.none}</span>
            ) : (
              aktive.map((f) => (
                <span key={f.key} className="fv-chip">
                  {f.plugin}
                </span>
              ))
            )}
          </div>

          <div className="fv-rows">
            {zeilen.map(([k, v]) => (
              <div key={k} className="fv-row">
                <span className="lab-label">{k}</span>
                <span className="fv-val" data-bad={n > 0 ? "1" : "0"}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="gl gl--karte fv-panel" data-seite="mine">
          <span className="lab-label fv-panel-head" style={{ color: "rgba(225,253,82,0.9)" }}>
            {t.colMine}
          </span>

          <div className="fv-stack">
            {aktive.length === 0 ? (
              <span className="fv-builtin">{t.none}</span>
            ) : (
              aktive.map((f) => (
                /* newsletter ist noch nicht drin · das steht dann
                   auch so da, statt es unter „eingebaut" zu
                   verstecken */
                <span key={f.key} className="fv-chip" data-kommt={f.kommt ? "1" : "0"}>
                  {f.label} · {f.kommt ? t.kommt : t.builtIn}
                </span>
              ))
            )}
            <span className="fv-stack-note">{t.mineNote}</span>
          </div>

          <div className="fv-rows">
            {zeilen.map(([k, , v]) => (
              <div key={k} className="fv-row">
                <span className="lab-label">{k}</span>
                <span className="fv-val" data-good="1">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        className="mt-8 max-w-[62ch] text-body leading-relaxed"
        style={{ color: n === 0 ? "rgba(242,242,242,0.62)" : "#e1fd52" }}
      >
        {t.verdicts[verdict]}
      </p>
      <p className="lab-hint mt-3">{t.hint}</p>
    </div>
  );
}
