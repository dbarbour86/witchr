import React from "react";
import Link from "next/link";
import { CorrespondenceItem } from "@/content/correspondences";
import { getRitualBySlug } from "@/content/rituals";
import { RitualCard } from "./RitualCard";
import {
  JsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  getFaqJsonLd,
} from "./JsonLd";
import { ProductCTA } from "./ProductCTA";
import {
  CelestialDivider,
  TarotCornerFlourish,
  FourPointStar,
} from "./OrnateFrames";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
} from "lucide-react";

interface CorrespondenceViewProps {
  item: CorrespondenceItem;
}

/**
 * Parses inline markdown links [Label](url) into Next.js Link components.
 */
function FormattedProse({ text }: { text: string }) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    parts.push(
      <Link
        key={match.index}
        href={href}
        className="text-lavender-light hover:text-lavender underline decoration-lavender/40 hover:decoration-lavender underline-offset-2 transition-colors font-medium"
      >
        {label}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

export function CorrespondenceView({ item }: CorrespondenceViewProps) {
  const relatedRituals = item.relatedRitualSlugs
    .map((slug) => getRitualBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => !!r);

  const hubName = item.relatedHubSlug
    ? item.relatedHubSlug.charAt(0).toUpperCase() + item.relatedHubSlug.slice(1)
    : "Protection";

  const isHerb = item.category === "herb" || item.routePrefix === "herbs";
  const parentName = isHerb ? "Herbs" : hubName;
  const parentHref = isHerb ? "/herbs" : `/${item.relatedHubSlug || "protection"}`;
  const parentUrl = `https://witchr.com${parentHref}`;

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", item: "https://witchr.com" },
    {
      name: parentName,
      item: parentUrl,
    },
    {
      name: item.name,
      item: `https://witchr.com/${item.routePrefix}/${item.slug}`,
    },
  ]);

  const webPageJsonLd = getWebPageJsonLd({
    title: `${item.seoTitle} | Witchr`,
    description: item.seoDescription,
    url: `https://witchr.com/${item.routePrefix}/${item.slug}`,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={webPageJsonLd} />
      {item.faqs && item.faqs.length > 0 && (
        <JsonLd data={getFaqJsonLd(item.faqs)} />
      )}

      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-ceremonial text-bone-dim"
      >
        <Link
          href="/"
          className="hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link
          href={parentHref}
          className="hover:text-lavender-light flex items-center min-h-[44px]"
        >
          {parentName}
        </Link>
        <span>/</span>
        <span className="text-lavender-moon">{item.name}</span>
      </nav>

      {/* 2. Header & Eyebrow */}
      <header className="space-y-4 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border-highlight text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>
              {item.categoryLabel} · {item.primaryIntent}
            </span>
          </span>
          <span className="text-xs font-mono text-bone-dim uppercase tracking-wider">
            Occult Reference Entry
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-bone tracking-wide leading-[1.1] celestial-glow">
          {item.h1 || item.name}
        </h1>

        <p className="text-lg sm:text-xl text-bone-muted leading-relaxed font-serif italic pt-1">
          {item.oneLiner}
        </p>
      </header>

      {/* 3. Quick Answer (For Humans & Answer Engines) */}
      <section
        aria-labelledby="quick-answer-heading"
        className="tarot-frame p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-surface-elevated/70 border border-border-ornate shadow-card-tarot space-y-3"
      >
        <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>
        <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40 rotate-90">
          <TarotCornerFlourish className="w-4 h-4 text-lavender-moon" />
        </div>

        <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial">
          <Sparkles className="w-3.5 h-3.5" />
          <h2 id="quick-answer-heading" className="font-semibold">
            Quick Answer: What is {item.name} used for in witchcraft?
          </h2>
        </div>

        <p className="text-base sm:text-lg text-bone leading-relaxed font-sans pt-1">
          <FormattedProse text={item.quickAnswer} />
        </p>
      </section>

      {/* 4. Upper Reference Table (when present) */}
      {item.referenceTable && item.referenceTable.length > 0 && (
        <section
          aria-labelledby="reference-table-heading"
          className="tarot-frame p-6 sm:p-8 rounded-2xl bg-surface border border-border-ornate shadow-card-tarot space-y-6"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <FourPointStar className="w-2.5 h-2.5" />
                <span>Reference Codex</span>
              </span>
              <h2
                id="reference-table-heading"
                className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
              >
                {item.name} Magical Correspondences
              </h2>
            </div>
            <span className="text-xs font-mono text-bone-dim hidden sm:inline uppercase tracking-wider">
              Occult Specifications
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans border-collapse">
              <tbody>
                {item.referenceTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/40 transition-colors"
                  >
                    <th
                      scope="row"
                      className="py-3.5 pr-4 text-xs font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold w-1/3 sm:w-1/4 align-top"
                    >
                      {row.label}
                    </th>
                    <td className="py-3.5 pl-2 text-sm sm:text-base text-bone font-medium leading-relaxed align-top">
                      <FormattedProse text={row.value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle/40">
            <p className="text-xs font-mono text-bone-dim/75 leading-relaxed">
              * Note: Elemental and planetary correspondences reflect historical grimoires, occult traditions, and folk herbals. Exact attributions vary across lineages, sources, and individual practices and are not universally standardized.
            </p>
          </div>
        </section>
      )}

      {/* 5. Fallback Correspondence Panel (for entries without custom reference tables) */}
      {!item.referenceTable && (
        <section
          aria-labelledby="correspondence-panel-heading"
          className="space-y-4"
        >
          <div className="border-b border-border-subtle pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Correspondences</span>
            </span>
            <h2
              id="correspondence-panel-heading"
              className="text-xl sm:text-2xl font-display font-semibold text-bone tracking-wide"
            >
              Symbolic Correspondences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {item.correspondences.uses && item.correspondences.uses.length > 0 && (
              <div className="tarot-frame p-5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                  Primary Uses
                </span>
                <ul className="space-y-1.5 text-sm text-bone-muted font-sans">
                  {item.correspondences.uses.map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lavender-dim font-mono text-xs">·</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(item.correspondences.element || item.correspondences.planet) && (
              <div className="tarot-frame p-5 space-y-3">
                {item.correspondences.element && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                      Classical Element
                    </span>
                    <p className="text-sm text-bone font-medium">
                      {item.correspondences.element}
                    </p>
                  </div>
                )}
                {item.correspondences.planet && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                      Planetary Association
                    </span>
                    <p className="text-sm text-bone font-medium">
                      {item.correspondences.planet}
                    </p>
                  </div>
                )}
              </div>
            )}

            {item.correspondences.colors &&
              item.correspondences.colors.length > 0 && (
                <div className="tarot-frame p-5 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                    Complementary Colors
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.correspondences.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-surface border border-border-highlight text-xs font-mono text-bone-muted"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {item.correspondences.intentions &&
              item.correspondences.intentions.length > 0 && (
                <div className="tarot-frame p-5 space-y-2 sm:col-span-2 lg:col-span-3">
                  <span className="text-[11px] font-mono uppercase tracking-ceremonial text-lavender-moon font-semibold">
                    Aligned Intentions
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.correspondences.intentions.map((intent, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle text-xs font-mono text-lavender-light"
                      >
                        {intent}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
          <p className="text-xs font-mono text-bone-dim/75 leading-relaxed pt-2">
            * Note: Correspondence systems reflect historical grimoires, occult traditions, and folk herbals. Exact attributions vary across lineages, sources, and individual practices and are not universally standardized.
          </p>
        </section>
      )}

      {/* 6. Detailed Deep-Dive Sections (when present) */}
      {item.detailedSections && item.detailedSections.length > 0 ? (
        item.detailedSections.map((sec) => (
          <section
            key={sec.id}
            aria-labelledby={`${sec.id}-heading`}
            className="space-y-4"
          >
            <div className="border-b border-border-subtle pb-3">
              <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Occult Deep Dive</span>
              </span>
              <h2
                id={`${sec.id}-heading`}
                className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
              >
                {sec.title}
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>
                  <FormattedProse text={p} />
                </p>
              ))}
            </div>

            {sec.subsections && sec.subsections.length > 0 && (
              <div className="space-y-5 pt-2">
                {sec.subsections.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="tarot-frame p-5 sm:p-6 space-y-3 bg-surface-elevated/40 rounded-xl"
                  >
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-lavender-light tracking-wide">
                      {sub.title}
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
                      {sub.content.map((p, subPIdx) => (
                        <p key={subPIdx}>
                          <FormattedProse text={p} />
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))
      ) : (
        <>
          {/* Default Lore & Modern Use for basic entries */}
          {item.traditionalLore && item.traditionalLore.length > 0 && (
            <section aria-labelledby="traditional-lore-heading" className="space-y-4">
              <div className="border-b border-border-subtle pb-3">
                <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Folk Traditions</span>
                </span>
                <h2
                  id="traditional-lore-heading"
                  className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
                >
                  Traditional Folklore & Associations
                </h2>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
                {item.traditionalLore.map((paragraph, idx) => (
                  <p key={idx}>
                    <FormattedProse text={paragraph} />
                  </p>
                ))}
              </div>
            </section>
          )}

          {item.modernWitchrUse && item.modernWitchrUse.length > 0 && (
            <section aria-labelledby="modern-use-heading" className="space-y-4">
              <div className="border-b border-border-subtle pb-3">
                <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Modern Practice</span>
                </span>
                <h2
                  id="modern-use-heading"
                  className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
                >
                  How to Use {item.name} Today
                </h2>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-bone-muted leading-relaxed font-sans">
                {item.modernWitchrUse.map((paragraph, idx) => (
                  <p key={idx}>
                    <FormattedProse text={paragraph} />
                  </p>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* 7. Pairings Section (when present) */}
      {item.pairings && item.pairings.length > 0 && (
        <section aria-labelledby="pairings-heading" className="space-y-4">
          <div className="border-b border-border-subtle pb-3">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Synergistic Alchemy</span>
            </span>
            <h2
              id="pairings-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Magical Pairings with {item.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {item.pairings.map((pairing, idx) => (
              <div
                key={idx}
                className="tarot-frame p-5 space-y-2.5 bg-surface rounded-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-light font-semibold block">
                    {pairing.link ? (
                      <Link
                        href={pairing.link}
                        className="hover:text-lavender inline-flex items-center gap-1 underline decoration-lavender/40 hover:decoration-lavender"
                      >
                        <span>{pairing.name}</span>
                        <ArrowRight className="w-3 h-3 text-lavender-dim" />
                      </Link>
                    ) : (
                      pairing.name
                    )}
                  </span>
                  <p className="text-sm text-bone-muted font-sans leading-relaxed pt-1.5">
                    <FormattedProse text={pairing.purpose} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Practical Micro-Action (Try It) */}
      <section
        aria-labelledby="try-it-heading"
        className="p-6 md:p-8 rounded-2xl bg-surface border border-border-ornate space-y-3 relative shadow-card-tarot"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
            <FourPointStar className="w-2.5 h-2.5" />
            <span>Practical Micro-Action</span>
          </span>
          <span className="text-[11px] font-mono text-bone-dim uppercase tracking-wider">
            Try It
          </span>
        </div>
        <h3
          id="try-it-heading"
          className="font-display text-xl sm:text-2xl font-bold text-bone tracking-wide"
        >
          {item.tryIt.title}
        </h3>
        <p className="text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
          <FormattedProse text={item.tryIt.instruction} />
        </p>
      </section>

      {/* 9. Frequently Asked Questions (when present) */}
      {item.faqs && item.faqs.length > 0 && (
        <section aria-labelledby="faqs-heading" className="space-y-6">
          <div className="border-b border-border-subtle pb-3">
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Lore</span>
            </span>
            <h2
              id="faqs-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {item.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="tarot-frame p-5 sm:p-6 rounded-xl bg-surface border border-border-subtle space-y-2"
              >
                <h3 className="text-base sm:text-lg font-display font-semibold text-bone tracking-wide">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-bone-muted leading-relaxed font-sans">
                  <FormattedProse text={faq.answer} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Safety & Practical Notes (when present) */}
      {item.safetyNotes && item.safetyNotes.length > 0 && (
        <section
          aria-labelledby="safety-heading"
          className="p-6 rounded-2xl bg-surface/70 border border-border-ornate space-y-3 text-sm text-bone-muted font-sans"
        >
          <div className="flex items-center gap-2 text-lavender-moon text-xs font-mono uppercase tracking-ceremonial font-semibold">
            <ShieldCheck className="w-4 h-4 text-lavender-light" />
            <h3 id="safety-heading">Practical Safety & Botanical Context</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-bone-muted">
            {item.safetyNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-lavender-light font-mono text-sm leading-none mt-0.5">
                  ·
                </span>
                <span>
                  <FormattedProse text={note} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 11. Related Witchr Resources */}
      <section
        aria-labelledby="related-content-heading"
        className="space-y-6 pt-4"
      >
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-ceremonial text-lavender-moon flex items-center gap-1.5">
              <FourPointStar className="w-2.5 h-2.5" />
              <span>Context & Applications</span>
            </span>
            <h2
              id="related-content-heading"
              className="text-2xl sm:text-3xl font-display font-semibold text-bone mt-1 tracking-wide"
            >
              Related Practices & Rituals
            </h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {isHerb && (
              <Link
                href="/herbs"
                className="text-xs font-mono uppercase tracking-wideDisplay text-bone-dim hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
              >
                <span>Herb Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <Link
              href="/spell-finder"
              className="text-xs font-mono uppercase tracking-wideDisplay text-bone-dim hover:text-lavender-light hidden sm:flex items-center gap-1 min-h-[44px]"
            >
              <span>Spell Finder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/${item.relatedHubSlug || "protection"}`}
              className="text-xs font-mono uppercase tracking-wideDisplay text-lavender hover:text-lavender-light flex items-center gap-1 min-h-[44px]"
            >
              <span>{hubName} Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {relatedRituals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedRituals.map((ritual) => (
              <RitualCard key={ritual.slug} ritual={ritual} />
            ))}
          </div>
        )}
      </section>

      {/* 12. Sources / Historical Note (rendered ONLY when verified sources exist) */}
      {item.sources && item.sources.length > 0 && (
        <section
          aria-labelledby="sources-heading"
          className="p-6 rounded-xl bg-surface/40 border border-border-subtle space-y-2 text-xs text-bone-dim font-sans"
        >
          <h3
            id="sources-heading"
            className="font-mono uppercase font-semibold text-bone-muted"
          >
            Historical Sources & References
          </h3>
          <ul className="space-y-1">
            {item.sources.map((src, idx) => (
              <li key={idx}>· {src}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 13. ProductCTA */}
      <ProductCTA
        title="The Witchr Protection Grimoire"
        description="A printable, altar-side field guide organizing modern protection rituals, kitchen herbs, and boundary correspondences."
        productUrl={null}
        eyebrow="Printable Field Guide"
      />

      <CelestialDivider className="my-8" />
    </article>
  );
}
