"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * AutoReveal — globale, home-style staffel-reveals für alle <section>-elemente.
 *
 * pattern: jede section wird zum `reveal-root`, ihre content-kinder (innerhalb
 * von .container-site) werden mit `reveal-up` + gestaffelter `--rd`-verzögerung
 * getaggt. ein IntersectionObserver flipped die section auf `data-show="1"`,
 * sobald sie im viewport landet — die kinder faden dann nacheinander rein,
 * exakt wie auf der home.
 *
 * - sektionen die beim mount schon im viewport sind, werden sofort auf „gezeigt"
 *   gesetzt (kein flash oben).
 * - opt-out: `data-no-reveal` auf einer section oder das element hat bereits
 *   `reveal-root` (manuelles pattern bleibt unangetastet).
 * - reduced-motion: CSS übernimmt — keine transitions werden gesetzt.
 *
 * re-triggert bei CSR-navigation über `usePathname()`.
 */

const STAGGER_MS = 90;
const STAGGER_MAX_MS = 520;

export function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>("section"),
    ).filter((s) => {
      if (s.dataset.noReveal !== undefined) return false;
      if (s.classList.contains("reveal-root")) return false;
      if (s.querySelector(".reveal-root")) return false;
      return true;
    });

    if (sections.length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // tag sections + ihre content-kinder
    const tagged: Array<{ section: HTMLElement; children: HTMLElement[] }> = [];

    for (const section of sections) {
      // stagger-container bestimmen:
      // 1. .container-site direkt innerhalb section (häufigstes pattern)
      // 2. .container-site irgendwo drin
      // 3. erstes kind-element der section das selbst kinder hat (für sections
      //    ohne container-site-wrapper, zb bei custom-layouts)
      // 4. fallback: section selbst
      let container: HTMLElement =
        section.querySelector<HTMLElement>(":scope > .container-site") ??
        section.querySelector<HTMLElement>(".container-site") ??
        section;

      if (container === section) {
        // kein container-site · suche erstes kind das mehrere content-kinder hat
        const candidate = Array.from(section.children).find(
          (c): c is HTMLElement =>
            c instanceof HTMLElement && c.children.length > 1,
        );
        if (candidate) container = candidate;
      }

      // filter: nur „echte" content-kinder · kein sr-only, keine absolute-deko
      const children = (Array.from(container.children) as HTMLElement[]).filter(
        (c) => {
          if (c.classList.contains("sr-only")) return false;
          if (c.getAttribute("aria-hidden") === "true") return false;
          // absolute/fixed-positionierte deko-elemente überspringen
          const pos = window.getComputedStyle(c).position;
          if (pos === "absolute" || pos === "fixed") return false;
          return true;
        },
      );
      if (children.length === 0) continue;

      section.classList.add("reveal-root");
      children.forEach((child, i) => {
        child.classList.add("reveal-up");
        const delay = Math.min(i * STAGGER_MS, STAGGER_MAX_MS);
        child.style.setProperty("--rd", `${delay}ms`);
      });

      tagged.push({ section, children });
    }

    if (tagged.length === 0) return;

    if (prefersReduced) {
      tagged.forEach(({ section }) =>
        section.setAttribute("data-show", "1"),
      );
      return;
    }

    // sofort-show für sektionen die schon im viewport sind (kein flash oben)
    // ABER: data-show="1" muss erst NACH einem paint gesetzt werden, sonst
    // batcht der browser reveal-up-class + data-show zusammen und die transition
    // spielt nie ab — das element erscheint hart statt zu faden.
    const viewportH = window.innerHeight;
    const needsObserver: HTMLElement[] = [];
    const showImmediately: HTMLElement[] = [];
    for (const { section } of tagged) {
      const rect = section.getBoundingClientRect();
      const alreadyVisible = rect.top < viewportH * 0.92 && rect.bottom > 0;
      if (alreadyVisible) {
        showImmediately.push(section);
      } else {
        needsObserver.push(section);
      }
    }

    // double-rAF: erste frame paintet den initial-state (opacity:0), zweite
    // frame setzt data-show="1" → transition spielt ab.
    let rafId1 = 0;
    let rafId2 = 0;
    if (showImmediately.length > 0) {
      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          showImmediately.forEach((s) => s.setAttribute("data-show", "1"));
        });
      });
    }

    if (needsObserver.length === 0 || typeof IntersectionObserver === "undefined") {
      needsObserver.forEach((s) => s.setAttribute("data-show", "1"));
      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
        cleanup(tagged);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-show", "1");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "-40px 0px -8% 0px", threshold: 0.01 },
    );

    needsObserver.forEach((s) => io.observe(s));

    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      io.disconnect();
      cleanup(tagged);
    };
  }, [pathname]);

  return null;
}

function cleanup(
  tagged: Array<{ section: HTMLElement; children: HTMLElement[] }>,
) {
  for (const { section, children } of tagged) {
    section.classList.remove("reveal-root");
    section.removeAttribute("data-show");
    for (const child of children) {
      child.classList.remove("reveal-up");
      child.style.removeProperty("--rd");
    }
  }
}
