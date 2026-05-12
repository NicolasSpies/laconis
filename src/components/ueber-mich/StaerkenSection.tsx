"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Staerke = {
  num: string;
  titel: string;
  kicker: string;
  text: string;
  beweis: string;
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2italic: string;
  h2post: string;
  intro: string;
  staerken: Staerke[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was mich ausmacht",
    h2pre: "vier dinge, auf die ich ",
    h2italic: "stehe",
    h2post: ".",
    intro: "Nicht „Werte\" im Sinne von Hochglanz-Pitchdeck. Nur das, worauf ich mich festlegen lasse · und wofür du mich gern kritisieren darfst, wenn ich's verpatze.",
    staerken: [
      { num: "01", titel: "alles aus einem kopf", kicker: "Kein Ping-Pong zwischen Designer und Dev.", text: "Ich entwerfe, was ich code, und code, was ich entwerfe. Kein Handoff, keine verlorene Übersetzung, keine „das geht technisch nicht\"-Mails. Wenn ich ein Detail entwerfe, weiß ich schon während des Zeichnens, wie es später im Browser aussieht.", beweis: "ein ansprechpartner · keine agentur-hierarchie." },
      { num: "02", titel: "eigenes system, keine templates", kicker: "Jede Zeile habe ich selbst geschrieben.", text: "Ich nutze keine Baukästen, keine fertigen Themes, keine KI-generierten Logos. Jedes Projekt fängt mit Fragen an · was machst du, für wen, warum · und endet mit einem System, das zu genau dir passt. Das dauert länger und kostet mehr. Macht die Sache aber robust.", beweis: "recherche vor design · system vor einzelteilen." },
      { num: "03", titel: "bleibt nach dem launch", kicker: "Ich tauche nicht ab, wenn die Rechnung bezahlt ist.", text: "Nach der Übergabe beginnt die eigentliche Beziehung. Fragen, Nachträge, kleine Änderungen, neue Ideen · ich bin erreichbar, die ganze Zeit, über Jahre. Kein Ticketsystem, kein Support-Hotline-Robot. Eine Mail, eine Antwort.", beweis: "direkter draht · auch 2 jahre später." },
      { num: "04", titel: "in 3 jahren redest du mit demselben", kicker: "„Ohh, der Kollege, der das damals gemacht hat, arbeitet leider nicht mehr hier.\" · Gibt's bei mir nicht.", text: "Klassische Szene in meiner Branche: Du rufst zwei Jahre nach Launch an, willst eine Kleinigkeit ändern · und kriegst „Der Kollege arbeitet hier nicht mehr, aber jemand Neues schaut sich das mal an\". Oder der Laden heißt inzwischen anders. Oder den Laden gibt's nicht mehr. Bei mir: eine Person, ein Name, kein Personalroulette. Ich bin laconis. Und ich habe nicht vor, das nächstes Jahr umzubenennen, an jemanden zu übergeben oder den Laden dichtzumachen, weil der Geschäftsführer sich umorientiert. Solo · mit Absicht.", beweis: "keine fluktuation · kein rebrand · kein weg." },
    ],
  },
  fr: {
    sectionLabel: "ce qui me définit",
    h2pre: "quatre choses qui me ",
    h2italic: "branchent",
    h2post: ".",
    intro: "Pas des « valeurs » au sens pitch-deck papier glacé. Juste ce sur quoi je veux bien m'engager · et pour quoi t'as le droit de m'engueuler si je foire.",
    staerken: [
      { num: "01", titel: "tout dans une seule tête", kicker: "Pas de ping-pong entre designer et dev.", text: "Je dessine ce que je code, et je code ce que je dessine. Pas de handoff, pas de traduction perdue, pas de mail « ça passe pas techniquement ». Quand je conçois un détail, je sais déjà en le dessinant à quoi ça ressemblera dans le navigateur.", beweis: "un interlocuteur · pas de hiérarchie d'agence." },
      { num: "02", titel: "système propre, pas de templates", kicker: "Chaque ligne, je l'ai écrite moi-même.", text: "Pas de constructeurs, pas de thèmes tout faits, pas de logos ia. Chaque projet commence par des questions · tu fais quoi, pour qui, pourquoi · et finit par un système taillé pour toi. C'est plus long et plus cher. Mais ça tient.", beweis: "recherche avant design · système avant pièces." },
      { num: "03", titel: "je reste après le lancement", kicker: "Je ne disparais pas une fois la facture payée.", text: "Après la livraison commence la vraie relation. Questions, ajouts, petits changements, nouvelles idées · je suis joignable, tout le temps, sur des années. Pas de ticketing, pas de hotline-robot. Un mail, une réponse.", beweis: "ligne directe · même 2 ans plus tard." },
      { num: "04", titel: "dans 3 ans tu parles à la même personne", kicker: "« Ah, le collègue qui avait fait ça à l'époque ne travaille plus ici. » · Ça n'existe pas chez moi.", text: "Scène classique dans mon métier : tu appelles deux ans après le lancement pour un petit changement · et tu te tapes « Le collègue n'est plus chez nous, mais quelqu'un de nouveau va regarder ». Ou la boîte a changé de nom. Ou la boîte n'existe plus. Chez moi : une personne, un nom, pas de roulette du personnel. Je suis laconis. Et j'ai pas prévu de rebrander l'année prochaine, de céder à quelqu'un d'autre ou de fermer parce que le gérant se réoriente. Solo · de manière intentionnelle.", beweis: "pas de turnover · pas de rebrand · pas parti." },
    ],
  },
  en: {
    sectionLabel: "what i'm about",
    h2pre: "four things i ",
    h2italic: "stand on",
    h2post: ".",
    intro: "Not \"values\" in the glossy pitch-deck sense. Just what i'm willing to commit to · and what you're welcome to call me out on if i mess it up.",
    staerken: [
      { num: "01", titel: "everything from one head", kicker: "No ping-pong between designer and dev.", text: "I design what i code, and code what i design. No handoff, no lost translation, no \"sorry, can't do that technically\" emails. When i design a detail, i already know while drawing it how it'll look in the browser.", beweis: "one point of contact · no agency hierarchy." },
      { num: "02", titel: "own system, no templates", kicker: "Every line, i wrote myself.", text: "No builders, no ready-made themes, no ai-generated logos. Every project starts with questions · what do you do, for whom, why · and ends with a system tailored to you. That takes longer and costs more. But makes it solid.", beweis: "research before design · system before parts." },
      { num: "03", titel: "still here after launch", kicker: "I don't disappear once the invoice is paid.", text: "After handover the actual relationship starts. Questions, follow-ups, small changes, new ideas · i'm reachable, all the time, over years. No ticket system, no hotline-bot. One mail, one answer.", beweis: "direct line · even 2 years later." },
      { num: "04", titel: "in 3 years you still talk to me", kicker: "\"Ohh, the colleague who did that back then unfortunately doesn't work here anymore.\" · Doesn't happen with me.", text: "Classic scene in my industry: you call two years after launch for a small change · and get \"that colleague is no longer with us, but someone new will take a look\". Or the place is now called something else. Or it doesn't exist anymore. With me: one person, one name, no staff roulette. I am laconis. And i have no plans to rebrand next year, hand it off to someone else, or close shop because the MD is changing careers. Solo · on purpose.", beweis: "no turnover · no rebrand · not gone." },
    ],
  },
};

export function StaerkenSection() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-28">
      <div className="container-site">
        <SectionLabel num="07">{t.sectionLabel}</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05] max-w-[820px]">
          {t.h2pre}
          <span className="italic font-serif text-accent-ink">{t.h2italic}</span>
          {t.h2post}
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
          {t.intro}
        </p>

        <div className="mt-16 space-y-5">
          {t.staerken.map((s) => (
            <article
              key={s.num}
              className="liquid-glass grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 rounded-2xl p-7 md:p-10"
            >
              <div className="flex md:flex-col gap-3 md:gap-1 items-baseline md:items-start">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  · {s.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 md:mt-auto">
                  {s.beweis}
                </span>
              </div>

              <div>
                <h3 className="heading-sans text-[22px] md:text-[26px] text-offwhite leading-tight">
                  {s.titel}
                </h3>
                <p className="mt-2 text-[14px] italic text-offwhite/55">
                  {s.kicker}
                </p>
                <p className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed text-offwhite/75">
                  {s.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
