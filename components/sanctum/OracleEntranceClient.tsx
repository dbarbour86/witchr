"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  RadiantSunEngraving,
  TripleMoonDiadem,
  OracleAltarScene,
} from "@/components/sanctum/SanctumTriptychAssets";
import { TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";
import { Send, MessageSquare } from "lucide-react";
import { ORACLE_PENDING_INQUIRY_KEY } from "@/lib/sanctum/oracle/types";

const STARTER_PROMPTS = [
  "I FEEL STUCK",
  "I NEED CLARITY",
  "WHAT'S NEXT FOR ME?",
];

export function OracleEntranceClient() {
  const router = useRouter();
  const [inquiryText, setInquiryText] = useState("");

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inquiryText.trim();
    if (query) {
      try {
        sessionStorage.setItem(ORACLE_PENDING_INQUIRY_KEY, query);
      } catch {
        // Fallback for private modes or storage quota
      }
    }
    router.push("/sanctum/oracle");
  };

  const handleChipClick = (prompt: string) => {
    try {
      sessionStorage.setItem(ORACLE_PENDING_INQUIRY_KEY, prompt);
    } catch {
      // Fallback for private modes or storage quota
    }
    router.push("/sanctum/oracle");
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          TWO-COLUMN SANCTUM WORKSTATION:
          1. Main Oracle Column (Left on desktop, stacked first on mobile):
             - Celestial frame & ornamental corner flourishes
             - Meet the Oracle heading & diadem
             - Natural 3:2 aspect ratio artwork (full table, cards, candles, skull & atmosphere visible)
             - Generous typing area with submit button placed below
             - Starter chips
          2. Action Column (Right on desktop, stacked below on mobile):
             - Tightened layout right below "Explore the Sanctum" (no large empty gap)
             - Illustrated parchment action cards with aged paper texture, inner borders & original mockup icons
          ========================================================================= */}
      <section
        aria-label="Witchr Sanctum Chamber"
        className="relative w-full rounded-2xl border border-purple-900/60 bg-[#06020c] p-3 sm:p-5 lg:p-6 shadow-[0_0_80px_rgba(76,29,149,0.3)] overflow-hidden sanctum-grain"
      >
        {/* Restrained Violet & Antique Gold Ambient Aura */}
        <div className="absolute top-0 left-1/3 w-[45rem] h-64 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[35rem] h-60 bg-amber-900/10 rounded-full blur-[150px] pointer-events-none" />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start relative z-10">
          
          {/* ===================================================================
              COLUMN 1: THE ORACLE (Main Visual Focus - col-span-12 lg:col-span-7)
              - Delicate celestial frame with inner inset filigree & corner flourishes
              - Natural 3:2 aspect ratio so table, tarot spread, and candles remain uncropped
              - Restrained purple glow with subtle antique gold highlights
              =================================================================== */}
          <div className="col-span-1 lg:col-span-7 rounded-2xl sanctum-celestial-frame p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Ornamental Corner Flourishes (placed away from text and controls) */}
            <div className="absolute top-2 left-2 opacity-60 pointer-events-none">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute top-2 right-2 opacity-60 pointer-events-none rotate-90">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute bottom-2 left-2 opacity-60 pointer-events-none -rotate-90">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute bottom-2 right-2 opacity-60 pointer-events-none rotate-180">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>

            {/* Top Ornamental Diadem & Heading */}
            <div className="w-full flex flex-col items-center text-center space-y-1.5 pb-2">
              <TripleMoonDiadem className="w-16 h-4 text-purple-300 filter drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 uppercase drop-shadow-[0_0_14px_rgba(192,132,252,0.4)]">
                MEET THE ORACLE
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-[0.22em] text-purple-300/80 uppercase max-w-lg leading-relaxed">
                ASK YOUR QUESTIONS. FIND CLARITY. EXPLORE TAROT.
                <br className="hidden sm:inline" /> RECEIVE GUIDANCE FOR YOUR PATH.
              </p>
            </div>

            {/* Natural 3:2 Aspect Ratio Artwork Frame: Full table, cards, candles, skull & room atmosphere visible */}
            <div className="relative my-2 sm:my-3 rounded-xl overflow-hidden border border-purple-600/50 bg-[#070210] shadow-[0_0_35px_rgba(147,51,234,0.35)] flex items-center justify-center">
              <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                <Image
                  src="/images/sanctum/oracle-chamber-altar.webp"
                  alt="The Hooded Oracle seated at the Candlelit Tarot Altar with full spread and atmosphere"
                  fill
                  priority
                  className="object-contain object-center filter contrast-105"
                  sizes="(max-width: 1024px) 100vw, 750px"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
                {/* Fallback Vector Altar in case image is blocked */}
                <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                  <OracleAltarScene className="w-full h-full object-cover opacity-60" />
                </div>
              </div>
            </div>

            {/* Question Inquest Form: Comfortable typing textarea + submit button below */}
            <form onSubmit={handleSubmitInquiry} className="mt-2 space-y-3">
              <div className="relative rounded-xl border-2 border-purple-500/80 bg-[#0d041e] focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-400/40 transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] p-2.5">
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <textarea
                    rows={2}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="Speak your question, intention, or what's on your mind..."
                    aria-label="Speak your question to the Oracle"
                    className="w-full bg-transparent text-xs sm:text-sm text-bone placeholder-purple-300/50 outline-none font-serif resize-none leading-relaxed min-h-[48px]"
                  />
                </div>
                
                {/* Submit button placed below typing field with subtle gold/purple border */}
                <div className="mt-2 pt-2 border-t border-purple-900/50 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 border border-purple-300/50 text-white text-[11px] xs:text-xs sm:text-sm font-serif font-bold tracking-wider uppercase transition-all shadow-[0_0_18px_rgba(168,85,247,0.45)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>TALK TO THE ORACLE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Starter Inquiry Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleChipClick(prompt)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#110524] hover:bg-purple-950 border border-purple-800/80 hover:border-purple-400 text-purple-200 hover:text-white text-[11px] font-mono tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>

              {/* Bottom Chamber Motto */}
              <div className="text-center pt-1.5">
                <p className="text-[10px] sm:text-[11px] text-purple-300/80 font-serif italic tracking-wide">
                  &ldquo;SPEAK WHAT YOU CARRY IN SHADOW. THE ORACLE ANSWERS IN LIGHT.&rdquo;
                </p>
              </div>
            </form>
          </div>

          {/* ===================================================================
              COLUMN 2: ILLUSTRATED ACTION CARDS (col-span-12 lg:col-span-5)
              - Celestial frame with ornamental corners
              - Closer spacing right beneath "Explore the Sanctum" (no large empty gap)
              - 4 Illustrated action cards with original mockup iconography and aged paper texture
              =================================================================== */}
          <div className="col-span-1 lg:col-span-5 rounded-2xl sanctum-celestial-frame p-4 sm:p-5 flex flex-col justify-start relative overflow-hidden group">
            {/* Corner Flourishes */}
            <div className="absolute top-2 left-2 opacity-50 pointer-events-none">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute top-2 right-2 opacity-50 pointer-events-none rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2 left-2 opacity-50 pointer-events-none -rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2 right-2 opacity-50 pointer-events-none rotate-180">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Top Unit: Explore the Sanctum Header */}
            <div className="w-full flex flex-col items-center pb-2.5 border-b border-purple-900/40 text-center space-y-0.5">
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-bone via-lavender-light to-purple-200 uppercase drop-shadow-[0_0_10px_rgba(192,132,252,0.3)]">
                EXPLORE THE SANCTUM
              </h2>
              <p className="text-[9.5px] font-mono tracking-[0.22em] text-purple-300/70 uppercase">
                OTHER WAYS TO SEEK AND CREATE
              </p>
            </div>

            {/* Action Cards: Positioned closely under header */}
            <div className="w-full pt-3 space-y-3" role="navigation" aria-label="Explore the Sanctum Pathways">
              
              {/* SHORTCUT 1: Talk to the Oracle (Primary path, glowing celestial banner) */}
              <Link
                href="/sanctum/oracle"
                className="group relative w-full flex items-center justify-between p-3.5 rounded-xl border border-purple-500/80 bg-gradient-to-r from-[#230948] via-[#16062f] to-[#110424] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_26px_rgba(192,132,252,0.45)] hover:border-purple-300 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-purple-950/90 border border-purple-400/80 flex items-center justify-center p-1 shadow-[0_0_10px_rgba(168,85,247,0.4)] overflow-hidden">
                    <Image
                      src="/images/sanctum/mockup-icon-oracle.webp"
                      alt="Oracle Celestial Sun Icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter contrast-125"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-widest text-purple-300/80 uppercase font-semibold">
                      PRIMARY PATH
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-bone group-hover:text-purple-100 transition-colors uppercase tracking-wider whitespace-nowrap">
                      TALK TO THE ORACLE
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-purple-300/75 whitespace-nowrap">
                      ASK · REFLECT · RECEIVE
                    </span>
                  </div>
                </div>
                <div className="shrink-0 pl-3 text-purple-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                  <span className="font-mono text-sm font-bold">&gt;&gt;</span>
                </div>
              </Link>

              {/* SHORTCUT 2: Draw Daily Tarot (Daily ritual, parchment card) */}
              <Link
                href="/sanctum/tarot"
                className="group relative w-full flex items-center justify-between p-3.5 rounded-xl sanctum-parchment-card transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Mockup Tarot Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-[#2a170e] border border-[#6d4833] flex items-center justify-center p-1 overflow-hidden shadow-inner">
                    <Image
                      src="/images/sanctum/mockup-icon-tarot.webp"
                      alt="Daily Tarot Icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter contrast-110"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-widest text-[#5c3e2e] uppercase font-bold">
                      DAILY RITUAL
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1f140e] group-hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
                      DRAW DAILY TAROT
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-[#6b4c39] whitespace-nowrap">
                      A CARD FOR TODAY
                    </span>
                  </div>
                </div>
                <div className="shrink-0 pl-3 text-[#422a1d] group-hover:text-black group-hover:translate-x-1 transition-all">
                  <span className="font-mono text-sm font-bold">&gt;&gt;</span>
                </div>
              </Link>

              {/* SHORTCUT 3: Create a Ritual (Create magic, parchment card) */}
              <Link
                href="/sanctum/working"
                className="group relative w-full flex items-center justify-between p-3.5 rounded-xl sanctum-parchment-card transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Mockup Cauldron Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-[#2a170e] border border-[#6d4833] flex items-center justify-center p-1 overflow-hidden shadow-inner">
                    <Image
                      src="/images/sanctum/mockup-icon-working.webp"
                      alt="Create Ritual Cauldron Icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter contrast-110"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-widest text-[#5c3e2e] uppercase font-bold">
                      CREATE MAGIC
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1f140e] group-hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
                      CREATE A RITUAL
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-[#6b4c39] whitespace-nowrap">
                      TURN INTENTION INTO ACTION
                    </span>
                  </div>
                </div>
                <div className="shrink-0 pl-3 text-[#422a1d] group-hover:text-black group-hover:translate-x-1 transition-all">
                  <span className="font-mono text-sm font-bold">&gt;&gt;</span>
                </div>
              </Link>

              {/* SHORTCUT 4: Open My Grimoire (Your library, parchment card) */}
              <Link
                href="/sanctum/grimoire"
                className="group relative w-full flex items-center justify-between p-3.5 rounded-xl sanctum-parchment-card transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Mockup Grimoire Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-[#2a170e] border border-[#6d4833] flex items-center justify-center p-1 overflow-hidden shadow-inner">
                    <Image
                      src="/images/sanctum/mockup-icon-grimoire.webp"
                      alt="Open Grimoire Tome Icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter contrast-110"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] font-mono tracking-widest text-[#5c3e2e] uppercase font-bold">
                      YOUR LIBRARY
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1f140e] group-hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap">
                      OPEN MY GRIMOIRE
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-[#6b4c39] whitespace-nowrap">
                      NOTES · RITUALS · INSIGHTS
                    </span>
                  </div>
                </div>
                <div className="shrink-0 pl-3 text-[#422a1d] group-hover:text-black group-hover:translate-x-1 transition-all">
                  <span className="font-mono text-sm font-bold">&gt;&gt;</span>
                </div>
              </Link>
            </div>

            {/* Bottom Unit: Triple Moon Glyph & Footer Motto */}
            <div className="w-full mt-4 pt-3 border-t border-purple-900/40 flex flex-col items-center space-y-1 text-center">
              <TripleMoonDiadem className="w-12 h-3.5 text-purple-400/80" />
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-purple-300/80">
                &ldquo;DIFFERENT PATHS. THE SAME MAGIC.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
