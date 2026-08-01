import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// HTTPS enforcement, defense-in-depth.
//
// In production every reverse proxy we deploy behind (Vercel / Railway /
// Cloudflare) terminates TLS and forwards `x-forwarded-proto: https`. If a
// stray request ever arrives as `http`, redirect it permanently to https.
//
// Skipped in development and for localhost since `next dev` is plain http.
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return;

  const proto = request.headers.get("x-forwarded-proto");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (proto === "http" && !host.startsWith("localhost") && !host.startsWith("127.")) {
    const target = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${host}`
    );
    return NextResponse.redirect(target, 301);
  }
}

// Match every path except static assets and the Next.js internals.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|avif|gif|txt|xml|woff2?)$).*)"],
};
