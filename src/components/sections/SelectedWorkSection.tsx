"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import ProjectModal from "@/components/ProjectModal";

interface SectionProps {
  opacity?: number;
  transform?: string;
  className?: string;
}

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Logo",
  "Branding",
  "Poster",
  "Social Media",
  "Banner",
  "UI Design",
];

export default function SelectedWorkSection({
  opacity = 1,
  transform = "none",
  className = "",
}: SectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div
      id="work"
      className={`w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-12 lg:p-16 max-w-7xl mx-auto transition-all duration-300 ${className}`}
      style={{ opacity, transform }}
    >
      <div className="space-y-6 md:space-y-8 flex flex-col max-h-[88vh] md:max-h-none">
        {/* Header and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent">05 // ARCHIVE</span>
            </div>
            <h2 className="section-heading font-black text-primary uppercase mt-1">
              SELECTED WORK
            </h2>
            <p className="font-body text-xs md:text-sm text-secondary tracking-widest uppercase mt-1">
              A collection of visual and digital experiences.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[11px] font-display uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === cat
                    ? "border-accent bg-accent/10 text-white font-semibold"
                    : "border-border text-muted hover:text-primary hover:border-border/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Portfolio Grid (Scrollable inside container on smaller viewports) */}
        <div className="overflow-y-auto max-h-[58vh] md:max-h-[62vh] pr-2 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {filteredProjects.map((project, idx) => {
              // Asymmetric span calculation
              const spanClass =
                idx % 4 === 0
                  ? "md:col-span-8" // Large featured
                  : idx % 4 === 1
                  ? "md:col-span-4" // Secondary column
                  : idx % 4 === 2
                  ? "md:col-span-5" // Medium column
                  : "md:col-span-7"; // Wide complementary column

              return (
                <div
                  key={project.id}
                  data-cursor="view"
                  onClick={() => setSelectedProject(project)}
                  className={`${spanClass} group relative border border-border bg-[#0b0b0e]/80 backdrop-blur-sm p-3 md:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-accent/80 hover:bg-[#111116]`}
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between pb-3 text-xs font-mono text-muted">
                    <span className="text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  {/* Artwork Preview */}
                  <div className="relative w-full h-44 sm:h-52 md:h-64 bg-[#070709] border border-border/40 overflow-hidden flex items-center justify-center mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-accent/5 transition-colors duration-300" />
                  </div>

                  {/* Title & Micro CTA */}
                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <h3 className="font-display text-base md:text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-muted line-clamp-1 mt-0.5">
                        {project.description}
                      </p>
                    </div>

                    <div className="p-2 border border-border group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10 transition-all shrink-0">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Detail View Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
