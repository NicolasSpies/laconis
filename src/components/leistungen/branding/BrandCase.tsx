"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type Dict = {
  sectionLabel: string;
  quotePre: string;
  quoteMid: string;
  notizLabel: string;
  notizSub: string;
  marginNote: string;
  brandLabel: string;
  brandMeta: string;
  caseCta: string;
  story: string;
  handNote: string;
  paketLabel: string;
  paketItems: string[];
  brandSheetNum: string;
  brandSheetStudio: string;
  farbwelt: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "ein echtes projekt",
    quotePre: "violett war am ersten tag klar.",
    quoteMid: "alles andere kam dazu.",
    notizLabel: "notiz · tag 1",
    notizSub: "· holoroom",
    marginNote: "echt ↙",
    brandLabel: "holoroom",
    brandMeta: "logo · mini brand guide · 2025",
    caseCta: "case ansehen →",
    story: "holoroom ist ein junges studio für immersive räume. beim ersten gespräch stand das violett · nicht als mode, sondern weil es der sache entsprach. alles drumherum · wordmark, monogramm, farbwelt, mini-guide · ist darauf aufgebaut.",
    handNote: "zwei wochen. ↗",
    paketLabel: "was im paket war",
    paketItems: ["wordmark + monogramm", "brand guide · pdf", "farbpalette · 5 werte", "favicon + social-tiles"],
    brandSheetNum: "№ 02 · brand",
    brandSheetStudio: "studio · 2025",
    farbwelt: "farbwelt",
  },
  fr: {
    sectionLabel: "un vrai projet",
    quotePre: "le violet était évident dès le premier jour.",
    quoteMid: "tout le reste s'est ajouté.",
    notizLabel: "note · jour 1",
    notizSub: "· holoroom",
    marginNote: "vrai ↙",
    brandLabel: "holoroom",
    brandMeta: "logo · mini brand guide · 2025",
    caseCta: "voir le case →",
    story: "holoroom est un jeune studio dédié aux espaces immersifs. au premier échange, le violet s'est imposé · pas par mode, mais parce que ça collait à la chose. tout le reste · wordmark, monogramme, couleurs, mini-guide · est bâti là-dessus.",
    handNote: "deux semaines. ↗",
    paketLabel: "ce qu'il y avait dans le pack",
    paketItems: ["wordmark + monogramme", "brand guide · pdf", "palette · 5 valeurs", "favicon + tuiles social"],
    brandSheetNum: "№ 02 · brand",
    brandSheetStudio: "studio · 2025",
    farbwelt: "couleurs",
  },
  en: {
    sectionLabel: "a real project",
    quotePre: "purple was clear on day one.",
    quoteMid: "everything else came along.",
    notizLabel: "note · day 1",
    notizSub: "· holoroom",
    marginNote: "real ↙",
    brandLabel: "holoroom",
    brandMeta: "logo · mini brand guide · 2025",
    caseCta: "see the case →",
    story: "holoroom is a young studio for immersive spaces. on the first call, purple was just there · not as a trend, but because it fit the thing itself. everything around it · wordmark, monogram, colour world, mini guide · is built on that.",
    handNote: "two weeks. ↗",
    paketLabel: "what was in the pack",
    paketItems: ["wordmark + monogram", "brand guide · pdf", "palette · 5 values", "favicon + social tiles"],
    brandSheetNum: "№ 02 · brand",
    brandSheetStudio: "studio · 2025",
    farbwelt: "colour world",
  },
};

function HoloroomBrandSheet({ t }: { t: Dict }) {
  return (
    <div
      className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-ink/10"
      style={{ background: "#0a0a0a", containerType: "inline-size" }}
      aria-hidden
    >
      <div className="absolute inset-0 flex">
        <div
          className="relative h-full"
          style={{
            flexBasis: "60%",
            flexShrink: 0,
            background:
              "linear-gradient(135deg, #3e2570 0%, #5e3aa5 32%, #7a4bd1 66%, #9a68ed 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.22) 0%, transparent 40%), radial-gradient(circle at 82% 85%, rgba(0,0,0,0.25) 0%, transparent 45%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-offwhite leading-none"
              style={{
                fontSize: "min(10cqw, 68px)",
                letterSpacing: "-0.015em",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              holoroom
            </span>
          </div>
          <span
            className="absolute font-mono uppercase tracking-label text-offwhite/65"
            style={{ top: "6%", left: "6%", fontSize: "min(1.4cqw, 10px)" }}
          >
            {t.brandSheetNum}
          </span>
          <span
            className="absolute font-mono uppercase tracking-label text-offwhite/65"
            style={{ bottom: "6%", right: "6%", fontSize: "min(1.4cqw, 10px)" }}
          >
            {t.brandSheetStudio}
          </span>
        </div>

        <div
          className="flex-1 relative flex flex-col bg-[#0e0e0e] min-w-0"
          style={{ padding: "5%" }}
        >
          <div
            className="font-serif text-offwhite leading-none"
            style={{ fontSize: "min(11cqw, 72px)" }}
          >
            H.
          </div>

          <div style={{ marginTop: "auto" }}>
            <p
              className="font-mono uppercase tracking-label text-offwhite/55"
              style={{ fontSize: "min(1.4cqw, 10px)", marginBottom: "6%" }}
            >
              {t.farbwelt}
            </p>
            <div className="flex" style={{ gap: "3%" }}>
              {["#3e2570", "#5e3aa5", "#7a4bd1", "#9a68ed", "#e4dff0"].map((c, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: "17%",
                    aspectRatio: "1",
                    background: c,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandCase({ num = "05" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>

        <div className="mt-10 max-w-[820px]">
          <blockquote className="relative">
            <span
              aria-hidden
              className="absolute -top-4 -left-2 font-serif text-[80px] leading-none text-accent-ink/20 select-none pointer-events-none"
            >
              „
            </span>
            <p className="relative heading-display text-[clamp(1.6rem,3.8vw,2.8rem)] text-offwhite leading-[1.1] pl-6">
              {t.quotePre}{" "}
              <span className="text-offwhite/45">
                {t.quoteMid}
              </span>
            </p>
            <footer className="mt-6 pl-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-ink/40" />
              <div>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  {t.notizLabel}
                </span>
                <span className="font-mono text-[11px] text-offwhite/25 ml-2">
                  {t.notizSub}
                </span>
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <div className="relative glass rounded-2xl p-5 md:p-6">
            <span
              aria-hidden
              className="absolute -top-2.5 left-6 z-10 h-5 w-14 shadow-md"
              style={{
                background: "rgb(225 253 82 / 0.78)",
                transform: "rotate(-4deg)",
                boxShadow: "0 3px 8px -2px rgba(0,0,0,0.35)",
              }}
            />
            <span
              aria-hidden
              className="absolute -top-3 right-7 z-10 font-hand text-[15px] text-accent-ink/70"
              style={{ transform: "rotate(2deg)" }}
            >
              {t.marginNote}
            </span>
            <HoloroomBrandSheet t={t} />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="heading-sans text-[17px] text-offwhite">
                  {t.brandLabel}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.brandMeta}
                </p>
              </div>
              <Link
                href={`${buildPath("referenzen", locale)}/holoroom`}
                className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors shrink-0"
              >
                {t.caseCta}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="glass rounded-2xl p-6">
              <p className="text-[14px] leading-relaxed text-offwhite/65">
                {t.story}
              </p>
              <p
                className="mt-4 font-hand text-[18px] text-accent-ink"
                style={{ transform: "rotate(-1deg)" }}
              >
                {t.handNote}
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-4">
                {t.paketLabel}
              </p>
              <ul className="space-y-3 text-[13px] text-offwhite/75">
                {t.paketItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="font-mono text-lime mt-0.5 leading-tight shrink-0"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
