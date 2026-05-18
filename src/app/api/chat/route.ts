import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
Tu es l'assistant intelligent de FERNOTECH, une entreprise leader en robotique, électronique et innovation technologique basée à Bangui, République centrafricaine.
Ton but est d'aider les visiteurs du site web.

Expertise de FERNOTECH :
- Robotique : Bras robotisés, automatisation industrielle, drones de surveillance.
- Électronique : Conception de circuits imprimés (PCB), maintenance, systèmes embarqués.
- Environnement : Transformation de déchets plastiques en produits ménagers (balais écologiques) via des machines brevetées.
- Formation : Ateliers certifiants en robotique et programmation à Bangui.

Consignes de communication :
1. Langues : Réponds EXCLUSIVEMENT dans la langue demandée ('fr' -> Français, 'sg' -> Sango, 'en' -> Anglais).
2. Ton : Professionnel, innovant, futuriste et très serviable.
3. Localisation : N'oublie pas que Fernotech est basé à Galabadja 3, Bangui.
4. Action : Oriente les clients vers le formulaire de contact ou WhatsApp pour les devis.
`;

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback si pas de clé API
      let fallbackResp = language === "fr" 
        ? "Je suis en mode maintenance. Contactez-nous directement pour plus d'infos !" 
        : "Mbi yeke sâra kua na ndö tî machine nî. Sâra tènë na e bîakû !";
      
      const msg = message.toLowerCase();
      if (msg.includes("prix") || msg.includes("ngere")) {
        fallbackResp = language === "fr" ? "Nos tarifs sont sur devis." : "Ngere ayeke changed.";
      }

      return NextResponse.json({ text: fallbackResp });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const languageNames: Record<string, string> = {
      fr: "Français",
      sg: "Sango (langue nationale de la RCA)",
      en: "English"
    };

    const prompt = `
    Langue demandée : ${languageNames[language] || "Français"}
    Message de l'utilisateur : ${message}
    
    ${SYSTEM_PROMPT}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
  }
}
