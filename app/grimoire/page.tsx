import type { Metadata } from "next";
import Link from "next/link";
import { GRIMOIRE_SECTIONS } from "@/content/grimoire";
import { JsonLd, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/components/JsonLd";
import { CelestialDivider, FourPointStar, GrimoireStar } from "@/components/OrnateFrames";
import { ArrowRight, ShieldCheck, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Practical Grimoire & Occult Reference Guide",
  description:
    "A clean, grounded beginner reference hub for candle colors, common pantry herbs, lunar timing, and intention crafting. No dogma, just practical foundations.",
  alternates: {
    canonical: "https://witchr.com/grimoire",
  },
  openGraph: {
    title: "Practical Grimoire & Occult Reference Guide | Witchr",
    description: "Pantry herbs, candle colors, lunar timing, and intention crafting. Zero bullshit.",
    url: "https://witchr.com/grimoire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical Grimoire & Occult Reference Guide | Witchr",
    description: "Pantry herbs, candle colors, lunar timing, and intention crafting. Zero bullshit.",
  },
};

export default function GrimoirePage() {
  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    { name: "Grimoire", item: "https://witchr.com/grimoire" },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: "Practical Grimoire & Occult Reference Guide | Witchr",
    description:
      "A clean, grounded beginner reference hub for candle colors, common pantry herbs, lunar timing, and intention crafting.",
    url: "https://witchr.com/grimoire",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />


      {/* Header */}
      <header className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
          <FourPointStar className="w-2.5 h-2.5" />
          <span>Occult Reference Codex</span>
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-bone tracking-wide celestial-glow">
          The Beginner Grimoire
        </h1>
        <p className="text-lg md:text-xl text-bone-muted leading-relaxed font-sans">
          You don’t need an encyclopedia of medieval Latin. You just need a practical understanding of how everyday colors, kitchen herbs, and symbolic timing anchor human attention.
        </p>
        <div className="p-4 rounded-xl bg-surface border border-border-highlight flex items-start gap-3 text-xs text-bone-dim font-sans shadow-subtle">
          <ShieldCheck className="w-4 h-4 text-lavender-moon shrink-0 mt-0.5" />
          <p>
            Historical associations vary wildly across cultures and eras. We present these as traditional symbolic languages rather than supernatural facts. Adapt them to what makes sense in your own hands.
          </p>
        </div>
        <CelestialDivider className="max-w-sm my-4" />
      </header>

      {/* Section Quick Jump */}
      <nav aria-label="Grimoire sections" className="p-4 rounded-xl bg-surface border border-border flex flex-wrap items-center gap-3 text-xs font-mono">
        <span className="text-lavender-dim uppercase tracking-ceremonial">Quick Navigation:</span>
        {GRIMOIRE_SECTIONS.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="px-3 py-1.5 rounded-lg bg-background hover:bg-surface-elevated text-bone hover:text-lavender-light transition-colors border border-border-subtle"
          >
            {sec.title.split("&")[0].trim()}
          </a>
        ))}
      </nav>

      {/* Grimoire Sections */}
      <div className="space-y-20">
        {GRIMOIRE_SECTIONS.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <GrimoireStar className="w-3 h-3 text-lavender-dim" />
                <span>Reference Guide</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-bone tracking-wide">
                {sec.title}
              </h2>
              <p className="text-base text-bone-muted max-w-3xl leading-relaxed font-sans">
                {sec.description}
              </p>
            </div>

            {sec.id === "common-herbs" && (
              <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-highlight flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                    Complete Botanical Codex
                  </span>
                  <p className="text-sm text-bone-muted font-sans">
                    Looking for full magical correspondence profiles, traditional folklore, safety notes, and ritual pairings?
                  </p>
                </div>
                <Link
                  href="/herbs"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender text-xs font-mono uppercase tracking-ceremonial font-semibold shrink-0 transition-colors min-h-[44px]"
                >
                  <span>Explore Herb Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sec.items.map((item, idx) => (
                <div
                  key={idx}
                  className="tarot-frame p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {item.hex && (
                          <span
                            className="w-4 h-4 rounded-full border border-border inline-block shrink-0 shadow-glow-subtle"
                            style={{ backgroundColor: item.hex }}
                          />
                        )}
                        <h3 className="font-serif text-xl font-semibold text-bone">
                          {item.link ? (
                            <Link
                              href={item.link}
                              className="hover:text-lavender-light underline decoration-lavender/30 hover:decoration-lavender transition-colors"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            item.name
                          )}
                        </h3>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono uppercase tracking-wideDisplay px-2.5 py-0.5 rounded bg-surface-elevated border border-border-highlight text-lavender-moon">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm font-sans">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-bone-dim block">
                          Traditional Association:
                        </span>
                        <p className="text-bone-muted leading-relaxed">
                          {item.traditionalAssociation}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-lavender-moon block">
                          Modern Practical Context:
                        </span>
                        <p className="text-bone leading-relaxed">
                          {item.modernContext}
                        </p>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-bone-dim italic pt-1 border-t border-border-subtle/60">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.link && (
                    <div className="pt-2 border-t border-border-subtle/40">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-ceremonial text-lavender hover:text-lavender-light transition-colors min-h-[44px]"
                      >
                        <span>View complete {item.name.split(" ")[0]} reference guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Callout to Ritual Library */}
      <section className="tarot-frame p-8 sm:p-12 rounded-2xl text-center space-y-4 shadow-card-tarot">
        <div className="inline-flex p-3 rounded-full bg-surface-elevated border border-border-ornate text-lavender-moon mx-auto shadow-glow-purple">
          <Flame className="w-6 h-6 text-lavender-moon" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-bone tracking-wide">
          Ready to put theory into practice?
        </h2>
        <p className="text-base text-bone-muted max-w-xl mx-auto font-sans">
          Explore our complete library of 12 grounded rituals designed for modern real-world friction.
        </p>
        <div className="pt-3">
          <Link
            href="/rituals"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-hover text-lavender-light border border-border-ornate hover:border-lavender font-mono text-xs uppercase tracking-ceremonial font-semibold shadow-glow-subtle transition-all min-h-[44px]"
          >
            <span>Browse the ritual library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
