import { headers } from "next/headers";
import { DEFAULT_LOCALE, type Locale } from "./config";

/**
 * Server-side locale-detection · liest aus middleware-header `x-locale`.
 * Nutzung: nur in Server-Components / generateMetadata.
 * Für Client-Components: nutze `useLocale()` aus ./useLocale.ts.
 *
 * WICHTIG: aufruf macht die page dynamic (kein static prerender mehr).
 * Deshalb nur dort einsetzen wo wirklich locale-abhängiger content gerendert wird.
 */
export function getLocale(): Locale {
  const locale = headers().get("x-locale") as Locale | null;
  return locale ?? DEFAULT_LOCALE;
}
