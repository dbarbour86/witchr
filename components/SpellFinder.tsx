"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RITUALS, getRitualBySlug } from "@/content/rituals";
import { Ritual } from "@/content/types";
import { trackEvent } from "@/lib/analytics";
import { TarotCornerFlourish, FourPointStar, GrimoireStar, CelestialDivider } from "./OrnateFrames";
import { ArrowRight, RotateCcw, Sparkles, ChevronLeft, ArrowUpRight } from "lucide-react";

interface SubQuestionOption {
  label: string;
  primarySlug: string;
  altSlugs: string[];
}

interface CategoryConfig {
  category: string;
  description: string;
  question: string;
  options: SubQuestionOption[];
  hubSlug: string;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  Money: {
    category: "Money",
    description: "Things feel tighter than they should, or you're avoiding looking at your accounts.",
    question: "What feels closest to the current friction?",
    hubSlug: "/money",
    options: [
      {
        label: "I need to get control again and stop avoiding the numbers",
        primarySlug: "money-reset",
        altSlugs: ["get-your-shit-together", "money-candle"],
      },
      {
        label: "I’m afraid there isn’t enough and panic is freezing me",
        primarySlug: "money-reset",
        altSlugs: ["confidence-before-you-walk-in", "money-candle"],
      },
      {
        label: "I need focus and drive to earn more and stop undercharging",
        primarySlug: "money-candle",
        altSlugs: ["stop-shrinking", "confidence-before-you-walk-in"],
      },
      {
        label: "I need a fresh start with how I manage my physical life",
        primarySlug: "new-beginning",
        altSlugs: ["money-reset", "get-your-shit-together"],
      },
    ],
  },
  Protection: {
    category: "Protection",
    description: "You need stronger boundaries. Somebody is draining your peace.",
    question: "Where is the perimeter being breached?",
    hubSlug: "/protection",
    options: [
      {
        label: "Draining people and boundary violations taking up room in my chest",
        primarySlug: "leave-me-alone-protection",
        altSlugs: ["return-to-sender", "cut-the-cord"],
      },
      {
        label: "Someone else’s passive aggression, bitter critique, or guilt",
        primarySlug: "return-to-sender",
        altSlugs: ["leave-me-alone-protection", "stop-shrinking"],
      },
      {
        label: "I keep letting people overstep because I’m afraid of being difficult",
        primarySlug: "stop-shrinking",
        altSlugs: ["leave-me-alone-protection", "return-to-sender"],
      },
      {
        label: "An expired connection that is still hovering in my space",
        primarySlug: "cut-the-cord",
        altSlugs: ["leave-me-alone-protection", "stop-checking-their-phone"],
      },
    ],
  },
  Confidence: {
    category: "Confidence",
    description: "You know what you want. You keep hesitating and apologizing for existing.",
    question: "Where are you getting stuck?",
    hubSlug: "/confidence",
    options: [
      {
        label: "Walking into an intimidating room, interview, or high-stakes meeting",
        primarySlug: "confidence-before-you-walk-in",
        altSlugs: ["stop-shrinking", "pick-a-damn-direction"],
      },
      {
        label: "Speaking up and apologizing for having needs or opinions",
        primarySlug: "stop-shrinking",
        altSlugs: ["confidence-before-you-walk-in", "leave-me-alone-protection"],
      },
      {
        label: "Breaking chronic hesitation and actually starting the damn thing",
        primarySlug: "get-your-shit-together",
        altSlugs: ["confidence-before-you-walk-in", "pick-a-damn-direction"],
      },
      {
        label: "Making a big decision without second-guessing myself into paralysis",
        primarySlug: "pick-a-damn-direction",
        altSlugs: ["confidence-before-you-walk-in", "stop-shrinking"],
      },
    ],
  },
  Love: {
    category: "Love",
    description: "Someone has your head spinning. You're losing your footing.",
    question: "What is happening to your center?",
    hubSlug: "/love",
    options: [
      {
        label: "I am losing myself and abandoning my own standards for someone",
        primarySlug: "love-without-losing-yourself",
        altSlugs: ["stop-shrinking", "leave-me-alone-protection"],
      },
      {
        label: "I can't stop checking their social media or obsessing over their status",
        primarySlug: "stop-checking-their-phone",
        altSlugs: ["cut-the-cord", "leave-me-alone-protection"],
      },
      {
        label: "I need to sever an attachment that I know is expired",
        primarySlug: "cut-the-cord",
        altSlugs: ["love-without-losing-yourself", "stop-checking-their-phone"],
      },
      {
        label: "I keep holding on to potential instead of looking at reality",
        primarySlug: "love-without-losing-yourself",
        altSlugs: ["cut-the-cord", "pick-a-damn-direction"],
      },
    ],
  },
  "Letting Go": {
    category: "Letting Go",
    description: "You’re carrying something that should have been put down already.",
    question: "What are you trying to release?",
    hubSlug: "/letting-go",
    options: [
      {
        label: "A person or relationship that has run its natural course",
        primarySlug: "cut-the-cord",
        altSlugs: ["stop-checking-their-phone", "leave-me-alone-protection"],
      },
      {
        label: "The compulsive urge to monitor their life from afar",
        primarySlug: "stop-checking-their-phone",
        altSlugs: ["cut-the-cord", "leave-me-alone-protection"],
      },
      {
        label: "Anger, passive-aggressive guilt, and other people's baggage",
        primarySlug: "return-to-sender",
        altSlugs: ["leave-me-alone-protection", "cut-the-cord"],
      },
      {
        label: "An old chapter, missed opportunity, or past version of myself",
        primarySlug: "new-beginning",
        altSlugs: ["cut-the-cord", "get-your-shit-together"],
      },
    ],
  },
  Direction: {
    category: "Direction",
    description: "You have no idea what the hell comes next, or you're frozen by options.",
    question: "What does the paralysis look like right now?",
    hubSlug: "/direction",
    options: [
      {
        label: "Torn between two paths and wasting weeks in limbo",
        primarySlug: "pick-a-damn-direction",
        altSlugs: ["get-your-shit-together", "new-beginning"],
      },
      {
        label: "Complete executive freeze and drowning under undone tasks",
        primarySlug: "get-your-shit-together",
        altSlugs: ["pick-a-damn-direction", "confidence-before-you-walk-in"],
      },
      {
        label: "Starting a whole new chapter and needing to seal the old one",
        primarySlug: "new-beginning",
        altSlugs: ["pick-a-damn-direction", "get-your-shit-together"],
      },
      {
        label: "I need to take up space and stop procrastinating on my real work",
        primarySlug: "confidence-before-you-walk-in",
        altSlugs: ["get-your-shit-together", "stop-shrinking"],
      },
    ],
  },
};

export function SpellFinder() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<SubQuestionOption | null>(null);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedOption(null);
    trackEvent("spell_finder_category_selected", { category: cat });
  };

  const handleSelectOption = (opt: SubQuestionOption) => {
    setSelectedOption(opt);
    trackEvent("spell_finder_result_viewed", {
      category: selectedCategory || undefined,
      ritualSlug: opt.primarySlug,
    });
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedOption(null);
    trackEvent("spell_finder_started");
  };

  const primaryRitual = selectedOption ? getRitualBySlug(selectedOption.primarySlug) : null;
  const altRituals = selectedOption
    ? selectedOption.altSlugs.map((s) => getRitualBySlug(s)).filter((r): r is Ritual => !!r)
    : [];

  const activeCategoryConfig = selectedCategory ? CATEGORY_MAP[selectedCategory] : null;

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Step 1: Category Selection */}
      {!selectedCategory && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
              <GrimoireStar className="w-3.5 h-3.5" />
              <span>Step 1 of 2</span>
              <GrimoireStar className="w-3.5 h-3.5" />
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-bone tracking-wide celestial-glow">
              What’s eating you?
            </h1>

            <p className="text-bone-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed font-sans">
              You don’t need to know what kind of spell you’re looking for. Start with the problem.
            </p>
            <CelestialDivider className="max-w-xs mx-auto my-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {Object.keys(CATEGORY_MAP).map((catName) => {
              const cat = CATEGORY_MAP[catName];
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => handleSelectCategory(catName)}
                  className="tarot-frame group p-6 text-left transition-all flex flex-col justify-between min-h-[180px] active:scale-[0.98]"
                >
                  <div className="absolute top-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                    <TarotCornerFlourish className="w-3.5 h-3.5 text-lavender-moon" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10.5px] font-mono uppercase tracking-ceremonial text-lavender-dim group-hover:text-lavender-moon transition-colors">
                      Arcanum · {catName}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-bone group-hover:text-lavender-light transition-colors">
                      {catName}
                    </h3>
                    <p className="text-sm text-bone-muted leading-snug font-sans">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-bone-dim group-hover:text-lavender-light transition-colors">
                    <span>Select Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-lavender" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Contextual Sub-Question */}
      {selectedCategory && !selectedOption && activeCategoryConfig && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-bone-muted hover:text-lavender-light min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to portals</span>
            </button>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon">
              Step 2 of 2
            </span>
          </div>

          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-ceremonial bg-surface border border-border-highlight text-lavender-moon">
              Category: {selectedCategory}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-bone tracking-wide">
              {activeCategoryConfig.question}
            </h2>
            <p className="text-bone-muted text-sm md:text-base font-sans">
              Choose what resonates closest right now. There is no wrong answer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {activeCategoryConfig.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className="tarot-frame group p-6 text-left transition-all flex flex-col justify-between min-h-[130px] active:scale-[0.98]"
              >
                <p className="text-base font-serif text-bone group-hover:text-lavender-light transition-colors leading-relaxed">
                  “{opt.label}”
                </p>
                <div className="pt-4 flex items-center justify-between text-xs font-mono text-bone-dim group-hover:text-lavender-light transition-colors">
                  <span>Match ritual</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-lavender" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Recommendation Results */}
      {selectedCategory && selectedOption && primaryRitual && activeCategoryConfig && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <button
              type="button"
              onClick={() => setSelectedOption(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-bone-muted hover:text-lavender-light min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to questions</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-bone-dim hover:text-lavender-light min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start over</span>
            </button>
          </div>

          {/* Primary Recommendation Showcase */}
          <div className="p-8 md:p-10 rounded-2xl border-2 border-border-ornate bg-gradient-to-br from-surface-elevated via-surface to-background relative overflow-hidden shadow-card-tarot">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface border border-lavender/40 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-glow-subtle">
                <Sparkles className="w-3.5 h-3.5" />
                Primary Recommendation
              </span>
              <span className="text-xs font-mono text-bone-dim uppercase tracking-wider">
                {primaryRitual.estimatedTime} · {primaryRitual.difficulty}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-bone tracking-wide">
              {primaryRitual.title}
            </h3>

            <blockquote className="mt-4 pl-4 border-l-2 border-lavender/60 text-lg md:text-xl font-serif italic text-lavender-light leading-relaxed">
              “{primaryRitual.whatItsActuallyFor}”
            </blockquote>

            <p className="mt-4 text-base text-bone-muted leading-relaxed font-sans">
              {primaryRitual.hook}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/rituals/${primaryRitual.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light font-mono text-xs uppercase tracking-ceremonial font-semibold border border-lavender/60 shadow-glow-purple transition-all min-h-[50px] active:scale-[0.98]"
              >
                <span>Open this ritual</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-surface hover:bg-surface-elevated border border-border text-bone font-mono text-xs uppercase tracking-ceremonial transition-colors min-h-[50px]"
              >
                Try another problem
              </button>
            </div>
          </div>

          {/* Alternative Recommendations */}
          {altRituals.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-semibold text-bone">
                  Alternative practices for this problem:
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {altRituals.map((alt) => (
                  <div
                    key={alt.slug}
                    className="tarot-frame p-6 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon mb-1">
                        {alt.category} · {alt.estimatedTime}
                      </div>
                      <h5 className="font-serif text-xl font-semibold text-bone hover:text-lavender-light transition-colors">
                        <Link href={`/rituals/${alt.slug}`}>{alt.title}</Link>
                      </h5>
                      <p className="text-sm text-bone-muted mt-2 leading-relaxed font-sans">
                        {alt.hook}
                      </p>
                    </div>
                    <Link
                      href={`/rituals/${alt.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light transition-colors font-medium pt-2"
                    >
                      <span>View alternative</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse all category rituals link */}
          <div className="p-6 rounded-xl bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-bone-muted text-center sm:text-left font-sans">
              Not feeling these options?
            </p>
            <Link
              href={activeCategoryConfig.hubSlug}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light transition-colors font-semibold"
            >
              <span>Browse all {selectedCategory} resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
