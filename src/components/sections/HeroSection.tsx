"use client";

import { ArrowDown } from "lucide-react";
import { BRAND_INFO } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

export default function HeroSection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      {/* Top Meta info */}
      <div className="pt-20 md:pt-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-display text-xs tracking-[0.25em] text-secondary uppercase">
            EST. 2026 // PORTFOLIO
          </span>
        </div>
        <div className="hidden md:block font-display text-xs tracking-[0.2em] text-muted uppercase">
          AVAILABLE FOR GLOBAL COLLABORATIONS
        </div>
      </div>

      {/* Center / Editorial Hero Typography */}
      <div className="my-auto py-8">
        <div className="space-y-2 md:space-y-4">
          <div className="inline-block font-display text-xs md:text-sm tracking-[0.3em] uppercase text-accent font-semibold border-b border-accent/40 pb-1">
            CREATIVE IDENTITY × INTELLIGENT SYSTEMS
          </div>

          <h1 className="hero-heading font-black text-primary uppercase tracking-tight">
            NEXTGEN
            <span className="block text-secondary font-light">IFTY</span>
          </h1>

          <div className="pt-4 md:pt-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 text-secondary">
            <p className="font-display text-sm md:text-lg tracking-widest uppercase font-medium text-primary">
              GRAPHIC DESIGNER
            </p>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#333333]" />
            <p className="font-display text-sm md:text-lg tracking-widest uppercase font-medium text-accent">
              AI-POWERED WEB DEVELOPER
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="pb-8 md:pb-10 flex items-end justify-between">
        <div className="flex items-center gap-4 text-xs font-display tracking-[0.25em] text-secondary uppercase">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="animate-bounce text-accent" />
        </div>

        <div className="hidden sm:block text-right">
          <span className="font-display text-[10px] tracking-[0.2em] text-muted block uppercase">
            CORE DIRECTIVE
          </span>
          <span className="font-body text-xs text-secondary italic">
            &ldquo;{BRAND_INFO.coreStatement}&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}
