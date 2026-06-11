"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * Hero v2 · "der lebende schriftzug" (phase 2).
 *
 *   1. kicker über der H1 · "webdesign & branding studio · ostbelgien"
 *      → sichtbares SEO-keyword + sofortige klarheit für den 0815-besucher
 *   2. letter-by-letter entrance · jeder buchstabe landet von unten und
 *      "setzt sich fest": variable weight 300 → 800 (Bricolage wght-achse)
 *   3. cursor-proximity · buchstaben nahe dem cursor werden LEICHTER
 *      (800 → ~340, weicher falloff) · als würde man in den text drücken
 *      · desktop only (pointer: fine) · startet nach der entrance
 *   4. lime-marker zeichnet sich hinter "design" · lila scribble unter accent
 *
 * a11y: h1 trägt aria-label mit volltext · letter-spans sind aria-hidden.
 * reduced-motion: alles statisch sichtbar, keine proximity.
 */

type Dict = {
  kicker: string;
  line1: string;
  line2: string;
  line3prefix: string;
  line3accent: string;
  sub: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "webdesign & branding studio · ostbelgien",
    line1: "design",
    line2: "mit meinung.",
    line3prefix: "web mit ",
    line3accent: "seele.",
    sub: "für leute, die ihre marke ernst nehmen.",
    cta: "projekt starten →",
  },
  fr: {
    kicker: "studio webdesign & branding · cantons de l'est",
    line1: "design",
    line2: "avec opinion.",
    line3prefix: "web avec ",
    line3accent: "âme.",
    sub: "pour ceux qui prennent leur marque au sérieux.",
    cta: "démarrer un projet →",
  },
  en: {
    kicker: "webdesign & branding studio · east belgium",
    line1: "design",
    line2: "with opinion.",
    line3prefix: "web with ",
    line3accent: "soul.",
    sub: "for people who take their brand seriously.",
    cta: "start a project →",
  },
};

/* marker-stroke pfad · single hand-stroke über "design" (lime) */
const MARKER_PATH = "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";
const MARKER_STROKE_WIDTH = 58;
const MARKER_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'><path d='${MARKER_PATH}' stroke='black' stroke-width='${MARKER_STROKE_WIDTH}' stroke-linecap='round' fill='none'/></svg>`,
)}")`;

/* proximity-tuning */
const PROX_RADIUS = 150; // px · wirkungsradius um den cursor
const WGHT_BASE = 800;
const WGHT_MIN = 340;
const LERP = 0.16; // smoothing pro frame

type LetterSpec = {
  char: string;
  /** entrance-delay in s */
  delay: number;
  /** key für react */
  key: string;
};

/** zerlegt einen string in letter-specs mit fortlaufendem stagger */
function toLetters(text: string, baseDelay: number, step: number, keyPrefix: string): LetterSpec[] {
  return text.split("").map((char, i) => ({
    char,
    delay: baseDelay + i * step,
    key: `${keyPrefix}-${i}`,
  }));
}

export function Hero() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduceMotion = useReducedMotion();
  const pathInit = reduceMotion ? 1 : 0;
  const opInit = reduceMotion ? 1 : 0;

  const sectionRef = useRef<HTMLElement>(null);
  /** refs aller proximity-aktiven buchstaben · in DOM-reihenfolge */
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  letterRefs.current = [];

  const registerLetter = (el: HTMLSpanElement | null) => {
    if (el) letterRefs.current.push(el);
  };
  /* mirror-spans (dunkle cutout-kopie von "design") · index-aligned mit
     den ersten 6 letter-refs · beide kriegen identische weights, sonst
     laufen die glyphen-breiten auseinander */
  const mirrorRefs = useRef<Array<HTMLSpanElement | null>>([]);

  /* ein mount-effect · wartet die entrance ab, dann rAF-loop mit
     direkten DOM-writes (kein react re-render, kein state-race) */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let inside = false;
    let raf: number | null = null;
    let armed = false;

    /* pro buchstabe: aktuelle weight (lerped) + center-cache */
    const letters = letterRefs.current.map((el, i) => ({
      el,
      mirror: mirrorRefs.current[i] ?? null,
      weight: WGHT_BASE,
      cx: 0,
      cy: 0,
    }));

    const measure = () => {
      /* dokument-koordinaten (viewport + scroll) · so bleiben die caches
         beim scrollen korrekt ohne ständiges re-measure */
      for (const l of letters) {
        const r = l.el.getBoundingClientRect();
        l.cx = r.left + r.width / 2;
        l.cy = r.top + r.height / 2 + window.scrollY;
      }
    };
    measure();

    const tick = () => {
      let active = false;
      const mouseDocY = mouseY + window.scrollY;
      for (const l of letters) {
        const dx = l.cx - mouseX;
        const dy = l.cy - mouseDocY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const target = inside
          ? dist < PROX_RADIUS
            ? WGHT_MIN + (WGHT_BASE - WGHT_MIN) * (dist / PROX_RADIUS)
            : WGHT_BASE
          : WGHT_BASE;
        const next = l.weight + (target - l.weight) * LERP;
        if (Math.abs(next - l.weight) > 0.3) {
          l.weight = next;
          const v = `"wght" ${Math.round(next)}`;
          l.el.style.fontVariationSettings = v;
          if (l.mirror) l.mirror.style.fontVariationSettings = v;
          active = true;
        }
      }
      /* loop läuft solange sich was bewegt oder cursor drin ist */
      if (active || inside) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      /* move im hero IMPLIZIERT drin · pointerenter feuert nicht wenn die
         maus beim laden schon über der section stand */
      inside = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      kick();
    };
    const onEnter = () => {
      inside = true;
      measure(); // layout kann sich geändert haben (resize, fonts)
      kick();
    };
    const onLeave = () => {
      inside = false;
      kick(); // weights zurück-lerpen lassen
    };
    const onResize = () => measure();

    /* erst nach der entrance scharf schalten · sonst messen wir
       buchstaben mitten im flug */
    const armTimer = setTimeout(() => {
      armed = true;
      measure();
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerenter", onEnter);
      section.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", onResize);
    }, 1700);

    return () => {
      clearTimeout(armTimer);
      if (armed) {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerenter", onEnter);
        section.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", onResize);
      }
      if (raf !== null) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* letter-specs pro zeile · stagger-timing aufeinander abgestimmt */
  const line1Letters = toLetters(t.line1, 0.15, 0.045, "l1");
  const line2Letters = toLetters(t.line2, 0.35, 0.03, "l2");
  const line3aLetters = toLetters(t.line3prefix, 0.55, 0.03, "l3a");
  const line3bLetters = toLetters(
    t.line3accent,
    0.55 + t.line3prefix.length * 0.03,
    0.03,
    "l3b",
  );

  const letterInit = reduceMotion
    ? { y: 0, opacity: 1 }
    : { y: "0.35em", opacity: 0 };

  const renderLetters = (specs: LetterSpec[]) =>
    specs.map((s) =>
      s.char === " " ? (
        <span key={s.key}>&nbsp;</span>
      ) : (
        <motion.span
          key={s.key}
          ref={(el: HTMLSpanElement | null) => registerLetter(el)}
          initial={letterInit}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.55,
            delay: s.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block will-change-transform"
        >
          {s.char}
        </motion.span>
      ),
    );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* atmospheric grid · subtle texture · fadet aus */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg pointer-events-none -z-[5]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
        }}
      />

      <div className="container-site w-full relative z-10">
        <div className="max-w-[1100px]">
          {/* kicker · sichtbares SEO-signal + sofort-klarheit */}
          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-[11px] md:text-[12px] uppercase tracking-label text-offwhite/55"
          >
            · {t.kicker}
          </motion.p>

          <h1
            aria-label={`${t.line1} ${t.line2} ${t.line3prefix}${t.line3accent}`}
            className="text-[clamp(3rem,10vw,10rem)] leading-[0.92] tracking-[-0.035em] font-black text-offwhite"
          >
            <span aria-hidden className="block">
              {/* zeile 1 · lime marker-stroke auf "design" */}
              <span className="block whitespace-nowrap">
                <span className="relative inline-block isolate">
                  <svg
                    aria-hidden
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                    className="absolute -left-[4%] -right-[4%] -top-[14%] -bottom-[10%] w-[108%] h-[124%] -z-[5] pointer-events-none overflow-visible"
                  >
                    <motion.path
                      d={MARKER_PATH}
                      stroke="rgb(var(--accent))"
                      strokeWidth={MARKER_STROKE_WIDTH}
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: pathInit, opacity: opInit }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        pathLength: { duration: 0.7, delay: 0.6, ease: [0.65, 0, 0.35, 1] },
                        opacity: { duration: 0.2, delay: 0.6 },
                      }}
                    />
                  </svg>
                  <span className="relative">{renderLetters(line1Letters)}</span>
                  {/* mask-cutout · dunkler text durch den stroke · spiegelt
                      die letter-weights (sonst glyphen-drift) */}
                  <motion.span
                    aria-hidden
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.7, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0 pointer-events-none select-none text-[#0a0a0a]"
                    style={{
                      maskImage: MARKER_MASK,
                      WebkitMaskImage: MARKER_MASK,
                      maskSize: "108% 124%",
                      WebkitMaskSize: "108% 124%",
                      maskPosition: "50% 58.33%",
                      WebkitMaskPosition: "50% 58.33%",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                    }}
                  >
                    {t.line1.split("").map((char, i) => (
                      <span
                        key={`m-${i}`}
                        ref={(el) => {
                          mirrorRefs.current[i] = el;
                        }}
                        className="inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </motion.span>
                </span>
              </span>

              {/* zeile 2 */}
              <span className="block whitespace-nowrap">
                {renderLetters(line2Letters)}
              </span>

              {/* zeile 3 · accent + lila scribbles */}
              <span className="block whitespace-nowrap">
                {renderLetters(line3aLetters)}
                <span className="relative inline-block">
                  <span>{renderLetters(line3bLetters)}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 200 30"
                    preserveAspectRatio="none"
                    className="absolute left-[-2%] right-[-2%] -bottom-[0.08em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
                  >
                    <motion.path
                      d="M6 10 C 46 3, 112 15, 194 7"
                      stroke="#b084d3"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: pathInit, opacity: opInit }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        pathLength: { duration: 0.45, delay: 1.1, ease: [0.65, 0, 0.35, 1] },
                        opacity: { duration: 0.2, delay: 1.1 },
                      }}
                    />
                    <motion.path
                      d="M18 23 C 64 17, 128 26, 180 21"
                      stroke="#b084d3"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: pathInit, opacity: opInit }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        pathLength: { duration: 0.4, delay: 1.3, ease: [0.65, 0, 0.35, 1] },
                        opacity: { duration: 0.2, delay: 1.3 },
                      }}
                    />
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          {/* subtitle */}
          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-[520px] text-[16px] md:text-[18px] leading-relaxed text-offwhite/75 lowercase"
          >
            {t.sub}
          </motion.p>

          {/* primary CTA · magnetic */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.45 }}
            className="mt-10"
          >
            <MagneticButton>
              <Button
                href={`${buildPath("kontakt", locale)}#projekt`}
                size="md"
                analyticsLabel="home_hero_kontakt"
              >
                {t.cta}
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
