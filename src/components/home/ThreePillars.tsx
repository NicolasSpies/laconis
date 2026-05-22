"use client";

import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * ThreePillars · drei USP-tiles · lime / dark / lila.
 * 3D-tilt on hover via perspective transform, raw-DOM für 60fps.
 */

type PillarDict = { word: string; sub: string };

const DICT: Record<Locale, PillarDict[]> = {
  de: [
    { word: "fix.", sub: "kein stundensatz · ein preis von anfang an." },
    { word: "solo.", sub: "ein kontakt · kein agentur-layer dazwischen." },
    { word: "direkt.", sub: "von brief bis launch · kein endlos-prozess." },
  ],
  fr: [
    { word: "fixe.", sub: "pas de taux horaire · un prix dès le départ." },
    { word: "solo.", sub: "un contact · pas de couche d'agence." },
    { word: "direct.", sub: "du brief au launch · pas de processus infini." },
  ],
  en: [
    { word: "fixed.", sub: "no hourly rate · one price from the start." },
    { word: "solo.", sub: "one contact · no agency layer in between." },
    { word: "direct.", sub: "brief to launch · no endless process." },
  ],
};

/* lime first — der stärkste claim bekommt die auffälligste farbe */
const TILES = [
  { bg: "#e1fd52", fg: "#0a0a0a" },
  { bg: "#0a0a0a", fg: "#f2f2f2" },
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

export function ThreePillars() {
  const locale = useLocale();
  const items = pick(DICT, locale);

  return (
    <section className="py-12 md:py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              onMouseMove={tilt}
              onMouseLeave={reset}
              className="rounded-2xl p-8 md:p-10 flex flex-col justify-between select-none"
              style={{
                background: TILES[i].bg,
                color: TILES[i].fg,
                minHeight: "clamp(200px, 26vw, 300px)",
                transition: "transform 0.12s ease-out",
                willChange: "transform",
              }}
            >
              <p className="text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[0.9] font-black tracking-[-0.03em]">
                {item.word}
              </p>
              <p
                className="font-mono text-[11px] uppercase tracking-label"
                style={{ opacity: 0.6 }}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
