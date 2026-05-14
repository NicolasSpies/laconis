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
  return getMeta("/datenschutz");
}

type Dict = {
  label: string;
  titel: string;
  intro: string;
  s1Title: string;
  s1Aside: string;
  kName: string;
  kSitz: string;
  vSitz: string;
  kMail: string;
  s2Title: string;
  s2Aside: string;
  s2p1Bold: string;
  s2p1: string;
  s2p2Bold: string;
  s2p2: string;
  s2p3Bold: string;
  s2p3: string;
  s3Title: string;
  s3Aside: string;
  s3Body: string;
  s4Title: string;
  s4Aside: string;
  s4Intro: string;
  s4Items: { bold: string; rest: string }[];
  s5Title: string;
  s5Aside: string;
  s5Lead: string;
  s5Items: string[];
  s5End: string;
  s6Title: string;
  s6Aside: string;
  s6Body: string;
  s7Title: string;
  s7Aside: string;
  s7Body: string;
  stand: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    label: "rechtliches",
    titel: "datenschutz.",
    intro: "kurzfassung: ich sammle so wenig wie möglich. was ich sammle, schütze ich. was du nicht willst, musst du nicht geben.",
    s1Title: "verantwortlicher im sinne der DSGVO",
    s1Aside: "die person, die für deine daten verantwortlich ist. im zweifel: ich.",
    kName: "name",
    kSitz: "sitz",
    vSitz: "Eupen, Belgien",
    kMail: "e-mail",
    s2Title: "welche daten sammle ich · und warum",
    s2Aside: "nur was nötig ist, um projekte abzuwickeln. keine werbenetzwerke, keine scoring-tools.",
    s2p1Bold: "Kontaktaufnahme.",
    s2p1: " Wenn du mir über das Formular oder per E-Mail schreibst, verarbeite ich die von dir angegebenen Daten (Name, E-Mail, Nachricht und optional Budget / Projektinfo) zur Bearbeitung deiner Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO (Vertragsanbahnung / berechtigtes Interesse).",
    s2p2Bold: "Sprachnachricht.",
    s2p2: " Wenn du das Voice-Memo-Feature nutzt, wird die Aufnahme lokal in deinem Browser erstellt und erst beim Absenden an mich übertragen. Ich speichere sie so lange, wie es für die Bearbeitung nötig ist.",
    s2p3Bold: "Server-Logs.",
    s2p3: " Der Hoster erhebt automatisch technische Daten (IP-Adresse, Zeitstempel, Browser-Kennung), die für den Betrieb und die Sicherheit der Seite notwendig sind. Diese werden nach spätestens 30 Tagen gelöscht.",
    s3Title: "cookies & tracking",
    s3Aside: "diese seite trackt dich nicht. kein google analytics, keine pixel, keine retargeting-tools.",
    s3Body: "lacønis setzt nur funktionale Cookies ein, die für den reibungslosen Betrieb der Website notwendig sind (z. B. zur Speicherung deiner Akzentfarben-Einstellung im LocalStorage). Es findet kein Tracking oder Profiling statt.",
    s4Title: "auftragsverarbeiter",
    s4Aside: "dienste, die im hintergrund laufen. alle EU-konform ausgewählt, wo möglich.",
    s4Intro: "Zur Bereitstellung der Website nutze ich:",
    s4Items: [
      { bold: "Hosting:", rest: " Vercel Inc. / OVH (je nach Projekt). Datenverarbeitung unter EU-Standardvertragsklauseln." },
      { bold: "E-Mail-Versand:", rest: " regulärer Mailprovider, keine Marketing-Dienste." },
      { bold: "Schrift:", rest: " Google Fonts werden lokal ausgeliefert · keine Verbindung zu Google beim Laden der Seite." },
    ],
    s5Title: "deine rechte",
    s5Aside: "gdpr gibt dir fünf hebel. alle kostenlos, alle per e-mail einforderbar.",
    s5Lead: "Als betroffene Person hast du das Recht:",
    s5Items: [
      "Auskunft zu erhalten, ob und welche Daten ich über dich speichere (Art. 15);",
      "Berichtigung unrichtiger Daten zu verlangen (Art. 16);",
      "Löschung deiner Daten zu verlangen, sofern keine Aufbewahrungspflicht besteht (Art. 17);",
      "Verarbeitung einzuschränken (Art. 18);",
      "Widerspruch gegen die Verarbeitung einzulegen (Art. 21);",
      "Datenübertragbarkeit zu verlangen (Art. 20);",
      "Beschwerde bei der belgischen Datenschutzbehörde (APD/GBA) einzulegen.",
    ],
    s5End: "Eine kurze E-Mail reicht:",
    s6Title: "aufbewahrungsdauer",
    s6Aside: "ich halte daten so lange wie nötig. dann: löschen.",
    s6Body: "Anfragen, die nicht zu einem Auftrag führen, werden nach 6 Monaten gelöscht. Projektdaten werden bis zum Ablauf der gesetzlichen Aufbewahrungsfristen (in der Regel 7 Jahre, Buchhaltungspflicht in Belgien) gespeichert und danach gelöscht.",
    s7Title: "änderungen dieser erklärung",
    s7Aside: "rechtliche updates kommen immer wieder. hier aktualisiere ich's dann.",
    s7Body: "Ich behalte mir vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie den aktuellen rechtlichen Anforderungen entspricht. Die jeweils aktuelle Version ist immer hier abrufbar.",
    stand: "stand: april 2026",
  },
  fr: {
    label: "confidentialité",
    titel: "confidentialité.",
    intro: "version courte : je collecte le moins possible. ce que je collecte, je le protège. ce que tu ne veux pas, tu n'as pas à donner.",
    s1Title: "responsable au sens du RGPD",
    s1Aside: "la personne responsable de tes données. en cas de doute : moi.",
    kName: "nom",
    kSitz: "siège",
    vSitz: "Eupen, Belgique",
    kMail: "e-mail",
    s2Title: "quelles données je collecte · et pourquoi",
    s2Aside: "que ce qui est nécessaire pour les projets. pas de réseaux pub, pas de scoring.",
    s2p1Bold: "Prise de contact.",
    s2p1: " Quand tu m'écris via le formulaire ou par mail, je traite les données fournies (nom, e-mail, message et éventuellement budget / infos projet) pour répondre à ta demande. Base juridique : art. 6 par. 1 b) et f) RGPD (mesures pré-contractuelles / intérêt légitime).",
    s2p2Bold: "Message vocal.",
    s2p2: " Si tu utilises la fonction voice-memo, l'enregistrement est créé localement dans ton navigateur et n'est transmis qu'à l'envoi. Je le conserve aussi longtemps que nécessaire au traitement.",
    s2p3Bold: "Logs serveur.",
    s2p3: " L'hébergeur collecte automatiquement des données techniques (adresse IP, horodatage, identifiant navigateur) nécessaires au fonctionnement et à la sécurité du site. Elles sont supprimées au plus tard après 30 jours.",
    s3Title: "cookies & tracking",
    s3Aside: "ce site ne te traque pas. pas de google analytics, pas de pixels, pas de retargeting.",
    s3Body: "lacønis n'utilise que des cookies fonctionnels nécessaires au bon fonctionnement du site (ex. : stockage de ta préférence de couleur d'accent dans LocalStorage). Aucun tracking, aucun profilage.",
    s4Title: "sous-traitants",
    s4Aside: "services qui tournent en arrière-plan. tous choisis conformes UE quand possible.",
    s4Intro: "Pour faire fonctionner le site, j'utilise :",
    s4Items: [
      { bold: "Hébergement :", rest: " Vercel Inc. / OVH (selon le projet). Traitement sous clauses contractuelles types UE." },
      { bold: "Envoi de mails :", rest: " un mailprovider régulier, pas de service marketing." },
      { bold: "Polices :", rest: " Google Fonts sont servies en local · pas de connexion à Google au chargement." },
    ],
    s5Title: "tes droits",
    s5Aside: "le rgpd te donne plusieurs leviers. tous gratuits, tous activables par mail.",
    s5Lead: "En tant que personne concernée, tu as le droit :",
    s5Items: [
      "d'obtenir des informations sur les données que je conserve (art. 15) ;",
      "de demander la rectification de données inexactes (art. 16) ;",
      "de demander l'effacement de tes données, sauf obligation de conservation (art. 17) ;",
      "de limiter le traitement (art. 18) ;",
      "de t'opposer au traitement (art. 21) ;",
      "à la portabilité des données (art. 20) ;",
      "d'introduire une plainte auprès de l'autorité belge de protection des données (APD/GBA).",
    ],
    s5End: "Un petit mail suffit :",
    s6Title: "durée de conservation",
    s6Aside: "je garde les données aussi longtemps que nécessaire. ensuite : suppression.",
    s6Body: "Les demandes qui n'aboutissent pas à un contrat sont supprimées après 6 mois. Les données de projet sont conservées jusqu'à l'expiration des délais légaux de conservation (en général 7 ans, obligation comptable en Belgique), puis supprimées.",
    s7Title: "modifications de cette déclaration",
    s7Aside: "les updates juridiques arrivent régulièrement. je mets à jour ici.",
    s7Body: "Je me réserve le droit d'adapter cette déclaration de confidentialité de temps à autre pour qu'elle reste conforme aux exigences légales en vigueur. La version actuelle est toujours accessible ici.",
    stand: "version : avril 2026",
  },
  en: {
    label: "privacy",
    titel: "privacy.",
    intro: "short version: i collect as little as possible. what i collect, i protect. what you don't want, you don't have to give.",
    s1Title: "controller under GDPR",
    s1Aside: "the person responsible for your data. in case of doubt: me.",
    kName: "name",
    kSitz: "registered office",
    vSitz: "Eupen, Belgium",
    kMail: "e-mail",
    s2Title: "what data i collect · and why",
    s2Aside: "only what's needed to handle projects. no ad networks, no scoring tools.",
    s2p1Bold: "Contact.",
    s2p1: " If you write to me via the form or by mail, i process the data you provide (name, e-mail, message and optionally budget / project info) to handle your request. Legal basis: art. 6 (1) (b) and (f) GDPR (pre-contractual measures / legitimate interest).",
    s2p2Bold: "Voice message.",
    s2p2: " If you use the voice-memo feature, the recording is created locally in your browser and only transmitted on send. I keep it as long as needed for processing.",
    s2p3Bold: "Server logs.",
    s2p3: " The host automatically collects technical data (IP address, timestamp, browser ID) needed for operation and security. These are deleted after 30 days at the latest.",
    s3Title: "cookies & tracking",
    s3Aside: "this site doesn't track you. no google analytics, no pixels, no retargeting tools.",
    s3Body: "lacønis uses only functional cookies needed for smooth operation (e.g. to store your accent colour preference in LocalStorage). No tracking, no profiling.",
    s4Title: "processors",
    s4Aside: "services running in the background. all chosen EU-compliant where possible.",
    s4Intro: "To run the site, i use:",
    s4Items: [
      { bold: "Hosting:", rest: " Vercel Inc. / OVH (depending on the project). Data processing under EU standard contractual clauses." },
      { bold: "Mail sending:", rest: " a regular mail provider, no marketing services." },
      { bold: "Fonts:", rest: " Google Fonts are served locally · no connection to Google when the page loads." },
    ],
    s5Title: "your rights",
    s5Aside: "gdpr gives you several levers. all free, all by mail.",
    s5Lead: "As a data subject you have the right:",
    s5Items: [
      "to obtain information on what data i store about you (art. 15);",
      "to request correction of inaccurate data (art. 16);",
      "to request deletion of your data, unless retention is required (art. 17);",
      "to restrict processing (art. 18);",
      "to object to processing (art. 21);",
      "to data portability (art. 20);",
      "to lodge a complaint with the Belgian data protection authority (APD/GBA).",
    ],
    s5End: "A short e-mail is enough:",
    s6Title: "retention period",
    s6Aside: "i keep data as long as needed. then: delete.",
    s6Body: "Requests that don't lead to a contract are deleted after 6 months. Project data is stored until the statutory retention period expires (usually 7 years, accounting obligation in Belgium), then deleted.",
    s7Title: "changes to this statement",
    s7Aside: "legal updates happen. i'll update here.",
    s7Body: "I reserve the right to adapt this privacy statement from time to time to stay compliant with current legal requirements. The current version is always available here.",
    stand: "as of: april 2026",
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
        <LegalRow k={t.kName} v="Nicolas Spies (laconis)" />
        <LegalRow k={t.kSitz} v={t.vSitz} />
        <LegalRow
          k={t.kMail}
          v={
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[#b084d3] hover:underline"
            >
              {CONTACT.email}
            </a>
          }
        />
      </LegalSection>

      <LegalSection titel={t.s2Title} aside={t.s2Aside}>
        <p>
          <strong className="text-[#0a0a0a]">{t.s2p1Bold}</strong>
          {t.s2p1}
        </p>
        <p>
          <strong className="text-[#0a0a0a]">{t.s2p2Bold}</strong>
          {t.s2p2}
        </p>
        <p>
          <strong className="text-[#0a0a0a]">{t.s2p3Bold}</strong>
          {t.s2p3}
        </p>
      </LegalSection>

      <LegalSection titel={t.s3Title} aside={t.s3Aside}>
        <p>{t.s3Body}</p>
      </LegalSection>

      <LegalSection titel={t.s4Title} aside={t.s4Aside}>
        <p>{t.s4Intro}</p>
        <ul className="list-disc pl-5 space-y-1.5 text-[#0a0a0a]/80">
          {t.s4Items.map((item, i) => (
            <li key={i}>
              <strong className="text-[#0a0a0a]">{item.bold}</strong>
              {item.rest}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection titel={t.s5Title} aside={t.s5Aside}>
        <p>{t.s5Lead}</p>
        <ul className="list-disc pl-5 space-y-1.5 text-[#0a0a0a]/80">
          {t.s5Items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>
          {t.s5End}{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-[#b084d3] hover:underline"
          >
            {CONTACT.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection titel={t.s6Title} aside={t.s6Aside}>
        <p>{t.s6Body}</p>
      </LegalSection>

      <LegalSection titel={t.s7Title} aside={t.s7Aside}>
        <p>{t.s7Body}</p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55 pt-6 border-t border-[#0a0a0a]/12">
        {t.stand}
      </p>
    </LegalLayout>
  );
}
