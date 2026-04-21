const USPS: { wert: string; label: string; note: string }[] = [
  {
    wert: "95+",
    label: "PageSpeed",
    note: "Mobile und Desktop. Messbar, kein Versprechen.",
  },
  {
    wert: "0",
    label: "Cookie-Banner",
    note: "Keine Tracker. Keine Banner. Kein Nerv.",
  },
  {
    wert: "1",
    label: "Ansprechpartner",
    note: "Ich baue, ich antworte, ich bleibe.",
  },
  {
    wert: "∞",
    label: "Plugins",
    note: "Null. Gebaut statt zusammengeklickt.",
  },
];

export function UspStrip() {
  return (
    <section className="pb-20">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 rounded-xl overflow-hidden border border-ink/10">
          {USPS.map((u) => (
            <div
              key={u.label}
              className="bg-dark/40 px-6 py-7 md:py-8 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <div className="heading-display text-[clamp(2.25rem,5vw,3.5rem)] text-accent-ink leading-none">
                  {u.wert}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {u.label}
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-snug text-offwhite/55">
                {u.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
