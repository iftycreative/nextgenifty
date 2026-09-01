"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "hidden">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch / mobile
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest("[data-cursor='view']");
      const openBtn = target.closest("[data-cursor='open']");
      const interactive = target.closest("a, button, [role='button'], input, textarea");

      if (projectCard) {
        setCursorType("view");
        setCursorText("VIEW");
      } else if (openBtn) {
        setCursorType("view");
        setCursorText("OPEN");
      } else if (interactive) {
        setCursorType("pointer");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Smooth lerp animation loop
    let animId: number;
    const render = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      {cursorType === "default" && (
        <div className="w-2.5 h-2.5 rounded-full bg-primary transition-all duration-200" />
      )}

      {cursorType === "pointer" && (
        <div className="w-6 h-6 rounded-full border border-accent bg-accent/20 backdrop-blur-xs transition-all duration-200 -translate-x-1.5 -translate-y-1.5" />
      )}

      {cursorType === "view" && (
        <div className="px-3 py-1.5 rounded-full bg-accent text-white font-display text-[10px] font-bold tracking-widest uppercase flex items-center justify-center shadow-lg -translate-x-1/2 -translate-y-1/2 scale-100 transition-all duration-200">
          {cursorText}
        </div>
      )}
    </div>
  );
}
