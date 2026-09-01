"use client";

import { useEffect, useState } from "react";

interface ScrollProgressProps {
  progress: number; // 0 to 1
  currentStageIndex: number;
  totalStages: number;
}

const STAGE_NAMES = [
  "HERO",
  "IDENTITY",
  "EXPERTISE",
  "JOURNEY",
  "SERVICES",
  "SELECTED WORK",
  "AI × WEB",
  "CONTACT",
];

export default function ScrollProgress({
  progress,
  currentStageIndex,
}: ScrollProgressProps) {
  const [clampedProgress, setClampedProgress] = useState(0);

  useEffect(() => {
    setClampedProgress(Math.min(1, Math.max(0, progress)));
  }, [progress]);

  const activeStageName = STAGE_NAMES[currentStageIndex] || "HERO";

  return (
    <aside
      aria-label="Cinematic timeline navigation indicator"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none"
    >
      {/* Current Stage Label */}
      <div className="flex items-center gap-2 font-display text-[10px] tracking-[0.25em] text-secondary uppercase transition-all duration-300">
        <span className="text-accent font-bold">
          0{currentStageIndex + 1}
        </span>
        <span className="text-muted">/</span>
        <span className="text-primary font-medium">{activeStageName}</span>
      </div>

      {/* Progress Track */}
      <div className="relative w-[2px] h-32 bg-[#242424] rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-accent rounded-full transition-all duration-150 ease-out"
          style={{ height: `${clampedProgress * 100}%` }}
        />
      </div>

      {/* Numerical percentage */}
      <span className="font-display text-[9px] tracking-widest text-muted">
        {Math.round(clampedProgress * 100)}%
      </span>
    </aside>
  );
}
