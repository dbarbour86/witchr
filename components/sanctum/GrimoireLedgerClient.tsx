"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { getSanctumIngredientImage } from "@/content/sanctum-workings";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import {
  FourPointStar,
  CelestialDivider,
  GrimoireStar,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import { SanctumCrest, MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { SanctumMarksSection } from "@/components/sanctum/SanctumMarksSection";
import { SanctumLegacyImportBanner } from "@/components/sanctum/SanctumLegacyImportBanner";
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
  ChevronDown,
  Sprout,
} from "lucide-react";

export function GrimoireLedgerClient() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<SanctumGrimoireReading[]>([]);
  const [filter, setFilter] = useState<"ALL" | "TAROT" | "WORKINGS">("ALL");
  const [marksExpanded, setMarksExpanded] = useState(false);
  const [ledgerError, setLedgerError] = useState<string | null>(null);

  // Modal / Detail state
  const [activeEntry, setActiveEntry] = useState<SanctumGrimoireReading | null>(null);

  // Deletion confirmations
  const [entryToDelete, setEntryToDelete] = useState<SanctumGrimoireReading | null>(null);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  // Accessibility refs for focus management
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Hydration-safe initial load and storage update listeners
  useEffect(() => {
    try {
      const records = getGrimoireEntries();
      setEntries(records);
      setLedgerError(null);
      recordSanctumTestEvent("grimoire_opened");
    } catch (err) {
      console.error("Grimoire retrieval error:", err);
      setLedgerError("Unable to access local browser archive. Your stored records remain safe.");
    } finally {
      setMounted(true);
    }

    const handleUpdate = () => {
      try {
        setEntries(getGrimoireEntries());
        setLedgerError(null);
      } catch (err) {
        console.error("Grimoire update error:", err);
      }
    };

    window.addEventListener("sanctum:grimoire-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);
    return () => {
      window.removeEventListener("sanctum:grimoire-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, []);

  // Modal accessibility: Escape key dismiss, focus trapping, and focus restoration
  useEffect(() => {
    const isAnyModalOpen = Boolean(activeEntry || entryToDelete || showPurgeModal);
    if (!isAnyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveEntry(null);
        setEntryToDelete(null);
        setShowPurgeModal(false);
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus into modal container or first interactive element
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 40);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (lastTriggerRef.current && typeof lastTriggerRef.current.focus === "function") {
        lastTriggerRef.current.focus();
      }
    };
  }, [activeEntry, entryToDelete, showPurgeModal]);

  const handleOpenEntry = (e: React.MouseEvent<HTMLElement>, entry: SanctumGrimoireReading) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveEntry(entry);
  };

  const handleOpenDelete = (e: React.MouseEvent<HTMLElement>, entry: SanctumGrimoireReading) => {
    lastTriggerRef.current = e.currentTarget;
    setEntryToDelete(entry);
  };

  const handleOpenPurge = (e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setShowPurgeModal(true);
  };

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

  if (ledgerError) {
    return (
      <div className="sanctum-panel sanctum-corners p-8 sm:p-12 text-center border border-purple-900/60 space-y-4 max-w-lg mx-auto my-12 shadow-[0_0_40px_rgba(147,51,234,0.2)]">
        <div className="w-12 h-12 mx-auto rounded-xl bg-purple-950/80 border border-purple-600/60 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-xl font-bold text-bone">Unable to Access Archive</h2>
        <p className="text-xs font-mono text-purple-300/80 leading-relaxed">{ledgerError}</p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              try {
                setEntries(getGrimoireEntries());
                setLedgerError(null);
              } catch (e) {
                setLedgerError("Unable to access local browser archive. Please check permissions or refresh.");
              }
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            Retry Access
          </button>
          <Link
            href="/sanctum/chamber"
            className="px-4 py-2 rounded-lg bg-[#140728] hover:bg-[#1f0c3d] border border-purple-800 text-purple-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Back to Sanctum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Explicit Legacy Browser Practice Import Banner */}
      <SanctumLegacyImportBanner />

      {/* Compact Title & Archival Introduction */}
      <div className="sanctum-panel sanctum-corners p-5 sm:p-6 border border-purple-900/60 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#130728] border border-purple-800/60 text-purple-300 text-[10px] font-mono uppercase tracking-[0.24em]">
            <BookOpen className="w-3 h-3 text-purple-400" />
            <span>Private Sanctum Archive</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            My Grimoire Ledger
          </h1>

          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed max-w-xl">
            Your private occult archive within the Sanctum. Saved daily tarot reflections, three-card diagnostic spreads, and synthesized rituals are preserved here for longitudinal study.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0416] border border-purple-900/60 text-center shrink-0">
          <SanctumCrest className="w-10 h-10 mb-1" />
          <span className="text-[8px] font-mono tracking-widest text-purple-300 uppercase">
            VAULT ACTIVE
          </span>
        </div>
      </div>

      {/* Grimoire Archival Records Filter & Grid (Immediately Below Compact Intro) */}
      <div className="space-y-6">
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090314] border border-purple-900/50 print:hidden">
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
              <span>Rituals</span>
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
                  {tab === "WORKINGS" && `Rituals (${workingsCount})`}
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
                  ? "Saved daily tarot readings, diagnostic spreads, and customized rituals will be recorded here once you perform active inquests in the Sanctum."
                  : `You currently have no saved ${filter === "WORKINGS" ? "ritual" : filter.toLowerCase()} records. Select another category or perform a new ritual.`}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/sanctum/tarot"
                prefetch={false}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Draw a Daily Card</span>
              </Link>
              <Link
                href="/sanctum/tarot/three-card"
                prefetch={false}
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
                <span>Create a Ritual</span>
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
                const cardData = getSanctumTarotCardById(d.cardId);
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
                        {d.cardName || cardData?.name} — {d.cardNumeral || cardData?.numeral}
                      </h3>

                      <div className="flex flex-wrap gap-1 text-[9px] font-mono text-purple-300/80">
                        {(d.shortKeywords || cardData?.shortKeywords || []).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#130728] border border-purple-900/60">
                            {kw}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-bone-muted font-sans line-clamp-3 leading-relaxed pt-1">
                        {d.interpretation?.whatThisMayReflectToday || cardData?.reflectiveInterpretation || ""}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between print:hidden">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, d)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, d)}
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

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between print:hidden">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, tc)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, tc)}
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
                          <span>Ritual</span>
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
                        {(w.usedIngredients || []).map((item, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#130728] border border-purple-900/60">
                            ✓ {item}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-bone-muted font-sans line-clamp-2 leading-relaxed pt-1">
                        {w.practicalTakeaway || w.intentionDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-900/40 flex items-center justify-between print:hidden">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, w)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white font-bold transition-colors"
                      >
                        <span>Open Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, w)}
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
        <div className="mt-14 pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300/70 print:hidden">
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
              onClick={(e) => handleOpenPurge(e)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-purple-900/60 hover:border-red-600 text-purple-300 hover:text-red-400 text-[11px] uppercase tracking-wider transition-colors shrink-0"
            >
              <Trash2 className="w-3 h-3" />
              <span>Purge Grimoire</span>
            </button>
          )}
        </div>

        {/* Collapsed by default: Sacred Marks & Practice Streaks */}
        <div className="mt-8 pt-6 border-t border-purple-900/40 print:hidden">
          <button
            type="button"
            onClick={() => setMarksExpanded(!marksExpanded)}
            className="w-full p-4 rounded-xl bg-[#090314] hover:bg-[#110624] border border-purple-900/60 hover:border-purple-500/60 text-left flex items-center justify-between transition-all group"
            aria-expanded={marksExpanded}
            aria-controls="sanctum-marks-collapsible"
          >
            <div className="flex items-center gap-3">
              <SanctumCrest className="w-6 h-6 text-purple-400 group-hover:text-purple-300 shrink-0" />
              <div>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-purple-200 group-hover:text-white">
                  Sacred Marks &amp; Practice Streaks
                </h3>
                <p className="text-[11px] text-bone-dim font-sans">
                  Track your spiritual consistency, milestone rewards, and unlocked Sacred Marks.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 group-hover:text-purple-200 shrink-0">
              <span>{marksExpanded ? "Collapse Marks" : "View Marks & Streaks"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${marksExpanded ? "rotate-180" : ""}`} />
            </div>
          </button>

          {marksExpanded && (
            <div id="sanctum-marks-collapsible" className="pt-4 animate-in fade-in duration-200">
              <SanctumMarksSection />
            </div>
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
          <div
            ref={modalRef}
            tabIndex={-1}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sanctum-parchment border border-purple-500/60 p-6 sm:p-10 shadow-2xl space-y-8 relative focus:outline-none"
          >
            {/* Ornate Corner Flourishes */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-60">
              <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none opacity-60 rotate-90">
              <TarotCornerFlourish className="w-5 h-5 text-purple-400" />
            </div>

            {/* Accessible Close Button */}
            <button
              type="button"
              onClick={() => setActiveEntry(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-950/60 border border-transparent hover:border-purple-800 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
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
                      {d.cardName || cardData?.name} — {d.cardNumeral || cardData?.numeral}
                    </h2>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(d.shortKeywords || cardData?.shortKeywords || []).map((kw, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#130728] border border-purple-700/60 text-[10px] font-mono uppercase tracking-wider text-purple-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </header>

                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {cardData && (
                      <div className="shrink-0 flex justify-center w-[200px] sm:w-[220px] mx-auto sm:mx-0">
                        <SanctumCardFace card={cardData} size="default" />
                      </div>
                    )}

                    <div className="space-y-4 flex-1 text-xs">
                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold mb-1">
                          Traditional Archetype
                        </h4>
                        <p className="text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3 rounded-lg border border-purple-900/40">
                          {d.interpretation?.theCard || cardData?.traditionalMeaning || ""}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold mb-1">
                          Reflective Guidance
                        </h4>
                        <p className="text-bone font-sans leading-relaxed bg-[#0c051a] p-3 rounded-lg border border-purple-900/40">
                          {d.interpretation?.whatThisMayReflectToday || cardData?.reflectiveInterpretation || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#110624] border border-purple-700/50 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                      Daily Inquiry
                    </span>
                    <p className="font-serif text-sm text-purple-100 italic leading-relaxed">
                      “{d.interpretation?.reflectionPrompt || cardData?.reflectionPrompt || ""}”
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Practical Psychological Takeaway
                    </h4>
                    <p className="text-xs text-bone-muted font-sans leading-relaxed bg-[#0a0414] p-3 rounded-lg border border-purple-900/40">
                      {d.interpretation?.practicalTakeaway || cardData?.practicalTakeaway || ""}
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
                    {(tc.positions ? Object.values(tc.positions) : []).map((pos) => (
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
                      <span>SYNTHESIZED RITUAL</span>
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

                  {/* What You'll Need (Distinguishing ingredients and tools) */}
                  {(() => {
                    const isToolLine = (line: string) =>
                      /^(supporting household tools|additional household tools|tools needed|have a |prepare a )/i.test(line.trim());

                    const extractedTools = (w.preparationSteps || [])
                      .filter(isToolLine)
                      .map((line) => line.replace(/^(supporting household tools:?|additional household tools:?|tools needed:?)\s*/i, "").trim());

                    const defaultTools: string[] = [];
                    defaultTools.push("A shallow dish, small saucer, or clean coaster (to keep materials contained)");
                    if (w.usedIngredients.some((i) => /bay/i.test(i))) {
                      defaultTools.push("A pen or pencil for writing on the bay leaf or paper");
                    }
                    if (w.usedIngredients.some((i) => /water/i.test(i))) {
                      defaultTools.push("A small cup or clean bowl for water");
                    }
                    if (w.usedIngredients.some((i) => /candle/i.test(i))) {
                      defaultTools.push("A sturdy heat-resistant candleholder or dish");
                    }

                    const toolsList = extractedTools.length > 0 ? extractedTools : defaultTools;

                    const beforeSteps = (w.preparationSteps || []).filter(
                      (line) => !isToolLine(line) && !line.toLowerCase().startsWith("selected ingredients") && !line.toLowerCase().startsWith("gather your")
                    );

                    return (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                            What You&apos;ll Need
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                            <div className="p-3 rounded-lg bg-[#0c051a] border border-purple-900/50 space-y-1.5">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                                Selected Ingredients
                              </span>
                              <ul className="space-y-1 text-bone">
                                {w.usedIngredients.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 rounded-lg bg-[#0c051a] border border-purple-900/50 space-y-1.5">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                                Supporting Household Tools
                              </span>
                              <ul className="space-y-1 text-bone">
                                {toolsList.map((tool, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1" />
                                    <span>{tool}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {beforeSteps.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                              Before You Begin
                            </h4>
                            <ol className="space-y-1 text-xs text-bone-muted font-sans">
                              {beforeSteps.map((prep, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="font-mono text-purple-400 font-semibold">{idx + 1}.</span>
                                  <span>{prep}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {w.leftOutIngredients && w.leftOutIngredients.length > 0 && (
                    <div className="space-y-2 p-3 rounded-lg bg-[#0e071c] border border-purple-900/50 text-xs">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                        Left Out of This Ritual
                      </h4>
                      <ul className="space-y-1 text-xs text-bone-muted font-sans">
                        {w.leftOutIngredients.map((item, idx) => (
                          <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                            <span className="font-semibold text-purple-200 font-mono text-[11px]">{item.name}:</span>
                            <span>{item.reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Why These Ingredients with Visual Thumbnails */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Why These Ingredients
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(w.ingredientReasons || []).map((wt, idx) => {
                        const asset = getSanctumIngredientImage(wt.name);
                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#0c051a] border border-purple-900/50 flex items-start gap-3 text-xs"
                          >
                            {asset ? (
                              <img
                                src={asset.image}
                                alt={asset.altText}
                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-purple-700/60 shadow-md shrink-0 bg-[#0d031c]"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#110524] border border-purple-800/70 flex items-center justify-center shrink-0 shadow-inner"
                                aria-hidden="true"
                              >
                                <Sprout className="w-6 h-6 text-purple-300/70" />
                              </div>
                            )}
                            <div className="space-y-1 min-w-0">
                              <span className="font-serif font-bold text-purple-200 block truncate">{wt.name}</span>
                              <p className="text-xs text-bone-muted sm:text-bone font-sans leading-relaxed">{wt.reason}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Steps
                    </h4>
                    <div className="space-y-2">
                      {(w.ritualSteps || []).map((step) => (
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
                          <p className="text-bone-muted sm:text-bone font-sans pl-6 leading-relaxed">{step.instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {w.closing && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Closing
                      </span>
                      <p className="text-bone-muted sm:text-bone font-sans italic leading-relaxed">{w.closing}</p>
                    </div>
                  )}

                  {w.practicalTakeaway && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Carry It Into Your Day
                      </span>
                      <p className="text-purple-200 font-sans italic leading-relaxed">&ldquo;{w.practicalTakeaway}&rdquo;</p>
                    </div>
                  )}

                  {w.reflectionPrompt && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Consider
                      </span>
                      <p className="text-purple-200 font-sans italic leading-relaxed">&ldquo;{w.reflectionPrompt}&rdquo;</p>
                    </div>
                  )}

                  {w.safetyNotes && (
                    <div className="p-3 rounded-lg bg-[#180820] border border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-200/90 font-sans">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w.safetyNotes}</span>
                    </div>
                  )}
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
          <div
            ref={modalRef}
            tabIndex={-1}
            className="w-full max-w-md rounded-2xl bg-[#0c0418] border border-red-900/80 p-6 space-y-4 shadow-2xl focus:outline-none"
          >
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
          <div
            ref={modalRef}
            tabIndex={-1}
            className="w-full max-w-md rounded-2xl bg-[#0c0418] border border-red-900/80 p-6 space-y-4 shadow-2xl focus:outline-none"
          >
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Purge Entire Local Ledger?</span>
            </div>
            <p className="text-xs text-bone-muted font-sans leading-relaxed">
              This will permanently erase all saved daily tarot draws, three-card readings, and synthesized rituals stored in this browser. Sacred Marks earned will also be reset.
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
