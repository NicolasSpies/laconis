"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * ServicesSplit · web-lead als BENTO (nicolas: "konzept 2").
 *
 * statt einer flachen lime-platte ein modulares raster · kein leerraum,
 * jede kachel trägt was:
 *   - WEB · großes dunkles anker-tile (lime "web." + no-limits-statement)
 *   - PROOF · lime · die harten zahlen (95+ pagespeed …)
 *   - ANSATZ · lila · vier schritte, keine blackbox (link auf /ansatz)
 *   - CAPABILITIES · dunkles band mit laufender marquee ("alles machbar")
 *
 * web-only-positionierung (juni 2026): branding hat KEINE kachel mehr ·
 * es lebt nur als "auch mal ein logo" nebenbei in der marquee. die
 * /leistungen/branding-seite bleibt still erreichbar (footer).
 */

const LILA = "#b084d3";
const LIME = "#e1fd52";

type Dict = {
  webStatement: string;
  webCta: string;
  proofValue: string;
  proofLabel: string;
  proofWords: string[];
  caps: string[];
  ansatzTitle: string;
  ansatzLine: string;
  ansatzCta: string;
  ariaLabel: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    webStatement:
      "von null gebaut · kein template, keine WordPress-grenzen. genau das, was du wirklich brauchst · nicht was die vorlage hergibt.",
    webCta: "alles über web",
    proofValue: "95+",
    proofLabel: "pagespeed mobil",
    proofWords: ["eigenes cms", "seo ab tag eins", "0.8s ladezeit"],
    caps: [
      "onlineshop",
      "buchungssystem",
      "konfigurator",
      "mehrsprachig",
      "dashboard",
      "mitgliederbereich",
      "api-anbindung",
      "live-animationen",
      "portal",
      "auch mal ein logo",
      "was du brauchst",
    ],
    ansatzTitle: "vier schritte.",
    ansatzLine: "kennenlernen · richtung · bauen · übergabe. keine blackbox, keine funkstille.",
    ansatzCta: "so arbeite ich",
    ariaLabel: "web von null · vier schritte",
  },
  fr: {
    webStatement:
      "construit de zéro · pas de template, pas de limites WordPress. exactement ce dont tu as besoin · pas ce que le modèle permet.",
    webCta: "tout sur le web",
    proofValue: "95+",
    proofLabel: "pagespeed mobile",
    proofWords: ["cms maison", "seo dès le jour un", "0.8s de chargement"],
    caps: [
      "boutique en ligne",
      "réservation",
      "configurateur",
      "multilingue",
      "dashboard",
      "espace membres",
      "connexion api",
      "animations live",
      "portail",
      "un logo au passage",
      "ce dont tu as besoin",
    ],
    ansatzTitle: "quatre étapes.",
    ansatzLine: "rencontre · direction · construction · livraison. pas de boîte noire, pas de silence radio.",
    ansatzCta: "ma façon de bosser",
    ariaLabel: "web de zéro · quatre étapes",
  },
  en: {
    webStatement:
      "built from scratch · no template, no WordPress limits. exactly what you really need · not what the template allows.",
    webCta: "all about web",
    proofValue: "95+",
    proofLabel: "pagespeed mobile",
    proofWords: ["in-house cms", "seo from day one", "0.8s load time"],
    caps: [
      "online shop",
      "booking system",
      "configurator",
      "multilingual",
      "dashboard",
      "member area",
      "api integration",
      "live animations",
      "portal",
      "the odd logo, too",
      "whatever you need",
    ],
    ansatzTitle: "four steps.",
    ansatzLine: "meet · direction · build · handover. no black box, no radio silence.",
    ansatzCta: "how i work",
    ariaLabel: "web from scratch · four steps",
  },
};

/** endlos-marquee · zwei identische kopien → nahtloser css-loop */
function Marquee({ items, duration = 36 }: { items: string[]; duration?: number }) {
  const Copy = (
    <span className="flex shrink-0 items-center">
      {items.map((w, i) => (
        <span key={i} className="flex items-center">
          {w}
          <span aria-hidden className="px-4 md:px-5 font-light" style={{ color: LILA }}>
            ·
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap select-none" aria-hidden>
      <div
        className="marquee-track flex shrink-0 whitespace-nowrap font-display font-black lowercase tracking-[-0.02em] text-title text-offwhite will-change-transform"
        style={{ animation: `marqueeX ${duration}s linear infinite` }}
      >
        {Copy}
        {Copy}
      </div>
    </div>
  );
}

export function ServicesSplit() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="relative -mt-6 md:-mt-16 pb-12 md:pb-20" aria-label={t.ariaLabel}>
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:[grid-template-rows:minmax(200px,1fr)_minmax(200px,1fr)_auto]">
          {/* ─── WEB · großes dunkles anker-tile ─── */}
          <Link
            href={buildPath("leistung", locale)}
            data-theme="dark"
            className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-7 md:p-9 flex flex-col justify-between min-h-[340px] md:min-h-0 md:col-span-2 md:row-span-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
              · leistung
            </span>
            <div>
              <span
                className="block font-display font-black lowercase leading-[0.82] tracking-[-0.045em] text-display-xl"
                style={{ color: LIME }}
              >
                web.
              </span>
              <p className="mt-5 max-w-[460px] font-display font-light lowercase text-lead leading-[1.2] tracking-[-0.01em] text-offwhite/80">
                {t.webStatement}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-offwhite">
                {t.webCta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* ─── PROOF · lime ─── */}
          <div className="rounded-2xl bg-[#e1fd52] text-[#0a0a0a] p-7 flex flex-col justify-between min-h-[180px] md:min-h-0 md:col-start-3 md:row-start-1">
            <div>
              <span className="font-display font-black leading-none tracking-[-0.04em] text-display">
                {t.proofValue}
              </span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.proofLabel}
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {t.proofWords.map((w) => (
                <li key={w} className="font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/70">
                  · {w}
                </li>
              ))}
            </ul>
          </div>

          {/* ─── ABLAUF · lila · vier schritte (anker auf /leistungen/web) ─── */}
          <Link
            href={`${buildPath("leistung", locale)}#ablauf`}
            scroll={false}
            className="group rounded-2xl p-7 flex flex-col justify-between min-h-[180px] md:min-h-0 md:col-start-3 md:row-start-2 text-[#0a0a0a]"
            style={{ background: LILA }}
          >
            <span className="font-display font-black lowercase leading-none tracking-[-0.03em] text-title">
              {t.ansatzTitle}
            </span>
            <div>
              <p className="text-body-sm md:text-body leading-snug text-[#0a0a0a]/75 max-w-[260px]">
                {t.ansatzLine}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label">
                {t.ansatzCta}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* ─── CAPABILITIES · dunkles marquee-band ─── */}
          <div
            data-theme="dark"
            className="rounded-2xl bg-[#0a0a0a] py-5 md:py-6 overflow-hidden flex items-center md:col-span-3 md:row-start-3"
          >
            <Marquee items={t.caps} />
          </div>
        </div>
      </div>
    </section>
  );
}
