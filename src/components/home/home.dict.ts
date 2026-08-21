import type { Locale } from "@/i18n/config";

/**
 * Startseiten-Copy.
 *
 * die seite hat sieben flaechen und trotzdem unter 120 woerter. das
 * ist keine sparsamkeit, das ist die form: ein portfolio zeigt, ein
 * produkt erklaert.
 *
 * die kammer traegt den EINEN satz der seite · das vorbild
 * schultzschultz hat auf der ganzen startseite genau einen, und der
 * steht gross und allein auf einer hellen flaeche.
 *
 * das band traegt eine echte nachricht statt einer leistungsliste ·
 * bewusst ohne monat, damit es nicht tot ist, sobald jemand vergisst
 * es zu pflegen.
 *
 * KEINE zahlen, keine kennzahlen, keine region. plugin-zaehler und
 * pagespeed-punkte sind entwickler-argumente, keine kunden-argumente.
 */

export type HomeT = {
  kicker: string;
  /** zeilen des titels · umbruch gesetzt, nicht geraten */
  h1: string[];
  akzent: string;
  zeile: string;
  hinweis: string;

  /** der eine satz auf der hellen flaeche */
  kammer: { satz: string; betont: string };

  /** ueberschrift ueber den arbeiten · ein wort reicht */
  arbeitenH2: string;

  /** wortband · eine nachricht, keine leistungsliste */
  band: string[];

  cms: { h2a: string; h2b: string; zeile: string; key: string };
  schluss: { satz: string; key: string; oder: string };

  fussImpressum: string;
  fussDatenschutz: string;
};

export const HOME: Record<Locale, HomeT> = {
  de: {
    kicker: "webdesign · entwicklung · eigenes cms",
    h1: ["websites, die man"],
    akzent: "anfassen will.",
    zeile:
      "Webdesign und Entwicklung aus einer Hand. Ich baue Websites von null · mit eigenem CMS, ohne Template und ohne Plugin-Stapel. Bestehende Seiten ziehen mit um, Inhalte und Rankings bleiben.",
    hinweis: "↓ die arbeit",

    kammer: {
      satz: "Die meisten Websites sind zusammengesteckt.",
      betont: "Deine wird gebaut.",
    },

    arbeitenH2: "arbeiten",

    band: ["nehme aktuell projekte an", "schreib mir"],

    cms: {
      h2a: "gebaut mit",
      h2b: "contentcore.",
      zeile:
        "Mein eigenes CMS. Du änderst alles selbst, es hängt kein Abo dran, und es gehört dir mit der Seite.",
      key: "was drin ist →",
    },

    schluss: {
      satz: "reden wir.",
      key: "schreib mir",
      oder: "oder direkt an",
    },

    fussImpressum: "impressum",
    fussDatenschutz: "datenschutz",
  },

  fr: {
    kicker: "webdesign · développement · cms maison",
    h1: ["des sites qu'on"],
    akzent: "veut toucher.",
    zeile:
      "Webdesign et développement d'une seule main. Je construis des sites de zéro · avec mon propre CMS, sans template et sans pile de plugins. Ton site existant déménage avec, contenus et référencement restent.",
    hinweis: "↓ le travail",

    kammer: {
      satz: "La plupart des sites sont assemblés.",
      betont: "Le tien sera construit.",
    },

    arbeitenH2: "travaux",

    band: ["je prends des projets en ce moment", "écris-moi"],

    cms: {
      h2a: "construit avec",
      h2b: "contentcore.",
      zeile:
        "Mon propre CMS. Tu modifies tout toi-même, aucun abonnement, et il t'appartient avec le site.",
      key: "ce qu'il y a dedans →",
    },

    schluss: {
      satz: "parlons-en.",
      key: "écris-moi",
      oder: "ou directement à",
    },

    fussImpressum: "mentions légales",
    fussDatenschutz: "confidentialité",
  },

  en: {
    kicker: "webdesign · development · in-house cms",
    h1: ["websites you"],
    akzent: "want to touch.",
    zeile:
      "Web design and development from one hand. I build websites from scratch · with my own CMS, no template and no plugin stack. Existing sites move across, content and rankings stay.",
    hinweis: "↓ the work",

    kammer: {
      satz: "Most websites are assembled.",
      betont: "Yours gets built.",
    },

    arbeitenH2: "work",

    band: ["taking on projects right now", "write to me"],

    cms: {
      h2a: "built with",
      h2b: "contentcore.",
      zeile:
        "My own CMS. You change everything yourself, no subscription attached, and it's yours with the site.",
      key: "what's inside →",
    },

    schluss: {
      satz: "let's talk.",
      key: "write to me",
      oder: "or straight to",
    },

    fussImpressum: "legal notice",
    fussDatenschutz: "privacy",
  },
};
