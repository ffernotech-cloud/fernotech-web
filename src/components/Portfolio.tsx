"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";

interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  details?: string[];
  tech?: string[];
}

interface PortfolioProps {
  showAllBtn?: boolean;
}

export const Portfolio = ({ showAllBtn = true }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, language } = useLanguage();
  const { projects } = useContent();

  return (
    <section 
      id="projets" 
      className="py-24 relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-overlay-bg backdrop-blur-[2px] z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-text-primary"><span className="text-brand-blue">{t("portfolio_title")}</span></h2>
            <p className="text-text-muted">{t("portfolio_subtitle")}</p>
          </div>
          {showAllBtn && (
            <Link 
              href="/projets" 
              className="text-brand-yellow font-bold flex items-center gap-2 hover:underline z-10"
            >
              {t("portfolio_all_btn")}
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => {
            const project: Project = {
              title: t(p.titleKey),
              category: t(p.categoryKey),
              image: p.image,
              desc: t(p.descKey),
              details: p.detailsKeys.map(key => t(key)),
              tech: p.tech
            };
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden rounded-3xl glass border-white/5 cursor-pointer hover:border-brand-yellow/30 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-yellow mb-2 block">{project.category}</span>
                  <h3 className="text-lg font-bold mb-2 text-text-primary group-hover:text-brand-yellow transition-colors">{project.title}</h3>
                  <p className="text-text-secondary text-xs mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                    <Zap className="w-3 h-3" /> {t("portfolio_click_details")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-4xl bg-background border border-card-border rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-auto"
             >
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-red transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
 
               <div className="md:w-1/2 h-64 md:h-auto relative">
                 <img 
                   src={selectedProject.image} 
                   alt={selectedProject.title} 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-background" />
               </div>
 
               <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                 <span className="text-xs uppercase font-black tracking-widest text-brand-yellow mb-4 block">
                   {selectedProject.category}
                 </span>
                 <h3 className="text-3xl font-bold mb-6 text-text-primary">{selectedProject.title}</h3>
                 <p className="text-text-secondary mb-8 leading-relaxed">
                   {selectedProject.desc}
                 </p>
 
                 <div className="space-y-6">
                   <div>
                     <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                       <Zap className="w-4 h-4 text-brand-yellow" /> {t("portfolio_points_clés")}
                     </h4>
                     <ul className="space-y-3">
                       {selectedProject.details?.map((detail, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                           <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                           {detail}
                         </li>
                       ))}
                     </ul>
                   </div>
 
                   <div>
                     <h4 className="text-sm font-bold text-text-primary mb-4">{t("portfolio_tech_title")}</h4>
                     <div className="flex flex-wrap gap-2">
                       {selectedProject.tech?.map((t, i) => (
                         <span key={i} className="px-3 py-1 bg-card-bg border border-card-border rounded-full text-[10px] font-bold text-text-secondary">
                           {t}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
 
                 <div className="mt-12 flex gap-4">
                   <button className="flex-1 py-4 bg-foreground text-background rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-black transition-all">
                     {t("portfolio_view_btn")} <ExternalLink className="w-4 h-4" />
                   </button>
                   <button className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-white/10 transition-colors">
                     <Code className="w-6 h-6" />
                   </button>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
