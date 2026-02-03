import { SITE_CONFIG } from '@/src/config/site.config';
import { AboutView } from "@/src/presentation/components/about/AboutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.about.title,
  description: SITE_CONFIG.metadata.about.description,
};

export default function AboutPage() {
  return <AboutView />;
}
