import {
  LegalLayout,
  LegalSection,
  LegalRow,
} from "@/components/legal/LegalLayout";

export const metadata = { title: "impressum" };

export default function Page() {
  return (
    <LegalLayout
      num="⎔"
      label="rechtliches"
      titel="impressum."
      intro="ja, auch eine seite mit haltung braucht legal-kram. hier ist er, so nüchtern wie möglich."
    >
      <LegalSection
        titel="anbieter / verantwortlich im sinne von §5 DDG / art. III.74 WER (BE)"
        aside="pflicht — sagt EU & belgisches wirtschaftsrecht. nichts persönliches."
      >
        <LegalRow k="name" v="Nicolas Spies" />
        <LegalRow k="marke" v="lacønis" />
        <LegalRow k="sitz" v="Eupen, Belgien" />
        <LegalRow
          k="anschrift"
          v={
            <span className="text-offwhite/45 italic">
              [strasse + hausnummer] • 4700 Eupen
            </span>
          }
        />
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
        <LegalRow
          k="telefon"
          v={
            <span className="text-offwhite/45 italic">
              [telefonnummer] — reicht ich nach
            </span>
          }
        />
      </LegalSection>

      <LegalSection
        titel="umsatzsteuer / unternehmensnummer"
        aside="belgische freelancer brauchen eine BCE/KBO-nummer. kommt sobald registriert."
      >
        <LegalRow
          k="BCE / KBO"
          v={
            <span className="text-offwhite/45 italic">
              BE 0XXX.XXX.XXX — wird ergänzt
            </span>
          }
        />
        <LegalRow k="ust-befreiung" v="kleinunternehmer gem. art. 56bis MwStGB (falls zutreffend)" />
      </LegalSection>

      <LegalSection
        titel="verantwortlich für inhalt"
        aside="dasselbe wie oben. der mensch hinter laconis, nicht eine redaktion."
      >
        <p>
          Verantwortlich für den inhalt dieser website ist Nicolas Spies (anschrift
          wie oben).
        </p>
      </LegalSection>

      <LegalSection
        titel="haftungsausschluss"
        aside="jurist&apos;sche floskel. muss stehen — im kern: ich gebe mir mühe, garantiere aber nichts."
      >
        <p>
          <strong className="text-offwhite">inhalte der website.</strong> alle
          inhalte werden mit bestmöglicher sorgfalt erstellt. für richtigkeit,
          vollständigkeit und aktualität wird dennoch keine gewähr übernommen.
        </p>
        <p>
          <strong className="text-offwhite">externe links.</strong> diese
          website enthält links zu externen seiten. für deren inhalte ist
          ausschließlich der jeweilige anbieter verantwortlich. zum zeitpunkt
          der verlinkung waren keine rechtswidrigen inhalte erkennbar.
        </p>
      </LegalSection>

      <LegalSection
        titel="urheberrecht"
        aside="kurz: was hier steht, gehört mir (oder den kunden). bitte nicht klauen."
      >
        <p>
          alle auf dieser website veröffentlichten texte, bilder, grafiken und
          gestaltungen sind — sofern nicht anders angegeben — urheberrechtlich
          geschützt. eine verwendung außerhalb dieser website bedarf der
          vorherigen schriftlichen zustimmung.
        </p>
        <p>
          projektbilder auf der referenzen-seite werden mit zustimmung der
          jeweiligen kundinnen und kunden gezeigt.
        </p>
      </LegalSection>

      <LegalSection
        titel="streitbeilegung"
        aside="muss drin stehen, damit die EU ruhig ist. praktisch relevant: selten."
      >
        <p>
          die europäische kommission stellt eine plattform zur online-
          streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-ink hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          . zur teilnahme an einem streitbeilegungsverfahren vor einer
          verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht
          bereit.
        </p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 pt-6 border-t border-ink/8">
        stand: april 2026 • diese seite wird aktualisiert, sobald die business-
        registrierung abgeschlossen ist.
      </p>
    </LegalLayout>
  );
}
