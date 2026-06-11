"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * ContentCoreDeepDive v2 · kompakte feature-rows statt card-friedhof.
 *
 * vorher: 10 weiße glass-cards gestapelt (sprint-4-design) · jetzt:
 * 6 kuratierte features als 2-col text-rows im vertiefungs-stil ·
 * "kurz und knackig" (nicolas) · newsletter-feature existiert nicht
 * mehr und wird nicht erwähnt.
 */

type Feature = { titel: string; beschreibung: string; stichwort: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  features: Feature[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was contentcore kann",
    h2pre: "ein system.",
    h2post: "alles drin, was du brauchst.",
    intro:
      "Kein Shopify für den Shop, kein WPML für die Übersetzung, kein Analytics-Dschungel für die Statistik. Alles an einem Ort, alles aufeinander abgestimmt, alles von mir gewartet.",
    features: [
      {
        titel: "KI, die mitliest",
        stichwort: "intelligenz",
        beschreibung:
          "Foto hochladen · die KI beschreibt automatisch, was drauf ist, in allen Sprachen. Google dankt, Screenreader auch.",
      },
      {
        titel: "ein klick übersetzt alles",
        stichwort: "mehrsprachig",
        beschreibung:
          "DE, FR, EN · die KI macht den groben Wurf, du schleifst nach. Jede Sprache mit eigener URL und eigenem SEO.",
      },
      {
        titel: "bilder optimieren sich selbst",
        stichwort: "performance",
        beschreibung:
          "Hochladen, fertig. WebP-Konvertierung, fünf Größen von Handy bis Desktop · automatisch.",
      },
      {
        titel: "shop ohne shopify",
        stichwort: "verkauf",
        beschreibung:
          "Produkte, Varianten, Stripe-Checkout mit Apple Pay und SEPA. 1,5% + 25 Cent pro Transaktion, keine Grundgebühr.",
      },
      {
        titel: "dein branding, nicht meins",
        stichwort: "white-label",
        beschreibung:
          "Im CMS siehst du dein Logo, deine Farben, deinen Namen. „ContentCore“ taucht nirgends auf.",
      },
      {
        titel: "statistiken ohne spionage",
        stichwort: "ehrlich",
        beschreibung:
          "Keine Cookies, kein Google Analytics, kein Banner. Trotzdem: Besucher, Top-Seiten, Herkunft · DSGVO-sauber.",
      },
    ],
  },
  fr: {
    sectionLabel: "ce que contentcore sait faire",
    h2pre: "un système.",
    h2post: "tout ce qu'il te faut, dedans.",
    intro:
      "Pas de Shopify pour le shop, pas de WPML pour la traduction, pas de jungle Analytics pour les stats. Tout au même endroit, tout cohérent, tout maintenu par moi.",
    features: [
      {
        titel: "une IA qui lit avec toi",
        stichwort: "intelligence",
        beschreibung:
          "Tu charges une photo · l'IA décrit automatiquement ce qu'on y voit, dans toutes les langues. Google apprécie, les lecteurs d'écran aussi.",
      },
      {
        titel: "un clic traduit tout",
        stichwort: "multilingue",
        beschreibung:
          "DE, FR, EN · l'IA fait le premier jet, tu peaufines. Chaque langue avec sa propre URL et son propre SEO.",
      },
      {
        titel: "les images s'optimisent seules",
        stichwort: "performance",
        beschreibung:
          "Charger, terminé. Conversion WebP, cinq tailles du mobile au desktop · automatique.",
      },
      {
        titel: "shop sans shopify",
        stichwort: "vente",
        beschreibung:
          "Produits, variantes, checkout Stripe avec Apple Pay et SEPA. 1,5% + 25 cents par transaction, pas d'abonnement.",
      },
      {
        titel: "ton branding, pas le mien",
        stichwort: "white-label",
        beschreibung:
          "Dans le CMS tu vois ton logo, tes couleurs, ton nom. « ContentCore » n'apparaît nulle part.",
      },
      {
        titel: "des stats sans espionnage",
        stichwort: "honnête",
        beschreibung:
          "Pas de cookies, pas de Google Analytics, pas de bannière. Quand même : visiteurs, top pages, origine · propre RGPD.",
      },
    ],
  },
  en: {
    sectionLabel: "what contentcore does",
    h2pre: "one system.",
    h2post: "everything you need, inside.",
    intro:
      "No Shopify for the shop, no WPML for translation, no analytics jungle for stats. All in one place, all coherent, all maintained by me.",
    features: [
      {
        titel: "AI that reads along",
        stichwort: "intelligence",
        beschreibung:
          "Upload a photo · the AI automatically describes what's on it, in every language. Google approves, screen readers too.",
      },
      {
        titel: "one click translates everything",
        stichwort: "multilingual",
        beschreibung:
          "DE, FR, EN · the AI does the rough draft, you polish. Each language with its own URL and its own SEO.",
      },
      {
        titel: "images optimize themselves",
        stichwort: "performance",
        beschreibung:
          "Upload, done. WebP conversion, five sizes from phone to desktop · automatic.",
      },
      {
        titel: "shop without shopify",
        stichwort: "sales",
        beschreibung:
          "Products, variants, Stripe checkout with Apple Pay and SEPA. 1.5% + 25 cents per transaction, no base fee.",
      },
      {
        titel: "your branding, not mine",
        stichwort: "white-label",
        beschreibung:
          "In the CMS you see your logo, your colours, your name. “ContentCore” appears nowhere.",
      },
      {
        titel: "stats without spying",
        stichwort: "honest",
        beschreibung:
          "No cookies, no Google Analytics, no banner. Still: visitors, top pages, origin · GDPR-clean.",
      },
    ],
  },
};

export function ContentCoreDeepDive({ num = "07" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="py-20 md:py-24">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-offwhite leading-[1.05]">
            {t.h2pre} <span className="text-offwhite/45">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/70">
            {t.intro}
          </p>
        </div>

        {/* feature-rows · 2-col text-grid · gleiche sprache wie
            vertiefungs-links · kein card-friedhof */}
        <div className="mt-12 grid md:grid-cols-2 gap-x-10 border-t-2 border-[#0a0a0a]/15">
          {t.features.map((f) => (
            <div
              key={f.stichwort}
              className="py-7 border-b-2 border-[#0a0a0a]/15"
            >
              <span className="font-mono text-[9px] uppercase tracking-label text-[#0a0a0a]/45">
                · {f.stichwort}
              </span>
              <h3 className="mt-2 heading-sans text-[18px] md:text-[20px] text-[#0a0a0a] leading-tight">
                {f.titel}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#0a0a0a]/65 max-w-[440px]">
                {f.beschreibung}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
