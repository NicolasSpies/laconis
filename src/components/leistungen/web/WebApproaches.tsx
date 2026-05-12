"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Card = { num: string; titel: string; text: string };

type Dict = {
  sectionLabel: string;
  srH2: string;
  introNeu: string;
  introRedesign: string;
  handNote: string;
  tabsLabel: string;
  tabNeu: string;
  tabRedesign: string;
  schritt: string;
  neu: Card[];
  redesign: Card[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "zwei wege",
    srH2: "zwei wege. gleiches handwerk.",
    introNeu: "Weißes Blatt · keine alten URLs, kein Content aus 2014, keine heilige Kuh, die man umschiffen muss. Freier Kopf, dafür mehr Entscheidungen am Anfang · den Kompass halt ich.",
    introRedesign: "Das meiste meiner Arbeit ist Redesign, nicht Neubau · eine WordPress-Seite von 2016, ein Baukasten, der jedes Jahr 240 € frisst, eine Wix-Seite, die keiner mehr aufmacht.",
    handNote: "und bei dir?",
    tabsLabel: "projekttyp",
    tabNeu: "neue seite",
    tabRedesign: "redesign",
    schritt: "schritt",
    neu: [
      { num: "01", titel: "briefing von null", text: "Ich kläre mit dir, wer du bist, was du brauchst, wer dein Zielpublikum ist. Ohne Altbestand, ohne ‚das war schon immer so'." },
      { num: "02", titel: "inhalte gemeinsam", text: "Texte und Bilder wachsen im Prozess · wenn du nicht gern schreibst, setze ich mich mit hin. Fotografen-Empfehlung gibt's dazu, wenn's nötig ist." },
      { num: "03", titel: "design ohne ballast", text: "Keine alte Seite, keine alte Struktur, keine Kompromisse wegen Legacy. System passt zu dir, nicht zur Vorlage." },
      { num: "04", titel: "2 bis 8 wochen", text: "Dauer ist kundenabhängig · Onepager schneller, Multipager mit CMS länger. Ich sag dir beim Kickoff eine Kalenderwoche, kein Quartal." },
    ],
    redesign: [
      { num: "01", titel: "inhalte behalten", text: "Deine Texte, deine Bilder, deine Historie. Ich übernehme, was du behalten willst, räume auf, was raus soll, du fängst nicht bei null an." },
      { num: "02", titel: "google verliert dich nicht", text: "Jede alte URL bekommt einen sauberen 301-Redirect. Rankings bleiben stabil, verlinkende Seiten landen weiter bei dir." },
      { num: "03", titel: "kein ausfall", text: "Deine alte Seite bleibt online, bis die neue live ist. Ich schalte erst um, wenn du den Knopf drückst." },
      { num: "04", titel: "probephase auf test-domain", text: "Du siehst das Ergebnis vorher auf einer privaten URL. Kommentieren, korrigieren, umbauen · alles, bevor ein Besucher etwas merkt." },
    ],
  },
  fr: {
    sectionLabel: "deux voies",
    srH2: "deux voies. même artisanat.",
    introNeu: "Page blanche · pas d'anciennes URLs, pas de contenu de 2014, pas de vache sacrée à contourner. Tête libre, mais plus de décisions au début · je tiens la boussole.",
    introRedesign: "La majorité de mon boulot c'est du redesign, pas du neuf · un WordPress de 2016, un constructeur qui te bouffe 240 € par an, un Wix que plus personne n'ouvre.",
    handNote: "et chez toi ?",
    tabsLabel: "type de projet",
    tabNeu: "nouveau site",
    tabRedesign: "redesign",
    schritt: "étape",
    neu: [
      { num: "01", titel: "brief depuis zéro", text: "Je clarifie avec toi qui tu es, ce dont tu as besoin, qui est ton public. Sans héritage, sans 'ça a toujours été comme ça'." },
      { num: "02", titel: "contenus à deux", text: "Textes et images grandissent dans le processus · si t'aimes pas écrire, je m'assois avec toi. Recommandation de photographe en bonus si nécessaire." },
      { num: "03", titel: "design sans ballast", text: "Pas d'ancien site, pas d'ancienne structure, pas de compromis pour cause de legacy. Le système te va, pas un template." },
      { num: "04", titel: "2 à 8 semaines", text: "La durée dépend du client · onepage plus rapide, multi-pages avec CMS plus long. Au kickoff je te donne une semaine calendaire, pas un trimestre." },
    ],
    redesign: [
      { num: "01", titel: "garder les contenus", text: "Tes textes, tes images, ton historique. Je reprends ce que tu veux garder, je range ce qui doit dégager, tu ne pars pas de zéro." },
      { num: "02", titel: "google ne te perd pas", text: "Chaque ancienne URL a une redirection 301 propre. Les positions restent stables, les sites qui pointent vers toi continuent à arriver." },
      { num: "03", titel: "pas de coupure", text: "Ton ancien site reste en ligne jusqu'à ce que le nouveau soit live. Je bascule seulement quand tu appuies sur le bouton." },
      { num: "04", titel: "phase de test sur domaine privé", text: "Tu vois le résultat à l'avance sur une URL privée. Commenter, corriger, retoucher · tout, avant qu'un visiteur ne remarque quoi que ce soit." },
    ],
  },
  en: {
    sectionLabel: "two ways",
    srH2: "two ways. same craft.",
    introNeu: "Blank page · no old URLs, no content from 2014, no sacred cow to navigate around. Clear head, but more decisions up front · i'll hold the compass.",
    introRedesign: "Most of my work is redesign, not greenfield · a WordPress site from 2016, a builder eating 240 € a year, a Wix site nobody opens anymore.",
    handNote: "and you?",
    tabsLabel: "project type",
    tabNeu: "new site",
    tabRedesign: "redesign",
    schritt: "step",
    neu: [
      { num: "01", titel: "briefing from zero", text: "I work out with you who you are, what you need, who your audience is. No legacy baggage, no 'it's always been this way'." },
      { num: "02", titel: "content together", text: "Text and images grow through the process · if you don't like writing, i sit with you. Photographer recommendation included if needed." },
      { num: "03", titel: "design without ballast", text: "No old site, no old structure, no compromises because of legacy. The system fits you, not a template." },
      { num: "04", titel: "2 to 8 weeks", text: "Duration depends on the client · onepager faster, multipager with CMS longer. At kickoff i tell you a calendar week, not a quarter." },
    ],
    redesign: [
      { num: "01", titel: "keep the content", text: "Your text, your images, your history. I keep what you want to keep, clean up what should go, you don't start from zero." },
      { num: "02", titel: "google doesn't lose you", text: "Every old URL gets a clean 301 redirect. Rankings stay stable, sites linking to you keep landing on you." },
      { num: "03", titel: "no downtime", text: "Your old site stays live until the new one's up. I only switch when you press the button." },
      { num: "04", titel: "trial phase on staging domain", text: "You see the result beforehand on a private URL. Comment, correct, rework · all before any visitor notices a thing." },
    ],
  },
};

type Tab = "neu" | "redesign";

const CARD_ROTATIONS = ["-0.8deg", "0.5deg", "-0.5deg", "0.8deg"];

export function WebApproaches({ num = "02" }: { num?: string } = {}) {
  const [tab, setTab] = useState<Tab>("neu");
  const locale = useLocale();
  const t = pick(DICT, locale);
  const cards = tab === "neu" ? t.neu : t.redesign;

  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        <div className="border-t border-ink/10 pt-10">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="sr-only">{t.srH2}</h2>
          <p className="mt-4 max-w-[620px] text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
            {tab === "neu" ? t.introNeu : t.introRedesign}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <span className="font-hand text-[18px] md:text-[20px] text-offwhite/55 -rotate-1 leading-none shrink-0 hidden md:inline-block">
            {t.handNote}
          </span>
          <div
            role="tablist"
            aria-label={t.tabsLabel}
            className="flex gap-1 border-b border-ink/10"
          >
            {(["neu", "redesign"] as const).map((tabKey) => {
              const isActive = tab === tabKey;
              const label = tabKey === "redesign" ? t.tabRedesign : t.tabNeu;
              return (
                <button
                  key={tabKey}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setTab(tabKey)}
                  className={[
                    "tactile-press relative inline-flex items-center px-4 py-3 font-mono text-[12px] uppercase tracking-mono",
                    isActive
                      ? "text-accent-ink"
                      : "text-offwhite/45 hover:text-offwhite/85",
                  ].join(" ")}
                >
                  {label}
                  <span
                    aria-hidden
                    className={[
                      "absolute left-0 right-0 -bottom-px h-[2px] transition-transform origin-center",
                      isActive ? "bg-lime scale-x-100" : "bg-lime scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={tab}
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-300"
        >
          {cards.map((c, i) => (
            <div key={c.num} className="relative group">
              <article
                className="liquid-glass-dark rounded-xl p-6 flex flex-col gap-3 transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50 h-full"
                style={{ transform: `rotate(${CARD_ROTATIONS[i] ?? "0deg"})` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  {t.schritt} · {c.num}
                </span>
                <h3 className="heading-sans text-[16px] text-offwhite leading-tight">
                  {c.titel}
                </h3>
                <p className="text-[13px] leading-relaxed text-offwhite/75">
                  {c.text}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
