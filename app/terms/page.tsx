import { SITE_CONFIG } from '@/src/config/site.config';
import { TermsView } from '@/src/presentation/components/legal/TermsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.terms.title,
  description: SITE_CONFIG.metadata.terms.description,
};

export default function TermsPage() {
  return <TermsView />;
}
