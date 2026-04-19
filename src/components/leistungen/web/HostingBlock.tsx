import { SectionLabel } from "@/components/ui/SectionLabel";

const STUFEN = [
  {
    name: "onepager",
    preis: "20 €",
    pro: "monat",
    was: "eine seite, edge-cloud, tägliches backup.",
  },
  {
    name: "multipager",
    preis: "30 €",
    pro: "monat",
    was: "bis zehn seiten, mehr last-reserve, gleiche stabilität.",
  },
  {
    name: "mit CMS",
    preis: "40 €",
    pro: "monat",
    was: "contentcore auf eigener VPS-instanz, admin-zugang für dich.",
  },
];

const SHARED_VS = [
  {
    thema: "nachbarn",
    shared:
      "100 – 1.000 fremde kunden auf demselben blech, jeder klaut leistung.",
    laconis:
      "eigener VPS nur für deine contentcore-instanz. kein nachbar, keine ablenkung.",
  },
  {
    thema: "CPU & RAM",
    shared:
      "überbucht. wenn der nachbar traffic hat, wird deine seite langsam.",
    laconis:
      "dedizierte ressourcen, garantiert, immer da.",
  },
  {
    thema: "IP-adresse",
    shared:
      "geteilte IP. wenn ein nachbar spam oder malware verteilt, landest du mit auf blacklists.",
    laconis:
      "eigene IP. reputation gehört dir.",
  },
  {
    thema: "frontend-speed",
    shared:
      "ein server in irgendeinem rechenzentrum bedient jeden besucher weltweit.",
    laconis:
      "frontend läuft auf globaler edge. besucher in brüssel bekommt die seite aus brüssel.",
  },
  {
    thema: "PHP vs. statisch",
    shared:
      "jeder pageload rechnet PHP, fragt datenbank ab, macht neun plugin-hooks.",
    laconis:
      "seite ist vor-gerendert. auslieferung ist reine datei, kein rechenvorgang.",
  },
  {
    thema: "skalierung",
    shared:
      "virales posting legt die seite lahm. hoster meldet sich am nächsten werktag.",
    laconis:
      "edge skaliert automatisch. 10 oder 10.000 besucher gleichzeitig, derselbe load.",
  },
  {
    thema: "wartung",
    shared:
      "sicherheits-updates sind deine sache, oft vergessen, oft zu spät.",
    laconis:
      "ich update automatisch im hintergrund. du merkst davon nichts.",
  },
  {
    thema: "datenhoheit",
    shared:
      "oft US-unternehmen mit multi-hop-routing. datenschutz: glücksspiel.",
    laconis:
      "VPS in litauen (EU), edge mit EU-routing. DSGVO von anfang an.",
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
      <g stroke="rgba(225,253,82,0.3)" strokeWidth="1" strokeDasharray="3 3">
        <line x1="220" y1="140" x2="300" y2="140" />
        <line x1="460" y1="140" x2="540" y2="140" />
      </g>
      {/* Lime pulses moving left to right */}
      <g>
        <circle r="3" fill="#E1FD52">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="2" fill="#E1FD52" opacity="0.6">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="3" fill="#E1FD52">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 460 140 L 540 140" />
        </circle>
        <circle r="2" fill="#E1FD52" opacity="0.6">
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
        <rect x="122" y="110" width="1.5" height="15" fill="#E1FD52">
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
        <rect x="48" y="204" width="70" height="18" rx="3" fill="#E1FD52" />
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
        <rect x="300" y="50" width="160" height="180" rx="12" fill="#0d0d0d" stroke="rgba(225,253,82,0.28)" />
        <text x="316" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(225,253,82,0.7)">
          02 · daten reisen
        </text>

        {/* Packet visual - rotating braces */}
        <g transform="translate(380, 130)">
          <circle r="42" fill="none" stroke="rgba(225,253,82,0.12)" strokeDasharray="2 4" />
          <circle r="30" fill="none" stroke="rgba(225,253,82,0.08)" />
          <text
            x="0"
            y="6"
            fontFamily="ui-monospace, monospace"
            fontSize="26"
            fontWeight="700"
            fill="#E1FD52"
            textAnchor="middle"
            letterSpacing="-0.05em"
          >
            {"{ }"}
          </text>
          {/* Orbiting packets */}
          <g>
            <rect x="-4" y="-46" width="8" height="5" rx="1" fill="#E1FD52" opacity="0.8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="-4" y="-46" width="6" height="4" rx="1" fill="#E1FD52" opacity="0.5">
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
            müller
          </text>
          <text x="590" y="116" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" fill="#E1FD52">
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
          <rect x="566" y="170" width="60" height="14" rx="2" fill="#E1FD52" />
          <text x="596" y="180" fontFamily="ui-monospace, monospace" fontSize="6" fill="#000" textAnchor="middle" fontWeight="600">
            sortiment →
          </text>

          {/* Live tag */}
          <circle cx="704" cy="110" r="2" fill="#E1FD52">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="700" y="113" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgba(225,253,82,0.9)" textAnchor="end">
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

export function HostingBlock() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num="06">hosting</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            du änderst was.{" "}
            <span className="text-offwhite/35">
              besucher sehen es sofort.
            </span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/60">
            dein CMS, eine saubere API, die öffentliche seite. drei ebenen auf
            zwei infrastrukturen: VPS in litauen für contentcore, globale
            edge-cloud für die öffentliche seite. kein geteilter server, keine
            nachbarn, kein shared-hosting-lotto.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-6 md:p-10">
          <ServerDiagram />
        </div>

        {/* ZWEI-SERVER-ARCHITEKTUR */}
        <div className="mt-20 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/40">
            architektur · zwei getrennte infrastrukturen
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            contentcore sitzt auf dem VPS.{" "}
            <span className="text-offwhite/35">
              deine website sitzt auf der edge.
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/60">
            das backend hat andere bedürfnisse als das frontend. ich trenne
            beides bewusst, damit jede ebene genau das bekommt, was sie braucht.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-ink/10 bg-ink/[0.015] p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              backend · VPS
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              contentcore auf hostinger cloud KVM · litauen (EU)
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/60 leading-relaxed">
              <li>· eigene maschine, dedizierte CPU und RAM</li>
              <li>
                · PostgreSQL auf demselben server, kein netzwerk-hop bei
                datenbankzugriffen
              </li>
              <li>· EU-standort, DSGVO-konform, kein US-cloud-routing</li>
              <li>· firewall, SSH-key-only, fail2ban, UFW</li>
              <li>· tägliche automatische backups (datenbank + uploads)</li>
              <li>· zero-downtime-deployments mit PM2-cluster</li>
            </ul>
          </div>
          <div className="rounded-xl border border-ink/10 bg-ink/[0.015] p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              frontend · cloud edge
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              next.js statisch auf globaler edge
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/60 leading-relaxed">
              <li>· deine seite liegt an hunderten standorten weltweit</li>
              <li>
                · besucher in eupen holt sie aus frankfurt, in brüssel aus
                brüssel, in paris aus paris
              </li>
              <li>
                · statisch vor-gerendert, keine PHP-runtime, keine
                datenbank-abfrage beim pageload
              </li>
              <li>
                · auto-skalierung: 10 oder 10.000 besucher gleichzeitig, derselbe
                load
              </li>
              <li>
                · HTTPS überall, immutable asset-URLs, cache 1 jahr
              </li>
              <li>
                · änderung im CMS? automatischer revalidate-webhook, seite ist
                in sekunden aktuell
              </li>
            </ul>
          </div>
        </div>

        {/* SHARED HOSTING VERGLEICH */}
        <div className="mt-24 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/40">
            vergleich · shared hosting vs. dedizierte infrastruktur
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            warum shared hosting{" "}
            <span className="text-offwhite/35">
              für eine ernsthafte website keine option ist.
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/60">
            10 € pro monat klingt günstig, bis du siehst, was in den 10 € fehlt.
            hier der direkte vergleich.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent overflow-hidden">
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
                  shared hosting
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/8">
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
              <div className="px-5 py-5 border-l border-ink/8">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-red-400/70 mt-0.5 shrink-0">
                    ⚠
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/55">
                    {r.shared}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/8">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/85">
                    {r.laconis}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stufen */}
        <div className="mt-24 max-w-[720px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/40">
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
              className="rounded-xl border border-ink/10 bg-ink/[0.015] p-6 flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="heading-sans text-[18px] text-offwhite">
                  {s.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="heading-display text-[22px] text-accent-ink leading-none">
                    {s.preis}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
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
