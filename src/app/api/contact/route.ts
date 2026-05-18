import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ success: false, error: "Configuration serveur incorrecte" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Note : si le domaine n'est pas vérifié sur Resend, l'envoi ne peut se faire que vers l'adresse du compte Resend
    // avec 'onboarding@resend.dev' comme expéditeur.
    await resend.emails.send({
      from: 'FERNOTECH Web <onboarding@resend.dev>',
      to: 'ffernotech@gmail.com',
      replyTo: email,
      subject: `[Web Contact] ${subject} - de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; margin-top: 20px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 11px; color: #888; text-align: center;">Ce message a été envoyé depuis le formulaire de contact du site FERNOTECH.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: "Message envoyé avec succès !" }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur API Contact :", error);
    return NextResponse.json({ success: false, error: error.message || "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
