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
      // Altroute → neue Route (2026-04 umbenannt: grafik → branding)
      {
        source: "/leistungen/grafik",
        destination: "/leistungen/branding",
        permanent: true,
      },
      {
        source: "/leistungen/grafik/:path*",
        destination: "/leistungen/branding/:path*",
        permanent: true,
      },
      // Übersichts-page entfernt 2026-05 · nav-dropdown ersetzt sie
      // alte deep-links → primary service (/leistungen/web)
      {
        source: "/leistungen",
        destination: "/leistungen/web",
        permanent: true,
      },
      {
        source: "/fr/services",
        destination: "/fr/services/web",
        permanent: true,
      },
      {
        source: "/en/services",
        destination: "/en/services/web",
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
      { source: "/fr/services/web", destination: "/leistungen/web" },
      { source: "/fr/services/web/technique", destination: "/leistungen/web/technik" },
      { source: "/fr/services/branding", destination: "/leistungen/branding" },
      { source: "/fr/services/branding/simulateur", destination: "/leistungen/branding/simulator" },
      { source: "/fr/approche", destination: "/ansatz" },
      { source: "/fr/prix", destination: "/preise" },
      { source: "/fr/contact", destination: "/kontakt" },
      { source: "/fr/references", destination: "/referenzen" },
      { source: "/fr/references/:slug", destination: "/referenzen/:slug" },
      { source: "/fr/a-propos", destination: "/ueber-mich" },
      { source: "/fr/mentions-legales", destination: "/impressum" },
      { source: "/fr/confidentialite", destination: "/datenschutz" },
    ];

    const en = [
      { source: "/en", destination: "/" },
      { source: "/en/services/web", destination: "/leistungen/web" },
      { source: "/en/services/web/tech", destination: "/leistungen/web/technik" },
      { source: "/en/services/branding", destination: "/leistungen/branding" },
      { source: "/en/services/branding/simulator", destination: "/leistungen/branding/simulator" },
      { source: "/en/approach", destination: "/ansatz" },
      { source: "/en/pricing", destination: "/preise" },
      { source: "/en/contact", destination: "/kontakt" },
      { source: "/en/work", destination: "/referenzen" },
      { source: "/en/work/:slug", destination: "/referenzen/:slug" },
      { source: "/en/about", destination: "/ueber-mich" },
      { source: "/en/legal-notice", destination: "/impressum" },
      { source: "/en/privacy", destination: "/datenschutz" },
    ];

    return [...fr, ...en];
  },
};

export default nextConfig;
