import { PageHero, HeroRings } from "@/components/shared/PageHero";
import { GreySection } from "@/components/shared/GreySection";
import { TiltCard } from "@/components/shared/TiltCard";
import { Marquee } from "@/components/shared/Marquee";
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
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
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
  marqueeBits: string[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· kontakt",
    heroL1: "lass",
    heroL2: "reden.",
    heroItalic: "kurz oder lang.",
    heroBody: "eine kurze nachricht reicht. antwort innerhalb 24h · meistens schneller.",
    directLabel: "direkter draht",
    directHeadlinePre: "keine lust auf formular? ",
    directHeadlineAccent: "nimm einen der wege.",
    emailLabel: "e-mail",
    emailNote: "klassisch. antwort innerhalb 24h · meistens deutlich schneller.",
    callLabel: "video-call",
    callValue: "30 min kennenlernen",
    callNote: "kein buchungs-tool · kurz per mail, dann steht der termin.",
    divider: "oder · das ausführliche formular",
    formLabel: "projekt anfragen",
    formHeadlinePre: "sag mir, ",
    formHeadlineAccent: "was du vorhast.",
    formIntro: "vier kurze schritte. ich meld mich innerhalb von 24 std mit einem konkreten angebot · kein kleingedrucktes.",
    formFooter: "keine tracker · keine spam-liste · dsgvo-konform",
    marqueeBits: ["·", "schreib mir", "·", "ø < 2h antwort", "·", "kein verkaufs-pitch", "·", "einfach reden", "·"],
  },
  fr: {
    kicker: "· contact",
    heroL1: "on parle?",
    heroL2: "",
    heroItalic: "court ou long.",
    heroBody: "un message court suffit. réponse sous 24h · souvent plus vite.",
    directLabel: "voie directe",
    directHeadlinePre: "pas envie de formulaire ? ",
    directHeadlineAccent: "prends un des chemins.",
    emailLabel: "e-mail",
    emailNote: "classique. réponse sous 24h · souvent bien plus vite.",
    callLabel: "visio",
    callValue: "30 min pour se rencontrer",
    callNote: "pas d'outil de réservation · un court mail et le rendez-vous est calé.",
    divider: "ou · le formulaire détaillé",
    formLabel: "demander un projet",
    formHeadlinePre: "dis-moi, ",
    formHeadlineAccent: "ce que tu prévois.",
    formIntro: "quatre étapes courtes. je te réponds dans les 24h avec une offre concrète · pas de petits caractères.",
    formFooter: "pas de trackers · pas de liste spam · conforme rgpd",
    marqueeBits: ["·", "écris-moi", "·", "ø < 2h réponse", "·", "pas de pitch", "·", "juste parler", "·"],
  },
  en: {
    kicker: "· contact",
    heroL1: "let's",
    heroL2: "talk.",
    heroItalic: "short or long.",
    heroBody: "a short message is enough. reply within 24h · usually sooner.",
    directLabel: "direct line",
    directHeadlinePre: "no patience for forms? ",
    directHeadlineAccent: "take one of the paths.",
    emailLabel: "e-mail",
    emailNote: "classic. reply within 24h · usually much sooner.",
    callLabel: "video call",
    callValue: "30 min to meet",
    callNote: "no booking tool · a short mail and the slot's set.",
    divider: "or · the detailed form",
    formLabel: "request a project",
    formHeadlinePre: "tell me, ",
    formHeadlineAccent: "what you're planning.",
    formIntro: "four short steps. i respond within 24h with a concrete offer · no small print.",
    formFooter: "no trackers · no spam list · gdpr-compliant",
    marqueeBits: ["·", "write me", "·", "ø < 2h reply", "·", "no pitch", "·", "just talk", "·"],
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2 || undefined}
        italicAccent={t.heroItalic}
        sub={t.heroBody}
        visual={<HeroRings />}
      />

      <Marquee items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={42} />

      {/* DIRECT CONTACT · 2 tilt cards · lime + lila */}
      <GreySection tone="grey" tint="lime">
        <div className="max-w-[820px]">
          <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            · {t.directLabel}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
            {t.directHeadlinePre}
            <span className="opacity-50">{t.directHeadlineAccent}</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[820px]">
          <TiltCard preset="lime" intensity={9}>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block p-7 md:p-9"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label opacity-65">
                  {t.emailLabel}
                </span>
                <span className="font-mono text-[14px] opacity-65">→</span>
              </div>
              <div className="mt-4 text-[clamp(1.2rem,2.2vw,1.6rem)] font-black tracking-[-0.025em] leading-tight lowercase break-words">
                {CONTACT.email}
              </div>
              <p
                className="mt-3 text-[13px] leading-relaxed"
                style={{ opacity: 0.75 }}
              >
                {t.emailNote}
              </p>
            </a>
          </TiltCard>

          <TiltCard preset="lila" intensity={9}>
            <a
              href={`mailto:${CONTACT.email}?subject=call-termin`}
              className="block p-7 md:p-9"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label opacity-65">
                  {t.callLabel}
                </span>
                <span className="font-mono text-[14px] opacity-65">→</span>
              </div>
              <div className="mt-4 text-[clamp(1.2rem,2.2vw,1.6rem)] font-black tracking-[-0.025em] leading-tight lowercase">
                {t.callValue}
              </div>
              <p
                className="mt-3 text-[13px] leading-relaxed"
                style={{ opacity: 0.75 }}
              >
                {t.callNote}
              </p>
            </a>
          </TiltCard>
        </div>

        <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
          {t.divider}
        </p>
      </GreySection>

      {/* FORM · grey bg, neutralisiert das alte glass-styling */}
      <section
        id="projekt"
        className="relative scroll-mt-24 pb-32 pt-12 bg-[#c8c8c8] text-[#0a0a0a] overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.5) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-site relative">
          <div className="max-w-[820px] mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
              · {t.formLabel}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.0] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
              {t.formHeadlinePre}
              <span className="opacity-50">{t.formHeadlineAccent}</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-[#0a0a0a]/75">
              {t.formIntro}
            </p>
          </div>

          <div className="mt-14">
            <KontaktMultistep />
          </div>

          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            {t.formFooter}
          </p>
        </div>
      </section>
    </>
  );
}
