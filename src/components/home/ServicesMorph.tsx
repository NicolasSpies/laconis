"use client";

import Link from "next/link";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * ServicesMorph · 2 farbige card-tiles mit 3D-hover.
 * web = lime · branding = lila · bg immer #c8c8c8.
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

const TILES = [
  { bg: "#e1fd52", fg: "#0a0a0a" },
  { bg: "#b084d3", fg: "#0a0a0a" },
] as const;

function tilt(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -14}deg) rotateY(${(x - 0.5) * 14}deg) translateZ(12px)`;
}

function reset(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
}

export function ServicesMorph() {
  const locale = useLocale();
  const items = pick(DICT, locale);

  return (
    <section className="py-12 md:py-16 bg-[#c8c8c8]">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {items.map((s, i) => (
            <div
              key={s.key}
              onMouseMove={tilt}
              onMouseLeave={reset}
              className="rounded-2xl select-none"
              style={{
                background: TILES[i].bg,
                color: TILES[i].fg,
                transition: "transform 0.12s ease-out",
                willChange: "transform",
              }}
            >
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
                <p className="text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[0.9] font-black tracking-[-0.03em]">
                  {s.title}
                </p>
                <div>
                  <p
                    className="text-[14px] leading-relaxed mb-4"
                    style={{ opacity: 0.75 }}
                  >
                    {s.desc}
                  </p>
                  <p
                    className="font-mono text-[11px] uppercase tracking-label"
                    style={{ opacity: 0.65 }}
                  >
                    {s.cta}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
