import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCorrespondenceBySlug,
  getCorrespondencesByCategory,
} from "@/content/correspondences";
import { CorrespondenceView } from "@/components/CorrespondenceView";

interface SymbolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCorrespondencesByCategory("symbol").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: SymbolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "symbol") {
    return {
      title: "Symbol Not Found",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: {
      canonical: `https://witchr.com/symbols/${item.slug}`,
    },
    openGraph: {
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
      url: `https://witchr.com/symbols/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
    },
  };
}

export default async function SymbolDetailPage({
  params,
}: SymbolPageProps) {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "symbol") {
    notFound();
  }

  return <CorrespondenceView item={item} />;
}
