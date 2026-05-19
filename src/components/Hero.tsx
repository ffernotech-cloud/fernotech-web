"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Cpu, ChevronRight, Sparkles, Zap, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-overlay-hero-bg backdrop-blur-[1px] z-0" />
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-card-border text-xs font-bold mb-8 text-text-secondary"
          >
            <Sparkles className="w-3 h-3 text-brand-yellow" />
            <span>FERNOTECH v2.0 — {language === 'fr' ? 'Le futur' : 'Kekere-kua'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-text-primary"
          >
            {t("hero_title")} <br />
            <span className="text-brand-yellow drop-shadow-[0_0_15px_rgba(255,205,0,0.3)]">{t("hero_subtitle")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            {t("hero_desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 z-10 relative"
          >
            <Link 
              href="/services" 
              className="px-8 py-4 bg-foreground text-background rounded-full font-bold flex items-center gap-2 hover:bg-brand-yellow hover:text-black transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              {t("hero_discover_btn")} <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 glass text-text-primary rounded-full font-bold hover:bg-white/10 transition-all"
            >
              {t("nav_contact")}
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block space-y-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass p-6 rounded-3xl border-white/5 shadow-2xl"
          >
            <Cpu className="w-12 h-12 text-brand-blue" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="glass p-6 rounded-3xl border-white/5 shadow-2xl translate-x-12"
          >
            <Zap className="w-12 h-12 text-brand-yellow" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="glass p-6 rounded-3xl border-white/5 shadow-2xl"
          >
            <Globe className="w-12 h-12 text-brand-green" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
