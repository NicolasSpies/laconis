import { ImageResponse } from "next/og";
import { referenzen } from "@/data/referenzen";

/**
 * dynamic OG-image pro referenz.
 * projekt-name links groß, lacønis-mark rechts klein,
 * hintergrund = referenz-hauptfarbe (mit dunklem overlay für kontrast).
 *
 * Fallback: wenn der slug nicht existiert, zeigt das image trotzdem
 * einen neutralen lacønis-style-baseline (nicht 404 · OG-images sollen
 * immer ein bild liefern, sonst greifen clients den root og nicht).
 */

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "referenz · lacønis";

export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const r = referenzen.find((x) => x.slug === params.slug);
  return [
    {
      id: r?.slug ?? "default",
      size,
      alt: r ? `${r.name} · lacønis` : alt,
      contentType,
    },
  ];
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const r = referenzen.find((x) => x.slug === params.slug);
  const accent = "#e1fd52";
  const name = r?.name ?? "lacønis";
  const label = r?.kategorieLabel ?? "referenz";
  const ort = r?.ort ?? "Eupen · Belgien";
  const year = r?.jahr ?? new Date().getFullYear();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0d0f0f",
          color: "#f2f0e7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* accent-farbiger blob basierend auf referenz */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 999,
            background: accent,
            opacity: 0.12,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 360,
            height: 360,
            borderRadius: 999,
            background: accent,
            opacity: 0.06,
            display: "flex",
          }}
        />

        {/* top · label + jahr */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(242,240,231,0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: accent,
                borderRadius: 999,
                display: "flex",
              }}
            />
            {label}
          </div>
          <div style={{ display: "flex", color: "rgba(242,240,231,0.4)" }}>
            {year}
          </div>
        </div>

        {/* middle · projekt-name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: name.length > 18 ? 110 : 150,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#f2f0e7",
              display: "flex",
              textTransform: "lowercase",
              maxWidth: 1040,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.2,
              color: "rgba(242,240,231,0.65)",
              maxWidth: 880,
              display: "flex",
            }}
          >
            {ort}
          </div>
        </div>

        {/* bottom · lacønis-mark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(242,240,231,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>laconis.be · referenzen</div>
          <div style={{ display: "flex", color: accent, fontWeight: 700 }}>
            lacønis
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
