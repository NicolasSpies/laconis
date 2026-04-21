import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { PaketTabs } from "@/components/preise/PaketTabs";
import { Zahlungsoptionen } from "@/components/preise/Zahlungsoptionen";
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
    frage: 'was kommt nach dem klick auf „anfragen"?',
    antwort:
      "Du landest im Projekt-Formular mit deinem Paket schon vorausgefüllt. Du ergänzt nur noch, was zu deinem Fall gehört (Timing, Besonderheiten, Fragen) und ich melde mich innerhalb von 24 Std mit einem konkreten Angebot.",
  },
  {
    frage: "was heißt das mit den raten-zinsen genau?",
    antwort:
      "Ratenzahlung ist optional. Modell 1 (Vorkasse oder Nach-Abschluss) ist komplett zinsfrei. Modell 2 · 50% Anzahlung, Rest in bis zu 5 Monatsraten — darauf werden 2% pro Monat auf den noch offenen Betrag berechnet, gedeckelt bei 10% Gesamtaufschlag. Beispiel: 2.000 € Rest in 5 Raten → du zahlst ca. 2.100 € statt 2.000 €. Modell 3 (ganz ohne Anzahlung, Projekt vorfinanziert) kostet 4% / Monat, weil mein Risiko höher ist. Alle drei Modelle sind transparent · keine versteckten Gebühren, keine Verzugszinsen bei pünktlicher Zahlung.",
  },
  {
    frage: "wie lange dauert so ein projekt?",
    antwort:
      "Ein Onepager ca. 2 Wochen, ein Multipager 3–5 Wochen, ein CMS-Projekt 4–6 Wochen. Kommt auf Content-Lieferung und Feedback-Tempo an. Wenn du eine harte Deadline hast, sag Bescheid · planen wir rückwärts.",
  },
  {
    frage: "was passiert wenn ich eine rate verpasse?",
    antwort:
      "Erst mal nichts Dramatisches · ich schreibe dich an. Wenn eine Rate trotz Erinnerung länger als 14 Tage überfällig ist, kommt der gesetzliche Verzugszinssatz (belgische Regelung, aktuell um 8% p.a.) dazu, ggf. plus 40 € Mahn-Pauschale. Das ist EU/BE-Standard, nicht meine Erfindung. Im Regelfall finden wir aber einfach eine neue Zahl-Lösung.",
  },
  {
    frage: "was ist im preis nicht enthalten?",
    antwort:
      "Stock-Fotos / Premium-Fonts / externe Tools mit eigenen Kosten (z.B. Mailchimp, Adobe Fonts Lizenz) liegen beim Kunden, es sei denn wir reden vorher was anderes aus. Domain-Registrierung ist optional: entweder du hast schon eine · oder ich registriere sie für dich (läuft über Hosting, ca. 2 € / Monat je nach TLD). Alles, was Kosten verursacht, sag ich dir vorab.",
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
          <SectionLabel num="01">preise</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              ehrliche preise,{" "}
              <span className="text-offwhite/35">keine sternchen.</span>
            </h1>
            <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              Transparent. Kein Kleingedrucktes. Kein „auf Anfrage" bei allem.
              Drei Tabs unten · Web, Branding, Bundle · jedes Paket mit
              eingebautem Mini-Konfigurator, damit du den Monatspreis schwarz
              auf weiß siehst, bevor du fragst.
            </p>
          </div>
        </div>
      </section>

      {/* PAKETE TABS */}
      <section className="pb-28">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="02">die pakete</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
              drei kategorien.{" "}
              <span className="text-offwhite/35">
                innerhalb jeder: klein · mittel · groß.
              </span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
              Bei Web und Bundle stellst du Domain & E-Mail-Postfächer direkt
              ein • der Monatspreis rechnet live mit. Branding-Pakete haben nur
              Einmalpreise, kein laufender Posten.
            </p>
          </div>

          <div className="mt-10">
            <PaketTabs />
          </div>

          {/* BAUKASTEN-CTA · direkt unter den bundles */}
          <div className="mt-10">
            <div className="relative rounded-2xl border border-ink/10 bg-gradient-to-br from-lime/[0.04] via-ink/[0.02] to-transparent p-8 md:p-10 overflow-hidden">
              {/* deko: winziger receipt-tease rechts */}
              <div
                aria-hidden
                className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[120px] rotate-[6deg] opacity-60"
              >
                <div className="rounded-md bg-[#faf8f3]/90 text-[#1a1a1a] p-3 font-mono text-[9px] leading-[1.6] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]">
                  <div className="text-center tracking-[0.2em] text-[8px]">
                    LACØNIS
                  </div>
                  <div className="border-t border-dashed border-[#1a1a1a]/30 my-1.5" />
                  <div className="flex justify-between">
                    <span>web · klein</span>
                    <span>1990</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ brand</span>
                    <span>1200</span>
                  </div>
                  <div className="flex justify-between text-[8px] italic">
                    <span>rabatt</span>
                    <span>−319</span>
                  </div>
                  <div className="border-t border-dashed border-[#1a1a1a]/30 my-1.5" />
                  <div className="flex justify-between font-bold">
                    <span>total</span>
                    <span>2871</span>
                  </div>
                </div>
              </div>

              <div className="relative max-w-[540px]">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  alternative
                </span>
                <h3 className="mt-2 heading-display text-[clamp(1.5rem,3.5vw,2.5rem)] text-offwhite leading-[1.1]">
                  nichts passt 100%?{" "}
                  <span className="text-offwhite/55">
                    bau dir dein eigenes paket.
                  </span>
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55">
                  Schalter umlegen, rechts wächst der Kassenzettel live mit.
                  Als PDF mitnehmen oder direkt anfragen. So einfach wie
                  beim Bäcker • nur transparenter.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    href="/preise/baukasten"
                    variant="primary"
                    size="lg"
                  >
                    zum baukasten →
                  </Button>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                    · live-preis · pdf-bon · link-teilbar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZAHLUNGSOPTIONEN */}
      <Zahlungsoptionen />

      {/* FAQ */}
      <section className="pb-28">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="06">oft gefragt</SectionLabel>
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
                  <span className="font-mono text-[16px] text-offwhite/35 group-open:rotate-45 transition-transform">
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
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              nichts passt 100%?{" "}
              <span className="text-offwhite/35">normal.</span>
            </h2>
            <p className="mt-5 max-w-[540px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              Schreib mir kurz, was du vorhast. Ich sag dir innerhalb von 24
              Std, wohin es preislich geht • kostenlos, unverbindlich.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt#projekt" variant="primary" size="lg">
                projekt besprechen →
              </Button>
              <Button href="/leistungen/web" variant="glass" size="lg">
                leistungen ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
