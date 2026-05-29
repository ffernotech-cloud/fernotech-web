export const config = { runtime: "nodejs" };

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// -------------------------------------------------------------------
// DELETE a single message
// -------------------------------------------------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fernotech_admin")?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("messages").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  } catch (error) {
    console.error("Erreur suppression message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// PATCH (mark as read/unread)
// -------------------------------------------------------------------
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fernotech_admin")?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { read } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("messages").updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: Boolean(read) } }
    );

    if (result.modifiedCount === 1 || result.matchedCount === 1) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  } catch (error) {
    console.error("Erreur mise à jour message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
