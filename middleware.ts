import { NextRequest, NextResponse } from "next/server";

const R_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
const SUFFIX = process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX || "vercel.app";

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

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  let hostname = req.headers.get("host")!;
  const sParams = req.nextUrl.searchParams.toString();

  // Get the hostname of the request (e.g. demo.vercel.app, demo.localhost:3000, etc.)
  hostname = hostname.replace(".localhost:3000", `.${R_DOMAIN}`);

  // Handle vercel preview URLs
  if (hostname.includes("---") && hostname.endsWith(SUFFIX)) {
    hostname = `${hostname.split("---")}.${R_DOMAIN}`;
  }

  // Get the pathname of the request (e.g. /about, /docs, /pricing, etc.)
  const path = `${pathname}${sParams.length > 0 ? `?${sParams}` : ""}`;

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
