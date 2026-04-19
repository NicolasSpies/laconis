"use client";

import { motion } from "framer-motion";
import { Scribble } from "@/components/ui/Scribble";

export function Manifest() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="container-site">
        <div className="max-w-[900px] relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="h-px w-8 bg-lime/60" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
              eine überzeugung
            </span>
          </motion.div>

          <h2 className="heading-display text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-offwhite"
            >
              Eine Website
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="block text-offwhite"
            >
              ist kein Produkt.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="block text-offwhite/35"
            >
              es ist das{" "}
              <span className="relative inline-block">
                <span className="relative">erste Wort</span>
                <Scribble
                  variant="circle"
                  delay={1.1}
                  duration={1.8}
                  strokeWidth={1.2}
                  replayOnHover
                  className="absolute -inset-x-[6%] -inset-y-[30%] w-[112%] h-[160%] text-accent-ink/70 pointer-events-none"
                />
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="block text-offwhite/35"
            >
              das deine Kunden
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="block text-accent-ink"
            >
              von dir hören.
            </motion.span>
          </h2>

          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 8 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:flex items-center gap-2 absolute right-0 top-[38%] font-hand leading-[1]"
          >
            <Scribble
              variant="arrow"
              delay={2.1}
              duration={1.3}
              strokeWidth={1.3}
              className="w-[130px] h-10 text-offwhite/55 -scale-x-100"
            />
            <span className="whitespace-nowrap text-[26px] text-accent-ink/80">
              genau das.
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 text-[14px] leading-relaxed text-offwhite/55 whitespace-nowrap"
          >
            Zuerst verstehen • dann bauen. So entsteht etwas, das wirklich zu
            dir passt.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
