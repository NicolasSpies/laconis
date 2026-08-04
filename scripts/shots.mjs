#!/usr/bin/env node
/**
 * shots.mjs · zieht die aufnahmen der referenz-seiten neu.
 *
 * die case-studies zeigen die gebaute seite in laptop und handy. das
 * sind aufnahmen, keine iframes · fremde seiten schicken meistens
 * x-frame-options, und die kontrolle darüber hat man nur bei den
 * eigenen. aufnahmen funktionieren bei jedem projekt.
 *
 * der haken daran: sie altern still. ändert der kunde etwas, zeigt die
 * case-study weiter den alten stand, ohne dass es jemandem auffällt.
 * dieses skript zieht sie neu.
 *
 *   node scripts/shots.mjs                     alle mit urlExtern
 *   node scripts/shots.mjs fabry-baumpflege     nur eins
 *
 * playwright ist BEWUSST keine projekt-abhängigkeit · es zieht rund
 * 300 MB browser nach und wird hier vielleicht dreimal im jahr
 * gebraucht. einmalig installieren, wenn du es brauchst:
 *
 *   npm i -D playwright && npx playwright install chromium
 */

import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "playwright fehlt. einmalig:\n" +
      "  npm i -D playwright && npx playwright install chromium\n\n" +
      "es ist absichtlich keine feste abhängigkeit · 300 MB browser für ein\n" +
      "skript, das dreimal im jahr läuft, gehören nicht in jede installation.",
  );
  process.exit(1);
}

const OUT = "public/cases";
const VIEWS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

/* die datendatei ist TypeScript · statt sie zu importieren, lesen wir
   die paar felder raus, die wir brauchen. das spart eine build-stufe
   nur für ein wartungsskript. */
async function projekte() {
  const src = await readFile("src/data/referenzen.ts", "utf8");
  const out = [];
  for (const block of src.split(/\n  \{\n/).slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const url = block.match(/urlExtern: "([^"]+)"/)?.[1];
    if (slug && url) out.push({ slug, url });
  }
  return out;
}

const nur = process.argv[2];
const alle = await projekte();
const ziele = nur ? alle.filter((p) => p.slug === nur) : alle;

if (!ziele.length) {
  console.error(
    nur
      ? `kein projekt mit slug "${nur}" und urlExtern gefunden.`
      : "kein projekt hat eine urlExtern · nichts zu tun.",
  );
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const { slug, url } of ziele) {
  for (const view of VIEWS) {
    const page = await browser.newPage({
      viewport: { width: view.width, height: view.height },
    });
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });

      /* WICHTIG · in stufen durchscrollen, damit jedes lazy-bild seinen
         ladebefehl bekommt. ohne das landen leere kästen im bild, und
         genau das ist beim ersten versuch passiert. */
      const hoehe = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < hoehe; y += 600) {
        await page.evaluate((py) => window.scrollTo(0, py), y);
        await page.waitForTimeout(240);
      }
      await page.waitForTimeout(1500);

      /* nachzügler hart anstossen · manche bilder hängen an einem
         observer, der beim schnellen scrollen nicht auslöst */
      await page.evaluate(() => {
        for (const img of document.images) {
          if (!img.complete || img.naturalWidth === 0) img.loading = "eager";
        }
      });
      await page.waitForTimeout(1500);

      const offen = await page.evaluate(
        () => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
      );
      if (offen) console.warn(`  ! ${offen} bild(er) nicht geladen · aufnahme kann lücken haben`);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);

      const file = path.join(OUT, `${slug}-${view.name}.jpg`);
      /* qualität 58 · die aufnahmen laufen in einer kleinen scheibe,
         mehr sieht man nicht, und 1 MB pro projekt wäre absurd auf
         einer seite, die mit ladezeit wirbt */
      await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 58 });
      console.log(`✓ ${file}`);
    } catch (err) {
      console.error(`✗ ${slug} · ${view.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
console.log("\nfertig. die pfade stehen in src/data/referenzen.ts unter `shots`.");
