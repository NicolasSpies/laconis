# offen

Stand: 4. august 2026. Was noch aussteht, grob nach wirkung sortiert.
Alles darunter ist besprochen, nichts davon ist eine überraschung.

---

## 1 · jede seite bekommt ihren eigenen hero

Der lupen-hero auf `/leistung` ist der massstab. Zwei seiten haben schon
einen (home: shader, leistung: lupe), der rest fängt noch mit typo an.

| seite | jetzt | idee |
|---|---|---|
| `/referenzen` | nur typo | die drei projekte als aufnahmen, die sich beim scrollen wie karten auffächern |
| `/preise` | nur typo, messschieber kommt drunter | den messschieber in den hero ziehen statt drunter |
| `/ueber-mich` | portrait im rahmen | portrait reagiert auf den zeiger · licht wandert mit der hand |
| `/kontakt` | nur typo | offen |
| `/referenzen/[slug]` | nur typo | laptop+handy direkt in den hero statt weiter unten |

Wichtig dabei: **nicht mechanischer werden.** Die geräte-sprache trägt,
aber sie darf nicht nach alter fabrik aussehen. Wärmer, weicher,
mehr licht und bewegung als schrauben und riffel.

## 2 · mehr wort und bild statt raster

Der `ArtQuote` ist der anfang: grosse zitate, versetzt gesetzt, wörter
weichen dem zeiger aus. Weiter gedacht:

- text, der auf ein bild reagiert (oder umgekehrt) und wo der
  zusammenhang inhaltlich stimmt, nicht nur dekorativ ist
- einzelne wörter, die ihre bedeutung mitspielen · „schnell" das
  wegrutscht, „schwer" das durchhängt
- sektionen, die bewusst aus der spalte ausbrechen statt brav im
  raster zu bleiben. sachliche teile (FAQ, stack, laufende kosten)
  bleiben im raster, das ist dort richtig.

## 3 · `/leistungen/branding` entscheiden

Läuft noch im alten stil, steht in der sitemap, ist aber von der
neuen navigation aus **nicht erreichbar**. Aktuell die schlechteste
von beiden welten. Entweder in den geräte-stil ziehen oder bewusst
aus der sitemap nehmen. Das ist eine entscheidung, keine aufgabe.

## 4 · restliche alte seiten

`/impressum`, `/datenschutz`, `/web-performance-ostbelgien` laufen
noch im alten stil. Pflichtseiten, aber der bruch ist sichtbar.

## 5 · screenshots der referenzen altern still

`public/cases/fabry-*.jpg` sind momentaufnahmen vom 4.8.2026. Ändert
sich die kundenseite, veraltet die case-study unbemerkt. Ein kleines
skript (playwright, zwei viewports, ablage in `public/cases/`) würde
das lösen. Für weitere projekte sowieso nötig.

## 6 · `public/nicolas.jpg` fehlt

Solange die datei nicht liegt, zeigt `/ueber-mich` das monogramm.
Der austausch braucht keine codeänderung.

## 7 · kleinkram

- klassen-prefix ist noch `lab-`, obwohl der ordner `device/` heisst.
  1.300 css-zeilen · lohnt nur, wenn sonst nichts ansteht.
- alte `Nav` und `Footer` werden auf jeder seite gerendert und per
  CSS versteckt. sauberer wäre, sie nur für die alten seiten zu laden.
- der pegel auf `/leistung` könnte weitere zeilen vertragen
  (update-aufwand, lizenzkosten, wartung über jahre) · aber als
  erweiterung DIESES geräts, nicht als zweites daneben.
- alter der bio auf `/ueber-mich` ist raus („29"), weil er still
  veraltet. wenn er rein soll, sagen.

---

## nicht vergessen

Nichts ist gepusht. Der ganze relaunch liegt lokal auf `main`.
