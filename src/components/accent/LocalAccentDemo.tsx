"use client";

import { useState } from "react";

type Color = {
  key: string;
  label: string;
  rgb: string;
  hex: string;
};

const COLORS: Color[] = [
  { key: "lime", label: "Lime", rgb: "225 253 82", hex: "#E1FD52" },
  { key: "coral", label: "Coral", rgb: "255 122 89", hex: "#FF7A59" },
  { key: "sky", label: "Sky", rgb: "120 190 255", hex: "#78BEFF" },
  { key: "pink", label: "Pink", rgb: "244 154 194", hex: "#F49AC2" },
  { key: "peach", label: "Peach", rgb: "255 196 130", hex: "#FFC482" },
  { key: "slate", label: "Slate", rgb: "200 210 220", hex: "#C8D2DC" },
];

export function LocalAccentDemo() {
  const [sel, setSel] = useState<Color>(COLORS[0]);

  return (
    <div
      style={{ ["--accent" as string]: sel.rgb } as React.CSSProperties}
      className="grid md:grid-cols-[1fr_auto] gap-10 items-stretch"
    >
      {/* Preview */}
      <div className="relative rounded-xl border border-ink/10 bg-[#0a0a0a] overflow-hidden">
        {/* subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 grid-bg-faint opacity-60"
        />
        {/* soft orb */}
        <div
          aria-hidden
          className="absolute -top-24 -right-20 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `rgb(${sel.rgb} / 0.18)`,
          }}
        />

        <div className="relative p-8 md:p-10 min-h-[280px] flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            Vorschau · mit {sel.label}
          </span>
          <h4 className="heading-display mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] text-offwhite leading-[1.05]">
            Deine Marke.{" "}
            <span
              style={{ color: `rgb(${sel.rgb})` }}
            >
              Deine Handschrift.
            </span>
          </h4>
          <p className="mt-4 max-w-[440px] text-[13px] leading-relaxed text-offwhite/55">
            Die Akzentfarbe zieht sich durch Buttons, Zitate, Hover-Zustände und
            feine Akzente. Sparsam gesetzt, aber immer wiedererkennbar.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* primary button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-medium text-black transition-transform hover:-translate-y-[1px]"
              style={{ background: `rgb(${sel.rgb})` }}
            >
              Projekt starten
              <span>→</span>
            </button>
            {/* ghost button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-medium text-offwhite/80 border border-ink/15 hover:border-ink/30 transition-colors"
            >
              Mehr ansehen
            </button>

            {/* small accented chip */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] border"
              style={{
                color: `rgb(${sel.rgb})`,
                borderColor: `rgb(${sel.rgb} / 0.3)`,
                background: `rgb(${sel.rgb} / 0.06)`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: `rgb(${sel.rgb})` }}
              />
              Live · in deinem Look
            </span>
          </div>
        </div>
      </div>

      {/* Picker */}
      <div className="md:w-[200px] flex md:flex-col gap-2 md:gap-3">
        <span className="hidden md:block font-mono text-[10px] uppercase tracking-label text-offwhite/40">
          Wähle deine Farbe
        </span>
        <div className="flex md:flex-col gap-2 md:gap-3 flex-wrap">
          {COLORS.map((c) => {
            const active = c.key === sel.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setSel(c)}
                className="group flex items-center gap-3 px-3 py-2 rounded-md transition-colors border"
                style={{
                  borderColor: active
                    ? `rgb(${c.rgb} / 0.55)`
                    : "rgba(255,255,255,0.08)",
                  background: active
                    ? `rgb(${c.rgb} / 0.06)`
                    : "transparent",
                }}
              >
                <span
                  className="h-5 w-5 rounded-full border border-black/20 shrink-0"
                  style={{ background: c.hex }}
                />
                <span
                  className="hidden md:inline font-mono text-[11px]"
                  style={{
                    color: active ? `rgb(${c.rgb})` : "rgba(242,242,242,0.6)",
                  }}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
