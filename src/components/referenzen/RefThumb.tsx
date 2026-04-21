import { cn } from "@/lib/cn";
import type { Referenz } from "@/data/referenzen";

type Props = {
  ref_: Referenz;
  aspect?: string;
  className?: string;
};

function monogramFor(ref_: Referenz): string {
  if (ref_.monogram) return ref_.monogram;
  // first letter of each word, max 2 chars
  const parts = ref_.name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function RefThumb({ ref_, aspect = "4 / 3", className }: Props) {
  const fg = "rgba(255,255,255,0.88)";
  const accent = "rgba(255,255,255,0.06)";

  return (
    <div
      style={{
        aspectRatio: aspect,
        background: `
          radial-gradient(ellipse at 30% 20%, ${accent} 0%, transparent 55%),
          linear-gradient(145deg, #1a1a1a 0%, #111111 60%, #0a0a0a 100%)
        `,
      }}
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center [container-type:inline-size]",
        className,
      )}
    >
      {/* subtle grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* monogram — stands in for the real logo */}
      <div
        className="relative font-display lowercase"
        style={{
          color: fg,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontSize: "clamp(2.25rem, 14cqi, 5rem)",
          lineHeight: 1,
        }}
      >
        {monogramFor(ref_)}
      </div>

      {/* konzept-badge · zeigt dass es keine live-kundenarbeit ist */}
      {!ref_.istEcht && (
        <span
          className="absolute top-2 right-2 z-[2] font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-sm bg-dark/55 text-offwhite/75 ring-1 ring-ink/15 backdrop-blur-[2px]"
          aria-label="Konzept-Studie · kein Live-Projekt"
        >
          konzept
        </span>
      )}

      {/* hair-line frame */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent}`,
        }}
      />
    </div>
  );
}

