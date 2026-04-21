"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { Scribble } from "@/components/ui/Scribble";

const webTags = ["design", "development", "seo", "mehrsprachig"];

/* -------- stumme wireframes · keine accent-farben, kein text, nix klickbar */
function DesktopWireframe() {
  return (
    <svg
      viewBox="0 0 320 210"
      className="w-full h-auto text-offwhite/35"
      fill="none"
      aria-hidden
    >
      {/* browser chrome */}
      <rect
        x="1"
        y="1"
        width="318"
        height="208"
        rx="6"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="1"
        y1="18"
        x2="319"
        y2="18"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <circle cx="10" cy="9.5" r="2" fill="currentColor" opacity="0.45" />
      <circle cx="18" cy="9.5" r="2" fill="currentColor" opacity="0.45" />
      <circle cx="26" cy="9.5" r="2" fill="currentColor" opacity="0.45" />

      {/* nav row */}
      <rect x="12" y="28" width="40" height="4" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="240" y="28" width="14" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="258" y="28" width="14" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="276" y="28" width="14" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="294" y="28" width="14" height="4" rx="1" fill="currentColor" opacity="0.2" />

      {/* hero block */}
      <rect x="12" y="50" width="200" height="10" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="12" y="66" width="160" height="10" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="12" y="86" width="120" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="12" y="94" width="140" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="12" y="108" width="50" height="10" rx="2" stroke="currentColor" strokeWidth="0.7" fill="none" />

      {/* right image */}
      <rect x="220" y="50" width="88" height="68" rx="3" fill="currentColor" opacity="0.12" />

      {/* cards row */}
      <rect x="12" y="134" width="90" height="60" rx="3" fill="currentColor" opacity="0.08" />
      <rect x="115" y="134" width="90" height="60" rx="3" fill="currentColor" opacity="0.08" />
      <rect x="218" y="134" width="90" height="60" rx="3" fill="currentColor" opacity="0.08" />

      <rect x="20" y="144" width="30" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="20" y="154" width="60" height="3" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="20" y="160" width="50" height="3" rx="1" fill="currentColor" opacity="0.2" />

      <rect x="123" y="144" width="30" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="123" y="154" width="60" height="3" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="123" y="160" width="50" height="3" rx="1" fill="currentColor" opacity="0.2" />

      <rect x="226" y="144" width="30" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="226" y="154" width="60" height="3" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="226" y="160" width="50" height="3" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function MobileWireframe() {
  return (
    <svg
      viewBox="0 0 100 200"
      className="w-full h-auto text-offwhite/35"
      fill="none"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="98"
        height="198"
        rx="10"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <rect x="38" y="6" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.35" />

      {/* nav */}
      <rect x="8" y="20" width="20" height="3" rx="0.8" fill="currentColor" opacity="0.35" />
      <rect x="84" y="20" width="10" height="3" rx="0.8" fill="currentColor" opacity="0.25" />

      {/* hero */}
      <rect x="8" y="34" width="60" height="7" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="8" y="44" width="52" height="7" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="8" y="58" width="60" height="3" rx="0.8" fill="currentColor" opacity="0.2" />
      <rect x="8" y="64" width="50" height="3" rx="0.8" fill="currentColor" opacity="0.2" />
      <rect x="8" y="74" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="0.7" fill="none" />

      {/* image */}
      <rect x="8" y="92" width="84" height="44" rx="2" fill="currentColor" opacity="0.12" />

      {/* stacked cards */}
      <rect x="8" y="144" width="84" height="18" rx="2" fill="currentColor" opacity="0.08" />
      <rect x="8" y="166" width="84" height="18" rx="2" fill="currentColor" opacity="0.08" />

      <rect x="44" y="193" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* -------- grafik · arbeitstisch mit rotierten papierschnipseln */
function Arbeitstisch() {
  const swatches = [
    { c: "#2f5d3a", rot: -4 },
    { c: "#7a4bd1", rot: 2 },
    { c: "#d94f4f", rot: -2 },
    { c: "#e8c14b", rot: 5 },
  ];
  return (
    <div className="relative w-full aspect-[4/3] max-w-[420px]">
      {/* logo paper */}
      <div
        className="absolute left-[8%] top-[10%] w-[46%] rounded-[2px] p-4 bg-[rgba(255,255,255,0.04)] border border-ink/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]"
        style={{ transform: "rotate(-5deg)" }}
      >
        <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/35 mb-2">
          logo · wortmarke
        </div>
        <div className="heading-display text-[22px] md:text-[26px] leading-none lowercase text-offwhite">
          studio·vela
        </div>
        <div className="mt-2 h-px w-2/3 bg-offwhite/20" />
        <div className="mt-1 font-mono text-[7px] uppercase tracking-label text-offwhite/35">
          v·02 · 2026
        </div>
      </div>

      {/* typografie specimen */}
      <div
        className="absolute right-[4%] top-[4%] w-[40%] rounded-[2px] p-3 bg-[rgba(255,255,255,0.04)] border border-ink/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]"
        style={{ transform: "rotate(3.5deg)" }}
      >
        <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/35 mb-1">
          type
        </div>
        <div className="heading-display text-[34px] leading-none text-offwhite">Aa</div>
        <div className="mt-1.5 font-mono text-[7px] lowercase text-offwhite/55">
          dm sans · bold
        </div>
        <div className="mt-2 font-serif italic text-[14px] text-offwhite/55">
          Aa
        </div>
        <div className="mt-1 font-mono text-[7px] lowercase text-offwhite/55">
          instrument · italic
        </div>
      </div>

      {/* swatches */}
      <div
        className="absolute left-[12%] bottom-[8%] rounded-[2px] p-2.5 bg-[rgba(255,255,255,0.04)] border border-ink/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]"
        style={{ transform: "rotate(-2deg)" }}
      >
        <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/35 mb-1.5 px-0.5">
          palette
        </div>
        <div className="flex gap-1.5">
          {swatches.map((s, i) => (
            <div
              key={i}
              className="w-7 h-9 rounded-[1.5px] border border-ink/10"
              style={{ background: s.c, transform: `rotate(${s.rot}deg)` }}
            />
          ))}
        </div>
      </div>

      {/* visitenkarte */}
      <div
        className="absolute right-[10%] bottom-[12%] w-[32%] aspect-[16/10] rounded-[2px] bg-[rgba(255,255,255,0.04)] border border-ink/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] flex flex-col justify-between p-2"
        style={{ transform: "rotate(4deg)" }}
      >
        <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/55">
          anna béguin
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="h-0.5 w-10 bg-offwhite/25 rounded" />
            <div className="mt-1 h-0.5 w-8 bg-offwhite/15 rounded" />
          </div>
          <div className="w-3 h-3 rounded-full border border-offwhite/35" />
        </div>
      </div>

      {/* tape top */}
      <span
        aria-hidden
        className="absolute top-0 left-[40%] w-16 h-3.5 bg-offwhite/10 rotate-[-3deg] rounded-sm"
      />
    </div>
  );
}

export function LeistungenTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="02">leistungen</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="heading-display text-[clamp(2.25rem,5.5vw,4rem)] mt-6 max-w-[900px] text-offwhite"
        >
          Websites, die für sich{" "}
          <span className="relative inline-block text-accent-ink">
            selbst
            <Scribble
              variant="circle"
              delay={0.4}
              duration={1.3}
              strokeWidth={1.2}
              replayOnHover
              className="absolute -inset-x-4 -inset-y-3 w-[calc(100%+2rem)] h-[calc(100%+1.5rem)] text-accent-ink/80"
            />
          </span>{" "}
          sprechen.
        </motion.h2>

        {/* Web · unified card */}
        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl glass overflow-hidden"
        >
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-0">
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  web
                </span>
              </div>

              <h3 className="mt-6 heading-sans text-[clamp(1.75rem,3vw,2.4rem)] text-offwhite">
                Deine Website.
                <br />
                Responsive, schnell,
                <br />
                <span className="text-accent-ink">für Google gemacht.</span>
              </h3>

              <p className="mt-5 text-[14px] leading-relaxed text-offwhite/55 max-w-[440px]">
                Von der ersten Idee bis zum Launch. Design, Development, SEO.
                Alles aus einer Hand.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-7">
                {webTags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/leistungen/web"
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-accent-ink hover:gap-3 transition-all w-fit"
                >
                  mehr erfahren <span>→</span>
                </Link>
              </div>
            </div>

            {/* stumme wireframes · kein lime, kein text, nichts klickbares */}
            <div className="relative p-8 md:p-12 border-t md:border-t-0 md:border-l border-ink/5 flex items-center justify-center">
              <div className="relative w-full max-w-[440px] grid grid-cols-[1fr_100px] gap-5 items-end">
                <DesktopWireframe />
                <MobileWireframe />

                {/* handschriftliche annotation · nicht klickbar, nur kommentar */}
                <span
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-hand text-[16px] md:text-[18px] leading-none text-offwhite/55 whitespace-nowrap"
                  style={{ transform: "translateX(-50%) rotate(-2deg)" }}
                >
                  passt sich an · ohne dass du dran denkst
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Grafik · arbeitstisch · umgedrehtes layout (visual links, text rechts)
            bricht das zwillings-muster zur web-karte drüber */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-8 glass rounded-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-[1.05fr_1fr] gap-0">
            <div className="relative p-8 md:p-12 order-2 md:order-1 border-t md:border-t-0 md:border-r border-ink/5 flex items-center justify-center">
              <Arbeitstisch />
            </div>

            <div className="p-8 md:p-12 order-1 md:order-2 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  grafik
                </span>
              </div>

              <h3 className="mt-6 heading-sans text-[clamp(1.75rem,3vw,2.4rem)] text-offwhite">
                Branding + <span className="text-accent-ink">Print.</span>
              </h3>

              <p className="mt-5 text-[14px] leading-relaxed text-offwhite/55 max-w-[420px]">
                Vom Logo bis zur Visitenkarte. Alles im gleichen Look — Farbe,
                Schrift, Haltung.
              </p>

              <ul className="mt-5 space-y-2">
                {[
                  "logo · varianten · favicon",
                  "brand guide + visitenkarte",
                  "3 social-media-templates",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-label text-offwhite/55"
                  >
                    <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href="/leistungen/branding"
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-accent-ink hover:gap-3 transition-all w-fit"
                >
                  mehr erfahren <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
