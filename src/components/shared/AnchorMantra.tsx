"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

/**
 * AnchorMantra · sitewide 3-wort-anchor "say less · mean møre".
 *
 * variants:
 *   - "hero"   · groß, prominent, unter dem CTA
 *   - "inline" · klein, als marquee-style trenner
 *   - "stamp"  · mini-version für footer · ersetzt das alte slogan-pendant
 *
 * micro-anims:
 *   - wörter staggered fade-in von unten (8% offset)
 *   - · separators pulsen subtle (lime → lila → lime über 8s)
 *   - reduced-motion: kein stagger, instant in
 */

type Variant = "hero" | "inline" | "stamp";

type MantraDict = {
  /** 3 wörter · jeweils kleinbuchstaben · ø-zeichen erlaubt */
  words: [string, string, string];
};

/**
 * trilingual variants des anchor-mantras.
 * DE übersetzung des EN-originals "say less · mean møre".
 * FR übersetzung folgt der gleichen kürze.
 */
const DICT: Record<Locale, MantraDict> = {
  de: { words: ["sag", "weniger", "mein møre"] },
  fr: { words: ["dis", "moins", "veux møre"] },
  en: { words: ["say", "less", "mean møre"] },
};

const PRESETS: Record<
  Variant,
  {
    container: string;
    word: string;
    separator: string;
    gap: string;
  }
> = {
  hero: {
    container: "inline-flex items-baseline justify-center flex-wrap",
    word: "font-display font-black lowercase text-[clamp(20px,2.4vw,32px)] text-[#0a0a0a] tracking-[-0.02em]",
    separator: "text-[clamp(16px,2vw,24px)] text-[#b084d3]",
    gap: "gap-3 md:gap-4",
  },
  inline: {
    container: "inline-flex items-baseline justify-center flex-wrap",
    word: "font-mono text-[11px] uppercase tracking-label text-current opacity-65",
    separator: "text-[10px] text-current opacity-45",
    gap: "gap-2",
  },
  stamp: {
    container: "inline-flex items-baseline flex-wrap",
    word: "font-sans text-[12px] lowercase text-current opacity-55 tracking-[-0.01em]",
    separator: "text-[10px] text-current opacity-35",
    gap: "gap-1.5",
  },
};

export function AnchorMantra({
  variant = "hero",
  className,
  align = "center",
}: {
  variant?: Variant;
  className?: string;
  align?: "left" | "center";
}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();
  const cfg = PRESETS[variant];

  const containerInitial = reduce ? { opacity: 1 } : { opacity: 0 };
  const containerAnimate = { opacity: 1 };
  const wordInitial = reduce ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 };
  const wordAnimate = { y: 0, opacity: 1 };

  return (
    <motion.span
      initial={containerInitial}
      whileInView={containerAnimate}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        cfg.container,
        cfg.gap,
        align === "left" && "justify-start",
        className,
      )}
      aria-label={t.words.join(" · ")}
    >
      {t.words.map((word, i) => (
        <span key={i} className="inline-flex items-baseline gap-2 md:gap-3">
          {i > 0 && (
            <motion.span
              aria-hidden
              className={cfg.separator}
              animate={
                reduce
                  ? undefined
                  : {
                      color: ["#e1fd52", "#b084d3", "#e1fd52"],
                    }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              ·
            </motion.span>
          )}
          <motion.span
            initial={wordInitial}
            whileInView={wordAnimate}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.55,
              delay: 0.05 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cfg.word}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
