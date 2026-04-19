import {
  LegalLayout,
  LegalSection,
  LegalRow,
} from "@/components/legal/LegalLayout";

export const metadata = { title: "datenschutz" };

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
              href="mailto:hallo@laconis.be"
              className="text-accent-ink hover:underline"
            >
              hallo@laconis.be
            </a>
          }
        />
      </LegalSection>

      <LegalSection
        titel="welche daten sammle ich — und warum"
        aside="nur was nötig ist, um projekte abzuwickeln. keine werbenetzwerke, keine scoring-tools."
      >
        <p>
          <strong className="text-offwhite">kontaktaufnahme.</strong> wenn du
          mir über das formular oder per e-mail schreibst, verarbeite ich die
          von dir angegebenen daten (name, e-mail, nachricht und optional
          budget / projektinfo) zur bearbeitung deiner anfrage. rechtsgrundlage:
          art. 6 abs. 1 lit. b und f DSGVO (vertragsanbahnung / berechtigtes
          interesse).
        </p>
        <p>
          <strong className="text-offwhite">sprachnachricht.</strong> wenn du
          das voice-memo-feature nutzt, wird die aufnahme lokal in deinem
          browser erstellt und erst beim absenden an mich übertragen. ich
          speichere sie so lange, wie es für die bearbeitung nötig ist.
        </p>
        <p>
          <strong className="text-offwhite">server-logs.</strong> der hoster
          erhebt automatisch technische daten (ip-adresse, zeitstempel,
          browser-kennung), die für den betrieb und die sicherheit der seite
          notwendig sind. diese werden nach spätestens 30 tagen gelöscht.
        </p>
      </LegalSection>

      <LegalSection
        titel="cookies & tracking"
        aside="diese seite trackt dich nicht. kein google analytics, keine pixel, keine retargeting-tools."
      >
        <p>
          lacønis setzt nur funktionale cookies ein, die für den reibungslosen
          betrieb der website notwendig sind (z. b. zur speicherung deiner
          akzentfarben-einstellung im localstorage). es findet kein tracking
          oder profiling statt.
        </p>
      </LegalSection>

      <LegalSection
        titel="auftragsverarbeiter"
        aside="dienste, die im hintergrund laufen. alle EU-konform ausgewählt, wo möglich."
      >
        <p>
          zur bereitstellung der website nutze ich:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-offwhite/70">
          <li>
            <strong className="text-offwhite">hosting:</strong> Vercel Inc. /
            OVH (je nach projekt). datenverarbeitung unter EU-standardvertrags-
            klauseln.
          </li>
          <li>
            <strong className="text-offwhite">e-mail-versand:</strong> regulärer
            mailprovider, keine marketing-dienste.
          </li>
          <li>
            <strong className="text-offwhite">schrift:</strong> Google Fonts
            werden lokal ausgeliefert — keine verbindung zu google beim laden
            der seite.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        titel="deine rechte"
        aside="gdpr gibt dir fünf hebel. alle kostenlos, alle per e-mail einforderbar."
      >
        <p>als betroffene person hast du das recht:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-offwhite/70">
          <li>auskunft zu erhalten, ob und welche daten ich über dich speichere (art. 15);</li>
          <li>berichtigung unrichtiger daten zu verlangen (art. 16);</li>
          <li>löschung deiner daten zu verlangen, sofern keine aufbewahrungspflicht besteht (art. 17);</li>
          <li>verarbeitung einzuschränken (art. 18);</li>
          <li>widerspruch gegen die verarbeitung einzulegen (art. 21);</li>
          <li>datenübertragbarkeit zu verlangen (art. 20);</li>
          <li>beschwerde bei der belgischen datenschutzbehörde (APD/GBA) einzulegen.</li>
        </ul>
        <p>
          eine kurze e-mail reicht:{" "}
          <a
            href="mailto:hallo@laconis.be"
            className="text-accent-ink hover:underline"
          >
            hallo@laconis.be
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection
        titel="aufbewahrungsdauer"
        aside="ich halte daten so lange wie nötig. dann: löschen."
      >
        <p>
          anfragen, die nicht zu einem auftrag führen, werden nach 6 monaten
          gelöscht. projektdaten werden bis zum ablauf der gesetzlichen
          aufbewahrungsfristen (in der regel 7 jahre, buchhaltungspflicht in
          Belgien) gespeichert und danach gelöscht.
        </p>
      </LegalSection>

      <LegalSection
        titel="änderungen dieser erklärung"
        aside="rechtliche updates kommen immer wieder. hier aktualisiere ich's dann."
      >
        <p>
          ich behalte mir vor, diese datenschutzerklärung gelegentlich
          anzupassen, damit sie den aktuellen rechtlichen anforderungen
          entspricht. die jeweils aktuelle version ist immer hier abrufbar.
        </p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 pt-6 border-t border-ink/8">
        stand: april 2026
      </p>
    </LegalLayout>
  );
}
