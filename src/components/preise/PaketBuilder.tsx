"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Kassenzettel } from "./Kassenzettel";
import { track } from "@/lib/analytics";
import {
  type BuilderState,
  type ContentHelp,
  type Deadline,
  type PresetId,
  DEFAULT_STATE,
  PRESETS,
  applyPreset,
  matchingPreset,
  generateLineItems,
  generateInquiryItems,
  computeTotals,
  closestPaket as getClosestPaket,
  hasAnySelection,
  stateToParams,
  paramsToState,
  generateBonNumber,
  formatEUR,
} from "@/lib/paket-pricing";

/**
 * PaketBuilder — interaktiver konfigurator für eigene pakete.
 * Granulare UX über counter + toggles für: web, branding, grafik-items, autobeschriftung.
 * Presets als schnellstart (basis · standard · pro) für web.
 *
 * URL state: ?web=0/1 & u=N & cms=N & lang=N & shop=1 & br=1 & gr=1 & f1=N … & domain=1 & …
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

  // Hydration-safe: bon-nummer erst nach mount setzen (generateBonNumber
  // nutzt Math.random → server + client würden sonst divergieren)
  const [bonNumber, setBonNumber] = useState<string>("");
  useEffect(() => {
    setBonNumber(generateBonNumber());
  }, []);

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
  const inquiryItems = useMemo(() => generateInquiryItems(state), [state]);
  const totals = useMemo(() => computeTotals(items), [items]);
  const closest = useMemo(
    () => getClosestPaket(state, totals),
    [state, totals]
  );
  const activePreset = useMemo(() => matchingPreset(state), [state]);
  const any = hasAnySelection(state);

  /* ────────────── state-updater helper ────────────── */
  const update = <K extends keyof BuilderState>(
    key: K,
    value: BuilderState[K]
  ) => setState((s) => ({ ...s, [key]: value }));

  const pickPreset = (id: PresetId) => setState((s) => applyPreset(s, id));

  /* ────────────── aktionen ────────────── */
  const handleDownloadPdf = async () => {
    const { downloadBonPdf } = await import("@/lib/paket-pdf");
    downloadBonPdf({
      items,
      inquiryItems,
      totals,
      bonNumber,
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
          hint="Web, Branding, Grafik oder Autobeschriftung · einfach anschalten. Was aus ist, kostet nix."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToggleCard
              active={state.web}
              onToggle={() => update("web", !state.web)}
              title="website"
              subtitle="Onepager, Multipager oder mehrsprachig · du baust unten zusammen."
            />
            <ToggleCard
              active={state.branding}
              onToggle={() => update("branding", !state.branding)}
              title="branding-paket"
              subtitle="Logo, Brand Guide, VK, Briefpapier, 3 Social Templates · 1.200 €."
            />
            <ToggleCard
              active={state.grafik}
              onToggle={() => update("grafik", !state.grafik)}
              title="grafik & drucksachen"
              subtitle="Präsentation, Social, Signatur bepreist · Flyer, Plakat, Visitenkarte usw. als Anfrage."
            />
            <ToggleCard
              active={state.autoWrap}
              onToggle={() => update("autoWrap", !state.autoWrap)}
              title="autobeschriftung"
              subtitle="L+R-Gestaltung, Zusatz V+H, Montage auf Anfrage."
            />
          </div>
        </Block>

        {/* ─── sektion: web-details (nur wenn web aktiv) ─── */}
        {state.web && (
          <Block
            title="wie gross wird die website?"
            hint="Preset als Schnellstart · oder granular +/− bauen. Jede Zeile skaliert den Preis live."
          >
            {/* PRESET-ROW */}
            <Field label="schnellstart" hint="Nimmt dir die Entscheidung ab · du kannst danach trotzdem feinjustieren.">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PRESETS) as PresetId[]).map((id) => {
                  const active = activePreset === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => pickPreset(id)}
                      className={[
                        "font-mono text-[11px] uppercase tracking-mono px-4 py-2 rounded-full border transition-all",
                        active
                          ? "border-lime/50 bg-lime/25 text-accent-ink"
                          : "border-ink/10 text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
                      ].join(" ")}
                    >
                      {id}
                    </button>
                  );
                })}
              </div>
            </Field>

            <PriceRow
              label="basis · startseite inkl. design, entwicklung, launch"
              amount={1400}
              fixed
            />

            <CounterField
              label="unterseiten"
              hint="Je 300 € · Über/Unter, Leistungen, Kontakt, … (Startseite zählt nicht)"
              value={state.unterseiten}
              min={0}
              max={30}
              unitPrice={300}
              onChange={(v) => update("unterseiten", v)}
            />

            <CounterField
              label="cms-bereiche · selbst pflegbar"
              hint="Je 500 € · z.B. Blog, Team, Projekte, Termine, Katalog"
              value={state.cms}
              min={0}
              max={10}
              unitPrice={500}
              onChange={(v) => update("cms", v)}
            />

            <div>
              <CounterField
                label="sprachen insgesamt"
                hint={
                  state.sprachen > 1
                    ? `Zusatzsprachen skalieren mit Seiten · ${1 + state.unterseiten} × ${state.sprachen - 1} × 50 €`
                    : "50 € pro Seite · pro Zusatzsprache (skaliert mit Seitenzahl)"
                }
                value={state.sprachen}
                min={1}
                max={5}
                onChange={(v) => update("sprachen", v)}
              />
            </div>

            <Field
              label="shop oder terminbuchung?"
              hint="Wenn hier ja: wird aus der Website eine kleine Software."
            >
              <ChipRow
                value={state.shop ? "1" : "0"}
                options={[
                  { v: "0", label: "nein" },
                  { v: "1", label: "ja · +1.800 €" },
                ]}
                onChange={(v) => update("shop", v === "1")}
              />
            </Field>
          </Block>
        )}

        {/* ─── sektion: branding-details ─── */}
        {state.branding && (
          <Block
            title="branding-paket"
            hint="Pauschalpreis · alles, was du für einen einheitlichen Auftritt brauchst."
          >
            <PriceRow
              label="branding-paket · logo, brand guide, vk, briefpapier, 3 social-templates"
              hint="Komplettpaket · einheitliche Basis für alles Weitere"
              amount={1200}
              fixed
            />
          </Block>
        )}

        {/* ─── sektion: grafik-details ─── */}
        {state.grafik && (
          <Block
            title="grafik · was brauchst du?"
            hint="Digitale Gestaltung rechne ich direkt ab · Drucksachen laufen über meine Partner, Preis nach Gespräch."
          >
            {/* digitale items · bepreist */}
            <CounterField
              label="präsentation · slides"
              hint="Je 75 €/Slide"
              value={state.praes}
              min={0}
              max={120}
              unitPrice={75}
              onChange={(v) => update("praes", v)}
            />
            <CounterField
              label="social media visual"
              hint="Je 75 €/Stück"
              value={state.social}
              min={0}
              max={60}
              unitPrice={75}
              onChange={(v) => update("social", v)}
            />
            <CounterField
              label="e-mail-signatur"
              hint="75 € erste · +25 € pro weitere."
              value={state.signatur}
              min={0}
              max={30}
              onChange={(v) => update("signatur", v)}
            />

            {/* drucksachen · anfrage-toggle (ohne preis) */}
            <InquiryGroup
              title="drucksachen · interesse"
              hint="Gestaltung mach ich · Druck & Produktion über Partner. Preis kommt im Angebot — hier nur anhaken."
              items={[
                { key: "flyer1", label: "Flyer · einseitig" },
                { key: "flyer2", label: "Flyer · beidseitig" },
                { key: "plakat", label: "Plakat" },
                { key: "rollup", label: "Rollup" },
                { key: "broschuere", label: "Broschüre" },
                { key: "vk", label: "Visitenkarte" },
              ]}
              state={state}
              onToggle={(key, on) => update(key, on ? 1 : 0)}
            />
          </Block>
        )}

        {/* ─── sektion: autobeschriftung ─── */}
        {state.autoWrap && (
          <Block
            title="autobeschriftung"
            hint="Gestaltung rechne ich pro Auto · Plot, Druck & Montage laufen über meinen Partner."
          >
            <CounterField
              label="gestaltung L+R"
              hint="Je 150 €/Auto · beide Seitenflächen"
              value={state.autoLR}
              min={0}
              max={30}
              unitPrice={150}
              onChange={(v) => update("autoLR", v)}
            />
            <CounterField
              label="zusätzlich V+H"
              hint="+75 €/Auto · vorne und hinten als Addon"
              value={state.autoVH}
              min={0}
              max={30}
              unitPrice={75}
              onChange={(v) => update("autoVH", v)}
            />
            <CounterField
              label="montage"
              hint="Folierung vor Ort · läuft über meinen Partner. Preis nach Aufwand im Angebot."
              value={state.montage}
              min={0}
              max={30}
              onChange={(v) => update("montage", v)}
            />
          </Block>
        )}

        {/* ─── sektion: content & deadline ─── */}
        <Block
          title="inhalte & timing"
          hint="Beeinflusst Zeit · und damit Preis."
        >
          <Field
            label="hast du texte & bilder schon?"
            hint="Wenn ja: schneller fertig. Wenn nein: ich helfe."
          >
            <ChipRow
              value={state.content}
              options={[
                { v: "selbst", label: "kommt von mir selbst" },
                { v: "mit-hilfe", label: "mit deiner hilfe · +450 €" },
                { v: "komplett", label: "mach du alles bitte · +1.200 €" },
              ]}
              onChange={(v) => update("content", v as ContentHelp)}
            />
          </Field>

          <Field
            label="wie eilig ist es?"
            hint="Dringend-Aufschlag (+25%) nur bei 'next week' · normale Projekte ohne Extra."
          >
            <ChipRow
              value={state.deadline}
              options={[
                { v: "flex", label: "zeit ist egal" },
                { v: "normal", label: "normal (4–8 wochen)" },
                { v: "dringend", label: "dringend (+25%)" },
              ]}
              onChange={(v) => update("deadline", v as Deadline)}
            />
          </Field>
        </Block>

        {/* ─── sektion: hosting (nur wenn web aktiv) ─── */}
        {state.web && (
          <Block
            title="hosting & addons"
            hint="Läuft monatlich · damit dein Projekt 24/7 erreichbar bleibt."
          >
            <PriceRow
              label={
                state.cms > 0
                  ? "hosting · cms"
                  : state.unterseiten > 0
                  ? "hosting · multipager"
                  : "hosting · onepager"
              }
              amount={
                state.cms > 0 ? 40 : state.unterseiten > 0 ? 30 : 20
              }
              monthly
              fixed
              hint="Passt sich automatisch deiner Konfiguration an."
            />

            <Field
              label="domain vorhanden?"
              hint="Wenn nein: laconis registriert mit · kann je nach Domain (.be/.de/.com/…) leicht variieren."
            >
              <ChipRow
                value={state.hasDomain ? "1" : "0"}
                options={[
                  { v: "1", label: "ja · hab ich schon" },
                  { v: "0", label: "nein · +2 €/Mt (kann variieren)" },
                ]}
                onChange={(v) => update("hasDomain", v === "1")}
              />
            </Field>

            <CounterField
              label="mail-postfächer"
              hint="Z.B. hallo@deinefirma.be · je 5 €/Mt"
              value={state.mails}
              min={0}
              max={10}
              unitPrice={5}
              unitSuffix="€/Mt"
              onChange={(v) => update("mails", v)}
            />
          </Block>
        )}

        {/* reset */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-offwhite/75 transition-colors"
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
            inquiryItems={inquiryItems}
            totals={totals}
            bonNumber={bonNumber}
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
            onClick={() => {
              if (!any) return;
              track({
                type: "baukasten_anfrage",
                priceOneTime: totals.oneTime,
                priceMonthly: totals.monthly,
              });
            }}
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

        <p className="mt-4 text-[11px] leading-relaxed text-offwhite/35">
          Richtpreis · kein verbindliches Angebot. Ich antworte innerhalb
          24 Std mit der finalen Zahl (werktags).
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
        <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55 max-w-[560px]">
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
          <div className="mt-1 text-[12px] leading-relaxed text-offwhite/35">
            {hint}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function PriceRow({
  label,
  hint,
  amount,
  monthly,
  fixed,
}: {
  label: string;
  hint?: string;
  amount: number;
  monthly?: boolean;
  fixed?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-start justify-between gap-3 rounded-lg border px-4 py-3",
        fixed
          ? "border-lime/25 bg-lime/[0.04]"
          : "border-ink/10 bg-ink/[0.02]",
      ].join(" ")}
    >
      <div className="min-w-0">
        <div className="font-mono text-[11px] uppercase tracking-label text-offwhite/75">
          {label}
        </div>
        {hint && (
          <div className="mt-1 text-[11.5px] leading-relaxed text-offwhite/35">
            {hint}
          </div>
        )}
      </div>
      <div className="shrink-0 text-right">
        <span className="font-mono text-[13px] text-accent-ink tabular-nums">
          {formatEUR(amount)} {monthly ? "€/Mt" : "€"}
        </span>
      </div>
    </div>
  );
}

function CounterField({
  label,
  hint,
  value,
  min,
  max,
  onChange,
  unitPrice,
  unitSuffix = "€",
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  unitPrice?: number;
  unitSuffix?: string;
}) {
  const showUnit = unitPrice !== undefined && value > 0;
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
          {label}
        </div>
        {hint && (
          <div className="mt-1 text-[12px] leading-relaxed text-offwhite/35 max-w-[420px]">
            {hint}
          </div>
        )}
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <Counter value={value} onChange={onChange} min={min} max={max} />
        {showUnit && (
          <span className="font-mono text-[10.5px] tabular-nums text-accent-ink/80">
            = {formatEUR(unitPrice! * value)} {unitSuffix}
          </span>
        )}
      </div>
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
          ? "border-lime/50 bg-gradient-to-br from-lime/[0.06] to-transparent"
          : "border-ink/10 bg-ink/[0.015] hover:border-ink/25",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            "heading-sans text-[16px]",
            active ? "text-offwhite" : "text-offwhite/75",
          ].join(" ")}
        >
          {title}
        </span>
        <ToggleDot active={active} />
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-offwhite/55">
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
        active ? "bg-lime/50" : "bg-ink/10",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 h-4 w-4 rounded-full transition-all",
          active ? "left-[18px] bg-[#111]" : "left-0.5 bg-offwhite/75",
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
                ? "border-lime/50 bg-lime/10 text-accent-ink"
                : "border-ink/10 text-offwhite/55 hover:border-ink/25 hover:text-offwhite/75",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

type InquiryKey = "flyer1" | "flyer2" | "plakat" | "rollup" | "broschuere" | "vk";

function InquiryGroup({
  title,
  hint,
  items,
  state,
  onToggle,
}: {
  title: string;
  hint?: string;
  items: { key: InquiryKey; label: string }[];
  state: BuilderState;
  onToggle: (key: InquiryKey, on: boolean) => void;
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-ink/[0.02] p-4">
      <div className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
        {title}
      </div>
      {hint && (
        <div className="mt-1 text-[12px] leading-relaxed text-offwhite/35 max-w-[520px]">
          {hint}
        </div>
      )}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item) => {
          const active = (state[item.key] as number) > 0;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onToggle(item.key, !active)}
              className={[
                "flex items-center gap-2.5 rounded-md border px-3 py-2 text-left transition-all",
                active
                  ? "border-lime/50 bg-lime/[0.06]"
                  : "border-ink/10 bg-ink/[0.015] hover:border-ink/25",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded border transition-colors",
                  active
                    ? "border-lime/60 bg-lime/25 text-accent-ink"
                    : "border-ink/25 bg-transparent",
                ].join(" ")}
              >
                {active && (
                  <svg
                    viewBox="0 0 12 12"
                    className="w-2.5 h-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6.5 L5 9 L10 3" />
                  </svg>
                )}
              </span>
              <span
                className={[
                  "text-[12.5px]",
                  active ? "text-offwhite" : "text-offwhite/75",
                ].join(" ")}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
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
        className="w-9 h-9 rounded-full border border-ink/10 text-offwhite/75 hover:border-ink/25 hover:text-offwhite disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[13px] transition-colors"
        aria-label="weniger"
      >
        −
      </button>
      <span className="min-w-[48px] text-center font-mono text-[14px] text-offwhite tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full border border-ink/10 text-offwhite/75 hover:border-ink/25 hover:text-offwhite disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[13px] transition-colors"
        aria-label="mehr"
      >
        +
      </button>
    </div>
  );
}
