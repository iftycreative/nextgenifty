"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

export default function ServicesSection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <div
      id="services"
      className={`w-full h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Heading Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">04 // CAPABILITIES</span>
          </div>
          <h2 className="section-heading font-black text-primary uppercase leading-[0.92] tracking-tighter">
            WHAT
            <span className="block text-secondary">I</span>
            <span className="block text-accent">DO</span>
          </h2>
          <p className="font-body text-xs md:text-sm text-muted uppercase tracking-widest pt-2">
            SELECT A SERVICE TO REVEAL SCOPE &amp; ARTIFACTS
          </p>

          {/* Active Preview Snippet */}
          {hoveredIdx !== null && (
            <div className="hidden lg:block mt-8 p-6 border border-border bg-[#0b0b0e]/90 backdrop-blur-md space-y-3 transition-all duration-300">
              <span className="font-mono text-xs text-accent">
                SCOPE // {SERVICES_DATA[hoveredIdx].number}
              </span>
              <p className="font-body text-sm text-secondary leading-relaxed">
                {SERVICES_DATA[hoveredIdx].description}
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {SERVICES_DATA[hoveredIdx].deliverables.map((deliv) => (
                  <span
                    key={deliv}
                    className="text-[11px] font-display px-2 py-0.5 border border-border/80 text-primary bg-[#121216]"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Editorial Services List */}
        <div className="lg:col-span-8 divide-y divide-border border-t border-b border-border">
          {SERVICES_DATA.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(idx)}
                className={`py-4 md:py-5 px-3 md:px-5 flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  isHovered ? "bg-[#111116]/60 pl-6" : "hover:bg-[#0c0c10]/40"
                }`}
              >
                {/* Accent line on hover */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-accent transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="flex items-center gap-4 md:gap-6">
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isHovered ? "text-accent font-bold" : "text-muted"
                    }`}
                  >
                    {service.number}
                  </span>
                  <div>
                    <h3
                      className={`font-display text-lg md:text-2xl font-bold tracking-tight uppercase transition-colors ${
                        isHovered ? "text-primary translate-x-1" : "text-secondary"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs font-body text-muted md:hidden mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <span className="font-body text-xs text-muted font-light">
                    {service.tagline}
                  </span>
                  <div
                    className={`p-2 rounded-full border transition-all duration-300 ${
                      isHovered
                        ? "border-accent text-accent bg-accent/10 rotate-45"
                        : "border-border text-muted"
                    }`}
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
