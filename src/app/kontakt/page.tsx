import { PageHero } from "@/components/shared/PageHero";
import { KontaktMultistep } from "@/components/kontakt/KontaktMultistep";
import { StatusCard } from "@/components/kontakt/StatusCard";
import { CONTACT } from "@/config/contact";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/kontakt");
}

/**
 * Kontakt v2 · entdoppelt (nicolas: "doppelt gemoppelt · klar und deutlich").
 *
 * vorher: hero → marquee → 2 tilt-cards (mail + call) → BookingExpress
 * (nochmal call via mailto) → formular = 3× derselbe weg.
 *
 * jetzt: hero → EIN direkt-block (text-rows: schreiben / anrufen /
 * erreichbarkeit · gleiches pattern wie home-ContactBlock) → formular.
 * cal.com erscheint als vierte row sobald CONTACT.calcomUrl gesetzt ist.
 */

type Dict = {
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  heroBody: string;
  directLabel: string;
  rowSchreiben: string;
  rowAnrufen: string;
  rowAntwort: string;
  rowAntwortWert: string;
  rowBuchen: string;
  rowBuchenWert: string;
  formLabel: string;
  formHeadlinePre: string;
  formHeadlineAccent: string;
  formIntro: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· kontakt",
    heroL1: "lass reden.",
    heroL2: "",
    heroItalic: "",
    heroBody:
      "eine kurze nachricht reicht · kein verkaufs-pitch, kein formular-zwang. du landest direkt bei mir, nicht in einem ticket-system.",
    directLabel: "direkter draht",
    rowSchreiben: "schreiben",
    rowAnrufen: "anrufen",
    rowAntwort: "erreichbar",
    rowAntwortWert: "direkt an mich",
    rowBuchen: "direkt buchen",
    rowBuchenWert: "20 min video-call",
    formLabel: "projekt anfragen",
    formHeadlinePre: "oder sag mir gleich, ",
    formHeadlineAccent: "was du vorhast.",
    formIntro:
      "vier kurze schritte · ich melde mich mit einem konkreten angebot. kein kleingedrucktes.",
  },
  fr: {
    kicker: "· contact",
    heroL1: "on parle?",
    heroL2: "",
    heroItalic: "",
    heroBody:
      "un message court suffit · pas de pitch commercial, pas de formulaire obligatoire. tu tombes directement chez moi, pas dans un système de tickets.",
    directLabel: "voie directe",
    rowSchreiben: "écrire",
    rowAnrufen: "appeler",
    rowAntwort: "joignable",
    rowAntwortWert: "directement à moi",
    rowBuchen: "réserver direct",
    rowBuchenWert: "20 min en visio",
    formLabel: "demander un projet",
    formHeadlinePre: "ou dis-moi directement ",
    formHeadlineAccent: "ce que tu prévois.",
    formIntro:
      "quatre étapes courtes · je reviens vers toi avec une offre concrète. pas de petits caractères.",
  },
  en: {
    kicker: "· contact",
    heroL1: "let's talk.",
    heroL2: "",
    heroItalic: "",
    heroBody:
      "a short message is enough · no sales pitch, no forced forms. you land straight with me, not in a ticket system.",
    directLabel: "direct line",
    rowSchreiben: "write",
    rowAnrufen: "call",
    rowAntwort: "reachable",
    rowAntwortWert: "straight to me",
    rowBuchen: "book directly",
    rowBuchenWert: "20 min video call",
    formLabel: "request a project",
    formHeadlinePre: "or tell me right away ",
    formHeadlineAccent: "what you're planning.",
    formIntro:
      "four short steps · i get back to you with a concrete offer. no small print.",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];
  const calcomUrl = String(CONTACT.calcomUrl);

  return (
    <>
      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2 || undefined}
        italicAccent={t.heroItalic || undefined}
        sub={t.heroBody}
        visual={<StatusCard />}
      />

      {/* DIREKT · text-rows · gleiches pattern wie home-ContactBlock ·
          EIN block für alle wege, keine doppelten karten */}
      <section className="pb-16">
        <div className="container-site">
          <div className="mt-6 grid sm:grid-cols-3 gap-x-10 border-t-2 border-[#0a0a0a]/15 max-w-[1000px]">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group block py-6 border-b-2 border-[#0a0a0a]/15"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                {t.rowSchreiben}
              </span>
              <span className="mt-1.5 block text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-[#0a0a0a] group-hover:text-[#b084d3] transition-colors break-words">
                {CONTACT.email}
              </span>
            </a>
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="group block py-6 border-b-2 border-[#0a0a0a]/15"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                {t.rowAnrufen}
              </span>
              <span className="mt-1.5 block text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-[#0a0a0a] group-hover:text-[#b084d3] transition-colors">
                {CONTACT.phone}
              </span>
            </a>
            <div className="py-6 border-b-2 border-[#0a0a0a]/15">
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                {t.rowAntwort}
              </span>
              <span className="mt-1.5 flex items-center gap-2 text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-[#0a0a0a]">
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full bg-[#e1fd52] border border-[#0a0a0a]/30"
                />
                {t.rowAntwortWert}
              </span>
            </div>
            {/* cal.com · erscheint automatisch sobald CONTACT.calcomUrl gesetzt */}
            {calcomUrl.length > 0 && (
              <a
                href={calcomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 border-b-2 border-[#0a0a0a]/15 sm:col-span-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                  {t.rowBuchen}
                </span>
                <span className="mt-1.5 block text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-[#0a0a0a] group-hover:text-[#b084d3] transition-colors">
                  {t.rowBuchenWert} →
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FORMULAR */}
      <section
        id="projekt"
        className="relative scroll-mt-24 pb-32 pt-8 text-[#0a0a0a] overflow-hidden"
      >
        <div className="container-site relative">
          <div className="max-w-[820px]">
            <h2 className="mt-4 text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.0] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
              {t.formHeadlinePre}
              <span className="opacity-50">{t.formHeadlineAccent}</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-[#0a0a0a]/75">
              {t.formIntro}
            </p>
          </div>

          <div className="mt-12">
            <KontaktMultistep />
          </div>
        </div>
      </section>
    </>
  );
}
