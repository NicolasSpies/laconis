"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * DIE WERKSTATT · foto-break zwischen Leistungen und Preise.
 * vier scattered polaroids (kaffee, skizze, laptop, sticker) mit tape,
 * rotation und handschrift-labels die auf hover reinblenden. atmosphärischer
 * atemzug, gegen den sonst sehr text-lastigen flow. kein CTA, kein verkauf ·
 * nur ein blick in die werkstatt.
 */

type Item = {
  src: string;
  alt: string;
  label: string;
  note: string;
  rotate: number;
};

const items: Item[] = [
  {
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80&auto=format&fit=crop",
    alt: "kaffee",
    label: "morgens",
    note: "immer schwarz.",
    rotate: -0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format&fit=crop",
    alt: "skizze",
    label: "skizze",
    note: "erst auf papier.",
    rotate: 0.6,
  },
  {
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80&auto=format&fit=crop",
    alt: "laptop",
    label: "code",
    note: "und dann pixelgenau.",
    rotate: -0.4,
  },
];

export function Werkstatt() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8">
          <div>
            <SectionLabel num="02½">die werkstatt</SectionLabel>
            <h2 className="mt-5 heading-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.05] text-offwhite max-w-[560px]">
              kein studio, kein großraumbüro.{" "}
              <span className="italic font-serif text-accent-ink">ein tisch, ein mensch.</span>
            </h2>
          </div>
          <p
            className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[300px] leading-snug shrink-0"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            ← so sieht's bei mir aus
          </p>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative">
          {items.map((it, i) => (
            <Polaroid key={i} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Polaroid({ item, index }: { item: Item; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      initial={reduce ? { opacity: 0, rotate: item.rotate } : { opacity: 0, y: 24, rotate: item.rotate * 0.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
      whileHover={reduce ? undefined : {
        y: -6,
        rotate: item.rotate * 0.35,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      style={{ willChange: "transform" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-ink/10 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.4)]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 92vw"
          className="object-cover transition-[filter,transform] duration-500 group-hover:saturate-[1.1] group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.25)_100%)]"
        />
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between px-0.5">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/60">
          {item.label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30">
          0{index + 1}
        </span>
      </figcaption>

      <span
        className="mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-hand text-[16px] md:text-[18px] text-accent-ink"
        style={{ transform: "rotate(-1.2deg)" }}
      >
        {item.note}
      </span>
    </motion.figure>
  );
}
