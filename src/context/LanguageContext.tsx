"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "sg";

interface Translations {
  [key: string]: {
    fr: string;
    sg: string;
  };
}

const translations: Translations = {
  nav_home: { fr: "Accueil", sg: "Yângâ" },
  nav_services: { fr: "Services", sg: "Kua" },
  nav_about: { fr: "À propos", sg: "Tènë tî e" },
  nav_projects: { fr: "Projets", sg: "Kua tî e" },
  nav_blog: { fr: "Blog", sg: "Mbëtï" },
  nav_contact: { fr: "Contact", sg: "Lôngô e" },
  hero_title: { fr: "L'Avenir de la Technologie", sg: "Lekengo tî Gêrê-kua" },
  hero_subtitle: { fr: "en Centrafrique", sg: "na Béafrîka" },
  hero_desc: { fr: "Innover, Créer et Transformer. Nous bâtissons les solutions robotiques et électroniques de demain pour l'Afrique.", sg: "E sâra kua na sîon tî lekengo fin-yê na ndö tî robot na sîon tî kâsa." },
  hero_discover_btn: { fr: "Découvrir nos services", sg: "Bâ kua tî e" },
  services_title: { fr: "Nos Expertises", sg: "Kua tî e" },
  services_subtitle: { fr: "Une gamme complète de services technologiques pour propulser votre entreprise dans l'ère de l'intelligence.", sg: "Kua tî e tî bîakû tî mû mabôkô na mo na ndö tî yê tî gêrê-kua." },
  service_robotique_title: { fr: "Robotique", sg: "Kua tî Robot" },
  service_robotique_desc: { fr: "Solutions robotiques à impact : automatisation et machines de transformation écologique.", sg: "Lekengo robot tî mû mabôkô na sîon tî lekengo fin-yê." },
  service_electronique_title: { fr: "Électronique", sg: "Électronique" },
  service_electronique_desc: { fr: "Cartes électroniques, maintenance et intégration de systèmes complexes.", sg: "Lekengo kâsa tî sîon na tènë tî courant." },
  service_logiciel_title: { fr: "Logiciel", sg: "Logiciel" },
  service_logiciel_desc: { fr: "Applications web, mobiles et logiciels métiers sur mesure.", sg: "Lekengo programme tî ordinateur na tî téléphone." },
  service_embarque_title: { fr: "Systèmes Embarqués", sg: "IoT & Systèmes" },
  service_embarque_desc: { fr: "IoT, microcontrôleurs et solutions intelligentes connectées.", sg: "Kua tî lekengo yê tî courant tî sîon tî bîakû." },
  service_formation_title: { fr: "Formation", sg: "Wango & Mandango" },
  service_formation_desc: { fr: "Ateliers et accompagnement technologique pour les passionnés et pros.", sg: "Mandango tènë tî gêrê-kua na tî robot." },
  service_conseil_title: { fr: "Conseil & Innovation", sg: "Wango & Fin-yê" },
  service_conseil_desc: { fr: "Transformation digitale et audit technologique pour entreprises.", sg: "Mûngo wango na a-société na ndö tî yê tî gêrê-kua." },
  service_commerce_title: { fr: "Commerce", sg: "Kângo yê" },
  service_commerce_desc: { fr: "Équipements technologiques et matériels électroniques de pointe.", sg: "Kângo a-machine na a-yê tî courant." },
  about_title: { fr: "À Propos de", sg: "Tènë tî" },
  about_desc: { fr: "FERNOTECH conçoit et fabrique des solutions technologiques et robotiques à impact. Nous transformons des défis environnementaux, comme les déchets plastiques, en opportunités économiques.", sg: "FERNOTECH asâra kua tî lekengo a-machine na robot tî mû mabôkô na âta tî Béafrîka." },
  about_model: { fr: "Notre modèle repose sur une technologie appliquée aux problèmes massifs et un modèle industriel local réplicable.", sg: "E sâra kua na ndö tî yê tî gêrê-kua tî leke akpale tî e." },
  about_mission: { fr: "Notre Mission", sg: "Kua tî e" },
  about_mission_desc: { fr: "Démocratiser la haute technologie et accompagner la transformation digitale.", sg: "Mûngo gêrê-kua na mabôkô tî azo kûê." },
  about_vision: { fr: "Notre Vision", sg: "Ye tî e tî bîakû" },
  about_vision_desc: { fr: "Devenir le leader continental de la robotique et des systèmes embarqués.", sg: "Lekengo e tî gâ tî bîakû na ndö tî robot na sîon tî courant." },
  value_innovation_title: { fr: "Innovation", sg: "Fin-yê" },
  value_innovation_desc: { fr: "Repousser les limites du possible chaque jour.", sg: "Lekengo afîni yê lâ na lâ." },
  value_expertise_title: { fr: "Expertise", sg: "Hîngângö-kua" },
  value_expertise_desc: { fr: "Une maîtrise pointue des technologies de pointe.", sg: "Hîngângö-kua tî bîanî na ndö tî gêrê-kua." },
  value_durability_title: { fr: "Durabilité", sg: "Dungö-kua" },
  value_durability_desc: { fr: "Des solutions conçues pour durer et évoluer.", sg: "Yê tî e ayeke tî dungö bîakû." },
  value_impact_title: { fr: "Impact", sg: "Gbia" },
  value_impact_desc: { fr: "Transformer positivement notre environnement.", sg: "Gbiângö ndö tî e na sîon tî bîanî." },
  about_evolution_title: { fr: "L'évolution de l'Innovation", sg: "Gango tî e tî bîakû" },
  timeline_2020_title: { fr: "Lancement", sg: "To-li" },
  timeline_2020_desc: { fr: "Création de FERNOTECH et focus sur l'électronique.", sg: "Lekengo FERNOTECH na tènë tî électronique." },
  timeline_2022_title: { fr: "Expansion", sg: "Gango ngangô" },
  timeline_2022_desc: { fr: "Introduction des services de robotique avancée.", sg: "Gango na robot tî sîon." },
  timeline_2024_title: { fr: "Smart City", sg: "Ködörö tî bîanî" },
  timeline_2024_desc: { fr: "Développement de solutions IoT à grande échelle.", sg: "Lekengo IoT tî mû mabôkô na azo tî e." },
  timeline_future_title: { fr: "IA Intégrée", sg: "Fin-yê tî bîakû" },
  timeline_future_desc: { fr: "Fusion de la robotique et de l'intelligence artificielle.", sg: "Bôngbi robot na IA tî leke fin-yê." },
  portfolio_title: { fr: "Nos Réalisations", sg: "Kua tî e tî bîanî" },
  portfolio_subtitle: { fr: "Découvrez nos derniers projets et innovations technologiques.", sg: "Bâ akua tî e tî bîanî na ndö tî gêrê-kua." },
  portfolio_all_btn: { fr: "Voir tout le portfolio", sg: "Bâ akua nî kûê" },
  portfolio_click_details: { fr: "Cliquer pour les détails", sg: "Pîngî na ndö nî tî bâ kûê" },
  portfolio_points_clés: { fr: "Points Clés", sg: "A-tènë tî bîanî" },
  portfolio_tech_title: { fr: "Technologies", sg: "Yê tî gêrê-kua" },
  portfolio_view_btn: { fr: "Voir le projet", sg: "Bâ kua nî" },
  project_1_title: { fr: "Transformation Plastique", sg: "Gbiângö plastîki" },
  project_1_category: { fr: "Impact Écologique", sg: "Lekengo ndö tî e" },
  project_1_desc: { fr: "Machine de recyclage transformant les déchets plastiques en balais écoresponsables.", sg: "Machine tî gbiângö plastîki tî gâ balais." },
  project_1_detail_1: { fr: "Collecte et tri des plastiques locaux", sg: "Bôngbi plastîki na Bangui" },
  project_1_detail_2: { fr: "Processus de broyage et fusion contrôlée", sg: "Lekengo nî na machine" },
  project_2_title: { fr: "Robot Explorateur V1", sg: "Robot tî hûndâ lê" },
  project_2_category: { fr: "Robotique", sg: "Robot" },
  project_2_desc: { fr: "Robot autonome conçu pour la reconnaissance de terrain accidenté.", sg: "Robot tî tambûla na ndö tî lê tî sêse." },
  project_3_title: { fr: "Système de Monitoring IoT", sg: "Monitoring IoT" },
  project_3_category: { fr: "Embedded", sg: "IoT" },
  project_3_desc: { fr: "Collecte de données environnementales en temps réel via LoRaWAN.", sg: "Bôngbi tènë tî ndö tî e na machine." },
  project_4_title: { fr: "Smart Farm Solution", sg: "Yaka tî bîanî" },
  project_4_category: { fr: "Innovation", sg: "Fin-yê" },
  project_4_desc: { fr: "Automatisation de l'irrigation basée sur l'humidité du sol.", sg: "Mûngo ngû na yaka na machine." },
  blog_title: { fr: "Actualités & Blog", sg: "Mbëtï & Tènë tî bîakû" },
  blog_subtitle: { fr: "Suivez nos dernières avancées et partagez notre savoir-faire.", sg: "Bâ afîni yê tî e na e mû nî na azo kûê." },
  blog_explorer_btn: { fr: "Explorer tous les articles", sg: "Bâ ambëtï nî kûê" },
  blog_read_more: { fr: "Lire la suite", sg: "Diko nî bîanî" },
  post_1_title: { fr: "Comment la robotique transforme le recyclage en Afrique", sg: "Sîon tî robot na ndö tî recyclage" },
  post_1_excerpt: { fr: "Découvrez nos nouvelles machines capables de transformer les déchets plastiques en produits ménagers durables.", sg: "Bâ a-machine tî e tî gbiângö plastîki." },
  post_2_title: { fr: "L'importance des systèmes embarqués pour les Smart Farms", sg: "Lekengo IoT tî mû mabôkô na yaka" },
  post_2_excerpt: { fr: "L'agriculture de précision devient accessible grâce aux solutions IoT adaptées aux climats tropicaux.", sg: "Kua tî yaka ayeke gâ ngangô na IoT." },
  post_3_title: { fr: "Formation : Devenir développeur de systèmes intelligents à Bangui", sg: "Mandango tènë tî lekengo programme" },
  post_3_excerpt: { fr: "Retour sur notre dernier atelier de formation intensive sur les microcontrôleurs et la robotique.", sg: "Kua tî mandango tènë tî robot na Bangui." },
  contact_title: { fr: "Contactez L'Équipe", sg: "Sâra tènë na e" },
  contact_desc: { fr: "Une question ? Un projet ambitieux ? Nous sommes là pour vous accompagner.", sg: "Mo yeke na hûndâ? E yeke na mo sî e mû nî." },
  contact_whatsapp_label: { fr: "Téléphone / WhatsApp", sg: "Tél / WhatsApp" },
  contact_email_label: { fr: "Email", sg: "Email" },
  contact_location_label: { fr: "Localisation", sg: "Lê tî ndo" },
  contact_location_val: { fr: "Galabadja 3, sinistré, 8é Arrondissement de Bangui", sg: "Galabadja 3, Bangui, Béafrîka" },
  form_name: { fr: "Nom", sg: "Irî" },
  form_name_placeholder: { fr: "Votre nom", sg: "Irî tî mo" },
  form_email: { fr: "Email", sg: "Email" },
  form_email_placeholder: { fr: "votre@email.com", sg: "email tî mo" },
  form_subject: { fr: "Sujet", sg: "Lê tî tènë" },
  form_subject_placeholder: { fr: "Sujet", sg: "Lê tî tènë" },
  form_message: { fr: "Message", sg: "Tènë" },
  form_message_placeholder: { fr: "Message...", sg: "Tènë tî mo..." },
  submit_btn: { fr: "Envoyer le Message", sg: "To tènë nî" },
  footer_desc: { fr: "Propulser l'innovation technologique en Afrique. Expertise en robotique, électronique et solutions intelligentes.", sg: "Mûngo ngangô na gêrê-kua na âta tî Béafrîka." },
  footer_nav_title: { fr: "Navigation", sg: "Kua tî e" },
  footer_social_title: { fr: "Réseaux", sg: "Ndö tî tènë" },
  footer_rights: { fr: "© 2024 FERNOTECH. Tous droits réservés.", sg: "© 2024 FERNOTECH. Kua kûê ayeke tî e." },
  footer_motto: { fr: "L'innovation technologique au service du futur.", sg: "Gêrê-kua tî bîakû tî mû mabôkô na kekere-kua." },
  bot_greeting: { fr: "Bonjour ! Je suis l'assistant intelligent de FERNOTECH. Comment puis-je vous aider aujourd'hui ?", sg: "Bara mo! Mbi yeke assistant tî FERNOTECH. Ngbâna nyen mbi lingbi tî mû mabôkô na mo?" },
  bot_placeholder: { fr: "Posez votre question...", sg: "Hûndâ tènë tî mo..." },
  bot_status: { fr: "Assistant IA actif", sg: "Assistant IA ayeke sâra kua" },
  bot_powered: { fr: "Propulsé par FERNOTECH Intelligence", sg: "Machine tî FERNOTECH laasâra kua nî" },
  bot_resp_default: { fr: "C'est une excellente question. Pourriez-vous me donner plus de détails sur votre projet ?", sg: "So ayeke nzorô tî tènë. Fa tènë nî bîakû na mbi." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
