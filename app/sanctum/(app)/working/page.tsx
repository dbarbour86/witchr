import { Suspense } from "react";
import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { WorkingBuilderClient } from "@/components/sanctum/WorkingBuilderClient";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Create a Ritual — Sanctum Ritual Synthesis",
  description: "Formulate a personalized ritual based on your current intent and available pantry supplies.",
  alternates: {
    canonical: "https://witchr.com/sanctum/working",
  },
};

function WorkingBuilderLoading() {
  return (
    <div className="sanctum-panel sanctum-corners p-12 text-center space-y-4 border border-purple-900/60 min-h-[460px] flex flex-col items-center justify-center">
      <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
      <div className="space-y-1">
        <h2 className="text-xl font-serif font-bold text-bone">Opening Ritual Builder</h2>
        <p className="text-xs font-mono text-purple-300/70 uppercase tracking-widest">
          Loading correspondences &amp; workspace...
        </p>
      </div>
    </div>
  );
}

export default function CreateWorkingPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Sanctum Sub-Header with Prominent Back Link */}
      <SanctumHeader currentSection="Create a Ritual" showBackToSanctum={true} />

      {/* Functional Interactive Focused 3-Step Ritual Builder */}
      <Suspense fallback={<WorkingBuilderLoading />}>
        <WorkingBuilderClient />
      </Suspense>
    </div>
  );
}

