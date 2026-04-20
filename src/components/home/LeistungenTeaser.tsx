"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { Scribble } from "@/components/ui/Scribble";

const webTags = ["design", "development", "seo", "mehrsprachig"];

function BrowserMock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [maxW, setMaxW] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setMaxW(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const currentW = width !== null ? width : maxW;
  const isMobile = currentW > 0 && currentW < 360;

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    const startX = e.clientX;
    const startW = currentW || maxW;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const next = Math.max(280, Math.min(maxW, startW + dx));
      setWidth(next);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[460px] md:h-[520px] flex items-center justify-center select-none"
    >
      <div
        className={
          "relative flex flex-col h-full " + (width === null ? "w-full" : "")
        }
        style={width !== null ? { width: `${width}px` } : undefined}
      >
        <div className="rounded-xl overflow-hidden glass flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/5 flex-shrink-0">
            <div className="flex gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-2 flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-ink/[0.03] border border-ink/5 min-w-0">
              <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0" />
              <span className="font-mono text-[10px] tracking-mono text-offwhite/55 lowercase truncate">
                deinefirma.be
              </span>
              {maxW > 0 && (
                <span className="ml-auto font-mono text-[9px] tracking-mono text-offwhite/35 flex-shrink-0">
                  {Math.round(currentW)}px
                </span>
              )}
            </div>
          </div>
          <div className="relative flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-ink/[0.02] to-transparent">
            <MockPage isMobile={isMobile} />
          </div>
        </div>

        <button
          type="button"
          onPointerDown={onPointerDown}
          aria-label="responsive vorschau ziehen"
          className={
            "absolute top-1/2 -translate-y-1/2 -right-3 h-16 w-6 flex items-center justify-center cursor-ew-resize group touch-none " +
            (dragging ? "z-10" : "")
          }
        >
          <span
            aria-hidden
            className={
              "absolute inset-0 m-auto w-8 h-8 rounded-full bg-lime/25 blur-md " +
              (dragging ? "opacity-0" : "animate-pulse group-hover:opacity-0")
            }
          />
          <span
            className={
              "relative block w-[4px] h-10 rounded-full bg-lime transition-transform " +
              (dragging ? "scale-110" : "group-hover:scale-110")
            }
          />
        </button>
      </div>
    </div>
  );
}

function MockPage({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink/5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 truncate">
            deine firma
          </span>
        </div>
        {isMobile ? (
          <div className="flex flex-col gap-[3px] flex-shrink-0">
            <span className="block w-4 h-[1.5px] bg-offwhite/55" />
            <span className="block w-4 h-[1.5px] bg-offwhite/55" />
            <span className="block w-4 h-[1.5px] bg-offwhite/55" />
          </div>
        ) : (
          <div className="flex gap-3 font-mono text-[9px] uppercase tracking-label text-offwhite/55 flex-shrink-0">
            <span>leistungen</span>
            <span>über</span>
            <span>kontakt</span>
          </div>
        )}
      </div>

      <div className="relative px-5 py-8 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-lime/[0.14] blur-[60px]"
        />
        <div className="relative">
          <div
            className={
              "font-sans font-black leading-[0.95] tracking-[-0.04em] lowercase text-offwhite " +
              (isMobile ? "text-[22px]" : "text-[clamp(20px,3.5vw,32px)]")
            }
          >
            handwerk.
            <br />
            <span className="text-accent-ink">mit charakter.</span>
          </div>
          <div className="mt-3 h-1.5 w-24 max-w-full rounded bg-offwhite/10" />
          <div className="mt-1.5 h-1.5 w-40 max-w-full rounded bg-offwhite/10" />
          <div
            className={
              "mt-5 flex gap-2 " +
              (isMobile ? "flex-col items-stretch" : "items-center")
            }
          >
            <div
              className={
                "px-3 py-1.5 rounded-full bg-lime text-dark font-mono text-[9px] uppercase tracking-label " +
                (isMobile ? "text-center" : "")
              }
            >
              anfragen →
            </div>
            {!isMobile && (
              <div className="px-3 py-1.5 rounded-full border border-ink/10 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                mehr erfahren
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-6 border-t border-ink/5">
        <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-3">
          leistungen
        </div>
        <div className={isMobile ? "space-y-2" : "grid grid-cols-3 gap-2"}>
          {["dach", "fassade", "innen"].map((s) => (
            <div
              key={s}
              className="rounded border border-ink/5 bg-ink/[0.02] p-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-lime mb-2" />
              <div className="font-sans text-[11px] lowercase text-offwhite">
                {s}
              </div>
              <div className="mt-1.5 h-1 w-12 rounded bg-offwhite/10" />
              <div className="mt-1 h-1 w-16 rounded bg-offwhite/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 border-t border-ink/5">
        <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-3">
          referenzen
        </div>
        <div className={isMobile ? "space-y-2" : "grid grid-cols-2 gap-2"}>
          {[0, 1].map((i) => (
            <div
              key={i}
              className="aspect-[16/10] rounded bg-ink/[0.03] border border-ink/5"
            />
          ))}
        </div>
      </div>

      <div className="px-5 py-6 border-t border-ink/5">
        <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-3">
          über mich
        </div>
        <div className="space-y-1.5">
          <div className="h-1 w-full max-w-[200px] rounded bg-offwhite/10" />
          <div className="h-1 w-full max-w-[240px] rounded bg-offwhite/10" />
          <div className="h-1 w-full max-w-[180px] rounded bg-offwhite/10" />
        </div>
      </div>

      <div className="px-5 py-6 border-t border-ink/5">
        <div className="rounded-lg bg-lime/[0.08] border border-lime/25 p-4 flex items-center justify-between gap-3">
          <div className="font-sans text-[12px] lowercase text-offwhite">
            projekt starten?
          </div>
          <div className="px-2 py-1 rounded bg-lime text-dark font-mono text-[8px] uppercase tracking-label flex-shrink-0">
            kontakt →
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-ink/5 flex items-center justify-between gap-2">
        <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/25 truncate">
          © 2026 deine firma
        </div>
        <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/25 flex-shrink-0">
          impressum
        </div>
      </div>
    </div>
  );
}

export function LeistungenTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="01">leistungen</SectionLabel>

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

        {/* Unified Web card — website + toolkit inside */}
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

              <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                    ab
                  </span>
                  <span className="heading-sans text-[20px] text-offwhite tabular-nums">
                    1.400 €
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                    einmalig
                  </span>
                </div>
                <Link
                  href="/leistungen/web"
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-accent-ink hover:gap-3 transition-all w-fit"
                >
                  mehr erfahren <span>→</span>
                </Link>
              </div>
            </div>

            <div className="relative p-6 md:p-10 border-t md:border-t-0 md:border-l border-ink/5">
              <BrowserMock />
            </div>
          </div>
        </motion.article>

        {/* Grafik + Werbetechnik */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                grafik
              </span>
            </div>
            <h3 className="mt-5 heading-sans text-[clamp(1.5rem,2.4vw,1.85rem)] text-offwhite">
              Branding + <span className="text-accent-ink">Print.</span>
            </h3>
            <p className="mt-3 text-[14px] text-offwhite/55 leading-relaxed max-w-[380px]">
              Deine Identität • vom Logo bis zur Visitenkarte. Alles im
              gleichen Look.
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

            <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  ab
                </span>
                <span className="heading-sans text-[18px] text-offwhite tabular-nums">
                  600 €
                </span>
                <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  einmalig
                </span>
              </div>
              <Link
                href="/leistungen/grafik"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-offwhite/75 hover:text-accent-ink hover:gap-3 transition-all w-fit"
              >
                mehr erfahren <span>→</span>
              </Link>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-2xl p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                werbetechnik
              </span>
            </div>
            <h3 className="mt-5 heading-sans text-[clamp(1.5rem,2.4vw,1.85rem)] text-offwhite">
              Sichtbar • <span className="text-accent-ink">draußen auch.</span>
            </h3>
            <p className="mt-3 text-[14px] text-offwhite/55 leading-relaxed max-w-[380px]">
              Wenn du da bist, soll man es sehen. Beschriftung, Folie, Schild.
              Montage inklusive.
            </p>

            <ul className="mt-5 space-y-2">
              {[
                "folie · schild · banner",
                "fahrzeug-beschriftung",
                "montage vor ort inkl.",
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

            <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  preis
                </span>
                <span className="heading-sans text-[14px] text-offwhite/75">
                  nach maß
                </span>
              </div>
              <Link
                href="/leistungen/grafik"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-offwhite/75 hover:text-accent-ink hover:gap-3 transition-all w-fit"
              >
                mehr erfahren <span>→</span>
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
