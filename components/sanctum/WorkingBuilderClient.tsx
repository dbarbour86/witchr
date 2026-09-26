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
import { Wand2, Plus, X, Check, BookOpen, RefreshCw, AlertTriangle, ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";

export function WorkingBuilderClient() {
  const [selectedIntention, setSelectedIntention] = useState<SanctumIntentionKey | "Something Else" | null>(null);
  const [customIntention, setCustomIntention] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
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
      setSelectedIngredients([]);
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
  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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

  // Trigger Working Synthesis
  const handleSynthesize = async () => {
    if (!selectedIntention || isSynthesizing) return;

    recordSanctumTestEvent("working_started");

    // 1. Run deterministic engine first to validate intention, ingredients, correspondences, and safety
    const deterministicResult = synthesizeWorking({
      intention: selectedIntention,
      customIntention: selectedIntention === "Something Else" ? customIntention : undefined,
      selectedIngredients,
      customIngredients,
    });

    // If deterministic validation failed (e.g. no ingredients, incongruence, empty intention):
    // Display validation error immediately. AI is never called on invalid inputs!
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
            customIntention: customIntention.trim() || undefined,
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

  // Reset to create another working
  const handleCreateAnother = () => {
    setWorkingResult(null);
    setIsSaved(false);
    setIsSynthesizing(false);
    setWorkingSource("written-tradition");
    setFallbackNotice(null);
  };

  return (
    <div className="space-y-12">
      {/* Page Context Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Practical Ritual Synthesis</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
          {workingResult?.working ? "YOUR FORMULATED WORKING" : "CREATE A WORKING"}
        </h1>

        <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
          {workingResult?.working
            ? "Your working has been synthesized around the tools in your hands. Review the symbolic mechanics, take note of why each element was chosen, and ground the intention into your day."
            : "Tell the Oracle what you are seeking and what ingredients you have available. Witchr synthesizes grounded, practical rituals tailored directly to your physical pantry."}
        </p>

        <CelestialDivider className="max-w-xs mx-auto my-4" />
      </div>

      {/* Synthesis Form (Visible when no active working is displayed) */}
      {!workingResult?.working && (
        <div className="tarot-frame p-6 sm:p-10 shadow-card-tarot space-y-10 relative">
          <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>
          <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
            <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
          </div>

          {/* STEP 1: Intention Selection */}
          <section className="space-y-4" aria-labelledby="step-intention-heading">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>Step 01 // Primary Focus</span>
              </span>
              <span className="text-[11px] font-mono text-bone-dim">Choose One</span>
            </div>

            <h2 id="step-intention-heading" className="font-serif text-2xl font-semibold text-bone">
              What are you seeking?
            </h2>

            <p className="text-xs text-bone-muted font-sans">
              Select the core friction or boundary you wish this working to resolve.
            </p>

            {/* Intention Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-2">
              {SANCTUM_INTENTIONS.map((item) => {
                const isSelected = selectedIntention === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedIntention(item.key)}
                    className={`px-3.5 py-2.5 rounded-lg border text-xs font-mono tracking-wide transition-all text-left flex flex-col justify-between min-h-[58px] ${
                      isSelected
                        ? "bg-surface-elevated border-lavender-moon text-lavender-light shadow-glow-subtle font-semibold"
                        : "bg-surface/80 border-border-subtle hover:border-border-highlight text-bone-muted hover:text-bone"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] text-bone-dim font-sans line-clamp-1">
                      {item.description.split(",")[0]}
                    </span>
                  </button>
                );
              })}

              {/* Something Else Button */}
              <button
                type="button"
                onClick={() => setSelectedIntention("Something Else")}
                className={`px-3.5 py-2.5 rounded-lg border text-xs font-mono tracking-wide transition-all text-left flex flex-col justify-between min-h-[58px] ${
                  selectedIntention === "Something Else"
                    ? "bg-surface-elevated border-lavender-moon text-lavender-light shadow-glow-subtle font-semibold"
                    : "bg-surface/80 border-border-subtle hover:border-border-highlight text-bone-muted hover:text-bone"
                }`}
                aria-pressed={selectedIntention === "Something Else"}
              >
                <span>Something Else</span>
                <span className="text-[9px] text-bone-dim font-sans">Custom inquiry</span>
              </button>
            </div>

            {/* Custom Intention Text Field */}
            {selectedIntention === "Something Else" && (
              <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                <label
                  htmlFor="custom-intention-input"
                  className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon block"
                >
                  Specify your custom intention:
                </label>
                <input
                  id="custom-intention-input"
                  type="text"
                  maxLength={100}
                  value={customIntention}
                  onChange={(e) => setCustomIntention(e.target.value)}
                  placeholder="e.g. Severing emotional baggage from my previous lease..."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border-highlight focus:border-lavender-moon focus:outline-none focus:ring-1 focus:ring-lavender-moon text-sm text-bone font-sans transition-colors placeholder:text-bone-dim"
                />
              </div>
            )}
          </section>

          {/* STEP 2: Available Ingredients */}
          <section className="space-y-4 pt-6 border-t border-border-subtle" aria-labelledby="step-ingredients-heading">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>Step 02 // Physical Arsenal</span>
              </span>
              <span className="text-[11px] font-mono text-bone-dim">Select Multiple</span>
            </div>

            <div className="space-y-1">
              <h2 id="step-ingredients-heading" className="font-serif text-2xl font-semibold text-bone">
                What do you have available?
              </h2>
              <p className="text-xs text-bone-muted font-sans">
                You may already have what you need. Select any items present in your cupboard; the Oracle will choose only what meaningfully serves the Working.
              </p>
            </div>

            {/* Standard Ingredient Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {SANCTUM_INGREDIENT_CATALOG.map((item) => {
                const isSelected = selectedIngredients.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleIngredient(item.id)}
                    className={`p-3 rounded-lg border text-left flex items-start justify-between gap-2 transition-all min-h-[64px] ${
                      isSelected
                        ? "bg-surface-elevated border-lavender-moon text-bone shadow-glow-subtle"
                        : "bg-surface border-border-subtle hover:border-border-highlight text-bone-muted hover:text-bone"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div>
                      <span className="font-serif text-sm font-semibold block">{item.name}</span>
                      <span className="text-[10px] font-mono text-lavender-dim uppercase tracking-wider block">
                        {item.category}
                      </span>
                    </div>
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "bg-lavender-moon border-lavender-moon text-background"
                          : "border-border-highlight bg-background"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Household Ingredients List & Adder */}
            <div className="pt-2 space-y-2">
              {customIngredients.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {customIngredients.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border-ornate text-xs font-mono text-lavender-light"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomIngredient(item)}
                        className="hover:text-rust text-bone-dim transition-colors"
                        aria-label={`Remove custom ingredient ${item}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {showCustomInput ? (
                <div className="flex items-center gap-2 pt-1 max-w-md">
                  <label htmlFor="custom-ingredient-input" className="sr-only">
                    Custom household ingredient name
                  </label>
                  <input
                    id="custom-ingredient-input"
                    type="text"
                    maxLength={50}
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCustomIngredient()}
                    placeholder="e.g. Iron nail, pen & paper, chalk..."
                    className="flex-1 px-3 py-2 rounded-lg bg-background border border-border-highlight text-xs font-sans text-bone focus:outline-none focus:border-lavender-moon"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomIngredient}
                    className="px-4 py-2 rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate text-xs font-mono uppercase tracking-wider"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="p-2 text-bone-dim hover:text-bone"
                    aria-label="Cancel adding custom item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border-highlight hover:border-lavender-dim text-bone-dim hover:text-lavender-light text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add something else from your cupboard</span>
                </button>
              )}
            </div>
          </section>

          {/* Error / Mismatch Notification */}
          {workingResult && !workingResult.success && (
            <div className="p-5 rounded-xl bg-surface-elevated/90 border border-rust/70 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-rust text-xs font-mono uppercase tracking-ceremonial font-semibold">
                <AlertTriangle className="w-4 h-4 text-rust shrink-0" />
                <span>Working Incongruence</span>
              </div>
              <p className="text-sm text-bone font-sans leading-relaxed">
                {workingResult.errorMessage}
              </p>
              {workingResult.suggestions && workingResult.suggestions.length > 0 && (
                <div className="pt-1 space-y-1.5">
                  <span className="text-[11px] font-mono text-lavender-dim uppercase tracking-wider block">
                    Oracle Recommendations:
                  </span>
                  <ul className="space-y-1 text-xs text-bone-muted font-sans list-disc list-inside">
                    {workingResult.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Trigger */}
          <div className="pt-6 border-t border-border-subtle flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSynthesize}
              disabled={!selectedIntention || (selectedIngredients.length === 0 && customIngredients.length === 0) || isSynthesizing}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover active:scale-[0.98] text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle hover:shadow-glow-purple transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 min-h-[44px]"
            >
              <GrimoireStar className={`w-3.5 h-3.5 text-lavender-moon ${isSynthesizing ? "animate-spin" : ""}`} />
              <span>{isSynthesizing ? "ASSEMBLING WORKING..." : "SYNTHESIZE WORKING"}</span>
              <GrimoireStar className={`w-3.5 h-3.5 text-lavender-moon ${isSynthesizing ? "animate-spin" : ""}`} />
            </button>
            <span className="text-[11px] font-mono text-bone-dim tracking-wider uppercase">
              {isSynthesizing
                ? "Consulting traditional correspondences..."
                : "Rule-based synthesis honoring traditional Witchr correspondences"}
            </span>
          </div>
        </div>
      )}

      {/* Synthesizing Status Banner */}
      {isSynthesizing && (
        <div className="tarot-frame p-8 sm:p-12 text-center space-y-4 shadow-card-tarot animate-pulse">
          <FourPointStar className="w-5 h-5 text-lavender-moon animate-spin mx-auto" />
          <div className="font-mono text-xs uppercase tracking-ceremonial text-lavender-light font-semibold">
            ASSEMBLING THE WORKING...
          </div>
          <p className="text-xs text-bone-dim font-serif italic max-w-sm mx-auto">
            Consulting traditional correspondences and formulating sacred container steps...
          </p>
        </div>
      )}

      {/* Generated Working Presentation */}
      {workingResult?.working && (
        <article className="tarot-frame p-6 sm:p-10 md:p-12 shadow-card-tarot space-y-10 animate-in fade-in duration-500">
          {/* Header & Title */}
          <header className="border-b border-border-subtle pb-6 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <span className="flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Sanctum Formulated Formula</span>
              </span>
              <span>Intention: {workingResult.working.effectiveIntention}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone celestial-glow">
              {workingResult.working.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {workingSource === "oracle-ai" ? (
                <span className="px-2.5 py-0.5 rounded-full bg-surface border border-border-ornate/80 text-[10px] font-mono uppercase tracking-wider text-lavender-moon flex items-center gap-1 font-semibold">
                  <FourPointStar className="w-2.5 h-2.5" />
                  <span>Oracle AI Formulated</span>
                </span>
              ) : (
                fallbackNotice && (
                  <span className="text-[11px] font-serif italic text-bone-dim">
                    {fallbackNotice}
                  </span>
                )
              )}
            </div>

            <p className="text-base text-lavender-light font-serif italic pt-1">
              “{workingResult.working.intentionDescription}”
            </p>
          </header>

          {/* Section 1: You Will Need */}
          <section className="space-y-3" aria-labelledby="needs-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="needs-heading" className="font-semibold">
                YOU WILL NEED
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {workingResult.working.youWillNeed.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-surface-elevated border border-border-ornate text-xs font-mono text-bone font-medium"
                >
                  ✓ {item}
                </span>
              ))}
              {workingResult.working.unmappedCustomIngredients &&
                workingResult.working.unmappedCustomIngredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs font-mono text-bone-muted italic"
                  >
                    + {item} (Optional vessel/note)
                  </span>
                ))}
            </div>
          </section>

          {/* Section 2: Why These (Correspondences Breakdown) */}
          <section className="space-y-4" aria-labelledby="why-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="why-heading" className="font-semibold">
                WHY THESE INGREDIENTS
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workingResult.working.whyThese.map((reason, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-bone">{reason.name}</span>
                    <span className="text-[10px] font-mono text-lavender-dim uppercase tracking-wider">
                      Correspondence
                    </span>
                  </div>
                  <p className="text-xs text-lavender-light font-sans italic">
                    {reason.correspondence}
                  </p>
                  <p className="text-xs text-bone-muted font-sans pt-1 leading-relaxed">
                    {reason.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Preparation */}
          <section className="space-y-3" aria-labelledby="prep-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="prep-heading" className="font-semibold">
                PREPARATION
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-bone-muted font-sans">
              {workingResult.working.preparation.map((prep, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-xs font-mono text-lavender-dim mt-0.5">{idx + 1}.</span>
                  <span>{prep}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: The Working (Ritual Steps) */}
          <section className="space-y-4" aria-labelledby="working-heading">
            <div className="border-b border-border-subtle pb-3">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <GrimoireStar className="w-3 h-3 text-lavender-moon" />
                <span>Ritual Mechanics</span>
              </span>
              <h3 id="working-heading" className="text-2xl font-display font-semibold text-bone mt-1 tracking-wide">
                THE WORKING
              </h3>
            </div>

            <ol className="space-y-4">
              {workingResult.working.theWorking.map((step) => (
                <li
                  key={step.step}
                  className="p-5 rounded-xl bg-surface border border-border-subtle flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-background border border-border-ornate text-lavender-moon font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-subtle">
                    {step.step}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-serif text-base font-semibold text-bone">{step.title}</h4>
                    <p className="text-sm text-bone-muted font-sans leading-relaxed pt-0.5">
                      {step.instruction}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 5: Closing */}
          <section className="p-6 rounded-xl bg-surface border border-border-highlight space-y-2" aria-labelledby="closing-heading">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-light">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="closing-heading" className="font-semibold">
                CLOSING & DISPOSAL
              </h3>
            </div>
            <p className="text-sm text-bone-muted font-sans leading-relaxed">
              {workingResult.working.closing}
            </p>
          </section>

          {/* Section 6: Optional Timing */}
          {workingResult.working.optionalTiming && (
            <div className="text-xs font-mono text-bone-dim italic flex items-center gap-2">
              <FourPointStar className="w-2.5 h-2.5 text-lavender-dim shrink-0" />
              <span>{workingResult.working.optionalTiming}</span>
            </div>
          )}

          {/* Section 7: Consider (Reflection Prompt) */}
          <section
            className="p-6 rounded-xl bg-surface-elevated/70 border border-border-ornate space-y-2 shadow-subtle"
            aria-labelledby="working-consider-heading"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="working-consider-heading" className="font-semibold">
                CONSIDER
              </h3>
            </div>
            <p className="font-serif text-base sm:text-lg text-bone italic leading-relaxed">
              “{workingResult.working.consider}”
            </p>
          </section>

          {/* Section 8: Carry This With You (Practical Action) */}
          <section
            className="p-6 rounded-xl bg-surface border border-border-highlight space-y-2"
            aria-labelledby="working-carry-heading"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-light">
              <FourPointStar className="w-2.5 h-2.5" />
              <h3 id="working-carry-heading" className="font-semibold">
                CARRY THIS WITH YOU
              </h3>
            </div>
            <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
              {workingResult.working.carryThisWithYou}
            </p>
          </section>

          {/* Section 9: Safety Notes */}
          {workingResult.working.safetyNotes && (
            <div className="p-4 rounded-xl bg-background/80 border border-border-subtle flex items-start gap-3 text-xs text-bone-muted font-sans">
              <ShieldAlert className="w-4 h-4 text-rust shrink-0 mt-0.5" />
              <p>{workingResult.working.safetyNotes}</p>
            </div>
          )}

          {/* Section 10: Action Bar (Save to Grimoire / Create Another) */}
          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSaveToGrimoire}
              disabled={isSaved}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px] ${
                isSaved
                  ? "bg-surface-elevated text-lavender-light border border-border-highlight cursor-default"
                  : "bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender shadow-glow-subtle cursor-pointer"
              }`}
              aria-label={isSaved ? "Working bound to your grimoire" : "Save working to grimoire"}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-lavender-moon" />
                  <span>BOUND TO YOUR GRIMOIRE</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-lavender-moon" />
                  <span>SAVE TO GRIMOIRE</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCreateAnother}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface hover:bg-surface-elevated text-bone-muted hover:text-bone border border-border-subtle hover:border-border-highlight text-xs font-mono uppercase tracking-ceremonial font-semibold transition-all min-h-[44px]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-lavender-dim" />
              <span>CREATE ANOTHER WORKING</span>
            </button>
          </div>
        </article>
      )}

      {/* Navigation Sub-Links */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <Link
          href="/sanctum"
          className="inline-flex items-center gap-1.5 text-bone-muted hover:text-lavender-light transition-colors uppercase tracking-ceremonial"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sanctum Hub</span>
        </Link>
        <Link
          href="/sanctum/grimoire"
          className="inline-flex items-center gap-1.5 text-lavender-moon hover:text-lavender-light transition-colors uppercase tracking-ceremonial font-semibold"
        >
          <span>View My Grimoire</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
