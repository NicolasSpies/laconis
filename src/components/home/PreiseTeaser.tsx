"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/**
 * PreiseTeaser — homepage section.
 * keine pakete mehr · zeigt was das investment beeinflusst.
 * drei kartei-karten mit faktoren statt preiszeilen.
 */

type Karte = {
  num: string;
  titel: string;
  text: string;
  rotate: number;
  tape?: "left" | "right";
  note?: string;
};

const KARTEN: Karte[] = [
  {
    num: "01",
    titel: "scope",
    text: "onepager oder mehrseitige site mit cms · was du brauchst, bestimmt den rahmen.",
    rotate: -1.6,
    tape: "left",
  },
  {
    num: "02",
    titel: "content",
    text: "bringst du texte + bilder mit, oder machen wir das zusammen? macht den größten unterschied.",
    rotate: 0.6,
    tape: "right",
    note: "oft unterschätzt.",
  },
  {
    num: "03",
    titel: "branding dazu",
    text: "website allein · oder alles aus einer hand. letzteres spart dir koordination und sieht stimmiger aus.",
    rotate: 2.1,
    tape: "left",
    note: "am liebsten beides.",
  },
];

export function PreiseTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="03">investment</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="heading-display text-[clamp(2.25rem,5.5vw,4rem)] max-w-[820px] text-offwhite leading-[1.02]">
            was kostet das{" "}
            <span className="italic font-serif text-accent-ink">eigentlich</span>?
          </h2>
          <p className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[360px] leading-snug">
            keine tabelle · ehrliche faustregeln auf der preise-seite.
          </p>
        </motion.div>

        {/* kartei-karten · faktoren statt preise */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {KARTEN.map((k, i) => (
            <motion.article
              key={k.num}
              initial={{ opacity: 0, y: 32, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: k.rotate }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, rotate: k.rotate * 0.4, transition: { duration: 0.4 } }}
              className="relative glass rounded-xl p-7 md:p-8 flex flex-col min-h-[300px]"
            >
              {/* tape */}
              <span
                aria-hidden
                className={
                  "pointer-events-none absolute -top-2 h-4 w-20 bg-offwhite/10 border border-ink/10 rounded-[2px] " +
                  (k.tape === "left" ? "left-6 -rotate-6" : "right-6 rotate-3")
                }
              />

              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                faktor · {k.num}
              </span>

              <h3 className="mt-4 heading-display text-[clamp(1.75rem,2.8vw,2.35rem)] lowercase text-offwhite leading-none">
                {k.titel}
              </h3>

              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 flex-1">
                {k.text}
              </p>

              {k.note && (
                <p
                  className="mt-6 font-hand text-[16px] text-offwhite/55 leading-snug"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  {k.note}
                </p>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[520px] text-[13px] leading-relaxed text-offwhite/55">
            Die meisten Projekte: 1.500–6.000 €. Was den Rahmen bestimmt
            und wie's konkret läuft · auf der Preise-Seite.
          </p>
          <Button href="/preise" variant="primary" size="sm">
            was es kostet →
          </Button>
        </div>
      </div>
    </section>
  );
}
