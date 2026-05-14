"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { GooeyText } from "@/components/shared/GooeyText";

/**
 * SplitStatement · transparent grey section · gooey-cycling headline.
 *
 * 3 phrasen cyclen kontinuierlich:
 *   "ein mensch." → "kein team." → "und ich nehm's persönlich."
 * jede phrase morpht via feColorMatrix-threshold-filter in die nächste.
 * gleiche position, gleiche typo, gleiches gewicht · die bewegung ist
 * der visual hook der section.
 *
 * blobs scheinen im hintergrund durch · keine eigene bg-farbe mehr.
 */

const DICT: Record<
  Locale,
  {
    kicker: string;
    phrases: string[];
    body: string;
    ctaMore: string;
  }
> = {
  de: {
    kicker: "· was ich glaube",
    phrases: ["ein mensch", "kein team", "persönlich einfach."],
    body: "kein ticket-tool, keine zwischenschicht, kein agentur-höflichkeits-ping-pong. du schreibst mir, ich antworte · meistens in unter 2h.",
    ctaMore: "mehr über mich →",
  },
  fr: {
    kicker: "· ce que je crois",
    phrases: ["un humain", "pas une équipe", "simplement personnel."],
    body: "pas d'outil de tickets, pas d'intermédiaire, pas de politesse d'agence en ping-pong. tu m'écris, je réponds · le plus souvent en moins de 2h.",
    ctaMore: "en savoir plus →",
  },
  en: {
    kicker: "· what i believe",
    phrases: ["one person", "not a team", "simply personal."],
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
      aria-label={t.kicker}
    >
      <div className="container-site relative flex flex-col items-center text-center">
        {/* GooeyText cycling · zentriert, DM Sans black, dark text.
            container ist auf längste phrase fixed damit kein layout-jump. */}
        <h2 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] font-black tracking-[-0.035em] text-[#0a0a0a]">
          <GooeyText
            texts={t.phrases}
            morphTime={1.4}
            cooldownTime={1.8}
            fitTo="longest"
          />
        </h2>

        <p className="mt-12 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-[#0a0a0a]/85">
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
