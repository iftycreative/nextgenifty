"use client";

import { ArrowDown } from "lucide-react";
import { AI_PROCESS_STEPS } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

export default function AIWebSection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  return (
    <div
      className={`w-full h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="space-y-8 md:space-y-12">
        {/* Top Tag */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">06 // PARADIGM SHIFT</span>
          <div className="w-12 h-[1px] bg-border" />
        </div>

        {/* Main Editorial Statement */}
        <div className="space-y-2">
          <h2 className="section-heading font-black text-secondary uppercase tracking-tight">
            I DON&apos;T JUST USE AI.
          </h2>
          <h2 className="section-heading font-black text-accent uppercase tracking-tight">
            I BUILD WITH IT.
          </h2>
        </div>

        {/* Linear Process Architecture */}
        <div className="pt-6 border-t border-border">
          <div className="text-xs font-mono tracking-widest text-muted uppercase mb-6">
            PRACTICAL EXECUTION PIPELINE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AI_PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.name}
                className="p-5 border border-border bg-[#0a0a0d]/80 backdrop-blur-sm relative group hover:border-accent/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent mb-3">
                    <span>STEP // {step.step}</span>
                    {idx < AI_PROCESS_STEPS.length - 1 && (
                      <ArrowDown size={12} className="lg:-rotate-90 text-muted group-hover:text-accent transition-transform" />
                    )}
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-primary uppercase tracking-wide">
                    {step.name}
                  </h3>
                </div>

                <p className="mt-4 text-xs font-body text-secondary leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
