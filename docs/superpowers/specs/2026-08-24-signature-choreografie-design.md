# laconis · Signature-Choreografie

**Datum:** 24.08.2026
**Auftrag (wörtlich):** „die website ist mein portfolio! da muss man anhand
der speziellen grafik, speziellen animation sehen, dass das ein web
entwickler ist. also man muss sehen dass ich was auf den Kasten habe."

**Entschieden von Nicolas:**
- Publikum: **beide** — auf den ersten Blick schön, auf den zweiten handwerklich
- Lautstärke: **alles atmet** — durchgehende Choreografie
- Start mit: **Der Kamm**
- Altlasten: **alle drei raus** (ShaderField, CursorDot, Seitenvorhang)

---

## Die Diagnose

Gemessen, nicht vermutet:

| Seite | Sektionen mit Bewegung |
|---|---|
| Startseite | Hero (einmaliger Einflug) + Laufband · Kammer, Arbeiten, CMS, Schluss: **null** |
| /studio | **null** in 1.100 Zeilen CSS |
| /arbeiten | der Projektstapel — die einzige Seite mit Dauerbewegung |
| /kontakt | eine |

Dazu: **jede Sektion aller vier Seiten trägt `data-no-reveal`.** Das
vorhandene Reveal-System (`AutoReveal`, 179 Zeilen Client-JS) läuft mit,
beobachtet jede Sektion und bewirkt nichts.

**Das Problem ist nicht der Hero. Es sind die vier toten Bildschirme danach.**

---

## Schritt 1 · Die Bühne frei machen

Vor der ersten neuen Animation, nicht danach.

| Weg | Warum |
|---|---|
| `ShaderField` (265 Zeilen WebGL) | fbm-Domain-Warp mit Cursor-Halo · der meistkopierte Shader des Internets, inzwischen der Look, an dem man KI-generierte Seiten erkennt. Signalisiert das Gegenteil von Können. Der statische Verlauf liegt in `.kp` schon als Fallback darunter. |
| `CursorDot` | Custom-Cursor · auf Touch tot, also für die Hälfte der Besucher. Verstösst gegen die eigene Regel „Mikro-Animationen laufen immer". |
| Vorhang in `PageTransition` | 560 ms schwarz bei jedem Wechsel · verdeckt die Seite statt sie zu zeigen, und die grosse Wortmarke bricht die Flüsterton-Regel. |
| `AutoReveal` | beobachtet jede Sektion, bewirkt nichts. |

**Zusätzlich Pflicht vor Schritt 2:** `prefers-reduced-motion`-Blöcke in
`studio.css`, `kammer.css`, `schluss.css`, `eigenescms.css` und
`projektansicht.css` — dort steht heute nichts.

---

## Schritt 2 · Der Kamm

### Was man sieht

Der harte Schnitt zwischen Schwarz und Papier ist ein **Zinkenprofil** —
senkrechte Zähne verschiedener Breite und Tiefe, alles 90°, keine Rundung.
Mehrere Zahnreihen wandern mit unterschiedlichem Tempo übereinander. Wo
zwei sich kreuzen, klappt ein Zahn weg und wächst woanders neu. Alle zwei
bis vier Sekunden ändert sich etwas, ohne zu zappeln.

Die Zahnbreiten und -tiefen werden **aus `src/data/referenzen.ts`
gerechnet** — jedes Projekt eine Zahnreihe, über einen deterministischen
Hash des Slugs. Kein `Math.random`, kein Hydration-Mismatch.

### Wie es gemacht ist

`mix-blend-mode: difference` auf **rein schwarz/weissen** Lagen ist exakt
XOR: ungerade Zahl Zähne über einem Pixel → weiss, gerade → schwarz.
Deshalb bleibt das Profil bei sechs Projekten so ausgewogen wie bei zwei.
Beim normalen Stapeln (ODER) liefe das Band mit jedem Projekt weiter zu.

Eingefärbt wird am Ende mit **einer** `multiply`-Lage in der Kammerfarbe:
`multiply(#ffffff, #e1fd52)` ist bitgenau `#e1fd52`, `multiply(#000000, X)`
ist bitgenau `#000000`. **Zwei Töne, keine Opacity, kein Oliv** — die
Lime-Regel bleibt unangetastet.

Nur `mix-blend-mode`, `background-size`, `background-repeat: repeat-x`,
`isolation` und `transform`-Keyframes. Alles Baseline seit Jahren, alle
Engines. **Kein `@supports` nötig, kein `animation-timeline`, kein
`@property`, kein Houdini, kein WebGL.** Der Fallback ist der Effekt selbst.

### Zwei Fehler im Entwurf, die vorher raus müssen

1. **Bei gerader Zahl Zahnreihen kippt das Bild ins Negativ** — Papier wird
   schwarz. Die unterste Lage darf nicht am XOR teilnehmen, oder die Anzahl
   muss ungerade erzwungen werden.
2. **Am linken Rand bleibt ein Streifen unbedeckt**, weil die Lagen um eine
   Periode nach links wandern. Der Überstand muss auf beiden Seiten liegen.

### Zwangsbedingungen für den Generator

Ohne diese sieht es nach Zufall aus statt nach System:

- kleinste Zahnbreite ≥ 17 px
- Abstand zweier Perioden ≥ 18 px
- mindestens eine Periode ≥ 89 px (Grossstruktur auf breiten Schirmen)
- mindestens eine Tiefe ≥ 68 % und eine ≤ 40 % (sonst Zackenborte statt Profil)
- Deckel bei 6 Reihen, auf `max-width: 640px` bei 4

### Einschränkung

Das Band darf **nicht** in einem Container mit `filter` oder
`backdrop-filter` sitzen — die bilden einen eigenen Stacking-Context und
schneiden das Blending ab. Also nie in eine Glasfläche legen.

### Bei `prefers-reduced-motion`

Nicht abschalten, sondern **auf dem gestalteten Zustand einfrieren**. Der
Ruhezustand ist der Default-`transform`, also bleibt das Profil stehen und
sieht aus wie beabsichtigt.

### Reihenfolge

Zuerst **nur eine Instanz**: die Oberkante der Lime-Vollplatte am Ende der
Startseite. Dort beisst Schwarz in reines `#e1fd52` — die lauteste Stelle.
Im echten Chrome ansehen, auf 375 px, und auf reduced-motion prüfen. Erst
wenn es dort trägt, auf die anderen vier Kanten ausrollen.

**Kosten:** ~110 Zeilen in zwei neuen Dateien, < 1 kB, **0 kB JavaScript**
(Server-Component, der Generator landet nicht im Client-Bundle).

---

## Schritt 3 · Die Fassung (später)

Die Überschrift der contentcore-Sektion wird sichtbar ein Eingabefeld:
dünner Rahmen, Lime-Cursor am Zeilenende, die erste Zeile löscht sich
rückwärts weg und tippt sich neu. „contentcore." bleibt stehen — der
Produktname ist kein Feld. Einmal pro Runde: Statuszeile, Lime-Schiene
wischt nach unten, *veröffentlicht.*

Der Trick ist eine Schreibmaschine auf **fetter, proportionaler** Archivo,
ohne jeden Buchstaben einzeln zu zerlegen.

**Bedingung, bevor das gebaut wird:** die zwei bis drei rotierenden Wörter
müssen feststehen und **drei echte Argumente** sein (bauen · pflegen ·
umziehen), keine Synonyme. Sonst ist es das „wir machen X/Y/Z"-Klischee.
Takt ~16 s, nicht 26 — sonst sieht es fast niemand.

---

## Nicht empfohlen

- **Der Passer** (Hero-Headline doppelt versetzt, rastet ein) — der
  wichtigste Satz sieht für einen Laien 80 % der Zeit kaputt aus. Auf dem
  Lime-Akzentwort liegt ausserdem Lime auf Lime, also Schmier statt
  Doppelbild. Und er repariert den einen Bildschirm, der schon Bewegung hat.
- **Der Schnitt** (Seitenübergänge als kippende Platten) — fügt keiner
  toten Sektion Bewegung hinzu. Poliert die Türen eines Hauses, in dem das
  Licht aus ist.
- **Nullsumme** (Gewichtswelle im Blocksatz) — Blocksatz über Einzelbuchstaben
  verteilt den Restplatz auch auf die Wortzwischenräume; die Worttrennung
  verschwindet als Hierarchie. Ausserdem der meistdemonstrierte
  Variable-Font-Effekt seit 2019.

---

## Wie wir vorgehen

Ein Schritt, dann ansehen. Nicolas sieht nach jedem Schritt das Ergebnis
auf der laufenden Seite, bevor der nächste kommt.
