import type { MetadataRoute } from "next";
import { referenzen } from "@/data/referenzen";
import { LOCALES, buildPath, ROUTES, type Locale } from "@/i18n/config";

const BASE = "https://laconis.be";

/**
 * Dynamische sitemap · statische hauptrouten + alle referenzen-slugs ·
 * jede page in allen 3 sprachen (DE, FR, EN) mit hreflang-alternates.
 *
 * Bewusst NICHT in der sitemap:
 *  - /leistungen/branding/simulator (spielzeug · noindex)
 *  - /preise/baukasten (redirect)
 */

type RouteKey = keyof typeof ROUTES;

/** routes die in alle 3 sprachen ausgespielt werden */
const I18N_ROUTES: Array<{
  routeKey: RouteKey;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { routeKey: "home", priority: 1.0, changeFrequency: "weekly" },
  { routeKey: "leistungen/web", priority: 0.9, changeFrequency: "monthly" },
  { routeKey: "leistungen/web/technik", priority: 0.7, changeFrequency: "monthly" },
  { routeKey: "leistungen/branding", priority: 0.9, changeFrequency: "monthly" },
  { routeKey: "preise", priority: 0.9, changeFrequency: "monthly" },
  { routeKey: "kontakt", priority: 0.9, changeFrequency: "monthly" },
  { routeKey: "referenzen", priority: 0.8, changeFrequency: "weekly" },
  { routeKey: "ansatz", priority: 0.8, changeFrequency: "monthly" },
  { routeKey: "ueber-mich", priority: 0.7, changeFrequency: "monthly" },
  { routeKey: "impressum", priority: 0.2, changeFrequency: "yearly" },
  { routeKey: "datenschutz", priority: 0.2, changeFrequency: "yearly" },
];

/** build alternates-object für eine route über alle locales */
function buildLanguageAlternates(routeKey: RouteKey): Record<Locale, string> {
  const result = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    result[locale] = `${BASE}${buildPath(routeKey, locale)}`;
  }
  return result;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* statische routes · pro locale eine entry mit hreflang-alternates */
  const staticEntries: MetadataRoute.Sitemap = I18N_ROUTES.flatMap((route) => {
    const alts = buildLanguageAlternates(route.routeKey);
    return LOCALES.map<MetadataRoute.Sitemap[number]>((locale) => ({
      url: `${BASE}${buildPath(route.routeKey, locale)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: alts,
      },
    }));
  });

  /* referenzen-detail-pages · jede in 3 sprachen */
  const cases: MetadataRoute.Sitemap = referenzen.flatMap((r) => {
    const slugMap = ROUTES["referenzen"];
    return LOCALES.map<MetadataRoute.Sitemap[number]>((locale) => {
      const localeBase = locale === "de" ? "" : `/${locale}`;
      const localizedSegment = slugMap[locale];
      const url = `${BASE}${localeBase}/${localizedSegment}/${r.slug}`;
      const langs: Record<Locale, string> = {} as Record<Locale, string>;
      for (const l of LOCALES) {
        const lbase = l === "de" ? "" : `/${l}`;
        langs[l] = `${BASE}${lbase}/${slugMap[l]}/${r.slug}`;
      }
      return {
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: r.istEcht ? 0.7 : 0.5,
        alternates: { languages: langs },
      };
    });
  });

  return [...staticEntries, ...cases];
}
