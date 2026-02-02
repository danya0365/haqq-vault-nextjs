import { AboutView } from "@/src/presentation/components/about/AboutView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Haqq Vault",
  description:
    "รู้จัก Haqq Vault - แพลตฟอร์มรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม",
};

export default function AboutPage() {
  return <AboutView />;
}
