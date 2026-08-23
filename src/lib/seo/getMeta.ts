import type { Metadata } from "next";
import { ROUTES, getAlternates, LOCALES, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

/**
 * Zentraler SEO-metadata-provider · per-locale.
 *
 * Jede page kennt nur den canonical DE-path (z.b. "/preise") · der locale
 * wird intern via `getLocale()` aus dem middleware-header gezogen.
 *
 * Pattern pro page:
 * ```ts
 * export async function generateMetadata(): Promise<Metadata> {
 *   return getMeta("/preise");
 * }
 * ```
 *
 * Resultat: Google + AI-Search sehen pro URL die richtige Sprache:
 *  - /preise        → DE title + description
 *  - /fr/prix       → FR title + description
 *  - /en/pricing    → EN title + description
 */

type MetaEntry = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article" | "profile";
  noindex?: boolean;
  nofollow?: boolean;
};

type MetaByLocale = Partial<Record<Locale, MetaEntry>> & { de: MetaEntry };

const OG_LOCALE: Record<Locale, string> = {
  de: "de_BE",
  fr: "fr_BE",
  en: "en_US",
};

/**
 * canonical-path → per-locale meta.
 * DE ist pflicht, FR + EN sind optional (fallback auf DE).
 */
const STATIC_MAP: Record<string, MetaByLocale> = {
  "/": {
    /* title keyword-first (junge domain braucht das signal) ·
       der brand-claim lebt im ogTitle/ogDescription weiter */
    de: {
      title: "lacønis · webdesign studio ostbelgien",
      description: "Webdesigner & Web-Entwickler in Ostbelgien · Websites von null gebaut, mit eigenem CMS statt Plugin-Stapel. Übernimmt auch bestehende Seiten · Inhalte bleiben, alles wird schneller. Dreisprachig DE/FR/EN.",
      ogTitle: "lacønis · webdesign studio ostbelgien",
      ogDescription: "webdesign studio · ostbelgien · handgemacht",
    },
    fr: {
      title: "lacønis · studio webdesign · est de la belgique",
      description: "Webdesigner & développeur web dans les Cantons de l'Est · sites construits de zéro, avec un CMS maison au lieu d'une pile de plugins. Reprend aussi ton site existant · contenus conservés, tout devient plus rapide. Trilingue DE/FR/EN.",
      ogTitle: "lacønis · design avec opinion · web avec âme",
      ogDescription: "studio webdesign · cantons de l'est · fait main",
    },
    en: {
      title: "lacønis · webdesign studio east belgium",
      description: "Web designer & developer in East Belgium · websites built from scratch, with an in-house CMS instead of a plugin stack. Existing sites taken over too · content stays, everything gets faster. Trilingual DE/FR/EN.",
      ogTitle: "lacønis · design with opinion · web with soul",
      ogDescription: "webdesign studio · east belgium · handmade",
    },
  },
  /* STUDIO · traegt seit 2026-08 die frueheren seiten leistung,
     preise und ueber-mich. drei indexierte URLs werden zu einer,
     deshalb muss diese beschreibung die begriffe aller drei tragen.
     die konkreten preise aus der alten /preise-beschreibung sind
     bewusst RAUS · Nicolas hat entschieden, dass kein preis mehr
     genannt wird, und eine zahl im suchergebnis waere dann ein
     versprechen, das die seite nicht mehr einloest. */
  "/studio": {
    de: {
      title: "studio · websites von null gebaut",
      description:
        "Nicolas Spies · Webdesigner und Entwickler. Websites von null gebaut, kein Template, kein WordPress-Limit. Eigenes CMS zum Selberpflegen, bestehende Seiten werden übernommen. Ostbelgien, dreisprachig.",
      ogTitle: "studio · lacønis",
      ogDescription:
        "von null gebaut · eigenes cms · übernahme bestehender seiten · eine person, kein team.",
    },
    fr: {
      title: "studio · des sites construits de zéro",
      description:
        "Nicolas Spies · webdesigner et développeur. Sites construits de zéro, sans template, sans limite WordPress. CMS maison à gérer soi-même, reprise de sites existants. Cantons de l'Est, trilingue.",
      ogTitle: "studio · lacønis",
      ogDescription:
        "construit de zéro · cms maison · reprise de sites existants · une personne, pas une équipe.",
    },
    en: {
      title: "studio · websites built from scratch",
      description:
        "Nicolas Spies · web designer and developer. Websites built from scratch, no template, no WordPress ceiling. In-house CMS you maintain yourself, existing sites taken over. East Belgium, trilingual.",
      ogTitle: "studio · lacønis",
      ogDescription:
        "built from scratch · in-house cms · existing sites taken over · one person, not a team.",
    },
  },
  "/arbeiten": {
    de: {
      title: "arbeiten",
      description: "was ich selbst gebaut habe · live beim kunden und als konzept-studie. was nicht live ist, steht auch so da. webdesign aus ostbelgien.",
      ogTitle: "arbeiten · lacønis",
      ogDescription: "was ich selbst gebaut habe · ehrlich ausgeschildert.",
    },
    fr: {
      title: "travaux",
      description: "ce que j'ai construit moi-même · en ligne chez le client et en étude concept. ce qui n'est pas en ligne est marqué comme tel. webdesign des cantons de l'est.",
      ogTitle: "travaux · lacønis",
      ogDescription: "ce que j'ai construit moi-même · marqué honnêtement.",
    },
    en: {
      title: "work",
      description: "what I built myself · live at the client and as concept study. what is not live says so. webdesign from east belgium.",
      ogTitle: "work · lacønis",
      ogDescription: "what I built myself · honestly labelled.",
    },
  },
  "/kontakt": {
    de: {
      title: "kontakt",
      description: "projekt besprechen · direkt mit mir. e-mail, call buchen, oder kurz das projekt-formular ausfüllen.",
      ogTitle: "kontakt · lacønis",
      ogDescription: "projekt besprechen · direkt mit mir.",
    },
    fr: {
      title: "contact",
      description: "discuter du projet · e-mail, appel, ou remplis brièvement le formulaire projet.",
      ogTitle: "contact · lacønis",
      ogDescription: "discuter du projet · directement avec moi.",
    },
    en: {
      title: "contact",
      description: "discuss the project · email, call, or briefly fill out the project form.",
      ogTitle: "contact · lacønis",
      ogDescription: "discuss the project · straight with me.",
    },
  },
  "/impressum": {
    de: {
      title: "impressum",
      description: "rechtliche angaben zu lacønis · nicolas spies.",
      ogTitle: "impressum · lacønis",
      ogDescription: "rechtliche angaben zu lacønis.",
      nofollow: true,
    },
    fr: {
      title: "mentions légales",
      description: "informations légales de lacønis · nicolas spies.",
      ogTitle: "mentions légales · lacønis",
      ogDescription: "informations légales de lacønis.",
      nofollow: true,
    },
    en: {
      title: "legal notice",
      description: "legal information for lacønis · nicolas spies.",
      ogTitle: "legal notice · lacønis",
      ogDescription: "legal information for lacønis.",
      nofollow: true,
    },
  },
  "/datenschutz": {
    de: {
      title: "datenschutz",
      description: "datenschutzerklärung · welche daten werden erhoben, wie werden sie verarbeitet, welche rechte hast du. dsgvo-konform.",
      ogTitle: "datenschutz · lacønis",
      ogDescription: "welche daten · wie verarbeitet · welche rechte.",
      nofollow: true,
    },
    fr: {
      title: "confidentialité",
      description: "politique de confidentialité · quelles données sont collectées, comment elles sont traitées, quels droits tu as. conforme rgpd.",
      ogTitle: "confidentialité · lacønis",
      ogDescription: "quelles données · comment traitées · quels droits.",
      nofollow: true,
    },
    en: {
      title: "privacy",
      description: "privacy policy · what data is collected, how it's processed, what rights you have. gdpr-compliant.",
      ogTitle: "privacy · lacønis",
      ogDescription: "what data · how processed · what rights.",
      nofollow: true,
    },
  },
};

/**
 * mappt einen canonical DE-path (z.b. "/leistungen/web") auf den
 * route-key in src/i18n/config.ts ("leistungen/web") · für hreflang.
 */
function pathToRouteKey(path: string): string | null {
  if (path === "/") return "home";
  const key = path.replace(/^\/+|\/+$/g, "");
  return key in ROUTES ? key : null;
}

/**
 * sucht die meta für einen path + locale · fällt zurück auf DE wenn
 * locale-version fehlt, dann auf root wenn path fehlt.
 */
function lookupEntry(path: string, locale: Locale): MetaEntry {
  const byLocale = STATIC_MAP[path] ?? STATIC_MAP["/"]!;
  return byLocale[locale] ?? byLocale.de;
}

/**
 * baut ein next/Metadata-objekt für den gegebenen canonical-path.
 * Locale wird intern via getLocale() aus dem middleware-header gezogen.
 *
 * Inkl. hreflang-alternates für FR + EN + x-default.
 */
export async function getMeta(path: string): Promise<Metadata> {
  const locale = getLocale();
  const entry = lookupEntry(path, locale);

  // hreflang-alternates aus i18n config (wenn page bekannt)
  const routeKey = pathToRouteKey(path);
  const languages = routeKey
    ? (getAlternates(routeKey as keyof typeof ROUTES) as Record<string, string>)
    : undefined;

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: entry.ogTitle ?? entry.title,
      description: entry.ogDescription ?? entry.description,
      url: path,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      type: entry.ogType ?? "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.ogTitle ?? entry.title,
      description: entry.ogDescription ?? entry.description,
    },
    alternates: {
      canonical: path,
      ...(languages ? { languages } : {}),
    },
    ...(entry.noindex || entry.nofollow
      ? {
          robots: {
            index: !entry.noindex,
            follow: !entry.nofollow,
          },
        }
      : {}),
  };
}

/**
 * export für sitemap + andere konsumenten die nur die keys brauchen.
 */
export function getStaticPaths(): string[] {
  return Object.keys(STATIC_MAP);
}
