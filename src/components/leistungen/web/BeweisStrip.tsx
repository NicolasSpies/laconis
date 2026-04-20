"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BeweisStrip · 3 mini-case-cards mit lighthouse-scores.
 * manuell gepflegt (neue live-sites hier eintragen).
 * CTA: user kann eigene URL auf pagespeed.web.dev testen.
 *
 * skaliert mit projekten · platz für 3 cards, layout bleibt sauber.
 */

type Case = {
  slug: string;
  name: string;
  url: string;
  mobile: number;
  desktop: number;
  note: string;
  /** falls echte case-page existiert · sonst null */
  caseHref: string | null;
};

const CASES: Case[] = [
  {
    slug: "fabry",
    name: "fabry baumpflege",
    url: "fabry-baumpflege.be",
    mobile: 96,
    desktop: 98,
    note: "onepager · eupen",
    caseHref: "/referenzen/fabry-baumpflege",
  },
  {
    slug: "laconis",
    name: "lacønis",
    url: "laconis.be",
    mobile: 98,
    desktop: 99,
    note: "diese seite hier",
    caseHref: null,
  },
  // platzhalter · nächste live-seite kommt hier rein
];

function ScoreBlock({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const tone =
    value >= 95
      ? "text-accent-ink"
      : value >= 80
        ? "text-offwhite"
        : "text-orange-400";
  return (
    <div className="flex-1">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
          {label}
        </span>
        <span className={`heading-sans text-[22px] ${tone} tabular-nums`}>
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-[3px] w-full rounded-full bg-ink/10 overflow-hidden">
        <div
          className="h-full bg-lime rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <div className="group rounded-xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-5 md:p-6 hover:border-lime/25 transition-colors flex flex-col">
      {/* url · name */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="heading-sans text-[17px] text-offwhite lowercase">
          {c.name}
        </h3>
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 shrink-0">
          {c.note}
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] lowercase tracking-mono text-offwhite/55">
        {c.url}
      </p>

      {/* scores */}
      <div className="mt-6 space-y-3.5">
        <ScoreBlock label="mobile" value={c.mobile} />
        <ScoreBlock label="desktop" value={c.desktop} />
      </div>

      {/* footer links */}
      <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-between gap-3">
        {c.caseHref ? (
          <Link
            href={c.caseHref}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 group-hover:text-accent-ink transition-colors"
          >
            case ansehen →
          </Link>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            ·
          </span>
        )}
        <a
          href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(
            `https://${c.url}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
        >
          ↗ live testen
        </a>
      </div>
    </div>
  );
}

function EmptyCardSlot() {
  return (
    <div className="rounded-xl border border-dashed border-ink/10 p-5 md:p-6 flex flex-col items-center justify-center min-h-[260px] text-center">
      <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
        nächster launch
      </span>
      <p className="mt-3 font-hand text-[22px] text-offwhite/35 leading-tight">
        bald mehr.
      </p>
    </div>
  );
}

export function BeweisStrip({ num = "04" }: { num?: string } = {}) {
  // füllt immer auf 3 karten auf, auch wenn weniger cases da sind
  const slots = [0, 1, 2];

  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>beweis</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            kein marketing-versprechen.{" "}
            <span className="text-offwhite/35">messbar.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            jede seite, die ich launche, kommt mit lighthouse 95+ raus. das
            ist nicht geschönt · google misst das selbst, du kannst es live
            testen.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {slots.map((i) =>
            CASES[i] ? (
              <CaseCard key={CASES[i].slug} c={CASES[i]} />
            ) : (
              <EmptyCardSlot key={`empty-${i}`} />
            ),
          )}
        </div>

        {/* eigene URL testen */}
        <div className="mt-10 rounded-xl border border-lime/25 bg-lime/[0.04] px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              kein vertrauen in screenshots?
            </p>
            <p className="mt-1.5 text-[14px] text-offwhite/75">
              testest du meine (oder deine eigene) seite direkt bei google.
            </p>
          </div>
          <a
            href="https://pagespeed.web.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-mono text-[12px] lowercase tracking-mono rounded-full px-5 py-2.5 bg-lime text-[#111] border border-lime hover:bg-transparent hover:text-accent-ink hover:shadow-[0_0_32px_0_rgba(225,253,82,0.3)] transition-all shrink-0"
          >
            pagespeed insights öffnen ↗
          </a>
        </div>
      </div>
    </section>
  );
}
