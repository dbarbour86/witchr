import { MetadataRoute } from "next";
import { RITUALS } from "@/content/rituals";
import { TAROT_SPREADS } from "@/content/tarot";
import { PROBLEM_HUBS } from "@/content/problems";
import { CORRESPONDENCES } from "@/content/correspondences";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://witchr.com";

  // Static core routes
  const staticPaths = [
    "",
    "/spell-finder",
    "/rituals",
    "/tarot",
    "/sigils",
    "/grimoire",
    "/herbs",
    "/correspondences",
    "/correspondences/protection",
    "/correspondences/love",
    "/correspondences/cleansing",
    "/about",
    "/disclaimer",
  ];

  const rawUrls: string[] = [
    ...staticPaths.map((path) => `${baseUrl}${path}`),
    ...PROBLEM_HUBS.map((hub) => `${baseUrl}/${hub.slug}`),
    ...RITUALS.map((ritual) => `${baseUrl}/rituals/${ritual.slug}`),
    ...TAROT_SPREADS.map((spread) => `${baseUrl}/tarot/${spread.slug}`),
    ...CORRESPONDENCES.map((c) => `${baseUrl}/${c.routePrefix}/${c.slug}`),
  ];


  // Strictly filter out any empty, whitespace, or invalid non-canonical URLs
  const validUniqueUrls = Array.from(
    new Set(
      rawUrls.filter(
        (url) =>
          typeof url === "string" &&
          url.startsWith(baseUrl) &&
          !url.includes("//witchr.com//") &&
          url.trim().length > 0
      )
    )
  );

  return validUniqueUrls.map((url) => ({
    url,
  }));
}

