import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { OracleEntranceClient } from "@/components/sanctum/OracleEntranceClient";

export const metadata: Metadata = {
  title: "Witchr Sanctum — The Oracle Chamber & Occult Sanctuary",
  description:
    "Enter the Sanctum: Meet the Oracle of Witchr for grounded self-inquiry, diagnostic tarot reflection, personalized ritual workings, and private grimoire archives.",
  alternates: {
    canonical: "https://witchr.com/sanctum/chamber",
  },
};

export default function SanctumPage() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
      {/* Sanctum Section Sub-Header (compact breadcrumb) */}
      <SanctumHeader currentSection="The Oracle Chamber" />

      {/* The Oracle Chamber Entrance Experience */}
      <OracleEntranceClient />
    </div>
  );
}
