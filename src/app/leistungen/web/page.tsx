import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ContentCoreSection } from "@/components/leistungen/web/ContentCoreSection";
import { WebApproaches } from "@/components/leistungen/web/WebApproaches";
import { HostingBlock } from "@/components/leistungen/web/HostingBlock";
import { FabryCase } from "@/components/leistungen/web/FabryCase";
import { ProcessFlow } from "@/components/leistungen/web/ProcessFlow";
import { ContentCoreVsWordpress } from "@/components/leistungen/web/ContentCoreVsWordpress";
import { ContentCoreDeepDive } from "@/components/leistungen/web/ContentCoreDeepDive";
import { WebManifest } from "@/components/leistungen/web/WebManifest";
import { WebVsAlternatives } from "@/components/leistungen/web/WebVsAlternatives";
import { WebDeliverables } from "@/components/leistungen/web/WebDeliverables";

export const metadata = { title: "leistungen · web" };

const BAUSTEINE = [
  {
    num: "01",
    titel: "design",
    kurz:
      "ui und ux, die nicht generisch aussehen. jedes projekt ein eigenes system, passend zu dir, nicht zur vorlage.",
  },
  {
    num: "02",
    titel: "development",
    kurz:
      "handgeschriebener code. next.js, react, tailwind. schnell, zugänglich, wartbar. kein page-builder.",
  },
  {
    num: "03",
    titel: "contentcore",
    kurz:
      "mein eigenes CMS. texte, bilder, seiten, shop und newsletter an einem ort. kein wordpress-plugin-friedhof.",
  },
  {
    num: "04",
    titel: "SEO",
    kurz:
      "technisch sauber, semantisch richtig, schnell. pagespeed 95+ ist standard, nicht bonus.",
  },
  {
    num: "05",
    titel: "hosting",
    kurz:
      "auf wunsch: hosting, monitoring und kleine updates als fester monatsbeitrag. ich bin da, wenn was schief läuft.",
  },
];

export default function Page() {
  return (
    <>
      {/* ============================================================
          OBEN · für alle Kunden. Einfach, kurz, emotional.
         ============================================================ */}

      {/* HERO */}
      <section className="pt-36 pb-16">
        <div className="container-site">
          <SectionLabel num="01">leistungen · web</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              websites, die nicht im{" "}
              <span className="text-offwhite/35">grundrauschen</span>
              <br />
              verschwinden.
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
              kein template, kein baukasten. du bekommst eine seite, die nach
              dir aussieht. handgemacht von der ersten zeile code bis zur
              letzten einstellung. schnell, zugänglich, mit meinem eigenen cms
              zum selberpflegen.
            </p>
          </div>
        </div>
      </section>

      {/* ContentCore — was unter der haube läuft */}
      <ContentCoreSection />

      {/* ZWEI WEGE (neu vs redesign) + Before/After im Redesign-Tab */}
      <WebApproaches />

      {/* Fabry-Beweis */}
      <FabryCase />

      {/* DELIVERABLES */}
      <WebDeliverables />

      {/* ============================================================
          TECHNIKER-DIVIDER
         ============================================================ */}

      <section className="py-20 relative">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
        />
        <div className="container-site">
          <div className="max-w-[780px]">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              ▼ ab hier wird&apos;s technisch
            </span>
            <h2 className="heading-display mt-5 text-[clamp(2rem,5vw,3.25rem)] text-offwhite">
              für die techniker unter euch.
            </h2>
            <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
              wenn du wissen willst, wie das ding wirklich gebaut ist, wie die
              sicherheit funktioniert und warum contentcore kein zweites
              wordpress ist, lies weiter. wenn nicht, spring direkt{" "}
              <a href="#kontakt" className="text-accent-ink hover:underline">
                zum kontakt
              </a>
              , das reicht für eine anfrage.
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
        />
      </section>

      {/* ============================================================
          UNTEN · für Techniker. Hosting, Vergleich, Features, Prozess.
         ============================================================ */}

      {/* Hosting */}
      <HostingBlock />

      {/* ContentCore vs WordPress + Sicherheitsschichten */}
      <ContentCoreVsWordpress />

      {/* ContentCore Deep Dive */}
      <ContentCoreDeepDive />

      {/* BAUSTEINE LISTE */}
      <section className="pb-32">
        <div className="container-site">
          <div className="max-w-[720px]">
            <SectionLabel num="09">was drinsteckt</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
              fünf bausteine.{" "}
              <span className="text-offwhite/35">
                du wählst, was du brauchst.
              </span>
            </h2>
          </div>

          <div className="mt-14 divide-y divide-ink/8 border-y border-ink/8">
            {BAUSTEINE.map((l) => (
              <div
                key={l.num}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 md:py-8 transition-colors hover:bg-ink/[0.015]"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {l.num}
                </span>
                <div>
                  <h3 className="heading-sans text-[clamp(1.25rem,2.5vw,1.75rem)] text-offwhite group-hover:text-accent-ink transition-colors">
                    {l.titel}
                  </h3>
                  <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
                    {l.kurz}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-offwhite/25 group-hover:text-accent-ink group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prozess */}
      <ProcessFlow />

      {/* EINORDNUNG */}
      <WebVsAlternatives />

      {/* MANIFEST */}
      <WebManifest />

      {/* CTA */}
      <section id="kontakt" className="pb-36">
        <div className="container-site">
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              klingt nach deinem projekt?
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              30 minuten video-call oder kaffee in eupen. ich sag dir ehrlich,
              ob ich die richtige adresse bin.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt" variant="primary" size="lg">
                kontakt aufnehmen →
              </Button>
              <Button href="/preise" variant="glass" size="lg">
                preise ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
