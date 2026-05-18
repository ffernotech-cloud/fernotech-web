import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const projects = await db.collection("projects").find({}).toArray();
    const posts = await db.collection("posts").find({}).toArray();
    const settingsDoc = await db.collection("settings").findOne({ _id: "global" });

    // Sanitize MongoDB _id for client
    const cleanProjects = projects.map(({ _id, ...rest }) => rest);
    const cleanPosts = posts.map(({ _id, ...rest }) => rest);
    const cleanSettings = settingsDoc ? (() => { const { _id, ...rest } = settingsDoc; return rest; })() : null;

    return NextResponse.json({
      projects: cleanProjects,
      posts: cleanPosts,
      settings: cleanSettings || {
        siteName: "FERNOTECH",
        contactEmail: "contact@fernando.tech",
        contactPhone: "+236 72 93 47 90",
        address: "Galabadja 3, Bangui, RCA"
      }
    });
  } catch (error) {
    console.error("Erreur lecture MongoDB :", error);
    return NextResponse.json({ error: "Impossible de lire les données" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // Upsert Projects (supprime tout et recrée ou utilise des updates)
    // Pour simplifier, vu que c'est un panel admin global :
    if (newData.projects) {
      await db.collection("projects").deleteMany({});
      if (newData.projects.length > 0) {
        await db.collection("projects").insertMany(newData.projects);
      }
    }

    if (newData.posts) {
      await db.collection("posts").deleteMany({});
      if (newData.posts.length > 0) {
        await db.collection("posts").insertMany(newData.posts);
      }
    }

    if (newData.settings) {
      await db.collection("settings").updateOne(
        { _id: "global" },
        { $set: newData.settings },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur écriture MongoDB :", error);
    return NextResponse.json({ error: "Impossible de sauvegarder les données" }, { status: 500 });
  }
}
