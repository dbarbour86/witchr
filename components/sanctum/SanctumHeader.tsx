"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SanctumPrivateTestBanner } from "@/components/sanctum/SanctumPrivateTestBanner";

interface SanctumHeaderProps {
  currentSection?: string;
  showBackToSanctum?: boolean;
}

/**
 * Standardized SanctumHeader matching the shared design reference:
 * - Prominent "← Back to Sanctum" button on every tool page in the same position
 * - Compact test notice
 * - Clear, consistent styling across all pages
 */
export function SanctumHeader({ currentSection, showBackToSanctum = false }: SanctumHeaderProps) {
  return (
    <div className="relative mb-4 sm:mb-6 space-y-3 print:hidden">
      {/* Compact Private Test Banner */}
      <SanctumPrivateTestBanner />

      {/* Prominent Back to Sanctum Action & Current Section Indicator */}
      {showBackToSanctum && (
        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            href="/sanctum/chamber"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#120626] hover:bg-[#1f0b3e] border border-purple-700/60 hover:border-purple-400 text-purple-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(168,85,247,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 group cursor-pointer text-xs font-mono uppercase tracking-[0.16em]"
            aria-label="Back to Sanctum Home"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-semibold">Back to Sanctum</span>
          </Link>

          {currentSection && (
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-purple-300/60 hidden sm:inline-block">
              {currentSection}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
