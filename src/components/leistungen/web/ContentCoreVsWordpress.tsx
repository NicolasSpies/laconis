import { SectionLabel } from "@/components/ui/SectionLabel";

type Row = {
  thema: string;
  wordpress: string;
  contentcore: string;
};

const ROWS: Row[] = [
  {
    thema: "sicherheit",
    wordpress: "Meistgehacktes CMS der Welt",
    contentcore: "4-Schichten-Schutz, 2FA, EU-Server",
  },
  {
    thema: "angriffsfläche",
    wordpress: "20+ Plugins, hunderte Endpunkte",
    contentcore: "Eine gehärtete API",
  },
  {
    thema: "updates",
    wordpress: "Manuell, wöchentlich, riskant",
    contentcore: "Automatisch, ohne dein Zutun",
  },
  {
    thema: "performance",
    wordpress: "PHP-Runtime + Plugin-Bloat",
    contentcore: "Statisch ausgeliefert, 95+ PageSpeed",
  },
  {
    thema: "mehrsprachigkeit",
    wordpress: "Plugin (WPML) kostet extra",
    contentcore: "Eingebaut: DE · FR · EN",
  },
  {
    thema: "besucher-stats",
    wordpress: "Google Analytics + Cookie-Banner",
    contentcore: "Eingebaut, 100% DSGVO, ohne Cookies",
  },
  {
    thema: "newsletter",
    wordpress: "Mailchimp abonnieren",
    contentcore: "Direkt im System, inkl. Statistiken",
  },
  {
    thema: "online-shop",
    wordpress: "WooCommerce oder Shopify extra",
    contentcore: "Direkt integriert, Stripe-Checkout",
  },
  {
    thema: "KI-unterstützung",
    wordpress: "Nachrüst-Plugin, oft kostenpflichtig",
    contentcore: "Bild-Alt-Texte, Übersetzung, Korrektur",
  },
  {
    thema: "datenhoheit",
    wordpress: "Geteilter Server, unklare Lage",
    contentcore: "Eigene Instanz in Litauen (EU)",
  },
  {
    thema: "support",
    wordpress: "Forum, Stack Overflow, Google",
    contentcore: "Ich. Persönlich. Per Mail oder Call.",
  },
];

const SCHICHTEN = [
  {
    num: "01",
    name: "IP-blocking",
    beschreibung:
      "Zehn Fehlversuche und die IP ist 24 Stunden gesperrt. Bei Wiederholung permanent.",
  },
  {
    num: "02",
    name: "geräteerkennung",
    beschreibung:
      "Auch über VPN erkennt das System das Gerät und bleibt dicht.",
  },
  {
    num: "03",
    name: "konto-schutz",
    beschreibung:
      "Login aus neuem Land? Ich bekomme sofort eine Warnung aufs Handy.",
  },
  {
    num: "04",
    name: "zwei-faktor",
    beschreibung:
      "Passwort allein reicht nicht. Jeder Login braucht einen Code aus meiner App.",
  },
];

export function ContentCoreVsWordpress({
  num = "07",
}: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>contentcore vs. wordpress</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            der direkte vergleich.{" "}
            <span className="text-offwhite/35">ohne schönmalen.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            WordPress läuft auf 43 Prozent aller Websites. Das macht es nicht
            besser, es macht es zum Lieblingsziel für Angriffe. Hier steht,
            warum ich stattdessen ContentCore gebaut habe und was dir das im
            Alltag bringt.
          </p>
        </div>

        {/* Tabelle */}
        <div className="mt-14 glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/10 bg-ink/[0.02]">
            <div className="px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                thema
              </span>
            </div>
            <div className="px-5 py-4 border-l border-ink/10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  wordpress
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                  contentcore
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((r, i) => (
            <div
              key={r.thema}
              className={
                "grid grid-cols-[1fr_1fr_1fr] items-start hover:bg-ink/[0.015] transition-colors" +
                (i < ROWS.length - 1 ? " border-b border-ink/5" : "")
              }
            >
              <div className="px-5 py-5">
                <span className="heading-sans text-[14px] md:text-[15px] text-offwhite">
                  {r.thema}
                </span>
              </div>
              <div className="px-5 py-5 border-l border-ink/10">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-red-400/70 mt-0.5 shrink-0">
                    ⚠
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/55">
                    {r.wordpress}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/10">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/75">
                    {r.contentcore}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sicherheit: 4 Schutzschichten */}
        <div className="mt-20">
          <div className="max-w-[720px]">
            <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
              tiefer in die sicherheit
            </span>
            <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
              vier schutzschichten.{" "}
              <span className="text-offwhite/35">
                nicht eine einzige davon bekommst du in wordpress ohne plugin.
              </span>
            </h3>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCHICHTEN.map((s) => (
              <div
                key={s.num}
                className="glass rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
              >
                <div
                  className="absolute -top-4 -right-4 h-16 w-16 rounded-full blur-2xl pointer-events-none"
                  style={{ background: "rgb(var(--accent) / 0.05)" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  {s.num}
                </span>
                <h4 className="heading-sans text-[16px] text-offwhite">
                  {s.name}
                </h4>
                <p className="text-[13px] leading-relaxed text-offwhite/55">
                  {s.beschreibung}
                </p>
              </div>
            ))}
          </div>

          {/* Bonus badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Passwörter verschlüsselt",
              "HTTPS überall",
              "Server in der EU · Litauen",
              "DSGVO-konform",
              "Kein Cookie-Banner",
              "Auto-Backup täglich",
            ].map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.015] text-[12px] text-offwhite/75"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
