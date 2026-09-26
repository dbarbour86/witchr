"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MoonPhaseRibbon, CelestialDivider, FourPointStar } from "./OrnateFrames";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // If inside the Sanctum workstation shell, do not render marketing footer
  if (pathname?.startsWith("/sanctum")) {
    return null;
  }

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
              className="inline-flex items-center gap-2.5 text-bone hover:opacity-90 transition-opacity group"
              aria-label="Witchr Homepage"
            >
              <div className="relative h-16 md:h-20 flex items-center">
                <Image
                  src="/images/witchr-logo.webp"
                  alt="Witchr"
                  width={470}
                  height={339}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
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
                <Link href="/sanctum" className="text-lavender-moon hover:text-lavender-light transition-colors flex items-center gap-1.5 font-medium">
                  <span>The Sanctum</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface border border-border-highlight text-lavender-dim font-mono uppercase">Interactive</span>
                </Link>
              </li>
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
                <Link href="/herbs" className="hover:text-lavender-light transition-colors">
                  Herb Directory
                </Link>
              </li>
              <li>
                <Link href="/correspondences" className="hover:text-lavender-light transition-colors">
                  Correspondences Codex
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
