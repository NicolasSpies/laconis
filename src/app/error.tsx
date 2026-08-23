"use client";

/**
 * route-level error boundary · greift bei render-fehlern unterhalb
 * von layout.tsx. layout-fehler fallen auf global-error.tsx zurück.
 *
 * bis august 2026 stand hier "ups." in Caveat-schreibschrift, um 6°
 * gedreht, mit einem pfeil-kritzel darunter. handschrift, rotation
 * und kritzel sind drei der vier ausdrücklich ausgeschlossenen
 * dinge · und der besucher hat gerade einen fehler gesehen, dem
 * hilft kein augenzwinkern, sondern ein weg.
 */

import { useEffect } from "react";
import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { CONTACT } from "@/config/contact";
import { useLocale } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import "@/components/device/device.css";

const DICT: Record<
  Locale,
  { headline: string; note: string; nochmal: string; start: string; schreib: string }
> = {
  de: {
    headline: "da ist was schiefgelaufen.",
    note: "nicht bei dir · bei mir. der versuch nochmal kostet nichts.",
    nochmal: "nochmal versuchen",
    start: "zur startseite",
    schreib: "bleibt es dabei, schreib mir",
  },
  fr: {
    headline: "quelque chose a mal tourné.",
    note: "pas chez toi · chez moi. réessayer ne coûte rien.",
    nochmal: "réessayer",
    start: "vers l'accueil",
    schreib: "si ça persiste, écris-moi",
  },
  en: {
    headline: "something went wrong.",
    note: "not on your side · on mine. trying again costs nothing.",
    nochmal: "try again",
    start: "to the home page",
    schreib: "if it keeps happening, write to me",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const t = DICT[locale] ?? DICT.de;

  useEffect(() => {
    // TODO: später über ContentCore analytics.ts loggen
    console.error("[route-error]", error);
  }, [error]);

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <DeviceNav />

      <section data-no-reveal className="relative flex min-h-[76svh] items-center px-gut pt-hero">
        <div className="mx-auto w-full max-w-shell">
          <p className="lab-display text-display-xl" aria-hidden>
            5<span style={{ color: "#e1fd52" }}>0</span>0
          </p>

          <h1 className="lab-display lab-boot mt-6 max-w-[16ch] text-display">{t.headline}</h1>

          <p className="mt-6 max-w-measure-lead text-lead text-[var(--tx-3)]">{t.note}</p>

          <div className="mt-rh-s flex flex-wrap items-center gap-5">
            <button type="button" onClick={reset} className="lab-cta">
              {t.nochmal}
            </button>
            <Link href={buildPath("home", locale)} className="lab-cta lab-cta--leise">
              {t.start}
            </Link>
            <a href={`mailto:${CONTACT.email}`} className="lab-link">
              {t.schreib}
            </a>
          </div>

          {error.digest && <p className="lab-hint mt-rh-s font-mono">ref · {error.digest}</p>}
        </div>
      </section>

      <DeviceFuss />
    </div>
  );
}
