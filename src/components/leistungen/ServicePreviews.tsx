"use client";

import { motion } from "framer-motion";

/**
 * Service-card mini-previews · big version für /leistungen.
 * Pendant zu home.ServicesMorph WebPreview/BrandingPreview, hier größer.
 */

const LILA = "#b084d3";

export function WebMockBrowser() {
  return (
    <div
      aria-hidden
      className="hidden md:block absolute top-10 right-10 lg:top-12 lg:right-12 pointer-events-none select-none"
      style={{ width: 220, height: 140 }}
    >
      <div
        className="w-full h-full rounded-md overflow-hidden border"
        style={{
          background: "rgba(10,10,10,0.06)",
          borderColor: "rgba(10,10,10,0.18)",
        }}
      >
        {/* browser chrome · 3 dots + url-bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b"
          style={{ borderColor: "rgba(10,10,10,0.15)" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "rgba(10,10,10,0.35)" }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "rgba(10,10,10,0.35)" }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "rgba(10,10,10,0.35)" }}
          />
          <span
            className="ml-2 h-2 flex-1 rounded-sm"
            style={{ background: "rgba(10,10,10,0.12)" }}
          />
        </div>
        {/* content stripes · pulsing skeleton */}
        <div className="p-4 space-y-2">
          {[0, 0.4, 0.8, 1.2].map((delay, idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              className="h-2 rounded-sm"
              style={{
                background: "rgba(10,10,10,0.4)",
                width:
                  idx === 0
                    ? "85%"
                    : idx === 1
                      ? "65%"
                      : idx === 2
                        ? "75%"
                        : "55%",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandingMonogram() {
  return (
    <div
      aria-hidden
      className="hidden md:block absolute top-8 right-8 lg:top-10 lg:right-10 pointer-events-none select-none"
    >
      <motion.span
        animate={{
          rotate: [0, 6, -6, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block font-black leading-none"
        style={{
          fontSize: "clamp(120px, 16vw, 200px)",
          color: LILA,
          letterSpacing: "-0.05em",
          textShadow: `0 0 32px ${LILA}55`,
        }}
      >
        ø
      </motion.span>
    </div>
  );
}
