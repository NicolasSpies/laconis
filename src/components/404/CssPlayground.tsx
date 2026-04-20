"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * CssPlayground — 3 CSS-challenges mit live-preview.
 * usertippt eingabe in textarea, parser validiert gegen whitelist,
 * ergebnis wird auf einen sandbox-div appliziert.
 *
 * sicherheit:
 *   - nur CSS-properties aus WHITELIST akzeptiert
 *   - werte werden rudimentär sanitized (keine url(), keine expression())
 *   - "content:" explizit geblockt
 *   - kein selector-parsing · wir akzeptieren nur "prop: value; prop: value;"
 *
 * matching der challenges: mini-regex-check ob das "goal" erreicht ist.
 * das reicht für learnerfreude · ist kein echter CSS-parser.
 */

type Challenge = {
  id: 1 | 2 | 3;
  frage: string;
  hint: string;
  starterCss: string;
  sandboxHtml: () => React.ReactNode;
  /** gibt true zurück, wenn die userCSS die challenge löst */
  check: (css: ParsedDecl[]) => boolean;
};

type ParsedDecl = { prop: string; value: string };

const WHITELIST = new Set<string>([
  "color",
  "background",
  "background-color",
  "text-align",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "border-radius",
  "border",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "opacity",
  "width",
  "height",
  "display",
]);

const FORBIDDEN_VALUE_PATTERNS: RegExp[] = [
  /url\s*\(/i,
  /expression\s*\(/i,
  /javascript:/i,
  /@import/i,
  /</,
  />/,
  /\bcontent\s*:/i,
];

function parseCss(input: string): ParsedDecl[] {
  // sehr simpler parser: split an ";", dann an ":"
  return input
    .split(";")
    .map((decl) => decl.trim())
    .filter(Boolean)
    .map((decl) => {
      const [prop, ...rest] = decl.split(":");
      return {
        prop: (prop ?? "").trim().toLowerCase(),
        value: rest.join(":").trim(),
      };
    })
    .filter((d) => d.prop && d.value);
}

function sanitize(decls: ParsedDecl[]): ParsedDecl[] {
  return decls.filter((d) => {
    if (!WHITELIST.has(d.prop)) return false;
    if (d.value.length > 80) return false;
    if (FORBIDDEN_VALUE_PATTERNS.some((r) => r.test(d.value))) return false;
    return true;
  });
}

function declsToStyle(decls: ParsedDecl[]): React.CSSProperties {
  const style: Record<string, string> = {};
  decls.forEach((d) => {
    // CSS custom-camelcase: text-align → textAlign
    const key = d.prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    style[key] = d.value;
  });
  return style as React.CSSProperties;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    frage: "mach den button lime.",
    hint: "tipp · background: #d9ff00;",
    starterCss: "background: ;\ncolor: #000;",
    sandboxHtml: () => (
      <button
        type="button"
        style={{
          padding: "14px 24px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.2)",
          fontWeight: 600,
          background: "#888",
          color: "#000",
        }}
      >
        klick mich
      </button>
    ),
    check: (css) => {
      const bg = css.find((d) => d.prop === "background" || d.prop === "background-color");
      if (!bg) return false;
      const v = bg.value.toLowerCase().replace(/\s/g, "");
      return (
        v.includes("#d9ff00") ||
        v.includes("lime") ||
        v.includes("rgb(217,255,0)") ||
        v.includes("#e1fd52")
      );
    },
  },
  {
    id: 2,
    frage: "zentriere den text.",
    hint: "tipp · text-align: center;",
    starterCss: "text-align: ;",
    sandboxHtml: () => (
      <p style={{ fontSize: 16, color: "#111", margin: 0 }}>
        hallo · ich möchte in die mitte.
      </p>
    ),
    check: (css) => {
      const ta = css.find((d) => d.prop === "text-align");
      return ta?.value.toLowerCase() === "center";
    },
  },
  {
    id: 3,
    frage: "füge padding hinzu (mind. 1.5rem).",
    hint: "tipp · padding: 2rem;",
    starterCss: "padding: ;\nbackground: #fff;",
    sandboxHtml: () => (
      <div style={{ fontSize: 14, color: "#111", background: "#fff" }}>
        ich bin eng. lass mir luft zum atmen.
      </div>
    ),
    check: (css) => {
      const p = css.find((d) => d.prop === "padding");
      if (!p) return false;
      // akzeptiere jede rem/px-angabe ≥ 1.5rem bzw. ≥ 24px
      const m = p.value.match(/([\d.]+)\s*(rem|px)/i);
      if (!m) return false;
      const [, numStr, unit] = m;
      const n = parseFloat(numStr);
      if (unit.toLowerCase() === "rem") return n >= 1.5;
      return n >= 24;
    },
  },
];

export function CssPlayground() {
  const [step, setStep] = useState(0);
  const [userCss, setUserCss] = useState<string>(CHALLENGES[0].starterCss);

  const challenge = CHALLENGES[step];
  const parsed = useMemo(() => sanitize(parseCss(userCss)), [userCss]);
  const style = useMemo(() => declsToStyle(parsed), [parsed]);
  const solved = useMemo(() => challenge.check(parsed), [challenge, parsed]);
  const allDone = step >= CHALLENGES.length;

  const next = () => {
    if (step === CHALLENGES.length - 1) {
      // final: fire analytics
      track({
        type: "four_oh_four_challenge_completed",
        level: CHALLENGES.length,
      });
      setStep(step + 1); // zeigt reward-screen
    } else {
      setStep(step + 1);
      setUserCss(CHALLENGES[step + 1].starterCss);
    }
  };

  if (allDone) {
    return <RewardScreen />;
  }

  return (
    <section className="pt-8 pb-24">
      <div className="container-site max-w-[920px]">
        <div className="mb-8 text-center">
          <span className="font-hand text-[22px] md:text-[26px] text-accent-ink -rotate-[1deg] inline-block">
            aber: wenn du schon hier bist, magst was lernen?
          </span>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            drei mini-css-aufgaben · level {step + 1} / {CHALLENGES.length}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-6 md:p-8">
          <h2 className="heading-sans text-[20px] md:text-[24px] text-offwhite">
            {challenge.frage}
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* EDITOR */}
            <div>
              <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 mb-2">
                dein css
              </div>
              <textarea
                value={userCss}
                onChange={(e) => setUserCss(e.target.value)}
                spellCheck={false}
                className="w-full h-[180px] rounded-lg bg-[#0a0a0a] border border-ink/25 px-4 py-3 font-mono text-[13px] text-offwhite leading-relaxed focus:border-lime/50 focus:outline-none resize-none"
              />
              <div className="mt-2 font-mono text-[10px] text-offwhite/35">
                {challenge.hint}
              </div>
            </div>

            {/* PREVIEW */}
            <div>
              <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 mb-2">
                live-preview
              </div>
              <div className="h-[180px] rounded-lg bg-offwhite/[0.04] border border-ink/25 flex items-center justify-center p-6">
                <div
                  style={style}
                  className="max-w-full"
                >
                  {challenge.sandboxHtml()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
            <div
              className={[
                "font-mono text-[11px] uppercase tracking-label transition-colors",
                solved ? "text-accent-ink" : "text-offwhite/35",
              ].join(" ")}
            >
              {solved ? "✓ geschafft" : "· noch nicht"}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={!solved}
              className={[
                "min-h-[44px] px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-label transition-all",
                solved
                  ? "bg-lime text-black hover:bg-lime/80"
                  : "bg-ink/10 text-offwhite/35 cursor-not-allowed",
              ].join(" ")}
            >
              {step === CHALLENGES.length - 1 ? "fertig →" : "nächste →"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {CHALLENGES.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1.5 rounded-full transition-all",
                i === step
                  ? "w-8 bg-lime"
                  : i < step
                  ? "w-4 bg-lime/50"
                  : "w-4 bg-ink/10",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RewardScreen() {
  return (
    <section className="pt-8 pb-28">
      <div className="container-site max-w-[620px] text-center">
        {/* handgezeichneter haken */}
        <svg
          viewBox="0 0 120 80"
          className="mx-auto w-28 h-20 text-accent-ink"
          aria-hidden
        >
          <path
            d="M 15 45 Q 35 60 50 65 T 105 15"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 100 10 L 105 15 L 100 22"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <h2 className="mt-6 heading-display text-[clamp(1.75rem,5vw,2.75rem)] text-offwhite">
          level 3 geschafft.
        </h2>

        <p className="mt-4 font-hand text-[22px] md:text-[26px] text-accent-ink -rotate-[1deg]">
          solltest eigentlich hier arbeiten.
        </p>

        <p className="mt-4 text-[14px] text-offwhite/55 leading-relaxed max-w-[480px] mx-auto">
          wenn dir das spaß gemacht hat · genau so sieht mein tag aus.
          lust auf mehr? schreib mir.
        </p>

        <div className="mt-10">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-lime text-black px-6 py-3 font-mono text-[11px] uppercase tracking-label hover:bg-lime/80 transition-colors"
          >
            schreib mich an →
          </Link>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
          oder ·{" "}
          <Link href="/" className="hover:text-accent-ink">
            zurück zur startseite
          </Link>
        </p>
      </div>
    </section>
  );
}
