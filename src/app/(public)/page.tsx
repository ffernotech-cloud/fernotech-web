"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </main>
  );
}
