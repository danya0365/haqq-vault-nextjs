import { SITE_CONFIG } from '@/src/config/site.config';
import { CategoriesView } from '@/src/presentation/components/categories/CategoriesView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.categories.title,
  description: SITE_CONFIG.metadata.categories.description,
};

export default function CategoriesPage() {
  return <CategoriesView />;
}
