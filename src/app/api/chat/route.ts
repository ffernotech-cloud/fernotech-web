import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const SYSTEM_PROMPT = `
Tu es l'assistant intelligent de FERNOTECH, une entreprise leader en robotique, électronique et innovation technologique basée à Bangui, République centrafricaine.
Ton but est d'aider les visiteurs du site web.
Expertise de FERNOTECH :
- Robotique (bras robotisés, automatisation).
- Électronique (conception de circuits, systèmes embarqués).
- Environnement (transformation de déchets plastiques en produits comme des balais écologiques).
- Formation en technologie.

Consignes :
1. Réponds de manière professionnelle, enthousiaste et technologique.
2. Si la langue demandée est 'fr', réponds en Français.
3. Si la langue demandée est 'sg', réponds en Sango (langue nationale de la RCA).
4. Sois concis et propose toujours d'aider davantage ou d'orienter vers le formulaire de contact.
`;

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    if (!genAI) {
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Langue demandée : ${language === 'sg' ? 'Sango (RCA)' : 'Français'}
    Message de l'utilisateur : ${message}
    
    ${SYSTEM_PROMPT}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
  }
}
