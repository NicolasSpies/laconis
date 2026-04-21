import { SectionLabel } from "@/components/ui/SectionLabel";

const STUFEN = [
  {
    name: "onepager",
    preis: "20 €",
    pro: "monat",
    was: "Eine Seite, Edge-Cloud, tägliches Backup.",
  },
  {
    name: "multipager",
    preis: "30 €",
    pro: "monat",
    was: "Bis zehn Seiten, mehr Last-Reserve, gleiche Stabilität.",
  },
  {
    name: "mit CMS",
    preis: "40 €",
    pro: "monat",
    was: "ContentCore auf eigener VPS-Instanz, Admin-Zugang für dich.",
  },
];

const SHARED_VS = [
  {
    thema: "nachbarn",
    shared:
      "100 – 1.000 fremde Kunden auf demselben Blech, jeder klaut Leistung.",
    laconis:
      "Eigener VPS nur für deine ContentCore-Instanz. Kein Nachbar, keine Ablenkung.",
  },
  {
    thema: "CPU & RAM",
    shared:
      "Überbucht. Wenn der Nachbar Traffic hat, wird deine Seite langsam.",
    laconis:
      "Dedizierte Ressourcen, garantiert, immer da.",
  },
  {
    thema: "IP-adresse",
    shared:
      "Geteilte IP. Wenn ein Nachbar Spam oder Malware verteilt, landest du mit auf Blacklists.",
    laconis:
      "Eigene IP. Reputation gehört dir.",
  },
  {
    thema: "frontend-speed",
    shared:
      "Ein Server in irgendeinem Rechenzentrum bedient jeden Besucher weltweit.",
    laconis:
      "Frontend läuft auf globaler Edge. Besucher in Brüssel bekommt die Seite aus Brüssel.",
  },
  {
    thema: "PHP vs. statisch",
    shared:
      "Jeder Pageload rechnet PHP, fragt Datenbank ab, macht neun Plugin-Hooks.",
    laconis:
      "Seite ist vor-gerendert. Auslieferung ist reine Datei, kein Rechenvorgang.",
  },
  {
    thema: "skalierung",
    shared:
      "Virales Posting legt die Seite lahm. Hoster meldet sich am nächsten Werktag.",
    laconis:
      "Edge skaliert automatisch. 10 oder 10.000 Besucher gleichzeitig, derselbe Load.",
  },
  {
    thema: "wartung",
    shared:
      "Sicherheits-Updates sind deine Sache, oft vergessen, oft zu spät.",
    laconis:
      "Ich update automatisch im Hintergrund. Du merkst davon nichts.",
  },
  {
    thema: "datenhoheit",
    shared:
      "Oft US-Unternehmen mit Multi-Hop-Routing. Datenschutz: Glücksspiel.",
    laconis:
      "VPS in Litauen (EU), Edge mit EU-Routing. DSGVO von Anfang an.",
  },
];

function ServerDiagram() {
  return (
    <svg
      viewBox="0 0 760 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ablauf CMS zu API zu frontend"
    >
      {/* ---------- Connecting lines + pulses ---------- */}
      <g stroke="rgb(var(--accent) / 0.3)" strokeWidth="1" strokeDasharray="3 3">
        <line x1="220" y1="140" x2="300" y2="140" />
        <line x1="460" y1="140" x2="540" y2="140" />
      </g>
      {/* Lime pulses moving left to right */}
      <g>
        <circle r="3" fill="rgb(var(--accent))">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="2" fill="rgb(var(--accent))" opacity="0.6">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="3" fill="rgb(var(--accent))">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 460 140 L 540 140" />
        </circle>
        <circle r="2" fill="rgb(var(--accent))" opacity="0.6">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 460 140 L 540 140" />
        </circle>
      </g>

      {/* ================ 01 CMS ================ */}
      <g>
        <rect x="30" y="50" width="190" height="180" rx="12" fill="#0d0d0d" stroke="rgba(255,255,255,0.1)" />
        <text x="48" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          01 · du bearbeitest
        </text>

        {/* Editor label */}
        <text x="48" y="100" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.4)">
          überschrift
        </text>
        {/* Input field with content */}
        <rect x="48" y="106" width="154" height="22" rx="3" fill="#050505" stroke="rgba(255,255,255,0.08)" />
        <text x="56" y="121" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#F2F2F2">
          brot das riecht
        </text>
        {/* Cursor */}
        <rect x="122" y="110" width="1.5" height="15" fill="rgb(var(--accent))">
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>

        {/* Paragraph label */}
        <text x="48" y="150" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.4)">
          text
        </text>
        <rect x="48" y="156" width="154" height="38" rx="3" fill="#050505" stroke="rgba(255,255,255,0.08)" />
        <text x="56" y="170" fontFamily="system-ui, sans-serif" fontSize="9" fill="rgba(242,242,242,0.6)">
          seit 1962, jeden morgen
        </text>
        <text x="56" y="184" fontFamily="system-ui, sans-serif" fontSize="9" fill="rgba(242,242,242,0.6)">
          ab vier uhr. in eupen.
        </text>

        {/* Save button */}
        <rect x="48" y="204" width="70" height="18" rx="3" fill="rgb(var(--accent))" />
        <text x="83" y="216" fontFamily="ui-monospace, monospace" fontSize="8" fill="#000" textAnchor="middle" fontWeight="600">
          speichern
        </text>
        <circle cx="54" cy="213" r="3" fill="#000">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ================ 02 API ================ */}
      <g>
        <rect x="300" y="50" width="160" height="180" rx="12" fill="#0d0d0d" stroke="rgb(var(--accent) / 0.28)" />
        <text x="316" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgb(var(--accent) / 0.7)">
          02 · daten reisen
        </text>

        {/* Packet visual - rotating braces */}
        <g transform="translate(380, 130)">
          <circle r="42" fill="none" stroke="rgb(var(--accent) / 0.12)" strokeDasharray="2 4" />
          <circle r="30" fill="none" stroke="rgb(var(--accent) / 0.08)" />
          <text
            x="0"
            y="6"
            fontFamily="ui-monospace, monospace"
            fontSize="26"
            fontWeight="700"
            fill="rgb(var(--accent))"
            textAnchor="middle"
            letterSpacing="-0.05em"
          >
            {"{ }"}
          </text>
          {/* Orbiting packets */}
          <g>
            <rect x="-4" y="-46" width="8" height="5" rx="1" fill="rgb(var(--accent))" opacity="0.8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="-4" y="-46" width="6" height="4" rx="1" fill="rgb(var(--accent))" opacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="90"
                to="450"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </g>

        <text x="380" y="200" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.5)" textAnchor="middle">
          GET /inhalt
        </text>
        <text x="380" y="214" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.3)" textAnchor="middle">
          verschlüsselt · schnell · automatisch
        </text>
      </g>

      {/* ================ 03 Frontend ================ */}
      <g>
        <rect x="540" y="50" width="190" height="180" rx="12" fill="#0d0d0d" stroke="rgba(255,255,255,0.1)" />
        <text x="558" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          03 · besucher sieht
        </text>

        {/* Mini website mock */}
        <g>
          {/* Browser bar */}
          <rect x="558" y="88" width="154" height="130" rx="4" fill="#050505" stroke="rgba(255,255,255,0.08)" />
          {/* URL bar */}
          <rect x="558" y="88" width="154" height="14" fill="#0a0a0a" />
          <circle cx="566" cy="95" r="1.5" fill="#2a2a2a" />
          <circle cx="572" cy="95" r="1.5" fill="#2a2a2a" />
          <circle cx="578" cy="95" r="1.5" fill="#2a2a2a" />

          {/* Nav */}
          <text x="566" y="116" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" fill="#F2F2F2">
            atelier
          </text>
          <text x="590" y="116" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" fill="rgb(var(--accent))">
            .
          </text>

          {/* Hero headline */}
          <text
            x="566"
            y="144"
            fontFamily="system-ui, sans-serif"
            fontSize="12"
            fontWeight="900"
            fill="#F2F2F2"
            letterSpacing="-0.03em"
          >
            brot das riecht
          </text>

          {/* Body lines */}
          <rect x="566" y="152" width="120" height="2.5" rx="1" fill="rgba(242,242,242,0.25)" />
          <rect x="566" y="158" width="100" height="2.5" rx="1" fill="rgba(242,242,242,0.25)" />

          {/* CTA */}
          <rect x="566" y="170" width="60" height="14" rx="2" fill="rgb(var(--accent))" />
          <text x="596" y="180" fontFamily="ui-monospace, monospace" fontSize="6" fill="#000" textAnchor="middle" fontWeight="600">
            sortiment →
          </text>

          {/* Live tag */}
          <circle cx="704" cy="110" r="2" fill="rgb(var(--accent))">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="700" y="113" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgb(var(--accent) / 0.9)" textAnchor="end">
            live
          </text>

          {/* Image placeholder */}
          <rect x="566" y="198" width="140" height="14" rx="2" fill="url(#frontend-photo)" />
          <defs>
            <linearGradient id="frontend-photo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d28c46" />
              <stop offset="1" stopColor="#3a2414" />
            </linearGradient>
          </defs>
        </g>
      </g>

      {/* Bottom label */}
      <text x="380" y="264" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.35)" textAnchor="middle">
        hostinger cloud · eigene instanz · tägliche backups · SSL · monitoring
      </text>
    </svg>
  );
}

export function HostingBlock({ num = "06" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>hosting</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            du änderst was.{" "}
            <span className="text-offwhite/35">
              besucher sehen es sofort.
            </span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
            Dein CMS, eine saubere API, die öffentliche Seite. Drei Ebenen auf
            zwei Infrastrukturen: VPS in Litauen für ContentCore, globale
            Edge-Cloud für die öffentliche Seite. Kein geteilter Server, keine
            Nachbarn, kein Shared-Hosting-Lotto.
          </p>
        </div>

        <div className="mt-14 glass rounded-2xl p-6 md:p-10">
          <ServerDiagram />
        </div>

        {/* ZWEI-SERVER-ARCHITEKTUR */}
        <div className="mt-20 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            architektur · zwei getrennte infrastrukturen
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            contentcore sitzt auf dem VPS.{" "}
            <span className="text-offwhite/35">
              deine website sitzt auf der edge.
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
            Das Backend hat andere Bedürfnisse als das Frontend. Ich trenne
            beides bewusst, damit jede Ebene genau das bekommt, was sie braucht.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              backend · VPS
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              contentcore auf hostinger cloud KVM · litauen (EU)
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/55 leading-relaxed">
              <li>· Eigene Maschine, dedizierte CPU und RAM</li>
              <li>
                · PostgreSQL auf demselben Server, kein Netzwerk-Hop bei
                Datenbankzugriffen
              </li>
              <li>· EU-Standort, DSGVO-konform, kein US-Cloud-Routing</li>
              <li>· Firewall, SSH-Key-only, fail2ban, UFW</li>
              <li>· Tägliche automatische Backups (Datenbank + Uploads)</li>
              <li>· Zero-Downtime-Deployments mit PM2-Cluster</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              frontend · cloud edge
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              next.js statisch auf globaler edge
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/55 leading-relaxed">
              <li>· Deine Seite liegt an hunderten Standorten weltweit</li>
              <li>
                · Besucher in Eupen holt sie aus Frankfurt, in Brüssel aus
                Brüssel, in Paris aus Paris
              </li>
              <li>
                · Statisch vor-gerendert, keine PHP-Runtime, keine
                Datenbank-Abfrage beim Pageload
              </li>
              <li>
                · Auto-Skalierung: 10 oder 10.000 Besucher gleichzeitig, derselbe
                Load
              </li>
              <li>
                · HTTPS überall, immutable Asset-URLs, Cache 1 Jahr
              </li>
              <li>
                · Änderung im CMS? Automatischer Revalidate-Webhook, Seite ist
                in Sekunden aktuell
              </li>
            </ul>
          </div>
        </div>

        {/* SHARED HOSTING VERGLEICH */}
        <div className="mt-24 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            vergleich · shared hosting vs. dedizierte infrastruktur
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            warum shared hosting{" "}
            <span className="text-offwhite/35">
              für eine ernsthafte website keine option ist.
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
            10 € pro Monat klingt günstig, bis du siehst, was in den 10 € fehlt.
            Hier der direkte Vergleich.
          </p>
        </div>

        <div className="mt-10 glass rounded-2xl overflow-hidden">
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
                  shared hosting
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                  VPS + edge
                </span>
              </div>
            </div>
          </div>
          {SHARED_VS.map((r, i) => (
            <div
              key={r.thema}
              className={
                "grid grid-cols-[1fr_1fr_1fr] items-start hover:bg-ink/[0.015] transition-colors" +
                (i < SHARED_VS.length - 1 ? " border-b border-ink/5" : "")
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
                    {r.shared}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/10">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/75">
                    {r.laconis}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stufen */}
        <div className="mt-24 max-w-[720px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            preise · hosting als monatsbeitrag
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            drei stufen.{" "}
            <span className="text-offwhite/35">
              du zahlst nur für das, was du brauchst.
            </span>
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {STUFEN.map((s) => (
            <div
              key={s.name}
              className="glass rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="heading-sans text-[18px] text-offwhite">
                  {s.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="heading-display text-[22px] text-accent-ink leading-none">
                    {s.preis}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                    / {s.pro}
                  </span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-offwhite/55">
                {s.was}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
