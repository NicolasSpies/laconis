"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * PreiseTeaser · 3 factor-cards mit 3D-mouse-tilt · klein-print preis-range.
 */

const LILA = "#b084d3";

type Factor = {
  title: string;
  desc: string;
};

type Dict = {
  sectionLabel: string;
  headlineL1: string;
  headlineL2: string;
  intro: string;
  factors: Factor[];
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "investment",
    headlineL1: "was kostet",
    headlineL2: "das eigentlich?",
    intro:
      "keine tabelle, keine fixen pakete. drei dinge bestimmen das budget — der rest klärt sich im gespräch.",
    factors: [
      {
        title: "umfang.",
        desc: "onepager oder zehn-seiten-site mit eigenem CMS. die größe entscheidet zuerst.",
      },
      {
        title: "inhalte.",
        desc: "texte und bilder selbst mitbringen — oder ich helf beim schreiben + foto-direction. das macht den größten unterschied.",
      },
      {
        title: "extras.",
        desc: "branding, print, foto-direction dazu? kommt obendrauf · spart koordination, sieht stimmiger aus.",
      },
    ],
    cta: "preise im detail →",
  },
  fr: {
    sectionLabel: "investissement",
    headlineL1: "ça coûte combien,",
    headlineL2: "en vrai ?",
    intro:
      "pas de tableau, pas de packages fixes. trois choses définissent le budget — le reste se règle dans l'échange.",
    factors: [
      {
        title: "étendue.",
        desc: "onepage ou site à dix pages avec CMS sur mesure. la taille fait la différence en premier.",
      },
      {
        title: "contenu.",
        desc: "tu apportes textes + images toi-même — ou je m'y mets avec toi pour l'écriture + direction photo. c'est ça qui pèse le plus.",
      },
      {
        title: "extras.",
        desc: "branding, print, direction photo en plus ? ça s'ajoute · gain de coordination, plus cohérent.",
      },
    ],
    cta: "voir les prix →",
  },
  en: {
    sectionLabel: "investment",
    headlineL1: "what does it",
    headlineL2: "actually cost?",
    intro:
      "no table, no fixed packages. three things set the budget — the rest is for the call.",
    factors: [
      {
        title: "scope.",
        desc: "onepager or a ten-page site with custom CMS. size sets the frame first.",
      },
      {
        title: "content.",
        desc: "you bring text + images yourself — or i help write + handle photo direction. this moves the budget most.",
      },
      {
        title: "extras.",
        desc: "branding, print, photo direction on top? adds up · saves coordination, looks more cohesive.",
      },
    ],
    cta: "see pricing →",
  },
};

function FactorCard({ f }: { f: Factor }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 18, stiffness: 160 });
  const smoothY = useSpring(mouseY, { damping: 18, stiffness: 160 });
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1400,
      }}
      className="relative bg-transparent border-2 border-[#0a0a0a]/15 rounded-2xl p-7 hover:border-[#b084d3]/60 transition-colors"
    >
      {/* lila dot top-right · einziges meta-element pro card */}
      <span
        aria-hidden
        className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full"
        style={{ background: LILA }}
      />
      <h3 className="text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[0.98] font-black tracking-[-0.02em] text-[#0a0a0a]">
        {f.title}
      </h3>
      <p className="mt-4 text-[14px] leading-relaxed text-[#0a0a0a]/80">
        {f.desc}
      </p>
    </motion.article>
  );
}

export function PreiseTeaser() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section
      className="py-24 md:py-32"
      aria-label={t.sectionLabel}
    >
      <div className="container-site">
        <SectionLabel>{t.sectionLabel}</SectionLabel>

        <div className="mt-8 flex items-end justify-between flex-wrap gap-6 mb-12">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] font-black tracking-[-0.03em] text-[#0a0a0a] max-w-[800px]">
            {t.headlineL1}
            <br />
            <span className="text-[#0a0a0a]/35">{t.headlineL2}</span>
          </h2>
          <p className="max-w-[420px] text-[14px] leading-relaxed text-[#0a0a0a]/80">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {t.factors.map((f) => (
            <FactorCard key={f.title} f={f} />
          ))}
        </div>

        <div className="mt-14 flex">
          <Link
            href={buildPath("preise", locale)}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-5 py-3 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
