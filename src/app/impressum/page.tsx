import {
  LegalLayout,
  LegalSection,
  LegalRow,
} from "@/components/legal/LegalLayout";
import { getMeta } from "@/lib/seo/getMeta";
import { CONTACT } from "@/config/contact";
import { getLocale } from "@/i18n/getLocale";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/impressum");
}

type Dict = {
  label: string;
  titel: string;
  intro: string;
  s1Title: string;
  s1Aside: string;
  kName: string;
  kMarke: string;
  kSitz: string;
  kAnschrift: string;
  vAnschrift: string;
  kMail: string;
  kTel: string;
  vTel: string;
  s2Title: string;
  s2Aside: string;
  s2Body: string;
  s3Title: string;
  s3Aside: string;
  s3p1Bold: string;
  s3p1: string;
  s3p2Bold: string;
  s3p2: string;
  s4Title: string;
  s4Aside: string;
  s4p1: string;
  s4p2: string;
  s5Title: string;
  s5Aside: string;
  s5Body1: string;
  s5Body2: string;
  stand: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    label: "rechtliches",
    titel: "impressum.",
    intro: "ja, auch eine seite mit haltung braucht legal-kram. hier ist er, so nüchtern wie möglich.",
    s1Title: "anbieter / verantwortlich im sinne von §5 DDG / art. III.74 WER (BE)",
    s1Aside: "pflicht · sagt EU & belgisches wirtschaftsrecht. nichts persönliches.",
    kName: "name",
    kMarke: "marke",
    kSitz: "sitz",
    kAnschrift: "anschrift",
    vAnschrift: "Adresse wird ergänzt · 4700 Eupen, Belgien",
    kMail: "e-mail",
    kTel: "telefon",
    vTel: "Wird nachgereicht · bis dahin am schnellsten per Mail",
    s2Title: "verantwortlich für inhalt",
    s2Aside: "dasselbe wie oben. der mensch hinter laconis, nicht eine redaktion.",
    s2Body: "Verantwortlich für den Inhalt dieser Website ist Nicolas Spies (Anschrift wie oben).",
    s3Title: "haftungsausschluss",
    s3Aside: "jurist'sche floskel. muss stehen · im kern: ich gebe mir mühe, garantiere aber nichts.",
    s3p1Bold: "Inhalte der Website.",
    s3p1: " Alle Inhalte werden mit bestmöglicher Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird dennoch keine Gewähr übernommen.",
    s3p2Bold: "Externe Links.",
    s3p2: " Diese Website enthält Links zu externen Seiten. Für deren Inhalte ist ausschließlich der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.",
    s4Title: "urheberrecht",
    s4Aside: "kurz: was hier steht, gehört mir (oder den kunden). bitte nicht klauen.",
    s4p1: "Alle auf dieser Website veröffentlichten Texte, Bilder, Grafiken und Gestaltungen sind · sofern nicht anders angegeben · urheberrechtlich geschützt. Eine Verwendung außerhalb dieser Website bedarf der vorherigen schriftlichen Zustimmung.",
    s4p2: "Projektbilder auf der Referenzen-Seite werden mit Zustimmung der jeweiligen Kundinnen und Kunden gezeigt.",
    s5Title: "streitbeilegung",
    s5Aside: "muss drin stehen, damit die EU ruhig ist. praktisch relevant: selten.",
    s5Body1: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ",
    s5Body2: ". Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht bereit.",
    stand: "stand: april 2026 · diese seite wird aktualisiert, sobald die business-registrierung abgeschlossen ist.",
  },
  fr: {
    label: "mentions légales",
    titel: "mentions légales.",
    intro: "oui, même un site avec une opinion a besoin de legal. le voici, le plus sobre possible.",
    s1Title: "prestataire / responsable au sens de l'art. III.74 CDE (BE)",
    s1Aside: "obligation · droit économique belge & UE. rien de perso.",
    kName: "nom",
    kMarke: "marque",
    kSitz: "siège",
    kAnschrift: "adresse",
    vAnschrift: "Adresse à compléter · 4700 Eupen, Belgique",
    kMail: "e-mail",
    kTel: "téléphone",
    vTel: "À venir · en attendant, le plus rapide par mail",
    s2Title: "responsable du contenu",
    s2Aside: "identique à ci-dessus. la personne derrière laconis, pas une rédaction.",
    s2Body: "Le responsable du contenu de ce site est Nicolas Spies (adresse comme ci-dessus).",
    s3Title: "clause de non-responsabilité",
    s3Aside: "formule juridique. doit y figurer · en gros : je fais de mon mieux, mais ne garantis rien.",
    s3p1Bold: "Contenus du site.",
    s3p1: " Tous les contenus sont créés avec le plus grand soin. Aucune garantie n'est cependant donnée quant à l'exactitude, l'exhaustivité et l'actualité.",
    s3p2Bold: "Liens externes.",
    s3p2: " Ce site contient des liens vers des sites externes. Le fournisseur respectif est seul responsable de leur contenu. Au moment de la mise en lien, aucun contenu illégal n'était décelable.",
    s4Title: "droits d'auteur",
    s4Aside: "en bref : ce qui se trouve ici m'appartient (ou aux clients). merci de ne pas piquer.",
    s4p1: "Tous les textes, images, graphiques et créations publiés sur ce site sont · sauf indication contraire · protégés par le droit d'auteur. Toute utilisation hors de ce site nécessite un accord écrit préalable.",
    s4p2: "Les images de projets sur la page références sont montrées avec l'accord des client·es concerné·es.",
    s5Title: "règlement des litiges",
    s5Aside: "doit y figurer pour calmer l'UE. en pratique : rarement utile.",
    s5Body1: "La Commission européenne met à disposition une plateforme de règlement en ligne des litiges (RLL) : ",
    s5Body2: ". Je ne suis ni obligé ni disposé à participer à une procédure de règlement devant un organisme de conciliation pour consommateurs.",
    stand: "version : avril 2026 · cette page sera mise à jour dès que l'enregistrement de l'activité sera finalisé.",
  },
  en: {
    label: "legal notice",
    titel: "legal notice.",
    intro: "yes, even a site with an opinion needs legal. here it is, as plain as possible.",
    s1Title: "provider / responsible under art. III.74 CEL (BE)",
    s1Aside: "mandatory · belgian & EU commercial law. nothing personal.",
    kName: "name",
    kMarke: "brand",
    kSitz: "registered office",
    kAnschrift: "address",
    vAnschrift: "Address to be added · 4700 Eupen, Belgium",
    kMail: "e-mail",
    kTel: "phone",
    vTel: "Coming soon · until then, mail is fastest",
    s2Title: "responsible for content",
    s2Aside: "same as above. the human behind laconis, not an editorial team.",
    s2Body: "Responsible for the content of this website is Nicolas Spies (address as above).",
    s3Title: "disclaimer",
    s3Aside: "legal boilerplate. has to be there · gist: i try my best, but i don't guarantee anything.",
    s3p1Bold: "Site content.",
    s3p1: " All content is created with the greatest possible care. No warranty is given for accuracy, completeness or currency.",
    s3p2Bold: "External links.",
    s3p2: " This site contains links to external sites. Their respective providers are solely responsible for their content. At the time of linking, no unlawful content was apparent.",
    s4Title: "copyright",
    s4Aside: "short: what's here belongs to me (or the clients). please don't steal.",
    s4p1: "All texts, images, graphics and designs published on this site are · unless otherwise indicated · protected by copyright. Any use outside this site requires prior written consent.",
    s4p2: "Project images on the references page are shown with the consent of the respective clients.",
    s5Title: "dispute resolution",
    s5Aside: "must be included to keep the EU happy. practical relevance: rare.",
    s5Body1: "The European Commission provides an online dispute resolution (ODR) platform: ",
    s5Body2: ". I am neither obliged nor willing to participate in a dispute resolution procedure before a consumer arbitration body.",
    stand: "as of: april 2026 · this page will be updated once business registration is complete.",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];
  return (
    <LegalLayout
      num="⎔"
      label={t.label}
      titel={t.titel}
      intro={t.intro}
    >
      <LegalSection titel={t.s1Title} aside={t.s1Aside}>
        <LegalRow k={t.kName} v="Nicolas Spies" />
        <LegalRow k={t.kMarke} v="lacønis" />
        <LegalRow k={t.kSitz} v={locale === "fr" ? "Eupen, Belgique" : locale === "en" ? "Eupen, Belgium" : "Eupen, Belgien"} />
        <LegalRow
          k={t.kAnschrift}
          v={<span className="text-offwhite/55">{t.vAnschrift}</span>}
        />
        <LegalRow
          k={t.kMail}
          v={
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-accent-ink hover:underline"
            >
              {CONTACT.email}
            </a>
          }
        />
        <LegalRow
          k={t.kTel}
          v={<span className="text-offwhite/55">{t.vTel}</span>}
        />
      </LegalSection>

      <LegalSection titel={t.s2Title} aside={t.s2Aside}>
        <p>{t.s2Body}</p>
      </LegalSection>

      <LegalSection titel={t.s3Title} aside={t.s3Aside}>
        <p>
          <strong className="text-offwhite">{t.s3p1Bold}</strong>
          {t.s3p1}
        </p>
        <p>
          <strong className="text-offwhite">{t.s3p2Bold}</strong>
          {t.s3p2}
        </p>
      </LegalSection>

      <LegalSection titel={t.s4Title} aside={t.s4Aside}>
        <p>{t.s4p1}</p>
        <p>{t.s4p2}</p>
      </LegalSection>

      <LegalSection titel={t.s5Title} aside={t.s5Aside}>
        <p>
          {t.s5Body1}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-ink hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          {t.s5Body2}
        </p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 pt-6 border-t border-ink/10">
        {t.stand}
      </p>
    </LegalLayout>
  );
}
