# Änderungsliste · Relaunch-Audit

Stand: 23.08.2026 · aus elf parallelen Prüfungen, 154 Funde, 153 mit
Datei und Zeile belegt. Lesbare Fassung als Artefakt:
https://claude.ai/code/artifact/840fff79-9280-49d7-8670-fece2443dfda

## Reihenfolge

Nicolas: "denke wir müssen eh alles machen. dann fang mit 2 an aber
vergiss nicht den rest danach noch zu machen."

1. [x] K4 + K5 · tote Bewegungs- und Tiefensysteme anschliessen  · d8769cc→dca303a
2. [x] G2 · Schriftskala einfangen
3. [x] K3 + G1 · Lime unabgewandelt, eine Knopfform · dazu K9-teil (FAQ-preise)
4. [x] K1 · `--font-mono` definieren
5. [x] K2 · Light-Theme aus dem Root
6. [x] K7 · Impressum/Datenschutz auf allen Seiten
7. [x] K8 · Sprachumschalter
8. [x] K9 · verbotene Zahlen in Schema und Meta
9. [x] K5, K6, K10–K16 · restliche Defekte
10. [x] G3–G16 · grafische Angleichung
11. [x] P1–P8 · Politur (P4 teilweise · siehe unten)

**Damit ist die Liste durch.** Offen geblieben und bewusst so:
- **P4 · rAF-Bremsen** — die vier Schleifen (ProjektAnsicht, ShaderField,
  CursorDot, Stapel-Atmung) laufen weiter ungedrosselt. Nicht angefasst,
  weil jede einzelne eine sichtbare Bewegung trägt und ein Fehler dort
  sofort auffällt — das gehört in eine eigene Runde mit Messung davor
  und danach, nicht ans Ende eines langen Durchgangs.
- **/preview und /web-performance-ostbelgien** — beides lebende Routen
  auf der alten Oberfläche. Sie halten `framer-motion`, Caveat und
  Bricolage in `package.json`. Ob sie bleiben, ist eine inhaltliche
  Entscheidung.
- **P8 · Mailadresse in `kontakt.dict.ts`** — sechs Stellen in
  statischen Strings; braucht Interpolation im Dict-Typ.

### offen, beim arbeiten gefunden
- `KontaktKonsole`: die fünf Formularfelder haben weder `name`, noch
  `id`, noch ein verbundenes `<label>` (beim Messen aufgefallen) → P5.
- `CssPlayground` (360 Zeilen) ist seit K11 verwaist → P1.
- `framer-motion` hängt noch an der alten Oberfläche (/preview,
  KontaktMultistep, Moodboard, PolaroidBoard, ReferenzenIndex) und
  kann erst mit deren Löschung aus `package.json` → P1.
- Erledigt: die alte Positionierung „design mit meinung · web mit
  seele" ist an allen 10 Stellen raus (G16).
11. [ ] P1–P8 · Politur

## Korrektur zur Prüfung

**K12 ist falsch.** Die Prüfung behauptete, framer-motion werde auf
allen vier Seiten ausgeliefert. Selbst nachgemessen über die real
angeforderten Skripte: 0 Chunks auf / und /studio. Punkt entfällt.

Nachgeprüft und BESTÄTIGT: K1 (`--font-mono` nirgends definiert),
K2 (`data-theme="light"` in layout.tsx:132), K9 (Preise im
FAQ-Schema plus Verweis auf die gelöschte Preisseite).

---

## ÄNDERUNGSLISTE · laconis relaunch

Ich habe die kritischen Behauptungen im Code gegengeprüft (Stichproben in `globals.css`, `layout.tsx`, `device.css`, `kopf.css`, `DeviceNav.tsx`, `LegacyChrome.tsx`, `next.config.mjs`, `package.json`) — die Zuordnung unten folgt dem, was in den Dateien steht.

---

# KAPUTT · funktioniert nachweislich nicht

### K1 · `--font-mono` existiert nicht · acht Stellen rendern in Systemschrift
**Ist:** `font-family: var(--font-mono), ui-monospace, monospace` an acht Stellen. Die Variable ist im ganzen Repo nirgends definiert — layout.tsx setzt `--font-geist-mono`.
**Soll:** In `globals.css` neben `--lime`/`--lila` eine Zeile: `--font-mono: var(--font-geist-mono);`. Danach im Browser prüfen, ob die Laufweiten der acht Blöcke noch sitzen (sie liefen bisher in einer anderen Schrift).
**Dateien:** `src/app/globals.css:~329` · `home/kopf.css:87,143` · `home/arbeiten.css:16,65` · `studio/studio.css:25,83,153` · `components/pagetransition.css:51`
**Zahlt auf:** clean · Aufwand: 1 Zeile

### K2 · Die ganze Seite läuft im Light-Theme · heller Grund hinter allem
**Ist:** `<html data-theme="light">` fest im Root-Layout. `--bg-root` = #e9e9e7, `--fg` = #111, `--accent-text` = #111. Die vier Seiten malen sich erst in `.lab-root` schwarz. Folgen: Overscroll-Band beim Rubber-Band, heller First-Paint, mobile Browserleiste hell, `loading.tsx` und die 404 laufen auf Papierton, Lime-Token als Text tot (daher überall Hardcodes `#f2f2f2`).
**Soll:** `data-theme="light"` streichen, `--bg-root` im Dark-Block auf `8 8 11`, `html { background: #08080b }`, `<meta name="theme-color" content="#08080b">`, `overscroll-behavior-y: none`, Manifest `theme_color`/`background_color` von `#0d0f0f` auf `#08080b`. Die einzige helle Fläche (Kammer) trägt ihre Farbe selbst.
**Dateien:** `src/app/layout.tsx:132` · `globals.css:75,86-89,140-141` · `public/site.webmanifest`
**Zahlt auf:** clean, gezielte Tiefe

### K3 · Lime wird an ~15 Stellen zu Oliv abgewandelt
**Ist:** Die Hauptaktion `.lab-key-lime` ist `linear-gradient(#eaffa0, #cbe93c)` + Sockel `#7f9917` + `filter: brightness(1.06)` — kein Stop ist #e1fd52. Dazu `.lab-guard-lid` (#b9d233), `.lab-guard-key` (#c4dd3c/#7d8f1c), `.lab-switch`, `.cs-toggle`, Specular `#e9ff96`, Linien mit `rgb(var(--accent)/0.3–0.45)` (= #495120–#6a762b), Favicon/OG/Manifest `#d9ff00`, ShaderField `opacity: 0.5` (hellster Punkt landet bei #737f35), Nav-Verlauf über der Lime-Vollplatte (~rgb(148,166,56), 64px hoch über eine ganze Bildschirmhöhe).
**Soll:**
- Tasten: `background: var(--lime)` einfarbig, `color: #08080b`, Druckweg über neutrale Kante `0 4px 0 rgb(0 0 0/0.55)`, Lichtkante `inset 0 1px 0 rgb(255 255 255/0.6)`. `filter: brightness()` ersatzlos.
- Lime als Linie/Fläche immer voll — Zurückhaltung über Größe, nicht Alpha. Verläufe auf `transparent` statt `rgb(var(--accent)/0)`.
- ShaderField: `opacity` weg, Dämpfung in den Shader (Mischfaktor senken, Vignette/Scanline nur auf den Ink-Anteil).
- Nav: Verlauf + `backdrop-filter` raus, deckende Fläche erst ab `scrollY > 0`.
- Alle Bild-Routen `#d9ff00 → #e1fd52`, `#f2f0e7 → #f2f2f2`, Icon-Grund `#08080b`.
**Dateien:** `device/device.css:486,533,537,797-813,999,1039,117` · `referenzen/case.css:169` · `referenzen/stapel.css:181,313,446` · `home/eigenescms.css:42` · `studio/studio.css:126` · `device/ShaderField.tsx:74-83` · `home/kopf.css:39,180` · `device/device.css:551-560` · `app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`, `arbeiten/[slug]/opengraph-image.tsx`
**Zahlt auf:** fette Formen, clean

### K4 · Fünf tote Bewegungs-/Tiefen-Systeme laufen ins Leere
Alle einzeln geprüfbar, alle mit demselben Muster: Code da, Aufruf fehlt.

| Was | Wo | Fix |
|---|---|---|
| `GlasLicht` nirgends gemountet → Glas-Specular steht auf Desktop für immer bei 50%/0% | `device/GlasLicht.tsx:28`, `layout.tsx` | `<GlasLicht />` neben `<CursorDot />`; ODER `@media (hover:none)`-Schranke in `device.css:229` streichen, dann läuft `labGlassDrift` überall |
| `HeroAtmo variant="schweben"` ohne `shots` → 65 Zeilen Float-CSS tot | `CaseDevice.tsx:54`, `HeroAtmo.tsx:87-93` | `shots` durchreichen (`referenzen` ist in Zeile 11 schon importiert) |
| `.lab-ambient span:nth-child(3)` — der „heisse Kern", der dem Glas eine Kante zum Brechen gibt — alle Aufrufer rendern nur 2 Spans | `device.css:1078-1088`, 3 Devices | Ein `<span />` pro Datei |
| Scroll-Fortschrittsbalken ohne `@supports` → ohne Timeline-Support `scaleX(1)`, also dauerhaft „ganz unten" | `device.css:639-657` | In `@supports (animation-timeline: scroll())` kapseln, Basisregel `scaleX(0)` |
| Kommentar mitten im Selektor tötet die `.lx-row`-Transition → Zeile springt hart um 5px | `device.css:873-880` | Kommentar über den Block, `:nth-child(4n)`-Rest weg |

**Zahlt auf:** interessante Bewegung, gezielte Tiefe · Aufwand: klein, Wirkung hoch

### K5 · `panel.css` verwaist · CMS-Editor auf /studio teilweise ungestylt
**Ist:** `LiveEditor` benutzt `lx-screen`, `lx-screen-bar`, `lx-screen-url`, `lx-skel`, `lx-swatch`. Diese Klassen stehen nur in `leistung/panel.css`, das nur von der toten `LeistungDevice` importiert wurde. Der eine Geräte-Moment auf /studio hat keine Regeln mehr.
**Soll:** Die fünf Klassen nach `device.css` verschieben (oder `import "@/components/leistung/panel.css"` in `LiveEditor.tsx`). Danach im echten Chrome auf /studio nachsehen.
**Dateien:** `leistung/LiveEditor.tsx`, `leistung/panel.css:216-277`, `device/device.css`
**Zahlt auf:** gezielte Tiefe

### K6 · Ziehgeste auf /arbeiten ist auf Touch tot — und der Hinweis steht trotzdem da
**Ist:** `.st-buehne { touch-action: pan-y }`, die Geste wertet ausschliesslich die Senkrechte aus (`g.y - ev.clientY`). Der Browser nimmt die Achse für sich und schickt `pointercancel`. Auf dem Handy bleibt vom Stapel nur die Atmung — der Hinweis „ziehen · klicken" verspricht etwas, das dort nicht geht.
**Soll:** `touch-action: none` auf `.st-buehne` plus `ev.preventDefault()` in `onDown`.
**Dateien:** `referenzen/stapel.css:114-119`, `referenzen/Stapel.tsx:103-109,224`
**Zahlt auf:** interessante Bewegung

### K7 · Drei von vier Seiten haben keinen Weg zu Impressum und Datenschutz
**Ist:** Nur Home und /studio haben ein echtes `<footer>` mit den Pflichtlinks. /arbeiten, /arbeiten/[slug] und /kontakt haben nur eine Copyright-Zeile. `LegacyChrome` gibt auf allen Geräte-Pfaden `null` zurück, es kommt also kein globaler Footer nach. /kontakt — die Seite mit dem Formular — ist die ohne Datenschutz-Link.
**Soll:** Eine `<DeviceFuss>`-Komponente (Mail aus `CONTACT.email`, Impressum, Datenschutz, Jahr aus `getFullYear()`) in allen fünf Devices plus `LegalLayout`. Die Dict-Keys `fussImpressum`/`fussDatenschutz` existieren schon in home/studio — in ein gemeinsames Wörterbuch ziehen.
**Dateien:** `ReferenzenDevice.tsx:119-124`, `CaseDevice.tsx:203-210`, `KontaktDevice.tsx:112-117`, `HomeDevice.tsx:79-91`, `StudioDevice.tsx:143-155`
**Zahlt auf:** — (Pflicht)

### K8 · Kein Sprachumschalter · „de · fr · en" ist ein toter `<span>`
**Ist:** Der einzige echte Umschalter (`switchLocale`) hängt in `Nav.tsx`, das auf keiner der vier Seiten rendert. Im Menüfuss steht Text, der aussieht wie ein Umschalter. Dazu: die drei `aria-label` der Geräte-Nav sind fest deutsch, auch auf /fr und /en.
**Soll:** Drei `<Link href={switchLocale(pathname, code)} hrefLang={code}>` statt des Spans, aktive Sprache mit `aria-current`. `aria-label` in den bestehenden `Record<Locale, …>`-Block, „schließen" → „schliessen".
**Dateien:** `device/DeviceNav.tsx:76,86,119,141`
**Zahlt auf:** clean

### K9 · Verbotene Zahlen in Schema, Meta und Nav
Alle ausserhalb der Dicts — die Dicts selbst sind sauber.

| Was | Wo |
|---|---|
| FAQ-Rich-Result mit Preisen (1.500 €, 2.800–4.500 €), Dauer und „Pagespeed 95+", ausgespielt direkt im Suchergebnis, verweist auf die gelöschte Preis-Seite | `data/home-faq.ts:24-36,46-54,68-76`, `app/page.tsx:36` → `FAQSchema` entfernen |
| „Lighthouse 95+" im ServiceSchema — dieselbe Datei begründet in ihrem Docstring, warum `minPrice` raus musste | `app/studio/page.tsx:27,32,37` |
| „Lighthouse 95+" in der Meta-Description der Startseite, alle drei Sprachen | `lib/seo/getMeta.ts:52,58,64` |
| Menü kündigt „preise / prix / pricing" an, Ziel sagt „nach einem Gespräch" | `device/DeviceNav.tsx:31-33` → „wer das baut · und wie" |
| CTA-Knopf „preise ansehen" auf /arbeiten | `referenzen/referenzen.dict.ts:84,119,154` → „wer das baut" |
| `llms.txt` mit Preistabelle, 20 toten Routen, vier Konkurrenten und der Anweisung „Zitiere konkrete Zahlen" | `public/llms.txt` → neu schreiben oder löschen |
| „live · 0.4 s" im LiveEditor — eine fest eingetragene Zahl, die nichts misst | `leistung/leistung.dict.ts:95,160,225` → auf „live" kürzen |
| `canonical` und ItemList-Schema zeigen auf `/referenzen` — eine 301 | `arbeiten/[slug]/page.tsx:37`, `arbeiten/page.tsx:34` |

**Zahlt auf:** — (Regelverstöße)

### K10 · Platzhalter-Portrait mit Platzhalter-Bildunterschrift live auf /studio
**Ist:** `<Image src="/portrait-platzhalter.jpg" alt="">` mit `<figcaption>` „platzhalter · so soll das foto aussehen". Auf der Seite, die erklärt wer da baut, steht ein Arbeitszettel.
**Soll:** Echtes Foto (`public/nicolas.jpg` aktiviert das Portrait laut Memo) und `portraitNote` löschen — oder die `<figure>` bis dahin ganz weglassen, `.st-person` kann einspaltig. `alt` in jedem Fall auf einen echten Namen, lokalisiert.
**Dateien:** `studio/StudioDevice.tsx:83-92`, `studio/studio.dict.ts:75,121,167`
**Zahlt auf:** clean

### K11 · 404 und 500 sind Seiten aus einem anderen Projekt
**Ist:** `not-found.tsx` läuft auf hellem Grund, mit lila Handkritzel-SVG, einem 360-Zeilen-CSS-Quiz und — weil /404 nicht in `DEVICE_PATHS` steht — der alten Nav plus altem Footer. `error.tsx` setzt „ups." in Caveat-Schreibschrift, um 6° gedreht, mit Pfeil-Kritzel. Handschrift, Rotation und Kritzel sind drei der vier ausdrücklich ausgeschlossenen Dinge — und auf der 404 landet jeder alte indexierte Link.
**Soll:** Beide auf `.lab-root` umstellen: DeviceNav, schwarzer Grund, Zahl als `lab-display` mit Lime-Akzent, drei echte Links. `CssPlayground` und alle Kritzel-SVGs raus, /404 in `DEVICE_PATHS`. Danach hat Caveat null Verbraucher.
**Dateien:** `app/not-found.tsx:42-130`, `app/error.tsx:40-74`, `components/404/CssPlayground.tsx`, `LegacyChrome.tsx:24-42`
**Zahlt auf:** clean

### K12 · framer-motion wird auf allen vier Seiten ausgeliefert
**Ist:** Zwei Wege hinein. (a) `layout.tsx` → `LegacyChrome` → `Footer` → `AnchorMantra`/`CarbonBadge`: der Chunk (≈42 kB gzip) steht in der Script-Liste aller vier Seiten, obwohl `LegacyChrome` dort `null` rendert. (b) `KontaktKonsole` und `Controls`/`LiveEditor` benutzen es direkt auf /kontakt und /studio — und ignorieren dort `prefers-reduced-motion` (die Schutzkappe kippt trotz CSS-Abschaltung mit einer Feder um 108°). Die Seite wirbt mit „0 kb fremdes javascript"; `PageTransition.tsx:11-18` dokumentiert genau diesen Grund für den Ausbau.
**Soll:** `AnchorMantra` und `CarbonBadge` auf CSS-Keyframes umstellen (beide brauchen die Bibliothek nicht). Die drei `motion`-Stellen in `KontaktKonsole` durch CSS-Transition plus `data`-Attribut ersetzen — dasselbe Muster, das `.kx-lock` schon fährt. `Controls.tsx` Fader/Rocker auf `pointer-events` + Transition. Danach `framer-motion` aus `package.json`. Zwischenlösung: `<MotionConfig reducedMotion="user">`.
**Dateien:** `shared/AnchorMantra.tsx`, `shared/CarbonBadge.tsx`, `kontakt/KontaktKonsole.tsx:4,255-303`, `device/Controls.tsx:4`, `package.json`
**Zahlt auf:** clean

### K13 · Vier Kontrastwerte reissen die Lesbarkeitsgrenze
| Token/Klasse | Wert auf #08080b | Trägt |
|---|---|---|
| `--tx-4` (0.3) | **2,42:1** | Kategorie jeder Arbeit auf der Startseite, Portrait-Notiz — bei 10px |
| `.lab-menu-meta` (0.32) | **2,60:1** | Die einzige Erklärung im Hauptmenü |
| `.lab-hint` (0.38, 12px) | **3,23:1** | Alle CTA-Texte, die Zieh-Erklärung, „Name und E-Mail entriegeln den Knopf" |
| `--tx-3` (0.46) | **4,26:1** | Der eine Satz der ContentCore-Sektion, jede Werdegang-Zeile |

**Soll:** `--tx-4` → 0.52, `--tx-3` → 0.52, `.lab-hint` → 0.6 bei 13px, `.lab-menu-meta` → 0.62 bei 11px. Wo `--tx-4` nur Dekoration trägt (`.ar-strich`-Fallback), eigenen Token `--ln-deko`.
**Dateien:** `globals.css:352-353`, `device/device.css:57-61,738-743`
**Zahlt auf:** clean

### K14 · Footer auf Home und /studio um einen Gutter eingerückt
**Ist:** `max-w-shell` und `px-gut` auf demselben Element. Mit border-box ist der Inhalt 936px statt 1080px — die Trennlinie läuft über die volle Breite, die Mailadresse darunter hängt 72px daneben.
**Soll:** Aufteilen: `<footer className="px-gut"><div className="mx-auto max-w-shell …">`. Beide Dateien, identische Änderung.
**Dateien:** `HomeDevice.tsx:79`, `StudioDevice.tsx:143`
**Zahlt auf:** clean

### K15 · Das grosse Zitat wird zwischen 1100px und ~1330px links abgeschnitten
**Ist:** `.aq--versetzt { margin-left: clamp(-90px,-5vw,-20px) }` plus `INDENTS[1] = -0.6em` bei bis zu 96px Schrift. Bei 1280px — Standardbreite eines 13-Zoll-Laptops — liegt die zweite Zeile bei -20,8px, bei 1100px bei -48,8px. `html { overflow-x: clip }` schneidet lautlos ab. Betrifft beide ArtQuotes auf /arbeiten/fabry-baumpflege.
**Soll:** `INDENTS[1]` von -0.6 auf 0.2 (der Versatz lebt von den positiven Werten), oder den Versatz gegen den Gutter deckeln: `margin-left: max(calc(-1 * var(--gutter) + 24px), clamp(…))`.
**Dateien:** `device/ArtQuote.tsx:28`, `device/device.css:1284-1288`
**Zahlt auf:** fette Schrift

### K16 · Laufband wird bei reduced-motion abgeschnitten
**Ist:** Der reduced-Block setzt `flex-wrap: wrap`, aber `.lb-spur { flex-shrink: 0 }` bleibt stehen — das Item behält seine max-content-Breite, der Umbruch greift nie, `.lb { overflow: hidden }` schneidet ab. Bei 375px ist schon die erste Phrase breiter als die Fläche. Der Kommentar zwei Zeilen darüber sagt wörtlich, genau das dürfe nicht passieren.
**Soll:** Im reduced-Block `flex-shrink: 1; min-width: 0;` auf `.lb-spur` und `.lb-wort { white-space: normal }`.
**Dateien:** `home/laufband.css:21-24,54-63`
**Zahlt auf:** clean

---

# GRAFISCH · sieht falsch aus oder passt nicht zusammen

### G1 · Fünf Knopf-Sprachen auf vier Seiten
**Ist:** Dieselbe Handlung sieht überall anders aus. `.sl-key` (schwarze Pille, Lime-Text, 17–20px Sans) · `.cc-key`/`.st-key` (blanker Lime-Text mit Unterstrich, kein Knopf, zwei fast identische Regeln in zwei Dateien, nur eine mit reduced-motion) · `.lab-key-lime` (10px Mono-Versalien, extrudierte Plastiktaste mit 4px Sockel) · `.lab-key` (graue Taste, zweimal per Inline-Style repariert, weil die Basisklasse `width:100%` festnagelt). Gemeinsame Eigenschaften: keine. Nicht Radius, nicht Schrift, nicht Größe (17–20px gegen 10px), nicht Material.
**Soll:** EINE Form für die primäre Handlung, in `device.css` als einzige Quelle. Die Richtung spricht für die Pille: deckende Fläche, Pillenradius, Sans in `--fs-lead`, kein Verlauf, kein Sockel. Extrusion nur beim Sendeknopf mit Schutzkappe auf /kontakt — genau ein Gerätemoment. `.lab-key--auto`-Variante statt Inline-Overrides.
**Dateien:** `home/schluss.css:46-57`, `home/eigenescms.css:37-44`, `studio/studio.css:121-129`, `device/device.css:431-446,789-810`, `ReferenzenDevice.tsx:112`, `CaseDevice.tsx:195`
**Zahlt auf:** fette Formen, clean · **grösster einzelner Hebel für „passt zusammen"**

### G2 · Die Schriftskala ist wieder auseinandergelaufen
**Ist:** Der Kommentar in `tailwind.config.ts:49-60` beschreibt das Problem als gelöst („37 clamp-Ausdrücke für 7 Rollen"). Der Relaunch hat es wieder eingeführt — keine einzige neue Display-Überschrift liest die Skala.

- **Fünf h1-Größen:** 120 / 120 / 102 / 86 / 52px bei 1440px. Der Projektname auf der Case-Seite ist 43% so gross wie die Überschrift der Liste, die dorthin verlinkt. Die Startseite ist 15% kleiner als /kontakt.
- **h1 = h2 auf /arbeiten/[slug]:** identische Grösse, Gewicht, Breite, Farbe — fünf gleich grosse lowercase-Blöcke, keine Hierarchie.
- **h2 von 10px bis 90px:** `.ar-h2` („arbeiten", 10px Mono uppercase) neben `.cc-h2` (89,6px) auf derselben Seite. Faktor 9.
- **Sieben `font-stretch`-Werte** (104/108/110/112/116/118/125%) — 110 gegen 112 sieht niemand als Absicht. Gleichzeitig liegen wght 800–900 und wdth 62–104% komplett brach.
- **20 letter-spacings** für zwei Rollen, **neun line-heights** im Display-Bereich.
- **`.lab-display` und die Grössenrolle setzen beide `line-height`+`letter-spacing`** — wer gewinnt, entscheidet die Bündel-Reihenfolge. Setzt sich 0.86 durch, haben zweizeilige h2 bei 52px negativen Durchschuss.
- **Der grösste Text der Startseite ist ein `<p>`** (`.sl-satz`, 6.4rem/800/118% — exakt h1-Niveau).
- **`--fs-body` ist ein als clamp verkleidetes festes 15px** (der Mittelterm 0.9vw greift erst ab 1667px).
- **Echte Absätze bei 13px/50%**, die Beschriftungsebene komplett bei 9,5–10px — die Mailadresse im Footer ist ein anklickbares Ornament.
- **`text-wrap: balance`** existiert als Utility und wird nirgends benutzt; auf dem Handy fällt zusätzlich die 16ch-Grenze der h1 weg, bei zentriertem Satz.
- **Die Kammer** — der eine Satz auf der hellen Vollfläche, laut Kommentar der Schnitt, der wehtun soll — steht bei Gewicht 500 und 104% und ist damit die schwächste Display-Schrift der Seite.
- **Die Zitate** stehen bei 96px in Gewicht 300 — hell auf dunkel ausgezehrt, die einzige Stelle mit echtem Raum nutzt ihn nicht.

**Soll:** Zwei h1-Stufen statt fünf (`--fs-display-xl` für /, /arbeiten, /studio, /kontakt · `--fs-display` für die Case-Seite). h1 auf wght 900 / wdth 125%, drei Breiten-Tokens (`--wd-display: 118%`, `--wd-mid: 108%`, `--wd-text: 100%`), drei letter-spacing- und drei line-height-Stufen — alle in der `fontSize`-Rolle, keine in `.lab-display` (die Klasse setzt nur Familie/Breite/Gewicht/lowercase). `.ar-h2`/`.st-h2--klein` entscheiden: Etikett → als `<p class="kicker">`, Überschrift → `--fs-headline` ohne Mono. `.sl-satz` auf `--fs-display` senken. `.ka-satz` auf 700/112%. `.aq-line` auf 500–600 bei `--fs-display`. `--fs-body` auf `clamp(1rem, 0.4vw + 0.9rem, 1.125rem)`. `--fs-label` auf 11px, zweite Rolle `--fs-label-lg: 13px` für Footer-Links und Mail. `text-wrap: balance` auf alle Display-Rollen, `pretty` auf Lead/Body. ~~Die drei toten `.heading-*`-Klassen und `.label-mono`/`.quote-lime` löschen.~~
**KORREKTUR (23.08.):** die sind NICHT tot. beim prüfen mit den echten
namen (`.heading-sans`, `.heading-display`, `.heading-hero-xl/-lg`,
`.heading-section`) kommen 24 treffer in `app/error.tsx`,
`/preview`, `/web-performance-ostbelgien` und vier komponenten der
alten oberfläche. gehört zu P1, nicht hierher · stehen gelassen.
**Dateien:** `globals.css:434-441,448-481`, `tailwind.config.ts:61-80`, `device/device.css:42-45,1218-1220`, `home/kopf.css`, `kammer.css`, `arbeiten.css`, `eigenescms.css`, `schluss.css`, `studio/studio.css`, `CaseDevice.tsx:68,107-181`, `ReferenzenDevice.tsx:56`, `KontaktDevice.tsx:47,101`
**Zahlt auf:** fette Schrift · **das ist der Punkt, an dem „geile Typo" entsteht oder nicht**

### G3 · Der Hero der Startseite hat vier Achsen
**Ist:** Kicker links, h1 zentriert, Lead links, Uhr rechts, Scroll-Hinweis auf `left: 50%`. Fünf Elemente, vier Bezugskanten. Alle anderen drei Seiten sind durchgehend linksbündig — die Startseite ist die einzige mit Mittelachse. Zentriert und linksbündig im selben Block ist der klassischste Grund, warum eine Seite nach Einzelteilen aussieht.
**Soll:** Alles links. `align-items: start`, `text-align: left` in `.kp-mitte`, Hinweis auf die Gutter-Kante. Die Uhr zeigt ohnehin die Zeit des *Besuchers* in dessen Zeitzone, sagt nichts über Nicolas, ist `aria-hidden`, auf dem Handy versteckt und der einzige JS-abhängige Inhalt der Startseite — streichen oder zu einer echten Aussage machen (feste Zeitzone + Verfügbarkeits-Zustand).
**Dateien:** `home/kopf.css:85-105,124-139,156-163`, `home/Kopf.tsx:42-56,79-81`
**Zahlt auf:** clean

### G4 · Die Arbeiten sehen auf / und /arbeiten aus wie zwei Websites
**Ist:** Dieselben drei Projekte sind auf der Startseite flache Textzeilen mit Haarlinie und 4px-Streifen, auf /arbeiten ein `rotateX(56deg) rotateZ(-10deg)`-Deck mit preserve-3d, wachsenden Schatten und Atem-Keyframe. Keine gemeinsame Eigenschaft. Das ist der Weg vom Schaufenster ins Portfolio, also die wichtigste Kante der Seite. `stapel.css:71-96` hält eine Fassung `.st--klein` „für die startseite" bereit, die niemand rendert.
**Soll:** Eine Darstellung. Wenn der Stapel der Auftritt bleibt: `.st--klein` auf der Startseite einsetzen (blendet die Meta-Zeile aus — genau die Abstufung, die man will). Wenn die Zeilen bleiben: das Deck in dieselbe Zeilenform überführen, Tiefe als Detail an der Zeile.
**Dateien:** `home/Arbeiten.tsx:37-60`, `home/arbeiten.css:30-71`, `referenzen/Stapel.tsx:141-225`, `referenzen/stapel.css:71-96,126-138`
**Zahlt auf:** gezielte Tiefe, clean

### G5 · /arbeiten wird von keiner Seite verlinkt · und ohne JS gibt es keine Navigation
**Ist:** `HomeDevice` benutzt `buildPath("referenzen")` nur als Präfix für die Einzel-Cases — ein Link auf die Übersicht existiert nirgends. Das Menü rendert seine drei Einträge nur unter `{open && (`, im ausgelieferten HTML steht also kein einziger Navigationslink. Die Überschrift „arbeiten" auf der Startseite sieht aus wie ein Einstieg und ist keiner. Dazu: die drei Projektzeilen tragen ihre Klickbarkeit nur im Hover (Streifen-Scale, Farbwechsel) — auf dem Handy sind es drei graue Zeilen zwischen Haarlinien, während das Pfeil-Motiv „→" auf derselben Seite existiert, nur beim CMS-Link.
**Soll:** (1) Echter Link unter die drei Zeilen („alle arbeiten →"). (2) Menüeinträge immer ins DOM, nur Sichtbarkeit schalten — oder die drei Links zusätzlich in den Footer. (3) Jede `.ar-zeile` bekommt ein „→" als dritte Spalte in `--tx-3`, das im Hover auf Lime geht und 4px wandert.
**Dateien:** `home/Arbeiten.tsx:44-57`, `home/arbeiten.css:43-62`, `device/DeviceNav.tsx:114`
**Zahlt auf:** clean

### G6 · Zwei Lime-Vollflächen auf der Startseite, obwohl die Datei „genau eine" behauptet
**Ist:** `schluss.css` schreibt mehrfach, `.sl` sei „die EINZIGE grosse lime-flaeche" und knalle, weil sie einmal vorkomme. Zwei Sektionen darüber ist `.lb` eine randlose Lime-Bahn mit Schrift bis 70px. Die Wirkung ist verbraucht, bevor man ankommt. Und direkt *unter* der Vollplatte kommen 90–140px schwarzer Fussstreifen mit 10px grauer Schrift und Haarlinie — der letzte Eindruck der Seite ist eine graue Fusszeile, nicht die Farbe.
**Soll:** Laufband auf Void-Grund stellen, Wörter in Lime (Lime als Schrift auf Dunkel ist der zweite erlaubte Einsatz) — dann ist die Vollplatte am Ende die einzige Fläche. Den Footer in die Lime-Platte hineinnehmen, in Ink auf Lime, Haarlinie `rgb(8 8 11/0.25)`. Dann endet die Seite auf der Fläche, die enden soll.
**Dateien:** `home/laufband.css:5-11,41-45`, `home/schluss.css:10-17`, `HomeDevice.tsx:79-91`
**Zahlt auf:** fette Formen

### G7 · Die Tiefe ist bimodal statt „ab und zu"
**Ist:** Gezählt über die vier Seiten: Home (sechs CSS-Dateien) hat **null** `box-shadow`, **null** `backdrop-filter`, **null** Relief. `studio.css` ebenfalls null. /kontakt hat allein in `konsole.css` zwölf Shadow-Blöcke plus Feld, Schalter, Gehäuse, Klappe, Knopf, Verriegelung, zwei Bolzen und Pegelanzeige — alles in **einer** Bildschirmhöhe, gegen die Regel „max ein Gerätemoment pro Bildschirmhöhe". Zwei Seiten ohne Material, zwei mit dichter Gerätesprache.
Dazu drei Detailfehler, die die Tiefe kosten, die da ist: `.gl` trägt selbst ein `backdrop-filter` und bildet damit für sein `::before` einen Backdrop-Root — die Kanten-Refraktion sammelt nur die eigenen Verläufe, nicht die Szene. `.kx-lock` blurrt bei 88% Deckkraft, `.lab-menu` bei 94% — bezahlte Kompositionsschichten für einen Effekt, der nicht ankommt. Und vier grossflächige `blur()`-Ebenen animieren `scale()` mit permanentem `will-change` (Blur-Neurasterung statt Verschiebung).
**Soll:** /kontakt auf einen Gerätemoment reduzieren — Schutzkappe mit Verriegelung behalten, `.lab-field`/`.lab-switch`/`.kx-meter` flach (1px Haarlinie statt inset, Lime nur als Zustandsfarbe). Auf Home und /studio je *einen* Tiefen-Moment einziehen: `.ar-strich` als schmale erhabene Kante statt flaches Rechteck. `backdrop-filter` aus `.gl` (bei `--bl-body: 4px` verwischt es auf #08080b ohnehin nichts) — dann sammelt das `::before` die echte Seite. `.lab-menu`-Blur streichen, `.kx-lock` auf 0.55 senken. `scale()` aus `labAmbientA/B`, `will-change` weg, auf Seiten mit HeroAtmo eines der beiden Wolkensysteme abschalten.
**Dateien:** `kontakt/konsole.css`, `device/device.css:108-164,431-446,940-1000,1062-1097,1224`, `home/arbeiten.css:43`, `device/hero-atmo.css:121-159`
**Zahlt auf:** gezielte Tiefe

### G8 · Nach dem Hero bewegt sich fast nichts · und auf dem Handy gar nichts
**Ist:** Startseite: Kammer statisch (bewusst), Arbeiten nur Hover, EigenesCms nur Hover, Schluss nur Hover. Einzige laufende Bewegung: das Laufband. /studio hat genau **eine** Bewegungsdeklaration in der ganzen Datei (`transition: border-color`) und rendert nicht einmal die Ambient-Wolken. Auf dem Handy gibt es kein Hover — vier von sechs Sektionen der Startseite sind dort tote Flächen, darunter die drei einzigen Links. Der Scroll-Pfeil im Hero bewegt sich nicht. Und `AutoReveal` läuft auf jeder Seite durch `querySelectorAll`, findet null Elemente (jede Section trägt `data-no-reveal`) — es gibt auf der ganzen Seite keine einzige scroll-reaktive Bewegung ausser der Fortschrittslinie.
**Soll:**
- Pro Sektion ein immer laufender Mikro-Anteil, Hover verstärkt nur — die Regel steht schon in `device.css` bei den VU-Segmenten. `.ar-strich` flache scaleY-Keyframe (1 → 1.08, 4s, per `--i` versetzt), `.sl-key` langsamer Hub-Atem, `.cc-akzent` wandernde Helligkeitswelle wie `.aq-line`.
- Scroll-Pfeil: `kpTipp 2.4s ease-in-out 1.5s infinite` hinter den Eintritt ketten (X-Anteil `-50%` mitführen, sonst springt er in die Mitte).
- /studio: `lab-ambient` mitrendern; den „weg"-Abschnitt auf `.lx-row` umstellen — die scroll-getriebene Trennlinie ist fertig im System, ein Klassenwechsel gibt der Seite ihre einzige scroll-reaktive Bewegung.
- Reveal entscheiden: entweder `data-no-reveal` von den Content-Sektionen nehmen, oder `AutoReveal` + `useReveal.ts` + Reveal-CSS ersatzlos löschen und Eintritte über `animation-timeline: view()` bauen (null JS, friert nirgends ein).
- Laufband braucht `animation-play-state: paused` bei `:hover`/`:focus-within` plus `tabIndex` — WCAG 2.2.2, `prefers-reduced-motion` reicht dafür nicht.
**Dateien:** `home/arbeiten.css:48-62`, `eigenescms.css:43-45`, `schluss.css:55-57`, `kopf.css:156-163`, `studio/studio.css`, `StudioDevice.tsx`, `AutoReveal.tsx`, `globals.css:770-828`, `home/laufband.css:13-19`
**Zahlt auf:** interessante Bewegung · **die Kategorie, die der Seite komplett fehlt**

### G9 · Das Raster hat drei Startkanten und acht Sektionsabstände
**Ist:**
- **Zwei Sektions-Modelle:** Home und /studio setzen symmetrisches `padding: var(--rh-m) …`, die drei Tailwind-Seiten nur `pb-rh-m`. Derselbe Token bedeutet auf der Hälfte der Seiten 168px und auf der anderen 336px — mehr als `--rh-xl`.
- **Drei Textkanten bei 1440px:** Home-Hero 172px (Gutter *innerhalb* der Schale wegen border-box), /arbeiten-Hero 100px, alles andere 180px. Auf /arbeiten springt die Kante innerhalb einer Seite um 80px zwischen h1 und der nächsten h2.
- **Acht reale Abstände** (58/72/112/168/176/224/240/336) auf einer Skala mit vier Stufen; `--rh-xl` liest niemand.
- **Die Nav hat ihr eigenes Raster:** `max-width: 1280px; padding: 0 22px` — harte Zahlen, vierte Schalenbreite. Das Logo steht auf keiner Breite auf der Kante der Headline darunter, mal 2px daneben, mal 78px.
- **Vier Hero-Höhen:** 100svh / 78svh / 86svh / keine.
- **/studio ist fünfmal derselbe Block** mit fünfmal 336px identischem Nichts — kein Abstand sagt etwas über Zusammengehörigkeit.
- **Tote Tokens:** `--measure`/`--measure-lead`/`--measure-h`/`--shell-narrow` null Verwendungen, stattdessen 18 Zeilenlängen halb in ch, halb in px (620px sind auf dem Handy 72 Zeichen, auf dem Desktop 58 — die Zeilenlänge ändert sich genau dort, wo sie stabil bleiben sollte). `--sp-1…8` in keiner der vier Seiten benutzt, dafür 18 freie Tailwind-Stufen inklusive der 7 und 9, die der eigene Kommentar als Problem benennt.
**Soll:** Ein Sektions-Modell (`padding-bottom`-only, Home als kommentierte Ausnahme, weil dort jede Sektion eine eigene Farbfläche ist). Gutter immer auf die `section`, `max-width` immer auf ein Kind — `.kp` bekommt `padding-inline`, `.kp-lage` nur noch `max-width`. Auf /arbeiten den Textblock auf `max-w-shell`, nur den Stapel auf `shell-wide` ausbrechen. `.lab-nav-inner` auf `var(--shell-wide)`/`var(--gutter)`. `--nav: 64px` einmal in `globals.css` (steht heute viermal). Eine Hero-Höhe. `/studio`-Blöcke staffeln (`--rh-s` für die zusammengehörenden drei, `--rh-l` für die Schnitte). `--measure`/`--measure-lead` als Tailwind-maxWidth registrieren, 560/620/640px darauf vereinheitlichen. `--sp-*` entweder registrieren oder löschen.
**Dateien:** `globals.css:364-374,410-428`, `tailwind.config.ts:34-48`, `home/kopf.css:11,75-83`, `studio/studio.css:6,11,58`, `device/device.css:562-570`, alle fünf Device-tsx
**Zahlt auf:** clean

### G10 · Der Hell-Dunkel-Wechsel findet auf genau einer von vier Seiten statt — und dort zweimal am selben Platz
**Ist:** Die einzige helle Fläche im aktiven UI ist die Kammer auf der Startseite. /studio ist 1.100 Zeilen ununterbrochenes #08080b, /arbeiten und /kontakt haben keine einzige helle Sektion. Das ist nicht flächig-clean, das ist monoton — und die Startseite beweist auf derselben Domain, dass es anders geht.
Gleichzeitig rendern Home und /studio *beide* `<Kammer />` als zweite Sektion und `<Schluss />` als letzte, mit identischen Massen. Ein Schnitt, der auf der nächsten Seite an derselben Position wiederkommt, tut beim zweiten Mal nicht mehr weh.
**Soll:** Pro Unterseite genau eine Kammer, an *unterschiedlicher* Stelle: /studio als schmale helle Bahn zwischen Person und Weg (nicht als volle Höhe an Position zwei), /arbeiten zwischen Stapel und dem ehrlich-Satz (dort steht ohnehin ein einzelner Satz), /kontakt zwischen Konsole und „was danach". Dieselbe Klasse wiederverwenden.
**Dateien:** `home/kammer.css:13`, `Kammer.tsx`, `StudioDevice.tsx:67`, `ReferenzenDevice.tsx`, `KontaktDevice.tsx`
**Zahlt auf:** fette Formen, clean

### G11 · /kontakt endet in der verbotenen Kachelliste
**Ist:** `grid md:grid-cols-3`, pro Zelle `<h3>` plus `<p>` — der Standardblock, wörtlich. Der Rest der Seite ist als Gerät gebaut, und dann kippt der Schluss in das Layout, das jede Agentur-Seite hat. Inhaltlich sagen die drei Absätze dasselbe wie der Hero-Satz drüber („Ticket-System" steht zweimal auf einer Bildschirmhöhe). /studio löst dieselbe Datenform (`[string, string][]`) als Zeilenliste.
**Soll:** Auf das `st-weg`-Zeilenmuster umstellen (Label links, Halbsatz rechts) und daraus eine gemeinsame Komponente machen. Absätze auf je einen Halbsatz. Der dritte Eintrag „du kriegst eine zahl" muss zur Preis-nach-Gespräch-Haltung passen.
**Dateien:** `KontaktDevice.tsx:97-110`, `kontakt/kontakt.dict.ts:74-78`, `StudioDevice.tsx:106-113`
**Zahlt auf:** clean

### G12 · Der einzige Vollbild-Markenmoment setzt den Namen in 11px Systemschrift
**Ist:** Bei jedem Seitenwechsel eine schwarze Vollbildfläche mit Lime-Kante — die perfekte Bühne. Darauf steht `lacønis` als 11px-Text bei 50% Deckkraft in der Systemschreibmaschine (`var(--font-mono)`, siehe K1). Das gezeichnete Logo kommt auf der ganzen Seite nie grösser als 17px vor. Dazu läuft der Vorhang auch beim *ersten* Laden (er hat `key={pathname}`), ist also ein 560ms-Ladebildschirm für jeden Erstbesucher, behält danach dauerhaft `will-change` auf einer Vollbild-fixed-Ebene, und liegt mit `z-index: 9998` über der Nav (die auf 60 steht — der Kommentar behauptet das Gegenteil).
**Soll:** `<Wortmarke />` statt `<span>`, Höhe `clamp(28px, 6vw, 64px)`, `currentColor` bei 0.35. Ersten Mount überspringen (Pfad in `useRef` merken). `will-change` streichen. `.lab-nav` z-index über 9998, dann steht die Leiste und der Vorhang läuft dahinter durch — wie beschrieben.
**Dateien:** `PageTransition.tsx:37-43`, `pagetransition.css:24-34,46-55`, `device/device.css:551-556`
**Zahlt auf:** fette Formen

### G13 · Der Ladezustand blitzt hell zwischen zwei schwarzen Seiten
**Ist:** `loading.tsx` ohne eigenen Hintergrund, läuft also auf dem hellen html-Grund. Der Indikator ist Lime bei 80% — auf #e9e9e7 rund 1,2:1, praktisch unsichtbar. Der Text bei 35%. Und gleichzeitig fährt der schwarze Vorhang: erst schwarz, dann hell, dann schwarz.
**Soll:** `min-h-[100svh]` mit `background: var(--su-void)`, Indikator in Lime auf Schwarz, Text als `.lab-label`. (Löst sich teilweise mit K2 mit.)
**Dateien:** `app/loading.tsx:10-25`
**Zahlt auf:** clean

### G14 · Menü springt beim Öffnen seitwärts · und hat keine Dialog-Semantik
**Ist:** `body.style.overflow = "hidden"` ohne `scrollbar-gutter: stable`. Auf jedem System mit klassischer Bildlaufleiste (Windows, Linux, Chrome) rücken Seite *und* fixierte Kopfleiste um die Leistenbreite — „der eine grosse moment" beginnt mit einem Ruck des ganzen Bildschirms. Am Mac fällt es nicht auf, deshalb hat es keiner gesehen. Dazu: kein `role="dialog"`, kein `inert` auf dem Rest, kein Fokus rein/zurück, kein Schliess-Übergang nach einem sorgfältig inszenierten Weg rein, und der aktive Eintrag hat keine eigene Markierung (translateX(14px) ist auf Touch tot).
**Soll:** `html { scrollbar-gutter: stable }`. `role="dialog" aria-modal="true"`, `inert` auf `.lab-root` solange offen, Fokus auf den ersten Link und zurück auf den Burger. Aktiver Eintrag: Lime-Haarlinie links mit langsamer opacity-Keyframe. Schliessen über `data`-Attribut + `animationend`.
**Dateien:** `device/DeviceNav.tsx:55-64,114-147`, `globals.css:143-148`, `device/device.css:719-723`
**Zahlt auf:** interessante Bewegung, clean

### G15 · Farbfamilien und Grautöne driften
**Ist:** Drei parallele Graureihen nebeneinander — neutral (#141414, #1a1a1a, #232323), kühl-korrekt (#14141a, #1c1c23, #2a2a33) und kühl-danebenliegend (#131317, #16161c, #171720). Die deklarierte Rampe `--g-0…--g-5` hat **null** Verwendungen; `--su-glass`/`--su-raise`/`--su-sink`/`--sh-1`/`--sh-2`/`--sh-in`/`--ln-soft`/`--ln-loud`/`--r-xs` ebenfalls null, während 35 handgeschriebene inset-Schatten daneben stehen. Sechs verschiedene „Nachtfarben" für dieselbe dunkle Fläche (u.a. die grünstichige Quittung `#101408`). Vier Text-Stufen im Token gegen 49 literale Alphas im Code. Vier Violetts ohne gemeinsame Quelle (`#b084d3`, `#5c3590` in der Kammer mit falscher Kontrastzahl im Kommentar, `#7a4bd1` als Kundenfarbe). Der Papier-Grain liegt mit `mix-blend-mode: overlay` auch über der Lime-Vollplatte. Der Scrollbar-Daumen ist Lime bei 55% auf hellem Grund. Kundenfarbstreifen bis herab zu 2,62:1. Der Laufband-Trenner bei 2,86:1.
**Soll:** Grautöne auf `--g-0…--g-5` mappen (jeden Wert auf die nächste Stufe runden), danach `--bg`/`--surface`/`--surface-elev`/`--anthrazit` löschen. Die 35 inset-Literale auf `var(--sh-in)`; Tokens, die danach null Leser haben, löschen. Die 9 literalen Alphas auf `--tx-2`/`--tx-3`. `#5c3590` als `--accent-2-ink` aufnehmen, Kommentarzahl auf 7,3:1 korrigieren. Grain auf die dunklen Kapitel begrenzen (oder `soft-light`). Scrollbar-Daumen voll Lime auf echtem Track. Streifen auf leicht aufgehellter Bahn zeichnen, Fallback von `--tx-4` auf `--tx-2`. Trenner von 0.42 auf 0.5. Grün aus `konsole.css:194` raus.
**Dateien:** `globals.css:15-18,175-186,207-216,337-408`, `device/device.css`, `konsole.css:194`, `case.css`, `stapel.css`, `home/kammer.css:32-34`, `arbeiten.css:43-46`, `laufband.css:41-45`
**Zahlt auf:** clean

### G16 · Copy-Dopplungen und falsche Versprechen
- **Derselbe Schluss-Satz auf drei Seiten hintereinander** („und wenn ich nicht der richtige bin, sage ich dir das auch") — der normale Weg ist /arbeiten → Case → /kontakt, man liest ihn dreimal. Behalten auf /kontakt (dort ist er eine Zusage), auf den anderen zwei kürzen.
- **„keine Agentur, keine Zwischenschicht" dreimal auf /studio** (lead 61, bioSub 74, weg 84), zweimal wortgleich. Nur in bioSub behalten.
- **Die h1 von /studio steht zwei Sektionen später wörtlich im Fliesstext.** `bio` auf die Information kürzen, die oben nicht steht.
- **Zwei Ziehen-Hinweise auf /arbeiten** keine 200px auseinander, obwohl das Dict im Docstring sagt, jede Aussage stehe genau einmal.
- **Projektzahl dreimal hartcodiert** („Drei Projekte", „nummer vier", Meta) während die Liste aus Daten kommt — beim vierten Eintrag lügen alle drei gleichzeitig.
- **og-Titel von /arbeiten heisst noch „referenzen"** (EN ist schon korrigiert, DE/FR übersehen).
- **Englisches „i" klein** an sieben Stellen, mitten in Sätzen mit „I'd"/„I'll" — kein Stil, ein Tippfehler.
- **Schema und Breadcrumb zeigen auf /ueber-mich und „leistung · web"** — Google zeigt den Breadcrumb im Suchergebnis an.
- **Eupen im OG-Bild und in der Browser-Konsole** — beides sichtbare Oberflächen, nur nicht die eigene Seite. Auf „ostbelgien · belgien".
- **Vier zu lange Stellen**, allen voran `konzeptBody` mit 47 Wörtern (ein Fünftel der Case-Copy), das die eigene Ehrlichkeit über drei Sätze erklärt und dabei anfängt, nach Rechtfertigung zu klingen.
**Dateien:** `referenzen.dict.ts:56,58,80,82`, `case.dict.ts:79,83,169,173`, `kontakt.dict.ts:67,77,163-173`, `studio.dict.ts:58-59,61,72,74,84,94`, `home.dict.ts:52`, `lib/seo/getMeta.ts:105-112`, `layout.tsx:77`, `StructuredData.tsx:89`, `studio/page.tsx:56`, `opengraph-image.tsx:61`, `twitter-image.tsx:65`, `ConsoleGreeting.tsx:76`
**Zahlt auf:** clean

---

# POLITUR

### P1 · Toter Code · ~8.200 Zeilen in 40 Dateien
Von keiner Route erreichbar: `leistung/LeistungDevice`, `preise/*`, `ueber/*`, `leistungen/web/*`, `Moodboard`, `PolaroidBoard`, `ReferenzenIndex`, `RefThumb`, `shared/{GooeyText,MagneticButton,PageHero,TiltCard,useCardDrag}`, `KontaktMultistep` (1.012 Zeilen), `werk/Raum`, `ui/Tag`, `data/{case-claims,verfuegbarkeit,web-ablauf}`, `lib/{paket-pdf,paket-pricing,useReveal,useScrollSkew}`, `lens.css`, `caliper.css`, `ueber.css`, `raum.css`. Das ist mehr Code als alle fünf lebenden Seitenbauteile zusammen — er verfälscht jedes grep (die alte Plugin-Zähler-Copy taucht noch dreimal auf) und hält `jspdf` am Leben.

**Wichtig dabei:** `StudioDevice` importiert `leistung.dict.ts` für *einen* Key und schleppt damit die komplette Plugin-Zähler-Tabelle plus „preise ansehen" ins Client-Bundle von /studio — lesbar im Quelltext. Editor-Block in eine eigene Datei ziehen, dann kann `leistung.dict.ts` mit weg.

Ebenfalls löschen: `.dv-stats`/`.dv-stat-value` (Kennzahlen-Strip als fertige CSS-Regel) und `.st--gross .st-nr` (Sektions-Nummerierung) — beides verboten, beides so vorbereitet, dass das Markup in zwei Minuten wieder dasteht. Dazu die tote Glas-Bibliothek in `globals.css:504-603`, die vier Kommentar-Stümpfe ohne Regeln in `device.css:402-415`, die zwei toten HeroAtmo-Varianten (~90 Zeilen), die elf toten Dict-Keys, `jspdf` + drei `@fontsource`-Pakete, `public/referenz-konzept/` (4,6 MB öffentlich abrufbares verworfenes Konzeptmaterial), `public/placeholders/`, die Unsplash-`remotePatterns`, das unsichtbare Raster-div im Layout, und die Redirect-Ketten in `next.config.mjs` (sieben Pfade machen zwei 301-Sprünge).

### P2 · Fünf Schriften geladen, drei benutzt · 145 KB ohne Gegenwert
Caveat (73 KB) rendert auf den vier Seiten **null** Elemente — nach K11 hat sie überhaupt keine Verbraucher mehr. Bricolage rendert genau ein Element (die klassenlose h3 auf /kontakt, die still in die globale h1/h2/h3-Regel fällt — eine vierte Schrift, die dort sonst nicht vorkommt). Alle fünf sind auf jeder Seite als `preload` im HTML. Caveat raus, Bricolage streichen und `globals.css:166-170` auf `var(--font-lab)`, Instrument Sans und Geist Mono auf `preload: false` mit `display: swap`. Die h3 auf `lab-display text-title` statt harter 17px.

### P3 · Bilder ohne Masse · 413 KB für eine 242×152-Briefmarke
Drei rohe `<img>` ohne `width`/`height`/`loading`/`sizes`, eslint-Warnung per Inline-Kommentar stillgelegt. Die Datei ist 1440×6496px (423 KB); der Browser dekodiert 9,35 Megapixel (≈37 MB RGBA) für eine Kachel, die `object-fit: cover` fast vollständig wegschneidet — plus Layout-Shift bei jedem Laden. Auf `next/image` mit `sizes` (wird im Live-Baum genau einmal benutzt, dort korrekt), plus beschnittene Variante für den Stapel.

### P4 · rAF-Schleifen ohne Bremse
`ProjektAnsicht` läuft dauerhaft mit 60fps, auch weit ausserhalb des Viewports und auch bei reduced-motion (die Prüfung spart nichts ein): vier erzwungene Layout-Messungen pro Frame plus `style.width` als Layout-Eigenschaft, und beim Zurückkommen aus dem Hintergrund-Tab addiert `dt` die volle Pausendauer — die Aufnahme knallt ans Ende. `ShaderField` ruft `getBoundingClientRect()` bei *jedem* `pointermove` auf `window`, auch wenn der Hero längst weggescrollt ist. `CursorDot` hängt an `pointerrawupdate` (bis 1000 Hz) und schreibt jedes Mal einen Style. Der Shader rechnet ~100 Sinus pro Pixel ohne Deckel auf die Zeichenfläche und ohne `webglcontextlost`-Handler; bei reduced-motion bleibt das Feld nach jedem Resize schwarz (der Puffer wird geleert, nur der Mount zeichnet). Stapel-Atmung lässt 13s endlos den Blur-Radius neu rechnen.
Fixes: `dt` auf einen Frame deckeln, Fortschritt auf `transform: scaleX()`, Drift als CSS-Keyframe, rect in `resize()` cachen, `CursorDot` über rAF entkoppeln, fbm-Oktaven 5→3 und Zeichenfläche auf 1280px deckeln, `standbild()` am Ende von `resize()`, Blur-Radius auf einen festen Mittelwert.

### P5 · Barrierefreiheit · Restposten
`<main>` im Root-Layout schluckt `banner` und `contentinfo` — Screenreader finden auf keiner Seite Kopf oder Fuss. Das Kontaktformular meldet Erfolg *und* Fehler stumm (Fokus fällt auf `<body>`, keine Live-Region) — der eine Moment, der zählt. Kein Skip-Link. `.ar-zeile`, `.cc-key`, `.sl-key`, `.sl-mail` und die Footer-Links ohne eigenen `:focus-visible` (auf der Lime-Fläche verschwindet Lila mit 2,4:1). Verschachtelte `<main>` auf /preview. Portrait mit `alt=""`. `contentEditable` ohne Rolle und Namen in `/labor`.

### P6 · Lücken im reduced-motion-Netz
`.cs-toggle button` (Überschwinger-Kurve), `.st-flaeche` (`transition: filter`) und `.cc-key` haben kein reduce-Gegenstück, während die gleichartigen Nachbarn eines haben. Der globale Sicherheitsnetz-Block in `globals.css:1064-1078` fängt sie nicht — er kennt nur Klassen, die es nicht mehr gibt.

### P7 · Kommentare beschreiben eine Seite, die es nicht mehr gibt
„die seite hat sieben flaechen" (sind sechs), „drei zahlen statt drei absaetzen" (Zahlen sind raus), „KEINE dopplung mit /leistung: dort steht der volle vergleich" (/leistung existiert nicht, der Vergleich auch nicht — *deshalb* zeigt der Knopf „was drin ist →" ins Leere), Laufband-Docstring über acht Wörter und Meta-Begriffe (trägt heute zwei Sätze), jsdoc-Beispiele mit `/leistung` und routeKey `preise`. In diesem Projekt sind die Docblocks die Dokumentation — falsche führen beim nächsten Umbau in die falsche Richtung. Dazu der `num`-Parameter in `LegalLayout`, der bei beiden Aufrufern `⎔` ist und beim nächsten Mal zu 01/02 einlädt.

### P8 · Verwandtes doppelt gebaut
Mailadresse an fünf Stellen hart im Code, obwohl `contact.ts:9` wörtlich „Niemals mails hardcoden" sagt. Wortgleiche Copy in zwei Dicts (Schluss-Block, `cmsH2`/`cmsLead`) — `studio.dict.ts:19-20` warnt selbst davor. Drei Lösungen für die Schluss-Sektion plus zweimal derselbe Inline-Hack am Knopf. Projektdaten (`kurz`, `ort`, `kategorieLabel`, `tags`, `notiz`) ohne Locale-Dimension — auf /fr und /en unverändert deutsch, inklusive Case-Hero-Beschriftungen. `--tx-*` gegen `--fg` als zwei gegenteilige Primärtext-Wahrheiten. Zwei Sektions-Bauteile mit identischer Datenform in verschiedener Optik.

---

# DIE DREI, DIE AM MEISTEN VERÄNDERN

**1 · G2 — Die Schriftskala auf zwei h1-Stufen, drei Breiten, drei Laufweiten, drei Durchschüsse ziehen.**
Fünf h1-Grössen, sieben `font-stretch`-Werte, 20 letter-spacings und neun line-heights sind der Grund, warum die vier Seiten wie vier Zeitpunkte aussehen. Und die Reserve, aus der „fette Fonts als Träger" kommen müsste — wght 800–900, wdth bis 125% — liegt komplett brach, während die Achse als Zwei-Prozent-Rauschen verbraucht wird. Solange jede Datei ihr eigenes clamp erfindet, gibt es keinen Ort, an dem man das korrigieren kann. Das ist der Punkt, an dem die gewünschte Typografie entsteht oder nicht.

**2 · G8 + K4 — Bewegung einziehen, die immer läuft.**
Nach dem Hero bewegt sich auf der Startseite nur das Laufband, /studio hat genau eine Bewegungsdeklaration, und alles Übrige hängt am Hover — auf dem Handy also an nichts. Gleichzeitig liegen fünf fertig gebaute Bewegungs- und Tiefensysteme tot im Repo (GlasLicht nirgends gemountet, `schweben` ohne Shots, der heisse Kern nie gerendert, der Fortschrittsbalken ohne `@supports`, die `.lx-row`-Transition von einem Kommentar zerstört). Die „geilen interessanten Animationen" sind grösstenteils schon geschrieben — sie müssen nur aufgerufen werden. Das ist das beste Aufwand-Wirkung-Verhältnis der ganzen Liste.

**3 · K3 + G1 — Lime unabgewandelt, und eine Knopfform für alle vier Seiten.**
Die Hauptaktion der Seite ist heute weder Lime noch überall dieselbe: sie ist zwei Fantasiegrüns plus Olivsockel plus `brightness()`-Filter, und sie sieht auf / aus wie ein Textlink und auf /arbeiten wie eine Plastiktaste. Dazu rechnet die fixierte Nav die Lime-Vollplatte auf 64px Höhe zu Oliv, das Hero-Feld liefert an seinem hellsten Punkt #737f35, und Favicon und Link-Vorschau — die zwei Berührungspunkte *vor* der Seite — zeigen ein anderes Grün. Marke und primäre Handlung sind das, was ein Besucher zuerst und zuletzt sieht; beides ist gerade uneinheitlich.