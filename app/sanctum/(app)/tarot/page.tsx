import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { DailyTarotClient } from "@/components/sanctum/DailyTarotClient";

export const metadata: Metadata = {
  title: "Daily Tarot — Sanctum Divination",
  description: "Draw one card for daily reflection, diagnostic inquiry, and psychological clarity in the Witchr Sanctum.",
  alternates: {
    canonical: "https://witchr.com/sanctum/tarot",
  },
};

export default function DailyTarotPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Sanctum Sub-Header with Prominent Back Link */}
      <SanctumHeader currentSection="Daily Tarot" showBackToSanctum={true} />

      {/* Functional Interactive Daily Tarot Experience */}
      <DailyTarotClient />
    </div>
  );
}

