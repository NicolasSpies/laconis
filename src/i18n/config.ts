/**
 * i18n config · single source of truth für locales + lokalisierte URL-slugs.
 *
 * Strategie:
 * - DE = default, läuft an root (kein /de/-prefix in der URL)
 * - FR + EN bekommen /fr/ und /en/ als prefix
 * - Slugs werden lokalisiert (z.B. /fr/a-propos statt /fr/ueber-mich)
 *
 * Wenn neue routen dazukommen: hier eintragen.
 * SLUGS ist die single-source-of-truth für die sitemap-übersetzung +
 * hreflang-tags + LangSwitcher.
 */

export const LOCALES = ["de", "fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

/** display-name pro locale für UI (Sprach-Switcher etc.) */
export const LOCALE_LABELS: Record<Locale, { short: string; long: string }> = {
  de: { short: "DE", long: "Deutsch" },
  fr: { short: "FR", long: "Français" },
  en: { short: "EN", long: "English" },
};

/** HTML lang-attribute pro locale (für <html lang="..">) */
export const HTML_LANG: Record<Locale, string> = {
  de: "de-BE",
  fr: "fr-BE",
  en: "en",
};

/**
 * Canonical path (DE) → lokalisierter slug.
 * Format: { '/leistungen/web': { de: 'leistungen/web', fr: 'services/web', en: 'services/web' } }
 *
 * Wichtig: die KEYS sind die deutschen (canonical) pfade ohne führenden /.
 * Die werte sind die lokalisierten slugs (auch ohne führendes /).
 * Der locale-prefix (/fr/, /en/) kommt separat dazu.
 */
export const ROUTES: Record<string, Record<Locale, string>> = {
  home: { de: "", fr: "", en: "" },
  leistungen: { de: "leistungen", fr: "services", en: "services" },
  "leistungen/web": {
    de: "leistungen/web",
    fr: "services/web",
    en: "services/web",
  },
  "leistungen/web/technik": {
    de: "leistungen/web/technik",
    fr: "services/web/technique",
    en: "services/web/tech",
  },
  "leistungen/branding": {
    de: "leistungen/branding",
    fr: "services/branding",
    en: "services/branding",
  },
  "leistungen/branding/simulator": {
    de: "leistungen/branding/simulator",
    fr: "services/branding/simulateur",
    en: "services/branding/simulator",
  },
  ansatz: { de: "ansatz", fr: "approche", en: "approach" },
  preise: { de: "preise", fr: "prix", en: "pricing" },
  kontakt: { de: "kontakt", fr: "contact", en: "contact" },
  referenzen: { de: "referenzen", fr: "references", en: "work" },
  "ueber-mich": { de: "ueber-mich", fr: "a-propos", en: "about" },
  impressum: {
    de: "impressum",
    fr: "mentions-legales",
    en: "legal-notice",
  },
  datenschutz: {
    de: "datenschutz",
    fr: "confidentialite",
    en: "privacy",
  },
};

/**
 * Baut eine vollständige URL aus route-key + locale.
 * Beispiele:
 *   buildPath('home', 'de')             → '/'
 *   buildPath('home', 'fr')             → '/fr'
 *   buildPath('leistungen/web', 'de')   → '/leistungen/web'
 *   buildPath('leistungen/web', 'fr')   → '/fr/services/web'
 *   buildPath('preise', 'en')           → '/en/pricing'
 */
export function buildPath(routeKey: keyof typeof ROUTES, locale: Locale): string {
  const route = ROUTES[routeKey];
  if (!route) throw new Error(`Unknown route key: ${routeKey}`);

  const localizedSlug = route[locale];
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  if (routeKey === "home") {
    return prefix || "/";
  }

  return `${prefix}/${localizedSlug}`;
}

/**
 * Mappt einen lokalisierten path zurück auf den canonical route-key.
 * Beispiele:
 *   parsePath('/leistungen/web')   → { routeKey: 'leistungen/web', locale: 'de' }
 *   parsePath('/fr/services/web')  → { routeKey: 'leistungen/web', locale: 'fr' }
 *   parsePath('/en/pricing')       → { routeKey: 'preise', locale: 'en' }
 *   parsePath('/')                 → { routeKey: 'home', locale: 'de' }
 *   parsePath('/fr')               → { routeKey: 'home', locale: 'fr' }
 */
export function parsePath(
  pathname: string,
): { routeKey: string; locale: Locale } | null {
  // strip trailing slash + leading /
  const clean = pathname.replace(/^\/+|\/+$/g, "");

  // root
  if (clean === "") return { routeKey: "home", locale: DEFAULT_LOCALE };

  // detect locale prefix
  const segments = clean.split("/");
  const firstSeg = segments[0];

  let locale: Locale = DEFAULT_LOCALE;
  let pathWithoutLocale = clean;

  if (firstSeg === "fr" || firstSeg === "en") {
    locale = firstSeg;
    pathWithoutLocale = segments.slice(1).join("/");
    if (pathWithoutLocale === "") {
      return { routeKey: "home", locale };
    }
  }

  // find matching route-key for this locale + path
  for (const [routeKey, slugMap] of Object.entries(ROUTES)) {
    if (slugMap[locale] === pathWithoutLocale) {
      return { routeKey, locale };
    }
  }

  return null;
}

/**
 * Gibt die path-alternates für einen route-key zurück · für hreflang-tags.
 * Beispiele:
 *   getAlternates('leistungen/web')
 *   → {
 *       de: '/leistungen/web',
 *       fr: '/fr/services/web',
 *       en: '/en/services/web',
 *       'x-default': '/leistungen/web',
 *     }
 */
export function getAlternates(
  routeKey: keyof typeof ROUTES,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of LOCALES) {
    result[locale] = buildPath(routeKey, locale);
  }
  // x-default = DE (canonical)
  result["x-default"] = buildPath(routeKey, DEFAULT_LOCALE);
  return result;
}
