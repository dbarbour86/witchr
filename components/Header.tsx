"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrimoireStar, FourPointStar } from "./OrnateFrames";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  Leaf,
  Flame,
  Compass,
  BookOpen,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [libraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLibraryDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for desktop Library dropdown
  useEffect(() => {
    if (!libraryDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLibraryDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLibraryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [libraryDropdownOpen]);

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

  // If inside the private Sanctum workstation shell subroutes, do not render public header
  if (pathname?.startsWith("/sanctum/")) {
    return null;
  }

  const libraryItems = [
    {
      name: "Ingredients",
      href: "/ingredients",
      desc: "Pantry salts, honey, water & minerals",
      icon: <Layers className="w-4 h-4 text-purple-300" />,
    },
    {
      name: "Herbs",
      href: "/herbs",
      desc: "Classical botanicals & kitchen craft",
      icon: <Leaf className="w-4 h-4 text-emerald-300" />,
    },
    {
      name: "Candles",
      href: "/candles",
      desc: "Color meanings & flame focus",
      icon: <Flame className="w-4 h-4 text-amber-300" />,
    },
    {
      name: "Correspondences",
      href: "/correspondences",
      desc: "Master intention alignment codex",
      icon: <Compass className="w-4 h-4 text-purple-300" />,
    },
    {
      name: "Beginner Grimoire",
      href: "/grimoire",
      desc: "Practical occult foundations & timing",
      icon: <BookOpen className="w-4 h-4 text-lavender-light" />,
    },
    {
      name: "All Guides & Archives",
      href: "/library",
      desc: "The complete master reference index",
      icon: <Sparkles className="w-4 h-4 text-lavender-moon" />,
      highlight: true,
    },
  ];

  const primaryNavLinks = [
    { name: "Rituals", href: "/rituals" },
    { name: "Tarot", href: "/tarot" },
    { name: "Sigils", href: "/sigils" },
    { name: "Sanctum", href: "/sanctum/chamber" },
    { name: "About", href: "/about" },
  ];

  const isLibraryActive =
    pathname === "/library" ||
    pathname.startsWith("/ingredients") ||
    pathname.startsWith("/herbs") ||
    pathname.startsWith("/candles") ||
    pathname.startsWith("/crystals") ||
    pathname.startsWith("/correspondences") ||
    pathname === "/grimoire";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07070b]/95 backdrop-blur-md border-b border-border-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Ceremonial Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-bone hover:text-lavender-light transition-colors group py-2"
          aria-label="Witchr Homepage"
        >
          {/* Ceremonial Brand Flame Emblem */}
          <div className="w-8 h-8 rounded-lg bg-surface border border-border-highlight flex items-center justify-center text-lavender group-hover:border-lavender/60 group-hover:shadow-glow-subtle transition-all">
            <Flame className="w-4 h-4 text-lavender-moon group-hover:text-lavender-light transition-colors" />
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
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium tracking-wide" aria-label="Main Navigation">
          {/* Library Dropdown Item */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setLibraryDropdownOpen(true)}
            onMouseLeave={() => setLibraryDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLibraryDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={libraryDropdownOpen}
              className={`inline-flex items-center gap-1 py-2 text-xs uppercase tracking-wideDisplay font-mono transition-colors relative cursor-pointer ${
                isLibraryActive
                  ? "text-lavender-light font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-lavender-dim after:via-lavender-light after:to-lavender-dim after:shadow-glow-purple"
                  : "text-bone-muted hover:text-bone"
              }`}
            >
              <span>Library</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  libraryDropdownOpen ? "rotate-180 text-lavender-light" : "text-bone-dim"
                }`}
              />
            </button>

            {/* Desktop Dropdown Flyout Panel */}
            {libraryDropdownOpen && (
              <div
                role="menu"
                aria-label="Library Reference Menu"
                className="absolute top-full -left-4 w-72 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="p-2.5 rounded-xl bg-[#100c19] border border-purple-800/70 shadow-[0_16px_50px_rgba(10,5,25,0.95)] space-y-1">
                  <div className="px-3 py-1.5 border-b border-purple-900/40 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-lavender-dim font-semibold">
                      Reference Archives
                    </span>
                    <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
                  </div>

                  {libraryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setLibraryDropdownOpen(false)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-colors group ${
                        item.highlight
                          ? "bg-purple-950/60 hover:bg-purple-900/80 border border-purple-700/50 mt-1"
                          : "hover:bg-purple-950/40 text-bone hover:text-white"
                      }`}
                    >
                      <div className="p-1 rounded bg-[#181226] border border-purple-800/60 mt-0.5 shrink-0 group-hover:border-purple-500 transition-colors">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-serif font-semibold text-bone group-hover:text-lavender-light flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.highlight && (
                            <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                        <p className="text-[11px] font-sans text-bone-dim leading-tight truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Nav Links */}
          {primaryNavLinks.map((link) => {
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
            <div className="space-y-5 pt-1">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-dim">
                  Navigation &amp; Library
                </span>
                <GrimoireStar className="w-3.5 h-3.5 text-lavender-dim" />
              </div>

              {/* The Sanctum Interactive Entry */}
              <Link
                href="/sanctum/chamber"
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
                <ArrowRight className="w-4 h-4 text-purple-300" />
              </Link>

              {/* Dedicated Library Section */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lavender-dim font-semibold">
                    Occult Library Archives
                  </span>
                  <Link
                    href="/library"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] font-mono uppercase tracking-wider text-purple-300 hover:text-lavender-light"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {libraryItems.slice(0, 5).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-colors min-h-[64px] ${
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "bg-surface-elevated border-lavender/60 text-lavender-light"
                          : "bg-surface/50 border-purple-900/50 hover:bg-surface text-bone hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {item.icon}
                        <span className="font-serif text-sm font-semibold truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-bone-dim truncate mt-1">
                        {item.name === "Ingredients"
                          ? "Salts & Minerals"
                          : item.name === "Herbs"
                          ? "Botanicals"
                          : item.name === "Candles"
                          ? "Flame Lore"
                          : item.name === "Correspondences"
                          ? "Intents"
                          : "Foundations"}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/library"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl border border-purple-700/60 bg-purple-950/40 hover:bg-purple-900/60 flex flex-col justify-between text-left transition-colors min-h-[64px]"
                  >
                    <div className="flex items-center gap-1.5 text-lavender-light">
                      <Sparkles className="w-4 h-4 text-lavender-moon" />
                      <span className="font-serif text-sm font-semibold">
                        All Guides
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 truncate mt-1">
                      Full Index →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Primary Practices Links */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lavender-dim font-semibold px-1 block">
                  Practices &amp; Tools
                </span>
                <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation List">
                  {primaryNavLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-serif transition-colors min-h-[44px] ${
                          isActive
                            ? "bg-surface-elevated text-lavender-light font-semibold border-l-2 border-lavender shadow-glow-subtle"
                            : "text-bone hover:text-lavender-light bg-surface/30 hover:bg-surface border border-border-subtle/50"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-bone-dim" />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Single Primary Mobile CTA */}
            <div className="space-y-3 pt-4 mt-4 border-t border-border-subtle shrink-0">
              <Link
                href="/spell-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light font-mono text-xs uppercase tracking-ceremonial font-semibold border border-lavender/50 shadow-glow-purple transition-all text-center min-h-[48px] active:scale-[0.98]"
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
