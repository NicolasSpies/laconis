// SVG-Mocks für ContentCore. Alles im Laconis-Dark-Look,
// solange keine echten Screenshots geliefert sind.

export function DashboardMock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Dashboard Mock"
    >
      {/* Laptop-Basis */}
      <defs>
        <linearGradient id="screen-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f0f0f" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="laptop-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      {/* Rahmen */}
      <rect x="18" y="12" width="684" height="400" rx="14" fill="url(#laptop-frame)" stroke="rgba(255,255,255,0.08)" />
      {/* Screen */}
      <rect x="30" y="24" width="660" height="376" rx="6" fill="url(#screen-bg)" />
      {/* Boden */}
      <rect x="0" y="412" width="720" height="16" rx="4" fill="#141414" stroke="rgba(255,255,255,0.05)" />
      <rect x="300" y="412" width="120" height="6" rx="3" fill="#222" />

      {/* Top bar inside screen */}
      <g>
        <rect x="30" y="24" width="660" height="36" fill="#0d0d0d" />
        <circle cx="48" cy="42" r="4" fill="#2a2a2a" />
        <circle cx="62" cy="42" r="4" fill="#2a2a2a" />
        <circle cx="76" cy="42" r="4" fill="#2a2a2a" />
        <text x="100" y="46" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(242,242,242,0.5)">
          cms.laconis.be / dashboard
        </text>
        <rect x="640" y="34" width="32" height="16" rx="3" fill="rgb(var(--accent) / 0.12)" stroke="rgb(var(--accent) / 0.35)" />
        <text x="656" y="45" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgb(var(--accent))" textAnchor="middle">
          live
        </text>
      </g>

      {/* Sidebar */}
      <g>
        <rect x="30" y="60" width="160" height="340" fill="#0a0a0a" />
        <text x="50" y="86" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(242,242,242,0.85)" fontWeight="600">
          laconis · cms
        </text>

        {[
          { y: 118, label: "Startseite", active: true },
          { y: 146, label: "Seiten" },
          { y: 174, label: "Medien" },
          { y: 202, label: "Menüs" },
          { y: 230, label: "Stats" },
          { y: 258, label: "Newsletter" },
          { y: 286, label: "Nutzer" },
          { y: 314, label: "Einstellungen" },
        ].map((n) => (
          <g key={n.label}>
            {n.active && (
              <rect x="42" y={n.y - 12} width="136" height="22" rx="4" fill="rgb(var(--accent) / 0.08)" />
            )}
            {n.active && (
              <rect x="42" y={n.y - 12} width="2" height="22" fill="rgb(var(--accent))" />
            )}
            <text
              x="58"
              y={n.y + 3}
              fontFamily="system-ui, sans-serif"
              fontSize="11"
              fill={n.active ? "#F2F2F2" : "rgba(242,242,242,0.5)"}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      {/* Main area */}
      <g>
        {/* Header */}
        <text x="210" y="100" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
          Übersicht
        </text>
        <text x="210" y="120" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          diese woche · 14 änderungen · 4 neue anfragen
        </text>

        {/* KPI cards */}
        {[
          { x: 210, label: "Besucher · 7 Tage", wert: "2.184" },
          { x: 370, label: "Anfragen", wert: "12" },
          { x: 530, label: "PageSpeed", wert: "96", accent: true },
        ].map((k) => (
          <g key={k.label}>
            <rect x={k.x} y="140" width="140" height="72" rx="6" fill="#101010" stroke="rgba(255,255,255,0.06)" />
            <text x={k.x + 14} y="162" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
              {k.label.toUpperCase()}
            </text>
            <text
              x={k.x + 14}
              y="196"
              fontFamily="system-ui, sans-serif"
              fontSize="24"
              fontWeight="700"
              fill={k.accent ? "rgb(var(--accent))" : "#F2F2F2"}
            >
              {k.wert}
            </text>
          </g>
        ))}

        {/* Letzte Änderungen */}
        <text x="210" y="250" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          LETZTE ÄNDERUNGEN
        </text>
        {[
          { y: 276, titel: "Startseite · Hero-Text angepasst", tag: "du" },
          { y: 306, titel: "Referenz · Fabry Baumpflege bearbeitet", tag: "du" },
          { y: 336, titel: "Medien · 4 Bilder hochgeladen", tag: "du" },
          { y: 366, titel: "Kontakt · neue Anfrage von M. Keller", tag: "form" },
        ].map((e) => (
          <g key={e.titel}>
            <rect x="210" y={e.y - 14} width="460" height="24" rx="4" fill="#0d0d0d" stroke="rgba(255,255,255,0.05)" />
            <circle cx="224" cy={e.y - 2} r="3" fill="rgb(var(--accent))" />
            <text x="236" y={e.y + 1} fontFamily="system-ui, sans-serif" fontSize="11" fill="rgba(242,242,242,0.75)">
              {e.titel}
            </text>
            <text x="640" y={e.y + 1} fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.35)" textAnchor="end">
              {e.tag}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function EditorMock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Editor Mock"
    >
      {/* Browser frame */}
      <rect x="4" y="4" width="412" height="272" rx="8" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" />
      {/* Tab bar */}
      <rect x="4" y="4" width="412" height="28" fill="#080808" />
      <circle cx="18" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="28" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="38" cy="18" r="3" fill="#2a2a2a" />
      <rect x="54" y="10" width="200" height="14" rx="3" fill="#141414" />
      <text x="62" y="20" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        cms / seiten / startseite / edit
      </text>
      <rect x="370" y="10" width="36" height="14" rx="3" fill="rgb(var(--accent) / 0.12)" stroke="rgb(var(--accent) / 0.3)" />
      <text x="388" y="20" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgb(var(--accent))" textAnchor="middle">
        speichern
      </text>

      {/* Doc title */}
      <text x="28" y="66" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
        Hero · Startseite
      </text>
      <rect x="28" y="78" width="70" height="14" rx="3" fill="rgb(var(--accent) / 0.1)" stroke="rgb(var(--accent) / 0.25)" />
      <text x="63" y="88" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgb(var(--accent))" textAnchor="middle">
        text-block
      </text>

      {/* Label + input field (headline) */}
      <text x="28" y="114" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        ÜBERSCHRIFT
      </text>
      <rect x="28" y="120" width="364" height="30" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.08)" />
      <text x="40" y="140" fontFamily="system-ui, sans-serif" fontSize="12" fill="#F2F2F2">
        say less
      </text>
      <text x="85" y="140" fontFamily="serif" fontSize="12" fontStyle="italic" fill="rgb(var(--accent) / 0.9)">
        mean more
      </text>
      <line x1="148" y1="126" x2="148" y2="144" stroke="rgb(var(--accent))" strokeWidth="1" />

      {/* Label + paragraph */}
      <text x="28" y="168" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        UNTERTITEL
      </text>
      <rect x="28" y="174" width="364" height="56" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.08)" />
      <text x="40" y="192" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        Webdesign und Branding aus Eupen.
      </text>
      <text x="40" y="208" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        Für Unternehmen die nicht wie alle
      </text>
      <text x="40" y="222" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        aussehen wollen.
      </text>

      {/* Small format bar */}
      <rect x="28" y="246" width="200" height="20" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.06)" />
      {["B", "I", "U", "·", "H1", "H2", "⌖", "🔗"].map((s, i) => (
        <text
          key={i}
          x={40 + i * 22}
          y="260"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="rgba(242,242,242,0.5)"
        >
          {s}
        </text>
      ))}
    </svg>
  );
}

export function StatsMock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Stats Mock"
    >
      {/* Frame */}
      <rect x="4" y="4" width="412" height="272" rx="8" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" />
      <rect x="4" y="4" width="412" height="28" fill="#080808" />
      <circle cx="18" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="28" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="38" cy="18" r="3" fill="#2a2a2a" />
      <rect x="54" y="10" width="180" height="14" rx="3" fill="#141414" />
      <text x="62" y="20" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        cms / stats
      </text>

      {/* Heading */}
      <text x="28" y="58" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
        Besucher · 30 Tage
      </text>
      <text x="28" y="74" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        VS. VORMONAT · +18%
      </text>

      {/* Line chart */}
      <rect x="28" y="86" width="364" height="110" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.05)" />
      {/* grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="40"
          y1={104 + i * 25}
          x2="380"
          y2={104 + i * 25}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      {/* chart path */}
      <path
        d="M 40 170 L 75 158 L 110 164 L 145 148 L 180 152 L 215 130 L 250 136 L 285 114 L 320 122 L 355 102 L 380 96"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 40 170 L 75 158 L 110 164 L 145 148 L 180 152 L 215 130 L 250 136 L 285 114 L 320 122 L 355 102 L 380 96 L 380 186 L 40 186 Z"
        fill="rgb(var(--accent) / 0.08)"
      />
      {/* Achsenbeschriftungen */}
      {["mo", "di", "mi", "do", "fr", "sa", "so"].map((d, i) => (
        <text
          key={d}
          x={55 + i * 53}
          y="200"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="rgba(242,242,242,0.3)"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}

      {/* Top Seiten */}
      <text x="28" y="224" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        TOP SEITEN
      </text>
      {[
        { y: 242, name: "/", proz: 64 },
        { y: 256, name: "/leistungen/web", proz: 38 },
      ].map((t) => (
        <g key={t.name}>
          <text x="28" y={t.y + 3} fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.75)">
            {t.name}
          </text>
          <rect x="160" y={t.y - 6} width="180" height="8" rx="2" fill="#0a0a0a" />
          <rect x="160" y={t.y - 6} width={(t.proz / 100) * 180} height="8" rx="2" fill="rgb(var(--accent) / 0.7)" />
          <text x="348" y={t.y + 3} fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.5)">
            {t.proz}%
          </text>
        </g>
      ))}
    </svg>
  );
}
