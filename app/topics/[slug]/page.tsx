import { SITE_CONFIG } from '@/src/config/site.config';
import { MOCK_TOPICS } from "@/src/infrastructure/repositories/mock/data/mockData";
import { TopicDetailView } from "@/src/presentation/components/topics/TopicDetailView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface TopicDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TopicDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = MOCK_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    return {
      title: SITE_CONFIG.metadata.notFound.title,
    };
  }

  return {
    title: `${topic.title} | Haqq Vault`,
    description: topic.shortAnswer,
    keywords: topic.tags,
    openGraph: {
      title: topic.title,
      description: topic.shortAnswer,
      type: "article",
      locale: "th_TH",
    },
  };
}

export async function generateStaticParams() {
  return MOCK_TOPICS.filter((t) => t.status === "published").map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { slug } = await params;
  const topic = MOCK_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return <TopicDetailView slug={slug} />;
}
