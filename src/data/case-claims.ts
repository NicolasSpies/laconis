import type { Locale } from "@/i18n/config";

/**
 * Literarische anchor-claims pro case · 1-zeiler oben auf der case-detail-page.
 * Inspired by savoirfaire.digital's pattern ("L'aventure grandeur nature" etc).
 *
 * Trilingual. Slug-keyed.
 * Wenn ein slug nicht hier eingetragen ist, wird kein claim gerendert.
 */
export const CASE_CLAIMS: Record<string, Record<Locale, string>> = {
  "fabry-baumpflege": {
    de: "die marke aus dem boden gewachsen.",
    fr: "une marque sortie de terre.",
    en: "a brand grown from the soil.",
  },
  holoroom: {
    de: "violett war am ersten tag klar.",
    fr: "le violet était évident dès le premier jour.",
    en: "purple was clear from day one.",
  },
  "lespoir-asbl": {
    de: "kein logo · ein versprechen.",
    fr: "pas un logo · une promesse.",
    en: "not a logo · a promise.",
  },
};
