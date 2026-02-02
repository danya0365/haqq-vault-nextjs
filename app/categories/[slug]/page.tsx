import { MOCK_CATEGORIES } from "@/src/infrastructure/repositories/mock/data/mockData";
import { CategoryDetailView } from "@/src/presentation/components/categories/CategoryDetailView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "ไม่พบหมวดหมู่ | Haqq Vault",
    };
  }

  return {
    title: `${category.name} | Haqq Vault`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Haqq Vault`,
      description: category.description,
      type: "website",
      locale: "th_TH",
    },
  };
}

export async function generateStaticParams() {
  return MOCK_CATEGORIES.filter((c) => c.isActive).map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return <CategoryDetailView slug={slug} />;
}
