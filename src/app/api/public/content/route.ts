import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const projects = await db.collection("projects").find({}).toArray();
    const posts = await db.collection("posts").find({}).toArray();
    const events = await db.collection("events").find({}).toArray();
    const settingsDoc = await db.collection<any>("settings").findOne({ _id: "global" });

    const cleanProjects = projects.map(({ _id, ...rest }) => rest);
    const cleanPosts = posts.map(({ _id, ...rest }) => rest);
    const cleanEvents = events.map(({ _id, ...rest }) => rest);
    const cleanSettings = settingsDoc ? (() => { const { _id, ...rest } = settingsDoc; return rest; })() : null;

    return NextResponse.json({
      projects: cleanProjects,
      posts: cleanPosts,
      events: cleanEvents,
      settings: cleanSettings || {
        siteName: "FERNOTECH",
        contactEmail: "contact@fernando.tech",
        contactPhone: "+236 72 93 47 90",
        address: "Galabadja 3, Bangui, RCA"
      }
    });
  } catch (error) {
    console.error("Erreur lecture MongoDB publique :", error);
    return NextResponse.json({ error: "Impossible de lire les données" }, { status: 500 });
  }
}
