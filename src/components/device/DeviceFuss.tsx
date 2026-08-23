"use client";

import Link from "next/link";
import { CONTACT } from "@/config/contact";
import { buildPath } from "@/i18n/config";
import { useLocale } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * DeviceFuss · die eine fusszeile aller geräte-seiten.
 *
 * vorher hatten NUR home und /studio ein echtes <footer> mit den
 * pflichtlinks. /arbeiten, /arbeiten/[slug] und /kontakt trugen
 * eine copyright-zeile und sonst nichts · und LegacyChrome gibt
 * auf allen geräte-pfaden null zurück, es kam also auch kein
 * globaler footer nach. ausgerechnet /kontakt, die seite MIT dem
 * formular, war die ohne datenschutz-link.
 *
 * die jahreszahl kommt aus getFullYear(), damit sie nicht jedes
 * jahr von hand nachgezogen werden muss.
 */

const FUSS: Record<Locale, { impressum: string; datenschutz: string }> = {
  de: { impressum: "impressum", datenschutz: "datenschutz" },
  fr: { impressum: "mentions légales", datenschutz: "confidentialité" },
  en: { impressum: "legal notice", datenschutz: "privacy" },
};

export function DeviceFuss({ vorne }: { vorne?: React.ReactNode }) {
  const locale = useLocale();
  const t = FUSS[locale];

  return (
    <footer className="relative z-[1] mx-auto mt-rh-m flex max-w-shell flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--ln-hair)] px-gut pb-rh-s pt-6">
      <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {vorne}
        <a className="lab-label-lg" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      </span>

      <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link href={buildPath("impressum", locale)} className="lab-label-lg">
          {t.impressum}
        </Link>
        <Link href={buildPath("datenschutz", locale)} className="lab-label-lg">
          {t.datenschutz}
        </Link>
        <span className="lab-label">© {new Date().getFullYear()} lacønis</span>
      </span>
    </footer>
  );
}
