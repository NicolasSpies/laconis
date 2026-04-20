"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

function AnimatedScore({ score, label }: { score: number; label: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(eased * score));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, score]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
          {label}
        </span>
        <span className="heading-display text-[40px] text-accent-ink leading-none">
          {current}
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-ink/25 overflow-hidden">
        <div
          className="h-full bg-lime rounded-full transition-[width] duration-[1800ms] ease-out"
          style={{ width: inView ? `${score}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function ScoreBadges() {
  const scores = [
    { label: "performance", wert: 96 },
    { label: "accessibility", wert: 98 },
    { label: "best practices", wert: 100 },
    { label: "SEO", wert: 100 },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {scores.map((s) => (
        <div
          key={s.label}
          className="flex items-baseline justify-between gap-3 px-3 py-2 rounded-md border border-ink/10 bg-ink/[0.015]"
        >
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            {s.label}
          </span>
          <span className="heading-sans text-[15px] text-accent-ink">{s.wert}</span>
        </div>
      ))}
    </div>
  );
}

function FabryScreenshotPlaceholder() {
  return (
    <div className="relative aspect-[16/10] w-full rounded-lg border border-ink/10 overflow-hidden bg-[#0a0d09]">
      {/* Browser-Chrome */}
      <div className="absolute inset-x-0 top-0 h-7 bg-[#050705] border-b border-ink/5 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#2a2a2a]" />
          <div className="h-2 w-2 rounded-full bg-[#2a2a2a]" />
          <div className="h-2 w-2 rounded-full bg-[#2a2a2a]" />
        </div>
        <div className="ml-3 flex-1 max-w-[260px] h-3.5 rounded-sm bg-[#0f120d] border border-ink/5 flex items-center px-2">
          <span className="font-mono text-[8px] text-offwhite/55 tracking-wide">
            fabry-baumpflege.be
          </span>
        </div>
      </div>

      {/* Seiten-Inhalt */}
      <div className="absolute inset-x-0 top-7 bottom-0 overflow-hidden">
        {/* Hintergrund-Foto-Andeutung: Baumkronen */}
        <svg
          viewBox="0 0 640 360"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="fabrysky" cx="0.6" cy="0.1" r="0.9">
              <stop offset="0" stopColor="#2d3a24" />
              <stop offset="0.5" stopColor="#151d10" />
              <stop offset="1" stopColor="#070905" />
            </radialGradient>
            <filter id="fabryblur">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>
          <rect x="0" y="0" width="640" height="360" fill="url(#fabrysky)" />

          {/* Baumkronen Silhouetten */}
          <g fill="#0a100a" filter="url(#fabryblur)">
            <ellipse cx="80" cy="320" rx="110" ry="70" />
            <ellipse cx="220" cy="330" rx="140" ry="85" />
            <ellipse cx="400" cy="325" rx="160" ry="78" />
            <ellipse cx="560" cy="335" rx="130" ry="72" />
          </g>
          {/* Stämme */}
          <g fill="#050705">
            <rect x="210" y="280" width="8" height="80" />
            <rect x="395" y="275" width="10" height="85" />
            <rect x="555" y="285" width="7" height="75" />
          </g>
          {/* Sonnenstrahlen / Licht */}
          <g opacity="0.12">
            <path d="M 420 -20 L 200 380 L 240 380 L 460 -20 Z" fill="#E1FD52" />
            <path d="M 480 -20 L 300 380 L 320 380 L 500 -20 Z" fill="#E1FD52" />
          </g>
        </svg>

        {/* Top-Nav */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-offwhite font-semibold">
              fabry
            </span>
            <span className="text-accent-ink text-[11px]">·</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-offwhite/55">
              baumpflege
            </span>
          </div>
          <div className="flex gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-offwhite/55">
            <span>leistungen</span>
            <span>team</span>
            <span>kontakt</span>
          </div>
        </div>

        {/* Hero-Content */}
        <div className="absolute left-6 right-6 bottom-5 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent-ink/80">
              seit 1998 · eupen
            </span>
            <h4
              className="mt-2 text-offwhite leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-fraunces, Georgia), serif",
                fontWeight: 900,
                fontSize: "34px",
              }}
            >
              bäume in guten
              <br />
              <span className="italic text-offwhite/100" style={{ fontWeight: 400 }}>
                händen.
              </span>
            </h4>
            <div className="mt-3 flex gap-2">
              <div className="px-3 py-1.5 rounded-sm bg-lime text-[9px] font-mono uppercase tracking-wide text-black font-semibold">
                anfrage stellen
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-offwhite/25 text-[9px] font-mono uppercase tracking-wide text-offwhite/75">
                087 / 44 ·  ·  ·
              </div>
            </div>
          </div>

          {/* Kleines Info-Panel rechts */}
          <div className="hidden sm:flex flex-col gap-1 items-end">
            <span className="font-mono text-[8px] uppercase tracking-wide text-offwhite/55">
              rufbereitschaft
            </span>
            <span className="font-mono text-[10px] text-accent-ink">24 / 7</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export function FabryCase() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num="04">beweis</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            kein marketing-versprechen.{" "}
            <span className="text-offwhite/35">messbar.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            fabry baumpflege, eupen. onepager, eigenes CMS, SEO von anfang an.
            google lighthouse sagt 96 mobil und 98 auf dem desktop. das ist
            nicht geschönt, das ist der live-test, den jeder besucher selbst
            nachmachen kann.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.35fr_1fr] gap-6 items-stretch">
          {/* Screenshot */}
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-5 md:p-6">
            <FabryScreenshotPlaceholder />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="heading-sans text-[18px] text-offwhite">
                  fabry baumpflege
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  onepager · 2025 · eupen
                </p>
              </div>
              <Link
                href="/referenzen/fabry-baumpflege"
                className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
              >
                case ansehen →
              </Link>
            </div>
          </div>

          {/* PageSpeed-Panel */}
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-5 md:p-6 flex flex-col">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                google PageSpeed insights
              </span>
              <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/25">
                04 · 2026
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <AnimatedScore score={96} label="mobile" />
              <AnimatedScore score={98} label="desktop" />
            </div>

            <div className="mt-8">
              <ScoreBadges />
            </div>

            <p className="mt-6 text-[12px] leading-relaxed text-offwhite/55">
              95+ bedeutet: seite lädt in unter einer sekunde, ist für
              screenreader lesbar und google versteht sie sofort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
