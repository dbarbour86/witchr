"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SANCTUM_INTENTIONS,
  SANCTUM_INGREDIENT_CATALOG,
  SanctumIntentionKey,
  getSanctumIngredientImage,
} from "@/content/sanctum-workings";
import {
  synthesizeWorking,
  detectTimingCue,
  GeneratedWorking,
  WorkingEngineResult,
} from "@/lib/sanctum/working-engine";
import {
  SanctumWorkingRecord,
  saveReadingToGrimoire,
  isReadingSavedToGrimoire,
  getTodayLocalDateString,
} from "@/lib/sanctum/storage";
import { recordSanctumActivity } from "@/lib/sanctum/progression";
import { recordSanctumTestEvent } from "@/lib/sanctum/test-events";
import {
  FourPointStar,
  TarotCornerFlourish,
} from "@/components/OrnateFrames";
import {
  Plus,
  X,
  Check,
  BookOpen,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Printer,
  Sparkles,
  Flame,
  Droplets,
  Feather,
  Edit2,
  Moon,
  Sun,
  Shield,
  Sprout,
  Bed,
} from "lucide-react";

type WizardStep = 1 | 2 | 3;

export function WorkingBuilderClient() {
  const searchParams = useSearchParams();

  // Wizard state: 1: Intention, 2: Ingredients, 3: Your Ritual
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  // Intention state
  const [selectedIntention, setSelectedIntention] = useState<SanctumIntentionKey | "Something Else" | null>(null);
  const [customIntention, setCustomIntention] = useState("");
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // Ingredients state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [customInputText, setCustomInputText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [situationNote, setSituationNote] = useState("");

  // Synthesis & Result state
  const [workingResult, setWorkingResult] = useState<WorkingEngineResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [workingSource, setWorkingSource] = useState<"oracle-ai" | "written-tradition">("written-tradition");
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [fallbackDiagnostic, setFallbackDiagnostic] = useState<string | null>(null);

  // Consume intention passed from Oracle chat or deep link (?intention=... or ?q=...)
  useEffect(() => {
    const rawIntention = searchParams.get("intention") || searchParams.get("q");
    if (rawIntention && rawIntention.trim().length > 0) {
      const trimmed = rawIntention.trim();
      const match = SANCTUM_INTENTIONS.find(
        (i) => i.key.toLowerCase() === trimmed.toLowerCase() || i.label.toLowerCase() === trimmed.toLowerCase()
      );
      if (match) {
        setSelectedIntention(match.key);
      } else {
        setSelectedIntention("Something Else");
        setCustomIntention(trimmed);
        setIsEditingCustom(false);
      }
    }
  }, [searchParams]);

  // Keep saved state in sync
  useEffect(() => {
    if (workingResult?.working?.id) {
      setIsSaved(isReadingSavedToGrimoire(workingResult.working.id));
    }
  }, [workingResult]);

  // Ingredient toggle handlers
  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleAddCustomIngredient = () => {
    const trimmed = customInputText.trim();
    if (!trimmed) return;
    const exists = customIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase()) ||
                   selectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      setCustomIngredients((prev) => [...prev, trimmed]);
      setSelectedIngredients((prev) => [...prev, trimmed]);
    }
    setCustomInputText("");
    setShowCustomInput(false);
  };

  const handleRemoveCustomIngredient = (name: string) => {
    setCustomIngredients((prev) => prev.filter((i) => i !== name));
    setSelectedIngredients((prev) => prev.filter((i) => i !== name));
  };

  // Perform Ritual Synthesis
  const handleSynthesize = async () => {
    if (isSynthesizing) return;
    const finalCustomText = customIntention.trim();

    // 1. Run deterministic foundation synthesis & validation first
    const deterministicResult = synthesizeWorking({
      intention: selectedIntention || "Something Else",
      customIntention: selectedIntention === "Something Else" || finalCustomText ? finalCustomText : undefined,
      selectedIngredients,
      customIngredients,
    });

    if (!deterministicResult.success || !deterministicResult.working) {
      setWorkingResult(deterministicResult);
      setIsSaved(false);
      setWorkingSource("written-tradition");
      setFallbackNotice(null);
      setCurrentStep(3); // Show error state in result view
      return;
    }

    // 2. Transition to Step 3 and synthesize
    setIsSynthesizing(true);
    setCurrentStep(3);
    setIsSaved(false);
    setFallbackNotice(null);
    setFallbackDiagnostic(null);

    const baseWorking = deterministicResult.working;
    let finalWorking: GeneratedWorking = baseWorking;
    let source: "oracle-ai" | "written-tradition" = "written-tradition";
    let notice: string | null = null;
    let diagnostic: string | null = null;

    try {
      const effectiveIntentionToSend = selectedIntention || baseWorking.effectiveIntention || finalCustomText || "Calm";
      const res = await fetch("/api/sanctum/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "working",
          payload: {
            intention: effectiveIntentionToSend,
            customIntention: finalCustomText || undefined,
            effectiveIntention: baseWorking.effectiveIntention || effectiveIntentionToSend,
            timingCue: detectTimingCue(finalCustomText || undefined),
            leftOutIngredients: baseWorking.leftOutIngredients,
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
            notice = "The Oracle couldn’t respond. Here’s a ritual created from Witchr’s reference rules.";
            diagnostic = json.meta?.fallbackReason || "Rule-based fallback";
          }

          let rawTitle = aiData.title || baseWorking.title;
          if (/^A WORKING FOR/i.test(rawTitle)) {
            rawTitle = rawTitle.replace(/^A WORKING FOR/i, "A RITUAL FOR");
          } else if (/^SOVEREIGN WORKING FOR/i.test(rawTitle)) {
            rawTitle = rawTitle.replace(/^SOVEREIGN WORKING FOR/i, "SOVEREIGN RITUAL FOR");
          } else if (/^WORKING FOR/i.test(rawTitle)) {
            rawTitle = rawTitle.replace(/^WORKING FOR/i, "RITUAL FOR");
          }

          finalWorking = {
            id: baseWorking.id,
            title: rawTitle,
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
            leftOutIngredients: aiData.leftOutIngredients || baseWorking.leftOutIngredients,
            unmappedCustomIngredients: baseWorking.unmappedCustomIngredients,
          };
        }
      } else {
        source = "written-tradition";
        notice = "The Oracle couldn’t respond. Here’s a ritual created from Witchr’s reference rules.";
        diagnostic = `Server returned status ${res.status}: ${res.statusText || "Bad Request"}`;
      }
    } catch (err) {
      source = "written-tradition";
      notice = "The Oracle couldn’t respond. Here’s a ritual created from Witchr’s reference rules.";
      diagnostic = err instanceof Error ? err.message : "Network/connection error";
    }

    setWorkingSource(source);
    setFallbackNotice(notice);
    setFallbackDiagnostic(diagnostic);
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

  // Save generated ritual to Grimoire ledger
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
      leftOutIngredients: w.leftOutIngredients,
    };

    saveReadingToGrimoire(record);
    recordSanctumTestEvent("working_saved", record.title);
    setIsSaved(true);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Helper icons for intent suggestions
  const getIntentIcon = (intentKey: string) => {
    switch (intentKey) {
      case "Rest":
      case "Calm":
        return <Moon className="w-4 h-4" />;
      case "Confidence":
        return <Sun className="w-4 h-4" />;
      case "Clarity":
        return <Sparkles className="w-4 h-4" />;
      case "Protection":
        return <Shield className="w-4 h-4" />;
      case "Focus":
        return <Sprout className="w-4 h-4" />;
      default:
        return <FourPointStar className="w-4 h-4" />;
    }
  };

  const activeIntentionLabel =
    selectedIntention === "Something Else"
      ? (customIntention.trim() || "Custom Intention")
      : selectedIntention || "None selected";

  return (
    <div className="w-full">
      {/* =========================================================================
          FOCUSED 3-STEP RITUAL BUILDER WORKSTATION
          Matches the "Create a Ritual" mockup design:
          - Ornate celestial outer frame with corner filigree
          - Header: Moon phase ribbon + "CREATE A RITUAL" + subtitle
          - 3-Step indicator: 1 INTENTION -> 2 INGREDIENTS -> 3 YOUR RITUAL
          ========================================================================= */}
      <section
        aria-label="Create a Ritual Workstation"
        className="relative w-full rounded-2xl sanctum-celestial-frame p-5 sm:p-8 lg:p-10 shadow-[0_0_80px_rgba(76,29,149,0.35)] overflow-hidden sanctum-grain"
      >
        {/* Ornate Corner Flourishes */}
        <div className="absolute top-3 left-3 opacity-60 pointer-events-none">
          <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
        </div>
        <div className="absolute top-3 right-3 opacity-60 pointer-events-none rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-60 pointer-events-none -rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
        </div>
        <div className="absolute bottom-3 right-3 opacity-60 pointer-events-none rotate-180">
          <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
        </div>

        {/* Outer Filigree Inset Line */}
        <div className="absolute inset-3 rounded-[1rem] border border-purple-700/25 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Header & Celestial Moon Phase Ribbon */}
          <div className="text-center space-y-2">
            {/* Celestial Moon Phase Ribbon */}
            <div className="flex items-center justify-center gap-2 text-purple-300/70 py-1">
              <span className="text-[9px]">· · ·</span>
              <span className="text-xs">☽</span>
              <span className="text-sm">)</span>
              <span className="text-base text-purple-200">◯</span>
              <span className="text-sm">(</span>
              <span className="text-xs">☾</span>
              <span className="text-[9px]">· · ·</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 uppercase drop-shadow-[0_0_16px_rgba(192,132,252,0.4)]">
              CREATE A RITUAL
            </h1>
            <p className="font-serif text-xs sm:text-sm text-purple-200/90 tracking-wide">
              A simple ritual for what you need, using what you have.
            </p>
          </div>

          {/* 3-Step Flow Indicator */}
          <div className="flex items-center justify-center max-w-md mx-auto pt-1 pb-4">
            {/* Step 1: Intention */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  currentStep === 1
                    ? "bg-purple-900 border-2 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                    : currentStep > 1
                    ? "bg-purple-950/80 border border-purple-600 text-purple-300"
                    : "bg-[#110526] border border-purple-900/60 text-purple-400/60"
                }`}
              >
                1
              </div>
              <span
                className={`text-[9.5px] font-mono uppercase tracking-[0.18em] transition-colors ${
                  currentStep === 1 ? "text-purple-200 font-bold" : "text-purple-400/70 group-hover:text-purple-300"
                }`}
              >
                INTENTION
              </span>
            </button>

            {/* Connecting Line 1-2 */}
            <div className={`flex-1 h-0.5 mx-3 transition-colors ${currentStep >= 2 ? "bg-purple-600" : "bg-purple-900/40"}`} />

            {/* Step 2: Ingredients */}
            <button
              type="button"
              onClick={() => {
                if (selectedIntention || customIntention.trim()) {
                  setCurrentStep(2);
                }
              }}
              disabled={!selectedIntention && !customIntention.trim()}
              className="flex flex-col items-center gap-1.5 focus:outline-none disabled:cursor-not-allowed cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  currentStep === 2
                    ? "bg-purple-900 border-2 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                    : currentStep > 2
                    ? "bg-purple-950/80 border border-purple-600 text-purple-300"
                    : "bg-[#110526] border border-purple-900/60 text-purple-400/60"
                }`}
              >
                2
              </div>
              <span
                className={`text-[9.5px] font-mono uppercase tracking-[0.18em] transition-colors ${
                  currentStep === 2 ? "text-purple-200 font-bold" : "text-purple-400/70 group-hover:text-purple-300"
                }`}
              >
                INGREDIENTS
              </span>
            </button>

            {/* Connecting Line 2-3 */}
            <div className={`flex-1 h-0.5 mx-3 transition-colors ${currentStep === 3 ? "bg-purple-600" : "bg-purple-900/40"}`} />

            {/* Step 3: Your Ritual */}
            <button
              type="button"
              onClick={() => {
                if (workingResult?.working) {
                  setCurrentStep(3);
                }
              }}
              disabled={!workingResult?.working && !isSynthesizing}
              className="flex flex-col items-center gap-1.5 focus:outline-none disabled:cursor-not-allowed cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  currentStep === 3
                    ? "bg-purple-900 border-2 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                    : "bg-[#110526] border border-purple-900/60 text-purple-400/60"
                }`}
              >
                3
              </div>
              <span
                className={`text-[9.5px] font-mono uppercase tracking-[0.18em] transition-colors ${
                  currentStep === 3 ? "text-purple-200 font-bold" : "text-purple-400/70 group-hover:text-purple-300"
                }`}
              >
                YOUR RITUAL
              </span>
            </button>
          </div>

          {/* ===================================================================
              STEP 1: INTENTION FLOW (What would you like help with?)
              =================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold block">
                  WHAT WOULD YOU LIKE HELP WITH?
                </span>

                {/* Grid of supported intentions with clear selected states */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {SANCTUM_INTENTIONS.map((intent) => {
                    const isSelected = selectedIntention === intent.key;
                    return (
                      <button
                        key={intent.key}
                        type="button"
                        onClick={() => {
                          setSelectedIntention(intent.key);
                          if (!customIntention.trim()) {
                            setCustomIntention(intent.description);
                          }
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-900/80 to-[#2c0e5b] border-purple-400 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                            : "bg-[#0d041e] border-purple-900/60 text-purple-200 hover:border-purple-600 hover:bg-[#16062f]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg ${isSelected ? "text-purple-200 bg-purple-950" : "text-purple-400 bg-[#16072e]"}`}>
                            {getIntentIcon(intent.key)}
                          </div>
                          <span className="font-serif text-sm font-semibold tracking-wide">
                            {intent.label}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-purple-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Field for User's Own Words */}
              <div className="space-y-2 pt-2">
                <label
                  htmlFor="ritual-intention-input"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold block"
                >
                  DESCRIBE YOUR INTENTION
                </label>
                <div className="rounded-xl border-2 border-purple-800/80 bg-[#0d041e] focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/30 p-3 shadow-inner">
                  <textarea
                    id="ritual-intention-input"
                    rows={3}
                    value={customIntention}
                    onChange={(e) => setCustomIntention(e.target.value)}
                    placeholder="E.g., A calm start to the day after a restless night..."
                    className="w-full bg-transparent text-sm text-bone placeholder-purple-300/40 outline-none font-serif resize-none leading-relaxed"
                  />
                </div>
                <p className="text-[11px] font-mono text-purple-300/60">
                  Choose a suggestion above or write your own specific intention.
                </p>
              </div>

              {/* Primary Next Action */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedIntention && !customIntention.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-300/60 text-white text-xs sm:text-sm font-serif font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.55)] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>NEXT: INGREDIENTS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 2: INGREDIENTS FLOW (Available items + custom entries)
              =================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Intention Summary with Edit Link */}
              <div className="p-3.5 rounded-xl bg-[#0e0520] border border-purple-800/60 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-purple-400 block font-semibold">
                    YOUR INTENTION
                  </span>
                  <p className="font-serif text-sm text-bone truncate mt-0.5">
                    &ldquo;{customIntention.trim() || selectedIntention || "General intention"}&rdquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#17082e] hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-purple-400" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Available Ingredients */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold block">
                  AVAILABLE PANTRY &amp; HERBAL INGREDIENTS
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SANCTUM_INGREDIENT_CATALOG.map((item) => {
                    const isSelected = selectedIngredients.includes(item.name);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleIngredient(item.name)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-900/80 to-[#2b0c58] border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                            : "bg-[#0d041e] border-purple-900/60 text-purple-200 hover:border-purple-600 hover:bg-[#15062c]"
                        }`}
                      >
                        <span className="font-serif text-xs sm:text-sm font-semibold truncate pr-1">
                          {item.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Ingredients */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold">
                    CUSTOM INGREDIENTS
                  </span>
                  {!showCustomInput && (
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-purple-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-purple-400" />
                      <span>Add Ingredient</span>
                    </button>
                  )}
                </div>

                {showCustomInput && (
                  <div className="flex items-center gap-2 p-1.5 rounded-xl border border-purple-700/80 bg-[#0d041e]">
                    <input
                      type="text"
                      value={customInputText}
                      onChange={(e) => setCustomInputText(e.target.value)}
                      placeholder="E.g., Mint, Cinnamon stick, Obsidian..."
                      className="w-full bg-transparent px-2 text-xs sm:text-sm text-bone placeholder-purple-300/40 outline-none font-serif"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomIngredient();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomIngredient}
                      className="shrink-0 px-3 py-1 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-xs font-mono uppercase tracking-wider"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="p-1 text-purple-400 hover:text-purple-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {customIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {customIngredients.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/80 text-purple-200 text-xs font-serif shadow-sm"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomIngredient(item)}
                          className="hover:text-white"
                          aria-label={`Remove ${item}`}
                        >
                          <X className="w-3 h-3 text-purple-400" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Situation Details */}
              <div className="space-y-1.5 pt-1">
                <label
                  htmlFor="situation-note-input"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200/90 font-semibold block"
                >
                  ADDITIONAL SITUATION CONTEXT (OPTIONAL)
                </label>
                <input
                  id="situation-note-input"
                  type="text"
                  value={situationNote}
                  onChange={(e) => setSituationNote(e.target.value)}
                  placeholder="E.g., Doing this before an important morning interview..."
                  className="w-full p-2.5 rounded-xl border border-purple-900/60 bg-[#0d041e] text-xs sm:text-sm text-bone placeholder-purple-300/40 outline-none font-serif focus:border-purple-500"
                />
              </div>

              {/* Action Buttons: Back & Create Ritual */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#120626] hover:bg-[#1f0b3e] border border-purple-800 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Intention</span>
                </button>

                <button
                  type="button"
                  onClick={handleSynthesize}
                  disabled={selectedIngredients.length === 0 && customIngredients.length === 0}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-300/60 text-white text-xs sm:text-sm font-serif font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.55)] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CREATE RITUAL</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 3: YOUR RITUAL FLOW (Synthesized ritual as main content)
              =================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Loading State */}
              {isSynthesizing && (
                <div className="p-10 rounded-xl bg-[#0c031a] border border-purple-800/80 text-center space-y-4">
                  <Sparkles className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-bone">Synthesizing Your Ritual</h3>
                    <p className="text-xs font-mono text-purple-300/80 uppercase tracking-widest">
                      Consulting correspondences &amp; grounding in your intention...
                    </p>
                  </div>
                </div>
              )}

              {/* Validation / Incongruence Error State */}
              {workingResult && !workingResult.success && (
                <div className="p-6 rounded-xl bg-[#160515] border border-rose-800/80 space-y-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-rose-200">Unable to Formulate Ritual</h3>
                    <p className="text-sm font-serif text-rose-200/90 leading-relaxed">
                      {workingResult.errorMessage}
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2 rounded-lg bg-rose-950 border border-rose-600 text-rose-200 text-xs font-mono uppercase tracking-wider"
                    >
                      Adjust Ingredients
                    </button>
                  </div>
                </div>
              )}

              {/* Rendered Ritual Result */}
              {workingResult?.working && !isSynthesizing && (() => {
                const w = workingResult.working;
                return (
                  <article className="space-y-6">
                    {/* Fallback Notice if active */}
                    {fallbackNotice && (
                      <div className="p-3.5 rounded-lg bg-[#15092a] border border-amber-800/60 text-amber-200/90 text-xs font-mono space-y-1.5">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-sans text-xs text-amber-100">{fallbackNotice}</span>
                        </div>
                        {fallbackDiagnostic && process.env.NODE_ENV !== "production" && (
                          <div className="pl-6 text-[10px] text-amber-400/70 font-mono">
                            Diagnostic: {fallbackDiagnostic}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ritual Title & Intention */}
                    <div className="p-6 rounded-xl bg-[#0e041e] border border-purple-800/70 shadow-inner space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/50 pb-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300 font-semibold">
                          CONSECRATED RITUAL
                        </span>
                        <span className="text-[10px] font-mono text-purple-400/80">
                          {workingSource === "oracle-ai" ? "Live Oracle Guidance" : "Traditional Formulation"}
                        </span>
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-bone">
                        {w.title.replace(/^A WORKING FOR/i, "A RITUAL FOR").replace(/^SOVEREIGN WORKING FOR/i, "SOVEREIGN RITUAL FOR")}
                      </h2>
                      <p className="font-serif text-sm text-purple-200/90 leading-relaxed">
                        {w.intentionDescription}
                      </p>
                    </div>

                    {/* Ingredients & Why These with Visual Witchr Thumbnails */}
                    <div className="p-6 rounded-xl bg-[#0e041e] border border-purple-800/70 space-y-4">
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold">
                        WHY THESE INGREDIENTS
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {w.whyThese.map((wt) => {
                          const asset = getSanctumIngredientImage(wt.name);
                          return (
                            <div
                              key={wt.name}
                              className="p-3.5 rounded-xl bg-[#15072e] border border-purple-900/60 flex items-start gap-3 sm:gap-4 shadow-sm"
                            >
                              {asset ? (
                                <img
                                  src={asset.image}
                                  alt={asset.altText}
                                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-purple-700/60 shadow-md shrink-0 bg-[#0d031c]"
                                  loading="lazy"
                                />
                              ) : (
                                <div
                                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#110524] border border-purple-800/70 flex items-center justify-center shrink-0 shadow-inner"
                                  aria-hidden="true"
                                >
                                  <Sprout className="w-7 h-7 text-purple-300/70" />
                                </div>
                              )}
                              <div className="space-y-1 min-w-0">
                                <span className="font-serif text-sm sm:text-base font-bold text-bone block truncate">
                                  {wt.name}
                                </span>
                                <p className="text-xs font-sans text-bone-muted sm:text-bone leading-relaxed">
                                  {wt.reason}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Excluded Ingredients with Clear Honest Reasons */}
                      {w.leftOutIngredients && w.leftOutIngredients.length > 0 && (
                        <div className="pt-2 border-t border-purple-900/40 space-y-2">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-purple-300/80 block font-semibold">
                            LEFT OUT OF THIS RITUAL
                          </span>
                          <div className="space-y-1.5">
                            {w.leftOutIngredients.map((item) => (
                              <div key={item.name} className="text-xs font-sans text-purple-300/90 flex items-start gap-2">
                                <span className="font-semibold text-bone">{item.name}:</span>
                                <span>{item.reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* What You'll Need & Before You Begin */}
                    {(() => {
                      const isToolLine = (line: string) =>
                        /^(supporting household tools|additional household tools|tools needed|have a |prepare a )/i.test(line.trim());

                      const extractedTools = w.preparation
                        .filter(isToolLine)
                        .map((line) => line.replace(/^(supporting household tools:?|additional household tools:?|tools needed:?)\s*/i, "").trim());

                      const defaultTools: string[] = [];
                      defaultTools.push("A shallow dish, small saucer, or clean coaster (to keep materials contained)");
                      if (w.youWillNeed.some((i) => /bay/i.test(i))) {
                        defaultTools.push("A pen or pencil for writing on the bay leaf or petition paper");
                      }
                      if (w.youWillNeed.some((i) => /water/i.test(i))) {
                        defaultTools.push("A small clean cup or bowl for water");
                      }
                      if (w.youWillNeed.some((i) => /candle/i.test(i))) {
                        defaultTools.push("A sturdy heat-resistant candleholder or dish");
                      }

                      const toolsList = extractedTools.length > 0 ? extractedTools : defaultTools;

                      const beforeYouBeginSteps = w.preparation.filter(
                        (line) => !isToolLine(line) && !line.toLowerCase().startsWith("selected ingredients") && !line.toLowerCase().startsWith("gather your")
                      );

                      if (beforeYouBeginSteps.length === 0) {
                        beforeYouBeginSteps.push(
                          "Clear your immediate counter or table of digital devices, clutter, and wrappers.",
                          "Take three slow, measured breaths to center your attention before beginning."
                        );
                      }

                      return (
                        <div className="p-6 rounded-xl bg-[#0e041e] border border-purple-800/70 space-y-4">
                          <div className="space-y-3">
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold">
                              WHAT YOU&apos;LL NEED
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                              <div className="p-3.5 rounded-lg bg-[#14072b] border border-purple-900/60 space-y-2">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                                  Selected Ingredients (Modest Quantities)
                                </span>
                                <ul className="space-y-1.5 text-bone leading-relaxed">
                                  {w.youWillNeed.map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                      <span className="font-medium">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3.5 rounded-lg bg-[#14072b] border border-purple-900/60 space-y-2">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                                  Supporting Household Tools
                                </span>
                                <ul className="space-y-1.5 text-bone leading-relaxed">
                                  {toolsList.map((tool, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                                      <span>{tool}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Before You Begin */}
                          {beforeYouBeginSteps.length > 0 && (
                            <div className="pt-3 border-t border-purple-900/40 space-y-2">
                              <h4 className="font-mono text-[11px] uppercase tracking-wider text-purple-200 font-semibold">
                                BEFORE YOU BEGIN
                              </h4>
                              <ol className="space-y-1.5 text-xs sm:text-sm font-sans text-bone-muted sm:text-bone leading-relaxed">
                                {beforeYouBeginSteps.map((prep, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="font-mono text-purple-400 font-bold shrink-0">{idx + 1}.</span>
                                    <span>{prep}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Ritual Steps */}
                    <div className="p-6 rounded-xl bg-[#0e041e] border border-purple-800/70 space-y-4">
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-purple-200 font-semibold">
                        STEPS
                      </h3>
                      <ol className="space-y-4">
                        {w.theWorking.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-purple-950 border border-purple-700 flex items-center justify-center font-mono text-xs text-purple-300 mt-0.5">
                              {step.step || idx + 1}
                            </span>
                            <div className="pt-0.5 space-y-1 min-w-0">
                              <h4 className="font-serif font-bold text-purple-100">{step.title}</h4>
                              <p className="text-bone-muted sm:text-bone font-sans text-xs sm:text-sm leading-relaxed">
                                {step.instruction}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Closing & Carry Into Your Day */}
                    <div className="p-6 rounded-xl bg-[#0e041e] border border-purple-800/70 space-y-4">
                      {w.closing && (
                        <div className="space-y-1">
                          <h4 className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-semibold">
                            CLOSING THE RITUAL
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-bone-muted sm:text-bone leading-relaxed">
                            {w.closing}
                          </p>
                        </div>
                      )}

                      {w.carryThisWithYou && (
                        <div className="pt-2 border-t border-purple-900/40 space-y-1">
                          <h4 className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-semibold">
                            CARRY IT INTO YOUR DAY
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-purple-200 leading-relaxed italic">
                            &ldquo;{w.carryThisWithYou}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Safety Guidance */}
                      {w.safetyNotes && (
                        <div className="pt-2 border-t border-purple-900/40 p-3 rounded-lg bg-[#180820] border border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-200/90 font-sans">
                          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{w.safetyNotes}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Save to Grimoire, Print, Edit Ritual */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#120626] hover:bg-[#1f0b3e] border border-purple-800 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Ingredients / Intention</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrint}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#120626] hover:bg-[#1f0b3e] border border-purple-800/80 text-purple-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveToGrimoire}
                          disabled={isSaved}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            isSaved
                              ? "bg-purple-950 border border-purple-500/60 text-purple-300 opacity-90 cursor-default"
                              : "bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-300/60 text-white shadow-[0_0_16px_rgba(168,85,247,0.5)] active:scale-[0.98]"
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span>Saved to Grimoire</span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-4 h-4" />
                              <span>Save to Grimoire</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
