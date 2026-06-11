# web performance index ostbelgien

monatlicher lighthouse-vergleich der lokalen websites · rendert auf
`/web-performance-ostbelgien` (DE · noindex solange demo-daten).

## workflow

```bash
# 1. site-liste prüfen/ergänzen (displayMode: named | anonymous)
open scripts/perf-index/sites.json

# 2. messung laufen lassen (~15-20 min bei 8 sites × 5 läufe)
node scripts/perf-index/run.mjs

# 3. ergebnis prüfen
cat scripts/perf-index/data/$(date +%Y-%m).json

# 4. committen + deployen · page liest automatisch das neueste file
```

## go-live checkliste (einmalig)

- [ ] sites.json final bestätigen (wer rein, wer anonym)
- [ ] erster echter lauf · demo-file wird überschrieben
- [ ] in `page.tsx`: `robots` auf index/follow stellen
- [ ] Dataset-JSON-LD ergänzen (schema-component wie FAQSchema)
- [ ] route in sitemap.ts aufnehmen
- [ ] FR/EN routes + rewrites (i18n/config.ts + next.config.mjs)
- [ ] footer-link setzen
- [ ] press-kit (siehe docs/press-kit · kommt mit launch)

## regeln

- **aliase sind stabil** · "agentur a" bleibt für immer agentur a, sonst
  sind monats-trends wertlos
- **eigene projekte werden identisch gemessen** und als "laconis-projekt"
  markiert · transparenz ist der ganze punkt
- **kein cherry-picking** · der median aus 5 läufen wird publiziert,
  egal was rauskommt
- monatlicher lauf: 1. des monats, 03:00 (cron auf dem VPS oder manuell)
