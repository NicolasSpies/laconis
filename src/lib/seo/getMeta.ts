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
      description: "Webdesigner & Web-Entwickler in Ostbelgien · Websites von null gebaut, Lighthouse 95+, eigenes CMS. Übernimmt auch bestehende Seiten · Inhalte bleiben, alles wird schneller. Dreisprachig DE/FR/EN.",
      ogTitle: "lacønis · design mit meinung · web mit seele",
      ogDescription: "webdesign studio · ostbelgien · handgemacht",
    },
    fr: {
      title: "lacønis · studio webdesign · est de la belgique",
      description: "Webdesigner & développeur web dans les Cantons de l'Est · sites construits de zéro, Lighthouse 95+, CMS maison. Reprend aussi ton site existant · contenus conservés, tout devient plus rapide. Trilingue DE/FR/EN.",
      ogTitle: "lacønis · design avec opinion · web avec âme",
      ogDescription: "studio webdesign · cantons de l'est · fait main",
    },
    en: {
      title: "lacønis · webdesign studio east belgium",
      description: "Web designer & developer in East Belgium · websites built from scratch, Lighthouse 95+, in-house CMS. Existing sites taken over too · content stays, everything gets faster. Trilingual DE/FR/EN.",
      ogTitle: "lacønis · design with opinion · web with soul",
      ogDescription: "webdesign studio · east belgium · handmade",
    },
  },
  "/leistung": {
    de: {
      title: "leistung · websites von null gebaut",
      description: "Websites von null gebaut · kein Template, kein WordPress-Limit. Lighthouse 95+, eigenes CMS zum Selberpflegen, bestehende Seiten werden übernommen. Ostbelgien, dreisprachig.",
      ogTitle: "leistung · lacønis",
      ogDescription: "von null gebaut · lighthouse 95+ · eigenes cms · übernahme bestehender seiten.",
    },
    fr: {
      title: "prestation · des sites construits de zéro",
      description: "Sites web construits de zéro · pas de template, pas de limite WordPress. Lighthouse 95+, CMS maison à gérer soi-même, reprise de sites existants. Cantons de l'Est, trilingue.",
      ogTitle: "prestation · lacønis",
      ogDescription: "construit de zéro · lighthouse 95+ · cms maison · reprise de sites existants.",
    },
    en: {
      title: "service · websites built from scratch",
      description: "Websites built from scratch · no template, no WordPress ceiling. Lighthouse 95+, in-house CMS you run yourself, existing sites taken over. East Belgium, trilingual.",
      ogTitle: "service · lacønis",
      ogDescription: "built from scratch · lighthouse 95+ · in-house cms · existing sites taken over.",
    },
  },
  "/leistungen/branding": {
    de: {
      title: "branding & logo-design · lacønis",
      description: "logo erstellen lassen · brand identity, visitenkarten, brand guide, typografie, farbwelt · für startups, handwerker, kleine unternehmen.",
      ogTitle: "branding & logo · lacønis",
      ogDescription: "logo, brand identity, visitenkarten, brand guide · vom ersten strich bis zur fahrzeugbeschriftung.",
    },
    fr: {
      title: "branding & design de logo · lacønis",
      description: "création de logo · brand identity, cartes de visite, brand guide, typographie, palette · pour startups, artisans, petites entreprises.",
      ogTitle: "branding & logo · lacønis",
      ogDescription: "logo, brand identity, cartes de visite, brand guide · du premier trait au marquage véhicule.",
    },
    en: {
      title: "branding & logo design · lacønis",
      description: "logo creation · brand identity, business cards, brand guide, typography, colour palette · for startups, makers, small businesses.",
      ogTitle: "branding & logo · lacønis",
      ogDescription: "logo, brand identity, business cards, brand guide · from first sketch to vehicle wrap.",
    },
  },
  "/preise": {
    de: {
      title: "preise · was kostet eine website oder ein logo?",
      description: "ehrliche faustregeln statt paket-tabelle. websites ab 1.500 €, logos ab 800 €, brand identity ab 1.200 €. keine versteckten kosten, kein 'auf anfrage' bei allem.",
      ogTitle: "preise · lacønis",
      ogDescription: "ehrliche faustregeln · websites ab 1.500 €, logos ab 800 €. kein paket-raster, transparente investments.",
    },
    fr: {
      title: "prix · ça coûte combien un site web ou un logo ?",
      description: "des règles honnêtes plutôt qu'une grille forfaitaire. sites web à partir de 1 500 €, logos à partir de 800 €, brand identity à partir de 1 200 €. pas de coûts cachés, pas de « sur demande » pour tout.",
      ogTitle: "prix · lacønis",
      ogDescription: "règles honnêtes · sites web dès 1 500 €, logos dès 800 €. pas de grille, investissements transparents.",
    },
    en: {
      title: "pricing · what does a website or logo cost?",
      description: "honest rules of thumb instead of a package grid. websites from €1,500, logos from €800, brand identity from €1,200. no hidden costs, no 'on request' for everything.",
      ogTitle: "pricing · lacønis",
      ogDescription: "honest rules of thumb · websites from €1,500, logos from €800. no package grid, transparent investments.",
    },
  },
  "/preise/baukasten": {
    de: {
      title: "baukasten · preise",
      description: "weitergeleitet zu /preise · keine paket-konfigurator-seite mehr.",
      ogTitle: "preise · lacønis",
      ogDescription: "weitergeleitet zu /preise.",
      noindex: true,
      nofollow: true,
    },
  },
  "/referenzen": {
    de: {
      title: "referenzen",
      description: "ausgewählte arbeiten · websites, brands, print · teilweise konzept-studien, teilweise live-projekte.",
      ogTitle: "referenzen · lacønis",
      ogDescription: "ausgewählte arbeiten · websites, brands, print.",
    },
    fr: {
      title: "références",
      description: "travaux sélectionnés · sites web, marques, print · en partie études concept, en partie projets live.",
      ogTitle: "références · lacønis",
      ogDescription: "travaux sélectionnés · sites web, marques, print.",
    },
    en: {
      title: "work",
      description: "selected work · websites, brands, print · partly concept studies, partly live projects.",
      ogTitle: "work · lacønis",
      ogDescription: "selected work · websites, brands, print.",
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
  "/ueber-mich": {
    de: {
      title: "über mich",
      description: "nicolas spies · freelance designer + web developer. dreisprachig arbeiten (de · fr · en), eigenes CMS, kleiner kundenkreis.",
      ogTitle: "über mich · lacønis",
      ogDescription: "nicolas spies · freelance designer + web developer.",
      ogType: "profile",
    },
    fr: {
      title: "à propos",
      description: "nicolas spies · freelance designer + développeur web. travail trilingue (de · fr · en), cms maison, cercle de clients restreint.",
      ogTitle: "à propos · lacønis",
      ogDescription: "nicolas spies · freelance designer + développeur web.",
      ogType: "profile",
    },
    en: {
      title: "about",
      description: "nicolas spies · freelance designer + web developer. trilingual work (de · fr · en), in-house cms, small client circle.",
      ogTitle: "about · lacønis",
      ogDescription: "nicolas spies · freelance designer + web developer.",
      ogType: "profile",
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
