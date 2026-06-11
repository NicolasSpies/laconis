"use client";

import { useState } from "react";
import { CounterUp } from "@/components/ui/CounterUp";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * PreisExplorer · interaktiver mini-konfigurator.
 * user togglet faktoren · live total updated mit CounterUp.
 *
 * keine echten quotes · nur orientierungswerte. faustregel-rechner.
 */

type Option = {
  key: string;
  label: string;
  add: number;
};

const DICT: Record<
  Locale,
  {
    headline: string;
    sub: string;
    base: { key: string; label: string; price: number }[];
    options: Option[];
    sum: string;
    disclaim: string;
  }
> = {
  de: {
    headline: "spiel mal mit den faktoren.",
    sub: "richtwerte · keine echte offerte · nur damit du gefühl bekommst, was wohin treibt.",
    base: [
      { key: "onepager", label: "onepager", price: 1500 },
      { key: "multi", label: "mehrseitig", price: 2800 },
      { key: "komplett", label: "web + branding", price: 3500 },
    ],
    options: [
      { key: "cms", label: "+ cms zum selbst pflegen", add: 600 },
      { key: "trilingual", label: "+ dreisprachig (DE · FR · EN)", add: 800 },
      { key: "branding", label: "+ branding-paket dazu", add: 1200 },
      { key: "rush", label: "+ deadline < 4 wochen", add: 500 },
    ],
    sum: "richtwert",
    disclaim: "kein angebot · echtes angebot nach gespräch.",
  },
  fr: {
    headline: "joue avec les facteurs.",
    sub: "valeurs indicatives · pas une vraie offre · juste pour te donner une idée.",
    base: [
      { key: "onepager", label: "onepage", price: 1500 },
      { key: "multi", label: "multi-pages", price: 2800 },
      { key: "komplett", label: "web + branding", price: 3500 },
    ],
    options: [
      { key: "cms", label: "+ cms à gérer toi-même", add: 600 },
      { key: "trilingual", label: "+ trilingue (DE · FR · EN)", add: 800 },
      { key: "branding", label: "+ pack branding inclus", add: 1200 },
      { key: "rush", label: "+ deadline < 4 semaines", add: 500 },
    ],
    sum: "indicatif",
    disclaim: "pas une offre · vraie offre après échange.",
  },
  en: {
    headline: "play with the factors.",
    sub: "indicative values · not a real quote · just to get a feel for what drives what.",
    base: [
      { key: "onepager", label: "onepager", price: 1500 },
      { key: "multi", label: "multi-page", price: 2800 },
      { key: "komplett", label: "web + branding", price: 3500 },
    ],
    options: [
      { key: "cms", label: "+ cms you maintain yourself", add: 600 },
      { key: "trilingual", label: "+ trilingual (DE · FR · EN)", add: 800 },
      { key: "branding", label: "+ branding pack included", add: 1200 },
      { key: "rush", label: "+ deadline < 4 weeks", add: 500 },
    ],
    sum: "ballpark",
    disclaim: "no offer · real offer after a chat.",
  },
};

export function PreisExplorer() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const [baseKey, setBaseKey] = useState(t.base[0].key);
  const [opts, setOpts] = useState<Record<string, boolean>>({});

  const base = t.base.find((b) => b.key === baseKey) ?? t.base[0];
  const optsTotal = t.options.reduce(
    (sum, o) => sum + (opts[o.key] ? o.add : 0),
    0,
  );
  const total = base.price + optsTotal;

  return (
    <div className="rounded-2xl bg-[#0a0a0a] text-[#f2f2f2] p-6 md:p-10 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]">
      <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tracking-[-0.035em] leading-[1] lowercase">
        {t.headline}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-[#f2f2f2]/65 max-w-[520px]">
        {t.sub}
      </p>

      {/* base selector */}
      <div className="mt-8">
        <div className="font-mono text-[10px] uppercase tracking-label text-[#f2f2f2]/55 mb-3">
          basis
        </div>
        <div className="flex flex-wrap gap-2">
          {t.base.map((b) => {
            const active = baseKey === b.key;
            return (
              <button
                key={b.key}
                type="button"
                onClick={() => setBaseKey(b.key)}
                className={`font-mono text-[11px] uppercase tracking-label px-4 py-2.5 rounded-full transition-colors ${
                  active
                    ? "bg-[#e1fd52] text-[#0a0a0a] border border-[#e1fd52]"
                    : "bg-transparent text-[#f2f2f2]/85 border border-[#f2f2f2]/20 hover:border-[#f2f2f2]/45"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* options checkboxes */}
      <div className="mt-7">
        <div className="font-mono text-[10px] uppercase tracking-label text-[#f2f2f2]/55 mb-3">
          extras
        </div>
        <div className="flex flex-wrap gap-2">
          {t.options.map((o) => {
            const active = !!opts[o.key];
            return (
              <button
                key={o.key}
                type="button"
                onClick={() =>
                  setOpts((prev) => ({ ...prev, [o.key]: !prev[o.key] }))
                }
                className={`font-mono text-[11px] uppercase tracking-label px-4 py-2.5 rounded-full transition-colors ${
                  active
                    ? "bg-[#b084d3] text-[#0a0a0a] border border-[#b084d3]"
                    : "bg-transparent text-[#f2f2f2]/85 border border-[#f2f2f2]/20 hover:border-[#f2f2f2]/45"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* total */}
      <div className="mt-10 pt-7 border-t border-[#f2f2f2]/15 flex flex-wrap items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-label text-[#f2f2f2]/55">
          {t.sum}
        </span>
        <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-0.04em] leading-none text-[#e1fd52]">
          <CounterUp
            value={total}
            duration={400}
            format={(n) => `${Math.round(n).toLocaleString("de-DE")} €`}
          />
        </span>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-[#f2f2f2]/45">
        {t.disclaim}
      </p>
    </div>
  );
}
