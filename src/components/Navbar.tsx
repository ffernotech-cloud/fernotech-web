"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Zap, Globe, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: t("nav_home"), href: "/" },
    { 
      name: t("nav_services"), 
      href: "/services",
      dropdown: [
        { name: t("service_robotique_title"), href: "/services" },
        { name: t("service_electronique_title"), href: "/services" },
        { name: t("service_logiciel_title"), href: "/services" },
        { name: t("service_embarque_title"), href: "/services" },
        { name: t("service_formation_title"), href: "/services" }
      ]
    },
    { name: t("nav_about"), href: "/about" },
    { name: t("nav_projects"), href: "/projets" },
    { name: t("nav_blog"), href: "/blog" },
    { name: t("nav_events"), href: "/evenements" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-black/60 dark:bg-black/60 light:bg-white/80 backdrop-blur-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative bg-white px-3 py-2 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-105">
            <img src="/logo.jpg" alt="FERNOTECH Logo" className="h-16 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                className="text-base font-bold text-white/70 light:text-black/70 hover:text-white light:hover:text-black transition-colors flex items-center gap-1"
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all group-hover:w-full" />
              </Link>
              
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-[#050506]/95 dark:bg-[#050506]/95 light:bg-white/95 backdrop-blur-xl border border-white/10 light:border-black/10 rounded-2xl p-2 w-64 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    {link.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-4 py-3 text-sm text-white/70 light:text-black/70 hover:text-white light:hover:text-black hover:bg-white/10 light:hover:bg-black/5 rounded-xl transition-colors"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex items-center bg-white/5 light:bg-black/5 rounded-full p-1 border border-white/10 light:border-black/10">
            <button 
              onClick={() => setLanguage("fr")}
              className={cn("px-3 py-1 rounded-full text-xs font-black transition-all", language === "fr" ? "bg-white light:bg-black text-black light:text-white" : "text-white/40 light:text-black/40 hover:text-white light:hover:text-black")}
            >
              FR
            </button>
            <button 
              onClick={() => setLanguage("en")}
              className={cn("px-3 py-1 rounded-full text-xs font-black transition-all", language === "en" ? "bg-white light:bg-black text-black light:text-white" : "text-white/40 light:text-black/40 hover:text-white light:hover:text-black")}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage("sg")}
              className={cn("px-3 py-1 rounded-full text-xs font-black transition-all", language === "sg" ? "bg-white light:bg-black text-black light:text-white" : "text-white/40 light:text-black/40 hover:text-white light:hover:text-black")}
            >
              SG
            </button>
          </div>

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full glass light:bg-black/5 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-brand-yellow" /> : <Moon className="w-5 h-5 text-brand-blue" />}
          </button>

          <Link
            href="/contact"
            className="px-6 py-2.5 bg-white light:bg-black text-black light:text-white rounded-full text-base font-bold hover:bg-brand-yellow hover:text-black transition-all hover:scale-105 active:scale-95"
          >
            {t("nav_contact")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-brand-yellow" /> : <Moon className="w-4 h-4 text-brand-blue" />}
          </button>
          <button 
            onClick={() => {
              if (language === "fr") setLanguage("en");
              else if (language === "en") setLanguage("sg");
              else setLanguage("fr");
            }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-xs font-black text-brand-yellow"
          >
            {language.toUpperCase()}
          </button>
          <button
            className="text-white light:text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/80 hover:text-brand-yellow"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-brand-yellow text-black rounded-xl font-bold text-center"
              >
                {t("nav_contact")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
