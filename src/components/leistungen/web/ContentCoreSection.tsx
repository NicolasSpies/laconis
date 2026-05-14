"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  DashboardMock,
  EditorMock,
  StatsMock,
} from "@/components/leistungen/web/ContentCoreMocks";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  italic: string;
  body: string;
  dashboardLabel: string;
  editorLabel: string;
  statsLabel: string;
  features: string[];
  footerPre: string;
  footerLink: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "contentcore",
    h2pre: "mein eigenes CMS. ",
    h2post: "ich hab's contentcore getauft.",
    italic: "Damit du deine Seite führst, nicht umgekehrt.",
    body: "Kein WordPress. Kein Plugin-Chaos. Ein System, das ich für dich baue und pflege, damit du Texte, Bilder und Seiten selbst änderst, ohne Angst etwas kaputt zu machen. Mit kleinen Tipps direkt im Editor, falls du nicht weiterweißt.",
    dashboardLabel: "dashboard · live-ansicht",
    editorLabel: "editor",
    statsLabel: "stats ohne cookies",
    features: ["Texte live bearbeiten", "Bilder hochladen", "Vorschau vor Freigabe", "Deutsch · Français · English", "Versionsverlauf", "Keine Cookies"],
    footerPre: "Alles Technische dahinter (Sicherheit, KI-Bilderkennung, Shop, Newsletter, Mehrsprachigkeit) liegt auf einer eigenen Seite · ",
    footerLink: "technik-details →",
  },
  fr: {
    sectionLabel: "contentcore",
    h2pre: "mon propre CMS. ",
    h2post: "je l'ai baptisé contentcore.",
    italic: "Pour que tu pilotes ton site, pas l'inverse.",
    body: "Pas de WordPress. Pas de chaos de plugins. Un système que je construis et maintiens pour toi, pour que tu modifies textes, images et pages toi-même, sans peur de tout casser. Avec des petits conseils direct dans l'éditeur, si tu coinces.",
    dashboardLabel: "dashboard · vue live",
    editorLabel: "éditeur",
    statsLabel: "stats sans cookies",
    features: ["Modifier les textes en live", "Uploader des images", "Prévisu avant publication", "Deutsch · Français · English", "Historique des versions", "Pas de cookies"],
    footerPre: "Tout le technique derrière (sécurité, reconnaissance d'image ia, shop, newsletter, multilingue) est sur une page dédiée · ",
    footerLink: "détails technique →",
  },
  en: {
    sectionLabel: "contentcore",
    h2pre: "my own CMS. ",
    h2post: "i called it contentcore.",
    italic: "So you run your site, not the other way around.",
    body: "No WordPress. No plugin chaos. A system i build and maintain for you, so you change text, images and pages yourself, without fear of breaking anything. With small tips right in the editor, if you get stuck.",
    dashboardLabel: "dashboard · live view",
    editorLabel: "editor",
    statsLabel: "stats without cookies",
    features: ["Edit text live", "Upload images", "Preview before publish", "Deutsch · Français · English", "Version history", "No cookies"],
    footerPre: "Everything technical behind it (security, ai image recognition, shop, newsletter, multilingual) lives on its own page · ",
    footerLink: "tech details →",
  },
};

export function ContentCoreSection({
  num = "03",
}: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            {t.h2pre}
            <span className="text-offwhite/35">{t.h2post}</span>
          </h2>

          <p
            className="mt-5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.35] text-offwhite"
            style={{ fontFamily: "var(--font-instrument), serif", fontStyle: "italic" }}
          >
            {t.italic}
          </p>

          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            {t.body}
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <div className="relative glass rounded-2xl p-4 md:p-6 overflow-hidden">
            <div
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgb(var(--accent) / 0.06)" }}
            />
            <DashboardMock className="w-full h-auto relative" />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                {t.dashboardLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-4 md:p-5">
              <EditorMock className="w-full h-auto" />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.editorLabel}
                </span>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-5">
              <StatsMock className="w-full h-auto" />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.statsLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {t.features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-ink/20 bg-ink/[0.02] text-[12px] text-offwhite/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {f}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-[560px] text-[13px] leading-relaxed text-offwhite/55">
          {t.footerPre}
          <Link
            href={buildPath("leistungen/web/technik", locale)}
            className="text-accent-ink hover:underline"
          >
            {t.footerLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
