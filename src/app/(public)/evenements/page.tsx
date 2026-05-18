"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Star, Clock, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const pageTranslations = {
  fr: {
    subtitle: "// Partage & Communauté",
    title1: "Nos Événements",
    title2: "& Workshops",
    filter_all: "Tous",
    filter_upcoming: "À Venir",
    filter_past: "Passés",
    register_btn: "S'inscrire à l'événement",
    past_btn: "Voir le récapitulatif",
    date_label: "Date",
    location_label: "Lieu",
    capacity_label: "Places limitées",
    no_events: "Aucun événement trouvé dans cette catégorie.",
    events: [
      {
        id: 1,
        type: "upcoming",
        tag: "Formation",
        title: "Workshop : Robotique & Microcontrôleurs (Arduino / ESP32)",
        desc: "Un atelier pratique intensif de 2 jours pour concevoir et programmer vos premiers robots à Bangui.",
        date: "15 - 16 Juin 2026",
        time: "09:00 - 17:00",
        location: "Lab FERNOTECH, Galabadja 3, Bangui",
        capacity: "15 participants",
        color: "brand-blue"
      },
      {
        id: 2,
        type: "upcoming",
        tag: "Lancement",
        title: "Démonstration Publique : L'Éco-Recycleur V2",
        desc: "Venez découvrir et voir en action notre nouvelle machine brevetée capable de transformer les déchets plastiques en objets ménagers durables.",
        date: "05 Juillet 2026",
        time: "14:00 - 17:00",
        location: "Hôtel Ledger Plaza, Bangui",
        capacity: "Entrée libre sur réservation",
        color: "brand-yellow"
      },
      {
        id: 3,
        type: "past",
        tag: "Hackathon",
        title: "Central African Tech Hackathon 2025",
        desc: "Co-organisé par FERNOTECH, ce hackathon a rassemblé plus de 50 jeunes développeurs centrafricains autour de solutions technologiques d'impact.",
        date: "12 - 14 Décembre 2025",
        time: "3 Jours non-stop",
        location: "Complexe Sportif, Bangui",
        capacity: "50+ participants",
        color: "brand-green"
      },
      {
        id: 4,
        type: "past",
        tag: "Workshop",
        title: "Atelier IoT & Agriculture Connectée",
        desc: "Bootcamp destiné aux coopératives agricoles pour installer et maintenir des capteurs d'humidité connectés.",
        date: "18 Octobre 2025",
        time: "08:00 - 16:00",
        location: "Ferme Pilote de Damara, RCA",
        capacity: "30 agriculteurs",
        color: "brand-blue"
      }
    ]
  },
  sg: {
    subtitle: "// Bôngbi & Mandango",
    title1: "A-yê tî sango",
    title2: "& a-kua",
    filter_all: "Kûê",
    filter_upcoming: "Tî kekere-kua",
    filter_past: "So ahon awe",
    register_btn: "S'inscrire (Mû place)",
    past_btn: "Bâ yê so ahon",
    date_label: "Lâ nî",
    location_label: "Ndö nî",
    capacity_label: "Place ayeke mingi pëpe",
    no_events: "Kpale oko ayeke pëpe na ndö ti sango so.",
    events: [
      {
        id: 1,
        type: "upcoming",
        tag: "Mandango",
        title: "Atelier : Robotique & Microcontrôleurs (Arduino)",
        desc: "Mandango lekengo robot na microcontrôleurs na Bangui tî mû mabôkô na amaseka tî e.",
        date: "15 - 16 Juin 2026",
        time: "09:00 - 17:00",
        location: "Lab FERNOTECH, Galabadja 3, Bangui",
        capacity: "zo 15 gï",
        color: "brand-blue"
      },
      {
        id: 2,
        type: "upcoming",
        tag: "Machine",
        title: "Démonstration ti machine : Eco-Recycleur V2",
        desc: "Gango tî bâ machine ti e so agbiângö plastîki tî gâ balais na Bangui.",
        date: "05 Juillet 2026",
        time: "14:00 - 17:00",
        location: "Hôtel Ledger Plaza, Bangui",
        capacity: "Entrée libre",
        color: "brand-yellow"
      },
      {
        id: 3,
        type: "past",
        tag: "Hackathon",
        title: "Central African Tech Hackathon 2025",
        desc: "Co-organisé na FERNOTECH, mûngo mabôkô na amaseka 50 tî RCA tî leke a-programme tî ordinateur.",
        date: "12 - 14 Décembre 2025",
        time: "Lâ 3 non-stop",
        location: "Complexe Sportif, Bangui",
        capacity: "zo 50+",
        color: "brand-green"
      },
      {
        id: 4,
        type: "past",
        tag: "Yaka",
        title: "Atelier IoT & Yaka ti bîanî",
        desc: "Mandango lekengo a-capteur ti ngû ti yaka na amunu ti yaka ti Damara.",
        date: "18 Octobre 2025",
        time: "08:00 - 16:00",
        location: "Ferme Pilote de Damara, RCA",
        capacity: "zo 30 ti yaka",
        color: "brand-blue"
      }
    ]
  },
  en: {
    subtitle: "// Sharing & Community",
    title1: "Our Events",
    title2: "& Workshops",
    filter_all: "All",
    filter_upcoming: "Upcoming",
    filter_past: "Past",
    register_btn: "Register for Event",
    past_btn: "View Recap",
    date_label: "Date",
    location_label: "Location",
    capacity_label: "Limited capacity",
    no_events: "No events found in this category.",
    events: [
      {
        id: 1,
        type: "upcoming",
        tag: "Training",
        title: "Workshop: Robotics & Microcontrollers (Arduino / ESP32)",
        desc: "A hands-on, intensive 2-day workshop to design and program your first robots in Bangui.",
        date: "15 - 16 June 2026",
        time: "09:00 - 17:00",
        location: "FERNOTECH Lab, Galabadja 3, Bangui",
        capacity: "15 participants",
        color: "brand-blue"
      },
      {
        id: 2,
        type: "upcoming",
        tag: "Launch",
        title: "Public Demo: The Eco-Recycler V2",
        desc: "Come and discover our patented machine in action, transforming plastic waste into durable household products.",
        date: "05 July 2026",
        time: "14:00 - 17:00",
        location: "Ledger Plaza Hotel, Bangui",
        capacity: "Free admission with registration",
        color: "brand-yellow"
      },
      {
        id: 3,
        type: "past",
        tag: "Hackathon",
        title: "Central African Tech Hackathon 2025",
        desc: "Co-organized by FERNOTECH, this hackathon brought together over 50 young Central African developers to build impactful tech solutions.",
        date: "12 - 14 December 2025",
        time: "3 Days non-stop",
        location: "Sports Complex, Bangui",
        capacity: "50+ participants",
        color: "brand-green"
      },
      {
        id: 4,
        type: "past",
        tag: "Workshop",
        title: "IoT & Connected Agriculture Workshop",
        desc: "Bootcamp dedicated to agricultural cooperatives to install and maintain connected moisture sensors.",
        date: "18 October 2025",
        time: "08:00 - 16:00",
        location: "Damara Pilot Farm, CAR",
        capacity: "30 farmers",
        color: "brand-blue"
      }
    ]
  }
};

export default function Evenements() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const content = pageTranslations[language] || pageTranslations.fr;

  const filteredEvents = content.events.filter(event => {
    if (filter === "all") return true;
    return event.type === filter;
  });

  return (
    <main className="min-h-screen bg-[#050508] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Cyber Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase font-black tracking-widest text-brand-yellow mb-3 block">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {content.title1} <span className="text-brand-blue">{content.title2}</span>
          </h1>
          <div className="w-12 h-1 bg-brand-yellow mx-auto rounded-full mb-10" />

          {/* Filters */}
          <div className="inline-flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md">
            {(["all", "upcoming", "past"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filter === type 
                    ? "bg-brand-blue text-white shadow-lg" 
                    : "text-white/40 hover:text-white"
                }`}
              >
                {type === "all" && content.filter_all}
                {type === "upcoming" && content.filter_upcoming}
                {type === "past" && content.filter_past}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className="glass rounded-[2rem] border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-brand-blue/30 hover:shadow-[0_15px_40px_rgba(0,82,180,0.15)] transition-all"
              >
                <div className="p-8 space-y-6">
                  {/* Card Badge Tag */}
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white`}>
                      {event.tag}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      event.type === "upcoming" ? "text-brand-yellow" : "text-white/40"
                    }`}>
                      {event.type === "upcoming" ? "● LIVE SOON" : "✓ COMPLETED"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-brand-blue transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {event.desc}
                  </p>

                  <hr className="border-white/5" />

                  {/* Meta Information */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                      <div>
                        <p className="text-white/30 uppercase font-black tracking-tighter text-[9px]">{content.date_label}</p>
                        <p className="font-bold text-white/80">{event.date}</p>
                        <p className="text-[10px] text-white/50">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <div>
                        <p className="text-white/30 uppercase font-black tracking-tighter text-[9px]">{content.location_label}</p>
                        <p className="font-bold text-white/80 leading-tight">{event.location.split(",")[0]}</p>
                        <p className="text-[10px] text-white/50">{event.location.split(",").slice(1).join(",")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card CTA */}
                <div className="px-8 py-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-green" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{event.capacity}</span>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-yellow hover:text-white transition-colors group/btn">
                    {event.type === "upcoming" ? content.register_btn : content.past_btn}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-24 text-white/40 text-sm">
            {content.no_events}
          </div>
        )}
      </div>
    </main>
  );
}
