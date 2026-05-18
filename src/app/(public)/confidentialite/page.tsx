"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Database, Key, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Confidentialite() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#050508] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase font-black tracking-widest text-brand-green mb-3 block">
            // RGPD & Sécurité
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Politique de <span className="text-brand-green">Confidentialité</span>
          </h1>
          <div className="w-12 h-1 bg-brand-green mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 glass p-8 md:p-12 rounded-[2.5rem] border border-white/5"
        >
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-green">
              <Database className="w-5 h-5" /> 1. Données Collectées
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-4">
              <p>Lorsque vous utilisez notre formulaire de contact, nous collectons de manière sécurisée les données personnelles suivantes :</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Nom / Prénom</strong> : Pour pouvoir s'adresser à vous personnellement.</li>
                <li><strong>Adresse Email</strong> : Pour vous répondre directement par écrit.</li>
                <li><strong>Sujet & Message</strong> : Les détails de votre demande commerciale ou technique.</li>
              </ul>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-blue">
              <ShieldAlert className="w-5 h-5" /> 2. Utilisation des Données
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>Vos données personnelles sont traitées exclusivement pour les finalités suivantes :</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Répondre à vos demandes de devis, d'information et d'assistance.</li>
                <li>Garantir la sécurité informatique et prévenir la fraude sur notre site internet.</li>
              </ul>
              <p className="pt-2 font-bold text-white">Nous ne revendons, ne louons et ne partageons jamais vos données personnelles avec des tiers à des fins publicitaires.</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-yellow">
              <Key className="w-5 h-5" /> 3. Stockage & Sécurité des Données
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>
                Vos messages de contact sont sécurisés via l'API cloud de **Resend** et stockés de manière confidentielle. Vos informations d'administration sont sauvegardées dans notre base de données cloud **MongoDB Atlas**, protégée par des pare-feux et des connexions chiffrées SSL/TLS de bout en bout.
              </p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-green">
              <UserCheck className="w-5 h-5" /> 4. Vos Droits
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>
                Conformément aux réglementations internationales sur la protection des données personnelles, vous disposez d'un droit permanent d'accès, de rectification, de limitation et de suppression de vos données personnelles collectées.
              </p>
              <p>
                Pour exercer ce droit, écrivez-nous simplement par e-mail à : <strong>contact.fernotech@gmail.com</strong>.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
