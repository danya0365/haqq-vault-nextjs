import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { SearchView } from "@/src/presentation/components/search/SearchView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.search.title,
  description: SITE_CONFIG.metadata.search.description,
};

function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-4xl mb-4">🔍</div>
        <p className="text-muted">{UI_CONFIG.labels.loading}</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchView />
    </Suspense>
  );
}
