import { SectionLabel } from "@/components/ui/SectionLabel";
import { KontaktMultistep } from "@/components/kontakt/KontaktMultistep";
import { CONTACT } from "@/config/contact";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/kontakt");
}

type Dict = {
  sectionLabel: string;
  heroHeadline: string;
  heroBody: string;
  directLabel: string;
  directHeadlinePre: string;
  directHeadlineAccent: string;
  emailLabel: string;
  emailNote: string;
  callLabel: string;
  callValue: string;
  callNote: string;
  divider: string;
  formLabel: string;
  formHeadlinePre: string;
  formHeadlineAccent: string;
  formIntro: string;
  formFooter: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "kontakt",
    heroHeadline: "sag hallo.",
    heroBody: "Eine kurze Nachricht reicht. Antwort innerhalb 24h.",
    directLabel: "direkter draht",
    directHeadlinePre: "keine lust auf formular? ",
    directHeadlineAccent: "nimm einen der wege.",
    emailLabel: "e-mail",
    emailNote: "Klassisch. Antwort innerhalb 24h · meistens deutlich schneller.",
    callLabel: "video-call",
    callValue: "30 min kennenlernen",
    callNote: "Kein Buchungs-Tool · kurz per Mail, dann steht der Termin.",
    divider: "oder · das ausführliche formular",
    formLabel: "projekt anfragen",
    formHeadlinePre: "sag mir, ",
    formHeadlineAccent: "was du vorhast.",
    formIntro: "Vier kurze Schritte. Ich meld mich innerhalb von 24 Std mit einem konkreten Angebot · kein Kleingedrucktes.",
    formFooter: "keine tracker · keine spam-liste · dsgvo-konform",
  },
  fr: {
    sectionLabel: "contact",
    heroHeadline: "dis bonjour.",
    heroBody: "Un message court suffit. Réponse sous 24h.",
    directLabel: "voie directe",
    directHeadlinePre: "pas envie de formulaire ? ",
    directHeadlineAccent: "prends un des chemins.",
    emailLabel: "e-mail",
    emailNote: "Classique. Réponse sous 24h · souvent bien plus vite.",
    callLabel: "visio",
    callValue: "30 min pour se rencontrer",
    callNote: "Pas d'outil de réservation · un court mail et le rendez-vous est calé.",
    divider: "ou · le formulaire détaillé",
    formLabel: "demander un projet",
    formHeadlinePre: "dis-moi, ",
    formHeadlineAccent: "ce que tu prévois.",
    formIntro: "Quatre étapes courtes. Je te réponds dans les 24h avec une offre concrète · pas de petits caractères.",
    formFooter: "pas de trackers · pas de liste spam · conforme rgpd",
  },
  en: {
    sectionLabel: "contact",
    heroHeadline: "say hi.",
    heroBody: "A short message is enough. Reply within 24h.",
    directLabel: "direct line",
    directHeadlinePre: "no patience for forms? ",
    directHeadlineAccent: "take one of the paths.",
    emailLabel: "e-mail",
    emailNote: "Classic. Reply within 24h · usually much sooner.",
    callLabel: "video call",
    callValue: "30 min to meet",
    callNote: "No booking tool · a short mail and the slot's set.",
    divider: "or · the detailed form",
    formLabel: "request a project",
    formHeadlinePre: "tell me, ",
    formHeadlineAccent: "what you're planning.",
    formIntro: "Four short steps. I respond within 24h with a concrete offer · no small print.",
    formFooter: "no trackers · no spam list · gdpr-compliant",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">{t.sectionLabel}</SectionLabel>

          <div className="mt-8 max-w-[900px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              {t.heroHeadline}
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              {t.heroBody}
            </p>
          </div>
        </div>
      </section>

      {/* DIREKTE WEGE */}
      <section className="pb-20">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="02">{t.directLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
              {t.directHeadlinePre}
              <span className="text-offwhite/35">{t.directHeadlineAccent}</span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[560px]">
            <ContactCard
              label={t.emailLabel}
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              note={t.emailNote}
            />
            <ContactCard
              label={t.callLabel}
              value={t.callValue}
              href={`mailto:${CONTACT.email}?subject=call-termin`}
              note={t.callNote}
            />
          </div>
        </div>
      </section>

      {/* TRENNLINIE */}
      <section className="pb-16">
        <div className="container-site">
          <div className="max-w-[820px] mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
            <div className="mt-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                {t.divider}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJEKT-FORMULAR */}
      <section id="projekt" className="pb-36 scroll-mt-24">
        <div className="container-site">
          <div className="max-w-[820px] mx-auto">
            <SectionLabel num="03">{t.formLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              {t.formHeadlinePre}
              <span className="text-offwhite/35">{t.formHeadlineAccent}</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
              {t.formIntro}
            </p>
          </div>

          <div className="mt-14">
            <KontaktMultistep />
          </div>

          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            {t.formFooter}
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
      className="group block glass rounded-xl p-6 hover:border-lime/25 hover:bg-ink/[0.03] transition-all"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
          {label}
        </span>
        <span className="text-offwhite/35 group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
      <div className="mt-2 heading-sans text-[18px] md:text-[20px] text-offwhite group-hover:text-accent-ink transition-colors">
        {value}
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-offwhite/55">
        {note}
      </p>
    </a>
  );
}
