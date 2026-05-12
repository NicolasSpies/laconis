import type { MetadataRoute } from "next";
import { referenzen } from "@/data/referenzen";

const BASE = "https://laconis.be";

/**
 * Dynamische sitemap · statische hauptrouten + alle referenzen-slugs.
 * Next generiert daraus /sitemap.xml beim build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * priorities · semantik:
   *  1.0 = home (root signal)
   *  0.9 = money-pages (leistungen, preise, kontakt)
   *  0.8 = trust-pages (referenzen, ansatz)
   *  0.7 = supportive (ueber-mich, technik)
   *  0.2 = legal
   * Bewusst NICHT in der sitemap: /leistungen/branding/simulator (spielzeug · noindex)
   * und /preise/baukasten (redirect auf /preise).
   */
  const statisch: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/leistungen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/leistungen/web`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/leistungen/web/technik`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/leistungen/branding`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/preise`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/referenzen`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/ansatz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ueber-mich`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cases: MetadataRoute.Sitemap = referenzen.map((r) => ({
    url: `${BASE}/referenzen/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.istEcht ? 0.7 : 0.5,
  }));

  return [...statisch, ...cases];
}
