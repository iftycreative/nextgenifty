"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND_INFO } from "@/data/projects";

interface NavbarProps {
  onNavigateToStage?: (stageIndex: number) => void;
}

export default function Navbar({ onNavigateToStage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "WORK", stageIndex: 5, targetId: "work" },
    { label: "ABOUT", stageIndex: 1, targetId: "about" },
    { label: "EXPERTISE", stageIndex: 2, targetId: "expertise" },
    { label: "SERVICES", stageIndex: 4, targetId: "services" },
    { label: "CONTACT", stageIndex: 7, targetId: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    if (onNavigateToStage) {
      onNavigateToStage(item.stageIndex);
    } else {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/75 backdrop-blur-md border-b border-[#242424]/60 py-4 md:py-5"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToStage) onNavigateToStage(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 text-primary font-display font-bold text-sm md:text-base tracking-[0.2em] uppercase focus:outline-none"
          >
            <span className="w-2 h-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
            <span className="hover-draw-line">{BRAND_INFO.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-xs tracking-[0.2em] uppercase text-secondary hover:text-primary transition-colors duration-200 hover-draw-line font-display"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-xs font-display tracking-[0.2em] text-primary uppercase p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="text-secondary">{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item)}
              className="flex items-center justify-between text-2xl font-display font-bold text-primary tracking-wider uppercase border-b border-border/50 pb-4"
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-muted">0{idx + 1}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 pt-8 border-t border-border">
          <span className="text-xs tracking-widest text-muted uppercase font-display">
            Direct Inquiries
          </span>
          <a
            href={`mailto:${BRAND_INFO.email}`}
            className="text-sm font-display text-primary flex items-center gap-2 text-accent"
          >
            {BRAND_INFO.email}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
