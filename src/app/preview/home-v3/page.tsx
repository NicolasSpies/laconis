import Link from "next/link";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { CONTACT } from "@/config/contact";

/**
 * /preview/home-v3 · radikal simpel.
 * hero → fix/solo/direkt → cases → kontakt.
 * CI: #c8c8c8 · #0a0a0a · #b084d3 · #e1fd52.
 */

const HorizontalCases = dynamic(
  () =>
    import("@/components/home/HorizontalCases").then((m) => m.HorizontalCases),
  { loading: () => <div aria-hidden style={{ minHeight: 1200 }} /> },
);

/* ─── THREE PILLARS · grau · fix / solo / direkt ─────────────────── */

type PillarDict = { word: string; sub: string };

const PILLARS: Record<Locale, PillarDict[]> = {
  de: [
    { word: "fix.", sub: "kein stundensatz · ein preis von anfang an." },
    { word: "solo.", sub: "ein kontakt · kein agentur-layer dazwischen." },
    { word: "direkt.", sub: "von brief bis launch · kein endlos-prozess." },
  ],
  fr: [
    { word: "fixe.", sub: "pas de taux horaire · un prix dès le départ." },
    { word: "solo.", sub: "un contact · pas de couche d'agence." },
    { word: "direct.", sub: "du brief au launch · pas de processus infini." },
  ],
  en: [
    { word: "fixed.", sub: "no hourly rate · one price from the start." },
    { word: "solo.", sub: "one contact · no agency layer in between." },
    { word: "direct.", sub: "brief to launch · no endless process." },
  ],
};

const TILE_BG = ["#0a0a0a", "#b084d3", "#e1fd52"] as const;
const TILE_FG = ["#f2f2f2", "#0a0a0a", "#0a0a0a"] as const;

function ThreePillars({ locale }: { locale: Locale }) {
  const items = PILLARS[locale];
  return (
    <section
      className="py-12 md:py-16"
      style={{ background: "#c8c8c8" }}
      aria-label="approach"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 md:p-10 flex flex-col justify-between"
              style={{
                background: TILE_BG[i],
                color: TILE_FG[i],
                minHeight: "clamp(200px, 26vw, 300px)",
              }}
            >
              <p className="text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[0.9] font-black tracking-[-0.03em]">
                {item.word}
              </p>
              <p
                className="font-mono text-[11px] uppercase tracking-label"
                style={{ opacity: 0.6 }}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT · dark · email groß · kein theater ─────────────────── */

type ContactDict = { meta: string; cta: string };

const CONTACT_DICT: Record<Locale, ContactDict> = {
  de: {
    meta: "fixpreis · solo · unter 2h antwort · start montags",
    cta: "projekt starten →",
  },
  fr: {
    meta: "prix fixe · solo · réponse sous 2h · départ lundi",
    cta: "démarrer un projet →",
  },
  en: {
    meta: "fixed price · solo · reply under 2h · start mondays",
    cta: "start a project →",
  },
};

function ContactSection({ locale }: { locale: Locale }) {
  const t = CONTACT_DICT[locale];
  return (
    <section
      className="bg-[#0a0a0a] py-20 md:py-28"
      style={{ borderTop: "1px solid rgba(242,242,242,0.07)" }}
    >
      <div className="container-site">
        {/* meta · eine zeile, sehr klein */}
        <p
          className="font-mono text-[11px] uppercase tracking-label mb-10"
          style={{ color: "rgba(242,242,242,0.3)" }}
        >
          {t.meta}
        </p>

        {/* email + CTA · nebeneinander auf desktop */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="space-y-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="block font-black tracking-[-0.025em] text-[#f2f2f2] hover:text-[#e1fd52] transition-colors"
              style={{ fontSize: "clamp(1.6rem,4.5vw,3.8rem)", lineHeight: 1 }}
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="block font-mono text-[13px] transition-colors"
              style={{ color: "rgba(242,242,242,0.4)" }}
            >
              {CONTACT.phone}
            </a>
          </div>

          <Link
            href={`${buildPath("kontakt", locale)}#projekt`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#e1fd52] text-[#0a0a0a] hover:bg-[#b084d3] transition-colors shrink-0"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── page ────────────────────────────────────────────────────────── */

export default function HomeV3() {
  const locale = getLocale();
  return (
    <>
      <Hero />
      <ThreePillars locale={locale} />
      <div data-theme="dark" className="bg-dark text-[#f2f2f2]">
        <HorizontalCases />
      </div>
      <ContactSection locale={locale} />
    </>
  );
}
