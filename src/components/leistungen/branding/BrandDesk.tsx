"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * BrandDesk · taktiler "arbeitstisch" für /leistungen/branding.
 *
 * 5 papier-specimens (logo-skizze · type-spec · palette · visitenkarte
 * · moodboard-foto) liegen scattered + rotiert auf der canvas. jedes
 * stück ist draggable + click-to-front. ersetzt die statische show
 * mit echter interaktion.
 *
 * design-decision: keine spring-rückkehr · die elemente bleiben wo du
 * sie lässt (wie auf nem echten schreibtisch).
 */

type Dict = {
  sectionLabel: string;
  heading: string;
  intro: string;
  hint: string;
  logoLabel: string;
  logoSub: string;
  typeLabel: string;
  typeSubA: string;
  typeSubB: string;
  paletteLabel: string;
  paletteSub: string;
  bizLabel: string;
  moodLabel: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "arbeitstisch",
    heading: "fass die teile an.",
    intro: "jedes branding-projekt landet auf einem echten tisch · logo-skizze, type-spec, palette, visitenkarte, moodboard. zieh sie hier rum wie auf nem echten schreibtisch.",
    hint: "drag · klick · sie bleiben wo du sie hin tust ↗",
    logoLabel: "logo · wortmarke",
    logoSub: "v·02 · 2026",
    typeLabel: "type",
    typeSubA: "dm sans · bold",
    typeSubB: "instrument · italic",
    paletteLabel: "palette · 05",
    paletteSub: "forest · plum · brick · honey · lime",
    bizLabel: "studio · vela · lausanne",
    moodLabel: "moodboard · 04",
  },
  fr: {
    sectionLabel: "bureau",
    heading: "touche les éléments.",
    intro: "chaque projet branding finit sur une vraie table · esquisse logo, type-spec, palette, carte de visite, moodboard. déplace-les ici comme sur un vrai bureau.",
    hint: "drag · clic · ils restent où tu les laisses ↗",
    logoLabel: "logo · wordmark",
    logoSub: "v·02 · 2026",
    typeLabel: "type",
    typeSubA: "dm sans · bold",
    typeSubB: "instrument · italic",
    paletteLabel: "palette · 05",
    paletteSub: "forest · plum · brick · honey · lime",
    bizLabel: "studio · vela · lausanne",
    moodLabel: "moodboard · 04",
  },
  en: {
    sectionLabel: "desk",
    heading: "touch the pieces.",
    intro: "every brand project ends up on an actual table · logo sketch, type spec, palette, business card, moodboard. drag them around here like on a real desk.",
    hint: "drag · click · they stay where you leave them ↗",
    logoLabel: "logo · wordmark",
    logoSub: "v·02 · 2026",
    typeLabel: "type",
    typeSubA: "dm sans · bold",
    typeSubB: "instrument · italic",
    paletteLabel: "palette · 05",
    paletteSub: "forest · plum · brick · honey · lime",
    bizLabel: "studio · vela · lausanne",
    moodLabel: "moodboard · 04",
  },
};

type Piece = {
  id: string;
  z: number;
  left: string;
  top: string;
  rotate: number;
  width: number;
};

const INITIAL: Piece[] = [
  { id: "logo", z: 1, left: "6%", top: "8%", rotate: -5, width: 260 },
  { id: "type", z: 2, left: "55%", top: "4%", rotate: 3, width: 200 },
  { id: "palette", z: 3, left: "10%", top: "55%", rotate: -2, width: 220 },
  { id: "biz", z: 4, left: "60%", top: "52%", rotate: 4, width: 240 },
  { id: "photo", z: 5, left: "32%", top: "32%", rotate: -1, width: 220 },
];

export function BrandDesk({ num = "02" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const [pieces, setPieces] = useState<Piece[]>(INITIAL);
  const [topZ, setTopZ] = useState(10);

  function bringFront(id: string) {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setPieces((ps) => ps.map((p) => (p.id === id ? { ...p, z: newZ } : p)));
  }

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>

        <div className="mt-6 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div className="max-w-[460px]">
            <h2 className="heading-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] text-offwhite">
              {t.heading}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-offwhite/55">
              {t.intro}
            </p>
            <p className="mt-6 font-hand text-[18px] text-accent-ink rotate-[-1deg] inline-block">
              {t.hint}
            </p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden border border-ink/20"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, #1f1f1f 0%, #141414 70%, #0a0a0a 100%)",
              height: "clamp(540px, 60vh, 680px)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(225,253,82,0.04) 0%, transparent 50%)",
              }}
            />
            <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-label text-offwhite/35 z-50">
              arbeitstisch · drag
            </span>

            {pieces.map((p) => (
              <motion.div
                key={p.id}
                drag
                dragMomentum={false}
                onPointerDown={() => bringFront(p.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: p.rotate }}
                whileDrag={{ scale: 1.04, rotate: p.rotate * 0.4, cursor: "grabbing" }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  zIndex: p.z,
                  cursor: "grab",
                }}
              >
                {p.id === "logo" && <LogoCard t={t} />}
                {p.id === "type" && <TypeCard t={t} />}
                {p.id === "palette" && <PaletteCard t={t} />}
                {p.id === "biz" && <BizCard t={t} />}
                {p.id === "photo" && <PhotoCard t={t} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ t }: { t: Dict }) {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <span
        aria-hidden
        className="absolute -top-3 left-12 h-4 w-16 bg-offwhite/15 border border-ink/20 rounded-[2px] -rotate-6"
      />
      <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/45 mb-3">
        {t.logoLabel}
      </div>
      <div className="heading-display text-[32px] leading-none lowercase text-offwhite">
        studio·vela
      </div>
      <div className="mt-3 h-px w-2/3 bg-offwhite/20" />
      <div className="mt-1.5 font-mono text-[7px] uppercase tracking-label text-offwhite/45">
        {t.logoSub}
      </div>
    </div>
  );
}

function TypeCard({ t }: { t: Dict }) {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="font-mono text-[7px] uppercase tracking-label text-offwhite/45 mb-2">
        {t.typeLabel}
      </div>
      <div className="heading-display text-[48px] leading-none text-offwhite">Aa</div>
      <div className="mt-1.5 font-mono text-[7px] lowercase text-offwhite/55">{t.typeSubA}</div>
      <div
        className="mt-3 text-[24px] text-offwhite"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        Aa
      </div>
      <div className="mt-1 font-mono text-[7px] lowercase text-offwhite/55">{t.typeSubB}</div>
    </div>
  );
}

function PaletteCard({ t }: { t: Dict }) {
  const swatches = ["#2f5d3a", "#7a4bd1", "#d94f4f", "#e8c14b", "#e1fd52"];
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/45 mb-2">
        {t.paletteLabel}
      </div>
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <div
            key={i}
            className="w-8 h-12 rounded-[2px] border border-ink/15"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="mt-3 font-mono text-[7px] lowercase text-offwhite/55">{t.paletteSub}</div>
    </div>
  );
}

function BizCard({ t }: { t: Dict }) {
  return (
    <div className="relative rounded-[3px] bg-[#f4f1ea] border border-ink/15 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none aspect-[16/10]">
      <div className="flex flex-col h-full justify-between text-[#1a1a1a]">
        <div>
          <span
            className="text-[26px] leading-none"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            anna béguin
          </span>
          <div className="mt-1 font-mono text-[8px] uppercase tracking-label text-[#1a1a1a]/55">
            {t.bizLabel}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="font-mono text-[8px] text-[#1a1a1a]/65">
            +41 21 348 24 11
            <br />
            studio-vela.ch
          </div>
          <div
            className="w-6 h-6 rounded-full"
            style={{ background: "#2f5d3a" }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ t }: { t: Dict }) {
  return (
    <div className="relative rounded-[3px] bg-[rgba(255,255,255,0.045)] backdrop-blur-sm border border-ink/15 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none">
      <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="220px"
          className="object-cover grayscale contrast-[1.05]"
        />
      </div>
      <div className="mt-2 font-mono text-[7px] uppercase tracking-label text-offwhite/55 px-1">
        {t.moodLabel}
      </div>
    </div>
  );
}
