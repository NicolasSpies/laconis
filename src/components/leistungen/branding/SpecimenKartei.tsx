"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/config/contact";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type Sheet = { num: string; titel: string; untertitel: string; meta: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro1: string;
  intro2: string;
  bridgePre: string;
  bridgePost: string;
  musterblatt: string;
  ctaSim: string;
  ctaSimSub: string;
  primaer: string;
  favicon: string;
  wortmarke: string;
  appIcon: string;
  brandGuideLabel: string;
  brandGuideVersion: string;
  brandGuideTitleL1: string;
  brandGuideTitleL2: string;
  brandGuideTitleL3: string;
  toTitle: string;
  toSystem: string;
  farbwelt: string;
  typografie: string;
  h1Display: string;
  ueberschrift: string;
  h3Sans: string;
  zwischenzeile: string;
  bodySans: string;
  bodyText: string;
  designerRole: string;
  printMeta: string;
  moodboardWords: string[]; // [ruhig, ehrlich, editorial]
  texturePapier: string;
  sheets: Sheet[];
  colorNames: { lime: string; ink: string; paper: string; sand: string };
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "dein start-paket",
    h2pre: "alles, womit deine marke",
    h2post: "wirklich losgehen kann.",
    intro1: "Kein Cherry-Picking, keine Baustein-Liste · das ist der Grundstock, mit dem jede Marke bei mir startet. Vier Musterblätter, alles greift ineinander, nichts fehlt.",
    intro2: "Vom Logo über Farbwelt und Typo bis zur Visitenkarte · alles stimmt aufeinander ab. Später kommt mehr dazu, wenn du's brauchst · aber so startest du sauber.",
    bridgePre: "vier blätter",
    bridgePost: "eine sprache.",
    musterblatt: "musterblatt",
    ctaSim: "versuch's selber aus · brand-simulator →",
    ctaSimSub: "name + farben wählen · in sekunden eine marke bauen",
    primaer: "01 · primär",
    favicon: "02 · favicon",
    wortmarke: "wortmarke · hausfont",
    appIcon: "app-icon · social-avatar",
    brandGuideLabel: "brand guide",
    brandGuideVersion: "v 1.0 · 2025",
    brandGuideTitleL1: "wie es",
    brandGuideTitleL2: "aussehen",
    brandGuideTitleL3: "soll.",
    toTitle: "→ titel",
    toSystem: "→ system",
    farbwelt: "farbwelt",
    typografie: "typografie",
    h1Display: "h1 · display",
    ueberschrift: "überschrift",
    h3Sans: "h3 · sans",
    zwischenzeile: "zwischenzeile",
    bodySans: "body · sans",
    bodyText: "Fließtext mit Luft. Lesbar auch auf alten Bildschirmen.",
    designerRole: "designer · web & brand",
    printMeta: "85×55mm · 3mm anschnitt · schnittmarken",
    moodboardWords: ["ruhig", "ehrlich", "editorial"],
    texturePapier: "papier",
    sheets: [
      { num: "01", titel: "logo + wordmark", untertitel: "Nicht das 500ste Kreis-mit-Schwung-Logo. Eine Marke, die man auf einem T-Shirt erkennt und im Telefonbuch schreiben kann.", meta: "wordmark · favicon · monogramm" },
      { num: "02", titel: "moodboard + recherche", untertitel: "Bevor geschraubt wird: wer bist du, wer sind die anderen, was fehlt. Ehrliche Recherche, kein Pinterest-Dump.", meta: "3-5 welten zur auswahl · wettbewerbs-scan" },
      { num: "03", titel: "brand guide", untertitel: "Farbwelt, Typografie, Bildsprache, Tonalität. Damit du nicht jedes Mal von vorne anfängst, wenn jemand ein Plakat druckt.", meta: "pdf · deine marke auf einen blick" },
      { num: "04", titel: "print + packaging", untertitel: "Etiketten, Flyer, Speisekarten, Verpackung. Druckfertig mit den richtigen Farbprofilen · nicht nur fürs Screen-Hübsch.", meta: "pdf/x-4 · 3mm anschnitt · iso 12647" },
    ],
    colorNames: { lime: "lime", ink: "ink", paper: "paper", sand: "sand" },
  },
  fr: {
    sectionLabel: "ton pack de départ",
    h2pre: "tout ce qu'il faut pour que ta marque",
    h2post: "démarre vraiment.",
    intro1: "Pas de cherry-picking, pas de liste de modules · voilà la base avec laquelle chaque marque démarre chez moi. Quatre planches, tout s'articule, rien ne manque.",
    intro2: "Du logo à l'univers couleur et à la typo jusqu'à la carte de visite · tout se répond. Plus tard ça s'enrichit si t'en as besoin · mais comme ça tu démarres propre.",
    bridgePre: "quatre planches",
    bridgePost: "un langage.",
    musterblatt: "planche",
    ctaSim: "essaie toi-même · brand-simulator →",
    ctaSimSub: "choisis nom + couleurs · construis une marque en quelques secondes",
    primaer: "01 · primaire",
    favicon: "02 · favicon",
    wortmarke: "wordmark · police maison",
    appIcon: "app-icon · avatar social",
    brandGuideLabel: "brand guide",
    brandGuideVersion: "v 1.0 · 2025",
    brandGuideTitleL1: "à quoi ça",
    brandGuideTitleL2: "doit",
    brandGuideTitleL3: "ressembler.",
    toTitle: "→ titre",
    toSystem: "→ système",
    farbwelt: "couleurs",
    typografie: "typographie",
    h1Display: "h1 · display",
    ueberschrift: "titre",
    h3Sans: "h3 · sans",
    zwischenzeile: "sous-titre",
    bodySans: "body · sans",
    bodyText: "Texte courant aéré. Lisible même sur de vieux écrans.",
    designerRole: "designer · web & brand",
    printMeta: "85×55mm · 3mm de fond perdu · marques de coupe",
    moodboardWords: ["calme", "honnête", "editorial"],
    texturePapier: "papier",
    sheets: [
      { num: "01", titel: "logo + wordmark", untertitel: "Pas le 500e logo cercle-avec-volute. Une marque qu'on reconnaît sur un t-shirt et qu'on peut écrire dans un annuaire.", meta: "wordmark · favicon · monogramme" },
      { num: "02", titel: "moodboard + recherche", untertitel: "Avant de visser : qui tu es, qui sont les autres, ce qui manque. Recherche honnête, pas un dump Pinterest.", meta: "3-5 univers au choix · scan concurrentiel" },
      { num: "03", titel: "brand guide", untertitel: "Couleurs, typographie, image, ton. Pour pas repartir de zéro à chaque fois que quelqu'un imprime une affiche.", meta: "pdf · ta marque d'un coup d'œil" },
      { num: "04", titel: "print + packaging", untertitel: "Étiquettes, flyers, menus, emballages. Prêt-à-imprimer avec les bons profils couleur · pas juste joli à l'écran.", meta: "pdf/x-4 · 3mm de fond perdu · iso 12647" },
    ],
    colorNames: { lime: "lime", ink: "encre", paper: "papier", sand: "sable" },
  },
  en: {
    sectionLabel: "your starter pack",
    h2pre: "everything your brand needs to",
    h2post: "actually take off.",
    intro1: "No cherry-picking, no modules-list · this is the base every brand starts with at my place. Four sheets, all interlocking, nothing missing.",
    intro2: "From the logo via the colour world and type to the business card · everything aligns. More comes later if you need it · but this way you start clean.",
    bridgePre: "four sheets",
    bridgePost: "one language.",
    musterblatt: "sheet",
    ctaSim: "try it yourself · brand simulator →",
    ctaSimSub: "pick name + colours · build a brand in seconds",
    primaer: "01 · primary",
    favicon: "02 · favicon",
    wortmarke: "wordmark · house font",
    appIcon: "app icon · social avatar",
    brandGuideLabel: "brand guide",
    brandGuideVersion: "v 1.0 · 2025",
    brandGuideTitleL1: "how it",
    brandGuideTitleL2: "should",
    brandGuideTitleL3: "look.",
    toTitle: "→ title",
    toSystem: "→ system",
    farbwelt: "colour world",
    typografie: "typography",
    h1Display: "h1 · display",
    ueberschrift: "headline",
    h3Sans: "h3 · sans",
    zwischenzeile: "subhead",
    bodySans: "body · sans",
    bodyText: "Body text with air. Readable even on old screens.",
    designerRole: "designer · web & brand",
    printMeta: "85×55mm · 3mm bleed · crop marks",
    moodboardWords: ["calm", "honest", "editorial"],
    texturePapier: "paper",
    sheets: [
      { num: "01", titel: "logo + wordmark", untertitel: "Not the 500th circle-with-a-swoosh logo. A brand you recognise on a t-shirt and can write in a phone book.", meta: "wordmark · favicon · monogram" },
      { num: "02", titel: "moodboard + research", untertitel: "Before any screws turn: who you are, who the others are, what's missing. Honest research, not a Pinterest dump.", meta: "3-5 worlds to choose · competitor scan" },
      { num: "03", titel: "brand guide", untertitel: "Colour world, typography, imagery, tone. So you don't start from zero every time someone prints a poster.", meta: "pdf · your brand at a glance" },
      { num: "04", titel: "print + packaging", untertitel: "Labels, flyers, menus, packaging. Print-ready with the right colour profiles · not just screen-pretty.", meta: "pdf/x-4 · 3mm bleed · iso 12647" },
    ],
    colorNames: { lime: "lime", ink: "ink", paper: "paper", sand: "sand" },
  },
};

export function SpecimenKartei({ num = "02" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
          {t.h2pre}{" "}
          <span className="text-offwhite/35">{t.h2post}</span>
        </h2>
        <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
          {t.intro1}
        </p>
        <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
          {t.intro2}
        </p>

        <div className="mt-16 space-y-6 md:space-y-7">
          <SpecimenFrame
            num={t.sheets[0].num}
            titel={t.sheets[0].titel}
            untertitel={t.sheets[0].untertitel}
            meta={t.sheets[0].meta}
            musterblatt={t.musterblatt}
            layout="classic"
            rotate="-0.6deg"
          >
            <WordmarkSpecimen t={t} />
          </SpecimenFrame>

          <SpecimenFrame
            num={t.sheets[1].num}
            titel={t.sheets[1].titel}
            untertitel={t.sheets[1].untertitel}
            meta={t.sheets[1].meta}
            musterblatt={t.musterblatt}
            layout="mirror"
            rotate="0.7deg"
          >
            <MoodboardSpecimen t={t} />
          </SpecimenFrame>

          {/* handmade-bridge · zusammenhalt der vier blätter */}
          <div className="flex justify-center py-4 md:py-6">
            <span
              className="font-hand text-[22px] md:text-[24px] text-offwhite/75 leading-none"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              {t.bridgePre}{" "}
              <span className="text-accent-ink">·</span> {t.bridgePost}
            </span>
          </div>

          <SpecimenFrame
            num={t.sheets[2].num}
            titel={t.sheets[2].titel}
            untertitel={t.sheets[2].untertitel}
            meta={t.sheets[2].meta}
            musterblatt={t.musterblatt}
            layout="classic"
            rotate="-0.5deg"
          >
            <BrandGuideSpecimen t={t} />
          </SpecimenFrame>

          <SpecimenFrame
            num={t.sheets[3].num}
            titel={t.sheets[3].titel}
            untertitel={t.sheets[3].untertitel}
            meta={t.sheets[3].meta}
            musterblatt={t.musterblatt}
            layout="mirror"
            rotate="0.6deg"
          >
            <PrintSpecimen t={t} />
          </SpecimenFrame>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <Button href={buildPath("leistungen/branding/simulator", locale)} variant="primary" size="md">
            {t.ctaSim}
          </Button>
          <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            {t.ctaSimSub}
          </p>
        </div>
      </div>
    </section>
  );
}

const NUM_OUTLINE_STYLE = {
  WebkitTextStroke: "1.2px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

function SpecimenFrame({
  num,
  titel,
  untertitel,
  meta,
  musterblatt,
  children,
  layout = "classic",
  rotate = "0deg",
}: {
  num: string;
  titel: string;
  untertitel: string;
  meta: string;
  musterblatt: string;
  children: React.ReactNode;
  layout?: "classic" | "mirror";
  rotate?: string;
}) {
  const isMirror = layout === "mirror";

  return (
    <div className="relative group">
      <span
        aria-hidden
        className={[
          "heading-display absolute z-0 select-none pointer-events-none",
          "text-[clamp(4rem,7vw,5.5rem)] leading-[0.82] text-offwhite/25",
          isMirror ? "top-0 right-0" : "top-0 left-0",
        ].join(" ")}
        style={{
          ...NUM_OUTLINE_STYLE,
          transform: isMirror
            ? "translate(35%, -55%) rotate(6deg)"
            : "translate(-35%, -55%) rotate(-6deg)",
        }}
      >
        {num}
      </span>

      <div
        className="relative z-10 liquid-glass-dark rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50"
        style={{ transform: `rotate(${rotate})` }}
      >
        <div className="grid lg:grid-cols-[320px_1fr] gap-0">
          <div
            className={[
              "p-7 md:p-9 flex flex-col justify-between min-h-[280px]",
              "border-b lg:border-b-0 border-ink/20",
              isMirror ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r",
            ].join(" ")}
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                {musterblatt} · {num}
              </span>
              <h3 className="heading-sans mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] text-offwhite leading-tight">
                {titel}
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-offwhite/55 max-w-[280px]">
                {untertitel}
              </p>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              {meta}
            </p>
          </div>

          <div
            className={[
              "relative p-6 md:p-10 min-h-[280px] flex items-center justify-center overflow-hidden",
              isMirror ? "lg:order-1" : "lg:order-2",
            ].join(" ")}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={["block aspect-[600/140.83]", className].filter(Boolean).join(" ")}
      style={{
        WebkitMaskImage: "url(/laconis-logo.svg)",
        maskImage: "url(/laconis-logo.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundColor: "currentColor",
        ...style,
      }}
    />
  );
}

function WordmarkSpecimen({ t }: { t: Dict }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 md:gap-10 items-center">
      <div className="relative text-center md:text-left">
        <span className="absolute -top-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 font-mono text-[8px] uppercase tracking-label text-offwhite/35">
          {t.primaer}
        </span>
        <div className="mt-4 text-offwhite inline-flex">
          <LogoMark className="h-[clamp(42px,6.5vw,72px)] w-auto" />
        </div>
        <span className="mt-4 block font-mono text-[9px] uppercase tracking-mono text-offwhite/35">
          {t.wortmarke}
        </span>
      </div>

      <div className="relative text-center md:text-right">
        <span className="absolute -top-2 right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 font-mono text-[8px] uppercase tracking-label text-offwhite/35">
          {t.favicon}
        </span>
        <div className="inline-flex items-center justify-center mt-4">
          <div className="w-[clamp(64px,8vw,88px)] h-[clamp(64px,8vw,88px)] rounded-full border border-lime/50 flex items-center justify-center bg-lime/[0.05]">
            <span className="heading-display text-lime text-[clamp(1.5rem,2.8vw,2rem)] leading-none">
              ø
            </span>
          </div>
        </div>
        <div className="mt-4 font-mono text-[9px] uppercase tracking-mono text-offwhite/35">
          {t.appIcon}
        </div>
      </div>
    </div>
  );
}

function BrandGuideSpecimen({ t }: { t: Dict }) {
  const COLORS = [
    { hex: "rgb(var(--accent))", name: t.colorNames.lime },
    { hex: "#1A1A1A", name: t.colorNames.ink },
    { hex: "#F3F1EA", name: t.colorNames.paper },
    { hex: "#A89F8C", name: t.colorNames.sand },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-3 items-start scale-[0.85] md:scale-100 origin-center">
        <div className="w-[148px] md:w-[190px] aspect-[3/4] rounded-sm bg-dark border border-ink/25 p-4 flex flex-col justify-between shadow-[8px_8px_24px_rgba(0,0,0,0.4)]">
          <div>
            <span className="font-mono text-[7px] uppercase tracking-label text-accent-ink">
              {t.brandGuideLabel}
            </span>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              {t.brandGuideVersion}
            </p>
          </div>
          <div className="heading-display text-offwhite text-[28px] md:text-[34px] leading-[0.9] tracking-tight">
            {t.brandGuideTitleL1}
            <br />
            {t.brandGuideTitleL2}
            <br />
            <span className="text-lime">{t.brandGuideTitleL3}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-[7px] text-offwhite/35">01</span>
            <span className="font-mono text-[7px] text-offwhite/35">
              {t.toTitle}
            </span>
          </div>
        </div>

        <div className="w-[148px] md:w-[190px] aspect-[3/4] rounded-sm bg-dark border border-ink/25 p-4 flex flex-col gap-3 shadow-[8px_8px_24px_rgba(0,0,0,0.4)]">
          <div>
            <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              {t.farbwelt}
            </span>
            <div className="mt-1.5 grid grid-cols-4 gap-1">
              {COLORS.map((c) => (
                <div key={c.hex} className="flex flex-col gap-0.5">
                  <div
                    className="aspect-square rounded-[1px] border border-ink/20"
                    style={{ background: c.hex }}
                  />
                  <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/55">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-1">
            <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              {t.typografie}
            </span>
            <div className="mt-1.5 space-y-1.5 border-l border-ink/25 pl-2">
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  {t.h1Display}
                </span>
                <p className="heading-display text-offwhite text-[13px] md:text-[16px] leading-[1] mt-0.5">
                  {t.ueberschrift}
                </p>
              </div>
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  {t.h3Sans}
                </span>
                <p className="heading-sans text-offwhite text-[9px] md:text-[10px] leading-tight mt-0.5">
                  {t.zwischenzeile}
                </p>
              </div>
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  {t.bodySans}
                </span>
                <p className="text-offwhite/75 text-[7px] md:text-[7.5px] leading-[1.35] mt-0.5">
                  {t.bodyText}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <span className="font-mono text-[7px] text-offwhite/35">08</span>
            <span className="font-mono text-[7px] text-lime">{t.toSystem}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintSpecimen({ t }: { t: Dict }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative">
        <div className="relative p-8">
          <CropMarks />

          <div className="absolute -left-2 -top-2 w-[200px] md:w-[260px] aspect-[1.618/1] rounded-[2px] bg-dark border border-ink/20 rotate-[-3deg] shadow-[8px_8px_20px_rgba(0,0,0,0.3)] p-4 flex items-end">
            <div className="w-full flex items-end justify-between">
              <div className="heading-display text-lime text-[18px] leading-none">
                ø
              </div>
              <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
                laconis.be
              </span>
            </div>
          </div>

          <div className="relative w-[200px] md:w-[260px] aspect-[1.618/1] rounded-[2px] bg-paper p-4 md:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between"
               style={{ background: "#F3F1EA" }}>
            <div>
              <span className="font-mono text-[7px] uppercase tracking-label" style={{ color: "#8A8376" }}>
                {t.designerRole}
              </span>
              <div className="heading-display mt-2 text-[16px] md:text-[20px] leading-tight" style={{ color: "#1A1A1A" }}>
                nicolas spies
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="font-mono text-[7px] uppercase tracking-mono leading-tight" style={{ color: "#1A1A1A" }}>
                {CONTACT.email}
                <br />
                {CONTACT.phone ?? "+32 … … …"}
              </div>
              <div className="heading-display text-[18px]" style={{ color: "#1A1A1A" }}>
                ø
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-mono text-offwhite/35 text-center">
          {t.printMeta}
        </p>
      </div>
    </div>
  );
}

function CropMarks() {
  const pos = [
    "top-0 left-0",
    "top-0 right-0 rotate-90",
    "bottom-0 left-0 -rotate-90",
    "bottom-0 right-0 rotate-180",
  ];
  return (
    <>
      {pos.map((p) => (
        <div
          key={p}
          className={`absolute ${p} w-4 h-4 pointer-events-none`}
          aria-hidden
        >
          <span className="absolute top-0 left-0 w-full h-px bg-offwhite/25" />
          <span className="absolute top-0 left-0 h-full w-px bg-offwhite/25" />
        </div>
      ))}
    </>
  );
}

function MoodboardSpecimen({ t }: { t: Dict }) {
  const TILES = [
    { kind: "hex", value: "rgb(var(--accent))" },
    { kind: "word", value: t.moodboardWords[0] },
    { kind: "texture", value: t.texturePapier },
    { kind: "word", value: t.moodboardWords[1] },
    { kind: "hex", value: "#1E3A5F" },
    { kind: "word", value: t.moodboardWords[2] },
    { kind: "pattern", value: "grid" },
    { kind: "hex", value: "#A89F8C" },
  ];

  return (
    <div className="w-full grid grid-cols-4 gap-2.5 max-w-[440px] mx-auto">
      {TILES.map((tile, i) => (
        <div
          key={i}
          className={[
            "aspect-square rounded-sm border border-ink/20 relative overflow-hidden",
            i % 3 === 0 ? "rotate-[-1.5deg]" : i % 3 === 1 ? "rotate-[1deg]" : "rotate-[-0.5deg]",
          ].join(" ")}
        >
          {tile.kind === "hex" && (
            <>
              <div className="absolute inset-0" style={{ background: tile.value }} />
              <span className="absolute bottom-1 left-1 font-mono text-[7px] uppercase tracking-mono text-black/60">
                {tile.value}
              </span>
            </>
          )}
          {tile.kind === "word" && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/[0.03]">
              <span className="font-hand text-[18px] md:text-[22px] text-offwhite/75">
                {tile.value}
              </span>
            </div>
          )}
          {tile.kind === "texture" && (
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{
                   background:
                     "repeating-linear-gradient(45deg, rgb(var(--ink) / 0.04) 0 3px, transparent 3px 6px)",
                 }}>
              <span className="font-hand text-[14px] text-offwhite/55">
                {tile.value}
              </span>
            </div>
          )}
          {tile.kind === "pattern" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(var(--ink) / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.12) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
