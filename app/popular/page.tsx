import { PopularView } from "@/src/presentation/components/popular/PopularView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำตอบยอดนิยม | Haqq Vault",
  description: "คำตอบที่ได้รับความสนใจและมีผู้เข้าชมมากที่สุด",
};

export default function PopularPage() {
  return <PopularView />;
}
