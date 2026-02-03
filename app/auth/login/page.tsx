import { SITE_CONFIG } from '@/src/config/site.config';
import { LoginView } from "@/src/presentation/components/auth/LoginView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.login.title,
  description: SITE_CONFIG.metadata.login.description,
};

export default function LoginPage() {
  return <LoginView />;
}
