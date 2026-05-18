"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Database, Key, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pageTranslations = {
  fr: {
    subtitle: "// RGPD & Sécurité",
    title1: "Politique de",
    title2: "Confidentialité",
    sec1_title: "1. Données Collectées",
    sec1_desc1: "Lorsque vous utilisez notre formulaire de contact, nous collectons de manière sécurisée les données personnelles suivantes :",
    sec1_li1: "Nom / Prénom : Pour pouvoir s'adresser à vous personnellement.",
    sec1_li2: "Adresse Email : Pour vous répondre directement par écrit.",
    sec1_li3: "Sujet & Message : Les détails de votre demande commerciale ou technique.",
    sec2_title: "2. Utilisation des Données",
    sec2_desc1: "Vos données personnelles sont traitées exclusivement pour les finalités suivantes :",
    sec2_li1: "Répondre à vos demandes de devis, d'information et d'assistance.",
    sec2_li2: "Garantir la sécurité informatique et prévenir la fraude sur notre site internet.",
    sec2_desc2: "Nous ne revendons, ne louons et ne partageons jamais vos données personnelles avec des tiers à des fins publicitaires.",
    sec3_title: "3. Stockage & Sécurité des Données",
    sec3_desc1: "Vos messages de contact sont sécurisés via l'API cloud de Resend et stockés de manière confidentielle. Vos informations d'administration sont sauvegardées dans notre base de données cloud MongoDB Atlas, protégée par des pare-feux et des connexions chiffrées SSL/TLS de bout en bout.",
    sec4_title: "4. Vos Droits",
    sec4_desc1: "Conformément aux réglementations internationales sur la protection des données personnelles, vous disposez d'un droit permanent d'accès, de rectification, de limitation et de suppression de vos données personnelles collectées.",
    sec4_desc2: "Pour exercer ce droit, écrivez-nous simplement par e-mail à : contact.fernotech@gmail.com."
  },
  sg: {
    subtitle: "// Batangö ndâ tî tènë",
    title1: "Batangö ndâ",
    title2: "ti tènë",
    sec1_title: "1. Akua ti ndara ti mo so e bôngbi nî",
    sec1_desc1: "Tongo maseka so asara tènë na e na ndö ti form, e batangö a-information ti mo sêse :",
    sec1_li1: "Irî tî mo : Ti sâra tènë na mo na irî tî mo.",
    sec1_li2: "Email tî mo : Ti to tene tî kîrî tènë na mo.",
    sec1_li3: "Lê ti tènë & Tènë : Ayê so mo ye e leke nî.",
    sec2_title: "2. Sângo ndâ ti kua ti mo",
    sec2_desc1: "E yeke sâra kua na akua so e bôngbi nî gï na lê ti yê so :",
    sec2_li1: "Ti to kîrî tènë na ndö ti a-question wala kua ti mo.",
    sec2_li2: "Ti bata nzo tambûla ti site internet ti e.",
    sec2_desc2: "E yeke kângo wala mûngo a-information ti mo na a-société ti gigi pëpe.",
    sec3_title: "3. Sécurité tî a-information tî mo",
    sec3_desc1: "A-tènë ti contact ti mo ayeke na gbe ti ngangu ti Resend na e bata nî sêse. A-kua kûê ti e ayeke na ndö ti MongoDB Atlas cloud database, so ayeke na chiffrage SSL/TLS ti biani ti bata yê ti mo.",
    sec4_title: "4. Ndia tî mo",
    sec4_desc1: "Na gbe ti andia ti ndö ti protection ti a-information, mo lingbi ti bâ, ti gbiângö wala ti fûti ambëtï ti mo so e bata nî.",
    sec4_desc2: "Ti leke yê so, to email na e na : contact.fernotech@gmail.com."
  },
  en: {
    subtitle: "// GDPR & Security",
    title1: "Privacy",
    title2: "Policy",
    sec1_title: "1. Data Collected",
    sec1_desc1: "When you use our contact form, we securely collect the following personal data:",
    sec1_li1: "Name / First Name: To be able to address you personally.",
    sec1_li2: "Email Address: To reply to you directly in writing.",
    sec1_li3: "Subject & Message: The details of your commercial or technical request.",
    sec2_title: "2. Use of Data",
    sec2_desc1: "Your personal data is processed exclusively for the following purposes:",
    sec2_li1: "Respond to your requests for quotes, information, and support.",
    sec2_li2: "Guarantee IT security and prevent fraud on our website.",
    sec2_desc2: "We never resell, rent, or share your personal data with third parties for advertising purposes.",
    sec3_title: "3. Data Storage & Security",
    sec3_desc1: "Your contact messages are secured via Resend's cloud API and stored confidentially. Your administration information is saved in our cloud database MongoDB Atlas, protected by firewalls and end-to-end encrypted SSL/TLS connections.",
    sec4_title: "4. Your Rights",
    sec4_desc1: "In accordance with international regulations on the protection of personal data, you have a permanent right to access, rectify, limit, and delete your collected personal data.",
    sec4_desc2: "To exercise this right, simply write to us by email at: contact.fernotech@gmail.com."
  }
};

export default function Confidentialite() {
  const { language } = useLanguage();
  const content = pageTranslations[language] || pageTranslations.fr;

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
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {content.title1} <span className="text-brand-green">{content.title2}</span>
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
              <Database className="w-5 h-5" /> {content.sec1_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-4">
              <p>{content.sec1_desc1}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>{content.sec1_li1.split(":")[0]} :</strong>{content.sec1_li1.split(":")[1]}</li>
                <li><strong>{content.sec1_li2.split(":")[0]} :</strong>{content.sec1_li2.split(":")[1]}</li>
                <li><strong>{content.sec1_li3.split(":")[0]} :</strong>{content.sec1_li3.split(":")[1]}</li>
              </ul>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-blue">
              <ShieldAlert className="w-5 h-5" /> {content.sec2_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>{content.sec2_desc1}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{content.sec2_li1}</li>
                <li>{content.sec2_li2}</li>
              </ul>
              <p className="pt-2 font-bold text-white">{content.sec2_desc2}</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-yellow">
              <Key className="w-5 h-5" /> {content.sec3_title}
            </h2>
            <div className="text-white/60 text-sm leading-relaxed pl-8 space-y-2">
              <p>{content.sec3_desc1}</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-brand-green">
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
