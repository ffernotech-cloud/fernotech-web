"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Scale, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pageTranslations = {
  fr: {
    subtitle: "// Documents Officiels",
    title1: "Mentions",
    title2: "Légales",
    sec1_title: "1. Éditeur du Site",
    sec1_desc1: "Le site internet FERNOTECH est édité par la start-up technologique FERNOTECH.",
    sec1_desc2: "Responsable de publication : NAMFOIME-MBESSEM Fernand, Fondateur & Directeur Général.",
    sec1_desc3: "Siège social : Galabadja 3, Bangui, République Centrafricaine (RCA).",
    sec1_desc4: "Contact : contact.fernotech@gmail.com / +236 72 93 47 90",
    sec2_title: "2. Hébergement",
    sec2_desc1: "Le site est hébergé de manière sécurisée sur la plateforme cloud mondiale Vercel :",
    sec2_desc2: "Hébergeur : Vercel Inc.",
    sec2_desc3: "Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA",
    sec2_desc4: "Site Internet : vercel.com",
    sec3_title: "3. Propriété Intellectuelle",
    sec3_desc1: "L'ensemble du contenu présent sur ce site (textes, images, graphismes, logos, codes sources, animations, robotique et designs électroniques) est la propriété exclusive de FERNOTECH, sauf mention contraire.",
    sec3_desc2: "Toute reproduction, distribution, modification ou adaptation de ces éléments, même partielle, est strictement interdite sans l'accord écrit préalable de l'éditeur du site.",
    sec4_title: "4. Limites de Responsabilité",
    sec4_desc1: "FERNOTECH s'efforce d'assurer au mieux de ses possibilités l'exactitude des informations diffusées sur ce site. Toutefois, FERNOTECH ne peut garantir l'exactitude absolue des contenus.",
    sec4_desc2: "L'utilisation des informations et des outils de ce site se fait sous l'entière responsabilité de l'utilisateur."
  },
  sg: {
    subtitle: "// Mbeti ti Ndia",
    title1: "Mbeti ti",
    title2: "Ndia",
    sec1_title: "1. Wasara ti lê ti ndo",
    sec1_desc1: "Lê ti ndo internet ti FERNOTECH ayeke na gbe ti ngangu ti start-up ti technology FERNOTECH.",
    sec1_desc2: "Wasara mbeti : NAMFOIME-MBESSEM Fernand, Fondateur & Wa-kua ti biani.",
    sec1_desc3: "Ködörö ti e : Galabadja 3, Bangui, Béafrîka (RCA).",
    sec1_desc4: "Lôngô : contact.fernotech@gmail.com / +236 72 93 47 90",
    sec2_title: "2. Batangö lê ti ndo (Hébergement)",
    sec2_desc1: "Lê ti ndo so ayeke na gbe ti batangö ti Vercel na ndö ti cloud :",
    sec2_desc2: "Wasara batangö : Vercel Inc.",
    sec2_desc3: "Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA",
    sec2_desc4: "Lê ti ndo : vercel.com",
    sec3_title: "3. Kua ti ndara ti e (Propriété)",
    sec3_desc1: "Akua ti ndara kûê so ayeke na ndö ti lê ti ndo so (atènë, a-photo, a-logo, programme ti ordinateur na tî robot) ayeke ti FERNOTECH ti biani.",
    sec3_desc2: "A yeke ti ndia ti mû wala ti gbiângö akua so kûê wala amanga nî pëpe, sân be-tene ti FERNOTECH.",
    sec4_title: "4. Ndia ti responsabilité",
    sec4_desc1: "FERNOTECH ayeke sâra ngangu ti mû a-tene ti biani na ndö ti lê ti ndo so. Me e lingbi ti tene so kpale oko lingbi ti kâ pëpe.",
    sec4_desc2: "Kua ti ndö ti lê ti ndo so kûê ayeke ti mo mvenî na gbe ti ndia."
  },
  en: {
    subtitle: "// Official Documents",
    title1: "Legal",
    title2: "Notice",
    sec1_title: "1. Site Publisher",
    sec1_desc1: "The FERNOTECH website is published by the FERNOTECH technology start-up.",
    sec1_desc2: "Publication Manager: NAMFOIME-MBESSEM Fernand, Founder & CEO.",
    sec1_desc3: "Headquarters: Galabadja 3, Bangui, Central African Republic (CAR).",
    sec1_desc4: "Contact: contact.fernotech@gmail.com / +236 72 93 47 90",
    sec2_title: "2. Hosting",
    sec2_desc1: "The website is securely hosted on the global Vercel cloud platform:",
    sec2_desc2: "Host: Vercel Inc.",
    sec2_desc3: "Address: 340 S Lemon Ave #4133 Walnut, CA 91789, USA",
    sec2_desc4: "Website: vercel.com",
    sec3_title: "3. Intellectual Property",
    sec3_desc1: "All content present on this site (texts, images, graphics, logos, source codes, animations, robotics, and electronic designs) is the exclusive property of FERNOTECH, unless otherwise stated.",
    sec3_desc2: "Any reproduction, distribution, modification, or adaptation of these elements, even partial, is strictly prohibited without the prior written consent of the publisher.",
    sec4_title: "4. Limitation of Liability",
    sec4_desc1: "FERNOTECH strives to ensure to the best of its ability the accuracy of the information published on this site. However, FERNOTECH cannot guarantee the absolute accuracy of the content.",
    sec4_desc2: "The use of the information and tools on this site is done under the sole responsibility of the user."
  }
};

export default function MentionsLegales() {
  const { language } = useLanguage();
  const content = pageTranslations[language] || pageTranslations.fr;

  return (
    <main className="min-h-screen bg-[#050508] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase font-black tracking-widest text-brand-yellow mb-3 block">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {content.title1} <span className="text-brand-blue">{content.title2}</span>
          </h1>
          <div className="w-12 h-1 bg-brand-yellow mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 glass p-8 md:p-12 rounded-[2.5rem] border border-white/5"
        >
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-yellow">
              <Scale className="w-5 h-5" /> {content.sec1_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>{content.sec1_desc1}</p>
              <p><strong>{content.sec1_desc2.split(":")[0]} :</strong>{content.sec1_desc2.split(":")[1]}</p>
              <p><strong>{content.sec1_desc3.split(":")[0]} :</strong>{content.sec1_desc3.split(":")[1]}</p>
              <p><strong>{content.sec1_desc4.split(":")[0]} :</strong>{content.sec1_desc4.split(":")[1]}</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-blue">
              <Shield className="w-5 h-5" /> {content.sec2_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>{content.sec2_desc1}</p>
              <p><strong>{content.sec2_desc2.split(":")[0]} :</strong>{content.sec2_desc2.split(":")[1]}</p>
              <p><strong>{content.sec2_desc3.split(":")[0]} :</strong>{content.sec2_desc3.split(":")[1]}</p>
              <p><strong>{content.sec2_desc4.split(":")[0]} :</strong>{content.sec2_desc4.split(":")[1]}</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-green">
              <FileText className="w-5 h-5" /> {content.sec3_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-4">
              <p>{content.sec3_desc1}</p>
              <p>{content.sec3_desc2}</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-yellow">
              <UserCheck className="w-5 h-5" /> {content.sec4_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>{content.sec4_desc1}</p>
              <p>{content.sec4_desc2}</p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
