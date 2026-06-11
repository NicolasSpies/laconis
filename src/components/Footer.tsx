"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { AnchorMantra } from "./shared/AnchorMantra";
import { CarbonBadge } from "./shared/CarbonBadge";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

const DICT: Record<
  Locale,
  {
    signed: string;
    laconisGloss: string;
    impressum: string;
    datenschutz: string;
    title: string;
    ariaSigned: string;
    ariaLaconic: string;
  }
> = {
  de: {
    signed: "by Nicolas Spies",
    laconisGloss: "lakonisch · knapp gesagt, viel gemeint",
    impressum: "impressum",
    datenschutz: "datenschutz",
    title: "Von Hand · Nicolas Spies",
    ariaSigned: "signiert von Nicolas Spies",
    ariaLaconic: "wortbedeutung lakonisch",
  },
  fr: {
    signed: "par Nicolas Spies",
    laconisGloss: "laconique · peu de mots, beaucoup de sens",
    impressum: "mentions légales",
    datenschutz: "confidentialité",
    title: "Fait main · Nicolas Spies",
    ariaSigned: "signé par Nicolas Spies",
    ariaLaconic: "définition de laconique",
  },
  en: {
    signed: "by Nicolas Spies",
    laconisGloss: "laconic · few words, much meaning",
    impressum: "legal notice",
    datenschutz: "privacy",
    title: "Made by hand · Nicolas Spies",
    ariaSigned: "signed by Nicolas Spies",
    ariaLaconic: "definition of laconic",
  },
};

export function Footer() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <footer
      data-theme="dark"
      className="relative z-10 bg-dark border-t border-ink/5 text-offwhite"
    >
      <div className="container-site pt-8 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Logo size="md" variant="lime" />
            {/* anchor-mantra · ersetzt das alte hardcoded slogan-string
                · gleiche worte, aber animiert + sitewide konsistent */}
            <AnchorMantra variant="stamp" />
          </div>

          {/* handwritten signature · wie am ende eines briefes
              · kleine fußnote drunter erklärt den namen subtil */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <span
              className="flex items-baseline gap-2 text-accent-ink select-none"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: "24px",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                transform: "rotate(-3deg)",
              }}
              aria-label={t.ariaSigned}
              title={t.title}
            >
              <span aria-hidden className="text-offwhite/35 text-[16px]">
                ~
              </span>
              {t.signed}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 select-none"
              aria-label={t.ariaLaconic}
            >
              {t.laconisGloss}
            </span>
          </div>
        </div>

        {/* bottom row · copyright + carbon-badge + legal links */}
        <div className="mt-6 pt-4 border-t border-ink/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[10px] text-offwhite/55 uppercase tracking-mono">
          <span>© 2026 lacønis</span>
          {/* trust-marker · co2 pro view · click → modal */}
          <CarbonBadge className="text-offwhite/55" />
          <div className="flex gap-5">
            <Link className="link-draw" href={buildPath("impressum", locale)}>
              {t.impressum}
            </Link>
            <Link className="link-draw" href={buildPath("datenschutz", locale)}>
              {t.datenschutz}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
