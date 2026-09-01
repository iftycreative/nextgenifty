"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";

export interface VideoBackgroundHandle {
  seekToProgress: (progress: number) => void;
  getDuration: () => number;
  isReady: boolean;
}

interface VideoBackgroundProps {
  onLoadedMetadata?: (duration: number) => void;
  onCanPlay?: () => void;
  progress?: number;
  overlayOpacity?: number; // 0 to 1 for dynamic dimming
}

const VideoBackground = forwardRef<VideoBackgroundHandle, VideoBackgroundProps>(
  ({ onLoadedMetadata, onCanPlay, overlayOpacity = 0.45 }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [videoDuration, setVideoDuration] = useState(15.07);
    const targetTimeRef = useRef(0);
    const isSeekingRef = useRef(false);
    const animFrameRef = useRef<number | null>(null);

    // Provide imperative handle for ultra-fast direct GSAP scrub calls
    useImperativeHandle(ref, () => ({
      seekToProgress: (progress: number) => {
        const dur = videoRef.current?.duration || videoDuration || 15.07;
        const clamped = Math.min(1, Math.max(0, progress));
        targetTimeRef.current = clamped * dur;
      },
      getDuration: () => videoRef.current?.duration || videoDuration,
      isReady,
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        const dur = video.duration || 15.07;
        setVideoDuration(dur);
        setIsReady(true);
        if (onLoadedMetadata) onLoadedMetadata(dur);
      };

      const handleCanPlay = () => {
        setIsReady(true);
        if (onCanPlay) onCanPlay();
      };

      const handleSeeked = () => {
        isSeekingRef.current = false;
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("canplaythrough", handleCanPlay);
      video.addEventListener("seeked", handleSeeked);

      // Force video preload & mute
      video.muted = true;
      video.playsInline = true;
      video.load();

      // rAF smooth scrubber loop
      const updateVideoTime = () => {
        if (video && video.readyState >= 2 && !isSeekingRef.current) {
          const current = video.currentTime;
          const target = targetTimeRef.current;
          const diff = Math.abs(current - target);

          if (diff > 0.02) {
            // Safe seeking without thrashing
            video.currentTime = target;
            isSeekingRef.current = true;
          }
        }
        animFrameRef.current = requestAnimationFrame(updateVideoTime);
      };

      animFrameRef.current = requestAnimationFrame(updateVideoTime);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("canplaythrough", handleCanPlay);
        video.removeEventListener("seeked", handleSeeked);
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }, [onCanPlay, onLoadedMetadata, videoDuration]);

    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
        {/* HTML5 Video Layer */}
        <video
          ref={videoRef}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/video/hero.mp4`}
          muted
          playsInline
          preload="auto"
          autoPlay={false}
          className="w-full h-full object-cover object-center md:object-[center_35%] transition-transform duration-700 will-change-transform"
          aria-hidden="true"
        />

        {/* Master Ambient Dark Vignette & Dynamic Dimmer Overlay */}
        <div
          className="absolute inset-0 bg-background transition-opacity duration-300 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* Cinematic Edge Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/50 pointer-events-none" />
      </div>
    );
  }
);

VideoBackground.displayName = "VideoBackground";

export default VideoBackground;
