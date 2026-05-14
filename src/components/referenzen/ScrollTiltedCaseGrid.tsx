"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { referenzen, type Referenz } from "@/data/referenzen";
import { buildPath, type Locale } from "@/i18n/config";
import { useLocale, pick } from "@/i18n/useLocale";

/**
 * ScrollTiltedCaseGrid · editorial scroll-driven case grid für /referenzen.
 *
 * Jeder Tile steigt von unten gekippt nach oben (rotateX + translateY),
 * settled in der mitte mit blur=0 + caption fade-in, kippt dann zurück
 * nach oben raus. L/R-alternierend für rhythm.
 *
 * Adapted from 21st.dev ScrollTiltedGrid · auf laconis case-data verdrahtet.
 * Reduced maxTilt (40 vs original 70) damit's editorial bleibt, nicht zappelig.
 */

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

type Side = "L" | "R";

type Dict = {
  caseLabel: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: { caseLabel: "case", cta: "case lesen →" },
  fr: { caseLabel: "case", cta: "voir le case →" },
  en: { caseLabel: "case", cta: "see case →" },
};

type CaseTileProps = {
  case: Referenz;
  side: Side;
  locale: Locale;
  dict: Dict;
};

function CaseTile({ case: c, side, locale, dict }: CaseTileProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sign = side === "L" ? -1 : 1;

  // tile motion: rises from below, settles mid, tilts back over top
  const blur = useTransform(p, [0, 0.5, 1], [6, 0, 6], { ease: focusEase });
  const bright = useTransform(p, [0, 0.5, 1], [0.3, 1, 0.3], {
    ease: focusEase,
  });

  const ty = useTransform(p, [0, 0.5, 1], ["80%", "0%", "-80%"], {
    ease: focusEase,
  });
  const tz = useTransform(p, [0, 0.5, 1], [200, 0, 200], { ease: focusEase });
  const rx = useTransform(p, [0, 0.5, 1], [40, 0, -40], { ease: focusEase });

  const tx = useTransform(
    p,
    [0, 0.5, 1],
    [`${sign * 25}%`, "0%", `${sign * 25}%`],
    { ease: focusEase },
  );
  const rot = useTransform(p, [0, 0.5, 1], [-sign * 3, 0, sign * 3], {
    ease: focusEase,
  });

  // inner image stays slightly scaled so blur masks edges
  const innerScale = useTransform(p, [0, 0.5, 1], [1.3, 1.05, 1.3], {
    ease: focusEase,
  });

  // caption appears at peak focus
  const captionOpacity = useTransform(p, [0.35, 0.5, 0.65], [0, 1, 0]);
  const captionY = useTransform(p, [0.35, 0.5, 0.65], [20, 0, -20]);

  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright})`;

  const href = `${buildPath("referenzen", locale)}/${c.slug}`;
  const cover = c.heroImage;

  if (reduce || !cover) {
    return (
      <figure ref={ref} className="relative z-10 m-0">
        <Link
          href={href}
          className="block relative w-full overflow-hidden rounded-md aspect-[3/4] no-underline"
        >
          {cover ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${cover}")` }}
            />
          ) : (
            <div
              className="absolute inset-0 grid place-items-center"
              style={{ background: c.farbe }}
            >
              <span className="text-[#f2f2f2] font-black text-6xl">
                {c.monogram ?? c.name[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <figcaption className="absolute bottom-6 left-6 right-6 text-[#f2f2f2]">
            <div className="font-mono text-[10px] uppercase tracking-label opacity-70">
              {c.kategorieLabel} · {c.jahr}
            </div>
            <div className="text-2xl md:text-3xl font-black tracking-[-0.02em] mt-1">
              {c.name.toLowerCase()}.
            </div>
          </figcaption>
        </Link>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className="relative z-10 m-0"
      style={{ perspective: 900, willChange: "transform" }}
    >
      <Link href={href} className="block no-underline">
        <motion.div
          className="relative w-full overflow-hidden rounded-md aspect-[3/4] will-change-[filter,transform] group"
          style={{
            filter,
            x: tx,
            y: ty,
            z: tz,
            rotate: rot,
            rotateX: rx,
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.25 },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url("${cover}")`,
              scale: innerScale,
              backfaceVisibility: "hidden",
            }}
          />
          {/* dark gradient overlay for caption legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* hover lime border accent */}
          <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-[#e1fd52] transition-all duration-300 pointer-events-none" />

          {/* caption · fadet rein bei peak focus */}
          <motion.figcaption
            className="absolute bottom-6 left-6 right-6 text-[#f2f2f2] pointer-events-none"
            style={{ opacity: captionOpacity, y: captionY }}
          >
            <div className="font-mono text-[10px] uppercase tracking-label opacity-80">
              {c.kategorieLabel} · {c.jahr} · {c.ort}
            </div>
            <div className="text-2xl md:text-3xl font-black tracking-[-0.02em] mt-1 leading-[0.95]">
              {c.name.toLowerCase()}.
            </div>
            <div className="font-mono text-[10px] uppercase tracking-label opacity-70 mt-3">
              {dict.cta}
            </div>
          </motion.figcaption>
        </motion.div>
      </Link>
    </motion.figure>
  );
}

export function ScrollTiltedCaseGrid() {
  const locale = useLocale();
  const dict = pick(DICT, locale);

  // only cases with heroImage — others fall back to monogram tile
  const cases = useMemo(() => referenzen, []);

  return (
    <section className="relative w-full" aria-label="cases scroll grid">
      <div className="mx-auto mt-[10vh] mb-[10vh] grid w-full grid-cols-2 max-w-3xl px-6 py-[10vh] gap-8 md:gap-12">
        {cases.map((c, i) => (
          <CaseTile
            key={c.slug}
            case={c}
            side={i % 2 === 0 ? "L" : "R"}
            locale={locale}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
