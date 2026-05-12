"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type ItemCopy = { alt: string; label: string; note: string };
type Item = ItemCopy & { src: string; rotate: number };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2italic: string;
  asideRight: string;
  items: ItemCopy[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "die werkstatt",
    h2pre: "kein studio, kein großraumbüro. ",
    h2italic: "ein tisch, ein mensch.",
    asideRight: "← so sieht's bei mir aus",
    items: [
      { alt: "kaffee", label: "morgens", note: "immer schwarz." },
      { alt: "skizze", label: "skizze", note: "erst auf papier." },
      { alt: "laptop", label: "code", note: "und dann pixelgenau." },
    ],
  },
  fr: {
    sectionLabel: "l'atelier",
    h2pre: "pas de studio, pas d'open-space. ",
    h2italic: "une table, une personne.",
    asideRight: "← voilà à quoi ça ressemble chez moi",
    items: [
      { alt: "café", label: "le matin", note: "toujours noir." },
      { alt: "esquisse", label: "esquisse", note: "d'abord sur papier." },
      { alt: "laptop", label: "code", note: "et après au pixel près." },
    ],
  },
  en: {
    sectionLabel: "the workshop",
    h2pre: "no studio, no open-plan office. ",
    h2italic: "one desk, one person.",
    asideRight: "← this is what it looks like over here",
    items: [
      { alt: "coffee", label: "mornings", note: "always black." },
      { alt: "sketch", label: "sketch", note: "paper first." },
      { alt: "laptop", label: "code", note: "and then pixel-precise." },
    ],
  },
};

const META: { src: string; rotate: number }[] = [
  { src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80&auto=format&fit=crop", rotate: -0.8 },
  { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format&fit=crop", rotate: 0.6 },
  { src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80&auto=format&fit=crop", rotate: -0.4 },
];

export function Werkstatt() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const items: Item[] = t.items.map((c, i) => ({ ...c, ...META[i] }));
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8">
          <div>
            <SectionLabel num="02½">{t.sectionLabel}</SectionLabel>
            <h2 className="mt-5 heading-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.05] text-offwhite max-w-[560px]">
              {t.h2pre}
              <span className="italic font-serif text-accent-ink">{t.h2italic}</span>
            </h2>
          </div>
          <p
            className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[300px] leading-snug shrink-0"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {t.asideRight}
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
