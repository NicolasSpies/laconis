/**
 * paket-pricing — reine funktionen für den "bau dein paket"-konfigurator.
 *
 * ALLE preise in EUR, netto. Änderungen hier wirken global.
 * Einheitliche kommentierung: "+X €" = einmalig, "+X €/Mt" = laufend.
 *
 * MODELL (v3 — voll granular):
 *   WEB:              1.400 € fix, +300 €/unterseite, +500 €/cms-bereich,
 *                     +50 € × seiten × zusatzsprache, +1.800 € shop.
 *   BRANDING:         1.200 € pauschal · logo, brand guide, vk, social templates.
 *   GRAFIK:           flyer/plakat/rollup/broschüre/präsentation/social/vk/signatur
 *                     jeweils einzel-konfigurierbar.
 *   AUTOBESCHRIFTUNG: auto L+R, V+H-addon, montage.
 *   HOSTING:          tier-basiert (onepager < multipager < cms).
 *   DOMAIN:           2 €/Mt wenn laconis registriert (user "nein"),
 *                     0 €/Mt wenn user selbst ("ja · hab ich schon").
 */

/* ══════════════════════════ state-modell ══════════════════════════ */

export type ContentHelp = "selbst" | "mit-hilfe" | "komplett";
export type Deadline = "flex" | "normal" | "dringend";

export type BuilderState = {
  /* ─── web-block ─── */
  web: boolean;
  /** anzahl unterseiten zusätzlich zur startseite. 0 = onepager. */
  unterseiten: number;
  /** anzahl selbst-pflegbarer cms-bereiche. */
  cms: number;
  /** anzahl sprachen insgesamt. 1 = nur eine, 2 = zwei, … */
  sprachen: number;
  shop: boolean;

  /* ─── branding-block — pauschal 1.200 € ─── */
  branding: boolean;

  /* ─── grafik-block — granulare counters ─── */
  /** section-toggle: wenn aus, werden alle counter-zeilen ignoriert. */
  grafik: boolean;
  flyer1: number;     // flyer einseitig · 200 €
  flyer2: number;     // flyer beidseitig · 300 €
  plakat: number;     // plakat (alle formate) · 200 €
  rollup: number;     // rollup · 200 €
  broschuere: number; // broschüren-seiten · 75 €/seite
  praes: number;      // präsentations-slides · 75 €/slide
  social: number;     // social visuals · 75 €/stück
  signatur: number;   // e-mail-signatur · 75 € erste · +25 € weitere
  vk: number;         // visitenkarte · 75 € erste · +25 € weitere

  /* ─── autobeschriftung ─── */
  autoWrap: boolean;  // section-toggle
  autoLR: number;     // gestaltung L+R · 150 €/auto
  autoVH: number;     // +V+H · 75 €/auto
  montage: number;    // montage · 150 €/auto

  /* ─── extras ─── */
  content: ContentHelp;
  deadline: Deadline;

  /* ─── hosting (nur relevant wenn web=true) ─── */
  /**
   * true  = user hat bereits eine domain (kein extra).
   * false = laconis registriert mit (+2 €/Mt · kann je nach domain variieren).
   */
  hasDomain: boolean;
  mails: number;
};

export const DEFAULT_STATE: BuilderState = {
  web: true,
  unterseiten: 0,
  cms: 0,
  sprachen: 1,
  shop: false,

  branding: false,

  grafik: false,
  flyer1: 0,
  flyer2: 0,
  plakat: 0,
  rollup: 0,
  broschuere: 0,
  praes: 0,
  social: 0,
  signatur: 0,
  vk: 0,

  autoWrap: false,
  autoLR: 0,
  autoVH: 0,
  montage: 0,

  content: "selbst",
  deadline: "normal",

  hasDomain: false, // default = laconis registriert (+2 €/Mt)
  mails: 1,
};

/* ══════════════════════════ preis-konstanten ══════════════════════════ */

const WEB_BASE = 1400;
const PRICE_UNTERSEITE = 300;
const PRICE_CMS_BEREICH = 500;
const PRICE_SPRACHE_PER_PAGE = 50;
const PRICE_SHOP = 1800;

const PRICE_BRANDING = 1200;

const PRICE_FLYER_1 = 200;
const PRICE_FLYER_2 = 300;
const PRICE_PLAKAT = 200;
const PRICE_ROLLUP = 200;
const PRICE_BROSCHUERE_SEITE = 75;
const PRICE_PRAES_SLIDE = 75;
const PRICE_SOCIAL_VISUAL = 75;
const PRICE_SIGNATUR_FIRST = 75;
const PRICE_SIGNATUR_NEXT = 25;
const PRICE_VK_FIRST = 75;
const PRICE_VK_NEXT = 25;

const PRICE_AUTO_LR = 150;
const PRICE_AUTO_VH = 75;
const PRICE_MONTAGE = 150;

const PRICE_CONTENT_HELP = 450;
const PRICE_CONTENT_KOMPLETT = 1200;
const PRICE_DEADLINE_DRINGEND_PCT = 0.25;

const HOSTING_ONEPAGER_MONTHLY = 20;
const HOSTING_MULTIPAGER_MONTHLY = 30;
const HOSTING_CMS_MONTHLY = 40;
const PRICE_DOMAIN_MONTHLY = 2;
const PRICE_MAIL_MONTHLY = 5;

const BUNDLE_DISCOUNT_PCT = 0.1;

/* ══════════════════════════ presets ══════════════════════════ */

export type PresetId = "basis" | "standard" | "pro";

type PresetShape = Pick<
  BuilderState,
  "web" | "unterseiten" | "cms" | "sprachen" | "hasDomain" | "mails"
>;

export const PRESETS: Record<PresetId, PresetShape> = {
  basis: {
    web: true,
    unterseiten: 0,
    cms: 0,
    sprachen: 1,
    hasDomain: false, // laconis registriert mit (+2 €/Mt)
    mails: 1,
  },
  standard: {
    web: true,
    unterseiten: 3,
    cms: 1,
    sprachen: 1,
    hasDomain: false,
    mails: 2,
  },
  pro: {
    web: true,
    unterseiten: 5,
    cms: 2,
    sprachen: 2,
    hasDomain: false,
    mails: 3,
  },
};

export function applyPreset(state: BuilderState, id: PresetId): BuilderState {
  return { ...state, ...PRESETS[id] };
}

/* ══════════════════════════ helpers: gruppen-checker ══════════════════════════ */

export function hasAnyGrafikItem(state: BuilderState): boolean {
  return (
    state.flyer1 +
      state.flyer2 +
      state.plakat +
      state.rollup +
      state.broschuere +
      state.praes +
      state.social +
      state.signatur +
      state.vk >
    0
  );
}

export function hasAnyAutoItem(state: BuilderState): boolean {
  return state.autoLR + state.autoVH + state.montage > 0;
}

/** zählt alles, was visuell/identitäts-arbeit ist. */
export function hasAnyGrafikOrBranding(state: BuilderState): boolean {
  return (
    state.branding ||
    (state.grafik && hasAnyGrafikItem(state)) ||
    (state.autoWrap && hasAnyAutoItem(state))
  );
}

/* ══════════════════════════ preis-positionen ══════════════════════════ */

export type LineItem = {
  label: string;
  hint?: string;
  amount: number;
  monthly?: boolean;
  discount?: boolean;
};

/* ══════════════════════════ zeilen-generator ══════════════════════════ */

export function generateLineItems(state: BuilderState): LineItem[] {
  const items: LineItem[] = [];

  /* ───── web-block ───── */
  if (state.web) {
    items.push({
      label: "website · basis",
      hint: "design, entwicklung, setup, launch",
      amount: WEB_BASE,
    });

    if (state.unterseiten > 0) {
      items.push({
        label: `+ ${state.unterseiten} unterseite${state.unterseiten > 1 ? "n" : ""}`,
        hint: `je ${PRICE_UNTERSEITE} €`,
        amount: PRICE_UNTERSEITE * state.unterseiten,
      });
    }

    if (state.cms > 0) {
      items.push({
        label: `+ ${state.cms} cms-bereich${state.cms > 1 ? "e" : ""}`,
        hint: `je ${PRICE_CMS_BEREICH} € · selbst pflegbar`,
        amount: PRICE_CMS_BEREICH * state.cms,
      });
    }

    if (state.sprachen > 1) {
      const extraSprachen = state.sprachen - 1;
      const seitenGesamt = 1 + state.unterseiten;
      const sprachenKosten =
        seitenGesamt * extraSprachen * PRICE_SPRACHE_PER_PAGE;
      items.push({
        label: `+ ${extraSprachen} sprache${extraSprachen > 1 ? "n" : ""}`,
        hint: `${seitenGesamt} seite${seitenGesamt > 1 ? "n" : ""} × ${extraSprachen} × ${PRICE_SPRACHE_PER_PAGE} €`,
        amount: sprachenKosten,
      });
    }

    if (state.shop) {
      items.push({
        label: "+ shop / buchung",
        hint: "onlineshop oder termin-system",
        amount: PRICE_SHOP,
      });
    }
  }

  /* ───── branding-block (pauschal) ───── */
  if (state.branding) {
    items.push({
      label: "branding-paket",
      hint: "logo, brand guide, vk, briefpapier, 3 social-templates",
      amount: PRICE_BRANDING,
    });
  }

  /* ───── grafik-block (nur wenn section aktiv) ───── */
  if (state.grafik) {
    if (state.flyer1 > 0) {
      items.push({
        label: `flyer einseitig · ${state.flyer1}×`,
        hint: `je ${PRICE_FLYER_1} €`,
        amount: PRICE_FLYER_1 * state.flyer1,
      });
    }
    if (state.flyer2 > 0) {
      items.push({
        label: `flyer beidseitig · ${state.flyer2}×`,
        hint: `je ${PRICE_FLYER_2} €`,
        amount: PRICE_FLYER_2 * state.flyer2,
      });
    }
    if (state.plakat > 0) {
      items.push({
        label: `plakat · ${state.plakat}×`,
        hint: `je ${PRICE_PLAKAT} € · alle formate`,
        amount: PRICE_PLAKAT * state.plakat,
      });
    }
    if (state.rollup > 0) {
      items.push({
        label: `rollup · ${state.rollup}×`,
        hint: `je ${PRICE_ROLLUP} €`,
        amount: PRICE_ROLLUP * state.rollup,
      });
    }
    if (state.broschuere > 0) {
      items.push({
        label: `broschüre · ${state.broschuere} seite${state.broschuere > 1 ? "n" : ""}`,
        hint: `je ${PRICE_BROSCHUERE_SEITE} €/seite`,
        amount: PRICE_BROSCHUERE_SEITE * state.broschuere,
      });
    }
    if (state.praes > 0) {
      items.push({
        label: `präsentation · ${state.praes} slide${state.praes > 1 ? "s" : ""}`,
        hint: `je ${PRICE_PRAES_SLIDE} €/slide`,
        amount: PRICE_PRAES_SLIDE * state.praes,
      });
    }
    if (state.social > 0) {
      items.push({
        label: `social visual · ${state.social}×`,
        hint: `je ${PRICE_SOCIAL_VISUAL} €`,
        amount: PRICE_SOCIAL_VISUAL * state.social,
      });
    }
    if (state.signatur > 0) {
      const amount =
        PRICE_SIGNATUR_FIRST +
        Math.max(0, state.signatur - 1) * PRICE_SIGNATUR_NEXT;
      items.push({
        label: `e-mail-signatur · ${state.signatur}×`,
        hint:
          state.signatur > 1
            ? `${PRICE_SIGNATUR_FIRST} € + ${state.signatur - 1} × ${PRICE_SIGNATUR_NEXT} €`
            : `${PRICE_SIGNATUR_FIRST} €`,
        amount,
      });
    }
    if (state.vk > 0) {
      const amount =
        PRICE_VK_FIRST + Math.max(0, state.vk - 1) * PRICE_VK_NEXT;
      items.push({
        label: `visitenkarte · ${state.vk}×`,
        hint:
          state.vk > 1
            ? `${PRICE_VK_FIRST} € + ${state.vk - 1} × ${PRICE_VK_NEXT} €`
            : `${PRICE_VK_FIRST} €`,
        amount,
      });
    }
  }

  /* ───── autobeschriftung (nur wenn section aktiv) ───── */
  if (state.autoWrap) {
    if (state.autoLR > 0) {
      items.push({
        label: `auto · L+R · ${state.autoLR}×`,
        hint: `je ${PRICE_AUTO_LR} €/auto`,
        amount: PRICE_AUTO_LR * state.autoLR,
      });
    }
    if (state.autoVH > 0) {
      items.push({
        label: `auto · +V+H · ${state.autoVH}×`,
        hint: `je ${PRICE_AUTO_VH} €/auto · zusatz-seiten`,
        amount: PRICE_AUTO_VH * state.autoVH,
      });
    }
    if (state.montage > 0) {
      items.push({
        label: `montage · ${state.montage}×`,
        hint: `je ${PRICE_MONTAGE} €/auto`,
        amount: PRICE_MONTAGE * state.montage,
      });
    }
  }

  /* ───── extras · content ───── */
  if (state.content === "mit-hilfe") {
    items.push({
      label: "+ content-hilfe",
      hint: "ich schreibe mit, du lieferst rohstoff",
      amount: PRICE_CONTENT_HELP,
    });
  } else if (state.content === "komplett") {
    items.push({
      label: "+ content komplett",
      hint: "texte + foto-shooting begleitung",
      amount: PRICE_CONTENT_KOMPLETT,
    });
  }

  /* ───── rabatte · bundle (web + visuelles zusammen) ───── */
  const hasVisuals = hasAnyGrafikOrBranding(state);
  if (state.web && hasVisuals) {
    const fixSum = items
      .filter((i) => !i.monthly)
      .reduce((a, b) => a + b.amount, 0);
    const discount = Math.round(fixSum * BUNDLE_DISCOUNT_PCT);
    if (discount > 0) {
      items.push({
        label: "bundle-rabatt",
        hint: "web + grafik/branding zusammen · 10% runter",
        amount: -discount,
        discount: true,
      });
    }
  }

  /* ───── dringend-aufschlag ───── */
  if (state.deadline === "dringend") {
    const fixSum = items
      .filter((i) => !i.monthly)
      .reduce((a, b) => a + b.amount, 0);
    const surcharge = Math.round(fixSum * PRICE_DEADLINE_DRINGEND_PCT);
    if (surcharge > 0) {
      items.push({
        label: "dringend-aufschlag",
        hint: "vorziehen in die queue · +25%",
        amount: surcharge,
      });
    }
  }

  /* ───── laufende posten (hosting) — nur wenn web aktiv ───── */
  if (state.web) {
    const hostingMonthly =
      state.cms > 0
        ? HOSTING_CMS_MONTHLY
        : state.unterseiten > 0
        ? HOSTING_MULTIPAGER_MONTHLY
        : HOSTING_ONEPAGER_MONTHLY;

    const hostingLabel =
      state.cms > 0
        ? "hosting · cms"
        : state.unterseiten > 0
        ? "hosting · multipager"
        : "hosting · onepager";

    items.push({
      label: hostingLabel,
      hint: "ssl, backups, monitoring",
      amount: hostingMonthly,
      monthly: true,
    });

    // domain nur dann, wenn USER KEINE HAT (hasDomain=false → laconis registriert)
    if (!state.hasDomain) {
      items.push({
        label: "+ domain",
        hint: ".be / .de / .com · je nach domain variabel",
        amount: PRICE_DOMAIN_MONTHLY,
        monthly: true,
      });
    }

    if (state.mails > 0) {
      items.push({
        label: `+ ${state.mails} mail-postfach${state.mails > 1 ? "er" : ""}`,
        hint: "du@deinedomain.be",
        amount: PRICE_MAIL_MONTHLY * state.mails,
        monthly: true,
      });
    }
  }

  return items;
}

/* ══════════════════════════ summen ══════════════════════════ */

export type Totals = {
  oneTime: number;
  monthly: number;
};

export function computeTotals(items: LineItem[]): Totals {
  let oneTime = 0;
  let monthly = 0;
  for (const i of items) {
    if (i.monthly) monthly += i.amount;
    else oneTime += i.amount;
  }
  return { oneTime: Math.max(0, oneTime), monthly: Math.max(0, monthly) };
}

/* ══════════════════════════ hilfs-getter ══════════════════════════ */

export function hasAnySelection(state: BuilderState): boolean {
  return (
    state.web ||
    state.branding ||
    (state.grafik && hasAnyGrafikItem(state)) ||
    (state.autoWrap && hasAnyAutoItem(state))
  );
}

/** Für's "das entspricht etwa paket X"-hint. Vergleicht fix-summe grob. */
export function closestPaket(
  state: BuilderState,
  totals: Totals
): string | null {
  if (!hasAnySelection(state)) return null;
  const hasVisuals = hasAnyGrafikOrBranding(state);
  const both = state.web && hasVisuals;

  if (both) {
    if (totals.oneTime <= 2800) return "bundle · launch (2.340 €)";
    if (totals.oneTime <= 4200) return "bundle · grow (3.600 €)";
    return "bundle · full identity (5.400 €)";
  }

  if (state.web) {
    if (totals.oneTime <= 1800) return "web · basis (1.400 €)";
    if (totals.oneTime <= 3400) return "web · standard (2.800 €)";
    return "web · pro (4.200 €)";
  }

  if (state.branding) return "grafik · brand identity (1.200 €)";
  if (hasVisuals) return "grafik · einzelposten";

  return null;
}

/** welcher preset matcht den aktuellen state exakt (für highlight im builder)? */
export function matchingPreset(state: BuilderState): PresetId | null {
  for (const id of Object.keys(PRESETS) as PresetId[]) {
    const p = PRESETS[id];
    if (
      state.web === p.web &&
      state.unterseiten === p.unterseiten &&
      state.cms === p.cms &&
      state.sprachen === p.sprachen &&
      state.hasDomain === p.hasDomain &&
      state.mails === p.mails
    ) {
      return id;
    }
  }
  return null;
}

/* ══════════════════════════ URL-serialisierung ══════════════════════════
 *
 * keys:
 *   web=0      → web aus
 *   u=N        → unterseiten
 *   cms=N      → cms-bereiche
 *   lang=N     → sprachen
 *   shop=1     → shop an
 *   br=1       → branding-paket
 *   gr=1       → grafik-section aktiv
 *   f1/f2/pl/ru/bs/pr/so/sg/vk → grafik-counters
 *   aw=1       → auto-wrap section aktiv
 *   alr/avh/mn → auto-counters
 *   content    → mit-hilfe|komplett
 *   dl         → flex|dringend
 *   domain=1   → user hat eigene domain
 *   mails=N    → mail-postfächer
 */

type NumKey =
  | "u"
  | "cms"
  | "lang"
  | "f1"
  | "f2"
  | "pl"
  | "ru"
  | "bs"
  | "pr"
  | "so"
  | "sg"
  | "vk"
  | "alr"
  | "avh"
  | "mn"
  | "mails";

const NUM_MAP: Record<NumKey, keyof BuilderState> = {
  u: "unterseiten",
  cms: "cms",
  lang: "sprachen",
  f1: "flyer1",
  f2: "flyer2",
  pl: "plakat",
  ru: "rollup",
  bs: "broschuere",
  pr: "praes",
  so: "social",
  sg: "signatur",
  vk: "vk",
  alr: "autoLR",
  avh: "autoVH",
  mn: "montage",
  mails: "mails",
};

export function stateToParams(state: BuilderState): URLSearchParams {
  const p = new URLSearchParams();
  if (!state.web) p.set("web", "0");
  if (state.shop) p.set("shop", "1");
  if (state.branding) p.set("br", "1");
  if (state.grafik) p.set("gr", "1");
  if (state.autoWrap) p.set("aw", "1");

  // numerics: alle ausser default
  (Object.keys(NUM_MAP) as NumKey[]).forEach((key) => {
    const field = NUM_MAP[key];
    const v = state[field] as number;
    const d = DEFAULT_STATE[field] as number;
    if (v !== d) p.set(key, String(v));
  });

  if (state.content !== DEFAULT_STATE.content) p.set("content", state.content);
  if (state.deadline !== DEFAULT_STATE.deadline) p.set("dl", state.deadline);
  if (state.hasDomain !== DEFAULT_STATE.hasDomain)
    p.set("domain", state.hasDomain ? "1" : "0");

  return p;
}

function readNum(
  params: URLSearchParams,
  key: string,
  min: number,
  max: number
): number | null {
  const raw = params.get(key);
  if (raw === null) return null;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < min || n > max) return null;
  return n;
}

export function paramsToState(params: URLSearchParams): BuilderState {
  const s: BuilderState = { ...DEFAULT_STATE };

  if (params.get("web") === "0") s.web = false;
  if (params.get("shop") === "1") s.shop = true;
  if (params.get("br") === "1") s.branding = true;
  if (params.get("gr") === "1") s.grafik = true;
  if (params.get("aw") === "1") s.autoWrap = true;

  const u = readNum(params, "u", 0, 50);
  if (u !== null) s.unterseiten = u;
  const cms = readNum(params, "cms", 0, 20);
  if (cms !== null) s.cms = cms;
  const lang = readNum(params, "lang", 1, 6);
  if (lang !== null) s.sprachen = lang;

  const grafikKeys: [string, keyof BuilderState, number][] = [
    ["f1", "flyer1", 50],
    ["f2", "flyer2", 50],
    ["pl", "plakat", 50],
    ["ru", "rollup", 50],
    ["bs", "broschuere", 200],
    ["pr", "praes", 200],
    ["so", "social", 100],
    ["sg", "signatur", 50],
    ["vk", "vk", 50],
    ["alr", "autoLR", 50],
    ["avh", "autoVH", 50],
    ["mn", "montage", 50],
    ["mails", "mails", 20],
  ];
  for (const [key, field, max] of grafikKeys) {
    const v = readNum(params, key, 0, max);
    if (v !== null) (s[field] as number) = v;
  }

  const c = params.get("content");
  if (c === "mit-hilfe" || c === "komplett") s.content = c;
  const dl = params.get("dl");
  if (dl === "flex" || dl === "dringend") s.deadline = dl;

  const domain = params.get("domain");
  if (domain === "0") s.hasDomain = false;
  if (domain === "1") s.hasDomain = true;

  return s;
}

/* ══════════════════════════ formatierung ══════════════════════════ */

export function formatEUR(n: number): string {
  return n.toLocaleString("de-DE");
}

export function generateBonNumber(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${date}-${rand}`;
}
