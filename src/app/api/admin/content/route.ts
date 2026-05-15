import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/content.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error("Erreur lecture content.json :", error);
    return NextResponse.json({ error: "Impossible de lire les données" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur écriture content.json :", error);
    return NextResponse.json({ error: "Impossible de sauvegarder les données" }, { status: 500 });
  }
}
