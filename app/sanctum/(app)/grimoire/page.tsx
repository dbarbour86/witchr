import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { GrimoireLedgerClient } from "@/components/sanctum/GrimoireLedgerClient";

export const metadata: Metadata = {
  title: "My Grimoire — Saved Readings & Rituals",
  description: "Your private ledger of saved tarot readings, synthesized rituals, and reflection logs in the Witchr Sanctum.",
  alternates: {
    canonical: "https://witchr.com/sanctum/grimoire",
  },
};

export default function MyGrimoirePage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Sanctum Sub-Header with Prominent Back Link */}
      <SanctumHeader currentSection="My Grimoire" showBackToSanctum={true} />

      {/* Functional Interactive Grimoire Ledger */}
      <GrimoireLedgerClient />
    </div>
  );
}

