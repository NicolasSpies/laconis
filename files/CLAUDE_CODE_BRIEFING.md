# lacønis — Claude Code Briefing
**Version:** 1.0 · April 2026  
**Projekt:** laconis.be — persönliche Freelance-Website

---

## 1. Über das Projekt

lacønis ist die persönliche Freelance-Website von Nicolas Spies — Graphic Designer, Web Designer & Developer aus Eupen, Belgien. Die Website ist gleichzeitig Portfolio, Verkaufsinstrument und Demo aller technischen Fähigkeiten.

**Philosophie:** "say less, mean more" — lacønis kommt von lakonisch. Wenige Worte, maximale Wirkung. Alles lowercase. Punkte `•` statt Bindestriche oder `—`.

**Wichtig:** Die Website zeigt was Nicolas technisch kann — wenn ein Besucher etwas Beeindruckendes sieht, denkt er: "das will ich auch für meine Website."

---

## 2. Referenz-Dokumente

Im selben Ordner liegen folgende Files — **alle vor dem Bauen lesen:**

| File | Inhalt |
|---|---|
| `laconis_self_briefing.html` | Vollständiges Brand-Briefing |
| `laconis_homepage_mockup.html` | **Design-Referenz** — nur für den visuellen Stil verwenden |
| `homepage.html` | Homepage Wireframe (Inhalt + Layout) |
| `homepage_struktur.html` | Homepage technischer Fahrplan |
| `kontakt.html` | Kontakt-Seite Wireframe |
| `kontakt_struktur.html` | Kontakt Struktur |
| `leistungen_web.html` | Leistungen/Web Wireframe |
| `leistungen_web_struktur.html` | Leistungen/Web Struktur |
| `leistungen_kreatives.html` | Leistungen/Kreatives Wireframe |
| `leistungen_kreatives_struktur.html` | Leistungen/Kreatives Struktur |
| `referenzen.html` | Referenzen-Seite Wireframe |
| `referenzen_struktur.html` | Referenzen Struktur |
| `referenz_detail.html` | Referenz Detail-Seite Wireframe |
| `referenz_detail_struktur.html` | Referenz Detail Struktur |
| `ueber_mich.html` | Über mich Wireframe |
| `ueber_mich_struktur.html` | Über mich Struktur |
| `preise.html` | Preise-Seite Wireframe |
| `preise_struktur.html` | Preise Struktur |
| `laconis_pakete.html` | **Interaktiver Kalkulator** — fertige Komponente, einbauen |
| `shop.html` | Shop Wireframe (Phase 2) |
| `login.html` | Kundenlogin Wireframe (Phase 3) |

---

## 3. Tech Stack

```
Framework:      Next.js 14+ (App Router)
Styling:        Tailwind CSS
Animationen:    Framer Motion
CMS Backend:    ContentCore (eigenes headless CMS, via REST API)
Mails:          Resend oder Nodemailer
Shop:           Stripe (Phase 2)
Hosting:        Hostinger VPS (Nicolas deployt selbst)
Sprachen:       DE / FR / EN (i18n)
```

---

## 4. Design Tokens

### Farben
```css
--lime:      #E1FD52   /* Pantone 13-0630 TN — Hauptakzent */
--anthrazit: #383838   /* Primärtext, Backgrounds dark */
--offwhite:  #F2F2F2   /* Seitenbackground */
--grey:      #D3D3D3   /* Cool Gray 2 C */
--dark:      #111111   /* Hero Background */
```

### Typografie
```
Logo / Wordmark:   Haffer (kommerziell) — nur im Logo
Monospace:         DM Mono — für Labels, Tags, Code-Elemente, Nav
Body:              DM Sans — für Fließtext
Headlines:         Syne (800 weight) — für große Überschriften
```

### Wichtige Regeln
- **Alles lowercase** — Nav-Links, Buttons, Section-Titel, Tags
- **Punkt `•` statt `—` oder `-`** — überall in Texten als Trenner
- **Keine Bindestriche** als Designelement
- Slogans überall kursiv oder als Quotes mit Lime-Randlinie

---

## 5. Seitenstruktur & Routing

```
/                           → Homepage
/leistungen/web             → Leistungen Web
/leistungen/kreatives       → Leistungen Kreatives
/referenzen                 → Referenzen Übersicht
/referenzen/[slug]          → Referenz Detail (dynamisch aus CMS)
/über-mich                  → Über mich
/preise                     → Preise + Kalkulator
/kontakt                    → Kontakt (#projekt Anchor für Multistep)
/shop                       → Shop (Phase 2)
/login                      → Kundenlogin (Phase 3)
/dashboard                  → Kunden-Dashboard nach Login (Phase 3)
```

---

## 6. Navigation — Struktur

```
Links:   leistungen · referenzen · preise · über mich · shop (ausgegraut)
Rechts:  [DE] [FR] [EN] · [login] (ausgegraut) · [projekt starten]
```

- **"projekt starten"** → scrollt zu `/kontakt#projekt`
- **shop** → ausgegraut bis Phase 2 aktiv
- **login** → ausgegraut bis Phase 3 aktiv
- Nav ist sticky mit blur backdrop

---

## 7. Kalkulator — Wichtig & Komplex

Die Datei `laconis_pakete.html` enthält einen **vollständig funktionierenden interaktiven Kalkulator**. Dieser muss als React-Komponente in `/preise` eingebaut werden.

### Was der Kalkulator macht:
- 3 Tabs: Web / Grafik / Bundle
- Pakete mit "Alles aus X plus..." Logik
- Domain ja/nein Toggle (spart 2€/Mt wenn ja vorhanden)
- E-Mail Counter (+5€/Mt pro Mailbox)
- Preis passt sich live an
- PDF-Export Button (Angebot generieren)

### Kalkulator → Kontakt Flow (kritisch!):
Der Button "paket zusammengestellt? → anfrage starten" überträgt die gesamte Kalkulator-Auswahl als URL-Parameter zu `/kontakt#projekt`:

```
/kontakt?paket=standard&seiten=4&cms=2&sprachen=1&domain=nein&mails=2#projekt
```

Die Kontakt-Seite liest diese Parameter aus und:
1. **Überspringt Schritt 1 + 2** des Multistep-Formulars
2. **Startet direkt bei Schritt 3** — zeigt die Zusammenfassung der Auswahl
3. **Schritt 4** ist dann nur noch: Name + E-Mail + Telefon (optional) + Notiz

Wenn jemand direkt zu `/kontakt` geht (ohne Parameter) → startet normal bei Schritt 1.

---

## 8. Multistep-Formular — Schritte

```
Schritt 1: Was brauchst du?
           Optionen: website · branding · grafik · werbetechnik · alles davon 😄

Schritt 2: Welches Paket? (wird übersprungen wenn vom Kalkulator)
           Optionen: web starter · web standard · web pro · bundle · noch nicht sicher

Schritt 3: Zusammenfassung (automatisch befüllt wenn vom Kalkulator)
           Zeigt: Paket · Seiten · CMS-Bereiche · Sprachen · Hosting · Gesamtpreis
           Button: zurück & anpassen | passt so → weiter

Schritt 4: Deine Daten
           Name (required) · E-Mail (required) · Telefon (optional) · Notiz (optional)
           Button: anfrage abschicken →

Nach Absenden: Bestätigungsseite/-meldung + "ich melde mich innerhalb von 24h"
```

---

## 9. ContentCore API

ContentCore ist Nicolas' selbst gebautes headless CMS. Das Frontend kommuniziert per REST API.

**Endpoints die benötigt werden (mit Nicolas abstimmen):**
```
GET /api/referenzen          → alle Referenzen (für Grid + Filter)
GET /api/referenzen/[slug]   → einzelne Referenz (für Detail-Seite)
GET /api/settings            → allgemeine Site-Einstellungen
```

**Datenstruktur Referenz (ungefähr):**
```json
{
  "slug": "fabry-baumpflege",
  "name": "Fabry Baumpflege",
  "kategorie": "web",
  "ort": "Eupen, Belgien",
  "jahr": 2025,
  "beschreibung": "...",
  "aufgabe": "...",
  "tags": ["design", "development", "eigenes cms", "seo"],
  "pagespeed_mobile": 95,
  "pagespeed_desktop": 97,
  "url_extern": "https://fabry-baumpflege.be",
  "bild_hauptbild": "...",
  "bilder_weitere": ["...", "..."],
  "in_arbeit": false
}
```

**Hinweis:** Bis ContentCore API-Endpoints bereit sind → statische Daten als Platzhalter verwenden. Die Komponenten-Struktur soll aber bereits API-ready sein.

---

## 10. Launch-Phasen

### Phase 1 — Launch (jetzt bauen)
```
/ · /leistungen/web · /leistungen/kreatives
/referenzen · /referenzen/[slug]
/über-mich · /preise · /kontakt
```

### Phase 2 — Kurz danach
```
/shop (Stripe Integration · Produkte noch offen)
```

### Phase 3 — Wenn's Zeit gibt
```
/login · /dashboard
(Projektstand · Dokumente · Rechnungen · Auth-System)
```

---

## 11. Besonderheiten & Wichtige Details

### Performance
- Ziel: 95+ Google PageSpeed Score auf Mobile UND Desktop
- Das ist ein messbarer USP und muss von Anfang an ernst genommen werden
- Keine schweren Libraries · optimierte Images · sauberer Code

### i18n (DE/FR/EN)
- Website wird dreisprachig
- Alle Texte müssen in Übersetzungs-Keys ausgelagert werden
- Erstmal nur DE vollständig · FR/EN als leere Keys anlegen

### SEO
- Jede Seite braucht eigene Meta-Tags (title, description, og:image)
- Structured Data wo sinnvoll (LocalBusiness, Portfolio)
- Sitemap.xml automatisch generieren

### Kontakt-Formular
- Absender: `kontakt@laconis.be` oder via Resend
- Nicolas empfängt an: `nicolas@laconis.be`
- Spam-Schutz: honeypot field

### Styling-Referenz
- `laconis_homepage_mockup.html` zeigt den visuellen Stil
- Dark Theme für Hero/Header-Bereiche
- Grid-Hintergrund im Hero (subtil, opacity 0.3)
- Neon Lime (#E1FD52) als Akzentfarbe sparsam einsetzen
- Syne 800 für große Headlines
- DM Mono für alle UI-Labels, Tags, Buttons

---

## 12. Reihenfolge empfohlen

1. **Projekt Setup** — Next.js · Tailwind · Framer Motion · i18n · Folder Structure
2. **Design System** — Farben · Fonts · gemeinsame Komponenten (Nav, Footer, Button, Tag)
3. **Homepage** — erste Seite · gibt den Ton an
4. **Leistungen/Web** — wichtigste Contentseite
5. **Preise + Kalkulator** — komplex · früh anfangen
6. **Kontakt + Multistep** — kritischer Flow mit Kalkulator-Verbindung
7. **Referenzen + Detail** — dynamisch aus API
8. **Leistungen/Kreatives** — einfacher als Web
9. **Über mich** — wartet auf Foto (Fotografin)
10. **SEO · i18n · Performance** — zum Schluss polieren

---

## 13. Was noch fehlt (vor Start klären)

- [ ] ContentCore API Endpoints und Auth
- [ ] Haffer Font Lizenz (für Logo-Wordmark)
- [ ] Foto von Nicolas (Fotografin macht das)
- [ ] ContentCore Screenshots für die Web-Leistungsseite
- [ ] Google PageSpeed Screenshot von Fabry-Baumpflege
- [ ] Finale Merch-Produkte für Shop (Phase 2)

---

*lacønis · nicolas@laconis.be · laconis.be*  
*Briefing v1.0 · April 2026*
