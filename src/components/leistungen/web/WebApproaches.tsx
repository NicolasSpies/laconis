"use client";

import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * WebApproaches · der "neu von null"-pfad auf /leistungen/web.
 *
 * früher ein neu/redesign-toggle. der redesign-teil lebt jetzt als
 * eigener, sichtbarer ablauf in WebUebernahme (5 schritte) · darum hier
 * nur noch der neubau-weg: weißes blatt, vier schritte.
 */

type Card = { num: string; titel: string; text: string };

type Dict = {
  h2: string;
  intro: string;
  schritt: string;
  cards: Card[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    h2: "neue seite? von null, ganz für dich.",
    intro: "Weißes Blatt · keine alten URLs, kein Content aus 2014, keine heilige Kuh, die man umschiffen muss. Freier Kopf, dafür mehr Entscheidungen am Anfang · den Kompass halt ich.",
    schritt: "schritt",
    cards: [
      { num: "01", titel: "briefing von null", text: "Ich kläre mit dir, wer du bist, was du brauchst, wer dein Zielpublikum ist. Ohne Altbestand, ohne ‚das war schon immer so'." },
      { num: "02", titel: "inhalte gemeinsam", text: "Texte und Bilder wachsen im Prozess · wenn du nicht gern schreibst, setze ich mich mit hin. Fotografen-Empfehlung gibt's dazu, wenn's nötig ist." },
      { num: "03", titel: "design ohne ballast", text: "Keine alte Seite, keine alte Struktur, keine Kompromisse wegen Legacy. System passt zu dir, nicht zur Vorlage." },
      { num: "04", titel: "2 bis 8 wochen", text: "Dauer ist kundenabhängig · Onepager schneller, Multipager mit CMS länger. Ich sag dir beim Kickoff eine Kalenderwoche, kein Quartal." },
    ],
  },
  fr: {
    h2: "nouveau site ? de zéro, rien que pour toi.",
    intro: "Page blanche · pas d'anciennes URLs, pas de contenu de 2014, pas de vache sacrée à contourner. Tête libre, mais plus de décisions au début · je tiens la boussole.",
    schritt: "étape",
    cards: [
      { num: "01", titel: "brief depuis zéro", text: "Je clarifie avec toi qui tu es, ce dont tu as besoin, qui est ton public. Sans héritage, sans 'ça a toujours été comme ça'." },
      { num: "02", titel: "contenus à deux", text: "Textes et images grandissent dans le processus · si t'aimes pas écrire, je m'assois avec toi. Recommandation de photographe en bonus si nécessaire." },
      { num: "03", titel: "design sans ballast", text: "Pas d'ancien site, pas d'ancienne structure, pas de compromis pour cause de legacy. Le système te va, pas un template." },
      { num: "04", titel: "2 à 8 semaines", text: "La durée dépend du client · onepage plus rapide, multi-pages avec CMS plus long. Au kickoff je te donne une semaine calendaire, pas un trimestre." },
    ],
  },
  en: {
    h2: "new site? from scratch, all yours.",
    intro: "Blank page · no old URLs, no content from 2014, no sacred cow to navigate around. Clear head, but more decisions up front · i'll hold the compass.",
    schritt: "step",
    cards: [
      { num: "01", titel: "briefing from zero", text: "I work out with you who you are, what you need, who your audience is. No legacy baggage, no 'it's always been this way'." },
      { num: "02", titel: "content together", text: "Text and images grow through the process · if you don't like writing, i sit with you. Photographer recommendation included if needed." },
      { num: "03", titel: "design without ballast", text: "No old site, no old structure, no compromises because of legacy. The system fits you, not a template." },
      { num: "04", titel: "2 to 8 weeks", text: "Duration depends on the client · onepager faster, multipager with CMS longer. At kickoff i tell you a calendar week, not a quarter." },
    ],
  },
};

export function WebApproaches() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-site">
        <h2 className="heading-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-offwhite leading-[1.05] max-w-[20ch]">
          {t.h2}
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/70">
          {t.intro}
        </p>

        {/* 4 schritte · clean paper-card-grid */}
        <div className="mt-10 grid md:grid-cols-2 gap-4 md:gap-5">
          {t.cards.map((c) => (
            <article
              key={c.num}
              className="rounded-2xl bg-[#f2f2f2] border border-[#0a0a0a]/[0.07] p-7 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display font-black text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a]">
                  {c.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                  {t.schritt}
                </span>
              </div>
              <h3 className="mt-4 text-[clamp(1.2rem,2.2vw,1.5rem)] font-black text-[#0a0a0a] leading-[1.15] tracking-[-0.02em] lowercase">
                {c.titel}
              </h3>
              <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-[#0a0a0a]/75">
                {c.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
