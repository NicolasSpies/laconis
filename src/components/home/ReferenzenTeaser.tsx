"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { PolaroidBoard } from "@/components/referenzen/PolaroidBoard";
import { referenzen } from "@/data/referenzen";

export function ReferenzenTeaser() {
  // letzte 3 projekte (neueste zuerst)
  const items = [...referenzen]
    .sort((a, b) => b.jahr - a.jahr)
    .slice(0, 3);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="02">referenzen</SectionLabel>
        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="heading-display text-[clamp(2rem,5vw,3.5rem)] max-w-[700px] text-offwhite"
          >
            Ergebnisse, die für sich sprechen.
          </motion.h2>
          <p className="text-[14px] text-offwhite/50 max-w-[360px]">
            auswahl aktueller projekte • nimm sie ruhig in die hand.
          </p>
        </div>

        <div className="mt-14">
          <PolaroidBoard items={items} />
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/referenzen" variant="glass" size="md">
            alle referenzen ansehen →
          </Button>
        </div>
      </div>
    </section>
  );
}
