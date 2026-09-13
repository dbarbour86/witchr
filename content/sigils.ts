import { Sigil } from "./types";

export const SIGILS: Sigil[] = [
  {
    id: "protection",
    name: "Perimeter & Shield",
    category: "Protection",
    intention: "I decide what gets access to my mind, body, and peace.",
    suggestion:
      "Draw it on the inside cover of your journal, carve it into a protection candle, or visualize it as an impenetrable border at your doorway.",
    geometryType: "circle",
  },
  {
    id: "confidence",
    name: "Unapologetic Stature",
    category: "Confidence",
    intention: "I refuse to shrink, soften my voice, or apologize for existing.",
    suggestion:
      "Trace it lightly on your wrist before entering an intimidating room or keep it drawn on a small card in your wallet.",
    geometryType: "flame",
  },
  {
    id: "focus",
    name: "The Iron Focus",
    category: "Direction",
    intention: "I starve shallow distractions and direct all force into the vital work.",
    suggestion:
      "Sketch it on a sticky note placed beside your computer monitor during deep work sessions.",
    geometryType: "anchor",
  },
  {
    id: "release",
    name: "The Clean Cut",
    category: "Letting Go",
    intention: "I put down what is already dead and reclaim my hands for the living.",
    suggestion:
      "Draw it on a piece of paper during a cord-cutting ritual, then burn or discard the paper with absolute finality.",
    geometryType: "chevron",
  },
  {
    id: "courage",
    name: "The Forward Strike",
    category: "Confidence",
    intention: "I do not wait for fear to subside; I move while it watches.",
    suggestion:
      "Hold the image in your mind when your fingers are hesitating over the send button or door handle.",
    geometryType: "cross",
  },
  {
    id: "money-discipline",
    name: "The Sovereign Ledger",
    category: "Money",
    intention: "I steward my wealth with clear eyes, steady nerves, and honest math.",
    suggestion:
      "Tuck this symbol inside your wallet or tape it under your keyboard where you review invoices.",
    geometryType: "lines",
  },
  {
    id: "new-beginnings",
    name: "The Open Gate",
    category: "Direction",
    intention: "The past chapter is sealed; I enter the new territory with clean hands.",
    suggestion:
      "Hang it near your front entrance or draw it on the first page of a new notebook or ledger.",
    geometryType: "circle",
  },
  {
    id: "calm",
    name: "The Deep Stillness",
    category: "Protection",
    intention: "The storm can howl outside; my center remains undisturbed.",
    suggestion:
      "Trace the geometry with your finger when your pulse is racing or before sleep.",
    geometryType: "lines",
  },
  {
    id: "boundaries",
    name: "The Stone Wall",
    category: "Protection",
    intention: "No entry without permission. Guilt has no jurisdiction here.",
    suggestion:
      "Use this mark when dealing with entitled family members, overstepping bosses, or draining acquaintances.",
    geometryType: "anchor",
  },
  {
    id: "motivation",
    name: "The Spark to Fire",
    category: "Direction",
    intention: "Ten minutes of clumsy action beats ten years of graceful fantasy.",
    suggestion:
      "Draw this mark boldly across your daily task card before starting work.",
    geometryType: "flame",
  },
  {
    id: "self-respect",
    name: "The Unbent Spine",
    category: "Love",
    intention: "I love others generously, but I never negotiate against my own soul.",
    suggestion:
      "Meditate on this symbol when you feel tempted to compromise your core values for romantic approval.",
    geometryType: "chevron",
  },
  {
    id: "clarity",
    name: "The Piercing Eye",
    category: "Money",
    intention: "I strip away wishful thinking and see my circumstances as they truly are.",
    suggestion:
      "Draw it above your monthly review, tax preparation, or business audit notes.",
    geometryType: "cross",
  },
];

export function getSigilById(id: string): Sigil | undefined {
  return SIGILS.find((s) => s.id === id);
}
