import { SITE_CONFIG } from '@/src/config/site.config';
import { HomeView } from "@/src/presentation/components/home/HomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.home.title,
  description: SITE_CONFIG.metadata.home.description,
  keywords: [...SITE_CONFIG.keywords],
  openGraph: {
    title: SITE_CONFIG.metadata.home.title,
    description: SITE_CONFIG.metadata.home.description,
    type: "website",
    locale: "th_TH",
  },
};

export default function Home() {
  return <HomeView />;
}
