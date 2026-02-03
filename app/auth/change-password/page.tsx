import { SITE_CONFIG } from '@/src/config/site.config';
import { ChangePasswordView } from "@/src/presentation/components/auth/ChangePasswordView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.changePassword.title,
  description: SITE_CONFIG.metadata.changePassword.description,
};

export default function ChangePasswordPage() {
  return <ChangePasswordView />;
}
