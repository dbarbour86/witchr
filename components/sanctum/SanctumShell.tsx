"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SanctumCrest,
  MoonPhaseStrip,
  SanctumMountainEngraving,
} from "@/components/sanctum/SanctumSymbols";
import { SanctumStreakBadge } from "@/components/sanctum/SanctumStreakBadge";
import { SanctumPrivateTestBanner } from "@/components/sanctum/SanctumPrivateTestBanner";
import {
  Sparkles,
  BookOpen,
  Compass,
  Wand2,
  Shield,
  Layers,
  LogOut,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface SanctumShellProps {
  children: React.ReactNode;
}

export function SanctumShell({ children }: SanctumShellProps) {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Navigation Items matching the reference workstation
  const navItems = [
    {
      name: "SANCTUM",
      sub: "Hub",
      href: "/sanctum",
      icon: Layers,
      exact: true,
    },
    {
      name: "ORACLE",
      sub: "Workings",
      href: "/sanctum/working",
      icon: Wand2,
      exact: false,
    },
    {
      name: "TAROT",
      sub: "Divination",
      href: "/sanctum/tarot",
      icon: Compass,
      exact: false,
    },
    {
      name: "GRIMOIRE",
      sub: "Archive",
      href: "/sanctum/grimoire",
      icon: BookOpen,
      exact: false,
    },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#06020c] text-bone flex flex-col sanctum-grain selection:bg-purple-900 selection:text-lavender-light relative overflow-x-hidden">
      {/* Subtle Electric Purple Ambient Aurora Glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Prominent WITCHR SANCTUM Workstation Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#080312]/95 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-[1700px] mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left Brand Unit: Crest + Witchr Sanctum Display Title */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/sanctum"
              className="flex items-center gap-2.5 sm:gap-3.5 group"
              aria-label="Witchr Sanctum Chamber"
            >
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <SanctumCrest className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.35)]">
                    Witchr Sanctum
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-[0.24em] text-lavender-moon/80 uppercase -mt-0.5">
                  RITUALS + ORACLE + GRIMOIRE + FOR THE MODERN WITCH
                </span>
              </div>
            </Link>
          </div>

          {/* Center Unit: Moon Phases & Tagline */}
          <div className="hidden xl:flex flex-col items-center justify-center gap-1">
            <MoonPhaseStrip />
            <span className="text-[9px] font-mono tracking-[0.28em] text-purple-300/70 uppercase">
              SAME MAGIC DIFFERENT FORM
            </span>
          </div>

          {/* Right Controls & Utilities */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick Utility Links (desktop) */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-bone-muted mr-1">
              <Link
                href="/sanctum/grimoire"
                className={`hover:text-lavender-light transition-colors py-1 ${
                  pathname.startsWith("/sanctum/grimoire") ? "text-lavender-light font-semibold border-b border-purple-400" : ""
                }`}
              >
                My Grimoire
              </Link>
              <Link
                href="/sanctum/working"
                className={`hover:text-lavender-light transition-colors py-1 ${
                  pathname.startsWith("/sanctum/working") ? "text-lavender-light font-semibold border-b border-purple-400" : ""
                }`}
              >
                Spellcraft
              </Link>
              <Link
                href="/sanctum/tarot"
                className={`hover:text-lavender-light transition-colors py-1 ${
                  pathname.startsWith("/sanctum/tarot") ? "text-lavender-light font-semibold border-b border-purple-400" : ""
                }`}
              >
                Tarot Tools
              </Link>
              <Link
                href="/"
                className="hover:text-lavender-light transition-colors py-1 flex items-center gap-1 text-purple-300/80"
                title="Exit to public Witchr grimoire"
              >
                <span>Public Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Streak & Quota Badges */}
            <div className="flex items-center gap-2">
              <SanctumStreakBadge />
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#140a26] border border-purple-700/50 shadow-[0_0_12px_rgba(168,85,247,0.2)] text-[10px] font-mono tracking-wider text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase">1/3 Free Workings</span>
              </div>
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#120722] border border-purple-900/60 text-lavender-light hover:border-purple-500 transition-colors"
              aria-label={mobileDrawerOpen ? "Close menu" : "Open Sanctum menu"}
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workstation Body: Desktop Sidebar + Content Stage */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto relative">
        {/* Desktop Left Workstation Navigation Dock */}
        <aside className="hidden lg:flex flex-col justify-between w-24 shrink-0 bg-[#07030e]/80 border-r border-purple-900/35 py-6 px-2 sticky top-20 h-[calc(100vh-5rem)] z-30">
          {/* Vertical Navigation Bar */}
          <nav className="flex flex-col items-center gap-3 w-full" aria-label="Sanctum Primary Navigation">
            {navItems.map((item) => {
              const active = isItemActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full py-3 px-1 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 group text-center relative ${
                    active
                      ? "bg-gradient-to-b from-purple-900/70 to-[#2e1065]/90 border border-purple-400/60 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                      : "text-bone-muted hover:text-white hover:bg-purple-950/30 border border-transparent hover:border-purple-900/40"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      active ? "text-purple-300" : "text-lavender-dim group-hover:text-lavender-light"
                    }`}
                  />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold leading-none">
                    {item.name}
                  </span>
                  <span className="text-[8px] font-mono tracking-wider text-purple-300/60 uppercase leading-none">
                    {item.sub}
                  </span>
                  {active && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                  )}
                </Link>
              );
            })}

            {/* Quick Link to Return to Public Site */}
            <div className="w-full pt-4 mt-2 border-t border-purple-900/40">
              <Link
                href="/"
                className="w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-bone-dim hover:text-purple-200 hover:bg-purple-950/20 transition-colors text-center"
                title="Return to Public Witchr"
              >
                <LogOut className="w-4 h-4 text-purple-400/70" />
                <span className="text-[9px] font-mono tracking-wider uppercase">Public</span>
              </Link>
            </div>
          </nav>

          {/* Bottom Occult Mountain Engraving & Motto */}
          <SanctumMountainEngraving />
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 top-16 z-50 lg:hidden bg-[#07020d]/95 backdrop-blur-xl border-t border-purple-900/50 p-6 flex flex-col justify-between animate-in fade-in duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300">
                  Sanctum Navigation
                </span>
                <MoonPhaseStrip className="scale-90" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => {
                  const active = isItemActive(item);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all ${
                        active
                          ? "bg-purple-900/60 border border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : "bg-[#110722] border border-purple-900/50 text-bone hover:border-purple-600"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-purple-300" />
                      <span className="text-xs font-mono font-bold tracking-widest uppercase">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-purple-300/70">{item.sub}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-purple-900/40 flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0e071c] border border-purple-900/50 text-xs font-mono uppercase tracking-wider text-purple-200 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-purple-400" />
                    <span>Return to Public Witchr</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-900/40 text-center">
              <p className="text-[10px] font-mono tracking-widest text-purple-300/80 uppercase">
                A quieter internet for a louder magic.
              </p>
            </div>
          </div>
        )}

        {/* Workstation Center Canvas */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-6 lg:p-8 flex flex-col">
          {children}
        </main>
      </div>

      {/* Bottom Mobile Sticky Dock (visible only on small screens for easy thumbing) */}
      <nav
        className="lg:hidden sticky bottom-0 z-40 w-full bg-[#080312]/95 backdrop-blur-md border-t border-purple-900/50 px-2 py-2 flex items-center justify-around"
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                active ? "text-purple-300 bg-purple-950/60" : "text-bone-muted hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-mono tracking-wider uppercase mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
