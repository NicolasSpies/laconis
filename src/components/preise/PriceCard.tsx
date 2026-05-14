"use client";

import { TiltCard } from "@/components/shared/TiltCard";
import { CounterUp } from "@/components/ui/CounterUp";

/**
 * PriceCard · pricing-card mit animiertem counter beim scroll-into-view.
 * preset bestimmt farbe · lime/lila/dark · counter zählt automatisch hoch
 * sobald die card im viewport ist (CounterUp übernimmt observer).
 */

type Props = {
  label: string;
  fromPrice: number;
  toPrice?: number;
  desc: string;
  hand?: string;
  preset?: "lime" | "lila" | "dark" | "ink" | "paper";
};

export function PriceCard({
  label,
  fromPrice,
  toPrice,
  desc,
  hand,
  preset = "lime",
}: Props) {
  return (
    <TiltCard preset={preset} intensity={10}>
      <div className="p-7 md:p-9 flex flex-col gap-5 min-h-[320px]">
        <span
          className="font-mono text-[10px] uppercase tracking-label"
          style={{ opacity: 0.7 }}
        >
          {label}
        </span>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-mono text-[12px]" style={{ opacity: 0.65 }}>
            ab
          </span>
          <span className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.04em] leading-none">
            <CounterUp
              value={fromPrice}
              duration={900}
              resetOnViewEnter
              format={(n) => `${Math.round(n).toLocaleString("de-DE")} €`}
            />
          </span>
          {toPrice && (
            <span
              className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-black tracking-[-0.04em] leading-none"
              style={{ opacity: 0.55 }}
            >
              –{" "}
              <CounterUp
                value={toPrice}
                duration={1100}
                resetOnViewEnter
                format={(n) => `${Math.round(n).toLocaleString("de-DE")} €`}
              />
            </span>
          )}
        </div>

        <p
          className="text-[14px] md:text-[15px] leading-relaxed flex-1"
          style={{ opacity: 0.85 }}
        >
          {desc}
        </p>

        {hand && (
          <p
            className="font-hand text-[17px] leading-snug"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              opacity: 0.85,
              transform: "rotate(-1deg)",
            }}
          >
            {hand}
          </p>
        )}
      </div>
    </TiltCard>
  );
}
