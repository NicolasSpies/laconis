import { NextResponse, type NextRequest } from "next/server";

/**
 * i18n-middleware · läuft VOR jedem request.
 *
 * Job:
 * 1. Locale aus dem URL-prefix extrahieren (/fr/..., /en/..., sonst DE)
 * 2. Locale als header `x-locale` an die page weiterreichen
 *    (server-components können das via headers() lesen)
 * 3. NICHT redirect — die rewrites in next.config.mjs erledigen das URL-mapping
 */

export const config = {
  /**
   * Matcher schließt asset- und API-routen aus.
   * matcher-regex: alles AUSSER pfade die mit den genannten prefixes starten.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|icon|apple-icon|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

function detectLocale(pathname: string): "de" | "fr" | "en" {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "de";
}

export function middleware(req: NextRequest) {
  const locale = detectLocale(req.nextUrl.pathname);

  // header durchreichen · pages können via next/headers `headers().get('x-locale')` lesen
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
