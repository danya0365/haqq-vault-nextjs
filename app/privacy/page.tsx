import { SITE_CONFIG } from '@/src/config/site.config';
import { PrivacyView } from "@/src/presentation/components/legal/PrivacyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.privacy.title,
  description: SITE_CONFIG.metadata.privacy.description,
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
