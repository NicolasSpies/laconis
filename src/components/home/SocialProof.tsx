"use client";

import { motion } from "framer-motion";

const metrics = [
  { num: "5+", label: "projekte" },
  { num: "3", label: "sprachen" },
  { num: "100%", label: "selbst entwickelt" },
  { num: "1", label: "ansprechpartner" },
];

export function SocialProof() {
  return (
    <section className="relative py-10">
      <div className="container-site">
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink/10">
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
                  {m.num}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/50">
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
