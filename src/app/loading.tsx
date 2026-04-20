/**
 * route-level loading · minimal, kein layout-shift.
 * greift während route-transitions (inkl. daten-fetching).
 * der page-transition-wrapper kümmert sich um visuelle kontinuität,
 * das hier ist nur ein fail-safe.
 */

export default function Loading() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24">
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
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
          einen moment
        </span>
      </div>
    </section>
  );
}
