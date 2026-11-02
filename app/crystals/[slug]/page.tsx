import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCorrespondenceBySlug,
  getCorrespondencesByCategory,
} from "@/content/correspondences";
import { CorrespondenceView } from "@/components/CorrespondenceView";

interface CrystalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCorrespondencesByCategory("crystal").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CrystalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "crystal") {
    return {
      title: "Crystal Not Found",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: {
      canonical: `https://www.witchr.com/crystals/${item.slug}`,
    },
    openGraph: {
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
      url: `https://www.witchr.com/crystals/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.seoTitle} | Witchr`,
      description: item.seoDescription,
    },
  };
}

export default async function CrystalDetailPage({
  params,
}: CrystalPageProps) {
  const { slug } = await params;
  const item = getCorrespondenceBySlug(slug);

  if (!item || item.category !== "crystal") {
    notFound();
  }

  return <CorrespondenceView item={item} />;
}
