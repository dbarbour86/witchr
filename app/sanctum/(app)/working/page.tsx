import type { Metadata } from "next";
import { SanctumHeader } from "@/components/sanctum/SanctumHeader";
import { WorkingBuilderClient } from "@/components/sanctum/WorkingBuilderClient";

export const metadata: Metadata = {
  title: "Create a Working — Sanctum Ritual Synthesis",
  description: "Formulate a personalized occult working based on your current intent and available pantry supplies.",
  alternates: {
    canonical: "https://witchr.com/sanctum/working",
  },
};

export default function CreateWorkingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Sanctum Sub-Header with Back Link */}
      <SanctumHeader currentSection="Create a Working" showBackToSanctum={true} />

      {/* Functional Interactive Working Builder */}
      <WorkingBuilderClient />
    </div>
  );
}

