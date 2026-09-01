"use client";

import { useState } from "react";
import { SKILLS_DATA } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
  subProgress?: number; // 0 to 1 inside the expertise stage
}

export default function ExpertiseSection({
  opacity = 1,
  transform = "none",
  className = "",
  subProgress = 0,
}: SectionProps) {
  // Determine active tab or visual focus based on subProgress or user interaction
  const [manualTab, setManualTab] = useState<number | null>(null);

  // Derive stage: 0 = DESIGN, 1 = WEB, 2 = AI, 3 = COMBINED (DESIGN × WEB × AI)
  let calculatedStage = 0;
  if (subProgress < 0.28) calculatedStage = 0;
  else if (subProgress < 0.58) calculatedStage = 1;
  else if (subProgress < 0.82) calculatedStage = 2;
  else calculatedStage = 3;

  const currentActive = manualTab !== null ? manualTab : calculatedStage;

  const categories = [
    { key: "design", ...SKILLS_DATA.design },
    { key: "web", ...SKILLS_DATA.web },
    { key: "ai", ...SKILLS_DATA.ai },
  ];

  return (
    <div
      id="expertise"
      className={`w-full h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent">02 // CORE CAPABILITIES</span>
            </div>
            <h2 className="section-heading font-black text-primary uppercase mt-1">
              EXPERTISE
            </h2>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex items-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setManualTab(idx)}
                className={`px-4 py-2 text-xs font-display tracking-widest uppercase transition-all duration-300 border ${
                  currentActive === idx
                    ? "border-accent bg-accent/10 text-white"
                    : "border-border text-secondary hover:text-primary hover:border-border/80"
                }`}
              >
                0{idx + 1} {cat.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setManualTab(3)}
              className={`hidden sm:inline-block px-4 py-2 text-xs font-display tracking-widest uppercase transition-all duration-300 border ${
                currentActive === 3
                  ? "border-accent bg-accent text-white font-bold"
                  : "border-border text-muted hover:text-primary"
              }`}
            >
              SYNTHESIS
            </button>
          </div>
        </div>

        {/* Content Display */}
        {currentActive === 3 ? (
          /* Combined Synthesis View: DESIGN × WEB × AI */
          <div className="py-6 animate-fade-in space-y-6">
            <div className="text-3xl md:text-6xl font-display font-black text-primary tracking-tight">
              DESIGN <span className="text-accent">×</span> WEB <span className="text-accent">×</span> AI
            </div>
            <p className="text-secondary font-body max-w-2xl text-base md:text-lg font-light">
              A unified creative stack where visual brand aesthetics, rock-solid web architectures, and autonomous AI pipelines reinforce one another seamlessly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {categories.map((cat) => (
                <div key={cat.key} className="p-5 border border-border bg-[#0d0d0f]/60 backdrop-blur-sm">
                  <div className="text-xs font-mono text-accent mb-2">0{cat.number} // {cat.name}</div>
                  <ul className="space-y-1.5 text-xs font-body text-secondary">
                    {cat.skills.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent/60 rounded-full" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Single Category Focus */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
            {/* Left Big Typography */}
            <div className="lg:col-span-6 space-y-3">
              <span className="font-mono text-4xl md:text-7xl font-bold text-[#202020] block">
                0{categories[currentActive]?.number}
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary uppercase tracking-tight">
                {categories[currentActive]?.name}
              </h3>
              <p className="font-body text-sm text-secondary tracking-widest uppercase">
                DISCIPLINE &amp; SKILLSET MATRIX
              </p>
            </div>

            {/* Right Skills List */}
            <div className="lg:col-span-6">
              <div className="p-6 md:p-8 border border-border bg-[#0a0a0c]/80 backdrop-blur-md space-y-4">
                <div className="text-xs font-mono tracking-widest text-muted uppercase">
                  MASTERED COMPETENCIES
                </div>
                <div className="divide-y divide-border/60">
                  {categories[currentActive]?.skills.map((skill, sIdx) => (
                    <div
                      key={skill}
                      className="py-3 flex items-center justify-between group hover:pl-2 transition-all duration-200"
                    >
                      <span className="font-display text-base md:text-lg text-primary font-medium group-hover:text-accent transition-colors">
                        {skill}
                      </span>
                      <span className="font-mono text-xs text-muted group-hover:text-primary">
                        0{sIdx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
