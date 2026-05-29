import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Auth is verified inside each API route handler directly,
  // so middleware just passes requests through.
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/content/:path*"],
};
