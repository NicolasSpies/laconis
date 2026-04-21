"use client";

/**
 * route-level error boundary.
 * greift bei render-errors unterhalb von layout.tsx.
 * layout-fehler fallen auf global-error.tsx zurück.
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/config/contact";
import { track } from "@/lib/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route-error]", error);
    track({
      type: "route_error",
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24">
      <div className="container-site">
        <div className="relative mx-auto max-w-[640px] text-center">
          {/* big 500 */}
          <div
            className="heading-display text-offwhite/10 leading-none select-none"
            style={{
              fontSize: "clamp(8rem, 24vw, 18rem)",
              letterSpacing: "-0.08em",
            }}
          >
            500
          </div>

          {/* handwritten scribble overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <span className="font-hand text-accent-ink text-[clamp(2.5rem,8vw,5rem)] -rotate-[6deg]">
              ups.
            </span>
          </div>

          {/* scribble divider */}
          <div className="mt-4 flex justify-center">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              fill="none"
              className="text-accent-ink/80"
            >
              <path
                d="M10 30 Q 40 10, 70 30 T 110 30"
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
            da ist was schiefgegangen.
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[440px] mx-auto">
            passiert den besten. entweder nochmal versuchen · oder zurück zur
            startseite, dort ist meistens noch alles an seinem platz.
          </p>

          {error.digest && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              fehler-id · {error.digest}
            </p>
          )}

          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Button onClick={() => reset()} variant="primary" size="lg">
              nochmal versuchen
            </Button>
            <Button href="/" variant="glass" size="lg">
              ← zurück zur startseite
            </Button>
          </div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
            wenn das öfter passiert ·{" "}
            <a
              href={`mailto:${CONTACT.email}`}
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
