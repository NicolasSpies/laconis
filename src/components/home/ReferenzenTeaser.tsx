"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { referenzen, type Referenz } from "@/data/referenzen";

/**
 * home-referenzen · scroll-linked stacking cards with depth scale.
 * inspiration: linear.app · stripe.com · scalient.webflow.io
 *
 * mechanik:
 *   1. sticky-wrapper pro card (top:80 + offset·index für stair-step)
 *   2. global useScroll auf parent-container, progress 0→1 über stack
 *   3. jede card berechnet cumulative depth anhand index:
 *      - zwischen i/N und (i+1)/N → card i ist „alone", full scale
 *      - ab (i+1)/N → jede folgende N+k-card-phase shrinkt card i
 *        einen step weiter (0.95 → 0.9 → 0.85 …)
 *   4. scale/opacity/y/brightness scroll-gebunden via useTransform
 *   5. transformOrigin „center top" → oberkante bleibt sichtbar
 *      wenn card zurücktritt · wie echter kartenstapel
 *
 * entrance: motion.div fade-up (y:60→0, staggered 200ms pro card).
 */

const FEATURED_SLUGS = ["fabry-baumpflege", "holoroom", "lespoir-asbl"] as const;

export function ReferenzenTeaser() {
  const featured = FEATURED_SLUGS
    .map((slug) => referenzen.find((r) => r.slug === slug))
    .filter((r): r is Referenz => !!r);

  /* gemeinsamer scroll-container · alle cards lesen hiervon ihren
     depth-progress. start/end spannen über den ganzen stack. */
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative" id="referenzen">
      {/* ═══ intro · giant animated heading ═══ */}
      <div className="container-site pt-24 md:pt-32 pb-12 md:pb-16">
        <SectionLabel num="05">referenzen</SectionLabel>
        <AnimatedHeading />
        <div className="mt-8 md:mt-10 flex justify-end">
          <p className="font-mono text-[11px] uppercase tracking-label text-offwhite/45 max-w-[240px] leading-relaxed text-right">
            ↓ drei ausgewählte · <span className="text-offwhite/70">{referenzen.length} im archiv</span>
          </p>
        </div>
      </div>

      {/* ═══ scroll-linked stacking cards with depth ═══ */}
      <div ref={stackRef} className="relative">
        {featured.map((r, i) => (
          <StickyCase
            key={r.slug}
            ref_={r}
            index={i}
            total={featured.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* ═══ archiv-outro · eng an den stack gerückt ═══ */}
      <div className="container-site pt-8 md:pt-10 pb-20 md:pb-24 flex flex-col items-center gap-3">
        <p
          className="font-hand text-[20px] md:text-[22px] text-offwhite/55"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          und das ist erst die auswahl.
        </p>
        <Button href="/referenzen" variant="primary" size="lg" analyticsLabel="home_ref_archiv">
          alle referenzen ansehen →
        </Button>
      </div>
    </section>
  );
}

/* ═══ section heading · gleiche typo-größe wie leistungen/preise ═══ */
function AnimatedHeading() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="heading-display text-[clamp(2.25rem,5.5vw,4rem)] mt-6 max-w-[900px] text-offwhite leading-[1.02]"
    >
      meine werke.
    </motion.h2>
  );
}

type StickyCaseProps = {
  ref_: Referenz;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function StickyCase({ ref_, index, total, scrollYProgress }: StickyCaseProps) {
  const areaRef = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  /* cursor-follow bubble · lokaler hover-effekt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { damping: 22, stiffness: 280, mass: 0.4 });
  const by = useSpring(my, { damping: 22, stiffness: 280, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  /* cumulative depth · breakpoints 0, 1/N, 2/N, …, 1 ·
     JEDE card hat eine baseline-tilt von -10deg (top näher, unten weiter
     weg) — das ist das „3D perspektive"-gefühl das auf jeder einzelnen
     card zu sehen ist, nicht nur auf gestapelten. sobald eine card
     covered wird, kippt sie step-by-step nach hinten (rotateX wächst),
     sinkt tiefer, wird dunkler und kleiner. opacity bleibt immer 100%. */
  const breakpoints = Array.from({ length: total + 1 }, (_, k) => k / total);
  const scaleValues = breakpoints.map((_, k) => {
    if (k <= index + 1) return 1;
    const step = k - index - 1;
    return Math.max(0.78, 1 - 0.07 * step);
  });
  const yValues = breakpoints.map((_, k) => {
    if (k <= index + 1) return 0;
    const step = k - index - 1;
    return -22 * step;
  });
  const brightnessValues = breakpoints.map((_, k) => {
    if (k <= index + 1) return 1;
    const step = k - index - 1;
    return Math.max(0.7, 1 - 0.12 * step);
  });
  /* rotateX · baseline -10deg auf JEDER card (top zeigt richtung viewer,
     bottom kippt weg) → real spürbare 3D-perspektive auch wenn card allein
     oben liegt. covered cards kippen zusätzlich nach hinten: -10 → 0 → +10. */
  const rotateXValues = breakpoints.map((_, k) => {
    if (k <= index + 1) return -10;
    const step = k - index - 1;
    return Math.min(14, -10 + 10 * step);
  });

  const scale = useTransform(scrollYProgress, breakpoints, scaleValues);
  const y = useTransform(scrollYProgress, breakpoints, yValues);
  const rotateX = useTransform(scrollYProgress, breakpoints, rotateXValues);
  const brightnessMv = useTransform(scrollYProgress, breakpoints, brightnessValues);
  const filter = useTransform(brightnessMv, (b) => `brightness(${b})`);

  /* jede folgende card sitzt etwas tiefer · oberkante-peek effekt */
  const stickyTop = 80 + index * 14;

  return (
    <div
      className="sticky h-[100vh] px-4 md:px-8 flex items-center justify-center [perspective:1100px]"
      style={{ top: `${stickyTop}px` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1600px]"
      >
        <motion.article
          style={{
            scale,
            y,
            rotateX,
            filter,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            willChange: "transform, filter",
          }}
        >
          <Link
            ref={areaRef}
            href={`/referenzen/${ref_.slug}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={onMove}
            data-cursor-hide
            className="group relative block w-full cursor-none"
            aria-label={`referenz ansehen: ${ref_.name}`}
          >
            <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[20px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.7)] h-[calc(100vh-140px)]" style={{ background: 'rgb(var(--bg-root))' }}>
              {ref_.heroImage ? (
                <Image
                  src={ref_.heroImage}
                  alt={`${ref_.name} · referenz-vorschau`}
                  fill
                  sizes="(min-width: 1280px) 1400px, 92vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans font-black text-[clamp(4rem,12vw,10rem)] text-white/40 lowercase">
                    {ref_.monogram ?? ref_.name[0]}
                  </span>
                </div>
              )}

              {/* dunkler gradient von unten · kontrast für name-overlay */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)]"
              />

              {/* top-row · N° links, kategorie-tag rechts (klein, kein chrome) */}
              <div className="absolute top-5 md:top-7 left-5 md:left-8 right-5 md:right-8 flex items-start justify-between gap-4 pointer-events-none z-[3]">
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/80">
                  N° {String(index + 1).padStart(2, "0")}
                </span>
                {ref_.inArbeit && (
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#e1fd52]">
                    · in arbeit
                  </span>
                )}
              </div>

              {/* kategorie-marquee · vertikal rechts, läuft endlos */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-[28px] md:w-[34px] overflow-hidden z-[3] flex items-center justify-center"
              >
                <div
                  className="whitespace-nowrap font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/45"
                  style={{
                    writingMode: "vertical-rl",
                    animation: "refMarquee 22s linear infinite",
                  }}
                >
                  {`${ref_.kategorieLabel} · ${ref_.kategorieLabel} · ${ref_.kategorieLabel} · ${ref_.kategorieLabel} · `}
                </div>
              </div>

              {/* huge name · outline-only, extends über bild, mix-blend-difference
                 damit er auf jedem bild sauber lesbar ist */}
              <div className="absolute inset-x-0 bottom-0 z-[2] px-5 md:px-10 pb-6 md:pb-10 pointer-events-none">
                <h3
                  className="heading-display lowercase leading-[0.85] tracking-[-0.03em] text-[clamp(2.5rem,9vw,7rem)] text-white"
                  style={{ mixBlendMode: "difference" }}
                >
                  {ref_.name}
                </h3>
                <div className="mt-2 md:mt-3 flex items-baseline gap-3 md:gap-4 text-white/80">
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]">
                    {ref_.ort} · {ref_.jahr}
                  </span>
                  <span className="hidden md:inline font-sans text-[13px] text-white/65 truncate">
                    {ref_.kurz}
                  </span>
                </div>
              </div>

              {/* cursor-follow bubble */}
              <motion.span
                aria-hidden
                style={{ x: bx, y: by, translateX: "-50%", translateY: "-50%" }}
                animate={{
                  scale: hovering ? 1 : 0,
                  opacity: hovering ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute top-0 left-0 w-[130px] h-[130px] rounded-full bg-lime text-ink flex items-center justify-center z-[4] shadow-[0_12px_40px_-8px_rgba(225,253,82,0.55)]"
              >
                <span className="font-mono text-[11px] uppercase tracking-label text-center leading-[1.4] px-3 flex flex-col items-center gap-1">
                  <span>projekt ansehen</span>
                  <span aria-hidden className="text-[14px]">↓</span>
                </span>
              </motion.span>
            </div>
          </Link>
        </motion.article>
      </motion.div>
    </div>
  );
}
