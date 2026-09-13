import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCorrespondenceBySlug,
  getCorrespondencesByCategory,
} from "@/content/correspondences";
import { CorrespondenceView } from "@/components/CorrespondenceView";

interface IngredientPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCorrespondencesByCategory("ingredient").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: IngredientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "ingredient") {
    return {
      title: "Ingredient Not Found",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: {
      canonical: `https://witchr.com/ingredients/${item.slug}`,
    },
    openGraph: {
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
      url: `https://witchr.com/ingredients/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
    },
  };
}

export default async function IngredientDetailPage({
  params,
}: IngredientPageProps) {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "ingredient") {
    notFound();
  }

  return <CorrespondenceView item={item} />;
}
