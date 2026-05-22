"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * BrandingBento · ein bento-grid statt 2 separate sections (Deliverables +
 * OnDemandExtras). 6-col grid, 5 cards mit mixed sizes und unique visuals.
 *
 * - Row 1 · 3 paper-cards mit den hauptpaketen (col-span 2 each)
 *   visuals: big ø-mark, color-swatches, business-card-mockup
 * - Row 2 · 2 extras-cards (col-span 3 each)
 *   "digital" als dark-card, "print" als lila-card
 */

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  paket1Label: string;
  paket1Title: string;
  paket1Body: string;
  paket1Tags: string[];
  paket2Label: string;
  paket2Title: string;
  paket2Body: string;
  paket3Label: string;
  paket3Title: string;
  paket3Body: string;
  extrasHint: string;
  digitalLabel: string;
  digitalItems: string[];
  printLabel: string;
  printItems: string[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was du bekommst",
    h2pre: "drei pakete,",
    h2post: "sauber übergeben.",
    intro:
      "Keine Nachlieferungen per E-Mail, kein „Ach, die Datei schicke ich dir morgen“. Am Übergabetag hast du alles · in einem geteilten Ordner, print-ready und web-ready.",
    paket1Label: "paket · 01",
    paket1Title: "logo-paket",
    paket1Body: "alle formate, alle fälle.",
    paket1Tags: ["svg", "png", "pdf druck", "favicon", "monogramm"],
    paket2Label: "paket · 02",
    paket2Title: "brand guide",
    paket2Body: "farben, typo, ton. das manual für dich + alle anderen.",
    paket3Label: "paket · 03",
    paket3Title: "print + web set",
    paket3Body: "visitenkarte, briefpapier, signatur, social-posts.",
    extrasHint: "und einzeln zubuchbar:",
    digitalLabel: "digital",
    digitalItems: [
      "erweiterter brand guide",
      "social-templates",
      "banner · ads",
      "newsletter-header",
      "präsentationen",
      "icons · piktogramme",
      "infografiken",
    ],
    printLabel: "drucksachen",
    printItems: [
      "flyer",
      "broschüre",
      "plakat",
      "roll-up",
      "speisekarte",
      "aufkleber",
      "visitenkarten-nachdruck",
    ],
  },
  fr: {
    sectionLabel: "ce que tu reçois",
    h2pre: "trois packs,",
    h2post: "livrés proprement.",
    intro:
      "Pas de livraisons par e-mail à la rallonge, pas de « ah, le fichier je te l'envoie demain ». Le jour de la livraison tu as tout · dans un dossier partagé, prêt-à-imprimer et prêt-pour-le-web.",
    paket1Label: "pack · 01",
    paket1Title: "pack logo",
    paket1Body: "tous les formats, tous les cas.",
    paket1Tags: ["svg", "png", "pdf print", "favicon", "monogramme"],
    paket2Label: "pack · 02",
    paket2Title: "brand guide",
    paket2Body: "couleurs, typo, ton. le manuel pour toi et les autres.",
    paket3Label: "pack · 03",
    paket3Title: "set print + web",
    paket3Body: "carte de visite, papier à lettre, signature, posts.",
    extrasHint: "et à la carte :",
    digitalLabel: "digital",
    digitalItems: [
      "brand guide étendu",
      "templates social",
      "bannières · ads",
      "header newsletter",
      "présentations",
      "icônes · pictogrammes",
      "infographies",
    ],
    printLabel: "imprimés",
    printItems: [
      "flyer",
      "brochure",
      "affiche",
      "roll-up",
      "menu",
      "stickers",
      "réimpression cartes de visite",
    ],
  },
  en: {
    sectionLabel: "what you get",
    h2pre: "three packs,",
    h2post: "cleanly delivered.",
    intro:
      "No follow-up files by e-mail, no “oh, i'll send that one tomorrow”. On handover day you've got everything · in a shared folder, print-ready and web-ready.",
    paket1Label: "pack · 01",
    paket1Title: "logo pack",
    paket1Body: "all formats, every situation.",
    paket1Tags: ["svg", "png", "pdf print", "favicon", "monogram"],
    paket2Label: "pack · 02",
    paket2Title: "brand guide",
    paket2Body: "colours, typography, tone. manual for you + everyone else.",
    paket3Label: "pack · 03",
    paket3Title: "print + web set",
    paket3Body: "business card, letterhead, signature, social posts.",
    extrasHint: "and à la carte:",
    digitalLabel: "digital",
    digitalItems: [
      "extended brand guide",
      "social templates",
      "banners · ads",
      "newsletter header",
      "presentations",
      "icons · pictograms",
      "infographics",
    ],
    printLabel: "print",
    printItems: [
      "flyer",
      "brochure",
      "poster",
      "roll-up",
      "menu",
      "stickers",
      "business card reprint",
    ],
  },
};

const LILA = "#b084d3";

export function BrandingBento({ num = "04" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="pb-16 md:pb-20 overflow-hidden">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            {t.h2pre} <span className="text-offwhite/45">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/70">
            {t.intro}
          </p>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-6 gap-3 md:gap-4">
          {/* ─── ROW 1 · 3 paper-cards mit pakete ─── */}

          {/* card 1 · logo-paket · big ø mark */}
          <article className="col-span-full sm:col-span-3 lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#f2f2f2] border border-[#0a0a0a]/10 p-7 md:p-8 min-h-[260px] flex flex-col justify-between">
            <div className="relative h-24 flex items-center justify-center">
              <span
                aria-hidden
                className="font-black leading-none select-none"
                style={{
                  fontSize: "clamp(72px, 9vw, 110px)",
                  color: LILA,
                  letterSpacing: "-0.06em",
                }}
              >
                ø
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.paket1Label}
              </span>
              <h3 className="mt-1.5 text-[20px] md:text-[22px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-tight">
                {t.paket1Title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#0a0a0a]/70">
                {t.paket1Body}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.paket1Tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9.5px] uppercase tracking-label text-[#0a0a0a]/65 border border-[#0a0a0a]/15 rounded-sm px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* card 2 · brand guide · color swatches + typo */}
          <article className="col-span-full sm:col-span-3 lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#f2f2f2] border border-[#0a0a0a]/10 p-7 md:p-8 min-h-[260px] flex flex-col justify-between">
            <div className="space-y-3">
              {/* color swatches row */}
              <div className="flex gap-1.5">
                {[
                  { bg: "#e1fd52", label: "lime" },
                  { bg: "#0a0a0a", label: "dark" },
                  { bg: "#b084d3", label: "lila" },
                  { bg: "#c8c8c8", label: "grey" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 aspect-square rounded-sm border border-[#0a0a0a]/8"
                    style={{ background: s.bg }}
                    aria-label={s.label}
                  />
                ))}
              </div>
              {/* typo sample */}
              <div className="font-black text-[#0a0a0a] tracking-[-0.04em] leading-[0.9]">
                <div className="text-[clamp(2rem,3.6vw,2.6rem)]">Aa</div>
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.paket2Label}
              </span>
              <h3 className="mt-1.5 text-[20px] md:text-[22px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-tight">
                {t.paket2Title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#0a0a0a]/70">
                {t.paket2Body}
              </p>
            </div>
          </article>

          {/* card 3 · print + web · mini business-card mockup */}
          <article className="col-span-full sm:col-span-6 lg:col-span-2 relative rounded-2xl overflow-hidden bg-[#f2f2f2] border border-[#0a0a0a]/10 p-7 md:p-8 min-h-[260px] flex flex-col justify-between">
            <div className="relative h-24 flex items-center justify-center">
              {/* business card mockup */}
              <div
                className="absolute"
                style={{
                  width: 130,
                  height: 78,
                  background: "#0a0a0a",
                  borderRadius: 4,
                  transform: "rotate(-6deg)",
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.18)",
                }}
              >
                <div className="p-3 text-[#e1fd52]">
                  <span
                    className="block font-black leading-none"
                    style={{ fontSize: 13, letterSpacing: "-0.04em" }}
                  >
                    lacønis
                  </span>
                  <span
                    className="block font-mono text-[#f2f2f2]/60 mt-1.5"
                    style={{ fontSize: 7, letterSpacing: "0.05em" }}
                  >
                    NICOLAS · 0488 43 91 47
                  </span>
                </div>
              </div>
              <div
                className="absolute"
                style={{
                  width: 130,
                  height: 78,
                  background: "#f2f2f2",
                  border: "1px solid rgba(10,10,10,0.15)",
                  borderRadius: 4,
                  transform: "translate(28px, 14px) rotate(4deg)",
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
                }}
              >
                <div className="p-3">
                  <span
                    className="block font-black leading-none text-[#0a0a0a]"
                    style={{ fontSize: 13, letterSpacing: "-0.04em" }}
                  >
                    lacønis
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.paket3Label}
              </span>
              <h3 className="mt-1.5 text-[20px] md:text-[22px] font-black text-[#0a0a0a] tracking-[-0.02em] leading-tight">
                {t.paket3Title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#0a0a0a]/70">
                {t.paket3Body}
              </p>
            </div>
          </article>

          {/* ─── ROW 2 · 2 extras-cards ─── */}

          {/* digital extras · dark card */}
          <article className="col-span-full lg:col-span-3 relative rounded-2xl overflow-hidden bg-[#0a0a0a] p-7 md:p-8 min-h-[260px] flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-black text-[20px] md:text-[22px] text-[#f2f2f2] tracking-[-0.02em] leading-tight">
                {t.digitalLabel}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#e1fd52]/80">
                {t.extrasHint}
              </span>
            </div>
            <ul className="mt-5 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 content-start">
              {t.digitalItems.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2 text-[13px] leading-relaxed text-[#f2f2f2]/80"
                >
                  <span className="text-[#e1fd52]/60 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* print extras · lila card */}
          <article
            className="col-span-full lg:col-span-3 relative rounded-2xl overflow-hidden p-7 md:p-8 min-h-[260px] flex flex-col"
            style={{ background: LILA }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-black text-[20px] md:text-[22px] text-[#0a0a0a] tracking-[-0.02em] leading-tight">
                {t.printLabel}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/65">
                {t.extrasHint}
              </span>
            </div>
            <ul className="mt-5 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 content-start">
              {t.printItems.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2 text-[13px] leading-relaxed text-[#0a0a0a]/80"
                >
                  <span className="text-[#0a0a0a]/40 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
