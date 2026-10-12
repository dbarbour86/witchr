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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Sanctum Sub-Header with Back Link */}
      <SanctumHeader currentSection="Daily Tarot" showBackToSanctum={true} />

      {/* Functional Interactive Daily Tarot Experience */}
      <DailyTarotClient />
    </div>
  );
}

