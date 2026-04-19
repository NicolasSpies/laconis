import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebDeliverables — was du am launch-tag konkret bekommst.
 * 3 gruppen: die seite selbst / dein zugang / der übergang von alt zu neu.
 */

type Item = { label: string; meta?: string };

const GROUPS: { titel: string; sub: string; items: Item[] }[] = [
  {
    titel: "die website",
    sub: "technisch sauber. sofort belastbar.",
    items: [
      { label: "live auf deiner domain", meta: "HTTPS · EU-edge · CDN" },
      { label: "pagespeed 95+", meta: "lighthouse-report im repo" },
      { label: "responsive getestet", meta: "desktop · tablet · mobile · safari/chrome/firefox" },
      { label: "SEO-basis", meta: "sitemap · robots.txt · schema-markup · meta-tags" },
      { label: "cookie-freie analytics", meta: "plausible oder umami • DSGVO-konform" },
    ],
  },
  {
    titel: "dein zugang",
    sub: "damit du die seite selbst führst.",
    items: [
      { label: "contentcore admin-login", meta: "dein eigenes cms, dein passwort" },
      { label: "45-min video-einweisung", meta: "live per zoom + aufgezeichnet" },
      { label: "support unbefristet", meta: "fragen per email, immer kostenlos" },
      { label: "mehrsprachig einpflegen", meta: "wenn nötig: deutsch · français · english" },
    ],
  },
  {
    titel: "der übergang",
    sub: "von der alten seite, nahtlos.",
    items: [
      { label: "301-redirects", meta: "alle alten URLs → neue struktur" },
      { label: "google search console", meta: "verknüpft, sitemap eingereicht" },
      { label: "kontaktformular", meta: "direkt an deine mail, spam-geschützt" },
      { label: "DNS-umschaltung vorbereitet", meta: "du drückst den knopf, ich stehe daneben" },
      { label: "alte seite bleibt online", meta: "bis die neue wirklich läuft" },
    ],
  },
];

export function WebDeliverables() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num="05">deliverables</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            was du am launch-tag{" "}
            <span className="text-offwhite/35">wirklich in der hand hast.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/60">
            keine „datei schicke ich dir nächste woche". am launch-tag ist
            alles da • technisch sauber, eingerichtet, erklärt. du drückst den
            knopf, die seite ist live.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-2xl overflow-hidden">
          {GROUPS.map((g) => (
            <div key={g.titel} className="bg-dark p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <h3 className="heading-sans text-[18px] text-offwhite">
                  {g.titel}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {g.items.length} punkte
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-offwhite/45">
                {g.sub}
              </p>

              <ul className="mt-6 space-y-4">
                {g.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="group flex items-start gap-3 pb-4 border-b border-ink/6 last:border-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-[6px] w-[6px] rounded-full bg-accent-ink shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-offwhite leading-snug">
                        {it.label}
                      </p>
                      {it.meta && (
                        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-mono text-offwhite/40">
                          {it.meta}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[640px] text-[13px] leading-relaxed text-offwhite/45">
          alles dokumentiert in einem geteilten ordner. du hast volle
          transparenz • was ich gebaut habe, wie&apos;s läuft, wo was liegt.
        </p>
      </div>
    </section>
  );
}
