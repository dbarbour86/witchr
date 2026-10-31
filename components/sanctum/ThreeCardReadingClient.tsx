"use client";

import React, { useState, useEffect, useRef } from "react";
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
  isReadingSavedToGrimoire,
  getTodayLocalDateString,
} from "@/lib/sanctum/storage";
import { recordSanctumActivity } from "@/lib/sanctum/progression";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import { SanctumCardBack } from "@/components/sanctum/SanctumCardBack";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import { FourPointStar, CelestialDivider, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { SanctumCrest, MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { Compass, BookOpen, Check, RefreshCw, ArrowRight, Printer, Sparkles, Eye } from "lucide-react";

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

  const cardsSectionRef = useRef<HTMLElement>(null);
  const revealButtonRef = useRef<HTMLButtonElement>(null);
  const readButtonRef = useRef<HTMLButtonElement>(null);
  const readingResultRef = useRef<HTMLElement>(null);

  const sampleQuestions = [
    "What am I overlooking right now?",
    "What deserves my focused attention today?",
    "How can I approach this obstacle differently?",
  ];

  const isAllRevealed = revealedIndex >= 2;

  // Helper for checking user reduced-motion preference
  const prefersReducedMotion = () => {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  // Listen for tester data reset and Grimoire ledger updates
  useEffect(() => {
    const syncSavedStatus = () => {
      if (reading?.id) {
        setIsSaved(isReadingSavedToGrimoire(reading.id));
      }
    };

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
    window.addEventListener("sanctum:grimoire-updated", syncSavedStatus);
    window.addEventListener("focus", syncSavedStatus);
    return () => {
      window.removeEventListener("sanctum:daily-tarot-reset", handleReset);
      window.removeEventListener("sanctum:grimoire-updated", syncSavedStatus);
      window.removeEventListener("focus", syncSavedStatus);
    };
  }, [reading]);

  // Handler: "Continue to Cards ↓"
  const handleContinueToCards = () => {
    if (!cards) {
      const drawnCards = drawThreeUniqueCards();
      setCards(drawnCards);
      recordSanctumTestEvent("three_card_started");
    }

    const reduceMotion = prefersReducedMotion();

    cardsSectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    setTimeout(() => {
      if (isAllRevealed && readButtonRef.current) {
        readButtonRef.current.focus();
      } else if (revealButtonRef.current) {
        revealButtonRef.current.focus();
      } else if (cardsSectionRef.current) {
        cardsSectionRef.current.focus();
      }
    }, reduceMotion ? 40 : 350);
  };

  // Handler: Reveal all three cards
  const handleRevealAll = () => {
    if (isDrawing || isSynthesizing || reading) return;

    let currentCards = cards;
    if (!currentCards) {
      currentCards = drawThreeUniqueCards();
      setCards(currentCards);
      recordSanctumTestEvent("three_card_started");
    }

    const reduceMotion = prefersReducedMotion();

    if (reduceMotion) {
      setRevealedIndex(2);
      setTimeout(() => {
        readButtonRef.current?.focus();
      }, 50);
      return;
    }

    setIsDrawing(true);
    setRevealedIndex(0);
    setTimeout(() => {
      setRevealedIndex(1);
    }, 350);
    setTimeout(() => {
      setRevealedIndex(2);
      setIsDrawing(false);
      setTimeout(() => {
        readButtonRef.current?.focus();
      }, 100);
    }, 700);
  };

  // Handler: Tapping an individual card
  const handleCardClick = (idx: number) => {
    if (isDrawing || isSynthesizing || reading) return;

    let currentCards = cards;
    if (!currentCards) {
      currentCards = drawThreeUniqueCards();
      setCards(currentCards);
      recordSanctumTestEvent("three_card_started");
    }

    if (revealedIndex < idx) {
      setRevealedIndex(idx);
    }
  };

  // Handler: "Read My Cards" (Oracle synthesis)
  const handleReadMyCards = async () => {
    if (!cards || isSynthesizing || isDrawing) return;

    setIsSynthesizing(true);
    setFallbackNotice(null);

    const today = getTodayLocalDateString();
    const situationMeaning = getCardPositionMeaning(cards[0], "situation");
    const challengeMeaning = getCardPositionMeaning(cards[1], "challenge");
    const guidanceMeaning = getCardPositionMeaning(cards[2], "guidance");
    const deterministicFallback = generateOracleSynthesis(cards[0], cards[1], cards[2], question);

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
              cardName: cards[0].name,
              numeral: cards[0].numeral,
              keywords: cards[0].shortKeywords,
              contextualMeaning: situationMeaning,
            },
            challenge: {
              cardName: cards[1].name,
              numeral: cards[1].numeral,
              keywords: cards[1].shortKeywords,
              contextualMeaning: challengeMeaning,
            },
            guidance: {
              cardName: cards[2].name,
              numeral: cards[2].numeral,
              keywords: cards[2].shortKeywords,
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
            notice = "Using rule-based synthesis because the Oracle is temporarily unavailable.";
          }
        }
      } else {
        notice = "Using rule-based synthesis because the Oracle is temporarily unavailable.";
      }
    } catch {
      notice = "Using rule-based synthesis because the Oracle is temporarily unavailable.";
    }

    setOracleSource(finalSource);
    setFallbackNotice(notice);

    const newReading: SanctumThreeCardReading = {
      id: `reading_three_card_${today}_${Date.now()}`,
      type: "three-card",
      timestamp: new Date().toISOString(),
      localDate: today,
      question: question.trim() || undefined,
      spreadName: "Three-Card Reading",
      positions: {
        situation: {
          positionKey: "situation",
          positionLabel: "Situation",
          positionQuestion: THREE_CARD_POSITIONS[0].inquiry,
          cardId: cards[0].id,
          cardName: cards[0].name,
          cardSlug: cards[0].slug,
          cardNumber: cards[0].number,
          cardNumeral: cards[0].numeral,
          shortKeywords: cards[0].shortKeywords,
          contextualMeaning: situationMeaning,
        },
        challenge: {
          positionKey: "challenge",
          positionLabel: "Challenge",
          positionQuestion: THREE_CARD_POSITIONS[1].inquiry,
          cardId: cards[1].id,
          cardName: cards[1].name,
          cardSlug: cards[1].slug,
          cardNumber: cards[1].number,
          cardNumeral: cards[1].numeral,
          shortKeywords: cards[1].shortKeywords,
          contextualMeaning: challengeMeaning,
        },
        guidance: {
          positionKey: "guidance",
          positionLabel: "Guidance",
          positionQuestion: THREE_CARD_POSITIONS[2].inquiry,
          cardId: cards[2].id,
          cardName: cards[2].name,
          cardSlug: cards[2].slug,
          cardNumber: cards[2].number,
          cardNumeral: cards[2].numeral,
          shortKeywords: cards[2].shortKeywords,
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
      title: "Three-Card Reading",
    });

    const reduceMotion = prefersReducedMotion();

    setTimeout(() => {
      readingResultRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 120);
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

    const reduceMotion = prefersReducedMotion();

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Question Section */}
      {!reading && (
        <section
          className="sanctum-panel sanctum-corners p-6 sm:p-8 border border-purple-900/60 space-y-5"
          aria-labelledby="three-card-question-heading"
        >
          {/* Prominent pale-lavender serif heading matching mockup */}
          <div className="space-y-2">
            <h2
              id="three-card-question-heading"
              className="text-2xl sm:text-[30px] font-['Georgia',serif] font-normal text-[#e2d9f3] tracking-wide leading-snug sm:leading-tight"
            >
              What would you like guidance on?
            </h2>
            <div className="space-y-0.5 text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
              <p>Ask a question, or continue for a general reading.</p>
              <p>Explore your situation, what’s challenging you, and a possible way forward.</p>
            </div>
          </div>

          {/* Question Textarea (2 lines tall with character limit counter) */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                id="three-card-question-input"
                rows={2}
                maxLength={280}
                value={question}
                onChange={(e) => setQuestion(e.target.value.slice(0, 280))}
                disabled={isDrawing || isSynthesizing}
                placeholder="What should I focus on right now?"
                className="w-full px-4 py-3 pr-16 rounded-xl bg-[#080312]/90 border border-purple-900/80 focus:border-purple-400 focus-visible:ring-2 focus-visible:ring-purple-400 focus:outline-none text-xs sm:text-sm text-bone font-sans transition-colors placeholder:text-purple-300/40 resize-none leading-relaxed"
                aria-label="What would you like guidance on?"
              />
              <span className="absolute right-3.5 bottom-3 text-[10px] font-mono text-purple-400/60 pointer-events-none">
                {question.length}/280
              </span>
            </div>

            {/* Example Inquiries Chips matching mockup */}
            <div className="flex flex-wrap gap-2 items-center pt-0.5 text-[11px] font-sans">
              <span className="text-[10px] font-mono text-purple-400/80 tracking-wider uppercase">EXAMPLE QUESTIONS:</span>
              {sampleQuestions.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuestion(sq)}
                  disabled={isDrawing || isSynthesizing}
                  className="text-[11px] font-sans text-purple-200/90 hover:text-white bg-[#120722] hover:bg-[#1f0d38] px-3 py-1 rounded-md border border-purple-900/60 hover:border-purple-600 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none disabled:opacity-50"
                >
                  “{sq}”
                </button>
              ))}
            </div>
          </div>

          {/* Prominent Continue Button directly beneath the question */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleContinueToCards}
              className="w-full sm:w-auto py-3 px-7 rounded-xl bg-purple-700 hover:bg-purple-600 active:bg-purple-800 border border-purple-400/70 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none inline-flex items-center justify-center cursor-pointer shrink-0"
            >
              CONTINUE TO CARDS ↓
            </button>
          </div>
        </section>
      )}

      {/* Active Question Banner (After Reading) */}
      {reading && reading.question && (
        <div className="p-3.5 rounded-lg bg-[#0f0620] border border-purple-800/60 flex items-center gap-3 text-xs font-mono text-purple-200">
          <div className="flex-1">
            <span className="text-purple-400 uppercase tracking-widest text-[9px] block">
              Your Question
            </span>
            <span className="text-sm font-sans italic text-bone">“{reading.question}”</span>
          </div>
        </div>
      )}

      {/* Three-Card Spread Section */}
      <section
        id="cards-section"
        ref={cardsSectionRef}
        tabIndex={-1}
        className="sanctum-panel sanctum-corners p-6 sm:p-8 border border-purple-900/60 space-y-6 relative overflow-hidden outline-none"
        aria-labelledby="three-card-spread-heading"
      >
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            <h3
              id="three-card-spread-heading"
              className="font-serif text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-bone to-purple-200"
            >
              THREE-CARD SPREAD
            </h3>
          </div>
          <MoonPhaseStrip />
        </div>

        {/* Clear instructions matching mockup */}
        <div className="text-left">
          <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed">
            Reveal all three cards, or tap each card individually.
          </p>
        </div>

        {/* Outlined Reveal Control & Next Action BEFORE the cards */}
        {!reading && (
          <div className="flex flex-col sm:flex-row items-start gap-3">
            {!isAllRevealed ? (
              <button
                ref={revealButtonRef}
                type="button"
                onClick={handleRevealAll}
                disabled={isDrawing || isSynthesizing}
                className="py-2.5 px-5 rounded-lg border border-purple-600/70 bg-[#140624]/70 hover:bg-purple-950 hover:border-purple-400 text-purple-200 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              >
                <Eye className={`w-3.5 h-3.5 text-purple-400 ${isDrawing ? "animate-pulse" : ""}`} />
                <span>{isDrawing ? "REVEALING CARDS..." : revealedIndex >= 0 ? "REVEAL REMAINING CARDS" : "REVEAL CARDS"}</span>
              </button>
            ) : (
              <button
                ref={readButtonRef}
                type="button"
                onClick={handleReadMyCards}
                disabled={isSynthesizing}
                aria-busy={isSynthesizing}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 border border-purple-300 text-white font-mono text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-[0_0_22px_rgba(168,85,247,0.45)] focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              >
                <Sparkles className={`w-4 h-4 text-purple-200 ${isSynthesizing ? "animate-spin" : ""}`} />
                <span>{isSynthesizing ? "READING YOUR CARDS..." : "READ MY CARDS →"}</span>
              </button>
            )}
          </div>
        )}

        {/* 3-Card Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start justify-items-center w-full pt-1">
          {THREE_CARD_POSITIONS.map((pos, idx) => {
            const isCardRevealed = revealedIndex >= idx;
            const currentCard = cards ? cards[idx] : null;

            return (
              <div
                key={pos.key}
                className="flex flex-col items-center text-center space-y-3 w-full min-w-0 max-w-[240px] mx-auto"
              >
                {/* Card Stage */}
                <div className="w-full flex justify-center transition-all duration-500 ease-out transform-gpu">
                  {isCardRevealed && currentCard ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-2.5 w-[200px] sm:w-[220px]">
                      <SanctumCardFace card={currentCard} size="default" />
                      <div className="w-full text-center px-1 space-y-0.5">
                        <span className="font-serif text-sm font-semibold text-bone tracking-wide uppercase block">
                          {pos.label}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 block truncate leading-tight">
                          {currentCard.name} ({currentCard.numeral})
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCardClick(idx)}
                      disabled={isDrawing || isSynthesizing}
                      aria-label={`Reveal Card: ${pos.label}`}
                      className="group cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.99]"
                    >
                      <SanctumCardBack
                        size="default"
                        label={pos.label.toUpperCase()}
                        sublabel="TAP TO REVEAL"
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent Next Action Below the cards when all 3 are revealed */}
        {!reading && isAllRevealed && (
          <div className="pt-4 border-t border-purple-900/40 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleReadMyCards}
              disabled={isSynthesizing}
              aria-busy={isSynthesizing}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 border border-purple-300 text-white font-mono text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-[0_0_22px_rgba(168,85,247,0.45)] focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
            >
              <Sparkles className={`w-4 h-4 text-purple-200 ${isSynthesizing ? "animate-spin" : ""}`} />
              <span>{isSynthesizing ? "READING YOUR CARDS..." : "READ MY CARDS →"}</span>
            </button>
            <span className="text-[11px] font-sans text-purple-300/80">
              Synthesizes your Situation, Challenge, and Guidance into an actionable reading.
            </span>
          </div>
        )}
      </section>

      {/* Synthesizing Status */}
      {isSynthesizing && (
        <div
          role="status"
          aria-live="polite"
          className="sanctum-panel p-8 text-center space-y-3 border border-purple-600/50 animate-pulse"
        >
          <FourPointStar className="w-5 h-5 text-purple-400 animate-spin mx-auto" />
          <div className="font-mono text-xs uppercase tracking-widest text-purple-200 font-bold">
            READING YOUR CARDS...
          </div>
          <p className="text-xs text-bone-muted font-sans italic">
            Connecting Situation, Challenge, and Guidance into an actionable reading...
          </p>
        </div>
      )}

      {/* Triad Synthesis Parchment Document */}
      {reading && (
        <article
          ref={readingResultRef}
          className="sanctum-parchment rounded-xl p-6 sm:p-9 border border-purple-500/40 relative shadow-2xl space-y-8 animate-in fade-in duration-500"
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

          <header className="border-b border-purple-900/40 pb-5 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300">
              <span>Three-Card Reading</span>
              <div>
                {oracleSource === "oracle-ai" ? (
                  <span className="px-2 py-0.5 rounded bg-purple-900/60 border border-purple-400 text-purple-200 text-[9px] font-bold">
                    ✦ Oracle AI Synthesis
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-bone-dim text-[9px]">
                    Rule-Based Synthesis
                  </span>
                )}
              </div>
            </div>

            {fallbackNotice && (
              <div className="p-3 rounded-lg bg-[#140826] border border-purple-800/60 text-xs text-purple-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{fallbackNotice}</span>
              </div>
            )}

            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200">
              Your Three-Card Reading
            </h2>
          </header>

          {/* 3 Positions Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(reading.positions).map((pos) => (
              <div
                key={pos.positionKey}
                className="p-4 rounded-lg bg-[#0b0416] border border-purple-900/50 space-y-2"
              >
                <div className="flex items-center justify-between border-b border-purple-900/40 pb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">
                    {pos.positionLabel}
                  </span>
                  <span className="text-[10px] font-serif text-purple-200 font-semibold">
                    {pos.cardName}
                  </span>
                </div>
                <p className="text-xs text-bone font-sans leading-relaxed">
                  {pos.contextualMeaning}
                </p>
              </div>
            ))}
          </div>

          {/* Combined Pattern */}
          <section className="space-y-1.5">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
              How These Cards Connect
            </h4>
            <div className="p-4 rounded-lg bg-[#0e061c] border border-purple-900/50 text-xs sm:text-sm text-bone font-sans leading-relaxed">
              {reading.combinedSynthesis}
            </div>
          </section>

          {/* Consider & Carry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#110624] border border-purple-700/50 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold block">
                To Consider
              </span>
              <p className="font-sans text-sm text-purple-100 italic leading-relaxed">
                “{reading.reflectionPrompt}”
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0b0416] border border-purple-900/50 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold block">
                Action for Today
              </span>
              <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed">
                {reading.practicalTakeaway}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-5 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3 print:hidden">
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
                <span>Print Reading</span>
              </button>

              <button
                type="button"
                onClick={handleBeginAnother}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#120722] hover:bg-[#1c0c36] border border-purple-900/60 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                <span>Lay Another Spread</span>
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
