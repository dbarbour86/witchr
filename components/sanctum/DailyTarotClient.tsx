"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SanctumTarotCard, getRandomSanctumTarotCard, getSanctumTarotCardById } from "@/content/sanctum-tarot";
import {
  SanctumDailyReading,
  getStoredDailyReading,
  saveDailyReading,
  saveReadingToGrimoire,
  clearTodayDailyReadingDevOnly,
  getTodayLocalDateString,
} from "@/lib/sanctum/storage";
import { recordSanctumActivity } from "@/lib/sanctum/progression";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import { SanctumCardBack } from "@/components/sanctum/SanctumCardBack";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import { FourPointStar, CelestialDivider, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { SanctumCrest, MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { Sparkles, BookOpen, Check, RefreshCw, Compass, ArrowRight, ArrowLeft, Printer } from "lucide-react";

export function DailyTarotClient() {
  const [mounted, setMounted] = useState(false);
  const [reading, setReading] = useState<SanctumDailyReading | null>(null);
  const [card, setCard] = useState<SanctumTarotCard | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [devMessage, setDevMessage] = useState<string | null>(null);

  // Hydration-safe initial check for today's reading and reset listener
  useEffect(() => {
    setMounted(true);
    const existing = getStoredDailyReading();
    if (existing) {
      setReading(existing);
      setIsSaved(existing.savedToGrimoire);
      const foundCard = getSanctumTarotCardById(existing.cardId);
      if (foundCard) {
        setCard(foundCard);
      }
    }

    const handleReset = () => {
      setReading(null);
      setCard(null);
      setIsSaved(false);
    };

    window.addEventListener("sanctum:daily-tarot-reset", handleReset);
    return () => window.removeEventListener("sanctum:daily-tarot-reset", handleReset);
  }, []);

  // Handle drawing card
  const handleDraw = () => {
    if (isDrawing || reading) return;

    setIsDrawing(true);
    recordSanctumTestEvent("daily_tarot_started");

    // Brief ceremonial timing
    setTimeout(() => {
      const drawnCard = getRandomSanctumTarotCard();
      const today = getTodayLocalDateString();
      const newReading: SanctumDailyReading = {
        id: `reading_daily_${today}_${drawnCard.slug}`,
        type: "daily",
        timestamp: new Date().toISOString(),
        localDate: today,
        cardId: drawnCard.id,
        cardName: drawnCard.name,
        cardSlug: drawnCard.slug,
        cardNumber: drawnCard.number,
        cardNumeral: drawnCard.numeral,
        shortKeywords: drawnCard.shortKeywords,
        interpretation: {
          theCard: drawnCard.traditionalMeaning,
          whatThisMayReflectToday: drawnCard.reflectiveInterpretation,
          reflectionPrompt: drawnCard.reflectionPrompt,
          practicalTakeaway: drawnCard.practicalTakeaway,
        },
        savedToGrimoire: false,
      };

      saveDailyReading(newReading);
      recordSanctumActivity({
        type: "daily",
        id: `daily_${today}`,
        title: drawnCard.name,
      });
      recordSanctumTestEvent("daily_tarot_completed", drawnCard.name);
      setReading(newReading);
      setCard(drawnCard);
      setIsSaved(false);
      setIsDrawing(false);
    }, 1100);
  };

  // Handle saving reading to Grimoire
  const handleSaveToGrimoire = () => {
    if (!reading) return;
    saveReadingToGrimoire(reading);
    recordSanctumTestEvent("daily_tarot_saved", reading.cardName);
    setIsSaved(true);
  };

  // Development-only reset handler
  const handleDevReset = () => {
    clearTodayDailyReadingDevOnly();
    setReading(null);
    setCard(null);
    setIsSaved(false);
    setDevMessage("Daily draw state cleared for testing.");
    setTimeout(() => setDevMessage(null), 3000);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Dev Mode Reset Control (Only in non-production) */}
      {process.env.NODE_ENV !== "production" && (
        <div className="p-3 rounded-lg bg-[#0e071c] border border-dashed border-purple-800/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Tester Dev Bar</span>
            <span className="text-purple-600">·</span>
            <span className="text-bone-muted">
              {reading ? `Active draw: ${reading.cardName} (${reading.localDate})` : "No draw active"}
            </span>
            {devMessage && <span className="text-purple-200 italic">({devMessage})</span>}
          </div>
          <button
            type="button"
            onClick={handleDevReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1c0c36] hover:bg-purple-900 text-purple-200 border border-purple-700 text-[10px] uppercase tracking-wider transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Today&apos;s Draw</span>
          </button>
        </div>
      )}

      {/* Occult Split Altar Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN: THE CARD ALTAR
           ========================================================================= */}
        <section
          className="lg:col-span-5 sanctum-panel sanctum-corners p-6 sm:p-8 border border-purple-900/60 flex flex-col items-center justify-between gap-6 min-h-[560px]"
          aria-labelledby="card-altar-heading"
        >
          {/* Altar Header */}
          <div className="w-full flex items-center justify-between border-b border-purple-900/40 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2
                id="card-altar-heading"
                className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-bone to-purple-200"
              >
                The Card Altar
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80">
              {reading ? "Drawn Today" : "Single Inquest"}
            </span>
          </div>

          {/* Interactive Card Presentation Altar */}
          <div className="relative flex flex-col items-center justify-center my-auto py-2 w-full">
            <div
              className={`w-full flex justify-center transition-all duration-700 ease-out transform-gpu ${
                isDrawing
                  ? "scale-95 opacity-70 rotate-1 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                  : "scale-100 opacity-100 rotate-0"
              }`}
            >
              {reading && card ? (
                <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-3 w-[260px] sm:w-[280px]">
                  <SanctumCardFace card={card} size="large" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300 flex items-center justify-center gap-1.5 pt-1 text-center w-full">
                    <FourPointStar className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                    <span className="truncate">Drawn for {reading.localDate}</span>
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 w-[260px] sm:w-[280px]">
                  <SanctumCardBack
                    size="large"
                    label="The Oracle Deck"
                    sublabel={isDrawing ? "Shuffling the Arcana..." : "Face Down // Major Arcana"}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Button & Instructions */}
          <div className="w-full flex flex-col items-center gap-3 text-center pt-3 border-t border-purple-900/40">
            {!reading ? (
              <div className="w-full space-y-3">
                <p className="text-[11px] text-bone-muted font-sans max-w-xs mx-auto leading-relaxed">
                  Hold a question or simply invite perspective on where your energy is focused today.
                </p>
                <button
                  type="button"
                  onClick={handleDraw}
                  disabled={isDrawing || !mounted}
                  className="w-full py-3.5 px-6 rounded-xl sanctum-btn-electric font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Draw your daily tarot card"
                >
                  <FourPointStar className={`w-3.5 h-3.5 ${isDrawing ? "animate-spin" : ""}`} />
                  <span>{isDrawing ? "INVOKING ARCANA..." : "DRAW TODAY'S CARD"}</span>
                  <FourPointStar className={`w-3.5 h-3.5 ${isDrawing ? "animate-spin" : ""}`} />
                </button>
              </div>
            ) : (
              <div className="w-full space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#120722] border border-purple-800 text-[10px] font-mono uppercase tracking-wider text-purple-300">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Daily Inquest Complete</span>
                </div>
                <p className="text-[11px] text-bone-dim font-sans">
                  Each seeker receives one diagnostic card draw per calendar day. Return tomorrow for your next reflection.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            RIGHT COLUMN: DIAGNOSTIC INTERPRETATION FOLIO
           ========================================================================= */}
        <section
          className="lg:col-span-7 sanctum-parchment rounded-xl p-6 sm:p-9 border border-purple-500/40 relative shadow-2xl min-h-[560px] flex flex-col justify-between"
          aria-labelledby="diagnostic-folio-heading"
        >
          {/* Ornate Corner Flourishes */}
          <div className="absolute top-2 left-2 pointer-events-none opacity-60">
            <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
          </div>
          <div className="absolute top-2 right-2 pointer-events-none opacity-60 rotate-90">
            <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
          </div>
          <div className="absolute bottom-2 left-2 pointer-events-none opacity-60 -rotate-90">
            <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
          </div>
          <div className="absolute bottom-2 right-2 pointer-events-none opacity-60 rotate-180">
            <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
          </div>

          {/* DORMANT STATE: Waiting for Draw */}
          {!reading && (
            <div className="my-auto text-center space-y-6 py-12 px-4 relative z-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#130728] border border-purple-600/50 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                <SanctumCrest className="w-14 h-14" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-purple-300">
                  Station // Diagnostic Folio
                </div>
                <h3
                  id="diagnostic-folio-heading"
                  className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                >
                  The Arcana Mirror
                </h3>
                <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
                  Draw a card from the altar to reveal its traditional symbolism, psychological inquiry, diagnostic blind spots, and grounded practical application for today.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <MoonPhaseStrip />
              </div>
            </div>
          )}

          {/* ACTIVE STATE: Card Revealed */}
          {reading && card && (
            <article className="space-y-7 relative z-10">
              {/* Header */}
              <header className="border-b border-purple-900/40 pb-5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300">
                  <span>POSITION I // DAILY MIRROR</span>
                  <span>MAJOR ARCANA</span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    id="diagnostic-folio-heading"
                    className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 drop-shadow-[0_0_12px_rgba(192,132,252,0.3)]"
                  >
                    {card.name} — {card.numeral}
                  </h2>
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {card.shortKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-[#130728] border border-purple-700/60 text-[10px] font-mono uppercase tracking-wider text-purple-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </header>

              {/* Interpretation Section 1: The Card */}
              <section className="space-y-1.5" aria-labelledby="the-card-heading">
                <h4 id="the-card-heading" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  The Card
                </h4>
                <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3.5 rounded-lg border border-purple-900/40">
                  {reading.interpretation.theCard}
                </p>
              </section>

              {/* Interpretation Section 2: What This May Reflect Today */}
              <section className="space-y-1.5" aria-labelledby="reflect-heading">
                <h4 id="reflect-heading" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  What This May Reflect Today
                </h4>
                <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed bg-[#0c051a] p-3.5 rounded-lg border border-purple-900/40">
                  {reading.interpretation.whatThisMayReflectToday}
                </p>
              </section>

              {/* Interpretation Section 3: Daily Inquiry */}
              <section className="p-4 rounded-xl bg-[#110624] border border-purple-700/50 space-y-1.5 shadow-[0_0_15px_rgba(88,28,135,0.25)]">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold flex items-center gap-1.5">
                  <FourPointStar className="w-3 h-3 text-purple-400" />
                  <span>Daily Inquiry</span>
                </span>
                <p className="font-serif text-sm sm:text-base text-purple-100 italic leading-relaxed">
                  “{reading.interpretation.reflectionPrompt}”
                </p>
              </section>

              {/* Interpretation Section 4: Practical Takeaway */}
              <section className="space-y-1.5" aria-labelledby="practical-heading">
                <h4 id="practical-heading" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Practical Takeaway
                </h4>
                <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3.5 rounded-lg border border-purple-900/40">
                  {reading.interpretation.practicalTakeaway}
                </p>
              </section>

              {/* Actions Footer */}
              <div className="pt-5 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSaveToGrimoire}
                  disabled={isSaved}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                    isSaved
                      ? "bg-purple-950/80 text-purple-300 border border-purple-600/50 cursor-default"
                      : "sanctum-btn-electric"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved to Grimoire</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Save to Grimoire</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#120722] hover:bg-[#1c0c36] border border-purple-900/60 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-purple-400" />
                    <span>Print Card</span>
                  </button>

                  <Link
                    href="/sanctum/tarot/three-card"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#120722] hover:bg-[#1c0c36] border border-purple-900/60 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <span>3-Card Spread</span>
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </Link>
                </div>
              </div>
            </article>
          )}
        </section>
      </div>
    </div>
  );
}
