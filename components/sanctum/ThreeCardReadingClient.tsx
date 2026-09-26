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
import { SanctumCrest, MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { Compass, BookOpen, Check, RefreshCw, ArrowLeft, ArrowRight, HelpCircle, Printer, Sparkles } from "lucide-react";

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

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Optional User Question Console */}
      {!reading && (
        <section
          className="sanctum-panel sanctum-corners p-5 sm:p-6 border border-purple-900/60 space-y-3"
          aria-labelledby="triad-console-heading"
        >
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
            <h2
              id="triad-console-heading"
              className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300 flex items-center gap-2 font-bold"
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Optional Focal Question</span>
            </h2>
            <span className="text-[10px] font-mono uppercase text-purple-400/70">Console // 02</span>
          </div>

          <p className="text-xs text-bone-muted font-sans leading-relaxed">
            Name an acute dilemma, tension, or crossroad. The triad separates your ground (<span className="text-purple-300">Situation</span>), your friction point (<span className="text-purple-300">Challenge</span>), and your recommended leverage (<span className="text-purple-300">Guidance</span>).
          </p>

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isDrawing}
            placeholder="What circumstance or friction requires diagnostic clarity?"
            className="w-full px-4 py-3 rounded-lg bg-[#080312] border border-purple-900/80 focus:border-purple-400 focus:outline-none text-xs text-bone font-sans transition-colors placeholder:text-bone-dim"
          />

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5 items-center pt-1">
            <span className="text-[10px] font-mono text-purple-400/80 mr-1 uppercase">Sample Inquiries:</span>
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuestion(sq)}
                className="text-[10px] font-mono text-purple-200/80 hover:text-white bg-[#120722] hover:bg-[#1f0d38] px-2.5 py-1 rounded border border-purple-900/60 hover:border-purple-600 transition-colors"
              >
                “{sq}”
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active Question Banner (After Reveal) */}
      {reading && reading.question && (
        <div className="p-3.5 rounded-lg bg-[#0f0620] border border-purple-800/60 flex items-center gap-3 text-xs font-mono text-purple-200">
          <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="flex-1">
            <span className="text-purple-400 uppercase tracking-widest text-[9px] block">
              Focal Inquiry
            </span>
            <span className="text-sm font-serif italic text-bone">“{reading.question}”</span>
          </div>
        </div>
      )}

      {/* Triad Cards Altar Stage */}
      <section
        className="sanctum-panel sanctum-corners p-6 sm:p-8 border border-purple-900/60 space-y-6 relative overflow-hidden"
        aria-labelledby="triad-altar-heading"
      >
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            <h3
              id="triad-altar-heading"
              className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-bone to-purple-200"
            >
              The Triad Spread Altar
            </h3>
          </div>
          <MoonPhaseStrip />
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-items-center w-full">
          {THREE_CARD_POSITIONS.map((pos, idx) => {
            const isCardRevealed = revealedIndex >= idx;
            const currentCard = cards ? cards[idx] : null;

            return (
              <div
                key={pos.key}
                className="flex flex-col items-center text-center space-y-3 w-full min-w-0 max-w-[240px] mx-auto"
              >
                {/* Position Marker */}
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-purple-300 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Position {pos.numeral}: {pos.label}</span>
                </div>

                {/* Card Stage */}
                <div className="w-full flex justify-center transition-all duration-500 ease-out transform-gpu">
                  {isCardRevealed && currentCard ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-2 w-[200px] sm:w-[220px]">
                      <SanctumCardFace card={currentCard} size="default" />
                      <div className="w-full text-center px-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-purple-200 font-semibold block leading-tight break-words">
                          {currentCard.name} ({currentCard.numeral})
                        </span>
                      </div>
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

        {/* Trigger Button (if not yet revealed) */}
        {!reading && (
          <div className="pt-4 border-t border-purple-900/40 flex justify-center">
            <button
              type="button"
              onClick={handleDraw}
              disabled={isDrawing}
              className="py-3.5 px-8 rounded-xl sanctum-btn-electric font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FourPointStar className={`w-3.5 h-3.5 ${isDrawing ? "animate-spin" : ""}`} />
              <span>{isDrawing ? "INVOKING SPREAD..." : "LAY THE TRIAD SPREAD"}</span>
              <FourPointStar className={`w-3.5 h-3.5 ${isDrawing ? "animate-spin" : ""}`} />
            </button>
          </div>
        )}
      </section>

      {/* Synthesizing Status */}
      {isSynthesizing && (
        <div className="sanctum-panel p-8 text-center space-y-3 border border-purple-600/50 animate-pulse">
          <FourPointStar className="w-5 h-5 text-purple-400 animate-spin mx-auto" />
          <div className="font-mono text-xs uppercase tracking-widest text-purple-200 font-bold">
            THE ORACLE IS SYNTHESIZING YOUR SPREAD...
          </div>
          <p className="text-xs text-bone-muted font-serif italic">
            Connecting situation, friction, and guidance into an actionable pattern...
          </p>
        </div>
      )}

      {/* Triad Synthesis Parchment Document */}
      {reading && (
        <article className="sanctum-parchment rounded-xl p-6 sm:p-9 border border-purple-500/40 relative shadow-2xl space-y-8 animate-in fade-in duration-500">
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
              <span>TRIAD DIAGNOSTIC FOLIO</span>
              <div>
                {oracleSource === "oracle-ai" ? (
                  <span className="px-2 py-0.5 rounded bg-purple-900/60 border border-purple-400 text-purple-200 text-[9px] font-bold">
                    ✦ Oracle AI Synthesis
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-bone-dim text-[9px]">
                    Written Tradition
                  </span>
                )}
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200">
              Triad Inquest Synthesis
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
                <p className="text-xs text-bone-muted font-sans leading-relaxed">
                  {pos.contextualMeaning}
                </p>
              </div>
            ))}
          </div>

          {/* Combined Pattern */}
          <section className="space-y-1.5">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
              The Pattern & Arc
            </h4>
            <div className="p-4 rounded-lg bg-[#0e061c] border border-purple-900/50 text-xs sm:text-sm text-bone font-sans leading-relaxed">
              {reading.combinedSynthesis}
            </div>
          </section>

          {/* Consider & Carry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#110624] border border-purple-700/50 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold block">
                Consider
              </span>
              <p className="font-serif text-sm text-purple-100 italic leading-relaxed">
                “{reading.reflectionPrompt}”
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0b0416] border border-purple-900/50 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold block">
                Carry With You
              </span>
              <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
                {reading.practicalTakeaway}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
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
