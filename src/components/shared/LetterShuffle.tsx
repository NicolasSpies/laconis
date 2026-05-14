"use client";

import { motion, LayoutGroup, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/**
 * LetterShuffle · animates a permutation between two anagram strings.
 *
 * "nicolas" ↔ "lacønis" share 6 letters (l, a, c, n, i, s) in different
 * positions plus one transform (o → ø). framer-motion's layoutId connects
 * same-letter spans across renders → each letter slides to its new spot.
 * the o↔ø shares a layoutId so the position transition is continuous
 * while the glyph content switches.
 *
 * one-shot pattern: starts on `initial`, after `delay` ms morphs to
 * `reveal`. on hover the user can toggle back (discovery).
 *
 * reduced-motion · render `reveal` statically, no animation.
 */
type Props = {
  initial: string;
  reveal: string;
  /** ms after mount before auto-morphing to reveal · default 1400 */
  delay?: number;
  /** allow hover to swap back to initial · default true */
  hoverToggle?: boolean;
  className?: string;
};

function layoutIdFor(char: string) {
  if (char === "ø" || char === "Ø") return "char-o";
  return `char-${char.toLowerCase()}`;
}

export function LetterShuffle({
  initial,
  reveal,
  delay = 1400,
  hoverToggle = true,
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(initial);
  const morphed = useRef(false);

  useEffect(() => {
    if (reduced) {
      setCurrent(reveal);
      return;
    }
    const t = setTimeout(() => {
      setCurrent(reveal);
      morphed.current = true;
    }, delay);
    return () => clearTimeout(t);
  }, [reduced, reveal, delay]);

  if (reduced) {
    return <span className={className}>{current}</span>;
  }

  const onEnter = () => {
    if (hoverToggle && morphed.current) setCurrent(initial);
  };
  const onLeave = () => {
    if (hoverToggle && morphed.current) setCurrent(reveal);
  };

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      // pointer-events stay on so hover works · letters underneath are decorative
    >
      <LayoutGroup>
        {current.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            layoutId={layoutIdFor(char)}
            className="inline-block"
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 220,
              mass: 0.6,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </LayoutGroup>
    </span>
  );
}
