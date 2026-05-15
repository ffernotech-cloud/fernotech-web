"use client";

import React from "react";
import { motion } from "framer-motion";

export const CircuitBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Tech Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="60" cy="60" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>

      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--brand-yellow)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="line-grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--brand-blue)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Animated Path 1 */}
        <motion.path
          d="M 100 0 L 100 200 L 300 200 L 300 400 L 0 400"
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated Path 2 */}
        <motion.path
          d="M 800 100 L 1000 100 L 1000 300 L 1200 300"
          fill="none"
          stroke="url(#line-grad-blue)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        />

        {/* Animated Path 3 */}
        <motion.path
          d="M 200 800 L 400 800 L 400 1000 L 600 1000"
          fill="none"
          stroke="rgba(0, 150, 57, 0.4)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Points */}
        <circle cx="100" cy="0" r="3" fill="var(--brand-yellow)" className="animate-pulse" />
        <circle cx="1200" cy="300" r="3" fill="var(--brand-blue)" className="animate-pulse" />
      </svg>
    </div>
  );
};

