import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { PaketTabs } from "@/components/preise/PaketTabs";
import { Zahlungsoptionen } from "@/components/preise/Zahlungsoptionen";

export const metadata = { title: "preise" };

const FAKTOREN = [
  {
    num: "a",
    name: "anzahl seiten",
    impact: "hoch",
    kurz:
      "je mehr unterseiten, desto mehr design- und content-entscheidungen. ein onepager ist nicht ein sechstel eines 6-seiters.",
  },
  {
    num: "b",
    name: "mehrsprachigkeit",
    impact: "mittel",
    kurz:
      "zwei sprachen heißen zweimal strukturieren, verlinken, pflegen. technisch kein problem, inhaltlich ein denker mehr.",
  },
  {
    num: "c",
    name: "cms-bereiche",
    impact: "mittel",
    kurz:
      "jeder cms-bereich (blog, team, projekte, …) ist ein eigenes stück logik. macht dich unabhängig, kostet initial etwas extra. lohnt sich ab seite 3.",
  },
  {
    num: "d",
    name: "shop oder buchung",
    impact: "hoch",
    kurz:
      "onlineshop, terminbuchung, login-bereich — da wird aus einer website eine kleine software. anderes kaliber, eigenes angebot.",
  },
  {
    num: "e",
    name: "content-lieferung",
    impact: "klein",
    kurz:
      "hast du texte + bilder schon fertig? ich schreibe mit oder unterstütze beim shooting — kostet extra zeit.",
  },
  {
    num: "f",
    name: "deadline",
    impact: "klein-mittel",
    kurz:
      "komfortable deadline = normaler preis. next-week-urgent = aufschlag, weil andere projekte warten.",
  },
];

const FAQ = [
  {
    frage: 'was kommt nach dem klick auf „anfragen"?',
    antwort:
      "du landest im projekt-formular mit deinem paket schon vorausgefüllt. du ergänzt nur noch, was zu deinem fall gehört (timing, besonderheiten, fragen) und ich melde mich innerhalb von 24 std mit einem konkreten angebot.",
  },
  {
    frage: "was heißt 2 % zinsen / monat konkret?",
    antwort:
      "bei modell 2 zahlst du 50 % anzahlung. der rest läuft in bis zu 5 raten mit 2 % / monat auf den noch offenen betrag — gedeckelt bei 10 %. beispiel: 2.000 € rest in 5 raten → gesamt ~2.100 € statt 2.000 €. modell 3 ist teurer (4 % / monat), weil das ganze projekt vorfinanziert wird.",
  },
  {
    frage: "was kostet hosting wirklich?",
    antwort:
      "20 bis 40 €/monat je nach paket — dafür bekommst du SSL, tägliche backups, monitoring, eigenes analytics-system (kein google), kein cookie-banner. jährlich fakturiert, pro monat kommuniziert. domain dazu 2 €/mt, e-mail-postfach 5 €/mt pro adresse.",
  },
  {
    frage: "kann ich ein bundle später aufstocken?",
    antwort:
      "ja — jederzeit. weitere seiten, extra cms-bereiche, neue sprachen, zusätzliche social-visuals kannst du nachbuchen. du fängst nicht bei null an, wir bauen auf dem drauf was steht.",
  },
  {
    frage: "kannst du meine alte wordpress-seite übernehmen?",
    antwort:
      "content übernehmen ja, wordpress als system — nein. ich baue neu und sauber. das ist ehrlicher und langfristig günstiger. alle alten urls werden korrekt weitergeleitet, dein seo bleibt.",
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-20">
        <div className="container-site">
          <SectionLabel num="01">preise</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              ehrliche preise,{" "}
              <span className="text-offwhite/35">keine sternchen.</span>
            </h1>
            <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
              transparent. kein kleingedrucktes. kein „auf anfrage" bei allem.
              drei tabs unten — web, grafik, bundle — jedes paket mit
              eingebautem mini-konfigurator, damit du den monatspreis schwarz
              auf weiß siehst bevor du fragst.
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
            <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/60">
              bei web und bundle stellst du domain & e-mail-postfächer direkt
              ein — der monatspreis rechnet live mit. grafik-pakete haben nur
              einmalpreise, kein laufender posten.
            </p>
          </div>

          <div className="mt-10">
            <PaketTabs />
          </div>

          {/* BAUKASTEN-CTA · direkt unter den bundles */}
          <div className="mt-10">
            <div className="relative rounded-2xl border border-ink/12 bg-gradient-to-br from-lime/[0.04] via-ink/[0.02] to-transparent p-8 md:p-10 overflow-hidden">
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
                  nichts passt 100 %?{" "}
                  <span className="text-offwhite/45">
                    bau dir dein eigenes paket.
                  </span>
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-offwhite/60">
                  schalter umlegen, rechts wächst der kassenzettel live mit.
                  als pdf mitnehmen oder direkt anfragen. so einfach wie
                  beim bäcker — nur transparenter.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    href="/preise/baukasten"
                    variant="primary"
                    size="lg"
                  >
                    zum baukasten →
                  </Button>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                    · live-preis · pdf-bon · link-teilbar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAKTOREN */}
      <section className="pb-28">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="03">was den preis bewegt</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              sechs faktoren.{" "}
              <span className="text-offwhite/35">
                keine geheimen aufschläge.
              </span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
              damit du vorher einschätzen kannst, ob dein projekt eher am
              unteren oder oberen ende landet — und warum.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAKTOREN.map((f) => (
              <div
                key={f.num}
                className="flex gap-5 p-5 rounded-xl border border-ink/8 bg-ink/[0.015] hover:border-ink/15 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 pt-0.5">
                  {f.num}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="heading-sans text-[18px] text-offwhite">
                      {f.name}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40 shrink-0">
                      impact • {f.impact}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-offwhite/55">
                    {f.kurz}
                  </p>
                </div>
              </div>
            ))}
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

          <div className="mt-12 divide-y divide-ink/8 border-y border-ink/8 max-w-[820px]">
            {FAQ.map((q) => (
              <details key={q.frage} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="heading-sans text-[17px] md:text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                    {q.frage}
                  </h3>
                  <span className="font-mono text-[16px] text-offwhite/40 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-offwhite/60">
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
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              nichts passt 100 %?{" "}
              <span className="text-offwhite/35">normal.</span>
            </h2>
            <p className="mt-5 max-w-[540px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              schreib mir kurz, was du vorhast. ich sag dir innerhalb von 24
              std, wohin es preislich geht — kostenlos, unverbindlich.
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
