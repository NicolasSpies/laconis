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
      /* kurz warten · viele seiten blenden beim ersten scroll noch
         inhalte ein, und die sollen mit aufs bild */
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);

      const file = path.join(OUT, `${slug}-${view.name}.jpg`);
      await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 82 });
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
