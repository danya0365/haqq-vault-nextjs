import { SITE_CONFIG } from '@/src/config/site.config';
import { ScholarsView } from "@/src/presentation/components/about/ScholarsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.scholars.title,
  description: SITE_CONFIG.metadata.scholars.description,
};

export default function ScholarsPage() {
  return <ScholarsView />;
}
