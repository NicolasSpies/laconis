"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type Staerke = { num: string; titel: string; unter: string };

type Dict = { cta: string; staerken: Staerke[] };

const DICT: Record<Locale, Dict> = {
  de: {
    cta: "mehr über mich →",
    staerken: [
      { num: "01", titel: "alles aus einem kopf", unter: "Design & Code · kein Handoff, keine verlorene Übersetzung." },
      { num: "02", titel: "eigenes system", unter: "Keine Templates, kein Baukasten · auf deine Marke zugeschnitten." },
      { num: "03", titel: "bleibt danach", unter: "Ein Gesprächspartner, jahrelang erreichbar · nicht abtauchen nach Launch." },
    ],
  },
  fr: {
    cta: "en savoir plus sur moi →",
    staerken: [
      { num: "01", titel: "tout dans une seule tête", unter: "Design & code · pas de handoff, pas de traduction perdue." },
      { num: "02", titel: "système propre", unter: "Pas de templates, pas de constructeur · taillé pour ta marque." },
      { num: "03", titel: "je reste après", unter: "Un interlocuteur, joignable des années · pas de disparition après le lancement." },
    ],
  },
  en: {
    cta: "more about me →",
    staerken: [
      { num: "01", titel: "everything from one head", unter: "Design & code · no handoff, no lost translation." },
      { num: "02", titel: "own system", unter: "No templates, no builder · tailored to your brand." },
      { num: "03", titel: "still here after", unter: "One conversation partner, reachable for years · no disappearing act after launch." },
    ],
  },
};

export function StaerkenStrip() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {t.staerken.map((s) => (
            <div
              key={s.num}
              className="flex flex-col gap-3 pt-5 border-t border-ink/20"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                · {s.num}
              </span>
              <h3 className="heading-sans text-[18px] md:text-[20px] text-offwhite leading-tight">
                {s.titel}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-offwhite/55">
                {s.unter}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={buildPath("ueber-mich", locale)}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
