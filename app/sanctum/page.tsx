import type { Metadata } from "next";
import Link from "next/link";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import {
  FourPointStar,
  CelestialDivider,
  TarotCornerFlourish,
  GrimoireStar,
} from "@/components/OrnateFrames";
import { MoonPhaseStrip } from "@/components/sanctum/SanctumSymbols";
import { Compass, Sparkles, BookOpen, Wand2, ArrowRight, ShieldCheck, Moon } from "lucide-react";

export const metadata: Metadata = {
  title: "Witchr Sanctum — Occult Workstation & Private Grimoire",
  description:
    "Enter the Sanctum: Witchr's immersive workstation for daily tarot reflection, diagnostic triad spreads, personalized working synthesis, and private grimoire archives.",
  alternates: {
    canonical: "https://witchr.com/sanctum",
  },
};

export default function SanctumPage() {
  const workstations = [
    {
      title: "DAILY TAROT",
      subtitle: "SINGLE CARD INQUEST",
      href: "/sanctum/tarot",
      code: "STATION // 01",
      icon: Sparkles,
      tag: "DAILY RITUAL",
      description: "Draw one card for diagnostic reflection and psychological clarity.",
      details:
        "Identify unconscious blind spots, clarify the dominant atmospheric current of your day, and ground your attention with an actionable takeaway.",
      status: "Available Daily",
      badgeColor: "text-purple-300 border-purple-800/80 bg-purple-950/40",
      cta: "Open Card Altar",
    },
    {
      title: "THREE-CARD READING",
      subtitle: "TRIAD SPREAD ENGINE",
      href: "/sanctum/tarot/three-card",
      code: "STATION // 02",
      icon: Compass,
      tag: "DEEP INQUIRY",
      description: "Explore pressing friction through Situation, Challenge, and Guidance.",
      details:
        "Deconstruct acute circumstances into three diagnostic angles with optional Oracle AI synthesis grounded in classical occult correspondence.",
      status: "3-Card Altar Ready",
      badgeColor: "text-purple-300 border-purple-800/80 bg-purple-950/40",
      cta: "Lay the Spread",
    },
    {
      title: "CREATE A WORKING",
      subtitle: "THE ORACLE & PANTRY WORKSTATION",
      href: "/sanctum/working",
      code: "STATION // 03",
      icon: Wand2,
      tag: "OCCULT SYNTHESIS",
      description: "Input your intention and pantry items to formulate a custom ritual.",
      details:
        "Select herbs, minerals, and tools from your physical cabinet. The Oracle synthesizes step-by-step workings with strict correspondence and safety rules.",
      status: "Oracle Online",
      badgeColor: "text-purple-300 border-purple-800/80 bg-purple-950/40",
      cta: "Consult the Oracle",
    },
    {
      title: "MY GRIMOIRE",
      subtitle: "PRIVATE ARCHIVE & MARKS",
      href: "/sanctum/grimoire",
      code: "STATION // 04",
      icon: BookOpen,
      tag: "LOCAL ARCHIVE",
      description: "Review saved readings, synthesized workings, streaks, and Sacred Marks.",
      details:
        "A private ledger saved strictly to your local browser. Review your spiritual consistency, unlock Sacred Marks, and revisit past workings.",
      status: "Private Ledger",
      badgeColor: "text-purple-300 border-purple-800/80 bg-purple-950/40",
      cta: "Access Grimoire",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-2 sm:py-6">
      {/* Sanctum Section Sub-Header */}
      <SanctumHeader />

      {/* Main Workstation Header Banner */}
      <div className="relative sanctum-panel sanctum-corners p-6 sm:p-10 border border-purple-900/60 overflow-hidden text-center sm:text-left">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#130728] border border-purple-800/60 text-purple-300 text-[10px] font-mono uppercase tracking-[0.24em]">
              <FourPointStar className="w-3 h-3 text-purple-400" />
              <span>Sanctum Chamber // Workstation Hub</span>
              <FourPointStar className="w-3 h-3 text-purple-400" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bone via-lavender-light to-purple-200 tracking-wide uppercase leading-tight drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              The Occult Workstation
            </h1>

            <p className="text-sm sm:text-base text-bone-muted font-sans leading-relaxed">
              Welcome to the interactive ritual engine of Witchr. Select a station below to conduct daily divination, formulate personalized workings with your physical pantry items, or audit your private grimoire ledger.
            </p>
          </div>

          {/* Right Moon Phase Visualizer */}
          <div className="hidden sm:flex flex-col items-center justify-center p-4 rounded-xl bg-[#0a0416] border border-purple-900/50 text-center shrink-0">
            <span className="text-[9px] font-mono tracking-[0.2em] text-purple-300/70 uppercase mb-2">
              Celestial Alignment
            </span>
            <MoonPhaseStrip />
            <span className="text-[10px] font-mono text-bone-dim mt-2 tracking-wider">
              SANCTUARY ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* 4 Workstations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {workstations.map((station) => {
          const Icon = station.icon;
          return (
            <Link
              key={station.title}
              href={station.href}
              className="sanctum-panel sanctum-corners group p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 block"
            >
              {/* Corner flourishes */}
              <div className="absolute top-2 left-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="absolute top-2 right-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity rotate-90">
                <TarotCornerFlourish className="w-3.5 h-3.5 text-purple-400" />
              </div>

              <div>
                {/* Station Tag & Code */}
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[10px] ${station.badgeColor}`}>
                    <Icon className="w-3 h-3 text-purple-300" />
                    <span>{station.tag}</span>
                  </span>
                  <span className="text-purple-400/60 text-[10px] font-mono tracking-widest">{station.code}</span>
                </div>

                {/* Station Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bone group-hover:text-purple-200 transition-colors uppercase tracking-wider leading-snug">
                  {station.title}
                </h2>
                <div className="text-[10px] font-mono tracking-[0.2em] text-purple-300/80 uppercase mt-0.5">
                  {station.subtitle}
                </div>

                {/* Short Intent / Description */}
                <p className="text-sm sm:text-base text-purple-200/90 font-serif italic mt-3.5 leading-relaxed">
                  “{station.description}”
                </p>

                {/* Technical / Grounded Context */}
                <p className="text-xs sm:text-sm text-bone-muted mt-2.5 font-sans leading-relaxed">
                  {station.details}
                </p>
              </div>

              {/* Station Action Footer */}
              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-purple-300/70 group-hover:text-purple-200 transition-colors">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:shadow-[0_0_8px_#c084fc]" />
                  <span>{station.status}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-purple-200 group-hover:translate-x-1 transition-transform font-bold text-[11px]">
                  <span>{station.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Advisory Bottom Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090314] border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-300/70">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Client-rendered private terminal. Zero cookies, no trackers, saved 100% in your local browser.</span>
        </div>
        <div className="text-purple-400/80 uppercase tracking-widest text-[10px] shrink-0">
          Encrypted & Ephemeral
        </div>
      </div>
    </div>
  );
}
