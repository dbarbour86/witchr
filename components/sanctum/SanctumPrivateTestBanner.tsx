"use client";

import React, { useState, useEffect } from "react";
import { FourPointStar, GrimoireStar, TarotCornerFlourish } from "@/components/OrnateFrames";
import { Sparkles, X, MessageSquare, Copy, Check, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { getSanctumTestEvents, resetSanctumTestData, recordSanctumTestEvent } from "@/lib/sanctum/test-events";

const DEBRIEF_CORE_QUESTIONS = `=== WITCHR SANCTUM PRIVATE TEST DEBRIEF ===

1. In your own words, what do you think Sanctum is?
2. Which feature did you try first, and why?
3. Did the Daily Tarot draw feel meaningful or generic? Would you return tomorrow?
4. Did the Three-Card Reading help you think about your question differently?
5. Did the Working feel practical, interesting, strange, confusing, or useful?
6. Did you understand what saving to the Grimoire meant? Did you save anything?
7. Did you notice the Sanctum streak or Sacred Marks? Did they motivate you?
8. What was your favorite part?
9. What was the weakest or most confusing part?
10. What did you expect Sanctum to do that it currently doesn't?`;

export function SanctumPrivateTestBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [copiedLogs, setCopiedLogs] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [eventCount, setEventCount] = useState(0);

  // Record initial entry and badge unlock events
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/sanctum") {
      recordSanctumTestEvent("sanctum_entered");
    }

    const handleBadgeUnlocked = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.id) {
        recordSanctumTestEvent("badge_unlocked", custom.detail.id);
      }
    };

    window.addEventListener("sanctum:badge-unlocked", handleBadgeUnlocked);
    return () => window.removeEventListener("sanctum:badge-unlocked", handleBadgeUnlocked);
  }, []);

  // Sync event count when modal opens
  useEffect(() => {
    if (modalOpen) {
      const events = getSanctumTestEvents();
      setEventCount(events.length);
      setConfirmReset(false);
      setResetSuccess(false);
    }
  }, [modalOpen]);

  // Handle global Escape key for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const handleCopyQuestions = async () => {
    try {
      await navigator.clipboard.writeText(DEBRIEF_CORE_QUESTIONS);
      setCopiedQuestions(true);
      setTimeout(() => setCopiedQuestions(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyLogs = async () => {
    try {
      const events = getSanctumTestEvents();
      await navigator.clipboard.writeText(JSON.stringify(events, null, 2));
      setCopiedLogs(true);
      setTimeout(() => setCopiedLogs(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleResetData = () => {
    resetSanctumTestData();
    setConfirmReset(false);
    setResetSuccess(true);
    setEventCount(0);
    setTimeout(() => {
      setModalOpen(false);
      setResetSuccess(false);
    }, 1500);
  };

  return (
    <>
      {/* Subtle, Ceremonial Private Test Banner */}
      <aside
        aria-label="Private Sanctum Test Notice"
        className="mb-8 p-3.5 sm:p-4 rounded-xl bg-surface/80 border border-lavender/30 shadow-glow-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="shrink-0 px-2.5 py-1 rounded bg-lavender/10 border border-lavender/40 text-[10px] font-mono uppercase tracking-ceremonial text-lavender-light font-semibold">
            PRIVATE SANCTUM TEST
          </span>
          <p className="text-bone-muted font-sans text-xs leading-relaxed">
            You’re using an early private version of Witchr Sanctum. Some features and wording may change as we learn what works best.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface border border-border-highlight hover:border-lavender-light/50 text-lavender-moon hover:text-lavender-light text-[11px] font-mono uppercase tracking-wide transition-all shadow-sm focus-visible:ring-1 focus-visible:ring-lavender-light outline-none"
        >
          <MessageSquare className="w-3.5 h-3.5 text-lavender-moon" />
          <span>Tell Us What Felt Off</span>
        </button>
      </aside>

      {/* Tester Debrief & Feedback Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tester-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="tarot-frame max-w-xl w-full p-6 sm:p-8 bg-surface-elevated border border-border-highlight max-h-[90vh] overflow-y-auto space-y-6 relative shadow-glow-purple"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner flourishes */}
            <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
            </div>
            <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
              <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
            </div>

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-ceremonial text-lavender-moon">
                  <FourPointStar className="w-3 h-3" />
                  <span>Tester Debrief &amp; Feedback</span>
                </div>
                <h3 id="tester-modal-title" className="text-xl font-serif font-bold text-bone mt-1">
                  Private Session Notes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-bone-dim hover:text-bone hover:bg-surface border border-transparent hover:border-border-subtle transition-colors focus-visible:ring-1 focus-visible:ring-lavender-light outline-none"
                aria-label="Close debrief dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Debrief Questions Section */}
            <div className="space-y-3">
              <p className="text-xs text-bone-muted leading-relaxed font-sans">
                Because this is an early private evaluation, feedback is collected directly by your session organizer.
                Copy the core debrief prompts below to paste into an email, direct message, or feedback document:
              </p>

              <div className="p-3.5 rounded-lg bg-surface border border-border-subtle font-mono text-[11px] text-bone-dim space-y-1.5 max-h-36 overflow-y-auto">
                <p className="text-lavender-light font-semibold">Core Debrief Prompts:</p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[10px] text-bone-muted">
                  <li>In your own words, what do you think Sanctum is?</li>
                  <li>Which feature did you try first, and why?</li>
                  <li>Did Daily Tarot feel meaningful or generic? Would you return?</li>
                  <li>Did Three-Card Reading help you think differently about your question?</li>
                  <li>Did the Working feel practical, interesting, or confusing?</li>
                  <li>Did you understand saving to the Grimoire? Did you save anything?</li>
                  <li>Did you notice the streak or marks? Did they motivate you?</li>
                  <li>What was your favorite and weakest part?</li>
                </ol>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyQuestions}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border-highlight text-lavender-moon hover:text-lavender-light text-xs font-mono uppercase tracking-wide transition-all focus-visible:ring-1 focus-visible:ring-lavender-light outline-none"
                >
                  {copiedQuestions ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lavender-light" />
                      <span className="text-lavender-light">Questions Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Debrief Prompts</span>
                    </>
                  )}
                </button>

                {eventCount > 0 && (
                  <button
                    type="button"
                    onClick={handleCopyLogs}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border-subtle text-bone-dim hover:text-bone-muted text-xs font-mono uppercase tracking-wide transition-all focus-visible:ring-1 focus-visible:ring-lavender-light outline-none"
                  >
                    {copiedLogs ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-lavender-light" />
                        <span className="text-lavender-light">Logs Copied!</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-lavender-moon" />
                        <span>Copy Local Event Log ({eventCount})</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Tester Reset State Section */}
            <div className="pt-4 border-t border-border-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-muted">
                <RotateCcw className="w-3.5 h-3.5 text-lavender-moon" />
                <span>Tester Data Reset (For Next Participant)</span>
              </div>
              <p className="text-xs text-bone-dim leading-relaxed font-sans">
                Handing this browser or device to another tester? Reset all Sanctum local data (Daily Tarot draw, Grimoire entries, streak ledger, and test logs) to a fresh, clean state.
              </p>

              {resetSuccess ? (
                <div className="p-3 rounded-lg bg-lavender/10 border border-lavender/40 text-lavender-light text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-lavender-light" />
                  <span>Sanctum local state cleared successfully. Ready for next tester.</span>
                </div>
              ) : confirmReset ? (
                <div className="p-3 rounded-lg bg-surface border border-red-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Clear all local Sanctum data now? This cannot be undone.</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleResetData}
                      className="px-3 py-1.5 rounded bg-red-900/60 hover:bg-red-800/80 border border-red-500/60 text-white text-xs font-mono uppercase tracking-wide transition-colors"
                    >
                      Yes, Clear All Sanctum State
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1.5 rounded bg-surface hover:bg-surface-elevated border border-border-subtle text-bone-muted text-xs font-mono uppercase tracking-wide transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-border-subtle text-bone-dim hover:text-bone text-xs font-mono uppercase tracking-wide transition-colors focus-visible:ring-1 focus-visible:ring-lavender-light outline-none"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Sanctum Test Data</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
