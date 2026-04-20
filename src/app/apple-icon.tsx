import { ImageResponse } from "next/og";

// apple-touch-icon · 180×180 · rund · schwarz · ø in lime.
// ios schneidet selbst zu squircle, aber borderRadius: 50% gibt eine runde maske
// in modernen browsern und PWA-install-prompts.
export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 140,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: "50%",
          paddingBottom: 12,
        }}
      >
        ø
      </div>
    ),
    { ...size },
  );
}
