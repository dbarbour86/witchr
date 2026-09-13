import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCorrespondenceBySlug,
  getCorrespondencesByCategory,
} from "@/content/correspondences";
import { CorrespondenceView } from "@/components/CorrespondenceView";

interface HerbPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCorrespondencesByCategory("herb").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: HerbPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "herb") {
    return {
      title: "Herb Not Found",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: {
      canonical: `https://witchr.com/herbs/${item.slug}`,
    },
    openGraph: {
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
      url: `https://witchr.com/herbs/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
    },
  };
}

export default async function HerbDetailPage({ params }: HerbPageProps) {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "herb") {
    notFound();
  }

  return <CorrespondenceView item={item} />;
}
