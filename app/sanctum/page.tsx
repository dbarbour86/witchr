import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  BookOpen,
  Eye,
  Lock,
} from "lucide-react";
import {
  TarotCornerFlourish,
  FourPointStar,
  GrimoireStar,
  CelestialDivider,
} from "@/components/OrnateFrames";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Sanctum — Coming Soon",
  description:
    "The Witchr Sanctum is coming soon — a private space for daily tarot, personal workings, your grimoire, and a more intentional witchcraft practice.",
  alternates: {
    canonical: "https://www.witchr.com/sanctum",
  },
  openGraph: {
    title: "The Sanctum — Coming Soon | Witchr",
    description:
      "The Witchr Sanctum is coming soon — a private space for daily tarot, personal workings, your grimoire, and a more intentional witchcraft practice.",
    url: "https://www.witchr.com/sanctum",
    siteName: "Witchr",
    images: [
      {
        url: "https://www.witchr.com/images/sanctum-portal-artwork.webp",
        width: 1600,
        height: 893,
        alt: "Witchr Sanctum Portal Gateway",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sanctum — Coming Soon | Witchr",
    description:
      "The Witchr Sanctum is coming soon — a private space for daily tarot, personal workings, your grimoire, and a more intentional witchcraft practice.",
    images: ["https://www.witchr.com/images/sanctum-portal-artwork.webp"],
  },
};

export default function SanctumComingSoonPage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://www.witchr.com" },
    { name: "Sanctum", item: "https://www.witchr.com/sanctum" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "The Sanctum — Coming Soon | Witchr",
    description:
      "The Witchr Sanctum is coming soon — a private space for daily tarot, personal workings, your grimoire, and a more intentional witchcraft practice.",
    url: "https://www.witchr.com/sanctum",
  });

  return (
    <div className="relative min-h-screen text-bone selection:bg-purple-900/60 selection:text-white overflow-hidden">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />

      {/* Atmospheric Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[960px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.18)_0%,rgba(10,3,18,0)_70%)] blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[840px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.12)_0%,transparent_70%)] blur-3xl z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20 space-y-24 sm:space-y-32">
        {/* 1. HERO SECTION */}
        <header className="text-center space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          {/* Eyebrow & Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-elevated/90 border border-purple-800/60 shadow-[0_0_20px_rgba(138,43,226,0.15)] text-xs font-mono tracking-ceremonial uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-lavender-moon font-semibold">THE SANCTUM</span>
            <span className="text-bone-dim">·</span>
            <span className="text-purple-300 font-medium">COMING SOON</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-bone leading-[1.08] celestial-glow max-w-4xl mx-auto">
            A private space for your practice.
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl md:text-2xl text-bone-muted font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Daily tarot. Personal workings. A living grimoire.
            <br className="hidden sm:inline" />
            <span className="text-bone-dim"> Built to help you turn intention into practice.</span>
          </p>

          {/* CTA & Subtitle */}
          <div className="pt-2 sm:pt-4 flex flex-col items-center gap-3">
            <Link
              href="/grimoire"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-600/60 hover:border-purple-400 text-bone hover:text-white text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-[0_0_25px_rgba(138,43,226,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all min-h-[48px]"
            >
              <span>Explore Witchr</span>
              <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs font-mono text-bone-dim uppercase tracking-wider">
              The doors aren’t open yet.
            </span>
          </div>
        </header>

        {/* 2. VISUAL CENTERPIECE: PORTAL & OCCULT GEOMETRY */}
        <section
          aria-label="Sanctum Portal Centerpiece"
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-3xl border border-purple-900/60 bg-gradient-to-b from-[#120722]/90 via-[#0a0314]/95 to-[#05010a] p-4 sm:p-8 shadow-[0_0_50px_rgba(88,28,135,0.25)] overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-3 left-3 pointer-events-none opacity-40">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute top-3 right-3 pointer-events-none opacity-40 rotate-90">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute bottom-3 left-3 pointer-events-none opacity-40 -rotate-90">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none opacity-40 rotate-180">
              <TarotCornerFlourish className="w-4 h-4 text-purple-400" />
            </div>

            {/* Glowing Focal Artwork Container */}
            <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-purple-800/40 bg-black/80 flex items-center justify-center">
              <Image
                src="/images/sanctum-portal-artwork.webp"
                alt="Abstract occult portal diagram glowing in electric violet against pure darkness"
                fill
                priority
                className="object-cover object-center opacity-90 transition-opacity duration-700"
                sizes="(max-width: 768px) 100vw, 896px"
              />

              {/* Radial Vignette Over Image */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,1,10,0.85)_95%)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Decorative Subtle Rotating Celestial Ring */}
              <div
                className="pointer-events-none absolute w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full border border-purple-400/20 motion-safe:animate-[spin_120s_linear_infinite] motion-reduce:animate-none flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-[90%] h-[90%] rounded-full border border-purple-300/10 border-dashed" />
              </div>

              {/* Center Lock Badge */}
              <div className="relative z-10 flex flex-col items-center gap-2 p-3.5 sm:p-4 rounded-xl bg-black/60 backdrop-blur-md border border-purple-700/50 shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-ceremonial text-purple-200">
                  Chamber In Preparation
                </span>
              </div>
            </div>

            {/* Bottom Subtle Centerpiece Caption */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-lavender-dim">
              <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
              <span>A Cloistered Digital Workstation</span>
              <FourPointStar className="w-2.5 h-2.5 text-purple-400" />
            </div>
          </div>
        </section>

        {/* 3. WHAT’S INSIDE: FEATURE PREVIEWS */}
        <section aria-labelledby="inside-heading" className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center justify-center gap-1.5">
              <GrimoireStar className="w-3.5 h-3.5 text-purple-400" />
              <span>Sanctum Core Features</span>
            </span>
            <h2
              id="inside-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-bone tracking-wide"
            >
              What waits inside
            </h2>
            <p className="text-sm sm:text-base text-bone-muted max-w-xl mx-auto font-sans leading-relaxed">
              Carefully crafted tools to ground your personal craft without clutter, algorithms, or noise.
            </p>
          </div>

          {/* 4 Feature Cards (Teasers, Non-Clickable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1: Daily Tarot */}
            <article className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-purple-900/40 relative overflow-hidden space-y-3.5 shadow-subtle group hover:border-purple-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-300">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-purple-300 block">
                  Reflection Anchor
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide pt-0.5">
                  Daily Tarot
                </h3>
              </div>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                A daily card and reflection to begin your practice.
              </p>
            </article>

            {/* Feature 2: Three-Card Readings */}
            <article className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-purple-900/40 relative overflow-hidden space-y-3.5 shadow-subtle group hover:border-purple-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-purple-300 block">
                  Diagnostic Inquiry
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide pt-0.5">
                  Three-Card Readings
                </h3>
              </div>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Past, present, and what may be unfolding.
              </p>
            </article>

            {/* Feature 3: Workings */}
            <article className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-purple-900/40 relative overflow-hidden space-y-3.5 shadow-subtle group hover:border-purple-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-300">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-purple-300 block">
                  Ritual Synthesis
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide pt-0.5">
                  Workings
                </h3>
              </div>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Build rituals around your intention and the tools you already have.
              </p>
            </article>

            {/* Feature 4: Grimoire */}
            <article className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-purple-900/40 relative overflow-hidden space-y-3.5 shadow-subtle group hover:border-purple-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-purple-300 block">
                  Private Recordkeeping
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide pt-0.5">
                  Grimoire
                </h3>
              </div>
              <p className="text-sm text-bone-muted leading-relaxed font-sans">
                Save readings, rituals, notes, and the pieces of your practice in one place.
              </p>
            </article>
          </div>
        </section>

        {/* 4. SHORT BRAND MOMENT: EDITORIAL INSIGHT */}
        <section
          aria-label="Sanctum Philosophy"
          className="relative max-w-3xl mx-auto text-center space-y-6 px-4"
        >
          <CelestialDivider className="max-w-xs mx-auto mb-8 opacity-70" />

          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-bone leading-relaxed tracking-wide italic">
            “Witchcraft shouldn’t feel like scrolling through a reference book forever.”
          </p>

          <p className="text-base sm:text-lg text-bone-muted font-sans leading-relaxed">
            Sanctum is being built as a place to actually practice — to pull a card, create a working, record what happened, and return to it later.
          </p>

          <p className="text-sm sm:text-base text-lavender-moon font-mono tracking-ceremonial uppercase">
            This is where Witchr becomes personal.
          </p>

          <CelestialDivider className="max-w-xs mx-auto mt-8 opacity-70" />
        </section>

        {/* 5. COMING SOON SECTION: CALL TO EXPLORATION */}
        <section
          aria-labelledby="almost-ready-heading"
          className="tarot-frame p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-surface-elevated/70 border border-purple-800/50 text-center space-y-6 relative overflow-hidden shadow-card-tarot"
        >
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-purple-300 flex items-center justify-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>In Active Development</span>
            </span>
            <h2
              id="almost-ready-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-bone tracking-wide"
            >
              The Sanctum is almost ready.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-bone-muted font-sans leading-relaxed pt-1">
              We’re still shaping the experience behind the doors. Until then, explore the public Witchr grimoire, rituals, correspondences, and reference library.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Link
              href="/grimoire"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-purple-950/90 hover:bg-purple-900 border border-purple-500/70 hover:border-purple-300 text-bone hover:text-white text-xs font-mono uppercase tracking-ceremonial font-semibold shadow-[0_0_25px_rgba(138,43,226,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] transition-all min-h-[48px]"
            >
              <span>Explore the Grimoire</span>
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </Link>
          </div>

          {/* Optional Secondary Public Links */}
          <div className="pt-6 border-t border-border-subtle/50 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-mono uppercase tracking-ceremonial text-bone-dim">
            <Link href="/tarot" className="hover:text-lavender-light transition-colors py-1">
              Public Tarot Spreads
            </Link>
            <span className="text-purple-900">·</span>
            <Link href="/rituals" className="hover:text-lavender-light transition-colors py-1">
              Rituals Archive
            </Link>
            <span className="text-purple-900">·</span>
            <Link href="/correspondences" className="hover:text-lavender-light transition-colors py-1">
              Correspondences Codex
            </Link>
          </div>
        </section>

        {/* 6. FINAL LINE */}
        <footer className="text-center pt-4">
          <p className="text-xs sm:text-sm font-mono tracking-ceremonial uppercase text-bone-dim">
            The door opens when it’s ready.
          </p>
        </footer>
      </div>
    </div>
  );
}
