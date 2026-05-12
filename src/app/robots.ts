import type { MetadataRoute } from "next";

const BASE = "https://laconis.be";

/**
 * robots.txt · explizit freundlich gegenüber AI-Crawlern (GEO-Strategie).
 *
 * Wir BLOCKEN bewusst nichts an AI-Bots — laconis will von ChatGPT,
 * Perplexity, Claude, Gemini etc. zitiert werden. Konkurrenz (pavonet)
 * blockt aktiv, wir gehen den umgekehrten Weg.
 *
 * /api/ und /_next/ bleiben für alle dicht.
 * /preise/baukasten und simulator sind über noindex-meta abgedeckt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
