import React from "react";
import Link from "next/link";
import { MoonPhaseRibbon, CelestialDivider, FourPointStar } from "./OrnateFrames";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/90 border-t border-border mt-24 text-bone-muted relative overflow-hidden">
      {/* Subtle purple aura glow at top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18 space-y-12">
        {/* Top Moon Phase Ribbon */}
        <MoonPhaseRibbon />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pt-4">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-bone hover:text-lavender-light transition-colors group"
              aria-label="Witchr Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-background border border-border-highlight flex items-center justify-center text-lavender group-hover:border-lavender/60 transition-colors shadow-subtle">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-lavender-moon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38-4.22-.92-7.37-4.68-7.37-9.19 0-4.08 2.61-7.55 6.27-8.83C14.73 2.22 13.4 2 12 2z" />
                </svg>
              </div>
              <span className="font-display text-2xl md:text-3xl font-bold tracking-ceremonial text-bone">
                WITCHR
              </span>
            </Link>
            <p className="text-sm md:text-base text-bone-muted max-w-md leading-relaxed">
              Witchcraft for modern problems. An occult self-guidance platform offering practical rituals, diagnostic tarot spreads, and visual sigils for human friction.
            </p>
            <div className="pt-2">
              <p className="text-sm font-serif italic text-lavender-light flex items-center gap-2">
                <FourPointStar className="w-2.5 h-2.5 text-lavender-moon" />
                <span>“Take what helps. Leave what doesn’t.”</span>
              </p>
            </div>
          </div>

          {/* Problem Hubs */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light font-semibold flex items-center gap-1.5">
              <span>Problem Hubs</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/money" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Money & Clarity</span>
                </Link>
              </li>
              <li>
                <Link href="/protection" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Protection & Boundaries</span>
                </Link>
              </li>
              <li>
                <Link href="/confidence" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Confidence & Stature</span>
                </Link>
              </li>
              <li>
                <Link href="/love" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Love & Sovereignty</span>
                </Link>
              </li>
              <li>
                <Link href="/letting-go" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Letting Go & Severance</span>
                </Link>
              </li>
              <li>
                <Link href="/direction" className="hover:text-lavender-light transition-colors flex items-center gap-2">
                  <span className="text-[10px] text-lavender-dim">☽</span>
                  <span>Direction & Movement</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light font-semibold">
              Occult Library
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/spell-finder" className="hover:text-lavender-light transition-colors">
                  Spell Finder Tool
                </Link>
              </li>
              <li>
                <Link href="/rituals" className="hover:text-lavender-light transition-colors">
                  Ritual Library
                </Link>
              </li>
              <li>
                <Link href="/tarot" className="hover:text-lavender-light transition-colors">
                  Tarot Spreads
                </Link>
              </li>
              <li>
                <Link href="/sigils" className="hover:text-lavender-light transition-colors">
                  Sigil Gallery
                </Link>
              </li>
              <li>
                <Link href="/grimoire" className="hover:text-lavender-light transition-colors">
                  Beginner Grimoire
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-lavender-light transition-colors">
                  Manifesto & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-bone-dim hover:text-lavender-light transition-colors">
                  Safety & Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <CelestialDivider className="my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bone-dim font-mono">
          <p>© {currentYear} Witchr.com · All rights reserved.</p>
          <p className="text-center sm:text-right">
            For reflective and educational purposes · Not psychological or medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
