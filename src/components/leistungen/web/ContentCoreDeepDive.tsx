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
      "lädst du ein foto hoch, beschreibt die KI automatisch was drauf ist, in allen sprachen. google dankt, screenreader auch. für texte gibt's tippfehler-, grammatik- und stil-hinweise direkt im editor.",
  },
  {
    titel: "ein klick übersetzt alles",
    stichwort: "02 · mehrsprachig",
    beschreibung:
      "deutsch, französisch, niederländisch, englisch, was du brauchst. KI macht den groben wurf, du schleifst nach. jede sprache hat eigene URL, eigene SEO, eigenen übersetzungsstatus.",
  },
  {
    titel: "bilder, die sich selbst optimieren",
    stichwort: "03 · performance",
    beschreibung:
      "foto hochladen, fertig. contentcore wandelt in webp (30% kleiner), schneidet fünf grössen für handy bis desktop, und bei bildermonstern wie fotograf:innen landet alles im cloud-speicher.",
  },
  {
    titel: "newsletter direkt im system",
    stichwort: "04 · kontakt",
    beschreibung:
      "kein mailchimp-abo mehr. drag-&-drop-editor, abonnenten-verwaltung, öffnungsraten, versand geplant oder sofort, alles in contentcore.",
  },
  {
    titel: "shop ohne shopify",
    stichwort: "05 · verkauf",
    beschreibung:
      "produkte, varianten, lagerbestand, stripe-checkout mit apple pay und SEPA. 1,5% + 25 cent pro transaktion, keine shopify-grundgebühr.",
  },
  {
    titel: "versionsverlauf als sicherheitsnetz",
    stichwort: "06 · ruhe",
    beschreibung:
      "alle 30 sekunden automatisch speichern. jede änderung bleibt in der historie, du kannst jederzeit zurück. wenn zwei gleichzeitig am selben artikel sind, warnt das system, bevor was doppelt entsteht.",
  },
  {
    titel: "redaktionskalender",
    stichwort: "07 · planung",
    beschreibung:
      "monats- und wochenansicht, artikel per drag & drop verschieben, farbcodiert nach inhaltstyp. für alle, die mehr als drei posts im jahr machen.",
  },
  {
    titel: "jahresrückblick, automatisch",
    stichwort: "08 · gimmick",
    beschreibung:
      "jedes jahr am 1. dezember bekommt jeder kunde eine animierte story, wie bei instagram, nur für deine seite. meistgelesener artikel, bester monat, total-besucher. teilbar, vollautomatisch.",
  },
  {
    titel: "dein branding, nicht meins",
    stichwort: "09 · white-label",
    beschreibung:
      "im contentcore siehst du dein logo, deine firmenfarben, deinen namen. das wort „contentcore\" taucht nirgends auf. es fühlt sich an wie dein eigenes system, weil es das ist.",
  },
  {
    titel: "statistiken ohne spionage",
    stichwort: "10 · ehrlich",
    beschreibung:
      "keine cookies, kein google analytics, kein banner. du siehst trotzdem: besucherzahl, top-seiten, geräteverteilung, herkunft. sauber, DSGVO-konform, ohne ballast.",
  },
];

export function ContentCoreDeepDive() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num="08">was contentcore alles kann</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            ein system.{" "}
            <span className="text-offwhite/35">
              alles was du brauchst, nichts was du nicht willst.
            </span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/60">
            kein shopify für den shop, kein mailchimp für den newsletter, kein
            WPML für die übersetzung, kein analytics-dschungel für die
            statistik. alles an einem ort, alles aufeinander abgestimmt, alles
            von mir gewartet.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.titel}
              className="rounded-xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-6 flex flex-col gap-3 hover:border-lime/25 transition-colors"
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
