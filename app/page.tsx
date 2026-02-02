import { HomeView } from "@/src/presentation/components/home/HomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haqq Vault | คลังคำตอบชุบฮาต - BurhanQA",
  description:
    "แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม โดยใช้หลักฐานจากอัลกุรอาน หะดีษ และความเห็นของบรรดานักวิชาการ",
  keywords: [
    "อิสลาม",
    "คำตอบ",
    "ชุบฮาต",
    "อัลกุรอาน",
    "หะดีษ",
    "BurhanQA",
    "Haqq Vault",
  ],
  openGraph: {
    title: "Haqq Vault | คลังคำตอบชุบฮาต",
    description: "แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม",
    type: "website",
    locale: "th_TH",
  },
};

export default function Home() {
  return <HomeView />;
}
