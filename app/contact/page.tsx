import { SITE_CONFIG } from '@/src/config/site.config';
import { ContactView } from "@/src/presentation/components/about/ContactView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.contact.title,
  description: SITE_CONFIG.metadata.contact.description,
};

export default function ContactPage() {
  return <ContactView />;
}
