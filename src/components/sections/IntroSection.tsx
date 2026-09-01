"use client";

import { BRAND_INFO } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

export default function IntroSection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  return (
    <div
      id="about"
      className={`w-full h-full flex flex-col justify-center p-6 md:p-12 lg:p-20 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="max-w-4xl space-y-6 md:space-y-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">01 // PHILOSOPHY</span>
          <div className="w-12 h-[1px] bg-border" />
        </div>

        <h2 className="section-heading font-extrabold text-primary uppercase leading-[0.92] tracking-tighter">
          I DESIGN
          <span className="text-secondary block">IDEAS.</span>
          <span className="text-primary block mt-2">I BUILD</span>
          <span className="text-accent block">EXPERIENCES.</span>
        </h2>

        <div className="pt-4 border-t border-border/80 max-w-2xl">
          <p className="font-body text-base md:text-xl text-secondary leading-relaxed font-light">
            {BRAND_INFO.coreStatement}
          </p>
          <p className="mt-4 font-body text-xs md:text-sm text-muted uppercase tracking-widest font-display">
            Merging pure graphic sensibility with modern machine intelligence and high-speed web architectures.
          </p>
        </div>
      </div>
    </div>
  );
}
