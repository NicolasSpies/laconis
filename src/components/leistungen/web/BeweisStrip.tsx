"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type Case = {
  slug: string;
  name: string;
  url: string;
  mobile: number;
  desktop: number;
  caseRef: string | null;
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  handLine: string;
  liveCta: string;
  footer: string;
  noteFabry: string;
  noteSelf: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "beweis",
    h2pre: "unter 90 geht nichts live.",
    h2post: "messbar, nicht gesprochen.",
    handLine: "ich optimier deine seite, bis google für dich brennt.",
    liveCta: "live testen ↗",
    footer: "klick auf „live testen\" · google misst selbst · keine screenshots, kein marketing.",
    noteFabry: "onepager · eigenes cms",
    noteSelf: "diese seite hier",
  },
  fr: {
    sectionLabel: "preuves",
    h2pre: "rien ne part en live sous 90.",
    h2post: "mesurable, pas du blabla.",
    handLine: "j'optimise ton site jusqu'à ce que google s'enflamme pour toi.",
    liveCta: "tester en live ↗",
    footer: "clique sur « tester en live » · google mesure lui-même · pas de screenshots, pas de marketing.",
    noteFabry: "onepage · cms maison",
    noteSelf: "ce site-ci",
  },
  en: {
    sectionLabel: "proof",
    h2pre: "nothing goes live under 90.",
    h2post: "measurable, not spoken.",
    handLine: "i tune your site until google catches fire for you.",
    liveCta: "test live ↗",
    footer: "click on \"test live\" · google measures itself · no screenshots, no marketing.",
    noteFabry: "onepager · own cms",
    noteSelf: "this site here",
  },
};

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

function BeweisZeile({ c, tilt, note, liveCta }: { c: Case; tilt: string; note?: string; liveCta: string }) {
  return (
    <div
      className="group relative py-3 md:py-3.5 border-b border-ink/10 last:border-b-0 flex flex-wrap items-baseline gap-x-5 gap-y-1.5"
      style={{ transform: `rotate(${tilt})`, transformOrigin: "left center" }}
    >
      <div className="flex items-baseline gap-3 min-w-0 flex-1">
        {c.caseRef ? (
          <Link
            href={c.caseRef}
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

      <div className="flex items-baseline gap-4 shrink-0">
        <Score label="m" value={c.mobile} />
        <Score label="d" value={c.desktop} />
      </div>

      {note && (
        <span className="font-hand text-[15px] text-offwhite/55 shrink-0 hidden md:inline">
          {note}
        </span>
      )}

      <a
        href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(
          `https://${c.url}`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] uppercase tracking-label text-offwhite/45 hover:text-accent-ink transition-colors shrink-0"
      >
        {liveCta}
      </a>
    </div>
  );
}

export function BeweisStrip({ num = "04" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);

  const CASES: { case: Case; note?: string }[] = [
    {
      case: { slug: "fabry", name: "fabry baumpflege", url: "fabry-baumpflege.be", mobile: 96, desktop: 98, caseRef: `${buildPath("referenzen", locale)}/fabry-baumpflege` },
      note: t.noteFabry,
    },
    {
      case: { slug: "laconis", name: "laconis", url: "laconis.be", mobile: 98, desktop: 99, caseRef: null },
      note: t.noteSelf,
    },
  ];

  return (
    <section className="pb-28 md:pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">{t.h2post}</span>
          </h2>

          <p
            className="mt-6 font-hand text-[22px] md:text-[26px] text-accent-ink leading-snug max-w-[640px]"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            {t.handLine}
          </p>
        </div>

        <div className="mt-10 md:mt-12 max-w-[920px]">
          <div className="glass rounded-xl px-5 md:px-7 py-2 md:py-3">
            {CASES.map((entry, i) => (
              <BeweisZeile
                key={entry.case.slug}
                c={entry.case}
                tilt={ROW_TILTS[i % ROW_TILTS.length]}
                note={entry.note}
                liveCta={t.liveCta}
              />
            ))}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
