"use client";

import React from "react";
import Link from "next/link";
import { FourPointStar, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { ArrowLeft, Compass, Wand2, BookOpen, Layers } from "lucide-react";
import { SanctumPrivateTestBanner } from "@/components/sanctum/SanctumPrivateTestBanner";

interface SanctumHeaderProps {
  currentSection?: string;
  showBackToSanctum?: boolean;
}

export function SanctumHeader({ currentSection, showBackToSanctum = false }: SanctumHeaderProps) {
  return (
    <div className="relative mb-8 pb-5 border-b border-purple-900/35">
      {/* Private Test Banner with Feedback & Debrief Access */}
      <SanctumPrivateTestBanner />

      {/* Occult Breadcrumb & Quick Switcher Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-purple-200/70">
        <div className="flex items-center gap-2.5">
          {showBackToSanctum ? (
            <Link
              href="/sanctum"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#130726] border border-purple-800/60 text-purple-300 hover:text-white hover:border-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-purple-400" />
              <span className="uppercase tracking-[0.18em] text-[10px] font-semibold">Chamber Hub</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#110722] border border-purple-900/60 text-[10px] uppercase tracking-[0.2em] text-purple-300">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#c084fc]" />
              <span>Chamber Station // Active</span>
            </span>
          )}

          {currentSection && (
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider">
              <span className="text-purple-600">/</span>
              <span className="text-bone uppercase font-semibold text-purple-200 tracking-[0.16em]">
                {currentSection}
              </span>
            </div>
          )}
        </div>

        {/* Quick Workstation Section Jumpers */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-purple-300/60">
          <Link
            href="/sanctum/tarot"
            className="hover:text-purple-200 px-2 py-0.5 rounded hover:bg-purple-950/40 transition-colors"
          >
            Tarot Inquest
          </Link>
          <span>·</span>
          <Link
            href="/sanctum/working"
            className="hover:text-purple-200 px-2 py-0.5 rounded hover:bg-purple-950/40 transition-colors"
          >
            Oracle Synthesis
          </Link>
          <span>·</span>
          <Link
            href="/sanctum/grimoire"
            className="hover:text-purple-200 px-2 py-0.5 rounded hover:bg-purple-950/40 transition-colors"
          >
            Private Ledger
          </Link>
        </div>
      </div>
    </div>
  );
}
