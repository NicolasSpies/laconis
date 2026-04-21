"use client";

import { motion } from "framer-motion";

/**
 * eine stimme, eine karte · keine stats, kein grid.
 * sitzt zwischen referenzen und kontakt: nachdem man die arbeit gesehen hat,
 * kommt nochmal ein mensch zu wort, bevor zum call-to-action geswitcht wird.
 */
export function TestimonialStrip() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container-site">
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          style={{ transform: "rotate(-0.4deg)" }}
          className="relative max-w-[760px] mx-auto glass rounded-2xl p-8 md:p-12"
        >
          {/* tape oben links */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-2 left-10 h-4 w-16 bg-offwhite/10 border border-ink/10 rounded-[2px] -rotate-6"
          />

          {/* zitat-anführungszeichen als deko */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1 right-8 font-serif italic text-[120px] leading-none text-accent-ink/15 select-none"
          >
            „
          </span>

          <div className="relative flex items-start gap-5 md:gap-7">
            <div
              aria-hidden
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center font-mono text-[13px] md:text-[14px] text-accent-ink"
            >
              RF
            </div>

            <div className="min-w-0">
              <blockquote className="font-hand text-[22px] md:text-[28px] leading-[1.25] text-offwhite/85">
                „ich hab einfach angerufen, geschrieben wenn was war. keine
                tickets, keine agentur-höflichkeit."
              </blockquote>

              <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                <span className="text-offwhite">reimund fabry</span>
                <span className="text-offwhite/35">·</span>
                <span>fabry baumpflege</span>
                <span className="text-offwhite/35">·</span>
                <span>eupen</span>
              </figcaption>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
