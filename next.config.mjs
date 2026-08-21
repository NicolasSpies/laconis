/**
 * Next.js config · redirects (alt-routen) + rewrites (i18n-aliases).
 *
 * Rewrites = URL bleibt für den nutzer sichtbar, intern wird auf die canonical
 * DE-route gemappt. So müssen wir nicht jede Page 3x anlegen — eine
 * DE-implementierung, drei lokalisierte URLs.
 *
 * Single source: src/i18n/config.ts (ROUTES dictionary)
 * Wenn du hier was änderst, dort auch nachziehen.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      /* ═══ 2026-08 · vier seiten statt sieben ═══
         leistung, preise und ueber-mich sind zu /studio verschmolzen,
         referenzen heisst jetzt arbeiten. alle alten pfade waren
         indexiert (nachgeprueft: laconis.be/leistung, /preise,
         /ueber-mich und /referenzen lieferten alle 200) · sie duerfen
         nicht ins leere laufen. */
      { source: "/leistung", destination: "/studio", permanent: true },
      { source: "/preise", destination: "/studio", permanent: true },
      { source: "/preise/baukasten", destination: "/studio", permanent: true },
      { source: "/ueber-mich", destination: "/studio", permanent: true },
      { source: "/referenzen", destination: "/arbeiten", permanent: true },
      { source: "/referenzen/:slug", destination: "/arbeiten/:slug", permanent: true },

      { source: "/fr/prestation", destination: "/fr/studio", permanent: true },
      { source: "/fr/prix", destination: "/fr/studio", permanent: true },
      { source: "/fr/a-propos", destination: "/fr/studio", permanent: true },
      { source: "/fr/references", destination: "/fr/travaux", permanent: true },
      { source: "/fr/references/:slug", destination: "/fr/travaux/:slug", permanent: true },

      { source: "/en/service", destination: "/en/studio", permanent: true },
      { source: "/en/pricing", destination: "/en/studio", permanent: true },
      { source: "/en/about", destination: "/en/studio", permanent: true },

      /* 2026-08 · die branding-seite ist ersatzlos raus. alles was
         mal dorthin zeigte, landet jetzt auf der einen leistungs-
         seite · dort steht das web-angebot, um das es geht. */
      {
        source: "/leistungen/branding",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/leistungen/grafik",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/leistungen/grafik/:path*",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/fr/services/branding",
        destination: "/fr/prestation",
        permanent: true,
      },
      {
        source: "/en/services/branding",
        destination: "/en/service",
        permanent: true,
      },
      // Übersichts-page entfernt 2026-05 · nav-dropdown ersetzt sie
      // alte deep-links → primary service (/leistungen/web)
      {
        source: "/leistungen",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/fr/services",
        destination: "/fr/prestation",
        permanent: true,
      },
      {
        source: "/en/services",
        destination: "/en/service",
        permanent: true,
      },
      // /ansatz aufgelöst (2026-06) · inhalte verteilt: 4-schritte →
      // leistung, nicht-liste → /preise, haltung → /ueber-mich
      {
        source: "/ansatz",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/fr/approche",
        destination: "/fr/prestation",
        permanent: true,
      },
      {
        source: "/en/approach",
        destination: "/en/service",
        permanent: true,
      },
      /* 2026-08 · /leistungen/web + .../technik zusammengelegt zu EINER
         seite (/leistung). tiefe 3 war ein grund, warum die technik-
         inhalte nie jemand gesehen hat. redirects laufen VOR den
         rewrites, die alten alias-urls sind damit auch abgedeckt. */
      {
        source: "/leistungen/web/technik",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/leistungen/web",
        destination: "/leistung",
        permanent: true,
      },
      {
        source: "/fr/services/web/technique",
        destination: "/fr/prestation",
        permanent: true,
      },
      {
        source: "/fr/services/web",
        destination: "/fr/prestation",
        permanent: true,
      },
      {
        source: "/en/services/web/tech",
        destination: "/en/service",
        permanent: true,
      },
      {
        source: "/en/services/web",
        destination: "/en/service",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    /**
     * FR + EN URL-aliases → canonical DE pages.
     * Quelle = was der user sieht, Ziel = was Next.js intern serviert.
     * Locale wird per middleware aus dem URL-prefix extrahiert.
     */
    const fr = [
      { source: "/fr", destination: "/" },
      { source: "/fr/studio", destination: "/studio" },
      { source: "/fr/contact", destination: "/kontakt" },
      { source: "/fr/travaux", destination: "/arbeiten" },
      { source: "/fr/travaux/:slug", destination: "/arbeiten/:slug" },
      { source: "/fr/mentions-legales", destination: "/impressum" },
      { source: "/fr/confidentialite", destination: "/datenschutz" },
    ];

    const en = [
      { source: "/en", destination: "/" },
      { source: "/en/studio", destination: "/studio" },
      { source: "/en/contact", destination: "/kontakt" },
      { source: "/en/work", destination: "/arbeiten" },
      { source: "/en/work/:slug", destination: "/arbeiten/:slug" },
      { source: "/en/legal-notice", destination: "/impressum" },
      { source: "/en/privacy", destination: "/datenschutz" },
    ];

    return [...fr, ...en];
  },
};

export default nextConfig;
