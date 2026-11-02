"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SanctumStreakBadge } from "@/components/sanctum/SanctumStreakBadge";
import { SanctumDrawerStreakCard } from "@/components/sanctum/SanctumDrawerStreakCard";
import { useSanctumAuth } from "@/lib/supabase/auth-context";
import {
  Sparkles,
  BookOpen,
  Compass,
  Wand2,
  LogOut,
  Menu,
  X,
  Home,
  ExternalLink,
  ChevronRight,
  Flame,
} from "lucide-react";

interface SanctumShellProps {
  children: React.ReactNode;
}

export function SanctumShell({ children }: SanctumShellProps) {
  const pathname = usePathname();
  const { user, signOut } = useSanctumAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDrawerRef = useRef<HTMLDivElement>(null);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle keyboard navigation: Escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Trap focus or return focus when menu closes
  useEffect(() => {
    if (menuOpen) {
      const firstLink = menuDrawerRef.current?.querySelector("a, button") as HTMLElement;
      firstLink?.focus();
    }
  }, [menuOpen]);

  // Menu destinations per specification:
  // Sanctum Home, Ask the Oracle, Tarot (Daily + 3-Card), Create a Ritual, My Grimoire, Public Witchr Site
  const menuItems = [
    {
      name: "Sanctum Home",
      sub: "Chamber Entrance & Workstation Hub",
      href: "/sanctum/chamber",
      icon: Home,
      exact: true,
    },
    {
      name: "Ask the Oracle",
      sub: "Conversational Occult Inquest",
      href: "/sanctum/oracle",
      icon: Sparkles,
      exact: false,
    },
    {
      name: "Tarot",
      sub: "Daily Draw & Diagnostic Spreads",
      href: "/sanctum/tarot",
      icon: Compass,
      exact: false,
      extraLinks: [
        { label: "Daily Tarot Card", href: "/sanctum/tarot" },
        { label: "Three-Card Reading", href: "/sanctum/tarot/three-card" },
      ],
    },
    {
      name: "Create a Ritual",
      sub: "Turn Intention & Ingredients into Action",
      href: "/sanctum/working",
      icon: Wand2,
      exact: false,
    },
    {
      name: "My Grimoire",
      sub: "Saved Rituals, Readings & Archive",
      href: "/sanctum/grimoire",
      icon: BookOpen,
      exact: false,
    },
  ];

  const isItemActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#06020c] text-bone flex flex-col sanctum-grain selection:bg-purple-900 selection:text-lavender-light relative overflow-x-hidden">
      {/* Ambient Electric Violet & Warm Candlelight Aura */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 print:hidden" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10 print:hidden" />

      {/* =========================================================================
          SHARED SANCTUM HEADER (Identical across all private pages)
          1. Witchr Sanctum Logo linking Sanctum Home (/sanctum/chamber)
          2. Compact streak indicator (shortened to "1 day" on mobile with flame icon)
          3. Single clearly-labelled Menu button
          Scales smoothly across 360px, 375px, 390px, and desktop without overflow
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#080312]/95 backdrop-blur-md border-b border-purple-900/40 print:hidden">
        <div className="max-w-[1600px] w-full mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Left: Logo linking Sanctum Home */}
          <Link
            href="/sanctum/chamber"
            className="flex items-center gap-1.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-0.5 sm:p-1 transition-transform min-w-0 shrink"
            aria-label="Witchr Sanctum Home"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Image
                src="/images/icon.png"
                alt="Witchr Sanctum"
                width={40}
                height={40}
                priority
                className="w-7 h-7 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-xl md:text-2xl font-bold tracking-[0.08em] sm:tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.35)] truncate">
                Witchr Sanctum
              </span>
            </div>
          </Link>

          {/* Right: Member Streak or Guest Log In + Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {user ? (
              <SanctumStreakBadge />
            ) : (
              <Link
                href={`/sanctum/login?redirect=${encodeURIComponent(pathname)}`}
                className="inline-flex items-center justify-center px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#130726] hover:bg-[#1f0c3d] border border-purple-700/60 hover:border-purple-400 text-purple-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold cursor-pointer shrink-0"
              >
                Log In
              </Link>
            )}

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#130726] hover:bg-[#1f0c3d] border border-purple-700/60 hover:border-purple-400 text-purple-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer shrink-0"
              aria-label={menuOpen ? "Close Sanctum Menu" : "Open Sanctum Menu"}
              aria-expanded={menuOpen}
              aria-controls="sanctum-navigation-drawer"
            >
              {menuOpen ? (
                <>
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ACCESSIBLE NAVIGATION MENU DRAWER (Modal Overlay)
          ========================================================================= */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sanctum Main Navigation"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <div
            ref={menuDrawerRef}
            id="sanctum-navigation-drawer"
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#090314] border-l border-purple-800/60 p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(147,51,234,0.35)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-purple-900/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <Image
                      src="/images/icon.png"
                      alt="Witchr Sanctum"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                    />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-purple-200 font-semibold">
                    Sanctum Navigation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-[#140728] border border-purple-800 text-purple-300 hover:text-white hover:border-purple-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Streak Section inside Navigation Drawer matching approved mockup */}
              <div className="mt-3.5">
                <SanctumDrawerStreakCard />
              </div>

              {/* Navigation Links */}
              <nav className="mt-4 space-y-2" aria-label="Sanctum Primary Links">
                {menuItems.map((item) => {
                  const active = isItemActive(item);
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="space-y-1">
                      <Link
                        href={item.href}
                        prefetch={false}
                        onClick={() => setMenuOpen(false)}
                        className={`group w-full p-3 rounded-xl flex items-center justify-between border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                          active
                            ? "bg-gradient-to-r from-purple-900/70 to-[#280c54] border-purple-400/80 text-white shadow-[0_0_16px_rgba(168,85,247,0.3)]"
                            : "bg-[#0f051e] border-purple-900/60 text-purple-200 hover:text-white hover:bg-purple-950/60 hover:border-purple-600"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                              active
                                ? "bg-purple-950 border-purple-400 text-purple-200"
                                : "bg-[#180a30] border-purple-800 text-purple-300 group-hover:text-purple-100"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-serif text-sm font-semibold tracking-wide">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-purple-300/70 truncate">
                              {item.sub}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${active ? "text-purple-300" : "text-purple-500"}`} />
                      </Link>

                      {/* Tarot sub-links */}
                      {item.extraLinks && (
                        <div className="pl-11 pr-2 pt-1 pb-1.5 space-y-1">
                          {item.extraLinks.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                prefetch={false}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-2.5 py-1 rounded text-xs font-mono tracking-wider uppercase transition-colors ${
                                  isSubActive
                                    ? "text-lavender-light font-bold bg-purple-950/50"
                                    : "text-purple-300/80 hover:text-white hover:bg-purple-950/30"
                                }`}
                              >
                                · {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer: Auth Actions + Exit to Public Site */}
            <div className="pt-4 border-t border-purple-900/50 space-y-3">
              {user ? (
                <div className="space-y-2">
                  <div className="px-2 py-1 rounded bg-[#130728] border border-purple-900/60 text-[10px] font-mono text-purple-300/80 truncate">
                    ✦ {user.email || "Member"}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#130726] hover:bg-purple-950/60 border border-purple-900/60 hover:border-purple-600 text-purple-300 hover:text-purple-100 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/sanctum/login?redirect=${encodeURIComponent(pathname)}`}
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-xl bg-[#130726] hover:bg-[#1f0c3d] border border-purple-700/60 hover:border-purple-400 text-purple-200 hover:text-white text-center text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
                  >
                    Log In
                  </Link>
                  <Link
                    href={`/sanctum/signup?redirect=${encodeURIComponent(pathname)}`}
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/60 hover:border-purple-300 text-white text-center text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="w-full p-2.5 rounded-xl bg-[#0e041c] hover:bg-[#16062c] border border-purple-900/60 hover:border-purple-600 flex items-center justify-between text-purple-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4 text-purple-400" />
                  <span className="font-serif text-xs font-medium">Public Witchr Site</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-purple-400/60 pt-1">
                <Link
                  href="/privacy"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-purple-200 transition-colors"
                >
                  Privacy
                </Link>
                <span>·</span>
                <Link
                  href="/terms"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-purple-200 transition-colors"
                >
                  Terms
                </Link>
                <span>·</span>
                <Link
                  href="/disclaimer"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-purple-200 transition-colors"
                >
                  Disclaimers
                </Link>
              </div>
              <p className="text-[9.5px] font-mono text-purple-400/60 text-center tracking-wider uppercase">
                A quieter place for louder questions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Stage */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-3 sm:p-5 lg:p-6 relative">
        {children}
      </main>
    </div>
  );
}
