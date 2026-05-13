"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { CONTACT } from "@/config/contact";

/**
 * ContactBlock · light grey + lime CTA · closing-section auf der home.
 *
 * ersetzt den ehemaligen KontaktStrip · jetzt klar lesbar (light bg statt
 * dark) mit subtilem lime-tint im hintergrund. dense chip-grid mit kontakt-
 * meta. primary CTA dark mit lime, secondary lila als sanfter akzent.
 *
 * lila integration: secondary CTA optional in lila statt nur outline.
 */

const DICT: Record<
  Locale,
  {
    kicker: string;
    h1: string;
    intro: string;
    chips: { label: string; value: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
    footerLeft: string;
    footerRight: string;
  }
> = {
  de: {
    kicker: "· ready, wenn du bist",
    h1: "lass starten.",
    intro:
      "gespräche sind immer kostenlos · ca. 30 minuten · kein deck, kein verkauf · nur fragen + klarheit.",
    chips: [
      { label: "schreiben", value: CONTACT.email },
      { label: "anrufen", value: CONTACT.phone },
      { label: "antwortzeit", value: "ø < 2h werktags" },
    ],
    ctaPrimary: "projekt starten →",
    ctaSecondary: "preise ansehen",
    footerLeft: "· laconis · solo studio · eupen · 2026 ·",
    footerRight: "DE · FR · EN",
  },
  fr: {
    kicker: "· prêt, quand tu l'es",
    h1: "on commence.",
    intro:
      "les conversations sont toujours gratuites · env. 30 min · pas de deck, pas de vente · juste des questions + clarté.",
    chips: [
      { label: "écrire", value: CONTACT.email },
      { label: "appeler", value: CONTACT.phone },
      { label: "délai de réponse", value: "ø < 2h jours ouvrés" },
    ],
    ctaPrimary: "démarrer un projet →",
    ctaSecondary: "voir les prix",
    footerLeft: "· laconis · solo studio · eupen · 2026 ·",
    footerRight: "DE · FR · EN",
  },
  en: {
    kicker: "· ready when you are",
    h1: "let's start.",
    intro:
      "always free · ~30 min · no deck, no pitch · just questions + clarity on whether we fit.",
    chips: [
      { label: "write", value: CONTACT.email },
      { label: "call", value: CONTACT.phone },
      { label: "response time", value: "ø < 2h on workdays" },
    ],
    ctaPrimary: "start a project →",
    ctaSecondary: "see pricing",
    footerLeft: "· laconis · solo studio · eupen · 2026 ·",
    footerRight: "DE · FR · EN",
  },
};

export function ContactBlock() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#c8c8c8" }}
      aria-label={t.h1}
    >
      {/* subtle lime tint */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(225,253,82,0.18) 0%, transparent 70%)",
        }}
      />
      {/* dot-grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.5) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-site relative">
        <h2 className="text-[clamp(3rem,9vw,8rem)] leading-[0.88] font-black tracking-[-0.04em] text-[#0a0a0a]">
          {t.h1}
        </h2>
        <p className="mt-8 max-w-[520px] text-[15px] leading-relaxed text-[#0a0a0a]/80">
          {t.intro}
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[720px]">
          {t.chips.map((s) => (
            <div key={s.label} className="border-t-2 border-[#0a0a0a]/15 pt-3">
              <div className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/70">
                {s.label}
              </div>
              <div className="mt-1 text-[14px] text-[#0a0a0a] break-words">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            href={`${buildPath("kontakt", locale)}#projekt`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
          >
            {t.ctaPrimary}
          </Link>
          {/* secondary CTA · subtiler lila-akzent · border + hover-fill */}
          <Link
            href={buildPath("preise", locale)}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#b084d3] text-[#0a0a0a] hover:bg-[#b084d3] hover:text-[#0a0a0a] transition-colors"
          >
            {t.ctaSecondary}
          </Link>
        </div>

      </div>
    </section>
  );
}
