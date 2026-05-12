"use client";

import { useEffect } from "react";
import { CONTACT } from "@/config/contact";

/**
 * easter egg · console-greeting.
 * läuft einmal pro tab bei mount · lime wortmark + kontakt-infos.
 * für die curious developers die F12 drücken.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    // guard · nur einmal pro tab
    if (typeof window === "undefined") return;
    const w = window as unknown as { __laconisHello?: boolean };
    if (w.__laconisHello) return;
    w.__laconisHello = true;

    const lime = "#d9ff00";
    const off = "#f2f0e7";
    const dim = "rgba(242,240,231,0.55)";

    const wordmarkStyle = [
      `color:${lime}`,
      "font-size:72px",
      "font-weight:900",
      "letter-spacing:-0.05em",
      "font-family:'DM Sans',system-ui,-apple-system,sans-serif",
      "line-height:1",
      "padding:8px 0",
    ].join(";");

    const taglineStyle = [
      `color:${off}`,
      "font-size:14px",
      "font-style:italic",
      "font-family:serif",
      "padding:4px 0 12px",
    ].join(";");

    const labelStyle = [
      `color:${lime}`,
      "font-weight:bold",
      "font-family:monospace",
      "font-size:12px",
    ].join(";");

    const valueStyle = [
      `color:${off}`,
      "font-family:monospace",
      "font-size:12px",
    ].join(";");

    const dimStyle = [
      `color:${dim}`,
      "font-family:monospace",
      "font-size:11px",
      "font-style:italic",
      "padding-top:12px",
    ].join(";");

    /* eslint-disable no-console */
    console.log("%clacønis", wordmarkStyle);
    console.log("%cdesign mit meinung · web mit seele.", taglineStyle);
    console.log(
      "%cweb   %chttps://laconis.be",
      labelStyle,
      valueStyle,
    );
    console.log(
      `%cmail  %c${CONTACT.emailPrivate}`,
      labelStyle,
      valueStyle,
    );
    console.log(
      "%cort   %cEupen · Belgien (Ostbelgien)",
      labelStyle,
      valueStyle,
    );
    console.log(
      "%csagt  %c„say less · mean møre\"",
      labelStyle,
      valueStyle,
    );
    console.log(
      "%cdu liest das? dann machst du wahrscheinlich was mit code.\nwenn du ein projekt hast · schreib mir. ich beiße nicht.",
      dimStyle,
    );
    /* eslint-enable no-console */
  }, []);

  return null;
}
