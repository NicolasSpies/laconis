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
        a: "onepager ab 1.500 €, mehrseitig mit cms zwischen 2.800 und 4.500 €. ehrliche faustregeln statt paket-tabelle · die details stehen auf der preise-seite.",
      },
      {
        q: "wie lange dauert's, bis die seite live ist?",
        a: "onepager rund 2 wochen, mehrseitige projekte 3 bis 5. der größte faktor bist du · je schneller dein feedback, desto schneller der launch.",
      },
      {
        q: "warum kein wordpress oder baukasten?",
        a: "ich bau von null, mit eigenem cms. resultat: google-pagespeed 95+, keine plugin-hölle, kein performance-verfall über die jahre · und die seite gehört wirklich dir, mit quelldateien.",
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
        a: "onepager à partir de 1 500 €, multi-pages avec cms entre 2 800 et 4 500 €. des règles honnêtes plutôt qu'une grille · les détails sont sur la page prix.",
      },
      {
        q: "combien de temps avant la mise en ligne ?",
        a: "onepager environ 2 semaines, projets multi-pages 3 à 5. le plus grand facteur, c'est toi · plus ton feedback est rapide, plus vite c'est en ligne.",
      },
      {
        q: "pourquoi pas wordpress ou un builder ?",
        a: "je construis de zéro, avec un cms maison. résultat : pagespeed google 95+, pas d'enfer de plugins, pas de dégradation au fil des ans · et le site t'appartient vraiment, fichiers sources inclus.",
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
        a: "onepager from €1,500, multi-page with cms between €2,800 and €4,500. honest rules of thumb instead of a package grid · details on the pricing page.",
      },
      {
        q: "how long until the site is live?",
        a: "onepager about 2 weeks, multi-page projects 3 to 5. the biggest factor is you · the faster your feedback, the faster the launch.",
      },
      {
        q: "why no wordpress or site builder?",
        a: "i build from scratch, with an in-house cms. result: google pagespeed 95+, no plugin hell, no performance decay over the years · and the site truly belongs to you, source files included.",
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
