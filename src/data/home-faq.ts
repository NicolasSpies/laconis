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
        a: "onepager ab 1.500 €, mehrseitig mit cms zwischen 2.800 und 4.500 €, web + branding zusammen ab 3.500 €. ehrliche faustregeln statt paket-tabelle · die details stehen auf der preise-seite.",
      },
      {
        q: "wie lange dauert's, bis die seite live ist?",
        a: "onepager rund 2 wochen, mehrseitige projekte 3 bis 5, web + branding 4 bis 8. der größte faktor bist du · je schneller dein feedback, desto schneller der launch.",
      },
      {
        q: "warum kein wordpress oder baukasten?",
        a: "ich bau von null, mit eigenem cms. resultat: google-pagespeed 95+, keine plugin-hölle, kein performance-verfall über die jahre · und die seite gehört wirklich dir, mit quelldateien.",
      },
      {
        q: "webdesign und branding aus einer hand · geht das?",
        a: "genau das ist der punkt. logo, farbwelt, website · ein kopf, eine linie. kein ping-pong zwischen grafiker und webdesigner, kein stille-post-verlust dazwischen.",
      },
    ],
  },
  fr: {
    label: "réponses courtes",
    headline: "avant que tu demandes.",
    items: [
      {
        q: "combien coûte un site web ?",
        a: "onepager à partir de 1 500 €, multi-pages avec cms entre 2 800 et 4 500 €, web + branding ensemble à partir de 3 500 €. des règles honnêtes plutôt qu'une grille · les détails sont sur la page prix.",
      },
      {
        q: "combien de temps avant la mise en ligne ?",
        a: "onepager environ 2 semaines, projets multi-pages 3 à 5, web + branding 4 à 8. le plus grand facteur, c'est toi · plus ton feedback est rapide, plus vite c'est en ligne.",
      },
      {
        q: "pourquoi pas wordpress ou un builder ?",
        a: "je construis de zéro, avec un cms maison. résultat : pagespeed google 95+, pas d'enfer de plugins, pas de dégradation au fil des ans · et le site t'appartient vraiment, fichiers sources inclus.",
      },
      {
        q: "webdesign et branding d'une seule main · possible ?",
        a: "c'est exactement le point. logo, couleurs, site web · une tête, une ligne. pas de ping-pong entre graphiste et webdesigner, pas de téléphone arabe entre les deux.",
      },
    ],
  },
  en: {
    label: "quick answers",
    headline: "before you ask.",
    items: [
      {
        q: "what does a website cost?",
        a: "onepager from €1,500, multi-page with cms between €2,800 and €4,500, web + branding together from €3,500. honest rules of thumb instead of a package grid · details on the pricing page.",
      },
      {
        q: "how long until the site is live?",
        a: "onepager about 2 weeks, multi-page projects 3 to 5, web + branding 4 to 8. the biggest factor is you · the faster your feedback, the faster the launch.",
      },
      {
        q: "why no wordpress or site builder?",
        a: "i build from scratch, with an in-house cms. result: google pagespeed 95+, no plugin hell, no performance decay over the years · and the site truly belongs to you, source files included.",
      },
      {
        q: "webdesign and branding from one hand · possible?",
        a: "that's exactly the point. logo, colours, website · one head, one line. no ping-pong between graphic designer and web designer, nothing lost in between.",
      },
    ],
  },
};

export function getHomeFaqItems(locale: Locale): HomeFaqItem[] {
  return HOME_FAQ[locale].items;
}
