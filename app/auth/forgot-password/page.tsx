import { SITE_CONFIG } from '@/src/config/site.config';
import { ForgotPasswordView } from "@/src/presentation/components/auth/ForgotPasswordView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.forgotPassword.title,
  description: SITE_CONFIG.metadata.forgotPassword.description,
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
