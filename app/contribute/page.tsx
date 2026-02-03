import { SITE_CONFIG } from '@/src/config/site.config';
import { ContributeView } from "@/src/presentation/components/contribute/ContributeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.contribute.title,
  description: SITE_CONFIG.metadata.contribute.description,
};

export default function ContributePage() {
  return <ContributeView />;
}
