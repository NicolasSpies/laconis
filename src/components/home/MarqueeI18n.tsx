"use client";

import { Marquee } from "./Marquee";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const WORDS: Record<Locale, string[]> = {
  de: ["sag hallo", "schreib mir", "ruf an", "mail", "multistep", "30-min call", "kein pitch-deck"],
  fr: ["dis bonjour", "écris-moi", "appelle", "mail", "multistep", "appel 30 min", "pas de pitch-deck"],
  en: ["say hi", "write me", "call", "mail", "multistep", "30-min call", "no pitch deck"],
};

/**
 * I18n-wrapper für die Marquee · zieht die wörter aus dem dict je nach locale.
 * Bewusst als wrapper, weil <Marquee> selbst props-only ist und keine
 * locale kennt.
 */
export function MarqueeI18n({
  direction = "right",
  baseVelocity = 2.5,
}: {
  direction?: "left" | "right";
  baseVelocity?: number;
}) {
  const locale = useLocale();
  const words = pick(WORDS, locale);
  return <Marquee words={words} direction={direction} baseVelocity={baseVelocity} />;
}
