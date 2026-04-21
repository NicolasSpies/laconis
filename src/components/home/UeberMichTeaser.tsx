"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Placeholder } from "@/components/ui/Placeholder";
import Link from "next/link";

/**
 * kompakte über-mich-introduktion · direkt nach hero.
 * foto links, zwei sätze rechts, handschrift-signatur. rest auf der detail-seite.
 */
export function UeberMichTeaser() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container-site">
        <SectionLabel num="01">wer</SectionLabel>

        <div className="mt-8 grid md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2.2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative max-w-[260px]"
          >
            {/* tape */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 left-8 h-4 w-20 bg-offwhite/10 border border-ink/10 rounded-[2px] -rotate-6"
            />
            <Placeholder
              label="føto • kommt"
              aspect="4/5"
              className="rounded-md border border-ink/10 shadow-[0_18px_48px_-20px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-[620px]"
          >
            <p
              className="font-hand text-[22px] md:text-[26px] text-offwhite/55 leading-snug mb-3"
              style={{ transform: "rotate(-1deg)" }}
            >
              moin, ich bin nicolas.
            </p>

            <blockquote className="heading-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] text-offwhite">
              ein mensch, kein team.{" "}
              <span className="italic font-serif text-accent-ink">
                und ich nehm's persönlich.
              </span>
            </blockquote>

            <p className="mt-6 text-[14px] md:text-[15px] leading-relaxed text-offwhite/55 max-w-[520px]">
              Mediengestalter aus Eupen · seit 2019 eine Hand für Design und
              Code. Keine Zwischenschicht, kein Ticket-Tool · du schreibst
              mir, ich antworte.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/ueber-mich"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-accent-ink hover:gap-3 transition-all"
              >
                mehr über mich <span>→</span>
              </Link>
              <span
                className="font-hand text-[18px] text-offwhite/55 leading-none"
                style={{ transform: "rotate(-2deg)" }}
              >
                · de · fr · en
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
