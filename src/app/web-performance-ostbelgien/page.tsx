import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";

/**
 * Web Performance Index Ostbelgien (phase 5 · das 100x-play).
 *
 * öffentliche, monatlich aktualisierte lighthouse-rangliste der lokalen
 * websites · laconis steht durch MESSUNG vorne, nicht durch behauptung.
 *
 * - server component · liest das neueste JSON aus scripts/perf-index/data/
 * - hybrid-naming: KMU/eigene projekte namentlich, direkte konkurrenten
 *   als stabile aliase ("agentur a" …) · politik-schonend, trend-fähig
 * - solange daten demo: true tragen → demo-banner + noindex + nicht in
 *   sitemap/nav · geht erst live wenn der erste echte lauf durch ist
 * - DE-only bis zum launch · i18n-routes + Dataset-JSON-LD kommen mit
 *   dem go-live (page ist bis dahin noindex · schema wäre verschenkt)
 */

export const metadata: Metadata = {
  title: "web performance index ostbelgien",
  description:
    "Monatlicher Lighthouse-Vergleich der Websites in Ostbelgien · transparent gemessen, ehrlich gerankt. Mobile-Scores, Ladezeiten, Seitengewicht.",
  robots: { index: false, follow: false }, // noindex bis erste echte messung
};

type Measurement = {
  id: string;
  score?: number;
  lcpMs?: number;
  cls?: number;
  tbtMs?: number;
  transferKb?: number;
  runs?: number;
  error?: string;
};

type MonthData = {
  month: string;
  lighthouseVersion: string;
  formFactor: string;
  runsPerSite: number;
  generatedAt: string;
  demo?: boolean;
  measurements: Measurement[];
};

type Site = {
  id: string;
  url: string;
  displayMode: "named" | "anonymous";
  displayName: string;
  stack?: string;
  notiz?: string;
};

async function loadData(): Promise<{
  current: MonthData;
  previous: MonthData | null;
  sites: Site[];
}> {
  const base = path.join(process.cwd(), "scripts", "perf-index");
  const sitesRaw = await readFile(path.join(base, "sites.json"), "utf8");
  const { sites } = JSON.parse(sitesRaw) as { sites: Site[] };

  const dataDir = path.join(base, "data");
  const files = (await readdir(dataDir))
    .filter((f) => /^\d{4}-\d{2}\.json$/.test(f))
    .sort()
    .reverse();
  const current = JSON.parse(
    await readFile(path.join(dataDir, files[0]), "utf8"),
  ) as MonthData;
  const previous =
    files.length > 1
      ? (JSON.parse(
          await readFile(path.join(dataDir, files[1]), "utf8"),
        ) as MonthData)
      : null;

  return { current, previous, sites };
}

const MONTH_NAMES: Record<string, string> = {
  "01": "januar", "02": "februar", "03": "märz", "04": "april",
  "05": "mai", "06": "juni", "07": "juli", "08": "august",
  "09": "september", "10": "oktober", "11": "november", "12": "dezember",
};

function formatMonth(key: string): string {
  const [y, m] = key.split("-");
  return `${MONTH_NAMES[m] ?? m} ${y}`;
}

function scoreColor(score: number): string {
  if (score >= 90) return "#e1fd52";
  if (score >= 50) return "#f2a33c";
  return "#e0604f";
}

export default async function Page() {
  const { current, previous, sites } = await loadData();
  const siteById = new Map(sites.map((s) => [s.id, s]));

  const ranked = current.measurements
    .filter((m) => !m.error && typeof m.score === "number")
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const prevRankById = new Map<string, number>();
  if (previous) {
    previous.measurements
      .filter((m) => !m.error && typeof m.score === "number")
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .forEach((m, i) => prevRankById.set(m.id, i + 1));
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-10">
        <div className="container-site">
          <p className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
            · web performance index · ostbelgien
          </p>
          <h1 className="heading-display mt-5 text-[clamp(2.5rem,7vw,5.5rem)] text-offwhite leading-[0.95] max-w-[900px]">
            wer lädt hier eigentlich am schnellsten?
          </h1>
          <p className="mt-7 max-w-[640px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/70">
            jeden monat messe ich die websites der region mit google
            lighthouse · gleiche bedingungen für alle, median aus{" "}
            {current.runsPerSite} läufen, mobile. keine meinung, nur messung ·
            meine eigenen projekte stehen mit drin und werden exakt gleich
            behandelt.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            stand · {formatMonth(current.month)} · lighthouse v
            {current.lighthouseVersion} · mobile
          </p>
        </div>
      </section>

      {/* DEMO-BANNER · verschwindet mit dem ersten echten lauf */}
      {current.demo && (
        <section className="pb-10">
          <div className="container-site">
            <div className="border-2 border-[#f2a33c]/60 rounded-xl px-6 py-4 max-w-[760px]">
              <p className="font-mono text-[10px] uppercase tracking-label text-[#b8801f]">
                ⚠ demo-daten · layout-vorschau
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-offwhite/65">
                diese zahlen sind platzhalter. die erste echte messung läuft,
                bevor diese seite veröffentlicht wird · bis dahin ist sie für
                suchmaschinen gesperrt (noindex).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* RANGLISTE */}
      <section className="pb-20">
        <div className="container-site">
          <div className="border-t-2 border-[#0a0a0a]/15">
            {ranked.map((m, i) => {
              const site = siteById.get(m.id);
              if (!site) return null;
              const rank = i + 1;
              const prevRank = prevRankById.get(m.id);
              const trend =
                prevRank == null
                  ? null
                  : prevRank > rank
                    ? "↑"
                    : prevRank < rank
                      ? "↓"
                      : "→";
              const isLaconis = m.id === "laconis";
              const isOwn = site.notiz?.includes("laconis");

              return (
                <div
                  key={m.id}
                  className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-6 md:py-7 border-b-2 border-[#0a0a0a]/15 ${
                    isLaconis ? "bg-[#e1fd52]/15 -mx-4 px-4 rounded-lg" : ""
                  }`}
                >
                  {/* rang */}
                  <span className="shrink-0 w-[56px] font-display font-black text-[26px] md:text-[30px] text-[#0a0a0a] tabular-nums leading-none">
                    {String(rank).padStart(2, "0")}
                    {trend && (
                      <span className="ml-1 text-[14px] align-middle text-[#0a0a0a]/45">
                        {trend}
                      </span>
                    )}
                  </span>

                  {/* name + stack */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black lowercase text-[20px] md:text-[24px] tracking-[-0.02em] text-[#0a0a0a] leading-tight">
                      {site.displayMode === "named" ? (
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw"
                        >
                          {site.displayName}
                        </a>
                      ) : (
                        site.displayName
                      )}
                      {isOwn && !isLaconis && (
                        <span className="ml-2 align-middle font-mono text-[8px] uppercase tracking-label px-2 py-0.5 rounded-full border border-[#0a0a0a]/25 text-[#0a0a0a]/55">
                          laconis-projekt
                        </span>
                      )}
                    </p>
                    {site.stack && (
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-label text-[#0a0a0a]/45">
                        {site.stack}
                        {site.notiz && site.displayMode === "anonymous"
                          ? ` · ${site.notiz}`
                          : ""}
                      </p>
                    )}
                  </div>

                  {/* metriken */}
                  <div className="flex items-center gap-5 md:gap-7 shrink-0">
                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-label text-[#0a0a0a]/40">
                        lcp
                      </p>
                      <p className="font-mono text-[12px] text-[#0a0a0a]/75 tabular-nums">
                        {((m.lcpMs ?? 0) / 1000).toFixed(1)}s
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-label text-[#0a0a0a]/40">
                        gewicht
                      </p>
                      <p className="font-mono text-[12px] text-[#0a0a0a]/75 tabular-nums">
                        {((m.transferKb ?? 0) / 1024).toFixed(1)}mb
                      </p>
                    </div>
                    {/* score · big · dark fill damit lime-ring auf
                        papier-hell trägt (lime pur wäre unsichtbar) */}
                    <div
                      className="w-[64px] h-[64px] rounded-full grid place-items-center border-[3px] bg-[#0a0a0a]"
                      style={{ borderColor: scoreColor(m.score ?? 0) }}
                    >
                      <span
                        className="font-display font-black text-[20px] tabular-nums"
                        style={{ color: scoreColor(m.score ?? 0) }}
                      >
                        {m.score}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 max-w-[680px] font-mono text-[10px] uppercase tracking-label text-offwhite/45 leading-relaxed">
            direkte mitbewerber werden anonymisiert geführt (stabile aliase ·
            trends bleiben vergleichbar) · lokale betriebe &amp; eigene
            projekte namentlich. dein betrieb soll rein oder raus? schreib
            mir.
          </p>
        </div>
      </section>

      {/* METHODIK-KURZ + CTA · gleiche text-row-sprache wie service-pages */}
      <section className="pb-28">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] border-t-2 border-[#0a0a0a]/15">
            <div className="py-8 border-b-2 border-[#0a0a0a]/15 md:border-b-0 md:border-r-2 md:pr-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                methodik
              </span>
              <p className="mt-2 text-[14px] leading-relaxed text-[#0a0a0a]/70">
                google lighthouse v{current.lighthouseVersion}, mobile-preset
                (4x cpu-throttle), {current.runsPerSite} läufe pro site,
                median. gemessen wird die startseite. alle sites unter
                identischen bedingungen, eigene projekte inklusive.
              </p>
            </div>
            <div className="py-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                deine site lädt zu langsam?
              </span>
              <p className="mt-2 text-[16px] md:text-[18px] text-[#0a0a0a] font-medium tracking-[-0.01em]">
                ich sag dir kostenlos woran&apos;s liegt · 15 minuten, ehrlich.
              </p>
              <Link
                href="/kontakt"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-5 py-3 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
              >
                kontakt aufnehmen →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
