import type { Locale } from "@/i18n/config";

/**
 * Home-FAQ daten · server-safe (KEIN "use client") damit page.tsx
 * die items fürs FAQPage-schema lesen kann · HomeFAQ.tsx rendert
 * die gleichen daten client-seitig.
 */

export type HomeFaqItem = { q: string; a: string };

export type HomeFaqDict = {
  label: string;
  headline: string;
  items: HomeFaqItem[];
};

export const HOME_FAQ: Record<Locale, HomeFaqDict> = {
  de: {
    label: "kurz beantwortet",
    headline: "bevor du fragst.",
    items: [
      {
        q: "was kostet eine website?",
        a: "das hängt vom umfang ab, und ich nenne dir eine zahl erst, wenn ich weiss, was du brauchst. ein kurzes gespräch reicht dafür · danach bekommst du einen festen preis, keine spanne.",
      },
      {
        q: "wie lange dauert's, bis die seite live ist?",
        a: "das hängt vom umfang ab. der größte faktor bist du · je schneller dein feedback, desto schneller der launch. eine belastbare zeitangabe bekommst du mit dem angebot, nicht vorher.",
      },
      {
        q: "warum kein wordpress oder baukasten?",
        a: "ich bau von null, mit eigenem cms. es gibt keine plugins, die veralten können, und keinen verfall über die jahre · und die seite gehört wirklich dir, mit quelldateien.",
      },
      {
        q: "ich hab schon eine website · kannst du die übernehmen?",
        a: "ja · die meisten meiner projekte sind genau das. ich zieh deine inhalte selbst von der alten seite, bau alles schneller und sauberer neu · und deine google-rankings bleiben (saubere 301-redirects). du musst mir vorab nicht mal was schicken.",
      },
    ],
  },
  fr: {
    label: "réponses courtes",
    headline: "avant que tu demandes.",
    items: [
      {
        q: "combien coûte un site web ?",
        a: "cela dépend de l'ampleur du projet, et je ne donne un chiffre qu'une fois que je sais ce qu'il te faut. une courte conversation suffit · ensuite tu reçois un prix fixe, pas une fourchette.",
      },
      {
        q: "combien de temps avant la mise en ligne ?",
        a: "cela dépend de l'ampleur. le plus grand facteur, c'est toi · plus ton feedback est rapide, plus vite c'est en ligne. une date fiable arrive avec l'offre, pas avant.",
      },
      {
        q: "pourquoi pas wordpress ou un builder ?",
        a: "je construis de zéro, avec un cms maison. il n'y a pas de plugins qui vieillissent, pas de dégradation au fil des ans · et le site t'appartient vraiment, fichiers sources inclus.",
      },
      {
        q: "j'ai déjà un site · tu peux le reprendre ?",
        a: "oui · la plupart de mes projets sont exactement ça. je récupère tes contenus moi-même depuis l'ancien site, je reconstruis tout plus rapide et plus propre · et tes positions google restent (redirections 301 propres). tu n'as même rien à m'envoyer d'avance.",
      },
    ],
  },
  en: {
    label: "quick answers",
    headline: "before you ask.",
    items: [
      {
        q: "what does a website cost?",
        a: "it depends on the scope, and i only name a number once i know what you need. a short conversation is enough · after that you get a fixed price, not a range.",
      },
      {
        q: "how long until the site is live?",
        a: "it depends on the scope. the biggest factor is you · the faster your feedback, the faster the launch. a reliable date comes with the offer, not before.",
      },
      {
        q: "why no wordpress or site builder?",
        a: "i build from scratch, with an in-house cms. there are no plugins that can go stale, and no decay over the years · and the site truly belongs to you, source files included.",
      },
      {
        q: "i already have a website · can you take it over?",
        a: "yes · most of my projects are exactly that. i pull your content myself from the old site, rebuild everything faster and cleaner · and your google rankings stay (clean 301 redirects). you don't even need to send me anything upfront.",
      },
    ],
  },
};

export function getHomeFaqItems(locale: Locale): HomeFaqItem[] {
  return HOME_FAQ[locale].items;
}
