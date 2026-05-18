import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import content from "@/data/content.json";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Insert Projects
    await db.collection("projects").deleteMany({});
    if (content.projects && content.projects.length > 0) {
      await db.collection("projects").insertMany(content.projects);
    }

    // Insert Posts
    await db.collection("posts").deleteMany({});
    if (content.posts && content.posts.length > 0) {
      await db.collection("posts").insertMany(content.posts);
    }

    // Insert Settings
    await db.collection<any>("settings").updateOne(
      { _id: "global" },
      { $set: content.settings },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Migration de content.json vers MongoDB terminée avec succès !" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Erreur lors de la migration" }, { status: 500 });
  }
}
