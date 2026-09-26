import type { Metadata } from "next";
import Link from "next/link";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { FourPointStar, CelestialDivider, TarotCornerFlourish, GrimoireStar } from "@/components/OrnateFrames";
import { Compass, Sparkles, BookOpen, Wand2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Sanctum — Interactive Grimoire & Daily Divination",
  description:
    "Enter the Sanctum: Witchr's interactive chamber for daily tarot reflection, three-card diagnostic spreads, personalized working synthesis, and private grimoire archives.",
  alternates: {
    canonical: "https://witchr.com/sanctum",
  },
};

export default function SanctumPage() {
  const actions = [
    {
      title: "DAILY TAROT",
      href: "/sanctum/tarot",
      badge: "Single Inquest",
      code: "01 // DAILY INQUEST",
      icon: Sparkles,
      description: "Draw one card for reflection and daily guidance.",
      detail: "A focused daily touchstone to identify unconscious blind spots and set grounded psychological intention.",
    },
    {
      title: "THREE-CARD READING",
      href: "/sanctum/tarot/three-card",
      badge: "Triad Spread",
      code: "02 // TRIAD SPREAD",
      icon: Compass,
      description: "Explore an acute life question through Situation, Challenge, and Guidance.",
      detail: "Deconstruct a circumstance into three diagnostic angles: where you stand, what creates friction, and the recommended step.",
    },
    {
      title: "CREATE A WORKING",
      href: "/sanctum/working",
      badge: "Occult Synthesis",
      code: "03 // WORKING SYNTHESIS",
      icon: Wand2,
      description: "Input your intention and available pantry items to generate a custom ritual.",
      detail: "Formulate practical, bespoke rituals tailored directly to your physical pantry supplies and specific intentions.",
    },
    {
      title: "MY GRIMOIRE",
      href: "/sanctum/grimoire",
      badge: "Private Ledger",
      code: "04 // PRIVATE ARCHIVE",
      icon: BookOpen,
      description: "Review saved readings, synthesized workings, streaks, and Sacred Marks.",
      detail: "A browser-saved archive storing your divination history, ritual outcomes, sacred marks, and milestone rewards.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Sanctum Header & Oracle Status */}
      <SanctumHeader />

      {/* Main Hero Entry */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <FourPointStar className="w-3 h-3" />
          <span>The Interactive Chamber</span>
          <FourPointStar className="w-3 h-3" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-bone tracking-wide celestial-glow leading-[1.15]">
          ENTER THE SANCTUM
        </h1>

        <p className="text-base sm:text-lg text-bone-muted font-sans leading-relaxed max-w-2xl mx-auto">
          Welcome to the interactive side of Witchr. While our public grimoire provides reference guides, the Sanctum is your active working chamber—designed for personalized daily divination, diagnostic spreads, and tailored practical spellcraft.
        </p>

        <CelestialDivider className="max-w-md mx-auto my-6" />
      </div>

      {/* 4 Primary Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className="tarot-frame group p-7 sm:p-8 flex flex-col justify-between hover:border-lavender/70 transition-all duration-300 block"
            >
              {/* Ornate Corner Flourishes */}
              <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
              </div>
              <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
                <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
              </div>

              <div>
                {/* Header Tag / Badge */}
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-ceremonial text-lavender-moon mb-4">
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-lavender-moon" />
                    <span>{action.badge}</span>
                  </span>
                  <span className="text-bone-dim text-[10px] font-mono">{action.code}</span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-bone group-hover:text-lavender-light transition-colors leading-snug">
                  {action.title}
                </h2>

                {/* Primary Short Description */}
                <p className="text-sm sm:text-base text-lavender-light/90 font-serif italic mt-3 leading-relaxed">
                  “{action.description}”
                </p>

                {/* Secondary Context */}
                <p className="text-xs sm:text-sm text-bone-muted mt-3 font-sans leading-relaxed">
                  {action.detail}
                </p>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono uppercase tracking-wideDisplay text-lavender-dim group-hover:text-lavender-light transition-colors">
                <span className="flex items-center gap-1.5 font-semibold">
                  <GrimoireStar className="w-3 h-3" />
                  <span>Open Chamber</span>
                </span>
                <span className="inline-flex items-center gap-1 text-lavender-moon group-hover:translate-x-1 transition-transform">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Advisory Bottom Banner */}
      <div className="mt-14 p-5 rounded-xl bg-surface/60 border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bone-dim">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <FourPointStar className="w-3 h-3 text-lavender-dim shrink-0" />
          <span>Sanctum v0.1: Client-rendered interactive terminal. No account or credentials required.</span>
        </div>
        <div className="text-lavender-dim uppercase tracking-wider text-[10px]">
          Saved locally to this browser
        </div>
      </div>
    </div>
  );
}
