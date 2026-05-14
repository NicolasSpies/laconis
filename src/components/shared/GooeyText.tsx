"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GooeyText · cycling words with feColorMatrix gooey-morph effect.
 *
 * - inline-flow safe (display: inline-flex auf container)
 * - color via currentColor · font via var(--font-instrument), serif, italic
 * - prefers-reduced-motion · zeigt nur erstes wort statisch
 *
 * morphTime · sekunden für blend zwischen alt → neu
 * cooldownTime · sekunden stillstand zwischen morphs
 */
type Props = {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
};

export function GooeyText({
  texts,
  morphTime = 2,
  cooldownTime = 1.5,
  className = "",
}: Props) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    if (!text1Ref.current || !text2Ref.current) return;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;

    let textIndex = 0;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId = 0;

    t1.textContent = texts[textIndex % texts.length];
    t2.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const doCooldown = () => {
      morph = 0;
      t2.style.filter = "";
      t2.style.opacity = "100%";
      t1.style.filter = "";
      t1.style.opacity = "0%";
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
          t1.textContent = texts[textIndex % texts.length];
          t2.textContent = texts[(textIndex + 1) % texts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [texts, morphTime, cooldownTime]);

  const sharedStyle: React.CSSProperties = {
    fontFamily: "var(--font-instrument), serif",
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    color: "currentColor",
  };

  // reduced-motion · render erstes wort statisch, kein filter, kein layout-shift
  if (reduced) {
    return (
      <span
        className={`inline-flex ${className}`}
        style={sharedStyle}
      >
        {texts[0]}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-baseline ${className}`}
      style={{
        // SVG filter applies gooey blend
        filter: "url(#gooey-text-filter)",
      }}
    >
      <span
        ref={text1Ref}
        className="inline-block"
        style={{
          ...sharedStyle,
          opacity: 0,
          whiteSpace: "nowrap",
        }}
      />
      <span
        ref={text2Ref}
        className="inline-block"
        style={{
          ...sharedStyle,
          marginLeft: "-100%",
          opacity: 1,
          whiteSpace: "nowrap",
        }}
      />
      {/* svg-filter definition · single-mount, idempotent (gleicher id) */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="gooey-text-filter">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
