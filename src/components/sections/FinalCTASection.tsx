"use client";

import { ArrowRight, Mail, ArrowUpRight } from "lucide-react";
import { BRAND_INFO } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

export default function FinalCTASection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  const socialEntries = [
    { name: "Facebook", url: BRAND_INFO.socials.facebook },
    { name: "LinkedIn", url: BRAND_INFO.socials.linkedin },
    { name: "GitHub", url: BRAND_INFO.socials.github },
    { name: "Behance", url: BRAND_INFO.socials.behance },
    { name: "Instagram", url: BRAND_INFO.socials.instagram },
  ];

  return (
    <div
      id="contact"
      className={`w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      {/* Top Tag */}
      <div className="pt-8 md:pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">07 // INITIATION</span>
          <div className="w-12 h-[1px] bg-border" />
        </div>
        <span className="font-display text-xs tracking-widest text-muted uppercase">
          NOW BOOKING NEW PROJECTS
        </span>
      </div>

      {/* Main Statement & Direct CTA */}
      <div className="my-auto py-8 space-y-8">
        <h2 className="section-heading font-black text-primary uppercase leading-[0.92] tracking-tighter">
          LET&apos;S BUILD
          <span className="block text-secondary">SOMETHING</span>
          <span className="block text-accent">DIFFERENT.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
          <a
            href={`mailto:${BRAND_INFO.email}?subject=Project%20Inquiry%20-%20NextGen%20Ifty`}
            className="btn-cinematic"
          >
            <span>LET&apos;S TALK</span>
            <ArrowRight size={16} className="btn-arrow" />
          </a>

          <a
            href={`mailto:${BRAND_INFO.email}`}
            className="flex items-center gap-2 text-sm font-display text-secondary hover:text-primary hover-draw-line"
          >
            <Mail size={15} className="text-accent" />
            <span>{BRAND_INFO.email}</span>
          </a>
        </div>
      </div>

      {/* Social Links & Handles */}
      <div className="pb-8 border-t border-border/80 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-xs tracking-widest text-muted uppercase">
              OFFICIAL CHANNELS
            </div>
            <div className="font-mono text-xs text-accent">{BRAND_INFO.handles}</div>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {socialEntries.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-xs font-display tracking-widest uppercase text-secondary hover:text-white transition-colors"
              >
                <span className="hover-draw-line">{soc.name}</span>
                <ArrowUpRight
                  size={12}
                  className="text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
