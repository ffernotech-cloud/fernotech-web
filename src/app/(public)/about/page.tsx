"use client";

import React from "react";
import { About } from "@/components/About";
import { Team } from "@/components/Team";

export default function AboutPage() {
  return (
    <main className="pt-20">
      <About />
      <Team />
    </main>
  );
}
