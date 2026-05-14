"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Unterschied = { num: string; punkt: string; detail: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2italic: string;
  h2post: string;
  manchmalNicht: string;
  leftBody1: string;
  leftBody2: string;
  rightLabel: string;
  rightH3: string;
  marginNote: string;
  unterschiede: Unterschied[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "ehrlich gesagt",
    h2pre: "brauchst du mich ",
    h2italic: "überhaupt",
    h2post: "?",
    manchmalNicht: "manchmal nicht. ↓",
    leftBody1: "Wenn du einen Verein gründest, ein Hobby-Projekt testest oder die ersten 50 Kunden suchst · nimm einen Baukasten. 10 € im Monat, morgen online, kein Stress.",
    leftBody2: "Ich sage dir das lieber bevor du buchst, als danach.",
    rightLabel: "aber wenn du eine marke aufbaust ·",
    rightH3: "dann macht der unterschied sich über jahre bemerkbar.",
    marginNote: "und das spürt man hinterher.",
    unterschiede: [
      { num: "01", punkt: "kein code-zugriff · kein export · kein entkommen.", detail: "Bei Wix, Squarespace & Co. gehört die Seite dem Anbieter. Preiserhöhung? Insolvenz? Umbau? Du hast keine Karte." },
      { num: "02", punkt: "templates sehen nach templates aus.", detail: "Deine Marke quetscht sich ins vorhandene Raster. Google erkennt das. Besucher auch · sie bleiben kürzer." },
      { num: "03", punkt: "pagespeed unter 60 kostet dich google-plätze.", detail: "Baukästen laden langsam. Das ist kein Zufall, das ist Architektur. Ein lacønis-Projekt startet bei 95+." },
    ],
  },
  fr: {
    sectionLabel: "franchement",
    h2pre: "tu as ",
    h2italic: "vraiment",
    h2post: " besoin de moi ?",
    manchmalNicht: "parfois non. ↓",
    leftBody1: "Si tu lances une asbl, testes un projet hobby ou cherches tes 50 premiers clients · prends un constructeur. 10 € par mois, en ligne demain, pas de stress.",
    leftBody2: "Je préfère te le dire avant que tu réserves, plutôt qu'après.",
    rightLabel: "mais si tu construis une marque ·",
    rightH3: "la différence se ressent sur des années.",
    marginNote: "et ça se sent après.",
    unterschiede: [
      { num: "01", punkt: "pas d'accès au code · pas d'export · pas d'échappatoire.", detail: "Chez Wix, Squarespace & co, le site appartient au fournisseur. Hausse de prix ? Faillite ? Refonte ? Tu n'as pas la carte." },
      { num: "02", punkt: "les templates ont l'air de templates.", detail: "Ta marque s'écrase dans la grille existante. Google le voit. Les visiteurs aussi · ils restent moins longtemps." },
      { num: "03", punkt: "un pagespeed sous 60 te coûte des places google.", detail: "Les constructeurs chargent lentement. C'est pas un hasard, c'est l'architecture. Un projet lacønis démarre à 95+." },
    ],
  },
  en: {
    sectionLabel: "honestly",
    h2pre: "do you ",
    h2italic: "actually",
    h2post: " need me?",
    manchmalNicht: "sometimes not. ↓",
    leftBody1: "If you're starting a non-profit, testing a hobby project or hunting your first 50 customers · grab a builder. 10 € a month, online tomorrow, no stress.",
    leftBody2: "I'd rather tell you that before you book than after.",
    rightLabel: "but if you're building a brand ·",
    rightH3: "the difference shows over the years.",
    marginNote: "and you'll feel it later.",
    unterschiede: [
      { num: "01", punkt: "no code access · no export · no exit.", detail: "With Wix, Squarespace & co, the site belongs to the provider. Price hike? Bankruptcy? Rebuild? You have no map." },
      { num: "02", punkt: "templates look like templates.", detail: "Your brand squeezes into a grid that already exists. Google notices. Visitors too · they stay shorter." },
      { num: "03", punkt: "a pagespeed under 60 costs you google rankings.", detail: "Builders load slowly. That's not random, it's architecture. A lacønis project starts at 95+." },
    ],
  },
};

export function WebVsAlternatives({ num = "04" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            {t.h2pre}
            <span className="italic font-serif text-accent-ink">{t.h2italic}</span>
            {t.h2post}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          <div>
            <p
              className="font-hand text-[22px] md:text-[26px] text-offwhite/50 leading-tight"
              style={{ transform: "rotate(-1deg)" }}
            >
              {t.manchmalNicht}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-offwhite/55 max-w-[400px]">
              {t.leftBody1}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-offwhite/55 max-w-[400px]">
              {t.leftBody2}
            </p>
          </div>

          <div className="relative">
            <div
              className="glass rounded-2xl p-7 md:p-9"
              style={{ transform: "rotate(0.4deg)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-label text-accent-ink/70">
                {t.rightLabel}
              </p>
              <p className="mt-3 heading-display text-[clamp(1.5rem,3vw,2.1rem)] text-offwhite leading-[1.08]">
                {t.rightH3}
              </p>

              <div className="mt-8 space-y-6 border-t border-ink/20 pt-6">
                {t.unterschiede.map((u) => (
                  <div key={u.num} className="grid grid-cols-[28px_1fr] gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30 pt-1">
                      {u.num}
                    </span>
                    <div>
                      <p className="text-[14px] text-offwhite/85 font-medium leading-snug">
                        {u.punkt}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-offwhite/45">
                        {u.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-5 font-hand text-[19px] text-offwhite/35 text-right"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              {t.marginNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
