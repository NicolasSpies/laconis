import {
  LegalLayout,
  LegalSection,
  LegalRow,
} from "@/components/legal/LegalLayout";
import { getMeta } from "@/lib/seo/getMeta";
import { CONTACT } from "@/config/contact";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/datenschutz");
}

export default function Page() {
  return (
    <LegalLayout
      num="⎔"
      label="rechtliches"
      titel="datenschutz."
      intro="kurzfassung: ich sammle so wenig wie möglich. was ich sammle, schütze ich. was du nicht willst, musst du nicht geben."
    >
      <LegalSection
        titel="verantwortlicher im sinne der DSGVO"
        aside="die person, die für deine daten verantwortlich ist. im zweifel: ich."
      >
        <LegalRow k="name" v="Nicolas Spies (laconis)" />
        <LegalRow k="sitz" v="Eupen, Belgien" />
        <LegalRow
          k="e-mail"
          v={
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-accent-ink hover:underline"
            >
              {CONTACT.email}
            </a>
          }
        />
      </LegalSection>

      <LegalSection
        titel="welche daten sammle ich — und warum"
        aside="nur was nötig ist, um projekte abzuwickeln. keine werbenetzwerke, keine scoring-tools."
      >
        <p>
          <strong className="text-offwhite">Kontaktaufnahme.</strong> Wenn du
          mir über das Formular oder per E-Mail schreibst, verarbeite ich die
          von dir angegebenen Daten (Name, E-Mail, Nachricht und optional
          Budget / Projektinfo) zur Bearbeitung deiner Anfrage. Rechtsgrundlage:
          Art. 6 Abs. 1 lit. b und f DSGVO (Vertragsanbahnung / berechtigtes
          Interesse).
        </p>
        <p>
          <strong className="text-offwhite">Sprachnachricht.</strong> Wenn du
          das Voice-Memo-Feature nutzt, wird die Aufnahme lokal in deinem
          Browser erstellt und erst beim Absenden an mich übertragen. Ich
          speichere sie so lange, wie es für die Bearbeitung nötig ist.
        </p>
        <p>
          <strong className="text-offwhite">Server-Logs.</strong> Der Hoster
          erhebt automatisch technische Daten (IP-Adresse, Zeitstempel,
          Browser-Kennung), die für den Betrieb und die Sicherheit der Seite
          notwendig sind. Diese werden nach spätestens 30 Tagen gelöscht.
        </p>
      </LegalSection>

      <LegalSection
        titel="cookies & tracking"
        aside="diese seite trackt dich nicht. kein google analytics, keine pixel, keine retargeting-tools."
      >
        <p>
          lacønis setzt nur funktionale Cookies ein, die für den reibungslosen
          Betrieb der Website notwendig sind (z. B. zur Speicherung deiner
          Akzentfarben-Einstellung im LocalStorage). Es findet kein Tracking
          oder Profiling statt.
        </p>
      </LegalSection>

      <LegalSection
        titel="auftragsverarbeiter"
        aside="dienste, die im hintergrund laufen. alle EU-konform ausgewählt, wo möglich."
      >
        <p>
          Zur Bereitstellung der Website nutze ich:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-offwhite/75">
          <li>
            <strong className="text-offwhite">Hosting:</strong> Vercel Inc. /
            OVH (je nach Projekt). Datenverarbeitung unter EU-Standardvertrags-
            klauseln.
          </li>
          <li>
            <strong className="text-offwhite">E-Mail-Versand:</strong> regulärer
            Mailprovider, keine Marketing-Dienste.
          </li>
          <li>
            <strong className="text-offwhite">Schrift:</strong> Google Fonts
            werden lokal ausgeliefert — keine Verbindung zu Google beim Laden
            der Seite.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        titel="deine rechte"
        aside="gdpr gibt dir fünf hebel. alle kostenlos, alle per e-mail einforderbar."
      >
        <p>Als betroffene Person hast du das Recht:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-offwhite/75">
          <li>Auskunft zu erhalten, ob und welche Daten ich über dich speichere (Art. 15);</li>
          <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16);</li>
          <li>Löschung deiner Daten zu verlangen, sofern keine Aufbewahrungspflicht besteht (Art. 17);</li>
          <li>Verarbeitung einzuschränken (Art. 18);</li>
          <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21);</li>
          <li>Datenübertragbarkeit zu verlangen (Art. 20);</li>
          <li>Beschwerde bei der belgischen Datenschutzbehörde (APD/GBA) einzulegen.</li>
        </ul>
        <p>
          Eine kurze E-Mail reicht:{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-accent-ink hover:underline"
          >
            {CONTACT.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection
        titel="aufbewahrungsdauer"
        aside="ich halte daten so lange wie nötig. dann: löschen."
      >
        <p>
          Anfragen, die nicht zu einem Auftrag führen, werden nach 6 Monaten
          gelöscht. Projektdaten werden bis zum Ablauf der gesetzlichen
          Aufbewahrungsfristen (in der Regel 7 Jahre, Buchhaltungspflicht in
          Belgien) gespeichert und danach gelöscht.
        </p>
      </LegalSection>

      <LegalSection
        titel="änderungen dieser erklärung"
        aside="rechtliche updates kommen immer wieder. hier aktualisiere ich's dann."
      >
        <p>
          Ich behalte mir vor, diese Datenschutzerklärung gelegentlich
          anzupassen, damit sie den aktuellen rechtlichen Anforderungen
          entspricht. Die jeweils aktuelle Version ist immer hier abrufbar.
        </p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 pt-6 border-t border-ink/10">
        stand: april 2026
      </p>
    </LegalLayout>
  );
}
