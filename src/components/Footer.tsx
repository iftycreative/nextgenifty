"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { BRAND_INFO } from "@/data/projects";

interface FooterProps {
  onScrollToTop?: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const socialEntries = [
    { name: "Facebook", url: BRAND_INFO.socials.facebook },
    { name: "LinkedIn", url: BRAND_INFO.socials.linkedin },
    { name: "GitHub", url: BRAND_INFO.socials.github },
    { name: "Behance", url: BRAND_INFO.socials.behance },
    { name: "Instagram", url: BRAND_INFO.socials.instagram },
  ];

  const handleTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#050507] border-t border-[#1a1a1f] text-secondary py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-primary uppercase">
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="font-display text-sm tracking-widest uppercase text-muted">
              {BRAND_INFO.role}
            </p>
            <p className="font-body text-sm text-secondary/80 max-w-md font-light leading-relaxed">
              {BRAND_INFO.coreStatement}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs text-accent uppercase tracking-widest">
              DIRECT CONTACT
            </div>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="block font-display text-sm text-primary hover:text-accent transition-colors hover-draw-line"
            >
              {BRAND_INFO.email}
            </a>
            <div className="text-xs font-mono text-muted pt-2">
              LOCATION // GLOBAL AVAILABLE
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs text-accent uppercase tracking-widest">
              PLATFORMS
            </div>
            <div className="flex flex-col gap-2">
              {socialEntries.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-display tracking-widest uppercase text-secondary hover:text-white transition-colors"
                >
                  <span className="hover-draw-line">{soc.name}</span>
                  <ArrowUpRight size={12} className="text-muted" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#1a1a1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            © {BRAND_INFO.year} {BRAND_INFO.name}. ALL RIGHTS RESERVED.
          </div>

          <button
            type="button"
            onClick={handleTop}
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors uppercase font-display tracking-widest text-[11px] group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
