import { Suspense } from "react";
import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { OracleChatClient } from "@/components/sanctum/OracleChatClient";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "The Oracle — Conversational Guidance & Inquiry | Witchr Sanctum",
  description:
    "Consult the Oracle of Witchr for grounded inquiry, tarot reflection, correspondence counsel, and ritual direction in an anonymous local session.",
  alternates: {
    canonical: "https://witchr.com/sanctum/oracle",
  },
};

function OracleChatLoading() {
  return (
    <div className="sanctum-panel sanctum-corners p-8 text-center space-y-4 border border-purple-900/60 min-h-[460px] flex flex-col items-center justify-center">
      <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
      <div className="space-y-1">
        <h2 className="text-xl font-serif font-bold text-bone">Opening the Oracle’s Chamber</h2>
        <p className="text-xs font-mono text-purple-300/70 uppercase tracking-widest">
          Attuning resonance &amp; local session...
        </p>
      </div>
    </div>
  );
}

export default function SanctumOraclePage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 py-2 sm:py-6">
      {/* Sanctum Sub-Header with Back link to Chamber */}
      <SanctumHeader currentSection="The Oracle" showBackToSanctum={true} />

      {/* Conversational Oracle Chamber Client wrapped in Suspense for useSearchParams */}
      <Suspense fallback={<OracleChatLoading />}>
        <OracleChatClient />
      </Suspense>
    </div>
  );
}
