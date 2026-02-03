import { SITE_CONFIG } from '@/src/config/site.config';
import { ProfileView } from "@/src/presentation/components/auth/ProfileView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.profile.title,
  description: SITE_CONFIG.metadata.profile.description,
};

export default function ProfilePage() {
  return <ProfileView />;
}
