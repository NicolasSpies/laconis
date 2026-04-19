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
  hasAnyGrafikOrBranding,
  closestPaket as closestPaketFn,
  generateBonNumber,
} from "@/lib/paket-pricing";
import { Kassenzettel } from "@/components/preise/Kassenzettel";
import { VerfuegbarkeitWidget } from "@/components/VerfuegbarkeitWidget";
import { type ProjektTyp } from "@/data/verfuegbarkeit";

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
  tab: "web" | "kreatives" | "bundle";
  price: number;
  baseMonthly?: number;
};

const PAKETE: Record<string, PaketEntry> = {
  "web-basis": { name: "web · basis", tab: "web", price: 1400, baseMonthly: 20 },
  "web-standard": { name: "web · standard", tab: "web", price: 2800, baseMonthly: 40 },
  "web-pro": { name: "web · pro", tab: "web", price: 4200, baseMonthly: 40 },
  "grafik-print": { name: "kreatives · print", tab: "kreatives", price: 700 },
  "grafik-brand": { name: "kreatives · brand identity", tab: "kreatives", price: 1200 },
  "grafik-social": { name: "kreatives · social", tab: "kreatives", price: 600 },
  "bundle-launch": { name: "bundle · launch", tab: "bundle", price: 2340, baseMonthly: 20 },
  "bundle-grow": { name: "bundle · grow", tab: "bundle", price: 3600, baseMonthly: 40 },
  "bundle-full": { name: "bundle · full identity", tab: "bundle", price: 5400, baseMonthly: 40 },
};

/* ══════════════════════════ state-modell ══════════════════════════ */

type Bedarf = "website" | "branding" | "grafik-print" | "alles" | "was-anderes";
type Seiten = "onepager" | "2-5" | "6-10" | "10+" | "weiss-nicht";
type Sprachen = "1" | "2" | "3+";
type Zeitplan = "flexibel" | "dringend";
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
  if (tab === "kreatives") return "grafik-print";
  if (tab === "bundle") return "alles";
  return "website";
}

/* projekt-typ für VerfuegbarkeitWidget ableiten */
function deriveProjektTyp(state: State): ProjektTyp {
  // paket-preset vorrang
  if (state.paketId) {
    if (state.paketId === "web-basis") return "onepager";
    if (state.paketId === "web-standard") return "klein";
    if (state.paketId === "web-pro") return "mittel";
    if (state.paketId === "bundle-launch") return "onepager";
    if (state.paketId === "bundle-grow") return "bundle";
    if (state.paketId === "bundle-full") return "bundle";
    if (state.paketId.startsWith("grafik-")) return "branding";
  }
  // custom-builder
  if (state.customBuilder) {
    const b = state.customBuilder;
    const hasVisuals = hasAnyGrafikOrBranding(b);
    if (b.web && hasVisuals) return "bundle";
    if (b.web) {
      const total = 1 + b.unterseiten;
      if (total === 1) return "onepager";
      if (total <= 5) return "klein";
      if (total <= 10) return "mittel";
      return "gross";
    }
    if (hasVisuals) return "branding";
  }
  // bedarf + seiten fallback
  if (state.bedarf === "branding" || state.bedarf === "grafik-print")
    return "branding";
  if (state.bedarf === "alles") return "bundle";
  if (state.seiten === "onepager") return "onepager";
  if (state.seiten === "2-5") return "klein";
  if (state.seiten === "6-10") return "mittel";
  if (state.seiten === "10+") return "gross";
  return "klein";
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
      const hasVisuals = hasAnyGrafikOrBranding(builder);
      const bedarf: Bedarf =
        builder.web && hasVisuals
          ? "alles"
          : builder.web
          ? "website"
          : builder.branding
          ? "branding"
          : "grafik-print";

      // scope-mapping builder.unterseiten → multistep-seiten
      const totalSeiten = 1 + builder.unterseiten;
      const seiten: Seiten =
        !builder.web
          ? "weiss-nicht"
          : totalSeiten === 1
          ? "onepager"
          : totalSeiten <= 5
          ? "2-5"
          : totalSeiten <= 10
          ? "6-10"
          : "10+";

      const sprachen: Sprachen =
        builder.sprachen <= 1 ? "1" : builder.sprachen === 2 ? "2" : "3+";

      const zeitplan: Zeitplan =
        builder.deadline === "dringend" ? "dringend" : "flexibel";

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
      paketId === "web-basis" || paketId === "bundle-launch"
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  /* honeypot-feld · bleibt leer. bots füllen es aus, wir lehnen dann ab. */
  const [hp, setHp] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(null);

    const priceInfoNow = derivePriceInfo(state);
    const payload = {
      hp, // honeypot · muss leer bleiben
      name: state.name,
      email: state.email,
      telefon: state.telefon,
      notiz: state.notiz,
      bedarf: bedarfLabel(state.bedarf),
      seiten: seitenLabel(state.seiten),
      sprachen: sprachenLabel(state.sprachen),
      zeitplan: state.zeitplan,
      budget: state.budget ? budgetLabel(state.budget) : "•",
      paketName: state.paketId ? PAKETE[state.paketId]?.name ?? "" : "",
      hasDomain: state.hasDomain,
      mails: state.mails,
      customBuilderJson: state.customBuilder
        ? JSON.stringify(state.customBuilder)
        : "",
      priceOneTime: priceInfoNow?.oneTime ?? 0,
      priceMonthly: priceInfoNow?.monthly ?? 0,
      priceSurcharge: priceInfoNow?.surcharge ?? 0,
    };

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSendError(
          data?.error === "rate-limit"
            ? "zu viele anfragen · bitte in einer stunde nochmal probieren."
            : "konnte nicht gesendet werden. schreib mir direkt an nicolas@laconis.be.",
        );
        setSending(false);
        return;
      }
      setSent(true);
    } catch {
      setSendError(
        "netzwerk-fehler. schreib mir direkt an nicolas@laconis.be.",
      );
      setSending(false);
    }
  };

  /* preis-bar: live aus state ableiten — muss vor dem sent-early-return stehen */
  const priceInfo = useMemo(() => derivePriceInfo(state), [state]);

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
          dahin • mach's gut.
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
                update={update}
                onEdit={(s) => goTo(s)}
              />
            )}
            {step === 4 && (
              <Step4
                state={state}
                update={update}
                onSubmit={handleSubmit}
                onBack={() => goTo(3)}
                sending={sending}
                sendError={sendError}
                hp={hp}
                setHp={setHp}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* sticky preis-bar · nur wenn paket oder custom-builder gewählt · ab step 2 */}
      {priceInfo && step >= 2 && (
        <div className="sticky bottom-4 z-20 mt-8">
          <PriceBar info={priceInfo} />
        </div>
      )}

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
    kurz: "logo, brand guide, identität • visuelles system.",
  },
  {
    id: "grafik-print",
    titel: "grafik · print",
    kurz: "flyer, plakate, speisekarten, verpackung.",
  },
  {
    id: "alles",
    titel: "alles zusammen",
    kurz: "web + branding + print • aus einer hand.",
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
        grob reicht. du kannst im nächsten schritt präzisieren • oder später
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

/* zeitplan-werte werden nicht mehr als chip-row benutzt — nur noch über das
   queue-widget gesetzt. der typ selbst bleibt als state-feld. */

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
        wenige klicks • so krieg ich ein bild, ob wir ins selbe paket passen
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

        {/* budget */}
        <ChipField
          label="budget-rahmen"
          value={state.budget}
          options={BUDGET_OPTS}
          onChange={(v) => update("budget", v)}
          hint="grob reicht. keine trickfragen, ich pass das angebot an was realistisch ist."
        />
      </div>

      {/* ─── zeitplan · als live-queue-widget (flex | dringend) ─── */}
      <div className="mt-10">
        <div className="mb-3">
          <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/50 mb-1">
            zeitplan · deine queue-position
          </label>
          <p className="text-[12.5px] leading-relaxed text-offwhite/45 max-w-[520px]">
            klick auf „flexibel" oder „dringend" — der slot updatet sich live
            mit deinem wunschstart.
          </p>
        </div>
        <VerfuegbarkeitWidget
          compact
          modus={state.zeitplan === "dringend" ? "urgent" : "flex"}
          onModusChange={(m) =>
            update("zeitplan", m === "urgent" ? "dringend" : "flexibel")
          }
          lockedProjektTyp={deriveProjektTyp(state)}
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
  update,
  onEdit,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  onEdit: (step: StepId) => void;
}) {
  const paket = state.paketId ? PAKETE[state.paketId] : null;
  // hasDomain=true → eigene domain (kein extra) · false → laconis registriert (+2 €/Mt)
  const monthly =
    paket?.baseMonthly !== undefined
      ? paket.baseMonthly + (state.hasDomain ? 0 : 2) + state.mails * 5
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
    if (!state.hasDomain) parts.push("+ domain");
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

  // zeitplan steht unten direkt am queue-widget · zweite anzeige wäre redundant

  // budget-zeile nur wenn weder paket noch custom-builder — sonst überflüssig
  if (!paket && !state.customBuilder) {
    rows.push({
      label: "budget",
      value: state.budget ? budgetLabel(state.budget) : "• noch offen",
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
          ? "alles was du im konfigurator ausgewählt hast • als richtpreis. das finale angebot kommt von mir innerhalb 24 std."
          : paket
          ? 'alles wie von der preisseite übernommen. korrigierbar • klick auf „ändern" neben jeder zeile.'
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
      {paket && (() => {
        const isDringend = state.zeitplan === "dringend";
        const aufschlag = isDringend ? Math.round(paket.price * 0.25) : 0;
        const einmaligTotal = paket.price + aufschlag;
        return (
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
                {einmaligTotal.toLocaleString("de-DE")}{" "}
                <span className="text-offwhite/40 text-[0.6em]">€</span>
              </div>
              {isDringend && (
                <div className="mt-2 font-mono text-[10px] uppercase tracking-label text-accent-ink/80">
                  inkl. dringend-aufschlag · +{aufschlag.toLocaleString("de-DE")} € (+25 %)
                </div>
              )}
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
                  {!state.hasDomain ? " · + domain" : ""}
                  {state.mails > 0
                    ? ` · ${state.mails} mail${state.mails > 1 ? "s" : ""}`
                    : ""}
                </div>
              </div>
            )}
          </div>
        </div>
        );
      })()}

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

      {/* queue-position · interaktiv · zeitplan-toggle direkt am slot */}
      <div className="mt-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-offwhite/50">
          zeitplan · kannst du hier nochmal umstellen
        </p>
        <VerfuegbarkeitWidget
          compact
          modus={state.zeitplan === "dringend" ? "urgent" : "flex"}
          onModusChange={(m) =>
            update("zeitplan", m === "urgent" ? "dringend" : "flexibel")
          }
          lockedProjektTyp={deriveProjektTyp(state)}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════ step 4 · kontakt ══════════════════════════ */

function Step4({
  state,
  update,
  onSubmit,
  onBack,
  sending,
  sendError,
  hp,
  setHp,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  sending: boolean;
  sendError: string | null;
  hp: string;
  setHp: (v: string) => void;
}) {
  const canSend =
    !sending && state.name.trim() !== "" && state.email.trim() !== "";

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
          className="w-full bg-ink/[0.03] border border-ink/12 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/45 outline-none resize-none transition-colors"
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

      {/* honeypot · unsichtbar für menschen, bots füllen aus und werden ausgefiltert */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          nicht ausfüllen (spam-schutz)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      {sendError && (
        <div
          role="alert"
          className="rounded-lg border border-rose-400/40 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200"
        >
          {sendError}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          disabled={sending}
          className="font-mono text-[10px] uppercase tracking-label text-offwhite/50 hover:text-accent-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← zurück
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            schritt 4 / 4
          </span>
          <Button variant="primary" size="md" disabled={!canSend}>
            {sending ? "sende …" : "anfrage senden →"}
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
        className="w-full bg-ink/[0.03] border border-ink/12 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/45 outline-none transition-colors"
      />
    </div>
  );
}

/* ══════════════════════════ preis-bar (sticky bottom) ══════════════════════════ */

type PriceInfo = {
  label: string;
  oneTime: number;
  monthly: number;
  surcharge?: number; // dringend-aufschlag in euro
};

/**
 * preisinfo aus state ableiten.
 * - paketId gesetzt: PAKETE-einträge + (eventuell) dringend-aufschlag
 * - customBuilder gesetzt: generateLineItems + computeTotals
 * - sonst: null (bar wird nicht gezeigt)
 */
function derivePriceInfo(state: State): PriceInfo | null {
  // paket-mode
  if (state.paketId) {
    const paket = PAKETE[state.paketId];
    if (!paket) return null;
    const isDringend = state.zeitplan === "dringend";
    const surcharge = isDringend ? Math.round(paket.price * 0.25) : 0;
    const monthly =
      paket.baseMonthly !== undefined
        ? paket.baseMonthly + (state.hasDomain ? 0 : 2) + state.mails * 5
        : 0;
    return {
      label: paket.name,
      oneTime: paket.price + surcharge,
      monthly,
      surcharge: surcharge || undefined,
    };
  }

  // custom-builder-mode
  if (state.customBuilder) {
    const items = generateLineItems(state.customBuilder);
    const totals = computeTotals(items);
    return {
      label: "eigene konfiguration",
      oneTime: totals.oneTime,
      monthly: totals.monthly,
    };
  }

  return null;
}

function PriceBar({ info }: { info: PriceInfo }) {
  return (
    <div className="rounded-2xl border border-lime/35 bg-dark/95 backdrop-blur-md shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)] px-5 py-4 md:px-6 md:py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="min-w-0 flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink">
          dein preis · live
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-label text-offwhite/65 truncate">
          {info.label}
        </span>
      </div>
      <div className="flex items-baseline gap-5 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/45">
            einmalig
          </span>
          <span className="heading-display text-[18px] md:text-[20px] text-offwhite tabular-nums leading-none">
            {info.oneTime.toLocaleString("de-DE")}
            <span className="text-offwhite/40 text-[0.65em] ml-0.5">€</span>
          </span>
          {info.surcharge !== undefined && (
            <span className="font-mono text-[9px] text-accent-ink/80 ml-1">
              (+{info.surcharge.toLocaleString("de-DE")} € dringend)
            </span>
          )}
        </div>
        {info.monthly > 0 && (
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/45">
              monatlich
            </span>
            <span className="heading-display text-[18px] md:text-[20px] text-accent-ink tabular-nums leading-none">
              {info.monthly.toLocaleString("de-DE")}
              <span className="text-accent-ink/55 text-[0.65em] ml-0.5">€/Mt</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════ label-helpers ══════════════════════════ */

function bedarfLabel(b: Bedarf | null) {
  if (!b) return "•";
  return BEDARF_OPTIONS.find((o) => o.id === b)?.titel ?? b;
}
function seitenLabel(s: Seiten) {
  return SEITEN_OPTS.find((o) => o.id === s)?.label ?? s;
}
function sprachenLabel(s: Sprachen) {
  return SPRACHEN_OPTS.find((o) => o.id === s)?.label ?? s;
}
function budgetLabel(b: Budget) {
  return BUDGET_OPTS.find((o) => o.id === b)?.label ?? b;
}
