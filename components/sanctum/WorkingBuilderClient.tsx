"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  SANCTUM_INTENTIONS,
  SANCTUM_INGREDIENT_CATALOG,
  SanctumIntentionKey,
} from "@/content/sanctum-workings";
import {
  synthesizeWorking,
  GeneratedWorking,
  WorkingEngineResult,
} from "@/lib/sanctum/working-engine";
import {
  SanctumWorkingRecord,
  saveReadingToGrimoire,
  getTodayLocalDateString,
} from "@/lib/sanctum/storage";
import { recordSanctumActivity } from "@/lib/sanctum/progression";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import {
  FourPointStar,
  CelestialDivider,
  GrimoireStar,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import {
  SanctumCrest,
  MoonPhaseStrip,
} from "@/components/sanctum/SanctumSymbols";
import {
  Wand2,
  Plus,
  X,
  Check,
  BookOpen,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Printer,
  Sparkles,
  Lock,
  Flame,
  Droplets,
  Feather,
  Edit2,
} from "lucide-react";

export function WorkingBuilderClient() {
  const [selectedIntention, setSelectedIntention] = useState<SanctumIntentionKey | "Something Else" | null>(null);
  const [customIntention, setCustomIntention] = useState("");
  const [situationNote, setSituationNote] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Salt", "Rosemary"]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [customInputText, setCustomInputText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [workingResult, setWorkingResult] = useState<WorkingEngineResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [workingSource, setWorkingSource] = useState<"oracle-ai" | "written-tradition">("written-tradition");
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  // Listen for tester data reset
  useEffect(() => {
    const handleReset = () => {
      setSelectedIntention(null);
      setCustomIntention("");
      setSituationNote("");
      setSelectedIngredients(["Salt", "Rosemary"]);
      setCustomIngredients([]);
      setWorkingResult(null);
      setIsSaved(false);
      setIsSynthesizing(false);
      setWorkingSource("written-tradition");
      setFallbackNotice(null);
    };

    window.addEventListener("sanctum:daily-tarot-reset", handleReset);
    return () => window.removeEventListener("sanctum:daily-tarot-reset", handleReset);
  }, []);

  // Toggle standard ingredient selection
  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  // Add custom household ingredient
  const handleAddCustomIngredient = () => {
    const clean = customInputText.trim().slice(0, 50);
    if (!clean) return;

    if (!customIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      setCustomIngredients((prev) => [...prev, clean]);
    }
    setCustomInputText("");
    setShowCustomInput(false);
  };

  // Remove custom household ingredient
  const handleRemoveCustomIngredient = (item: string) => {
    setCustomIngredients((prev) => prev.filter((i) => i !== item));
  };

  // Clear workstation
  const handleClear = () => {
    setSelectedIntention(null);
    setCustomIntention("");
    setSituationNote("");
    setSelectedIngredients([]);
    setCustomIngredients([]);
    setWorkingResult(null);
    setIsSaved(false);
    setIsSynthesizing(false);
    setWorkingSource("written-tradition");
    setFallbackNotice(null);
  };

  // Trigger Working Synthesis
  const handleSynthesize = async () => {
    if (!selectedIntention || isSynthesizing) return;

    recordSanctumTestEvent("working_started");

    // Combine custom intention with optional situation note
    const finalCustomText = [customIntention.trim(), situationNote.trim()].filter(Boolean).join(". ");

    // 1. Run deterministic engine first to validate intention, ingredients, correspondences, and safety
    const deterministicResult = synthesizeWorking({
      intention: selectedIntention,
      customIntention: selectedIntention === "Something Else" || finalCustomText ? finalCustomText : undefined,
      selectedIngredients,
      customIngredients,
    });

    // If deterministic validation failed (e.g. no ingredients, incongruence, empty intention):
    if (!deterministicResult.success || !deterministicResult.working) {
      setWorkingResult(deterministicResult);
      setIsSaved(false);
      setWorkingSource("written-tradition");
      setFallbackNotice(null);
      return;
    }

    // 2. Foundation is valid. Now call Oracle AI service to formulate the personalized working
    setIsSynthesizing(true);
    setWorkingResult(null);
    setIsSaved(false);
    setFallbackNotice(null);

    const baseWorking = deterministicResult.working;
    let finalWorking: GeneratedWorking = baseWorking;
    let source: "oracle-ai" | "written-tradition" = "written-tradition";
    let notice: string | null = null;

    try {
      const res = await fetch("/api/sanctum/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "working",
          payload: {
            intention: selectedIntention,
            customIntention: finalCustomText || undefined,
            effectiveIntention: baseWorking.effectiveIntention,
            approvedIngredients: baseWorking.whyThese.map((wt) => {
              const catalogMatch = SANCTUM_INGREDIENT_CATALOG.find(
                (c) => c.name.toLowerCase() === wt.name.toLowerCase()
              );
              return {
                name: wt.name,
                category: catalogMatch?.category || "pantry",
                symbolicMeaning: catalogMatch?.symbolicMeaning || wt.correspondence,
                correspondenceRole: wt.reason,
              };
            }),
            fireHazardIncluded: baseWorking.youWillNeed.some((i) =>
              i.toLowerCase().includes("candle")
            ),
            unmappedCustomIngredients: baseWorking.unmappedCustomIngredients,
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const aiData = json.data;
          source = json.meta?.source || "oracle-ai";
          if (json.meta?.fallback) {
            notice = "The Oracle returned to the written tradition for this working.";
          }

          finalWorking = {
            id: baseWorking.id,
            title: aiData.title || baseWorking.title,
            effectiveIntention: baseWorking.effectiveIntention,
            intentionDescription: aiData.intentionDescription || baseWorking.intentionDescription,
            youWillNeed: baseWorking.youWillNeed,
            whyThese: aiData.ingredientReasons && aiData.ingredientReasons.length > 0
              ? aiData.ingredientReasons
              : baseWorking.whyThese,
            preparation: aiData.preparationSteps && aiData.preparationSteps.length > 0
              ? aiData.preparationSteps
              : baseWorking.preparation,
            theWorking: aiData.ritualSteps && aiData.ritualSteps.length > 0
              ? aiData.ritualSteps
              : baseWorking.theWorking,
            closing: aiData.closing || baseWorking.closing,
            optionalTiming: aiData.optionalTiming || baseWorking.optionalTiming,
            consider: aiData.reflectionPrompt || baseWorking.consider,
            carryThisWithYou: aiData.practicalTakeaway || baseWorking.carryThisWithYou,
            safetyNotes: aiData.safetyNotes || baseWorking.safetyNotes,
            unmappedCustomIngredients: baseWorking.unmappedCustomIngredients,
          };
        }
      } else {
        notice = "The Oracle returned to the written tradition for this working.";
      }
    } catch (err) {
      notice = "The Oracle returned to the written tradition for this working.";
    }

    setWorkingSource(source);
    setFallbackNotice(notice);
    setWorkingResult({
      success: true,
      working: finalWorking,
    });
    recordSanctumTestEvent("working_completed", finalWorking.title);
    setIsSynthesizing(false);

    recordSanctumActivity({
      type: "working",
      id: finalWorking.id,
      title: finalWorking.title,
    });
  };

  // Save generated working to Grimoire ledger
  const handleSaveToGrimoire = () => {
    if (!workingResult?.working) return;
    const w = workingResult.working;
    const today = getTodayLocalDateString();

    const record: SanctumWorkingRecord = {
      id: w.id,
      type: "working",
      timestamp: new Date().toISOString(),
      localDate: today,
      intention: w.effectiveIntention,
      customIntention: customIntention.trim() || undefined,
      selectedIngredients,
      usedIngredients: w.youWillNeed,
      ingredientReasons: w.whyThese,
      title: w.title,
      intentionDescription: w.intentionDescription,
      preparationSteps: w.preparation,
      ritualSteps: w.theWorking,
      closing: w.closing,
      optionalTiming: w.optionalTiming,
      reflectionPrompt: w.consider,
      practicalTakeaway: w.carryThisWithYou,
      safetyNotes: w.safetyNotes,
      savedToGrimoire: true,
    };

    saveReadingToGrimoire(record);
    recordSanctumTestEvent("working_saved", record.title);
    setIsSaved(true);
  };

  // Print or export card
  const handlePrintCard = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Occult Split Workstation Layout matching the reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN: THE ORACLE WORKSTATION CONSOLE
           ========================================================================= */}
        <section
          className="lg:col-span-6 xl:col-span-5 sanctum-panel sanctum-corners p-5 sm:p-7 border border-purple-900/60 space-y-6"
          aria-labelledby="oracle-workstation-heading"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div>
                <h2
                  id="oracle-workstation-heading"
                  className="font-serif text-lg font-bold uppercase tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-bone to-purple-200"
                >
                  The Oracle
                </h2>
                <span className="text-[9px] font-mono tracking-widest text-purple-300/70 uppercase block">
                  A CONVERSATION. A RITUAL. A WAY FORWARD.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="text-[10px] font-mono uppercase tracking-widest text-purple-400 hover:text-white px-2 py-1 rounded bg-[#130726] border border-purple-900/50 hover:border-purple-600 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Interactive Occult Conversation Stream */}
          <div className="space-y-4 font-sans text-xs">
            {/* Oracle Message 1: Intention prompt */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 pt-0.5">
                <SanctumCrest className="w-7 h-7 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              </div>
              <div className="flex-1 p-3.5 rounded-xl rounded-tl-sm bg-[#110722] border border-purple-900/40 space-y-1.5 shadow-subtle">
                <p className="font-serif text-sm font-semibold text-purple-100">
                  What are you trying to call in?
                </p>
                <p className="text-bone-muted leading-relaxed">
                  Be as honest or as simple as you like. Intention is a thread — I&apos;ll help you weave it.
                </p>
              </div>
            </div>

            {/* User Intention Choice */}
            {selectedIntention ? (
              <div className="flex items-start justify-end gap-2 pl-8">
                <div className="p-3 rounded-xl rounded-tr-sm bg-gradient-to-r from-[#581c87] to-[#7e22ce] border border-purple-400/60 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] space-y-1 max-w-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-purple-100">
                      {selectedIntention === "Something Else"
                        ? customIntention || "Custom Intention"
                        : SANCTUM_INTENTIONS.find((i) => i.key === selectedIntention)?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedIntention(null)}
                      className="text-purple-300 hover:text-white"
                      title="Change Intention"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-100/90 font-serif italic">
                    {selectedIntention === "Something Else"
                      ? customIntention || "Custom intention defined"
                      : SANCTUM_INTENTIONS.find((i) => i.key === selectedIntention)?.description}
                  </p>
                </div>
              </div>
            ) : (
              /* Intention Picker Drawer */
              <div className="pl-10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/80 block">
                  Select your primary intention:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {SANCTUM_INTENTIONS.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setSelectedIntention(item.key)}
                      className="p-2.5 rounded-lg bg-[#0e071a] border border-purple-900/60 hover:border-purple-400 hover:bg-[#1a0c33] text-left text-bone transition-all group"
                    >
                      <span className="font-serif text-xs font-semibold text-purple-200 group-hover:text-white block">
                        {item.label}
                      </span>
                      <span className="text-[9px] text-bone-dim line-clamp-1 font-sans">
                        {item.description.split(",")[0]}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedIntention("Something Else")}
                    className="p-2.5 rounded-lg bg-[#0e071a] border border-purple-900/60 hover:border-purple-400 hover:bg-[#1a0c33] text-left text-bone transition-all group col-span-2 sm:col-span-1"
                  >
                    <span className="font-serif text-xs font-semibold text-purple-300 group-hover:text-white block">
                      ✦ Something Else
                    </span>
                    <span className="text-[9px] text-bone-dim font-sans">Specify custom friction</span>
                  </button>
                </div>

                {selectedIntention === "Something Else" && (
                  <div className="pt-2">
                    <input
                      type="text"
                      maxLength={100}
                      value={customIntention}
                      onChange={(e) => setCustomIntention(e.target.value)}
                      placeholder="e.g. Cleansing bad energy after leaving a toxic job..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0414] border border-purple-700 text-xs text-bone focus:outline-none focus:border-purple-400"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Oracle Message 2: Pantry instruction */}
            <div className="flex items-start gap-3 pt-2">
              <div className="shrink-0 pt-0.5">
                <SanctumCrest className="w-7 h-7 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              </div>
              <div className="flex-1 p-3.5 rounded-xl rounded-tl-sm bg-[#110722] border border-purple-900/40 space-y-1.5 shadow-subtle">
                <p className="font-serif text-sm font-semibold text-purple-100">
                  Good. Clarity opens doors.
                </p>
                <p className="text-bone-muted leading-relaxed">
                  What ingredients do you have available? Select any that resonate — or tell me what&apos;s on hand.
                </p>
              </div>
            </div>
          </div>

          {/* YOUR PANTRY SECTION (matching reference layout and pill styling) */}
          <div className="space-y-3 pt-2 border-t border-purple-900/40">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-purple-300">
              <span className="font-bold flex items-center gap-1.5">
                <span>Your Pantry</span>
              </span>
              <span className="text-[10px] text-purple-400/70">Select all that apply</span>
            </div>

            {/* 12 Core Household Pantry Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SANCTUM_INGREDIENT_CATALOG.map((item) => {
                const isSelected = selectedIngredients.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleIngredient(item.name)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono tracking-wide flex items-center justify-between gap-1.5 transition-all text-left ${
                      isSelected
                        ? "sanctum-pill-active"
                        : "sanctum-pill"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="font-medium truncate">{item.name}</span>
                    <span className="text-[10px] opacity-75 shrink-0">
                      {isSelected ? "✓" : "＋"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Pantry Items Adder */}
            <div className="pt-1 space-y-2">
              {customIngredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {customIngredients.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#170a2c] border border-purple-600/60 text-[11px] font-mono text-purple-200"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomIngredient(item)}
                        className="hover:text-red-400 text-purple-400 transition-colors ml-1"
                        aria-label={`Remove custom ingredient ${item}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {showCustomInput ? (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    maxLength={50}
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCustomIngredient()}
                    placeholder="e.g. Iron nail, pen & paper, chalk..."
                    className="flex-1 px-3 py-2 rounded-lg bg-[#0a0414] border border-purple-700 text-xs font-sans text-bone focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomIngredient}
                    className="px-3 py-2 rounded-lg bg-purple-900 hover:bg-purple-800 text-white text-xs font-mono uppercase tracking-wider"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="p-2 text-bone-dim hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-purple-300/80 hover:text-purple-200 transition-colors pt-1"
                >
                  <Plus className="w-3 h-3 text-purple-400" />
                  <span>Add something else from your cupboard</span>
                </button>
              )}
            </div>
          </div>

          {/* Situation Context Note Box */}
          <div className="space-y-1.5 pt-2">
            <textarea
              rows={2}
              value={situationNote}
              onChange={(e) => setSituationNote(e.target.value)}
              placeholder="Add a note about your situation, a specific question, or any other details..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#090312] border border-purple-900/60 focus:border-purple-400 text-xs font-sans text-bone placeholder-bone-dim/60 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          {/* Validation Alert */}
          {workingResult && !workingResult.success && (
            <div className="p-4 rounded-xl bg-[#1c0828] border border-red-900/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-red-300 font-mono font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Working Incongruence</span>
              </div>
              <p className="text-red-200 font-sans leading-relaxed">
                {workingResult.errorMessage}
              </p>
              {workingResult.suggestions && workingResult.suggestions.length > 0 && (
                <ul className="text-bone-muted space-y-1 list-disc list-inside pt-1">
                  {workingResult.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Big Electric Purple Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSynthesize}
              disabled={
                !selectedIntention ||
                (selectedIngredients.length === 0 && customIngredients.length === 0) ||
                isSynthesizing
              }
              className="w-full py-3.5 px-6 rounded-xl sanctum-btn-electric font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSynthesizing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                  <span>CONSULTING THE ORACLE...</span>
                </>
              ) : (
                <>
                  <span>CONSULT THE ORACLE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Micro Telemetry & Privacy Badges at bottom of Left Panel */}
          <div className="pt-3 border-t border-purple-900/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-purple-300/80">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-purple-200">1 Free Working</span>
                <span className="text-bone-dim text-[9px]">New users receive complimentary ritual synthesis.</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-purple-200">Private & Ephemeral</span>
                <span className="text-bone-dim text-[9px]">Your consultations are stored locally in your browser.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            RIGHT COLUMN: GOTHIC RITUAL PARCHMENT DOCUMENT
           ========================================================================= */}
        <section
          className="lg:col-span-6 xl:col-span-7 sanctum-parchment rounded-xl p-6 sm:p-9 border border-purple-500/40 relative shadow-2xl min-h-[550px] flex flex-col justify-between"
          aria-labelledby="ritual-parchment-heading"
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

          {/* DORMANT STATE: Waiting for synthesis */}
          {!workingResult?.working && (
            <div className="my-auto text-center space-y-6 py-12 px-4 relative z-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#130728] border border-purple-600/50 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                <SanctumCrest className="w-14 h-14" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-purple-300">
                  Ritual Chamber // Standby
                </div>
                <h3
                  id="ritual-parchment-heading"
                  className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200"
                >
                  The Grimoire Parchment
                </h3>
                <p className="text-xs sm:text-sm text-bone-muted font-sans leading-relaxed">
                  Select your core intention and pantry materials on the left console, then consult the Oracle. Your customized working, correspondences, and sequential ritual steps will crystallize here.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <MoonPhaseStrip />
              </div>
            </div>
          )}

          {/* ACTIVE SYNTHESIZED WORKING STATE */}
          {workingResult?.working && (
            <article className="space-y-8 relative z-10">
              {/* Parchment Title Header */}
              <header className="border-b border-purple-900/40 pb-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300">
                  <span>A WORKING FOR</span>
                  <div className="flex items-center gap-2">
                    {workingSource === "oracle-ai" ? (
                      <span className="px-2 py-0.5 rounded bg-purple-900/50 border border-purple-400/50 text-[9px] text-purple-200 font-bold">
                        ✦ Oracle Formulated
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-[9px] text-bone-dim">
                        Written Tradition
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <h2
                      id="ritual-parchment-heading"
                      className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 drop-shadow-[0_0_12px_rgba(192,132,252,0.3)] leading-tight"
                    >
                      {workingResult.working.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-serif italic text-purple-200/90 leading-relaxed">
                      “{workingResult.working.intentionDescription}”
                    </p>
                  </div>

                  {/* Top Right Atmospheric Crest Thumbnail */}
                  <div className="hidden sm:block shrink-0 p-2 rounded-xl bg-[#090312] border border-purple-800/60 text-center">
                    <SanctumCrest className="w-10 h-10 mx-auto" />
                    <span className="text-[8px] font-mono tracking-widest text-purple-300 block uppercase mt-1">
                      SANCTUM
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <MoonPhaseStrip />
                </div>
              </header>

              {/* INTENTION */}
              <section className="space-y-1.5" aria-labelledby="parchment-intention">
                <h4 id="parchment-intention" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Intention
                </h4>
                <p className="text-xs text-bone font-sans leading-relaxed bg-[#0b0517] p-3 rounded-lg border border-purple-900/40">
                  {workingResult.working.intentionDescription}
                </p>
              </section>

              {/* INGREDIENTS */}
              <section className="space-y-2" aria-labelledby="parchment-ingredients">
                <h4 id="parchment-ingredients" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {workingResult.working.youWillNeed.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md bg-[#130728] border border-purple-700/60 text-xs font-mono text-purple-100 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                  {workingResult.working.unmappedCustomIngredients?.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md bg-[#0e061c] border border-purple-900/60 text-xs font-mono text-bone-muted italic"
                    >
                      + {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* CORRESPONDENCES (Why each ingredient was chosen) */}
              <section className="space-y-2.5" aria-labelledby="parchment-correspondences">
                <h4 id="parchment-correspondences" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Correspondences
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {workingResult.working.whyThese.map((wt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0c051a] border border-purple-900/50 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-purple-200">{wt.name}</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-purple-400/80">
                          {wt.correspondence.split(",")[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-bone-muted font-sans leading-relaxed">
                        {wt.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* PREPARATION */}
              <section className="space-y-2" aria-labelledby="parchment-prep">
                <h4 id="parchment-prep" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Preparation
                </h4>
                <ol className="space-y-1.5 text-xs text-bone-muted font-sans">
                  {workingResult.working.preparation.map((prep, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-purple-400 font-semibold">{idx + 1}.</span>
                      <span>{prep}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* RITUAL STEPS */}
              <section className="space-y-3" aria-labelledby="parchment-ritual-steps">
                <h4 id="parchment-ritual-steps" className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-300 font-bold">
                  Working Mechanics
                </h4>
                <div className="space-y-2.5">
                  {workingResult.working.theWorking.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 rounded-lg bg-[#0e061c] border border-purple-900/50 space-y-1 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500 text-purple-200 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {step.step}
                        </span>
                        <h5 className="font-serif font-bold text-purple-100 uppercase tracking-wide">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-bone-muted font-sans leading-relaxed pl-7">
                        {step.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CLOSING & REFLECTION */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-[#0b0416] border border-purple-900/40 space-y-1 text-xs">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                    Closing Spoken Boundary
                  </span>
                  <p className="text-bone-muted font-sans italic leading-relaxed">
                    {workingResult.working.closing}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b0416] border border-purple-900/40 space-y-1 text-xs">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                    Practical Psychological Action
                  </span>
                  <p className="text-bone-muted font-sans leading-relaxed">
                    {workingResult.working.carryThisWithYou}
                  </p>
                </div>
              </section>

              {/* SAFETY NOTES */}
              {workingResult.working.safetyNotes && (
                <div className="p-3 rounded-lg bg-[#14061e] border border-purple-900/60 flex items-start gap-2.5 text-xs text-purple-200/90 font-sans">
                  <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p>{workingResult.working.safetyNotes}</p>
                </div>
              )}

              {/* BOTTOM ACTIONS BAR (Save to Grimoire / Printable Card) */}
              <div className="pt-6 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
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
                    onClick={handlePrintCard}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#120722] hover:bg-[#1c0c36] border border-purple-900/60 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-purple-400" />
                    <span>Printable Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWorkingResult(null);
                      setIsSaved(false);
                    }}
                    className="p-2.5 rounded-lg bg-[#120722] hover:bg-[#1c0c36] border border-purple-900/60 text-purple-400 hover:text-white transition-colors"
                    title="Formulate Another Working"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          )}
        </section>
      </div>
    </div>
  );
}
