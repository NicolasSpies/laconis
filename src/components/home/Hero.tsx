"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* sweep-path für den marker · einzelner hand-stroke (kein closed shape mehr)
   leichte wellen simulieren echte hand-bewegung · wird als thick stroke gezeichnet
   → gleiche pathLength-animation wie die striche unter "Seele." */
const MARKER_PATH =
  "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";
const MARKER_STROKE_WIDTH = 58;
/* die mask für das dunkle "Design" folgt exakt dem stroke-pfad · so landet
   der text genau dort wo der marker real ist, nicht im alten blob-shape */
const MARKER_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'><path d='${MARKER_PATH}' stroke='black' stroke-width='${MARKER_STROKE_WIDTH}' stroke-linecap='round' fill='none'/></svg>`,
)}")`;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 grid-bg pointer-events-none -z-10"
        style={{
          // sanfterer ausblend · fadet früher und länger aus → kein harter cut zum body-grid
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
        }}
      />
      <div className="container-site relative pt-28 pb-20 md:pt-32 md:pb-28 w-full">
        {/* geo-meta · top-right · einsatzort-stempel · sitzt auf höhe der headline-
            oberkante · authentisches "laconis ist hier und nirgends anders"-
            statement · ersetzt die alte pill · SEO-stichwort "eupen" inkl. */}
        <motion.aside
          aria-label="standort"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute top-28 md:top-32 right-6 md:right-10 text-right pointer-events-none select-none"
        >
          <div className="flex items-center gap-2 justify-end">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full bg-lime"
            />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 tabular-nums">
              50.6288° N · 6.0384° E
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            eupen · ostbelgien
          </div>
        </motion.aside>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[960px]"
        >
          <motion.h1
            variants={item}
            className="heading-display text-[clamp(2rem,8vw,8.5rem)] text-offwhite tracking-[-0.035em] leading-[1.02]"
          >
            {/* Zeile 1 · Design-marker · der eine signature-move des heros */}
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
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 1.1, delay: 0.9, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 0.9 },
                    }}
                  />
                </svg>
                <span className="relative">Design</span>
                <motion.span
                  aria-hidden
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.1, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
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
                  Design
                </motion.span>
              </span>
            </span>

            {/* Zeile 2 */}
            <span className="block whitespace-nowrap">mit Meinung.</span>

            {/* Zeile 3 · serif-italic auf "Seele" + zwei handmade-striche drunter
                · typografisches "!!!" · gelb nur in den strichen, wort bleibt offwhite
                · striche zeichnen sich NACH dem marker rein (stagger) */}
            <span className="block whitespace-nowrap">
              Web mit{" "}
              <span className="relative inline-block">
                <span
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Seele.
                </span>
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 30"
                  preserveAspectRatio="none"
                  className="absolute left-[-2%] right-[-2%] -bottom-[0.18em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
                >
                  {/* erster strich · länger, leicht wellig */}
                  <motion.path
                    d="M6 10 C 46 3, 112 15, 194 7"
                    stroke="rgb(var(--accent))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.55, delay: 2.3, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 2.3 },
                    }}
                  />
                  {/* zweiter strich · etwas kürzer, versetzt · gibt den "nochmal"-gestus */}
                  <motion.path
                    d="M18 23 C 64 17, 128 26, 180 21"
                    stroke="rgb(var(--accent))"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.5, delay: 2.65, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 2.65 },
                    }}
                  />
                </motion.svg>
              </span>
            </span>
          </motion.h1>

          {/* manifesto · caveat-handschrift · kommt NACH den strichen rein
              (delay 3.3s) · leicht rotated wie hingeworfen · bricht die grotesk-
              strenge, matcht marker + striche (hand-drawn-familie)
              · eigenes initial/animate bypasst den variants-stagger */}
          <motion.p
            initial={{ opacity: 0, y: 10, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 0.7, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "clamp(1.6rem, 2.6vw, 2rem)",
              lineHeight: 1.15,
              color: "rgb(var(--fg) / 0.78)",
              transformOrigin: "left center",
              maxWidth: "640px",
            }}
            className="mt-10"
          >
            kaffee. skizze. code. so läuft das bei mir.
          </motion.p>

          {/* subheadline · sagt konkret WAS und FÜR WEN · kommt leise, nach der handschrift */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[560px] font-sans text-[14px] md:text-[15px] leading-relaxed text-offwhite/55 lowercase"
          >
            websites, branding, print · für handwerk, kleine firmen und gastro
            in ostbelgien und drumherum.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button
              href="/kontakt#projekt"
              size="md"
              analyticsLabel="home_hero_kontakt"
            >
              projekt starten →
            </Button>
          </motion.div>
        </motion.div>

        {/* collage · rotierte papierschnipsel rechts · erst auf ≥xl, damit
            der hero auf mobile rein typografisch bleibt. wireframe-snippet,
            logo-skizze, palette · antwortet visuell auf "was verkauft er hier". */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.6 }}
          className="hidden xl:block pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-[300px] 2xl:w-[340px]"
        >
          {/* logo-skizze · oben */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.8, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-8 top-0 w-[220px] rounded-[3px] bg-[rgba(255,255,255,0.045)] border border-ink/10 p-4 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]"
          >
            <span
              aria-hidden
              className="absolute -top-3 left-10 h-4 w-14 bg-offwhite/10 border border-ink/10 rounded-[2px] -rotate-6"
            />
            <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/35 mb-2">
              logo · skizze
            </div>
            <div className="heading-display text-[28px] leading-none lowercase text-offwhite">
              maison·leu
            </div>
            <div className="mt-2 h-px w-2/3 bg-offwhite/20" />
            <div className="mt-1 font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              v·03 · wip
            </div>
          </motion.div>

          {/* wireframe-snippet · mitte */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.8, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[140px] w-[240px] rounded-[3px] bg-[rgba(255,255,255,0.03)] border border-ink/10 p-3 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]"
          >
            <svg
              viewBox="0 0 220 130"
              className="w-full h-auto text-offwhite/35"
              fill="none"
              aria-hidden
            >
              <rect x="1" y="1" width="218" height="128" rx="4" stroke="currentColor" strokeWidth="0.6" />
              <line x1="1" y1="14" x2="219" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <circle cx="8" cy="7.5" r="1.5" fill="currentColor" opacity="0.4" />
              <circle cx="14" cy="7.5" r="1.5" fill="currentColor" opacity="0.4" />
              <circle cx="20" cy="7.5" r="1.5" fill="currentColor" opacity="0.4" />
              <rect x="10" y="26" width="130" height="7" rx="1" fill="currentColor" opacity="0.55" />
              <rect x="10" y="38" width="90" height="7" rx="1" fill="currentColor" opacity="0.55" />
              <rect x="10" y="52" width="80" height="3" rx="1" fill="currentColor" opacity="0.2" />
              <rect x="10" y="58" width="70" height="3" rx="1" fill="currentColor" opacity="0.2" />
              <rect x="150" y="24" width="60" height="42" rx="2" fill="currentColor" opacity="0.1" />
              <rect x="10" y="78" width="62" height="42" rx="2" fill="currentColor" opacity="0.08" />
              <rect x="78" y="78" width="62" height="42" rx="2" fill="currentColor" opacity="0.08" />
              <rect x="146" y="78" width="62" height="42" rx="2" fill="currentColor" opacity="0.08" />
            </svg>
            <div className="mt-2 font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              wireframe · desktop
            </div>
          </motion.div>

          {/* palette · unten */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ duration: 0.8, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-14 top-[300px] rounded-[3px] bg-[rgba(255,255,255,0.045)] border border-ink/10 p-2.5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]"
          >
            <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/35 mb-1.5 px-0.5">
              palette
            </div>
            <div className="flex gap-1.5">
              {[
                { c: "#2f5d3a", rot: -4 },
                { c: "#7a4bd1", rot: 2 },
                { c: "#d94f4f", rot: -2 },
                { c: "#e8c14b", rot: 5 },
              ].map((s, i) => (
                <div
                  key={i}
                  className="w-7 h-9 rounded-[1.5px] border border-ink/10"
                  style={{ background: s.c, transform: `rotate(${s.rot}deg)` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
