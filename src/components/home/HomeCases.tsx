"use client";

import Link from "next/link";
import { ReferenzenIndex } from "@/components/referenzen/ReferenzenIndex";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * HomeCases · referenzen-teaser für die startseite (phase "großputz").
 *
 * ersetzt das scroll-gejackte dark-panel (HorizontalCases): der
 * editorial index mit cursor-follower (das beste interaktions-element
 * der seite) zeigt die top-3 cases · normal scrollbar, kein festhängen.
 */

const DICT: Record<Locale, { label: string; cta: string }> = {
  de: { label: "ausgewählte arbeiten", cta: "alle referenzen" },
  fr: { label: "travaux sélectionnés", cta: "toutes les références" },
  en: { label: "selected work", cta: "all work" },
};

export function HomeCases() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="py-8 md:py-12">
      <div className="container-site">
        <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
          · {t.label}
        </p>
      </div>
      <ReferenzenIndex limit={3} />
      <div className="container-site -mt-8 md:-mt-12">
        <Link
          href={buildPath("referenzen", locale)}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a]/25 text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
        >
          {t.cta} →
        </Link>
      </div>
    </section>
  );
}
