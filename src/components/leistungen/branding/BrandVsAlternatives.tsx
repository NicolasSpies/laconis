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
    leftBody1: "Wenn du einen Verein gründest, ein MVP am Wochenende testest oder einfach schnell los willst · nimm Canva, Looka oder einen KI-Generator. 0 – 50 €, morgen fertig, kein Stress.",
    leftBody2: "Ich sag dir das lieber bevor du buchst, als danach.",
    rightLabel: "aber wenn du eine marke aufbaust ·",
    rightH3: "dann siehst du den unterschied an jedem touchpoint.",
    marginNote: "und das sieht man sofort.",
    unterschiede: [
      { num: "01", punkt: "ki-logos sind lizenz-grauzone · gehören dir oft nicht.", detail: "Rechte unklar, Schrift-Lizenz fehlt, Druckerei findet keine Farbprofile. Das merkst du erst, wenn du's wirklich brauchst." },
      { num: "02", punkt: "template plus ki-logo sieht aus wie alle anderen.", detail: "Gleiches Raster, gleiches Modell. Der Unterschied zum Wettbewerb bleibt Zufall · und der Wettbewerb weiß das." },
      { num: "03", punkt: "ohne system zerfällt alles beim zweiten touchpoint.", detail: "Der Flyer matcht nicht die Website, die Website nicht den Insta-Post. Jedes Update heißt: von vorne." },
    ],
  },
  fr: {
    sectionLabel: "franchement",
    h2pre: "tu as ",
    h2italic: "vraiment",
    h2post: " besoin de moi ?",
    manchmalNicht: "parfois non. ↓",
    leftBody1: "Si tu lances une asbl, testes un MVP le week-end ou veux juste démarrer vite · prends Canva, Looka ou un générateur ia. 0 – 50 €, prêt demain, pas de stress.",
    leftBody2: "Je préfère te le dire avant que tu réserves, plutôt qu'après.",
    rightLabel: "mais si tu construis une marque ·",
    rightH3: "la différence se voit à chaque touchpoint.",
    marginNote: "et ça se voit tout de suite.",
    unterschiede: [
      { num: "01", punkt: "les logos ia sont zone grise de licence · souvent pas à toi.", detail: "Droits flous, licence de police absente, l'imprimeur ne trouve aucun profil couleur. Tu t'en aperçois quand tu en as vraiment besoin." },
      { num: "02", punkt: "template plus logo ia, ça ressemble à tout le monde.", detail: "Même grille, même modèle. La différence avec la concurrence reste un hasard · et la concurrence le sait." },
      { num: "03", punkt: "sans système, tout s'effondre au deuxième touchpoint.", detail: "Le flyer ne match pas le site, le site ne match pas le post insta. Chaque update veut dire : on recommence." },
    ],
  },
  en: {
    sectionLabel: "honestly",
    h2pre: "do you ",
    h2italic: "actually",
    h2post: " need me?",
    manchmalNicht: "sometimes not. ↓",
    leftBody1: "If you're starting a non-profit, testing a weekend MVP or just want to go fast · grab Canva, Looka or an ai generator. 0 – 50 €, done tomorrow, no stress.",
    leftBody2: "I'd rather tell you that before you book than after.",
    rightLabel: "but if you're building a brand ·",
    rightH3: "you'll see the difference at every touchpoint.",
    marginNote: "and you spot it instantly.",
    unterschiede: [
      { num: "01", punkt: "ai logos are a licensing grey zone · often not yours.", detail: "Rights unclear, font licence missing, the printer can't find any colour profiles. You only notice when you really need it." },
      { num: "02", punkt: "template plus ai logo looks like everyone else.", detail: "Same grid, same model. The difference from your competition stays a coincidence · and your competition knows it." },
      { num: "03", punkt: "without a system everything falls apart at the second touchpoint.", detail: "The flyer doesn't match the site, the site doesn't match the insta post. Every update means: start over." },
    ],
  },
};

export function BrandVsAlternatives({
  num = "06",
}: { num?: string } = {}) {
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
                  <div
                    key={u.num}
                    className="grid grid-cols-[28px_1fr] gap-3"
                  >
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
