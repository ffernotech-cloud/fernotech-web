"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, User, Tag, MessageSquare, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export const ContactForm = () => {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const service = searchParams?.get("service") || "";
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Map service slugs to nice subject lines in different languages
  const getSubjectDefault = () => {
    if (!service) return "";
    
    const serviceNames: Record<string, { fr: string, en: string, sg: string }> = {
      robotique: {
        fr: "Demande de devis - Robotique Industrielle & Écologique",
        en: "Quote Request - Industrial & Ecological Robotics",
        sg: "Mû Devis - Lekengo Kua tî Robot"
      },
      electronique: {
        fr: "Demande de devis - Électronique de Pointe & Maintenance",
        en: "Quote Request - Advanced Electronics & Maintenance",
        sg: "Mû Devis - Électronique na Kua tî Kâsa"
      },
      logiciel: {
        fr: "Demande de devis - Développement Logiciel & Applications",
        en: "Quote Request - Software & App Development",
        sg: "Mû Devis - Lekengo Programme (Logiciel)"
      },
      embarque: {
        fr: "Demande de devis - Systèmes Embarqués & IoT",
        en: "Quote Request - Embedded Systems & IoT",
        sg: "Mû Devis - IoT na Système Embarqué"
      },
      formation: {
        fr: "Demande d'information - Formation & Mentorat",
        en: "Information Request - Training & Mentorship",
        sg: "Tènë tî mandango-kua - Wango & Mandango-kua"
      },
      conseil: {
        fr: "Demande de devis - Conseil & Innovation Technologique",
        en: "Quote Request - Consulting & Tech Innovation",
        sg: "Mû Devis - Wango & Fin-yê"
      },
      commerce: {
        fr: "Demande de devis - Vente d'Équipements & Composants",
        en: "Quote Request - Equipment & Components Sales",
        sg: "Mû Devis - Kângo a-machine na kâsa"
      }
    };

    const match = serviceNames[service];
    if (match) {
      return match[language as 'fr' | 'en' | 'sg'] || match.fr;
    }
    
    return "";
  };

  const defaultSubject = getSubjectDefault();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("idle");
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Une erreur est survenue.");
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden bg-[#050508]"
    >
      {/* Background Decorative Cyber Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Panel: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="text-xs uppercase font-black tracking-widest text-brand-yellow mb-3 block">
              // {t("contact_whatsapp_label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
              {t("contact_title")}
            </h2>
            <p className="text-white/60 mb-10 text-sm leading-relaxed max-w-md">
              {t("contact_desc")}
            </p>

            <div className="space-y-4 mb-10">
              {/* WhatsApp / Phone Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 glass p-5 rounded-2xl border border-white/5 hover:border-brand-yellow/30 hover:shadow-[0_0_25px_rgba(255,205,0,0.1)] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("contact_whatsapp_label")}</p>
                  <p className="font-bold text-white text-sm md:text-base">+236 72 93 47 90 / 76 05 58 44</p>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 glass p-5 rounded-2xl border border-white/5 hover:border-brand-blue/30 hover:shadow-[0_0_25px_rgba(0,102,204,0.1)] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("contact_email_label")}</p>
                  <p className="font-bold text-white text-sm md:text-base">contact.fernotech@gmail.com</p>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 glass p-5 rounded-2xl border border-white/5 hover:border-brand-green/30 hover:shadow-[0_0_25px_rgba(0,204,102,0.1)] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("contact_location_label")}</p>
                  <p className="font-bold text-white text-sm md:text-base">{t("contact_location_val")}</p>
                </div>
              </motion.div>
            </div>

            {/* Stylized Cyber Map Placeholder (Interactive visual feel) */}
            <div className="rounded-3xl overflow-hidden border border-white/5 glass h-48 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127278.43085521743!2d18.502939986348825!3d4.387602052194917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a7f6fa07659dfd3%3A0xe5439a3fd9df8ef5!2sBangui!5e0!3m2!1sfr!2scf!4v1715000000000!5m2!1sfr!2scf" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(0.65)" }} 
                allowFullScreen={false} 
                loading="lazy"
                className="transition-opacity group-hover:opacity-85 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] uppercase font-black text-brand-yellow tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping" />
                HQ Bangui, RCA
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">
                    {t("form_name")}
                  </label>
                  <div className="relative">
                    <span className={cn(
                      "absolute left-4 top-3.5 transition-colors duration-300",
                      focusedField === "name" ? "text-brand-yellow" : "text-white/20"
                    )}>
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      required
                      name="name"
                      type="text" 
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-yellow/80 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-white font-medium"
                      placeholder={t("form_name_placeholder")}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">
                    {t("form_email")}
                  </label>
                  <div className="relative">
                    <span className={cn(
                      "absolute left-4 top-3.5 transition-colors duration-300",
                      focusedField === "email" ? "text-brand-yellow" : "text-white/20"
                    )}>
                      <AtSign className="w-4 h-4" />
                    </span>
                    <input 
                      required
                      name="email"
                      type="email" 
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-yellow/80 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-white font-medium"
                      placeholder={t("form_email_placeholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Subject Input */}
              <div className="relative">
                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">
                  {t("form_subject")}
                </label>
                <div className="relative">
                  <span className={cn(
                    "absolute left-4 top-3.5 transition-colors duration-300",
                    focusedField === "subject" ? "text-brand-yellow" : "text-white/20"
                  )}>
                    <Tag className="w-4 h-4" />
                  </span>
                  <input 
                    required
                    name="subject"
                    type="text" 
                    key={defaultSubject}
                    defaultValue={defaultSubject}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-yellow/80 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-white font-medium"
                    placeholder={t("form_subject_placeholder")}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">
                  {t("form_message")}
                </label>
                <div className="relative">
                  <span className={cn(
                    "absolute left-4 top-4 transition-colors duration-300",
                    focusedField === "message" ? "text-brand-yellow" : "text-white/20"
                  )}>
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-yellow/80 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-white font-medium"
                    placeholder={t("form_message_placeholder")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                disabled={status === "sending"}
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300",
                  status === "success" 
                    ? "bg-brand-green text-white shadow-[0_0_20px_rgba(0,204,102,0.3)]" 
                    : "bg-brand-yellow text-black hover:scale-[1.01] active:scale-[0.99] hover:bg-white transition-all shadow-[0_10px_30px_rgba(255,205,0,0.15)]"
                )}
              >
                {status === "idle" && <><Send className="w-4 h-4" /> {t("submit_btn")}</>}
                {status === "sending" && <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />}
                {status === "success" && <><CheckCircle2 className="w-4 h-4 animate-bounce" /> {t("submit_btn")}</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/23672934790"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 cursor-pointer glow-green"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.a>
    </section>
  );
};

export const Contact = () => {
  return (
    <Suspense fallback={
      <div className="py-24 bg-[#050508] text-center text-white">
        <div className="w-10 h-10 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Chargement du formulaire...</p>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
};
