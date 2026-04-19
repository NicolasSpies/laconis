"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Kassenzettel } from "./Kassenzettel";
import {
  type BuilderState,
  type CmsBereich,
  type WebScope,
  type SeitenSprachen,
  type ContentHelp,
  type Deadline,
  DEFAULT_STATE,
  generateLineItems,
  computeTotals,
  closestPaket as getClosestPaket,
  hasAnySelection,
  stateToParams,
  paramsToState,
  generateBonNumber,
} from "@/lib/paket-pricing";

/**
 * PaketBuilder — interaktiver konfigurator für eigene pakete.
 * Links: entscheidungen als toggles + chips, eine sektion pro block.
 * Rechts: live-kassenzettel (sticky auf desktop) mit PDF-download & CTA.
 *
 * URL state: ?web=0/1 & scope=onepager|small|medium|large & lang=1|2|3 & ...
 * - URL wird live geupdatet (ohne re-render) via window.history.replaceState
 * - eingehende URL-params werden beim mount eingelesen (Suspense-wrapper für useSearchParams)
 */

export function PaketBuilder() {
  return (
    <Suspense fallback={<div className="h-[600px]" aria-hidden />}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const params = useSearchParams();

  /* ────────────── state + URL-einlesen einmalig ────────────── */
  const initial = useMemo(() => paramsToState(params), [params]);
  const [state, setState] = useState<BuilderState>(initial);
  const bonNumberRef = useRef(generateBonNumber());

  /* ────────────── URL live syncen (ohne rerender) ────────────── */
  useEffect(() => {
    const p = stateToParams(state);
    const qs = p.toString();
    const newUrl =
      window.location.pathname +
      (qs ? `?${qs}` : "") +
      window.location.hash;
    window.history.replaceState(null, "", newUrl);
  }, [state]);

  /* ────────────── berechnung (memo) ────────────── */
  const items = useMemo(() => generateLineItems(state), [state]);
  const totals = useMemo(() => computeTotals(items), [items]);
  const closest = useMemo(
    () => getClosestPaket(state, totals),
    [state, totals]
  );
  const any = hasAnySelection(state);

  /* ────────────── state-updater helper ────────────── */
  const update = <K extends keyof BuilderState>(
    key: K,
    value: BuilderState[K]
  ) => setState((s) => ({ ...s, [key]: value }));

  const toggleCms = (b: CmsBereich) => {
    setState((s) => {
      const has = s.cmsBereiche.includes(b);
      return {
        ...s,
        cmsBereiche: has
          ? s.cmsBereiche.filter((x) => x !== b)
          : [...s.cmsBereiche, b],
      };
    });
  };

  /* ────────────── aktionen ────────────── */
  const handleDownloadPdf = async () => {
    const { downloadBonPdf } = await import("@/lib/paket-pdf");
    downloadBonPdf({
      items,
      totals,
      bonNumber: bonNumberRef.current,
      closestPaket: closest,
    });
  };

  const kontaktHref = useMemo(() => {
    const p = stateToParams(state);
    p.set("custom", "1");
    return `/kontakt?${p.toString()}#projekt`;
  }, [state]);

  const handleReset = () => setState(DEFAULT_STATE);

  /* ══════════════════════════ render ══════════════════════════ */
  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
      {/* ─────────── LINKS · konfigurator ─────────── */}
      <div className="space-y-10 min-w-0">
        {/* ─── sektion: was brauchst du ─── */}
        <Block
          title="was brauchst du?"
          hint="web, grafik oder beides — einfach anschalten. was aus ist, kostet nix."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToggleCard
              active={state.web}
              onToggle={() => update("web", !state.web)}
              title="website"
              subtitle="eine seite oder ganzes universum — du entscheidest unten."
            />
            <ToggleCard
              active={state.grafikBrand}
              onToggle={() => update("grafikBrand", !state.grafikBrand)}
              title="brand identity"
              subtitle="logo, farben, schrift — das basis-set für alles."
            />
            <ToggleCard
              active={state.grafikPrint}
              onToggle={() => update("grafikPrint", !state.grafikPrint)}
              title="print & grafik"
              subtitle="flyer, visitenkarten, menüs, schilder — was du in der hand brauchst."
            />
            <ToggleCard
              active={state.grafikSocial}
              onToggle={() => update("grafikSocial", !state.grafikSocial)}
              title="social templates"
              subtitle="instagram-posts & stories als vorlagen zum selbstbefüllen."
            />
          </div>
        </Block>

        {/* ─── sektion: web-details (nur wenn web aktiv) ─── */}
        {state.web && (
          <Block
            title="wie gross wird die website?"
            hint="grobe einordnung reicht — wir feilen später am exakten umfang."
          >
            {/* seiten-scope */}
            <Field label="umfang">
              <ChipRow
                value={state.webScope}
                options={WEB_SCOPE_OPTIONS}
                onChange={(v) => update("webScope", v as WebScope)}
              />
            </Field>

            {/* sprachen */}
            <Field label="sprachen" hint="mehrsprachig? fügt inhalt + pflege dazu.">
              <ChipRow
                value={String(state.sprachen)}
                options={[
                  { v: "1", label: "nur eine" },
                  { v: "2", label: "zwei" },
                  { v: "3", label: "drei oder mehr" },
                ]}
                onChange={(v) =>
                  update("sprachen", Number(v) as SeitenSprachen)
                }
              />
            </Field>

            {/* cms-bereiche (multi) */}
            <Field
              label="selbst pflegbare bereiche"
              hint="alles hier kannst du später allein aktualisieren — kein anruf bei mir nötig."
            >
              <div className="flex flex-wrap gap-2">
                {CMS_OPTIONS.map((opt) => (
                  <MultiChip
                    key={opt.v}
                    active={state.cmsBereiche.includes(opt.v as CmsBereich)}
                    label={opt.label}
                    onClick={() => toggleCms(opt.v as CmsBereich)}
                  />
                ))}
              </div>
            </Field>

            {/* shop */}
            <Field
              label="shop oder terminbuchung?"
              hint="wenn hier ja: wird aus der website eine kleine software."
            >
              <ChipRow
                value={state.shop ? "1" : "0"}
                options={[
                  { v: "0", label: "nein" },
                  { v: "1", label: "ja, brauch ich" },
                ]}
                onChange={(v) => update("shop", v === "1")}
              />
            </Field>
          </Block>
        )}

        {/* ─── sektion: content & deadline ─── */}
        <Block
          title="inhalte & timing"
          hint="beeinflusst zeit — und damit preis."
        >
          <Field
            label="hast du texte & bilder schon?"
            hint="wenn ja: schneller fertig. wenn nein: ich helfe."
          >
            <ChipRow
              value={state.content}
              options={[
                { v: "selbst", label: "kommt von mir selbst" },
                { v: "mit-hilfe", label: "mit deiner hilfe" },
                { v: "komplett", label: "mach du alles bitte" },
              ]}
              onChange={(v) => update("content", v as ContentHelp)}
            />
          </Field>

          <Field
            label="wie eilig ist es?"
            hint="eil-aufschlag nur bei 'next week' — normale projekte ohne extra."
          >
            <ChipRow
              value={state.deadline}
              options={[
                { v: "flex", label: "zeit ist egal" },
                { v: "normal", label: "normal (4–8 wochen)" },
                { v: "dringend", label: "dringend (+20%)" },
              ]}
              onChange={(v) => update("deadline", v as Deadline)}
            />
          </Field>
        </Block>

        {/* ─── sektion: hosting (nur wenn web aktiv) ─── */}
        {state.web && (
          <Block
            title="hosting & addons"
            hint="läuft monatlich — damit dein projekt 24/7 erreichbar bleibt."
          >
            <Field label="domain">
              <ChipRow
                value={state.hasDomain ? "1" : "0"}
                options={[
                  { v: "0", label: "hab ich schon" },
                  { v: "1", label: "bitte mitregistrieren (+ 2 €/Mt)" },
                ]}
                onChange={(v) => update("hasDomain", v === "1")}
              />
            </Field>

            <Field
              label="mail-postfächer"
              hint="z.b. hallo@deinefirma.be — je adresse 5 €/Mt."
            >
              <Counter
                value={state.mails}
                onChange={(v) => update("mails", v)}
                min={0}
                max={10}
              />
            </Field>
          </Block>
        )}

        {/* reset */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-offwhite/70 transition-colors"
          >
            alles zurücksetzen
          </button>
        </div>
      </div>

      {/* ─────────── RECHTS · kassenzettel (sticky) ─────────── */}
      <div className="lg:sticky lg:top-28">
        <SectionLabel>dein bon · live</SectionLabel>

        <div className="mt-4">
          <Kassenzettel
            items={items}
            totals={totals}
            bonNumber={bonNumberRef.current}
            closestPaket={closest}
            empty={!any}
          />
        </div>

        {/* actions */}
        <div className="mt-5 flex flex-col gap-3">
          <Button
            href={any ? kontaktHref : "#"}
            variant="primary"
            size="lg"
            className={!any ? "opacity-40 pointer-events-none" : ""}
          >
            so anfragen →
          </Button>
          <Button
            onClick={handleDownloadPdf}
            variant="glass"
            size="md"
            disabled={!any}
          >
            ↓ bon als pdf
          </Button>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-offwhite/40">
          richtpreis — kein verbindliches angebot. ich antworte innerhalb
          24 std mit der finalen zahl (werktags).
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════ UI sub-components ══════════════════════════ */

function Block({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="heading-sans text-[20px] md:text-[22px] text-offwhite">
        {title}
      </h3>
      {hint && (
        <p className="mt-2 text-[13px] leading-relaxed text-offwhite/50 max-w-[560px]">
          {hint}
        </p>
      )}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5">
        <div className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
          {label}
        </div>
        {hint && (
          <div className="mt-1 text-[12px] leading-relaxed text-offwhite/40">
            {hint}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function ToggleCard({
  active,
  onToggle,
  title,
  subtitle,
}: {
  active: boolean;
  onToggle: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "group text-left rounded-xl p-5 border transition-all",
        active
          ? "border-lime/40 bg-gradient-to-br from-lime/[0.06] to-transparent"
          : "border-ink/10 bg-ink/[0.015] hover:border-ink/25",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            "heading-sans text-[16px]",
            active ? "text-offwhite" : "text-offwhite/80",
          ].join(" ")}
        >
          {title}
        </span>
        <ToggleDot active={active} />
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-offwhite/50">
        {subtitle}
      </p>
    </button>
  );
}

function ToggleDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "relative inline-block w-9 h-5 rounded-full transition-colors shrink-0",
        active ? "bg-lime/60" : "bg-ink/15",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 h-4 w-4 rounded-full transition-all",
          active ? "left-[18px] bg-[#111]" : "left-0.5 bg-offwhite/80",
        ].join(" ")}
      />
    </span>
  );
}

type ChipOption = { v: string; label: string };

function ChipRow({
  value,
  options,
  onChange,
}: {
  value: string;
  options: ChipOption[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={[
              "font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all",
              active
                ? "border-lime/40 bg-lime/10 text-accent-ink"
                : "border-ink/10 text-offwhite/55 hover:border-ink/25 hover:text-offwhite/85",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function MultiChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all inline-flex items-center gap-1.5",
        active
          ? "border-lime/40 bg-lime/10 text-accent-ink"
          : "border-ink/10 text-offwhite/55 hover:border-ink/25 hover:text-offwhite/85",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "inline-block w-1.5 h-1.5 rounded-full",
          active ? "bg-accent-ink" : "bg-offwhite/25",
        ].join(" ")}
      />
      {label}
    </button>
  );
}

function Counter({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full border border-ink/15 text-offwhite/70 hover:border-ink/35 hover:text-offwhite disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[13px] transition-colors"
        aria-label="weniger"
      >
        −
      </button>
      <span className="min-w-[48px] text-center font-mono text-[14px] text-offwhite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full border border-ink/15 text-offwhite/70 hover:border-ink/35 hover:text-offwhite disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[13px] transition-colors"
        aria-label="mehr"
      >
        +
      </button>
    </div>
  );
}

/* ══════════════════════════ options ══════════════════════════ */

const WEB_SCOPE_OPTIONS: ChipOption[] = [
  { v: "onepager", label: "onepager (1 seite)" },
  { v: "small", label: "klein (bis 5)" },
  { v: "medium", label: "mittel (bis 10)" },
  { v: "large", label: "gross (10+)" },
];

const CMS_OPTIONS: ChipOption[] = [
  { v: "blog", label: "blog / news" },
  { v: "team", label: "team-seiten" },
  { v: "projekte", label: "projekte / portfolio" },
  { v: "termine", label: "termine / events" },
  { v: "katalog", label: "katalog" },
];
