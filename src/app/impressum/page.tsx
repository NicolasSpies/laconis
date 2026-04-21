import {
  LegalLayout,
  LegalSection,
  LegalRow,
} from "@/components/legal/LegalLayout";
import { getMeta } from "@/lib/seo/getMeta";
import { CONTACT } from "@/config/contact";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/impressum");
}

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
            <span className="text-offwhite/55">
              Adresse wird ergänzt · 4700 Eupen, Belgien
            </span>
          }
        />
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
        <LegalRow
          k="telefon"
          v={
            <span className="text-offwhite/55">
              Wird nachgereicht · bis dahin am schnellsten per Mail
            </span>
          }
        />
      </LegalSection>

      <LegalSection
        titel="verantwortlich für inhalt"
        aside="dasselbe wie oben. der mensch hinter laconis, nicht eine redaktion."
      >
        <p>
          Verantwortlich für den Inhalt dieser Website ist Nicolas Spies (Anschrift
          wie oben).
        </p>
      </LegalSection>

      <LegalSection
        titel="haftungsausschluss"
        aside="jurist&apos;sche floskel. muss stehen — im kern: ich gebe mir mühe, garantiere aber nichts."
      >
        <p>
          <strong className="text-offwhite">Inhalte der Website.</strong> Alle
          Inhalte werden mit bestmöglicher Sorgfalt erstellt. Für Richtigkeit,
          Vollständigkeit und Aktualität wird dennoch keine Gewähr übernommen.
        </p>
        <p>
          <strong className="text-offwhite">Externe Links.</strong> Diese
          Website enthält Links zu externen Seiten. Für deren Inhalte ist
          ausschließlich der jeweilige Anbieter verantwortlich. Zum Zeitpunkt
          der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
        </p>
      </LegalSection>

      <LegalSection
        titel="urheberrecht"
        aside="kurz: was hier steht, gehört mir (oder den kunden). bitte nicht klauen."
      >
        <p>
          Alle auf dieser Website veröffentlichten Texte, Bilder, Grafiken und
          Gestaltungen sind — sofern nicht anders angegeben — urheberrechtlich
          geschützt. Eine Verwendung außerhalb dieser Website bedarf der
          vorherigen schriftlichen Zustimmung.
        </p>
        <p>
          Projektbilder auf der Referenzen-Seite werden mit Zustimmung der
          jeweiligen Kundinnen und Kunden gezeigt.
        </p>
      </LegalSection>

      <LegalSection
        titel="streitbeilegung"
        aside="muss drin stehen, damit die EU ruhig ist. praktisch relevant: selten."
      >
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-
          Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-ink hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht
          bereit.
        </p>
      </LegalSection>

      <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 pt-6 border-t border-ink/10">
        stand: april 2026 • diese seite wird aktualisiert, sobald die business-
        registrierung abgeschlossen ist.
      </p>
    </LegalLayout>
  );
}
