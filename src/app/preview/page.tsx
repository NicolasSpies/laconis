"use client";

/**
 * /preview · lab-route für wow-direction-tests
 *
 * 6 varianten · jede zeigt ne andere "crazy shit"-richtung
 * keine i18n, kein layout-override, lebt einfach unter / (root layout drumrum)
 * trilingual + production einbau erst NACH user-feedback ("welche varianten")
 */

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   HEADER + DIVIDERS
   ═══════════════════════════════════════════════════════════════ */

function PreviewHeader() {
  return (
    <section className="relative min-h-[60svh] flex items-center border-b border-ink/10">
      <div className="container-site py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            wow-lab · 6 varianten · pre-prod
          </span>
        </div>
        <h1 className="heading-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.0] text-offwhite max-w-[1100px]">
          crazy shit
          <br />
          <span className="text-offwhite/45">
            zum durchclicken ·{" "}
          </span>
          <span
            className="italic font-serif text-accent-ink"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            sag was lebt.
          </span>
        </h1>
        <p className="mt-10 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
          jede sektion ist eine richtung. nichts ist final, nichts ist auf der echten site.
          du sagst: das hier ja, das hier nein, das hier so aber ohne X. dann bauen wir die
          finalen 2-3 davon richtig auf die produktion.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {[
            "01 · BOLD LIME SLAB",
            "02 · STACKED BROWSERS",
            "03 · 3D CARD WALL",
            "04 · CHAT THREAD",
            "05 · DRAGGABLE ARBEITSTISCH",
            "06 · HORIZONTAL CASES",
            "07 · CURSOR CANVAS",
            "08 · BRUTALIST SMASH",
          ].map((t, i) => (
            <a
              key={i}
              href={`#v${i + 1}`}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors border border-ink/15 rounded-full px-3 py-1.5"
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function VariantHeader({
  num,
  title,
  desc,
  anchor,
}: {
  num: string;
  title: string;
  desc: string;
  anchor: string;
}) {
  return (
    <div id={anchor} className="container-site pt-24 pb-10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
          variante {num}
        </span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>
      <h2 className="mt-4 heading-display text-[clamp(1.5rem,3.5vw,2.6rem)] text-offwhite leading-tight">
        {title}
      </h2>
      <p className="mt-3 max-w-[640px] text-[13px] leading-relaxed text-offwhite/55">
        {desc}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 1 · BOLD LIME SLAB
   ═══════════════════════════════════════════════════════════════ */

function Variant1_BoldLimeSlab() {
  return (
    <section className="relative">
      <VariantHeader
        num="01"
        title="bold lime slab · der eine farb-atemzug"
        desc="fullwidth lime-panel. massive serif italic statement. tiny mono labels in den ecken. ein bruch im grau-rhythmus der seite — landet typisch zwischen zwei dunklen sektionen."
        anchor="v1"
      />
      <div
        className="relative w-full min-h-[90svh] flex items-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #ecff5e 0%, #e1fd52 60%, #c8e83a 100%)",
        }}
      >
        {/* subtle dot-grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.45) 1px, transparent 1.4px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* corner labels */}
        <span className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-label text-[#1a1a1a]/70">
          № 03 · statement
        </span>
        <span className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-label text-[#1a1a1a]/70">
          eupen · 2026
        </span>
        <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-label text-[#1a1a1a]/70">
          ◇ ◇ ◇
        </span>
        <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-label text-[#1a1a1a]/70">
          · lacønis ·
        </span>

        <div className="container-site relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1100px]"
          >
            <p className="font-mono text-[11px] uppercase tracking-label text-[#1a1a1a]/60 mb-6">
              ↘ was ich glaube
            </p>
            <h3
              className="text-[clamp(2.6rem,8vw,8rem)] leading-[0.96] text-[#1a1a1a]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontStyle: "italic",
                letterSpacing: "-0.025em",
              }}
            >
              eine website ist
              <br />
              das erste wort
              <br />
              <span className="not-italic font-sans tracking-[-0.04em]">
                das deine kunden
              </span>
              <br />
              <span className="relative inline-block">
                von dir hören.
                {/* hand-stroke under */}
                <svg
                  aria-hidden
                  viewBox="0 0 600 30"
                  preserveAspectRatio="none"
                  className="absolute left-0 right-0 -bottom-3 w-full h-[0.25em] pointer-events-none overflow-visible"
                >
                  <motion.path
                    d="M8 14 C 120 4, 280 22, 590 10"
                    stroke="#1a1a1a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>
            </h3>

            <div className="mt-16 flex items-end justify-between gap-8 flex-wrap">
              <p className="font-hand text-[24px] text-[#1a1a1a]/80 max-w-[420px] leading-snug">
                also bau ich's so, als wäre es mein erstes wort an jemanden, der mich wirklich
                noch nicht kennt.
              </p>
              <span className="font-mono text-[10px] uppercase tracking-label text-[#1a1a1a]/60 whitespace-nowrap">
                — nicolas, eupen
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 2 · STACKED BROWSER MOSAIC (replaces live-website auto-demo)
   5 mock-browser-windows mit echten editorial photos · scattered &
   rotated · hover lifts + scales · click brings to front
   ═══════════════════════════════════════════════════════════════ */

const BROWSER_TABS = [
  {
    brand: "studio·vela",
    domain: "studio-vela.ch",
    tagline: "espresso · linnen · craft",
    accent: "#e8c14b",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=85&auto=format&fit=crop",
    pos: { left: "2%", top: "4%" },
    rotate: -6,
    width: 480,
  },
  {
    brand: "maison·leu",
    domain: "maison-leu.be",
    tagline: "private patisserie · brussels",
    accent: "#d94f4f",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=85&auto=format&fit=crop",
    pos: { left: "32%", top: "16%" },
    rotate: 3,
    width: 440,
  },
  {
    brand: "holoroom",
    domain: "holoroom.studio",
    tagline: "immersive spaces · antwerp",
    accent: "#7a4bd1",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85&auto=format&fit=crop",
    pos: { left: "56%", top: "2%" },
    rotate: -3,
    width: 420,
  },
  {
    brand: "atelier·nord",
    domain: "atelier-nord.eu",
    tagline: "architecture · münster",
    accent: "#6a8caf",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85&auto=format&fit=crop",
    pos: { left: "8%", top: "44%" },
    rotate: 5,
    width: 460,
  },
  {
    brand: "fabry·optik",
    domain: "fabry.be",
    tagline: "eyewear · eupen · 1959",
    accent: "#e1fd52",
    img: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=1200&q=85&auto=format&fit=crop",
    pos: { left: "44%", top: "48%" },
    rotate: -4,
    width: 440,
  },
];

function Variant2_StackedBrowsers() {
  const [topZ, setTopZ] = useState(10);
  const [zMap, setZMap] = useState<Record<number, number>>({});
  const [hovered, setHovered] = useState<number | null>(null);

  function bringFront(i: number) {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setZMap((m) => ({ ...m, [i]: newZ }));
  }

  return (
    <section className="relative">
      <VariantHeader
        num="02"
        title="stacked browsers · zeigt was gebaut wird, statt platzhalter"
        desc="5 mock-browser-fenster überlagern sich wie tabs auf nem schreibtisch. jedes mit echtem screenshot-look + brand-accent-stripe. hover hebt + entrotiert · klick bringt nach vorne. statisch genug zum lesen, dynamisch genug zum wow. ersetzt die dead-wireframes auf /leistungen/web."
        anchor="v2"
      />
      <div className="container-site pb-24">
        <div
          className="relative mx-auto rounded-2xl overflow-hidden border border-ink/10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #1a1a1a 0%, #0e0e0e 70%, #050505 100%)",
            height: "780px",
            maxWidth: "1200px",
          }}
        >
          {/* desk noise overlay · subtle lime + warm hint */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, rgba(225,253,82,0.05) 0%, transparent 35%), radial-gradient(circle at 82% 78%, rgba(232,193,75,0.04) 0%, transparent 40%)",
            }}
          />
          <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
            schreibtisch · 5 fenster offen
          </span>
          <span
            className="absolute top-5 right-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50 inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            live · klick um zu sortieren
          </span>

          {BROWSER_TABS.map((tab, i) => (
            <motion.button
              type="button"
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => bringFront(i)}
              initial={{ opacity: 0, y: 30, rotate: tab.rotate, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: hovered === i ? 0 : tab.rotate,
                scale: hovered === i ? 1.04 : 1,
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                left: tab.pos.left,
                top: tab.pos.top,
                width: tab.width,
                zIndex: zMap[i] ?? 10 - i,
                transformOrigin: "center center",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
              className="text-left"
            >
              <div
                className="relative rounded-lg overflow-hidden border border-ink/20 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                style={{ background: "#0e0e0e" }}
              >
                {/* chrome */}
                <div className="h-8 bg-[#1a1a1a] border-b border-ink/15 flex items-center px-3 gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-[10px] text-offwhite/55 bg-[#0a0a0a] px-2.5 py-0.5 rounded">
                    {tab.domain}
                  </span>
                </div>
                {/* viewport */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tab.img}
                    alt={tab.brand}
                    fill
                    sizes="500px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 100%)`,
                    }}
                  />
                  {/* accent stripe */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 top-1/2 h-[2px]"
                    style={{
                      background: tab.accent,
                      opacity: 0.6,
                      boxShadow: `0 0 30px 4px ${tab.accent}55`,
                    }}
                  />
                  {/* content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span
                        className="font-mono text-[9px] uppercase tracking-label"
                        style={{ color: tab.accent }}
                      >
                        · {tab.tagline}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/65 bg-[#0a0a0a]/65 backdrop-blur px-2 py-0.5 rounded">
                        nº {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h4
                        className="text-[22px] leading-tight text-offwhite lowercase"
                        style={{
                          fontFamily: "var(--font-instrument), serif",
                          fontStyle: "italic",
                        }}
                      >
                        {tab.brand}
                      </h4>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                          {tab.domain}
                        </span>
                        <span
                          className="font-mono text-[9px] uppercase tracking-label px-2 py-0.5 rounded-full text-[#0a0a0a]"
                          style={{ background: tab.accent }}
                        >
                          see ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 3 · 3D CARD WALL (replaces type-as-mask)
   9 brand-cards in 3D-raum, perspective-tilted · maus neigt das
   gesamte grid, einzelne karten haben eigenen z-offset · hover
   bringt karte nach vorne mit slight scale + glow
   ═══════════════════════════════════════════════════════════════ */

const WALL_CARDS = [
  { brand: "studio·vela", accent: "#e8c14b", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format&fit=crop", z: 60 },
  { brand: "maison·leu", accent: "#d94f4f", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop", z: 20 },
  { brand: "holoroom", accent: "#7a4bd1", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop", z: 80 },
  { brand: "fabry·optik", accent: "#e1fd52", img: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=600&q=80&auto=format&fit=crop", z: 0 },
  { brand: "atelier·nord", accent: "#6a8caf", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80&auto=format&fit=crop", z: 100 },
  { brand: "lagune", accent: "#3c8f8a", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop", z: 30 },
  { brand: "buchholz", accent: "#b8694a", img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&q=80&auto=format&fit=crop", z: 50 },
  { brand: "nordrand", accent: "#e1fd52", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop", z: 70 },
  { brand: "kobalt", accent: "#4b6cd1", img: "https://images.unsplash.com/photo-1545239351-cefa43af60f3?w=600&q=80&auto=format&fit=crop", z: 10 },
];

function Variant3_3DWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState<number | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  function handleLeave() {
    setMouse({ x: 0.5, y: 0.5 });
    setHovered(null);
  }

  const rx = (mouse.y - 0.5) * -18;
  const ry = (mouse.x - 0.5) * 18;

  return (
    <section className="relative">
      <VariantHeader
        num="03"
        title="3D card wall · 9 brand-cards im raum, maus neigt alles"
        desc="kein photo-overlay, keine letter-tricks · pure raum-tiefe. 9 cards schweben in 3D-perspective, jede mit eigenem z-offset. maus bewegt sich → das ganze grid neigt sich wie ein fenster in einen raum. hover bringt karte nach vorne, click holt sie ganz an die scheibe. spatial · taktil · niemand sonst macht das."
        anchor="v3"
      />
      <div className="container-site pb-24">
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative mx-auto rounded-2xl overflow-hidden border border-ink/10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, #181818 0%, #0a0a0a 60%, #050505 100%)",
            height: "720px",
            maxWidth: "1200px",
            perspective: "1600px",
          }}
        >
          {/* edge glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* corner labels */}
          <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
            wand · neun · in raum
          </span>
          <span className="absolute top-5 right-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
            bewege maus · neigt sich
          </span>

          {/* 3D grid wrapper */}
          <div
            className="absolute inset-12 grid grid-cols-3 gap-6"
            style={{
              transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 200ms ease-out",
            }}
          >
            {WALL_CARDS.map((c, i) => {
              const isHovered = hovered === i;
              return (
                <button
                  type="button"
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  className="relative group rounded-lg overflow-hidden border border-ink/20 text-left"
                  style={{
                    transform: `translateZ(${isHovered ? 140 : c.z}px)`,
                    transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms",
                    transformStyle: "preserve-3d",
                    background: "#0e0e0e",
                    cursor: "pointer",
                    boxShadow: isHovered
                      ? `0 30px 60px -20px ${c.accent}66, 0 0 0 1px ${c.accent}55`
                      : "0 20px 40px -20px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={c.img}
                      alt={c.brand}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    {/* tint */}
                    <div
                      className="absolute inset-0 mix-blend-multiply"
                      style={{
                        background: `linear-gradient(180deg, transparent 40%, ${c.accent}30 100%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 100%)",
                      }}
                    />
                    {/* accent stripe */}
                    <div
                      aria-hidden
                      className="absolute left-0 right-0 bottom-0 h-[3px]"
                      style={{ background: c.accent }}
                    />
                    {/* meta */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 self-start">
                        nº {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4
                          className="text-[20px] leading-tight text-offwhite lowercase"
                          style={{
                            fontFamily: "var(--font-instrument), serif",
                            fontStyle: "italic",
                          }}
                        >
                          {c.brand}
                        </h4>
                        <span
                          className="mt-1 font-mono text-[9px] uppercase tracking-label inline-block"
                          style={{ color: c.accent }}
                        >
                          case · 2026 ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
            <span className="h-px w-12 bg-offwhite/25" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              hover für tiefe · maus neigt
            </span>
            <span className="h-px w-12 bg-offwhite/25" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 4 · CHAT THREAD · "wie es wirklich startet"
   simulierte iMessage-konversation zwischen nicolas und einem
   fiktiven kunden · self-playing mit typing-indikatoren, image-
   anhängen, sprachnachricht · landet auf /ansatz statt einer
   prozess-checkliste · personal als wow-moment
   ═══════════════════════════════════════════════════════════════ */

function Variant4_ChatThread() {
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages: Array<
    | { kind: "msg"; side: "in" | "out"; text: string; time: string; delay: number }
    | { kind: "img"; side: "out"; img: string; cap: string; time: string; delay: number }
    | { kind: "voice"; side: "out"; duration: string; time: string; delay: number }
  > = [
    { kind: "msg", side: "in", text: "moin, sind eben über deine seite gestolpert. wir haben grad ne wix-site die uns nervt — laden mega lang, keine sprachen, sieht aus wie alle anderen.", time: "09:14", delay: 0 },
    { kind: "msg", side: "out", text: "moin! danke fürs schreiben. zwei fragen bevor ich was sage: 1) was macht ihr, 2) wer sind eure kunden?", time: "09:17", delay: 1900 },
    { kind: "msg", side: "in", text: "café/röster in lausanne. eröffnen bald in genf. zielgruppe 30+, schätzen craft.", time: "09:21", delay: 1700 },
    { kind: "msg", side: "out", text: "ok — und was nervt euch am meisten an wix konkret? ehrlich.", time: "09:23", delay: 1800 },
    { kind: "msg", side: "in", text: "1) lädt langsam, vorallem mobil. 2) plugins kosten extra. 3) wir haben das gefühl es ist nicht WIRKLICH unsere site, wir sind im wix-frame gefangen.", time: "09:30", delay: 2100 },
    { kind: "msg", side: "out", text: "ja klassiker. ich schick dir heute abend ne kurze sprachnachricht mit grobem rahmen + budget. kein pdf. einfach gesprochen.", time: "09:32", delay: 1900 },
    { kind: "voice", side: "out", duration: "4:18", time: "20:48", delay: 2400 },
    { kind: "msg", side: "in", text: "🎧 grad gehört. klingt gut. wann können wir starten?", time: "21:05", delay: 1700 },
    { kind: "msg", side: "out", text: "morgen. erste skizzen donnerstag, staging-url freitag.", time: "21:07", delay: 1300 },
    { kind: "img", side: "out", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format&fit=crop", cap: "skizze · donnerstag 11:42", time: "donnerstag 11:43", delay: 2200 },
    { kind: "msg", side: "in", text: "OOOH. genau die richtung. mach weiter.", time: "donnerstag 11:55", delay: 1800 },
    { kind: "msg", side: "out", text: "🫡 staging-link kommt freitag 14:00. ab da iterieren wir live, du siehst alles.", time: "donnerstag 11:57", delay: 1500 },
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function advance() {
      setStep((s) => {
        const next = s + 1;
        if (next >= messages.length) {
          /* loop with longer pause */
          timer = setTimeout(() => setStep(0), 4200);
          return s;
        }
        timer = setTimeout(advance, messages[next].delay);
        return next;
      });
    }
    /* kick off first */
    timer = setTimeout(advance, 800);
    return () => clearTimeout(timer);
  }, [messages.length]);

  /* auto-scroll thread to bottom on new message */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [step]);

  const visible = messages.slice(0, step + 1);
  const isTyping = step < messages.length - 1;
  const nextSide = messages[step + 1]?.side;

  return (
    <section className="relative">
      <VariantHeader
        num="04"
        title="chat thread · so startet's wirklich"
        desc="eine simulierte iMessage-konversation zwischen mir und einem fiktiven (sehr typischen) kunden. spielt sich von alleine ab: nachrichten kommen mit echten verzögerungen, typing-indikatoren, sprachnachricht, screenshot-anhang. zeigt die ein-mensch-keine-tickets-haltung in aktion. landet auf /ansatz statt einer prozess-checkliste."
        anchor="v4"
      />
      <div className="container-site pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* left margin · context */}
          <div className="lg:sticky lg:top-32">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              · echte konversation · sprache komprimiert
            </span>
            <h3 className="mt-6 heading-display text-[clamp(1.8rem,3.8vw,3rem)] leading-[1.05] text-offwhite">
              kein briefing-formular.<br />
              <span
                className="italic text-offwhite/55"
                style={{ fontFamily: "var(--font-instrument), serif" }}
              >
                nur ein chat.
              </span>
            </h3>
            <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-offwhite/55">
              vom ersten "moin" bis zum freitags-launch sind's bei mir meistens 12-18 nachrichten und eine sprachnachricht. kein kickoff-call mit 6 leuten, kein 80-seiten-deck. wenn die antworten sitzen, geht's los.
            </p>
            <div className="mt-10 space-y-3 max-w-[420px]">
              {[
                { l: "ø antwortzeit", v: "< 2h werktags" },
                { l: "kickoff", v: "morgens nach dem chat" },
                { l: "staging-url ab", v: "tag 3-4" },
                { l: "go-live", v: "tag 14-22" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-ink/10 pb-1.5 font-mono text-[10px] uppercase tracking-label"
                >
                  <span className="text-offwhite/45">{s.l}</span>
                  <span className="text-offwhite/85">{s.v}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-hand text-[20px] text-accent-ink rotate-[-1deg] inline-block">
              das ist ein echter ablauf · komprimiert ↗
            </p>
          </div>

          {/* phone frame */}
          <div className="relative mx-auto">
            <div
              className="relative w-[360px] h-[720px] rounded-[44px] bg-[#0a0a0a] border-[6px] border-[#1a1a1a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden"
            >
              {/* notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-[#0a0a0a] rounded-full z-30 border border-ink/15" />

              {/* status bar */}
              <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-7 pt-3 z-20 font-mono text-[10px] text-offwhite/85">
                <span>9:14</span>
                <span className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="ml-1">·</span>
                  <span>87%</span>
                </span>
              </div>

              {/* contact bar */}
              <div className="absolute top-12 left-0 right-0 px-5 py-3 border-b border-ink/10 bg-[#0e0e0e] z-10 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-lime/15 border border-lime/40 flex items-center justify-center font-mono text-[12px] text-lime">
                  n
                </span>
                <div className="flex-1">
                  <div
                    className="text-[14px] text-offwhite leading-tight"
                    style={{
                      fontFamily: "var(--font-instrument), serif",
                      fontStyle: "italic",
                    }}
                  >
                    nicolas · laconis
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                    aktiv vor 2 min
                  </div>
                </div>
                <span className="font-mono text-[10px] text-offwhite/45">↗</span>
              </div>

              {/* thread */}
              <div
                ref={scrollRef}
                className="absolute top-[88px] bottom-0 left-0 right-0 overflow-y-auto px-3.5 pt-4 pb-20 space-y-2 scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="text-center font-mono text-[9px] uppercase tracking-label text-offwhite/35 py-2">
                  · mittwoch 09:14 ·
                </div>

                {visible.map((m, i) => {
                  if (m.kind === "msg") {
                    return (
                      <div
                        key={i}
                        className={`flex ${m.side === "out" ? "justify-end" : "justify-start"}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className={`max-w-[78%] rounded-[18px] px-3.5 py-2 text-[14px] leading-snug ${
                            m.side === "out"
                              ? "bg-lime text-[#0a0a0a] rounded-br-[6px]"
                              : "bg-[#1f1f1f] text-offwhite/95 rounded-bl-[6px]"
                          }`}
                        >
                          {m.text}
                          <div
                            className={`font-mono text-[8px] uppercase tracking-label mt-1 ${
                              m.side === "out" ? "text-[#0a0a0a]/55" : "text-offwhite/35"
                            }`}
                          >
                            {m.time}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  if (m.kind === "voice") {
                    return (
                      <div key={i} className="flex justify-end">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-lime text-[#0a0a0a] rounded-[18px] rounded-br-[6px] px-4 py-2.5 flex items-center gap-3"
                        >
                          <span className="w-7 h-7 rounded-full bg-[#0a0a0a]/15 flex items-center justify-center">
                            ▶
                          </span>
                          <svg viewBox="0 0 80 20" className="w-20 h-5" aria-hidden>
                            {[3, 5, 8, 12, 15, 18, 14, 10, 7, 13, 16, 11, 8, 5, 9, 12, 7].map(
                              (h, j) => (
                                <rect
                                  key={j}
                                  x={j * 5}
                                  y={10 - h / 2}
                                  width="2.5"
                                  height={h}
                                  fill="currentColor"
                                  rx="1"
                                  opacity="0.85"
                                />
                              ),
                            )}
                          </svg>
                          <span className="font-mono text-[11px]">{m.duration}</span>
                          <div className="font-mono text-[8px] uppercase tracking-label text-[#0a0a0a]/55 ml-2">
                            {m.time}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  if (m.kind === "img") {
                    return (
                      <div key={i} className="flex justify-end">
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className="max-w-[78%] rounded-[14px] overflow-hidden bg-lime"
                        >
                          <div className="relative aspect-[4/5] w-[220px]">
                            <Image
                              src={m.img}
                              alt={m.cap}
                              fill
                              sizes="220px"
                              className="object-cover"
                            />
                          </div>
                          <div className="px-3 py-1.5 flex items-center justify-between text-[#0a0a0a]">
                            <span className="font-mono text-[9px] uppercase tracking-label">
                              {m.cap}
                            </span>
                            <span className="font-mono text-[8px] uppercase tracking-label opacity-65">
                              {m.time}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* typing indicator before next */}
                {isTyping && (
                  <div
                    className={`flex ${nextSide === "out" ? "justify-end" : "justify-start"} pt-1`}
                  >
                    <div
                      className={`rounded-full px-4 py-2 flex items-center gap-1 ${
                        nextSide === "out" ? "bg-lime/35" : "bg-[#1f1f1f]"
                      }`}
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className={`w-1.5 h-1.5 rounded-full ${
                            nextSide === "out" ? "bg-[#0a0a0a]/55" : "bg-offwhite/45"
                          }`}
                          style={{
                            animation: `typingBounce 1.2s ease-in-out ${d * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* compose bar */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0a0a0a] border-t border-ink/10 flex items-center px-4 gap-3 z-10">
                <span className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-offwhite/45 font-mono text-[12px]">
                  +
                </span>
                <span className="flex-1 h-7 rounded-full bg-[#1a1a1a] border border-ink/15 px-3 flex items-center font-mono text-[10px] text-offwhite/35">
                  imessage
                </span>
                <span className="w-7 h-7 rounded-full bg-lime flex items-center justify-center font-mono text-[12px] text-[#0a0a0a]">
                  ↑
                </span>
              </div>
            </div>

            {/* sticky notes around the phone */}
            <span
              className="absolute -top-2 -left-12 font-hand text-[18px] text-offwhite/65 rotate-[-6deg] max-w-[120px] leading-snug"
            >
              echter ablauf ↘
            </span>
            <span className="absolute -bottom-6 -right-4 font-mono text-[10px] uppercase tracking-label text-offwhite/55 rotate-[2deg]">
              · self-playing · ca. 28s ·
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   VARIANT 5 · DRAGGABLE ARBEITSTISCH
   ═══════════════════════════════════════════════════════════════ */

type Piece = {
  id: string;
  z: number;
  initialX: string;
  initialY: string;
  rotate: number;
  width: string;
  content: React.ReactNode;
};

function Variant5_Draggable() {
  const [topZ, setTopZ] = useState(10);
  const [pieces, setPieces] = useState<Piece[]>([
    {
      id: "logo",
      z: 1,
      initialX: "6%",
      initialY: "8%",
      rotate: -5,
      width: "260px",
      content: <DragLogoCard />,
    },
    {
      id: "type",
      z: 2,
      initialX: "55%",
      initialY: "4%",
      rotate: 3,
      width: "200px",
      content: <DragTypeCard />,
    },
    {
      id: "palette",
      z: 3,
      initialX: "10%",
      initialY: "55%",
      rotate: -2,
      width: "200px",
      content: <DragPaletteCard />,
    },
    {
      id: "biz",
      z: 4,
      initialX: "60%",
      initialY: "52%",
      rotate: 4,
      width: "240px",
      content: <DragBizCard />,
    },
    {
      id: "photo",
      z: 5,
      initialX: "32%",
      initialY: "32%",
      rotate: -1,
      width: "220px",
      content: <DragPhotoCard />,
    },
  ]);

  function bringToFront(id: string) {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setPieces((ps) =>
      ps.map((p) => (p.id === id ? { ...p, z: newZ } : p))
    );
  }

  return (
    <section className="relative">
      <VariantHeader
        num="05"
        title="draggable arbeitstisch · taktile interaktion"
        desc="die papierschnipsel werden anfassbar. greif logo-skizze, palette, typo-spec, foto, visitenkarte. zieh sie rum, sie federn nicht zurück — sie bleiben wo du sie hin tust. zum z-index-tausch einfach anklicken. signature-moment für /leistungen/branding."
        anchor="v5"
      />
      <div className="container-site pb-32">
        <div
          className="relative w-full max-w-[1100px] mx-auto rounded-2xl overflow-hidden border border-ink/10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #1f1f1f 0%, #141414 70%, #0a0a0a 100%)",
            height: "640px",
          }}
        >
          {/* paper texture subtle */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(225,253,82,0.04) 0%, transparent 50%)",
            }}
          />
          <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-label text-offwhite/35 z-50">
            arbeitstisch · drag · click
          </span>
          <span className="absolute bottom-4 right-4 font-hand text-[16px] text-offwhite/55 z-50 rotate-[-2deg]">
            zieh sie rum ↗
          </span>

          {pieces.map((p) => (
            <motion.div
              key={p.id}
              drag
              dragMomentum={false}
              onPointerDown={() => bringToFront(p.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: p.rotate,
              }}
              whileDrag={{
                scale: 1.04,
                rotate: p.rotate * 0.4,
                cursor: "grabbing",
              }}
              transition={{ duration: 0.5 }}
              style={{
                left: p.initialX,
                top: p.initialY,
                width: p.width,
                zIndex: p.z,
                position: "absolute",
                cursor: "grab",
              }}
            >
              {p.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DragLogoCard() {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <span
        aria-hidden
        className="absolute -top-3 left-12 h-4 w-16 bg-offwhite/15 border border-ink/10 rounded-[2px] -rotate-6"
      />
      <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/45 mb-3">
        logo · wortmarke
      </div>
      <div className="heading-display text-[32px] leading-none lowercase text-offwhite">
        studio·vela
      </div>
      <div className="mt-3 h-px w-2/3 bg-offwhite/20" />
      <div className="mt-1.5 font-mono text-[7px] uppercase tracking-label text-offwhite/45">
        v·02 · 2026
      </div>
    </div>
  );
}

function DragTypeCard() {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/45 mb-2">
        type
      </div>
      <div className="heading-display text-[48px] leading-none text-offwhite">Aa</div>
      <div className="mt-1.5 font-mono text-[7px] lowercase text-offwhite/55">dm sans · bold</div>
      <div
        className="mt-3 text-[24px] text-offwhite"
        style={{ fontFamily: "var(--font-instrument), serif", fontStyle: "italic" }}
      >
        Aa
      </div>
      <div className="mt-1 font-mono text-[7px] lowercase text-offwhite/55">
        instrument · italic
      </div>
    </div>
  );
}

function DragPaletteCard() {
  const swatches = [
    { c: "#2f5d3a" },
    { c: "#7a4bd1" },
    { c: "#d94f4f" },
    { c: "#e8c14b" },
    { c: "#e1fd52" },
  ];
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/45 mb-2">
        palette · 05
      </div>
      <div className="flex gap-1.5">
        {swatches.map((s, i) => (
          <div
            key={i}
            className="w-8 h-12 rounded-[2px] border border-ink/15"
            style={{ background: s.c }}
          />
        ))}
      </div>
      <div className="mt-3 font-mono text-[7px] lowercase text-offwhite/55">
        forest · plum · brick · honey · lime
      </div>
    </div>
  );
}

function DragBizCard() {
  return (
    <div className="relative rounded-[3px] bg-[#f4f1ea] border border-ink/15 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none aspect-[16/10]">
      <div className="flex flex-col h-full justify-between text-[#1a1a1a]">
        <div>
          <span
            className="font-serif italic text-[26px] leading-none"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            anna béguin
          </span>
          <div className="mt-1 font-mono text-[8px] uppercase tracking-label text-[#1a1a1a]/55">
            studio · vela · lausanne
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="font-mono text-[8px] text-[#1a1a1a]/65">
            +41 21 348 24 11
            <br />
            studio-vela.ch
          </div>
          <div
            className="w-6 h-6 rounded-full"
            style={{ background: "#2f5d3a" }}
          />
        </div>
      </div>
    </div>
  );
}

function DragPhotoCard() {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="220px"
          className="object-cover grayscale contrast-[1.05]"
        />
      </div>
      <div className="mt-2 font-mono text-[7px] uppercase tracking-label text-offwhite/55 px-1">
        moodboard · 04
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 6 · SCROLL-JACKED HORIZONTAL CASES (replaces mega marquee)
   sticky outer · inner translateX bound to vertical scrollProgress ·
   4 panels mit fullbleed editorial photos + magazine-style overlay
   ═══════════════════════════════════════════════════════════════ */

const HORIZONTAL_CASES = [
  {
    n: "01",
    brand: "studio·vela",
    sector: "café · linnen",
    statement: "vom logo bis zur tasse · ein vokabular.",
    accent: "#e8c14b",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=2200&q=85&auto=format&fit=crop",
  },
  {
    n: "02",
    brand: "maison·leu",
    sector: "patisserie · privat",
    statement: "fünf farben. dreißig pieces. eine handschrift.",
    accent: "#d94f4f",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=2200&q=85&auto=format&fit=crop",
  },
  {
    n: "03",
    brand: "holoroom",
    sector: "immersive · studio",
    statement: "violett · weil's der sache entsprach.",
    accent: "#7a4bd1",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=2200&q=85&auto=format&fit=crop",
  },
  {
    n: "04",
    brand: "atelier·nord",
    sector: "architecture · münster",
    statement: "klar, nicht kalt. ruhig, nicht still.",
    accent: "#6a8caf",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=2200&q=85&auto=format&fit=crop",
  },
  {
    n: "05",
    brand: "fabry·optik",
    sector: "eyewear · 1959",
    statement: "65 jahre handwerk · 14 tage neue website.",
    accent: "#e1fd52",
    img: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=2200&q=85&auto=format&fit=crop",
  },
];

function Variant6_HorizontalCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  /* vertical scrollProgress 0-1 → horizontal translate -80% (so 5 panels visible) */
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const indicator = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="relative">
      <VariantHeader
        num="06"
        title="horizontal cases · vertikal scrollen, horizontal lesen"
        desc="der wow-trick: du scrollst nach unten, die seite scrollt seitwärts. fünf case-panels ziehen vorbei wie ein magazin-spread. jeder mit fullbleed-photo + brand-accent + statement. zwingt rhythmus-bruch zur vertikalen monotonie der seite."
        anchor="v6"
      />
      <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {HORIZONTAL_CASES.map((c, i) => (
              <div
                key={i}
                className="relative w-screen h-full flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={c.img}
                  alt={c.brand}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                {/* dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(110deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.75) 100%)`,
                  }}
                />
                {/* accent stripe */}
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-[50%] h-[3px] -translate-y-1/2"
                  style={{
                    background: c.accent,
                    opacity: 0.7,
                    boxShadow: `0 0 60px 6px ${c.accent}66`,
                  }}
                />

                <div className="container-site relative h-full flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="font-mono text-[11px] uppercase tracking-label"
                      style={{ color: c.accent }}
                    >
                      case nº {c.n}
                    </span>
                    <span className="h-px w-12 bg-offwhite/35" />
                    <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                      {c.sector}
                    </span>
                  </div>

                  <h3
                    className="text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-offwhite tracking-[-0.03em] max-w-[1100px]"
                    style={{
                      fontFamily: "var(--font-instrument), serif",
                      fontStyle: "italic",
                    }}
                  >
                    {c.brand}
                  </h3>

                  <p className="mt-10 max-w-[640px] text-[clamp(1.1rem,2vw,1.5rem)] text-offwhite/85 leading-snug">
                    {c.statement}
                  </p>

                  <div className="mt-12 flex items-baseline gap-4">
                    <span
                      className="font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full"
                      style={{ background: c.accent, color: "#0a0a0a" }}
                    >
                      case lesen →
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
                      scroll · panel {i + 1} von {HORIZONTAL_CASES.length}
                    </span>
                  </div>
                </div>

                {/* panel number giant decoration */}
                <span
                  aria-hidden
                  className="absolute right-[5%] bottom-[8%] text-[clamp(8rem,18vw,18rem)] leading-none font-mono text-offwhite/[0.06] select-none"
                >
                  {c.n}
                </span>
              </div>
            ))}
          </motion.div>

          {/* bottom progress bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              ↓ scroll
            </span>
            <div className="relative w-48 h-[2px] bg-ink/15 rounded-full overflow-hidden">
              <motion.div
                style={{ width: useTransform(indicator, (v) => `${v}%`) }}
                className="absolute inset-y-0 left-0 bg-lime"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              cases ←→
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 7 · CURSOR-TRAIL CANVAS
   alive interactive section · trails + magnetic words + ambient grid
   ═══════════════════════════════════════════════════════════════ */

type Trail = { id: number; x: number; y: number };

function Variant7_CursorCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [mouse, setMouse] = useState({ x: -200, y: -200, inside: false });
  const idCounter = useRef(0);

  useEffect(() => {
    if (!mouse.inside) return;
    const t = setInterval(() => {
      setTrails((prev) => prev.slice(-30));
    }, 800);
    return () => clearInterval(t);
  }, [mouse.inside]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y, inside: true });
    const id = ++idCounter.current;
    setTrails((prev) => [...prev.slice(-29), { id, x, y }]);
  }

  const MAGNETIC_WORDS = [
    { t: "design", x: 0.18, y: 0.22, size: 56, italic: false, color: "offwhite" },
    { t: "code", x: 0.75, y: 0.18, size: 70, italic: true, color: "accent" },
    { t: "marke", x: 0.62, y: 0.55, size: 84, italic: true, color: "offwhite" },
    { t: "soul", x: 0.28, y: 0.7, size: 92, italic: true, color: "accent" },
    { t: "websites", x: 0.46, y: 0.38, size: 64, italic: false, color: "offwhite" },
    { t: "print", x: 0.85, y: 0.78, size: 50, italic: false, color: "offwhite" },
    { t: "DE·FR·EN", x: 0.08, y: 0.85, size: 32, italic: false, color: "muted" },
    { t: "eupen", x: 0.88, y: 0.45, size: 36, italic: true, color: "muted" },
  ];

  return (
    <section className="relative">
      <VariantHeader
        num="07"
        title="cursor canvas · alive · words sind magnetisch"
        desc="bewege die maus über das schwarze feld. lime-trails zeichnen sich hinter dem cursor ein und verblassen. die scattered wörter (design · code · marke · soul · websites) werden zur cursor-position gezogen. pure 'this is alive'-moment ohne klar-zweck — emotional, nicht funktional. landet vielleicht auf /ueber-mich oder als section-break."
        anchor="v7"
      />
      <div className="container-site pb-32">
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={() => setMouse({ x: -200, y: -200, inside: false })}
          className="relative mx-auto rounded-2xl overflow-hidden cursor-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #181818 0%, #0a0a0a 70%, #050505 100%)",
            height: "640px",
            maxWidth: "1200px",
          }}
        >
          {/* ambient grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* spotlight glow following cursor */}
          {mouse.inside && (
            <div
              aria-hidden
              className="absolute pointer-events-none transition-opacity"
              style={{
                left: mouse.x - 300,
                top: mouse.y - 300,
                width: 600,
                height: 600,
                background:
                  "radial-gradient(circle, rgba(225,253,82,0.18) 0%, rgba(225,253,82,0.06) 30%, transparent 60%)",
                filter: "blur(4px)",
              }}
            />
          )}

          {/* trails */}
          {trails.map((t, i) => {
            const age = (trails.length - i) / trails.length;
            return (
              <div
                key={t.id}
                aria-hidden
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: t.x - 8,
                  top: t.y - 8,
                  width: 16,
                  height: 16,
                  background: "#e1fd52",
                  opacity: age * 0.85,
                  filter: `blur(${(1 - age) * 8}px)`,
                  boxShadow: `0 0 ${age * 30}px ${age * 8}px rgba(225,253,82,${age * 0.4})`,
                }}
              />
            );
          })}

          {/* magnetic words */}
          {MAGNETIC_WORDS.map((w, i) => {
            const baseX = w.x * 1200;
            const baseY = w.y * 640;
            const dx = mouse.inside ? mouse.x - baseX : 0;
            const dy = mouse.inside ? mouse.y - baseY : 0;
            const dist = Math.hypot(dx, dy);
            const force = mouse.inside ? Math.max(0, 1 - dist / 380) : 0;
            const offsetX = dx * force * 0.3;
            const offsetY = dy * force * 0.3;
            const color =
              w.color === "accent"
                ? "rgb(225,253,82)"
                : w.color === "muted"
                  ? "rgba(242,242,242,0.35)"
                  : "rgba(242,242,242,0.75)";
            return (
              <motion.span
                key={i}
                animate={{ x: offsetX, y: offsetY }}
                transition={{ type: "spring", damping: 12, stiffness: 80 }}
                className={`absolute pointer-events-none select-none whitespace-nowrap ${
                  w.italic ? "" : "font-sans tracking-[-0.03em]"
                }`}
                style={{
                  left: baseX,
                  top: baseY,
                  fontSize: w.size,
                  fontWeight: w.italic ? 400 : 700,
                  lineHeight: 1,
                  color,
                  textShadow: force > 0.3 ? `0 0 20px ${color}` : "none",
                  ...(w.italic
                    ? {
                        fontFamily: "var(--font-instrument), serif",
                        fontStyle: "italic",
                      }
                    : {}),
                }}
              >
                {w.t}
              </motion.span>
            );
          })}

          {/* fake cursor */}
          {mouse.inside && (
            <div
              aria-hidden
              className="absolute pointer-events-none z-10"
              style={{
                left: mouse.x - 6,
                top: mouse.y - 6,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#e1fd52",
                boxShadow: "0 0 20px 4px rgba(225,253,82,0.6)",
              }}
            />
          )}

          {/* corner labels */}
          <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-20 pointer-events-none">
            move · draw · feel
          </span>
          <span className="absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-20 pointer-events-none">
            sektion · 07 · alive
          </span>
          {!mouse.inside && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <span className="font-hand text-[26px] text-offwhite/55 rotate-[-2deg]">
                bewegt mich ↗
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VARIANT 8 · BRUTALIST TEXT SMASH
   editorial chaos · overlapping massive type · strikethroughs ·
   hand-corrections · halftone photo plate · magazine vibe
   ═══════════════════════════════════════════════════════════════ */

function Variant8_BrutalistSmash() {
  return (
    <section className="relative">
      <VariantHeader
        num="08"
        title="brutalist smash · web im fokus, rest als annotation"
        desc="WEBSITES dominiert die canvas dreimal · gigantischer serif-italic mittig, lime-block oben, hand-script repeat. branding + print existieren noch, aber als kleine sekundär-elemente am rand. das ist die services-statement-section auf der startseite — wer mehr will, klickt durch."
        anchor="v8"
      />
      <div className="relative overflow-hidden bg-[#0a0a0a] py-24">
        {/* paper texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(225,253,82,0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 40%)",
          }}
        />

        <div className="container-site relative">
          {/* edge labels left/right top */}
          <div className="flex items-start justify-between mb-12">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              ↘ ausgabe nº 08 · was ich mache
            </span>
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              · hauptberuf · 2026 ·
            </span>
          </div>

          {/* MAIN STACK — WEBSITES DOMINIERT */}
          <div className="relative" style={{ minHeight: "720px" }}>

            {/* hero-statement-1 · MEGA serif italic 'websites.' centered */}
            <h2
              className="absolute left-[-2%] top-[2%] text-[clamp(6rem,21vw,22rem)] leading-[0.82] text-offwhite tracking-[-0.045em] select-none"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontStyle: "italic",
              }}
            >
              websites.
            </h2>

            {/* second 'WEBSITES' · sans bold, lime, slightly rotated, beneath/overlapping */}
            <h2
              className="absolute left-[6%] top-[35%] text-[clamp(4rem,13vw,14rem)] leading-[0.85] tracking-[-0.05em] select-none"
              style={{
                color: "#e1fd52",
                fontWeight: 900,
                transform: "rotate(-2deg)",
                textShadow: "5px 5px 0 rgba(225,253,82,0.12)",
              }}
            >
              WEBSITES.
            </h2>

            {/* third 'websites' · hand-script, smallest, drift bottom-right */}
            <span
              className="absolute right-[6%] bottom-[16%] font-hand text-[clamp(3rem,7vw,7rem)] leading-none text-offwhite/65 select-none"
              style={{ transform: "rotate(-5deg)" }}
            >
              websites
              <span className="text-accent-ink">,</span>
              <span className="block text-[0.5em] mt-2 text-accent-ink/85">
                hauptsächlich.
              </span>
            </span>

            {/* halftone screen plate · code/macbook (web-themed) */}
            <div
              className="absolute right-[6%] top-[6%] w-[240px] h-[200px] overflow-hidden border border-ink/30"
              style={{ transform: "rotate(3.5deg)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop"
                alt=""
                fill
                sizes="240px"
                className="object-cover"
                style={{
                  filter: "grayscale(1) contrast(1.45) brightness(0.95)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.8) 35%, transparent 36%)",
                  backgroundSize: "4px 4px",
                  opacity: 0.5,
                }}
              />
              <span
                aria-hidden
                className="absolute -top-2 left-6 h-3 w-12 bg-offwhite/25 -rotate-3"
              />
              <span className="absolute -bottom-6 left-2 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                fig. 03 · production
              </span>
            </div>

            {/* secondary services · branding + print as small footnotes */}
            <div
              className="absolute left-[2%] bottom-[18%] space-y-2.5 max-w-[300px]"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 w-12">
                  + auch
                </span>
                <span
                  className="text-[clamp(1.4rem,2.5vw,2rem)] text-offwhite/65 leading-none"
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontStyle: "italic",
                  }}
                >
                  branding
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  · logo · guide
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 w-12">
                  + auch
                </span>
                <span
                  className="text-[clamp(1.4rem,2.5vw,2rem)] text-offwhite/65 leading-none"
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontStyle: "italic",
                  }}
                >
                  print
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  · karten · flyer
                </span>
              </div>
              <div className="pl-[60px] pt-2 font-hand text-[16px] text-offwhite/55 leading-snug">
                gerne, aber web ist das ding.
              </div>
            </div>

            {/* tech-stack chips · web-spezifisch */}
            <div
              className="absolute right-[10%] top-[44%] flex flex-wrap gap-1.5 max-w-[280px]"
              style={{ transform: "rotate(2deg)" }}
            >
              {[
                "next.js",
                "tailwind",
                "ssr · static",
                "seo · core web vitals",
                "DE · FR · EN",
                "lighthouse 95+",
                "no plugins, no bloat",
              ].map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-[9px] uppercase tracking-label px-2 py-1 rounded-full border border-ink/20 text-offwhite/65 bg-[#1a1a1a]/55 backdrop-blur"
                >
                  · {t}
                </span>
              ))}
            </div>

            {/* hand annotation pointing to mega 'websites' */}
            <div
              className="absolute right-[24%] top-[1%] max-w-[180px]"
              style={{ transform: "rotate(-3deg)" }}
            >
              <span className="font-hand text-[20px] text-accent-ink leading-snug block">
                das ist der hauptberuf
              </span>
              <svg
                aria-hidden
                viewBox="0 0 200 80"
                className="mt-1 w-[120px] h-auto text-accent-ink -translate-x-2"
                fill="none"
              >
                <path
                  d="M180 8 C 130 28, 60 35, 14 60"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M22 55 L14 60 L20 66"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* numbered annotation column left */}
            <div className="absolute left-[1%] top-[60%] flex flex-col gap-2.5 items-start font-mono text-[9px] uppercase tracking-label text-offwhite/45">
              <span className="text-accent-ink">◆ № 01 · web</span>
              <span>◇ № 02 · seo</span>
              <span>◇ № 03 · cms</span>
              <span>◇ № 04 · multilingual</span>
              <span>◇ № 05 · branding</span>
              <span>◇ № 06 · print</span>
            </div>

            {/* small color swatches · subtle */}
            <div
              className="absolute right-[34%] top-[2%] flex gap-1"
              style={{ transform: "rotate(-3deg)" }}
            >
              {["#e1fd52", "#1a1a1a", "#f2f2f2"].map((c, i) => (
                <span
                  key={i}
                  className="w-5 h-7 border border-ink/30"
                  style={{ background: c }}
                />
              ))}
            </div>

            {/* tape strips · sparse */}
            <span
              aria-hidden
              className="absolute top-[42%] right-[42%] w-20 h-4 bg-offwhite/12 -rotate-6"
            />
          </div>

          {/* footer caption strip · re-emphasizes web */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center pt-8 border-t border-ink/15">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
              hauptberuf · web · ostbelgien · seit 2026
            </span>
            <span
              className="text-[clamp(1.2rem,2.5vw,2rem)] text-accent-ink whitespace-nowrap"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontStyle: "italic",
              }}
            >
              websites die was können.
            </span>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/85 md:text-right hover:text-accent-ink transition-colors"
            >
              alles über web · leistungen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */

function PreviewFooter() {
  return (
    <section className="relative border-t border-ink/10 py-32">
      <div className="container-site">
        <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.4rem)] text-offwhite max-w-[800px]">
          welche variante macht den klick bei dir?
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { n: "01", label: "bold lime slab", anchor: "#v1" },
            { n: "02", label: "stacked browsers", anchor: "#v2" },
            { n: "03", label: "3D card wall", anchor: "#v3" },
            { n: "04", label: "chat thread", anchor: "#v4" },
            { n: "05", label: "draggable arbeitstisch", anchor: "#v5" },
            { n: "06", label: "horizontal cases", anchor: "#v6" },
            { n: "07", label: "cursor canvas", anchor: "#v7" },
            { n: "08", label: "brutalist smash", anchor: "#v8" },
          ].map((v) => (
            <a
              key={v.n}
              href={v.anchor}
              className="group block rounded-xl border border-ink/15 px-5 py-4 hover:border-accent-ink/55 hover:bg-ink/[0.03] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                ↑ {v.n}
              </span>
              <div className="mt-1.5 heading-sans text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                {v.label}
              </div>
            </a>
          ))}
        </div>
        <p className="mt-12 max-w-[520px] text-[13px] text-offwhite/55 leading-relaxed">
          fühl rein, vergleich mit der echten startseite, sag mir 2-3 davon die du auf die
          produktion willst. dann bau ich die richtig auf {" "}
          <Link href="/" className="underline decoration-accent-ink/55 hover:text-accent-ink">
            laconis.be
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function PreviewPage() {
  return (
    <main className="bg-dark text-offwhite">
      <PreviewHeader />
      <Variant1_BoldLimeSlab />
      <Variant2_StackedBrowsers />
      <Variant3_3DWall />
      <Variant4_ChatThread />
      <Variant5_Draggable />
      <Variant6_HorizontalCases />
      <Variant7_CursorCanvas />
      <Variant8_BrutalistSmash />
      <PreviewFooter />
    </main>
  );
}
