import { TopicsView } from "@/src/presentation/components/topics/TopicsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำตอบทั้งหมด | Haqq Vault",
  description:
    "รวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม พร้อมหลักฐานจากอัลกุรอาน หะดีษ และนักวิชาการ",
};

export default function TopicsPage() {
  return <TopicsView />;
}
