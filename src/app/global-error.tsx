"use client";

/**
 * global-error · fängt fehler die im root-layout passieren.
 * muss eigenes html/body rendern (next-requirement, layout wurde ja nicht mounted).
 * inline-styles statt tailwind, falls css fehlgeschlagen ist.
 */

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0f0f",
          color: "#f5f2ec",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, sans-serif",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "520px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(5rem, 18vw, 10rem)",
              color: "rgba(245,242,236,0.08)",
              letterSpacing: "-0.08em",
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            500
          </div>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              marginTop: "1.5rem",
              fontWeight: 700,
            }}
          >
            etwas ist grundlegend schiefgegangen.
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "rgba(245,242,236,0.55)",
            }}
          >
            die seite konnte nicht geladen werden. bitte neu laden — wenn es
            öfter passiert, schreib mir kurz.
          </p>
          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                fontFamily: "ui-monospace, monospace",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(245,242,236,0.35)",
              }}
            >
              fehler-id · {error.digest}
            </p>
          )}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "999px",
                background: "#e1fd52",
                color: "#111",
                border: "1px solid #e1fd52",
                fontFamily: "ui-monospace, monospace",
                fontSize: "13px",
                textTransform: "lowercase",
                cursor: "pointer",
              }}
            >
              nochmal versuchen
            </button>
            <a
              href="/"
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "999px",
                background: "rgba(245,242,236,0.06)",
                color: "#f5f2ec",
                border: "1px solid rgba(245,242,236,0.15)",
                fontFamily: "ui-monospace, monospace",
                fontSize: "13px",
                textTransform: "lowercase",
                textDecoration: "none",
              }}
            >
              ← startseite
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
