"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  type BuilderState,
  paramsToState,
  generateLineItems,
  computeTotals,
  hasAnySelection,
  closestPaket as closestPaketFn,
  generateBonNumber,
} from "@/lib/paket-pricing";
import { Kassenzettel } from "@/components/preise/Kassenzettel";

/**
 * KontaktMultistep — 4-schritte-projektformular.
 * Schritt 1: bedarf (was brauchst du)
 * Schritt 2: scope (seiten, sprachen, timing, budget)
 * Schritt 3: zusammenfassung (mit „ändern"-links zurück)
 * Schritt 4: kontakt (name, mail, telefon, notiz, submit)
 *
 * URL-param-handoff von /preise:
 *   /kontakt?paket=web-standard&domain=1&mails=2#projekt
 * → springt direkt auf schritt 3 mit paket + config vorbefüllt.
 *
 * Referenz: files/kontakt_struktur.html · sektion 04
 */

/* ══════════════════════════ paket-registry ══════════════════════════
 * muss mit PaketTabs.tsx (/components/preise) synchron bleiben —
 * nur die paar felder, die wir für die zusammenfassung brauchen.
 */

type PaketEntry = {
  name: string;
  tab: "web" | "grafik" | "bundle";
  price: number;
  baseMonthly?: number;
};

const PAKETE: Record<string, PaketEntry> = {
  "web-starter": { name: "web · starter", tab: "web", price: 1990, baseMonthly: 20 },
  "web-standard": { name: "web · standard", tab: "web", price: 2890, baseMonthly: 30 },
  "web-pro": { name: "web · pro", tab: "web", price: 3650, baseMonthly: 40 },
  "grafik-print": { name: "grafik · print", tab: "grafik", price: 700 },
  "grafik-brand": { name: "grafik · brand identity", tab: "grafik", price: 1200 },
  "grafik-social": { name: "grafik · social", tab: "grafik", price: 600 },
  "bundle-launch": { name: "bundle · launch", tab: "bundle", price: 2990, baseMonthly: 20 },
  "bundle-grow": { name: "bundle · grow", tab: "bundle", price: 3890, baseMonthly: 30 },
  "bundle-full": { name: "bundle · full identity", tab: "bundle", price: 5500, baseMonthly: 40 },
};

/* ══════════════════════════ state-modell ══════════════════════════ */

type Bedarf = "website" | "branding" | "grafik-print" | "alles" | "was-anderes";
type Seiten = "onepager" | "2-5" | "6-10" | "10+" | "weiss-nicht";
type Sprachen = "1" | "2" | "3+";
type Zeitplan = "flexibel" | "1-3-monate" | "dringend";
type Budget = "<2k" | "2-5k" | "5-10k" | "10k+" | "weiss-nicht";

type State = {
  bedarf: Bedarf | null;
  seiten: Seiten;
  sprachen: Sprachen;
  zeitplan: Zeitplan;
  budget: Budget | null;
  /** paket-vorauswahl aus URL-params (von /preise) */
  paketId: string | null;
  hasDomain: boolean;
  mails: number;
  /** custom-paket aus dem konfigurator (falls ?custom=1 URL-mode) */
  customBuilder: BuilderState | null;
  /** kontakt step 4 */
  name: string;
  email: string;
  telefon: string;
  notiz: string;
};

const INITIAL: State = {
  bedarf: null,
  seiten: "weiss-nicht",
  sprachen: "1",
  zeitplan: "flexibel",
  budget: null,
  paketId: null,
  hasDomain: false,
  mails: 0,
  customBuilder: null,
  name: "",
  email: "",
  telefon: "",
  notiz: "",
};

/* bedarf ableiten aus paket-tab (für URL-einstieg) */
function bedarfFromTab(tab: PaketEntry["tab"]): Bedarf {
  if (tab === "grafik") return "grafik-print";
  if (tab === "bundle") return "alles";
  return "website";
}

/* ══════════════════════════ wrapper mit suspense ══════════════════════════ */

export function KontaktMultistep() {
  return (
    <Suspense fallback={<div className="h-[400px]" aria-hidden />}>
      <Inner />
    </Suspense>
  );
}

/* ══════════════════════════ inner ══════════════════════════ */

type StepId = 1 | 2 | 3 | 4;

function Inner() {
  const params = useSearchParams();

  /* URL-params einlesen — einmalig beim mount */
  const initialFromParams = useMemo<{ state: State; startStep: StepId }>(() => {
    /* modus A: ?custom=1 → eigener konfigurator-bon */
    if (params.get("custom") === "1") {
      const builder = paramsToState(params);
      if (!hasAnySelection(builder)) return { state: INITIAL, startStep: 1 };

      // bedarf aus builder-state ableiten
      const hasGrafik =
        builder.grafikPrint || builder.grafikBrand || builder.grafikSocial;
      const bedarf: Bedarf =
        builder.web && hasGrafik
          ? "alles"
          : builder.web
          ? "website"
          : builder.grafikBrand
          ? "branding"
          : "grafik-print";

      // scope-mapping builder → multistep-seiten
      const seiten: Seiten =
        builder.webScope === "onepager"
          ? "onepager"
          : builder.webScope === "small"
          ? "2-5"
          : builder.webScope === "medium"
          ? "6-10"
          : builder.webScope === "large"
          ? "10+"
          : "weiss-nicht";

      const sprachen: Sprachen =
        builder.sprachen === 1 ? "1" : builder.sprachen === 2 ? "2" : "3+";

      const zeitplan: Zeitplan =
        builder.deadline === "dringend"
          ? "dringend"
          : builder.deadline === "flex"
          ? "flexibel"
          : "1-3-monate";

      return {
        state: {
          ...INITIAL,
          bedarf,
          paketId: null,
          customBuilder: builder,
          hasDomain: builder.hasDomain,
          mails: builder.mails,
          seiten,
          sprachen,
          zeitplan,
        },
        startStep: 3,
      };
    }

    /* modus B: ?paket=web-xxx → preset-paket */
    const paketId = params.get("paket");
    const entry = paketId ? PAKETE[paketId] : null;
    if (!entry) return { state: INITIAL, startStep: 1 };

    const hasDomain = params.get("domain") === "1";
    const mails = Math.max(
      0,
      Math.min(99, parseInt(params.get("mails") ?? "0", 10) || 0)
    );

    // scope-defaults ableiten aus paket-id
    const seiten: Seiten =
      paketId === "web-starter" || paketId === "bundle-launch"
        ? "onepager"
        : paketId === "web-standard" || paketId === "bundle-grow"
        ? "2-5"
        : paketId === "web-pro" || paketId === "bundle-full"
        ? "6-10"
        : "weiss-nicht";

    const sprachen: Sprachen =
      paketId === "web-pro" || paketId === "bundle-full" ? "2" : "1";

    return {
      state: {
        ...INITIAL,
        bedarf: bedarfFromTab(entry.tab),
        paketId,
        hasDomain,
        mails,
        seiten,
        sprachen,
      },
      startStep: 3,
    };
  }, [params]);

  const [state, setState] = useState<State>(initialFromParams.state);
  const [step, setStep] = useState<StepId>(initialFromParams.startStep);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const goTo = (s: StepId) => {
    setStep(s);
    // sanft nach oben zur formular-sektion
    if (typeof window !== "undefined") {
      const el = document.getElementById("projekt");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canAdvance = (from: StepId): boolean => {
    if (from === 1) return state.bedarf !== null;
    if (from === 2) return true; // alle felder haben defaults
    if (from === 3) return true;
    if (from === 4)
      return state.name.trim() !== "" && state.email.trim() !== "";
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: hook up real backend (resend / formspree)
    // eslint-disable-next-line no-console
    console.log("projekt-anfrage", state);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[640px] mx-auto rounded-2xl border border-lime/30 bg-gradient-to-br from-lime/[0.06] to-transparent p-10 md:p-14 text-center"
      >
        <div className="text-accent-ink text-[40px] mb-4">✓</div>
        <h2 className="heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite">
          danke, {state.name.trim().split(" ")[0] || "moin"}.
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-offwhite/60">
          ich hab deine anfrage bekommen und melde mich innerhalb von 24 std
          (werktags) per {state.email.includes("@") ? "mail" : "nachricht"}
          {state.telefon ? ` oder telefon (${state.telefon})` : ""}. bis
          dahin — mach's gut.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button href="/" variant="glass" size="md">
            zurück zur startseite
          </Button>
          <Button href="/referenzen" variant="ghost" size="md">
            referenzen ansehen
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-[820px] mx-auto">
      {/* progress */}
      <Progress step={step} />

      {/* step content */}
      <div className="mt-10 relative min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {step === 1 && (
              <Step1
                value={state.bedarf}
                onChange={(v) => update("bedarf", v)}
              />
            )}
            {step === 2 && (
              <Step2
                state={state}
                update={update}
              />
            )}
            {step === 3 && (
              <Step3
                state={state}
                onEdit={(s) => goTo(s)}
              />
            )}
            {step === 4 && (
              <Step4
                state={state}
                update={update}
                onSubmit={handleSubmit}
                onBack={() => goTo(3)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* nav (step 4 hat eigene submit-logik) */}
      {step !== 4 && (
        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => goTo(Math.max(1, step - 1) as StepId)}
            disabled={step === 1}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/50 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-offwhite/50 transition-colors"
          >
            ← zurück
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              schritt {step} / 4
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={() =>
                canAdvance(step) &&
                goTo(Math.min(4, step + 1) as StepId)
              }
              disabled={!canAdvance(step)}
            >
              weiter →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ progress ══════════════════════════ */

function Progress({ step }: { step: StepId }) {
  const labels = ["bedarf", "scope", "zusammenfassung", "kontakt"];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {labels.map((label, i) => {
        const s = (i + 1) as StepId;
        const active = s === step;
        const done = s < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={[
                "flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[10px] uppercase tracking-label transition-all",
                active
                  ? "border-lime/50 bg-lime/10 text-accent-ink"
                  : done
                  ? "border-lime/20 bg-ink/[0.02] text-offwhite/55"
                  : "border-ink/10 bg-ink/[0.015] text-offwhite/35",
              ].join(" ")}
            >
              <span
                className={[
                  "w-4 h-4 rounded-full flex items-center justify-center text-[9px]",
                  active
                    ? "bg-lime text-black"
                    : done
                    ? "bg-lime/30 text-accent-ink"
                    : "bg-ink/10 text-offwhite/50",
                ].join(" ")}
              >
                {done ? "✓" : s}
              </span>
              <span>{label}</span>
            </div>
            {i < labels.length - 1 && (
              <span className="font-mono text-[10px] text-offwhite/25">·</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════ step 1 · bedarf ══════════════════════════ */

const BEDARF_OPTIONS: { id: Bedarf; titel: string; kurz: string }[] = [
  {
    id: "website",
    titel: "website",
    kurz: "neue seite, redesign, onepager oder mehrsprachig.",
  },
  {
    id: "branding",
    titel: "branding",
    kurz: "logo, brand guide, identität — visuelles system.",
  },
  {
    id: "grafik-print",
    titel: "grafik · print",
    kurz: "flyer, plakate, speisekarten, verpackung.",
  },
  {
    id: "alles",
    titel: "alles zusammen",
    kurz: "web + branding + print — aus einer hand.",
  },
  {
    id: "was-anderes",
    titel: "was anderes",
    kurz: "sonderprojekt, beratung, keine schublade.",
  },
];

function Step1({
  value,
  onChange,
}: {
  value: Bedarf | null;
  onChange: (v: Bedarf) => void;
}) {
  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        was brauchst du?
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        grob reicht. du kannst im nächsten schritt präzisieren — oder später
        ändern, wenn sich herausstellt dass es doch was anderes ist.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BEDARF_OPTIONS.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={active}
              className={[
                "text-left rounded-xl p-5 border transition-all",
                active
                  ? "border-lime/50 bg-lime/[0.05] shadow-[0_12px_32px_-16px_rgba(225,253,82,0.3)]"
                  : "border-ink/10 bg-ink/[0.015] hover:border-ink/25",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4
                  className={[
                    "heading-sans text-[18px] transition-colors",
                    active ? "text-accent-ink" : "text-offwhite",
                  ].join(" ")}
                >
                  {opt.titel}
                </h4>
                {active && (
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    ✓ gewählt
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-offwhite/55">
                {opt.kurz}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════ step 2 · scope ══════════════════════════ */

const SEITEN_OPTS: { id: Seiten; label: string }[] = [
  { id: "onepager", label: "onepager" },
  { id: "2-5", label: "2–5 seiten" },
  { id: "6-10", label: "6–10 seiten" },
  { id: "10+", label: "über 10" },
  { id: "weiss-nicht", label: "weiss nicht" },
];

const SPRACHEN_OPTS: { id: Sprachen; label: string }[] = [
  { id: "1", label: "eine" },
  { id: "2", label: "zwei" },
  { id: "3+", label: "drei oder mehr" },
];

const ZEITPLAN_OPTS: { id: Zeitplan; label: string }[] = [
  { id: "flexibel", label: "flexibel" },
  { id: "1-3-monate", label: "1–3 monate" },
  { id: "dringend", label: "dringend · <4 wochen" },
];

const BUDGET_OPTS: { id: Budget; label: string }[] = [
  { id: "<2k", label: "< 2 000 €" },
  { id: "2-5k", label: "2 – 5 000 €" },
  { id: "5-10k", label: "5 – 10 000 €" },
  { id: "10k+", label: "10 000 € +" },
  { id: "weiss-nicht", label: "weiss nicht" },
];

function Step2({
  state,
  update,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
}) {
  const isBranding = state.bedarf === "branding" || state.bedarf === "grafik-print";

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        präzisieren.
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        wenige klicks — so krieg ich ein bild, ob wir ins selbe paket passen
        oder was sonderanfertigung brauchen.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {/* seiten — nur wenn website oder alles */}
        {!isBranding && (
          <ChipField
            label="wie viele seiten ungefähr?"
            value={state.seiten}
            options={SEITEN_OPTS}
            onChange={(v) => update("seiten", v)}
          />
        )}

        {/* sprachen */}
        {!isBranding && (
          <ChipField
            label="sprachen"
            value={state.sprachen}
            options={SPRACHEN_OPTS}
            onChange={(v) => update("sprachen", v)}
          />
        )}

        {/* timing */}
        <ChipField
          label="zeitplan"
          value={state.zeitplan}
          options={ZEITPLAN_OPTS}
          onChange={(v) => update("zeitplan", v)}
        />

        {/* budget */}
        <ChipField
          label="budget-rahmen"
          value={state.budget}
          options={BUDGET_OPTS}
          onChange={(v) => update("budget", v)}
          hint="grob reicht. keine trickfragen, ich pass das angebot an was realistisch ist."
        />
      </div>
    </div>
  );
}

function ChipField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T | null;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/50 mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={[
                "font-mono text-[11px] uppercase tracking-mono px-3.5 py-2 rounded-full border transition-all",
                active
                  ? "border-lime/50 bg-lime/10 text-accent-ink"
                  : "border-ink/10 bg-ink/[0.02] text-offwhite/60 hover:border-ink/30 hover:text-offwhite",
              ].join(" ")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {hint && (
        <p className="mt-2 text-[12px] text-offwhite/40">{hint}</p>
      )}
    </div>
  );
}

/* ══════════════════════════ step 3 · zusammenfassung ══════════════════════════ */

function Step3({
  state,
  onEdit,
}: {
  state: State;
  onEdit: (step: StepId) => void;
}) {
  const paket = state.paketId ? PAKETE[state.paketId] : null;
  const monthly =
    paket?.baseMonthly !== undefined
      ? paket.baseMonthly + (state.hasDomain ? 2 : 0) + state.mails * 5
      : null;

  /* custom-builder-mode: eigener kassenzettel statt paket-header */
  const customItems = state.customBuilder
    ? generateLineItems(state.customBuilder)
    : null;
  const customTotals = customItems ? computeTotals(customItems) : null;
  const customClosest =
    state.customBuilder && customTotals
      ? closestPaketFn(state.customBuilder, customTotals)
      : null;
  const customBonNumber = useMemo(() => generateBonNumber(), []);

  const rows: { label: string; value: string; editStep: StepId }[] = [];

  rows.push({
    label: "bedarf",
    value: bedarfLabel(state.bedarf),
    editStep: 1,
  });

  if (paket?.baseMonthly !== undefined) {
    const parts: string[] = ["hosting"];
    if (state.hasDomain) parts.push("+ domain");
    if (state.mails > 0)
      parts.push(`+ ${state.mails} mail${state.mails > 1 ? "s" : ""}`);
    rows.push({
      label: "laufender posten",
      value: parts.join(" "),
      editStep: 1,
    });
  }

  if (state.bedarf !== "branding" && state.bedarf !== "grafik-print") {
    rows.push({
      label: "seiten",
      value: seitenLabel(state.seiten),
      editStep: 2,
    });
    rows.push({
      label: "sprachen",
      value: sprachenLabel(state.sprachen),
      editStep: 2,
    });
  }

  rows.push({
    label: "zeitplan",
    value: zeitplanLabel(state.zeitplan),
    editStep: 2,
  });

  // budget-zeile nur wenn weder paket noch custom-builder — sonst überflüssig
  if (!paket && !state.customBuilder) {
    rows.push({
      label: "budget",
      value: state.budget ? budgetLabel(state.budget) : "— noch offen",
      editStep: 2,
    });
  }

  const isCustom = state.customBuilder !== null;

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        {isCustom
          ? "dein eigener bon."
          : paket
          ? "dein paket im überblick."
          : "zusammenfassung."}
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        {isCustom
          ? "alles was du im konfigurator ausgewählt hast — als richtpreis. das finale angebot kommt von mir innerhalb 24 std."
          : paket
          ? 'alles wie von der preisseite übernommen. korrigierbar — klick auf „ändern" neben jeder zeile.'
          : "kurze kontrolle bevor wir zum kontakt gehen. jede zeile ist änderbar."}
      </p>

      {/* custom-builder: eingebetteter kassenzettel */}
      {isCustom && customItems && customTotals && (
        <div className="mt-8 max-w-[440px]">
          <Kassenzettel
            items={customItems}
            totals={customTotals}
            bonNumber={customBonNumber}
            closestPaket={customClosest}
            empty={false}
          />
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => (window.location.href = "/preise/baukasten")}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 hover:text-accent-ink transition-colors"
            >
              ← konfiguration ändern
            </button>
          </div>
        </div>
      )}

      {/* paket-preis-header — nur wenn paket via URL vorausgewählt */}
      {paket && (
        <div className="mt-8 rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/[0.06] to-transparent p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                dein paket
              </span>
              <div className="mt-1 heading-sans text-[20px] md:text-[22px] text-offwhite">
                {paket.name}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 hover:text-accent-ink transition-colors"
            >
              paket wechseln
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-ink/10">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
                einmalig
              </div>
              <div className="mt-1 heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite leading-none">
                {paket.price.toLocaleString("de-DE")}{" "}
                <span className="text-offwhite/40 text-[0.6em]">€</span>
              </div>
              <div className="mt-1 text-[11px] text-offwhite/40">
                bei projekt-abschluss
              </div>
            </div>

            {monthly !== null && (
              <div className="sm:border-l sm:border-ink/10 sm:pl-4">
                <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
                  pro monat
                </div>
                <div className="mt-1 heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite leading-none">
                  {monthly}{" "}
                  <span className="text-offwhite/40 text-[0.6em]">€/Mt</span>
                </div>
                <div className="mt-1 text-[11px] text-offwhite/40">
                  hosting
                  {state.hasDomain ? " · domain" : ""}
                  {state.mails > 0
                    ? ` · ${state.mails} mail${state.mails > 1 ? "s" : ""}`
                    : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-ink/10 bg-ink/[0.015] overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.label + i}
            className={[
              "grid grid-cols-[120px_1fr_auto] gap-4 items-baseline px-5 md:px-6 py-4",
              i < rows.length - 1 ? "border-b border-ink/8" : "",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
              {r.label}
            </span>
            <span className="text-[14px] text-offwhite/85">{r.value}</span>
            <button
              type="button"
              onClick={() => onEdit(r.editStep)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 hover:text-accent-ink transition-colors"
            >
              ändern
            </button>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-offwhite/45">
        wenn alles stimmt, nächster schritt: deine kontaktdaten + optional eine
        notiz. angebot kommt innerhalb 24 std.
      </p>
    </div>
  );
}

/* ══════════════════════════ step 4 · kontakt ══════════════════════════ */

function Step4({
  state,
  update,
  onSubmit,
  onBack,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  const canSend = state.name.trim() !== "" && state.email.trim() !== "";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div>
        <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
          wer bist du?
        </h3>
        <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
          nur das nötigste. telefon und notiz sind freiwillig. ich antworte
          innerhalb von 24 std per mail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="name"
          value={state.name}
          onChange={(v) => update("name", v)}
          required
          placeholder="pierre müller"
          autoComplete="name"
        />
        <TextField
          label="e-mail"
          type="email"
          value={state.email}
          onChange={(v) => update("email", v)}
          required
          placeholder="deine@email.be"
          autoComplete="email"
        />
      </div>

      <TextField
        label="telefon · optional"
        type="tel"
        value={state.telefon}
        onChange={(v) => update("telefon", v)}
        placeholder="+32 491 …"
        autoComplete="tel"
      />

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/50 mb-2">
          notiz · optional
        </label>
        <textarea
          value={state.notiz}
          onChange={(e) => update("notiz", e.target.value)}
          rows={5}
          placeholder="was sollte ich vor unserem gespräch wissen? (zeitliche zwänge, besonderheiten, links zu inspiration …)"
          className="w-full bg-ink/[0.03] border border-ink/12 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/30 outline-none resize-none transition-colors"
        />
      </div>

      <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-offwhite/55 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          className="mt-1 accent-lime w-4 h-4 rounded cursor-pointer"
        />
        <span>
          ich bin einverstanden, dass diese daten verarbeitet werden, um meine
          anfrage zu beantworten. kein newsletter, kein verkauf. details in der{" "}
          <a href="/datenschutz" className="text-accent-ink hover:underline">
            datenschutzerklärung
          </a>
          .
        </span>
      </label>

      <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[10px] uppercase tracking-label text-offwhite/50 hover:text-accent-ink transition-colors"
        >
          ← zurück
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            schritt 4 / 4
          </span>
          <Button
            variant="primary"
            size="md"
            disabled={!canSend}
          >
            anfrage senden →
          </Button>
        </div>
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/50 mb-2">
        {label}
        {required && <span className="text-accent-ink ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink/[0.03] border border-ink/12 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/30 outline-none transition-colors"
      />
    </div>
  );
}

/* ══════════════════════════ label-helpers ══════════════════════════ */

function bedarfLabel(b: Bedarf | null) {
  if (!b) return "—";
  return BEDARF_OPTIONS.find((o) => o.id === b)?.titel ?? b;
}
function seitenLabel(s: Seiten) {
  return SEITEN_OPTS.find((o) => o.id === s)?.label ?? s;
}
function sprachenLabel(s: Sprachen) {
  return SPRACHEN_OPTS.find((o) => o.id === s)?.label ?? s;
}
function zeitplanLabel(z: Zeitplan) {
  return ZEITPLAN_OPTS.find((o) => o.id === z)?.label ?? z;
}
function budgetLabel(b: Budget) {
  return BUDGET_OPTS.find((o) => o.id === b)?.label ?? b;
}
