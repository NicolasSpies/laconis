"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * PaketTabs — drei tabs (web · grafik · bundle), je drei pakete, jedes web/bundle-
 * paket mit mini-konfigurator (domain-toggle + mail-counter) und live-monatspreis.
 * Grafik-pakete haben keinen laufenden posten — nur einmalpreis.
 *
 * Referenz: files/laconis_pakete.html (1:1 übernommen in struktur + zahlen,
 * angepasst an laconis-style: keine emojis, nummern-chips, lowercase).
 */

/* ══════════════════════════ datenmodell ══════════════════════════ */

type MiniConfig = {
  /** basis-hosting pro monat in € */
  baseMonthly: number;
};

type Paket = {
  id: string;
  num: string;
  name: string;
  tagline: string;
  /** einmalpreis in € (ohne MwSt) */
  price: number;
  /** nur bei bundles — einzelpreis zur einsparungs-anzeige */
  einzeln?: number;
  /** nur bei bundles */
  saving?: number;
  /** erster item im feature-stack wenn gesetzt — „alles aus X, plus:" */
  inheritsFrom?: string;
  features: string[];
  featured?: boolean;
  /** undefined = kein laufender posten (grafik-pakete) */
  config?: MiniConfig;
};

type TabDef = {
  id: "web" | "grafik" | "bundle";
  label: string;
  subLabel: string;
  pakete: Paket[];
};

const TABS: TabDef[] = [
  {
    id: "web",
    label: "web",
    subLabel: "websites von einseiter bis mehrsprachig",
    pakete: [
      {
        id: "web-starter",
        num: "01",
        name: "Starter",
        tagline: "für selbständige & neugründer.",
        price: 1990,
        features: [
          "onepager · responsiv · SEO",
          "1 CMS-bereich · erweiterbar",
          "eigenes analytics-system inkl.",
          "kein cookie-banner nötig",
          "SSL + tägliche backups + monitoring",
          "kontaktformular · impressum · datenschutz",
          "einführungs-videocall",
          "weitere seiten & extras jederzeit zubuchbar",
        ],
        config: { baseMonthly: 20 },
      },
      {
        id: "web-standard",
        num: "02",
        name: "Standard",
        tagline: "für KMUs & lokalbetriebe.",
        price: 2890,
        inheritsFrom: "Starter",
        features: [
          "4 seiten inkl. · mehr jederzeit zubuchbar",
          "2 CMS-bereiche · erweiterbar",
        ],
        featured: true,
        config: { baseMonthly: 30 },
      },
      {
        id: "web-pro",
        num: "03",
        name: "Pro",
        tagline: "für wachsende unternehmen.",
        price: 3650,
        inheritsFrom: "Standard",
        features: [
          "6 seiten inkl. · mehr jederzeit zubuchbar",
          "3 CMS-bereiche · erweiterbar",
          "mehrsprachigkeit (2 sprachen inkl.)",
        ],
        config: { baseMonthly: 40 },
      },
    ],
  },
  {
    id: "grafik",
    label: "grafik",
    subLabel: "print, brand identity, social — ohne website",
    pakete: [
      {
        id: "grafik-print",
        num: "01",
        name: "Print",
        tagline: "für schnelle drucksachen.",
        price: 700,
        features: [
          "flyer beidseitig",
          "plakat (alle formate)",
          "rollup · gestaltung",
          "druckdaten druckfertig",
          "druck auf anfrage (+ aufschlag)",
        ],
      },
      {
        id: "grafik-brand",
        num: "02",
        name: "Brand Identity",
        tagline: "deine komplette identität.",
        price: 1200,
        features: [
          "logo · varianten · favicon",
          "mini brand guide",
          "visitenkarte",
          "briefpapier · DIN A4",
          "3 social-media-templates",
        ],
        featured: true,
      },
      {
        id: "grafik-social",
        num: "03",
        name: "Social",
        tagline: "für social-media-präsenz.",
        price: 600,
        features: [
          "6 social-media-visuals",
          "e-mail-signatur",
          "visitenkarte",
          "alle formate geliefert",
          "anpassungen auf anfrage",
        ],
      },
    ],
  },
  {
    id: "bundle",
    label: "bundle",
    subLabel: "web + grafik zusammen — mit nachlass",
    pakete: [
      {
        id: "bundle-launch",
        num: "01",
        name: "Launch",
        tagline: "web starter + brand identity.",
        price: 2990,
        einzeln: 3190,
        saving: 200,
        features: [
          "web Starter komplett inkl.",
          "logo · varianten · favicon",
          "mini brand guide",
          "visitenkarte + briefpapier",
          "3 social-media-templates",
          "alles im gleichen look — aus einer hand",
        ],
        config: { baseMonthly: 20 },
      },
      {
        id: "bundle-grow",
        num: "02",
        name: "Grow",
        tagline: "web standard + brand + social.",
        price: 3890,
        einzeln: 4540,
        saving: 650,
        inheritsFrom: "Launch",
        features: [
          "4 seiten statt onepager",
          "2 CMS-bereiche · erweiterbar",
          "3 social-media-visuals",
        ],
        featured: true,
        config: { baseMonthly: 30 },
      },
      {
        id: "bundle-full",
        num: "03",
        name: "Full Identity",
        tagline: "komplett von null auf fertig.",
        price: 5500,
        einzeln: 6650,
        saving: 1150,
        inheritsFrom: "Grow",
        features: [
          "6 seiten · 2 sprachen inkl.",
          "3 CMS-bereiche · erweiterbar",
          "6 social-media-visuals",
          "e-mail-signatur",
        ],
        config: { baseMonthly: 40 },
      },
    ],
  },
];

/* ══════════════════════════ component ══════════════════════════ */

type TabId = TabDef["id"];

type CfgState = Record<string, { hasDomain: boolean; mails: number }>;

function initialCfg(): CfgState {
  const s: CfgState = {};
  TABS.forEach((t) =>
    t.pakete.forEach((p) => {
      if (p.config) s[p.id] = { hasDomain: false, mails: 0 };
    })
  );
  return s;
}

export function PaketTabs() {
  const [tab, setTab] = useState<TabId>("web");
  const [cfg, setCfg] = useState<CfgState>(() => initialCfg());

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

  return (
    <div>
      {/* TAB ROW */}
      <div
        role="tablist"
        aria-label="pakete kategorie"
        className="inline-flex rounded-full border border-ink/15 bg-ink/[0.03] p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={[
              "px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all",
              tab === t.id
                ? "bg-lime text-[#111]"
                : "text-offwhite/60 hover:text-offwhite",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-[560px] text-[13px] leading-relaxed text-offwhite/50">
        {activeTab.subLabel}
      </p>

      {/* CARDS */}
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
              state={state}
              onToggleDomain={(v) => toggleDomain(p.id, v)}
              onChangeMails={(d) => changeMails(p.id, d)}
            />
          );
        })}
      </div>

      {/* FOOTER NOTE */}
      <p className="mt-8 text-[12px] leading-relaxed text-offwhite/45 max-w-[760px]">
        alle preise exkl. MwSt · hosting immer bei lacønis · jährlich
        fakturiert · domain ab 2 €/Mt · e-mail 5 €/Mt pro mailbox ·
        individuelle anpassungen auf anfrage.
      </p>
    </div>
  );
}

/* ══════════════════════════ card ══════════════════════════ */

function PaketCard({
  paket,
  state,
  onToggleDomain,
  onChangeMails,
}: {
  paket: Paket;
  state: { hasDomain: boolean; mails: number } | null;
  onToggleDomain: (v: boolean) => void;
  onChangeMails: (delta: number) => void;
}) {
  const monthly =
    paket.config && state
      ? paket.config.baseMonthly +
        (state.hasDomain ? 2 : 0) +
        state.mails * 5
      : null;

  const detailParts: string[] = [];
  if (paket.config && state) {
    detailParts.push("hosting");
    if (state.hasDomain) detailParts.push("domain");
    if (state.mails > 0)
      detailParts.push(`${state.mails} mail${state.mails > 1 ? "s" : ""}`);
  }

  return (
    <div
      className={[
        "relative rounded-2xl p-7 md:p-8 flex flex-col transition-all",
        paket.featured
          ? "border border-lime/40 bg-gradient-to-b from-lime/[0.04] to-transparent shadow-[0_24px_60px_-28px_rgba(225,253,82,0.25)]"
          : "border border-ink/10 bg-ink/[0.015] hover:border-ink/20",
      ].join(" ")}
    >
      {/* TOP: num + optional featured chip */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
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

      {/* PRICE */}
      <div className="mt-6 pt-6 border-t border-ink/8">
        <div className="flex items-baseline gap-2">
          <span className="heading-display text-[32px] text-accent-ink leading-none tabular-nums">
            {paket.price.toLocaleString("de-DE")} €
          </span>
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            einmalig
          </span>
        </div>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
          zzgl. mwst
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

      {/* CONFIG — nur web + bundle */}
      {paket.config && state && monthly !== null && (
        <div className="mt-5 rounded-xl border border-ink/10 bg-ink/[0.02] p-4 flex flex-col gap-3">
          {/* domain */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              domain vorhanden?
            </span>
            <div className="inline-flex rounded-full border border-ink/15 bg-dark p-0.5">
              <button
                type="button"
                aria-pressed={!state.hasDomain}
                onClick={() => onToggleDomain(false)}
                className={[
                  "px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-mono transition-colors",
                  !state.hasDomain
                    ? "bg-lime text-black"
                    : "text-offwhite/50 hover:text-offwhite",
                ].join(" ")}
              >
                nein
              </button>
              <button
                type="button"
                aria-pressed={state.hasDomain}
                onClick={() => onToggleDomain(true)}
                className={[
                  "px-3 py-1 rounded-full font-mono text-[9.5px] uppercase tracking-mono transition-colors",
                  state.hasDomain
                    ? "bg-lime text-black"
                    : "text-offwhite/50 hover:text-offwhite",
                ].join(" ")}
              >
                ja
              </button>
            </div>
          </div>

          {/* mails */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              e-mail-adressen
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-dark px-1 py-0.5">
              <button
                type="button"
                onClick={() => onChangeMails(-1)}
                disabled={state.mails === 0}
                aria-label="e-mail-adresse entfernen"
                className="w-6 h-6 rounded-full flex items-center justify-center text-offwhite/60 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
                className="w-6 h-6 rounded-full flex items-center justify-center text-offwhite/60 hover:text-accent-ink transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* monthly */}
          <div className="pt-3 mt-1 border-t border-ink/8">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                laufend
              </span>
              <span
                className="heading-sans text-[18px] text-accent-ink tabular-nums transition-all"
                key={monthly}
              >
                {monthly} €/Mt
              </span>
            </div>
            <div className="mt-1 text-right font-mono text-[9.5px] lowercase tracking-mono text-offwhite/40">
              {detailParts.join(" · ")}
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}
      <ul className="mt-6 space-y-2.5 flex-1">
        {paket.inheritsFrom && (
          <li className="text-[13px] leading-snug text-offwhite/80 font-medium">
            alles aus <span className="text-accent-ink">{paket.inheritsFrom}</span>, plus:
          </li>
        )}
        {paket.features.map((f, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13px] leading-snug text-offwhite/70"
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
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Button
          href={buildKontaktHref(paket, state)}
          variant={paket.featured ? "primary" : "glass"}
          size="md"
          className="w-full !justify-center"
        >
          {paket.featured ? "paket wählen →" : "anfragen →"}
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════ url-param-handoff ══════════════════════════
 * Baut einen link nach /kontakt#projekt?paket=...&domain=...&mails=...
 * Der multistep-formular liest die params aus und startet bei schritt 3.
 * In phase 1a wird das dort noch nicht ausgewertet — hash-anchor reicht für's erste.
 */
function buildKontaktHref(
  paket: Paket,
  state: { hasDomain: boolean; mails: number } | null
): string {
  const params = new URLSearchParams();
  params.set("paket", paket.id);
  if (state) {
    if (state.hasDomain) params.set("domain", "1");
    if (state.mails > 0) params.set("mails", String(state.mails));
  }
  return `/kontakt?${params.toString()}#projekt`;
}
