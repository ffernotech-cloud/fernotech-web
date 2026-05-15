"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = React.useState<"idle" | "sending" | "success">("idle");

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
      className="py-24 relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-[#050506]/90 backdrop-blur-[2px] z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{t("contact_title")}</h2>
            <p className="text-white/60 mb-10">
              {t("contact_desc")}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 glass p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">{t("contact_whatsapp_label")}</p>
                  <p className="font-bold">+236 72 93 47 90 / 76 05 58 44</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">{t("contact_email_label")}</p>
                  <p className="font-bold">contact.fernotech@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-wider">{t("contact_location_label")}</p>
                  <p className="font-bold">{t("contact_location_val")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl border-white/5"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">{t("form_name")}</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors text-white"
                    placeholder={t("form_name_placeholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">{t("form_email")}</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors text-white"
                    placeholder={t("form_email_placeholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">{t("form_subject")}</label>
                <input 
                  required
                  name="subject"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors text-white"
                  placeholder={t("form_subject_placeholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">{t("form_message")}</label>
                <textarea 
                  required
                  name="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors text-white"
                  placeholder={t("form_message_placeholder")}
                />
              </div>
              <button 
                disabled={status === "sending"}
                className={cn(
                  "w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(255,205,0,0.2)]",
                  status === "success" ? "bg-brand-green text-white" : "bg-brand-yellow text-black hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {status === "idle" && <><Send className="w-5 h-5" /> {t("submit_btn")}</>}
                {status === "sending" && <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />}
                {status === "success" && <><CheckCircle2 className="w-5 h-5" /> {t("submit_btn")}</>}
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
