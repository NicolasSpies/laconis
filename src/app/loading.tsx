/**
 * route-level loading · minimal, kein layout-shift.
 * greift während route-transitions (inkl. daten-fetching).
 * der page-transition-wrapper kümmert sich um visuelle kontinuität,
 * das hier ist nur ein fail-safe.
 */

export default function Loading() {
  return (
    /* lief ohne eigenen grund, also auf dem hellen html-hintergrund
       (K2) · der lime-indikator hatte darauf 1,2:1 und war
       praktisch unsichtbar, während davor und danach schwarz war.
       erst schwarz, dann hell, dann schwarz. */
    <section
      className="flex min-h-[100svh] items-center justify-center py-24"
      style={{ background: "var(--su-void)" }}
    >
      <div
        className="flex flex-col items-center gap-4"
        role="status"
        aria-label="wird geladen"
      >
        {/* lime-puls · subtil */}
        <div className="relative h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-lime/80" />
          <span className="absolute inset-0 rounded-full bg-lime animate-ping" />
        </div>
        <span className="lab-label">
          einen moment
        </span>
      </div>
    </section>
  );
}
