"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ArrowRight, ShieldCheck, X } from "lucide-react";
import { useSanctumAuth } from "@/lib/supabase/auth-context";
import {
  getLegacyDataSummary,
  getLegacyDecisionForAccount,
  importLegacyDataToAccount,
  dismissLegacyDataForAccount,
  LegacyDataSummary,
} from "@/lib/sanctum/account-storage";

export function SanctumLegacyImportBanner() {
  const { user } = useSanctumAuth();
  const [mounted, setMounted] = useState(false);
  const [summary, setSummary] = useState<LegacyDataSummary | null>(null);
  const [decisionMade, setDecisionMade] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      setSummary(null);
      return;
    }

    const decision = getLegacyDecisionForAccount(user.id);
    if (decision) {
      setDecisionMade(true);
      return;
    }

    const legacy = getLegacyDataSummary();
    if (legacy.grimoireCount > 0 || legacy.hasStreak) {
      setSummary(legacy);
    } else {
      setSummary(null);
    }
  }, [user]);

  if (!mounted || !user || decisionMade || !summary) {
    return null;
  }

  const handleImport = () => {
    importLegacyDataToAccount(user.id);
    setDecisionMade(true);
  };

  const handleDismiss = () => {
    dismissLegacyDataForAccount(user.id);
    setDecisionMade(true);
  };

  return (
    <div
      role="region"
      aria-label="Legacy practice import choice"
      className="w-full mb-6 rounded-2xl border border-purple-700/70 bg-gradient-to-r from-[#170630]/95 via-[#110524]/98 to-[#0a0217] p-4 sm:p-5 shadow-[0_0_30px_rgba(168,85,247,0.25)] relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/60 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
            <BookOpen className="w-5 h-5 text-purple-300" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300 font-semibold">
                Local Practice Found
              </span>
              <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-[9px] font-mono text-purple-400 uppercase">
                Optional
              </span>
            </div>
            <p className="text-xs sm:text-sm text-bone font-sans leading-relaxed">
              We found{" "}
              <strong className="text-purple-200">
                {summary.grimoireCount} saved Grimoire record{summary.grimoireCount === 1 ? "" : "s"}
              </strong>
              {summary.hasStreak && summary.streakDays > 0 ? (
                <>
                  {" "}and a{" "}
                  <strong className="text-purple-200">{summary.streakDays}-day practice streak</strong>
                </>
              ) : null}{" "}
              saved in this browser prior to signing in. Would you like to import them into your account, or keep them separate?
            </p>
            <p className="text-[10px] font-mono text-purple-400/60 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span>Legacy records are never overwritten or deleted from your browser.</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-3.5 py-2 rounded-xl bg-[#0d041c] hover:bg-[#1a0833] border border-purple-900/60 hover:border-purple-600 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Keep Separate
          </button>

          <button
            type="button"
            onClick={handleImport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/60 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer"
          >
            <span>Import to Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

