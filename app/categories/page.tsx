import { CategoriesView } from "@/src/presentation/components/categories/CategoriesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หมวดหมู่ | Haqq Vault",
  description: "เลือกหมวดหมู่เพื่อค้นหาคำตอบที่เหมาะกับคุณ",
};

export default function CategoriesPage() {
  return <CategoriesView />;
}
