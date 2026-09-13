import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Witchr",
    url: "https://witchr.com",
    description: "Witchcraft for modern problems. Practical rituals, tarot spreads, sigils, and reflective tools.",
    inLanguage: "en-US",
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Witchr",
    url: "https://witchr.com",
    logo: "https://witchr.com/icon.svg",
    slogan: "Witchcraft for modern problems.",
  };
}

export function getArticleJsonLd(options: {
  title: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": options.url,
    },
    author: {
      "@type": "Organization",
      name: "Witchr",
      url: "https://witchr.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Witchr",
      url: "https://witchr.com",
      logo: {
        "@type": "ImageObject",
        url: "https://witchr.com/icon.svg",
      },
    },
    articleSection: options.category || "Rituals",
    inLanguage: "en-US",
  };
}

export function getWebPageJsonLd(options: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.title,
    description: options.description,
    url: options.url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Witchr",
      url: "https://witchr.com",
    },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

