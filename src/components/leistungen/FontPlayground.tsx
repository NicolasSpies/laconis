"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AccentSwitcher } from "@/components/accent/AccentSwitcher";

type FontDef = {
  key: string;
  label: string;
  css: string;
  /** "display" (big headings) or "body" (readable paragraphs) */
  kind: "display" | "body" | "both";
  /** hint shown below name */
  hint: string;
};

const FONTS: FontDef[] = [
  {
    key: "dm-sans",
    label: "dm sans",
    css: "var(--font-dm-sans), system-ui, sans-serif",
    kind: "both",
    hint: "klar • modern",
  },
  {
    key: "fraunces",
    label: "fraunces",
    css: "var(--font-fraunces), Georgia, serif",
    kind: "both",
    hint: "warm • editorial",
  },
  {
    key: "instrument",
    label: "instrument",
    css: "var(--font-instrument), Georgia, serif",
    kind: "display",
    hint: "elegant • italic",
  },
  {
    key: "syne",
    label: "syne",
    css: "var(--font-syne), system-ui, sans-serif",
    kind: "display",
    hint: "kantig • laut",
  },
  {
    key: "space-grotesk",
    label: "space grotesk",
    css: "var(--font-space-grotesk), system-ui, sans-serif",
    kind: "both",
    hint: "tech • ruhig",
  },
  {
    key: "dm-mono",
    label: "dm mono",
    css: "var(--font-dm-mono), ui-monospace, monospace",
    kind: "body",
    hint: "nerdig • lakonisch",
  },
  {
    key: "caveat",
    label: "caveat",
    css: "var(--font-caveat), cursive",
    kind: "display",
    hint: "hand • warm",
  },
];

const DISPLAY_FONTS = FONTS.filter((f) => f.kind !== "body");
const BODY_FONTS = FONTS.filter((f) => f.kind !== "display");

export function FontPlayground() {
  const [headingKey, setHeadingKey] = useState<string>("dm-sans");
  const [bodyKey, setBodyKey] = useState<string>("dm-sans");
  const [brand, setBrand] = useState<string>("atelier salbei");

  const heading = useMemo(
    () => FONTS.find((f) => f.key === headingKey) ?? FONTS[0],
    [headingKey],
  );
  const body = useMemo(
    () => FONTS.find((f) => f.key === bodyKey) ?? FONTS[0],
    [bodyKey],
  );

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
      {/* Live preview card */}
      <motion.div
        key={`${heading.key}-${body.key}`}
        initial={{ opacity: 0.85, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl border border-ink/10 bg-[#0e0e0e] p-8 md:p-12 overflow-hidden min-h-[420px]"
      >
        {/* subtle accent glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgb(var(--accent) / 0.1)" }}
        />

        <div className="relative">
          {/* small brand label */}
          <div
            className="font-mono text-[10px] uppercase tracking-label text-accent-ink mb-4"
          >
            mini-brand • preview
          </div>

          {/* brand name / logo moment */}
          <h3
            className="text-offwhite leading-[0.9] lowercase"
            style={{
              fontFamily: heading.css,
              fontWeight: heading.key === "syne" ? 800 : 900,
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {brand}
          </h3>

          {/* sub-claim */}
          <p
            className="mt-6 text-offwhite/75 max-w-[520px]"
            style={{
              fontFamily: body.css,
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.5,
            }}
          >
            handgemachte seifen aus der eifel. kein parfum. keine tricks. nur
            pflanzen, öl und zeit.
          </p>

          {/* meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-offwhite/35">
            <span
              className="text-[11px] uppercase tracking-label"
              style={{ fontFamily: body.css }}
            >
              malmedy • belgien
            </span>
            <span className="text-accent-ink">•</span>
            <span
              className="text-[11px] uppercase tracking-label"
              style={{ fontFamily: body.css }}
            >
              seit 2024
            </span>
            <span className="text-accent-ink">•</span>
            <span
              className="text-[11px] uppercase tracking-label"
              style={{ fontFamily: body.css }}
            >
              eigene rezeptur
            </span>
          </div>

          {/* editable brand name */}
          <div className="mt-10 flex items-center gap-3">
            <label
              htmlFor="brand-name"
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35"
            >
              marke
            </label>
            <input
              id="brand-name"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value.slice(0, 26))}
              placeholder="dein brand"
              className="flex-1 max-w-[260px] bg-transparent border-b border-ink/10 focus:border-lime/50 font-mono text-[11px] text-offwhite/75 outline-none px-1 py-1 transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="space-y-6">
        <FontPicker
          label="überschrift"
          fonts={DISPLAY_FONTS}
          selected={headingKey}
          onSelect={setHeadingKey}
        />
        <FontPicker
          label="fliesstext"
          fonts={BODY_FONTS}
          selected={bodyKey}
          onSelect={setBodyKey}
        />

        <div className="pt-2 border-t border-ink/10">
          <div className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-3">
            akzentfarbe
          </div>
          <AccentSwitcher label="" className="!border-ink/10" />
        </div>
      </div>
    </div>
  );
}

function FontPicker({
  label,
  fonts,
  selected,
  onSelect,
}: {
  label: string;
  fonts: FontDef[];
  selected: string;
  onSelect: (k: string) => void;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-3">
        {label}
      </div>
      <div className="space-y-1.5">
        {fonts.map((f) => {
          const active = f.key === selected;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onSelect(f.key)}
              className={
                "w-full flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 text-left border transition-all " +
                (active
                  ? "border-lime/50 bg-lime/[0.06] text-offwhite"
                  : "border-ink/10 bg-ink/[0.015] text-offwhite/55 hover:border-ink/25 hover:text-offwhite")
              }
            >
              <span
                className="text-[18px] lowercase"
                style={{ fontFamily: f.css, fontWeight: 600 }}
              >
                {f.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 shrink-0">
                {f.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
