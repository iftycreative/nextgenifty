"use client";

import { JOURNEY_DATA } from "@/data/projects";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
  subProgress?: number; // 0 to 1 inside journey stage
}

export default function JourneySection({
  opacity = 1,
  transform = "none",
  className = "",
  subProgress = 0,
}: SectionProps) {
  // Calculate which milestones are active based on subProgress (0 to 1)
  const total = JOURNEY_DATA.length;
  // subProgress smoothly draws line from 0% to 100%
  const lineProgressPercent = Math.min(100, Math.max(15, subProgress * 110));

  return (
    <div
      id="journey"
      className={`w-full h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="space-y-8 md:space-y-10 max-w-5xl">
        {/* Section Header */}
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">03 // TRAJECTORY</span>
          </div>
          <h2 className="section-heading font-black text-primary uppercase mt-1">
            MY JOURNEY
          </h2>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="relative pl-6 md:pl-10">
          {/* Background vertical line */}
          <div className="absolute left-0 top-2 bottom-4 w-[1px] bg-[#222222]" />

          {/* Active progressive accent line */}
          <div
            className="absolute left-0 top-2 w-[1px] bg-accent transition-all duration-300 ease-out"
            style={{ height: `${lineProgressPercent}%` }}
          />

          <div className="space-y-8 md:space-y-10">
            {JOURNEY_DATA.map((milestone, idx) => {
              // Determine active state threshold
              const threshold = idx / total;
              const isReached = subProgress >= threshold * 0.8;

              return (
                <div
                  key={`${milestone.year}-${milestone.title}`}
                  className={`relative transition-all duration-500 ${
                    isReached ? "opacity-100 translate-x-0" : "opacity-40 translate-x-1"
                  }`}
                >
                  {/* Point marker on the line */}
                  <div
                    className={`absolute -left-[30px] md:-left-[46px] top-1.5 w-3 h-3 rounded-full border transition-all duration-300 ${
                      isReached
                        ? "border-accent bg-accent shadow-[0_0_12px_rgba(255,59,129,0.8)]"
                        : "border-[#444444] bg-[#080808]"
                    }`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                    {/* Year & Status */}
                    <div className="md:col-span-3 flex items-baseline gap-3">
                      <span className="font-display text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
                        {milestone.year}
                      </span>
                      <span
                        className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border ${
                          milestone.status === "Active" || milestone.status === "Current"
                            ? "border-accent/60 text-accent bg-accent/5"
                            : "border-border text-muted"
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>

                    {/* Milestone Title & Description */}
                    <div className="md:col-span-9 space-y-1">
                      <h3 className="font-display text-lg md:text-xl font-bold text-primary">
                        {milestone.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-secondary font-light">
                        {milestone.subtitle} — {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
