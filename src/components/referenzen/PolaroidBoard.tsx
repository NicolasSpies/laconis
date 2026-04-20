"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type Controls = ReturnType<typeof useAnimationControls>;
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen, type Referenz } from "@/data/referenzen";

type Position = { left: string; top: string; rotate: number };

// -------- LAYOUT CONFIG --------
const ROW_HEIGHT_PX = 420;
const CARD_WIDTH_PCT = 22; // approx card width relative to board

function chooseCols(count: number) {
  if (count === 3) return 3;
  if (count <= 4) return 2;
  return 3;
}

const SPRING = { type: "spring" as const, stiffness: 180, damping: 18 };

// dark card background — subtle noise over near-black
const CARD_BG = `
  radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.045) 0%, transparent 55%),
  url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`,
  )}"),
  linear-gradient(180deg, #121212 0%, #0c0c0c 100%)
`;

function generatePositions(count: number): Position[] {
  const cols = chooseCols(count);
  const colWidthPct = 100 / cols;
  const positions: Position[] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseLeft = col * colWidthPct + (colWidthPct - CARD_WIDTH_PCT) / 2;
    // deterministic jitter — rounded to avoid hydration float mismatches
    const jitterX = Math.round(Math.sin(i * 7.13 + 1.2) * 3 * 100) / 100;
    const jitterY = Math.round(Math.cos(i * 5.37 + 0.6) * 28);
    const rotate = Math.round(Math.sin(i * 3.73 + 0.9) * 7 * 10) / 10;
    positions.push({
      left: `${(Math.round((baseLeft + jitterX) * 100) / 100).toFixed(2)}%`,
      top: `${row * ROW_HEIGHT_PX + jitterY + 20}px`,
      rotate,
    });
  }
  return positions;
}


function PolaroidCard({
  ref_,
  pos,
  index,
  constraintsRef,
  registerControls,
  zIndex,
  bringToFront,
}: {
  ref_: Referenz;
  pos: Position;
  index: number;
  constraintsRef: React.RefObject<HTMLDivElement>;
  registerControls: (i: number, c: Controls) => void;
  zIndex: number;
  bringToFront: (i: number) => void;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    registerControls(index, controls);
  }, [controls, index, registerControls]);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.12}
      animate={controls}
      initial={{ x: 0, y: 0, rotate: pos.rotate, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileDrag={{
        scale: 1.06,
        rotate: pos.rotate * 0.35,
      }}
      onPointerDown={() => bringToFront(index)}
      style={{
        left: pos.left,
        top: pos.top,
        zIndex,
        touchAction: "none",
      }}
      className="absolute w-[240px] cursor-grab active:cursor-grabbing will-change-transform"
    >
      <div
        className="group relative text-offwhite rounded-md p-2.5 pb-3 border border-ink/10 hover:border-lime/50 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.5)] transition-colors"
        style={{ background: CARD_BG }}
      >
        {/* thin lime accent at top — the "tape" moment */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[1px] left-5 right-5 h-[2px] bg-lime/50"
        />

        <div className="relative overflow-hidden rounded-[2px]">
          <RefThumb ref_={ref_} aspect="4 / 5" />
          {/* kategorie badge */}
          <span className="absolute top-2.5 left-2.5 font-mono text-[9px] uppercase tracking-label text-black bg-lime px-1.5 py-0.5 rounded-sm">
            {ref_.kategorieLabel}
          </span>
        </div>

        <div className="pt-3 px-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="heading-sans text-[16px] leading-none text-offwhite truncate lowercase">
              {ref_.name}
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 shrink-0">
              {ref_.jahr}
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-label text-offwhite/35 truncate">
            {ref_.ort}
          </p>

          <div className="mt-3 flex items-center justify-end">
            <Link
              href={`/referenzen/${ref_.slug}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 group-hover:text-accent-ink transition-colors"
            >
              ansehen →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PolaroidBoard({ items: itemsProp }: { items?: Referenz[] } = {}) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => itemsProp ?? referenzen, [itemsProp]);
  const positions = useMemo(() => generatePositions(items.length), [items.length]);

  const controlsRef = useRef<(Controls | null)[]>(
    Array(items.length).fill(null),
  );

  const [zIndices, setZIndices] = useState<number[]>(() =>
    items.map((_, i) => i + 1),
  );
  const topZRef = useRef(items.length);

  const registerControls = useCallback((i: number, c: Controls) => {
    controlsRef.current[i] = c;
  }, []);

  const bringToFront = useCallback((i: number) => {
    topZRef.current += 1;
    const next = topZRef.current;
    setZIndices((prev) => {
      if (prev[i] === next) return prev;
      const copy = [...prev];
      copy[i] = next;
      return copy;
    });
  }, []);

  const reset = () => {
    controlsRef.current.forEach((c, i) => {
      if (!c) return;
      c.start({
        x: 0,
        y: 0,
        rotate: positions[i].rotate,
        scale: 1,
        transition: SPRING,
      });
    });
    setZIndices(items.map((_, i) => i + 1));
    topZRef.current = items.length;
  };

  const cols = chooseCols(items.length);
  const rows = Math.ceil(items.length / cols);
  const boardHeight = rows * ROW_HEIGHT_PX + 40;

  return (
    <>
      {/* Desktop — physics board */}
      <div className="hidden md:block relative">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            tipp • karten lassen sich verschieben
          </span>
          <button
            type="button"
            onClick={reset}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            <span className="inline-block transition-transform duration-500 group-hover:rotate-180">
              ↻
            </span>
            neu anordnen
          </button>
        </div>

        <div
          ref={constraintsRef}
          className="relative w-full"
          style={{ height: `${boardHeight}px` }}
        >
          {/* bg layer (clipped) — sits behind cards so rotation corners aren't cut */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl border border-ink/5 bg-gradient-to-b from-ink/[0.015] to-transparent overflow-hidden pointer-events-none"
          >
            <div
              className="absolute inset-0 grid-bg-faint"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 90%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 90%)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-lime/[0.05] blur-[120px]" />
          </div>

          {items.map((r, i) => (
            <PolaroidCard
              key={r.slug}
              ref_={r}
              pos={positions[i]}
              index={i}
              constraintsRef={constraintsRef}
              registerControls={registerControls}
              zIndex={zIndices[i]}
              bringToFront={bringToFront}
            />
          ))}
        </div>
      </div>

      {/* Mobile — static grid */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {items.map((r, i) => {
          const rotate = i % 2 === 0 ? -3 : 3;
          return (
            <Link
              key={r.slug}
              href={`/referenzen/${r.slug}`}
              className="block"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <div
                className="relative text-offwhite rounded-md p-2 pb-3 border border-ink/10 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.9)]"
                style={{ background: CARD_BG }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-[1px] left-4 right-4 h-[2px] bg-lime/50"
                />
                <div className="relative overflow-hidden rounded-[2px]">
                  <RefThumb ref_={r} aspect="4 / 5" />
                  <span className="absolute top-2 left-2 font-mono text-[8px] uppercase tracking-label text-black bg-lime px-1 py-0.5 rounded-sm">
                    {r.kategorieLabel}
                  </span>
                </div>
                <div className="pt-2 px-0.5">
                  <h3 className="heading-sans text-[15px] leading-none truncate lowercase">
                    {r.name}
                  </h3>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-label text-offwhite/35 truncate">
                    {r.ort} • {r.jahr}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
