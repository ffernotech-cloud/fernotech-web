"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";

interface BlogProps {
  showAllBtn?: boolean;
}

export const Blog = ({ showAllBtn = true }: BlogProps) => {
  const { t } = useLanguage();
  const { posts } = useContent();

  return (
    <section 
      id="blog" 
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-overlay-bg backdrop-blur-[2px] z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-text-primary">{t("blog_title")}</h2>
            <p className="text-text-muted">{t("blog_subtitle")}</p>
          </div>
          {showAllBtn && (
            <Link 
              href="/blog" 
              className="hidden md:flex items-center gap-2 text-brand-yellow font-bold hover:underline mt-6 md:mt-0 z-10"
            >
              {t("blog_explorer_btn")}
              <BookOpen className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-card-bg rounded-[2rem] overflow-hidden border border-card-border hover:border-brand-blue/30 transition-all flex flex-col"
            >
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={p.image} 
                  alt={t(p.titleKey)} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                  {p.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] text-text-muted mb-4 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {p.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {p.author}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-brand-blue transition-colors">
                  {t(p.titleKey)}
                </h3>
                
                <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                  {t(p.excerptKey)}
                </p>
                
                <div className="mt-auto pt-6 border-t border-card-border">
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-secondary group-hover:text-brand-yellow transition-all">
                    {t("blog_read_more")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
