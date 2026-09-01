"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoBackground, { VideoBackgroundHandle } from "./VideoBackground";
import HeroSection from "./sections/HeroSection";
import IntroSection from "./sections/IntroSection";
import ExpertiseSection from "./sections/ExpertiseSection";
import JourneySection from "./sections/JourneySection";
import ServicesSection from "./sections/ServicesSection";
import SelectedWorkSection from "./sections/SelectedWorkSection";
import AIWebSection from "./sections/AIWebSection";
import FinalCTASection from "./sections/FinalCTASection";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen from "./LoadingScreen";
import Footer from "./Footer";

// Timeline stage boundaries based on 15.07s total video length
export const TIMELINE_BREAKPOINTS = [
  { stage: 0, startSec: 0, endSec: 2.0, startPct: 0.0, endPct: 0.133, name: "HERO" },
  { stage: 1, startSec: 2.0, endSec: 4.0, startPct: 0.133, endPct: 0.266, name: "INTRODUCTION" },
  { stage: 2, startSec: 4.0, endSec: 7.0, startPct: 0.266, endPct: 0.465, name: "EXPERTISE" },
  { stage: 3, startSec: 7.0, endSec: 9.0, startPct: 0.465, endPct: 0.598, name: "JOURNEY" },
  { stage: 4, startSec: 9.0, endSec: 11.0, startPct: 0.598, endPct: 0.730, name: "SERVICES" },
  { stage: 5, startSec: 11.0, endSec: 13.0, startPct: 0.730, endPct: 0.863, name: "SELECTED WORK" },
  { stage: 6, startSec: 13.0, endSec: 14.0, startPct: 0.863, endPct: 0.930, name: "AI × WEB" },
  { stage: 7, startSec: 14.0, endSec: 15.07, startPct: 0.930, endPct: 1.0, name: "FINAL CTA" },
];

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoHandleRef = useRef<VideoBackgroundHandle | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(15);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [expertiseSubProgress, setExpertiseSubProgress] = useState(0);
  const [journeySubProgress, setJourneySubProgress] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0.45);

  // Smooth fake-to-real load counter
  useEffect(() => {
    let current = 15;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 5;
      if (current >= 100) {
        current = 100;
        setLoadProgress(100);
        setIsLoading(false);
        clearInterval(interval);
      } else {
        setLoadProgress(current);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleVideoMetadata = useCallback((duration: number) => {
    // Video ready
    setLoadProgress(100);
    setIsLoading(false);
  }, []);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = triggerRef.current;
    const pinEl = containerRef.current;
    if (!triggerEl || !pinEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "+=650%", // Generous comfortable scroll distance
      pin: pinEl,
      scrub: 0.4, // ultra-smooth response
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1
        setScrollProgress(p);

        // Update video currentTime smoothly
        if (videoHandleRef.current) {
          videoHandleRef.current.seekToProgress(p);
        }

        // Find active stage
        let activeIdx = 0;
        for (let i = 0; i < TIMELINE_BREAKPOINTS.length; i++) {
          const bp = TIMELINE_BREAKPOINTS[i];
          if (p >= bp.startPct && p <= bp.endPct) {
            activeIdx = i;
            break;
          }
        }
        if (p > 0.99) activeIdx = 7;
        setCurrentStage(activeIdx);

        // Sub-progress for internal animations (e.g. Expertise Design->Web->AI, Journey timeline)
        const expBp = TIMELINE_BREAKPOINTS[2];
        if (p >= expBp.startPct && p <= expBp.endPct) {
          const sub = (p - expBp.startPct) / (expBp.endPct - expBp.startPct);
          setExpertiseSubProgress(sub);
        }

        const jrnBp = TIMELINE_BREAKPOINTS[3];
        if (p >= jrnBp.startPct && p <= jrnBp.endPct) {
          const sub = (p - jrnBp.startPct) / (jrnBp.endPct - jrnBp.startPct);
          setJourneySubProgress(sub);
        }

        // Darken overlay in final CTA (p > 0.90) for high-contrast completion
        if (p > 0.90) {
          const darkPct = (p - 0.90) / 0.10;
          setOverlayOpacity(0.45 + darkPct * 0.45); // up to 0.90
        } else {
          setOverlayOpacity(0.45);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Jump to specific stage on navbar click
  const handleNavigateToStage = (stageIndex: number) => {
    const bp = TIMELINE_BREAKPOINTS[stageIndex];
    if (!bp || !triggerRef.current) return;

    // Calculate target scroll position
    const st = ScrollTrigger.getById(triggerRef.current.id) || ScrollTrigger.getAll()[0];
    if (st) {
      const targetScroll = st.start + (st.end - st.start) * (bp.startPct + 0.02);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute visibility and transition properties for each stage
  const getStageStyles = (stageIndex: number) => {
    const bp = TIMELINE_BREAKPOINTS[stageIndex];
    const p = scrollProgress;

    // Boundary margins for cross-fading
    const fadeRange = 0.035;
    const isFirst = stageIndex === 0;
    const isLast = stageIndex === TIMELINE_BREAKPOINTS.length - 1;

    const start = bp.startPct;
    const end = bp.endPct;

    let opacity = 0;
    let translateY = 0;
    let scale = 1;
    let pointerEvents: "auto" | "none" = "none";

    if (p >= start && p <= end) {
      // In range
      pointerEvents = "auto";

      // Fade-in phase
      if (!isFirst && p < start + fadeRange) {
        const inFactor = (p - start) / fadeRange;
        opacity = inFactor;
        translateY = (1 - inFactor) * 20;
        scale = 0.98 + inFactor * 0.02;
      }
      // Fade-out phase
      else if (!isLast && p > end - fadeRange) {
        const outFactor = (end - p) / fadeRange;
        opacity = outFactor;
        translateY = (1 - outFactor) * -20;
        scale = 0.98 + outFactor * 0.02;
      }
      // Fully visible
      else {
        opacity = 1;
        translateY = 0;
        scale = 1;
      }
    } else {
      opacity = 0;
      pointerEvents = "none";
      if (p < start) translateY = 20;
      else translateY = -20;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      pointerEvents,
      display: opacity > 0 ? "block" : "none",
    };
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={loadProgress} />

      <Navbar onNavigateToStage={handleNavigateToStage} />

      <ScrollProgress
        progress={scrollProgress}
        currentStageIndex={currentStage}
        totalStages={TIMELINE_BREAKPOINTS.length}
      />

      {/* Main Scroll Trigger Wrapper */}
      <div ref={triggerRef} id="cinematic-scroll-trigger" className="relative w-full">
        {/* Pinned Viewport Container */}
        <div
          ref={containerRef}
          className="relative w-full h-screen h-[100dvh] overflow-hidden bg-background"
        >
          {/* Scroll-Driven Video Background */}
          <VideoBackground
            ref={videoHandleRef}
            onLoadedMetadata={handleVideoMetadata}
            overlayOpacity={overlayOpacity}
          />

          {/* Section Layers in Strict Locked Order */}
          <div className="relative z-10 w-full h-full">
            {/* 01: Hero (0:00–0:02) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(0)}
            >
              <HeroSection />
            </div>

            {/* 02: Introduction (0:02–0:04) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(1)}
            >
              <IntroSection />
            </div>

            {/* 03: Expertise (0:04–0:07) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(2)}
            >
              <ExpertiseSection subProgress={expertiseSubProgress} />
            </div>

            {/* 04: Journey (0:07–0:09) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(3)}
            >
              <JourneySection subProgress={journeySubProgress} />
            </div>

            {/* 05: Services (0:09–0:11) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(4)}
            >
              <ServicesSection />
            </div>

            {/* 06: Selected Work (0:11–0:13) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(5)}
            >
              <SelectedWorkSection />
            </div>

            {/* 07: AI × Web (0:13–0:14) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(6)}
            >
              <AIWebSection />
            </div>

            {/* 08: Final CTA (0:14–0:15.07) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-150"
              style={getStageStyles(7)}
            >
              <FinalCTASection />
            </div>
          </div>
        </div>
      </div>

      {/* Permanent Editorial Footer following the cinematic experience */}
      <Footer onScrollToTop={handleScrollToTop} />
    </>
  );
}
