"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Chatbot } from "@/components/Chatbot";

// Ce layout s'applique uniquement aux pages publiques
// Le dossier (public) est un "Route Group" - il n'affecte pas l'URL
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CircuitBackground />
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <Chatbot />
    </>
  );
}
