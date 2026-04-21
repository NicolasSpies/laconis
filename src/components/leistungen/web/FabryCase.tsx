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
        <span className="heading-display text-[36px] text-accent-ink leading-none">
          {current}
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-ink/15 overflow-hidden">
        <div
          className="h-full bg-lime rounded-full transition-[width] duration-[1800ms] ease-out"
          style={{ width: inView ? `${score}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function FabryScreenshotPlaceholder() {
  return (
    <div data-theme="dark" className="relative aspect-[16/10] w-full rounded-lg border border-ink/10 overflow-hidden bg-[rgb(var(--bg-root))]">
      <div className="absolute inset-x-0 top-0 h-7 bg-[rgb(var(--surface))] border-b border-ink/5 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-ink/20" />
          <div className="h-2 w-2 rounded-full bg-ink/20" />
          <div className="h-2 w-2 rounded-full bg-ink/20" />
        </div>
        <div className="ml-3 flex-1 max-w-[260px] h-3.5 rounded-sm bg-ink/[0.08] border border-ink/5 flex items-center px-2">
          <span className="font-mono text-[8px] text-offwhite/55 tracking-wide">
            fabry-baumpflege.be
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 top-7 bottom-0 overflow-hidden">
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
          <g fill="#0a100a" filter="url(#fabryblur)">
            <ellipse cx="80" cy="320" rx="110" ry="70" />
            <ellipse cx="220" cy="330" rx="140" ry="85" />
            <ellipse cx="400" cy="325" rx="160" ry="78" />
            <ellipse cx="560" cy="335" rx="130" ry="72" />
          </g>
          <g fill="#050705">
            <rect x="210" y="280" width="8" height="80" />
            <rect x="395" y="275" width="10" height="85" />
            <rect x="555" y="285" width="7" height="75" />
          </g>
          <g opacity="0.12">
            <path d="M 420 -20 L 200 380 L 240 380 L 460 -20 Z" fill="rgb(var(--accent))" />
            <path d="M 480 -20 L 300 380 L 320 380 L 500 -20 Z" fill="rgb(var(--accent))" />
          </g>
        </svg>

        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-offwhite font-semibold">fabry</span>
            <span className="text-accent-ink text-[11px]">·</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-offwhite/55">baumpflege</span>
          </div>
          <div className="flex gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-offwhite/55">
            <span>leistungen</span><span>team</span><span>kontakt</span>
          </div>
        </div>

        <div className="absolute left-6 right-6 bottom-5 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent-ink/80">seit 1998 · eupen</span>
            <h4 className="mt-2 text-offwhite leading-[0.95] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces, Georgia), serif", fontWeight: 900, fontSize: "34px" }}>
              bäume in guten<br />
              <span className="italic text-offwhite/100" style={{ fontWeight: 400 }}>händen.</span>
            </h4>
            <div className="mt-3 flex gap-2">
              <div className="px-3 py-1.5 rounded-sm bg-lime text-[9px] font-mono uppercase tracking-wide text-black font-semibold">anfrage stellen</div>
              <div className="px-3 py-1.5 rounded-sm border border-offwhite/25 text-[9px] font-mono uppercase tracking-wide text-offwhite/75">087 / 44 · · ·</div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-1 items-end">
            <span className="font-mono text-[8px] uppercase tracking-wide text-offwhite/55">rufbereitschaft</span>
            <span className="font-mono text-[10px] text-accent-ink">24 / 7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FabryCase({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <SectionLabel num={num}>ein echtes projekt</SectionLabel>

        {/* Testimonial · das ist die Geschichte */}
        <div className="mt-10 max-w-[820px]">
          <blockquote className="relative">
            <span
              aria-hidden
              className="absolute -top-4 -left-2 font-serif text-[80px] leading-none text-accent-ink/20 select-none pointer-events-none"
            >
              „
            </span>
            <p className="relative heading-display text-[clamp(1.6rem,3.8vw,2.8rem)] text-offwhite leading-[1.1] pl-6">
              ich hab einfach angerufen,{" "}
              <span className="text-offwhite/45">
                geschrieben wenn was war.
              </span>{" "}
              keine tickets, keine agentur-höflichkeit.
            </p>
            <footer className="mt-6 pl-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-ink/40" />
              <div>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  Reimund Fabry
                </span>
                <span className="font-mono text-[11px] text-offwhite/25 ml-2">
                  · Fabry Baumpflege · Eupen
                </span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* was dahinter steckt */}
        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">

          {/* Screenshot */}
          <div className="glass rounded-2xl p-5 md:p-6">
            <FabryScreenshotPlaceholder />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="heading-sans text-[17px] text-offwhite">fabry baumpflege</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  onepager · eigenes cms · eupen · 2025
                </p>
              </div>
              <Link
                href="/referenzen/fabry-baumpflege"
                className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors shrink-0"
              >
                case ansehen →
              </Link>
            </div>
          </div>

          {/* rechts · kurze projekt-info + scores */}
          <div className="flex flex-col gap-5">

            {/* kurze story */}
            <div className="glass rounded-2xl p-6">
              <p className="text-[14px] leading-relaxed text-offwhite/65">
                Reimund hatte eine veraltete WordPress-Seite, die kaum lud
                und niemand pflegte. Ich hab das komplett neu gebaut ·
                handgeschrieben, eigenes CMS, SEO von Anfang an eingebaut.
                Keine Plugin-Hölle mehr.
              </p>
              <p
                className="mt-4 font-hand text-[18px] text-accent-ink"
                style={{ transform: "rotate(-1deg)" }}
              >
                ging richtig schnell. ↗
              </p>
            </div>

            {/* scores · klein aber da */}
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-5">
                google pagespeed insights · live-wert
              </p>
              <div className="space-y-4">
                <AnimatedScore score={96} label="mobile" />
                <AnimatedScore score={98} label="desktop" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
