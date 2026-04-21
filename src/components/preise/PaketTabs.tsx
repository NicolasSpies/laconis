"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CounterUp } from "@/components/ui/CounterUp";
import { track } from "@/lib/analytics";

/**
 * PaketTabs — drei tabs (web · grafik · bundle), je drei pakete.
 * Cards zeigen nur noch das nötigste (preis, tagline, 3 kern-punkte, cta).
 * Darunter ein „alle leistungen vergleichen" toggle → saubere ✓/✗-tabelle.
 */

/* ══════════════════════════ datenmodell ══════════════════════════ */

type MiniConfig = {
  baseMonthly: number;
};

/**
 * Ein highlight ist entweder ein reiner string (z.B. "onepager") oder
 * ein objekt mit label + mini-beschreibung (z.B. { label: "responsive",
 * note: "mobile optimiert" }). Die beschreibung erscheint in kleiner,
 * dezenter schrift unter dem label.
 */
type Highlight = string | { label: string; note: string };

type Paket = {
  id: string;
  num: string;
  name: string;
  tagline: string;
  price: number;
  einzeln?: number;
  saving?: number;
  /** 3-4 kern-highlights · wird auf der slim-card gezeigt */
  highlights: Highlight[];
  featured?: boolean;
  /** undefined = kein laufender posten (grafik-pakete) */
  config?: MiniConfig;
};

/**
 * terminologie:
 * - "web"       → websites (1:1 mit nav/leistungen/web)
 * - "grafik" → branding + print + social (1:1 mit nav/leistungen/branding)
 * - "bundle"    → web + grafik kombiniert
 *
 * die paket-IDs bleiben aus kompatibilitäts-gründen mit "grafik-" prefix,
 * weil URL-params und kontakt-multistep darauf referenzieren.
 */
type TabId = "web" | "grafik" | "bundle";

/** ein eintrag in der vergleichstabelle · pro feature eine zeile */
type CompareRow = {
  label: string;
  /** werte je paket-id · boolean = ✓/✗ · string = custom anzeige (z.B. "3 stk") */
  values: Record<string, boolean | string>;
};

type TabDef = {
  id: TabId;
  label: string;
  subLabel: string;
  pakete: Paket[];
  compare: CompareRow[];
};

const TABS: TabDef[] = [
  /* ──────────── web ──────────── */
  {
    id: "web",
    label: "web",
    subLabel: "Websites von Einseiter bis mehrsprachig.",
    pakete: [
      {
        id: "web-basis",
        num: "01",
        name: "Basis",
        tagline: "Für Selbständige & Neugründer.",
        price: 1400,
        highlights: [
          "Onepager",
          { label: "responsive", note: "Sieht auf Handy und Tablet genauso gut aus." },
          { label: "seo", note: "Damit Google dich überhaupt findet." },
          "SSL + Backups + Monitoring",
        ],
        config: { baseMonthly: 20 },
      },
      {
        id: "web-standard",
        num: "02",
        name: "Standard",
        tagline: "Für KMUs & Lokalbetriebe.",
        price: 2800,
        highlights: [
          "Alles aus Basis, plus:",
          { label: "bis zu 5 unterseiten", note: "Mehr Seiten jederzeit zubuchbar." },
          { label: "1 cms-bereich", note: "Du pflegst Inhalte selbst." },
        ],
        featured: true,
        config: { baseMonthly: 30 },
      },
      {
        id: "web-pro",
        num: "03",
        name: "Pro",
        tagline: "Für wachsende Unternehmen.",
        price: 4200,
        highlights: [
          "Alles aus Standard, plus:",
          { label: "bis zu 10 unterseiten · 2 cms-bereiche", note: "Seiten und Bereiche erweiterbar." },
          { label: "mehrsprachig", note: "2 Sprachen inklusive." },
        ],
        config: { baseMonthly: 40 },
      },
    ],
    compare: [
      {
        label: "Responsiv · SEO · SSL",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
      {
        label: "Eigenes Analytics (kein Cookie-Banner)",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
      {
        label: "Kontaktformular · Impressum · Datenschutz",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
      {
        label: "Einführungs-Videocall",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
      {
        label: "Unterseiten inklusive",
        values: {
          "web-basis": "onepager",
          "web-standard": "bis 5",
          "web-pro": "bis 10",
        },
      },
      {
        label: "CMS-Bereiche (selbst pflegbar)",
        values: {
          "web-basis": false,
          "web-standard": "1 bereich",
          "web-pro": "2 bereiche",
        },
      },
      {
        label: "Mehrsprachigkeit",
        values: {
          "web-basis": false,
          "web-standard": false,
          "web-pro": "2 sprachen",
        },
      },
      {
        label: "Hosting · SSL · Backups · Monitoring",
        values: {
          "web-basis": "onepager-tier",
          "web-standard": "multipager-tier",
          "web-pro": "multipager-tier",
        },
      },
      {
        label: "Domain + Mail-Postfächer zubuchbar",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
      {
        label: "Weitere Seiten & Extras zubuchbar",
        values: { "web-basis": true, "web-standard": true, "web-pro": true },
      },
    ],
  },

  /* ──────────── branding (tab-id bleibt "grafik" für URL-kompat) ──────────── */
  {
    id: "grafik",
    label: "branding",
    subLabel: "Logo, Brand Identity, Print, Social · ohne Website.",
    pakete: [
      {
        id: "grafik-print",
        num: "01",
        name: "Print",
        tagline: "Für schnelle Drucksachen.",
        price: 700,
        highlights: [
          "Flyer beidseitig + Plakat",
          "Rollup · Gestaltung",
          "Druckdaten druckfertig",
        ],
      },
      {
        id: "grafik-brand",
        num: "02",
        name: "Brand Identity",
        tagline: "Deine komplette Identität.",
        price: 1200,
        highlights: [
          "Logo · Varianten · Favicon",
          "Brand Guide + VK + Briefpapier",
          "3 Social-Templates",
        ],
        featured: true,
      },
      {
        id: "grafik-social",
        num: "03",
        name: "Social",
        tagline: "Für Social-Media-Präsenz.",
        price: 600,
        highlights: [
          "6 Social-Media-Visuals",
          "E-Mail-Signatur + Visitenkarte",
          "Alle Formate geliefert",
        ],
      },
    ],
    compare: [
      {
        label: "Logo · Varianten · Favicon",
        values: {
          "grafik-print": false,
          "grafik-brand": true,
          "grafik-social": false,
        },
      },
      {
        label: "Mini Brand Guide",
        values: {
          "grafik-print": false,
          "grafik-brand": true,
          "grafik-social": false,
        },
      },
      {
        label: "Visitenkarte",
        values: {
          "grafik-print": false,
          "grafik-brand": true,
          "grafik-social": true,
        },
      },
      {
        label: "Briefpapier (DIN A4)",
        values: {
          "grafik-print": false,
          "grafik-brand": true,
          "grafik-social": false,
        },
      },
      {
        label: "Social-Media-Templates",
        values: {
          "grafik-print": false,
          "grafik-brand": "3 stk",
          "grafik-social": false,
        },
      },
      {
        label: "Social-Media-Visuals",
        values: {
          "grafik-print": false,
          "grafik-brand": false,
          "grafik-social": "6 stk",
        },
      },
      {
        label: "E-Mail-Signatur",
        values: {
          "grafik-print": false,
          "grafik-brand": false,
          "grafik-social": true,
        },
      },
      {
        label: "Flyer (beidseitig)",
        values: {
          "grafik-print": true,
          "grafik-brand": false,
          "grafik-social": false,
        },
      },
      {
        label: "Plakat (alle Formate)",
        values: {
          "grafik-print": true,
          "grafik-brand": false,
          "grafik-social": false,
        },
      },
      {
        label: "Rollup · Gestaltung",
        values: {
          "grafik-print": true,
          "grafik-brand": false,
          "grafik-social": false,
        },
      },
      {
        label: "Druckdaten druckfertig",
        values: {
          "grafik-print": true,
          "grafik-brand": false,
          "grafik-social": false,
        },
      },
    ],
  },

  /* ──────────── bundle ──────────── */
  {
    id: "bundle",
    label: "bundle",
    subLabel: "Web + Branding zusammen · mit Nachlass.",
    pakete: [
      {
        id: "bundle-launch",
        num: "01",
        name: "Launch",
        tagline: "Web Basis + Brand Identity.",
        price: 2340,
        einzeln: 2600,
        saving: 260,
        highlights: [
          "Web Basis + komplettes Branding",
          "Logo, Brand Guide, VK, Briefpapier",
          "Alles im selben Look · aus einer Hand",
        ],
        config: { baseMonthly: 20 },
      },
      {
        id: "bundle-grow",
        num: "02",
        name: "Grow",
        tagline: "Web Standard + Brand Identity.",
        price: 3600,
        einzeln: 4000,
        saving: 400,
        highlights: [
          "Alles aus Launch, plus:",
          "3 Unterseiten statt Onepager",
          "1 CMS-Bereich · selbst pflegbar",
        ],
        featured: true,
        config: { baseMonthly: 30 },
      },
      {
        id: "bundle-full",
        num: "03",
        name: "Full Identity",
        tagline: "Komplett von null auf fertig.",
        price: 5400,
        einzeln: 6000,
        saving: 600,
        highlights: [
          "Alles aus Grow, plus:",
          "5 Unterseiten · 2 Sprachen · 2 CMS",
          "6 Social-Visuals + E-Mail-Signatur",
        ],
        config: { baseMonthly: 40 },
      },
    ],
    compare: [
      {
        label: "Website-Basis (responsiv · SEO · SSL)",
        values: {
          "bundle-launch": true,
          "bundle-grow": true,
          "bundle-full": true,
        },
      },
      {
        label: "Komplettes Branding (Logo · Guide · VK · Briefpapier)",
        values: {
          "bundle-launch": true,
          "bundle-grow": true,
          "bundle-full": true,
        },
      },
      {
        label: "3 Social-Templates",
        values: {
          "bundle-launch": true,
          "bundle-grow": true,
          "bundle-full": true,
        },
      },
      {
        label: "Unterseiten",
        values: {
          "bundle-launch": "onepager",
          "bundle-grow": "3 stk",
          "bundle-full": "5 stk",
        },
      },
      {
        label: "CMS-Bereiche (selbst pflegbar)",
        values: {
          "bundle-launch": false,
          "bundle-grow": "1 bereich",
          "bundle-full": "2 bereiche",
        },
      },
      {
        label: "Mehrsprachigkeit",
        values: {
          "bundle-launch": false,
          "bundle-grow": false,
          "bundle-full": "2 sprachen",
        },
      },
      {
        label: "6 Social-Media-Visuals",
        values: {
          "bundle-launch": false,
          "bundle-grow": false,
          "bundle-full": true,
        },
      },
      {
        label: "E-Mail-Signatur",
        values: {
          "bundle-launch": false,
          "bundle-grow": false,
          "bundle-full": true,
        },
      },
      {
        label: "Domain + Mail-Postfächer zubuchbar",
        values: {
          "bundle-launch": true,
          "bundle-grow": true,
          "bundle-full": true,
        },
      },
      {
        label: "Bundle-Ersparnis",
        values: {
          "bundle-launch": "260 €",
          "bundle-grow": "400 €",
          "bundle-full": "600 €",
        },
      },
    ],
  },
];

/* ══════════════════════════ component ══════════════════════════ */

type CfgState = Record<string, { hasDomain: boolean; mails: number }>;

/**
 * Default-state für alle konfigurierbaren pakete:
 * - hasDomain: false   → user braucht noch eine (laconis registriert mit · +2€/Mt)
 * - mails:    1        → jeder normale kunde will mindestens eine info@-adresse
 * Ergibt z.B. bei Basis: 20 + 2 + 5 = 27 €/Mt startpreis, ehrlich statt versteckt.
 */
function initialCfg(): CfgState {
  const s: CfgState = {};
  TABS.forEach((t) =>
    t.pakete.forEach((p) => {
      if (p.config) s[p.id] = { hasDomain: false, mails: 1 };
    }),
  );
  return s;
}

export function PaketTabs() {
  const [tab, setTab] = useState<TabId>("web");
  const [cfg, setCfg] = useState<CfgState>(() => initialCfg());
  const [compareOpen, setCompareOpen] = useState(false);

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  const toggleDomain = (id: string, value: boolean) =>
    setCfg((s) => ({ ...s, [id]: { ...s[id], hasDomain: value } }));

  const changeMails = (id: string, delta: number) =>
    setCfg((s) => ({
      ...s,
      [id]: {
        ...s[id],
        mails: Math.max(0, Math.min(99, s[id].mails + delta)),
      },
    }));

  // beim tab-wechsel: vergleich schliessen, damit der user nicht
  // verwirrt die falsche tabelle sieht · plus analytics
  const switchTab = (next: TabId) => {
    if (next === tab) return;
    track({ type: "paket_tab_switched", from: tab, to: next });
    setTab(next);
    setCompareOpen(false);
  };

  return (
    <div>
      {/* TAB ROW */}
      <div
        role="tablist"
        aria-label="pakete kategorie"
        className="inline-flex rounded-full border border-ink/10 bg-ink/[0.03] p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => switchTab(t.id)}
            className={[
              "min-h-[44px] px-5 py-3 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all",
              tab === t.id
                ? "bg-lime text-[#111]"
                : "text-offwhite/55 hover:text-offwhite",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-[560px] text-[13px] leading-relaxed text-offwhite/55">
        {activeTab.subLabel}
      </p>

      {/* CARDS · slim */}
      <div
        key={tab}
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5 animate-in fade-in duration-300"
      >
        {activeTab.pakete.map((p) => {
          const state = p.config ? cfg[p.id] : null;
          return (
            <PaketCard
              key={p.id}
              paket={p}
              tab={tab}
              state={state}
              onToggleDomain={(v) => toggleDomain(p.id, v)}
              onChangeMails={(d) => changeMails(p.id, d)}
            />
          );
        })}
      </div>

      {/* COMPARE TOGGLE */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setCompareOpen((v) => !v)}
          aria-expanded={compareOpen}
          className="group inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-ink/[0.03] hover:border-lime/50 hover:bg-lime/[0.04] px-5 py-2.5 font-mono text-[11px] uppercase tracking-mono text-offwhite/75 hover:text-accent-ink transition-all"
        >
          <span>
            {compareOpen
              ? "vergleich zuklappen"
              : "alle leistungen vergleichen"}
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className={[
              "transition-transform",
              compareOpen ? "rotate-180" : "",
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
      </div>

      {/* COMPARE TABLE · collapsible */}
      <AnimatePresence initial={false}>
        {compareOpen && (
          <motion.div
            key={`compare-${tab}`}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 32,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            className="overflow-hidden"
          >
            <CompareTable tabDef={activeTab} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER NOTE */}
      <p className="mt-10 text-[12px] leading-relaxed text-offwhite/55 max-w-[760px]">
        Alle Preise verstehen sich als Startpreis („ab") · exkl. MwSt · Hosting
        immer bei lacønis · jährlich fakturiert · Domain ab 2 €/Mt (kann je
        nach Domain variieren) · E-Mail 5 €/Mt pro Mailbox · im nächsten
        Schritt kannst du Zusatzseiten, Sprachen, CMS-Bereiche und Extras
        hinzufügen — Preis passt sich live an.
      </p>
    </div>
  );
}

/* ══════════════════════════ compare-table ══════════════════════════ */

function CompareTable({ tabDef }: { tabDef: TabDef }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* header */}
      <div className="grid grid-cols-[minmax(180px,1.4fr)_repeat(3,1fr)] border-b border-ink/10 bg-ink/[0.03]">
        <div className="px-5 py-4 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
          leistung
        </div>
        {tabDef.pakete.map((p) => (
          <div
            key={p.id}
            className="px-3 py-4 text-center border-l border-ink/10"
          >
            <div
              className={[
                "font-mono text-[10px] uppercase tracking-label",
                p.featured ? "text-accent-ink" : "text-offwhite/75",
              ].join(" ")}
            >
              {p.name}
            </div>
            <div className="mt-1 heading-display text-[15px] tabular-nums text-offwhite/100">
              {p.price.toLocaleString("de-DE")} €
            </div>
          </div>
        ))}
      </div>

      {/* rows */}
      {tabDef.compare.map((row, i) => (
        <div
          key={row.label + i}
          className={[
            "grid grid-cols-[minmax(180px,1.4fr)_repeat(3,1fr)]",
            i < tabDef.compare.length - 1 ? "border-b border-ink/10" : "",
          ].join(" ")}
        >
          <div className="px-5 py-3.5 text-[13px] leading-snug text-offwhite/75">
            {row.label}
          </div>
          {tabDef.pakete.map((p) => {
            const v = row.values[p.id];
            return (
              <div
                key={p.id}
                className="px-3 py-3.5 text-center border-l border-ink/10 flex items-center justify-center"
              >
                <CompareCell value={v} featured={p.featured} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CompareCell({
  value,
  featured,
}: {
  value: boolean | string | undefined;
  featured?: boolean;
}) {
  if (value === true) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-label="enthalten"
        className={featured ? "text-accent-ink" : "text-lime/80"}
      >
        <path
          d="M3 8L7 12L13 4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (value === false || value === undefined) {
    return (
      <span
        aria-label="nicht enthalten"
        className="inline-block h-[1.5px] w-4 rounded bg-offwhite/20"
      />
    );
  }
  return (
    <span
      className={[
        "font-mono text-[11px] tabular-nums",
        featured ? "text-accent-ink" : "text-offwhite/75",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

/* ══════════════════════════ slim card ══════════════════════════ */

function PaketCard({
  paket,
  tab,
  state,
  onToggleDomain,
  onChangeMails,
}: {
  paket: Paket;
  tab: TabId;
  state: { hasDomain: boolean; mails: number } | null;
  onToggleDomain: (v: boolean) => void;
  onChangeMails: (delta: number) => void;
}) {
  // hasDomain=true → user hat eigene domain (kein extra) · false → +2 €/Mt
  const monthly =
    paket.config && state
      ? paket.config.baseMonthly +
        (state.hasDomain ? 0 : 2) +
        state.mails * 5
      : null;

  const detailParts: string[] = [];
  if (paket.config && state) {
    detailParts.push("hosting");
    if (!state.hasDomain) detailParts.push("+ domain");
    if (state.mails > 0)
      detailParts.push(`${state.mails} mail${state.mails > 1 ? "s" : ""}`);
  }

  return (
    <div
      className={[
        "relative rounded-2xl p-7 md:p-8 flex flex-col transition-all",
        paket.featured
          ? "glass border border-lime/50 shadow-[0_24px_60px_-28px_rgb(var(--accent) / 0.25)]"
          : "glass glass-hover",
      ].join(" ")}
    >
      {/* TOP: num + optional featured chip */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
          {paket.num}
        </span>
        {paket.featured && (
          <span className="font-mono text-[9px] uppercase tracking-label bg-lime text-black px-2 py-0.5 rounded-full">
            ★ empfohlen
          </span>
        )}
      </div>

      {/* NAME + TAGLINE */}
      <div className="mt-5">
        <h3 className="heading-sans text-[24px] md:text-[26px] text-offwhite">
          {paket.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-snug text-offwhite/55">
          {paket.tagline}
        </p>
      </div>

      {/* PRICE · „ab"-framing signalisiert: das ist der startpreis, extras möglich */}
      <div className="mt-6 pt-6 border-t border-ink/10">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
            ab
          </span>
          <span
            className={[
              "heading-display text-[32px] leading-none tabular-nums",
              paket.featured ? "text-accent-ink" : "text-offwhite",
            ].join(" ")}
          >
            <CounterUp value={paket.price} resetOnViewEnter /> €
          </span>
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            einmalig
          </span>
        </div>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
          zzgl. mwst · im nächsten schritt anpassbar
        </div>
        {paket.einzeln && paket.saving && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-[10.5px] line-through text-offwhite/35 tabular-nums">
              einzeln {paket.einzeln.toLocaleString("de-DE")} €
            </span>
            <span className="font-mono text-[10.5px] text-accent-ink tabular-nums">
              − {paket.saving.toLocaleString("de-DE")} €
            </span>
          </div>
        )}
      </div>

      {/* HIGHLIGHTS · kernpunkte · optional mit mini-beschreibung */}
      <ul className="mt-6 space-y-3 flex-1">
        {paket.highlights.map((h, i) => {
          const label = typeof h === "string" ? h : h.label;
          const note = typeof h === "string" ? null : h.note;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] leading-snug text-offwhite/75"
            >
              <span className="text-accent-ink mt-[6px] shrink-0">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 5L4 8L9 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="flex flex-col gap-0.5">
                <span>{label}</span>
                {note && (
                  <span className="text-[11px] leading-snug text-offwhite/35">
                    {note}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {/* CONFIG — nur web + bundle */}
      {paket.config && state && monthly !== null && (
        <div className="mt-6 glass rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              domain vorhanden?
            </span>
            <div className="inline-flex rounded-full border border-ink/10 bg-dark p-0.5">
              <button
                type="button"
                aria-pressed={state.hasDomain}
                onClick={() => onToggleDomain(true)}
                className={[
                  "px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-mono transition-colors",
                  state.hasDomain
                    ? "bg-lime text-black"
                    : "text-offwhite/55 hover:text-offwhite",
                ].join(" ")}
              >
                ja
              </button>
              <button
                type="button"
                aria-pressed={!state.hasDomain}
                onClick={() => onToggleDomain(false)}
                className={[
                  "px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-mono transition-colors",
                  !state.hasDomain
                    ? "bg-lime text-black"
                    : "text-offwhite/55 hover:text-offwhite",
                ].join(" ")}
              >
                nein
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              e-mail-adressen
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-dark px-1 py-0.5">
              <button
                type="button"
                onClick={() => onChangeMails(-1)}
                disabled={state.mails === 0}
                aria-label="e-mail-adresse entfernen"
                className="w-6 h-6 rounded-full flex items-center justify-center text-offwhite/55 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                −
              </button>
              <span className="font-mono text-[11px] tabular-nums text-offwhite min-w-[12px] text-center">
                {state.mails}
              </span>
              <button
                type="button"
                onClick={() => onChangeMails(1)}
                aria-label="e-mail-adresse hinzufügen"
                className="w-6 h-6 rounded-full flex items-center justify-center text-offwhite/55 hover:text-accent-ink transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-3 mt-1 border-t border-ink/10">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                laufend
              </span>
              <span
                className={[
                  "heading-sans text-[18px] tabular-nums transition-all",
                  paket.featured ? "text-accent-ink" : "text-offwhite",
                ].join(" ")}
                key={monthly}
              >
                {monthly} €/Mt
              </span>
            </div>
            <div className="mt-1 text-right font-mono text-[9.5px] lowercase tracking-mono text-offwhite/35">
              {detailParts.join(" · ")}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8">
        <Button
          href={buildKontaktHref(paket, state)}
          variant={paket.featured ? "primary" : "glass"}
          size="md"
          className="w-full !justify-center"
          onClick={() =>
            track({ type: "paket_selected", paket: paket.id, tab })
          }
        >
          paket wählen / anpassen →
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════ url-param-handoff ══════════════════════════ */

function buildKontaktHref(
  paket: Paket,
  state: { hasDomain: boolean; mails: number } | null,
): string {
  const params = new URLSearchParams();
  params.set("paket", paket.id);
  if (state) {
    // domain + mails IMMER mitgeben, damit der kontakt-step die explizite
    // user-wahl übernimmt und nicht auf den preset-default zurückfällt.
    params.set("domain", state.hasDomain ? "1" : "0");
    params.set("mails", String(state.mails));
  }
  return `/kontakt?${params.toString()}#projekt`;
}
