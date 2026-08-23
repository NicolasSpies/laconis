> **VERALTET (24.08.2026).** Diese Notiz beschreibt zwei Sections für
> `/leistungen/web`. Diese Route **gibt es seit dem Relaunch nicht mehr**,
> und `app/leistungen/web/page.tsx` ist gelöscht. Wer den Inhalt noch will,
> muss ihn auf `/studio` einbauen — die Anleitung unten zeigt an eine Datei
> und eine Adresse, die beide nicht mehr existieren.

# TODO · zwei sections für /leistungen/web

Diese beiden sections wurden aus der konzept-studie `src/app/preview/referenz-konzept/page.tsx`
entfernt (juni 2026), **sollen aber nicht weg** — sie gehören perspektivisch auf
`src/app/leistungen/web/page.tsx`:

1. **CMS-showcase** — editor links → live-ergebnis rechts. Eigenes CMS (ContentCore)
   ist ein echter laconis-USP, passt stark auf die web-service-page.
2. **„vier schritte" prozess** — sticky scroll-storytelling (gespräch → moodboard →
   bau → launch). Das ist der reale ablauf, gut für eine service-page.

## Anpassen beim einbau
- Fabry-spezifischen text raus → laconis-generisch (kunde-agnostisch).
- Bilder: die `IMG.*`-pfade zeigen auf `/public/referenz-konzept/` (stock). Für die
  service-page eigene/passende assets nehmen.
- Trilingual machen (DICT-pattern `Record<Locale, …>` wie der rest der seite) — die
  konzept-studie war bewusst nur DE.
- Tokens/helfer die der code braucht: `GREEN = "#2f5d3a"`, `GREEN_HI = "#4f8a63"`,
  `LIME = "#e1fd52"`, `EASE`, die `Kicker`-komponente, `framer-motion`, `next/image`.
  Auf /leistungen/web gibt es kein fabry-grün → akzent auf lime/lila/ink mappen.
- `data-no-reveal` + `container-site` sind sitewide utilities, bleiben.

---

## CMS-section (verbatim aus der studie)

```tsx
/* CMS · eigenes cms (USP) */
function Cms() {
  return (
    <section data-no-reveal className="relative py-24 md:py-32 bg-[#0d0d0d]">
      <div className="container-site">
        <div className="max-w-[680px]">
          <Kicker color={GREEN_HI}>eigenes cms</Kicker>
          <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,5vw,3.6rem)] leading-[1]">
            reimund pflegt selbst.
          </h2>
          <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-offwhite/65">
            Kein WordPress-Dschungel. Ein Editor, der genau das kann, was ein Baumpfleger braucht — und sonst nichts.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-center">
          {/* editor */}
          <div className="rounded-xl overflow-hidden border border-ink/15 bg-[#141414]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink/10">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: LIME }} />
              <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/50">contentcore · editor</span>
            </div>
            <div className="grid grid-cols-[110px_1fr]">
              <div className="p-3 border-r border-ink/10 space-y-1.5">
                {["seiten", "leistungen", "galerie", "kontakt"].map((x, i) => (
                  <div
                    key={x}
                    className="font-mono text-[9px] uppercase tracking-label px-2 py-1.5 rounded"
                    style={i === 1 ? { background: `${GREEN}55`, color: "#fff" } : { color: "rgb(242 242 242 / 0.45)" }}
                  >
                    {x}
                  </div>
                ))}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/35 mb-1">titel</div>
                  <div className="h-7 rounded bg-ink/[0.06] border border-ink/10 px-2 flex items-center text-[11px] text-offwhite/80">Kronenpflege</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-label text-offwhite/35 mb-1">text</div>
                  <div className="h-14 rounded bg-ink/[0.06] border border-ink/10 px-2 py-1.5 text-[10px] leading-snug text-offwhite/55">
                    Damit Ihr Baum gesund und sicher bleibt — fachgerechter Schnitt …
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="font-mono text-[9px] uppercase tracking-label px-3 py-1.5 rounded-full text-[#0d0d0d]" style={{ background: LIME }}>
                    speichern ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* pfeil */}
          <div className="hidden lg:flex flex-col items-center gap-2 text-offwhite/40">
            <span className="font-mono text-[9px] uppercase tracking-label">live</span>
            <span className="text-2xl">→</span>
          </div>

          {/* live-ergebnis */}
          <div className="relative rounded-xl overflow-hidden border border-ink/15 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[220px]">
            <Image src={IMG.pines} alt="" fill sizes="500px" className="object-cover opacity-80" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(13,13,13,0.25),rgba(13,13,13,0.8))" }} />
            <div className="absolute inset-x-5 bottom-5">
              <span className="font-mono text-[8px] uppercase tracking-label" style={{ color: LIME }}>· leistung</span>
              <h4 className="mt-1 font-display font-black lowercase text-white text-[22px] leading-none">kronenpflege</h4>
              <p className="mt-2 text-[11px] text-white/70 leading-snug max-w-[220px]">
                Damit Ihr Baum gesund und sicher bleibt — fachgerechter Schnitt …
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 font-hand text-[19px] text-offwhite/50" style={{ transform: "rotate(-0.5deg)" }}>
          du tippst links — es steht rechts. ohne anruf bei mir.
        </p>
      </div>
    </section>
  );
}
```

---

## „vier schritte" prozess-section (verbatim aus der studie)

```tsx
/* PROZESS · sticky scroll-storytelling */
const PHASES = [
  { n: "01", label: "gespräch", text: "kein briefing-formular. ein kaffee, zwei stunden, ehrlich.", img: IMG.path },
  { n: "02", label: "moodboard", text: "wer seid ihr — und wer sind die anderen? farbe, ton, haltung.", img: IMG.mist },
  { n: "03", label: "bau", text: "in kurzen iterationen. zwischenstände statt blackbox.", img: IMG.light },
  { n: "04", label: "launch", text: "live gehen. cms übergeben. winken.", img: IMG.pines },
];

function Prozess() {
  const [active, setActive] = useState(0);
  return (
    <section data-no-reveal className="relative py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container-site grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div>
          <div className="lg:sticky lg:top-28">
            <Kicker color={GREEN_HI}>der weg</Kicker>
            <h2 className="mt-6 font-display font-black lowercase tracking-[-0.035em] text-offwhite text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.02]">
              vier schritte.
              <br />
              <span className="text-offwhite/40">keine blackbox.</span>
            </h2>
            <div className="mt-10 space-y-5">
              {PHASES.map((p, i) => (
                <div key={p.n} className={`flex gap-4 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-35"}`}>
                  <span
                    className="mt-1 w-3 h-3 rounded-full shrink-0 transition-all duration-500"
                    style={{ background: active === i ? LIME : "rgb(242 242 242 / 0.25)", transform: active === i ? "scale(1)" : "scale(0.7)" }}
                  />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                      {p.n} · {p.label}
                    </span>
                    <p className="mt-1 text-[14px] leading-snug text-offwhite/80">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.n}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-ink/15"
            >
              <Image src={p.img} alt={p.label} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 45%,rgba(10,10,10,0.85))" }} />
              <div className="absolute left-5 bottom-5 right-5 flex items-baseline justify-between">
                <span className="font-display font-black lowercase text-white text-[clamp(1.5rem,3vw,2.4rem)] leading-none">{p.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-label text-white/60">{p.n}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
