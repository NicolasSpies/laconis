"use client";

import type { ReactNode } from "react";

/**
 * Marquee · langsam scrollende textband · css-only (no requestAnimationFrame).
 * splittet item-list und dupliziert sie damit der loop seamless ist.
 *
 * usage:
 *   <Marquee items={["·", "lacønis", "·", "solo studio"]} />
 *   <Marquee items={[...]} bg="#0a0a0a" fg="#e1fd52" />
 */

type Props = {
  items: ReactNode[];
  bg?: string;
  fg?: string;
  /** in seconds · niedriger = schneller */
  speed?: number;
  /** für lila accent statt lime */
  className?: string;
};

export function Marquee({
  items,
  bg = "#0a0a0a",
  fg = "#e1fd52",
  speed = 38,
  className = "",
}: Props) {
  return (
    <div
      className={`marquee-root w-full overflow-hidden ${className}`}
      style={{ background: bg, color: fg }}
    >
      <div
        className="marquee-track flex whitespace-nowrap py-4 will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex shrink-0 items-center gap-8 px-4"
            aria-hidden={dup === 1 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <span
                key={i}
                className="font-mono text-[12px] md:text-[14px] uppercase tracking-label"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        /* hover-pause · band hält still wenn cursor drauf liegt */
        .marquee-root:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
