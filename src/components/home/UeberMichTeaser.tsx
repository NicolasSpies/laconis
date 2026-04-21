"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Scribble } from "@/components/ui/Scribble";
import { useReveal } from "@/lib/useReveal";
import { Button } from "@/components/ui/Button";

/**
 * wer & überzeugung · gemerged aus dem alten UeberMichTeaser + Manifest.
 * zwei akte in einer section:
 *   akt 1 — die person (foto + kurz-vita, link zur detail-seite)
 *   akt 2 — das statement ("eine website ist kein produkt...") als
 *           typografischer moment, stempel schwebt rechts raus
 * getrennt durch einen dünnen lime-divider mit label · nicht durch einen
 * kompletten section-break. liest als EIN gedanke, nicht zwei.
 */
/* word-by-word reveal-helper · nutzt die globale .reveal-up · kein framer */
function RevealWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span
      className="reveal-up inline-block"
      style={{ "--rd": `${delay}ms` } as React.CSSProperties}
    >
      {text}
    </span>
  );
}

function RevealLine({
  words,
  base,
  stagger = 80,
  className = "",
}: {
  words: string[];
  base: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {words.map((w, i) => (
        <span key={i}>
          <RevealWord text={w} delay={base + i * stagger} />
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function UeberMichTeaser() {
  const manifestRef = useReveal({ margin: "-80px 0px" }) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-site">
        <SectionLabel num="01">wer</SectionLabel>

        {/* ═══ akt 1 · die person ═══ */}
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-ink/10 shadow-[0_18px_48px_-20px_rgba(0,0,0,0.5)]">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&q=80&auto=format&fit=crop"
                alt="portrait · placeholder"
                fill
                sizes="(min-width: 1024px) 260px, 220px"
                className="object-cover grayscale contrast-[1.05] saturate-[0.9]"
              />
              <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-label text-offwhite bg-black/55 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                føto · placeholder
              </span>
            </div>
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
              <Button href="/ueber-mich" variant="primary" size="sm">
                mehr über mich →
              </Button>
              <span
                className="font-hand text-[18px] text-offwhite/55 leading-none"
                style={{ transform: "rotate(-2deg)" }}
              >
                · de · fr · en
              </span>
            </div>
          </motion.div>
        </div>

        {/* ═══ überleitung · schlichte linie + handschriftliche randnotiz ═══ */}
        <div className="mt-24 md:mt-32 flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <span
            className="font-hand text-[19px] text-offwhite/35 shrink-0"
            style={{ transform: "rotate(-1.2deg)" }}
          >
            warum ich so arbeite ↓
          </span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        {/* ═══ akt 2 · das statement ═══ */}
        <div
          ref={manifestRef}
          className="reveal-root relative max-w-[960px] mx-auto text-center mt-10 md:mt-14"
        >
          {/* statement · word-by-word reveal, cinematisch staggered */}
          <h2 className="heading-display text-[clamp(2rem,6vw,5rem)] leading-[0.98]">
            <RevealLine words={["Eine", "Website"]} base={120} stagger={90} className="text-offwhite" />
            <RevealLine
              words={["ist", "kein", "Produkt."]}
              base={340}
              stagger={90}
              className="text-offwhite"
            />
            <span className="block text-offwhite/45 mt-3">
              <RevealWord text="es" delay={660} />{" "}
              <RevealWord text="ist" delay={730} />{" "}
              <RevealWord text="das" delay={800} />{" "}
              <span
                className="reveal-up relative inline-block"
                style={{ "--rd": "870ms" } as React.CSSProperties}
              >
                <span className="relative">erste Wort</span>
                <Scribble
                  variant="circle"
                  delay={0.9}
                  duration={1.6}
                  strokeWidth={1.2}
                  replayOnHover
                  className="absolute -inset-x-[6%] -inset-y-[30%] w-[112%] h-[160%] text-accent-ink/80 pointer-events-none"
                />
              </span>{" "}
              <RevealWord text="das" delay={1010} />{" "}
              <RevealWord text="deine" delay={1080} />{" "}
              <RevealWord text="Kunden" delay={1150} />
            </span>
            <RevealLine
              words={["von", "dir", "hören."]}
              base={1320}
              stagger={100}
              className="text-accent-ink"
            />
          </h2>


          <p
            className="reveal-up mt-14 mx-auto max-w-[580px] text-[14px] leading-relaxed text-offwhite/55"
            style={{ "--rd": "1040ms" } as React.CSSProperties}
          >
            Ich fang mit fragen an, nicht am bildschirm. Was dabei rauskommt,
            klingt nach dir · nicht nach template.
          </p>
        </div>
      </div>
    </section>
  );
}
