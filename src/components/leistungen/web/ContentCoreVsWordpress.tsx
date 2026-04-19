import { SectionLabel } from "@/components/ui/SectionLabel";

type Row = {
  thema: string;
  wordpress: string;
  contentcore: string;
};

const ROWS: Row[] = [
  {
    thema: "sicherheit",
    wordpress: "meistgehacktes CMS der welt",
    contentcore: "4-schichten-schutz, 2FA, EU-server",
  },
  {
    thema: "angriffsfläche",
    wordpress: "20+ plugins, hunderte endpunkte",
    contentcore: "eine gehärtete API",
  },
  {
    thema: "updates",
    wordpress: "manuell, wöchentlich, riskant",
    contentcore: "automatisch, ohne dein zutun",
  },
  {
    thema: "performance",
    wordpress: "PHP-runtime + plugin-bloat",
    contentcore: "statisch ausgeliefert, 95+ PageSpeed",
  },
  {
    thema: "mehrsprachigkeit",
    wordpress: "plugin (WPML) kostet extra",
    contentcore: "eingebaut: DE · FR · NL · EN",
  },
  {
    thema: "besucher-stats",
    wordpress: "google analytics + cookie-banner",
    contentcore: "eingebaut, 100% DSGVO, ohne cookies",
  },
  {
    thema: "newsletter",
    wordpress: "mailchimp abonnieren",
    contentcore: "direkt im system, inkl. statistiken",
  },
  {
    thema: "online-shop",
    wordpress: "woocommerce oder shopify extra",
    contentcore: "direkt integriert, stripe-checkout",
  },
  {
    thema: "KI-unterstützung",
    wordpress: "nachrüst-plugin, oft kostenpflichtig",
    contentcore: "bild-alt-texte, übersetzung, korrektur",
  },
  {
    thema: "datenhoheit",
    wordpress: "geteilter server, unklare lage",
    contentcore: "eigene instanz in litauen (EU)",
  },
  {
    thema: "support",
    wordpress: "forum, stack overflow, google",
    contentcore: "ich. persönlich. per mail oder call.",
  },
];

const SCHICHTEN = [
  {
    num: "01",
    name: "IP-blocking",
    beschreibung:
      "zehn fehlversuche und die IP ist 24 stunden gesperrt. bei wiederholung permanent.",
  },
  {
    num: "02",
    name: "geräteerkennung",
    beschreibung:
      "auch über VPN erkennt das system das gerät und bleibt dicht.",
  },
  {
    num: "03",
    name: "konto-schutz",
    beschreibung:
      "login aus neuem land? ich bekomme sofort eine warnung aufs handy.",
  },
  {
    num: "04",
    name: "zwei-faktor",
    beschreibung:
      "passwort allein reicht nicht. jeder login braucht einen code aus meiner app.",
  },
];

export function ContentCoreVsWordpress() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num="07">contentcore vs. wordpress</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            der direkte vergleich.{" "}
            <span className="text-offwhite/35">ohne schönmalen.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/60">
            wordpress läuft auf 43 prozent aller websites. das macht es nicht
            besser, es macht es zum lieblingsziel für angriffe. hier steht,
            warum ich stattdessen contentcore gebaut habe und was dir das im
            alltag bringt.
          </p>
        </div>

        {/* Tabelle */}
        <div className="mt-14 rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/10 bg-ink/[0.02]">
            <div className="px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                thema
              </span>
            </div>
            <div className="px-5 py-4 border-l border-ink/8">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/50">
                  wordpress
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/8">
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
              <div className="px-5 py-5 border-l border-ink/8">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-red-400/70 mt-0.5 shrink-0">
                    ⚠
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/55">
                    {r.wordpress}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/8">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/85">
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
                className="rounded-xl border border-ink/10 bg-ink/[0.015] p-5 flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-lime/[0.05] blur-2xl pointer-events-none" />
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
              "passwörter verschlüsselt",
              "HTTPS überall",
              "server in der EU · litauen",
              "DSGVO-konform",
              "kein cookie-banner",
              "auto-backup täglich",
            ].map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.015] text-[12px] text-offwhite/70"
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
