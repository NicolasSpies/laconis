import { SectionLabel } from "@/components/ui/SectionLabel";
import { KontaktMultistep } from "@/components/kontakt/KontaktMultistep";
import { VerfuegbarkeitCollapse } from "@/components/kontakt/VerfuegbarkeitCollapse";

export const metadata = { title: "kontakt" };

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">kontakt</SectionLabel>

          <div className="mt-8 max-w-[900px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              sag hallo.
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
              eine kurze nachricht reicht. antwort innerhalb 24h.
            </p>
          </div>
        </div>
      </section>

      {/* DIREKTE WEGE */}
      <section className="pb-20">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="02">direkter draht</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
              keine lust auf formular?{" "}
              <span className="text-offwhite/35">
                nimm einen der wege.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ContactCard
              label="e-mail"
              value="nicolas@laconis.be"
              href="mailto:nicolas@laconis.be"
              note="klassisch. antwort innerhalb 24h • meistens deutlich schneller."
            />
            <ContactCard
              label="call buchen"
              value="30 min kennenlernen"
              href="mailto:nicolas@laconis.be"
              note="noch nicht verfügbar • einfach per mail melden."
            />
            <ContactCard
              label="in person"
              value="eupen • belgien"
              href="https://maps.google.com/?q=Eupen,Belgien"
              external
              note="kaffee? gern • kurz vorher schreiben, damit ich da bin."
            />
          </div>
        </div>
      </section>

      {/* VERFÜGBARKEIT · collapsible */}
      <section className="pb-20">
        <div className="container-site">
          <VerfuegbarkeitCollapse />
        </div>
      </section>

      {/* TRENNLINIE */}
      <section className="pb-16">
        <div className="container-site">
          <div className="max-w-[820px] mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
            <div className="mt-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                oder • das ausführliche formular
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJEKT-FORMULAR */}
      <section id="projekt" className="pb-36 scroll-mt-24">
        <div className="container-site">
          <div className="max-w-[820px] mx-auto">
            <SectionLabel num="04">projekt anfragen</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              sag mir,{" "}
              <span className="text-offwhite/35">was du vorhast.</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-offwhite/60">
              vier kurze schritte. kommst du von der preise-seite mit einem
              paket im kopf, springt das formular direkt in die
              zusammenfassung • änderbar natürlich.
            </p>
          </div>

          <div className="mt-14">
            <KontaktMultistep />
          </div>

          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-label text-offwhite/40">
            keine tracker · keine spam-liste · dsgvo-konform
          </p>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════ helpers ══════════════════════════ */

function ContactCard({
  label,
  value,
  href,
  note,
  external,
}: {
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group block rounded-xl border border-ink/10 bg-ink/[0.015] p-6 hover:border-lime/30 hover:bg-ink/[0.03] transition-all"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/40">
          {label}
        </span>
        <span className="text-offwhite/30 group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
      <div className="mt-2 heading-sans text-[18px] md:text-[20px] text-offwhite group-hover:text-accent-ink transition-colors">
        {value}
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-offwhite/50">
        {note}
      </p>
    </a>
  );
}
