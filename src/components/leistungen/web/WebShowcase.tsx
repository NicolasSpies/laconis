"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { referenzen, type Referenz } from "@/data/referenzen";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * WebShowcase · stacked-browser mosaic für /leistungen/web.
 *
 * 3 reale referenz-cases als überlagernde mock-browser-windows.
 * - jede card hat eigene rotation + position (wie tabs auf nem schreibtisch)
 * - hover hebt card nach vorne + entrotiert
 * - klick navigiert zum case-detail
 * - alle cases werden aus src/data/referenzen.ts gezogen
 */

const POSITIONS = [
  { left: "2%", top: "4%", rotate: -5, width: 480 },
  { left: "30%", top: "16%", rotate: 3, width: 460 },
  { left: "58%", top: "8%", rotate: -3, width: 440 },
];

type Dict = {
  sectionLabel: string;
  kicker: string;
  meta: string;
  ctaCase: string;
  hint: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "gebaut",
    kicker: "↘ was tatsächlich live ist",
    meta: "· schreibtisch · 3 fenster offen ·",
    ctaCase: "case →",
    hint: "hover bringt nach vorne · klick öffnet den case",
  },
  fr: {
    sectionLabel: "construit",
    kicker: "↘ ce qui est réellement en ligne",
    meta: "· bureau · 3 fenêtres ouvertes ·",
    ctaCase: "case →",
    hint: "le hover met en avant · le clic ouvre le case",
  },
  en: {
    sectionLabel: "built",
    kicker: "↘ what's actually live",
    meta: "· desk · 3 windows open ·",
    ctaCase: "case →",
    hint: "hover brings forward · click opens the case",
  },
};

function domainFromUrl(url?: string, fallback?: string): string {
  if (url) {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      // fall through
    }
  }
  return fallback ?? "laconis.be";
}

export function WebShowcase() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const [topZ, setTopZ] = useState(10);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  function bringFront(slug: string) {
    const next = topZ + 1;
    setTopZ(next);
    setZMap((m) => ({ ...m, [slug]: next }));
  }

  const cases: Referenz[] = referenzen.slice(0, 3);

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <SectionLabel num="06">{t.sectionLabel}</SectionLabel>

        <div className="flex items-start justify-between mt-4 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            {t.kicker}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
            {t.meta}
          </span>
        </div>

        <div
          className="relative mx-auto rounded-2xl overflow-hidden border border-ink/20"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #1a1a1a 0%, #0e0e0e 70%, #050505 100%)",
            height: "clamp(560px, 70vh, 760px)",
            maxWidth: "1280px",
          }}
        >
          {/* ambient subtle warm/lime hints */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, rgba(225,253,82,0.05) 0%, transparent 35%), radial-gradient(circle at 82% 78%, rgba(232,193,75,0.04) 0%, transparent 40%)",
            }}
          />

          {cases.map((c, i) => {
            const pos = POSITIONS[i] ?? POSITIONS[POSITIONS.length - 1];
            const isHovered = hovered === c.slug;
            const z = zMap[c.slug] ?? 10 - i;
            return (
              <motion.div
                key={c.slug}
                onMouseEnter={() => setHovered(c.slug)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => bringFront(c.slug)}
                initial={{ opacity: 0, y: 30, rotate: pos.rotate, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: isHovered ? 0 : pos.rotate,
                  scale: isHovered ? 1.04 : 1,
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  width: pos.width,
                  maxWidth: "calc(100% - 32px)",
                  zIndex: z,
                  transformOrigin: "center center",
                }}
              >
                <Link
                  href={`${buildPath("referenzen", locale)}/${c.slug}`}
                  className="block group"
                  aria-label={c.name}
                >
                  <div
                    className="relative rounded-lg overflow-hidden border border-ink/20 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                    style={{ background: "#0e0e0e" }}
                  >
                    {/* browser chrome */}
                    <div className="h-8 bg-[#1a1a1a] border-b border-ink/15 flex items-center px-3 gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 font-mono text-[10px] text-offwhite/55 bg-[#0a0a0a] px-2.5 py-0.5 rounded">
                        {domainFromUrl(c.urlExtern, "laconis.be")}
                      </span>
                    </div>
                    {/* viewport */}
                    <div className="relative aspect-[16/10]">
                      {c.heroImage ? (
                        <Image
                          src={c.heroImage}
                          alt={c.name}
                          fill
                          sizes="500px"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ background: c.farbe }}
                        >
                          <span
                            className="text-[clamp(2.5rem,6vw,5rem)] text-[#0a0a0a]/45"
                            style={{
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontStyle: "italic",
                            }}
                          >
                            {(c.monogram ?? c.name.charAt(0)).toLowerCase()}
                          </span>
                        </div>
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 100%)",
                        }}
                      />
                      {/* accent stripe mid */}
                      <div
                        aria-hidden
                        className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2"
                        style={{
                          background: c.farbe,
                          opacity: 0.6,
                        }}
                      />
                      {/* content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-start justify-between">
                          <span
                            className="font-mono text-[9px] uppercase tracking-label"
                            style={{ color: c.farbe }}
                          >
                            · {c.kategorieLabel} · {c.jahr}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/65 bg-[#0a0a0a]/65 backdrop-blur px-2 py-0.5 rounded">
                            nº {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <h3
                            className="text-[clamp(1.2rem,1.8vw,1.6rem)] leading-tight text-offwhite lowercase"
                            style={{
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontStyle: "italic",
                            }}
                          >
                            {c.name}
                          </h3>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                              {c.ort}
                            </span>
                            <span
                              className="font-mono text-[9px] uppercase tracking-label px-2 py-0.5 rounded-full text-[#0a0a0a]"
                              style={{ background: c.farbe }}
                            >
                              {t.ctaCase}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* meta corners */}
          <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
            schreibtisch · {cases.length} fenster
          </span>
          <span className="absolute top-5 right-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50 inline-flex items-center gap-2">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            live · hover/click
          </span>
        </div>

        <p className="mt-4 font-hand text-[17px] text-offwhite/45 rotate-[-1deg] inline-block">
          {t.hint}
        </p>
      </div>
    </section>
  );
}
