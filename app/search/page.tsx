import { SearchView } from "@/src/presentation/components/search/SearchView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ค้นหา | Haqq Vault",
  description:
    "ค้นหาคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม",
};

function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-4xl mb-4">🔍</div>
        <p className="text-muted">กำลังโหลด...</p>
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
