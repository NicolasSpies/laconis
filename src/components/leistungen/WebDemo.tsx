"use client";

/**
 * WebDemo — FRAMELESS · spiegel zu GrafikDemo.
 * "web" als großer zentrierter wordmark, drumherum verstreute web-glyphen:
 * tag-bracket, url-pill, pagespeed-badge, cursor, responsive-frame,
 * code-bars, token-chips. hover → alle elemente driften radial nach außen.
 */

export function WebDemo() {
  return (
    <div className="relative w-full aspect-[5/4] select-none">
      {/* ambient glow */}
      <div
        className="absolute inset-0 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(225 253 82 / 0.10), transparent 62%)",
        }}
      />

      {/* fixpunkt · center wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h3
          className="heading-display text-offwhite leading-[0.9] text-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)", letterSpacing: "-0.035em" }}
        >
          web
          <span className="inline-block w-[3px] h-[0.7em] align-middle ml-[2px] bg-lime animate-pulse" />
        </h3>
      </div>

      {/* 1 · tag-bracket </> · oben links */}
      <Floater
        className="top-[16%] left-[20%]"
        hover="group-hover:-translate-x-9 group-hover:-translate-y-6 group-hover:rotate-[-14deg]"
        base="rotate-[-4deg]"
      >
        <span
          className="heading-display text-lime/80"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
        >
          {"</>"}
        </span>
      </Floater>

      {/* 2 · url-pill · oben rechts · mini-browserzeile ohne frame */}
      <Floater
        className="top-[12%] right-[18%]"
        hover="group-hover:translate-x-10 group-hover:-translate-y-5 group-hover:rotate-[16deg]"
        base="rotate-[6deg]"
      >
        <div className="inline-flex items-center gap-1.5 px-2 md:px-2.5 py-1 md:py-1.5 rounded-full border border-ink/10 bg-ink/25 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
          <span className="font-mono text-[7px] md:text-[9px] text-offwhite/75">
            deine-marke.be
          </span>
        </div>
      </Floater>

      {/* 3 · responsive-breakpoint frame · outline, oben rechts außenrum */}
      <Floater
        className="top-[26%] right-[28%]"
        hover="group-hover:translate-x-6 group-hover:-translate-y-3 group-hover:rotate-[20deg]"
        base="rotate-[9deg]"
      >
        <div className="w-8 h-5 md:w-11 md:h-7 border border-offwhite/35 rounded-[2px] relative">
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 md:w-3 md:h-1.5 bg-offwhite/35 rounded-b-[1px]" />
        </div>
      </Floater>

      {/* 4 · cursor-pfeil · links unten mitte */}
      <Floater
        className="top-[50%] left-[18%]"
        hover="group-hover:-translate-x-9 group-hover:translate-y-3 group-hover:rotate-[-24deg]"
        base="rotate-[-12deg]"
      >
        <svg
          className="w-5 h-5 md:w-7 md:h-7 text-accent-ink"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M5 3 L19 12 L12 13 L9 20 Z" />
        </svg>
      </Floater>

      {/* 5 · code-bars · rechts mitte · 3 zeilen */}
      <Floater
        className="top-[48%] right-[16%]"
        hover="group-hover:translate-x-9 group-hover:-translate-y-2 group-hover:rotate-[14deg]"
        base="rotate-[5deg]"
      >
        <div className="flex flex-col gap-1 md:gap-1.5">
          <span className="block h-1 md:h-1.5 w-10 md:w-14 rounded-sm bg-lime/80" />
          <span className="block h-1 md:h-1.5 w-7 md:w-10 rounded-sm bg-offwhite/35" />
          <span className="block h-1 md:h-1.5 w-11 md:w-16 rounded-sm bg-offwhite/25" />
        </div>
      </Floater>

      {/* 6 · pagespeed-badge · unten links · lime-kreis mit "98" */}
      <Floater
        className="bottom-[22%] left-[20%]"
        hover="group-hover:-translate-x-10 group-hover:translate-y-5 group-hover:rotate-[-22deg]"
        base="rotate-[-6deg]"
      >
        <div className="flex items-center gap-1.5 md:gap-2 px-1.5 md:px-2 py-1 md:py-1.5 rounded-full bg-ink/25 border border-lime/25 shadow-[0_10px_24px_-10px_rgba(225,253,82,0.4)]">
          <div
            className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"
            style={{ background: "#E1FD52" }}
          >
            <span
              className="font-mono text-[6px] md:text-[7px] font-bold"
              style={{ color: "#0a0a0a" }}
            >
              98
            </span>
          </div>
          <span className="font-mono text-[6px] md:text-[8px] uppercase tracking-label text-offwhite/55">
            pagespeed
          </span>
        </div>
      </Floater>

      {/* 7 · token-chips · als cluster (wie palette bei grafik), leicht gekippt */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 transition-transform duration-[700ms] ease-out group-hover:translate-y-5 group-hover:rotate-[6deg]">
        <div
          className="flex gap-1 md:gap-1.5"
          style={{ transform: "rotate(4deg)" }}
        >
          {[
            { label: "--brand", tilt: "rotate(-3deg)" },
            { label: "--ink", tilt: "rotate(2deg)" },
            { label: "--accent", tilt: "rotate(-4deg)" },
          ].map((t, i) => (
            <span
              key={t.label}
              className="font-mono text-[6px] md:text-[8px] uppercase tracking-label px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm border border-ink/25 bg-ink/25 text-offwhite/55 transition-all duration-[500ms] ease-out"
              style={{
                transform: t.tilt,
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* 8 · dot-trio (loading-indicator-vibe) · rechts mitte-unten */}
      <div className="absolute top-[66%] right-[34%] flex gap-1 transition-transform duration-[600ms] group-hover:translate-y-2 group-hover:translate-x-3">
        <span className="w-1.5 h-1.5 rounded-full bg-lime" />
        <span className="w-1.5 h-1.5 rounded-full bg-offwhite/35" />
        <span className="w-1.5 h-1.5 rounded-full bg-offwhite/20" />
      </div>

      {/* 9 · caret-hash · oben mitte, klein · deutet auf anchor */}
      <Floater
        className="top-[28%] left-[42%]"
        hover="group-hover:-translate-x-5 group-hover:-translate-y-4 group-hover:rotate-[-18deg]"
        base="rotate-[-6deg]"
      >
        <span
          className="heading-display text-offwhite/35"
          style={{ fontSize: "clamp(1rem, 2.4vw, 1.6rem)", letterSpacing: "-0.04em" }}
        >
          #
        </span>
      </Floater>
    </div>
  );
}

/**
 * Floater — wrapper mit base-rotation (inline) + group-hover-transforms (classes).
 * Tailwind transforms außen composed, inline base-rotation innen.
 */
function Floater({
  className,
  base,
  hover,
  children,
}: {
  className?: string;
  base: string;
  hover: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "absolute transition-transform duration-[700ms] ease-out",
        hover,
        className ?? "",
      ].join(" ")}
    >
      <div className={["transition-transform duration-[700ms] ease-out", base].join(" ")}>
        {children}
      </div>
    </div>
  );
}
