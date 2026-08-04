# offen

Stand: 4. august 2026. Was noch aussteht, grob nach wirkung sortiert.
Alles darunter ist besprochen, nichts davon ist eine überraschung.

---

## 1 · heros · was steht, was fehlt

| seite | hero |
|---|---|
| `/` | shader-feld |
| `/leistung` | die lupe |
| `/referenzen` | explosionszeichnung · zieht auf UND schaltet die projekte um |
| `/preise` | zwei lichtbänder bilden einen korridor |
| `/ueber-mich` | licht auf dem portrait folgt der hand |
| `/kontakt` | ringe laufen nach aussen wie eine stimme |
| `/referenzen/[slug]` | laptop+handy mit der echten seite, direkt im hero |

Alle heros stehen. Der referenzen-hero zeigt bewusst NICHT die menge
der projekte (es sind drei), sondern die tiefe von einem · das bleibt
auch dann richtig, wenn projekte dazukommen.

Er ist gleichzeitig die navigation: die zeilen daneben legen das
projekt in den stapel, ohne zeiger schaltet er selbst weiter. Wer ein
projekt aufnimmt, muss nichts anfassen · bild, farbe und monogramm
kommen aus `src/data/referenzen.ts`. Nur wenn die liste deutlich
länger wird, lohnt ein blick: drei zeilen neben dem stapel gehen auf,
zehn brauchen wahrscheinlich eine andere anordnung.

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

## 2b · noch offen aus der letzten runde

Aus der rückmeldung vom 4. august ist alles umgesetzt bis auf zwei
punkte, die bewusst liegen bleiben:

- der referenzen-hero ist eine INTERAKTION geworden, kein mini-spiel.
  ein spiel bräuchte eine punktzahl, und die einzige ehrliche zahl
  hier wären drei projekte · das trägt kein spiel.
- die tiefe gravur auf dem typenschild ist nur mit zeiger zu finden.
  ohne zeiger steht sie offen da. wer sie auch am handy als fund
  will, braucht eine eigene geste (kippsensor? wischen?).

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
- `animation-timeline: view()` trägt die trennlinien (`lxDraw`,
  `riDraw`). fällt eine davon aus, sieht man es NICHT · eine tote
  zeitachse lässt das element einfach im grundzustand, und der ist
  hier die fertig gezogene linie. wer sich künftig darauf verlässt,
  muss prüfen, ob der grundzustand das ENDbild ist. wo er der anfang
  sein müsste (zählwerk auf `/preise`), läuft es deshalb über einen
  IntersectionObserver.
- die walzen-zahl im zählwerk (`22` bis `52`) ist die summe der
  zeilen daneben. ändert sich hosting oder domain, muss sie mit ·
  sie steht im dict direkt über den zeilen.

---

## nicht vergessen

Nichts ist gepusht. Der ganze relaunch liegt lokal auf `main`.
