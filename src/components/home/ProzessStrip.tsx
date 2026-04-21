"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Step = {
  n: string;
  titel: string;
  beschreibung: string;
  rotate: number;
  offsetY: number;
  note?: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    titel: "hören",
    beschreibung:
      "30-min call oder kaffee in eupen. du redest, ich frage nach. kein pitch-deck.",
    rotate: -1.1,
    offsetY: 0,
  },
  {
    n: "02",
    titel: "skizzieren",
    beschreibung:
      "angebot + grobes design-konzept. zwei richtungen, du wählst · oder schmeiß mich raus.",
    rotate: 0.8,
    offsetY: 40,
    note: "dazwischen · kaffee",
  },
  {
    n: "03",
    titel: "bauen",
    beschreibung:
      "design & development in einem stück. du siehst jeden zwischenstand live auf einem staging-link.",
    rotate: -0.6,
    offsetY: 12,
  },
  {
    n: "04",
    titel: "launchen",
    beschreibung:
      "ich übergeb dir login + kurze einweisung. ab launch pflegst du selbst · oder ich übernehm's.",
    rotate: 1.4,
    offsetY: 32,
  },
];

export function ProzessStrip() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="container-site">
        <SectionLabel num="04">ablauf</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 flex flex-wrap items-end justify-between gap-4 max-w-[980px]"
        >
          <h2 className="heading-display text-[clamp(2.25rem,5.5vw,4rem)] text-offwhite leading-[1.02]">
            vier schritte.
            <br />
            keine{" "}
            <span className="italic font-serif text-accent-ink">blackbox.</span>
          </h2>
          <p className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[300px] leading-snug self-end">
            du weißt immer, was gerade passiert · und warum.
          </p>
        </motion.div>

        {/* steps · asymmetric overlap mit riesigen ziffern als hintergrund */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
              style={{ transform: `translateY(${s.offsetY}px)` }}
            >
              {/* riesen-ziffer im hintergrund · outline, dezent */}
              <span
                aria-hidden
                className="absolute -top-10 -left-3 md:-left-5 pointer-events-none select-none heading-display leading-none text-[clamp(7rem,14vw,12rem)] text-transparent"
                style={{
                  WebkitTextStroke: "1px rgb(var(--fg) / 0.12)",
                  transform: `rotate(${s.rotate}deg)`,
                }}
              >
                {s.n}
              </span>

              <div
                className="relative glass rounded-xl p-6 md:p-7"
                style={{ transform: `rotate(${s.rotate * 0.35}deg)` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-lime" />
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    schritt · {s.n}
                  </span>
                </div>

                <h3 className="mt-4 heading-sans text-[clamp(1.35rem,2.4vw,1.75rem)] text-offwhite lowercase leading-none">
                  {s.titel}
                </h3>

                <p className="mt-4 text-[13px] leading-relaxed text-offwhite/75">
                  {s.beschreibung}
                </p>
              </div>

              {s.note && (
                <span
                  className="absolute -bottom-8 left-2 font-hand text-[17px] text-offwhite/55 leading-none whitespace-nowrap"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  ↳ {s.note}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-32 md:mt-28 flex justify-end">
          <Link
            href="/ansatz"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-offwhite/75 hover:text-accent-ink hover:gap-3 transition-all"
          >
            ansatz · im detail <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
