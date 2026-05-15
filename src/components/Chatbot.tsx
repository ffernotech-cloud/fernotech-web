"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

export const Chatbot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t("bot_greeting"), sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Re-init greeting when language changes
  useEffect(() => {
    setMessages(prev => [
      { id: 1, text: t("bot_greeting"), sender: "bot" },
      ...prev.slice(1)
    ]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    const userMessage: Message = {
      id: Date.now(),
      text: currentInput,
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, language }),
      });
      const data = await response.json();
      
      const botMessage: Message = { 
        id: Date.now() + 1, 
        text: data.text || t("bot_resp_default"), 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const botMessage: Message = { 
        id: Date.now() + 1, 
        text: "Oups, j'ai eu un petit problème technique. Réessayez ?", 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 glass light:bg-white/90 light:backdrop-blur-2xl rounded-[2rem] overflow-hidden border-brand-blue/30 shadow-[0_20px_50px_rgba(0,82,180,0.3)] flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-brand-blue/20 via-brand-green/10 to-brand-yellow/10 border-b border-white/10 light:border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center relative group-hover:rotate-6 transition-transform">
                  <Bot className="w-7 h-7 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-green border-2 border-black light:border-white rounded-full" />
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight">FERNO-BOT</p>
                  <p className="text-[10px] text-brand-green font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                    {t("bot_status")}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 light:text-black/40 hover:bg-white/10 light:hover:bg-black/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.sender === "user" 
                      ? "bg-brand-blue text-white rounded-tr-none shadow-lg shadow-brand-blue/20" 
                      : "bg-white/10 light:bg-black/5 text-white/90 light:text-black/80 border border-white/5 light:border-black/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 light:bg-black/5 px-4 py-3 rounded-2xl flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/10 light:border-black/5 bg-black/40 light:bg-white/40">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("bot_placeholder")}
                  className="w-full bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-brand-blue transition-all text-sm light:text-black"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center hover:bg-brand-blue/80 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[9px] text-center text-white/20 light:text-black/20 mt-3 flex items-center justify-center gap-1 font-bold uppercase tracking-tighter">
                <Sparkles className="w-3 h-3 text-brand-yellow" /> {t("bot_powered")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all glow-blue",
          isOpen ? "bg-white text-black rotate-90" : "bg-brand-blue text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </motion.button>
    </div>
  );
};
