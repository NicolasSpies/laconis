import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import "@/components/device/device.css";

/**
 * 404 · hier landet jeder alte indexierte link.
 *
 * bis august 2026 lief diese seite auf hellem grund, mit einem
 * lila handkritzel-SVG, einem 360-zeiligen CSS-quiz und — weil ihr
 * pfad nirgends erfasst war — mit der alten navigation plus altem
 * footer. handschrift und kritzel sind zwei der ausdrücklich
 * ausgeschlossenen dinge, und ausgerechnet auf der seite, die den
 * meisten fremden verkehr abbekommt.
 *
 * jetzt: dieselbe sprache wie der rest, und drei echte wege raus
 * statt eines spiels.
 */

const DICT: Record<
  Locale,
  { headline: string; note: string; start: string; arbeiten: string; kontakt: string; bug: string }
> = {
  de: {
    headline: "diese seite gibts nicht. die anderen schon.",
    note: "vielleicht ein tippfehler · vielleicht ein alter link · egal.",
    start: "zur startseite",
    arbeiten: "arbeiten ansehen",
    kontakt: "schreib mir",
    bug: "wenn du denkst, das ist ein bug · sag bescheid",
  },
  fr: {
    headline: "cette page n'existe pas. les autres oui.",
    note: "peut-être une faute de frappe · peut-être un vieux lien · peu importe.",
    start: "vers l'accueil",
    arbeiten: "voir les travaux",
    kontakt: "écris-moi",
    bug: "si tu penses que c'est un bug · fais-le savoir",
  },
  en: {
    headline: "this page doesn't exist. the others do.",
    note: "maybe a typo · maybe an old link · doesn't matter.",
    start: "to the home page",
    arbeiten: "see the work",
    kontakt: "write to me",
    bug: "if you think this is a bug · let me know",
  },
};

export default function NotFound() {
  const locale = getLocale();
  const t = DICT[locale] ?? DICT.de;

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
            4<span style={{ color: "#e1fd52" }}>0</span>4
          </p>

          <h1 className="lab-display lab-boot mt-6 max-w-[16ch] text-display">{t.headline}</h1>

          <p className="mt-6 max-w-measure-lead text-lead text-[var(--tx-3)]">{t.note}</p>

          <div className="mt-rh-s flex flex-wrap items-center gap-5">
            <Link href={buildPath("home", locale)} className="lab-cta">
              {t.start}
            </Link>
            <Link href={buildPath("referenzen", locale)} className="lab-cta lab-cta--leise">
              {t.arbeiten}
            </Link>
            <Link href={buildPath("kontakt", locale)} className="lab-link">
              {t.kontakt}
            </Link>
          </div>

          <p className="lab-hint mt-rh-s">{t.bug}</p>
        </div>
      </section>

      <DeviceFuss />
    </div>
  );
}
