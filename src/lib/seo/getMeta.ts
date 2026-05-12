import type { Metadata } from "next";
import { ROUTES, getAlternates } from "@/i18n/config";

/**
 * Zentraler SEO-metadata-provider.
 *
 * **jetzt:** statische map mit fallbacks pro route.
 * **später:** env-flag `NEXT_PUBLIC_CONTENTCORE_SEO=1` → `fetch()` aus ContentCore.
 * kein page-refactor nötig beim umschalten, nur diese datei.
 *
 * pattern pro page:
 * ```ts
 * export async function generateMetadata(): Promise<Metadata> {
 *   return getMeta("/preise");
 * }
 * ```
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

/**
 * statische fallback-map · canonical-path → metadata.
 * hand-gepflegt. ContentCore-API liefert später dieselbe struktur.
 */
const STATIC_MAP: Record<string, MetaEntry> = {
  "/": {
    title: "lacønis · design mit meinung · web mit seele",
    description:
      "Freelance Graphic & Web Design aus Eupen, Belgien. Websites die für sich selbst sprechen. Eigenes CMS inklusive. Dreisprachig: Deutsch, Französisch, Englisch.",
    ogTitle: "lacønis",
    ogDescription: "design mit meinung · web mit seele",
  },
  "/leistungen": {
    title: "leistungen",
    description:
      "zwei werkstätten, ein kopf · websites und branding aus einer hand. handgemacht in eupen.",
    ogTitle: "leistungen · lacønis",
    ogDescription:
      "web + branding · design und code aus einem kopf · handgemacht in eupen.",
  },
  "/leistungen/web": {
    title: "leistungen · web",
    description:
      "websites die nicht im grundrauschen verschwinden · design, development, seo aus einer hand. eigenes CMS optional. handgemacht.",
    ogTitle: "web · lacønis",
    ogDescription:
      "websites · design + development + seo aus einer hand · eigenes CMS optional.",
  },
  "/leistungen/web/technik": {
    title: "leistungen · web · technik",
    description:
      "tiefer-tauchen · contentcore, hosting, wordpress-vergleich. für alle die's genau wissen wollen.",
    ogTitle: "web · technik · lacønis",
    ogDescription:
      "contentcore, hosting, cms-vergleich · für techniker und entscheider.",
  },
  "/leistungen/branding": {
    title: "branding & logo-design · lacønis",
    description:
      "logo erstellen lassen · brand identity, visitenkarten, brand guide, typografie, farbwelt · für startups, handwerker, kleine unternehmen. handgemacht in eupen.",
    ogTitle: "branding & logo · lacønis",
    ogDescription:
      "logo, brand identity, visitenkarten, brand guide · vom ersten strich bis zur fahrzeugbeschriftung.",
  },
  "/leistungen/branding/simulator": {
    title: "brand-simulator · probier's selber aus",
    description:
      "spielplatz · name, farben, stimmung wählen und in sekunden eine marke bauen. ein vorgeschmack, kein fertiges logo.",
    ogTitle: "brand-simulator · lacønis",
    ogDescription:
      "spielplatz · in sekunden eine marke zusammenklicken. kein fertiges design, nur ein gefühl.",
    noindex: true,
  },
  "/ansatz": {
    title: "ansatz",
    description:
      "wie ich arbeite · von gespräch bis übergabe. der prozess für web + branding, und was ich bewusst nicht mache.",
    ogTitle: "ansatz · lacønis",
    ogDescription:
      "der prozess hinter web + branding · vier schritte, keine blackbox. und was ich nicht mache.",
  },
  "/preise": {
    title: "preise · was kostet eine website oder ein logo?",
    description:
      "ehrliche faustregeln statt paket-tabelle. websites ab 1.500 €, logos ab 800 €, brand identity ab 1.200 €. keine versteckten kosten, kein 'auf anfrage' bei allem. transparent für eupen, ostbelgien, aachen, lüttich.",
    ogTitle: "preise · lacønis",
    ogDescription:
      "ehrliche faustregeln · websites ab 1.500 €, logos ab 800 €. kein paket-raster, transparente investments.",
  },
  "/preise/baukasten": {
    title: "baukasten · preise",
    description:
      "weitergeleitet zu /preise · keine paket-konfigurator-seite mehr.",
    ogTitle: "preise · lacønis",
    ogDescription: "weitergeleitet zu /preise.",
    noindex: true,
    nofollow: true,
  },
  "/referenzen": {
    title: "referenzen",
    description:
      "ausgewählte arbeiten · websites, brands, print · teilweise konzept-studien, teilweise live-projekte aus eupen und umgebung.",
    ogTitle: "referenzen · lacønis",
    ogDescription: "ausgewählte arbeiten · websites, brands, print.",
  },
  "/kontakt": {
    title: "kontakt",
    description:
      "projekt besprechen · antwort innerhalb 24h. e-mail, call buchen, oder kurz das projekt-formular ausfüllen.",
    ogTitle: "kontakt · lacønis",
    ogDescription: "projekt besprechen · antwort innerhalb 24h.",
  },
  "/ueber-mich": {
    title: "über mich",
    description:
      "nicolas spies · freelance designer + web developer aus eupen, belgien. dreisprachig arbeiten (de · fr · en), eigenes CMS, kleiner kundenkreis.",
    ogTitle: "über mich · lacønis",
    ogDescription:
      "nicolas spies · freelance designer + web developer aus eupen, belgien.",
    ogType: "profile",
  },
  "/impressum": {
    title: "impressum",
    description:
      "rechtliche angaben zu lacønis · nicolas spies · eupen, belgien.",
    ogTitle: "impressum · lacønis",
    ogDescription: "rechtliche angaben zu lacønis · eupen, belgien.",
    nofollow: true,
  },
  "/datenschutz": {
    title: "datenschutz",
    description:
      "datenschutzerklärung · welche daten werden erhoben, wie werden sie verarbeitet, welche rechte hast du. dsgvo-konform.",
    ogTitle: "datenschutz · lacønis",
    ogDescription: "welche daten · wie verarbeitet · welche rechte.",
    nofollow: true,
  },
};

/**
 * loader-slot · später auf ContentCore umstellbar.
 * signatur bleibt identisch · ein env-check reicht zum umschalten.
 */
async function loadEntry(path: string): Promise<MetaEntry | undefined> {
  // TODO: wenn ContentCore live ist:
  // if (process.env.NEXT_PUBLIC_CONTENTCORE_SEO === "1") {
  //   const res = await fetch(`${process.env.CONTENTCORE_ENDPOINT}/seo?path=${encodeURIComponent(path)}`, {
  //     next: { revalidate: 300, tags: [`seo:${path}`] },
  //   });
  //   if (res.ok) return res.json();
  // }
  return STATIC_MAP[path];
}

/**
 * mappt einen canonical DE-path (z.b. "/leistungen/web") auf den
 * route-key in src/i18n/config.ts ("leistungen/web") · für hreflang.
 * gibt null zurück wenn nicht in ROUTES.
 */
function pathToRouteKey(path: string): string | null {
  if (path === "/") return "home";
  const key = path.replace(/^\/+|\/+$/g, "");
  return key in ROUTES ? key : null;
}

/**
 * baut ein next/Metadata-objekt für den gegebenen canonical-path.
 * fällt auf root zurück wenn path unbekannt.
 *
 * Inkl. hreflang-alternates für FR + EN + x-default · sofern der path
 * in src/i18n/config.ts ROUTES eingetragen ist.
 */
export async function getMeta(path: string): Promise<Metadata> {
  const entry = (await loadEntry(path)) ?? STATIC_MAP["/"]!;

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
      locale: "de_BE",
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
