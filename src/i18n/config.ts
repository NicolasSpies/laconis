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
 * Format: { 'leistung': { de: 'leistung', fr: 'prestation', en: 'service' } }
 *
 * Wichtig: die KEYS sind die deutschen (canonical) pfade ohne führenden /.
 * Die werte sind die lokalisierten slugs (auch ohne führendes /).
 * Der locale-prefix (/fr/, /en/) kommt separat dazu.
 */
export const ROUTES: Record<string, Record<Locale, string>> = {
  home: { de: "", fr: "", en: "" },
  /* STUDIO · verschmilzt die frueheren seiten leistung, preise und
     ueber-mich zu einem ort. alle drei leiten per 301 hierher
     (siehe next.config). der schluessel heisst weiter `leistung`,
     damit die rund 14 aufrufstellen nicht angefasst werden muessen ·
     nur der sichtbare pfad aendert sich. */
  leistung: { de: "studio", fr: "studio", en: "studio" },
  kontakt: { de: "kontakt", fr: "contact", en: "contact" },
  /* ARBEITEN · frueher /referenzen. schluessel bleibt, pfad neu. */
  referenzen: { de: "arbeiten", fr: "travaux", en: "work" },
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
 *   buildPath('leistung', 'de')         → '/leistung'
 *   buildPath('leistung', 'fr')         → '/fr/prestation'
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
 *   parsePath('/leistung')         → { routeKey: 'leistung', locale: 'de' }
 *   parsePath('/fr/prestation')    → { routeKey: 'leistung', locale: 'fr' }
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
 *   getAlternates('leistung')
 *   → {
 *       de: '/leistung',
 *       fr: '/fr/prestation',
 *       en: '/en/service',
 *       'x-default': '/leistung',
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

/**
 * Mappt einen pathname in eine andere locale · für den Sprach-Switcher.
 * Behandelt auch dynamic-segments wie /referenzen/<slug> → /fr/references/<slug>.
 *
 * Beispiele:
 *   switchLocale('/leistung', 'fr')                    → '/fr/prestation'
 *   switchLocale('/fr/prestation', 'en')               → '/en/service'
 *   switchLocale('/referenzen/fabry', 'en')            → '/en/work/fabry'
 *   switchLocale('/en/work/fabry', 'de')               → '/referenzen/fabry'
 *   switchLocale('/', 'fr')                            → '/fr'
 *   switchLocale('/fr', 'de')                          → '/'
 *
 * Fallback (unbekannter pfad): root in target-locale.
 */
export function switchLocale(pathname: string, targetLocale: Locale): string {
  const clean = pathname.replace(/^\/+|\/+$/g, "");

  // root
  if (clean === "") return buildPath("home", targetLocale);

  // erkennen ob aktuelle locale prefix hat
  const segments = clean.split("/");
  let currentLocale: Locale = DEFAULT_LOCALE;
  let pathWithoutLocale = clean;

  if (segments[0] === "fr" || segments[0] === "en") {
    currentLocale = segments[0];
    pathWithoutLocale = segments.slice(1).join("/");
  }

  if (pathWithoutLocale === "") return buildPath("home", targetLocale);

  // versuche route-key in current-locale zu finden
  for (const [routeKey, slugMap] of Object.entries(ROUTES)) {
    const currentSlug = slugMap[currentLocale];
    if (!currentSlug) continue;

    // exact match (z.b. /leistung matches "leistung")
    if (pathWithoutLocale === currentSlug) {
      return buildPath(routeKey as keyof typeof ROUTES, targetLocale);
    }

    // dynamic-prefix match (z.b. /referenzen/fabry startet mit "referenzen")
    if (currentSlug !== "" && pathWithoutLocale.startsWith(currentSlug + "/")) {
      const rest = pathWithoutLocale.slice(currentSlug.length); // "/fabry"
      const targetBase = buildPath(routeKey as keyof typeof ROUTES, targetLocale);
      return `${targetBase}${rest}`;
    }
  }

  // fallback: root in target locale
  return buildPath("home", targetLocale);
}
