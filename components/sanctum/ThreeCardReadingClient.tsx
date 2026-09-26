"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SanctumTarotCard } from "@/content/sanctum-tarot";
import {
  drawThreeUniqueCards,
  getCardPositionMeaning,
  generateOracleSynthesis,
  THREE_CARD_POSITIONS,
} from "@/lib/sanctum/three-card-engine";
import {
  SanctumThreeCardReading,
  saveReadingToGrimoire,
  getTodayLocalDateString,
} from "@/lib/sanctum/storage";
import { recordSanctumActivity } from "@/lib/sanctum/progression";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import { SanctumCardBack } from "@/components/sanctum/SanctumCardBack";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import { FourPointStar, CelestialDivider, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { Compass, BookOpen, Check, RefreshCw, ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";

export function ThreeCardReadingClient() {
  const [question, setQuestion] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState<number>(-1); // -1: none, 0: situation, 1: challenge, 2: all
  const [cards, setCards] = useState<[SanctumTarotCard, SanctumTarotCard, SanctumTarotCard] | null>(null);
  const [reading, setReading] = useState<SanctumThreeCardReading | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [oracleSource, setOracleSource] = useState<"oracle-ai" | "written-tradition">("written-tradition");
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  const sampleQuestions = [
    "What am I overlooking right now?",
    "What deserves my focused attention today?",
    "How can I approach this obstacle differently?",
  ];

  // Listen for tester data reset
  useEffect(() => {
    const handleReset = () => {
      setQuestion("");
      setCards(null);
      setReading(null);
      setRevealedIndex(-1);
      setIsSaved(false);
      setIsDrawing(false);
      setIsSynthesizing(false);
      setOracleSource("written-tradition");
      setFallbackNotice(null);
    };

    window.addEventListener("sanctum:daily-tarot-reset", handleReset);
    return () => window.removeEventListener("sanctum:daily-tarot-reset", handleReset);
  }, []);

  // Execute sequential ceremonial draw and Oracle synthesis
  const handleDraw = () => {
    if (isDrawing || isSynthesizing) return;

    setIsDrawing(true);
    recordSanctumTestEvent("three_card_started");
    setIsSynthesizing(false);
    setReading(null);
    setRevealedIndex(-1);
    setFallbackNotice(null);

    const drawnCards = drawThreeUniqueCards();
    setCards(drawnCards);

    const today = getTodayLocalDateString();
    const situationMeaning = getCardPositionMeaning(drawnCards[0], "situation");
    const challengeMeaning = getCardPositionMeaning(drawnCards[1], "challenge");
    const guidanceMeaning = getCardPositionMeaning(drawnCards[2], "guidance");
    const deterministicFallback = generateOracleSynthesis(drawnCards[0], drawnCards[1], drawnCards[2], question);

    // Sequential reveal cadence for cards
    setTimeout(() => setRevealedIndex(0), 400);
    setTimeout(() => setRevealedIndex(1), 850);
    setTimeout(async () => {
      setRevealedIndex(2);
      setIsDrawing(false);
      setIsSynthesizing(true);

      let finalPattern = deterministicFallback.pattern;
      let finalConsider = deterministicFallback.consider;
      let finalCarry = deterministicFallback.carryWithYou;
      let finalSource: "oracle-ai" | "written-tradition" = "written-tradition";
      let notice: string | null = null;

      try {
        const res = await fetch("/api/sanctum/oracle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "three-card",
            payload: {
              question: question.trim() || undefined,
              situation: {
                cardName: drawnCards[0].name,
                numeral: drawnCards[0].numeral,
                keywords: drawnCards[0].shortKeywords,
                contextualMeaning: situationMeaning,
              },
              challenge: {
                cardName: drawnCards[1].name,
                numeral: drawnCards[1].numeral,
                keywords: drawnCards[1].shortKeywords,
                contextualMeaning: challengeMeaning,
              },
              guidance: {
                cardName: drawnCards[2].name,
                numeral: drawnCards[2].numeral,
                keywords: drawnCards[2].shortKeywords,
                contextualMeaning: guidanceMeaning,
              },
            },
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            finalPattern = json.data.pattern;
            finalConsider = json.data.consider;
            finalCarry = json.data.carry;
            finalSource = json.meta?.source || "oracle-ai";
            if (json.meta?.fallback) {
              notice = "The Oracle returned to the written tradition for this reading.";
            }
          }
        } else {
          notice = "The Oracle returned to the written tradition for this reading.";
        }
      } catch (err) {
        notice = "The Oracle returned to the written tradition for this reading.";
      }

      setOracleSource(finalSource);
      setFallbackNotice(notice);

      const newReading: SanctumThreeCardReading = {
        id: `reading_three_card_${today}_${Date.now()}`,
        type: "three-card",
        timestamp: new Date().toISOString(),
        localDate: today,
        question: question.trim() || undefined,
        spreadName: "Three-Card Diagnostic Spread",
        positions: {
          situation: {
            positionKey: "situation",
            positionLabel: "Situation",
            positionQuestion: THREE_CARD_POSITIONS[0].inquiry,
            cardId: drawnCards[0].id,
            cardName: drawnCards[0].name,
            cardSlug: drawnCards[0].slug,
            cardNumber: drawnCards[0].number,
            cardNumeral: drawnCards[0].numeral,
            shortKeywords: drawnCards[0].shortKeywords,
            contextualMeaning: situationMeaning,
          },
          challenge: {
            positionKey: "challenge",
            positionLabel: "Challenge",
            positionQuestion: THREE_CARD_POSITIONS[1].inquiry,
            cardId: drawnCards[1].id,
            cardName: drawnCards[1].name,
            cardSlug: drawnCards[1].slug,
            cardNumber: drawnCards[1].number,
            cardNumeral: drawnCards[1].numeral,
            shortKeywords: drawnCards[1].shortKeywords,
            contextualMeaning: challengeMeaning,
          },
          guidance: {
            positionKey: "guidance",
            positionLabel: "Guidance",
            positionQuestion: THREE_CARD_POSITIONS[2].inquiry,
            cardId: drawnCards[2].id,
            cardName: drawnCards[2].name,
            cardSlug: drawnCards[2].slug,
            cardNumber: drawnCards[2].number,
            cardNumeral: drawnCards[2].numeral,
            shortKeywords: drawnCards[2].shortKeywords,
            contextualMeaning: guidanceMeaning,
          },
        },
        combinedSynthesis: finalPattern,
        reflectionPrompt: finalConsider,
        practicalTakeaway: finalCarry,
        savedToGrimoire: false,
      };

      setReading(newReading);
      recordSanctumTestEvent("three_card_completed");
      setIsSynthesizing(false);
      setIsSaved(false);

      recordSanctumActivity({
        type: "three-card",
        id: newReading.id,
        title: "Triad Spread",
      });
    }, 1300);
  };

  // Save completed reading to Grimoire archival ledger
  const handleSaveToGrimoire = () => {
    if (!reading) return;
    saveReadingToGrimoire(reading);
    recordSanctumTestEvent("three_card_saved");
    setIsSaved(true);
  };

  // Reset to begin another reading
  const handleBeginAnother = () => {
    setQuestion("");
    setCards(null);
    setReading(null);
    setRevealedIndex(-1);
    setIsSaved(false);
    setIsDrawing(false);
    setIsSynthesizing(false);
    setOracleSource("written-tradition");
    setFallbackNotice(null);
  };

  return (
    <div className="space-y-12">
      {/* Title & Context */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <Compass className="w-3.5 h-3.5" />
          <span>Diagnostic Triad Spread</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          {reading ? "TRIAD INQUEST COMPLETE" : "THREE-CARD READING"}
        </h1>

        <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
          Explore a question through Situation, Challenge, and Guidance. A grounded diagnostic triad to separate where you are, what friction exists, and where to apply clean effort.
        </p>

        <CelestialDivider className="max-w-xs mx-auto my-4" />
      </div>

      {/* Optional User Question Input (Visible before draw, summarized after) */}
      {!reading && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-surface/80 border border-border-highlight space-y-3 shadow-card-tarot">
          <div className="flex items-center justify-between">
            <label
              htmlFor="tarot-question-input"
              className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Optional Focal Question</span>
            </label>
            <span className="text-[10px] font-mono uppercase text-bone-dim">Optional</span>
          </div>

          <p className="text-xs text-bone-muted font-sans">
            Focus on an acute circumstance, dilemma, or internal friction. Do not ask for guaranteed future outcomes.
          </p>

          <input
            id="tarot-question-input"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isDrawing}
            placeholder="What would you like perspective on?"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border-highlight focus:border-lavender-moon focus:outline-none focus:ring-1 focus:ring-lavender-moon text-sm text-bone font-sans transition-colors placeholder:text-bone-dim"
          />

          {/* Quick Clickable Suggestions */}
          <div className="pt-1 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-mono text-bone-dim mr-1">Suggestions:</span>
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuestion(sq)}
                className="text-[11px] font-mono text-bone-muted hover:text-lavender-light hover:bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle transition-colors text-left"
              >
                “{sq}”
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Question Banner (After Reveal) */}
      {reading && reading.question && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-surface-elevated/70 border border-border-ornate flex items-center gap-3 text-xs font-mono text-bone-muted">
          <HelpCircle className="w-4 h-4 text-lavender-moon shrink-0" />
          <div>
            <span className="text-lavender-dim uppercase tracking-wider block text-[10px]">
              Inquiry Focus
            </span>
            <span className="text-sm font-serif italic text-bone">“{reading.question}”</span>
          </div>
        </div>
      )}

      {/* Cards Display Stage */}
      <div className="tarot-frame p-6 sm:p-10 shadow-card-tarot space-y-8 relative overflow-hidden">
        {/* Subtle decorative flourishes */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {THREE_CARD_POSITIONS.map((pos, idx) => {
            const isCardRevealed = revealedIndex >= idx;
            const currentCard = cards ? cards[idx] : null;

            return (
              <div
                key={pos.key}
                className="flex flex-col items-center text-center space-y-3 w-full max-w-[260px]"
              >
                {/* Position Marker */}
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
                  <span className="w-1.5 h-1.5 rounded-full bg-lavender-moon" />
                  <span>Position {pos.numeral}: {pos.label}</span>
                </div>

                {/* Card Stage with Flip Transition */}
                <div className="w-full flex justify-center transition-all duration-500 ease-out transform-gpu motion-reduce:transition-none">
                  {isCardRevealed && currentCard ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-2">
                      <SanctumCardFace card={currentCard} size="default" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-bone-dim">
                        {currentCard.name} ({currentCard.numeral})
                      </span>
                    </div>
                  ) : (
                    <SanctumCardBack
                      size="default"
                      label={pos.label}
                      sublabel={isDrawing ? "Shuffling..." : pos.inquiry}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Draw Action Controls */}
        {!reading && !isSynthesizing && (
          <div className="pt-6 border-t border-border-subtle flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleDraw}
              disabled={isDrawing || isSynthesizing}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover active:scale-[0.98] text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle hover:shadow-glow-purple transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
              aria-label="Shuffle and draw three cards"
            >
              <FourPointStar className={`w-3 h-3 text-lavender-moon ${isDrawing ? "animate-spin" : ""}`} />
              <span>{isDrawing ? "INVOKING TRIAD..." : "SHUFFLE & DRAW"}</span>
              <FourPointStar className={`w-3 h-3 text-lavender-moon ${isDrawing ? "animate-spin" : ""}`} />
            </button>

            <span className="text-[11px] font-mono text-bone-dim tracking-wider uppercase">
              Draws three unique cards with zero duplication
            </span>
          </div>
        )}

        {/* Oracle Synthesis In-Progress Status Banner */}
        {isSynthesizing && (
          <div className="pt-6 border-t border-border-subtle/80 flex flex-col items-center justify-center text-center space-y-2 py-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-lavender-moon font-mono text-xs uppercase tracking-ceremonial font-semibold">
              <FourPointStar className="w-3.5 h-3.5 animate-spin" />
              <span>THE ORACLE IS READING THE PATTERN...</span>
              <FourPointStar className="w-3.5 h-3.5 animate-spin" />
            </div>
            <p className="text-xs text-bone-dim font-serif italic">
              Following the threads across Situation, Challenge, and Guidance...
            </p>
          </div>
        )}
      </div>

      {/* Structured Reading Results (Appears after cards are revealed) */}
      {reading && cards && (
        <div className="space-y-10 animate-in fade-in duration-500">
          {/* Individual Position Meanings */}
          <div className="tarot-frame p-6 sm:p-10 shadow-card-tarot space-y-8">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>Diagnostic Breakdown</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide">
                Individual Position Meanings
              </h2>
            </div>

            <div className="space-y-6">
              {THREE_CARD_POSITIONS.map((pos) => {
                const posData = reading.positions[pos.key];
                return (
                  <div
                    key={pos.key}
                    className="p-5 rounded-xl bg-surface border border-border-subtle space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-lavender-moon font-semibold">
                          Position {pos.numeral}: {pos.label}
                        </span>
                        <span className="text-bone-dim text-xs">·</span>
                        <span className="font-serif text-sm font-bold text-bone">
                          {posData.cardName} ({posData.cardNumeral})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-lavender-light">
                        {posData.shortKeywords.map((kw, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-surface-elevated">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-mono text-bone-dim italic">
                      Inquiry: “{pos.inquiry}”
                    </p>

                    <p className="text-sm text-bone-muted font-sans leading-relaxed pt-1">
                      {posData.contextualMeaning}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dedicated Section: THE ORACLE'S READING */}
          <div className="tarot-frame p-6 sm:p-10 md:p-12 shadow-card-tarot space-y-10">
            <div className="border-b border-border-subtle pb-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <GrimoireStar className="w-3 h-3 text-lavender-moon" />
                <span>Synthesized Inquest</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone celestial-glow">
                THE ORACLE&apos;S READING
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <p className="text-xs text-bone-dim font-mono">
                  Holistic diagnostic synthesis of Situation + Challenge + Guidance
                </p>
                {oracleSource === "oracle-ai" ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-surface border border-border-ornate/80 text-[10px] font-mono uppercase tracking-wider text-lavender-moon flex items-center gap-1 font-semibold">
                    <FourPointStar className="w-2.5 h-2.5 text-lavender-moon" />
                    <span>Oracle AI Synthesis</span>
                  </span>
                ) : (
                  fallbackNotice && (
                    <span className="text-[11px] font-serif italic text-bone-dim">
                      {fallbackNotice}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Subsection 1: THE PATTERN */}
            <section className="space-y-3" aria-labelledby="the-pattern-heading">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
                <FourPointStar className="w-2.5 h-2.5" />
                <h3 id="the-pattern-heading" className="font-semibold">
                  THE PATTERN
                </h3>
              </div>
              <p className="text-sm sm:text-base text-bone font-serif leading-relaxed italic">
                {reading.combinedSynthesis}
              </p>
            </section>

            {/* Subsection 2: CONSIDER */}
            <section
              className="p-6 rounded-xl bg-surface-elevated/70 border border-border-ornate space-y-2 shadow-subtle"
              aria-labelledby="triad-consider-heading"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
                <FourPointStar className="w-2.5 h-2.5" />
                <h3 id="triad-consider-heading" className="font-semibold">
                  CONSIDER
                </h3>
              </div>
              <p className="font-serif text-base sm:text-lg text-bone italic leading-relaxed">
                “{reading.reflectionPrompt}”
              </p>
            </section>

            {/* Subsection 3: CARRY THIS WITH YOU */}
            <section
              className="p-6 rounded-xl bg-surface border border-border-highlight space-y-2"
              aria-labelledby="triad-carry-heading"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-light">
                <FourPointStar className="w-2.5 h-2.5" />
                <h3 id="triad-carry-heading" className="font-semibold">
                  CARRY THIS WITH YOU
                </h3>
              </div>
              <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
                {reading.practicalTakeaway}
              </p>
            </section>

            {/* Save to Grimoire & Begin Another Reading Bar */}
            <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
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

              <button
                type="button"
                onClick={handleBeginAnother}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface hover:bg-surface-elevated text-bone-muted hover:text-bone border border-border-subtle hover:border-border-highlight text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px]"
              >
                <RefreshCw className="w-3.5 h-3.5 text-lavender-dim" />
                <span>BEGIN ANOTHER READING</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Links */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <Link
          href="/sanctum/tarot"
          className="inline-flex items-center gap-1.5 text-bone-muted hover:text-lavender-light transition-colors uppercase tracking-ceremonial"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Single Daily Tarot Draw</span>
        </Link>
        <Link
          href="/sanctum/grimoire"
          className="inline-flex items-center gap-1.5 text-lavender-moon hover:text-lavender-light transition-colors uppercase tracking-ceremonial font-semibold"
        >
          <span>View My Grimoire</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
