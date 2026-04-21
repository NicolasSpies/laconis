/**
 * paket-pdf — echtes PDF des kassenzettels bauen.
 * kein print-dialog, direkter download.
 * format: 80 mm breit, dynamische höhe (thermal-receipt-stil).
 */

import { jsPDF } from "jspdf";
import { CONTACT } from "@/config/contact";
import {
  type LineItem,
  type Totals,
  formatEUR,
} from "./paket-pricing";

type PdfInput = {
  items: LineItem[];
  /** anfrage-items · drucksachen & montage, ohne preis im bon */
  inquiryItems?: string[];
  totals: Totals;
  bonNumber: string;
  closestPaket: string | null;
};

const WIDTH_MM = 80;
const MARGIN_MM = 5;
const CONTENT_W = WIDTH_MM - MARGIN_MM * 2;

export function downloadBonPdf({
  items,
  inquiryItems = [],
  totals,
  bonNumber,
  closestPaket,
}: PdfInput) {
  /* höhe grob schätzen: fix-zeilen + monthly-zeilen + headers + anfrage-zeilen */
  const fixItems = items.filter((i) => !i.monthly);
  const monthlyItems = items.filter((i) => i.monthly);
  const approxRows = fixItems.length + monthlyItems.length + inquiryItems.length;
  // grundhöhe (~70mm) + 6.5mm pro zeile + anfrage-header bei bedarf
  const heightMm =
    80 +
    approxRows * 6.5 +
    (monthlyItems.length > 0 ? 25 : 0) +
    (inquiryItems.length > 0 ? 18 : 0);

  const doc = new jsPDF({
    unit: "mm",
    format: [WIDTH_MM, heightMm],
    orientation: "portrait",
  });

  doc.setFont("courier", "normal");

  let y = MARGIN_MM + 6;

  /* ─── zackenrand oben (gepunktete linie, rein deko) ─── */
  doc.setFontSize(8);
  doc.setTextColor(140);
  centerText(doc, "·".repeat(28), y);
  y += 4;

  /* ─── header ─── */
  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.setFont("courier", "bold");
  centerText(doc, "LACØNIS", y);
  y += 4.5;

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  doc.setTextColor(110);
  centerText(doc, "VORANSCHLAG / ESTIMATE", y);
  y += 4;

  const now = new Date();
  const dateStr = now.toLocaleDateString("de-DE");
  const timeStr = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  centerText(doc, `${dateStr}  ${timeStr}`, y);
  y += 3.5;
  centerText(doc, `bon #${bonNumber}`, y);
  y += 5;

  dashedLine(doc, y);
  y += 4;

  /* ─── fix-items ─── */
  doc.setFontSize(8);
  doc.setTextColor(30);
  doc.setFont("courier", "normal");

  fixItems.forEach((item) => {
    y = renderRow(doc, item, y, false);
  });

  y += 2;
  dashedLine(doc, y);
  y += 5;

  /* ─── gesamt einmalig ─── */
  doc.setFontSize(9);
  doc.setFont("courier", "bold");
  doc.setTextColor(10);
  const leftLabel = "GESAMT EINMALIG";
  const rightPrice = `${formatEUR(totals.oneTime)} EUR`;
  doc.text(leftLabel, MARGIN_MM, y);
  rightText(doc, rightPrice, y);
  y += 7;

  /* ─── monthly-block ─── */
  if (monthlyItems.length > 0) {
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.setTextColor(110);
    doc.text("+ LAUFEND PRO MONAT", MARGIN_MM, y);
    y += 4;

    doc.setFontSize(8);
    doc.setTextColor(30);
    monthlyItems.forEach((item) => {
      y = renderRow(doc, item, y, true);
    });

    y += 1;
    dashedLine(doc, y);
    y += 4.5;

    doc.setFontSize(8.5);
    doc.setFont("courier", "bold");
    doc.setTextColor(10);
    doc.text("SUMME / MONAT", MARGIN_MM, y);
    rightText(doc, `${formatEUR(totals.monthly)} EUR`, y);
    y += 6;
  }

  /* ─── anfrage-block (drucksachen, montage · ohne preis) ─── */
  if (inquiryItems.length > 0) {
    dashedLine(doc, y);
    y += 4;
    doc.setFontSize(7);
    doc.setFont("courier", "bold");
    doc.setTextColor(80);
    doc.text("ZUM BESPRECHEN", MARGIN_MM, y);
    y += 3.5;
    doc.setFont("courier", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(130);
    doc.text("preis nach gespräch · über partner", MARGIN_MM, y);
    y += 4.5;
    doc.setFontSize(8);
    doc.setTextColor(30);
    inquiryItems.forEach((label) => {
      const right = "ANFRAGE";
      const priceW = doc.getTextWidth(right);
      const availableLabelW = CONTENT_W - priceW - 3;
      const trimmed = truncateToWidth(doc, label, availableLabelW);
      doc.text(trimmed, MARGIN_MM, y);
      rightText(doc, right, y);
      y += 4.2;
    });
    y += 1;
  }

  /* ─── hinweis „entspricht paket" ─── */
  if (closestPaket) {
    dashedLine(doc, y);
    y += 4;
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.setTextColor(110);
    centerText(doc, "entspricht grob dem paket", y);
    y += 3.5;
    doc.setFontSize(7.5);
    doc.setTextColor(30);
    centerText(doc, closestPaket, y);
    y += 5;
  }

  /* ─── footer ─── */
  dashedLine(doc, y);
  y += 4;
  doc.setFontSize(6.5);
  doc.setTextColor(120);
  doc.setFont("courier", "normal");
  centerText(doc, "RICHTPREIS · KEIN ANGEBOT", y);
  y += 3;
  centerText(doc, "ANTWORT INNERHALB 24 STD", y);
  y += 5;

  doc.setFontSize(8);
  doc.setTextColor(30);
  centerText(doc, "danke • und schönen tag.", y);
  y += 5;

  doc.setFontSize(6);
  doc.setTextColor(130);
  centerText(doc, `laconis.be  ·  ${CONTACT.email}`, y);
  y += 3.5;

  doc.setFontSize(8);
  doc.setTextColor(140);
  centerText(doc, "·".repeat(28), y);

  /* ─── download ─── */
  const filename = `laconis-bon-${bonNumber}.pdf`;
  doc.save(filename);
}

/* ══════════════════════════ helpers ══════════════════════════ */

function centerText(doc: jsPDF, text: string, y: number) {
  const w = doc.getTextWidth(text);
  const x = MARGIN_MM + (CONTENT_W - w) / 2;
  doc.text(text, x, y);
}

function rightText(doc: jsPDF, text: string, y: number) {
  const w = doc.getTextWidth(text);
  doc.text(text, WIDTH_MM - MARGIN_MM - w, y);
}

function dashedLine(doc: jsPDF, y: number) {
  doc.setDrawColor(160);
  doc.setLineDashPattern([0.6, 0.6], 0);
  doc.setLineWidth(0.2);
  doc.line(MARGIN_MM, y, WIDTH_MM - MARGIN_MM, y);
  // reset für folgende linien
  doc.setLineDashPattern([], 0);
}

/**
 * rendert eine item-zeile mit dotted-leaders & optionalem hint darunter.
 * returns die neue y-position.
 */
function renderRow(
  doc: jsPDF,
  item: LineItem,
  y: number,
  monthly: boolean
): number {
  const priceStr = `${item.discount ? "-" : ""}${formatEUR(Math.abs(item.amount))} EUR${
    monthly ? "/M" : ""
  }`;

  // label darf nicht überlappen mit preis → trimmen wenn zu lang
  const priceW = doc.getTextWidth(priceStr);
  const availableLabelW = CONTENT_W - priceW - 3;
  const label = truncateToWidth(doc, item.label, availableLabelW);

  doc.setFont("courier", item.discount ? "italic" : "normal");
  doc.setTextColor(item.discount ? 90 : 30);
  doc.text(label, MARGIN_MM, y);
  rightText(doc, priceStr, y);
  doc.setFont("courier", "normal");

  if (item.hint) {
    y += 3;
    doc.setFontSize(6.5);
    doc.setTextColor(130);
    // einrücken für hint
    doc.text(item.hint, MARGIN_MM + 2, y);
    doc.setFontSize(8);
    doc.setTextColor(30);
    y += 3.5;
  } else {
    y += 3.8;
  }

  return y;
}

function truncateToWidth(doc: jsPDF, text: string, maxWidth: number): string {
  if (doc.getTextWidth(text) <= maxWidth) return text;
  let t = text;
  while (doc.getTextWidth(t + "…") > maxWidth && t.length > 0) {
    t = t.slice(0, -1);
  }
  return t + "…";
}
