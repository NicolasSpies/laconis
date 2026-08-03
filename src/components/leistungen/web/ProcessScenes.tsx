/**
 * ProcessScenes · handgezeichnete strich-szenen für die 4 ansatz-schritte.
 *
 * gleiche bildsprache wie BrandSystemHero (wobbly hand-paths, rounded caps,
 * ink + ein accent) · KEINE standard-icons. literal + sofort lesbar für laien
 * (v2: abstrakte gabel/schlüssel raus). statisch sichtbar (kein draw-in) damit's
 * für reduced-motion + im throttled-tab korrekt rendert.
 *
 *   call     · kennenlernen → video-call-screen (gesicht im bildschirm)
 *   fork     · richtung finden → wegweiser mit zwei pfeil-schildern
 *   build    · bauen → browser-fenster + accent-block + cursor
 *   handover · übergabe → geschenk-/paket-box mit schleife (alles dir)
 */

export type SceneKind = "call" | "fork" | "build" | "handover";

export function ProcessScene({
  kind,
  stroke,
  accent,
}: {
  kind: SceneKind;
  stroke: string;
  accent: string;
}) {
  const s = {
    fill: "none",
    stroke,
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const a = { ...s, stroke: accent };

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {kind === "call" && (
        <>
          {/* bildschirm */}
          <rect x="16" y="23" width="88" height="61" rx="9" {...s} />
          {/* person im call · kopf + schultern */}
          <circle cx="60" cy="50" r="11" {...a} />
          <path d="M41 81 Q60 60 79 81" {...a} />
          {/* kamera-punkt */}
          <circle cx="95" cy="33" r="2.6" fill={accent} stroke="none" />
        </>
      )}

      {kind === "fork" && (
        <>
          {/* pfosten + boden */}
          <path d="M60 103 L60 33" {...s} />
          <path d="M49 103 L71 103" {...s} />
          {/* oberes schild → rechts · accent (gewählte richtung) */}
          <path d="M60 38 L95 38 L101 47 L95 56 L60 56 Z" {...a} />
          {/* unteres schild ← links · ink */}
          <path d="M60 61 L25 61 L19 70 L25 79 L60 79 Z" {...s} />
        </>
      )}

      {kind === "build" && (
        <>
          <rect x="17" y="25" width="86" height="68" rx="9" {...s} />
          <path d="M17 43 L103 43" {...s} />
          <circle cx="28" cy="34" r="2.2" fill={stroke} stroke="none" />
          <circle cx="36" cy="34" r="2.2" fill={stroke} stroke="none" />
          <circle cx="44" cy="34" r="2.2" fill={stroke} stroke="none" />
          <rect x="29" y="53" width="35" height="10" rx="2.5" fill={accent} stroke="none" />
          <path d="M29 73 L73 73" {...s} opacity={0.45} />
          <path d="M29 82 L58 82" {...s} opacity={0.45} />
          <path d="M80 73 L80 92 L85 86 L89 94 L93 92 L88 85 L95 84 Z" fill={stroke} stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}

      {kind === "handover" && (
        <>
          {/* box + deckel */}
          <rect x="29" y="53" width="62" height="35" rx="3" {...s} />
          <rect x="24" y="42" width="72" height="13" rx="3" {...s} />
          {/* schleifenband */}
          <path d="M60 42 L60 88" {...a} />
          {/* schleife oben */}
          <path d="M60 42 C49 31 39 38 53 45" {...a} />
          <path d="M60 42 C71 31 81 38 67 45" {...a} />
        </>
      )}
    </svg>
  );
}
