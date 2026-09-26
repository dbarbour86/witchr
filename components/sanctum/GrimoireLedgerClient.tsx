"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  SanctumGrimoireReading,
  SanctumDailyReading,
  SanctumThreeCardReading,
  SanctumWorkingRecord,
  getGrimoireEntries,
  deleteGrimoireEntry,
  clearGrimoire,
} from "@/lib/sanctum/storage";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import { SanctumTarotCard, getSanctumTarotCardById } from "@/content/sanctum-tarot";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import {
  FourPointStar,
  CelestialDivider,
  GrimoireStar,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import { SanctumCrest, MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { SanctumMarksSection } from "@/components/sanctum/SanctumMarksSection";
import {
  BookOpen,
  Sparkles,
  Compass,
  Wand2,
  Trash2,
  ExternalLink,
  X,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Printer,
  Calendar,
} from "lucide-react";

export function GrimoireLedgerClient() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<SanctumGrimoireReading[]>([]);
  const [filter, setFilter] = useState<"ALL" | "TAROT" | "WORKINGS">("ALL");

  // Modal / Detail state
  const [activeEntry, setActiveEntry] = useState<SanctumGrimoireReading | null>(null);

  // Deletion confirmations
  const [entryToDelete, setEntryToDelete] = useState<SanctumGrimoireReading | null>(null);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  // Hydration-safe initial load, Escape key accessibility listener, and tester reset listener
  useEffect(() => {
    setMounted(true);
    setEntries(getGrimoireEntries());
    recordSanctumTestEvent("grimoire_opened");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveEntry(null);
        setEntryToDelete(null);
        setShowPurgeModal(false);
      }
    };

    const handleUpdate = () => {
      setEntries(getGrimoireEntries());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("sanctum:grimoire-updated", handleUpdate);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("sanctum:grimoire-updated", handleUpdate);
    };
  }, []);

  const refreshEntries = () => {
    setEntries(getGrimoireEntries());
  };

  // Filtered list
  const filteredEntries = entries.filter((item) => {
    if (filter === "TAROT") return item.type === "daily" || item.type === "three-card";
    if (filter === "WORKINGS") return item.type === "working";
    return true;
  });

  // Calculate statistics
  const tarotCount = entries.filter((e) => e.type === "daily" || e.type === "three-card").length;
  const workingsCount = entries.filter((e) => e.type === "working").length;
  const totalCount = entries.length;

  // Confirm and execute single entry deletion
  const handleConfirmDelete = () => {
    if (!entryToDelete) return;
    deleteGrimoireEntry(entryToDelete.id);
    if (activeEntry?.id === entryToDelete.id) {
      setActiveEntry(null);
    }
    setEntryToDelete(null);
    refreshEntries();
  };

  // Confirm and execute full ledger purge
  const handleConfirmPurge = () => {
    clearGrimoire();
    setActiveEntry(null);
    setShowPurgeModal(false);
    refreshEntries();
  };

  const handlePrintModal = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!mounted) {
    return (
      <div className="text-center py-20 text-purple-300 font-mono text-xs">
        <FourPointStar className="w-5 h-5 text-purple-400 animate-spin mx-auto mb-3" />
        <span>Accessing Private Grimoire Archive...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Title & Archival Context */}
      <div className="sanctum-panel sanctum-corners p-6 sm:p-8 border border-purple-900/60 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#130728] border border-purple-800/60 text-purple-300 text-[10px] font-mono uppercase tracking-[0.24em]">
            <BookOpen className="w-3 h-3 text-purple-400" />
            <span>Private Sanctum Archive</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            My Grimoire Ledger
          </h1>

          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed max-w-xl">
            Your private occult archive within the Sanctum. Saved daily tarot reflections, three-card diagnostic spreads, and synthesized workings are preserved here for longitudinal study.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#0b0416] border border-purple-900/60 text-center shrink-0">
          <SanctumCrest className="w-12 h-12 mb-1" />
          <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase">
            VAULT ACTIVE
          </span>
        </div>
      </div>

      {/* Sanctum Progression & Marks Section */}
      <SanctumMarksSection />

      {/* Grimoire Archival Records Filter & Grid */}
      <div className="space-y-6 pt-4">
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090314] border border-purple-900/50">
          {/* Subtle Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-purple-300/80">
            <span className="flex items-center gap-1.5">
              <span className="text-purple-200 font-bold text-sm">{totalCount}</span>
              <span>Total Entries</span>
            </span>
            <span className="text-purple-700">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-purple-200 font-bold">{tarotCount}</span>
              <span>Tarot</span>
            </span>
            <span className="text-purple-700">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-purple-200 font-bold">{workingsCount}</span>
              <span>Workings</span>
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 bg-[#0e071c] p-1 rounded-lg border border-purple-900/60" role="tablist">
            {(["ALL", "TAROT", "WORKINGS"] as const).map((tab) => {
              const isActive = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-purple-900/80 text-white border border-purple-500 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                      : "text-purple-300/70 hover:text-white"
                  }`}
                >
                  {tab === "ALL" && `All (${totalCount})`}
                  {tab === "TAROT" && `Tarot (${tarotCount})`}
                  {tab === "WORKINGS" && `Workings (${workingsCount})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State Presentation */}
        {filteredEntries.length === 0 && (
          <div className="sanctum-panel sanctum-corners p-8 sm:p-14 text-center border border-purple-900/60 space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#130728] border border-purple-700/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <BookOpen className="w-8 h-8 text-purple-300" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-bone">
                {totalCount === 0 ? "Your Ledger is Empty" : "No Entries in this Category"}
              </h3>
              <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
                {totalCount === 0
                  ? "Saved daily tarot readings, diagnostic spreads, and customized workings will be recorded here once you perform active inquests in the Sanctum."
                  : `You currently have no saved ${filter.toLowerCase()} records. Select another category or perform a new working.`}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/sanctum/tarot"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Draw a Daily Card</span>
              </Link>
              <Link
                href="/sanctum/tarot/three-card"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#140826] hover:bg-[#1f0d38] text-purple-200 border border-purple-800 text-xs font-mono uppercase tracking-wider"
              >
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Three-Card Reading</span>
              </Link>
              <Link
                href="/sanctum/working"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#140826] hover:bg-[#1f0d38] text-purple-200 border border-purple-800 text-xs font-mono uppercase tracking-wider"
              >
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Create a Working</span>
              </Link>
            </div>
          </div>
        )}

        {/* Archive Entries Grid */}
        {filteredEntries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntries.map((entry) => {
              if (entry.type === "daily") {
                const d = entry as SanctumDailyReading;
                return (
                  <article
                    key={d.id}
                    className="sanctum-panel sanctum-corners p-6 flex flex-col justify-between hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-200 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-purple-300">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span>Daily Tarot</span>
                        </span>
                        <span className="text-purple-400/80">{d.localDate}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-bone group-hover:text-purple-200 transition-colors uppercase tracking-wide">
                        {d.cardName} — {d.cardNumeral}
                      </h3>

                      <div className="flex flex-wrap gap-1 text-[9px] font-mono text-purple-300/80">
                        {d.shortKeywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#130728] border border-purple-900/60">
                            {kw}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-bone-muted font-sans line-clamp-3 leading-relaxed pt-1">
                        {d.interpretation.whatThisMayReflectToday}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveEntry(d)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEntryToDelete(d)}
                        className="p-1.5 rounded hover:bg-purple-950/60 text-purple-400/60 hover:text-red-400 transition-colors"
                        aria-label={`Remove ${d.cardName} from grimoire`}
                        title="Remove from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              }

              if (entry.type === "three-card") {
                const tc = entry as SanctumThreeCardReading;
                return (
                  <article
                    key={tc.id}
                    className="sanctum-panel sanctum-corners p-6 flex flex-col justify-between hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-200 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-purple-300">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Compass className="w-3 h-3 text-purple-400" />
                          <span>Triad Spread</span>
                        </span>
                        <span className="text-purple-400/80">{tc.localDate}</span>
                      </div>

                      {tc.question && (
                        <p className="text-xs font-serif italic text-purple-200 line-clamp-1">
                          “{tc.question}”
                        </p>
                      )}

                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-purple-400/80">I. Situation:</span>
                          <span className="font-semibold text-bone">
                            {tc.positions.situation.cardName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-purple-400/80">II. Challenge:</span>
                          <span className="font-semibold text-bone">
                            {tc.positions.challenge.cardName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-purple-400/80">III. Guidance:</span>
                          <span className="font-semibold text-bone">
                            {tc.positions.guidance.cardName}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-bone-muted font-sans line-clamp-2 leading-relaxed pt-1">
                        {tc.combinedSynthesis}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveEntry(tc)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEntryToDelete(tc)}
                        className="p-1.5 rounded hover:bg-purple-950/60 text-purple-400/60 hover:text-red-400 transition-colors"
                        aria-label="Remove three-card reading from grimoire"
                        title="Remove from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              }

              if (entry.type === "working") {
                const w = entry as SanctumWorkingRecord;
                return (
                  <article
                    key={w.id}
                    className="sanctum-panel sanctum-corners p-6 flex flex-col justify-between hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-200 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-purple-300">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Wand2 className="w-3 h-3 text-purple-400" />
                          <span>Working</span>
                        </span>
                        <span className="text-purple-400/80">{w.localDate}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-bone group-hover:text-purple-200 transition-colors line-clamp-1 uppercase">
                        {w.title}
                      </h3>

                      <div className="text-[11px] font-mono text-purple-300/80">
                        <span>Focus: </span>
                        <span className="text-purple-100 font-medium">{w.intention}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 text-[9px] font-mono text-purple-300/80">
                        {w.usedIngredients.map((item, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#130728] border border-purple-900/60">
                            ✓ {item}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-bone-muted font-sans line-clamp-2 leading-relaxed pt-1">
                        {w.practicalTakeaway || w.intentionDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveEntry(w)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEntryToDelete(w)}
                        className="p-1.5 rounded hover:bg-purple-950/60 text-purple-400/60 hover:text-red-400 transition-colors"
                        aria-label={`Remove ${w.title} from grimoire`}
                        title="Remove from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              }

              return null;
            })}
          </div>
        )}

        {/* Destructive Purge Section & Privacy Notice */}
        <div className="mt-14 pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300/70">
          <div className="text-center sm:text-left space-y-1">
            <p className="flex items-center gap-1.5 justify-center sm:justify-start">
              <FourPointStar className="w-3 h-3 text-purple-400" />
              <span>Local Storage Notice: Your saved Grimoire entries are stored in this browser.</span>
            </p>
            <p className="text-[11px] text-purple-400/60">
              When consulting the Oracle, only active card or working parameters are sent securely for interpretation. Clearing browser data will erase this ledger.
            </p>
          </div>

          {totalCount > 0 && (
            <button
              type="button"
              onClick={() => setShowPurgeModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-purple-900/60 hover:border-red-600 text-purple-300 hover:text-red-400 text-[11px] uppercase tracking-wider transition-colors shrink-0"
            >
              <Trash2 className="w-3 h-3" />
              <span>Purge Grimoire</span>
            </button>
          )}
        </div>
      </div>

      {/* MODAL: Full Entry Detail View (Occult Folio Parchment) */}
      {activeEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-entry-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveEntry(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sanctum-parchment border border-purple-500/60 p-6 sm:p-10 shadow-2xl space-y-8 relative">
            {/* Ornate Corner Flourishes */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-60">
              <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none opacity-60 rotate-90">
              <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveEntry(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-950/60 border border-transparent hover:border-purple-800 transition-colors"
              aria-label="Close entry modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* DAILY TAROT ENTRY DETAIL */}
            {activeEntry.type === "daily" && (() => {
              const d = activeEntry as SanctumDailyReading;
              const cardData = getSanctumTarotCardById(d.cardId);

              return (
                <div className="space-y-6">
                  <header className="border-b border-purple-900/40 pb-5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-purple-300">
                      <span>DAILY MIRROR INQUEST</span>
                      <span>RECORD DATE: {d.localDate}</span>
                    </div>

                    <h2
                      id="modal-entry-title"
                      className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                    >
                      {d.cardName} — {d.cardNumeral}
                    </h2>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {d.shortKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#130728] border border-purple-700/60 text-[10px] font-mono uppercase tracking-wider text-purple-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </header>

                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {cardData && (
                      <div className="shrink-0 flex justify-center">
                        <SanctumCardFace card={cardData} size="default" />
                      </div>
                    )}

                    <div className="space-y-4 flex-1 text-xs">
                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold mb-1">
                          Traditional Archetype
                        </h4>
                        <p className="text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3 rounded-lg border border-purple-900/40">
                          {d.interpretation.theCard}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold mb-1">
                          Reflective Guidance
                        </h4>
                        <p className="text-bone font-sans leading-relaxed bg-[#0c051a] p-3 rounded-lg border border-purple-900/40">
                          {d.interpretation.whatThisMayReflectToday}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#110624] border border-purple-700/50 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                      Daily Inquiry
                    </span>
                    <p className="font-serif text-sm text-purple-100 italic leading-relaxed">
                      “{d.interpretation.reflectionPrompt}”
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Practical Psychological Takeaway
                    </h4>
                    <p className="text-xs text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3 rounded-lg border border-purple-900/40">
                      {d.interpretation.practicalTakeaway}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* THREE-CARD ENTRY DETAIL */}
            {activeEntry.type === "three-card" && (() => {
              const tc = activeEntry as SanctumThreeCardReading;

              return (
                <div className="space-y-6">
                  <header className="border-b border-purple-900/40 pb-5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-purple-300">
                      <span>TRIAD SPREAD RECORD</span>
                      <span>RECORD DATE: {tc.localDate}</span>
                    </div>

                    <h2
                      id="modal-entry-title"
                      className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                    >
                      Three-Card Diagnostic Spread
                    </h2>

                    {tc.question && (
                      <p className="text-sm font-serif italic text-purple-200">
                        “{tc.question}”
                      </p>
                    )}
                  </header>

                  {/* 3 Positions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.values(tc.positions).map((pos) => (
                      <div
                        key={pos.positionKey}
                        className="p-3.5 rounded-lg bg-[#0b0416] border border-purple-900/50 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-purple-900/40 pb-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold">
                            {pos.positionLabel}
                          </span>
                          <span className="font-serif text-[10px] text-purple-200 font-semibold">
                            {pos.cardName}
                          </span>
                        </div>
                        <p className="text-bone-muted font-sans leading-relaxed text-[11px]">
                          {pos.contextualMeaning}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      The Synthesis Arc
                    </h4>
                    <p className="text-xs text-bone font-sans leading-relaxed bg-[#0c051a] p-3.5 rounded-lg border border-purple-900/40">
                      {tc.combinedSynthesis}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-[#110624] border border-purple-700/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Consider
                      </span>
                      <p className="font-serif text-xs text-purple-100 italic leading-relaxed">
                        “{tc.reflectionPrompt}”
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0b0416] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Carry With You
                      </span>
                      <p className="text-xs text-bone-muted font-sans leading-relaxed">
                        {tc.practicalTakeaway}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* WORKING ENTRY DETAIL */}
            {activeEntry.type === "working" && (() => {
              const w = activeEntry as SanctumWorkingRecord;

              return (
                <div className="space-y-6">
                  <header className="border-b border-purple-900/40 pb-5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-purple-300">
                      <span>SYNTHESIZED WORKING</span>
                      <span>RECORD DATE: {w.localDate}</span>
                    </div>

                    <h2
                      id="modal-entry-title"
                      className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                    >
                      {w.title}
                    </h2>

                    <p className="text-sm font-serif italic text-purple-200">
                      “{w.intentionDescription}”
                    </p>
                  </header>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Tools & Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {w.usedIngredients.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#130728] border border-purple-700/60 text-xs font-mono text-purple-100"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Symbolic Correspondences
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {w.ingredientReasons.map((wt, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#0c051a] border border-purple-900/50 space-y-1 text-xs"
                        >
                          <span className="font-serif font-bold text-purple-200 block">{wt.name}</span>
                          <p className="text-[11px] text-bone-muted font-sans">{wt.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Preparation
                    </h4>
                    <ol className="space-y-1 text-xs text-bone-muted font-sans">
                      {w.preparationSteps.map((prep, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-purple-400 font-semibold">{idx + 1}.</span>
                          <span>{prep}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Working Mechanics
                    </h4>
                    <div className="space-y-2">
                      {w.ritualSteps.map((step) => (
                        <div
                          key={step.step}
                          className="p-3 rounded-lg bg-[#0e061c] border border-purple-900/50 space-y-1 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-purple-950 border border-purple-500 text-purple-200 font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                              {step.step}
                            </span>
                            <span className="font-serif font-bold text-purple-100">{step.title}</span>
                          </div>
                          <p className="text-bone-muted font-sans pl-6">{step.instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                      Closing
                    </span>
                    <p className="text-bone-muted font-sans italic">{w.closing}</p>
                  </div>
                </div>
              );
            })()}

            {/* Modal Bottom Action Bar */}
            <div className="pt-6 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrintModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#140826] hover:bg-[#1f0d38] border border-purple-800 text-purple-200 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-purple-400" />
                <span>Print Record</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEntry(null)}
                className="px-5 py-2 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
              >
                Close Folio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Single Entry Deletion */}
      {entryToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0c0418] border border-red-900/80 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Confirm Entry Removal</span>
            </div>
            <p className="text-xs text-bone-muted font-sans leading-relaxed">
              Are you sure you wish to remove this record from your private browser grimoire? This action cannot be reversed.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEntryToDelete(null)}
                className="px-4 py-2 rounded-lg bg-[#140826] text-bone-muted hover:text-white text-xs font-mono uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-mono uppercase tracking-wider font-bold"
              >
                Remove Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Purge Entire Grimoire */}
      {showPurgeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0c0418] border border-red-900/80 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Purge Entire Local Ledger?</span>
            </div>
            <p className="text-xs text-bone-muted font-sans leading-relaxed">
              This will permanently erase all saved daily tarot draws, three-card readings, and synthesized workings stored in this browser. Sacred Marks earned will also be reset.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPurgeModal(false)}
                className="px-4 py-2 rounded-lg bg-[#140826] text-bone-muted hover:text-white text-xs font-mono uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPurge}
                className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-mono uppercase tracking-wider font-bold"
              >
                Purge All Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
