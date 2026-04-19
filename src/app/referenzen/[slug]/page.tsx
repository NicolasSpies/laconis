import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen } from "@/data/referenzen";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return referenzen.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = referenzen.find((x) => x.slug === params.slug);
  if (!r) return { title: "projekt nicht gefunden" };
  return {
    title: `${r.name.toLowerCase()} • referenzen`,
    description: r.kurz,
  };
}

export default function Page({ params }: Props) {
  const r = referenzen.find((x) => x.slug === params.slug);
  if (!r) notFound();

  const idx = referenzen.findIndex((x) => x.slug === params.slug);
  const nextRef = referenzen[(idx + 1) % referenzen.length];
  const prevRef = referenzen[(idx - 1 + referenzen.length) % referenzen.length];

  const hasPagespeed =
    r.pagespeedMobile !== undefined || r.pagespeedDesktop !== undefined;

  return (
    <>
      {/* breadcrumb */}
      <section className="pt-36 pb-8">
        <div className="container-site">
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/50 hover:text-accent-ink transition-colors"
          >
            <span>←</span> alle referenzen
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="pb-16">
        <div className="container-site">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: r.farbe }}
            />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/50">
              {r.kategorieLabel}
            </span>
            <span className="h-px flex-1 bg-ink/8" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
              {r.jahr}
            </span>
          </div>

          <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite lowercase">
            {r.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-mono text-[12px] uppercase tracking-label text-offwhite/55">
              {r.ort}
            </span>
            {r.inArbeit && (
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink bg-lime/10 border border-lime/30 rounded-full px-2.5 py-1">
                in arbeit
              </span>
            )}
            {r.urlExtern && (
              <a
                href={r.urlExtern}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-label text-accent-ink hover:underline"
              >
                live ansehen ↗
              </a>
            )}
          </div>

          <p className="mt-10 max-w-[680px] text-[16px] md:text-[18px] leading-relaxed text-offwhite/70">
            {r.kurz}
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="pb-24">
        <div className="container-site">
          <div className="relative rounded-2xl overflow-hidden border border-ink/10">
            <RefThumb ref_={r} aspect="16 / 9" />
          </div>
          {r.notiz && (
            <p
              className="mt-4 font-hand text-[20px] text-offwhite/60 max-w-[680px]"
              style={{ transform: "rotate(-0.8deg)" }}
            >
              {r.notiz}
            </p>
          )}
        </div>
      </section>

      {/* KONTEXT */}
      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-12">
          {/* meta sidebar */}
          <div>
            <SectionLabel>steckbrief</SectionLabel>
            <dl className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/8">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                  kategorie
                </dt>
                <dd className="text-[13px] text-offwhite">
                  {r.kategorieLabel}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/8">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                  ort
                </dt>
                <dd className="text-[13px] text-offwhite">{r.ort}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/8">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                  jahr
                </dt>
                <dd className="text-[13px] text-offwhite">{r.jahr}</dd>
              </div>
              {r.tags.length > 0 && (
                <div className="pb-3 border-b border-ink/8">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 mb-3">
                    tags
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-label px-2 py-0.5 rounded-full border border-ink/10 text-offwhite/65"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {hasPagespeed && (
                <div className="pb-3">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 mb-3">
                    pagespeed
                  </dt>
                  <dd className="flex gap-4">
                    {r.pagespeedDesktop !== undefined && (
                      <Score label="desktop" value={r.pagespeedDesktop} />
                    )}
                    {r.pagespeedMobile !== undefined && (
                      <Score label="mobile" value={r.pagespeedMobile} />
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* text content */}
          <div className="space-y-10 text-[15px] md:text-[16px] leading-relaxed text-offwhite/70">
            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                das projekt
              </h2>
              <p>
                {r.name} ist{" "}
                {r.kategorie === "web" || r.kategorie === "web-branding"
                  ? "eine website"
                  : r.kategorie === "branding"
                    ? "ein branding-projekt"
                    : "eine grafische arbeit"}{" "}
                aus {r.ort.split(",")[0]}. {r.kurz} — ausgangspunkt war der
                wunsch, sich aus dem grundrauschen ähnlicher angebote
                abzuheben und eine identität zu bauen, die zur person
                dahinter passt.
              </p>
            </div>

            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                der prozess
              </h2>
              <p>
                wir sind mit einem intensiven moodboarding-termin gestartet.
                vor der ersten pixel-entscheidung stand die frage: wer seid
                ihr wirklich, und wer sind die anderen? aus den antworten
                ist das visuelle system gewachsen — farbe, typografie,
                tonalität.
              </p>
              <p className="mt-4">
                die umsetzung lief in kurzen iterationen, mit
                zwischenabgaben statt black-box. so konnten wir gemeinsam
                lenken, wo es hingehen sollte — ohne überraschung am
                launch-tag.
              </p>
            </div>

            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                ergebnis
              </h2>
              <p>
                {r.inArbeit
                  ? "das projekt befindet sich aktuell noch in der bauphase — erste screens und der branding-rahmen stehen. launch ist für die kommenden wochen geplant."
                  : "das projekt ist live und wird aktiv genutzt. feedback bisher: die seite fühlt sich endlich nach den leuten an, die dahinter stehen — und nicht nach template."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISUALS GALLERY */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel>einblicke</SectionLabel>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="21 / 9" />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="4 / 3" />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="4 / 3" />
            </div>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-offwhite/30">
            platzhalter • echte screenshots folgen
          </p>
        </div>
      </section>

      {/* NAV PREV / NEXT */}
      <section className="pb-24">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-ink/8">
            <Link href={`/referenzen/${prevRef.slug}`} className="group block">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 group-hover:text-accent-ink transition-colors">
                ← vorheriges
              </span>
              <h3 className="mt-2 heading-sans text-[20px] text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                {prevRef.name}
              </h3>
            </Link>
            <Link
              href={`/referenzen/${nextRef.slug}`}
              className="group block text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 group-hover:text-accent-ink transition-colors">
                nächstes →
              </span>
              <h3 className="mt-2 heading-sans text-[20px] text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                {nextRef.name}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              sowas auch für dich?
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              jedes projekt ist eigen. schreib mir, was dir vorschwebt — wir
              besprechen, was passt.
            </p>
            <div className="mt-8">
              <Button href="/kontakt" variant="primary" size="lg">
                projekt anfragen →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  const tone =
    value >= 90
      ? "text-accent-ink"
      : value >= 70
        ? "text-offwhite"
        : "text-orange-400";
  return (
    <div>
      <div
        className={`font-mono text-[24px] ${tone} tabular-nums leading-none`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-label text-offwhite/40">
        {label}
      </div>
    </div>
  );
}
