"use client";

import React from "react";
import { Blog } from "@/components/Blog";

export default function BlogPage() {
  return (
    <main className="pt-20">
      <Blog showAllBtn={false} />
    </main>
  );
}
