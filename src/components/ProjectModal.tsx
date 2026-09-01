"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Calendar, Tag, Wrench } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#040404]/90 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0f] border border-border overflow-y-auto no-scrollbar shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0c0c0f]/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent uppercase">
              {project.category} // {project.year}
            </span>
            <span className="text-muted text-xs">/</span>
            <span className="font-display text-xs text-secondary tracking-widest uppercase">
              PROJECT ARTIFACT
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors text-secondary"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
          {/* Image Showcase */}
          <div className="lg:col-span-7 bg-[#08080a] border border-border/70 overflow-hidden flex items-center justify-center min-h-[320px] md:min-h-[440px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain max-h-[550px] transition-transform duration-500"
            />
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-[11px] font-mono border border-accent/40 text-accent bg-accent/5 uppercase">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {project.title}
              </h2>
              <p className="text-secondary font-body text-sm md:text-base leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              {/* Meta items */}
              <div className="flex items-center gap-3 text-xs font-mono text-secondary">
                <Calendar size={14} className="text-accent" />
                <span>YEAR: {project.year}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
                  <Wrench size={13} className="text-accent" />
                  <span>TOOLS &amp; STACK</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-xs font-display border border-border bg-[#14141a] text-primary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <div className="pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cinematic w-full justify-center text-xs"
                  >
                    <span>VIEW LIVE CODE / WORK</span>
                    <ExternalLink size={14} className="btn-arrow" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
