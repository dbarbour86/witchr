"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RadiantSunEngraving,
  DeathsHeadMothEngraving,
  TripleMoonDiadem,
  OracleAltarScene,
  OracleSpeechIcon,
  DailyTarotCardIcon,
  ThreeCardFanIcon,
  CauldronWorkingIcon,
  GrimoireBookIcon,
} from "@/components/sanctum/SanctumTriptychAssets";
import { TarotCornerFlourish, FourPointStar } from "@/components/OrnateFrames";
import { Shield, Layers, Send } from "lucide-react";
import { ORACLE_PENDING_INQUIRY_KEY } from "@/lib/sanctum/oracle/types";

const STARTER_CHIPS = ["I feel stuck", "I need clarity", "Something feels off"];

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

  const handleChipClick = (chip: string) => {
    try {
      sessionStorage.setItem(ORACLE_PENDING_INQUIRY_KEY, chip);
    } catch {
      // Fallback for private modes or storage quota
    }
    router.push("/sanctum/oracle");
  };

  const ticketButtons = [
    {
      title: "Talk to the Oracle",
      helper: "Ask, reflect, receive guidance",
      href: "/sanctum/oracle",
      icon: OracleSpeechIcon,
      highlight: true,
    },
    {
      title: "Draw Daily Tarot",
      helper: "One card for today",
      href: "/sanctum/tarot",
      icon: DailyTarotCardIcon,
    },
    {
      title: "Three-Card Reading",
      helper: "Situation, challenge, guidance",
      href: "/sanctum/tarot/three-card",
      icon: ThreeCardFanIcon,
    },
    {
      title: "Create a Working",
      helper: "Turn intention into action",
      href: "/sanctum/working",
      icon: CauldronWorkingIcon,
    },
    {
      title: "Open My Grimoire",
      helper: "Saved readings and ritual history",
      href: "/sanctum/grimoire",
      icon: GrimoireBookIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* =========================================================================
          HERO ARTIFACT: VINTAGE FORTUNE-TICKET / OCCULT MACHINE TRIPTYCH
          ========================================================================= */}
      <section
        aria-label="Sanctum Oracle Chamber Entrance Triptych"
        className="relative rounded-2xl sm:rounded-3xl border border-purple-900/80 bg-gradient-to-b from-[#090314] via-[#05010a] to-[#040108] p-4 sm:p-6 lg:p-8 shadow-[0_0_60px_rgba(88,28,135,0.4)] overflow-hidden sanctum-grain"
      >
        {/* Subtle Ambient Violet Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] h-64 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Triptych Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch relative z-10">
          {/* -------------------------------------------------------------------
              PANEL 1: ATMOSPHERE & IDENTITY (Left Column — Tertiary Mood)
              Quiet atmospheric anchor, without redundant route listings.
              ------------------------------------------------------------------- */}
          <div className="order-3 lg:order-1 lg:col-span-3 rounded-2xl border border-purple-800/60 bg-[#080212]/95 p-5 sm:p-6 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] group">
            {/* Ornate Corner Flourishes */}
            <div className="absolute top-2.5 left-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute top-2.5 right-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none -rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none rotate-180">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Top Unit: Celestial Radiant Sun Face */}
            <div className="w-full flex flex-col items-center pt-2 pb-5 border-b border-purple-900/50">
              <div className="relative p-1">
                <RadiantSunEngraving className="w-20 h-20 sm:w-24 sm:h-24 text-purple-300 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] shrink-0" />
              </div>
              <div className="mt-3 space-y-0.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-[0.24em] text-bone uppercase">
                  WITCHR
                </h3>
                <p className="text-[10px] font-mono tracking-[0.3em] text-purple-300/80 uppercase">
                  · SANCTUM ·
                </p>
              </div>
            </div>

            {/* Bottom Unit: Death's-Head Hawk Moth & Motto */}
            <div className="w-full pt-5 flex flex-col items-center space-y-3">
              <DeathsHeadMothEngraving className="w-24 h-16 text-purple-300 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0" />
              <blockquote className="font-serif text-xs text-bone-muted tracking-wider leading-relaxed max-w-[200px]">
                A quieter place
                <br />
                for louder questions.
              </blockquote>
              <div className="pt-2 text-[9px] font-mono tracking-[0.22em] text-purple-400/60 uppercase">
                DIVINATION CHAMBER
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              PANEL 2: CONVERSATION (Center Column — Primary Focal Point)
              Strongest visual focus: prominent artwork, short greeting,
              obvious inquiry input and "Talk to the Oracle" action.
              ------------------------------------------------------------------- */}
          <div className="order-1 lg:order-2 lg:col-span-5 rounded-2xl sm:rounded-3xl border-2 border-purple-500/80 bg-gradient-to-b from-[#130528] via-[#090216] to-[#05010e] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.35)] group">
            {/* Top Ornamental Diadem & Greeting */}
            <div className="w-full flex flex-col items-center text-center space-y-1 pb-1">
              <TripleMoonDiadem className="w-20 h-6 text-purple-300 filter drop-shadow-[0_0_10px_rgba(192,132,252,0.6)] shrink-0" />
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 uppercase drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                The Oracle
              </h1>
            </div>

            {/* Prominent Oracle Altar Scene Artwork */}
            <div className="relative my-2 sm:my-3 rounded-xl overflow-hidden border border-purple-600/60 bg-[#07020e] shadow-[0_0_35px_rgba(147,51,234,0.4)] flex items-center justify-center p-1">
              <OracleAltarScene className="w-full max-w-[320px] aspect-[360/280] h-auto max-h-[220px] sm:max-h-[280px] object-contain mx-auto" />
            </div>

            {/* Single Atmospheric Sentence */}
            <div className="text-center py-1 sm:py-2">
              <p className="text-xs sm:text-sm text-purple-200/90 font-serif italic tracking-wide">
                &ldquo;Speak what you carry in shadow; the Oracle answers in light.&rdquo;
              </p>
            </div>

            {/* Conversational Inquest Form */}
            <form onSubmit={handleSubmitInquiry} className="mt-2 space-y-3">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl border-2 border-purple-500/90 bg-[#120426] focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-400/30 transition-all shadow-[0_0_30px_rgba(147,51,234,0.35)]">
                <input
                  type="text"
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="Speak your question, friction, or intention..."
                  aria-label="Inquiry for the Oracle"
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-bone placeholder-purple-300/40 outline-none font-serif min-w-0"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-300/50 text-white text-xs sm:text-sm font-serif font-bold tracking-wider uppercase transition-all shadow-[0_0_16px_rgba(168,85,247,0.5)] active:scale-[0.98]"
                >
                  <span>Talk to the Oracle</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Exactly 3 Focused Starter Inquiry Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {STARTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 rounded-lg bg-[#14062a] hover:bg-purple-950/90 border border-purple-800/80 hover:border-purple-400 text-purple-200 hover:text-white text-xs font-serif transition-colors shadow-sm"
                  >
                    &ldquo;{chip}&rdquo;
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* -------------------------------------------------------------------
              PANEL 3: STRUCTURED CHOICES (Right Column — Secondary Pathways)
              5 clear divination ticket choices with concise helper text.
              ------------------------------------------------------------------- */}
          <div className="order-2 lg:order-3 lg:col-span-4 rounded-2xl border border-purple-800/70 bg-[#080212]/95 p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] group">
            {/* Ornate Corner Flourishes */}
            <div className="absolute top-2.5 left-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute top-2.5 right-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none -rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none rotate-180">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Top Unit: Crescent Moon & Headline */}
            <div className="w-full flex flex-col items-center pb-3 border-b border-purple-900/50 text-center space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300">
                <span className="text-xs">✦</span>
                <span className="font-serif text-sm">☽</span>
                <span className="text-xs">✦</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-bone via-lavender-light to-purple-200 uppercase leading-snug drop-shadow-[0_0_12px_rgba(192,132,252,0.3)]">
                What Brings You Here?
              </h2>
            </div>

            {/* Center Unit: 5 Collectible Fortune-Ticket Admission Buttons */}
            <div className="w-full py-3 space-y-2.5" role="navigation" aria-label="Sanctum Primary Pathways">
              {ticketButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <Link
                    key={btn.title}
                    href={btn.href}
                    className={`group/btn relative w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
                      btn.highlight
                        ? "bg-gradient-to-r from-[#190932] to-[#120626] border-purple-500/80 hover:border-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.25)] hover:shadow-[0_0_24px_rgba(192,132,252,0.4)]"
                        : "bg-[#0b0318] border-purple-900/70 hover:border-purple-600/80 hover:bg-[#130626] shadow-[0_0_10px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(168,85,247,0.2)]"
                    }`}
                  >
                    {/* Left Icon Badge + Title + Helper Text */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                          btn.highlight
                            ? "bg-purple-950/90 border-purple-400/80 text-purple-200 group-hover/btn:border-purple-300"
                            : "bg-[#140728] border-purple-800/80 text-purple-300 group-hover/btn:border-purple-500 group-hover/btn:text-purple-100"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-purple-300 group-hover/btn:text-purple-100 shrink-0" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif text-xs sm:text-sm font-semibold text-bone group-hover/btn:text-purple-100 transition-colors tracking-wide truncate">
                          {btn.title}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-purple-300/75 truncate">
                          {btn.helper}
                        </span>
                      </div>
                    </div>

                    {/* Right Chevron Marker */}
                    <div className="shrink-0 pl-2 text-purple-400/70 group-hover/btn:text-purple-200 group-hover/btn:translate-x-0.5 transition-all">
                      <span className="font-mono text-xs font-bold">
                        &gt;&gt;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Unit: Triple Moon Glyph */}
            <div className="w-full pt-3 border-t border-purple-900/50 flex justify-center">
              <TripleMoonDiadem className="w-14 h-4 text-purple-400/80 filter drop-shadow-[0_0_6px_rgba(192,132,252,0.4)] shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TERTIARY ACCESS: SINGLE CLEAN SANCTUM HUB LINK & PRIVACY STRIP
          ========================================================================= */}
      <footer className="p-3.5 sm:p-4 rounded-xl bg-[#080212] border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-purple-300/70">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>Client-rendered sanctuary. Zero cookies, stored 100% in your local browser.</span>
        </div>
        <Link
          href="/sanctum/hub"
          className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white uppercase tracking-[0.18em] text-[11px] font-semibold transition-colors group shrink-0"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
          <span>ENTER FULL SANCTUM HUB →</span>
        </Link>
      </footer>
    </div>
  );
}
