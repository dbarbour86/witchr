"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrimoireStar, FourPointStar } from "./OrnateFrames";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and manage escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          hamburgerButtonRef.current?.focus();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // If inside the Sanctum workstation shell, do not render public header
  if (pathname?.startsWith("/sanctum")) {
    return null;
  }

  const navLinks = [
    { name: "Spell Finder", href: "/spell-finder" },
    { name: "Rituals", href: "/rituals" },
    { name: "Tarot", href: "/tarot" },
    { name: "Sigils", href: "/sigils" },
    { name: "Grimoire", href: "/grimoire" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07070b]/95 backdrop-blur-md border-b border-border-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Ceremonial Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-bone hover:text-lavender-light transition-colors group py-2"
          aria-label="Witchr Homepage"
        >
          {/* Ornate Moon & Star Emblem */}
          <div className="w-8 h-8 rounded-lg bg-surface border border-border-highlight flex items-center justify-center text-lavender group-hover:border-lavender/60 group-hover:shadow-glow-subtle transition-all">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="w-4 h-4 text-lavender-moon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38-4.22-.92-7.37-4.68-7.37-9.19 0-4.08 2.61-7.55 6.27-8.83C14.73 2.22 13.4 2 12 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-ceremonial text-bone group-hover:text-lavender-light transition-colors">
                WITCHR
              </span>
              <FourPointStar className="w-2.5 h-2.5 text-lavender-moon opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[9px] font-mono tracking-wideDisplay uppercase text-bone-dim group-hover:text-lavender-dim transition-colors -mt-1 hidden sm:block">
              Occult Practicality
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors py-2 relative text-xs uppercase tracking-wideDisplay font-mono ${
                  isActive
                    ? "text-lavender-light font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-lavender-dim after:via-lavender-light after:to-lavender-dim after:shadow-glow-purple"
                    : "text-bone-muted hover:text-bone"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/spell-finder"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-ceremonial font-mono font-semibold rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender hover:shadow-glow-purple transition-all duration-200 active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-lavender-moon" />
            <span>Find a ritual</span>
          </Link>
        </div>

        {/* Mobile Hamburger / Close Button */}
        <button
          ref={hamburgerButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-bone-muted hover:text-lavender-light hover:bg-surface border border-transparent hover:border-border-highlight transition-colors min-w-[44px] min-h-[44px]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-lavender-light" /> : <Menu className="w-6 h-6 text-lavender-light" />}
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed backdrop to completely suppress underlying page */}
          <div
            className="fixed inset-0 top-16 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Opaque Mobile Menu Drawer */}
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] bg-[#07070b] border-t border-border-highlight z-50 md:hidden flex flex-col justify-between p-6 pb-8 overflow-y-auto shadow-2xl animate-in fade-in duration-200"
            aria-modal="true"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-dim">
                  The Grimoire Folio
                </span>
                <GrimoireStar className="w-3.5 h-3.5 text-lavender-dim" />
              </div>

              <nav className="flex flex-col gap-2" aria-label="Mobile Navigation List">
                {/* The Sanctum Interactive Entry */}
                <Link
                  href="/sanctum"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-serif transition-colors min-h-[48px] ${
                    pathname.startsWith("/sanctum")
                      ? "bg-surface-elevated text-lavender-light font-semibold border-l-2 border-lavender shadow-glow-subtle"
                      : "text-lavender-moon hover:text-lavender-light bg-surface/70 hover:bg-surface border border-border-highlight/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FourPointStar className="w-3.5 h-3.5 text-lavender-moon" />
                    <span>The Sanctum</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-ceremonial px-2 py-0.5 rounded bg-surface border border-border-highlight text-lavender-dim">
                    Interactive
                  </span>
                </Link>

                {/* Primary Nav Links */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-serif transition-colors min-h-[48px] ${
                        isActive
                          ? "bg-surface-elevated text-lavender-light font-semibold border-l-2 border-lavender shadow-glow-subtle"
                          : "text-bone hover:text-lavender-light bg-surface/30 hover:bg-surface border border-border-subtle/50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-bone-dim" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Single Primary Mobile CTA */}
            <div className="space-y-4 pt-6 mt-6 border-t border-border-subtle shrink-0">
              <Link
                href="/spell-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light font-mono text-xs uppercase tracking-ceremonial font-semibold border border-lavender/50 shadow-glow-purple transition-all text-center min-h-[48px] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-lavender-moon" />
                <span>Find a ritual</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-bone-dim font-serif italic">
                Witchcraft for modern problems.
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
