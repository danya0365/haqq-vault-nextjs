import { SITE_CONFIG } from '@/src/config/site.config';
import { PopularView } from "@/src/presentation/components/popular/PopularView";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.popular.title,
  description: SITE_CONFIG.metadata.popular.description,
};

export default function PopularPage() {
  return <PopularView />;
}
