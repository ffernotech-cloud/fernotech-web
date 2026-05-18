"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Cpu, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const teamMembers = [
  {
    id: "founder",
    name: "NAMFOIME-MBESSEM Fernand",
    roleKey: "team_founder_role",
    image: "/team/fernand_cyber.png",
    bioKey: "team_founder_bio",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "engineer",
    name: "Sarah M.",
    roleKey: "team_engineer_role",
    image: "/team/engineer.png",
    bioKey: "team_engineer_bio",
    social: { github: "#", linkedin: "#" }
  },
  {
    id: "manager",
    name: "Emmanuel K.",
    roleKey: "team_manager_role",
    image: "/team/manager.png",
    bioKey: "team_manager_bio",
    social: { twitter: "#", linkedin: "#" }
  }
];

export const Team = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#050506]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-black uppercase tracking-widest mb-6"
          >
            <Star className="w-4 h-4 fill-brand-yellow" />
            {t("team_badge") || "Elite Force"}
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            {t("team_title") || "Notre Équipe"}
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t("team_subtitle") || "Des experts passionnés dévoués à transformer l'avenir technologique de l'Afrique."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-brand-blue/50 group-hover:scale-[1.02]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Social Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {member.social.github && (
                    <a href={member.social.github} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-blue transition-all">
                      <Cpu className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-black transition-all">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-green transition-all">
                      <Zap className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black mb-1 group-hover:text-brand-blue transition-colors">
                  {member.name}
                </h3>
                <p className="text-brand-yellow font-bold text-xs uppercase tracking-widest mb-4">
                  {t(member.roleKey)}
                </p>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {t(member.bioKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
