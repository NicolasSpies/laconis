import { SectionLabel } from "@/components/ui/SectionLabel";

type Feature = {
  titel: string;
  beschreibung: string;
  stichwort: string;
};

const FEATURES: Feature[] = [
  {
    titel: "KI, die mitliest",
    stichwort: "01 · intelligenz",
    beschreibung:
      "Lädst du ein Foto hoch, beschreibt die KI automatisch, was drauf ist, in allen Sprachen. Google dankt, Screenreader auch. Für Texte gibt's Tippfehler-, Grammatik- und Stil-Hinweise direkt im Editor.",
  },
  {
    titel: "ein klick übersetzt alles",
    stichwort: "02 · mehrsprachig",
    beschreibung:
      "Deutsch, Französisch, Englisch · was du brauchst. KI macht den groben Wurf, du schleifst nach. Jede Sprache hat eigene URL, eigene SEO, eigenen Übersetzungsstatus.",
  },
  {
    titel: "bilder, die sich selbst optimieren",
    stichwort: "03 · performance",
    beschreibung:
      "Foto hochladen, fertig. ContentCore wandelt in WebP (30% kleiner), schneidet fünf Größen für Handy bis Desktop, und bei Bildermonstern wie Fotograf:innen landet alles im Cloud-Speicher.",
  },
  {
    titel: "newsletter direkt im system",
    stichwort: "04 · kontakt",
    beschreibung:
      "Kein Mailchimp-Abo mehr. Drag-&-Drop-Editor, Abonnenten-Verwaltung, Öffnungsraten, Versand geplant oder sofort, alles in ContentCore.",
  },
  {
    titel: "shop ohne shopify",
    stichwort: "05 · verkauf",
    beschreibung:
      "Produkte, Varianten, Lagerbestand, Stripe-Checkout mit Apple Pay und SEPA. 1,5% + 25 Cent pro Transaktion, keine Shopify-Grundgebühr.",
  },
  {
    titel: "versionsverlauf als sicherheitsnetz",
    stichwort: "06 · ruhe",
    beschreibung:
      "Alle 30 Sekunden automatisch speichern. Jede Änderung bleibt in der Historie, du kannst jederzeit zurück. Wenn zwei gleichzeitig am selben Artikel sind, warnt das System, bevor was doppelt entsteht.",
  },
  {
    titel: "redaktionskalender",
    stichwort: "07 · planung",
    beschreibung:
      "Monats- und Wochenansicht, Artikel per Drag & Drop verschieben, farbcodiert nach Inhaltstyp. Für alle, die mehr als drei Posts im Jahr machen.",
  },
  {
    titel: "jahresrückblick, automatisch",
    stichwort: "08 · gimmick",
    beschreibung:
      "Jedes Jahr am 1. Dezember bekommt jeder Kunde eine animierte Story, wie bei Instagram, nur für deine Seite. Meistgelesener Artikel, bester Monat, Total-Besucher. Teilbar, vollautomatisch.",
  },
  {
    titel: "dein branding, nicht meins",
    stichwort: "09 · white-label",
    beschreibung:
      "Im ContentCore siehst du dein Logo, deine Firmenfarben, deinen Namen. Das Wort „ContentCore\" taucht nirgends auf. Es fühlt sich an wie dein eigenes System, weil es das ist.",
  },
  {
    titel: "statistiken ohne spionage",
    stichwort: "10 · ehrlich",
    beschreibung:
      "Keine Cookies, kein Google Analytics, kein Banner. Du siehst trotzdem: Besucherzahl, Top-Seiten, Geräteverteilung, Herkunft. Sauber, DSGVO-konform, ohne Ballast.",
  },
];

export function ContentCoreDeepDive({
  num = "08",
}: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>was contentcore alles kann</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            ein system.{" "}
            <span className="text-offwhite/35">
              alles was du brauchst, nichts was du nicht willst.
            </span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            Kein Shopify für den Shop, kein Mailchimp für den Newsletter, kein
            WPML für die Übersetzung, kein Analytics-Dschungel für die
            Statistik. Alles an einem Ort, alles aufeinander abgestimmt, alles
            von mir gewartet.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.titel}
              className="glass rounded-xl p-6 flex flex-col gap-3 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink/80">
                {f.stichwort}
              </span>
              <h3 className="heading-sans text-[17px] text-offwhite leading-snug">
                {f.titel}
              </h3>
              <p className="text-[13px] leading-relaxed text-offwhite/55">
                {f.beschreibung}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
