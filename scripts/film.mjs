#!/usr/bin/env node
/**
 * film.mjs · nimmt die gebauten Seiten als Film auf.
 *
 * ═══ WARUM DAS DAS WICHTIGSTE SKRIPT DES PROJEKTS IST ═══
 *
 * Gemessen an schultzschultz.com, das Nicolas als Vorbild nennt:
 * 12 Videos, 18 Bilder, 2 Canvas. Die Videos heissen Tools_smudge,
 * Tools_touchType, Tools_stretch, Tools_gridPaint — sie zeigen die
 * eigenen Werkzeuge beim Laufen. Ihre grösste Type ist 160 px, also
 * KLEINER als hier, und sie haben genau vier CSS-Animationen.
 *
 * Der Unterschied ist nicht Typografie und nicht CSS. Es ist
 * bewegtes Material der eigenen Arbeit. laconis hatte davon: eine
 * einzige Aufnahme, unbewegt.
 *
 * Dabei liegt der Rohstoff da: `urlExtern` zeigt auf die live
 * gebaute Kundenseite. Was fehlte, war nur jemand, der sie abfilmt.
 *
 * ═══ WAS ES MACHT ═══
 *
 *   npm run film                    alle mit urlExtern
 *   npm run film fabry-baumpflege   nur eins
 *
 * Pro Projekt und Ansicht (desktop 1440, handy 390):
 *   1. Seite laden, Schriften abwarten, Cookie-Banner wegklicken
 *   2. mit KONSTANTER Geschwindigkeit durchscrollen, aufgenommen
 *   3. webm (VP9) und mp4 (H.264) danebenlegen, plus ein Standbild
 *
 * Ergebnis: public/film/<slug>-<ansicht>.{webm,mp4,jpg}
 *
 * ═══ WARUM GESCROLLT UND NICHT GESCHWENKT ═══
 *
 * Ein CSS-Schwenk über ein langes Standbild wäre billiger und sieht
 * fast gleich aus — aber eben nur fast. Beim echten Scrollen laufen
 * die Animationen der gebauten Seite mit: Reveals, Sticky-Elemente,
 * Videos, Hover-freie Mikrobewegungen. Genau das ist der Beweis,
 * dass da eine Seite LÄUFT und nicht ein Bild hängt.
 *
 * ═══ ABHÄNGIGKEITEN, BEWUSST NICHT IM PROJEKT ═══
 *
 * playwright zieht ~300 MB Browser nach, ffmpeg ist ein Systemtool.
 * Beides wird hier ein paar Mal im Jahr gebraucht und gehört nicht
 * in die Laufzeit einer Seite, die mit 0 kB fremdem JavaScript wirbt.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   brew install ffmpeg
 */

import { mkdir, readFile, rename, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const lauf = promisify(execFile);

const OUT = "public/film";
const ROH = ".film-roh";

const ANSICHTEN = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobil", width: 390, height: 844 },
];

/* Sekunden, die der Film dauern soll. Kurz genug, dass er als
   Schleife nicht langweilt, lang genug, dass man die Seite liest.
   Die Scrollgeschwindigkeit fällt daraus — nicht umgekehrt, sonst
   dauert eine lange Seite eine Minute und eine kurze drei Sekunden. */
const DAUER = 9;

/* GEMESSEN: die erste Fassung zählte Frames (DAUER * 25) und liess
   requestAnimationFrame so oft laufen. Im Headless-Browser läuft rAF
   aber nicht mit 25 Hz — der fertige Film war 5,6 s statt 9. Jetzt
   entscheidet die UHR, wie weit gescrollt wird, und rAF liefert nur
   noch die Frames dazu. Die Filmlänge stimmt damit auf allen
   Maschinen. */

/* die Datendatei ist TypeScript · statt sie zu importieren, lesen wir
   die paar felder raus, die wir brauchen. spart eine build-stufe nur
   für ein wartungsskript. gleiche vorgehensweise wie shots.mjs. */
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

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "\nplaywright fehlt. einmalig installieren:\n\n" +
      "  npm i -D playwright && npx playwright install chromium\n",
  );
  process.exit(1);
}

try {
  await lauf("ffmpeg", ["-version"]);
} catch {
  console.error("\nffmpeg fehlt.  brew install ffmpeg\n");
  process.exit(1);
}

const nur = process.argv[2];
const alle = await projekte();
const liste = nur ? alle.filter((p) => p.slug === nur) : alle;

if (!liste.length) {
  console.error(
    nur
      ? `kein projekt mit slug "${nur}" und urlExtern gefunden.`
      : "kein projekt hat eine urlExtern · nichts zu filmen.",
  );
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
await rm(ROH, { recursive: true, force: true });

const browser = await chromium.launch();

for (const { slug, url } of liste) {
  for (const ansicht of ANSICHTEN) {
    const roh = path.join(ROH, `${slug}-${ansicht.name}`);
    await mkdir(roh, { recursive: true });

    const ctx = await browser.newContext({
      viewport: { width: ansicht.width, height: ansicht.height },
      deviceScaleFactor: 1,
      isMobile: ansicht.name === "mobil",
      hasTouch: ansicht.name === "mobil",
      /* die aufnahme läuft in der grösse des viewports · kein
         hochskalieren, sonst ist der film unschärfer als ein
         screenshot derselben seite */
      recordVideo: { dir: roh, size: { width: ansicht.width, height: ansicht.height } },
      /* die gefilmte seite soll ihre animationen zeigen · also
         NICHT reduzierte bewegung anfordern */
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    /* Playwright nimmt den GANZEN Kontext auf, also Seitenaufbau und
       Wartezeiten mit. Gemessen: 26 s Datei für 9 s Fahrt. Ab hier
       läuft die Uhr, damit wir hinterher auf die Fahrt zuschneiden
       können. */
    const kontextStart = Date.now();

    process.stdout.write(`  ${slug} · ${ansicht.name} … `);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
      await page.evaluate(() => document.fonts?.ready);

      /* Cookie-Banner und Consent-Schichten wegräumen · sie stehen
         sonst über der halben Aufnahme. Nur SCHLIESSEN, nichts
         akzeptieren: der Film soll die Seite zeigen, nicht in ihrem
         Namen zustimmen. */
      await page.evaluate(() => {
        const treffer = /cookie|consent|gdpr|dsgvo|banner|cmp/i;
        for (const el of Array.from(document.querySelectorAll("body *"))) {
          const cs = getComputedStyle(el);
          if (cs.position !== "fixed" && cs.position !== "sticky") continue;
          const id = `${el.id} ${el.className}`;
          if (typeof id === "string" && treffer.test(id)) el.remove();
        }
      });

      /* GANZ NACH OBEN, dann Höhe messen. Manche Seiten stellen den
         Scroll beim Laden wieder her. */
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(900);

      const hoehe = await page.evaluate(
        () => document.documentElement.scrollHeight - window.innerHeight,
      );

      /* KONSTANTE GESCHWINDIGKEIT, an der UHR, in der Seite
         gerechnet. `mouse.wheel` in einer Node-Schleife wäre vom
         Netzwerk-Roundtrip abhängig und ruckelt sichtbar. Hier läuft
         eine requestAnimationFrame-Schleife IM Browser — sie darf
         das, weil sie nur für die Dauer der Aufnahme lebt und nicht
         auf einer ausgelieferten Seite. */
      const fahrtStart = (Date.now() - kontextStart) / 1000;

      await page.evaluate(
        async ({ hoehe, dauerMs }) => {
          if (hoehe <= 0) {
            await new Promise((r) => setTimeout(r, 3000));
            return;
          }
          await new Promise((fertig) => {
            const start = performance.now();
            const zug = (jetzt) => {
              const p = Math.min(1, (jetzt - start) / dauerMs);
              /* leichtes Ein- und Ausschwingen · eine völlig lineare
                 Fahrt liest sich als Maschine, nicht als jemand, der
                 eine Seite ansieht */
              const weich = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
              window.scrollTo(0, hoehe * weich);
              if (p >= 1) return fertig();
              requestAnimationFrame(zug);
            };
            requestAnimationFrame(zug);
          });
        },
        { hoehe, dauerMs: DAUER * 1000 },
      );

      await page.waitForTimeout(700);

      /* das Standbild kommt aus dem KOPF der Seite, nicht aus dem
         Ende · es ist der Platzhalter, bevor der Film läuft */
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(OUT, `${slug}-${ansicht.name}.jpg`),
        type: "jpeg",
        quality: 72,
      });

      await ctx.close();

      /* Playwright benennt die Datei selbst · sie liegt als einzige
         webm im Rohordner */
      const dateien = await readdir(roh);
      const webm = dateien.find((f) => f.endsWith(".webm"));
      if (!webm) throw new Error("playwright hat keine aufnahme geschrieben");
      const quelle = path.join(roh, webm);

      const zielWebm = path.join(OUT, `${slug}-${ansicht.name}.webm`);
      const zielMp4 = path.join(OUT, `${slug}-${ansicht.name}.mp4`);

      /* VP9 für alles Moderne, H.264 für Safari-Altlasten. Die
         CRF-Werte sind nach der ersten Messung nachgezogen: bei 34
         bzw. 26 wog der Desktop-mp4 3,7 MB für neun Sekunden. Das
         Material ist eine Bildschirmaufnahme mit grossen ruhigen
         Flächen — die verträgt deutlich mehr Kompression als ein
         gefilmtes Bild, ohne sichtbar zu leiden.
         -an: keine Tonspur. Ein Video ohne Tonspur darf im Browser
         automatisch starten, eines mit stummgeschalteter Spur
         braucht `muted` — und wenn das jemand vergisst, spielt es
         gar nicht. */
      /* -ss VOR -i · dann sucht ffmpeg zur Stelle, statt alles
         davor zu dekodieren und wegzuwerfen */
      const schnitt = ["-ss", fahrtStart.toFixed(2), "-t", String(DAUER)];

      await lauf("ffmpeg", [
        "-y", ...schnitt, "-i", quelle,
        "-an",
        "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
        "-pix_fmt", "yuv420p",
        zielWebm,
      ]);

      await lauf("ffmpeg", [
        "-y", ...schnitt, "-i", quelle,
        "-an",
        "-c:v", "libx264", "-crf", "31", "-preset", "slow",
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        /* faststart · der Moov-Atom nach vorn, sonst muss der
           Browser die ganze Datei laden, bevor das erste Bild kommt */
        "-movflags", "+faststart",
        zielMp4,
      ]);

      const groesse = async (f) =>
        Math.round((await (await import("node:fs/promises")).stat(f)).size / 1024);
      console.log(
        `${await groesse(zielWebm)} kB webm · ${await groesse(zielMp4)} kB mp4 · ` +
          `${hoehe} px seite · schnitt ab ${fahrtStart.toFixed(1)} s`,
      );
    } catch (e) {
      console.log(`FEHLER · ${e.message}`);
      await ctx.close().catch(() => {});
    }
  }
}

await browser.close();
await rm(ROH, { recursive: true, force: true });

/* die Liste der vorhandenen Filme wegschreiben, damit die Seite sie
   ohne Dateisystem-Zugriff kennt · gleiche Mechanik wie
   shots.generated.ts. Ein Projekt ohne Film soll gar nichts
   rendern, statt auf eine 404 zu zeigen. */
const da = (await readdir(OUT)).filter((f) => f.endsWith(".mp4"));
const slugs = [...new Set(da.map((f) => f.replace(/-(desktop|mobil)\.mp4$/, "")))].sort();
await (await import("node:fs/promises")).writeFile(
  "src/data/filme.generated.ts",
  `/* AUTOMATISCH ERZEUGT von scripts/film.mjs · nicht von hand ändern.\n` +
    `   neu ziehen:  npm run film  */\n\n` +
    `export const FILME: string[] = ${JSON.stringify(slugs, null, 2)};\n`,
  "utf8",
);

console.log(`\n${slugs.length} projekt(e) gefilmt → ${OUT}`);
