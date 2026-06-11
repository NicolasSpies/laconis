#!/usr/bin/env node
/**
 * Web Performance Index Ostbelgien · lighthouse-runner.
 *
 * misst alle sites aus sites.json · RUNS_PER_SITE läufe pro site (mobile),
 * nimmt den MEDIAN (einzelläufe schwanken durch netz/cpu) · schreibt
 * data/YYYY-MM.json das die index-page server-seitig liest.
 *
 * usage:
 *   node scripts/perf-index/run.mjs                  # voller lauf (alle sites)
 *   node scripts/perf-index/run.mjs --site laconis   # nur eine site
 *   node scripts/perf-index/run.mjs --runs 3         # läufe überschreiben
 *
 * voraussetzungen:
 *   - chrome installiert (lighthouse startet headless chrome)
 *   - npx lädt lighthouse on-demand · kein projekt-dependency-bloat
 *
 * fairness-regeln (siehe methodik-page):
 *   - alle sites: gleiche lighthouse-version, gleiches throttling (mobile,
 *     simulated 4x cpu slowdown · lighthouse-default)
 *   - median aus RUNS_PER_SITE läufen · keine rosinen-pickerei
 *   - gemessen wird die STARTSEITE (https, follow redirects)
 *   - eigene projekte (laconis, kunden) werden identisch gemessen
 *
 * cron-empfehlung: monatlich am 1. um 03:00 ·
 *   0 3 1 * * cd /pfad/zu/laconis && node scripts/perf-index/run.mjs
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* execFile mit arg-array · kein shell-string, keine injection-fläche */
const runFile = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RUNS_PER_SITE = 5;
const LIGHTHOUSE_VERSION = "12"; // major pinnen · methodik-konsistenz

const args = process.argv.slice(2);
const onlySite = args.includes("--site")
  ? args[args.indexOf("--site") + 1]
  : null;
const runsOverride = args.includes("--runs")
  ? parseInt(args[args.indexOf("--runs") + 1], 10)
  : null;
const runs = runsOverride ?? RUNS_PER_SITE;

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

async function lighthouseRun(url) {
  /* headless chrome · json auf stdout · nur performance-kategorie */
  const { stdout } = await runFile(
    "npx",
    [
      "-y",
      `lighthouse@${LIGHTHOUSE_VERSION}`,
      url,
      "--quiet",
      "--output=json",
      "--output-path=stdout",
      "--only-categories=performance",
      "--chrome-flags=--headless=new --no-sandbox",
      "--max-wait-for-load=60000",
    ],
    { maxBuffer: 64 * 1024 * 1024, timeout: 180_000 },
  );
  const report = JSON.parse(stdout);
  const audits = report.audits;
  return {
    score: Math.round((report.categories.performance.score ?? 0) * 100),
    lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
    cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
    tbt: audits["total-blocking-time"]?.numericValue ?? null,
    fcp: audits["first-contentful-paint"]?.numericValue ?? null,
    transferKb: Math.round(
      (audits["total-byte-weight"]?.numericValue ?? 0) / 1024,
    ),
  };
}

async function measureSite(site) {
  console.log(`\n→ ${site.id} (${site.url}) · ${runs} läufe`);
  const results = [];
  for (let i = 0; i < runs; i++) {
    try {
      const r = await lighthouseRun(site.url);
      results.push(r);
      console.log(`   lauf ${i + 1}/${runs} · score ${r.score}`);
    } catch (err) {
      console.warn(
        `   lauf ${i + 1}/${runs} · FEHLER: ${err.message?.substring(0, 120)}`,
      );
    }
  }
  if (results.length === 0) {
    return {
      id: site.id,
      error: "alle läufe fehlgeschlagen",
      measuredAt: new Date().toISOString(),
    };
  }
  return {
    id: site.id,
    score: Math.round(median(results.map((r) => r.score))),
    lcpMs: Math.round(median(results.map((r) => r.lcp ?? 0))),
    cls: Number(median(results.map((r) => r.cls ?? 0)).toFixed(3)),
    tbtMs: Math.round(median(results.map((r) => r.tbt ?? 0))),
    transferKb: Math.round(median(results.map((r) => r.transferKb))),
    runs: results.length,
    measuredAt: new Date().toISOString(),
  };
}

async function main() {
  const sitesRaw = await readFile(path.join(__dirname, "sites.json"), "utf8");
  const { sites } = JSON.parse(sitesRaw);
  const targets = onlySite ? sites.filter((s) => s.id === onlySite) : sites;
  if (targets.length === 0) {
    console.error(`site "${onlySite}" nicht in sites.json gefunden`);
    process.exit(1);
  }

  console.log(
    `Web Performance Index · ${targets.length} sites · lighthouse@${LIGHTHOUSE_VERSION} · mobile`,
  );

  const measurements = [];
  for (const site of targets) {
    measurements.push(await measureSite(site));
  }

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const out = {
    month: monthKey,
    lighthouseVersion: LIGHTHOUSE_VERSION,
    formFactor: "mobile",
    runsPerSite: runs,
    generatedAt: now.toISOString(),
    /* demo: true heißt platzhalter-daten · page zeigt demo-banner + noindex.
       der runner schreibt IMMER echte daten (kein demo-feld) · nur das
       händisch angelegte seed-file trägt demo: true. */
    measurements,
  };

  const dataDir = path.join(__dirname, "data");
  await mkdir(dataDir, { recursive: true });
  const outPath = path.join(dataDir, `${monthKey}.json`);
  await writeFile(outPath, JSON.stringify(out, null, 2));
  console.log(`\n✓ geschrieben: ${path.relative(process.cwd(), outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
