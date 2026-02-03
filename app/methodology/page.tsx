import { SITE_CONFIG } from '@/src/config/site.config';
import { MethodologyView } from "@/src/presentation/components/about/MethodologyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.methodology.title,
  description: SITE_CONFIG.metadata.methodology.description,
};

export default function MethodologyPage() {
  return <MethodologyView />;
}
