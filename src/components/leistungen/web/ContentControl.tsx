"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type FormValues = { titel: string; telefon: string };
type FieldKey = keyof FormValues;

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2italic: string;
  body1: string;
  body2: string;
  body3: string;
  body4: string;
  body5: string;
  demoLabel: string;
  handLine1: string;
  handLine1accent: string;
  handLine2: string;
  cmsBackend: string;
  cmsUrl: string;
  feldTitel: string;
  feldTelefon: string;
  bildFarbe: string;
  warLabel: string;
  unveraendert: string;
  aenderung: (n: number) => string;
  liveOnline: string;
  zurueck: string;
  speichern: string;
  gespeichert: string;
  studioName: string;
  navKontakt: string;
  defaultTitel: string;
  defaultTelefon: string;
  colors: { id: string; hex: string; label: string }[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "der unterschied",
    h2pre: "änderungen im nachhinein · ",
    h2italic: "könntest du sogar selber machen.",
    body1: "Ich bau die Seite launch-fertig. Ab Launch kriegt ",
    body2: "jeder Kunde einen eigenen Login",
    body3: " · Onepager oder 20-Seiter, ohne Ausnahme. Tippfehler, Team-Foto, Telefonnummer · machst du selbst, wenn du willst. ",
    body4: "Oder ruf mich an · auch okay.",
    body5: "",
    demoLabel: "kleine demo",
    handLine1: "tipp links · ",
    handLine1accent: "siehst rechts",
    handLine2: ". bei dir genauso · direkt auf deiner seite.",
    cmsBackend: "● backend",
    cmsUrl: "cms.deine-website.be",
    feldTitel: "titel der startseite",
    feldTelefon: "telefonnummer",
    bildFarbe: "bild · farbe",
    warLabel: "war:",
    unveraendert: "unverändert",
    aenderung: (n) => `${n} änderung${n > 1 ? "en" : ""}`,
    liveOnline: "live · sofort online",
    zurueck: "zurücksetzen",
    speichern: "speichern →",
    gespeichert: "✓ gespeichert",
    studioName: "studio vela",
    navKontakt: "kontakt · shop",
    defaultTitel: "willkommen bei studio vela",
    defaultTelefon: "+32 470 12 34 56",
    colors: [
      { id: "slate", hex: "#2e2e2a", label: "schiefer" },
      { id: "ochre", hex: "#c8a967", label: "ocker" },
      { id: "rust", hex: "#c8794a", label: "terracotta" },
      { id: "dusk", hex: "#4a5a7a", label: "dämmer" },
      { id: "sage", hex: "#6b8a6b", label: "salbei" },
    ],
  },
  fr: {
    sectionLabel: "la différence",
    h2pre: "les modifs ensuite · ",
    h2italic: "tu pourrais même les faire toi-même.",
    body1: "Je construis le site prêt pour le lancement. À partir de là ",
    body2: "chaque client reçoit son propre login",
    body3: " · onepage ou 20 pages, sans exception. Faute de frappe, photo d'équipe, numéro de tél · tu le fais toi-même si tu veux. ",
    body4: "Ou tu m'appelles · aussi ok.",
    body5: "",
    demoLabel: "petite démo",
    handLine1: "tape à gauche · ",
    handLine1accent: "tu vois à droite",
    handLine2: ". chez toi pareil · direct sur ton site.",
    cmsBackend: "● backend",
    cmsUrl: "cms.ton-site.be",
    feldTitel: "titre de la page d'accueil",
    feldTelefon: "numéro de téléphone",
    bildFarbe: "image · couleur",
    warLabel: "avant :",
    unveraendert: "rien changé",
    aenderung: (n) => `${n} modif${n > 1 ? "s" : ""}`,
    liveOnline: "live · en ligne direct",
    zurueck: "réinitialiser",
    speichern: "enregistrer →",
    gespeichert: "✓ enregistré",
    studioName: "studio vela",
    navKontakt: "contact · shop",
    defaultTitel: "bienvenue chez studio vela",
    defaultTelefon: "+32 470 12 34 56",
    colors: [
      { id: "slate", hex: "#2e2e2a", label: "ardoise" },
      { id: "ochre", hex: "#c8a967", label: "ocre" },
      { id: "rust", hex: "#c8794a", label: "terracotta" },
      { id: "dusk", hex: "#4a5a7a", label: "crépuscule" },
      { id: "sage", hex: "#6b8a6b", label: "sauge" },
    ],
  },
  en: {
    sectionLabel: "the difference",
    h2pre: "later edits · ",
    h2italic: "you could even do them yourself.",
    body1: "I build the site launch-ready. From launch on ",
    body2: "every client gets their own login",
    body3: " · onepager or 20-pager, no exception. Typo, team photo, phone number · you do it yourself if you want. ",
    body4: "Or call me · also fine.",
    body5: "",
    demoLabel: "small demo",
    handLine1: "type left · ",
    handLine1accent: "see right",
    handLine2: ". same on yours · right on your site.",
    cmsBackend: "● backend",
    cmsUrl: "cms.your-site.be",
    feldTitel: "homepage title",
    feldTelefon: "phone number",
    bildFarbe: "image · colour",
    warLabel: "was:",
    unveraendert: "unchanged",
    aenderung: (n) => `${n} change${n > 1 ? "s" : ""}`,
    liveOnline: "live · online instantly",
    zurueck: "reset",
    speichern: "save →",
    gespeichert: "✓ saved",
    studioName: "studio vela",
    navKontakt: "contact · shop",
    defaultTitel: "welcome to studio vela",
    defaultTelefon: "+32 470 12 34 56",
    colors: [
      { id: "slate", hex: "#2e2e2a", label: "slate" },
      { id: "ochre", hex: "#c8a967", label: "ochre" },
      { id: "rust", hex: "#c8794a", label: "terracotta" },
      { id: "dusk", hex: "#4a5a7a", label: "dusk" },
      { id: "sage", hex: "#6b8a6b", label: "sage" },
    ],
  },
};

export function ContentControl({ num = "02" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const DEFAULTS: FormValues = { titel: t.defaultTitel, telefon: t.defaultTelefon };
  const COLORS = t.colors;

  const [values, setValues] = useState<FormValues>(DEFAULTS);
  const [saved, setSaved] = useState<FormValues>(DEFAULTS);
  const [bgColor, setBgColor] = useState(COLORS[0].hex);
  const [savedBg, setSavedBg] = useState(COLORS[0].hex);
  const [flash, setFlash] = useState(false);

  const fieldChanges = useMemo(
    () => (Object.keys(values) as FieldKey[]).filter((k) => values[k] !== saved[k]),
    [values, saved],
  );

  const bgChanged = bgColor !== savedBg;
  const totalChanges = fieldChanges.length + (bgChanged ? 1 : 0);
  const justSaved = flash && totalChanges === 0;

  const handleSave = () => {
    if (totalChanges === 0) return;
    setSaved({ ...values });
    setSavedBg(bgColor);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1800);
  };

  const handleReset = () => {
    setValues({ ...saved });
    setBgColor(savedBg);
  };

  return (
    <section className="relative pb-32 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>

        <h2 className="mt-4 heading-display text-[clamp(2.25rem,6vw,4rem)] text-offwhite leading-[1.02] max-w-[920px]">
          {t.h2pre}
          <span className="font-hand text-accent-ink">{t.h2italic}</span>
        </h2>

        <p className="mt-7 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/75">
          {t.body1}
          <span className="text-offwhite">{t.body2}</span>
          {t.body3}
          <span className="text-offwhite/55">{t.body4}</span>
        </p>

        <div className="mt-14 md:mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                {t.demoLabel}
              </span>
              <p className="mt-3 font-hand text-[22px] md:text-[26px] text-offwhite/85 -rotate-1 leading-[1.15]">
                {t.handLine1}
                <span className="text-accent-ink">{t.handLine1accent}</span>
                {t.handLine2}
              </p>
            </div>
            <MockCmsEditor
              values={values}
              setValues={setValues}
              saved={saved}
              bgColor={bgColor}
              setBgColor={setBgColor}
              bgChanged={bgChanged}
              totalChanges={totalChanges}
              justSaved={justSaved}
              onSave={handleSave}
              onReset={handleReset}
              t={t}
              colors={COLORS}
            />
          </div>

          <div className="flex flex-col">
            <FrontendPreview
              titel={saved.titel}
              telefon={saved.telefon}
              bgColor={savedBg}
              t={t}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MockCmsEditor(props: {
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  saved: FormValues;
  bgColor: string;
  setBgColor: (hex: string) => void;
  bgChanged: boolean;
  totalChanges: number;
  justSaved: boolean;
  onSave: () => void;
  onReset: () => void;
  t: Dict;
  colors: { id: string; hex: string; label: string }[];
}) {
  const { values, setValues, saved, bgColor, setBgColor, bgChanged, totalChanges, justSaved, onSave, onReset, t, colors } = props;

  return (
    <div
      className="liquid-glass-dark rounded-xl overflow-hidden w-full"
      style={{ transform: "rotate(-0.5deg)" }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink/20">
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="ml-3 font-mono text-[10px] text-offwhite/45 truncate">
          {t.cmsUrl}
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-label text-lime shrink-0">
          {t.cmsBackend}
        </span>
      </div>

      <div className="p-3.5 md:p-4 flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_112px] md:grid-cols-[1fr_128px] gap-3 md:gap-4">
          <div className="flex flex-col gap-3 min-w-0">
            <EditorField
              label={t.feldTitel}
              value={values.titel}
              onChange={(v) => setValues((prev) => ({ ...prev, titel: v }))}
              previous={values.titel !== saved.titel ? saved.titel : null}
              warLabel={t.warLabel}
            />
            <EditorField
              label={t.feldTelefon}
              value={values.telefon}
              onChange={(v) => setValues((prev) => ({ ...prev, telefon: v }))}
              previous={values.telefon !== saved.telefon ? saved.telefon : null}
              warLabel={t.warLabel}
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0">
            <label className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/45">
              {t.bildFarbe}
            </label>
            <div
              className="relative rounded-md overflow-hidden aspect-square border border-ink/20 transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <TeamSilhouetteSvg />
              {bgChanged && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-lime ring-2 ring-lime/25" />
              )}
            </div>
            <div className="flex items-center gap-1 flex-wrap pt-0.5">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setBgColor(c.hex)}
                  aria-label={c.label}
                  title={c.label}
                  className={[
                    "h-3.5 w-3.5 rounded-full border transition-all cursor-pointer",
                    bgColor === c.hex
                      ? "border-offwhite scale-110"
                      : "border-ink/25 hover:border-offwhite/50",
                  ].join(" ")}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink/20 pt-3 mt-0.5">
          <StatusPill
            state={justSaved ? "saved" : totalChanges > 0 ? "dirty" : "clean"}
            count={totalChanges}
            t={t}
          />
          <div className="flex items-center gap-3">
            {totalChanges > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="font-mono text-[9.5px] uppercase tracking-label text-offwhite/45 hover:text-offwhite/85 transition-colors"
              >
                {t.zurueck}
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              disabled={totalChanges === 0}
              className={[
                "font-mono text-[10px] uppercase tracking-mono px-3 py-1.5 rounded transition-colors",
                totalChanges === 0
                  ? justSaved
                    ? "bg-lime/80 text-[#0a0a0a]"
                    : "bg-offwhite/[0.06] text-offwhite/35 cursor-not-allowed"
                  : "bg-lime text-[#0a0a0a] hover:bg-lime/90",
              ].join(" ")}
            >
              {justSaved ? t.gespeichert : t.speichern}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorField({
  label,
  value,
  onChange,
  previous,
  warLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  previous: string | null;
  warLabel: string;
}) {
  const changed = previous !== null;
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <label className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/45">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className={[
          "bg-offwhite/[0.025] border rounded-md px-2.5 py-1.5 text-[13px] text-offwhite/90 min-w-0",
          "focus:outline-none focus:bg-offwhite/[0.05] transition-colors",
          changed
            ? "border-lime/45 focus:border-lime"
            : "border-ink/20 focus:border-accent-ink/50",
        ].join(" ")}
      />
      {changed && (
        <span className="font-mono text-[9px] text-offwhite/35 truncate pl-0.5">
          {warLabel} <span className="line-through">{previous}</span>
        </span>
      )}
    </div>
  );
}

function StatusPill({
  state,
  count,
  t,
}: {
  state: "clean" | "dirty" | "saved";
  count: number;
  t: Dict;
}) {
  if (state === "saved") {
    return (
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-lime">
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        {t.liveOnline}
      </span>
    );
  }
  if (state === "dirty") {
    return (
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-offwhite/75">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
        </span>
        {t.aenderung(count)}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-label text-offwhite/45">
      <span className="h-1.5 w-1.5 rounded-full bg-offwhite/20" />
      {t.unveraendert}
    </span>
  );
}

function FrontendPreview({
  titel,
  telefon,
  bgColor,
  t,
}: {
  titel: string;
  telefon: string;
  bgColor: string;
  t: Dict;
}) {
  return (
    <div
      className="liquid-glass-dark rounded-xl overflow-hidden w-full"
      style={{ transform: "rotate(0.5deg)" }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink/20">
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-offwhite/15" />
        <span className="ml-3 font-mono text-[10px] text-offwhite/45 truncate">
          deine-website.be
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-label text-accent-ink shrink-0">
          frontend
        </span>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-4 min-h-[260px]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/75">
            {t.studioName}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            {t.navKontakt}
          </span>
        </div>

        <h4 className="heading-display text-[clamp(1.1rem,2.2vw,1.4rem)] text-offwhite leading-[1.15] break-words min-h-[2.5rem]">
          {titel}
        </h4>

        <div
          className="rounded-md overflow-hidden aspect-[16/7] relative border border-ink/5 transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          <TeamSilhouetteSvg />
        </div>

        <div className="flex items-center justify-between border-t border-ink/20 pt-3 mt-auto">
          <span className="font-mono text-[10px] text-offwhite/55">
            ☎ {telefon}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
            © 2026
          </span>
        </div>
      </div>
    </div>
  );
}

function TeamSilhouetteSvg() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full text-offwhite"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g opacity="0.35">
        <circle cx="110" cy="85" r="24" fill="currentColor" />
        <path d="M 78 200 Q 78 120, 110 120 Q 142 120, 142 200 Z" fill="currentColor" />
      </g>
      <g opacity="0.55">
        <circle cx="200" cy="70" r="28" fill="currentColor" />
        <path d="M 163 200 Q 163 108, 200 108 Q 237 108, 237 200 Z" fill="currentColor" />
      </g>
      <g opacity="0.4">
        <circle cx="290" cy="82" r="25" fill="currentColor" />
        <path d="M 258 200 Q 258 117, 290 117 Q 322 117, 322 200 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
