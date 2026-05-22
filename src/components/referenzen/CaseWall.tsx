"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { referenzen, type Referenz } from "@/data/referenzen";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * CaseWall · 3D-tilted card wall für /referenzen.
 *
 * 3 reale cases werden side-by-side in 3D-space arrangiert:
 * jede card mit eigenem z-translate (depth), perspective-tilt der
 * ganzen wall folgt der maus. hover hebt eine card weit nach vorne
 * mit accent-glow. click navigiert zum case-detail.
 *
 * skalliert automatisch wenn mehr cases dazu kommen (3 → N).
 */

const Z_OFFSETS = [20, 80, 40]; // pro card · staircase-depth

type Dict = {
  hint: string;
  caseLabel: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    hint: "maus über die wand · sie neigt sich · hover hebt cases nach vorne",
    caseLabel: "case",
    cta: "case lesen →",
  },
  fr: {
    hint: "souris sur le mur · il s'incline · le hover ramène les cases en avant",
    caseLabel: "case",
    cta: "voir le case →",
  },
  en: {
    hint: "mouse over the wall · it tilts · hover brings cases forward",
    caseLabel: "case",
    cta: "see case →",
  },
};

export function CaseWall() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState<string | null>(null);

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

  const rx = (mouse.y - 0.5) * -14;
  const ry = (mouse.x - 0.5) * 14;

  const cases: Referenz[] = referenzen;

  return (
    <div className="relative">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative rounded-2xl overflow-hidden border border-ink/20 mx-auto"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, #1a1a1a 0%, #0e0e0e 60%, #050505 100%)",
          height: "clamp(520px, 64vh, 760px)",
          maxWidth: "1280px",
          perspective: "1600px",
        }}
      >
        {/* corner labels */}
        <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
          wall · {String(cases.length).padStart(2, "0")} · in raum
        </span>
        <span className="absolute top-5 right-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-50">
          bewege maus · neigt sich
        </span>

        {/* edge vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* 3D arrangement */}
        <div
          className="absolute inset-12 grid"
          style={{
            gridTemplateColumns: `repeat(${cases.length}, minmax(0, 1fr))`,
            gap: "1.25rem",
            transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 220ms ease-out",
          }}
        >
          {cases.map((c, i) => {
            const isHovered = hovered === c.slug;
            const baseZ = Z_OFFSETS[i % Z_OFFSETS.length];
            return (
              <Link
                href={`${buildPath("referenzen", locale)}/${c.slug}`}
                key={c.slug}
                onMouseEnter={() => setHovered(c.slug)}
                className="group relative block rounded-lg overflow-hidden border border-ink/20 text-left"
                style={{
                  transform: `translateZ(${isHovered ? 160 : baseZ}px)`,
                  transition:
                    "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms",
                  transformStyle: "preserve-3d",
                  background: "#0e0e0e",
                  boxShadow: isHovered
                    ? `0 30px 60px -20px ${c.farbe}88, 0 0 0 1px ${c.farbe}66`
                    : "0 20px 40px -20px rgba(0,0,0,0.65)",
                }}
                aria-label={c.name}
              >
                <div className="relative aspect-[3/4]">
                  {c.heroImage ? (
                    <Image
                      src={c.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 360px, 240px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: c.farbe }}
                    >
                      <span
                        className="text-[clamp(3rem,8vw,6rem)] text-[#0a0a0a]/45"
                        style={{
                          fontFamily: "var(--font-caveat), cursive",
                        }}
                      >
                        {(c.monogram ?? c.name.charAt(0)).toLowerCase()}
                      </span>
                    </div>
                  )}
                  {/* darken bottom */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 100%)",
                    }}
                  />
                  {/* accent stripe */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 h-[3px]"
                    style={{ background: c.farbe }}
                  />

                  {/* meta */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] uppercase tracking-label"
                        style={{ color: c.farbe }}
                      >
                        {t.caseLabel} № {String(i + 1).padStart(2, "0")}
                      </span>
                      {c.inArbeit && (
                        <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink bg-[#0a0a0a]/65 backdrop-blur px-2 py-0.5 rounded">
                          in arbeit
                        </span>
                      )}
                    </div>
                    <div>
                      <h3
                        className="text-[clamp(1.4rem,2.5vw,2.2rem)] leading-[0.95] text-offwhite lowercase"
                        style={{
                          fontFamily: "var(--font-caveat), cursive",
                        }}
                      >
                        {c.name}
                      </h3>
                      <div className="mt-2 flex items-baseline justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                          {c.kategorieLabel} · {c.ort}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-label opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: c.farbe }}
                        >
                          {t.cta}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 pointer-events-none">
          <span className="h-px w-10 bg-offwhite/25" />
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            hover · click · navigate
          </span>
          <span className="h-px w-10 bg-offwhite/25" />
        </div>
      </div>

      {/* sub-hint · plain readable annotation */}
      <p className="mt-4 font-hand text-[17px] text-offwhite/45 rotate-[-1deg] inline-block">
        {t.hint}
      </p>
    </div>
  );
}
