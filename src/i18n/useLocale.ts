"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, type Locale } from "./config";

/**
 * Client-side locale-detection · liest aus pathname-prefix.
 * Für Server-Components: nutze `getLocale()` aus ./getLocale.ts (liest header).
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return DEFAULT_LOCALE;
}

/**
 * Generischer dictionary-getter für inline-DICT-objekte in components.
 * Nutzung:
 *   const DICT = { de: {...}, fr: {...}, en: {...} };
 *   const t = pick(DICT, locale);
 *   t.headline → string
 */
export function pick<T>(dict: Record<Locale, T>, locale: Locale): T {
  return dict[locale] ?? dict[DEFAULT_LOCALE];
}
