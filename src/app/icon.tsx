import { ImageResponse } from "next/og";

// Next generiert daraus dynamisch /icon.png · 32×32 favicon.
// rund · schwarz · ø in lime.
export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0f0f",
          color: "#d9ff00",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: "50%",
          // optisches zentrieren — ø sitzt minimal höher
          paddingBottom: 2,
        }}
      >
        ø
      </div>
    ),
    { ...size },
  );
}
