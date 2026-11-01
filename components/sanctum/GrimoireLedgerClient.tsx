"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  SanctumTarotCard,
  getSanctumTarotCardById,
  getSanctumTarotCardBySlug,
} from "@/content/sanctum-tarot";
import { getSanctumIngredientImage } from "@/content/sanctum-workings";
import { SanctumCardFace } from "@/components/sanctum/SanctumCardFace";
import {
  FourPointStar,
  CelestialDivider,
  GrimoireStar,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import { MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
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
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sprout,
} from "lucide-react";

type GrimoireCategory = "ALL" | "DAILY" | "THREE_CARD" | "RITUALS";
type SortOrder = "NEWEST" | "OLDEST";

// ============================================================================
// CUSTOM LINE SVG ICONS FOR CATEGORY TILES (Matching Approved Mockup)
// ============================================================================

function BookTileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H11v17.5H6.5A2.5 2.5 0 0 0 4 19.5z" />
      <path d="M20 19.5v-15A2.5 2.5 0 0 0 17.5 2H13v17.5h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      <line x1="12" y1="2" x2="12" y2="19.5" />
    </svg>
  );
}

function DailyTarotTileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <path d="M12 7.5v9M8.5 12h7M10 10l4 4M14 10l-4 4" strokeWidth="1.2" />
    </svg>
  );
}

function ThreeCardTileIcon({ className = "w-6 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="4" width="10" height="16" rx="1.5" transform="rotate(-15 6 12)" />
      <rect x="15" y="4" width="10" height="16" rx="1.5" transform="rotate(15 20 12)" />
      <rect x="8" y="2" width="10" height="18" rx="1.5" fill="#090314" />
      <line x1="13" y1="6.5" x2="13" y2="15.5" strokeWidth="1.2" />
      <line x1="10" y1="11" x2="16" y2="11" strokeWidth="1.2" />
    </svg>
  );
}

function RitualTileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C10.8 3.6 10.5 4.8 12 6.5C13.5 4.8 13.2 3.6 12 2Z" fill="currentColor" fillOpacity="0.4" />
      <line x1="12" y1="6.5" x2="12" y2="8.5" />
      <rect x="8.5" y="8.5" width="7" height="11" rx="1" />
      <path d="M6 21.5C9 20 15 20 18 21.5" />
      <line x1="4.5" y1="22" x2="19.5" y2="22" />
    </svg>
  );
}

// Format date into "Nov 1, 2026"
function formatEntryDate(dateStr?: string, timestampStr?: string): string {
  try {
    if (timestampStr) {
      const d = new Date(timestampStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
    }
    if (dateStr) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
    }
  } catch {}
  return dateStr || timestampStr || "";
}

// Robustly resolve Tarot cards from IDs, slugs, or numeric forms
function resolveTarotCard(idOrSlug?: string): SanctumTarotCard | undefined {
  if (!idOrSlug) return undefined;
  const clean = idOrSlug.trim();
  return (
    getSanctumTarotCardById(clean) ||
    getSanctumTarotCardBySlug(clean) ||
    getSanctumTarotCardBySlug(clean.replace(/^(card_\d+_|^\d+-)/, "")) ||
    getSanctumTarotCardById(`card_${clean}`)
  );
}

export function GrimoireLedgerClient() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<SanctumGrimoireReading[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GrimoireCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NEWEST");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
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
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

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

  // Close sort dropdown when clicking outside
  useEffect(() => {
    if (!sortDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [sortDropdownOpen]);

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

  // Derive real category counts from actual stored records
  const totalCount = entries.length;
  const dailyCount = useMemo(() => entries.filter((e) => e.type === "daily").length, [entries]);
  const threeCardCount = useMemo(() => entries.filter((e) => e.type === "three-card").length, [entries]);
  const ritualsCount = useMemo(() => entries.filter((e) => e.type === "working").length, [entries]);

  // Sort comparator
  const sortComparator = (a: SanctumGrimoireReading, b: SanctumGrimoireReading) => {
    const timeA = new Date(a.timestamp || a.localDate).getTime();
    const timeB = new Date(b.timestamp || b.localDate).getTime();
    return sortOrder === "NEWEST" ? timeB - timeA : timeA - timeB;
  };

  // Search filter predicate
  const matchesSearch = (entry: SanctumGrimoireReading, query: string): boolean => {
    if (!query) return true;
    const q = query.toLowerCase().trim();

    if (entry.type === "daily") {
      const d = entry as SanctumDailyReading;
      const card = getSanctumTarotCardById(d.cardId);
      const textPool = [
        d.cardName,
        d.cardNumeral,
        d.localDate,
        ...(d.shortKeywords || []),
        d.interpretation?.whatThisMayReflectToday,
        d.interpretation?.theCard,
        card?.name,
        card?.traditionalMeaning,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return textPool.includes(q);
    }

    if (entry.type === "three-card") {
      const tc = entry as SanctumThreeCardReading;
      const pos = tc.positions || (tc as any).cards || {};
      const sitName = pos.situation?.cardName || (Array.isArray(pos) ? pos[0]?.cardName : "");
      const chalName = pos.challenge?.cardName || (Array.isArray(pos) ? pos[1]?.cardName : "");
      const guiName = pos.guidance?.cardName || (Array.isArray(pos) ? pos[2]?.cardName : "");

      const textPool = [
        tc.question,
        tc.spreadName,
        tc.localDate,
        sitName,
        chalName,
        guiName,
        tc.combinedSynthesis,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return textPool.includes(q);
    }

    if (entry.type === "working") {
      const w = entry as SanctumWorkingRecord;
      const textPool = [
        w.title,
        w.intention,
        w.customIntention,
        w.localDate,
        ...(w.usedIngredients || []),
        ...(w.selectedIngredients || []),
        w.intentionDescription,
        w.practicalTakeaway,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return textPool.includes(q);
    }

    // Fallback for legacy or custom records
    try {
      return JSON.stringify(entry).toLowerCase().includes(q);
    } catch {
      return false;
    }
  };

  // Grouped and sorted lists
  const dailyEntries = useMemo(() => {
    return entries
      .filter((e) => e.type === "daily")
      .filter((e) => matchesSearch(e, searchQuery))
      .sort(sortComparator);
  }, [entries, searchQuery, sortOrder]);

  const threeCardEntries = useMemo(() => {
    return entries
      .filter((e) => e.type === "three-card")
      .filter((e) => matchesSearch(e, searchQuery))
      .sort(sortComparator);
  }, [entries, searchQuery, sortOrder]);

  const ritualEntries = useMemo(() => {
    return entries
      .filter((e) => e.type === "working")
      .filter((e) => matchesSearch(e, searchQuery))
      .sort(sortComparator);
  }, [entries, searchQuery, sortOrder]);

  // Support any legacy or unknown types without silently dropping them
  const otherEntries = useMemo<any[]>(() => {
    return (entries as any[])
      .filter((e) => e.type !== "daily" && e.type !== "three-card" && e.type !== "working")
      .filter((e) => matchesSearch(e, searchQuery))
      .sort(sortComparator);
  }, [entries, searchQuery, sortOrder]);

  // Total visible matching entries in the active category view
  const visibleMatchingCount = useMemo(() => {
    if (selectedCategory === "DAILY") return dailyEntries.length;
    if (selectedCategory === "THREE_CARD") return threeCardEntries.length;
    if (selectedCategory === "RITUALS") return ritualEntries.length;
    return dailyEntries.length + threeCardEntries.length + ritualEntries.length + otherEntries.length;
  }, [selectedCategory, dailyEntries, threeCardEntries, ritualEntries, otherEntries]);

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

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSortOrder("NEWEST");
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
              } catch {
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

      {/* =====================================================================
          1. COMPACT INTRO PANEL: MY GRIMOIRE & VAULT ACTIVE
          Matches approved mockup structure and celestial corners
          ===================================================================== */}
      <div className="sanctum-panel sanctum-corners p-5 sm:p-6 border border-purple-900/60 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#130728] border border-purple-800/60 text-purple-300 text-[10px] font-mono uppercase tracking-[0.24em]">
            <BookOpen className="w-3 h-3 text-purple-400" />
            <span>Private Sanctum Archive</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase">
            MY GRIMOIRE
          </h1>

          <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed max-w-xl">
            Your readings and rituals, kept in one place.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0416] border border-purple-900/60 text-center shrink-0">
          <div className="relative w-10 h-10 mb-1 flex items-center justify-center">
            <Image
              src="/images/icon.png"
              alt="Sanctum Vault"
              width={40}
              height={40}
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]"
            />
          </div>
          <span className="text-[8px] font-mono tracking-widest text-purple-300 uppercase">
            VAULT ACTIVE
          </span>
        </div>
      </div>

      {/* =====================================================================
          2. FOUR SELECTABLE CATEGORY TILES
          All Entries / Daily Tarot / Three-Card Readings / Rituals
          Horizontal on desktop, clean 2x2 grid on mobile
          ===================================================================== */}
      <div
        role="tablist"
        aria-label="Grimoire Categories"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 print:hidden"
      >
        {/* TILE 1: ALL ENTRIES */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "ALL"}
          onClick={() => setSelectedCategory("ALL")}
          className={`p-3 sm:p-3.5 xl:p-4 rounded-xl border text-left flex items-center justify-between gap-2 sm:gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            selectedCategory === "ALL"
              ? "bg-gradient-to-r from-purple-950 via-[#210943] to-[#17052e] border-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              : "bg-[#0c0418]/90 border-purple-900/60 text-purple-200/80 hover:text-white hover:border-purple-600 hover:bg-purple-950/40"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className={`shrink-0 ${selectedCategory === "ALL" ? "text-purple-300" : "text-purple-400/80"}`}>
              <BookTileIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs xl:text-[13px] uppercase tracking-tight sm:tracking-wider font-bold">
              ALL ENTRIES
            </span>
          </div>
          <span className={`font-mono text-xs sm:text-sm font-semibold shrink-0 ${selectedCategory === "ALL" ? "text-white" : "text-purple-300/80"}`}>
            {totalCount}
          </span>
        </button>

        {/* TILE 2: DAILY TAROT */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "DAILY"}
          onClick={() => setSelectedCategory("DAILY")}
          className={`p-3 sm:p-3.5 xl:p-4 rounded-xl border text-left flex items-center justify-between gap-2 sm:gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            selectedCategory === "DAILY"
              ? "bg-gradient-to-r from-purple-950 via-[#210943] to-[#17052e] border-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              : "bg-[#0c0418]/90 border-purple-900/60 text-purple-200/80 hover:text-white hover:border-purple-600 hover:bg-purple-950/40"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className={`shrink-0 ${selectedCategory === "DAILY" ? "text-purple-300" : "text-purple-400/80"}`}>
              <DailyTarotTileIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs xl:text-[13px] uppercase tracking-tight sm:tracking-wider font-bold">
              DAILY TAROT
            </span>
          </div>
          <span className={`font-mono text-xs sm:text-sm font-semibold shrink-0 ${selectedCategory === "DAILY" ? "text-white" : "text-purple-300/80"}`}>
            {dailyCount}
          </span>
        </button>

        {/* TILE 3: THREE-CARD READINGS */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "THREE_CARD"}
          onClick={() => setSelectedCategory("THREE_CARD")}
          className={`p-3 sm:p-3.5 xl:p-4 rounded-xl border text-left flex items-center justify-between gap-2 sm:gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            selectedCategory === "THREE_CARD"
              ? "bg-gradient-to-r from-purple-950 via-[#210943] to-[#17052e] border-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              : "bg-[#0c0418]/90 border-purple-900/60 text-purple-200/80 hover:text-white hover:border-purple-600 hover:bg-purple-950/40"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className={`shrink-0 ${selectedCategory === "THREE_CARD" ? "text-purple-300" : "text-purple-400/80"}`}>
              <ThreeCardTileIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs xl:text-[13px] uppercase tracking-tight sm:tracking-wider font-bold leading-tight">
              THREE-CARD READINGS
            </span>
          </div>
          <span className={`font-mono text-xs sm:text-sm font-semibold shrink-0 ${selectedCategory === "THREE_CARD" ? "text-white" : "text-purple-300/80"}`}>
            {threeCardCount}
          </span>
        </button>

        {/* TILE 4: RITUALS */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === "RITUALS"}
          onClick={() => setSelectedCategory("RITUALS")}
          className={`p-3 sm:p-3.5 xl:p-4 rounded-xl border text-left flex items-center justify-between gap-2 sm:gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
            selectedCategory === "RITUALS"
              ? "bg-gradient-to-r from-purple-950 via-[#210943] to-[#17052e] border-purple-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              : "bg-[#0c0418]/90 border-purple-900/60 text-purple-200/80 hover:text-white hover:border-purple-600 hover:bg-purple-950/40"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className={`shrink-0 ${selectedCategory === "RITUALS" ? "text-purple-300" : "text-purple-400/80"}`}>
              <RitualTileIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs xl:text-[13px] uppercase tracking-tight sm:tracking-wider font-bold">
              RITUALS
            </span>
          </div>
          <span className={`font-mono text-xs sm:text-sm font-semibold shrink-0 ${selectedCategory === "RITUALS" ? "text-white" : "text-purple-300/80"}`}>
            {ritualsCount}
          </span>
        </button>
      </div>

      {/* =====================================================================
          3. SEARCH & SORT BAR
          "Search your Grimoire..." input & Newest / Oldest first toggle
          ===================================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 print:hidden">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/70">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your Grimoire..."
            aria-label="Search your Grimoire"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0c0418]/90 border border-purple-900/60 text-xs sm:text-sm text-bone font-sans placeholder:text-purple-400/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-400 hover:text-white transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative shrink-0" ref={sortMenuRef}>
          <button
            type="button"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            aria-expanded={sortDropdownOpen}
            aria-haspopup="listbox"
            className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0c0418]/90 border border-purple-900/60 hover:border-purple-500/70 text-purple-200 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>{sortOrder === "NEWEST" ? "Newest first" : "Oldest first"}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-purple-400 transition-transform duration-200 ${sortDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {sortDropdownOpen && (
            <div
              role="listbox"
              aria-label="Sort order"
              className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0c0418] border border-purple-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.8)] py-1.5 z-30 animate-in fade-in duration-150"
            >
              <button
                type="button"
                role="option"
                aria-selected={sortOrder === "NEWEST"}
                onClick={() => {
                  setSortOrder("NEWEST");
                  setSortDropdownOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-left text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
                  sortOrder === "NEWEST"
                    ? "text-lavender-light bg-purple-950/70 font-bold"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-950/40"
                }`}
              >
                <span>Newest first</span>
                {sortOrder === "NEWEST" && <span className="text-purple-300">✓</span>}
              </button>
              <button
                type="button"
                role="option"
                aria-selected={sortOrder === "OLDEST"}
                onClick={() => {
                  setSortOrder("OLDEST");
                  setSortDropdownOpen(false);
                }}
                className={`w-full px-3.5 py-2 text-left text-xs font-mono uppercase tracking-wider flex items-center justify-between transition-colors ${
                  sortOrder === "OLDEST"
                    ? "text-lavender-light bg-purple-950/70 font-bold"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-950/40"
                }`}
              >
                <span>Oldest first</span>
                {sortOrder === "OLDEST" && <span className="text-purple-300">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          4. ARCHIVE ENTRIES & LABELED SECTIONS
          Defaults to All Entries showing sections by type.
          Selecting a category shows only that type.
          ===================================================================== */}
      <div className="space-y-6">
        {/* TOTAL EMPTY STATE: Grimoire contains zero records */}
        {totalCount === 0 && (
          <div className="sanctum-panel sanctum-corners p-8 sm:p-14 text-center border border-purple-900/60 space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#130728] border border-purple-700/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <BookOpen className="w-8 h-8 text-purple-300" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-bone">
                Your Ledger is Empty
              </h3>
              <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
                Saved daily tarot readings, diagnostic spreads, and customized rituals will be recorded here once you perform active inquests in the Sanctum.
              </p>
            </div>

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
                prefetch={false}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#140826] hover:bg-[#1f0d38] text-purple-200 border border-purple-800 text-xs font-mono uppercase tracking-wider"
              >
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Create a Ritual</span>
              </Link>
            </div>
          </div>
        )}

        {/* SEARCH EMPTY STATE: No items match active search query */}
        {totalCount > 0 && searchQuery && visibleMatchingCount === 0 && (
          <div className="sanctum-panel sanctum-corners p-8 sm:p-12 text-center border border-purple-900/60 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#130728] border border-purple-800 flex items-center justify-center text-purple-300">
              <Search className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-bone">
              No Entries Found
            </h3>
            <p className="text-xs sm:text-sm text-bone-muted font-sans max-w-md mx-auto leading-relaxed">
              No saved records matched &ldquo;<span className="text-purple-200 font-mono">{searchQuery}</span>&rdquo; in the current view.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#140826] hover:bg-[#1f0d38] border border-purple-700/60 text-purple-200 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                <span>Reset Search &amp; Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* CATEGORY EMPTY STATE: Category selected has 0 entries */}
        {totalCount > 0 && !searchQuery && visibleMatchingCount === 0 && (
          <div className="sanctum-panel sanctum-corners p-8 sm:p-12 text-center border border-purple-900/60 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#130728] border border-purple-800 flex items-center justify-center text-purple-300">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-bone">
              {selectedCategory === "DAILY" && "No Daily Tarot Readings"}
              {selectedCategory === "THREE_CARD" && "No Three-Card Readings"}
              {selectedCategory === "RITUALS" && "No Rituals Recorded"}
            </h3>
            <p className="text-xs sm:text-sm text-bone-muted font-sans max-w-md mx-auto leading-relaxed">
              {selectedCategory === "DAILY" && "You haven't saved any daily tarot cards yet. Draw today's card to record your first inquest."}
              {selectedCategory === "THREE_CARD" && "You haven't saved any triad spreads yet. Conduct a 3-card inquiry to begin your archive."}
              {selectedCategory === "RITUALS" && "You haven't synthesized any rituals yet. Formulate a working to archive your practice."}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              {selectedCategory === "DAILY" && (
                <Link
                  href="/sanctum/tarot"
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draw Daily Card</span>
                </Link>
              )}
              {selectedCategory === "THREE_CARD" && (
                <Link
                  href="/sanctum/tarot/three-card"
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Three-Card Reading</span>
                </Link>
              )}
              {selectedCategory === "RITUALS" && (
                <Link
                  href="/sanctum/working"
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Create a Ritual</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className="px-4 py-2 rounded-lg bg-[#140826] hover:bg-[#1f0d38] border border-purple-800 text-purple-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                View All Entries
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            SECTION 1: DAILY TAROT ENTRIES
            Shown when selectedCategory is ALL or DAILY
            =================================================================== */}
        {(selectedCategory === "ALL" || selectedCategory === "DAILY") && dailyEntries.length > 0 && (
          <section
            aria-label="Daily Tarot Archives"
            className="sanctum-panel sanctum-corners p-4 sm:p-5 border border-purple-900/60 rounded-2xl relative space-y-4"
          >
            {/* Section Labeled Header Matching Mockup */}
            <div className="flex items-center gap-2 pb-2 border-b border-purple-900/40">
              <div className="w-6 h-6 rounded bg-[#130728] border border-purple-700/60 flex items-center justify-center text-purple-300 shrink-0">
                <DailyTarotTileIcon className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-purple-200">
                DAILY TAROT
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#130728] border border-purple-800/80 text-[10px] font-mono font-semibold text-purple-300">
                {dailyEntries.length}
              </span>
            </div>

            {/* List of Compact Rows */}
            <div className="space-y-3">
              {dailyEntries.map((d) => {
                const cardData = resolveTarotCard(d.cardId) || resolveTarotCard((d as any).cardSlug);
                const formattedDate = formatEntryDate(d.localDate, d.timestamp);
                const keywords = d.shortKeywords || cardData?.shortKeywords || [];
                const baseName = d.cardName || cardData?.name || "Daily Tarot";
                const numeral = d.cardNumeral || cardData?.numeral || "";
                const displayTitle = (numeral && !baseName.toUpperCase().includes(numeral.toUpperCase()))
                  ? `${baseName} — ${numeral}`
                  : baseName;

                return (
                  <article
                    key={d.id}
                    className="group p-3 sm:p-3.5 rounded-xl bg-[#090214]/90 hover:bg-[#130628] border border-purple-900/50 hover:border-purple-600/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 relative overflow-hidden"
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Actual Tarot Card Artwork Thumbnail with full frame visible */}
                      <div className="relative w-11 h-16 sm:w-12 sm:h-18 rounded border border-purple-700/60 overflow-hidden bg-[#130728] shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        {cardData?.image?.src ? (
                          <Image
                            src={cardData.image.src}
                            alt={cardData.name}
                            fill
                            sizes="50px"
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] font-mono text-purple-300">
                            {numeral}
                          </div>
                        )}
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-bone group-hover:text-purple-200 transition-colors uppercase tracking-wide truncate">
                          {displayTitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-bone-muted font-sans">
                          <span className="font-mono text-[11px] text-purple-300/80">{formattedDate}</span>
                          {keywords.length > 0 && (
                            <>
                              <span className="text-purple-600">·</span>
                              <span className="truncate">{keywords.slice(0, 3).join(" · ")}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-900/40">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, d)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-purple-300 group-hover:text-white font-bold transition-colors cursor-pointer"
                        aria-label={`Open entry: ${displayTitle}`}
                      >
                        <span>OPEN ENTRY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, d)}
                        className="p-1.5 rounded-lg hover:bg-purple-950/80 text-purple-400/60 hover:text-red-400 transition-colors cursor-pointer"
                        aria-label={`Delete record for ${d.cardName}`}
                        title="Delete from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
            SECTION 2: THREE-CARD READINGS ENTRIES
            Shown when selectedCategory is ALL or THREE_CARD
            =================================================================== */}
        {(selectedCategory === "ALL" || selectedCategory === "THREE_CARD") && threeCardEntries.length > 0 && (
          <section
            aria-label="Three-Card Reading Archives"
            className="sanctum-panel sanctum-corners p-4 sm:p-5 border border-purple-900/60 rounded-2xl relative space-y-4"
          >
            {/* Section Labeled Header Matching Mockup */}
            <div className="flex items-center gap-2 pb-2 border-b border-purple-900/40">
              <div className="w-6 h-6 rounded bg-[#130728] border border-purple-700/60 flex items-center justify-center text-purple-300 shrink-0">
                <ThreeCardTileIcon className="w-4 h-3.5" />
              </div>
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-purple-200">
                THREE-CARD READINGS
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#130728] border border-purple-800/80 text-[10px] font-mono font-semibold text-purple-300">
                {threeCardEntries.length}
              </span>
            </div>

            {/* List of Compact Rows */}
            <div className="space-y-3">
              {threeCardEntries.map((tc) => {
                const pos = tc.positions || (tc as any).cards || {};
                const sit = pos.situation || (Array.isArray(pos) ? pos[0] : null);
                const chal = pos.challenge || (Array.isArray(pos) ? pos[1] : null);
                const gui = pos.guidance || (Array.isArray(pos) ? pos[2] : null);

                const card1 = resolveTarotCard(sit?.cardId || sit?.cardSlug);
                const card2 = resolveTarotCard(chal?.cardId || chal?.cardSlug);
                const card3 = resolveTarotCard(gui?.cardId || gui?.cardSlug);
                const cardSummary = [
                  sit?.cardName || card1?.name,
                  chal?.cardName || card2?.name,
                  gui?.cardName || card3?.name,
                ]
                  .filter(Boolean)
                  .join(" · ") || tc.spreadName;
                const formattedDate = formatEntryDate(tc.localDate, tc.timestamp);

                return (
                  <article
                    key={tc.id}
                    className="group p-3 sm:p-3.5 rounded-xl bg-[#090214]/90 hover:bg-[#130628] border border-purple-900/50 hover:border-purple-600/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 relative overflow-hidden"
                  >
                    {/* Left: 3-Card Visual Thumbnail & Details */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Mini 3-Card Fanned / Side-by-Side Thumbnail Cluster with actual artwork */}
                      <div className="flex items-center -space-x-2 sm:space-x-1 shrink-0">
                        {[card1, card2, card3].map((card, idx) => (
                          <div
                            key={idx}
                            className="relative w-7 h-11 sm:w-8 sm:h-13 rounded border border-purple-700/60 overflow-hidden bg-[#130728] shadow-sm"
                          >
                            {card?.image?.src ? (
                              <Image
                                src={card.image.src}
                                alt={card.name}
                                fill
                                sizes="35px"
                                className="object-contain p-0.5"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[7px] font-mono text-purple-300">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-bone group-hover:text-purple-200 transition-colors uppercase tracking-wide truncate">
                          {tc.question ? `“${tc.question}”` : "SITUATION · CHALLENGE · GUIDANCE"}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-bone-muted font-sans">
                          <span className="font-mono text-[11px] text-purple-300/80">{formattedDate}</span>
                          <span className="text-purple-600">·</span>
                          <span className="truncate text-purple-200/90">{cardSummary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-900/40">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, tc)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-purple-300 group-hover:text-white font-bold transition-colors cursor-pointer"
                        aria-label={`Open triad reading: ${cardSummary}`}
                      >
                        <span>OPEN ENTRY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, tc)}
                        className="p-1.5 rounded-lg hover:bg-purple-950/80 text-purple-400/60 hover:text-red-400 transition-colors cursor-pointer"
                        aria-label="Delete triad reading"
                        title="Delete from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
            SECTION 3: RITUALS ENTRIES
            Shown when selectedCategory is ALL or RITUALS
            =================================================================== */}
        {(selectedCategory === "ALL" || selectedCategory === "RITUALS") && ritualEntries.length > 0 && (
          <section
            aria-label="Ritual Archives"
            className="sanctum-panel sanctum-corners p-4 sm:p-5 border border-purple-900/60 rounded-2xl relative space-y-4"
          >
            {/* Section Labeled Header Matching Mockup */}
            <div className="flex items-center gap-2 pb-2 border-b border-purple-900/40">
              <div className="w-6 h-6 rounded bg-[#130728] border border-purple-700/60 flex items-center justify-center text-purple-300 shrink-0">
                <RitualTileIcon className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-purple-200">
                RITUALS
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#130728] border border-purple-800/80 text-[10px] font-mono font-semibold text-purple-300">
                {ritualEntries.length}
              </span>
            </div>

            {/* List of Compact Rows */}
            <div className="space-y-3">
              {ritualEntries.map((w) => {
                const formattedDate = formatEntryDate(w.localDate, w.timestamp);
                const ingredientsSummary = (w.usedIngredients || []).join(" · ") || w.intention;

                return (
                  <article
                    key={w.id}
                    className="group p-3 sm:p-3.5 rounded-xl bg-[#090214]/90 hover:bg-[#130628] border border-purple-900/50 hover:border-purple-600/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 relative overflow-hidden"
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                      {/* Ritual Icon Thumbnail */}
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-purple-700/60 bg-[#130728] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                        <RitualTileIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                      </div>

                      {/* Title & Metadata */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-bone group-hover:text-purple-200 transition-colors uppercase tracking-wide truncate">
                          {w.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-bone-muted font-sans">
                          <span className="font-mono text-[11px] text-purple-300/80">{formattedDate}</span>
                          <span className="text-purple-600">·</span>
                          <span className="truncate text-purple-200/90">{ingredientsSummary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-900/40">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, w)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-purple-300 group-hover:text-white font-bold transition-colors cursor-pointer"
                        aria-label={`Open ritual: ${w.title}`}
                      >
                        <span>OPEN ENTRY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, w)}
                        className="p-1.5 rounded-lg hover:bg-purple-950/80 text-purple-400/60 hover:text-red-400 transition-colors cursor-pointer"
                        aria-label={`Delete ritual: ${w.title}`}
                        title="Delete from Grimoire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
            SECTION 4: OTHER / LEGACY ARCHIVES (Preserves Any Unknown Types)
            =================================================================== */}
        {selectedCategory === "ALL" && otherEntries.length > 0 && (
          <section
            aria-label="Other Archives"
            className="sanctum-panel sanctum-corners p-4 sm:p-5 border border-purple-900/60 rounded-2xl relative space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-purple-900/40">
              <BookTileIcon className="w-4 h-4 text-purple-400" />
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-purple-200">
                OTHER ARCHIVED ENTRIES
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#130728] border border-purple-800/80 text-[10px] font-mono font-semibold text-purple-300">
                {otherEntries.length}
              </span>
            </div>

            <div className="space-y-3">
              {otherEntries.map((entry) => {
                const anyEntry = entry as unknown as Record<string, unknown>;
                const title = (anyEntry.title || anyEntry.cardName || anyEntry.question || "Archived Record") as string;
                const formattedDate = formatEntryDate(entry.localDate, entry.timestamp);

                return (
                  <article
                    key={entry.id}
                    className="group p-3 sm:p-3.5 rounded-xl bg-[#090214]/90 hover:bg-[#130628] border border-purple-900/50 hover:border-purple-600/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-bone uppercase tracking-wide truncate">
                        {title}
                      </h3>
                      <div className="text-xs text-bone-muted font-sans font-mono">
                        {formattedDate} · Type: {entry.type}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEntry(e, entry)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-purple-300 hover:text-white font-bold"
                      >
                        <span>OPEN ENTRY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleOpenDelete(e, entry)}
                        className="p-1.5 rounded-lg text-purple-400/60 hover:text-red-400"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================================
          5. LOCAL STORAGE NOTICE & CONFIRMED PURGE ACTION
          Matching approved mockup bottom note
          ===================================================================== */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300/70 print:hidden">
        <div className="text-center sm:text-left space-y-0.5">
          <p className="flex items-center gap-1.5 justify-center sm:justify-start text-purple-300 font-semibold">
            <FourPointStar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>Saved locally in this browser.</span>
          </p>
          <p className="text-[11px] text-purple-400/60">
            When clearing browser data, your Grimoire entries will be removed from this device.
          </p>
        </div>

        {totalCount > 0 && (
          <button
            type="button"
            onClick={(e) => handleOpenPurge(e)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-900/60 hover:border-red-600/70 bg-[#0e051c] text-purple-300 hover:text-red-300 text-[11px] uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>Purge Grimoire</span>
          </button>
        )}
      </div>

      {/* =====================================================================
          6. COLLAPSIBLE SACRED MARKS & PRACTICE STREAKS
          Matching approved mockup bottom drawer
          ===================================================================== */}
      <div className="pt-2 border-t border-purple-900/40 print:hidden">
        <button
          type="button"
          onClick={() => setMarksExpanded(!marksExpanded)}
          className="w-full p-4 rounded-xl bg-[#090314] hover:bg-[#110624] border border-purple-900/60 hover:border-purple-500/60 text-left flex items-center justify-between transition-all group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-expanded={marksExpanded}
          aria-controls="sanctum-marks-collapsible"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
              <Image
                src="/images/icon.png"
                alt="Sacred Marks"
                width={24}
                height={24}
                className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
              />
            </div>
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

      {/* =====================================================================
          7. MODAL: FULL ENTRY DETAIL VIEW (Folio Parchment)
          Preserved complete opening, printing, and reading experience
          ===================================================================== */}
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
              const cardData = resolveTarotCard(d.cardId) || resolveTarotCard((d as any).cardSlug);

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
                      &ldquo;{d.interpretation?.reflectionPrompt || cardData?.reflectionPrompt || "What friction today is asking for your stillness?"}&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0c0418] border border-purple-900/50 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                      Grounded Action
                    </span>
                    <p className="text-xs text-bone-muted font-sans leading-relaxed">
                      {d.interpretation?.practicalTakeaway || cardData?.practicalTakeaway || "Notice without judgment. Anchor your focus in direct physical sensation."}
                    </p>
                  </div>

                  {(d as any).userNote && (
                    <div className="p-4 rounded-xl bg-[#090314] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Personal Reflection Note
                      </span>
                      <p className="text-xs text-bone font-sans leading-relaxed">
                        {(d as any).userNote}
                      </p>
                    </div>
                  )}
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
                      {tc.spreadName || "Three-Card Inquest"}
                    </h2>

                    {tc.question && (
                      <p className="text-sm font-serif italic text-purple-200 pt-1">
                        &ldquo;{tc.question}&rdquo;
                      </p>
                    )}
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(["situation", "challenge", "guidance"] as const).map((key, idx) => {
                      const pos = tc.positions?.[key] || (Array.isArray((tc as any).cards) ? (tc as any).cards[idx] : null);
                      if (!pos) return null;
                      const foundCard = resolveTarotCard(pos.cardId || pos.cardSlug);
                      return (
                        <div key={key} className="space-y-3 p-4 rounded-xl bg-[#090314] border border-purple-900/50 flex flex-col items-center text-center">
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-purple-400 font-bold">
                            {idx + 1}. {pos.positionLabel || key}
                          </span>
                          {foundCard && (
                            <div className="w-[140px] flex justify-center">
                              <SanctumCardFace card={foundCard} size="default" />
                            </div>
                          )}
                          <div className="space-y-1 text-xs">
                            <h4 className="font-serif font-bold text-bone uppercase">{pos.cardName}</h4>
                            <p className="text-[11px] text-bone-muted font-sans leading-relaxed">{pos.contextualMeaning}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-[#110624] border border-purple-700/50 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                      Synthesis &amp; Occult Diagnostic
                    </span>
                    <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed">
                      {tc.combinedSynthesis}
                    </p>
                  </div>

                  {tc.reflectionPrompt && (
                    <div className="p-4 rounded-xl bg-[#0c0418] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Reflection Question
                      </span>
                      <p className="font-serif text-xs sm:text-sm text-purple-200 italic leading-relaxed">
                        &ldquo;{tc.reflectionPrompt}&rdquo;
                      </p>
                    </div>
                  )}

                  {tc.practicalTakeaway && (
                    <div className="p-4 rounded-xl bg-[#0c0418] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Grounded Takeaway
                      </span>
                      <p className="text-xs text-bone-muted font-sans leading-relaxed">
                        {tc.practicalTakeaway}
                      </p>
                    </div>
                  )}

                  {(tc as any).userNote && (
                    <div className="p-4 rounded-xl bg-[#090314] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Personal Reflection Note
                      </span>
                      <p className="text-xs text-bone font-sans leading-relaxed">
                        {(tc as any).userNote}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* RITUAL WORKING ENTRY DETAIL */}
            {activeEntry.type === "working" && (() => {
              const w = activeEntry as SanctumWorkingRecord;

              // Distinguish household tools and preparation steps
              const isToolLine = (line: string) =>
                /^(supporting household tools|additional household tools|tools needed|have a |prepare a )/i.test(line.trim());

              const extractedTools = (w.preparationSteps || [])
                .filter(isToolLine)
                .map((line) => line.replace(/^(supporting household tools:?|additional household tools:?|tools needed:?)\s*/i, "").trim());

              const defaultTools: string[] = [];
              defaultTools.push("A shallow dish, small saucer, or clean coaster (to keep materials contained)");
              if ((w.usedIngredients || []).some((i) => /bay/i.test(i))) {
                defaultTools.push("A pen or pencil for writing on the bay leaf or paper");
              }
              if ((w.usedIngredients || []).some((i) => /water/i.test(i))) {
                defaultTools.push("A small cup or clean bowl for water");
              }
              if ((w.usedIngredients || []).some((i) => /candle/i.test(i))) {
                defaultTools.push("A sturdy heat-resistant candleholder or dish");
              }

              const toolsList = extractedTools.length > 0 ? extractedTools : defaultTools;

              const beforeSteps = (w.preparationSteps || []).filter(
                (line) => !isToolLine(line) && !line.toLowerCase().startsWith("selected ingredients") && !line.toLowerCase().startsWith("gather your")
              );

              return (
                <div className="space-y-6">
                  <header className="border-b border-purple-900/40 pb-5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-purple-300">
                      <span>RITUAL SYNTHESIS RECORD</span>
                      <span>RECORD DATE: {w.localDate}</span>
                    </div>

                    <h2
                      id="modal-entry-title"
                      className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                    >
                      {w.title}
                    </h2>

                    <div className="text-xs font-mono text-purple-300">
                      <span>Core Intention: </span>
                      <span className="text-purple-100 font-semibold">{w.intention}</span>
                    </div>
                  </header>

                  <div className="p-4 rounded-xl bg-[#0c0418] border border-purple-900/50 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                      Intention Focus
                    </span>
                    <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed">
                      {w.intentionDescription}
                    </p>
                  </div>

                  {/* What You'll Need (Distinguishing ingredients and tools) */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      What You&apos;ll Need
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                      <div className="p-3.5 rounded-xl bg-[#0c051a] border border-purple-900/50 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                          Selected Ingredients
                        </span>
                        <ul className="space-y-1.5 text-bone">
                          {(w.usedIngredients || []).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                              <span className="capitalize">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0c051a] border border-purple-900/50 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                          Supporting Household Tools
                        </span>
                        <ul className="space-y-1.5 text-bone">
                          {toolsList.map((tool, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1" />
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Before You Begin */}
                  {beforeSteps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                        Before You Begin
                      </h4>
                      <ol className="space-y-1.5 text-xs text-bone-muted font-sans bg-[#0c0418] p-3.5 rounded-xl border border-purple-900/40">
                        {beforeSteps.map((prep, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono text-purple-400 font-semibold">{idx + 1}.</span>
                            <span>{prep}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Left Out of This Ritual */}
                  {w.leftOutIngredients && w.leftOutIngredients.length > 0 && (
                    <div className="space-y-2 p-3.5 rounded-xl bg-[#0e071c] border border-purple-900/50 text-xs">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                        Left Out of This Ritual
                      </h4>
                      <ul className="space-y-1.5 text-xs text-bone-muted font-sans">
                        {w.leftOutIngredients.map((item, idx) => (
                          <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                            <span className="font-semibold text-purple-200 font-mono text-[11px] capitalize">{item.name}:</span>
                            <span>{item.reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Ingredient Correspondences */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      Ingredient Correspondences
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(w.ingredientReasons || []).map((wt) => {
                        const ingImg = getSanctumIngredientImage(wt.name);
                        return (
                          <div
                            key={wt.name}
                            className="p-3.5 rounded-xl bg-[#0c051a] border border-purple-900/50 flex items-start gap-3 text-xs"
                          >
                            {ingImg ? (
                              <Image
                                src={ingImg.image}
                                alt={ingImg.altText}
                                width={56}
                                height={56}
                                className="w-14 h-14 object-cover rounded-lg border border-purple-700/60 shadow-md shrink-0 bg-[#0d031c]"
                              />
                            ) : (
                              <div
                                className="w-14 h-14 rounded-lg bg-[#110524] border border-purple-800/70 flex items-center justify-center shrink-0 shadow-inner"
                                aria-hidden="true"
                              >
                                <Sprout className="w-6 h-6 text-purple-300/70" />
                              </div>
                            )}
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-serif font-bold text-purple-100 capitalize">{wt.name}</span>
                                <span className="text-[9px] font-mono text-purple-400">{wt.correspondence}</span>
                              </div>
                              <p className="text-xs text-bone-muted sm:text-bone font-sans leading-relaxed">{wt.reason}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Steps */}
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

                  {/* Closing */}
                  {w.closing && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Closing
                      </span>
                      <p className="text-bone-muted sm:text-bone font-sans italic leading-relaxed">{w.closing}</p>
                    </div>
                  )}

                  {/* Optional Timing */}
                  {w.optionalTiming && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Timing &amp; Alignment
                      </span>
                      <p className="text-bone-muted sm:text-bone font-sans italic leading-relaxed">{w.optionalTiming}</p>
                    </div>
                  )}

                  {/* Carry It Into Your Day */}
                  {w.practicalTakeaway && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Carry It Into Your Day
                      </span>
                      <p className="text-purple-200 font-sans italic leading-relaxed">&ldquo;{w.practicalTakeaway}&rdquo;</p>
                    </div>
                  )}

                  {/* Consider */}
                  {w.reflectionPrompt && (
                    <div className="p-3 rounded-lg bg-[#0b0416] border border-purple-900/40 text-xs space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                        Consider
                      </span>
                      <p className="text-purple-200 font-sans italic leading-relaxed">&ldquo;{w.reflectionPrompt}&rdquo;</p>
                    </div>
                  )}

                  {/* Safety Notes */}
                  {w.safetyNotes && (
                    <div className="p-3 rounded-lg bg-[#180820] border border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-200/90 font-sans">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w.safetyNotes}</span>
                    </div>
                  )}

                  {/* Personal Note */}
                  {(w as any).userNote && (
                    <div className="p-4 rounded-xl bg-[#090314] border border-purple-900/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                        Personal Reflection Note
                      </span>
                      <p className="text-xs text-bone font-sans leading-relaxed">
                        {(w as any).userNote}
                      </p>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#140826] hover:bg-[#1f0d38] border border-purple-800 text-purple-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-purple-400" />
                <span>Print Record</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEntry(null)}
                className="px-5 py-2 rounded-lg sanctum-btn-electric text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              >
                Close Folio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          8. CONFIRMATION MODAL: SINGLE ENTRY DELETION
          ===================================================================== */}
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
                className="px-4 py-2 rounded-lg bg-[#140826] text-bone-muted hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              >
                Remove Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. CONFIRMATION MODAL: PURGE ENTIRE GRIMOIRE
          ===================================================================== */}
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
                className="px-4 py-2 rounded-lg bg-[#140826] text-bone-muted hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPurge}
                className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
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
