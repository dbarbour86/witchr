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
import { Sparkles, BookOpen, Check, RefreshCw, Compass, ArrowRight, ArrowLeft } from "lucide-react";

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

    // Brief ceremonial timing (respecting natural anticipation)
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

  return (
    <div className="space-y-12">
      {/* Dev Mode Reset Control (Only in non-production) */}
      {process.env.NODE_ENV !== "production" && (
        <div className="p-3 rounded-lg bg-surface border border-dashed border-border-highlight flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-lavender-moon">
            <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Dev Test Bar</span>
            <span className="text-bone-dim">·</span>
            <span className="text-bone-dim">
              {reading ? `Active draw: ${reading.cardName} (${reading.localDate})` : "No draw active"}
            </span>
            {devMessage && <span className="text-lavender-light italic">({devMessage})</span>}
          </div>
          <button
            type="button"
            onClick={handleDevReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate text-[11px] uppercase tracking-wider transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Today's Draw</span>
          </button>
        </div>
      )}

      {/* Main Title & Context Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <Sparkles className="w-3 h-3" />
          <span>{reading ? "Today’s Arcana" : "Single-Card Divination"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          {reading ? "TODAY’S CARD" : "DAILY TAROT"}
        </h1>

        <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
          {reading
            ? "Your card for today has been drawn. Use this mirror to examine your posture, evaluate unconscious friction, and navigate your day with grounded intention."
            : "Draw one card for reflection and guidance. Approach this draw not to predict what will happen to you today, but to reveal what perspective will serve you best."}
        </p>

        <CelestialDivider className="max-w-xs mx-auto my-4" />
      </div>

      {/* Interactive Card Stage */}
      <div className="tarot-frame p-6 sm:p-12 flex flex-col items-center justify-center gap-8 shadow-card-tarot relative overflow-hidden">
        {/* Subtle decorative stars */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        {/* Card Display Container with 3D Flip transition */}
        <div className="relative flex flex-col items-center justify-center min-h-[440px] w-full max-w-[320px]">
          {/* Card Presentation */}
          <div
            className={`w-full flex justify-center transition-all duration-700 ease-out transform-gpu motion-reduce:transition-none ${
              isDrawing
                ? "scale-95 opacity-70 rotate-1 shadow-glow-purple"
                : "scale-100 opacity-100 rotate-0"
            }`}
          >
            {reading && card ? (
              <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-3">
                <SanctumCardFace card={card} size="large" />
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                  <FourPointStar className="w-2.5 h-2.5" />
                  <span>Drawn for {reading.localDate}</span>
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <SanctumCardBack
                  size="large"
                  label="The Oracle Deck"
                  sublabel={isDrawing ? "Shuffling the Arcana..." : "Face Down // Arcana Arcana"}
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          {!reading ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon block">
                  HOLD YOUR QUESTION IN MIND
                </span>
                <p className="text-xs text-bone-muted font-sans max-w-sm">
                  A specific question is optional. You may also simply invite whatever perspective is most needed for your current circumstance.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDraw}
                disabled={isDrawing || !mounted}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover active:scale-[0.98] text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle hover:shadow-glow-purple transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                aria-label="Draw your daily tarot card"
              >
                <FourPointStar className={`w-3 h-3 text-lavender-moon ${isDrawing ? "animate-spin" : ""}`} />
                <span>{isDrawing ? "INVOKING ARCANA..." : "DRAW YOUR CARD"}</span>
                <FourPointStar className={`w-3 h-3 text-lavender-moon ${isDrawing ? "animate-spin" : ""}`} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
                Daily Allotment Claimed
              </span>
              <p className="text-xs text-bone-muted font-sans">
                Each visitor receives one daily reflection card per calendar day. Return tomorrow for your next draw.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Structured Reading Presentation (When Card is Revealed) */}
      {reading && card && (
        <div className="tarot-frame p-6 sm:p-10 md:p-12 shadow-card-tarot space-y-10 animate-in fade-in duration-500">
          {/* Card Header & Numeral */}
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <span>Position I // Daily Mirror</span>
              <span>Major Arcana</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone celestial-glow">
              {card.name} — {card.numeral}
            </h2>

            {/* Keywords */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-lavender-light">
              {card.shortKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-surface-elevated border border-border-ornate/60"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Section 1: The Card */}
          <section className="space-y-3" aria-labelledby="the-card-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="the-card-heading" className="font-semibold">
                THE CARD
              </h3>
            </div>
            <p className="text-sm sm:text-base text-bone font-serif leading-relaxed italic">
              {reading.interpretation.theCard}
            </p>
          </section>

          {/* Section 2: What This May Reflect Today */}
          <section className="space-y-3" aria-labelledby="reflect-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="reflect-heading" className="font-semibold">
                WHAT THIS MAY REFLECT TODAY
              </h3>
            </div>
            <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
              {reading.interpretation.whatThisMayReflectToday}
            </p>
          </section>

          {/* Section 3: Consider (Reflection Prompt) */}
          <section className="p-6 rounded-xl bg-surface-elevated/70 border border-border-ornate space-y-2 shadow-subtle" aria-labelledby="consider-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="consider-heading" className="font-semibold">
                CONSIDER
              </h3>
            </div>
            <p className="font-serif text-base sm:text-lg text-bone italic leading-relaxed">
              “{reading.interpretation.reflectionPrompt}”
            </p>
          </section>

          {/* Section 4: Carry This With You (Practical Takeaway) */}
          <section className="p-6 rounded-xl bg-surface border border-border-highlight space-y-2" aria-labelledby="carry-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-light">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="carry-heading" className="font-semibold">
                CARRY THIS WITH YOU
              </h3>
            </div>
            <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
              {reading.interpretation.practicalTakeaway}
            </p>
          </section>

          {/* Save to Grimoire Action Bar */}
          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="font-serif text-base font-semibold text-bone">
                Archival Ledger
              </h4>
              <p className="text-xs text-bone-muted font-sans">
                Record this reading into your private Sanctum Grimoire for longitudinal reflection.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveToGrimoire}
              disabled={isSaved}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px] ${
                isSaved
                  ? "bg-surface-elevated text-lavender-light border border-border-highlight cursor-default"
                  : "bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender shadow-glow-subtle cursor-pointer"
              }`}
              aria-label={isSaved ? "Reading bound to your grimoire" : "Save reading to grimoire"}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-lavender-moon" />
                  <span>BOUND TO YOUR GRIMOIRE</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-lavender-moon" />
                  <span>SAVE TO GRIMOIRE</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Cross-Links & Navigation */}
      <div className="p-5 rounded-xl bg-surface/60 border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <Link
          href="/sanctum"
          className="inline-flex items-center gap-1.5 text-bone-muted hover:text-lavender-light transition-colors uppercase tracking-ceremonial"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sanctum Hub</span>
        </Link>
        <Link
          href="/sanctum/tarot/three-card"
          className="inline-flex items-center gap-1.5 text-lavender-moon hover:text-lavender-light transition-colors uppercase tracking-ceremonial font-semibold"
        >
          <span>Explore Three-Card Spread</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
