"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bot, 
  Cpu, 
  Code, 
  Smartphone, 
  GraduationCap, 
  Briefcase, 
  ShoppingBag, 
  ArrowLeft, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Service details database
interface ServiceDetail {
  icon: React.ComponentType<any>;
  color: string;
  glow: string;
  bgImage: string;
  fr: {
    title: string;
    subtitle: string;
    overview: string;
    features: { title: string; desc: string }[];
    useCase: string;
  };
  sg: {
    title: string;
    subtitle: string;
    overview: string;
    features: { title: string; desc: string }[];
    useCase: string;
  };
  en: {
    title: string;
    subtitle: string;
    overview: string;
    features: { title: string; desc: string }[];
    useCase: string;
  };
}

const servicesData: Record<string, ServiceDetail> = {
  robotique: {
    icon: Bot,
    color: "brand-red",
    glow: "glow-red",
    bgImage: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=2000",
    fr: {
      title: "Robotique Industrielle & Écologique",
      subtitle: "L'automatisation et les machines sur mesure conçues pour l'Afrique.",
      overview: "Chez FERNOTECH, nous croyons que la robotique est un levier majeur de développement pour le continent. Nous concevons et fabriquons localement des machines intelligentes, des bras robotisés et des systèmes d'automatisation sur mesure pour résoudre des défis industriels et environnementaux réels.",
      features: [
        { title: "Conception sur Mesure", desc: "Étude complète et fabrication de machines répondant à vos besoins spécifiques." },
        { title: "Impact Écologique", desc: "Développement de machines de recyclage et de valorisation des déchets." },
        { title: "Maintenance Locale", desc: "Support technique et pièces de rechange disponibles directement à Bangui." }
      ],
      useCase: "Machine Eco-Recycleur V2 : Valorisation des plastiques en balais écoresponsables."
    },
    sg: {
      title: "Lekengo Kua tî Robot",
      subtitle: "A-machine tî bîakû so asâra kua tî mû mabôkô na e.",
      overview: "Na FERNOTECH, e yeke leke a-machine so asâra kua mbîanî tî mû mabôkô na akpale tî e na ndö tî courant na lekengo fin-yê na ndö tî recyclage.",
      features: [
        { title: "Lekengo yê tî fîni", desc: "Lekengo machine alîngbi na yê so mo ye nî bîakû." },
        { title: "Bôngbi saleté", desc: "Machine tî recyclage tî gbiângö plastîki tî gâ balais na a-yê tî fîni." },
        { title: "Mabôkô tî e", desc: "Support technique na Bangui tî leke a-machine tî mo." }
      ],
      useCase: "Machine Eco-Recycleur V2 : Gbiângö plastîki tî gâ balais na Bangui."
    },
    en: {
      title: "Industrial & Ecological Robotics",
      subtitle: "Custom automation and smart machines designed for Africa.",
      overview: "At FERNOTECH, we believe robotics is a major development lever for the continent. We locally design and manufacture smart machines, robotic arms, and custom automation systems to solve real-world industrial and environmental challenges.",
      features: [
        { title: "Custom Design", desc: "Comprehensive study and manufacturing of machines meeting your specific needs." },
        { title: "Ecological Impact", desc: "Development of recycling and waste recovery machines." },
        { title: "Local Maintenance", desc: "Technical support and spare parts available directly in Bangui." }
      ],
      useCase: "Eco-Recycler Machine V2: Upcycling plastic waste into eco-responsible brooms."
    }
  },
  electronique: {
    icon: Cpu,
    color: "brand-yellow",
    glow: "glow-yellow",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000",
    fr: {
      title: "Électronique de Pointe & Maintenance",
      subtitle: "Conception de circuits imprimés et réparation de systèmes électroniques complexes.",
      overview: "Nous offrons des services complets en ingénierie électronique : routage de circuits (PCB), prototypage, assemblage et intégration. Nous assurons également le diagnostic et la maintenance préventive et curative d'équipements industriels et médicaux de haute technologie.",
      features: [
        { title: "Conception de PCB", desc: "Modélisation et routage de cartes électroniques de haute qualité." },
        { title: "Maintenance Industrielle", desc: "Diagnostic et réparation de systèmes de puissance et de contrôle." },
        { title: "Prototypage Rapide", desc: "Création de prototypes fonctionnels pour valider vos innovations." }
      ],
      useCase: "Maintenance d'automates industriels et de cartes de puissance pour les entreprises de Bangui."
    },
    sg: {
      title: "Électronique na Kua tî Kâsa",
      subtitle: "Lekengo akâsa tî sîon na courant tî mû mabôkô na machine.",
      overview: "E yeke leke a-kâsa tî courant, e yeke diagnostic a-machine tî mo sî e leke nî bîanî tî asâra kua nzônî.",
      features: [
        { title: "Lekengo kâsa", desc: "Lekengo circuit imprimé alîngbi na sîon tî bîakû." },
        { title: "Lekengo machine", desc: "Reparation tî a-machine tî courant na a-hôpital na a-société." },
        { title: "Prototype", desc: "Lekengo machine tî to-li tî bâ wala asâra kua." }
      ],
      useCase: "Lekengo a-machine tî hôpital na tî a-société na Bangui."
    },
    en: {
      title: "Advanced Electronics & Maintenance",
      subtitle: "Printed circuit board design and repair of complex electronic systems.",
      overview: "We offer comprehensive services in electronic engineering: PCB routing, prototyping, assembly, and integration. We also provide diagnostics and preventive/corrective maintenance for high-tech industrial and medical equipment.",
      features: [
        { title: "PCB Design", desc: "Modeling and routing of high-quality printed circuit boards." },
        { title: "Industrial Maintenance", desc: "Diagnostics and repair of power and control systems." },
        { title: "Rapid Prototyping", desc: "Creation of functional prototypes to validate your innovations." }
      ],
      useCase: "Maintenance of industrial PLCs and power boards for businesses in Bangui."
    }
  },
  logiciel: {
    icon: Code,
    color: "brand-blue",
    glow: "glow-blue",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000",
    fr: {
      title: "Développement Logiciel & Applications",
      subtitle: "Des applications web, mobiles et logiciels métiers sur mesure conçus pour performer.",
      overview: "Nous développons des plateformes numériques robustes, adaptées à la réalité locale et aux standards internationaux. Du CRM sur mesure à l'application mobile en passant par des ERP d'entreprise, nous donnons vie à vos outils de gestion et de croissance.",
      features: [
        { title: "Applications Web & Mobile", desc: "Interfaces modernes, réactives et optimisées pour les connexions locales." },
        { title: "Logiciels Métiers (ERP/CRM)", desc: "Outils de gestion d'activité sur mesure pour automatiser vos processus." },
        { title: "Intégration d'API", desc: "Connexion sécurisée de vos outils avec des solutions de paiement mobile ou de SMS." }
      ],
      useCase: "Développement de l'ERP interne 'Gravité' et d'outils de gestion commerciale locale."
    },
    sg: {
      title: "Lekengo Programme (Logiciel)",
      subtitle: "Lekengo application tî téléphone na programme tî computer.",
      overview: "E yeke leke a-programme tî mû mabôkô na a-société tî bongbi akua tî âla na ndö tî ordinateur na téléphone.",
      features: [
        { title: "Application téléphone", desc: "Application so alîngbi na téléphone tî e tî Béafrîka." },
        { title: "Logiciel ERP/CRM", desc: "Programme tî bongbi comptabilité na stock tî société." },
        { title: "Paiement Mobile", desc: "Intégration tî paiement na Orange Money wala Moov Money." }
      ],
      useCase: "Lekengo ERP tî 'Gravité' na a-programme tî kângo yê na Bangui."
    },
    en: {
      title: "Software & App Development",
      subtitle: "Custom web, mobile applications, and business software built to perform.",
      overview: "We develop robust digital platforms tailored to local realities and international standards. From custom CRM to mobile apps and enterprise ERPs, we bring your management and growth tools to life.",
      features: [
        { title: "Web & Mobile Apps", desc: "Modern, responsive interfaces optimized for local internet bandwidth." },
        { title: "Enterprise Software", desc: "Tailored business management tools to automate your workflows." },
        { title: "API Integration", desc: "Secure connection of your tools with mobile money payment or SMS solutions." }
      ],
      useCase: "Development of the 'Gravité' internal ERP and local retail management tools."
    }
  },
  embarque: {
    icon: Smartphone,
    color: "brand-green",
    glow: "glow-green",
    bgImage: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=2000",
    fr: {
      title: "Systèmes Embarqués & Internet des Objets",
      subtitle: "Connectez vos équipements et collectez des données cruciales en temps réel.",
      overview: "Nous créons des solutions connectées intelligentes pour l'agriculture, l'industrie et la ville (Smart Cities). Nos systèmes embarqués intègrent des microcontrôleurs (Arduino, ESP32, STM32) pour acquérir des données physiques et automatiser des actions à distance.",
      features: [
        { title: "Solutions IoT sur Mesure", desc: "Capteurs connectés pour suivre l'humidité, la température ou la consommation." },
        { title: "Microcontrôleurs & Firmware", desc: "Programmation bas niveau ultra-optimisée pour une fiabilité maximale." },
        { title: "Réseaux Sans Fil (LoRa/GSM)", desc: "Transmission à longue distance même sans connexion internet stable." }
      ],
      useCase: "Smart Farm Solution : Irrigation autonome basée sur l'humidité des sols."
    },
    sg: {
      title: "IoT na Système Embarqué",
      subtitle: "Machine so alîngbi tî sâra kua na ndö tî internet na a-capteur.",
      overview: "E yeke leke a-machine so asâra kua na ndö tî internet tî mû mabôkô na yaka wala sîon tî courant.",
      features: [
        { title: "Capteur intelligent", desc: "Machine so abâ moisture tî sêse na yaka sî amû ngû." },
        { title: "IoT tî fîni", desc: "Bôngbi machine tî corriente sî asâra kua na téléphone." },
        { title: "Réseau LoRa & GSM", desc: "To tènë tî machine na long distance gï na LoRa." }
      ],
      useCase: "Smart Farm Solution : Mûngo ngû na yaka na machine tî automatic."
    },
    en: {
      title: "Embedded Systems & Internet of Things (IoT)",
      subtitle: "Connect your equipment and collect critical data in real time.",
      overview: "We build smart connected solutions for agriculture, industry, and smart cities. Our embedded systems integrate microcontrollers (Arduino, ESP32, STM32) to acquire physical data and automate actions remotely.",
      features: [
        { title: "Custom IoT Solutions", desc: "Connected sensors to monitor moisture, temperature, or consumption." },
        { title: "Microcontrollers & Firmware", desc: "Ultra-optimized low-level programming for maximum reliability." },
        { title: "Wireless Networks (LoRa/GSM)", desc: "Long-range transmission even without a stable internet connection." }
      ],
      useCase: "Smart Farm Solution: Autonomous irrigation based on soil moisture analysis."
    }
  },
  formation: {
    icon: GraduationCap,
    color: "white",
    glow: "shadow-white/20",
    bgImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000",
    fr: {
      title: "Formation, Ateliers & Mentorat",
      subtitle: "Formez vos collaborateurs ou apprenez à concevoir les technologies de demain.",
      overview: "Nous transmettons notre savoir-faire aux passionnés, étudiants et professionnels de Bangui. Nos ateliers pratiques couvrent la programmation Arduino, la robotique, l'impression 3D et le développement de logiciels pour dynamiser l'écosystème tech local.",
      features: [
        { title: "Ateliers Pratiques (Bootcamps)", desc: "Des sessions intensives 100% axées sur la pratique et les projets réels." },
        { title: "Formation Professionnelle", desc: "Mise à niveau de vos équipes techniques sur les outils modernes." },
        { title: "Accompagnement de Projets", desc: "Un mentorat pour transformer vos idées académiques en prototypes." }
      ],
      useCase: "Bootcamps réguliers sur la robotique et les microcontrôleurs pour la jeunesse de Bangui."
    },
    sg: {
      title: "Wango & Mandango-kua",
      subtitle: "Mandango tènë tî robot, kâsa tî courant na informatique.",
      overview: "E yeke mû wango na mandango tènë tî robot na amaseka tî Bangui tî âla gâ ngangô na ndö tî tech.",
      features: [
        { title: "Atelier pratique", desc: "Mandango so azo asâra kua nî na mabôkô tî âla kûê." },
        { title: "Formation tî a-société", desc: "Mûngo wango na équipe tî mo tî sâra kua nzônî." },
        { title: "Mentorat tî amaseka", desc: "Mû mabôkô na a-étudiants tî leke machine tî âla." }
      ],
      useCase: "Atelier ti Mandango robotique na microcontrôleurs na Bangui."
    },
    en: {
      title: "Training, Workshops & Mentorship",
      subtitle: "Train your employees or learn how to design the technologies of tomorrow.",
      overview: "We pass on our know-how to enthusiasts, students, and professionals in Bangui. Our practical workshops cover Arduino programming, robotics, 3D printing, and software development to boost the local tech ecosystem.",
      features: [
        { title: "Practical Bootcamps", desc: "Intensive, 100% hands-on sessions focused on real-world projects." },
        { title: "Corporate Training", desc: "Upgrading your technical teams on modern tools." },
        { title: "Project Mentorship", desc: "Mentorship to turn your academic ideas into functional prototypes." }
      ],
      useCase: "Regular bootcamps on robotics and microcontrollers for local youth in Bangui."
    }
  },
  conseil: {
    icon: Briefcase,
    color: "brand-blue",
    glow: "glow-blue",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000",
    fr: {
      title: "Conseil & Innovation Technologique",
      subtitle: "Audit, transformation digitale et accompagnement stratégique pour votre entreprise.",
      overview: "Nous accompagnons les organisations, les ONG et les institutions dans leur transition numérique et dans l'adoption de technologies à fort impact. De l'audit d'infrastructure aux conseils en architecture logicielle, nous traçons votre feuille de route.",
      features: [
        { title: "Audit & Diagnostic", desc: "Analyse complète de vos outils technologiques existants et recommandations." },
        { title: "Stratégie Innovation", desc: "Intégration d'outils intelligents (IA, IoT) pour optimiser vos coûts." },
        { title: "Gestion de Projets Tech", desc: "Direction technique externe (CTO as a Service) pour vos déploiements." }
      ],
      useCase: "Accompagnement de projets de transition digitale pour diverses ONG nationales et internationales."
    },
    sg: {
      title: "Wango & Fin-yê",
      subtitle: "Mûngo wango tî transformation digitale na a-société.",
      overview: "E yeke mû wango na a-organisation na a-ong tî gâ na yê tî gêrê-kua so alîngbi tî mû mabôkô na e.",
      features: [
        { title: "Audit tî machine", desc: "Bâ sîon tî machine tî mo sî e mû nzônî wango." },
        { title: "Stratégie", desc: "Bôngbi a-yê tî courant na a-logiciel tî kiri na nginza na sêse." },
        { title: "CTO as a Service", desc: "Mûngo directeur technique tî mû mabôkô na akua tî mo." }
      ],
      useCase: "Mûngo wango na a-ONG tî leke kua tî âla na ndö tî internet na a-machine."
    },
    en: {
      title: "Consulting & Tech Innovation",
      subtitle: "Audit, digital transformation, and strategic guidance for your business.",
      overview: "We support organizations, NGOs, and institutions in their digital transition and the adoption of high-impact technologies. From infrastructure audits to software architecture advice, we map out your route.",
      features: [
        { title: "Audit & Diagnostics", desc: "Comprehensive analysis of your existing technology tools and recommendations." },
        { title: "Innovation Strategy", desc: "Integration of smart tools (AI, IoT) to optimize your operations." },
        { title: "Tech Project Management", desc: "External technical direction (CTO as a Service) for your deployments." }
      ],
      useCase: "Supporting digital transition programs for national and international NGOs."
    }
  },
  commerce: {
    icon: ShoppingBag,
    color: "brand-yellow",
    glow: "glow-yellow",
    bgImage: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=2000",
    fr: {
      title: "Vente d'Équipements & Composants de Pointe",
      subtitle: "Votre partenaire d'approvisionnement en matériel électronique et robotique en Centrafrique.",
      overview: "Trouver des composants électroniques fiables, des microcontrôleurs authentiques et des capteurs de qualité à Bangui peut être un défi. FERNOTECH vous propose un catalogue d'équipements importés et testés pour vos projets de recherche et de développement.",
      features: [
        { title: "Composants & Cartes", desc: "Vente d'Arduino, Raspberry Pi, ESP32, capteurs de précision, moteurs et relais." },
        { title: "Matériel de Mesure", desc: "Multimètres, oscilloscopes et outils de soudure professionnels." },
        { title: "Pièces Robotiques", desc: "Châssis, engrenages, roues et servomoteurs pour vos bras robotisés." }
      ],
      useCase: "Fourniture de kits d'apprentissage et de composants pour les instituts et étudiants en ingénierie."
    },
    sg: {
      title: "Kângo a-machine na kâsa",
      subtitle: "Kângo a-composant tî courant na robot na Bangui.",
      overview: "Wara a-composant tî courant so asâra kua nzônî na Bangui ayeke kpale. FERNOTECH amû na mo a-composant so ayeke authentique.",
      features: [
        { title: "Arduino & Raspberry", desc: "Kângo a-cartes Arduino, Raspberry, capteurs na moteurs." },
        { title: "Outil tî leke na kâsa", desc: "Vente tî fer à souder, multimètre na yê tî leke na courant." },
        { title: "Pièces tî robot", desc: "A-roues, servomoteur na châssis tî leke na robot tî mo." }
      ],
      useCase: "Kângo a-cartes Arduino, Raspberry na yê tî mandango na courant na Bangui."
    },
    en: {
      title: "Equipment & Advanced Components Sales",
      subtitle: "Your sourcing partner for electronic and robotic hardware in the Central African Republic.",
      overview: "Finding reliable electronic components, authentic microcontrollers, and quality sensors in Bangui can be a challenge. FERNOTECH provides a catalog of imported and tested equipment for your R&D projects.",
      features: [
        { title: "Components & Boards", desc: "Authentic Arduino, Raspberry Pi, ESP32, sensors, motors, and relays." },
        { title: "Measurement Tools", desc: "Multimeters, oscilloscopes, and professional soldering tools." },
        { title: "Robotic Parts", desc: "Chassis, gears, wheels, and servomotors for your robotic systems." }
      ],
      useCase: "Supplying education kits and components for local engineering institutes and students."
    }
  }
};

export default function ServiceSlugPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-4xl font-black mb-4">Service introuvable</h1>
        <p className="text-white/40 mb-8">Le service que vous cherchez n'existe pas ou a été déplacé.</p>
        <Link href="/" className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Get active translations
  const content = service[language] || service.fr;
  const ServiceIcon = service.icon;

  // Filter other services for footer recommendation
  const otherServices = Object.keys(servicesData).filter(key => key !== slug);

  return (
    <main className="min-h-screen bg-background text-text-primary pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s]"
          style={{ backgroundImage: `url('${service.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />

        <div className="container mx-auto px-6 relative z-10 text-center space-y-6 max-w-4xl">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-card-border text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-foreground/10 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {language === "fr" ? "Tous les Services" : language === "sg" ? "Akua nî kûê" : "All Services"}
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", 
              service.color === "brand-red" ? "from-brand-red to-white" :
              service.color === "brand-yellow" ? "from-brand-yellow to-white" :
              service.color === "brand-green" ? "from-brand-green to-white" :
              "from-brand-blue to-white"
            )}>
              {content.title}
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-6xl mt-12 grid lg:grid-cols-3 gap-12">
        
        {/* Left Column: Overview and Features */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview Card */}
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-card-border space-y-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              `bg-${service.color}/10 text-${service.color}`
            )}>
              <ServiceIcon className="w-10 h-10 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black tracking-tight border-b border-card-border pb-4 text-text-primary">
              {language === "fr" ? "Présentation du Service" : language === "sg" ? "Tènë tî Kua nî" : "Service Overview"}
            </h2>
            <p className="text-text-secondary text-base leading-relaxed font-medium">
              {content.overview}
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black tracking-tight px-2 text-text-primary">
              {language === "fr" ? "Avantages & Fonctionnalités" : language === "sg" ? "Mabôkô tî Kua nî" : "Key Benefits & Features"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {content.features.map((feature, i) => (
                <div key={i} className="glass p-8 rounded-3xl border-card-border flex gap-4 items-start group hover:border-card-border transition-colors">
                  <div className={cn("mt-1 flex-shrink-0", `text-${service.color}`)}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-base text-text-primary group-hover:text-brand-blue transition-colors">{feature.title}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Case study, Quick Contact CTA */}
        <div className="space-y-8">
          {/* Use Case Card */}
          <div className="glass p-8 rounded-3xl border-card-border relative overflow-hidden group">
            <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-20", `bg-${service.color}`)} />
            <h3 className="text-sm font-black text-brand-yellow uppercase tracking-widest mb-4">// {language === "fr" ? "Cas d'Usage Réel" : language === "sg" ? "Kua tî bîakû" : "Real Use Case"}</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-medium">
              {content.useCase}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-text-secondary">
              <Zap className={cn("w-4 h-4", `text-${service.color}`)} />
              {language === "fr" ? "Technologie Appliquée" : language === "sg" ? "Machine tî bîakû" : "Applied Technology"}
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="glass p-8 rounded-[2rem] border-card-border bg-gradient-to-b from-foreground/[0.02] to-transparent space-y-6">
            <h3 className="text-xl font-black text-text-primary">
              {language === "fr" ? "Intéressé par ce service ?" : language === "sg" ? "Mo ye kua so?" : "Interested in this service?"}
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              {language === "fr" ? "Contactez nos ingénieurs pour obtenir une étude personnalisée et un devis adapté à votre projet." :
               language === "sg" ? "Sâra tènë na e tî leke machine wala kua tî mo na sîon tî bîakû." :
               "Contact our engineers to get a personalized study and a custom quote adapted to your project."}
            </p>
            <Link 
              href={`/contact?service=${slug}`}
              className="w-full py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_15px_30px_rgba(0,82,180,0.3)]"
            >
              <MessageSquare className="w-5 h-5" />
              {language === "fr" ? "Demander un Devis" : language === "sg" ? "Mû Devis" : "Request a Quote"}
            </Link>
          </div>
        </div>

      </section>

      {/* Recommended Other Services Carousel */}
      <section className="container mx-auto px-6 max-w-6xl mt-24 border-t border-card-border pt-16">
        <h3 className="text-2xl font-black mb-8 text-text-primary">
          {language === "fr" ? "Découvrir nos autres expertises" : language === "sg" ? "Ambo akua tî e tî fîni" : "Explore our other expertises"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.slice(0, 3).map(key => {
            const item = servicesData[key];
            const ItemIcon = item.icon;
            const itemContent = item[language] || item.fr;

            return (
              <Link 
                key={key} 
                href={`/services/${key}`}
                className="glass p-6 rounded-3xl border-card-border hover:border-card-border group flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                    `bg-${item.color}/10 text-${item.color}`
                  )}>
                    <ItemIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-text-primary group-hover:text-brand-blue transition-colors leading-tight">{itemContent.title}</h4>
                  <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">{itemContent.subtitle}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-yellow group-hover:text-white transition-colors">
                  {language === "fr" ? "Explorer" : language === "sg" ? "Bâ kûê" : "Explore"}
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
