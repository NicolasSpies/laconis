"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * ServicesSplit · ersetzt die ServicesMorph-cards (nicolas: "man kann
 * nicht sagen dass das interessant aussieht").
 *
 * konzept: KEINE cards · der viewport selbst wird geteilt. zwei
 * full-bleed werkbänke (web = lime · branding = dark), die trennlinie
 * lebt: hover expandiert die hälfte auf 62%, die andere weicht.
 *
 * micro-interactions:
 *   - flex-basis transition (smooth takeover beim hover)
 *   - headline: outline-typo → füllt sich beim hover (text-stroke trick)
 *   - leistungs-stichworte staggern rein beim hover
 *   - pfeil wandert · inaktive hälfte dimmt leicht
 *   - mobile: gestackt, beide voll sichtbar, kein hover-spiel
 *   - reduced-motion: statisch 50/50, gefüllte typo
 */

type Dict = {
  kicker: string;
  webWords: string[];
  brandWords: string[];
  webCta: string;
  brandCta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "zwei werkbänke · ein kopf",
    webWords: ["von null gebaut", "eigenes cms", "dreisprachig", "95+ pagespeed"],
    brandWords: ["wortmarke", "farbsystem", "brand guide", "print + social"],
    webCta: "alles über web",
    brandCta: "alles über branding",
  },
  fr: {
    kicker: "deux ateliers · une tête",
    webWords: ["construit de zéro", "cms maison", "trilingue", "95+ pagespeed"],
    brandWords: ["logotype", "système couleur", "brand guide", "print + social"],
    webCta: "tout sur le web",
    brandCta: "tout sur le branding",
  },
  en: {
    kicker: "two workbenches · one head",
    webWords: ["built from scratch", "in-house cms", "trilingual", "95+ pagespeed"],
    brandWords: ["wordmark", "colour system", "brand guide", "print + social"],
    webCta: "all about web",
    brandCta: "all about branding",
  },
};

type Side = "web" | "brand" | null;

export function ServicesSplit() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<Side>(null);

  const basis = (side: Exclude<Side, null>) => {
    if (reduce || hovered === null) return "50%";
    return hovered === side ? "62%" : "38%";
  };

  return (
    <section className="py-12 md:py-20" aria-label={t.kicker}>
      {/* kicker · mittig über dem split */}
      <p className="container-site font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-6">
        · {t.kicker}
      </p>

      {/* der split · full-bleed, keine container-grenzen */}
      <div className="flex flex-col md:flex-row w-full min-h-[70vh] md:min-h-[78vh]">
        {/* ─── WEB · lime ─── */}
        <Link
          href={buildPath("leistungen/web", locale)}
          onPointerEnter={() => setHovered("web")}
          onPointerLeave={() => setHovered(null)}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden",
            "bg-[#e1fd52] text-[#0a0a0a] p-8 md:p-14 min-h-[44vh] md:min-h-0",
            "transition-[flex-basis,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            hovered === "brand" && "md:opacity-80",
          )}
          style={{ flexBasis: basis("web") }}
        >
          {/* riesige outline-headline · füllt sich beim hover */}
          <span
            aria-hidden
            className={cn(
              "font-display font-black lowercase leading-[0.85] tracking-[-0.04em] select-none",
              "text-[clamp(4rem,12vw,11rem)] transition-colors duration-500",
              "text-transparent group-hover:text-[#0a0a0a]",
            )}
            style={{ WebkitTextStroke: "2px #0a0a0a" }}
          >
            web.
          </span>

          <div className="flex items-end justify-between gap-6">
            <ul className="space-y-1">
              {t.webWords.map((w, i) => (
                <motion.li
                  key={w}
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: 1, x: 0 }
                      : hovered === "web"
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0.55, x: -6 }
                  }
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="font-mono text-[11px] md:text-[12px] uppercase tracking-label"
                >
                  · {w}
                </motion.li>
              ))}
            </ul>
            <span className="shrink-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label">
              {t.webCta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </div>
        </Link>

        {/* ─── BRANDING · dark ─── */}
        <Link
          href={buildPath("leistungen/branding", locale)}
          onPointerEnter={() => setHovered("brand")}
          onPointerLeave={() => setHovered(null)}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden",
            "bg-[#0a0a0a] text-[#f2f2f2] p-8 md:p-14 min-h-[44vh] md:min-h-0",
            "transition-[flex-basis,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            hovered === "web" && "md:opacity-80",
          )}
          style={{ flexBasis: basis("brand") }}
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

          <span
            aria-hidden
            className={cn(
              "relative font-display font-black lowercase leading-[0.85] tracking-[-0.04em] select-none",
              "text-[clamp(4rem,12vw,11rem)] transition-colors duration-500",
              "text-transparent group-hover:text-[#f2f2f2]",
            )}
            style={{ WebkitTextStroke: "2px #b084d3" }}
          >
            branding.
          </span>

          <div className="relative flex items-end justify-between gap-6">
            <ul className="space-y-1">
              {t.brandWords.map((w, i) => (
                <motion.li
                  key={w}
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: 1, x: 0 }
                      : hovered === "brand"
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0.55, x: -6 }
                  }
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="font-mono text-[11px] md:text-[12px] uppercase tracking-label text-[#f2f2f2]/90"
                >
                  <span className="text-[#b084d3]">·</span> {w}
                </motion.li>
              ))}
            </ul>
            <span className="shrink-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-[#e1fd52]">
              {t.brandCta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
