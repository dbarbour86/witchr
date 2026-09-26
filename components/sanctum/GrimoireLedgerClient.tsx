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
  HelpCircle,
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

  if (!mounted) {
    return (
      <div className="text-center py-20 text-bone-muted font-mono text-xs">
        <FourPointStar className="w-4 h-4 text-lavender-moon animate-spin mx-auto mb-3" />
        <span>Accessing Private Grimoire Ledger...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Title & Context */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Archival Ledger</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          MY GRIMOIRE
        </h1>

        <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
          Your private record within the Sanctum. Saved daily tarot reflections, three-card diagnostic spreads, and synthesized workings are archived here for longitudinal study.
        </p>

        <CelestialDivider className="max-w-xs mx-auto my-4" />
      </div>

      {/* Sanctum Progression & Marks */}
      <SanctumMarksSection />

      {/* Grimoire Archival Records */}
      <div className="pt-6 border-t border-border-subtle/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-bone tracking-wide">
              SAVED RECORDS & READINGS
            </h2>
            <p className="text-xs text-bone-muted font-sans mt-0.5">
              Individual divination archives and synthesized workings stored in this browser.
            </p>
          </div>
        </div>

        {/* Stats Summary & Filter Tabs Bar (Shown when entries exist) */}
        {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface/80 border border-border-subtle">
          {/* Subtle Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-bone-dim">
            <span className="flex items-center gap-1.5">
              <span className="text-lavender-light font-semibold">{totalCount}</span>
              <span>Total Entries</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-lavender-moon font-semibold">{tarotCount}</span>
              <span>Tarot</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-lavender-moon font-semibold">{workingsCount}</span>
              <span>Workings</span>
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 bg-background p-1 rounded-lg border border-border-highlight" role="tablist">
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
                      ? "bg-surface-elevated text-lavender-light border border-border-ornate shadow-subtle font-semibold"
                      : "text-bone-muted hover:text-bone"
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
      )}

      {/* Empty State Presentation */}
      {filteredEntries.length === 0 && (
        <div className="tarot-frame p-8 sm:p-14 text-center shadow-card-tarot space-y-6 relative overflow-hidden">
          <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>
          <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-surface-elevated border border-border-ornate/60 flex items-center justify-center shadow-glow-subtle">
            <BookOpen className="w-8 h-8 text-lavender-dim" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-serif text-2xl font-semibold text-bone">
              {totalCount === 0 ? "Your Ledger is Empty" : "No Entries in this Category"}
            </h2>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              {totalCount === 0
                ? "Saved daily tarot readings, diagnostic spreads, and customized workings will be recorded here once you perform active inquests in the Sanctum."
                : `You currently have no saved ${filter.toLowerCase()} records. Select another category or perform a new working.`}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sanctum/tarot"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-moon" />
              <span>DRAW A DAILY CARD</span>
            </Link>
            <Link
              href="/sanctum/tarot/three-card"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface hover:bg-surface-elevated text-bone-muted hover:text-bone border border-border-subtle hover:border-border-highlight text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px]"
            >
              <Compass className="w-3.5 h-3.5 text-lavender-dim" />
              <span>BEGIN A THREE-CARD READING</span>
            </Link>
            <Link
              href="/sanctum/working"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface hover:bg-surface-elevated text-bone-muted hover:text-bone border border-border-subtle hover:border-border-highlight text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px]"
            >
              <Wand2 className="w-3.5 h-3.5 text-lavender-dim" />
              <span>CREATE A WORKING</span>
            </Link>
          </div>
        </div>
      )}

      {/* Archive Entries Grid (Newest First) */}
      {filteredEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => {
            if (entry.type === "daily") {
              const d = entry as SanctumDailyReading;
              return (
                <article
                  key={d.id}
                  className="tarot-frame p-6 flex flex-col justify-between hover:border-lavender-moon/60 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-lavender-moon" />
                        <span>Daily Tarot</span>
                      </span>
                      <span className="text-bone-dim">{d.localDate}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                      {d.cardName} — {d.cardNumeral}
                    </h3>

                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-lavender-dim">
                      {d.shortKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-surface border border-border-subtle">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-bone-muted font-sans line-clamp-3 leading-relaxed pt-1">
                      {d.interpretation.whatThisMayReflectToday}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveEntry(d)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-lavender-moon hover:text-lavender-light font-semibold transition-colors"
                    >
                      <span>Open Entry</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntryToDelete(d)}
                      className="p-1.5 rounded hover:bg-surface-elevated text-bone-dim hover:text-rust transition-colors"
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
                  className="tarot-frame p-6 flex flex-col justify-between hover:border-lavender-moon/60 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3 h-3 text-lavender-moon" />
                        <span>Three-Card Reading</span>
                      </span>
                      <span className="text-bone-dim">{tc.localDate}</span>
                    </div>

                    {tc.question && (
                      <p className="text-xs font-serif italic text-lavender-light line-clamp-1">
                        “{tc.question}”
                      </p>
                    )}

                    <div className="space-y-1 text-xs font-mono text-bone">
                      <div className="flex items-center justify-between">
                        <span className="text-bone-dim">I. Situation:</span>
                        <span className="font-semibold text-lavender-light">
                          {tc.positions.situation.cardName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-bone-dim">II. Challenge:</span>
                        <span className="font-semibold text-lavender-light">
                          {tc.positions.challenge.cardName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-bone-dim">III. Guidance:</span>
                        <span className="font-semibold text-lavender-light">
                          {tc.positions.guidance.cardName}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-bone-muted font-sans line-clamp-2 leading-relaxed pt-1">
                      {tc.combinedSynthesis}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveEntry(tc)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-lavender-moon hover:text-lavender-light font-semibold transition-colors"
                    >
                      <span>Open Entry</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntryToDelete(tc)}
                      className="p-1.5 rounded hover:bg-surface-elevated text-bone-dim hover:text-rust transition-colors"
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
                  className="tarot-frame p-6 flex flex-col justify-between hover:border-lavender-moon/60 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                      <span className="flex items-center gap-1.5">
                        <Wand2 className="w-3 h-3 text-lavender-moon" />
                        <span>Working</span>
                      </span>
                      <span className="text-bone-dim">{w.localDate}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-bone group-hover:text-lavender-light transition-colors line-clamp-1">
                      {w.title}
                    </h3>

                    <div className="text-[11px] font-mono text-lavender-dim">
                      <span>Focus: </span>
                      <span className="text-bone font-medium">{w.intention}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-bone-dim">
                      {w.usedIngredients.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-surface border border-border-subtle">
                          ✓ {item}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-bone-muted font-sans line-clamp-2 leading-relaxed pt-1">
                      {w.practicalTakeaway || w.intentionDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveEntry(w)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-lavender-moon hover:text-lavender-light font-semibold transition-colors"
                    >
                      <span>Open Entry</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntryToDelete(w)}
                      className="p-1.5 rounded hover:bg-surface-elevated text-bone-dim hover:text-rust transition-colors"
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
      <div className="mt-14 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bone-dim">
        <div className="text-center sm:text-left space-y-1">
          <p className="flex items-center gap-1.5 justify-center sm:justify-start">
            <FourPointStar className="w-3 h-3 text-lavender-dim" />
            <span>Local Storage Notice: Your saved Grimoire entries are stored in this browser.</span>
          </p>
          <p className="text-[11px] text-bone-dim">
            When consulting the Oracle, only active card or working parameters are sent securely for interpretation. Clearing browser data will erase this ledger.
          </p>
        </div>

        {totalCount > 0 && (
          <button
            type="button"
            onClick={() => setShowPurgeModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle hover:border-rust/60 text-bone-dim hover:text-rust text-[11px] uppercase tracking-wider transition-colors shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>Purge Grimoire</span>
          </button>
        )}
      </div>
      </div>

      {/* MODAL: Full Entry Detail View */}
      {activeEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-entry-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveEntry(null);
          }}
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-elevated border border-border-ornate p-6 sm:p-10 shadow-card-tarot space-y-8 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveEntry(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-bone-dim hover:text-bone hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
              aria-label="Close entry modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Entry Detail Rendering */}
            {activeEntry.type === "daily" && (() => {
              const d = activeEntry as SanctumDailyReading;
              const cardData = getSanctumTarotCardById(d.cardId);

              return (
                <div className="space-y-8">
                  <header className="border-b border-border-subtle pb-4 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Daily Tarot Archive · {d.localDate}</span>
                    </span>
                    <h2 id="modal-entry-title" className="font-display text-3xl font-bold text-bone celestial-glow">
                      {d.cardName} — {d.cardNumeral}
                    </h2>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {d.shortKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-surface border border-border-ornate/60 text-xs font-mono text-lavender-light">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </header>

                  {cardData && (
                    <div className="flex justify-center py-2">
                      <SanctumCardFace card={cardData} size="default" />
                    </div>
                  )}

                  <div className="space-y-6 text-sm leading-relaxed">
                    <section className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">The Card</h4>
                      <p className="text-bone font-serif italic">{d.interpretation.theCard}</p>
                    </section>
                    <section className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">What This May Reflect Today</h4>
                      <p className="text-bone-muted font-sans">{d.interpretation.whatThisMayReflectToday}</p>
                    </section>
                    <section className="p-4 rounded-xl bg-surface border border-border-ornate space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">Consider</h4>
                      <p className="font-serif italic text-bone">“{d.interpretation.reflectionPrompt}”</p>
                    </section>
                    <section className="p-4 rounded-xl bg-surface border border-border-highlight space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light">Carry This With You</h4>
                      <p className="text-bone-muted font-sans">{d.interpretation.practicalTakeaway}</p>
                    </section>
                  </div>
                </div>
              );
            })()}

            {activeEntry.type === "three-card" && (() => {
              const tc = activeEntry as SanctumThreeCardReading;

              return (
                <div className="space-y-8">
                  <header className="border-b border-border-subtle pb-4 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                      <Compass className="w-3 h-3" />
                      <span>Three-Card Diagnostic Spread · {tc.localDate}</span>
                    </span>
                    <h2 id="modal-entry-title" className="font-display text-3xl font-bold text-bone celestial-glow">
                      Triad Inquest
                    </h2>
                    {tc.question && (
                      <p className="text-sm font-serif italic text-lavender-light pt-1">
                        Question: “{tc.question}”
                      </p>
                    )}
                  </header>

                  {/* 3 Positions */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
                      Positions Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(["situation", "challenge", "guidance"] as const).map((posKey) => {
                        const pos = tc.positions[posKey];
                        return (
                          <div key={posKey} className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1">
                            <span className="text-[10px] font-mono uppercase text-lavender-dim block">
                              {pos.positionLabel}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-bone">
                              {pos.cardName} ({pos.cardNumeral})
                            </h4>
                            <p className="text-xs text-bone-muted font-sans leading-relaxed pt-1">
                              {pos.contextualMeaning}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* The Oracle's Reading */}
                  <div className="space-y-6 pt-4 border-t border-border-subtle">
                    <h3 className="font-display text-2xl font-bold text-bone">THE ORACLE&apos;S READING</h3>
                    <section className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">The Pattern</h4>
                      <p className="text-bone font-serif italic text-sm sm:text-base leading-relaxed">
                        {tc.combinedSynthesis}
                      </p>
                    </section>
                    <section className="p-4 rounded-xl bg-surface border border-border-ornate space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">Consider</h4>
                      <p className="font-serif italic text-bone text-sm sm:text-base">“{tc.reflectionPrompt}”</p>
                    </section>
                    <section className="p-4 rounded-xl bg-surface border border-border-highlight space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light">Carry This With You</h4>
                      <p className="text-bone-muted font-sans text-sm">{tc.practicalTakeaway}</p>
                    </section>
                  </div>
                </div>
              );
            })()}

            {activeEntry.type === "working" && (() => {
              const w = activeEntry as SanctumWorkingRecord;

              return (
                <div className="space-y-8">
                  <header className="border-b border-border-subtle pb-4 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                      <Wand2 className="w-3 h-3" />
                      <span>Working Formulation · {w.localDate}</span>
                    </span>
                    <h2 id="modal-entry-title" className="font-display text-3xl font-bold text-bone celestial-glow">
                      {w.title}
                    </h2>
                    <p className="text-sm font-serif italic text-lavender-light">
                      “{w.intentionDescription}”
                    </p>
                  </header>

                  <section className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">You Will Need</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {w.usedIngredients.map((item, i) => (
                        <span key={i} className="px-3 py-1 rounded bg-surface border border-border-ornate text-xs font-mono text-bone font-medium">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">Why These Ingredients</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {w.ingredientReasons.map((r, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-1">
                          <span className="font-serif text-sm font-bold text-bone">{r.name}</span>
                          <p className="text-xs text-lavender-light italic">{r.correspondence}</p>
                          <p className="text-xs text-bone-muted">{r.reason}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">Preparation</h4>
                    <ul className="space-y-1 text-sm text-bone-muted font-sans">
                      {w.preparationSteps.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-xs font-mono text-lavender-dim mt-0.5">{i + 1}.</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">The Working</h4>
                    <ol className="space-y-3">
                      {w.ritualSteps.map((step) => (
                        <li key={step.step} className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
                          <span className="text-xs font-mono text-lavender-moon font-semibold">Step {step.step}: {step.title}</span>
                          <p className="text-sm text-bone-muted font-sans leading-relaxed">{step.instruction}</p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="p-4 rounded-xl bg-surface border border-border-highlight space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light">Closing & Disposal</h4>
                    <p className="text-sm text-bone-muted font-sans">{w.closing}</p>
                  </section>

                  {w.optionalTiming && (
                    <p className="text-xs font-mono text-bone-dim italic">
                      {w.optionalTiming}
                    </p>
                  )}

                  <section className="p-4 rounded-xl bg-surface border border-border-ornate space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">Consider</h4>
                    <p className="font-serif italic text-bone text-sm sm:text-base">“{w.reflectionPrompt}”</p>
                  </section>

                  <section className="p-4 rounded-xl bg-surface border border-border-highlight space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light">Carry This With You</h4>
                    <p className="text-bone-muted font-sans text-sm">{w.practicalTakeaway}</p>
                  </section>

                  {w.safetyNotes && (
                    <div className="p-3.5 rounded-xl bg-background border border-border-subtle flex items-start gap-2.5 text-xs text-bone-muted">
                      <ShieldAlert className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                      <p>{w.safetyNotes}</p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setEntryToDelete(activeEntry);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-subtle hover:border-rust text-bone-dim hover:text-rust text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove From Grimoire</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEntry(null)}
                className="px-6 py-2.5 rounded-lg bg-surface hover:bg-surface-elevated text-lavender-light border border-border-ornate text-xs font-mono uppercase tracking-ceremonial font-semibold transition-colors"
              >
                Close Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Delete Single Entry */}
      {entryToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-150"
          role="alertdialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEntryToDelete(null);
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-surface-elevated border border-border-ornate p-6 space-y-4 shadow-card-tarot">
            <div className="flex items-center gap-2 text-rust text-sm font-mono uppercase tracking-ceremonial font-semibold">
              <AlertTriangle className="w-4 h-4 text-rust shrink-0" />
              <span>Remove Entry</span>
            </div>

            <p className="text-sm text-bone font-sans leading-relaxed">
              Remove this entry from your Grimoire? This cannot be undone.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEntryToDelete(null)}
                className="px-4 py-2 rounded-lg bg-surface text-bone-muted hover:text-bone text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-rust/20 hover:bg-rust/30 text-rust border border-rust/60 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Purge Entire Grimoire */}
      {showPurgeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-150"
          role="alertdialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPurgeModal(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-surface-elevated border border-rust/70 p-6 space-y-4 shadow-card-tarot">
            <div className="flex items-center gap-2 text-rust text-sm font-mono uppercase tracking-ceremonial font-semibold">
              <AlertTriangle className="w-4 h-4 text-rust shrink-0" />
              <span>Purge Entire Grimoire</span>
            </div>

            <p className="text-sm text-bone font-sans leading-relaxed">
              This will permanently remove all locally saved tarot readings and workings from this browser. This cannot be undone.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPurgeModal(false)}
                className="px-4 py-2 rounded-lg bg-surface text-bone-muted hover:text-bone text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPurge}
                className="px-4 py-2 rounded-lg bg-rust/30 hover:bg-rust/50 text-rust border border-rust text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
