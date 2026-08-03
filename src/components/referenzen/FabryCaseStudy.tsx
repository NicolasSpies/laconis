"use client";

/**
 * FabryCaseStudy · die referenz-detailseite (editorial-dark case study).
 *
 * TEMPORÄR (juni 2026): rendert aktuell für ALLE referenz-slugs · alle
 * referenzen verlinken vorübergehend auf die fabry-referenz, bis es echte
 * per-projekt detailseiten gibt. quelle für /referenzen/[slug] UND die
 * gitignorte lab-route /preview/referenz-konzept.
 *
 * richtung: editorial-dark · die arbeit als kino.
 *   - canvas = near-black dark-island (data-theme="dark")
 *   - fabry-grün #2f5d3a = das blut des projekts (projekt-akzent)
 *   - laconis-lime #e1fd52 = der signatur-funke (system-akzent)
 *   - caveat = die handschriftliche rand-stimme
 * bilder = themen-stock (unsplash) in /public/referenz-konzept/ · später durch
 * echte projektfotos ersetzen (gleicher dateiname → fertig).
 *
 * keine i18n (DE only) · bewusst, weil temporär.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CounterUp } from "@/components/ui/CounterUp";

/* ─── projekt-tokens ─────────────────────────────────────────────── */
const GREEN = "#2f5d3a"; // fabry-grün · einzige kundenfarbe · NUR im testimonial
const LILA = "#b084d3";
const LIME = "#e1fd52";

const IMG = {
  hero: "/referenz-konzept/hero.jpg",
  cinematic: "/referenz-konzept/cinematic.jpg",
  canopy: "/referenz-konzept/canopy.jpg",
  light: "/referenz-konzept/light.jpg",
  path: "/referenz-konzept/path.jpg",
  pines: "/referenz-konzept/pines.jpg",
  mist: "/referenz-konzept/mist.jpg",
  lookup: "/referenz-konzept/lookup.jpg",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════════════
   KLEINE BAUSTEINE
   ═══════════════════════════════════════════════════════════════════ */

function Kicker({ children, color = LIME }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-label text-offwhite/55">
      <span className="w-5 h-px" style={{ background: color }} />
      {children}
    </span>
  );
}

/* fabry-marke · eine kiefer auf drei striche · funktioniert in jeder einzelfarbe */
function Mark({ color = LIME, ring = true }: { color?: string; ring?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" aria-hidden>
      {ring && <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" opacity="0.35" />}
      <path d="M50 72 L50 50" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M30 57 L50 31 L70 57 Z" fill={color} />
      <path d="M34 45 L50 24 L66 45 Z" fill={color} />
      <path d="M38 34 L50 17 L62 34 Z" fill={color} />
      <path d="M44 75 L40 81 M56 75 L60 81" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* lighthouse-gauge · ring der sich on-view füllt + counter */
function Gauge({ value, label }: { value: number; label: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} stroke="rgb(255 255 255 / 0.08)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            stroke={value >= 90 ? LIME : value >= 50 ? "#ffb347" : "#ff6b6b"}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <CounterUp
            value={value}
            duration={1500}
            resetOnViewEnter
            className="font-display font-black text-[34px] md:text-[40px] text-offwhite tabular-nums leading-none"
          />
        </div>
      </div>
      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-label text-offwhite/55 text-center max-w-[120px]">
        {label}
      </span>
    </div>
  );
}

/* ─── die zwei seiten-mocks für den vorher/nachher-regler ──────────── */

function OldSite() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none bg-[#f2f0e6] text-[#1a1a1a]"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#235c2c] text-white border-b-[3px] border-[#c9a648]">
        <span className="text-[16px] md:text-[20px] font-bold">🌲 Fabry Baumpflege GmbH</span>
        <span className="text-[9px] md:text-[11px]">Tel. 087 / 55 12 34</span>
      </div>
      <div className="flex flex-wrap gap-x-2 px-3 py-1 bg-[#c9a648]/25 text-[10px] md:text-[12px] text-[#13458a] underline">
        {["Startseite", "Über uns", "Leistungen", "Galerie", "Gästebuch", "Kontakt", "Impressum"].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="px-3 py-1.5 text-[#bb0000] text-[11px] md:text-[13px] font-bold">
        ★ Herzlich Willkommen auf unserer Homepage !!! ★
      </div>
      <div className="flex gap-3 p-3">
        <div className="w-[34%] border border-[#999] bg-white p-2 text-[10px] md:text-[11px]">
          <div className="font-bold underline mb-1">Navigation</div>
          <div className="leading-tight text-[#13458a] underline">
            » Startseite
            <br />» Baumfällung
            <br />» Heckenschnitt
            <br />» Sturmschäden
          </div>
          <div className="mt-2 inline-block bg-black px-1 font-mono text-[9px] text-[#33ff33]">Besucher: 004213</div>
          <div className="mt-2 text-[9px] text-[#aa6600]">⚠ Seite im Aufbau</div>
        </div>
        <div className="flex-1 text-[11px] md:text-[13px]">
          <p className="mb-2 leading-snug">
            Wir sind Ihr zuverlässiger Partner für Baumpflege, Baumfällung und Heckenschnitt in der Region. Fragen
            Sie uns – wir beraten Sie gerne!
          </p>
          <div className="inline-block border-2 border-[#235c2c] px-4 py-3 text-center text-[#235c2c] font-bold text-[10px]">
            [ Bild folgt ]
          </div>
          <p className="mt-3 text-[9px] text-[#666]">Letzte Aktualisierung: 14.03.2009</p>
        </div>
      </div>
    </div>
  );
}

function NewSiteHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
      <Image src={IMG.canopy} alt="" fill sizes="900px" className="object-cover opacity-75" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.55) 45%, rgba(13,13,13,0.9) 100%)" }}
      />
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 md:px-7 py-4">
        <span className="font-display font-black lowercase text-white text-[16px] md:text-[20px] tracking-[-0.03em]">
          fabry
        </span>
        <div className="hidden sm:flex gap-4 font-mono text-[8px] md:text-[9px] uppercase tracking-label text-white/70">
          <span>leistungen</span>
          <span>über uns</span>
          <span>kontakt</span>
        </div>
      </div>
      <div className="absolute left-5 md:left-7 bottom-5 md:bottom-7 right-5">
        <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-label" style={{ color: LIME }}>
          · baumpflege ostbelgien
        </span>
        <h4 className="mt-2 font-display font-black lowercase text-white leading-[0.92] text-[clamp(20px,4.2vw,42px)] tracking-[-0.03em]">
          wir halten ihre
          <br />
          bäume gesund.
        </h4>
        <span
          className="mt-4 inline-block font-mono text-[9px] md:text-[10px] uppercase tracking-label px-3.5 py-2 rounded-full text-[#0d0d0d]"
          style={{ background: LIME }}
        >
          termin anfragen →
        </span>
      </div>
    </div>
  );
}

/* clip-path-regler über zwei LIVE-DOM-mocks (kein bild-vergleich) */
function BeforeAfter() {
  const [pct, setPct] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setPct(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (x != null) setFromX(x);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="zieh"
      className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-ink/20 select-none bg-[#0a0a0a] cursor-ew-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        const x = e.touches[0]?.clientX;
        if (x != null) setFromX(x);
      }}
    >
      {/* nachher (voll) */}
      <NewSiteHero />
      {/* vorher (links beschnitten) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <OldSite />
      </div>

      {/* griff */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pct}%`, transform: "translateX(-50%)" }}>
        <div className="w-0.5 h-full bg-offwhite/85 shadow-[0_0_14px_rgba(0,0,0,0.6)]" />
        <button
          type="button"
          role="slider"
          aria-label="Vorher-Nachher Regler"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 3));
            else if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 3));
            else if (e.key === "Home") setPct(0);
            else if (e.key === "End") setPct(100);
          }}
          className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-offwhite text-black flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/60"
        >
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M 5 11 L 1 11 M 1 11 L 4 8 M 1 11 L 4 14" />
            <path d="M 17 11 L 21 11 M 21 11 L 18 8 M 21 11 L 18 14" />
          </svg>
        </button>
      </div>

      <span
        className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-label text-white bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none transition-opacity"
        style={{ opacity: pct > 8 ? 1 : 0.3 }}
      >
        2009 · altes theme
      </span>
      <span
        className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-label text-[#0d0d0d] px-2.5 py-1 rounded-full pointer-events-none transition-opacity"
        style={{ background: LIME, opacity: pct < 92 ? 1 : 0.35 }}
      >
        2025 · neues system
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SEKTIONEN
   ═══════════════════════════════════════════════════════════════════ */

/* 1 · HERO · kino-shot mit scroll-zoom */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} data-no-reveal className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={IMG.hero} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.15) 35%, rgba(13,13,13,0.7) 75%, #0d0d0d 100%)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 30%, transparent 40%, ${LILA}1f 100%)` }} />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative h-full container-site flex flex-col justify-end pb-16 md:pb-24">
        <div className="absolute top-28 left-0 right-0 container-site flex items-center justify-between">
          <Kicker>referenz · web + cms + branding</Kicker>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-label text-offwhite/45">№ 01 · case study</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="font-display font-black lowercase tracking-[-0.04em] text-offwhite text-[clamp(3rem,12vw,9rem)] leading-[0.86]"
        >
          fabry
          <br />
          baumpflege
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-hand text-[clamp(1.25rem,2.4vw,1.9rem)] text-offwhite/80 mt-6 max-w-[640px]"
          style={{ transform: "rotate(-1deg)" }}
        >
          eine website, die nach harz und holz riecht — nicht nach template.
        </motion.p>

      </motion.div>

      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-label text-offwhite/40 animate-pulse">
        ↓ scroll
      </div>
    </section>
  );
}

/* 2 · BRIEF · die aufgabe + steckbrief */
function Brief() {
  return (
    <section id="aufgabe" data-no-reveal className="relative py-24 md:py-36 bg-[#0d0d0d]">
      <div className="container-site">
        <div className="max-w-[820px]">
          <Kicker>die aufgabe</Kicker>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(2rem,5.5vw,4rem)] leading-[0.98]"
          >
            ein baumpfleger.
            <br />
            keine agentur.
            <br />
            <span className="text-offwhite/40">eine seite, die keiner fand.</span>
          </motion.h2>
          <p className="mt-10 max-w-[560px] text-[15px] md:text-[17px] leading-relaxed text-offwhite/70">
            Reimund Fabry klettert seit über zwanzig Jahren in Bäume. Seine alte Website? Ein langsames
            WordPress-Theme, das bei Google auf Seite vier versauerte — und das er selbst nie ändern konnte.
            Der Auftrag war so geerdet wie er: <span className="text-offwhite">gefunden werden, selbst pflegen können</span>,
            und endlich aussehen wie die Arbeit. Sauber, ruhig, ohne Schnickschnack.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 3 · LOGO-SPECIMEN · marke auf vier gründen */
function LogoSpecimen() {
  const tiles = [
    { bg: LILA, mark: "#0a0a0a", ink: "#0a0a0a", cap: "primär" },
    { bg: LIME, mark: "#1a1a1a", ink: "#1a1a1a", cap: "akzent" },
    { bg: "#0a0a0a", mark: "#f2f2f2", ink: "#f2f2f2", cap: "invers" },
    { bg: "", mark: "#fff", ink: "#fff", cap: "auf bild" },
  ];
  return (
    <section id="marke" data-no-reveal className="relative py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container-site">
        <Kicker>die marke</Kicker>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1] max-w-[18ch]">
            ein zeichen, das wurzeln schlägt.
          </h2>
          <p className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[320px]" style={{ transform: "rotate(-1deg)" }}>
            eine kiefer, runtergebrochen auf drei striche.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.cap}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative rounded-xl overflow-hidden border border-ink/15 aspect-[4/5] flex flex-col items-center justify-center gap-5"
              style={t.bg ? { background: t.bg } : undefined}
            >
              {!t.bg && (
                <>
                  <Image src={IMG.lookup} alt="" fill sizes="320px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/45" />
                </>
              )}
              <div className="relative w-[64px] h-[64px] md:w-[78px] md:h-[78px]">
                <Mark color={t.mark} />
              </div>
              <div className="relative text-center">
                <div className="font-display font-black lowercase leading-none text-[24px] md:text-[28px] tracking-[-0.03em]" style={{ color: t.ink }}>
                  fabry
                </div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em]" style={{ color: t.ink, opacity: 0.6 }}>
                  baumpflege
                </div>
              </div>
              <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-label" style={{ color: t.ink, opacity: 0.55 }}>
                {t.cap}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4 · VORHER / NACHHER · website-rebuild */
function Rebuild() {
  return (
    <section id="vorher-nachher" data-no-reveal className="relative py-24 md:py-32 bg-[#0d0d0d]">
      <div className="container-site">
        <Kicker>vorher / nachher</Kicker>
        <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1] max-w-[16ch]">
          zehn jahre in einem regler.
        </h2>
        <div className="mt-10">
          <BeforeAfter />
          <p className="mt-5 font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[680px]" style={{ transform: "rotate(-0.6deg)" }}>
            dieselbe firma, dasselbe budget. links das alte theme, rechts das neue system — zieh den regler.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 5 · LIVE + RESPONSIVE · desktop- & mobil-mock nebeneinander.
   echtes iframe scheidet aus: fabry-baumpflege.be sendet
   X-Frame-Options: SAMEORIGIN → cross-origin-einbettung blockiert
   ("refused to connect"). darum ein kontrollierter mock im echten layout. */

function NewSiteMobile() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
      <Image src={IMG.light} alt="" fill sizes="200px" className="object-cover opacity-80" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.25) 0%, rgba(13,13,13,0.6) 55%, rgba(13,13,13,0.92) 100%)" }}
      />
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3">
        <span className="font-display font-black lowercase text-white text-[15px] tracking-[-0.03em]">fabry</span>
        <span className="flex flex-col gap-[3px]" aria-hidden>
          <span className="block w-4 h-[2px] bg-white/80" />
          <span className="block w-4 h-[2px] bg-white/80" />
        </span>
      </div>
      <div className="absolute left-4 right-4 bottom-5">
        <span className="font-mono text-[7px] uppercase tracking-label" style={{ color: LIME }}>· baumpflege ostbelgien</span>
        <h4 className="mt-1.5 font-display font-black lowercase text-white leading-[0.95] text-[20px] tracking-[-0.03em]">
          wir halten ihre bäume gesund.
        </h4>
        <span
          className="mt-3 inline-block font-mono text-[8px] uppercase tracking-label px-3 py-1.5 rounded-full text-[#0d0d0d]"
          style={{ background: LIME }}
        >
          termin anfragen →
        </span>
      </div>
    </div>
  );
}

function LiveResponsive() {
  return (
    <section id="live" data-no-reveal className="relative py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Kicker>live im netz</Kicker>
            <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1]">
              und so läuft sie heute.
            </h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-label text-offwhite/45">
              ein layout-system · vom 27-zöller in die westentasche
            </p>
          </div>
          <a
            href="https://fabry-baumpflege.be"
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw font-mono text-[11px] uppercase tracking-label text-offwhite hover:text-accent-ink"
          >
            zur echten site ↗
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-0"
        >
          {/* desktop · browser-frame */}
          <div className="relative w-full md:w-[80%] max-w-[1000px] rounded-xl overflow-hidden border border-ink/15 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
            <div className="h-9 bg-[#161616] border-b border-ink/10 flex items-center px-4 gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="font-mono text-[10px] text-offwhite/55 bg-[#0a0a0a] px-3 py-0.5 rounded">https://fabry-baumpflege.be</span>
              </div>
            </div>
            <div className="relative aspect-[16/10]">
              <NewSiteHero />
            </div>
          </div>

          {/* mobil · phone-frame, überlappt den browser leicht */}
          <div className="relative w-[140px] md:w-[168px] shrink-0 md:-ml-20 md:mb-8 z-10">
            <div className="rounded-[26px] border-[6px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[9/19] rounded-[20px] overflow-hidden bg-black">
                <NewSiteMobile />
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-black/70" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* embed-sperre · ehrlich erklärt */}
        <div className="mt-10 flex items-start gap-3 max-w-[760px]">
          <span className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-label" style={{ color: LILA }}>
            · hinweis
          </span>
          <p className="text-[12.5px] md:text-[13px] leading-relaxed text-offwhite/50">
            kein eingebettetes iframe: fabry-baumpflege.be sendet{" "}
            <code className="font-mono text-[11.5px] text-offwhite/75">X-Frame-Options: SAMEORIGIN</code> und verbietet damit
            das einbetten auf fremden domains — ein iframe würde hier nur eine leere „refused to connect"-box zeigen. darum ein
            kontrollierter mock im echten layout.{" "}
            <a
              href="https://fabry-baumpflege.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-offwhite/80 underline underline-offset-2 hover:text-accent-ink"
            >
              die laufende seite gibt's live ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* 7 · LIGHTHOUSE · performance als bild */
function Lighthouse() {
  const gauges = [
    { value: 98, label: "performance" },
    { value: 100, label: "accessibility" },
    { value: 100, label: "best practices" },
    { value: 100, label: "seo" },
  ];
  return (
    <section id="messbar" data-no-reveal className="relative py-24 md:py-36 bg-[#0a0a0a]">
      <div className="container-site">
        <div className="text-center max-w-[680px] mx-auto">
          <div className="flex justify-center">
            <Kicker>messbar</Kicker>
          </div>
          <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.02]">
            schnell ist kein zufall,
            <br />
            sondern eine entscheidung.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 max-w-[840px] mx-auto">
          {gauges.map((g) => (
            <Gauge key={g.label} value={g.value} label={g.label} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-label text-offwhite/55">
          <span><span style={{ color: LIME }}>0.8s</span> · ladezeit</span>
          <span><span style={{ color: LIME }}>0</span> · render-blocking</span>
          <span><span style={{ color: LIME }}>95</span> · pagespeed mobil</span>
          <span className="text-offwhite/35">lighthouse · desktop</span>
        </div>
      </div>
    </section>
  );
}

/* 8 · BESONDERHEITEN · projekt-eigene details · rein textlich, kein bullet-grid.
   jede aussage steht für sich · dimmed lead-in, heller punchline. */
const SPECIALS = [
  {
    tag: "tageszeit",
    color: LIME,
    lead: "die seite kennt die uhrzeit. morgens hell wie morgentau, abends tief wie waldschatten —",
    punch: "der grünton wandert mit der sonne.",
  },
  {
    tag: "bewegung",
    color: LILA,
    lead: "die kiefer im zeichen steht nie ganz still. sie wiegt sich,",
    punch: "kaum merklich, wie unter leichtem wind.",
  },
  {
    tag: "jahreszeit",
    color: LIME,
    lead: "die bildwelt folgt dem kalender — frisches frühlingsgrün, tiefes hochsommerdunkel.",
    punch: "die seite altert mit dem wald.",
  },
  {
    tag: "rücksicht",
    color: LILA,
    lead: "wer im system keine animationen will, bekommt keine.",
    punch: "die seite merkt es und hält von selbst still.",
  },
];

function Besonderheiten() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* scroll-spy · welcher special steht gerade im viewport-zentrum */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="besonderheiten" data-no-reveal className="relative py-24 md:py-36 bg-[#0d0d0d] overflow-x-clip">
      <div className="container-site grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Kicker>die besonderheiten</Kicker>
          <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1]">
            details, nach denen
            <br />
            keiner gefragt hat.
          </h2>
          <p className="mt-7 font-hand text-[20px] md:text-[23px] text-offwhite/55 max-w-[300px]" style={{ transform: "rotate(-1deg)" }}>
            die kür, nicht die pflicht. genau das ist der unterschied zum template.
          </p>

          {/* tracker · leuchtet mit, während rechts gescrollt wird */}
          <ul className="mt-12 hidden lg:flex flex-col gap-4">
            {SPECIALS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.tag} className="flex items-center gap-3">
                  <span
                    className="font-mono text-[11px] tabular-nums transition-colors duration-300"
                    style={{ color: on ? s.color : "rgba(242,242,242,0.3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px transition-all duration-300"
                    style={{ width: on ? 36 : 16, background: on ? s.color : "rgba(242,242,242,0.2)" }}
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-label transition-colors duration-300"
                    style={{ color: on ? "rgba(242,242,242,0.9)" : "rgba(242,242,242,0.35)" }}
                  >
                    {s.tag}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {SPECIALS.map((s, i) => (
            <motion.div
              key={s.tag}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-idx={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="py-12 md:py-16 border-b border-ink/12 first:pt-0 last:border-0 last:pb-0"
            >
              <p className="font-display font-light lowercase tracking-[-0.02em] text-[clamp(1.3rem,2.7vw,2rem)] leading-[1.16]">
                <span className="text-offwhite/45">{s.lead} </span>
                <span className="text-offwhite">{s.punch}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 9 · GALLERY · grafisches bild-raster · klick öffnet lightbox */
const GALLERY: Array<{ img: string; className: string }> = [
  { img: IMG.cinematic, className: "col-span-2 md:col-span-8 row-span-2" },
  { img: IMG.light, className: "col-span-1 md:col-span-4 row-span-2" },
  { img: IMG.mist, className: "col-span-1 md:col-span-5" },
  { img: IMG.canopy, className: "col-span-1 md:col-span-3" },
  { img: IMG.lookup, className: "col-span-2 md:col-span-4" },
];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  /* esc schließt · body-scroll sperren solange offen */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <section id="arbeit" data-no-reveal className="relative py-24 md:py-32 bg-[#0d0d0d]">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <Kicker>die arbeit</Kicker>
              <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1]">
                die arbeit ist der star.
              </h2>
            </div>
            <span className="hidden md:block font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              klick zum vergrößern
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {GALLERY.map((g) => (
              <GalleryTile key={g.img} img={g.img} className={g.className} onOpen={() => setOpen(g.img)} />
            ))}
          </div>

          <p className="mt-6 font-hand text-[18px] text-offwhite/40" style={{ transform: "rotate(-0.5deg)" }}>
            themen-stock · platzhalter für echte projektfotos.
          </p>
        </div>
      </section>

      <Lightbox img={open} onClose={() => setOpen(null)} />
    </>
  );
}

function GalleryTile({ img, className, onOpen }: { img: string; className?: string; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="öffnen"
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative overflow-hidden rounded-xl border border-ink/12 group p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/60 ${className ?? ""}`}
    >
      <Image src={img} alt="" fill sizes="(min-width:768px) 700px, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      <span aria-hidden className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </span>
    </motion.button>
  );
}

/* lightbox · overlay über alles · klick außen oder esc schließt.
   per portal an document.body — sonst fängt die z-[1]-stacking-context
   von <main> das overlay ein und die fixe nav (z-10000) liegt drüber. */
function Lightbox({ img, onClose }: { img: string | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {img && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          data-cursor="schließen"
          role="dialog"
          aria-modal="true"
          aria-label="bild groß"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-5 md:p-12 bg-[#070707]/95 backdrop-blur-md cursor-zoom-out"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="schließen"
            className="absolute top-5 right-5 md:top-7 md:right-7 z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-white/70 hover:text-white transition-colors"
          >
            schließen <span className="text-[15px]" aria-hidden>✕</span>
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1100px] aspect-[16/10] rounded-xl overflow-hidden border border-white/12 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] cursor-default"
          >
            <Image src={img} alt="" fill sizes="1100px" className="object-cover" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* 11 · TESTIMONIAL · grün, groß, menschlich */
function Testimonial() {
  return (
    <section id="stimme" data-no-reveal className="relative py-28 md:py-40 overflow-hidden" style={{ background: GREEN }}>
      <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.6) 1px, transparent 1.4px)", backgroundSize: "26px 26px" }} />
      <div className="container-site relative text-center">
        <span className="font-mono text-[11px] uppercase tracking-label text-white/60">· in seinen worten</span>
        <blockquote
          className="mt-8 mx-auto font-hand text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white max-w-[18ch]"
          style={{ letterSpacing: "-0.01em" }}
        >
          „ich hab einfach angerufen, geschrieben wenn was war. keine tickets, keine agentur-höflichkeit."
        </blockquote>
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-white/40" />
          <span className="font-mono text-[11px] uppercase tracking-label text-white/80">Reimund Fabry · Fabry Baumpflege</span>
        </div>
      </div>
    </section>
  );
}

/* 12 · CTA · nächster schritt + ehrlich-hinweis */
function Cta() {
  return (
    <section data-no-reveal className="relative py-28 md:py-40 bg-[#0d0d0d]">
      <div className="container-site">
        <div className="relative rounded-3xl overflow-hidden border border-ink/15 p-10 md:p-20 text-center">
          <Image src={IMG.mist} alt="" fill sizes="1100px" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-[#0d0d0d]/55" />
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-label" style={{ color: LIME }}>· dein projekt</span>
            <h2 className="mt-6 font-display font-black lowercase tracking-[-0.04em] text-offwhite text-[clamp(2.2rem,7vw,5rem)] leading-[0.95] max-w-[14ch] mx-auto">
              sowas für dein handwerk?
            </h2>
            <p className="mt-6 max-w-[460px] mx-auto text-[15px] leading-relaxed text-offwhite/65">
              eine seite, die nach dir aussieht — und die du selbst pflegen kannst. lass uns reden.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/kontakt"
                className="tactile inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label px-7 py-4 rounded-full text-[#0d0d0d]"
                style={{ background: LIME }}
              >
                projekt anfragen →
              </Link>
              <Link
                href="/referenzen"
                className="link-draw font-mono text-[11px] uppercase tracking-label text-offwhite/60 hover:text-offwhite"
              >
                ← alle referenzen
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-label text-offwhite/30 max-w-[640px] mx-auto leading-relaxed">
          layout-vorschau · bilder sind platzhalter (themen-stock) und werden durch echte projektfotos ersetzt.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────
   WAYFINDING · lesefortschritt + kapitel-rail · beide via portal in den
   body, damit sie das overflow-x-clip + die stacking-context des cases
   verlassen (nav liegt auf z-10000).
   ─────────────────────────────────────────────────────────────────── */

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[10001] pointer-events-none"
      style={{ scaleX: scrollYProgress, background: LIME }}
    />,
    document.body,
  );
}

const CHAPTERS = [
  { id: "aufgabe", label: "die aufgabe" },
  { id: "marke", label: "die marke" },
  { id: "vorher-nachher", label: "vorher / nachher" },
  { id: "live", label: "live im netz" },
  { id: "messbar", label: "messbar" },
  { id: "besonderheiten", label: "besonderheiten" },
  { id: "arbeit", label: "die arbeit" },
  { id: "stimme", label: "seine stimme" },
] as const;

function ChapterRail() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = CHAPTERS.findIndex((c) => c.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <nav
      aria-label="kapitel"
      className="fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-[9000] hidden lg:flex flex-col items-end gap-4"
    >
      {CHAPTERS.map((c, i) => {
        const on = i === active;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(c.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group flex items-center justify-end gap-2.5 no-underline"
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-label transition-opacity duration-300 ${
                on ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              }`}
              style={{ color: on ? LIME : "#f2f2f2" }}
            >
              {c.label}
            </span>
            <span
              aria-hidden
              className="block rounded-full transition-all duration-300"
              style={{
                width: on ? 10 : 6,
                height: on ? 10 : 6,
                background: on ? LIME : "rgba(242,242,242,0.3)",
              }}
            />
          </a>
        );
      })}
    </nav>,
    document.body,
  );
}

/* ───── SPEC-BAR · datasheet-band direkt unter dem hero · die harten
   projekt-fakten als persistenter anker (hero-meta verblasst beim scroll) ───── */
const SPECS: Array<{ k: string; v: ReactNode }> = [
  { k: "kunde", v: "fabry baumpflege" },
  { k: "leistung", v: "web · cms · branding · logo" },
  { k: "jahr", v: "2025" },
  { k: "region", v: "ostbelgien" },
];

function SpecBar() {
  return (
    <section data-no-reveal className="relative bg-[#0d0d0d] border-y border-offwhite/10">
      <div className="container-site">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-7 py-8 md:py-9">
          {SPECS.map((s) => (
            <div key={s.k} className="flex flex-col gap-1.5">
              <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
                {s.k}
              </dt>
              <dd className="font-mono text-[11px] md:text-[12px] uppercase tracking-label text-offwhite/85">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export function FabryCaseStudy() {
  return (
    <div data-theme="dark" className="relative bg-[#0d0d0d] text-offwhite overflow-x-clip">
      <ReadingProgress />
      <ChapterRail />
      <Hero />
      <SpecBar />
      <Brief />
      <LogoSpecimen />
      <Rebuild />
      <LiveResponsive />
      <Lighthouse />
      <Besonderheiten />
      <Gallery />
      <Testimonial />
      <Cta />
    </div>
  );
}
