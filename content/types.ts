export type ProblemCategory =
  | "Money"
  | "Protection"
  | "Confidence"
  | "Love"
  | "Letting Go"
  | "Direction";

export interface RitualStep {
  title: string;
  detail: string;
}

export interface Ritual {
  slug: string;
  title: string;
  category: ProblemCategory;
  hook: string;
  purpose: string;
  whatItsActuallyFor: string;
  estimatedTime: string;
  difficulty: "Simple" | "Moderate";
  supplies: string[];
  substitutions: string[];
  steps: RitualStep[];
  reflectionPrompt: string;
  practicalAction: string;
  disclaimerNote?: string;
  relatedRituals: string[]; // slugs
  relatedTarotSlug?: string;
  seoTitle: string;
  seoDescription: string;
  // Future Etsy / store fields (V1 preparation)
  printableAvailable?: boolean;
  etsyProductUrl?: string;
  premiumBundle?: string;
}

export interface TarotCardPosition {
  number: number;
  name: string;
  question: string;
  guidance: string;
}

export interface TarotSpread {
  slug: string;
  title: string;
  subtitle: string;
  cardCount: number;
  purpose: string;
  overview: string;
  positions: TarotCardPosition[];
  journalingPrompts: string[];
  relatedRitualSlug: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Sigil {
  id: string;
  name: string;
  category: ProblemCategory;
  intention: string;
  suggestion: string;
  geometryType: "lines" | "circle" | "chevron" | "cross" | "anchor" | "flame";
}

export interface ProblemHub {
  slug: string;
  title: string;
  category: ProblemCategory;
  headline: string;
  intro: string[];
  keyPerspective: string;
  ritualSlugs: string[];
  tarotSlug: string;
  sigilIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface GrimoireItem {
  name: string;
  traditionalAssociation: string;
  modernContext: string;
  notes?: string;
  badge?: string;
  hex?: string;
}

export interface GrimoireSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: GrimoireItem[];
}
