import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const host = req.headers.get("host")!;
  const sParams = searchParams.toString();
  const parts = host.split(".");
  const tenantId = parts.length === 2 ? parts[0] : "";

  // Construct the path of the request
  const path = `${pathname}${sParams.length > 0 ? `?${sParams}` : ""}`;

  const absoluteUrl = new URL(`${tenantId}${path}`, req.url);
  return NextResponse.rewrite(absoluteUrl);
}
