"use client";

import {
  PlaygroundProvider,
  usePlayground,
  FONT_MAP,
  THEMES,
  type Theme,
  type ColorMode,
} from "./PlaygroundContext";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BrandSimulator — interaktive vorschau für eine mögliche markengestaltung.
 * Kombiniert name + farbe(n) + stimmung und zeigt in einer durchgehenden szene:
 * wordmark, brand-guide, stationery (karte + brief) und social-posts.
 *
 * WICHTIG: das ist eine vorschau, kein fertiges design.
 */

const PRIMARY_PRESETS = [
  { hex: "#E1FD52", label: "lime" },
  { hex: "#FF4A1C", label: "karotte" },
  { hex: "#1E3A5F", label: "tinte" },
  { hex: "#E6A26A", label: "sauerteig" },
  { hex: "#7B2CBF", label: "violett" },
  { hex: "#10B981", label: "moos" },
];

const SECONDARY_PRESETS = [
  { hex: "#111111", label: "schwarz" },
  { hex: "#F5F0E6", label: "papier" },
  { hex: "#2E3440", label: "mitternacht" },
  { hex: "#C5412A", label: "paprika" },
  { hex: "#3A86FF", label: "himmel" },
  { hex: "#FFE9B0", label: "vanille" },
];

/* ══════════════════════════ helpers ══════════════════════════ */

function luminance(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return 0.5;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

function onColor(bg: string) {
  return luminance(bg) > 0.55 ? "#111" : "#FFF";
}

function hexToRgba(hex: string, alpha: number) {
  if (!hex.startsWith("#") || hex.length < 7) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ══════════════════════════ public wrapper ══════════════════════════ */

export function BrandSimulator() {
  return (
    <PlaygroundProvider>
      <BrandSimulatorInner />
    </PlaygroundProvider>
  );
}

/* ══════════════════════════ inner (uses context) ══════════════════════════ */

function BrandSimulatorInner() {
  const {
    name,
    setName,
    accent,
    setAccent,
    secondaryAccent,
    setSecondaryAccent,
    colorMode,
    setColorMode,
    moodId,
    setMoodId,
    mood,
  } = usePlayground();

  const displayName = name.trim().toLowerCase() || "dein name";
  const firstLetter = (name.trim().charAt(0) || "?").toLowerCase();
  const headlineFont = FONT_MAP[mood.headlineFont];
  const bodyFont = FONT_MAP[mood.bodyFont];
  const headlineStyle: "italic" | "normal" =
    mood.headlineFont === "instrument" ? "italic" : "normal";

  // briefpapier, wordmark + paper-post nehmen IMMER helle grundtöne aus
  // mood.neutrals, damit dunkle mood-atmosphären (retro/laut) nicht zum
  // unlesbaren bg werden. Die stimmung transportiert sich über formen +
  // typografie, nicht über den papier-ton.
  const lightPaperBg = mood.neutrals[0].hex;
  const lightInk = mood.neutrals[2].hex;
  const accentOnText = onColor(accent);

  return (
    <section className="pb-32">
      <div className="container-site">
        {/* HEADER */}
        <div className="max-w-[860px]">
          <SectionLabel num="04">brand-simulator</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            probier's aus.{" "}
            <span className="text-offwhite/35">
              name, farben, stimmung — sieh live, wie eine marke daraus werden
              könnte.
            </span>
          </h2>
          <p className="mt-6 max-w-[680px] text-[15px] leading-relaxed text-offwhite/60">
            spiel mit den reglern. unten passen sich wordmark, brand-guide,
            briefpapier, visitenkarte und social-posts sofort an. das gibt dir
            eine ehrliche erste idee, <em className="not-italic text-offwhite/80">wie</em> markenarbeit
            funktioniert: ein system, in dem alles miteinander redet.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-ink/25 bg-accent-ink/[0.06]">
            <span className="text-accent-ink text-[11px]">ⓘ</span>
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              das ist eine vorschau · kein fertiges design
            </span>
          </div>
        </div>

        {/* ═══════════ CONTROLS (sticky) ═══════════ */}
        <div className="mt-12 sticky top-4 z-30 rounded-2xl border border-ink/15 bg-black/70 backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_minmax(200px,auto)] gap-5 md:gap-6 items-end">
            {/* Name */}
            <div>
              <label
                htmlFor="sim-name"
                className="block font-mono text-[10px] uppercase tracking-label text-offwhite/45 mb-2"
              >
                dein markenname
              </label>
              <input
                id="sim-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 24))}
                placeholder="müller, lacønis, acme…"
                className="w-full h-11 bg-ink/[0.04] border border-ink/15 rounded-lg px-4 text-offwhite placeholder:text-offwhite/30 font-sans text-[15px] focus:outline-none focus:border-lime/60 focus:bg-ink/[0.08] transition-colors"
                maxLength={24}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* Color mode */}
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/45 mb-2">
                farbmodus
              </label>
              <div className="inline-flex rounded-full border border-ink/15 bg-ink/[0.04] p-1">
                <button
                  onClick={() => setColorMode("one")}
                  className={[
                    "px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-mono transition-all",
                    colorMode === "one"
                      ? "bg-lime text-[#111]"
                      : "text-offwhite/60 hover:text-offwhite",
                  ].join(" ")}
                  aria-pressed={colorMode === "one"}
                >
                  1 farbe
                </button>
                <button
                  onClick={() => setColorMode("two")}
                  className={[
                    "px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-mono transition-all",
                    colorMode === "two"
                      ? "bg-lime text-[#111]"
                      : "text-offwhite/60 hover:text-offwhite",
                  ].join(" ")}
                  aria-pressed={colorMode === "two"}
                >
                  2 farben
                </button>
              </div>
            </div>

            {/* Mood */}
            <div>
              <label
                htmlFor="sim-mood"
                className="block font-mono text-[10px] uppercase tracking-label text-offwhite/45 mb-2"
              >
                stimmung
              </label>
              <select
                id="sim-mood"
                value={moodId}
                onChange={(e) => setMoodId(e.target.value)}
                className="w-full h-11 bg-ink/[0.04] border border-ink/15 rounded-lg px-4 text-offwhite font-mono text-[11px] uppercase tracking-mono focus:outline-none focus:border-lime/60 transition-colors cursor-pointer"
              >
                {THEMES.map((t) => (
                  <option key={t.id} value={t.id} className="bg-dark">
                    {t.titel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color pickers */}
          <div
            className={[
              "mt-5 pt-5 border-t border-ink/10 grid gap-5 md:gap-8",
              colorMode === "two"
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1",
            ].join(" ")}
          >
            <ColorPickerRow
              label={colorMode === "two" ? "primärfarbe" : "akzentfarbe"}
              value={accent}
              onChange={setAccent}
              presets={PRIMARY_PRESETS}
            />
            {colorMode === "two" && (
              <ColorPickerRow
                label="sekundärfarbe"
                value={secondaryAccent}
                onChange={setSecondaryAccent}
                presets={SECONDARY_PRESETS}
              />
            )}
          </div>
        </div>

        {/* ═══════════ SIMULATION ═══════════ */}
        <div className="mt-8 space-y-4">
          {/* 01 WORDMARK */}
          <SimTile
            num="01"
            title="wordmark + monogramm"
            note="primärlogo · skalierbar"
          >
            <WordmarkRow
              moodId={moodId}
              name={displayName}
              firstLetter={firstLetter}
              headlineFont={headlineFont}
              headlineStyle={headlineStyle}
              accent={accent}
              secondaryAccent={secondaryAccent}
              colorMode={colorMode}
              accentOnText={accentOnText}
              paperBg={lightPaperBg}
              inkFg={lightInk}
            />
          </SimTile>

          {/* 02 BRAND GUIDE */}
          <SimTile
            num="02"
            title="brand-guide · kompakt"
            note="farben · typografie · stimme"
          >
            <BrandGuideRow
              mood={mood}
              accent={accent}
              secondaryAccent={secondaryAccent}
              colorMode={colorMode}
              headlineFont={headlineFont}
              bodyFont={bodyFont}
              headlineStyle={headlineStyle}
            />
          </SimTile>

          {/* 03 STATIONERY */}
          <SimTile
            num="03"
            title="stationery · karte + brief"
            note="85×55 mm · 210×148 mm"
          >
            <StationeryRow
              name={displayName}
              headlineFont={headlineFont}
              bodyFont={bodyFont}
              headlineStyle={headlineStyle}
              accent={accent}
              secondaryAccent={secondaryAccent}
              colorMode={colorMode}
              paperBg={lightPaperBg}
              inkFg={lightInk}
            />
          </SimTile>

          {/* 04 SOCIAL */}
          <SimTile
            num="04"
            title="social · profil + 3 posts"
            note="1:1 · 1080 × 1080"
          >
            <SocialRow
              moodId={moodId}
              name={displayName}
              firstLetter={firstLetter}
              headlineFont={headlineFont}
              bodyFont={bodyFont}
              headlineStyle={headlineStyle}
              accent={accent}
              secondaryAccent={secondaryAccent}
              colorMode={colorMode}
              lightPaperBg={lightPaperBg}
              lightInk={lightInk}
              accentOnText={accentOnText}
              tagline={mood.tagline}
              keywords={mood.keywords}
            />
          </SimTile>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-10 rounded-xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-6 md:p-8 max-w-[820px]">
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
            ⓘ was das hier ist — und was nicht
          </span>
          <p className="mt-3 text-[14px] leading-relaxed text-offwhite/65">
            eine{" "}
            <strong className="text-offwhite font-normal">
              spielerei zum fühlen
            </strong>
            , wie ein brand-system aufgebaut ist — nicht ein fertiges design,
            das du so übernehmen könntest. echte markenarbeit beginnt mit
            recherche (wer bist du, wer sind die anderen?), entwickelt
            <em className="not-italic text-offwhite/80"> zwei bis drei</em>{" "}
            echte richtungen, fährt korrekturen und verfeinert über wochen.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-offwhite/65">
            was du oben siehst, ist der rohling: name + farbe + stimmung
            auf vorlagen gelegt. in der echten arbeit entsteht das system für
            dich, nicht um dich herum.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════ sub-components ══════════════════════════ */

function ColorPickerRow({
  label,
  value,
  onChange,
  presets,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  presets: { hex: string; label: string }[];
}) {
  const isCustom = !presets.some(
    (p) => p.hex.toLowerCase() === value.toLowerCase()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
          {label}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-offwhite/60">
          {value.toLowerCase()}
          {isCustom && (
            <span className="ml-2 px-1.5 py-[1px] rounded-full bg-accent-ink/15 text-accent-ink text-[8.5px] uppercase tracking-mono">
              eigene
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {presets.map((c) => (
          <button
            key={c.hex}
            onClick={() => onChange(c.hex)}
            className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              background: c.hex,
              borderColor:
                value.toLowerCase() === c.hex.toLowerCase()
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.12)",
            }}
            title={c.label}
            aria-label={c.label}
          />
        ))}

        {/* divider dot */}
        <span
          aria-hidden
          className="mx-1 h-4 w-px bg-offwhite/15"
        />

        {isCustom ? (
          /* Custom color selected → visible swatch + remove X */
          <div className="relative inline-block">
            <label
              className="block w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110"
              style={{
                background: value,
                borderColor: "rgba(255,255,255,0.85)",
              }}
              title="eigene farbe ändern"
            >
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="eigene farbe ändern"
              />
            </label>
            <button
              type="button"
              onClick={() => onChange(presets[0].hex)}
              className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-dark border border-offwhite/40 flex items-center justify-center text-offwhite/80 hover:bg-offwhite hover:text-dark hover:border-offwhite transition-colors"
              aria-label="eigene farbe entfernen"
              title="eigene farbe entfernen"
            >
              <svg
                width="7"
                height="7"
                viewBox="0 0 8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M1 1L7 7M7 1L1 7" />
              </svg>
            </button>
          </div>
        ) : (
          /* No custom color yet → picker trigger with + and label */
          <label
            className="relative inline-flex items-center gap-1.5 h-8 pl-1 pr-3 rounded-full border-2 border-dashed border-offwhite/30 cursor-pointer text-offwhite/55 hover:border-accent-ink/60 hover:text-accent-ink transition-colors"
            title="eigene farbe wählen"
          >
            <span
              className="w-6 h-6 rounded-full border border-offwhite/20 flex items-center justify-center"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff4d4d, #ffbe0b, #a3ff4d, #4dffd1, #4d9bff, #b44dff, #ff4dce, #ff4d4d)",
              }}
            >
              <span className="w-3 h-3 rounded-full bg-dark/85 flex items-center justify-center text-offwhite text-[11px] leading-none font-semibold">
                +
              </span>
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-mono leading-none">
              eigene
            </span>
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="eigene farbe wählen"
            />
          </label>
        )}
      </div>
    </div>
  );
}

function SimTile({
  num,
  title,
  note,
  children,
}: {
  num: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent overflow-hidden">
      <div className="flex items-baseline justify-between gap-4 px-5 md:px-6 py-4 border-b border-ink/5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
            {num} · vorschau
          </span>
          <h3 className="heading-sans text-[16px] text-offwhite lowercase">
            {title}
          </h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30 text-right">
          {note}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ──── 01 · wordmark ──── */

function WordmarkRow({
  moodId,
  name,
  firstLetter,
  headlineFont,
  headlineStyle,
  accent,
  secondaryAccent,
  colorMode,
  accentOnText,
  paperBg,
  inkFg,
}: {
  moodId: string;
  name: string;
  firstLetter: string;
  headlineFont: string;
  headlineStyle: "italic" | "normal";
  accent: string;
  secondaryAccent: string;
  colorMode: ColorMode;
  accentOnText: string;
  paperBg: string;
  inkFg: string;
}) {
  const hasSecondary = colorMode === "two";
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      {/* Wordmark */}
      <div
        className="relative px-8 py-14 md:py-20 flex items-center justify-center min-h-[280px] overflow-hidden"
        style={{ background: paperBg, color: inkFg }}
      >
        <MoodDecoration moodId={moodId} accent={accent} inkFg={inkFg} />
        <div
          className="relative z-10 inline-flex items-baseline gap-2 lowercase leading-[0.9] tracking-[-0.04em]"
          style={{
            fontFamily: headlineFont,
            fontWeight: 800,
            fontStyle: headlineStyle,
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          <span>
            {name}
            <span style={{ color: accent }}>.</span>
          </span>
          {hasSecondary && (
            <span
              aria-hidden
              className="inline-block rounded-full self-center"
              style={{
                width: "0.35em",
                height: "0.35em",
                background: secondaryAccent,
              }}
            />
          )}
        </div>
      </div>
      {/* Monogram */}
      <div
        className="px-8 py-10 flex flex-col items-center justify-center md:border-l border-ink/5 min-h-[220px]"
        style={{
          background: hexToRgba(inkFg, 0.04),
        }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            background: accent,
            color: accentOnText,
            width: "clamp(7rem, 14vw, 9.5rem)",
            height: "clamp(7rem, 14vw, 9.5rem)",
            fontFamily: headlineFont,
            fontWeight: 800,
            fontSize: "clamp(3.75rem, 7.5vw, 5rem)",
            lineHeight: 1,
            fontStyle: headlineStyle,
            // sekundär-ring im 2-modus: dünner separator + ring in sekundärfarbe
            boxShadow: hasSecondary
              ? `0 0 0 4px ${hexToRgba(inkFg, 0.04)}, 0 0 0 8px ${secondaryAccent}`
              : "none",
          }}
        >
          {firstLetter}
        </div>
        <span className="mt-6 font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          monogramm · avatar
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════ mood decoration ══════════════════════════ */

/**
 * MoodDecoration — hintergrund-shapes, die die stimmung transportieren.
 * Position: absolute full-tile, pointer-events-none, low opacity damit das
 * wordmark dominiert. Jede stimmung hat ihren eigenen „fingerabdruck".
 */
function MoodDecoration({
  moodId,
  accent,
  inkFg,
}: {
  moodId: string;
  accent: string;
  inkFg: string;
}) {
  const ink = (a: number) => hexToRgba(inkFg, a);

  switch (moodId) {
    /* ══ warm · organic, hand, bread ══ */
    case "warm":
      return (
        <>
          {/* weicher ofen-schein top right */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 88% 18%, ${ink(
                0.14
              )} 0%, transparent 65%)`,
            }}
          />
          {/* körner-streifen unten */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-8 pointer-events-none opacity-30"
            style={{
              background: `repeating-linear-gradient(90deg, ${ink(
                0.32
              )} 0 2px, transparent 2px 16px)`,
            }}
          />
          {/* organischer blob oben links */}
          <svg
            aria-hidden
            className="absolute -top-8 -left-10 pointer-events-none opacity-25"
            width="180"
            height="140"
            viewBox="0 0 180 140"
          >
            <path
              d="M20 70 C 20 30, 60 10, 100 20 S 170 50, 160 95 S 80 140, 40 115 S 20 100, 20 70 Z"
              fill={ink(0.55)}
            />
          </svg>
        </>
      );

    /* ══ minimal · grid, CAD, precision ══ */
    case "minimal":
      return (
        <>
          {/* feines raster */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: `linear-gradient(to right, ${ink(
                0.05
              )} 1px, transparent 1px), linear-gradient(to bottom, ${ink(
                0.05
              )} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          {/* crosshair marks in den ecken */}
          {[
            { top: "14px", left: "14px" },
            { top: "14px", right: "14px" },
            { bottom: "14px", left: "14px" },
            { bottom: "14px", right: "14px" },
          ].map((pos, i) => (
            <svg
              key={i}
              aria-hidden
              className="absolute pointer-events-none"
              style={{ ...pos }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                d="M7 0v14M0 7h14"
                stroke={ink(0.4)}
                strokeWidth="0.8"
              />
            </svg>
          ))}
          {/* maßband-strich oben */}
          <div
            aria-hidden
            className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "120px",
              height: "1px",
              background: ink(0.35),
            }}
          />
        </>
      );

    /* ══ laut · stripes, bold, punk ══ */
    case "laut":
      return (
        <>
          {/* safety-stripe triangle top-right */}
          <div
            aria-hidden
            className="absolute top-0 right-0 pointer-events-none"
            style={{
              width: "55%",
              height: "35%",
              background: `repeating-linear-gradient(-45deg, ${ink(
                0.9
              )} 0 10px, ${accent} 10px 20px)`,
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              opacity: 0.85,
            }}
          />
          {/* rotierter asterisk bottom-left */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              bottom: "18px",
              left: "22px",
              color: accent,
              fontSize: "clamp(70px, 12vw, 110px)",
              lineHeight: 1,
              fontWeight: 900,
              transform: "rotate(-18deg)",
              textShadow: `2px 2px 0 ${ink(0.9)}`,
            }}
          >
            ✱
          </div>
          {/* confetti dots */}
          {[
            { top: "55%", left: "38%", size: "6px" },
            { top: "22%", left: "18%", size: "4px" },
            { top: "72%", left: "62%", size: "5px" },
          ].map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                top: d.top,
                left: d.left,
                width: d.size,
                height: d.size,
                background: ink(0.8),
              }}
            />
          ))}
        </>
      );

    /* ══ nordisch · fog, fine lines, quiet ══ */
    case "nordisch":
      return (
        <>
          {/* fjord-licht top right */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 65% 55% at 85% 12%, ${ink(
                0.18
              )} 0%, transparent 65%)`,
            }}
          />
          {/* ultra-feine horizontallinien */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: `repeating-linear-gradient(0deg, ${ink(
                0.05
              )} 0 1px, transparent 1px 12px)`,
            }}
          />
          {/* dünne mondscheibe */}
          <div
            aria-hidden
            className="absolute pointer-events-none rounded-full"
            style={{
              top: "28px",
              right: "38px",
              width: "46px",
              height: "46px",
              border: `1px solid ${ink(0.5)}`,
              opacity: 0.7,
            }}
          />
        </>
      );

    /* ══ retro · synthwave, sun, grid ══ */
    case "retro":
      return (
        <>
          {/* sunset-grid floor unten */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "55%",
              background: `repeating-linear-gradient(to top, ${ink(
                0.45
              )} 0 1px, transparent 1px 20px), repeating-linear-gradient(to right, ${ink(
                0.35
              )} 0 1px, transparent 1px 34px)`,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 85%)",
              transform: "perspective(420px) rotateX(50deg)",
              transformOrigin: "center bottom",
              opacity: 0.65,
            }}
          />
          {/* synth-sonne */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "18%",
              right: "10%",
              width: "clamp(100px, 18vw, 160px)",
              height: "clamp(100px, 18vw, 160px)",
              background: `radial-gradient(circle at 50% 50%, ${accent} 0%, ${accent} 55%, ${hexToRgba(
                accent,
                0.3
              )} 70%, transparent 78%)`,
              borderRadius: "50%",
              maskImage: `linear-gradient(to bottom, #000 0%, #000 56%, transparent 58%, transparent 62%, #000 64%, #000 70%, transparent 72%, transparent 77%, #000 79%, #000 85%, transparent 87%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(to bottom, #000 0%, #000 56%, transparent 58%, transparent 62%, #000 64%, #000 70%, transparent 72%, transparent 77%, #000 79%, #000 85%, transparent 87%, transparent 100%)`,
              opacity: 0.85,
            }}
          />
        </>
      );

    /* ══ botanisch · hills, leaves, organic ══ */
    case "botanisch":
      return (
        <>
          {/* wavy hill silhouette unten */}
          <svg
            aria-hidden
            className="absolute inset-x-0 bottom-0 w-full pointer-events-none opacity-45"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            height="90"
          >
            <path
              d="M0 55 C 60 25, 140 85, 220 50 S 360 25, 400 55 L400 80 L0 80 Z"
              fill={ink(0.3)}
            />
            <path
              d="M0 68 C 80 50, 180 90, 260 65 S 380 55, 400 72 L400 80 L0 80 Z"
              fill={ink(0.18)}
            />
          </svg>
          {/* sprout top right */}
          <svg
            aria-hidden
            className="absolute pointer-events-none opacity-60"
            style={{ top: "22px", right: "26px" }}
            width="56"
            height="64"
            viewBox="0 0 56 64"
            fill="none"
            stroke={ink(0.65)}
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M28 62 Q 28 38 28 8" />
            <path d="M28 36 Q 14 30 8 16 Q 22 22 28 36" fill={ink(0.15)} />
            <path d="M28 36 Q 42 30 48 16 Q 34 22 28 36" fill={ink(0.15)} />
          </svg>
          {/* feine punkte (pollen) */}
          {[
            { top: "35%", left: "12%" },
            { top: "48%", left: "82%" },
            { top: "25%", left: "48%" },
          ].map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute w-1 h-1 rounded-full pointer-events-none"
              style={{ ...d, background: ink(0.4) }}
            />
          ))}
        </>
      );

    default:
      return null;
  }
}

/* ──── 02 · brand guide ──── */

function BrandGuideRow({
  mood,
  accent,
  secondaryAccent,
  colorMode,
  headlineFont,
  bodyFont,
  headlineStyle,
}: {
  mood: Theme;
  accent: string;
  secondaryAccent: string;
  colorMode: ColorMode;
  headlineFont: string;
  bodyFont: string;
  headlineStyle: "italic" | "normal";
}) {
  // Farben: deine wahl + neutrale grundtöne (stimmungs-farben kollidieren sonst
  // mit der frei gewählten primär/sekundär — deswegen bleibt die palette hier neutral).
  const userColors =
    colorMode === "two"
      ? [
          { hex: accent, label: "primär" },
          { hex: secondaryAccent, label: "sekundär" },
        ]
      : [{ hex: accent, label: "akzent" }];

  const palette = [
    ...userColors,
    ...mood.neutrals.map((n) => ({ hex: n.hex, label: n.label })),
  ].slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      {/* Colors */}
      <div className="p-6 md:border-r border-ink/5">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          farben
        </span>
        <div className="mt-4 space-y-2">
          {palette.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded shrink-0 border border-ink/10"
                style={{ background: c.hex }}
              />
              <span className="font-mono text-[10px] text-offwhite/60 tabular-nums flex-1 truncate">
                {c.hex.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30">
                {c.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10.5px] leading-relaxed text-offwhite/35">
          deine farbe(n) + neutrale grundtöne. die stimmung bestimmt, welche
          neutrals dazu passen.
        </p>
      </div>

      {/* Typography */}
      <div className="p-6 md:border-r border-ink/5 flex flex-col gap-5">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          typografie
        </span>
        <div>
          <div
            className="text-offwhite leading-none"
            style={{
              fontFamily: headlineFont,
              fontStyle: headlineStyle,
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            }}
          >
            Aa
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            {mood.headlineFont} · display
          </div>
        </div>
        <div>
          <div
            className="text-offwhite/85"
            style={{
              fontFamily: bodyFont,
              fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)",
              lineHeight: 1.45,
            }}
          >
            the quick brown fox jumps over the lazy dog
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            {mood.bodyFont} · fließtext
          </div>
        </div>
      </div>

      {/* Voice */}
      <div className="p-6 md:border-r border-ink/5">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          stimme
        </span>
        <div
          className="mt-4 text-offwhite leading-tight"
          style={{
            fontFamily: headlineFont,
            fontStyle: headlineStyle,
            fontWeight: 700,
            fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
            letterSpacing: "-0.015em",
          }}
        >
          {mood.tagline}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {mood.keywords.slice(0, 4).map((k) => (
            <span
              key={k}
              className="font-mono text-[9px] uppercase tracking-mono px-2 py-1 rounded-full border border-ink/12 text-offwhite/65"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Formen & Texturen */}
      <div className="p-6">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          formen & textur
        </span>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {mood.textures.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className={[
                "rounded overflow-hidden border border-ink/10",
                i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square",
              ].join(" ")}
              style={{ background: t.style }}
              title={t.label}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {mood.textures.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="font-mono text-[8.5px] uppercase tracking-mono text-offwhite/40"
            >
              {t.label}
              {i < 2 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──── 03 · stationery ──── */

function StationeryRow({
  name,
  headlineFont,
  bodyFont,
  headlineStyle,
  accent,
  secondaryAccent,
  colorMode,
  paperBg,
  inkFg,
}: {
  name: string;
  headlineFont: string;
  bodyFont: string;
  headlineStyle: "italic" | "normal";
  accent: string;
  secondaryAccent: string;
  colorMode: ColorMode;
  paperBg: string;
  inkFg: string;
}) {
  const handle = name.replace(/\s+/g, "");
  const cardBg = colorMode === "two" ? secondaryAccent : "#111111";
  const cardFg = onColor(cardBg);
  const inkAlpha = (a: number) => hexToRgba(inkFg, a);

  return (
    <div
      className="relative p-6 md:p-10 flex items-center justify-center min-h-[380px] md:min-h-[460px]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.32) 0%, transparent 70%)",
      }}
    >
      {/* Briefpapier (behind) */}
      <div
        className="relative shadow-[0_30px_60px_-18px_rgba(0,0,0,0.65)]"
        style={{
          width: "100%",
          maxWidth: "560px",
          aspectRatio: "210 / 148",
          background: paperBg,
          color: inkFg,
          borderRadius: "3px",
          transform: "rotate(-1.5deg)",
        }}
      >
        {/* Accent stripe — primär (oben 60%) + sekundär (unten 40%) im 2-modus */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-[4px]"
          style={{
            background: accent,
            height: colorMode === "two" ? "60%" : "100%",
          }}
        />
        {colorMode === "two" && (
          <div
            aria-hidden
            className="absolute left-0 w-[4px]"
            style={{
              background: secondaryAccent,
              top: "60%",
              bottom: 0,
            }}
          />
        )}
        <div className="h-full w-full pl-9 pr-7 py-5 md:py-6 flex flex-col">
          {/* Header */}
          <div className="flex items-baseline justify-between">
            <div
              className="flex items-baseline gap-2 lowercase leading-none tracking-[-0.035em]"
              style={{
                fontFamily: headlineFont,
                fontWeight: 800,
                fontStyle: headlineStyle,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              }}
            >
              <span>
                {name}
                <span style={{ color: accent }}>.</span>
              </span>
              {colorMode === "two" && (
                <span
                  aria-hidden
                  className="inline-block rounded-full self-center"
                  style={{
                    width: "0.45em",
                    height: "0.45em",
                    background: secondaryAccent,
                  }}
                />
              )}
            </div>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: inkAlpha(0.55),
              }}
            >
              eupen · est. 2026
            </span>
          </div>

          <div
            className="mt-3 h-px"
            style={{ background: inkAlpha(0.12) }}
          />

          {/* Body */}
          <div className="mt-5 flex-1 flex flex-col gap-1.5">
            <div
              className="text-[11px]"
              style={{
                fontFamily: bodyFont,
                fontStyle: "italic",
                opacity: 0.85,
              }}
            >
              Liebe Frau Schmidt,
            </div>
            <div className="mt-1 flex flex-col gap-1.5">
              {[98, 94, 90, 78, 86, 62].map((w, i) => (
                <div
                  key={i}
                  className="h-[2px] rounded-full"
                  style={{ background: inkAlpha(0.2), width: `${w}%` }}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-4 pt-3 flex items-center justify-between"
            style={{ borderTop: `1px solid ${inkAlpha(0.12)}` }}
          >
            <span
              className="font-mono uppercase truncate"
              style={{
                fontSize: "7.5px",
                letterSpacing: "0.22em",
                color: inkAlpha(0.55),
              }}
            >
              hallo@{handle}.be · 0491 12 34 56
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "7.5px",
                letterSpacing: "0.22em",
                color: inkAlpha(0.55),
              }}
            >
              s. 1 / 1
            </span>
          </div>
        </div>
      </div>

      {/* Visitenkarte (front, overlap) */}
      <div
        className="absolute shadow-[0_22px_44px_-10px_rgba(0,0,0,0.7)]"
        style={{
          width: "min(240px, 44vw)",
          aspectRatio: "85 / 55",
          background: cardBg,
          color: cardFg,
          borderRadius: "3px",
          transform: "rotate(6deg)",
          bottom: "12%",
          right: "6%",
        }}
      >
        <div className="h-full w-full p-3.5 md:p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div
              className="lowercase leading-none tracking-[-0.04em]"
              style={{
                fontFamily: headlineFont,
                fontWeight: 800,
                fontStyle: headlineStyle,
                fontSize: "clamp(0.95rem, 2.1vw, 1.25rem)",
              }}
            >
              {name}
              <span style={{ color: accent }}>.</span>
            </div>
            <span
              className="shrink-0 h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
          </div>
          <div>
            <div
              className="leading-tight"
              style={{
                fontFamily: headlineFont,
                fontStyle: headlineStyle,
                fontWeight: 700,
                fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
              }}
            >
              pierre {name}
            </div>
            <div
              className="mt-0.5 font-mono uppercase"
              style={{
                fontSize: "7px",
                letterSpacing: "0.22em",
                opacity: 0.65,
              }}
            >
              inhaber · gründer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──── 04 · social ──── */

function SocialRow({
  moodId,
  name,
  firstLetter,
  headlineFont,
  bodyFont,
  headlineStyle,
  accent,
  secondaryAccent,
  colorMode,
  lightPaperBg,
  lightInk,
  accentOnText,
  tagline,
  keywords,
}: {
  moodId: string;
  name: string;
  firstLetter: string;
  headlineFont: string;
  bodyFont: string;
  headlineStyle: "italic" | "normal";
  accent: string;
  secondaryAccent: string;
  colorMode: ColorMode;
  /** light-paper bg & ink für den papier-post — nimmt mood.neutrals[0]/[2],
   *  damit dunkle mood-bgs (retro/laut) kein schwarzes papier geben. */
  lightPaperBg: string;
  lightInk: string;
  accentOnText: string;
  tagline: string;
  keywords: string[];
}) {
  // bodyFont wird aktuell im social-row nicht genutzt, aber als vertragspunkt
  // gelassen (falls später caption-style gewünscht ist).
  void bodyFont;
  const handle = name.replace(/\s+/g, "");
  const hasSecondary = colorMode === "two";
  const post3Bg = hasSecondary ? secondaryAccent : "#111111";
  const post3Fg = onColor(post3Bg);
  const post1Tint = accentOnText === "#111" ? "#111111" : "#FFFFFF";
  const lightInkAlpha = (a: number) => hexToRgba(lightInk, a);

  return (
    <div className="p-5 md:p-6">
      {/* Profile header (instagram-style) */}
      <div className="flex items-center justify-between mb-5 pb-5 border-b border-ink/8">
        <div className="flex items-center gap-3">
          {/* Avatar mit separator-ring + optionalem secondary-ring */}
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{
              background: accent,
              color: accentOnText,
              width: "52px",
              height: "52px",
              fontFamily: headlineFont,
              fontWeight: 800,
              fontSize: "28px",
              lineHeight: 1,
              fontStyle: headlineStyle,
              boxShadow: hasSecondary
                ? `0 0 0 2px #0A0A0A, 0 0 0 4px ${secondaryAccent}`
                : `0 0 0 2px #0A0A0A, 0 0 0 3px ${accent}`,
            }}
          >
            {firstLetter}
          </div>
          <div>
            <div className="font-sans text-[14px] text-offwhite flex items-center gap-1.5">
              @{handle}
              {hasSecondary && (
                <span
                  aria-hidden
                  className="rounded-full"
                  style={{
                    width: "7px",
                    height: "7px",
                    background: secondaryAccent,
                    boxShadow: `0 0 0 1.5px ${accent}`,
                  }}
                />
              )}
            </div>
            <div className="font-mono text-[9.5px] uppercase tracking-label text-offwhite/40">
              {keywords.slice(0, 2).join(" · ")}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-5 font-mono text-[10px] text-offwhite/45">
          <div className="text-center">
            <div className="text-offwhite text-[13px] font-sans tabular-nums">
              142
            </div>
            <div className="uppercase tracking-label text-[8.5px]">posts</div>
          </div>
          <div className="text-center">
            <div
              className="text-[13px] font-sans tabular-nums"
              style={{
                color: hasSecondary ? secondaryAccent : "inherit",
              }}
            >
              2.1k
            </div>
            <div className="uppercase tracking-label text-[8.5px]">follower</div>
          </div>
          <div className="text-center">
            <div className="text-offwhite text-[13px] font-sans tabular-nums">
              318
            </div>
            <div className="uppercase tracking-label text-[8.5px]">folgt</div>
          </div>
        </div>
      </div>

      {/* 3 posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* ═══ POST 1 · statement auf akzent-farbe ═══ */}
        <PostTile>
          <div
            className="relative aspect-square flex flex-col justify-between p-5 overflow-hidden"
            style={{ background: accent, color: accentOnText }}
          >
            <PostMoodLayer
              moodId={moodId}
              slot={1}
              accent={accent}
              secondary={secondaryAccent}
              hasSecondary={hasSecondary}
              tint={post1Tint}
            />
            <div
              className="relative z-10 flex-1 flex items-center"
              style={{
                fontFamily: headlineFont,
                fontStyle: headlineStyle,
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              {tagline}
            </div>
          </div>
        </PostTile>

        {/* ═══ POST 2 · handschrift-zitat auf papier ═══ */}
        <PostTile>
          <div
            className="relative aspect-square flex flex-col justify-between p-5 overflow-hidden"
            style={{ background: lightPaperBg, color: lightInk }}
          >
            <PostMoodLayer
              moodId={moodId}
              slot={2}
              accent={accent}
              secondary={secondaryAccent}
              hasSecondary={hasSecondary}
              tint={lightInk}
            />
            <div className="relative z-10" aria-hidden />
            <div
              className="relative z-10"
              style={{
                fontFamily: FONT_MAP.caveat,
                fontWeight: 500,
                fontSize: "clamp(1.2rem, 3.2vw, 1.7rem)",
                lineHeight: 1.2,
              }}
            >
              <span
                style={{ color: hasSecondary ? secondaryAccent : lightInk }}
              >
                {keywords[0] || "geerdet"}
              </span>
              ,{" "}
              <span style={{ color: accent }}>
                {keywords[1] || "ehrlich"}
              </span>
              , gemacht.
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: accent }}
              />
              {hasSecondary && (
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: secondaryAccent }}
                />
              )}
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  color: lightInkAlpha(0.55),
                }}
              >
                — {name}
              </span>
            </div>
          </div>
        </PostTile>

        {/* ═══ POST 3 · produkt / launch auf dunkel oder sekundär ═══ */}
        <PostTile>
          <div
            className="relative aspect-square flex flex-col justify-between p-5 overflow-hidden"
            style={{ background: post3Bg, color: post3Fg }}
          >
            <PostMoodLayer
              moodId={moodId}
              slot={3}
              accent={accent}
              secondary={secondaryAccent}
              hasSecondary={hasSecondary}
              tint={post3Fg}
            />
            <div className="relative z-10" aria-hidden />
            <div className="relative z-10">
              <div
                style={{
                  fontFamily: headlineFont,
                  fontStyle: headlineStyle,
                  fontWeight: 800,
                  fontSize: "clamp(1.45rem, 3.8vw, 2.1rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.025em",
                }}
              >
                {keywords[2] || "handgemacht"}
                <span style={{ color: accent }}>.</span>
              </div>
              <div
                className="mt-2 flex items-center gap-2"
                style={{ opacity: 0.75 }}
              >
                <span
                  aria-hidden
                  className="h-px flex-1"
                  style={{ background: hexToRgba(post3Fg, 0.4) }}
                />
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
                {hasSecondary && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: post3Fg,
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  opacity: 0.55,
                }}
              >
                ab morgen · limitiert
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
            </div>
          </div>
        </PostTile>
      </div>
    </div>
  );
}

/* ══════════════════════════ post mood layer ══════════════════════════ */

/**
 * PostMoodLayer — kompakte mood-shapes, getunt für die 200-300px social-posts.
 * Pro stimmung × slot (1 = akzent-bg, 2 = papier-bg, 3 = dunkel/sekundär-bg)
 * eine eigene variante. In 2-farben-modus wird sekundärfarbe als akzent-spot
 * zusätzlich mit eingesetzt.
 */
function PostMoodLayer({
  moodId,
  slot,
  accent,
  secondary,
  hasSecondary,
  tint,
}: {
  moodId: string;
  slot: 1 | 2 | 3;
  accent: string;
  secondary: string;
  hasSecondary: boolean;
  tint: string;
}) {
  const t = (a: number) => hexToRgba(tint, a);

  /* ══ warm ══ */
  if (moodId === "warm") {
    return (
      <>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${
              slot === 2 ? "22% 92%" : "85% 14%"
            }, ${t(0.18)} 0%, transparent 62%)`,
          }}
        />
        {/* weizen-streif unten */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-4 pointer-events-none opacity-35"
          style={{
            background: `repeating-linear-gradient(90deg, ${t(
              0.4
            )} 0 2px, transparent 2px 11px)`,
          }}
        />
        {/* organischer blob */}
        {slot !== 2 && (
          <svg
            aria-hidden
            className="absolute -top-5 -left-6 pointer-events-none opacity-30"
            width="90"
            height="70"
            viewBox="0 0 90 70"
          >
            <path
              d="M12 38 C 12 14, 38 5, 62 12 S 88 34, 80 52 S 35 70, 20 58 Z"
              fill={t(0.6)}
            />
          </svg>
        )}
        {hasSecondary && slot !== 3 && (
          <span
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: "12px",
              right: slot === 1 ? "52%" : "16px",
              width: "9px",
              height: "9px",
              background: secondary,
              boxShadow: `0 0 0 1.5px ${t(0.7)}`,
            }}
          />
        )}
      </>
    );
  }

  /* ══ minimal ══ */
  if (moodId === "minimal") {
    return (
      <>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-55"
          style={{
            backgroundImage: `linear-gradient(to right, ${t(
              0.07
            )} 1px, transparent 1px), linear-gradient(to bottom, ${t(
              0.07
            )} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        {/* crosshairs in gegenüberliegenden ecken */}
        {[
          { top: "10px", left: "10px" },
          { bottom: "10px", right: "10px" },
        ].map((pos, i) => (
          <svg
            key={i}
            aria-hidden
            className="absolute pointer-events-none"
            style={pos}
            width="10"
            height="10"
            viewBox="0 0 10 10"
          >
            <path d="M5 0v10M0 5h10" stroke={t(0.5)} strokeWidth="0.8" />
          </svg>
        ))}
        {/* maßband slot 2 */}
        {slot === 2 && (
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "54px",
              height: "1px",
              background: t(0.4),
            }}
          />
        )}
        {hasSecondary && (
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "12px",
              right: slot === 3 ? "14px" : "40%",
              width: "8px",
              height: "8px",
              background: secondary,
              border: `1px solid ${t(0.6)}`,
            }}
          />
        )}
      </>
    );
  }

  /* ══ laut ══ */
  if (moodId === "laut") {
    return (
      <>
        {/* safety-stripe corner */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: slot === 2 ? "42%" : "52%",
            height: slot === 2 ? "22%" : "30%",
            background: `repeating-linear-gradient(-45deg, ${t(
              0.85
            )} 0 7px, ${
              slot === 2 && hasSecondary ? secondary : accent
            } 7px 14px)`,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            opacity: slot === 2 ? 0.55 : 0.85,
          }}
        />
        {/* asterisk */}
        <span
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: slot === 3 ? "10px" : "12px",
            left: slot === 3 ? "14px" : "12px",
            color: slot === 1 ? t(0.85) : accent,
            fontSize: "clamp(30px, 9vw, 52px)",
            lineHeight: 1,
            fontWeight: 900,
            transform: "rotate(-14deg)",
            textShadow: slot === 3 ? `1px 1px 0 ${t(0.9)}` : "none",
          }}
        >
          ✱
        </span>
        {/* secondary big asterisk (2-mode, slot 3) */}
        {hasSecondary && slot === 3 && (
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "14px",
              left: "40%",
              color: secondary,
              fontSize: "20px",
              lineHeight: 1,
              fontWeight: 900,
              transform: "rotate(22deg)",
            }}
          >
            ✱
          </span>
        )}
        {/* confetti dots */}
        {[
          { y: 50, x: 42 },
          { y: 30, x: 24 },
          { y: 72, x: 70 },
        ].map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: `${d.y}%`,
              left: `${d.x}%`,
              width: "4px",
              height: "4px",
              background: i === 1 && hasSecondary ? secondary : t(0.75),
            }}
          />
        ))}
      </>
    );
  }

  /* ══ nordisch ══ */
  if (moodId === "nordisch") {
    return (
      <>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 82% 14%, ${t(
              0.22
            )} 0%, transparent 65%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background: `repeating-linear-gradient(0deg, ${t(
              0.06
            )} 0 1px, transparent 1px 9px)`,
          }}
        />
        {/* mondscheibe */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            top: slot === 3 ? "18px" : "20px",
            right: slot === 3 ? "50%" : "22px",
            width: "28px",
            height: "28px",
            border: `1px solid ${t(0.6)}`,
          }}
        />
        {hasSecondary && (
          <div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: slot === 2 ? "14px" : "18px",
              left: slot === 2 ? "16px" : "18px",
              width: "12px",
              height: "12px",
              background: secondary,
              opacity: 0.85,
            }}
          />
        )}
      </>
    );
  }

  /* ══ retro ══ */
  if (moodId === "retro") {
    const sunColor = hasSecondary && slot === 2 ? secondary : accent;
    return (
      <>
        {/* grid floor */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "52%",
            background: `repeating-linear-gradient(to top, ${t(
              0.5
            )} 0 1px, transparent 1px 11px), repeating-linear-gradient(to right, ${t(
              0.4
            )} 0 1px, transparent 1px 18px)`,
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 92%)",
            transform: "perspective(240px) rotateX(55deg)",
            transformOrigin: "center bottom",
            opacity: 0.65,
          }}
        />
        {/* sun with cuts */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "14%",
            right: "12%",
            width: slot === 2 ? "46px" : "62px",
            height: slot === 2 ? "46px" : "62px",
            background: `radial-gradient(circle, ${sunColor} 0%, ${sunColor} 55%, ${hexToRgba(
              sunColor,
              0.4
            )} 68%, transparent 78%)`,
            maskImage: `linear-gradient(to bottom, #000 0 55%, transparent 55% 60%, #000 60% 70%, transparent 70% 75%, #000 75% 84%, transparent 84%)`,
            WebkitMaskImage: `linear-gradient(to bottom, #000 0 55%, transparent 55% 60%, #000 60% 70%, transparent 70% 75%, #000 75% 84%, transparent 84%)`,
            opacity: 0.9,
          }}
        />
        {hasSecondary && slot === 1 && (
          <span
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: "12px",
              left: "14px",
              width: "10px",
              height: "10px",
              background: secondary,
            }}
          />
        )}
      </>
    );
  }

  /* ══ botanisch ══ */
  if (moodId === "botanisch") {
    return (
      <>
        {/* hills */}
        <svg
          aria-hidden
          className="absolute inset-x-0 bottom-0 w-full pointer-events-none opacity-50"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          height="55"
        >
          <path
            d="M0 55 C 60 25, 140 75, 220 50 S 360 28, 400 55 L400 80 L0 80 Z"
            fill={t(0.32)}
          />
          <path
            d="M0 65 C 80 50, 180 82, 260 65 S 380 55, 400 70 L400 80 L0 80 Z"
            fill={t(0.18)}
          />
        </svg>
        {/* sprout */}
        <svg
          aria-hidden
          className="absolute pointer-events-none opacity-60"
          style={{ top: "14px", right: slot === 3 ? "42%" : "16px" }}
          width="28"
          height="34"
          viewBox="0 0 28 34"
          fill="none"
          stroke={t(0.65)}
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M14 32 Q 14 20 14 4" />
          <path d="M14 20 Q 7 16 3 8 Q 11 12 14 20" fill={t(0.22)} />
          <path d="M14 20 Q 21 16 25 8 Q 17 12 14 20" fill={t(0.22)} />
        </svg>
        {/* pollen dots */}
        {[
          { y: 38, x: 18 },
          { y: 55, x: 82 },
          { y: 22, x: 58 },
        ].map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: `${d.y}%`,
              left: `${d.x}%`,
              width: "3px",
              height: "3px",
              background: t(0.4),
            }}
          />
        ))}
        {hasSecondary && (
          <span
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: "25%",
              left: slot === 2 ? "22%" : "18%",
              width: "12px",
              height: "12px",
              background: secondary,
              opacity: 0.9,
            }}
          />
        )}
      </>
    );
  }

  return null;
}

function PostTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-[0_14px_32px_-12px_rgba(0,0,0,0.55)]">
      {children}
    </div>
  );
}
