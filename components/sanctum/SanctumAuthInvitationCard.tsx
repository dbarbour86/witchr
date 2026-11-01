"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight, ArrowLeft } from "lucide-react";
import { FourPointStar } from "@/components/OrnateFrames";

interface SanctumAuthInvitationCardProps {
  redirectPath?: string;
  className?: string;
}

export function SanctumAuthInvitationCard({
  redirectPath = "/sanctum/oracle",
  className = "",
}: SanctumAuthInvitationCardProps) {
  const loginUrl = `/sanctum/login?redirect=${encodeURIComponent(redirectPath)}`;
  const signupUrl = `/sanctum/signup?redirect=${encodeURIComponent(redirectPath)}`;

  return (
    <div
      className={`relative w-full rounded-2xl border border-purple-800/80 bg-gradient-to-b from-[#110526]/95 via-[#0c031c]/98 to-[#070112] p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(147,51,234,0.25)] overflow-hidden ${className}`}
      aria-label="Sanctum Membership Invitation"
    >
      {/* Delicate celestial corner flourishes */}
      <div className="absolute top-2 left-2 text-purple-500/40 pointer-events-none">
        <FourPointStar className="w-3 h-3" />
      </div>
      <div className="absolute top-2 right-2 text-purple-500/40 pointer-events-none">
        <FourPointStar className="w-3 h-3" />
      </div>
      <div className="absolute bottom-2 left-2 text-purple-500/40 pointer-events-none">
        <FourPointStar className="w-3 h-3" />
      </div>
      <div className="absolute bottom-2 right-2 text-purple-500/40 pointer-events-none">
        <FourPointStar className="w-3 h-3" />
      </div>

      {/* Subtle Purple Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Central Flame Crest */}
      <div className="relative inline-flex items-center justify-center mb-3">
        <div className="w-9 h-9 rounded-full bg-purple-950/80 border border-purple-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Flame className="w-5 h-5 text-purple-300 fill-purple-400/40" />
        </div>
      </div>

      {/* Heading */}
      <h3 className="relative text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase mb-2">
        Continue your conversation in the Sanctum.
      </h3>

      {/* Description */}
      <p className="relative max-w-lg mx-auto text-xs sm:text-sm text-bone-muted font-sans leading-relaxed mb-6">
        Create an account to keep talking with the Oracle, explore tarot, and create your own rituals.
      </p>

      {/* Action Buttons matching approved mockup */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
        <Link
          href={signupUrl}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-[0.16em] font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-[0.98] cursor-pointer"
        >
          <span>Create an account</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={loginUrl}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0e041c] hover:bg-[#190833] border border-purple-700/70 hover:border-purple-400 text-purple-200 hover:text-white text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all shadow-sm cursor-pointer"
        >
          <span>Log in</span>
        </Link>
      </div>

      {/* Reassurance text */}
      <p className="relative text-[11px] sm:text-xs font-mono text-purple-300/70 tracking-wide mb-5">
        Your question and answer will be here when you return.
      </p>

      {/* Back to Sanctum Link */}
      <div className="relative pt-3 border-t border-purple-900/40 inline-block">
        <Link
          href="/sanctum/chamber"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-purple-400/80 hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Sanctum</span>
        </Link>
      </div>
    </div>
  );
}

