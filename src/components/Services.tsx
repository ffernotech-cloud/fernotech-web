"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Cpu, Code, Smartphone, GraduationCap, Briefcase, ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export const Services = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      id: "robotique",
      title: t("service_robotique_title"),
      desc: t("service_robotique_desc"),
      icon: Bot,
      color: "brand-red",
      glow: "glow-red",
    },
    {
      id: "electronique",
      title: t("service_electronique_title"),
      desc: t("service_electronique_desc"),
      icon: Cpu,
      color: "brand-yellow",
      glow: "glow-yellow",
    },
    {
      id: "logiciel",
      title: t("service_logiciel_title"),
      desc: t("service_logiciel_desc"),
      icon: Code,
      color: "brand-blue",
      glow: "glow-blue",
    },
    {
      id: "embarque",
      title: t("service_embarque_title"),
      desc: t("service_embarque_desc"),
      icon: Smartphone,
      color: "brand-green",
      glow: "glow-green",
    },
    {
      id: "formation",
      title: t("service_formation_title"),
      desc: t("service_formation_desc"),
      icon: GraduationCap,
      color: "white",
      glow: "shadow-white/20",
    },
    {
      id: "conseil",
      title: t("service_conseil_title"),
      desc: t("service_conseil_desc"),
      icon: Briefcase,
      color: "brand-blue",
      glow: "glow-blue",
    },
    {
      id: "commerce",
      title: t("service_commerce_title"),
      desc: t("service_commerce_desc"),
      icon: ShoppingBag,
      color: "brand-yellow",
      glow: "glow-yellow",
    },
  ];

  return (
    <section 
      id="services" 
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-[#050506]/90 backdrop-blur-[2px] z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-brand-yellow">{t("services_title")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-xl mx-auto"
          >
            {t("services_subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Link key={service.title} href={`/services/${service.id}`} className="block h-full">
              <motion.div
                id={service.id}
                style={{ scrollMarginTop: "120px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "glass p-8 rounded-3xl relative group cursor-pointer border-transparent hover:border-white/20 transition-all h-full flex flex-col justify-between",
                  service.glow && `hover:${service.glow}`
                )}
              >
                <div>
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110",
                    `bg-${service.color}/10 text-${service.color}`
                  )}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className={cn("w-4 h-4", `text-${service.color}`)} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
