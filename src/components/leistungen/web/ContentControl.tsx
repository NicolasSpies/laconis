"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * ContentControl — USP-klotz direkt hinter dem hero.
 * CMS-editor links (titel, telefon, bild + farbpicker), live-frontend rechts.
 * besucher tippt links · sieht nach "speichern" rechts was er geändert hat.
 */

// ---- demo-daten ----
const DEFAULTS = {
  titel: "willkommen bei studio vela",
  telefon: "+32 470 12 34 56",
};

type FormValues = typeof DEFAULTS;
type FieldKey = keyof FormValues;

const FIELD_LABELS: Record<FieldKey, string> = {
  titel: "titel der startseite",
  telefon: "telefonnummer",
};

// farbpalette · alles dark-ui-tauglich
const COLORS: Array<{ id: string; hex: string; label: string }> = [
  { id: "slate", hex: "#2e2e2a", label: "schiefer" },
  { id: "ochre", hex: "#c8a967", label: "ocker" },
  { id: "rust", hex: "#c8794a", label: "terracotta" },
  { id: "dusk", hex: "#4a5a7a", label: "dämmer" },
  { id: "sage", hex: "#6b8a6b", label: "salbei" },
];

export function ContentControl({ num = "02" }: { num?: string } = {}) {
  const [values, setValues] = useState<FormValues>(DEFAULTS);
  const [saved, setSaved] = useState<FormValues>(DEFAULTS);
  const [bgColor, setBgColor] = useState(COLORS[0].hex);
  const [savedBg, setSavedBg] = useState(COLORS[0].hex);
  const [flash, setFlash] = useState(false);

  const fieldChanges = useMemo(
    () =>
      (Object.keys(values) as FieldKey[]).filter(
        (k) => values[k] !== saved[k],
      ),
    [values, saved],
  );

  const bgChanged = bgColor !== savedBg;
  const totalChanges = fieldChanges.length + (bgChanged ? 1 : 0);
  const justSaved = flash && totalChanges === 0;

  const handleSave = () => {
    if (totalChanges === 0) return;
    setSaved({ ...values });
    setSavedBg(bgColor);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1800);
  };

  const handleReset = () => {
    setValues({ ...saved });
    setBgColor(savedBg);
  };

  return (
    <section className="relative pb-32 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>der unterschied</SectionLabel>

        <h2 className="mt-4 heading-display text-[clamp(2.25rem,6vw,4rem)] text-offwhite leading-[1.02] max-w-[920px]">
          änderungen im nachhinein ·{" "}
          <span className="italic font-serif text-accent-ink">
            könntest du sogar selber machen.
          </span>
        </h2>

        <p className="mt-7 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/75">
          Ich bau die Seite launch-fertig. Ab Launch kriegt{" "}
          <span className="text-offwhite">jeder Kunde einen eigenen Login</span>{" "}
          · Onepager oder 20-Seiter, ohne Ausnahme. Tippfehler, Team-Foto,
          Telefonnummer · machst du selbst, wenn du willst.{" "}
          <span className="text-offwhite/55">Oder ruf mich an · auch okay.</span>
        </p>

        {/* 2-col demo · links: label+prompt oben, cms unten · rechts: frontend */}
        <div className="mt-14 md:mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* linke spalte · prompt + editor */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                kleine demo
              </span>
              <p className="mt-3 font-hand text-[22px] md:text-[26px] text-offwhite/85 -rotate-1 leading-[1.15]">
                tipp links ·{" "}
                <span className="text-accent-ink">siehst rechts</span>. bei dir
                genauso · direkt auf deiner seite.
              </p>
            </div>
            <MockCmsEditor
              values={values}
              setValues={setValues}
              saved={saved}
              bgColor={bgColor}
              setBgColor={setBgColor}
              bgChanged={bgChanged}
              totalChanges={totalChanges}
              justSaved={justSaved}
              onSave={handleSave}
              onReset={handleReset}
            />
          </div>

          {/* rechte spalte · frontend */}
          <div className="flex flex-col">
            <FrontendPreview
              titel={saved.titel}
              telefon={saved.telefon}
              bgColor={savedBg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- editor-panel ----

function MockCmsEditor(props: {
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  saved: FormValues;
  bgColor: string;
  setBgColor: (hex: string) => void;
  bgChanged: boolean;
  totalChanges: number;
  justSaved: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  const {
    values,
    setValues,
    saved,
    bgColor,
    setBgColor,
    bgChanged,
    totalChanges,
    justSaved,
    onSave,
    onReset,
  } = props;

  return (
    <div
      className="liquid-glass-dark rounded-xl overflow-hidden w-full"
      style={{ transform: "rotate(-0.5deg)" }}
    >
      {/* chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink/10">
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="ml-3 font-mono text-[10px] text-offwhite/45 truncate">
          cms.deine-website.be
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-label text-lime shrink-0">
          ● backend
        </span>
      </div>

      {/* body · 2-col (felder links, bild rechts) */}
      <div className="p-3.5 md:p-4 flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_112px] md:grid-cols-[1fr_128px] gap-3 md:gap-4">
          {/* links · felder */}
          <div className="flex flex-col gap-3 min-w-0">
            <EditorField
              label={FIELD_LABELS.titel}
              value={values.titel}
              onChange={(v) =>
                setValues((prev) => ({ ...prev, titel: v }))
              }
              previous={values.titel !== saved.titel ? saved.titel : null}
            />
            <EditorField
              label={FIELD_LABELS.telefon}
              value={values.telefon}
              onChange={(v) =>
                setValues((prev) => ({ ...prev, telefon: v }))
              }
              previous={
                values.telefon !== saved.telefon ? saved.telefon : null
              }
            />
          </div>

          {/* rechts · bild + farbpicker */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/45">
              bild · farbe
            </label>
            <div
              className="relative rounded-md overflow-hidden aspect-square border border-ink/10 transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <TeamSilhouetteSvg />
              {bgChanged && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-lime ring-2 ring-lime/25" />
              )}
            </div>
            <div className="flex items-center gap-1 flex-wrap pt-0.5">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setBgColor(c.hex)}
                  aria-label={c.label}
                  title={c.label}
                  className={[
                    "h-3.5 w-3.5 rounded-full border transition-all cursor-pointer",
                    bgColor === c.hex
                      ? "border-offwhite scale-110"
                      : "border-ink/25 hover:border-offwhite/50",
                  ].join(" ")}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* footer · status + actions */}
        <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-3 mt-0.5">
          <StatusPill
            state={
              justSaved ? "saved" : totalChanges > 0 ? "dirty" : "clean"
            }
            count={totalChanges}
          />
          <div className="flex items-center gap-3">
            {totalChanges > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="font-mono text-[9.5px] uppercase tracking-label text-offwhite/45 hover:text-offwhite/85 transition-colors"
              >
                zurücksetzen
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              disabled={totalChanges === 0}
              className={[
                "font-mono text-[10px] uppercase tracking-mono px-3 py-1.5 rounded transition-colors",
                totalChanges === 0
                  ? justSaved
                    ? "bg-lime/80 text-[#0a0a0a]"
                    : "bg-offwhite/[0.06] text-offwhite/35 cursor-not-allowed"
                  : "bg-lime text-[#0a0a0a] hover:bg-lime/90",
              ].join(" ")}
            >
              {justSaved ? "✓ gespeichert" : "speichern →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorField({
  label,
  value,
  onChange,
  previous,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  previous: string | null;
}) {
  const changed = previous !== null;
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <label className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/45">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className={[
          "bg-offwhite/[0.025] border rounded-md px-2.5 py-1.5 text-[13px] text-offwhite/90 min-w-0",
          "focus:outline-none focus:bg-offwhite/[0.05] transition-colors",
          changed
            ? "border-lime/45 focus:border-lime"
            : "border-ink/10 focus:border-accent-ink/50",
        ].join(" ")}
      />
      {changed && (
        <span className="font-mono text-[9px] text-offwhite/35 truncate pl-0.5">
          war: <span className="line-through">{previous}</span>
        </span>
      )}
    </div>
  );
}

function StatusPill({
  state,
  count,
}: {
  state: "clean" | "dirty" | "saved";
  count: number;
}) {
  if (state === "saved") {
    return (
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-lime">
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        live · sofort online
      </span>
    );
  }
  if (state === "dirty") {
    return (
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-offwhite/75">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
        </span>
        {count} änderung{count > 1 ? "en" : ""}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-offwhite/45">
      <span className="h-1.5 w-1.5 rounded-full bg-offwhite/20" />
      unverändert
    </span>
  );
}

// ---- frontend-preview-panel ----

function FrontendPreview({
  titel,
  telefon,
  bgColor,
}: {
  titel: string;
  telefon: string;
  bgColor: string;
}) {
  return (
    <div
      className="liquid-glass-dark rounded-xl overflow-hidden w-full"
      style={{ transform: "rotate(0.5deg)" }}
    >
      {/* chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink/10">
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="ml-3 font-mono text-[10px] text-offwhite/45 truncate">
          deine-website.be
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-label text-accent-ink shrink-0">
          frontend
        </span>
      </div>

      {/* site body */}
      <div className="p-4 md:p-5 flex flex-col gap-4 min-h-[260px]">
        {/* logo-zeile */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/75">
            studio vela
          </span>
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            kontakt · shop
          </span>
        </div>

        {/* hero · kommt aus titel */}
        <h4 className="heading-display text-[clamp(1.1rem,2.2vw,1.4rem)] text-offwhite leading-[1.15] break-words min-h-[2.5rem]">
          {titel}
        </h4>

        {/* farbiger image-block · reagiert auf picker */}
        <div
          className="rounded-md overflow-hidden aspect-[16/7] relative border border-ink/5 transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          <TeamSilhouetteSvg />
        </div>

        {/* footer · telefon */}
        <div className="flex items-center justify-between border-t border-ink/10 pt-3 mt-auto">
          <span className="font-mono text-[10px] text-offwhite/55">
            ☎ {telefon}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            © 2026
          </span>
        </div>
      </div>
    </div>
  );
}

// ---- shared svg ----

function TeamSilhouetteSvg() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full text-offwhite"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g opacity="0.35">
        <circle cx="110" cy="85" r="24" fill="currentColor" />
        <path
          d="M 78 200 Q 78 120, 110 120 Q 142 120, 142 200 Z"
          fill="currentColor"
        />
      </g>
      <g opacity="0.55">
        <circle cx="200" cy="70" r="28" fill="currentColor" />
        <path
          d="M 163 200 Q 163 108, 200 108 Q 237 108, 237 200 Z"
          fill="currentColor"
        />
      </g>
      <g opacity="0.4">
        <circle cx="290" cy="82" r="25" fill="currentColor" />
        <path
          d="M 258 200 Q 258 117, 290 117 Q 322 117, 322 200 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
