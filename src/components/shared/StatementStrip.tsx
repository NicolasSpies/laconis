"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * StatementStrip · ruhiger ersatz für das marquee-laufband (phase "seite
 * für seite" · nicolas: laufband war "too much").
 *
 * das dunkle band bleibt als visueller rhythmus-breaker zwischen sections ·
 * aber die aussagen stehen STILL: einmaliger stagger-reveal beim
 * sichtbarwerden, danach ruhe. keine endlos-animation.
 *
 * API kompatibel zum alten Marquee: items dürfen "·"-einträge enthalten
 * (werden als akzent-separatoren gerendert) · bg/fg wie gehabt ·
 * speed wird ignoriert (es bewegt sich nichts mehr).
 */
export function StatementStrip({
  items,
  bg = "#0a0a0a",
  fg = "#e1fd52",
  className,
}: {
  items: string[];
  bg?: string;
  fg?: string;
  /** ignoriert · nur für drop-in-kompatibilität mit dem alten marquee */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  /* führende/folgende "·" raus · zwischen den wörtern setzen wir selbst */
  const words = items.filter((it) => it.trim() !== "·");

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      style={{ background: bg, color: fg }}
    >
      <div className="container-site flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 py-5 md:py-6">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-flex items-baseline gap-3">
            {i > 0 && (
              <span aria-hidden className="opacity-40 text-[11px]">
                ·
              </span>
            )}
            <motion.span
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-mono text-[11px] md:text-[12px] uppercase tracking-label whitespace-nowrap"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}
