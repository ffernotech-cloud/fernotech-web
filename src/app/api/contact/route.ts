import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;
    
    // Simulation d'envoi d'email
    console.log("Nouveau message de contact :", { name, email, subject, message });

    // --- LOGIQUE RESEND (Optionnelle) ---
    // Si vous souhaitez envoyer de vrais emails :
    // 1. npm install resend
    // 2. Ajoutez RESEND_API_KEY dans votre .env
    // 3. Décommentez le code ci-dessous :
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'FERNOTECH <web@fernando.tech>',
      to: 'contact@fernando.tech',
      subject: `[Web Contact] ${subject}`,
      html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    });
    */

    return NextResponse.json({ success: true, message: "Message envoyé avec succès !" }, { status: 200 });
  } catch (error) {
    console.error("Erreur API Contact :", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
