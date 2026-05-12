import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "lacønis · design mit meinung · web mit seele";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          fontFamily: "sans-serif",
          color: "#f2f0e7",
          position: "relative",
        }}
      >
        {/* lime accent blob */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "#d9ff00",
            opacity: 0.08,
            display: "flex",
          }}
        />

        {/* top · label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(242,240,231,0.55)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#d9ff00",
              borderRadius: 999,
              display: "flex",
            }}
          />
          eupen · belgien
        </div>

        {/* middle · wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#f2f0e7",
              display: "flex",
            }}
          >
            lacønis
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              lineHeight: 1.15,
              color: "rgba(242,240,231,0.7)",
              maxWidth: 880,
              display: "flex",
            }}
          >
            design mit meinung · web mit seele.
          </div>
        </div>

        {/* bottom · url */}
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
          <div style={{ display: "flex" }}>laconis.be</div>
          <div style={{ display: "flex", color: "#d9ff00" }}>
            freelance design · web dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
