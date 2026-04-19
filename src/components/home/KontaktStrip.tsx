"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function KontaktStrip() {
  return (
    <section className="relative py-24">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-10 overflow-hidden"
        >
          {/* Local lime glow inside the card */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-lime/15 blur-[120px]"
          />

          <div className="relative">
            <div className="label-mono">kontakt</div>
            <h2 className="mt-4 heading-display text-[clamp(2rem,4.5vw,3.25rem)] text-offwhite">
              Bereit loszulegen?
            </h2>
            <div className="mt-8 flex flex-wrap gap-10">
              <div>
                <div className="label-mono mb-1.5">e-mail</div>
                <a
                  href="mailto:nicolas@laconis.be"
                  className="font-sans text-[15px] text-offwhite hover:text-accent-ink transition-colors"
                >
                  nicolas@laconis.be
                </a>
              </div>
              <div>
                <div className="label-mono mb-1.5">telefon</div>
                <a
                  href="tel:+32488439147"
                  className="font-sans text-[15px] text-offwhite hover:text-accent-ink transition-colors"
                >
                  +32 488 43 91 47
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start md:items-end gap-2">
            <Button href="/kontakt#projekt" size="lg">
              projekt starten →
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
              multistep • dauert 60 sekunden
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
