"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { CONTACT } from "@/config/contact";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/* ══════════════════════════ state-modell ══════════════════════════ */

type Bedarf = "website" | "branding" | "alles" | "was-anderes";
type Seiten = "onepager" | "2-5" | "6-10" | "10+" | "weiss-nicht";
type Sprachen = "1" | "2" | "3+";
type Zeitplan = "flexibel" | "dringend";
type Budget = "<2k" | "2-5k" | "5-10k" | "10k+" | "weiss-nicht";

type State = {
  bedarf: Bedarf | null;
  seiten: Seiten;
  sprachen: Sprachen;
  zeitplan: Zeitplan;
  budget: Budget | null;
  name: string;
  email: string;
  telefon: string;
  notiz: string;
};

const INITIAL: State = {
  bedarf: null,
  seiten: "weiss-nicht",
  sprachen: "1",
  zeitplan: "flexibel",
  budget: null,
  name: "",
  email: "",
  telefon: "",
  notiz: "",
};

/* ══════════════════════════ i18n ══════════════════════════ */

type Dict = {
  rateLimit: string;
  errorEmail: string;
  networkError: string;
  dankePre: string;
  hand: string;
  thanksBody1: string;
  thanksBody2pre: string;
  thanksBody2tel: string;
  thanksBody3: string;
  ctaHome: string;
  ctaRefs: string;
  progressLabels: string[];
  step1H3: string;
  step1Body: string;
  step2H3: string;
  step2Body: string;
  step3H3: string;
  step3Body: string;
  step3Footer: string;
  step3Edit: string;
  step3BudgetOpen: string;
  step4H3: string;
  step4Body: string;
  fieldName: string;
  fieldEmail: string;
  fieldTel: string;
  fieldNotiz: string;
  notizPlaceholder: string;
  emailPlaceholder: string;
  telPlaceholder: string;
  namePlaceholder: string;
  consent1: string;
  consentLink: string;
  consent2: string;
  honeypotLabel: string;
  back: string;
  schrittLabel: string;
  schrittPre: string;
  weiter: string;
  sende: string;
  anfrageSenden: string;
  gewaehlt: string;
  bedarfQ: string;
  scopeLabelSeiten: string;
  scopeLabelSprachen: string;
  scopeLabelBudget: string;
  scopeHintBudget: string;
  bedarf: Record<Bedarf, { titel: string; kurz: string }>;
  seiten: Record<Seiten, string>;
  sprachen: Record<Sprachen, string>;
  budget: Record<Budget, string>;
};

const DICT: Record<Locale, Dict> = {
  de: {
    rateLimit: "Zu viele Anfragen · bitte in einer Stunde nochmal probieren.",
    errorEmail: `Konnte nicht gesendet werden. Schreib mir direkt an ${CONTACT.email}.`,
    networkError: `Netzwerk-Fehler. Schreib mir direkt an ${CONTACT.email}.`,
    dankePre: "danke,",
    hand: "ich meld mich diese woche.",
    thanksBody1: "Deine Anfrage ist da · Antwort kommt innerhalb von 24 Std (werktags) per ",
    thanksBody2pre: " oder Telefon (",
    thanksBody2tel: ")",
    thanksBody3: ". Bis dahin · mach's gut.",
    ctaHome: "zurück zur startseite",
    ctaRefs: "referenzen ansehen",
    progressLabels: ["bedarf", "scope", "zusammenfassung", "kontakt"],
    step1H3: "was brauchst du?",
    step1Body: "Grob reicht. Du kannst im nächsten Schritt präzisieren · oder später ändern, wenn sich herausstellt, dass es doch was anderes ist.",
    step2H3: "präzisieren.",
    step2Body: "Wenige Klicks · so krieg ich ein Bild, ob das zusammenpasst oder was Sonderanfertigung braucht.",
    step3H3: "zusammenfassung.",
    step3Body: "Kurze Kontrolle, bevor's zum Kontakt geht. Jede Zeile ist änderbar.",
    step3Footer: "Wenn alles stimmt, nächster Schritt: deine Kontaktdaten + optional eine Notiz. Angebot kommt innerhalb 24 Std.",
    step3Edit: "ändern",
    step3BudgetOpen: "· noch offen",
    step4H3: "wer bist du?",
    step4Body: "Nur das Nötigste. Telefon und Notiz sind freiwillig. Ich antworte innerhalb von 24 Std per Mail.",
    fieldName: "name",
    fieldEmail: "e-mail",
    fieldTel: "telefon · optional",
    fieldNotiz: "notiz · optional",
    notizPlaceholder: "Was sollte ich vor dem Gespräch wissen? (Deadline, Besonderheiten, Links zu Inspiration …)",
    emailPlaceholder: "deine@email.be",
    telPlaceholder: "+32 491 …",
    namePlaceholder: "Alex Martin",
    consent1: "Ich bin einverstanden, dass diese Daten verarbeitet werden, um meine Anfrage zu beantworten. Kein Newsletter, kein Verkauf. Details in der ",
    consentLink: "Datenschutzerklärung",
    consent2: ".",
    honeypotLabel: "Nicht ausfüllen (Spam-Schutz)",
    back: "← zurück",
    schrittLabel: "schritt",
    schrittPre: "schritt",
    weiter: "weiter →",
    sende: "sende …",
    anfrageSenden: "anfrage senden →",
    gewaehlt: "✓ gewählt",
    bedarfQ: "bedarf",
    scopeLabelSeiten: "wie viele seiten ungefähr?",
    scopeLabelSprachen: "sprachen",
    scopeLabelBudget: "budget-rahmen",
    scopeHintBudget: "Grob reicht. Keine Trickfragen · ich pass das Angebot an, was realistisch ist.",
    bedarf: {
      website: { titel: "website", kurz: "Neue Seite, Redesign, Onepager oder mehrsprachig." },
      branding: { titel: "branding", kurz: "Logo, Brand Guide, Identität · visuelles System." },
      alles: { titel: "alles zusammen", kurz: "Web + Branding · aus einer Hand." },
      "was-anderes": { titel: "was anderes", kurz: "Sonderprojekt, Beratung, keine Schublade." },
    },
    seiten: { onepager: "onepager", "2-5": "2–5 seiten", "6-10": "6–10 seiten", "10+": "über 10", "weiss-nicht": "weiss nicht" },
    sprachen: { "1": "eine", "2": "zwei", "3+": "drei oder mehr" },
    budget: { "<2k": "< 2.000 €", "2-5k": "2.000–5.000 €", "5-10k": "5.000–10.000 €", "10k+": "10.000 € +", "weiss-nicht": "weiss nicht" },
  },
  fr: {
    rateLimit: "Trop de demandes · réessaie dans une heure.",
    errorEmail: `Pas pu envoyer. Écris-moi directement à ${CONTACT.email}.`,
    networkError: `Erreur réseau. Écris-moi directement à ${CONTACT.email}.`,
    dankePre: "merci,",
    hand: "je reviens vers toi cette semaine.",
    thanksBody1: "Ta demande est là · réponse sous 24h (jours ouvrés) par ",
    thanksBody2pre: " ou téléphone (",
    thanksBody2tel: ")",
    thanksBody3: ". D'ici là · porte-toi bien.",
    ctaHome: "retour à l'accueil",
    ctaRefs: "voir les références",
    progressLabels: ["besoin", "scope", "résumé", "contact"],
    step1H3: "tu as besoin de quoi ?",
    step1Body: "Grossier suffit. Tu peux préciser à l'étape suivante · ou changer plus tard si ça s'avère être autre chose.",
    step2H3: "préciser.",
    step2Body: "Quelques clics · ça me donne une idée si on s'accorde ou s'il faut du sur-mesure.",
    step3H3: "résumé.",
    step3Body: "Petit contrôle avant le contact. Chaque ligne est modifiable.",
    step3Footer: "Si tout colle, prochaine étape : tes coordonnées + une note optionnelle. Offre sous 24h.",
    step3Edit: "modifier",
    step3BudgetOpen: "· encore ouvert",
    step4H3: "tu es qui ?",
    step4Body: "Que l'essentiel. Téléphone et note sont facultatifs. Je réponds sous 24h par mail.",
    fieldName: "nom",
    fieldEmail: "e-mail",
    fieldTel: "téléphone · optionnel",
    fieldNotiz: "note · optionnelle",
    notizPlaceholder: "Que devrais-je savoir avant l'échange ? (deadline, particularités, liens d'inspi …)",
    emailPlaceholder: "ton@email.be",
    telPlaceholder: "+32 491 …",
    namePlaceholder: "Alex Martin",
    consent1: "J'accepte que ces données soient traitées pour répondre à ma demande. Pas de newsletter, pas de revente. Détails dans la ",
    consentLink: "politique de confidentialité",
    consent2: ".",
    honeypotLabel: "Ne pas remplir (anti-spam)",
    back: "← retour",
    schrittLabel: "étape",
    schrittPre: "étape",
    weiter: "suivant →",
    sende: "envoi …",
    anfrageSenden: "envoyer la demande →",
    gewaehlt: "✓ choisi",
    bedarfQ: "besoin",
    scopeLabelSeiten: "combien de pages environ ?",
    scopeLabelSprachen: "langues",
    scopeLabelBudget: "budget approximatif",
    scopeHintBudget: "Grossier suffit. Pas de pièges · j'adapte l'offre à ce qui est réaliste.",
    bedarf: {
      website: { titel: "site web", kurz: "Nouveau site, redesign, onepage ou multilingue." },
      branding: { titel: "branding", kurz: "Logo, brand guide, identité · système visuel." },
      alles: { titel: "tout ensemble", kurz: "Web + branding · d'une seule main." },
      "was-anderes": { titel: "autre chose", kurz: "Projet spécial, conseil, hors case." },
    },
    seiten: { onepager: "onepage", "2-5": "2–5 pages", "6-10": "6–10 pages", "10+": "plus de 10", "weiss-nicht": "je sais pas" },
    sprachen: { "1": "une", "2": "deux", "3+": "trois ou plus" },
    budget: { "<2k": "< 2 000 €", "2-5k": "2 000–5 000 €", "5-10k": "5 000–10 000 €", "10k+": "10 000 € +", "weiss-nicht": "je sais pas" },
  },
  en: {
    rateLimit: "Too many requests · try again in an hour.",
    errorEmail: `Couldn't send it. Write to me directly at ${CONTACT.email}.`,
    networkError: `Network error. Write to me directly at ${CONTACT.email}.`,
    dankePre: "thanks,",
    hand: "i'll get back to you this week.",
    thanksBody1: "Your request is in · answer within 24h (working days) by ",
    thanksBody2pre: " or phone (",
    thanksBody2tel: ")",
    thanksBody3: ". Until then · take care.",
    ctaHome: "back to homepage",
    ctaRefs: "see references",
    progressLabels: ["need", "scope", "summary", "contact"],
    step1H3: "what do you need?",
    step1Body: "Rough is fine. You can specify in the next step · or change later if it turns out to be something else.",
    step2H3: "specify.",
    step2Body: "A few clicks · so i get a picture of whether this fits or needs a custom take.",
    step3H3: "summary.",
    step3Body: "Quick check before contact. Every line is editable.",
    step3Footer: "If it all checks out, next step: your contact details + optional note. Offer within 24h.",
    step3Edit: "edit",
    step3BudgetOpen: "· still open",
    step4H3: "who are you?",
    step4Body: "Just the essentials. Phone and note are optional. I reply within 24h by mail.",
    fieldName: "name",
    fieldEmail: "e-mail",
    fieldTel: "phone · optional",
    fieldNotiz: "note · optional",
    notizPlaceholder: "What should i know before the call? (deadline, specifics, links to inspiration …)",
    emailPlaceholder: "your@email.be",
    telPlaceholder: "+32 491 …",
    namePlaceholder: "Alex Martin",
    consent1: "I agree that this data is processed to answer my request. No newsletter, no resale. Details in the ",
    consentLink: "privacy policy",
    consent2: ".",
    honeypotLabel: "Don't fill in (spam protection)",
    back: "← back",
    schrittLabel: "step",
    schrittPre: "step",
    weiter: "next →",
    sende: "sending …",
    anfrageSenden: "send request →",
    gewaehlt: "✓ chosen",
    bedarfQ: "need",
    scopeLabelSeiten: "roughly how many pages?",
    scopeLabelSprachen: "languages",
    scopeLabelBudget: "rough budget",
    scopeHintBudget: "Rough is fine. No trick questions · i adapt the offer to what's realistic.",
    bedarf: {
      website: { titel: "website", kurz: "New site, redesign, onepager or multilingual." },
      branding: { titel: "branding", kurz: "Logo, brand guide, identity · visual system." },
      alles: { titel: "all together", kurz: "Web + branding · from one place." },
      "was-anderes": { titel: "something else", kurz: "Special project, consulting, no box." },
    },
    seiten: { onepager: "onepager", "2-5": "2–5 pages", "6-10": "6–10 pages", "10+": "over 10", "weiss-nicht": "don't know" },
    sprachen: { "1": "one", "2": "two", "3+": "three or more" },
    budget: { "<2k": "< 2,000 €", "2-5k": "2,000–5,000 €", "5-10k": "5,000–10,000 €", "10k+": "10,000 € +", "weiss-nicht": "don't know" },
  },
};

/* ══════════════════════════ wrapper mit suspense ══════════════════════════ */

export function KontaktMultistep() {
  return (
    <Suspense fallback={<div className="h-2" aria-hidden />}>
      <Inner />
    </Suspense>
  );
}

/* ══════════════════════════ inner ══════════════════════════ */

type StepId = 1 | 2 | 3 | 4;

function Inner() {
  const params = useSearchParams();
  const locale = useLocale();
  const t = pick(DICT, locale);

  const initialFromParams = useMemo<{ state: State; startStep: StepId }>(() => {
    const bedarfParam = params.get("bedarf") as Bedarf | null;
    const validBedarf: Bedarf[] = ["website", "branding", "alles", "was-anderes"];
    if (bedarfParam && validBedarf.includes(bedarfParam)) {
      return { state: { ...INITIAL, bedarf: bedarfParam }, startStep: 2 };
    }
    return { state: INITIAL, startStep: 1 };
  }, [params]);

  const [state, setState] = useState<State>(initialFromParams.state);
  const [step, setStep] = useState<StepId>(initialFromParams.startStep);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [hp, setHp] = useState("");

  const update = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const goTo = (s: StepId) => {
    setStep(s);
    if (typeof window !== "undefined") {
      const el = document.getElementById("projekt");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canAdvance = (from: StepId): boolean => {
    if (from === 1) return state.bedarf !== null;
    if (from === 2) return true;
    if (from === 3) return true;
    if (from === 4) return state.name.trim() !== "" && state.email.trim() !== "";
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(null);

    const payload = {
      hp,
      name: state.name,
      email: state.email,
      telefon: state.telefon,
      notiz: state.notiz,
      bedarf: t.bedarf[state.bedarf as Bedarf]?.titel ?? "·",
      seiten: t.seiten[state.seiten],
      sprachen: t.sprachen[state.sprachen],
      zeitplan: state.zeitplan,
      budget: state.budget ? t.budget[state.budget] : "·",
    };

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSendError(data?.error === "rate-limit" ? t.rateLimit : t.errorEmail);
        setSending(false);
        return;
      }
      track({ type: "form_submit", form: "kontakt" });
      setSent(true);
    } catch {
      setSendError(t.networkError);
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[640px] mx-auto rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/[0.06] to-transparent p-10 md:p-14 text-center"
      >
        <motion.svg
          viewBox="0 0 120 80"
          className="mx-auto w-24 h-16 text-accent-ink mb-2"
          aria-hidden
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M 15 45 Q 35 60 50 65 T 105 15"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          />
          <motion.path
            d="M 100 10 L 105 15 L 100 22"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { delay: 0.7, duration: 0.25 } },
            }}
          />
        </motion.svg>

        <h2 className="heading-display text-[clamp(1.75rem,4vw,2.5rem)] text-offwhite">
          {t.dankePre} {state.name.trim().split(" ")[0] || (locale === "fr" ? "salut" : locale === "en" ? "hey" : "moin")}.
        </h2>

        <p
          className="mt-4 font-hand text-[22px] md:text-[24px] text-accent-ink"
          style={{ transform: "rotate(-1deg)" }}
        >
          {t.hand}
        </p>

        <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[440px] mx-auto">
          {t.thanksBody1}{state.email.includes("@") ? (locale === "fr" ? "mail" : "mail") : (locale === "fr" ? "message" : "message")}
          {state.telefon ? `${t.thanksBody2pre}${state.telefon}${t.thanksBody2tel}` : ""}
          {t.thanksBody3}
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button href={buildPath("home", locale)} variant="glass" size="md">
            {t.ctaHome}
          </Button>
          <Button href={buildPath("referenzen", locale)} variant="ghost" size="md">
            {t.ctaRefs}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-[820px] mx-auto">
      <Progress step={step} labels={t.progressLabels} />

      <div className="mt-10 relative min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {step === 1 && (
              <Step1
                value={state.bedarf}
                onChange={(v) => update("bedarf", v)}
                t={t}
              />
            )}
            {step === 2 && (
              <Step2 state={state} update={update} t={t} />
            )}
            {step === 3 && (
              <Step3
                state={state}
                onEdit={(s) => goTo(s)}
                t={t}
              />
            )}
            {step === 4 && (
              <Step4
                state={state}
                update={update}
                onSubmit={handleSubmit}
                onBack={() => goTo(3)}
                sending={sending}
                sendError={sendError}
                hp={hp}
                setHp={setHp}
                t={t}
                locale={locale}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step !== 4 && (
        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => goTo(Math.max(1, step - 1) as StepId)}
            disabled={step === 1}
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-offwhite/55 transition-colors"
          >
            {t.back}
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              {t.schrittPre} {step} / 4
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={() => canAdvance(step) && goTo(Math.min(4, step + 1) as StepId)}
              disabled={!canAdvance(step)}
            >
              {t.weiter}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ progress ══════════════════════════ */

function Progress({ step, labels }: { step: StepId; labels: string[] }) {
  return (
    <div className="flex items-start justify-between gap-2 max-w-[560px]">
      {labels.map((label, i) => {
        const s = (i + 1) as StepId;
        const active = s === step;
        const done = s < step;
        return (
          <div key={label} className="flex-1 flex flex-col items-center gap-2 relative">
            <ScribbleCircle state={active ? "active" : done ? "done" : "idle"} index={i} />
            <span
              className={[
                "font-mono text-[9px] md:text-[10px] uppercase tracking-label text-center leading-tight transition-colors",
                active ? "text-accent-ink" : done ? "text-offwhite/55" : "text-offwhite/35",
              ].join(" ")}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <svg
                aria-hidden
                viewBox="0 0 60 12"
                className="absolute top-5 left-[calc(50%+22px)] w-[calc(100%-44px)] h-3 pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 2 6 Q 15 1 30 6 T 58 6"
                  stroke={done ? "#d9ff00" : "rgba(242,240,231,0.15)"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={done ? "0" : "3,3"}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ScribbleCircle({
  state,
  index,
}: {
  state: "idle" | "active" | "done";
  index: number;
}) {
  const rot = [-3, 2, -1.5, 3][index] ?? 0;
  const stroke = state === "active" ? "#d9ff00" : state === "done" ? "rgba(217,255,0,0.7)" : "rgba(242,240,231,0.25)";
  const fill = state === "active" ? "rgba(217,255,0,0.18)" : state === "done" ? "rgba(217,255,0,0.08)" : "transparent";

  return (
    <svg aria-hidden viewBox="0 0 40 40" style={{ transform: `rotate(${rot}deg)` }} className="w-10 h-10 shrink-0">
      <path
        d="M20 5 Q 34 8, 35 20 Q 34 32, 20 35 Q 6 32, 5 20 Q 6 8, 20 5 Z"
        stroke={stroke}
        strokeWidth={state === "active" ? 2 : 1.4}
        strokeLinecap="round"
        fill={fill}
      />
      {state === "idle" && (
        <path d="M22 6 Q 33 10, 34 21 Q 33 30, 20 34" stroke={stroke} strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.5" />
      )}
      {state === "done" && (
        <path d="M11 20 L18 27 L30 13" stroke="#d9ff00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
      {state === "active" && (
        <circle cx="20" cy="20" r="3.5" fill="#d9ff00" />
      )}
    </svg>
  );
}

/* ══════════════════════════ step 1 · bedarf ══════════════════════════ */

const BEDARF_IDS: Bedarf[] = ["website", "branding", "alles", "was-anderes"];

function Step1({
  value,
  onChange,
  t,
}: {
  value: Bedarf | null;
  onChange: (v: Bedarf) => void;
  t: Dict;
}) {
  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        {t.step1H3}
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        {t.step1Body}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BEDARF_IDS.map((id) => {
          const opt = t.bedarf[id];
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              className={[
                "text-left rounded-xl p-5 border transition-all",
                active
                  ? "border-lime/50 bg-lime/[0.05] shadow-[0_12px_32px_-16px_rgb(var(--accent)_/_0.3)]"
                  : "border-ink/10 bg-ink/[0.015] hover:border-ink/25",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4
                  className={[
                    "heading-sans text-[18px] transition-colors",
                    active ? "text-accent-ink" : "text-offwhite",
                  ].join(" ")}
                >
                  {opt.titel}
                </h4>
                {active && (
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    {t.gewaehlt}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-offwhite/55">
                {opt.kurz}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════ step 2 · scope ══════════════════════════ */

const SEITEN_IDS: Seiten[] = ["onepager", "2-5", "6-10", "10+", "weiss-nicht"];
const SPRACHEN_IDS: Sprachen[] = ["1", "2", "3+"];
const BUDGET_IDS: Budget[] = ["<2k", "2-5k", "5-10k", "10k+", "weiss-nicht"];

function Step2({
  state,
  update,
  t,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  t: Dict;
}) {
  const isBranding = state.bedarf === "branding";

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        {t.step2H3}
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        {t.step2Body}
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {!isBranding && (
          <ChipField
            label={t.scopeLabelSeiten}
            value={state.seiten}
            options={SEITEN_IDS.map((id) => ({ id, label: t.seiten[id] }))}
            onChange={(v) => update("seiten", v)}
          />
        )}

        {!isBranding && (
          <ChipField
            label={t.scopeLabelSprachen}
            value={state.sprachen}
            options={SPRACHEN_IDS.map((id) => ({ id, label: t.sprachen[id] }))}
            onChange={(v) => update("sprachen", v)}
          />
        )}

        <ChipField
          label={t.scopeLabelBudget}
          value={state.budget}
          options={BUDGET_IDS.map((id) => ({ id, label: t.budget[id] }))}
          onChange={(v) => update("budget", v)}
          hint={t.scopeHintBudget}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════ step 3 · zusammenfassung ══════════════════════════ */

function Step3({
  state,
  onEdit,
  t,
}: {
  state: State;
  onEdit: (step: StepId) => void;
  t: Dict;
}) {
  const isBranding = state.bedarf === "branding";

  const rows: { label: string; value: string; editStep: StepId }[] = [
    { label: t.bedarfQ, value: state.bedarf ? t.bedarf[state.bedarf].titel : "·", editStep: 1 },
  ];

  if (!isBranding) {
    rows.push({ label: t.scopeLabelSeiten.includes("?") ? (state.bedarf ? "seiten" : "seiten") : "seiten", value: t.seiten[state.seiten], editStep: 2 });
    rows.push({ label: t.scopeLabelSprachen, value: t.sprachen[state.sprachen], editStep: 2 });
  }

  rows.push({ label: "budget", value: state.budget ? t.budget[state.budget] : t.step3BudgetOpen, editStep: 2 });

  return (
    <div>
      <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
        {t.step3H3}
      </h3>
      <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
        {t.step3Body}
      </p>

      <div className="mt-8 glass rounded-2xl overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.label + i}
            className={[
              "grid grid-cols-[120px_1fr_auto] gap-4 items-baseline px-5 md:px-6 py-4",
              i < rows.length - 1 ? "border-b border-ink/10" : "",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              {r.label}
            </span>
            <span className="text-[14px] text-offwhite/75">{r.value}</span>
            <button
              type="button"
              onClick={() => onEdit(r.editStep)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
            >
              {t.step3Edit}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-offwhite/55">
        {t.step3Footer}
      </p>
    </div>
  );
}

/* ══════════════════════════ step 4 · kontakt ══════════════════════════ */

function Step4({
  state,
  update,
  onSubmit,
  onBack,
  sending,
  sendError,
  hp,
  setHp,
  t,
  locale,
}: {
  state: State;
  update: <K extends keyof State>(key: K, value: State[K]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  sending: boolean;
  sendError: string | null;
  hp: string;
  setHp: (v: string) => void;
  t: Dict;
  locale: Locale;
}) {
  const canSend = !sending && state.name.trim() !== "" && state.email.trim() !== "";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div>
        <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
          {t.step4H3}
        </h3>
        <p className="mt-3 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
          {t.step4Body}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label={t.fieldName}
          value={state.name}
          onChange={(v) => update("name", v)}
          required
          placeholder={t.namePlaceholder}
          autoComplete="name"
        />
        <TextField
          label={t.fieldEmail}
          type="email"
          value={state.email}
          onChange={(v) => update("email", v)}
          required
          placeholder={t.emailPlaceholder}
          autoComplete="email"
        />
      </div>

      <TextField
        label={t.fieldTel}
        type="tel"
        value={state.telefon}
        onChange={(v) => update("telefon", v)}
        placeholder={t.telPlaceholder}
        autoComplete="tel"
      />

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-2">
          {t.fieldNotiz}
        </label>
        <textarea
          value={state.notiz}
          onChange={(e) => update("notiz", e.target.value)}
          rows={5}
          placeholder={t.notizPlaceholder}
          className="w-full bg-ink/[0.03] border border-ink/10 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/55 outline-none resize-none transition-colors"
        />
      </div>

      <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-offwhite/55 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          className="mt-1 accent-lime w-4 h-4 rounded cursor-pointer"
        />
        <span>
          {t.consent1}
          <a href={buildPath("datenschutz", locale)} className="text-accent-ink hover:underline">
            {t.consentLink}
          </a>
          {t.consent2}
        </span>
      </label>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          {t.honeypotLabel}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      {sendError && (
        <div
          role="alert"
          className="rounded-lg border border-rose-400/40 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200"
        >
          {sendError}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          disabled={sending}
          className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t.back}
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            {t.schrittPre} 4 / 4
          </span>
          <Button variant="primary" size="md" disabled={!canSend}>
            {sending ? t.sende : t.anfrageSenden}
          </Button>
        </div>
      </div>
    </form>
  );
}

/* ══════════════════════════ chip-field ══════════════════════════ */

function ChipField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T | null;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={[
                "font-mono text-[11px] uppercase tracking-mono px-3.5 py-2 rounded-full border transition-all",
                active
                  ? "border-lime/50 bg-lime/10 text-accent-ink"
                  : "border-ink/10 bg-ink/[0.02] text-offwhite/55 hover:border-ink/25 hover:text-offwhite",
              ].join(" ")}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {hint && (
        <p className="mt-2 text-[12px] text-offwhite/35">{hint}</p>
      )}
    </div>
  );
}

/* ══════════════════════════ text-field ══════════════════════════ */

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-label text-offwhite/55 mb-2">
        {label}
        {required && <span className="text-accent-ink ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink/[0.03] border border-ink/10 focus:border-lime/50 focus:bg-ink/[0.05] rounded-lg px-4 py-3 text-[14px] text-offwhite placeholder:text-offwhite/55 outline-none transition-colors"
      />
    </div>
  );
}
