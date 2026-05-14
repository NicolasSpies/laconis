"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { TiltCard } from "@/components/shared/TiltCard";

/**
 * ServicesMorph · 2 farbige card-tiles mit cursor-spotlight + subtle 3D-tilt.
 * web = lime · branding = lila · bg immer #c8c8c8.
 * Tilt + spotlight liefert der zentrale TiltCard.
 */

type ServiceEntry = {
  key: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};

const DICT: Record<Locale, ServiceEntry[]> = {
  de: [
    {
      key: "web",
      title: "web.",
      desc: "von der ersten skizze bis zum launch. eigenes CMS, dreisprachig, schnell, kein bloat.",
      cta: "alles über web →",
      href: "leistungen/web",
    },
    {
      key: "branding",
      title: "branding.",
      desc: "wortmarke, brand guide, farbsystem, druck. allein oder zur website dazu.",
      cta: "alles über branding →",
      href: "leistungen/branding",
    },
  ],
  fr: [
    {
      key: "web",
      title: "web.",
      desc: "de la première esquisse au launch. CMS sur mesure, trilingue, rapide, pas de bloat.",
      cta: "tout sur le web →",
      href: "leistungen/web",
    },
    {
      key: "branding",
      title: "branding.",
      desc: "wordmark, brand guide, couleurs, impression. seul ou avec le site.",
      cta: "tout sur le branding →",
      href: "leistungen/branding",
    },
  ],
  en: [
    {
      key: "web",
      title: "web.",
      desc: "from first sketch to launch. custom CMS, trilingual, fast, no bloat.",
      cta: "more on web →",
      href: "leistungen/web",
    },
    {
      key: "branding",
      title: "branding.",
      desc: "wordmark, brand guide, colours, print. on its own or with the website.",
      cta: "more on branding →",
      href: "leistungen/branding",
    },
  ],
};

/* web = lime (full surface, primary spezialität) ·
   branding = dark (mit kleinem lila scribble als akzent · lila als
   discreet element ON a dark surface, nicht als surface selbst) */
const PRESETS = ["lime", "dark"] as const;
const LILA = "#b084d3";

export function ServicesMorph() {
  const locale = useLocale();
  const items = pick(DICT, locale);

  return (
    <section className="py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {items.map((s, i) => {
            const isBranding = s.key === "branding";
            return (
              <TiltCard key={s.key} preset={PRESETS[i]}>
                <Link
                  href={buildPath(s.href, locale)}
                  className="flex flex-col justify-between p-8 md:p-10"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    minHeight: "clamp(280px, 34vw, 400px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[0.9] font-black tracking-[-0.03em] relative inline-block">
                    <span className="relative inline-block">
                      {s.title}
                      {/* nur auf der branding-card: zarter lila scribble drunter
                         → lila als diskreter accent on dark surface */}
                      {isBranding && (
                        <svg
                          aria-hidden
                          viewBox="0 0 200 16"
                          preserveAspectRatio="none"
                          className="absolute left-[-2%] right-[-2%] -bottom-[0.04em] w-[104%] h-[0.18em] pointer-events-none overflow-visible"
                        >
                          <path
                            d="M4 8 C 48 3, 110 13, 196 6"
                            stroke={LILA}
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.85"
                          />
                        </svg>
                      )}
                    </span>
                  </p>
                  <div>
                    <p
                      className="text-[14px] leading-relaxed mb-4"
                      style={{ opacity: isBranding ? 0.8 : 0.75 }}
                    >
                      {s.desc}
                    </p>
                    <p
                      className="font-mono text-[11px] uppercase tracking-label"
                      style={{
                        opacity: 0.7,
                        color: isBranding ? LILA : "inherit",
                      }}
                    >
                      {s.cta}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
