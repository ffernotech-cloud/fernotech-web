export const runtime = "nodejs";
import { NextResponse, NextRequest } from "next/server";
import { isValidAdminCredentials, createAdminToken, createAdminCookieHeader } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username ?? process.env.ADMIN_USERNAME ?? "admin");
    const password = String(body.password || "");

    if (!isValidAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = createAdminToken();
    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", createAdminCookieHeader(token));
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Impossible de se connecter" },
      { status: 500 }
    );
  }
}
