import { SITE_CONFIG } from '@/src/config/site.config';
import { TopicsView } from "@/src/presentation/components/topics/TopicsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.topics.title,
  description: SITE_CONFIG.metadata.topics.description,
};

export default function TopicsPage() {
  return <TopicsView />;
}
