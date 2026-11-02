import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sanctum", "/sanctum/"],
    },
    sitemap: "https://www.witchr.com/sitemap.xml",
  };
}
