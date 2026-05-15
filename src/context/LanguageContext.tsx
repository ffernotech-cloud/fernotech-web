"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "sg" | "en";

interface Translations {
  [key: string]: {
    fr: string;
    sg: string;
    en: string;
  };
}

const translations: Translations = {
  nav_home: { fr: "Accueil", sg: "Yângâ", en: "Home" },
  nav_services: { fr: "Services", sg: "Kua", en: "Services" },
  nav_about: { fr: "À propos", sg: "Tènë tî e", en: "About" },
  nav_projects: { fr: "Projets", sg: "Kua tî e", en: "Projects" },
  nav_blog: { fr: "Blog", sg: "Mbëtï", en: "Blog" },
  nav_contact: { fr: "Contact", sg: "Lôngô e", en: "Contact" },
  hero_title: { fr: "L'Avenir de la Technologie", sg: "Lekengo tî Gêrê-kua", en: "The Future of Technology" },
  hero_subtitle: { fr: "en Centrafrique", sg: "na Béafrîka", en: "in Central Africa" },
  hero_desc: { fr: "Innover, Créer et Transformer. Nous bâtissons les solutions robotiques et électroniques de demain pour l'Afrique.", sg: "E sâra kua na sîon tî lekengo fin-yê na ndö tî robot na sîon tî kâsa.", en: "Innovating, Creating and Transforming. We are building the robotic and electronic solutions of tomorrow for Africa." },
  hero_discover_btn: { fr: "Découvrir nos services", sg: "Bâ kua tî e", en: "Explore our services" },
  services_title: { fr: "Nos Expertises", sg: "Kua tî e", en: "Our Expertise" },
  services_subtitle: { fr: "Une gamme complète de services technologiques pour propulser votre entreprise dans l'ère de l'intelligence.", sg: "Kua tî e tî bîakû tî mû mabôkô na mo na ndö tî yê tî gêrê-kua.", en: "A complete range of technological services to propel your business into the era of intelligence." },
  service_robotique_title: { fr: "Robotique", sg: "Kua tî Robot", en: "Robotics" },
  service_robotique_desc: { fr: "Solutions robotiques à impact : automatisation et machines de transformation écologique.", sg: "Lekengo robot tî mû mabôkô na sîon tî lekengo fin-yê.", en: "Impactful robotic solutions: automation and ecological transformation machines." },
  service_electronique_title: { fr: "Électronique", sg: "Électronique", en: "Electronics" },
  service_electronique_desc: { fr: "Cartes électroniques, maintenance et intégration de systèmes complexes.", sg: "Lekengo kâsa tî sîon na tènë tî courant.", en: "Electronic boards, maintenance and integration of complex systems." },
  service_logiciel_title: { fr: "Logiciel", sg: "Logiciel", en: "Software" },
  service_logiciel_desc: { fr: "Applications web, mobiles et logiciels métiers sur mesure.", sg: "Lekengo programme tî ordinateur na tî téléphone.", en: "Custom web, mobile applications and business software." },
  service_embarque_title: { fr: "Systèmes Embarqués", sg: "IoT & Systèmes", en: "Embedded Systems" },
  service_embarque_desc: { fr: "IoT, microcontrôleurs et solutions intelligentes connectées.", sg: "Kua tî lekengo yê tî courant tî sîon tî bîakû.", en: "IoT, microcontrollers and connected smart solutions." },
  service_formation_title: { fr: "Formation", sg: "Wango & Mandango", en: "Training" },
  service_formation_desc: { fr: "Ateliers et accompagnement technologique pour les passionnés et pros.", sg: "Mandango tènë tî gêrê-kua na tî robot.", en: "Workshops and technological support for enthusiasts and pros." },
  service_conseil_title: { fr: "Conseil & Innovation", sg: "Wango & Fin-yê", en: "Consulting & Innovation" },
  service_conseil_desc: { fr: "Transformation digitale et audit technologique pour entreprises.", sg: "Mûngo wango na a-société na ndö tî yê tî gêrê-kua.", en: "Digital transformation and technological audit for companies." },
  service_commerce_title: { fr: "Commerce", sg: "Kângo yê", en: "Commerce" },
  service_commerce_desc: { fr: "Équipements technologiques et matériels électroniques de pointe.", sg: "Kângo a-machine na a-yê tî courant.", en: "High-tech technological equipment and electronic hardware." },
  about_title: { fr: "À Propos de", sg: "Tènë tî", en: "About" },
  about_desc: { fr: "FERNOTECH conçoit et fabrique des solutions technologiques et robotiques à impact. Nous transformons des défis environnementaux, comme les déchets plastiques, en opportunités économiques.", sg: "FERNOTECH asâra kua tî lekengo a-machine na robot tî mû mabôkô na âta tî Béafrîka.", en: "FERNOTECH designs and manufactures impactful technological and robotic solutions. We transform environmental challenges, such as plastic waste, into economic opportunities." },
  about_model: { fr: "Notre modèle repose sur une technologie appliquée aux problèmes massifs et un modèle industriel local réplicable.", sg: "E sâra kua na ndö tî yê tî gêrê-kua tî leke akpale tî e.", en: "Our model is based on technology applied to massive problems and a replicable local industrial model." },
  about_mission: { fr: "Notre Mission", sg: "Kua tî e", en: "Our Mission" },
  about_mission_desc: { fr: "Démocratiser la haute technologie et accompagner la transformation digitale.", sg: "Mûngo gêrê-kua na mabôkô tî azo kûê.", en: "Democratize high technology and support digital transformation." },
  about_vision: { fr: "Notre Vision", sg: "Ye tî e tî bîakû", en: "Our Vision" },
  about_vision_desc: { fr: "Devenir le leader continental de la robotique et des systèmes embarqués.", sg: "Lekengo e tî gâ tî bîakû na ndö tî robot na sîon tî courant.", en: "To become the continental leader in robotics and embedded systems." },
  value_innovation_title: { fr: "Innovation", sg: "Fin-yê", en: "Innovation" },
  value_innovation_desc: { fr: "Repousser les limites du possible chaque jour.", sg: "Lekengo afîni yê lâ na lâ.", en: "Pushing the boundaries of what is possible every day." },
  value_expertise_title: { fr: "Expertise", sg: "Hîngângö-kua", en: "Expertise" },
  value_expertise_desc: { fr: "Une maîtrise pointue des technologies de pointe.", sg: "Hîngângö-kua tî bîanî na ndö tî gêrê-kua.", en: "A sharp mastery of cutting-edge technologies." },
  value_durability_title: { fr: "Durabilité", sg: "Dungö-kua", en: "Durability" },
  value_durability_desc: { fr: "Des solutions conçues pour durer et évoluer.", sg: "Yê tî e ayeke tî dungö bîakû.", en: "Solutions designed to last and evolve." },
  value_impact_title: { fr: "Impact", sg: "Gbia", en: "Impact" },
  value_impact_desc: { fr: "Transformer positivement notre environnement.", sg: "Gbiângö ndö tî e na sîon tî bîanî.", en: "Positively transforming our environment." },
  about_evolution_title: { fr: "L'évolution de l'Innovation", sg: "Gango tî e tî bîakû", en: "The Evolution of Innovation" },
  timeline_2020_title: { fr: "Lancement", sg: "To-li", en: "Launch" },
  timeline_2020_desc: { fr: "Création de FERNOTECH et focus sur l'électronique.", sg: "Lekengo FERNOTECH na tènë tî électronique.", en: "Creation of FERNOTECH and focus on electronics." },
  timeline_2022_title: { fr: "Expansion", sg: "Gango ngangô", en: "Expansion" },
  timeline_2022_desc: { fr: "Introduction des services de robotique avancée.", sg: "Gango na robot tî sîon.", en: "Introduction of advanced robotic services." },
  timeline_2024_title: { fr: "Smart City", sg: "Ködörö tî bîanî", en: "Smart City" },
  timeline_2024_desc: { fr: "Développement de solutions IoT à grande échelle.", sg: "Lekengo IoT tî mû mabôkô na azo tî e.", en: "Development of large-scale IoT solutions." },
  timeline_future_title: { fr: "IA Intégrée", sg: "Fin-yê tî bîakû", en: "Integrated AI" },
  timeline_future_desc: { fr: "Fusion de la robotique et de l'intelligence artificielle.", sg: "Bôngbi robot na IA tî leke fin-yê.", en: "Fusion of robotics and artificial intelligence." },
  portfolio_title: { fr: "Nos Réalisations", sg: "Kua tî e tî bîanî", en: "Our Achievements" },
  portfolio_subtitle: { fr: "Découvrez nos derniers projets et innovations technologiques.", sg: "Bâ akua tî e tî bîanî na ndö tî gêrê-kua.", en: "Discover our latest projects and technological innovations." },
  portfolio_all_btn: { fr: "Voir tout le portfolio", sg: "Bâ akua nî kûê", en: "See all portfolio" },
  portfolio_click_details: { fr: "Cliquer pour les détails", sg: "Pîngî na ndö nî tî bâ kûê", en: "Click for details" },
  portfolio_points_clés: { fr: "Points Clés", sg: "A-tènë tî bîanî", en: "Key Points" },
  portfolio_tech_title: { fr: "Technologies", sg: "Yê tî gêrê-kua", en: "Technologies" },
  portfolio_view_btn: { fr: "Voir le projet", sg: "Bâ kua nî", en: "View project" },
  project_1_title: { fr: "Transformation Plastique", sg: "Gbiângö plastîki", en: "Plastic Transformation" },
  project_1_category: { fr: "Impact Écologique", sg: "Lekengo ndö tî e", en: "Ecological Impact" },
  project_1_desc: { fr: "Machine de recyclage transformant les déchets plastiques en balais écoresponsables.", sg: "Machine tî gbiângö plastîki tî gâ balais.", en: "Recycling machine transforming plastic waste into eco-responsible brooms." },
  project_1_detail_1: { fr: "Collecte et tri des plastiques locaux", sg: "Bôngbi plastîki na Bangui", en: "Local plastic collection and sorting" },
  project_1_detail_2: { fr: "Processus de broyage et fusion contrôlée", sg: "Lekengo nî na machine", en: "Controlled grinding and fusion process" },
  project_2_title: { fr: "Robot Explorateur V1", sg: "Robot tî hûndâ lê", en: "Explorer Robot V1" },
  project_2_category: { fr: "Robotique", sg: "Robot", en: "Robotics" },
  project_2_desc: { fr: "Robot autonome conçu pour la reconnaissance de terrain accidenté.", sg: "Robot tî tambûla na ndö tî lê tî sêse.", en: "Autonomous robot designed for reconnaissance on rough terrain." },
  project_3_title: { fr: "Système de Monitoring IoT", sg: "Monitoring IoT", en: "IoT Monitoring System" },
  project_3_category: { fr: "Embedded", sg: "IoT", en: "Embedded" },
  project_3_desc: { fr: "Collecte de données environnementales en temps réel via LoRaWAN.", sg: "Bôngbi tènë tî ndö tî e na machine.", en: "Real-time environmental data collection via LoRaWAN." },
  project_4_title: { fr: "Smart Farm Solution", sg: "Yaka tî bîanî", en: "Smart Farm Solution" },
  project_4_category: { fr: "Innovation", sg: "Fin-yê", en: "Innovation" },
  project_4_desc: { fr: "Automatisation de l'irrigation basée on soil moisture.", sg: "Mûngo ngû na yaka na machine.", en: "Automation of irrigation based on soil moisture." },
  blog_title: { fr: "Actualités & Blog", sg: "Mbëtï & Tènë tî bîakû", en: "News & Blog" },
  blog_subtitle: { fr: "Suivez nos dernières avancées et partagez notre savoir-faire.", sg: "Bâ afîni yê tî e na e mû nî na azo kûê.", en: "Follow our latest progress and share our know-how." },
  blog_explorer_btn: { fr: "Explorer tous les articles", sg: "Bâ ambëtï nî kûê", en: "Explore all articles" },
  blog_read_more: { fr: "Lire la suite", sg: "Diko nî bîanî", en: "Read more" },
  post_1_title: { fr: "Comment la robotique transforme le recyclage en Afrique", sg: "Sîon tî robot na ndö tî recyclage", en: "How robotics is transforming recycling in Africa" },
  post_1_excerpt: { fr: "Découvrez nos nouvelles machines capables de transformer les déchets plastiques en produits ménagers durables.", sg: "Bâ a-machine tî e tî gbiângö plastîki.", en: "Discover our new machines capable of transforming plastic waste into durable household products." },
  post_2_title: { fr: "L'importance des systèmes embarqués pour les Smart Farms", sg: "Lekengo IoT tî mû mabôkô na yaka", en: "The importance of embedded systems for Smart Farms" },
  post_2_excerpt: { fr: "L'agriculture de précision devient accessible grâce aux solutions IoT adaptées aux climats tropicaux.", sg: "Kua tî yaka ayeke gâ ngangô na IoT.", en: "Precision agriculture becomes accessible thanks to IoT solutions adapted to tropical climates." },
  post_3_title: { fr: "Formation : Devenir développeur de systèmes intelligents à Bangui", sg: "Mandango tènë tî lekengo programme", en: "Training: Becoming a developer of intelligent systems in Bangui" },
  post_3_excerpt: { fr: "Retour sur notre dernier atelier de formation intensive sur les microcontrôleurs et la robotique.", sg: "Kua tî mandango tènë tî robot na Bangui.", en: "Looking back at our latest intensive training workshop on microcontrollers and robotics." },
  contact_title: { fr: "Contactez L'Équipe", sg: "Sâra tènë na e", en: "Contact the Team" },
  contact_desc: { fr: "Une question ? Un projet ambitieux ? Nous sommes là pour vous accompagner.", sg: "Mo yeke na hûndâ? E yeke na mo sî e mû nî.", en: "A question? An ambitious project? We are here to support you." },
  contact_whatsapp_label: { fr: "Téléphone / WhatsApp", sg: "Tél / WhatsApp", en: "Phone / WhatsApp" },
  contact_email_label: { fr: "Email", sg: "Email", en: "Email" },
  contact_location_label: { fr: "Localisation", sg: "Lê tî ndo", en: "Location" },
  contact_location_val: { fr: "Galabadja 3, sinistré, 8é Arrondissement de Bangui", sg: "Galabadja 3, Bangui, Béafrîka", en: "Galabadja 3, Bangui, Central African Republic" },
  form_name: { fr: "Nom", sg: "Irî", en: "Name" },
  form_name_placeholder: { fr: "Votre nom", sg: "Irî tî mo", en: "Your name" },
  form_email: { fr: "Email", sg: "Email", en: "Email" },
  form_email_placeholder: { fr: "votre@email.com", sg: "email tî mo", en: "your@email.com" },
  form_subject: { fr: "Sujet", sg: "Lê tî tènë", en: "Subject" },
  form_subject_placeholder: { fr: "Sujet", sg: "Lê tî tènë", en: "Subject" },
  form_message: { fr: "Message", sg: "Tènë", en: "Message" },
  form_message_placeholder: { fr: "Message...", sg: "Tènë tî mo...", en: "Message..." },
  submit_btn: { fr: "Envoyer le Message", sg: "To tènë nî", en: "Send Message" },
  footer_desc: { fr: "Propulser l'innovation technologique en Afrique. Expertise en robotique, électronique et solutions intelligentes.", sg: "Mûngo ngangô na gêrê-kua na âta tî Béafrîka.", en: "Propelling technological innovation in Africa. Expertise in robotics, electronics and intelligent solutions." },
  footer_nav_title: { fr: "Navigation", sg: "Kua tî e", en: "Navigation" },
  footer_social_title: { fr: "Réseaux", sg: "Ndö tî tènë", en: "Social Networks" },
  footer_rights: { fr: "© 2024 FERNOTECH. Tous droits réservés.", sg: "© 2024 FERNOTECH. Kua kûê ayeke tî e.", en: "© 2024 FERNOTECH. All rights reserved." },
  footer_motto: { fr: "L'innovation technologique au service du futur.", sg: "Gêrê-kua tî bîakû tî mû mabôkô na kekere-kua.", en: "Technological innovation at the service of the future." },
  bot_greeting: { fr: "Bonjour ! Je suis l'assistant intelligent de FERNOTECH. Comment puis-je vous aider aujourd'hui ?", sg: "Bara mo! Mbi yeke assistant tî FERNOTECH. Ngbâna nyen mbi lingbi tî mû mabôkô na mo?", en: "Hello! I am FERNOTECH's intelligent assistant. How can I help you today?" },
  bot_placeholder: { fr: "Posez votre question...", sg: "Hûndâ tènë tî mo...", en: "Ask your question..." },
  bot_status: { fr: "Assistant IA actif", sg: "Assistant IA ayeke sâra kua", en: "AI Assistant active" },
  bot_powered: { fr: "Propulsé par FERNOTECH Intelligence", sg: "Machine tî FERNOTECH laasâra kua nî", en: "Powered by FERNOTECH Intelligence" },
  bot_resp_default: { fr: "C'est une excellente question. Pourriez-vous me donner plus de détails sur votre projet ?", sg: "So ayeke nzorô tî tènë. Fa tènë nî bîakû na mbi.", en: "That's an excellent question. Could you give me more details about your project?" },
  faq_title: { fr: "Questions Fréquentes", sg: "Hûndâ tènë tî azo", en: "Frequently Asked Questions" },
  faq_subtitle: { fr: "Tout ce que vous devez savoir sur nos services et notre technologie.", sg: "Tènë kûê so mo yeke na nî na ndö tî kua tî e.", en: "Everything you need to know about our services and technology." },
  faq_q1: { fr: "Quels types de robots fabriquez-vous ?", sg: "A-robot nyen sî âla yeke leke nî?", en: "What types of robots do you manufacture?" },
  faq_a1: { fr: "Nous concevons des robots industriels, des machines de recyclage et des drones de surveillance adaptés au contexte africain.", sg: "E leke a-machine tî recyclage na a-robot tî mû mabôkô na e na Béafrîka.", en: "We design industrial robots, recycling machines and surveillance drones adapted to the African context." },
  faq_q2: { fr: "Proposez-vous des formations ?", sg: "Âla yeke mû wango na mandango-kua?", en: "Do you offer training?" },
  faq_a2: { fr: "Oui, nous organisons régulièrement des ateliers sur la robotique et l'électronique à Bangui.", sg: "En-en, e yeke mû wango na mandango tènë tî robot na Bangui.", en: "Yes, we regularly organize workshops on robotics and electronics in Bangui." },
  faq_q3: { fr: "Comment puis-je commander une solution sur mesure ?", sg: "Mbi lingbi tî wara machine tî mbi mvenî sîon nyen?", en: "How can I order a custom solution?" },
  faq_a3: { fr: "Contactez-nous via le formulaire ou WhatsApp pour une consultation gratuite de votre projet.", sg: "Sâra tènë na e na WhatsApp sî e bâ tènë tî mo nî.", en: "Contact us via the form or WhatsApp for a free consultation on your project." },
  faq_q4: { fr: "Où êtes-vous situés ?", sg: "Âla yeke na ndo nyen?", en: "Where are you located?" },
  faq_a4: { fr: "Notre laboratoire principal est situé à Bangui, dans le quartier Galabadja 3.", sg: "E yeke na Bangui, na quartier Galabadja 3.", en: "Our main laboratory is located in Bangui, in the Galabadja 3 district." },
  testimonials_title: { fr: "Ils nous font confiance", sg: "Azo so amû mabôkô na e", en: "They Trust Us" },
  testimonials_subtitle: { fr: "Découvrez les retours de ceux qui utilisent nos solutions au quotidien.", sg: "Bâ tènë tî azo so asâra kua na a-machine tî e.", en: "Discover feedback from those who use our solutions daily." },
  test_role_1: { fr: "Chercheur en Écologie", sg: "Wandara tî ndö tî sêse", en: "Ecology Researcher" },
  test_text_1: { fr: "La machine de recyclage de Fernotech a radicalement changé notre approche de la gestion des déchets à Bangui.", sg: "Machine tî Fernotech agbiângö sîon tî bongbi saleté na Bangui.", en: "Fernotech's recycling machine has radically changed our approach to waste management in Bangui." },
  test_role_2: { fr: "Entrepreneure Agricole", sg: "Wamunu tî yaka", en: "Agricultural Entrepreneur" },
  test_text_2: { fr: "Grâce à leur système IoT, j'ai réduit ma consommation d'eau de 40% sur ma plantation.", sg: "Na machine tî e, mbi kiri na ngû tî yaka tî mbi na sêse sîon.", en: "Thanks to their IoT system, I reduced my water consumption by 40% on my plantation." },
  test_role_3: { fr: "Étudiant en Ingénierie", sg: "Wamandango tènë tî machine", en: "Engineering Student" },
  test_text_3: { fr: "Les formations de Fernotech sont une opportunité unique pour la jeunesse centrafricaine de briller dans la tech.", sg: "Wango tî Fernotech amû mabôkô na amaseka tî e tî Béafrîka.", en: "Fernotech's training is a unique opportunity for Central African youth to shine in tech." },
  team_badge: { fr: "Force d'Élite", sg: "Wandara tî e", en: "Elite Force" },
  team_title: { fr: "Notre Équipe", sg: "Wandara tî Fernotech", en: "Our Team" },
  team_subtitle: { fr: "Des experts passionnés dévoués à transformer l'avenir technologique de l'Afrique.", sg: "A-expert tî e so amû ngangô tî gbiângö Béafrîka.", en: "Passionate experts dedicated to transforming Africa's technological future." },
  team_founder_role: { fr: "Fondateur & CEO", sg: "Wasara-kua & Fondateur", en: "Founder & CEO" },
  team_founder_bio: { fr: "Visionnaire tech passionné par la robotique et l'impact social en RCA.", sg: "Wandara so abâ tènë tî robot na sîon tî bîakû.", en: "Tech visionary passionate about robotics and social impact in CAR." },
  team_engineer_role: { fr: "Ingénieure en Chef", sg: "Wandara tî kâsa", en: "Lead Engineer" },
  team_engineer_bio: { fr: "Experte en systèmes embarqués et conception de circuits complexes.", sg: "Wandara tî lekengo a-kâsa tî sîon tî bîakû.", en: "Expert in embedded systems and complex circuit design." },
  team_manager_role: { fr: "Directeur de Projets", sg: "Wamunu tî a-kua", en: "Project Director" },
  team_manager_bio: { fr: "Spécialiste en gestion d'innovation et déploiement technologique.", sg: "Wamunu tî bongbi akua kûê tî gâ na fin-yê.", en: "Specialist in innovation management and technological deployment." },
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
