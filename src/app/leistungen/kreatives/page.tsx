import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrandSimulator } from "@/components/leistungen/kreatives/BrandSimulator";
import { Manifest } from "@/components/leistungen/kreatives/Manifest";
import { Deliverables } from "@/components/leistungen/kreatives/Deliverables";
import { BrandVsAlternatives } from "@/components/leistungen/kreatives/BrandVsAlternatives";

export const metadata = { title: "leistungen • kreatives" };

const LEISTUNGEN = [
  {
    num: "01",
    titel: "logo + wordmark",
    kurz:
      "nicht das 500ste kreis-mit-schwung-logo. eine marke, die man auf einem t-shirt erkennt und im telefonbuch schreiben kann.",
  },
  {
    num: "02",
    titel: "brand guide",
    kurz:
      "farben, typen, bildsprache, tonalität. damit du nicht jedes mal von vorne anfängst, wenn jemand ein plakat druckt.",
  },
  {
    num: "03",
    titel: "farbwelt + typografie",
    kurz:
      "ein system, keine liste. farben, die zusammen klingen. fonts, die miteinander reden.",
  },
  {
    num: "04",
    titel: "print + packaging",
    kurz:
      "etiketten, flyer, speisekarten, verpackung. druckfertig mit den richtigen farbprofilen — nicht nur fürs screen-hübsch.",
  },
  {
    num: "05",
    titel: "moodboard + recherche",
    kurz:
      "bevor geschraubt wird: wer bist du, wer sind die anderen, was fehlt. ehrliche recherche, kein pinterest-dump.",
  },
];

const PROZESS = [
  {
    num: "01",
    titel: "kennenlernen",
    kurz:
      "wir reden über dich, nicht übers logo. je ehrlicher, desto besser das ergebnis.",
  },
  {
    num: "02",
    titel: "moodboard",
    kurz: "richtung, nicht lösung. 3-5 welten zur auswahl.",
  },
  {
    num: "03",
    titel: "entwurf",
    kurz:
      "zwei richtungen, kein 27-optionen-schaufenster. tiefer statt breiter.",
  },
  {
    num: "04",
    titel: "feinschliff + lieferung",
    kurz: "alle dateien, kurz-manual, print-ready. du bekommst alles.",
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-20">
        <div className="container-site">
          <SectionLabel num="02">leistungen • kreatives</SectionLabel>

          <div className="mt-8 max-w-[900px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              marken, die{" "}
              <span className="text-offwhite/35">wiedererkennbar</span>{" "}
              bleiben.
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
              branding ist kein logo. branding ist das gefühl, das jemand
              bekommt, wenn er deinen namen hört — und die visuellen werkzeuge,
              die dieses gefühl transportieren. ich baue beides.
            </p>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN LISTE */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel num="03">was drinsteckt</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            fünf bausteine. du wählst was du brauchst.
          </h2>

          <div className="mt-14 divide-y divide-ink/8 border-y border-ink/8">
            {LEISTUNGEN.map((l) => (
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
                  <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-offwhite/55">
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

      {/* INTERAKTIVER BRAND-SIMULATOR · ersetzt das statische brand-paket */}
      <BrandSimulator />

      {/* DELIVERABLES */}
      <Deliverables />

      {/* PROZESS */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel num="06">so läuft&apos;s ab</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            vom kennenlernen zum druckfertigen brand.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROZESS.map((p, i) => (
              <div
                key={p.num}
                className="relative rounded-xl border border-ink/8 bg-ink/[0.015] p-6 hover:border-lime/30 hover:bg-ink/[0.03] transition-all"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    {p.num}
                  </span>
                  {i < PROZESS.length - 1 && (
                    <span className="font-mono text-[10px] text-offwhite/25 hidden lg:inline">
                      →
                    </span>
                  )}
                </div>
                <h3 className="heading-sans mt-3 text-[18px] text-offwhite">
                  {p.titel}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55">
                  {p.kurz}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EINORDNUNG */}
      <BrandVsAlternatives />

      {/* MANIFEST */}
      <Manifest />

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              lust deine marke aufzubauen?
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              erzähl mir, was du machst. ich sag dir, wie man es sichtbar
              macht.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt" variant="primary" size="lg">
                lass uns reden →
              </Button>
              <Button href="/referenzen" variant="glass" size="lg">
                referenzen ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
