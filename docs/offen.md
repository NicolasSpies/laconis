# offen

Stand: 4. august 2026. Was noch aussteht, grob nach wirkung sortiert.
Alles darunter ist besprochen, nichts davon ist eine überraschung.

---

## 1 · heros · was steht, was fehlt

| seite | hero |
|---|---|
| `/` | shader-feld |
| `/leistung` | die lupe |
| `/referenzen` | die gebauten seiten schweben im raum |
| `/preise` | zwei lichtbänder bilden einen korridor |
| `/ueber-mich` | licht auf dem portrait folgt der hand |
| `/kontakt` | ringe laufen nach aussen wie eine stimme |
| `/referenzen/[slug]` | laptop+handy mit der echten seite, direkt im hero |

Alle heros stehen. Sobald weitere projekte aufnahmen haben, füllt sich
der referenzen-hero von selbst · aktuell schwebt dort nur fabry, weil
nur fabry aufnahmen hat.

Wichtig weiterhin: **nicht mechanischer werden.** Die geräte-sprache
trägt die bedienelemente, aber ein hero soll einladen und nicht nach
werkbank aussehen.

## 2 · mehr wort und bild statt raster

Der `ArtQuote` ist der anfang: grosse zitate, zeilenweise versetzt,
jede zeile driftet für sich. Weiter gedacht:

- text, der auf ein bild reagiert (oder umgekehrt) und wo der
  zusammenhang inhaltlich stimmt, nicht nur dekorativ ist
- einzelne wörter, die ihre bedeutung mitspielen · „schnell" das
  wegrutscht, „schwer" das durchhängt
- sektionen, die bewusst aus der spalte ausbrechen statt brav im
  raster zu bleiben. sachliche teile (FAQ, stack, laufende kosten)
  bleiben im raster, das ist dort richtig.

## 3 · letzte seite im alten stil

`/web-performance-ostbelgien` ist eine SEO-landingpage und läuft noch
in der alten richtung. Erst entscheiden, ob sie überhaupt bleibt ·
sie ist von der navigation aus nicht erreichbar und existiert nur für
suchanfragen. Wenn ja: geräte-stil wie die pflichtseiten.

Erledigt: branding ist ersatzlos raus, impressum und datenschutz
laufen im geräte-stil (und damit ohne die letzte handschrift auf der
seite).

## 5 · screenshots nachziehen · erledigt, aber manuell

`npm run shots` zieht alle aufnahmen neu (oder `npm run shots
fabry-baumpflege` für eins). Playwright ist bewusst KEINE feste
abhängigkeit · 300 MB browser für ein skript, das dreimal im jahr
läuft, gehören nicht in jede installation. Das skript sagt beim
ersten lauf, was zu installieren ist.

Offen bleibt: es läuft nicht von selbst. Wer die kundenseite ändert,
muss dran denken.

## 6 · `public/nicolas.jpg` fehlt

Solange die datei nicht liegt, zeigt `/ueber-mich` das monogramm.
Der austausch braucht keine codeänderung.

## 7 · kleinkram

- klassen-prefix ist noch `lab-`, obwohl der ordner `device/` heisst.
  1.300 css-zeilen · lohnt nur, wenn sonst nichts ansteht.
- der feature-vergleich auf `/leistung` könnte weitere zeilen
  vertragen (update-aufwand, lizenzkosten, wartung über jahre) · aber
  als weitere messwerte in DEN zwei tafeln, nicht als drittes element.
- alter der bio auf `/ueber-mich` ist raus („29"), weil er still
  veraltet. wenn er rein soll, sagen.

---

## nicht vergessen

Nichts ist gepusht. Der ganze relaunch liegt lokal auf `main`.
