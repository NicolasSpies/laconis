import { BrandDesk } from "@/components/leistungen/branding/BrandDesk";
import { BrandingBento } from "@/components/leistungen/branding/BrandingBento";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";

/**
 * /preview/branding-c · option C · SpecimenKartei → minimal single specimen.
 * EIN großer brand-card als visualisierung, sehr clean (typo + farben + ø).
 */
export default function Page() {
  return (
    <main className="pt-32">
      <PreviewLabel code="C · single minimal specimen" />
      <BrandDesk num="02" />
      <ScribbleBreak text="ein einzelnes beispiel ↓" rotate={-1} />
      <MinimalSpecimen />
      <BrandingBento num="04" />
    </main>
  );
}

function MinimalSpecimen() {
  return (
    <section className="pb-16 md:pb-20 overflow-hidden">
      <div className="container-site">
        <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] text-[#f2f2f2] p-10 md:p-16 lg:p-20 max-w-[1100px] mx-auto">
          {/* corner meta */}
          <div className="flex items-baseline justify-between mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e1fd52]/80">
              brand sample
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2f2f2]/45">
              · ein beispiel
            </span>
          </div>

          {/* main typography */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2f2f2]/45 mb-3">
                wordmark + monogram
              </div>
              <div
                className="font-black leading-[0.85] tracking-[-0.06em] text-[#f2f2f2]"
                style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
              >
                lacønis
              </div>
              <div
                className="mt-1 font-black leading-none"
                style={{
                  fontSize: "clamp(5rem, 13vw, 10rem)",
                  color: "#b084d3",
                  letterSpacing: "-0.06em",
                }}
              >
                ø
              </div>
            </div>

            {/* color palette · vertical column */}
            <div className="flex flex-col gap-2 shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2f2f2]/45 mb-2">
                farbwelt
              </span>
              {[
                { bg: "#e1fd52", hex: "lime · e1fd52" },
                { bg: "#b084d3", hex: "lila · b084d3" },
                { bg: "#0a0a0a", hex: "dark · 0a0a0a", ring: true },
                { bg: "#c8c8c8", hex: "grey · c8c8c8" },
              ].map((c) => (
                <div key={c.hex} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-sm"
                    style={{
                      background: c.bg,
                      border: c.ring ? "1px solid rgba(242,242,242,0.15)" : "none",
                    }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-label text-[#f2f2f2]/55">
                    {c.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom: typo sample + caption */}
          <div className="mt-16 pt-8 border-t border-[#f2f2f2]/10 flex items-baseline justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2f2f2]/45">
                typographie
              </span>
              <div className="mt-2">
                <span className="font-black text-[#f2f2f2] text-[clamp(2rem,4vw,3rem)] tracking-[-0.04em] leading-none">
                  DM Sans
                </span>
                <span className="ml-3 font-mono text-[#f2f2f2]/55 text-[clamp(0.9rem,1.5vw,1.1rem)] uppercase tracking-label">
                  display + body
                </span>
              </div>
            </div>
            <span
              className="hidden md:inline-block text-[#b084d3]/80"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: "18px",
                transform: "rotate(-2deg)",
              }}
            >
              ~ alles aufeinander abgestimmt.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewLabel({ code }: { code: string }) {
  return (
    <div className="container-site mb-8">
      <span className="inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[#e1fd52] bg-[#0a0a0a] px-3 py-2 rounded-full">
        preview · {code}
      </span>
    </div>
  );
}
