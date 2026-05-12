"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { CONTACT } from "@/config/contact";

/**
 * KontaktMultistep — 4-schritte-projektformular.
 * Schritt 1: bedarf (was brauchst du)
 * Schritt 2: scope (seiten, sprachen, budget-rahmen)
 * Schritt 3: zusammenfassung + zeitplan
 * Schritt 4: kontakt (name, mail, telefon, notiz, submit)
 *
 * Keine Paket-Vorauswahl, keine Preisberechnung.
 * Optional: ?bedarf=website|branding|alles springt zu schritt 2.
 */

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
  name: "",
  email: "",
  telefon: "",
  notiz: "",
};

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

  /* URL-params einlesen — optional: ?bedarf=website|branding|alles */
  const initialFromParams = useMemo<{ state: State; startStep: StepId }>(() => {
    const bedarfParam = params.get("bedarf") as Bedarf | null;
    const validBedarf: Bedarf[] = ["website", "branding", "alles", "was-anderes"];
    if (bedarfParam && validBedarf.includes(bedarfParam)) {
      return { state: { ...INITIAL, bedarf: bedarfParam }, startStep: 2 };
    }
    return { state: INITIAL, startStep: 1 };
  }, [params]);

  const [state, setState] = useState<State>(initialFromParams.state);
  const [step, setStep] = useState<StepId>(initialFromParams.startStep);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [hp, setHp] = useState("");

  const update = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const goTo = (s: StepId) => {
    setStep(s);
    if (typeof window !== "undefined") {
      const el = document.getElementById("projekt");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canAdvance = (from: StepId): boolean => {
    if (from === 1) return state.bedarf !== null;
    if (from === 2) return true;
    if (from === 3) return true;
    if (from === 4) return state.name.trim() !== "" && state.email.trim() !== "";
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(null);

    const payload = {
      hp,
      name: state.name,
      email: state.email,
      telefon: state.telefon,
      notiz: state.notiz,
      bedarf: bedarfLabel(state.bedarf),
      seiten: seitenLabel(state.seiten),
      sprachen: sprachenLabel(state.sprachen),
      zeitplan: state.zeitplan,
      budget: state.budget ? budgetLabel(state.budget) : "•",
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
      track({ type: "form_submit", form: "kontakt" });
      setSent(true);
    } catch {
      setSendError(
        `Netzwerk-Fehler. Schreib mir direkt an ${CONTACT.email}.`,
      );
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[640px] mx-auto rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/[0.06] to-transparent p-10 md:p-14 text-center"
      >
        {/* handgezeichneter haken */}
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
              <Step2 state={state} update={update} />
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
            <ScribbleCircle state={active ? "active" : done ? "done" : "idle"} index={i} />
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

function ScribbleCircle({
  state,
  index,
}: {
  state: "idle" | "active" | "done";
  index: number;
}) {
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
    kurz: "Logo, Brand Guide, Identität · visuelles System.",
  },
  {
    id: "alles",
    titel: "alles zusammen",
    kurz: "Web + Branding · aus einer Hand.",
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
        Grob reicht. Du kannst im nächsten Schritt präzisieren · oder später
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
                  ? "border-lime/50 bg-lime/[0.05] shadow-[0_12px_32px_-16px_rgb(var(--accent)_/_0.3)]"
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

const BUDGET_OPTS: { id: Budget; label: string }[] = [
  { id: "<2k", label: "< 2.000 €" },
  { id: "2-5k", label: "2.000–5.000 €" },
  { id: "5-10k", label: "5.000–10.000 €" },
  { id: "10k+", label: "10.000 € +" },
  { id: "weiss-nicht", label: "weiss nicht" },
];

function Step2({
  state,
  update,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
}) {
  const isBranding = state.bedarf === "branding";

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        präzisieren.
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        Wenige Klicks · so krieg ich ein Bild, ob das zusammenpasst
        oder was Sonderanfertigung braucht.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {!isBranding && (
          <ChipField
            label="wie viele seiten ungefähr?"
            value={state.seiten}
            options={SEITEN_OPTS}
            onChange={(v) => update("seiten", v)}
          />
        )}

        {!isBranding && (
          <ChipField
            label="sprachen"
            value={state.sprachen}
            options={SPRACHEN_OPTS}
            onChange={(v) => update("sprachen", v)}
          />
        )}

        <ChipField
          label="budget-rahmen"
          value={state.budget}
          options={BUDGET_OPTS}
          onChange={(v) => update("budget", v)}
          hint="Grob reicht. Keine Trickfragen · ich pass das Angebot an, was realistisch ist."
        />
      </div>
    </div>
  );
}

/* ══════════════════════════ step 3 · zusammenfassung ══════════════════════════ */

function Step3({
  state,
  onEdit,
}: {
  state: State;
  update?: <K extends keyof State>(key: K, value: State[K]) => void;
  onEdit: (step: StepId) => void;
}) {
  const isBranding = state.bedarf === "branding";

  const rows: { label: string; value: string; editStep: StepId }[] = [
    {
      label: "bedarf",
      value: bedarfLabel(state.bedarf),
      editStep: 1,
    },
  ];

  if (!isBranding) {
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
    label: "budget",
    value: state.budget ? budgetLabel(state.budget) : "• noch offen",
    editStep: 2,
  });

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        zusammenfassung.
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        Kurze Kontrolle, bevor's zum Kontakt geht. Jede Zeile ist änderbar.
      </p>

      <div className="mt-8 glass rounded-2xl overflow-hidden">
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
          placeholder="Was sollte ich vor dem Gespräch wissen? (Deadline, Besonderheiten, Links zu Inspiration …)"
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

      {/* honeypot */}
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

/* ══════════════════════════ chip-field ══════════════════════════ */

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

/* ══════════════════════════ text-field ══════════════════════════ */

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
