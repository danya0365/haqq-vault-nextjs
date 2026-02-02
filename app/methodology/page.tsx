import { MethodologyView } from "@/src/presentation/components/about/MethodologyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หลักการตอบคำถาม | Haqq Vault",
  description:
    "เรียนรู้หลักการและวิธีการที่ Haqq Vault ใช้ในการตอบคำถามและข้อกล่าวหาอย่างเป็นระบบ",
};

export default function MethodologyPage() {
  return <MethodologyView />;
}
