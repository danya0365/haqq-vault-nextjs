import { SITE_CONFIG } from '@/src/config/site.config';
import { RegisterView } from '@/src/presentation/components/auth/RegisterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.register.title,
  description: SITE_CONFIG.metadata.register.description,
};

export default function RegisterPage() {
  return <RegisterView />;
}
