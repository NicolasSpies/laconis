"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  type BuilderState,
  DEFAULT_STATE,
  applyPreset,
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
import { track } from "@/lib/analytics";
import { CONTACT } from "@/config/contact";

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
  "web-basis": { name: "web · basis", tab: "web", price: 1400, baseMonthly: 20 },
  "web-standard": { name: "web · standard", tab: "web", price: 2800, baseMonthly: 40 },
  "web-pro": { name: "web · pro", tab: "web", price: 4200, baseMonthly: 40 },
  "grafik-print": { name: "grafik · print", tab: "grafik", price: 700 },
  "grafik-brand": { name: "grafik · brand identity", tab: "grafik", price: 1200 },
  "grafik-social": { name: "grafik · social", tab: "grafik", price: 600 },
  "bundle-launch": { name: "bundle · launch", tab: "bundle", price: 2340, baseMonthly: 20 },
  "bundle-grow": { name: "bundle · grow", tab: "bundle", price: 3600, baseMonthly: 40 },
  "bundle-full": { name: "bundle · full identity", tab: "bundle", price: 5400, baseMonthly: 40 },
};

/* ══════════════════════════ state-modell ══════════════════════════ */

type Bedarf = "website" | "branding" | "alles" | "was-anderes";
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
  if (tab === "grafik") return "branding";
  if (tab === "bundle") return "alles";
  return "website";
}

/**
 * paket-id → preset-id mapping. web-basis/bundle-launch = "basis",
 * web-standard/bundle-grow = "standard", web-pro/bundle-full = "pro".
 * null für grafik-pakete (die haben keinen builder-preset).
 */
function paketToPreset(paketId: string): "basis" | "standard" | "pro" | null {
  if (paketId === "web-basis" || paketId === "bundle-launch") return "basis";
  if (paketId === "web-standard" || paketId === "bundle-grow")
    return "standard";
  if (paketId === "web-pro" || paketId === "bundle-full") return "pro";
  return null;
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
  if (state.bedarf === "branding")
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
          : hasVisuals
          ? "branding"
          : "was-anderes";

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

    /* modus B: ?paket=web-xxx → preset-paket
     *
     * Für web-* und bundle-* pakete seeden wir gleich einen customBuilder
     * aus den PRESETS und landen in step 2 — dort kann der user alle knobs
     * anpassen (unterseiten, cms, sprachen, domain, mails, extras) mit
     * live-preis. Für grafik-* pakete bleiben wir beim alten pfad (step 3),
     * weil die keinen builder haben.
     */
    const paketId = params.get("paket");
    const entry = paketId ? PAKETE[paketId] : null;
    if (!entry || !paketId) return { state: INITIAL, startStep: 1 };

    const hasDomainParam = params.get("domain") === "1";
    const mailsParam = Math.max(
      0,
      Math.min(99, parseInt(params.get("mails") ?? "-1", 10)),
    );

    // preset-mapping: welcher paket-preset matched auf welche paket-id?
    const presetId = paketToPreset(paketId);
    const isBundle = paketId.startsWith("bundle-");

    if (presetId || isBundle) {
      // builder-state aus preset bauen · bundle = preset + branding=true
      const fallbackPreset = presetId ?? "basis";
      let builder: BuilderState = applyPreset(
        DEFAULT_STATE,
        fallbackPreset,
      );
      // override aus URL falls mitgegeben
      if (params.get("domain") !== null) builder.hasDomain = hasDomainParam;
      if (mailsParam >= 0) builder.mails = mailsParam;
      // bundle: branding dazu (dann greift auch der 10% bundle-rabatt aus der engine)
      if (isBundle) builder = { ...builder, branding: true };

      // scope-defaults für rückwärtskompatibilität / step-3-fallback-rows
      const totalSeiten = 1 + builder.unterseiten;
      const seiten: Seiten =
        totalSeiten === 1
          ? "onepager"
          : totalSeiten <= 5
          ? "2-5"
          : totalSeiten <= 10
          ? "6-10"
          : "10+";
      const sprachen: Sprachen =
        builder.sprachen <= 1 ? "1" : builder.sprachen === 2 ? "2" : "3+";

      return {
        state: {
          ...INITIAL,
          bedarf: bedarfFromTab(entry.tab),
          paketId,
          customBuilder: builder,
          hasDomain: builder.hasDomain,
          mails: builder.mails,
          seiten,
          sprachen,
        },
        startStep: 2,
      };
    }

    // grafik-pakete ohne builder-preset: alter pfad, step 3
    const seiten: Seiten = "weiss-nicht";
    const sprachen: Sprachen = "1";

    return {
      state: {
        ...INITIAL,
        bedarf: bedarfFromTab(entry.tab),
        paketId,
        hasDomain: hasDomainParam,
        mails: mailsParam >= 0 ? mailsParam : 0,
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

  /**
   * step-abandonment-tracking · fired bei beforeunload/pagehide, wenn der
   * user mitten im formular abbricht (step < 4 und nicht abgesendet).
   * nutzt navigator.sendBeacon via track() falls verfügbar.
   */
  useEffect(() => {
    const handler = () => {
      if (sent) return;
      if (step < 4) {
        track({
          type: "step_abandoned",
          step,
          paket: state.paketId ?? undefined,
        });
      }
    };
    window.addEventListener("pagehide", handler);
    return () => window.removeEventListener("pagehide", handler);
  }, [sent, step, state.paketId]);

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
            ? "Zu viele Anfragen · bitte in einer Stunde nochmal probieren."
            : `Konnte nicht gesendet werden. Schreib mir direkt an ${CONTACT.email}.`,
        );
        setSending(false);
        return;
      }
      track({
        type: "form_submit",
        form: "kontakt",
        paket: payload.paketName || undefined,
        priceOneTime: payload.priceOneTime || undefined,
      });
      setSent(true);
    } catch {
      setSendError(
        `Netzwerk-Fehler. Schreib mir direkt an ${CONTACT.email}.`,
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
        className="max-w-[640px] mx-auto rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/[0.06] to-transparent p-10 md:p-14 text-center"
      >
        {/* handgezeichneter haken · draw-in */}
        <motion.svg
          viewBox="0 0 120 80"
          className="mx-auto w-24 h-16 text-accent-ink mb-2"
          aria-hidden
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M 15 45 Q 35 60 50 65 T 105 15"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          />
          <motion.path
            d="M 100 10 L 105 15 L 100 22"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { delay: 0.7, duration: 0.25 },
              },
            }}
          />
        </motion.svg>

        <h2 className="heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite">
          danke, {state.name.trim().split(" ")[0] || "moin"}.
        </h2>

        <p
          className="mt-4 font-hand text-[22px] md:text-[24px] text-accent-ink"
          style={{ transform: "rotate(-1deg)" }}
        >
          ich meld mich diese woche.
        </p>

        <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[440px] mx-auto">
          Deine Anfrage ist da · Antwort kommt innerhalb von 24 Std (werktags)
          per {state.email.includes("@") ? "Mail" : "Nachricht"}
          {state.telefon ? ` oder Telefon (${state.telefon})` : ""}. Bis
          dahin · mach's gut.
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
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-offwhite/55 transition-colors"
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
    <div className="flex items-start justify-between gap-2 max-w-[560px]">
      {labels.map((label, i) => {
        const s = (i + 1) as StepId;
        const active = s === step;
        const done = s < step;
        return (
          <div key={label} className="flex-1 flex flex-col items-center gap-2 relative">
            {/* scribble-kreis */}
            <ScribbleCircle state={active ? "active" : done ? "done" : "idle"} index={i} />

            {/* label · aktiv = accent-ink & unterstrichen mit scribble */}
            <span
              className={[
                "font-mono text-[9px] md:text-[10px] uppercase tracking-label text-center leading-tight transition-colors",
                active
                  ? "text-accent-ink"
                  : done
                  ? "text-offwhite/55"
                  : "text-offwhite/35",
              ].join(" ")}
            >
              {label}
            </span>

            {/* wellige verbindung zum nächsten kreis (rechts) */}
            {i < labels.length - 1 && (
              <svg
                aria-hidden
                viewBox="0 0 60 12"
                className="absolute top-5 left-[calc(50%+22px)] w-[calc(100%-44px)] h-3 pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 2 6 Q 15 1 30 6 T 58 6"
                  stroke={done ? "#d9ff00" : "rgba(242,240,231,0.15)"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={done ? "0" : "3,3"}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** einzelner handgezeichneter kreis — idle / active / done. */
function ScribbleCircle({
  state,
  index,
}: {
  state: "idle" | "active" | "done";
  index: number;
}) {
  // leichte, deterministische rotation pro kreis — wirkt handgezeichnet
  const rot = [-3, 2, -1.5, 3][index] ?? 0;
  const stroke =
    state === "active"
      ? "#d9ff00"
      : state === "done"
      ? "rgba(217,255,0,0.7)"
      : "rgba(242,240,231,0.25)";
  const fill =
    state === "active"
      ? "rgba(217,255,0,0.18)"
      : state === "done"
      ? "rgba(217,255,0,0.08)"
      : "transparent";

  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      style={{ transform: `rotate(${rot}deg)` }}
      className="w-10 h-10 shrink-0"
    >
      {/* scribble-kreis · zwei leicht versetzte pfade für „doppelt gezogen" */}
      <path
        d="M20 5 Q 34 8, 35 20 Q 34 32, 20 35 Q 6 32, 5 20 Q 6 8, 20 5 Z"
        stroke={stroke}
        strokeWidth={state === "active" ? 2 : 1.4}
        strokeLinecap="round"
        fill={fill}
      />
      {state === "idle" && (
        <path
          d="M22 6 Q 33 10, 34 21 Q 33 30, 20 34"
          stroke={stroke}
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      )}
      {state === "done" && (
        /* scribble-haken */
        <path
          d="M11 20 L18 27 L30 13"
          stroke="#d9ff00"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
      {state === "active" && (
        /* active-dot im zentrum */
        <circle cx="20" cy="20" r="3.5" fill="#d9ff00" />
      )}
    </svg>
  );
}

/* ══════════════════════════ step 1 · bedarf ══════════════════════════ */

const BEDARF_OPTIONS: { id: Bedarf; titel: string; kurz: string }[] = [
  {
    id: "website",
    titel: "website",
    kurz: "Neue Seite, Redesign, Onepager oder mehrsprachig.",
  },
  {
    id: "branding",
    titel: "branding",
    kurz: "Logo, Brand Guide, Identität • visuelles System.",
  },
  {
    id: "alles",
    titel: "alles zusammen",
    kurz: "Web + Branding • aus einer Hand.",
  },
  {
    id: "was-anderes",
    titel: "was anderes",
    kurz: "Sonderprojekt, Beratung, keine Schublade.",
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
        Grob reicht. Du kannst im nächsten Schritt präzisieren • oder später
        ändern, wenn sich herausstellt, dass es doch was anderes ist.
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
                  ? "border-lime/50 bg-lime/[0.05] shadow-[0_12px_32px_-16px_rgb(var(--accent) / 0.3)]"
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
  // Wenn ein builder-preset aktiv ist (kam über ?paket=web-xxx oder bundle-xxx),
  // wird step 2 zum paket-anpassen-formular mit granularen knöpfen.
  if (state.customBuilder && state.paketId) {
    return <BuilderStep2 state={state} update={update} />;
  }

  const isBranding = state.bedarf === "branding";
  // budget-chip verstecken, wenn ein paket aktiv ist (preis ist schon live sichtbar).
  const showBudget = !state.paketId;

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        präzisieren.
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        Wenige Klicks • so krieg ich ein Bild, ob wir ins selbe Paket passen
        oder was Sonderanfertigung brauchen.
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

        {/* budget · nur wenn kein paket aktiv */}
        {showBudget && (
          <ChipField
            label="budget-rahmen"
            value={state.budget}
            options={BUDGET_OPTS}
            onChange={(v) => update("budget", v)}
            hint="Grob reicht. Keine Trickfragen, ich pass das Angebot an, was realistisch ist."
          />
        )}
      </div>

      {/* zeitplan-widget ist in step 3 — hier nicht mehr, damit step 2 schlank bleibt. */}
    </div>
  );
}

/* ══════════════════════════ step 2 · builder-mode ══════════════════════════
 *
 * Ersetzt step 2, wenn der user via ?paket=web-xxx oder ?paket=bundle-xxx
 * kam. Nutzt die bestehende preis-engine aus paket-pricing.ts — alle knöpfe
 * bearbeiten state.customBuilder, und derivePriceInfo() rendert die sticky
 * preis-bar live (inkl. dringend-aufschlag, der in step 3 gesetzt wird).
 */

function BuilderStep2({
  state,
  update,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
}) {
  const builder = state.customBuilder!;
  const paket = state.paketId ? PAKETE[state.paketId] : null;
  const presetLabel = paketToPreset(state.paketId ?? "");

  const [extrasOpen, setExtrasOpen] = useState(false);

  /**
   * Patch helper · schreibt in customBuilder. Synchronisiert zusätzlich
   * state.hasDomain / state.mails, damit nicht-builder-seiten (z.B. step 3
   * fallback-rows, payload) konsistent bleiben.
   */
  const setBuilder = (patch: Partial<BuilderState>) => {
    const next = { ...builder, ...patch };
    update("customBuilder", next);
    if ("hasDomain" in patch) update("hasDomain", next.hasDomain);
    if ("mails" in patch) update("mails", next.mails);
  };

  return (
    <div>
      {/* kopf */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            paket anpassen.
          </h3>
          <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
            Startpunkt:{" "}
            <span className="text-offwhite">
              {paket?.name ?? "paket"}
            </span>
            {presetLabel ? ` · Preset „${presetLabel}"` : ""}. Schraub dran
            bis's passt — Preis unten passt sich live an.
          </p>
        </div>
      </div>

      {/* web-block · unterseiten / cms / sprachen / shop */}
      <div className="mt-8 glass rounded-2xl p-5 md:p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            website-umfang
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-label text-offwhite/35">
            einmalig
          </span>
        </div>

        <CounterRow
          label="Unterseiten"
          hint="Je 300 € · über die Startseite hinaus"
          value={builder.unterseiten}
          min={0}
          max={20}
          onChange={(v) => setBuilder({ unterseiten: v })}
        />

        <CounterRow
          label="CMS-Bereiche"
          hint="Je 500 € · selbst pflegbar (Blog, Team, News…)"
          value={builder.cms}
          min={0}
          max={8}
          onChange={(v) => setBuilder({ cms: v })}
        />

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              sprachen
            </label>
            <span className="font-mono text-[9.5px] text-offwhite/35">
              je zusatzsprache: 50 €/seite
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3].map((n) => {
              const active = builder.sprachen === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setBuilder({ sprachen: n })}
                  aria-pressed={active}
                  className={[
                    "font-mono text-[11px] uppercase tracking-mono px-3.5 py-2 rounded-full border transition-all",
                    active
                      ? "border-lime/50 bg-lime/10 text-accent-ink"
                      : "border-ink/10 bg-ink/[0.02] text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
                  ].join(" ")}
                >
                  {n === 1 ? "eine" : n === 2 ? "zwei" : "drei"}
                </button>
              );
            })}
          </div>
        </div>

        <ToggleRow
          label="Shop / Buchungs-System"
          hint="Onlineshop oder Termin-System · +1.800 €"
          value={builder.shop}
          onChange={(v) => setBuilder({ shop: v })}
        />
      </div>

      {/* hosting · domain / mails */}
      <div className="mt-5 glass rounded-2xl p-5 md:p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            hosting · domain · mail
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-label text-offwhite/35">
            laufend · monatlich
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <span className="text-[14px] text-offwhite/75">
              Hast du schon eine Domain?
            </span>
            <p className="mt-0.5 text-[11.5px] text-offwhite/35">
              Nein → ich registriere mit (+2 €/Mt, je nach Domain variabel).
            </p>
          </div>
          <div className="inline-flex rounded-full border border-ink/10 bg-dark p-0.5 shrink-0">
            <button
              type="button"
              aria-pressed={builder.hasDomain}
              onClick={() => setBuilder({ hasDomain: true })}
              className={[
                "px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-mono transition-colors",
                builder.hasDomain
                  ? "bg-lime text-black"
                  : "text-offwhite/55 hover:text-offwhite",
              ].join(" ")}
            >
              ja
            </button>
            <button
              type="button"
              aria-pressed={!builder.hasDomain}
              onClick={() => setBuilder({ hasDomain: false })}
              className={[
                "px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-mono transition-colors",
                !builder.hasDomain
                  ? "bg-lime text-black"
                  : "text-offwhite/55 hover:text-offwhite",
              ].join(" ")}
            >
              nein
            </button>
          </div>
        </div>

        <CounterRow
          label="E-Mail-Postfächer"
          hint="Je 5 €/Mt · info@, hallo@, …"
          value={builder.mails}
          min={0}
          max={20}
          onChange={(v) => setBuilder({ mails: v })}
        />
      </div>

      {/* extras · collapsible */}
      <div className="mt-5 glass rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setExtrasOpen((v) => !v)}
          aria-expanded={extrasOpen}
          className="w-full flex items-center justify-between gap-3 px-5 md:px-6 py-4 hover:bg-ink/[0.03] transition-colors"
        >
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              extras
            </span>
            <p className="mt-0.5 text-[12.5px] text-offwhite/35">
              Branding dazu, Content-Hilfe · optional
            </p>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 10 10"
            className={[
              "transition-transform text-offwhite/55",
              extrasOpen ? "rotate-180" : "",
            ].join(" ")}
            aria-hidden
          >
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {extrasOpen && (
            <motion.div
              key="extras"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.28, ease: "easeOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.22, ease: "easeIn" },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 flex flex-col gap-5 border-t border-ink/10 pt-5">
                <ToggleRow
                  label="Branding dazu"
                  hint="Logo, Brand Guide, VK, Briefpapier, 3 Social-Templates · +1.200 € · −10% Bundle-Rabatt greift automatisch"
                  value={builder.branding}
                  onChange={(v) => setBuilder({ branding: v })}
                />

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                      content · texte & fotos
                    </label>
                  </div>
                  <p className="mt-1 text-[12px] text-offwhite/35">
                    Wer schreibt die Texte und liefert die Bilder?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      [
                        { id: "selbst", label: "selber", note: "inklusive" },
                        {
                          id: "mit-hilfe",
                          label: "mit hilfe",
                          note: "+450 €",
                        },
                        {
                          id: "komplett",
                          label: "komplett von mir",
                          note: "+1.200 €",
                        },
                      ] as const
                    ).map((o) => {
                      const active = builder.content === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setBuilder({ content: o.id })}
                          aria-pressed={active}
                          className={[
                            "font-mono text-[11px] uppercase tracking-mono px-3.5 py-2 rounded-full border transition-all flex items-baseline gap-2",
                            active
                              ? "border-lime/50 bg-lime/10 text-accent-ink"
                              : "border-ink/10 bg-ink/[0.02] text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
                          ].join(" ")}
                        >
                          <span>{o.label}</span>
                          <span
                            className={[
                              "text-[9.5px]",
                              active ? "text-accent-ink/75" : "text-offwhite/35",
                            ].join(" ")}
                          >
                            {o.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* hinweis unten */}
      <p className="mt-6 text-[12.5px] leading-relaxed text-offwhite/55 max-w-[580px]">
        Zeitplan & Dringend-Aufschlag kommen im nächsten Schritt — dann siehst
        du den finalen Bon.
      </p>
    </div>
  );
}

/* ══════════════════════════ builder-primitives ══════════════════════════ */

function CounterRow({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <span className="text-[14px] text-offwhite/75">{label}</span>
        {hint && (
          <p className="mt-0.5 text-[11.5px] text-offwhite/35">{hint}</p>
        )}
      </div>
      <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-dark px-1.5 py-0.5 shrink-0">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={`${label} verringern`}
          className="w-7 h-7 rounded-full flex items-center justify-center text-offwhite/55 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <span className="font-mono text-[13px] tabular-nums text-offwhite min-w-[18px] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="w-7 h-7 rounded-full flex items-center justify-center text-offwhite/55 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <span className="text-[14px] text-offwhite/75">{label}</span>
        {hint && (
          <p className="mt-0.5 text-[11.5px] text-offwhite/35 max-w-[400px]">
            {hint}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={[
          "relative inline-flex h-[28px] w-[52px] shrink-0 items-center rounded-full border transition-all",
          value
            ? "border-lime/50 bg-lime/25"
            : "border-ink/10 bg-dark hover:border-ink/25",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-[20px] w-[20px] rounded-full bg-offwhite transition-transform",
            value ? "translate-x-[27px] bg-lime" : "translate-x-[3px]",
          ].join(" ")}
        />
      </button>
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
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-3">
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
                  : "border-ink/10 bg-ink/[0.02] text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
              ].join(" ")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {hint && (
        <p className="mt-2 text-[12px] text-offwhite/35">{hint}</p>
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

  /* custom-builder-mode: eigener kassenzettel statt paket-header.
   * zeitplan wird in builder.deadline gespiegelt, damit der dringend-aufschlag
   * live im bon erscheint wenn der user oben am queue-widget umstellt. */
  const syncedBuilder: BuilderState | null = state.customBuilder
    ? {
        ...state.customBuilder,
        deadline: state.zeitplan === "dringend" ? "dringend" : "normal",
      }
    : null;
  const customItems = syncedBuilder ? generateLineItems(syncedBuilder) : null;
  const customTotals = customItems ? computeTotals(customItems) : null;
  const customClosest =
    syncedBuilder && customTotals
      ? closestPaketFn(syncedBuilder, customTotals)
      : null;
  // Hydration-safe: bon-nummer erst nach mount generieren (Math.random im
  // generateBonNumber würde sonst server vs client abweichen)
  const [customBonNumber, setCustomBonNumber] = useState("");
  useEffect(() => {
    setCustomBonNumber(generateBonNumber());
  }, []);

  const rows: { label: string; value: string; editStep: StepId }[] = [];

  rows.push({
    label: "bedarf",
    value: bedarfLabel(state.bedarf),
    editStep: 1,
  });

  // In builder-mode ist alles im kassenzettel — die zeilen unten wären redundant.
  const isBuilderMode = state.customBuilder !== null;

  if (paket?.baseMonthly !== undefined && !isBuilderMode) {
    const parts: string[] = ["Hosting"];
    if (!state.hasDomain) parts.push("+ Domain");
    if (state.mails > 0)
      parts.push(`+ ${state.mails} Mail${state.mails > 1 ? "s" : ""}`);
    rows.push({
      label: "laufender posten",
      value: parts.join(" "),
      editStep: 1,
    });
  }

  if (
    state.bedarf !== "branding" &&
    !isBuilderMode
  ) {
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
      value: state.budget ? budgetLabel(state.budget) : "• Noch offen",
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
          ? "Alles, was du im Konfigurator ausgewählt hast • als Richtpreis. Das finale Angebot kommt von mir innerhalb 24 Std."
          : paket
          ? 'Alles wie von der Preisseite übernommen. Korrigierbar • Klick auf „ändern" neben jeder Zeile.'
          : "Kurze Kontrolle, bevor wir zum Kontakt gehen. Jede Zeile ist änderbar."}
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
              onClick={() => onEdit(2)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
            >
              ← konfiguration anpassen
            </button>
          </div>
        </div>
      )}

      {/* paket-preis-header — nur wenn paket OHNE builder (z.B. grafik-paket),
          sonst hat der kassenzettel oben schon alle zahlen. */}
      {paket && !isCustom && (() => {
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
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
            >
              paket wechseln
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-ink/10">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                einmalig
              </div>
              <div className="mt-1 heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite leading-none">
                {einmaligTotal.toLocaleString("de-DE")}{" "}
                <span className="text-offwhite/35 text-[0.6em]">€</span>
              </div>
              {isDringend && (
                <div className="mt-2 font-mono text-[10px] uppercase tracking-label text-accent-ink/80">
                  inkl. dringend-aufschlag · +{aufschlag.toLocaleString("de-DE")} € (+25%)
                </div>
              )}
              <div className="mt-1 text-[11px] text-offwhite/35">
                Bei Projekt-Abschluss
              </div>
            </div>

            {monthly !== null && (
              <div className="sm:border-l sm:border-ink/10 sm:pl-4">
                <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                  pro monat
                </div>
                <div className="mt-1 heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite leading-none">
                  {monthly}{" "}
                  <span className="text-offwhite/35 text-[0.6em]">€/Mt</span>
                </div>
                <div className="mt-1 text-[11px] text-offwhite/35">
                  Hosting
                  {!state.hasDomain ? " · + Domain" : ""}
                  {state.mails > 0
                    ? ` · ${state.mails} Mail${state.mails > 1 ? "s" : ""}`
                    : ""}
                </div>
              </div>
            )}
          </div>
        </div>
        );
      })()}

      <div className="mt-6 glass rounded-2xl overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.label + i}
            className={[
              "grid grid-cols-[120px_1fr_auto] gap-4 items-baseline px-5 md:px-6 py-4",
              i < rows.length - 1 ? "border-b border-ink/10" : "",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              {r.label}
            </span>
            <span className="text-[14px] text-offwhite/75">{r.value}</span>
            <button
              type="button"
              onClick={() => onEdit(r.editStep)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
            >
              ändern
            </button>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-offwhite/55">
        Wenn alles stimmt, nächster Schritt: deine Kontaktdaten + optional eine
        Notiz. Angebot kommt innerhalb 24 Std.
      </p>

      {/* queue-position · interaktiv · zeitplan-toggle direkt am slot */}
      <div className="mt-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
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
          Nur das Nötigste. Telefon und Notiz sind freiwillig. Ich antworte
          innerhalb von 24 Std per Mail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="name"
          value={state.name}
          onChange={(v) => update("name", v)}
          required
          placeholder="Alex Martin"
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
        <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-2">
          notiz · optional
        </label>
        <textarea
          value={state.notiz}
          onChange={(e) => update("notiz", e.target.value)}
          rows={5}
          placeholder="Was sollte ich vor unserem Gespräch wissen? (zeitliche Zwänge, Besonderheiten, Links zu Inspiration …)"
          className="w-full bg-ink/[0.03] border border-ink/10 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/55 outline-none resize-none transition-colors"
        />
      </div>

      <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-offwhite/55 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          className="mt-1 accent-lime w-4 h-4 rounded cursor-pointer"
        />
        <span>
          Ich bin einverstanden, dass diese Daten verarbeitet werden, um meine
          Anfrage zu beantworten. Kein Newsletter, kein Verkauf. Details in der{" "}
          <a href="/datenschutz" className="text-accent-ink hover:underline">
            Datenschutzerklärung
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
          Nicht ausfüllen (Spam-Schutz)
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
          className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-2">
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
        className="w-full bg-ink/[0.03] border border-ink/10 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/55 outline-none transition-colors"
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
 * - customBuilder gesetzt: generateLineItems + computeTotals (inkl. dringend-aufschlag)
 * - paketId gesetzt (ohne builder, z.B. grafik-pakete): PAKETE-werte + aufschlag
 * - sonst: null (bar wird nicht gezeigt)
 *
 * WICHTIG: state.zeitplan wird in customBuilder.deadline gespiegelt, bevor
 * die engine läuft — sonst zeigt die sticky-bar nicht, was step 3 am
 * queue-widget umstellt.
 */
function derivePriceInfo(state: State): PriceInfo | null {
  // custom-builder-mode hat vorrang: das gilt für alle web-/bundle-pakete
  // (weil beim URL-handoff customBuilder aus dem preset geseedet wird)
  if (state.customBuilder) {
    // zeitplan → deadline spiegeln, damit der aufschlag in der engine greift
    const deadline = state.zeitplan === "dringend" ? "dringend" : "normal";
    const synced: BuilderState = { ...state.customBuilder, deadline };
    const items = generateLineItems(synced);
    const totals = computeTotals(items);
    // surcharge-zeile finden (engine label: "dringend-aufschlag")
    const surchargeItem = items.find(
      (i) => i.label === "dringend-aufschlag" && !i.monthly,
    );
    const paketName = state.paketId ? PAKETE[state.paketId]?.name : undefined;
    return {
      label: paketName ?? "eigene konfiguration",
      oneTime: totals.oneTime,
      monthly: totals.monthly,
      surcharge: surchargeItem ? surchargeItem.amount : undefined,
    };
  }

  // paket-mode ohne builder (z.B. grafik-*)
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

  return null;
}

function PriceBar({ info }: { info: PriceInfo }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 md:px-6 md:py-4 flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: "rgb(var(--accent) / 0.28)" }}>
      <div className="min-w-0 flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink">
          dein preis · live
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-label text-offwhite/55 truncate">
          {info.label}
        </span>
      </div>
      <div className="flex items-baseline gap-5 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
            einmalig
          </span>
          <span className="heading-display text-[18px] md:text-[20px] text-offwhite tabular-nums leading-none">
            {info.oneTime.toLocaleString("de-DE")}
            <span className="text-offwhite/35 text-[0.65em] ml-0.5">€</span>
          </span>
          {info.surcharge !== undefined && (
            <span className="font-mono text-[9px] text-accent-ink/80 ml-1">
              (+{info.surcharge.toLocaleString("de-DE")} € dringend)
            </span>
          )}
        </div>
        {info.monthly > 0 && (
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
              monatlich
            </span>
            <span className="heading-display text-[18px] md:text-[20px] text-accent-ink tabular-nums leading-none">
              {info.monthly.toLocaleString("de-DE")}
              <span className="text-accent-ink/80 text-[0.65em] ml-0.5">€/Mt</span>
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
