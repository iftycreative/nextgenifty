"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  progress: number;
}

export default function LoadingScreen({
  isLoading,
  progress,
}: LoadingScreenProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  const displayProgress = Math.min(100, Math.max(0, Math.floor(progress)));
  const formattedProgress = displayProgress < 10 ? `0${displayProgress}` : `${displayProgress}`;

  return (
    <aside
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[1000] bg-background flex flex-col justify-between p-8 md:p-16 transition-opacity duration-700 pointer-events-none ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-between items-center text-xs tracking-widest uppercase text-muted font-display">
        <span>PORTFOLIO // 2026</span>
        <span>EXPERIENCE</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.25em] text-primary uppercase mb-4">
          NEXTGEN IFTY
        </h1>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-display text-4xl md:text-6xl font-light text-primary">
            {formattedProgress}
          </span>
          <span className="font-body text-xs tracking-widest uppercase text-secondary">
            %
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="font-display text-xs tracking-widest text-muted uppercase">
          GRAPHIC DESIGN × AI WEB
        </div>
        <div className="w-24 md:w-32 h-[1px] bg-border overflow-hidden relative">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
