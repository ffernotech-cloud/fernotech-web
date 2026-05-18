"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Scale, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MentionsLegales() {
  const { t } = useLanguage();

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
            // Documents Officiels
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Mentions <span className="text-brand-blue">Légales</span>
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
              <Scale className="w-5 h-5" /> 1. Éditeur du Site
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>Le site internet <strong>FERNOTECH</strong> est édité par la start-up technologique FERNOTECH.</p>
              <p><strong>Responsable de publication :</strong> NAMFOIME-MBESSEM Fernand, Fondateur & Directeur Général.</p>
              <p><strong>Siège social :</strong> Galabadja 3, Bangui, République Centrafricaine (RCA).</p>
              <p><strong>Contact :</strong> contact.fernotech@gmail.com / +236 72 93 47 90</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-blue">
              <Shield className="w-5 h-5" /> 2. Hébergement
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>Le site est hébergé de manière sécurisée sur la plateforme cloud mondiale <strong>Vercel</strong> :</p>
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>
              <p><strong>Site Internet :</strong> vercel.com</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-green">
              <FileText className="w-5 h-5" /> 3. Propriété Intellectuelle
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-4">
              <p>
                L'ensemble du contenu présent sur ce site (textes, images, graphismes, logos, codes sources, animations, robotique et designs électroniques) est la propriété exclusive de <strong>FERNOTECH</strong>, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, distribution, modification ou adaptation de ces éléments, même partielle, est strictement interdite sans l'accord écrit préalable de l'éditeur du site.
              </p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-yellow">
              <UserCheck className="w-5 h-5" /> 4. Limites de Responsabilité
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>
                FERNOTECH s'efforce d'assurer au mieux de ses possibilités l'exactitude des informations diffusées sur ce site. Toutefois, FERNOTECH ne peut garantir l'exactitude absolue des contenus.
              </p>
              <p>
                L'utilisation des informations et des outils de ce site se fait sous l'entière responsabilité de l'utilisateur.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
