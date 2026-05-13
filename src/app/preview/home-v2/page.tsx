"use client";

/**
 * /preview/home-v2 · komplette home-redesign basierend auf pinterest-board.
 *
 * v2-iteration (post-feedback):
 * - Hero: marker-stroke + scribble-effekte vom aktuellen Hero rein
 * - Service cards: morph-hover mit blob-shapes statt static chips
 * - Contact: heller, lesbar (raus aus pure-dark)
 * - NEU: parallax-ø signature-section (mouse-driven 3D-layers)
 * - Numerierung (№ 01 etc) überall raus
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HorizontalCases } from "@/components/home/HorizontalCases";

export default function HomeV2Preview() {
  return (
    <main className="bg-[#c8c8c8] text-[#0a0a0a]">
      <PreviewBanner />
      <SplitHero />
      <ServicesMorphGrid />
      {/* scroll-jacked horizontal cases · von der echten home reused */}
      <div data-theme="dark" className="bg-dark text-offwhite">
        <HorizontalCases />
      </div>
      <OParallax />
      <SplitStatement />
      <ContactBlock />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PREVIEW BANNER
   ═══════════════════════════════════════════════════════════════ */

function PreviewBanner() {
  return (
    <div className="bg-[#0a0a0a] text-offwhite py-2.5 px-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.12em] sticky top-0 z-50">
      <span className="text-accent-ink">
        ↘ preview · home-v2 · pinterest-direction · iteration 2
      </span>
      <Link
        href="/"
        className="text-offwhite/85 hover:text-accent-ink transition-colors"
      >
        ← echte home
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 · SPLIT HERO mit marker-stroke + scribble-effekten
   ═══════════════════════════════════════════════════════════════ */

const MARKER_PATH =
  "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";
const MARKER_STROKE_WIDTH = 58;
const MARKER_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'><path d='${MARKER_PATH}' stroke='black' stroke-width='${MARKER_STROKE_WIDTH}' stroke-linecap='round' fill='none'/></svg>`,
)}")`;

function SplitHero() {
  return (
    <section className="relative min-h-[100svh] bg-[#c8c8c8] flex items-center">
      <div className="container-site w-full">
        {/* linksbündig · headline + 1-zeilen-subtitle + 1 CTA · viel atmen-platz */}
        <div className="max-w-[1100px]">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,10vw,10rem)] leading-[0.92] tracking-[-0.035em] font-black text-[#0a0a0a]"
          >
            {/* zeile 1 · marker-stroke auf "design" · clean linksbündig */}
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
                    strokeWidth={MARKER_STROKE_WIDTH}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 0.7,
                        delay: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                      },
                      opacity: { duration: 0.2, delay: 0.4 },
                    }}
                  />
                </svg>
                <span className="relative">design</span>
                {/* mask-cutout · darker through the stroke */}
                <motion.span
                  aria-hidden
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                    ease: [0.65, 0, 0.35, 1],
                  }}
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
                  design
                </motion.span>
              </span>
            </span>

            {/* zeile 2 · clean linksbündig */}
            <span className="block whitespace-nowrap">mit meinung.</span>

            {/* zeile 3 · "seele" italic-serif, scribbles drunter in lila · clean linksbündig */}
            <span className="block whitespace-nowrap">
              web mit{" "}
              <span className="relative inline-block">
                <span
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  seele
                </span>
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 30"
                  preserveAspectRatio="none"
                  className="absolute left-[-2%] right-[-2%] -bottom-[0.18em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
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
                      pathLength: {
                        duration: 0.45,
                        delay: 0.95,
                        ease: [0.65, 0, 0.35, 1],
                      },
                      opacity: { duration: 0.2, delay: 0.95 },
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
                      pathLength: {
                        duration: 0.4,
                        delay: 1.2,
                        ease: [0.65, 0, 0.35, 1],
                      },
                      opacity: { duration: 0.2, delay: 1.2 },
                    }}
                  />
                </motion.svg>
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mt-10 text-[16px] md:text-[18px] leading-relaxed text-[#0a0a0a]/75 max-w-[520px]"
          >
            für leute, die ihre marke ernst nehmen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7 }}
            className="mt-10"
          >
            <Link
              href="/kontakt#projekt"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] px-5 py-3 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              projekt starten →
            </Link>
          </motion.div>
        </div>

      </div>

    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 · SERVICES MORPH GRID
   blob-shapes hinter content, morph on hover, mouse-tilt on cards
   ═══════════════════════════════════════════════════════════════ */

/* lila als neuer CI-akzent · #b084d3 · für alle non-primary cards */
const LILA = "#b084d3";

const SERVICES = [
  {
    label: "web",
    title: "websites die was können.",
    desc: "next.js · eigenes CMS · responsive · seo · dreisprachig.",
    chips: ["next.js", "tailwind", "ssr", "seo"],
    primary: true,
    blob: "#e1fd52",
  },
  {
    label: "branding",
    title: "marken mit kante.",
    desc: "wortmarke · brand guide · farbsystem · social-tiles.",
    chips: ["logo", "guide", "social", "favicon"],
    blob: LILA,
  },
  {
    label: "print",
    title: "papier mit gewicht.",
    desc: "visitenkarten · flyer · broschüren · druck-koordination.",
    chips: ["karten", "flyer", "broschüren"],
    blob: LILA,
  },
  {
    label: "seo",
    title: "auffindbar, von tag eins.",
    desc: "core web vitals · structured data · sitemap · llms.txt.",
    chips: ["lighthouse 95+", "schema", "sitemap"],
    blob: LILA,
  },
  {
    label: "cms",
    title: "selbst pflegen, ohne stress.",
    desc: "eigenes CMS · admin-panel · keine plugin-hölle.",
    chips: ["custom", "no-plugins", "admin"],
    blob: LILA,
  },
  {
    label: "mehrsprachig",
    title: "DE · FR · EN nativ.",
    desc: "echte url-struktur · hreflang · per-locale schema.",
    chips: ["DE", "FR", "EN", "i18n"],
    blob: LILA,
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 18, stiffness: 180 });
  const smoothY = useSpring(mouseY, { damping: 18, stiffness: 180 });
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  /* blob movement — opposite direction for parallax */
  const blobX = useTransform(smoothX, [0, 1], ["-12%", "12%"]);
  const blobY = useTransform(smoothY, [0, 1], ["-8%", "8%"]);

  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative rounded-2xl p-7 border overflow-hidden cursor-pointer ${
        s.primary
          ? "bg-[#0a0a0a] text-offwhite border-[#0a0a0a]"
          : "bg-[#d8d8d8] text-[#0a0a0a] border-[#0a0a0a]/10"
      }`}
    >
      {/* morph-blob behind content */}
      <motion.div
        aria-hidden
        animate={{
          scale: hovered ? 2.2 : 1,
          borderRadius: hovered
            ? "30% 70% 50% 60% / 50% 40% 70% 60%"
            : "50%",
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: blobX,
          y: blobY,
          background: s.blob,
          opacity: hovered ? 0.55 : 0.2,
          position: "absolute",
          width: "60%",
          aspectRatio: "1",
          top: "20%",
          left: "30%",
          filter: hovered ? "blur(24px)" : "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10">
        {/* top row · label + dot */}
        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
              s.primary ? "text-[#e1fd52]" : "text-[#0a0a0a]/65"
            }`}
          >
            · {s.label}
          </span>
          <span
            aria-hidden
            className={`w-1.5 h-1.5 rounded-full transition-transform ${
              s.primary ? "bg-[#e1fd52]" : ""
            }`}
            style={{
              background: s.primary ? "#e1fd52" : s.blob,
              transform: hovered ? "scale(2.5)" : "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        </div>

        {/* title */}
        <h3
          className={`mt-8 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[0.98] font-black tracking-[-0.02em] ${
            s.primary ? "text-offwhite" : "text-[#0a0a0a]"
          }`}
        >
          {s.title}
        </h3>

        {/* description */}
        <p
          className={`mt-4 text-[13px] leading-relaxed ${
            s.primary ? "text-offwhite/65" : "text-[#0a0a0a]/65"
          }`}
        >
          {s.desc}
        </p>

        {/* chips · slide-in on hover */}
        <motion.div
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-wrap gap-1.5"
        >
          {s.chips.map((c) => (
            <span
              key={c}
              className={`font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border ${
                s.primary
                  ? "border-offwhite/15 text-offwhite/65"
                  : "border-[#0a0a0a]/15 text-[#0a0a0a]/65"
              }`}
            >
              {c}
            </span>
          ))}
        </motion.div>

        {/* arrow · slides in on hover */}
        <motion.div
          animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className={`absolute bottom-7 right-7 font-mono text-[18px] ${
            s.primary ? "text-[#e1fd52]" : "text-[#0a0a0a]"
          }`}
          aria-hidden
        >
          →
        </motion.div>

        {s.primary && (
          <span
            aria-hidden
            className="absolute top-0 right-0 font-mono text-[9px] uppercase tracking-[0.14em] text-[#0a0a0a] bg-[#e1fd52] px-2 py-0.5 rounded-full"
          >
            hauptberuf
          </span>
        )}
      </div>
    </motion.article>
  );
}

function ServicesMorphGrid() {
  return (
    <section className="bg-[#c8c8c8] py-24 md:py-32">
      <div className="container-site">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-[640px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">
              · was ich mache
            </span>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] font-black tracking-[-0.03em] text-[#0a0a0a]">
              sechs disziplinen.
              <br />
              <span className="text-[#0a0a0a]/55">eine hand.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[14px] leading-relaxed text-[#0a0a0a]/65">
            web ist hauptberuf · branding und print laufen mit, wenn's
            zusammen sinn ergibt. keine outsourcing-kette, kein telefon-
            zwischen-spiel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.label} s={s} />
          ))}
        </div>

        <p className="mt-12 font-hand text-[19px] text-[#0a0a0a]/55 rotate-[-1deg] inline-block">
          hover die karten · jede hat ihr eigenes leben ↗
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 · PHONE STACK · 3 cases iso-tilted (unchanged)
   ═══════════════════════════════════════════════════════════════ */

const PHONE_CASES = [
  {
    brand: "fabry baumpflege",
    sector: "web · ostbelgien · 2025",
    accent: "#2f5d3a",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop",
    tagline: "65 jahre handwerk · 14 tage neue website.",
    rotate: -10,
    z: 1,
    slug: "fabry-baumpflege",
  },
  {
    brand: "holoroom",
    sector: "branding · 2025",
    accent: "#b084d3",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&auto=format&fit=crop",
    tagline: "violett war am ersten tag klar.",
    rotate: 0,
    z: 2,
    slug: "holoroom",
  },
  {
    brand: "léspoir asbl",
    sector: "web + branding · 2026",
    accent: "#d94f4f",
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80&auto=format&fit=crop",
    tagline: "asbl mit haltung · ein guss.",
    rotate: 8,
    z: 1,
    slug: "lespoir-asbl",
  },
];

function PhoneStack() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="relative bg-[#0a0a0a] text-offwhite py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(225,253,82,0.5) 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="container-site relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
          <div className="max-w-[640px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#e1fd52]">
              · was tatsächlich live ist
            </span>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] font-black tracking-[-0.03em]">
              drei projekte.
              <br />
              <span className="text-offwhite/55">drei haltungen.</span>
            </h2>
          </div>
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] px-5 py-3 rounded-full bg-[#e1fd52] text-[#0a0a0a] hover:opacity-85 transition-opacity"
          >
            alle cases →
          </Link>
        </div>

        <div className="relative h-[640px] md:h-[720px] flex items-center justify-center">
          {PHONE_CASES.map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                rotate: 0,
                scale: 1.04,
                y: -10,
                zIndex: 100,
                transition: { duration: 0.4 },
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                zIndex: hovered === i ? 100 : c.z,
                position: "absolute",
                left: `${20 + i * 30}%`,
                transform: `translateX(-50%)`,
              }}
              className="cursor-pointer"
            >
              <Link
                href={`/referenzen/${c.slug}`}
                className="block w-[260px] md:w-[300px] aspect-[9/19] rounded-[44px] bg-[#0a0a0a] border-[7px] border-[#1a1a1a] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] overflow-hidden relative"
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-[#0a0a0a] rounded-full z-30" />
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 pt-3 z-20 font-mono text-[9px] text-offwhite/85">
                  <span>9:41</span>
                  <span>5G · 87%</span>
                </div>
                <div className="absolute inset-0 top-11">
                  <Image
                    src={c.img}
                    alt={c.brand}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.9) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.12em] mb-2"
                      style={{ color: c.accent }}
                    >
                      · {c.sector}
                    </span>
                    <h3 className="text-[20px] leading-tight font-black text-offwhite lowercase">
                      {c.brand}
                    </h3>
                    <p className="mt-2 text-[11px] text-offwhite/75 leading-snug">
                      {c.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-16 font-hand text-[20px] text-offwhite/65 rotate-[-1deg] inline-block">
          hover für details · click öffnet den case ↗
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 · ECHTES 3D-Ø · stacked-SVG-extrusion aus dem logo
   30 schichten desselben pfads, je translateZ-offset, 3D-rotation
   via maus + auto-spin · echte räumliche tiefe, kein fake-parallax
   ═══════════════════════════════════════════════════════════════ */

/* exakter ø-pfad aus /public/laconis-logo.svg (path 8) */
const O_PATH =
  "M348.98,105.25c-4.99,17.51-18.81,30.62-36.75,34.37-3.95.83-7.73,1.21-11.5,1.21-2.83,0-5.66-.21-8.55-.62-12.64-1.78-23.68-8.32-31.23-17.95l5.21-2.67v-.03s7-3.64,7-3.64l.64-.34c5.85,7.23,14.4,11.95,25.1,12.44.58.03,1.15.04,1.72.04,13.74,0,25.92-7.54,31.81-20.26,2.08-4.51,3.27-9.12,3.76-13.83.31-2.9.35-5.86.18-8.85-.04-.63-.08-1.26-.14-1.89-.11-1.11-.25-2.21-.43-3.3-.18-1.08-.4-2.14-.66-3.19l-.09.04-2.78,1.45-2.88,1.49-53.56,27.76-2.78,1.45-2.78,1.44-7.33,3.8-2.78,1.45-2.78,1.44c-.43-.73-.85-1.48-1.25-2.25-.09-.16-.18-.33-.26-.5-.48-.93-.92-1.87-1.33-2.83-.03-.04-.04-.08-.05-.13-.42-.96-.8-1.93-1.15-2.93-.26-.73-.51-1.47-.73-2.22-.08-.27-.16-.54-.24-.81-.29-1.03-.56-2.06-.81-3.11-.24-1.06-.46-2.12-.64-3.19h0c-.36-2.04-.61-4.1-.76-6.17-.66-8.82.57-17.76,3.75-25.99,5.94-15.37,18.68-26.38,34.76-29.77,4.03-.85,8.09-1.3,12.14-1.3,4.97,0,9.94.67,14.83,2.05,9.44,2.67,17.6,8.09,23.7,15.34l-11.93,6.18-.9.47c-5.99-6.71-14.47-10.96-24.89-11.26-.37-.01-.73-.02-1.1-.02-13.27,0-24.95,6.96-30.94,18.92-3.68,7.34-5.06,15.3-4.64,23.63.01.21.03.42.04.63l-.09.04c.07,1.13.18,2.25.33,3.35.14,1.1.33,2.18.55,3.24l.09-.04,2.89-1.5,2.92-1.51,53.04-27.5,2.79-1.45,2.79-1.45,12.8-6.64c.56.88,1.1,1.77,1.61,2.69l-.08.04c.51.91.98,1.84,1.43,2.78.03.04.04.08.06.11.45.95.86,1.9,1.25,2.88.39.97.75,1.96,1.08,2.97.29.88.55,1.76.79,2.67.04.13.07.27.1.4.28,1.04.51,2.1.73,3.15l.09-.04c1.96,9.69,1.55,19.75-1.16,29.25Z";

/* tighter viewBox um ø herum · ø lebt bei x ~248-380, y ~0-142 im 600×141 logo */
const O_VIEWBOX = "246 -3 138 148";

const EXTRUSION_LAYERS = 28;
const LAYER_DEPTH = 1.6; // pixel z-offset pro schicht
const AUTO_SPIN_PERIOD = 18; // sekunden für eine volle Y-drehung

function OParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 110 });
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 110 });

  /* mouse · zusätzliche rotation auf top von auto-spin */
  const mouseRotY = useTransform(smoothX, [-1, 1], [-25, 25]);
  const mouseRotX = useTransform(smoothY, [-1, 1], [18, -18]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    mouseY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden"
      style={{
        /* neutral grau · 3D-ø bleibt lime, lila lebt woanders */
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, #f0f0f0 0%, #d8d8d8 70%, #c8c8c8 100%)",
        minHeight: "100svh",
        perspective: "1800px",
      }}
    >
      {/* dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.6) 1px, transparent 1.4px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* corner labels */}
      <span className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 z-30">
        · echtes 3D · {EXTRUSION_LAYERS} schichten extrudiert
      </span>
      <span className="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 z-30">
        signature · lacønis
      </span>

      {/* THE Ø · 3D-extruded stack */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            rotateY: mouseRotY,
            rotateX: mouseRotX,
            width: "min(72vh, 600px)",
            aspectRatio: "138 / 148",
          }}
          animate={{ rotateZ: [0, 360] }}
          transition={{
            duration: AUTO_SPIN_PERIOD,
            repeat: Infinity,
            ease: "linear",
            /* nur Z spinnt automatisch · X/Y bleibt mouse-controlled */
          }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* extrusion · N stacked SVGs translateZ progressively */}
            {Array.from({ length: EXTRUSION_LAYERS }).map((_, i) => {
              const z =
                (i - EXTRUSION_LAYERS / 2) * LAYER_DEPTH;
              /* color gradient · dark-back → LIME-front durch die extrusion
                 lima bleibt monochrom · lila lebt im split-statement */
              const isOuterFront = i === EXTRUSION_LAYERS - 1;
              const isOuterBack = i === 0;
              const ratio = i / (EXTRUSION_LAYERS - 1);
              let fill: string;
              if (isOuterFront) fill = "#e1fd52";
              else if (isOuterBack) fill = "#0a0a0a";
              else {
                /* interpolate dark → lime */
                const r = Math.round(0x0a + ratio * (0xe1 - 0x0a));
                const g = Math.round(0x0a + ratio * (0xfd - 0x0a));
                const b = Math.round(0x0a + ratio * (0x52 - 0x0a));
                fill = `rgb(${r}, ${g}, ${b})`;
              }
              return (
                <svg
                  key={i}
                  viewBox={O_VIEWBOX}
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    transform: `translateZ(${z}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                  }}
                >
                  <path d={O_PATH} fill={fill} />
                </svg>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* center label · safe distance left, doesn't fight the 3D object */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-8 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[100svh]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]/55">
            · die marke
          </span>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.98] font-black tracking-[-0.03em] text-[#0a0a0a]">
            das ø macht
            <br />
            <span className="text-[#0a0a0a]/65">den unterschied.</span>
          </h2>
          <p className="mt-6 text-[14px] leading-relaxed text-[#0a0a0a]/80 max-w-[420px]">
            kleine geste · große geschichte. lacønis statt laconis, weil
            exakt das fehlt was du im internet sonst überall findest. das
            zeichen dreht sich live · {EXTRUSION_LAYERS} schichten echte
            extrusion aus dem original-logo.
          </p>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {[
              "echte 3D-extrusion",
              `${EXTRUSION_LAYERS} layers`,
              "mouse-controlled",
              "auto-spin · float",
              "aus dem logo-pfad",
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[#0a0a0a]/20 text-[#0a0a0a]/75 bg-[#f0f0f0]/55"
              >
                · {t}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:block" aria-hidden />
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-hand text-[18px] text-[#0a0a0a]/55 z-30 rotate-[-1deg]">
        bewege die maus · die marke tanzt mit ↗
      </span>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 · SPLIT STATEMENT (unchanged · numerierung raus)
   ═══════════════════════════════════════════════════════════════ */

function SplitStatement() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80svh]">
      {/* LILA slab · weicheres lila (#b084d3) · dark text wegen kontrast (white wäre 1.7:1, dark ist 12:1) */}
      <div
        className="relative flex flex-col justify-center p-10 md:p-16 lg:p-20 text-[#0a0a0a]"
        style={{ background: "#b084d3" }}
      >
        {/* dot-grid · dunkel auf hellem lila */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/75">
          · was ich glaube
        </span>
        <h2 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-black tracking-[-0.035em] text-[#0a0a0a]">
          ein mensch.
          <br />
          <span className="text-[#0a0a0a]/55">kein team.</span>
          <br />
          und ich nehm's
          <br />
          <span className="bg-[#0a0a0a] text-[#e1fd52] px-3 py-0 inline-block">
            persönlich.
          </span>
        </h2>
        <p className="mt-10 max-w-[440px] text-[15px] leading-relaxed text-[#0a0a0a]/85">
          kein ticket-tool, keine zwischenschicht, kein agentur-höflichkeits-
          ping-pong. du schreibst mir, ich antworte · meistens in unter 2h.
        </p>
        <div className="mt-12 inline-flex items-center gap-4">
          <span aria-hidden className="block h-px w-12 bg-[#0a0a0a]/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/75">
            nicolas · eupen · 2026
          </span>
        </div>
      </div>

      <div className="relative bg-[#0a0a0a] text-offwhite flex flex-col justify-center p-10 md:p-16 lg:p-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/65">
          · wer
        </span>
        <div className="mt-8 grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-6 items-center">
          <div
            className="relative aspect-[3/4] rounded-md overflow-hidden border border-offwhite/15"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, #2a2a2a 0%, #0a0a0a 80%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[64px] md:text-[88px] font-black text-offwhite/15"
                style={{ letterSpacing: "-0.08em" }}
              >
                ns
              </span>
            </div>
            <span
              aria-hidden
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#e1fd52]/65 rotate-[-3deg]"
            />
            <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.12em] text-offwhite/55">
              nicolas · 2026
            </span>
          </div>
          <div>
            <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-black text-offwhite">
              nicolas spies.
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/55">
              freelance designer + dev · eupen, BE
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                "mediengestalter seit 2019",
                "DE · FR · EN",
                "next.js · figma · code",
                "solo · keine agentur",
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border border-offwhite/15 text-offwhite/65"
                >
                  · {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/ueber-mich"
          className="mt-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink hover:text-offwhite transition-colors w-fit"
        >
          mehr über mich →
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 · CONTACT BLOCK · light & readable (raus aus dark-grab)
   ═══════════════════════════════════════════════════════════════ */

function ContactBlock() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#e8e8e8" }}
    >
      {/* lime tint subtle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(225,253,82,0.18) 0%, transparent 70%)",
        }}
      />
      {/* dot-grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.5) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-site relative">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/65">
          · ready, wenn du bist
        </span>
        <h2 className="mt-6 text-[clamp(3rem,9vw,8rem)] leading-[0.88] font-black tracking-[-0.04em] text-[#0a0a0a]">
          lass starten.
        </h2>
        <p className="mt-8 max-w-[520px] text-[15px] leading-relaxed text-[#0a0a0a]/65">
          erstes gespräch ist kostenlos, dauert ca. 30 minuten. kein deck,
          kein verkauf · nur fragen + klarheit ob wir zusammen passen.
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[900px]">
          {[
            { l: "schreiben", v: "nicolas@laconis.be" },
            { l: "anrufen", v: "+32 488 43 91 47" },
            { l: "standort", v: "rotenberg 18a · eupen, BE" },
            { l: "antwortzeit", v: "ø < 2h werktags" },
          ].map((s) => (
            <div
              key={s.l}
              className="border-t-2 border-[#0a0a0a]/15 pt-3"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">
                {s.l}
              </div>
              <div className="mt-1 text-[14px] text-[#0a0a0a]">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            href="/kontakt#projekt"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
          >
            projekt starten →
          </Link>
          <Link
            href="/preise"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] px-6 py-4 rounded-full border-2 border-[#0a0a0a]/25 hover:border-[#0a0a0a]/65 text-[#0a0a0a] transition-colors"
          >
            preise ansehen
          </Link>
        </div>

        <div className="mt-24 flex items-baseline justify-between flex-wrap gap-4 pt-6 border-t-2 border-[#0a0a0a]/15">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">
            · laconis · solo studio · eupen · 2026 ·
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">
            DE · FR · EN
          </span>
        </div>
      </div>
    </section>
  );
}
