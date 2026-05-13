"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * SplitStatement · full-width lila slab · dark text + lime accent auf "persönlich."
 */

const LILA = "#b084d3";

const DICT: Record<
  Locale,
  {
    kicker: string;
    h1: string;
    h2muted: string;
    h3: string;
    h4highlight: string;
    body: string;
    ctaMore: string;
  }
> = {
  de: {
    kicker: "· was ich glaube",
    h1: "ein mensch.",
    h2muted: "kein team.",
    h3: "und ich nehm's",
    h4highlight: "persönlich.",
    body: "kein ticket-tool, keine zwischenschicht, kein agentur-höflichkeits-ping-pong. du schreibst mir, ich antworte · meistens in unter 2h.",
    ctaMore: "mehr über mich →",
  },
  fr: {
    kicker: "· ce que je crois",
    h1: "un humain.",
    h2muted: "pas une équipe.",
    h3: "et je le prends",
    h4highlight: "personnellement.",
    body: "pas d'outil de tickets, pas d'intermédiaire, pas de politesse d'agence en ping-pong. tu m'écris, je réponds · le plus souvent en moins de 2h.",
    ctaMore: "en savoir plus →",
  },
  en: {
    kicker: "· what i believe",
    h1: "one person.",
    h2muted: "not a team.",
    h3: "and i take it",
    h4highlight: "personally.",
    body: "no ticket tool, no middle layer, no agency-politeness ping-pong. you write, i answer · usually within 2h.",
    ctaMore: "more about me →",
  },
};

export function SplitStatement() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section
      className="relative py-24 md:py-32 lg:py-40 text-[#0a0a0a] overflow-hidden"
      style={{ background: LILA }}
      aria-label={t.kicker}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-site relative">
        <h2 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] font-black tracking-[-0.035em] text-[#0a0a0a] max-w-[1100px]">
          {t.h1}
          <br />
          <span
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {t.h2muted}
          </span>
          <br />
          {t.h3}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{t.h4highlight}</span>
            {/* lime swash underneath · gibt das wort gewicht ohne harten
               dark-block zu sein · sitzt unter der x-höhe */}
            <span
              aria-hidden
              className="absolute left-[-0.04em] right-[-0.04em] bottom-[0.1em] h-[0.3em] z-0"
              style={{
                background: "#e1fd52",
                transform: "skewX(-6deg)",
              }}
            />
          </span>
        </h2>
        <p className="mt-10 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-[#0a0a0a]/85">
          {t.body}
        </p>
        <Link
          href={buildPath("ueber-mich", locale)}
          className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-[#0a0a0a] border-b border-[#0a0a0a]/40 hover:border-[#0a0a0a] pb-1 transition-colors"
        >
          {t.ctaMore}
        </Link>
      </div>
    </section>
  );
}
