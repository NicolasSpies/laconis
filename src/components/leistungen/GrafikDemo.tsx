"use client";

/**
 * GrafikDemo — FRAMELESS.
 * "grafik" als großer zentrierter wordmark, drumherum lose grafische
 * elemente (swatches, shapes, mini-poster, glyphen, asterisks).
 * hover auf parent-group → alle elemente scattern radial nach außen,
 * rotieren und shiften. kein box, kein frame — freie composition.
 * elemente sind näher an den wordmark geruckt → mehr luft außen.
 */

export function GrafikDemo() {
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
          grafik
        </h3>
      </div>

      {/* SCATTER-ELEMENTS · alle absolut, mit group-hover transforms */}

      {/* 1 · lime swatch · oben links · eng */}
      <Floater
        className="top-[18%] left-[20%]"
        hover="group-hover:-translate-x-10 group-hover:-translate-y-6 group-hover:rotate-[-22deg]"
        base="rotate-[-6deg]"
      >
        <div className="w-9 h-9 md:w-12 md:h-12 bg-lime rounded-sm shadow-[0_8px_20px_-8px_rgba(225,253,82,0.4)]" />
      </Floater>

      {/* 2 · offwhite circle · oben rechts · eng */}
      <Floater
        className="top-[14%] right-[28%]"
        hover="group-hover:translate-x-8 group-hover:-translate-y-7 group-hover:rotate-[28deg]"
        base="rotate-[8deg]"
      >
        <div className="w-7 h-7 md:w-10 md:h-10 bg-offwhite/100 rounded-full" />
      </Floater>

      {/* 3 · mini-poster · oben rechts · portrait, lime */}
      <Floater
        className="top-[10%] right-[18%]"
        hover="group-hover:translate-x-12 group-hover:-translate-y-5 group-hover:rotate-[22deg]"
        base="rotate-[7deg]"
      >
        <div
          className="w-[48px] md:w-[72px] aspect-[2/3] rounded-[3px] p-1.5 md:p-2 flex flex-col justify-between shadow-[0_14px_30px_-10px_rgba(0,0,0,0.5)]"
          style={{ background: "#E1FD52" }}
        >
          <span
            className="font-mono text-[5.5px] md:text-[7px] uppercase tracking-label"
            style={{ color: "rgba(10,10,10,0.55)" }}
          >
            · poster
          </span>
          <span
            className="heading-display leading-[0.85]"
            style={{
              color: "#0a0a0a",
              fontSize: "clamp(0.55rem, 1vw, 0.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            studio
            <br />
            öffnet.
          </span>
        </div>
      </Floater>

      {/* 4 · asterisk · links neben wordmark · eng */}
      <Floater
        className="top-[46%] left-[16%]"
        hover="group-hover:-translate-x-10 group-hover:rotate-[90deg]"
        base="rotate-0"
      >
        <svg
          className="w-6 h-6 md:w-9 md:h-9 text-accent-ink"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Floater>

      {/* 5 · glyph "A" · oben links vom wordmark · weg von "grafik" */}
      <Floater
        className="top-[22%] left-[32%]"
        hover="group-hover:-translate-x-8 group-hover:-translate-y-6 group-hover:rotate-[-20deg]"
        base="rotate-[-8deg]"
      >
        <span
          className="heading-display text-offwhite/55"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)", letterSpacing: "-0.04em" }}
        >
          A
        </span>
      </Floater>

      {/* 6 · palette-group · als cluster, leicht gekippt · einzelne swatches mit minimalem tilt-versatz */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 transition-transform duration-[700ms] ease-out group-hover:translate-y-5 group-hover:rotate-[-6deg]">
        <div
          className="flex gap-1.5 md:gap-2"
          style={{ transform: "rotate(-5deg)" }}
        >
          {[
            { hex: "#E1FD52", tilt: "rotate(-3deg)" },
            { hex: "#F5F1E8", tilt: "rotate(4deg)" },
            { hex: "#8a8a8a", tilt: "rotate(-2deg)" },
            { hex: "#2a2a2a", tilt: "rotate(5deg)" },
          ].map((c, i) => (
            <div
              key={c.hex}
              className="w-4 h-4 md:w-6 md:h-6 rounded-sm border border-ink/25 transition-all duration-[500ms] ease-out"
              style={{
                background: c.hex,
                transform: c.tilt,
                transitionDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 7 · carte · unten links · tilted · eng */}
      <Floater
        className="bottom-[22%] left-[18%]"
        hover="group-hover:-translate-x-10 group-hover:translate-y-5 group-hover:rotate-[-26deg]"
        base="rotate-[-8deg]"
      >
        <div
          className="w-[58px] md:w-[84px] aspect-[16/10] rounded-[3px] p-1.5 md:p-2 flex flex-col justify-between shadow-[0_12px_26px_-10px_rgba(0,0,0,0.55)]"
          style={{ background: "#F5F1E8" }}
        >
          <span
            className="font-mono text-[5.5px] md:text-[7px] uppercase tracking-label"
            style={{ color: "rgba(10,10,10,0.45)" }}
          >
            · carte
          </span>
          <div
            className="bg-[#0a0a0a]"
            style={{
              width: "clamp(34px, 5vw, 52px)",
              aspectRatio: "600 / 140.83",
              WebkitMaskImage: "url(/laconis-logo.svg)",
              maskImage: "url(/laconis-logo.svg)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
            }}
          />
        </div>
      </Floater>

      {/* 8 · kleiner triangle-outline · unten rechts · eng */}
      <Floater
        className="bottom-[26%] right-[22%]"
        hover="group-hover:translate-x-8 group-hover:translate-y-4 group-hover:rotate-[-44deg]"
        base="rotate-[18deg]"
      >
        <svg
          className="w-7 h-7 md:w-10 md:h-10 text-offwhite/35"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden
        >
          <path d="M20 4 L36 34 L4 34 Z" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </Floater>

      {/* 9 · dot-trio · subtil */}
      <div className="absolute top-[66%] right-[36%] flex gap-1 transition-transform duration-[600ms] group-hover:translate-y-2 group-hover:translate-x-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-ink" />
        <span className="w-1.5 h-1.5 rounded-full bg-offwhite/35" />
        <span className="w-1.5 h-1.5 rounded-full bg-offwhite/20" />
      </div>
    </div>
  );
}

/**
 * Floater — wrapper mit base-rotation (inline) + group-hover-transforms (classes).
 * Tailwind transforms werden auf outer layer composed, inline base-rotation auf inner.
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
