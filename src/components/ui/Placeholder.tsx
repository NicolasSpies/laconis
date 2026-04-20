import { cn } from "@/lib/cn";

type Props = {
  label?: string;
  className?: string;
  aspect?: string;
};

export function Placeholder({ label, className, aspect }: Props) {
  return (
    <div
      style={aspect ? { aspectRatio: aspect } : undefined}
      className={cn(
        "tick-corner group relative w-full overflow-hidden rounded-lg",
        "bg-gradient-to-br from-ink/[0.04] via-ink/[0.02] to-transparent",
        "border border-ink/10",
        className,
      )}
    >
      {/* noise */}
      <div aria-hidden className="absolute inset-0 noise opacity-[0.08]" />

      {/* soft lime wash */}
      <div
        aria-hidden
        className="absolute -top-1/3 -right-1/4 w-[70%] h-[70%] rounded-full bg-lime/[0.08] blur-[80px]"
      />

      {/* crosshair + diagonal */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full text-ink/[0.06]"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* center dot */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lime/50 shadow-[0_0_16px_rgba(225,253,82,0.6)]"
      />

      {/* label — bottom-left corner */}
      {label && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-lime" />
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            {label}
          </span>
        </div>
      )}

      {/* top-right dimension label — fake design-tool vibe */}
      <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-label text-offwhite/25">
        {aspect ?? "auto"}
      </div>
    </div>
  );
}
