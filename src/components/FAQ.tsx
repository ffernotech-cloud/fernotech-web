"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const faqs = [
  {
    questionKey: "faq_q1",
    answerKey: "faq_a1",
  },
  {
    questionKey: "faq_q2",
    answerKey: "faq_a2",
  },
  {
    questionKey: "faq_q3",
    answerKey: "faq_a3",
  },
  {
    questionKey: "faq_q4",
    answerKey: "faq_a4",
  },
];

export const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-text-primary">
            {t("faq_title") || "Questions Fréquentes"}
          </h2>
          <p className="text-text-secondary text-lg">
            {t("faq_subtitle") || "Tout ce que vous devez savoir sur nos services et notre technologie."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl border-card-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-foreground/5"
              >
                <span className="text-lg font-bold text-text-primary">
                  {t(faq.questionKey) || "Question..."}
                </span>
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                  {openIndex === index ? <Minus className="w-4 h-4 text-brand-yellow" /> : <Plus className="w-4 h-4 text-brand-blue" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-text-secondary leading-relaxed">
                      {t(faq.answerKey) || "Réponse à venir..."}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
