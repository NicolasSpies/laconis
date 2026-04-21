"use client";

import { useEffect, useState } from "react";

/**
 * HeroBrowser — animiertes browser-mockup für den web-hero.
 * Sequenz:
 *  1. url tippt sich (laconis-demo)
 *  2. loading-bar
 *  3. content rendert progressiv (headline → grid → divider → body)
 *  4. pagespeed-badge erscheint, score tickt 0 → 98
 * läuft einmal on-mount, loopt danach sanft alle ~12s.
 */

const URL_TEXT = "deine-marke.be";
const TARGET_SCORE = 98;

type Stage = "idle" | "typing" | "loading" | "rendering" | "scored";

export function HeroBrowser() {
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);

  // sequence runner
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (cancelled) return;
      // reset
      setTyped("");
      setScore(0);
      setStage("typing");

      // type URL
      for (let i = 1; i <= URL_TEXT.length; i++) {
        if (cancelled) return;
        setTyped(URL_TEXT.slice(0, i));
        await wait(70 + Math.random() * 60);
      }
      await wait(350);
      if (cancelled) return;

      // loading
      setStage("loading");
      await wait(650);
      if (cancelled) return;

      // render content
      setStage("rendering");
      await wait(1400);
      if (cancelled) return;

      // score animates
      setStage("scored");
      const dur = 900;
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const tick = () => {
          if (cancelled) return resolve();
          const t = Math.min(1, (performance.now() - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setScore(Math.round(TARGET_SCORE * eased));
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // hold, then loop
      await wait(5500);
      if (cancelled) return;
      run();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const showContent = stage === "rendering" || stage === "scored";
  const showScore = stage === "scored";

  // ring math
  const radius = 13;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - score / 100);

  return (
    <div className="relative w-full">
      {/* ambient glow */}
      <div
        className="absolute -inset-8 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(225 253 82 / 0.08), transparent 60%)",
        }}
      />

      {/* browser frame */}
      <div className="relative rounded-xl border border-ink/10 bg-gradient-to-b from-ink/[0.04] to-transparent overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
        {/* chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10 bg-ink/[0.03]">
          <div className="flex gap-1.5">
            <span className="w-[10px] h-[10px] rounded-full bg-ink/25" />
            <span className="w-[10px] h-[10px] rounded-full bg-ink/25" />
            <span className="w-[10px] h-[10px] rounded-full bg-ink/25" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md bg-ink/[0.05] border border-ink/10 min-w-0">
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 text-offwhite/55 shrink-0"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 2v1M6 9v1M2 6h1M9 6h1M3.2 3.2l.7.7M8.1 8.1l.7.7M3.2 8.8l.7-.7M8.1 3.9l.7-.7"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="font-mono text-[11px] text-offwhite/75 truncate">
              {typed}
              <span className="inline-block w-[1px] h-[11px] align-middle ml-[1px] bg-lime animate-pulse" />
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-label text-offwhite/35 shrink-0">
            live-demo
          </span>
        </div>

        {/* loading bar */}
        <div className="relative h-[2px] bg-ink/5 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-lime transition-all ease-out"
            style={{
              width:
                stage === "typing"
                  ? "12%"
                  : stage === "loading"
                  ? "55%"
                  : stage === "rendering"
                  ? "85%"
                  : stage === "scored"
                  ? "100%"
                  : "0%",
              transitionDuration:
                stage === "loading" ? "550ms" : stage === "rendering" ? "900ms" : "400ms",
              opacity: stage === "scored" ? 0 : 1,
            }}
          />
        </div>

        {/* viewport */}
        <div className="relative aspect-[4/3] md:aspect-[5/4] p-5 md:p-8 bg-dark overflow-hidden">
          {/* subtle grid bg */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--ink)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink)) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* label */}
          <div
            className={[
              "relative font-mono text-[9px] md:text-[10px] uppercase tracking-label text-lime transition-all duration-500",
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            bäckerei · eupen · est. 1967
          </div>

          {/* headline */}
          <h3
            className={[
              "heading-display relative text-offwhite text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.02] mt-3 md:mt-4 transition-all duration-[700ms] delay-150",
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            brot, das<br />
            <span className="text-offwhite/35">nach morgen</span><br />
            schmeckt.
          </h3>

          {/* photo grid */}
          <div
            className={[
              "relative mt-5 md:mt-7 grid grid-cols-3 gap-2 transition-all duration-[700ms] delay-[350ms]",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-ink/10 to-ink/5 border border-ink/10" />
            <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-lime/25 to-lime/10 border border-lime/25" />
            <div className="aspect-[4/5] rounded-sm bg-gradient-to-br from-ink/10 to-ink/5 border border-ink/10" />
          </div>

          {/* divider */}
          <div
            className={[
              "relative mt-5 md:mt-6 h-px bg-ink/10 origin-left transition-transform duration-[500ms] delay-[550ms]",
              showContent ? "scale-x-100" : "scale-x-0",
            ].join(" ")}
          />

          {/* body + cta */}
          <div
            className={[
              "relative mt-4 flex items-end justify-between gap-4 transition-all duration-500 delay-[700ms]",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <p className="text-[10px] md:text-[11px] leading-relaxed text-offwhite/55 max-w-[240px]">
              täglich aus dem holzofen · sauerteig aus eigener zucht ·
              vorbestellen bis donnerstag.
            </p>
            <span className="shrink-0 font-mono text-[9px] md:text-[10px] uppercase tracking-label text-accent-ink border border-lime/25 rounded-full px-3 py-1.5 bg-lime/[0.04]">
              bestellen →
            </span>
          </div>

          {/* pagespeed badge */}
          <div
            className={[
              "absolute bottom-4 right-4 md:bottom-5 md:right-5 transition-all duration-[600ms]",
              showScore
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-3 scale-95",
            ].join(" ")}
          >
            <div className="flex items-center gap-2.5 rounded-lg bg-lime/80 text-[#0a0a0a] pl-2 pr-3 py-1.5 backdrop-blur shadow-[0_10px_30px_-10px_rgb(var(--accent) / 0.4)]">
              <div className="relative w-9 h-9">
                <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    fill="none"
                    stroke="#0a0a0a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold">
                  {score}
                </span>
              </div>
              <div className="leading-[1.1]">
                <div className="font-mono text-[8px] uppercase tracking-label opacity-60">
                  pagespeed
                </div>
                <div className="text-[10px] font-semibold">insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating indicator unten */}
      <div className="glass absolute -bottom-3 left-6 flex items-center gap-3 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-label text-offwhite/55 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          mobile {score}
        </span>
        <span className="text-offwhite/20">·</span>
        <span>desktop 100</span>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
