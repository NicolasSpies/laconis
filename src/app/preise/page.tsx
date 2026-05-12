import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/preise");
}

const FAQ = [
  {
    frage: "wie geht's nach dem anfragen los?",
    antwort:
      "Ich melde mich innerhalb von 24 Std (werktags). Dann: 20–30 min Gespräch · was du brauchst, was realistisch ist, wo wir starten. Danach bekommst du ein konkretes Angebot, schriftlich und ohne Kleingedrucktes.",
  },
  {
    frage: "wie lange dauert so ein projekt?",
    antwort:
      "Ein Onepager ca. 2 Wochen, ein Multipager 3–5 Wochen, Website + Branding zusammen 4–8 Wochen. Hängt stark vom Content-Tempo ab — je klarer dein Briefing und je schneller dein Feedback, desto schneller sind wir fertig. Wenn du eine harte Deadline hast, sag Bescheid · ich plane rückwärts.",
  },
  {
    frage: "was ist nicht enthalten?",
    antwort:
      "Stock-Fotos, Premium-Fonts und externe Tools mit eigenen Lizenzkosten liegen beim Kunden, es sei denn wir haben das vorher besprochen. Domain-Registrierung ist optional. Alles, was über den besprochenen Scope hinausgeht, klären wir vor dem Start · keine Überraschungen auf der Rechnung.",
  },
  {
    frage: "läuft nach dem launch noch was?",
    antwort:
      "Hosting, Backups und kleine Pflege · je nach Setup 20–50 €/Monat. Domain separat, ca. 2 €/Monat je nach TLD. Das erklär ich dir im Gespräch ganz konkret, damit du weißt, womit du langfristig rechnest.",
  },
];

const FAKTOREN = [
  {
    num: "01",
    titel: "scope",
    text: "Wie viele Seiten? Gibt es einen CMS-Bereich, den du selbst pflegen willst? Braucht's einen Shop oder Buchungs-System? Je mehr bewegliche Teile, desto mehr Aufwand · und desto mehr Abstimmung davor.",
  },
  {
    num: "02",
    titel: "content",
    text: "Bringst du Texte und Bilder mit · oder machen wir das zusammen? Content ist oft das, was Projekte in die Länge zieht. Und in den Preis. Klarer Content vom ersten Tag spart uns beide Zeit.",
  },
  {
    num: "03",
    titel: "branding",
    text: "Website allein, oder soll parallel auch eine visuelle Identität entstehen? Wenn beides aus einer Hand kommt, geht das schneller, sieht stimmiger aus und spart dir Koordination zwischen zwei Dienstleistern.",
  },
  {
    num: "04",
    titel: "timing",
    text: "Flexibel oder gestern? Für knappe Deadlines ist mehr Koordination nötig · das spiegelt sich im Aufwand. Ein entspannter Zeitplan gibt Raum für bessere Entscheidungen auf beiden Seiten.",
  },
  {
    num: "05",
    titel: "ausgangslage",
    text: "Weißes Blatt oder bestehendes System, das neu gebaut werden soll? Beides ist machbar · beides bedeutet andere Fragen am Anfang. Je klarer dein Briefing, desto genauer mein Angebot.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "preise", url: `${BASE}/preise` },
        ]}
      />
      <FAQSchema items={FAQ.map((f) => ({ q: f.frage, a: f.antwort }))} />

      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">investment</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite leading-[1.0]">
              was kostet das{" "}
              <span className="italic font-serif text-accent-ink">
                eigentlich
              </span>
              ?
            </h1>
            <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              Ehrliche Antwort. Kein Paket-Raster, keine Sternchen. Jedes
              Projekt ist anders · deshalb gibt's hier keine Tabelle, sondern
              eine Erklärung, was den Preis wirklich macht.
            </p>
          </div>
        </div>
      </section>

      <ScribbleBreak text="was den preis macht ↓" rotate={-1} />

      {/* FAKTOREN */}
      <section className="py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
            {/* LEFT */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel num="02">die faktoren</SectionLabel>
              <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
                kein projekt{" "}
                <span className="text-offwhite/35">ist wie das andere.</span>
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
                Diese fünf Punkte bestimmen, wie aufwendig ein Projekt ist ·
                und damit, wo es preislich landet.
              </p>
            </div>

            {/* RIGHT · manifest-style list */}
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {FAKTOREN.map((f) => (
                <li
                  key={f.num}
                  className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 pt-1 tabular-nums">
                    {f.num}
                  </span>
                  <div>
                    <h3 className="heading-sans text-[clamp(1.1rem,2vw,1.4rem)] text-offwhite">
                      {f.titel}
                    </h3>
                    <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
                      {f.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ScribbleBreak text="und in zahlen ↓" rotate={0.8} flip />

      {/* RICHTWERTE */}
      <section className="py-20">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="03">richtwerte</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              und konkret?
            </h2>
            <p className="mt-5 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
              Keine Fixpreise, aber ehrliche Faustregeln · damit du weißt,
              wovon wir reden, bevor wir reden.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-[820px]">
            <div className="glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                website
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55">
                Ein Onepager mit klarem Briefing und deinem eigenen Content
                startet ab rund 1.500 €. Eine mehrseitige Website mit CMS
                und Branding dazu landet typischerweise zwischen 3.500 und
                6.000 €. Was dazwischen liegt: liegt dazwischen.
              </p>
              <p
                className="mt-5 font-hand text-[17px] text-accent-ink/80 leading-snug"
                style={{ transform: "rotate(-1deg)" }}
              >
                keine versteckten posten.
              </p>
            </div>

            <div className="glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                branding
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55">
                Logo, Farbwelt, Typo, Brand Guide, Visitenkarte · das
                Start-Paket. Ein vollständiges Branding-Projekt beginnt ab
                1.200 €. Wenn Website + Branding zusammen kommen, spart das
                Zeit und Koordination auf beiden Seiten.
              </p>
              <p
                className="mt-5 font-hand text-[17px] text-accent-ink/80 leading-snug"
                style={{ transform: "rotate(1deg)" }}
              >
                alles aus einer hand.
              </p>
            </div>

            <div className="md:col-span-2 glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                hosting · laufend
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[600px]">
                Nach dem Launch: Hosting, Backup und kleine Pflege für
                20–50 €/Monat je nach Setup. Domain separat, ca. 2 €/Monat.
                Ich erkläre das im Gespräch konkret · damit du weißt, was
                du langfristig einplanst.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ScribbleBreak text="bevor du fragst ↓" rotate={-0.8} />

      {/* FAQ */}
      <section className="pb-28 pt-4">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="04">oft gefragt</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              bevor du fragst.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10 max-w-[820px]">
            {FAQ.map((q) => (
              <details key={q.frage} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="heading-sans text-[17px] md:text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                    {q.frage}
                  </h3>
                  <span className="font-mono text-[16px] text-offwhite/35 group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-offwhite/55">
                  {q.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <p
              className="font-hand text-[20px] md:text-[22px] text-offwhite/55 mb-4"
              style={{ transform: "rotate(-1deg)" }}
            >
              kurze frage, klare antwort.
            </p>
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              ich sag dir innerhalb von 24 std,{" "}
              <span className="text-offwhite/35">wo wir stehen.</span>
            </h2>
            <p className="mt-5 max-w-[540px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              Schreib mir kurz, was du vorhast · kostenlos, unverbindlich.
              Kein Formular-Chaos. Einfach ein Gespräch.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt#projekt" variant="primary" size="lg">
                projekt besprechen →
              </Button>
              <Button href="/leistungen" variant="glass" size="lg">
                leistungen ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
