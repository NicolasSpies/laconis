/**
 * POST /api/kontakt
 *
 * Nimmt die projekt-anfrage aus KontaktMultistep entgegen und schickt sie
 * per resend als mail an mich.
 *
 * env:
 *   RESEND_API_KEY          — resend api-key (https://resend.com)
 *   KONTAKT_EMPFAENGER      — mail-adresse, an die geschickt werden soll
 *                             (default: nicolas@laconis.be)
 *   KONTAKT_ABSENDER        — from-adresse
 *                             (default: laconis <onboarding@resend.dev>  · dev-sandbox)
 *
 * schutz:
 *   - honeypot-feld "hp" muss leer sein (bot-erkennung)
 *   - zod-validation für alle felder
 *   - simple in-memory rate-limit per IP (5 anfragen / stunde)
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { CONTACT } from "@/config/contact";

export const runtime = "nodejs";

/* ══════════════════════════ rate-limit (in-memory) ══════════════════════════
 * einfache map · reicht für eine portfolio-seite mit 1 instance.
 * für produktion mit mehreren pods → redis nehmen.
 */
type Hit = { count: number; resetAt: number };
const WINDOW_MS = 60 * 60 * 1000; // 1 stunde
const LIMIT = 5;
const hits = new Map<string, Hit>();

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const hit = hits.get(ip);
  if (!hit || now > hit.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (hit.count >= LIMIT) {
    return { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
  }
  hit.count += 1;
  return { ok: true };
}

/* ══════════════════════════ payload-schema ══════════════════════════ */

const payloadSchema = z.object({
  // honeypot · muss leer bleiben
  hp: z.string().max(0).optional().default(""),

  // kontakt (pflicht)
  name: z.string().trim().min(1, "name fehlt").max(120),
  email: z.string().trim().toLowerCase().email("email ungültig").max(200),
  telefon: z.string().trim().max(40).optional().default(""),
  notiz: z.string().trim().max(4000).optional().default(""),

  // projekt-scope
  bedarf: z.string().max(40).optional().default("•"),
  seiten: z.string().max(40).optional().default("•"),
  sprachen: z.string().max(40).optional().default("•"),
  zeitplan: z.string().max(40).optional().default("•"),
  budget: z.string().max(40).optional().default("•"),

  // paket / custom
  paketName: z.string().max(120).optional().default(""),
  hasDomain: z.boolean().optional().default(false),
  mails: z.number().int().min(0).max(99).optional().default(0),
  customBuilderJson: z.string().max(4000).optional().default(""),

  // preis-snapshot (vom client gerechnet, zur info)
  priceOneTime: z.number().int().min(0).max(1_000_000).optional().default(0),
  priceMonthly: z.number().int().min(0).max(100_000).optional().default(0),
  priceSurcharge: z.number().int().min(0).max(1_000_000).optional().default(0),
});

export type KontaktPayload = z.infer<typeof payloadSchema>;

/* ══════════════════════════ mail-body ══════════════════════════ */

function buildMailBody(p: KontaktPayload): { subject: string; html: string; text: string } {
  const subject = `neue projekt-anfrage · ${p.name}${p.paketName ? ` · ${p.paketName}` : ""}`;

  const rows: { k: string; v: string }[] = [
    { k: "name", v: p.name },
    { k: "email", v: p.email },
    { k: "telefon", v: p.telefon || "—" },
    { k: "bedarf", v: p.bedarf },
    { k: "seiten", v: p.seiten },
    { k: "sprachen", v: p.sprachen },
    { k: "zeitplan", v: p.zeitplan },
    { k: "budget", v: p.budget },
    { k: "paket", v: p.paketName || "—" },
    { k: "domain", v: p.hasDomain ? "hat der kunde" : "laconis registriert (+2 €/Mt)" },
    { k: "mails", v: String(p.mails) },
    { k: "preis · einmalig", v: p.priceOneTime ? `${p.priceOneTime.toLocaleString("de-DE")} €` : "—" },
    { k: "preis · monatlich", v: p.priceMonthly ? `${p.priceMonthly.toLocaleString("de-DE")} €/Mt` : "—" },
    ...(p.priceSurcharge
      ? [{ k: "dringend-aufschlag", v: `${p.priceSurcharge.toLocaleString("de-DE")} €` }]
      : []),
  ];

  const text =
    rows.map((r) => `${r.k.padEnd(20)} ${r.v}`).join("\n") +
    (p.notiz ? `\n\n--- notiz ---\n${p.notiz}` : "") +
    (p.customBuilderJson ? `\n\n--- custom builder ---\n${p.customBuilderJson}` : "");

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `<!doctype html>
<html><body style="font-family:ui-monospace,Menlo,monospace;background:#0d0e10;color:#e8e6df;padding:24px;">
  <h2 style="color:#d6ff3f;margin:0 0 16px;font-family:sans-serif;">neue projekt-anfrage</h2>
  <table style="border-collapse:collapse;width:100%;max-width:600px;">
    ${rows
      .map(
        (r) => `<tr>
      <td style="padding:6px 12px 6px 0;color:#9a9890;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;white-space:nowrap;">${esc(r.k)}</td>
      <td style="padding:6px 0;color:#e8e6df;font-size:13px;">${esc(r.v)}</td>
    </tr>`,
      )
      .join("")}
  </table>
  ${
    p.notiz
      ? `<div style="margin-top:24px;padding:16px;background:rgba(255,255,255,0.03);border-left:2px solid #d6ff3f;border-radius:4px;">
    <div style="color:#9a9890;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">notiz</div>
    <div style="color:#e8e6df;font-size:13px;white-space:pre-wrap;">${esc(p.notiz)}</div>
  </div>`
      : ""
  }
  ${
    p.customBuilderJson
      ? `<details style="margin-top:24px;color:#9a9890;font-size:11px;">
    <summary style="cursor:pointer;">custom builder json</summary>
    <pre style="margin-top:8px;padding:12px;background:rgba(255,255,255,0.03);border-radius:4px;white-space:pre-wrap;word-break:break-all;color:#e8e6df;font-size:11px;">${esc(p.customBuilderJson)}</pre>
  </details>`
      : ""
  }
</body></html>`;

  return { subject, html, text };
}

/* ══════════════════════════ handler ══════════════════════════ */

export async function POST(req: Request) {
  // IP fürs rate-limit (hinter vercel/cloudflare: x-forwarded-for)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate-limit · bitte etwas später nochmal" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 3600) } },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  // honeypot: wenn gefüllt → 200 zurück (bot glücklich machen), aber nichts schicken
  if (payload.hp && payload.hp.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // dev-mode: keinen key nötig, anfrage nur loggen · damit flow trotzdem testbar
    // eslint-disable-next-line no-console
    console.log("[kontakt] RESEND_API_KEY fehlt · würde senden:", payload);
    return NextResponse.json({ ok: true, mode: "dev-no-key" }, { status: 200 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.KONTAKT_EMPFAENGER || CONTACT.emailPrivate;
  const from = process.env.KONTAKT_ABSENDER || "laconis <onboarding@resend.dev>";

  const { subject, html, text } = buildMailBody(payload);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      html,
      text,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error("[kontakt] resend-error:", error);
      return NextResponse.json(
        { ok: false, error: "send-failed" },
        { status: 502 },
      );
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[kontakt] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "unexpected" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
