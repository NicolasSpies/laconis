"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { referenzen, type Referenz } from "@/data/referenzen";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * HorizontalCases · scroll-jacked horizontal pan, perf-rewrite ohne
 * framer/spring.
 *
 * v3-architektur (smooth · raw-DOM):
 *   - outer-container: height = 100vh + (N-1) * 80vh  (4 panels → 340vh)
 *   - inner sticky-top-0 h-screen
 *   - track-flex (4 × 100vw)
 *   - 1 passive scroll-listener auf window, RAF-throttled
 *   - IntersectionObserver gating: rechnet nur wenn outer-container
 *     im viewport ist (sonst no-op)
 *   - schreibt direkt in track.style.transform = translate3d(...)
 *     bypasst react re-renders komplett
 *
 * resultat: GPU compositor + 1 RAF/scroll → 60fps konstant.
 */

const FEATURED_SLUGS = ["fabry-baumpflege", "holoroom", "lespoir-asbl"] as const;

/* scroll-distance pro panel-übergang · 90vh fühlt sich natürlicher an,
   doc-höhe = 100vh + N * SCROLL_PER_PANEL (extra 90vh am ende als
   dwell-zeit auf dem letzten case bevor sticky disengaged) */
const SCROLL_PER_PANEL_VH = 90;

/* einheitlicher accent für alle cases · ersetzt die individual-farben
   damit die ganze section eine optische klammer hat statt jede slide
   ihr eigenes ding zu machen */
const CASE_ACCENT = "#b084d3";

type Dict = {
  sectionLabel: string;
  ctaCase: string;
  archiveTitle: string;
  archiveSub: string;
  archiveCta: string;
  scrollHint: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "referenzen",
    ctaCase: "case lesen →",
    archiveTitle: "mehr arbeiten im archiv.",
    archiveSub: "drei featured · der rest mit details, technologie und ergebnissen.",
    archiveCta: "alle ansehen →",
    scrollHint: "↓ scroll",
  },
  fr: {
    sectionLabel: "références",
    ctaCase: "voir le case →",
    archiveTitle: "plus de travaux dans l'archive.",
    archiveSub: "trois en vedette · le reste avec détails, technologie et résultats.",
    archiveCta: "tout voir →",
    scrollHint: "↓ défile",
  },
  en: {
    sectionLabel: "work",
    ctaCase: "see case →",
    archiveTitle: "more work in the archive.",
    archiveSub: "three featured · everything else with detail, stack and results.",
    archiveCta: "see all →",
    scrollHint: "↓ scroll",
  },
};

const CASE_STATEMENTS: Record<string, Record<Locale, string>> = {
  "fabry-baumpflege": {
    de: "65 jahre handwerk · 14 tage neue website mit eigenem CMS.",
    fr: "65 ans d'artisanat · 14 jours pour le nouveau site avec CMS sur mesure.",
    en: "65 years of craft · 14 days to a new website with custom CMS.",
  },
  "holoroom": {
    de: "violett war am ersten tag klar. der rest kam dazu.",
    fr: "le violet s'est imposé dès le jour 1. le reste a suivi.",
    en: "purple was clear on day one. everything else followed.",
  },
  "lespoir-asbl": {
    de: "asbl mit haltung · neue marke, neue website, ein guss.",
    fr: "asbl engagée · nouvelle marque, nouveau site, d'un trait.",
    en: "asbl with backbone · new brand, new site, one stroke.",
  },
};

export function HorizontalCases() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  /* aktueller panel-index nur für aria-current · setzt selten neu */
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdxRef = useRef(0);

  const featured = FEATURED_SLUGS
    .map((slug) => referenzen.find((r) => r.slug === slug))
    .filter((r): r is Referenz => !!r);
  const panelCount = featured.length;
  const maxTranslatePct = ((panelCount - 1) / panelCount) * 100;
  /* dwell · 50vh am ende bleibt panel N stehen damit sticky sauber
     disengaged ohne dass der letzte case "weggesprungen" wirkt */
  const DWELL_VH = 50;

  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return;

    const outerEl = outerRef.current;
    const trackEl = trackRef.current;
    const progressEl = progressRef.current;
    const counterEl = counterRef.current;

    /* ═══ safari-fix ═══
       getBoundingClientRect() in scroll-handlers ZWINGT layout-recalc
       auf jedem frame · auf safari = 10-20ms hit. fix: rect-werte einmal
       cachen + nur bei layout-events (resize/io) neu rechnen. dann
       scroll-handler liest nur cheap window.scrollY (pure number, kein
       layout-thrash). */
    let cachedTop = 0;
    let cachedScrollSpan = 1;
    let cachedActiveSpan = 1;
    let cachedViewportH = window.innerHeight;
    let inView = false;
    let rafId = 0;
    let pending = false;

    function recomputeMetrics() {
      const rect = outerEl.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedViewportH = window.innerHeight;
      cachedScrollSpan = Math.max(1, rect.height - cachedViewportH);
      /* active-span = scroll-distance bis letzter panel-stand erreicht;
         danach kommt dwell-vh wo translate stehen bleibt */
      const dwellPx = (DWELL_VH / 100) * cachedViewportH;
      cachedActiveSpan = Math.max(1, cachedScrollSpan - dwellPx);
    }

    function applyProgress() {
      pending = false;
      /* cheap reads only · keine layout-queries */
      const scrolled = window.scrollY - cachedTop;
      const progress =
        scrolled < 0 ? 0 : scrolled > cachedScrollSpan ? 1 : scrolled / cachedScrollSpan;
      const active =
        scrolled < 0 ? 0 : scrolled > cachedActiveSpan ? 1 : scrolled / cachedActiveSpan;

      const x = active * maxTranslatePct;
      /* setProperty schneller als style.transform = · vermeidet
         tokenize/re-parse vom string in safari */
      trackEl.style.setProperty("transform", `translate3d(-${x}%,0,0)`);

      if (progressEl) {
        progressEl.style.setProperty("width", `${progress * 100}%`);
      }

      /* idx · round() statt floor() · snappt am panel-mittelpunkt
         statt an viertel-boundaries, fühlt sich natürlicher an */
      const idx = Math.max(
        0,
        Math.min(panelCount - 1, Math.round(active * (panelCount - 1))),
      );
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        if (counterEl) counterEl.textContent = `${idx + 1} / ${panelCount}`;
        setActiveIdx(idx);
      }
    }

    function onScroll() {
      if (!inView || pending) return;
      pending = true;
      rafId = requestAnimationFrame(applyProgress);
    }

    function onResize() {
      recomputeMetrics();
      if (inView) applyProgress();
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        inView = e.isIntersecting;
        if (inView) {
          recomputeMetrics();
          applyProgress();
        }
      },
      { rootMargin: "0px" },
    );
    io.observe(outerEl);

    /* ResizeObserver fängt layout-changes von außerhalb (fonts, images
       loaden später) damit cachedTop nicht veraltet ist */
    const ro = new ResizeObserver(() => {
      recomputeMetrics();
      if (inView) applyProgress();
    });
    ro.observe(outerEl);
    ro.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    recomputeMetrics();
    applyProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [maxTranslatePct, panelCount]);

  const outerHeight = `${100 + (panelCount - 1) * SCROLL_PER_PANEL_VH + DWELL_VH}vh`;

  return (
    <>
    <section
      ref={outerRef}
      className="relative"
      style={{ height: outerHeight }}
      aria-label={t.sectionLabel}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* section-label overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-8">
          <div className="container-site">
            <SectionLabel num="04">{t.sectionLabel}</SectionLabel>
          </div>
        </div>

        {/* track · raw-style transform, kein react-state.
           safari-fix: KEIN will-change auf langem track (counterproductive
           auf safari) · translate3d alleine reicht für GPU-layer.
           width = panelCount * 100vw damit translate-% sich auf die
           gesamte content-breite bezieht (sonst nur auf viewport-width
           = nicht weit genug geschoben). */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${panelCount * 100}vw`,
            transform: "translate3d(0,0,0)",
          }}
        >
          {featured.map((c, i) => {
            const statement = CASE_STATEMENTS[c.slug]?.[locale] ?? c.kurz;
            return (
              <article
                key={c.slug}
                className="relative w-screen h-full flex-shrink-0 overflow-hidden"
                style={{ background: "#0a0a0a" }}
                aria-label={c.name}
                aria-current={activeIdx === i ? "true" : undefined}
              >
                {c.heroImage && (
                  <Image
                    src={c.heroImage}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                )}
                {/* base-darkening · stärker links wo der text sitzt */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(95deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 40%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.7) 100%)",
                  }}
                />
                {/* text-spotlight · zusätzliches radial vignette wo titel
                   sitzt, damit auch auf hellen images garantiert lesbar */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 60% at 25% 50%, rgba(10,10,10,0.55) 0%, transparent 65%)",
                  }}
                />
                {/* lila accent stripe · einheitlich auf allen cases ·
                   gibt der section eine optische klammer */}
                <div
                  aria-hidden
                  className="absolute left-0 bottom-[18%] h-[2px] w-[42%] pointer-events-none"
                  style={{ background: CASE_ACCENT, opacity: 0.85 }}
                />

                <div className="container-site px-8 md:px-16 relative h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span
                      aria-hidden
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: CASE_ACCENT }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/65">
                      {c.kategorieLabel} · {c.jahr}
                    </span>
                  </div>

                  <h3
                    className="text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-offwhite tracking-[-0.03em] max-w-[1100px]"
                    style={{
                      fontFamily: "var(--font-instrument), serif",
                      fontStyle: "italic",
                    }}
                  >
                    {c.name}
                  </h3>

                  <p className="mt-10 max-w-[640px] text-[clamp(1.1rem,2vw,1.5rem)] text-offwhite/85 leading-snug">
                    {statement}
                  </p>

                  <div className="mt-12">
                    <Link
                      href={`${buildPath("referenzen", locale)}/${c.slug}`}
                      className="font-mono text-[10px] uppercase tracking-label px-4 py-2 rounded-full transition-opacity hover:opacity-85"
                      style={{ background: CASE_ACCENT, color: "#0a0a0a" }}
                    >
                      {t.ctaCase}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

        </div>

        {/* progress + counter overlay · raw-DOM updates, kein react state */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            {t.scrollHint}
          </span>
          <div className="relative w-48 h-[2px] bg-ink/15 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 bg-lime"
              style={{ width: "0%", willChange: "width" }}
            />
          </div>
          <span
            ref={counterRef}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/85 tabular-nums"
          >
            1 / {panelCount}
          </span>
        </div>
      </div>
    </section>

    {/* archive-link · ruhiger dark block direkt unter den cases ·
       ersetzt die alte 4te closing-panel · keine extra scroll-jacking */}
    <section
      className="relative bg-[#0a0a0a] py-20 md:py-28 overflow-hidden"
      aria-label={t.archiveTitle}
    >
      <div className="container-site relative flex items-end justify-between gap-8 flex-wrap">
        <div className="max-w-[640px]">
          <h3 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-black tracking-[-0.03em] text-offwhite">
            {t.archiveTitle}
          </h3>
          <p className="mt-5 text-[14px] leading-relaxed text-offwhite/65">
            {t.archiveSub}
          </p>
        </div>
        <Link
          href={buildPath("referenzen", locale)}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-5 py-3 rounded-full bg-lime text-[#0a0a0a] hover:opacity-85 transition-opacity"
        >
          {t.archiveCta}
        </Link>
      </div>
    </section>
    </>
  );
}
