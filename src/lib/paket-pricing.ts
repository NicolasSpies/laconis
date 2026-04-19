/**
 * paket-pricing — reine funktionen für den "bau dein paket"-konfigurator.
 *
 * ALLE preise in EUR, netto. Änderungen hier wirken global.
 * Einheitliche kommentierung: "+X €" = einmalig, "+X €/Mt" = laufend.
 */

/* ══════════════════════════ state-modell ══════════════════════════ */

export type WebScope = "onepager" | "small" | "medium" | "large";
export type SeitenSprachen = 1 | 2 | 3;
export type ContentHelp = "selbst" | "mit-hilfe" | "komplett";
export type Deadline = "flex" | "normal" | "dringend";

export type CmsBereich = "blog" | "team" | "projekte" | "termine" | "katalog";

export type BuilderState = {
  /* web-block */
  web: boolean;
  webScope: WebScope;
  sprachen: SeitenSprachen;
  cmsBereiche: CmsBereich[];
  shop: boolean;

  /* grafik-block */
  grafikPrint: boolean;
  grafikBrand: boolean;
  grafikSocial: boolean;

  /* extras */
  content: ContentHelp;
  deadline: Deadline;

  /* hosting (nur relevant wenn web=true) */
  hasDomain: boolean;
  mails: number;
};

export const DEFAULT_STATE: BuilderState = {
  web: true,
  webScope: "small",
  sprachen: 1,
  cmsBereiche: [],
  shop: false,
  grafikPrint: false,
  grafikBrand: false,
  grafikSocial: false,
  content: "selbst",
  deadline: "normal",
  hasDomain: false,
  mails: 0,
};

/* ══════════════════════════ preis-positionen ══════════════════════════ */

export type LineItem = {
  /** kurze label-zeile */
  label: string;
  /** optionale sub-info, erscheint in klein drunter */
  hint?: string;
  /** in euro, einmalig */
  amount: number;
  /** ist laufender posten (€/mt) statt einmalig */
  monthly?: boolean;
  /** negativer betrag = rabatt-zeile */
  discount?: boolean;
};

/* ─────── web-basis preise ─────── */
const WEB_SCOPE_PRICE: Record<WebScope, { price: number; label: string; note: string }> = {
  onepager: { price: 1290, label: "web · onepager", note: "eine seite, alles drauf" },
  small:    { price: 1990, label: "web · klein",    note: "bis 5 unterseiten" },
  medium:   { price: 2890, label: "web · mittel",   note: "bis 10 unterseiten" },
  large:    { price: 3900, label: "web · gross",    note: "10+ unterseiten" },
};

const PRICE_EXTRA_SPRACHE = 400;   // pro zusätzliche sprache (über die erste)
const PRICE_CMS_BEREICH = 350;     // pro cms-bereich
const PRICE_SHOP = 1800;           // shop/buchung addon
const PRICE_GRAFIK_PRINT = 700;
const PRICE_GRAFIK_BRAND = 1200;
const PRICE_GRAFIK_SOCIAL = 600;
const PRICE_CONTENT_HELP = 450;    // mit-hilfe
const PRICE_CONTENT_KOMPLETT = 1200; // komplett schreiben/shooting
const PRICE_DEADLINE_DRINGEND_PCT = 0.20; // +20 % auf fix-summe

const HOSTING_BASE_MONTHLY = 20;
const PRICE_DOMAIN_MONTHLY = 2;
const PRICE_MAIL_MONTHLY = 5;

const BUNDLE_DISCOUNT_PCT = 0.10;  // -10 % wenn web + mind. 1 grafik aktiv

const CMS_LABEL: Record<CmsBereich, string> = {
  blog: "blog",
  team: "team-seiten",
  projekte: "projekte-showcase",
  termine: "termine / events",
  katalog: "katalog",
};

/* ══════════════════════════ zeilen-generator ══════════════════════════ */

export function generateLineItems(state: BuilderState): LineItem[] {
  const items: LineItem[] = [];

  /* ───── web-block ───── */
  if (state.web) {
    const scope = WEB_SCOPE_PRICE[state.webScope];
    items.push({
      label: scope.label,
      hint: scope.note,
      amount: scope.price,
    });

    if (state.sprachen > 1) {
      const extra = state.sprachen - 1;
      items.push({
        label: `+ ${extra} sprache${extra > 1 ? "n" : ""}`,
        hint: `insgesamt ${state.sprachen} sprachen`,
        amount: PRICE_EXTRA_SPRACHE * extra,
      });
    }

    state.cmsBereiche.forEach((b) => {
      items.push({
        label: `+ cms: ${CMS_LABEL[b]}`,
        hint: "selbst pflegbar",
        amount: PRICE_CMS_BEREICH,
      });
    });

    if (state.shop) {
      items.push({
        label: "+ shop / buchung",
        hint: "onlineshop oder termin-system",
        amount: PRICE_SHOP,
      });
    }
  }

  /* ───── grafik-block ───── */
  if (state.grafikPrint) {
    items.push({
      label: "grafik · print",
      hint: "flyer, visitenkarten, menüs …",
      amount: PRICE_GRAFIK_PRINT,
    });
  }
  if (state.grafikBrand) {
    items.push({
      label: "grafik · brand identity",
      hint: "logo, farben, schrift, basics",
      amount: PRICE_GRAFIK_BRAND,
    });
  }
  if (state.grafikSocial) {
    items.push({
      label: "grafik · social",
      hint: "instagram- & story-templates",
      amount: PRICE_GRAFIK_SOCIAL,
    });
  }

  /* ───── extras ───── */
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

  /* ───── rabatte ───── */
  const hasGrafik = state.grafikPrint || state.grafikBrand || state.grafikSocial;
  if (state.web && hasGrafik) {
    const fixSum = items
      .filter((i) => !i.monthly)
      .reduce((a, b) => a + b.amount, 0);
    const discount = Math.round(fixSum * BUNDLE_DISCOUNT_PCT);
    items.push({
      label: "bundle-rabatt",
      hint: "web + grafik zusammen · 10 % runter",
      amount: -discount,
      discount: true,
    });
  }

  /* ───── dringend-aufschlag ───── */
  if (state.deadline === "dringend") {
    const fixSum = items
      .filter((i) => !i.monthly)
      .reduce((a, b) => a + b.amount, 0);
    const surcharge = Math.round(fixSum * PRICE_DEADLINE_DRINGEND_PCT);
    if (surcharge > 0) {
      items.push({
        label: "eil-aufschlag",
        hint: "next-week-urgent · +20 %",
        amount: surcharge,
      });
    }
  }

  /* ───── laufende posten (hosting) — nur wenn web aktiv ───── */
  if (state.web) {
    items.push({
      label: "hosting",
      hint: "ssl, backups, monitoring",
      amount: HOSTING_BASE_MONTHLY,
      monthly: true,
    });
    if (state.hasDomain) {
      items.push({
        label: "+ domain",
        hint: ".be / .de / .com",
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
    state.grafikPrint ||
    state.grafikBrand ||
    state.grafikSocial
  );
}

/** Für's "das entspricht etwa paket X"-hint. Vergleicht fix-summe grob. */
export function closestPaket(state: BuilderState, totals: Totals): string | null {
  if (!hasAnySelection(state)) return null;
  const hasGrafik =
    state.grafikPrint || state.grafikBrand || state.grafikSocial;
  const both = state.web && hasGrafik;

  // bundle-empfehlung
  if (both) {
    if (totals.oneTime <= 3200) return "bundle · launch (2.990 €)";
    if (totals.oneTime <= 4200) return "bundle · grow (3.890 €)";
    return "bundle · full identity (5.500 €)";
  }

  if (state.web) {
    if (totals.oneTime <= 2200) return "web · starter (1.990 €)";
    if (totals.oneTime <= 3100) return "web · standard (2.890 €)";
    return "web · pro (3.650 €)";
  }

  if (hasGrafik) {
    if (state.grafikBrand) return "grafik · brand identity (1.200 €)";
    if (state.grafikPrint) return "grafik · print (700 €)";
    return "grafik · social (600 €)";
  }

  return null;
}

/* ══════════════════════════ URL-serialisierung ══════════════════════════ */

/**
 * builder-state → URLSearchParams (stringifiziert).
 * nur abweichungen vom default werden geschrieben — hält die URL kurz.
 */
export function stateToParams(state: BuilderState): URLSearchParams {
  const p = new URLSearchParams();
  if (!state.web) p.set("web", "0");
  if (state.web && state.webScope !== DEFAULT_STATE.webScope)
    p.set("scope", state.webScope);
  if (state.sprachen !== 1) p.set("lang", String(state.sprachen));
  if (state.cmsBereiche.length > 0)
    p.set("cms", state.cmsBereiche.join(","));
  if (state.shop) p.set("shop", "1");
  if (state.grafikPrint) p.set("gp", "1");
  if (state.grafikBrand) p.set("gb", "1");
  if (state.grafikSocial) p.set("gs", "1");
  if (state.content !== "selbst") p.set("content", state.content);
  if (state.deadline !== "normal") p.set("dl", state.deadline);
  if (state.hasDomain) p.set("domain", "1");
  if (state.mails > 0) p.set("mails", String(state.mails));
  return p;
}

/** sichere umkehr: unbekannte / ungültige werte werden ignoriert. */
export function paramsToState(params: URLSearchParams): BuilderState {
  const s: BuilderState = { ...DEFAULT_STATE };

  if (params.get("web") === "0") s.web = false;

  const scope = params.get("scope");
  if (scope === "onepager" || scope === "small" || scope === "medium" || scope === "large")
    s.webScope = scope;

  const lang = parseInt(params.get("lang") ?? "", 10);
  if (lang === 1 || lang === 2 || lang === 3) s.sprachen = lang;

  const cms = params.get("cms");
  if (cms) {
    const parts = cms.split(",").filter((p): p is CmsBereich =>
      ["blog", "team", "projekte", "termine", "katalog"].includes(p)
    );
    s.cmsBereiche = parts;
  }

  if (params.get("shop") === "1") s.shop = true;
  if (params.get("gp") === "1") s.grafikPrint = true;
  if (params.get("gb") === "1") s.grafikBrand = true;
  if (params.get("gs") === "1") s.grafikSocial = true;

  const c = params.get("content");
  if (c === "mit-hilfe" || c === "komplett") s.content = c;

  const dl = params.get("dl");
  if (dl === "flex" || dl === "dringend") s.deadline = dl;

  if (params.get("domain") === "1") s.hasDomain = true;

  const mails = parseInt(params.get("mails") ?? "0", 10);
  if (!Number.isNaN(mails) && mails >= 0 && mails <= 20) s.mails = mails;

  return s;
}

/* ══════════════════════════ formatierung ══════════════════════════ */

export function formatEUR(n: number): string {
  return n.toLocaleString("de-DE");
}

/** kassenzettel-serialnummer. deterministisch aus timestamp + zufall, kurz. */
export function generateBonNumber(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${date}-${rand}`;
}
