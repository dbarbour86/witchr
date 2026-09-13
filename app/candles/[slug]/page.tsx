import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCorrespondenceBySlug,
  getCorrespondencesByCategory,
} from "@/content/correspondences";
import { CorrespondenceView } from "@/components/CorrespondenceView";

interface CandlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCorrespondencesByCategory("candle").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CandlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "candle") {
    return {
      title: "Candle Not Found",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: {
      canonical: `https://witchr.com/candles/${item.slug}`,
    },
    openGraph: {
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
      url: `https://witchr.com/candles/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
    },
  };
}

export default async function CandleDetailPage({
  params,
}: CandlePageProps) {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "candle") {
    notFound();
  }

  return <CorrespondenceView item={item} />;
}
