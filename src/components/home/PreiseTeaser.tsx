"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Paket = {
  name: string;
  kategorie: string;
  preis: string;
  unit: string;
  beschreibung: string;
  bullets: string[];
  rotate: number;
  tape?: "left" | "right";
  featured?: boolean;
  note?: string;
  saving?: string;
};

/**
 * drei karten · ein eindruck aus jeder kategorie.
 * branding (brand identity) · web (standard) · bundle (grow · all-in-one + nachlass).
 * mittlere karte ist featured — das ist auch das meistgewählte auf /preise.
 */
const PAKETE: Paket[] = [
  {
    name: "brand identity",
    kategorie: "branding",
    preis: "1.200",
    unit: "€ einmalig",
    beschreibung: "logo, guide, visitenkarte · alles im selben look",
    bullets: ["logo · varianten · favicon", "brand guide + briefpapier", "3 social-templates"],
    rotate: -1.6,
    tape: "left",
  },
  {
    name: "standard web",
    kategorie: "web",
    preis: "2.800",
    unit: "€ einmalig",
    beschreibung: "bis zu 5 unterseiten · 1 cms-bereich",
    bullets: ["pflegst du selbst", "seo-ready · responsive", "ssl + backups"],
    rotate: 0.6,
    tape: "right",
    note: "der meistgewählte",
  },
  {
    name: "grow",
    kategorie: "bundle · web + branding",
    preis: "3.600",
    unit: "€ einmalig",
    beschreibung: "standard website + komplettes branding, alles aus einer hand",
    bullets: ["web + brand zusammen", "3 unterseiten · 1 cms", "spart 400 € gegenüber einzeln"],
    rotate: 2.1,
    tape: "left",
    featured: true,
    saving: "−400 €",
  },
];

export function PreiseTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="03">preise</SectionLabel>

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
            ein eindruck aus jeder kategorie · alle drei je in drei größen auf
            der preis-seite.
          </p>
        </motion.div>

        {/* karteikarten · leicht rotiert, tape-akzente */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {PAKETE.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 32, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, rotate: p.rotate * 0.4, transition: { duration: 0.4 } }}
              className={
                "relative glass rounded-xl p-7 md:p-8 flex flex-col min-h-[380px] " +
                (p.featured ? "md:scale-[1.04] md:-mt-2 border-lime/30" : "")
              }
            >
              {/* tape */}
              <span
                aria-hidden
                className={
                  "pointer-events-none absolute -top-2 h-4 w-20 bg-offwhite/10 border border-ink/10 rounded-[2px] " +
                  (p.tape === "left" ? "left-6 -rotate-6" : "right-6 rotate-3")
                }
              />

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  {p.kategorie}
                </span>
                {p.saving && (
                  <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink">
                    {p.saving}
                  </span>
                )}
              </div>

              <h3 className="mt-4 heading-display text-[clamp(1.75rem,2.8vw,2.35rem)] lowercase text-offwhite leading-none">
                {p.name}
              </h3>

              <p className="mt-3 text-[13px] leading-relaxed text-offwhite/55">
                {p.beschreibung}
              </p>

              <ul className="mt-5 space-y-1.5">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55"
                  >
                    <span className="w-1 h-1 rounded-full bg-lime" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={
                      "heading-display text-[clamp(2rem,4vw,3rem)] leading-none tabular-nums " +
                      (p.featured ? "text-accent-ink" : "text-offwhite")
                    }
                  >
                    {p.preis}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 ml-1">
                    {p.unit}
                  </span>
                </div>
                {p.note && (
                  <p
                    className="mt-3 font-hand text-[16px] text-offwhite/55 leading-snug"
                    style={{ transform: "rotate(-1deg)" }}
                  >
                    {p.note}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[520px] text-[13px] leading-relaxed text-offwhite/55">
            Laufend ab 20 €/Monat für Hosting, Backups und kleine Pflege.
            Domain separat. Baukasten-Variante für eigene Kombis · auf der
            Preis-Seite.
          </p>
          <Link
            href="/preise"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label text-accent-ink hover:gap-3 transition-all"
          >
            alle preise ansehen <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
