import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24">
      <div className="container-site">
        <div className="relative mx-auto max-w-[640px] text-center">
          {/* big 404 */}
          <div
            className="heading-display text-offwhite/10 leading-none select-none"
            style={{
              fontSize: "clamp(8rem, 24vw, 18rem)",
              letterSpacing: "-0.08em",
            }}
          >
            404
          </div>

          {/* handwritten scribble overlayed */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <span
              className="font-hand text-accent-ink text-[clamp(2.5rem,8vw,5rem)] -rotate-[6deg]"
            >
              sackgasse.
            </span>
          </div>

          {/* arrow scribble — svg */}
          <div className="mt-4 flex justify-center">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              fill="none"
              className="text-accent-ink/70"
            >
              <path
                d="M10 30 Q 40 50, 70 30 T 110 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M110 30 L100 22 M110 30 L100 38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <h1 className="heading-sans text-[clamp(1.5rem,3vw,2rem)] text-offwhite mt-6">
            diese seite existiert nicht.
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[440px] mx-auto">
            vielleicht ein tippfehler, vielleicht ein alter link, vielleicht
            ist die seite umgezogen. egal — zurück zur startseite ist immer
            ein guter plan.
          </p>

          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Button href="/" variant="primary" size="lg">
              ← zurück zur startseite
            </Button>
            <Button href="/referenzen" variant="glass" size="lg">
              referenzen ansehen
            </Button>
          </div>

          {/* tiny footer note */}
          <p className="mt-12 font-mono text-[10px] uppercase tracking-label text-offwhite/30">
            wenn du denkst, das ist ein bug — {" "}
            <a
              href="mailto:hallo@laconis.be"
              className="text-accent-ink hover:underline"
            >
              sag bescheid
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
