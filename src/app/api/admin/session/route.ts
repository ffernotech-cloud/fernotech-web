import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fernotech_admin")?.value;
  const valid = verifyAdminToken(token);
  return NextResponse.json({ authenticated: Boolean(valid) });
}
