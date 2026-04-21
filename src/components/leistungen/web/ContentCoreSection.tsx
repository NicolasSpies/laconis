import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  DashboardMock,
  EditorMock,
  StatsMock,
} from "@/components/leistungen/web/ContentCoreMocks";

const FEATURES = [
  "Texte live bearbeiten",
  "Bilder hochladen",
  "Vorschau vor Freigabe",
  "Deutsch · Français · English",
  "Versionsverlauf",
  "Keine Cookies",
];

export function ContentCoreSection({
  num = "03",
}: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>contentcore</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            mein eigenes CMS.{" "}
            <span className="text-offwhite/35">ich hab&apos;s contentcore getauft.</span>
          </h2>

          <p
            className="mt-5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.35] text-offwhite"
            style={{ fontFamily: "var(--font-instrument), serif", fontStyle: "italic" }}
          >
            Damit du deine Seite führst, nicht umgekehrt.
          </p>

          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            Kein WordPress. Kein Plugin-Chaos. Ein System, das ich für dich baue
            und pflege, damit du Texte, Bilder und Seiten selbst änderst, ohne
            Angst etwas kaputt zu machen. Mit kleinen Tipps direkt im Editor,
            falls du nicht weiterweißt.
          </p>
        </div>

        {/* Mock-Komposition */}
        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* Dashboard gross */}
          <div className="relative glass rounded-2xl p-4 md:p-6 overflow-hidden">
            <div
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgb(var(--accent) / 0.06)" }}
            />
            <DashboardMock className="w-full h-auto relative" />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                dashboard · live-ansicht
              </span>
            </div>
          </div>

          {/* Zwei kleinere Mocks gestapelt */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-4 md:p-5">
              <EditorMock className="w-full h-auto" />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  editor
                </span>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-5">
              <StatsMock className="w-full h-auto" />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  stats ohne cookies
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature-Chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.02] text-[12px] text-offwhite/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {f}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-[560px] text-[13px] leading-relaxed text-offwhite/55">
          Alles Technische dahinter (Sicherheit, KI-Bilderkennung, Shop,
          Newsletter, Mehrsprachigkeit) liegt auf einer eigenen Seite ·{" "}
          <Link
            href="/leistungen/web/technik"
            className="text-accent-ink hover:underline"
          >
            technik-details →
          </Link>
        </p>
      </div>
    </section>
  );
}
