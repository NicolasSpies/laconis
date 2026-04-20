import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen } from "@/data/referenzen";

/**
 * home-referenzen · editorial-strip.
 * drei neueste projekte als cleane large-cards · kein polaroid, keine tape,
 * keine rotation. gleiche ästhetik wie ContactSheet auf /referenzen.
 */

export function ReferenzenTeaser() {
  const items = [...referenzen].sort((a, b) => b.jahr - a.jahr).slice(0, 3);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="02">referenzen</SectionLabel>

        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="heading-display text-[clamp(2rem,5vw,3.5rem)] max-w-[700px] text-offwhite">
            ergebnisse, die für sich sprechen.
          </h2>
          <p className="text-[14px] text-offwhite/55 max-w-[360px]">
            auswahl aktueller projekte · jedes eins nach dem anderen, keine
            vorlagen.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {items.map((r) => (
            <Link
              key={r.slug}
              href={`/referenzen/${r.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-md border border-ink/10 transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-[0_18px_48px_-20px_rgba(225,253,82,0.25)]">
                <RefThumb ref_={r} aspect="4 / 3" />
                <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-label text-black bg-lime px-1.5 py-0.5 rounded-sm">
                  {r.kategorieLabel}
                </span>
                {r.inArbeit && (
                  <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-label text-accent-ink bg-black/70 px-1.5 py-0.5 rounded-sm">
                    in arbeit
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="heading-sans text-[20px] leading-tight text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                    {r.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/55 truncate">
                    {r.ort} · {r.jahr}
                  </p>
                </div>
                <span className="font-mono text-[12px] text-offwhite/35 group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all shrink-0">
                  →
                </span>
              </div>

              <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55 line-clamp-2">
                {r.kurz}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/referenzen" variant="glass" size="md">
            alle referenzen ansehen →
          </Button>
        </div>
      </div>
    </section>
  );
}
