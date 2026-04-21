"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BeweisStrip · kompakte live-tabelle.
 * 1 zeile pro site · leicht rotierte scribble-einträge · live testen ↗ pro seite.
 * Minimaler platzverbrauch, handmade-feel, keine großen card-kacheln.
 *
 * Skaliert: neue sites einfach unten anhängen.
 */

type Case = {
  slug: string;
  name: string;
  url: string;
  mobile: number;
  desktop: number;
  note?: string;
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
    note: "eupen · onepager",
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
];

/** deterministisches „wackeln" pro zeile, damit's nicht zu streng wirkt */
const ROW_TILTS = ["-0.4deg", "0.3deg", "-0.25deg", "0.35deg"];

function Score({ label, value }: { label: string; value: number }) {
  const tone =
    value >= 95
      ? "text-accent-ink"
      : value >= 80
        ? "text-offwhite"
        : "text-orange-400";
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/45">
        {label}
      </span>
      <span className={`font-mono text-[14px] tabular-nums ${tone}`}>
        {value}
      </span>
    </span>
  );
}

function BeweisZeile({ c, tilt }: { c: Case; tilt: string }) {
  return (
    <div
      className="group relative py-3 md:py-3.5 border-b border-ink/10 last:border-b-0 flex flex-wrap items-baseline gap-x-5 gap-y-1.5"
      style={{ transform: `rotate(${tilt})`, transformOrigin: "left center" }}
    >
      {/* name + url */}
      <div className="flex items-baseline gap-3 min-w-0 flex-1">
        {c.caseHref ? (
          <Link
            href={c.caseHref}
            className="heading-sans text-[17px] md:text-[19px] text-offwhite lowercase group-hover:text-accent-ink transition-colors shrink-0"
          >
            {c.name}
          </Link>
        ) : (
          <span className="heading-sans text-[17px] md:text-[19px] text-offwhite lowercase shrink-0">
            {c.name}
          </span>
        )}
        <span className="font-mono text-[10px] lowercase tracking-mono text-offwhite/45 truncate">
          {c.url}
        </span>
      </div>

      {/* scores · mobile / desktop */}
      <div className="flex items-baseline gap-4 shrink-0">
        <Score label="m" value={c.mobile} />
        <Score label="d" value={c.desktop} />
      </div>

      {/* note */}
      {c.note && (
        <span className="font-hand text-[15px] text-offwhite/55 shrink-0 hidden md:inline">
          {c.note}
        </span>
      )}

      {/* live testen */}
      <a
        href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(
          `https://${c.url}`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 hover:text-accent-ink transition-colors shrink-0"
      >
        live testen ↗
      </a>
    </div>
  );
}

export function BeweisStrip({ num = "04" }: { num?: string } = {}) {
  return (
    <section className="pb-28 md:pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num={num}>beweis</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
            unter 90 geht nichts live.{" "}
            <span className="text-offwhite/35">messbar, nicht gesprochen.</span>
          </h2>

          {/* handschriftliche one-liner · setzt ton */}
          <p
            className="mt-6 font-hand text-[22px] md:text-[26px] text-accent-ink leading-snug max-w-[640px]"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            ich optimier deine seite, bis google für dich brennt.
          </p>
        </div>

        {/* kompakte live-liste · 1 zeile pro site */}
        <div className="mt-10 md:mt-12 max-w-[920px]">
          <div className="glass rounded-xl px-5 md:px-7 py-2 md:py-3">
            {CASES.map((c, i) => (
              <BeweisZeile
                key={c.slug}
                c={c}
                tilt={ROW_TILTS[i % ROW_TILTS.length]}
              />
            ))}
          </div>

          {/* fußzeile · ehrliche note */}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            klick auf „live testen" · google misst selbst · keine screenshots,
            kein marketing.
          </p>
        </div>
      </div>
    </section>
  );
}
