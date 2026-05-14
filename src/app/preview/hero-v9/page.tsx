"use client";

import { motion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import Link from "next/link";

/**
 * /preview/hero-v9 · 4 hero-varianten zum vergleich.
 *
 * Gleicher text (design / mit meinung / web mit seele), unterschiedliche
 * visuals dahinter. Scroll durch, pick eine.
 *
 *   A · floating pill-shapes (HeroGeometric-inspired · brand colors · dark)
 *   B · massive ø background (typo-as-shape · light)
 *   C · conic-gradient lamp (LampDemo-inspired · lime spotlight · dark)
 *   D · drifting gradient blobs (atmospheric · light)
 */

type Dict = {
  line1: string;
  line2: string;
  line3prefix: string;
  line3accent: string;
  sub: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    line1: "design",
    line2: "mit meinung.",
    line3prefix: "web mit ",
    line3accent: "seele.",
    sub: "für leute, die ihre marke ernst nehmen.",
    cta: "projekt starten →",
  },
  fr: {
    line1: "design",
    line2: "avec opinion.",
    line3prefix: "web avec ",
    line3accent: "âme.",
    sub: "pour ceux qui prennent leur marque au sérieux.",
    cta: "démarrer un projet →",
  },
  en: {
    line1: "design",
    line2: "with opinion.",
    line3prefix: "web with ",
    line3accent: "soul.",
    sub: "for people who take their brand seriously.",
    cta: "start a project →",
  },
};

const MARKER_PATH = "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";

/* ─────────────────────────────────────────────────────────────────
   Floating pill shape · HeroGeometric building block, brand-tinted
   ───────────────────────────────────────────────────────────────── */
function Pill({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  color = "#b084d3",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={`absolute ${className ?? ""}`}
    >
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 11 + delay * 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full backdrop-blur-[2px] border border-white/[0.12]"
          style={{
            background: `linear-gradient(to right, ${color}26, transparent)`,
            boxShadow: `0 8px 32px 0 ${color}1f`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}55, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Shared hero text · with marker on "design" + lila scribble under accent
   ───────────────────────────────────────────────────────────────── */
function HeroText({
  t,
  scheme,
  locale,
}: {
  t: Dict;
  scheme: "light" | "dark";
  locale: Locale;
}) {
  const isLight = scheme === "light";
  const textMain = isLight ? "#0a0a0a" : "#f2f2f2";
  const subOpacity = isLight ? 0.75 : 0.7;

  return (
    <div className="max-w-[1100px]">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(3rem,10vw,10rem)] leading-[0.92] tracking-[-0.035em] font-black"
        style={{ color: textMain }}
      >
        {/* line 1 · design + lime marker */}
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
                stroke="#e1fd52"
                strokeWidth={58}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.7, delay: 0.4, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.2, delay: 0.4 },
                }}
              />
            </svg>
            <span className="relative">{t.line1}</span>
          </span>
        </span>

        {/* line 2 */}
        <span className="block whitespace-nowrap">{t.line2}</span>

        {/* line 3 · prefix + accent (kein italic serif · pure sans) */}
        <span className="block whitespace-nowrap">
          {t.line3prefix}
          <span className="relative inline-block">
            <span>{t.line3accent}</span>
            <svg
              aria-hidden
              viewBox="0 0 200 30"
              preserveAspectRatio="none"
              className="absolute left-[-2%] right-[-2%] -bottom-[0.06em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
            >
              <motion.path
                d="M6 10 C 46 3, 112 15, 194 7"
                stroke="#b084d3"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.45, delay: 1.0, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.2, delay: 1.0 },
                }}
              />
              <motion.path
                d="M18 23 C 64 17, 128 26, 180 21"
                stroke="#b084d3"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.4, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.2, delay: 1.2 },
                }}
              />
            </svg>
          </span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="mt-10 max-w-[520px] text-[16px] md:text-[18px] leading-relaxed lowercase"
        style={{ color: textMain, opacity: subOpacity }}
      >
        {t.sub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.7 }}
        className="mt-10"
      >
        <Link
          href={`${buildPath("kontakt", locale)}#projekt`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full"
          style={{
            background: isLight ? "#0a0a0a" : "#e1fd52",
            color: isLight ? "#e1fd52" : "#0a0a0a",
          }}
        >
          {t.cta}
        </Link>
      </motion.div>
    </div>
  );
}

function VariantBadge({ code, label }: { code: string; label: string }) {
  return (
    <div className="absolute top-6 left-6 z-40 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e1fd52] bg-[#0a0a0a]/85 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
      {code} · {label}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   VARIANT A · floating pill-shapes · dark bg · brand-tinted
   ═════════════════════════════════════════════════════════════════ */
function VariantA({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a0a0a]">
      <VariantBadge code="A" label="floating shapes" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#b084d3]/[0.04] via-transparent to-[#e1fd52]/[0.03] blur-3xl pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Pill width={600} height={140} rotate={12} color="#b084d3" delay={0.3} className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <Pill width={500} height={120} rotate={-15} color="#e1fd52" delay={0.5} className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <Pill width={300} height={80} rotate={-8} color="#b084d3" delay={0.4} className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <Pill width={200} height={60} rotate={20} color="#e1fd52" delay={0.6} className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
        <Pill width={150} height={40} rotate={-25} color="#b084d3" delay={0.7} className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
      </div>

      <div className="container-site relative z-10">
        <HeroText t={t} scheme="dark" locale={locale} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40 pointer-events-none" />
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   VARIANT B · massive ø background · brand-mark as shape · light bg
   ═════════════════════════════════════════════════════════════════ */
function VariantB({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden" style={{ background: "#c8c8c8" }}>
      <VariantBadge code="B" label="massive ø · brand-mark" />

      {/* slow-rotating massive ø · the laconis sigil */}
      <motion.div
        initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
        animate={{ rotate: 8, scale: 1, opacity: 1 }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          scale: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          opacity: { duration: 1.8, ease: "easeOut" },
        }}
        aria-hidden
        className="absolute -right-[12%] top-[-8%] pointer-events-none select-none font-black"
        style={{
          fontSize: "75vw",
          color: "#b084d3",
          opacity: 0.18,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
        }}
      >
        ø
      </motion.div>

      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(10,10,10,0.18) 0.8px, transparent 1.4px)",
          backgroundSize: "32px 32px",
          opacity: 0.45,
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      />

      <div className="container-site relative z-10">
        <HeroText t={t} scheme="light" locale={locale} />
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   VARIANT C · conic-gradient lamp · lime spotlight from top · dark
   ═════════════════════════════════════════════════════════════════ */
function VariantC({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a0a0a]">
      <VariantBadge code="C" label="conic lamp · lime spotlight" />

      {/* the lamp cone · two conic gradients meeting at top center */}
      <motion.div
        initial={{ opacity: 0.4, width: "18rem" }}
        animate={{ opacity: 1, width: "32rem" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "conic-gradient(from 70deg at 50% 0%, transparent 0%, #e1fd52 30%, transparent 50%)",
        }}
        className="absolute left-1/2 -translate-x-1/2 top-0 h-[70vh] pointer-events-none"
      />
      {/* horizontal beam-line · the lamp tube */}
      <motion.div
        initial={{ width: "8rem", opacity: 0 }}
        animate={{ width: "30rem", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-[2px] h-[1px] bg-[#e1fd52] pointer-events-none"
        style={{ boxShadow: "0 0 12px #e1fd52, 0 0 30px #e1fd52" }}
      />
      {/* big soft glow disc */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.6 }}
        className="absolute left-1/2 -translate-x-1/2 top-[-10vh] w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-site relative z-10">
        <HeroText t={t} scheme="dark" locale={locale} />
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   VARIANT D · drifting gradient blobs · atmospheric · light bg
   ═════════════════════════════════════════════════════════════════ */
function VariantD({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden" style={{ background: "#c8c8c8" }}>
      <VariantBadge code="D" label="drifting blobs · atmospheric" />

      {/* lime blob · top-left */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[10%] w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
          opacity: 0.45,
          filter: "blur(50px)",
        }}
      />
      {/* lila blob · bottom-right */}
      <motion.div
        animate={{ x: [0, -90, 40, 0], y: [0, 70, -50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] bottom-[5%] w-[48vw] h-[48vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
          opacity: 0.55,
          filter: "blur(50px)",
        }}
      />
      {/* tiny lime accent · top-right */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] top-[20%] w-[18vw] h-[18vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
          opacity: 0.4,
          filter: "blur(30px)",
        }}
      />

      <div className="container-site relative z-10">
        <HeroText t={t} scheme="light" locale={locale} />
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   Page · stack all 4 variants vertically
   ═════════════════════════════════════════════════════════════════ */
export default function Page() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <div>
      {/* sticky guide bar at top */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3 px-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e1fd52] flex flex-wrap gap-x-6 gap-y-1">
        <span className="text-white/40">hero exploration · scroll →</span>
        <a href="#a" className="hover:text-white">A · floating shapes</a>
        <a href="#b" className="hover:text-white">B · massive ø</a>
        <a href="#c" className="hover:text-white">C · conic lamp</a>
        <a href="#d" className="hover:text-white">D · drifting blobs</a>
      </div>

      <div id="a"><VariantA t={t} locale={locale} /></div>
      <div id="b"><VariantB t={t} locale={locale} /></div>
      <div id="c"><VariantC t={t} locale={locale} /></div>
      <div id="d"><VariantD t={t} locale={locale} /></div>
    </div>
  );
}
