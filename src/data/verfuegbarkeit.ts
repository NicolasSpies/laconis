/**
 * verfuegbarkeit — statische queue-daten für /kontakt-widget.
 *
 * prinzip: ich arbeite alleine, ein projekt nach dem anderen.
 * - "urgent" = kunde hat dringend-aufschlag gezahlt (kannst nicht vordrängeln)
 * - "normal" = regulär gebuchter slot
 * - "free"   = noch offen — du kannst einsteigen
 *
 * flex-modus:     nimmt die erste "free"-woche.
 * dringend-modus: nimmt die erste nicht-"urgent" woche und vordrängelt
 *                 damit einen "normal"-slot (+25 % aufschlag).
 */

export type SlotStatus = "urgent" | "normal" | "free";

export type Slot = {
  kw: number;
  jahr: number;
  status: SlotStatus;
  /** optionales label, z.b. 'fabry' — in der anzeige als chip */
  tag?: string;
};

/** KW 17 – 28 · 2026 · 12 wochen rolling horizon */
export const SLOTS: Slot[] = [
  { kw: 17, jahr: 2026, status: "urgent", tag: "läuft" },
  { kw: 18, jahr: 2026, status: "urgent", tag: "läuft" },
  { kw: 19, jahr: 2026, status: "normal", tag: "belegt" },
  { kw: 20, jahr: 2026, status: "normal", tag: "belegt" },
  { kw: 21, jahr: 2026, status: "normal", tag: "belegt" },
  { kw: 22, jahr: 2026, status: "free" },
  { kw: 23, jahr: 2026, status: "free" },
  { kw: 24, jahr: 2026, status: "free" },
  { kw: 25, jahr: 2026, status: "free" },
  { kw: 26, jahr: 2026, status: "free" },
  { kw: 27, jahr: 2026, status: "free" },
  { kw: 28, jahr: 2026, status: "free" },
];

/**
 * projekt-dauer in wochen (aktive bauzeit, ohne abstimmungs-pausen).
 * deckt sich mit den scope-keys von KontaktMultistep.
 */
export type ProjektTyp =
  | "onepager"
  | "klein"
  | "mittel"
  | "gross"
  | "branding"
  | "bundle";

export const PROJEKT_DAUER: Record<ProjektTyp, number> = {
  onepager: 2,
  klein: 3,
  mittel: 5,
  gross: 7,
  branding: 2,
  bundle: 6,
};

/* ══════════════════════════ queue-logik ══════════════════════════ */

export type Modus = "flex" | "urgent";

/**
 * finde den start-slot nach buchungs-modus.
 * - flex   → erster "free"-slot
 * - urgent → erster nicht-"urgent" slot (darf "normal" verdrängen)
 *
 * gibt null zurück, wenn gar nichts passt.
 */
export function findStartSlot(modus: Modus, slots: Slot[] = SLOTS): Slot | null {
  if (modus === "flex") {
    return slots.find((s) => s.status === "free") ?? null;
  }
  // urgent: erster slot der NICHT "urgent" ist
  return slots.find((s) => s.status !== "urgent") ?? null;
}

/**
 * gibt einen reduzierten plan zurück: start-slot, aktive wochen, fertig-slot.
 */
export function computePlan(
  modus: Modus,
  dauer: number,
  slots: Slot[] = SLOTS,
): { start: Slot; active: Slot[]; finish: Slot } | null {
  const start = findStartSlot(modus, slots);
  if (!start) return null;

  const startIdx = slots.findIndex(
    (s) => s.kw === start.kw && s.jahr === start.jahr,
  );
  const endIdx = Math.min(startIdx + dauer - 1, slots.length - 1);
  const active = slots.slice(startIdx, endIdx + 1);
  const finish = active[active.length - 1] ?? start;

  return { start, active, finish };
}

/**
 * gibt die statusleiste zurück, wie sie NACH der buchung aussieht.
 * - flex: statusse unverändert · user-slot wird über "active"-indices markiert
 * - urgent: normal-slots (flexible aufträge) werden hinter die user-wochen
 *   verschoben · freie plätze am ende verschwinden entsprechend nach hinten.
 *
 * return: array mit displayStatus je slot-position (kw bleibt SLOTS[i].kw).
 */
export function computeDisplayedStatuses(
  modus: Modus,
  dauer: number,
  slots: Slot[] = SLOTS,
): SlotStatus[] {
  const start = findStartSlot(modus, slots);
  if (!start) return slots.map((s) => s.status);

  const startIdx = slots.findIndex(
    (s) => s.kw === start.kw && s.jahr === start.jahr,
  );

  if (modus === "flex") {
    // flex: keine verschiebung. alles bleibt wie es ist.
    return slots.map((s) => s.status);
  }

  // urgent: tail ab startIdx = non-urgent-sequenz. user-slot (dauer× "user-platzhalter")
  // kommt an den anfang, die bestehenden normal-slots rutschen entsprechend nach hinten.
  const head = slots.slice(0, startIdx).map((s) => s.status);
  const tail = slots.slice(startIdx).map((s) => s.status); // N N N F F F …
  // user belegt dauer wochen. wir markieren diese als "normal" (placeholder),
  // die render-logik überschreibt sie per active-indices.
  const rebuilt: SlotStatus[] = [];
  // erste dauer positionen = user (platzhalter "normal" — wird als active markiert)
  for (let i = 0; i < Math.min(dauer, tail.length); i++) rebuilt.push("normal");
  // danach die original-nicht-urgent-statusse in ihrer reihenfolge
  for (const st of tail) {
    if (rebuilt.length >= tail.length) break;
    rebuilt.push(st);
  }

  return [...head, ...rebuilt];
}
