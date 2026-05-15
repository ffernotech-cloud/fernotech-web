"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Camera, 
  Briefcase, 
  Play,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: MessageCircle, href: "https://www.facebook.com/fernotech1/", label: "Facebook" },
    { icon: Send, href: "https://x.com/fernotech_", label: "X" },
    { icon: Camera, href: "https://www.instagram.com/fernotech_/", label: "Instagram" },
    { icon: Play, href: "https://www.youtube.com/@Fernotech_236", label: "Youtube" },
    { icon: Briefcase, href: "https://cf.linkedin.com/in/fernotech-start-up-02b6493a8", label: "LinkedIn" },
  ];

  const serviceLinks = [
    "service_robotique_title",
    "service_electronique_title",
    "service_logiciel_title",
    "service_embarque_title",
    "service_formation_title",
  ];

  return (
    <footer className="bg-[#030304] border-t border-white/5 relative overflow-hidden">
      {/* Pre-footer CTA */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="glass rounded-[3rem] p-12 border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[100px] -z-10 group-hover:bg-brand-blue/20 transition-colors" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/5 blur-[100px] -z-10" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">
                Prêt à transformer vos idées <br/> en <span className="text-brand-yellow">réalité technologique ?</span>
              </h2>
              <p className="text-white/40 max-w-md">
                Contactez notre équipe d'ingénieurs pour une étude personnalisée de votre projet.
              </p>
            </div>
            <a 
              href="#contact" 
              className="px-10 py-5 bg-brand-blue text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,82,180,0.3)]"
            >
              Demander un devis <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-white px-5 py-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-block">
                <img src="/logo.jpg" alt="FERNOTECH Logo" className="h-20 w-auto object-contain" />
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              {t("footer_desc")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-blue hover:border-brand-blue transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-yellow mb-8">{t("footer_nav_title")}</h4>
            <ul className="space-y-4">
              {[
                { label: t("nav_home"), href: "/" },
                { label: t("nav_services"), href: "/services" },
                { label: t("nav_about"), href: "/about" },
                { label: t("nav_projects"), href: "/projets" },
                { label: t("nav_blog"), href: "/blog" },
                { label: t("nav_contact"), href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/40 text-sm hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-8">Nos Services</h4>
            <ul className="space-y-4">
              {serviceLinks.map((key, i) => (
                <li key={i}>
                  <Link href="/services" className="text-white/40 text-sm hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-green mb-8">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <p className="text-white/40 text-sm">{t("contact_location_val")}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <p className="text-white/40 text-sm">+236 72 93 47 90 / 76 05 58 44</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-brand-red flex-shrink-0" />
                <p className="text-white/40 text-sm">contact.fernotech@gmail.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-brand-green flex-shrink-0" />
                <p className="text-white/40 text-sm">Lun - Ven : 08h00 - 18h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <p>{t("footer_rights")} {currentYear}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
          <p className="text-brand-yellow">{t("footer_motto")}</p>
        </div>
      </div>
    </footer>
  );
};
