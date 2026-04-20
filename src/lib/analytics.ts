/**
 * analytics-client · dünner wrapper für spätere ContentCore-integration.
 *
 * prinzip:
 * - keine fremdanbieter, keine cookies, kein local-storage-tracking
 * - session-id lebt in sessionStorage (stirbt mit dem tab)
 * - dev: console-log, sonst no-op
 * - prod: wird später über env.NEXT_PUBLIC_CONTENTCORE_ENDPOINT gepushed
 *
 * die `track()`-funktion ist bewusst synchron + fire-and-forget.
 * fehler beim senden dürfen nie die user-experience brechen.
 */

export type AnalyticsEvent =
  | { type: "pageview"; path: string; referrer?: string }
  | {
      type: "form_submit";
      form: "kontakt";
      paket?: string;
      priceOneTime?: number;
    }
  | { type: "cta_click"; label: string; target: string }
  | {
      type: "paket_selected";
      paket: string;
      tab: "web" | "grafik" | "bundle";
    }
  | {
      type: "baukasten_anfrage";
      priceOneTime: number;
      priceMonthly: number;
    }
  | { type: "step_abandoned"; step: number; paket?: string }
  | { type: "paket_tab_switched"; from: string; to: string }
  | { type: "konami_triggered" }
  | { type: "four_oh_four_challenge_completed"; level: number }
  | { type: "evolution_slider_used"; slug: string };

const SESSION_KEY = "laconis-session";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return "no-storage";
  }
}

export function track(event: AnalyticsEvent): void {
  try {
    const payload = {
      ...event,
      sessionId: getSessionId(),
      ts: Date.now(),
    };

    if (process.env.NODE_ENV !== "production") {
      // dev-sichtbarkeit · production: stiller
      // eslint-disable-next-line no-console
      console.log("[analytics]", payload);
      return;
    }

    // TODO · ContentCore-integration
    // const endpoint = process.env.NEXT_PUBLIC_CONTENTCORE_ENDPOINT;
    // if (!endpoint) return;
    // if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    //   navigator.sendBeacon(endpoint, JSON.stringify(payload));
    // } else {
    //   fetch(endpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //     keepalive: true,
    //   }).catch(() => {});
    // }
  } catch {
    // still — analytics darf nie die seite brechen
  }
}
