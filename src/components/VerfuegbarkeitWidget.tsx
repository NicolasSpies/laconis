"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SLOTS,
  PROJEKT_DAUER,
  computePlan,
  computeDisplayedStatuses,
  type Modus,
  type ProjektTyp,
  type Slot,
  type SlotStatus,
} from "@/data/verfuegbarkeit";

type Props = {
  /** keine interaktion · nur anzeige */
  readonly?: boolean;
  initialModus?: Modus;
  initialDauer?: number;
  /** initial-auswahl des projekt-chips (falls nicht readonly) */
  initialProjektTyp?: ProjektTyp;
  /**
   * projekt-typ fest vorgegeben · chip-selector wird versteckt.
   * nutzt dauer aus PROJEKT_DAUER[lockedProjektTyp].
   */
  lockedProjektTyp?: ProjektTyp;
  /** kleiner header-hint statt der standard-überschrift */
  compact?: boolean;
  /** controlled-mode · parent steuert modus via state */
  modus?: Modus;
  onModusChange?: (m: Modus) => void;
};

const PROJEKT_OPTIONS: { id: ProjektTyp; label: string }[] = [
  { id: "onepager", label: "onepager" },
  { id: "klein", label: "website · klein" },
  { id: "mittel", label: "website · mittel" },
  { id: "gross", label: "website · gross" },
  { id: "branding", label: "branding" },
  { id: "bundle", label: "bundle web + branding" },
];

const PROJEKT_LABEL: Record<ProjektTyp, string> = {
  onepager: "onepager",
  klein: "website · klein",
  mittel: "website · mittel",
  gross: "website · gross",
  branding: "branding",
  bundle: "bundle web + branding",
};

export function VerfuegbarkeitWidget({
  readonly = false,
  initialModus = "flex",
  initialDauer,
  initialProjektTyp = "klein",
  lockedProjektTyp,
  compact = false,
  modus: controlledModus,
  onModusChange,
}: Props) {
  const [internalModus, setInternalModus] = useState<Modus>(initialModus);
  const [projektTyp, setProjektTyp] = useState<ProjektTyp>(initialProjektTyp);

  // controlled wenn parent beide props liefert · sonst internal state
  const isControlled =
    controlledModus !== undefined && onModusChange !== undefined;
  const modus = isControlled ? controlledModus! : internalModus;
  const setModus = (m: Modus) => {
    if (isControlled) onModusChange!(m);
    else setInternalModus(m);
  };

  // lockedProjektTyp überschreibt alles · sonst eigener state
  const effectiveProjektTyp = lockedProjektTyp ?? projektTyp;
  const dauer = initialDauer ?? PROJEKT_DAUER[effectiveProjektTyp];

  const plan = useMemo(() => computePlan(modus, dauer), [modus, dauer]);
  const displayedStatuses = useMemo(
    () => computeDisplayedStatuses(modus, dauer),
    [modus, dauer],
  );

  return (
    <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-lime/[0.03] via-ink/[0.02] to-transparent p-6 md:p-8">
      {/* header */}
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
            {compact ? "deine queue-position" : "verfügbarkeit · live"}
          </span>
          {!compact && (
            <h3 className="mt-2 heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite leading-[1.1]">
              wann kann ich starten?
            </h3>
          )}
        </div>
        {!compact && (
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            rolling · 12 wochen
          </span>
        )}
      </div>

      {/* controls */}
      {!readonly && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* projekt-typ: nur wenn NICHT gelockt */}
          {!lockedProjektTyp && (
            <Field label="projekt-typ">
              <div className="flex flex-wrap gap-2">
                {PROJEKT_OPTIONS.map((o) => {
                  const active = projektTyp === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setProjektTyp(o.id)}
                      aria-pressed={active}
                      className={[
                        "font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full border transition-all",
                        active
                          ? "border-lime/50 bg-lime/10 text-accent-ink"
                          : "border-ink/10 bg-ink/[0.02] text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
                      ].join(" ")}
                    >
                      {o.label}
                      <span className="ml-1.5 text-offwhite/35">
                        · {PROJEKT_DAUER[o.id]} wo
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          {/* gelockter typ: nur read-only-anzeige */}
          {lockedProjektTyp && (
            <Field label="dein projekt">
              <div className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.06] px-3 py-1.5">
                <span className="font-mono text-[10.5px] uppercase tracking-label text-accent-ink">
                  {PROJEKT_LABEL[lockedProjektTyp]}
                </span>
                <span className="font-mono text-[10px] text-offwhite/55">
                  · {dauer} wo
                </span>
              </div>
              <p className="mt-2 text-[11.5px] text-offwhite/35 leading-relaxed">
                ergibt sich aus deiner paket- bzw. konfigurator-auswahl.
              </p>
            </Field>
          )}

          <Field label="modus">
            <div className="flex gap-2">
              <ModusBtn
                active={modus === "flex"}
                onClick={() => setModus("flex")}
                label="flexibel"
                hint="normaler preis"
              />
              <ModusBtn
                active={modus === "urgent"}
                onClick={() => setModus("urgent")}
                label="dringend"
                hint="+25% · vordrängeln"
              />
            </div>
          </Field>
        </div>
      )}

      {/* timeline */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
            timeline
          </span>
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
            kw {SLOTS[0]?.kw} – kw {SLOTS[SLOTS.length - 1]?.kw} · {SLOTS[0]?.jahr}
          </span>
        </div>
        <Timeline slots={SLOTS} displayStatuses={displayedStatuses} plan={plan} />
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
        <Legend color="bg-rose-500/70" label="läuft gerade" />
        <Legend color="bg-offwhite/25" label="belegt · flex" />
        <Legend color="bg-offwhite/[0.06] border border-ink/10" label="frei" />
        <Legend color="bg-lime/50 ring-1 ring-lime" label="dein slot" />
      </div>

      {/* result cards */}
      {plan && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResultCard
            label="start"
            value={`kw ${plan.start.kw}`}
            sub={`${kwDate(plan.start.kw, plan.start.jahr)} · ${plan.start.jahr}`}
          />
          <ResultCard
            label="aktive bauzeit"
            value={`${plan.active.length} wochen`}
            sub={
              modus === "urgent"
                ? "vordrängeln · +25%"
                : "ein projekt nach dem anderen"
            }
          />
          <ResultCard
            label="fertig ca."
            value={`kw ${plan.finish.kw}`}
            sub={`${kwDate(plan.finish.kw, plan.finish.jahr, true)} · ${plan.finish.jahr}`}
            highlight
          />
        </div>
      )}

      {/* policy note */}
      <p className="mt-6 text-[12px] leading-relaxed text-offwhite/55">
        ich arbeite alleine • ein projekt nach dem anderen • wer zuerst anfragt,
        startet zuerst. der slot ist reserviert, sobald der vertrag unterschrieben
        ist.
      </p>
    </div>
  );
}

/* ══════════════════════════ subkomponenten ══════════════════════════ */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-2.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function ModusBtn({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex-1 rounded-xl border px-4 py-3 text-left transition-all",
        active
          ? "border-lime/50 bg-lime/[0.06]"
          : "border-ink/10 bg-ink/[0.02] hover:border-ink/25",
      ].join(" ")}
    >
      <div
        className={[
          "heading-sans text-[15px] transition-colors",
          active ? "text-accent-ink" : "text-offwhite",
        ].join(" ")}
      >
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
        {hint}
      </div>
    </button>
  );
}

function Timeline({
  slots,
  displayStatuses,
  plan,
}: {
  slots: Slot[];
  displayStatuses: SlotStatus[];
  plan: { start: Slot; active: Slot[]; finish: Slot } | null;
}) {
  const activeKWs = new Set(plan?.active.map((s) => s.kw) ?? []);
  const startKW = plan?.start.kw;

  return (
    <div className="relative">
      {/* mobile: 6 cols × 2 rows · desktop: 12 cols × 1 row · mehr y-gap auf mobile */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-x-1 gap-y-3 md:gap-y-1">
        {slots.map((s, i) => {
          const isActive = activeKWs.has(s.kw);
          const isStart = s.kw === startKW;
          const displayStatus = displayStatuses[i] ?? s.status;
          return (
            <motion.div
              key={`${s.jahr}-${s.kw}`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className={[
                  // mobile: h-11 (≈44px · touch-freundlich) · desktop: h-10
                  "relative h-11 md:h-10 rounded-sm overflow-hidden transition-all",
                  // ring-offset nur auf desktop · auf mobile würde er in nachbar-slots bluten
                  isActive
                    ? "bg-lime/50 ring-2 ring-lime md:ring-offset-2 md:ring-offset-transparent"
                    : displayStatus === "urgent"
                    ? "bg-rose-500/70"
                    : displayStatus === "normal"
                    ? "bg-offwhite/25"
                    : "bg-offwhite/[0.06] border border-ink/10",
                ].join(" ")}
              >
                {isStart && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] md:text-[9px] uppercase tracking-label text-[#111] font-bold">
                    du
                  </span>
                )}
              </div>
              {/* kw-label · mobile deutlich lesbarer */}
              <div className="mt-1 text-center font-mono text-[10px] md:text-[8.5px] uppercase tracking-label text-offwhite/55 md:text-offwhite/55 tabular-nums">
                {s.kw}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-4 py-4",
        highlight
          ? "border-lime/25 bg-gradient-to-br from-lime/[0.08] to-transparent"
          : "border-ink/10 bg-ink/[0.02]",
      ].join(" ")}
    >
      <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
        {label}
      </div>
      <div
        className={[
          "mt-1 heading-display text-[22px] leading-tight",
          highlight ? "text-accent-ink" : "text-offwhite",
        ].join(" ")}
      >
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
        {sub}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={["inline-block h-2.5 w-2.5 rounded-sm", color].join(" ")} />
      {label}
    </span>
  );
}

/* ══════════════════════════ helpers ══════════════════════════ */

/** grobe kw → datum annäherung (montag der kw, ISO 8601). */
function kwDate(kw: number, year: number, endOfWeek = false): string {
  // ISO: KW1 enthält den 4. januar. Montag der KW1 = 4. jan - (wochentag-1)
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const monKW1 = new Date(jan4);
  monKW1.setUTCDate(jan4.getUTCDate() - day + 1);
  const target = new Date(monKW1);
  target.setUTCDate(monKW1.getUTCDate() + (kw - 1) * 7 + (endOfWeek ? 4 : 0));
  return target.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
  });
}
