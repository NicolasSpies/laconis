"use client";

import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Usp = { wert: string; label: string; note: string };

const DICT: Record<Locale, { usps: Usp[] }> = {
  de: {
    usps: [
      { wert: "95+", label: "PageSpeed", note: "Mobile und Desktop. Messbar, kein Versprechen." },
      { wert: "0", label: "Cookie-Banner", note: "Keine Tracker. Keine Banner. Kein Nerv." },
      { wert: "1", label: "Ansprechpartner", note: "Ich baue, ich antworte, ich bleibe." },
      { wert: "∞", label: "Plugins", note: "Null. Gebaut statt zusammengeklickt." },
    ],
  },
  fr: {
    usps: [
      { wert: "95+", label: "PageSpeed", note: "Mobile et desktop. Mesurable, pas une promesse." },
      { wert: "0", label: "Bandeau cookies", note: "Pas de trackers. Pas de bandeaux. Pas de souci." },
      { wert: "1", label: "Interlocuteur", note: "Je construis, je réponds, je reste." },
      { wert: "∞", label: "Plugins", note: "Zéro. Construit, pas clic-clic-assemblé." },
    ],
  },
  en: {
    usps: [
      { wert: "95+", label: "PageSpeed", note: "Mobile and desktop. Measurable, not a promise." },
      { wert: "0", label: "Cookie banners", note: "No trackers. No banners. No annoyance." },
      { wert: "1", label: "Point of contact", note: "I build, i answer, i stay." },
      { wert: "∞", label: "Plugins", note: "Zero. Built, not clicked together." },
    ],
  },
};

export function UspStrip() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-20">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 rounded-xl overflow-hidden border border-ink/20">
          {t.usps.map((u) => (
            <div
              key={u.label}
              className="bg-dark/40 px-6 py-7 md:py-8 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <div className="heading-display text-[clamp(2.25rem,5vw,3.5rem)] text-accent-ink leading-none">
                  {u.wert}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {u.label}
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-snug text-offwhite/55">
                {u.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
