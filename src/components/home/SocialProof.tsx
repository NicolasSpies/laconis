"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

type Metric = { num: string; label: string };

const metrics: Metric[] = [
  { num: "5+", label: "projekte" },
  { num: "3", label: "sprachen" },
  { num: "95+", label: "pagespeed score" },
  { num: "100%", label: "selbst entwickelt" },
  { num: "1", label: "ansprechpartner" },
];

/**
 * parsed a numeric target + suffix from strings like "5+", "100%", "3"
 */
function parseMetric(s: string): { target: number; suffix: string } {
  const match = s.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: s };
  return { target: parseInt(match[1], 10), suffix: match[2] ?? "" };
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const { target, suffix } = parseMetric(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <>
      {current}
      {suffix}
    </>
  );
}

export function SocialProof() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-10">
      <div className="container-site">
        <div className="glass-strong rounded-2xl overflow-hidden" ref={wrapRef}>
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-ink/10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 py-10 px-6 md:px-8 first:border-l-0 [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l"
              >
                <span
                  className={cn(
                    "inline-block heading-display text-[44px] md:text-[60px]",
                    i === 2
                      ? "text-accent-ink [text-shadow:0_0_40px_rgba(225,253,82,0.35)]"
                      : "text-offwhite",
                  )}
                >
                  <CountUp value={m.num} inView={inView} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* kundenstimme · eine stimme, nicht drei · nähe statt theater */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 max-w-[720px] mx-auto flex items-start gap-5 md:gap-6 px-2"
          style={{ transform: "rotate(-0.3deg)" }}
        >
          <div
            aria-hidden
            className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center font-mono text-[13px] md:text-[14px] text-accent-ink"
          >
            RF
          </div>
          <div className="min-w-0">
            <blockquote className="font-hand text-[21px] md:text-[26px] leading-[1.25] text-offwhite/85">
              „ich hab einfach angerufen, geschrieben wenn was war.
              keine tickets, keine agentur-höflichkeit."
            </blockquote>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              reimund fabry
              <span className="text-offwhite/25"> · </span>
              fabry baumpflege
              <span className="text-offwhite/25"> · </span>
              eupen
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
