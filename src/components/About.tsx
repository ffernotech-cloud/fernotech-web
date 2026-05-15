"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  const values = [
    { title: t("value_innovation_title"), icon: Target, desc: t("value_innovation_desc") },
    { title: t("value_expertise_title"), icon: Eye, desc: t("value_expertise_desc") },
    { title: t("value_durability_title"), icon: CheckCircle2, desc: t("value_durability_desc") },
    { title: t("value_impact_title"), icon: Users, desc: t("value_impact_desc") },
  ];

  const timeline = [
    { year: "2020", title: t("timeline_2020_title"), desc: t("timeline_2020_desc") },
    { year: "2022", title: t("timeline_2022_title"), desc: t("timeline_2022_desc") },
    { year: "2024", title: t("timeline_2024_title"), desc: t("timeline_2024_desc") },
    { year: "Futur", title: t("timeline_future_title"), desc: t("timeline_future_desc") },
  ];

  return (
    <section 
      id="about" 
      className="py-24 relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-[#050506]/90 backdrop-blur-[2px] z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6">
              {t("about_title")} <span className="text-brand-yellow">FERNOTECH</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {t("about_desc")}
            </p>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              {t("about_model")}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-green" />
                </div>
                <div>
                  <h4 className="font-bold">{t("about_mission")}</h4>
                  <p className="text-white/50 text-sm">{t("about_mission_desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                </div>
                <div>
                  <h4 className="font-bold">{t("about_vision")}</h4>
                  <p className="text-white/50 text-sm">{t("about_vision_desc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-2 gap-4"
          >
            {values.map((val, idx) => (
              <div key={val.title} className="glass p-6 rounded-2xl border-white/5 hover:bg-white/10 transition-colors">
                <val.icon className="w-8 h-8 text-brand-yellow mb-4" />
                <h4 className="font-bold mb-2">{val.title}</h4>
                <p className="text-white/40 text-xs">{val.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Timeline placeholder */}
        <div className="mt-24 pt-24 border-t border-white/10">
          <h3 className="text-2xl font-bold text-center mb-16">{t("about_evolution_title")}</h3>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 hidden md:block" />
            <div className="flex flex-col md:flex-row justify-between gap-12 relative">
              {timeline.map((item, idx) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex-1 text-center md:text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-black flex items-center justify-center mx-auto md:mx-0 mb-6 relative z-10 shadow-[0_0_15px_rgba(255,205,0,0.5)]">
                    {item.year[0]}
                  </div>
                  <h5 className="text-brand-yellow font-bold text-xl mb-2">{item.year}</h5>
                  <h6 className="font-bold text-white mb-2">{item.title}</h6>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
