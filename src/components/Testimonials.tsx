"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
  {
    name: "Dr. Jean-Paul M.",
    roleKey: "test_role_1",
    textKey: "test_text_1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
  },
  {
    name: "Marie-Thérèse G.",
    roleKey: "test_role_2",
    textKey: "test_text_2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
  },
  {
    name: "Kevin Banga",
    roleKey: "test_role_3",
    textKey: "test_text_3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
  },
];

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-white/[0.02] light:bg-black/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
          >
            {t("testimonials_title") || "Ils nous font confiance"}
          </motion.h2>
          <p className="text-white/40 light:text-black/40 text-lg">
            {t("testimonials_subtitle") || "Découvrez les retours de ceux qui utilisent nos solutions au quotidien."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass light:bg-black/5 p-8 rounded-[2.5rem] border-white/5 relative group hover:border-brand-blue/30 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              <p className="text-white/70 light:text-black/70 italic mb-8 leading-relaxed">
                "{t(test.textKey) || "Un témoignage incroyable sur l'impact de Fernotech..."}"
              </p>

              <div className="flex items-center gap-4">
                <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full bg-white/10" />
                <div>
                  <h4 className="font-bold text-sm">{test.name}</h4>
                  <p className="text-[10px] text-white/30 light:text-black/30 font-black uppercase tracking-widest">
                    {t(test.roleKey) || "Client"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
