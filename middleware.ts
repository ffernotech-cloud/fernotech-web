import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "./src/lib/auth";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/admin/content")) {
    const token = req.cookies.get("fernotech_admin")?.value;
    const valid = verifyAdminToken(token);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/content/:path*"],
};
