import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import content from "@/data/content.json";

const defaultEvents = [
  {
    id: "1",
    type: "upcoming",
    tag: "Formation",
    time: "09:00 - 17:00",
    color: "brand-blue",
    fr: {
      title: "Workshop : Robotique & Microcontrôleurs (Arduino / ESP32)",
      desc: "Un atelier pratique intensif de 2 jours pour concevoir et programmer vos premiers robots à Bangui.",
      date: "15 - 16 Juin 2026",
      location: "Lab FERNOTECH, Galabadja 3, Bangui",
      capacity: "15 participants"
    },
    sg: {
      title: "Atelier : Robotique & Microcontrôleurs (Arduino)",
      desc: "Mandango lekengo robot na microcontrôleurs na Bangui tî mû mabôkô na amaseka tî e.",
      date: "15 - 16 Juin 2026",
      location: "Lab FERNOTECH, Galabadja 3, Bangui",
      capacity: "zo 15 gï"
    },
    en: {
      title: "Workshop: Robotics & Microcontrollers (Arduino / ESP32)",
      desc: "A hands-on, intensive 2-day workshop to design and program your first robots in Bangui.",
      date: "15 - 16 June 2026",
      location: "FERNOTECH Lab, Galabadja 3, Bangui",
      capacity: "15 participants"
    }
  },
  {
    id: "2",
    type: "upcoming",
    tag: "Lancement",
    time: "14:00 - 17:00",
    color: "brand-yellow",
    fr: {
      title: "Démonstration Publique : L'Éco-Recycleur V2",
      desc: "Venez découvrir et voir en action notre nouvelle machine brevetée capable de transformer les déchets plastiques en objets ménagers durables.",
      date: "05 Juillet 2026",
      location: "Hôtel Ledger Plaza, Bangui",
      capacity: "Entrée libre sur réservation"
    },
    sg: {
      title: "Démonstration ti machine : Eco-Recycleur V2",
      desc: "Gango tî bâ machine ti e so agbiângö plastîki tî gâ balais na Bangui.",
      date: "05 Juillet 2026",
      location: "Hôtel Ledger Plaza, Bangui",
      capacity: "Entrée libre"
    },
    en: {
      title: "Public Demo: The Eco-Recycler V2",
      desc: "Come and discover our patented machine in action, transforming plastic waste into durable household products.",
      date: "05 July 2026",
      location: "Ledger Plaza Hotel, Bangui",
      capacity: "Free admission with registration"
    }
  },
  {
    id: "3",
    type: "past",
    tag: "Hackathon",
    time: "3 Jours non-stop",
    color: "brand-green",
    fr: {
      title: "Central African Tech Hackathon 2025",
      desc: "Co-organisé par FERNOTECH, ce hackathon a rassemblé plus de 50 jeunes développeurs centrafricains autour de solutions technologiques d'impact.",
      date: "12 - 14 Décembre 2025",
      location: "Complexe Sportif, Bangui",
      capacity: "50+ participants"
    },
    sg: {
      title: "Central African Tech Hackathon 2025",
      desc: "Co-organisé na FERNOTECH, mûngo mabôkô na amaseka 50 tî RCA tî leke a-programme tî ordinateur.",
      date: "12 - 14 Décembre 2025",
      location: "Complexe Sportif, Bangui",
      capacity: "zo 50+"
    },
    en: {
      title: "Central African Tech Hackathon 2025",
      desc: "Co-organized by FERNOTECH, this hackathon brought together over 50 young Central African developers to build impactful tech solutions.",
      date: "12 - 14 December 2025",
      location: "Sports Complex, Bangui",
      capacity: "50+ participants"
    }
  },
  {
    id: "4",
    type: "past",
    tag: "Workshop",
    time: "08:00 - 16:00",
    color: "brand-blue",
    fr: {
      title: "Atelier IoT & Agriculture Connectée",
      desc: "Bootcamp destiné aux coopératives agricoles pour installer et maintenir des capteurs d'humidité connectés.",
      date: "18 Octobre 2025",
      location: "Ferme Pilote de Damara, RCA",
      capacity: "30 agriculteurs"
    },
    sg: {
      title: "Atelier IoT & Yaka ti bîanî",
      desc: "Mandango lekengo a-capteur ti ngû ti yaka na amunu ti yaka ti Damara.",
      date: "18 Octobre 2025",
      location: "Ferme Pilote de Damara, RCA",
      capacity: "zo 30 ti yaka"
    },
    en: {
      title: "IoT & Connected Agriculture Workshop",
      desc: "Bootcamp dedicated to agricultural cooperatives to install and maintain connected moisture sensors.",
      date: "18 October 2025",
      location: "Damara Pilot Farm, CAR",
      capacity: "30 farmers"
    }
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Insert Projects
    await db.collection("projects").deleteMany({});
    if (content.projects && content.projects.length > 0) {
      await db.collection("projects").insertMany(content.projects);
    }

    // Insert Posts
    await db.collection("posts").deleteMany({});
    if (content.posts && content.posts.length > 0) {
      await db.collection("posts").insertMany(content.posts);
    }

    // Insert Events
    await db.collection("events").deleteMany({});
    await db.collection("events").insertMany(defaultEvents);

    // Insert Settings
    await db.collection<any>("settings").updateOne(
      { _id: "global" },
      { $set: content.settings },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Migration de content.json et initialisation des événements terminée !" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Erreur lors de la migration" }, { status: 500 });
  }
}
