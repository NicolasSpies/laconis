"use client";

import Link from "next/link";
import { ReferenzenIndex } from "@/components/referenzen/ReferenzenIndex";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * HomeCases · referenzen-teaser für die startseite (phase "großputz").
 *
 * v2: dark slab (nicolas: "farbig mit dem schwarzen bg hervorheben") ·
 * der editorial index liegt auf #0a0a0a wie die CTA-slabs, die
 * case-previews + lime-hover poppen auf schwarz deutlich mehr.
 * auf /referenzen bleibt derselbe index light.
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
    <section
      data-theme="dark"
      className="relative bg-[#0a0a0a] py-14 md:py-20 overflow-hidden"
    >
      {/* zarter dot-grid wie auf den CTA-slabs */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(242,242,242,0.5) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-site relative">
        <p className="font-mono text-[10px] uppercase tracking-label text-[#b084d3]">
          · {t.label}
        </p>
      </div>

      <div className="relative">
        <ReferenzenIndex limit={3} tone="dark" />
      </div>

      <div className="container-site relative mt-2 md:mt-4">
        <Link
          href={buildPath("referenzen", locale)}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#e1fd52] text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
        >
          {t.cta} →
        </Link>
      </div>
    </section>
  );
}
