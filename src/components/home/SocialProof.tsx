"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
                <span className="inline-block heading-display text-[44px] md:text-[60px] text-accent-ink [text-shadow:0_0_40px_rgba(225,253,82,0.35)]">
                  <CountUp value={m.num} inView={inView} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
