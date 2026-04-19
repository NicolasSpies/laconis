import { cn } from "@/lib/cn";
import type { Referenz } from "@/data/referenzen";

type Props = {
  ref_: Referenz;
  aspect?: string;
  className?: string;
};

function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luma > 0.65;
}

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
  const fg = isLight(ref_.farbe) ? "rgba(10,10,10,0.85)" : "rgba(255,255,255,0.92)";
  const accent = isLight(ref_.farbe) ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

  return (
    <div
      style={{
        aspectRatio: aspect,
        background: `
          radial-gradient(ellipse at 30% 20%, ${accent} 0%, transparent 55%),
          linear-gradient(145deg, ${ref_.farbe} 0%, ${ref_.farbe} 60%, ${shade(ref_.farbe, -12)} 100%)
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

// tiny colour helper — lighten/darken hex by percent
function shade(hex: string, pct: number): string {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  let r = (num >> 16) + Math.round((pct / 100) * 255);
  let g = ((num >> 8) & 0xff) + Math.round((pct / 100) * 255);
  let b = (num & 0xff) + Math.round((pct / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
